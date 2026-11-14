/* The full question → answer pipeline. Pure logic, used by the Worker route and by tests. */
import { planQuery, retrieve } from "./retrieve.js";
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
  trace.candidates = candidates.map((c) => ({ pid: c.pid, score: c.score }));
  if (!candidates.length) return { result: abstain(question, lang, "no candidate passages found"), trace };

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
