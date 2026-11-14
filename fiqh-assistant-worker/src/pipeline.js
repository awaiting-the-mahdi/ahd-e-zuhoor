/* The full question → answer pipeline. Pure logic, used by the Worker route and by tests. */
import { planQuery, retrieve, aiEnabled } from "./retrieve.js";
import { generate, verifyAnswer, buildPassages, sourceOf, ABSTAIN_MESSAGE } from "./answer.js";
import { verifyOnSource } from "./sistani.js";

export const DISCLAIMER = "This assistant quotes the published rulings of Ayatollah al-Sistani from sistani.org and explains them simply. It is not a fatwa service. For your personal situation, please consult the Office of Ayatollah Sistani.";

function abstain(question, lang, reason, extra = {}) {
  return { status: "abstain", question, language: lang, message: ABSTAIN_MESSAGE, reason, disclaimer: DISCLAIMER, ...extra };
}

export async function answerQuestion(env, question, context = "") {
  const trace = { steps: [] };
  const plan = await planQuery(env, question + (context ? "\n" + context : ""));
  trace.plan = { language: plan.language, terms: plan.terms, glossary: plan.glossaryMatches, planError: plan.planError };
  const lang = plan.language;

  const { candidates, searches } = await retrieve(env, question, plan);
  trace.searches = searches;
  trace.candidates = candidates.map((c) => ({ pid: c.pid, found: c.found, score: c.score }));
  if (!candidates.length) return { result: abstain(question, lang, "no candidate passages found"), trace };

  if (!aiEnabled(env)) return retrievalOnly(env, question, lang, candidates, trace);

  const passages = buildPassages(candidates);
  const { data: out, model } = await generate(env, question, context, passages, lang);
  trace.model = model;
  trace.modelStatus = out.status;

  const v = verifyAnswer(out, passages);
  if (!v.ok) { trace.verification = v.reason; return { result: abstain(question, lang, "verification failed: " + v.reason), trace }; }
  if (out.status === "abstain") return { result: abstain(question, lang, out.reason), trace };

  const byLabel = new Map(passages.map((p) => [p.label, p]));
  if (out.status === "clarify") {
    return {
      result: { status: "clarify", question, language: lang, question_restated: out.question_restated, clarifying_questions: out.clarifying_questions, disclaimer: DISCLAIMER },
      trace
    };
  }

  // Source verification: confirm each quote is present on the live official page.
  const checks = await Promise.allSettled(out.rulings.map((r) => verifyOnSource(byLabel.get(r.passage), r.quote)));
  const verifiedRulings = out.rulings.filter((r, i) => checks[i].status === "fulfilled" && checks[i].value === true);
  trace.sourceChecks = out.rulings.map((r, i) => ({ passage: byLabel.get(r.passage).pid, ok: checks[i].status === "fulfilled" && checks[i].value === true }));
  if (!verifiedRulings.length) return { result: abstain(question, lang, "source verification failed"), trace };
  const keep = new Set(verifiedRulings.map((r) => r.passage));

  const now = new Date().toISOString();
  const result = {
    status: "answer",
    question,
    language: lang,
    question_restated: out.question_restated,
    official: verifiedRulings.map((r) => {
      const p = byLabel.get(r.passage);
      return { id: r.passage, quote: r.quote, original_question: p.kind === "qa" ? p.question : null, source: sourceOf(p), verified_at: now };
    }),
    explanation: out.explanation.filter((e) => keep.has(e.passage)).map((e) => ({ text: e.text, source_id: e.passage })),
    conditions: out.conditions.filter((e) => keep.has(e.passage)).map((e) => ({ text: e.text, source_id: e.passage })),
    related: out.related.filter((id) => !keep.has(id)).map((id) => {
      const p = byLabel.get(id);
      return { title: p.kind === "qa" ? p.question : `Ruling ${p.number} · ${p.section}`, source: sourceOf(p) };
    }),
    disclaimer: DISCLAIMER
  };
  trace.cited = [...keep].map((l) => byLabel.get(l).pid);
  return { result, trace };
}

/*
  Option 1 (no AI): show the closest official answers verbatim, each re-verified on its live page.
  Abstain when nothing is close enough.
*/
async function retrievalOnly(env, question, lang, candidates, trace) {
  const min = Number(env.MIN_RELEVANCE || 0.6);
  const passing = candidates.filter((c) => c.found >= min);
  const best = passing.length ? passing[0].score : 0;
  // Main answers: only those nearly as strong as the best match. Weaker ones become "related".
  const strong = passing.filter((c) => c.score >= best - 0.12).slice(0, 3);
  trace.threshold = min;
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
        original_question: c.kind === "qa" ? c.question : null,
        source: sourceOf(c),
        match: c.found >= 0.99 ? "close" : "partial",
        verified_at: now
      })),
      related: related.map((c) => ({ title: c.kind === "qa" ? c.question : `Ruling ${c.number} · ${c.section}`, source: sourceOf(c) })),
      note: "These are the closest published answers of Ayatollah al-Sistani to your question. Please check that the official question matches your situation before acting on it.",
      disclaimer: DISCLAIMER
    },
    trace
  };
}
