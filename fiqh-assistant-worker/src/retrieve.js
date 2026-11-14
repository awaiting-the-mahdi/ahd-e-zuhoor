/*
  Retrieval: turn the question into search terms, search sistani.org live, collect
  candidate passages (Q&A answers and numbered rulings), and rank them.
*/
import { detectLanguage } from "./normalize.js";
import { concepts, relevance, searchTermsFromConcepts, intents } from "./match.js";
import { siteSearch, parseQA, parseBookResults, parseRulings, getPage, bookToc, TOC_BOOKS } from "./sistani.js";
import { chatJSON } from "./openai.js";
import { normLoose } from "./text.js";

const PLAN_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["language", "english_question", "keywords_en", "keywords_ar", "keywords_ur"],
  properties: {
    language: { type: "string", enum: ["en", "ar", "ur", "roman-ur", "other"] },
    english_question: { type: "string" },
    keywords_en: { type: "array", items: { type: "string" } },
    keywords_ar: { type: "array", items: { type: "string" } },
    keywords_ur: { type: "array", items: { type: "string" } }
  }
};

const PLAN_SYSTEM = `You prepare search terms for the official website of Ayatollah al-Sistani (sistani.org).
You must NOT answer the question or state any ruling. Only produce search terms.
The website search is literal: it finds pages containing the exact word or short phrase.
Return:
- language: the language the user wrote in (roman-ur = Urdu written in Latin letters).
- english_question: a faithful English translation of the question, adding nothing.
- keywords_en: up to 4 short English search terms (1-2 words each) as they would appear on sistani.org, most specific first (e.g. "wudu", "ablution", "shrimp", "traveller").
- keywords_ar: up to 2 Arabic search terms.
- keywords_ur: up to 2 Urdu search terms.`;

export function aiEnabled(env) {
  return env.MODE === "ai" && !!env.OPENAI_API_KEY;
}

export async function planQuery(env, question) {
  const lang = detectLanguage(question);
  const cs = concepts(question);
  let plan = { language: lang, english_question: question, keywords_en: [], keywords_ar: [], keywords_ur: [], concepts: cs, intents: intents(question) };
  if (aiEnabled(env)) try {
    const { data } = await chatJSON(env, { system: PLAN_SYSTEM, user: question, schema: PLAN_SCHEMA, name: "search_plan", maxTokens: 400 });
    plan = { ...plan, ...data, language: lang === "en" && data.language !== "en" ? data.language : lang };
  } catch (e) {
    plan.planError = String(e.message || e);
  }
  const uniq = (a) => [...new Set(a.map((s) => String(s).trim()).filter((s) => s.length >= 3))];
  const base = searchTermsFromConcepts(cs, lang);
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
  for (const t of plan.terms.en.slice(0, 4)) jobs.push(["en", "qa", t]);
  for (const t of plan.terms.en.slice(0, 4)) jobs.push(["en", "book", t]);
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
  log.push({ part: "sections", chosen: sections.slice(0, 6).map((s) => s.sectionId + ":" + s.section) });
  const secPages = await Promise.allSettled(sections.slice(0, 6).map((s) => getPage(s.url)));
  secPages.forEach((r, i) => {
    if (r.status !== "fulfilled") { log.push({ part: "section", url: sections[i].url, error: String(r.reason?.message || r.reason) }); return; }
    for (const rl of parseRulings(r.value, sections[i])) {
      const lt = normLoose(rl.text);
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
