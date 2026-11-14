/* The full question → answer pipeline. Pure logic, used by the Worker route and by tests. */
import { planQuery, retrieve, aiEnabled } from "./retrieve.js";
import { generate, verifyAnswer, normalizeRulings, buildPassages, sourceOf, quoteFor, ABSTAIN_MESSAGE } from "./answer.js";
import { verifyOnSource } from "./sistani.js";

export const DISCLAIMER = "Zahra shows the published rulings of Ayatollah al-Sistani from sistani.org and explains them simply. The explanation is not a fatwa. For your personal situation, please consult the Office of Ayatollah Sistani.";

function abstain(question, lang, reason, extra = {}) {
  return { status: "abstain", question, language: lang, message: ABSTAIN_MESSAGE, reason, disclaimer: DISCLAIMER, ...extra };
}

const GREETING = {
  en: "Wa alaykum as-salam! I'm Zahra. Ask me any fiqh question and I'll find Ayatollah al-Sistani's published answer for you.",
  "roman-ur": "Wa alaikum assalam! Main Zahra hoon. Mujh se koi bhi fiqhi sawal poochiye, main Ayatollah Sistani ka shaya shuda jawab dhoond kar dikhaungi.",
  ur: "وعلیکم السلام! میں زہرا ہوں۔ کوئی بھی فقہی سوال پوچھیے، میں آیت اللہ سیستانی کا شائع شدہ جواب تلاش کر کے دکھاؤں گی۔",
  ar: "وعليكم السلام! أنا زهراء. اسألني أيّ سؤال فقهي وسأبحث لك عن جواب سماحة السيد السيستاني المنشور."
};

export async function answerQuestion(env, question, context = "", history = []) {
  const trace = { steps: [] };
  const plan = await planQuery(env, question + (context ? "\n" + context : ""), history);
  trace.plan = { kind: plan.kind, language: plan.language, standalone: plan.standalone_question, terms: plan.terms, glossary: plan.glossaryMatches, planError: plan.planError };
  const lang = plan.language;

  if (plan.kind === "smalltalk" || plan.kind === "off_topic") {
    return { result: { status: "chat", question, language: lang, reply: plan.smalltalk_reply || GREETING[lang] || GREETING.en, disclaimer: DISCLAIMER }, trace };
  }

  const searchQ = plan.standalone_question || question;
  const { candidates, searches } = await retrieve(env, searchQ, plan);
  trace.searches = searches;
  trace.candidates = candidates.map((c) => ({ pid: c.pid, found: c.found, score: c.score }));
  if (!candidates.length) return { result: abstain(question, lang, "no candidate passages found"), trace };

  if (!aiEnabled(env)) return retrievalOnly(env, question, lang, candidates, trace);

  // ---- AI answer grounded in the passages ----
  const passages = buildPassages(candidates.slice(0, Number(env.AI_PASSAGES || 6)));
  let out, model;
  try {
    ({ data: out, model } = await generate(env, searchQ, context, passages, lang, history));
  } catch (e) {
    trace.aiError = String(e && e.message || e).slice(0, 300);
    return retrievalOnly(env, question, lang, candidates, trace, "ai_unavailable");
  }
  trace.model = model;
  trace.modelStatus = out && out.status;

  normalizeRulings(out);
  const v = verifyAnswer(out, passages);
  if (!v.ok) { trace.verification = v.reason; return retrievalOnly(env, question, lang, candidates, trace, "ai_check_failed"); }
  if (out.status === "abstain") return { result: abstain(question, lang, out.reason || "the model found no directly relevant passage"), trace };

  const byLabel = new Map(passages.map((p) => [p.label, p]));
  if (out.status === "clarify") {
    return {
      result: { status: "clarify", question, language: lang, reply: out.reply || "", clarifying_questions: out.clarifying_questions, disclaimer: DISCLAIMER },
      trace
    };
  }

  // Official quotes assembled from the original text, then verified on the live page.
  const rulings = out.rulings.map((r) => { const label = r.sentences[0].split(".")[0]; const p = byLabel.get(label); return { label, p, quote: quoteFor(p, r.sentences) }; });
  const checks = await Promise.allSettled(rulings.map((r) => verifyOnSource(r.p, r.quote)));
  const ok = rulings.filter((r, i) => checks[i].status === "fulfilled" && checks[i].value === true);
  trace.sourceChecks = rulings.map((r, i) => ({ passage: r.p.pid, ok: checks[i].status === "fulfilled" && checks[i].value === true }));
  if (!ok.length) return { result: abstain(question, lang, "source verification failed"), trace };

  // Merge several rulings from the same passage into one card.
  const cards = [];
  for (const r of ok) {
    const c = cards.find((x) => x.label === r.label);
    if (c) c.quote += " … " + r.quote; else cards.push({ label: r.label, p: r.p, quote: r.quote });
  }
  const number = new Map(cards.map((c, i) => [c.label, i + 1]));
  const reply = String(out.reply).replace(/\[(P\d+)(?:\.\d+)?\]/g, (m, l) => (number.has(l) ? `[${number.get(l)}]` : ""));
  const now = new Date().toISOString();
  trace.cited = cards.map((c) => c.p.pid);
  return {
    result: {
      status: "answer",
      question,
      language: lang,
      reply,
      official: cards.map((c) => ({ ref: number.get(c.label), quote: c.quote, original_question: c.p.question || null, source: sourceOf(c.p), verified_at: now })),
      conditions: (out.conditions || []).filter((c) => number.has(c.passage)).map((c) => ({ text: c.text, ref: number.get(c.passage) })),
      related: (out.related || []).filter((l) => byLabel.has(l) && !number.has(l)).slice(0, 3).map((l) => { const p = byLabel.get(l); return { title: p.question || `Ruling ${p.number} · ${p.section}`, source: sourceOf(p) }; }),
      ai: true,
      disclaimer: DISCLAIMER
    },
    trace
  };
}

/*
  Official answers only (no AI): the closest official passages verbatim, each re-verified on its
  live page. Used when AI is switched off, unavailable, or its answer fails a check.
*/
async function retrievalOnly(env, question, lang, candidates, trace, why = "") {
  const min = Number(env.MIN_RELEVANCE || 0.6);
  const passing = candidates.filter((c) => c.found >= min);
  const best = passing.length ? passing[0].score : 0;
  // Main answers: only those nearly as strong as the best match. Weaker ones become "related".
  const strong = passing.filter((c) => c.score >= best - 0.12).slice(0, 3);
  trace.threshold = min;
  if (why) trace.fallback = why;
  if (!strong.length) return { result: abstain(question, lang, "no passage above relevance " + min), trace };

  const checks = await Promise.allSettled(strong.map((c) => verifyOnSource(c, c.text)));
  const ok = strong.filter((c, i) => checks[i].status === "fulfilled" && checks[i].value === true);
  trace.sourceChecks = strong.map((c, i) => ({ passage: c.pid, ok: checks[i].status === "fulfilled" && checks[i].value === true }));
  if (!ok.length) return { result: abstain(question, lang, "source verification failed"), trace };

  const now = new Date().toISOString();
  const shown = new Set(ok.map((c) => c.pid));
  const related = candidates.filter((c) => !shown.has(c.pid) && c.found >= min - 0.25).slice(0, 3);
  trace.cited = ok.map((c) => c.pid);
  return {
    result: {
      status: "matches",
      question,
      language: lang,
      matches: ok.map((c) => ({
        quote: c.text,
        original_question: c.question || null,
        source: sourceOf(c),
        match: c.found >= 0.99 ? "close" : "partial",
        verified_at: now
      })),
      related: related.map((c) => ({ title: c.question || `Ruling ${c.number} · ${c.section}`, source: sourceOf(c) })),
      ai_note: why ? "The AI explanation is not available right now, so here are the official texts directly." : "",
      note: "These are the closest published answers of Ayatollah al-Sistani to your question. Please check that the official question matches your situation before acting on it.",
      disclaimer: DISCLAIMER
    },
    trace
  };
}
