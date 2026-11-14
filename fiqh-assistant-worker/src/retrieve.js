/*
  Retrieval: turn the question into search terms, search sistani.org live, collect
  candidate passages (Q&A answers and numbered rulings), and rank them.
*/
import { detectLanguage } from "./normalize.js";
import { concepts, relevance, searchTermsFromConcepts, intents } from "./match.js";
import { siteSearch, parseQA, parseBookResults, parseRulings, getPage, bookToc, TOC_BOOKS } from "./sistani.js";
import { chat, aiAvailable } from "./ai.js";
import { normLoose } from "./text.js";

const PLAN_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["kind", "language", "standalone_question", "english_question", "keywords_en", "keywords_ar", "keywords_ur", "smalltalk_reply"],
  properties: {
    kind: { type: "string", enum: ["fiqh", "smalltalk", "off_topic"] },
    language: { type: "string", enum: ["en", "ar", "ur", "roman-ur", "other"] },
    standalone_question: { type: "string" },
    english_question: { type: "string" },
    keywords_en: { type: "array", items: { type: "string" } },
    keywords_ar: { type: "array", items: { type: "string" } },
    keywords_ur: { type: "array", items: { type: "string" } },
    smalltalk_reply: { type: "string" }
  }
};

const PLAN_SYSTEM = `You are the first step of "Zahra", a friendly assistant that finds the published rulings of Ayatollah al-Sistani on sistani.org.
You must NOT answer fiqh questions or state any ruling yourself. You only classify the message and prepare search terms.
The website search is literal: it finds pages containing the exact word or short phrase.

Return:
- kind: "fiqh" for any question about Islamic rulings or practice (even if vague); "smalltalk" for greetings, thanks, "who are you", etc.; "off_topic" for anything unrelated to Islamic rulings.
- language: the language of the user's latest message (roman-ur = Urdu written in Latin letters).
- standalone_question: the user's latest message rewritten as a complete question, using the earlier conversation to resolve words like "it", "that" or "and for ghusl?". Keep the user's language. Add nothing else.
- english_question: a faithful English translation of standalone_question.
- keywords_en: up to 4 short English search terms (1-2 words each) as they would appear on sistani.org, most specific first (e.g. "wudu", "ablution", "shrimp", "smoking", "traveller").
- keywords_ar: up to 2 Arabic search terms. keywords_ur: up to 2 Urdu search terms.
- smalltalk_reply: only for smalltalk or off_topic: one or two warm sentences in the user's language. For off_topic, gently say you can only help find Ayatollah Sistani's published rulings. Otherwise "".`;

export function aiEnabled(env) {
  return env.MODE === "ai" && aiAvailable(env);
}

function historyText(history) {
  return (history || []).slice(-6).map((h) => (h.role === "user" ? "User: " : "Zahra: ") + String(h.text || "").slice(0, 400)).join("\n");
}

export async function planQuery(env, question, history = []) {
  const lang = detectLanguage(question);
  let plan = { kind: "fiqh", language: lang, standalone_question: question, english_question: question, keywords_en: [], keywords_ar: [], keywords_ur: [], smalltalk_reply: "" };
  if (aiEnabled(env)) try {
    const user = (history.length ? "EARLIER CONVERSATION:\n" + historyText(history) + "\n\n" : "") + "LATEST MESSAGE:\n" + question;
    const { data } = await chat(env, { system: PLAN_SYSTEM, user, schema: PLAN_SCHEMA, name: "search_plan", maxTokens: 450 });
    plan = { ...plan, ...data, language: lang !== "en" ? lang : (data.language || lang) };
    plan.aiPlanned = true;
  } catch (e) {
    plan.planError = String(e.message || e);
  }
  const basis = [question, plan.standalone_question, plan.english_question].filter(Boolean).join("\n");
  const cs = concepts(basis);
  plan.concepts = cs;
  plan.intents = intents(basis);
  const uniq = (a) => [...new Set((a || []).map((s) => String(s).trim()).filter((s) => s.length >= 3))];
  const base = searchTermsFromConcepts(cs, plan.language);
  plan.terms = {
    en: uniq([...base.en, ...plan.keywords_en]).slice(0, 5),
    ar: uniq([...base.ar, ...plan.keywords_ar]).slice(0, 2),
    ur: uniq([...base.ur, ...plan.keywords_ur]).slice(0, 2)
  };
  plan.glossaryMatches = cs.map((c) => c.label);
  return plan;
}

export async function retrieve(env, question, plan) {
  const log = [];
  const jobs = [];
  for (const t of plan.terms.en.slice(0, 3)) jobs.push(["en", "qa", t]);
  for (const t of plan.terms.en.slice(0, 3)) jobs.push(["en", "book", t]);
  if (plan.language === "ar") for (const t of plan.terms.ar) jobs.push(["ar", "qa", t]);
  if (plan.language === "ur" || plan.language === "roman-ur") for (const t of plan.terms.ur) jobs.push(["ur", "qa", t]);

  const [results, tocs] = await Promise.all([
    Promise.allSettled(jobs.map(([l, p, t]) => siteSearch(l, p, t))),
    Promise.allSettled(Object.keys(TOC_BOOKS).map((id) => bookToc(id)))
  ]);
  const byPid = new Map();
  const sections = [];
  results.forEach((r, i) => {
    const [l, p, t] = jobs[i];
    if (r.status !== "fulfilled") { log.push({ lang: l, part: p, term: t, error: String(r.reason?.message || r.reason) }); return; }
    if (p === "qa") {
      const items = parseQA(r.value, l);
      log.push({ lang: l, part: p, term: t, hits: items.length });
      for (const it of items) if (!byPid.has(it.pid)) byPid.set(it.pid, it);
    } else {
      const secs = parseBookResults(r.value);
      log.push({ lang: l, part: p, term: t, hits: secs.length });
      for (const s of secs) if (!sections.some((x) => x.url === s.url)) sections.push(s);
    }
  });


  // Book sections: prefer sections whose title names a concept, fetch the top few,
  // and keep the rulings that mention the search terms.
  const cs = plan.concepts || [];
  const titled = (s) => cs.filter((k) => k.alts.some((a) => normLoose(s.section).includes(a))).length;
  const intentTitle = (s) => (plan.intents || []).some((w) => normLoose(s.section).includes(w)) ? 1 : 0;
  // Sections whose titles in the books' tables of contents name the question's topics.
  tocs.forEach((t) => {
    if (t.status !== "fulfilled") { log.push({ part: "toc", error: String(t.reason?.message || t.reason) }); return; }
    for (const s of t.value) if (titled(s) && !sections.some((x) => x.url === s.url)) sections.push(s);
  });
  const rank = (s) => titled(s) * 2 + intentTitle(s);
  sections.sort((a, b) => rank(b) - rank(a));
  log.push({ part: "sections", chosen: sections.slice(0, 4).map((s) => s.sectionId + ":" + s.section) });
  const secPages = await Promise.allSettled(sections.slice(0, 4).map((s) => getPage(s.url)));
  secPages.forEach((r, i) => {
    if (r.status !== "fulfilled") { log.push({ part: "section", url: sections[i].url, error: String(r.reason?.message || r.reason) }); return; }
    for (const rl of parseRulings(r.value, sections[i])) {
      const lt = normLoose((rl.question || "") + " " + rl.text);
      if (plan.terms.en.some((t) => lt.includes(normLoose(t)))) byPid.set(rl.pid, rl);
    }
  });

  const ranked = [...byPid.values()]
    .map((c) => { const r = relevance(c, plan.concepts, plan.intents); return { ...c, found: Math.round(r.found * 1000) / 1000, score: Math.round(r.score * 1000) / 1000 }; })
    .filter((c) => c.found > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, Number(env.MAX_PASSAGES || 10));
  return { candidates: ranked, searches: log };
}
