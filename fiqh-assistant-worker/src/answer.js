/*
  Evidence-grounded answering with strict verification.
  The model only sees retrieved official passages. Its output is checked in code:
  quotes must be verbatim, every statement must cite exactly one retrieved passage,
  and sources, URLs and numbers are always taken from our own records, never from the model.
*/
import { chatJSON } from "./openai.js";
import { normStrict } from "./text.js";

export const ABSTAIN_MESSAGE = "We could not locate a sufficiently relevant published ruling. Please consult the Office of Ayatollah Sistani.";

const ITEM = {
  type: "object", additionalProperties: false, required: ["text", "passage"],
  properties: { text: { type: "string" }, passage: { type: "string" } }
};
export const ANSWER_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["status", "question_restated", "clarifying_questions", "rulings", "explanation", "conditions", "related", "reason"],
  properties: {
    status: { type: "string", enum: ["answer", "abstain", "clarify"] },
    question_restated: { type: "string" },
    clarifying_questions: { type: "array", items: { type: "string" } },
    rulings: {
      type: "array",
      items: { type: "object", additionalProperties: false, required: ["passage", "quote"], properties: { passage: { type: "string" }, quote: { type: "string" } } }
    },
    explanation: { type: "array", items: ITEM },
    conditions: { type: "array", items: ITEM },
    related: { type: "array", items: { type: "string" } },
    reason: { type: "string" }
  }
};

const LANG_NAME = { en: "English", ar: "Arabic", ur: "Urdu", "roman-ur": "Roman Urdu (Urdu in Latin letters)", other: "the user's language" };

function systemPrompt(lang) {
  return `You are a careful research assistant for the published rulings of Ayatollah al-Sayyid Ali al-Sistani.
You will be given a user question and numbered PASSAGES retrieved from the official website sistani.org.

ABSOLUTE RULES
1. Use ONLY the PASSAGES. Never use your own knowledge of fiqh, never infer a ruling the passages do not state, and never issue a fatwa.
2. "rulings": copy the relevant sentence(s) EXACTLY, character for character, from a passage's text. Do not paraphrase, shorten inside a sentence, translate, or fix spelling. Each item names one passage id (e.g. "P2").
3. Only use a passage if it directly addresses the user's question. A passage on a similar but different case is NOT enough.
4. Preserve every condition, exception, qualification ("based on precaution", "if", "unless", "as long as") that the quoted passage contains.
5. Never combine rulings from different passages into a new ruling. Each explanation and condition item must explain exactly ONE passage, named in "passage".
6. If the answer depends on personal facts the user did not give (e.g. traveller or resident, gender, which school year, amounts, whether something touched an impurity), set status "clarify" and ask short clarifying_questions instead of assuming.
7. If no passage directly answers the question, set status "abstain" and explain why in "reason".
8. Never write URLs, ruling numbers or question numbers yourself; the system adds them.
9. "explanation" is a simple-language explanation of the quoted ruling(s) for the user, written in ${LANG_NAME[lang] || "English"}. Do not add anything the passage does not say.
10. "conditions" lists the conditions and exceptions stated in the passages (empty if none).
11. "related" lists other passage ids that are relevant but not the main answer (may be empty).
12. question_restated: restate the user's question briefly in ${LANG_NAME[lang] || "English"}.`;
}

export function buildPassages(candidates) {
  return candidates.map((c, i) => ({ ...c, label: "P" + (i + 1) }));
}

function passagesForPrompt(ps) {
  return ps.map((p) => {
    const head = p.kind === "qa" ? `${p.label} [Official Q&A${p.topic ? " · " + p.topic : ""}]\nQuestion: ${p.question}\nAnswer (text): ${p.text}` : `${p.label} [Islamic Laws · ${p.section}]\nText: ${p.text}`;
    return head;
  }).join("\n\n---\n\n");
}

export async function generate(env, question, context, passages, lang) {
  const user = `USER QUESTION:\n${question}${context ? "\n\nADDITIONAL DETAILS FROM THE USER:\n" + context : ""}\n\nPASSAGES:\n${passagesForPrompt(passages)}`;
  return chatJSON(env, { system: systemPrompt(lang), user, schema: ANSWER_SCHEMA, name: "grounded_answer", maxTokens: 1800 });
}

const URL_RE = /(https?:\/\/|www\.|sistani\.org|\.com\b|\.org\b)/i;

/** Code-level verification of the model output. Returns { ok, reason }. */
export function verifyAnswer(out, passages) {
  const byLabel = new Map(passages.map((p) => [p.label, p]));
  if (out.status === "abstain") return { ok: true };
  if (out.status === "clarify") {
    if (!out.clarifying_questions.length) return { ok: false, reason: "clarify without questions" };
    if (out.clarifying_questions.some((q) => URL_RE.test(q))) return { ok: false, reason: "url in clarifying question" };
    return { ok: true };
  }
  if (!out.rulings.length) return { ok: false, reason: "answer without an official quote" };
  for (const r of out.rulings) {
    const p = byLabel.get(r.passage);
    if (!p) return { ok: false, reason: `unknown passage ${r.passage}` };
    const q = normStrict(r.quote);
    if (q.length < 15) return { ok: false, reason: "quote too short" };
    // Q&A rulings must come from the official answer, not from the question.
    if (!normStrict(p.text).includes(q)) return { ok: false, reason: `quote not verbatim in ${r.passage}` };
  }
  const cited = new Set(out.rulings.map((r) => r.passage));
  for (const list of [out.explanation, out.conditions]) {
    for (const it of list) {
      if (!byLabel.has(it.passage)) return { ok: false, reason: `explanation cites unknown ${it.passage}` };
      if (!cited.has(it.passage)) return { ok: false, reason: `explanation cites ${it.passage} which has no quoted ruling` };
      if (URL_RE.test(it.text)) return { ok: false, reason: "url written by the model" };
    }
  }
  if (!out.explanation.length) return { ok: false, reason: "no explanation" };
  for (const id of out.related) if (!byLabel.has(id)) return { ok: false, reason: `related cites unknown ${id}` };
  return { ok: true };
}

/** Build the public source description from our own record (never from the model). */
export function sourceOf(p) {
  return p.kind === "qa"
    ? { type: "Official Q&A", number: p.number, label: `Question ${p.number}${p.topic ? " · " + p.topic : ""}`, title: p.question, url: p.url, lang: p.lang }
    : { type: "Islamic Laws", number: p.number, label: `Ruling ${p.number} · ${p.section}`, title: p.section, url: p.url, lang: p.lang };
}
