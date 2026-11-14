/*
  Evidence-grounded AI answers ("Zahra").
  The model sees only the official passages retrieved from sistani.org, split into numbered
  sentences (P1.1, P1.2 …). It chooses the official sentences by number and writes a friendly
  explanation. The official quote is then assembled by the server from the original text, so it
  is always word-for-word. Code checks every reference before anything is shown.
*/
import { chat } from "./ai.js";

export const ABSTAIN_MESSAGE = "We could not locate a sufficiently relevant published ruling. Please consult the Office of Ayatollah Sistani.";

export const ANSWER_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["status", "reply", "rulings", "conditions", "clarifying_questions", "related", "reason"],
  properties: {
    status: { type: "string", enum: ["answer", "clarify", "abstain"] },
    reply: { type: "string" },
    rulings: {
      type: "array",
      items: { type: "object", additionalProperties: false, required: ["sentences"], properties: { sentences: { type: "array", items: { type: "string" } } } }
    },
    conditions: {
      type: "array",
      items: { type: "object", additionalProperties: false, required: ["text", "passage"], properties: { text: { type: "string" }, passage: { type: "string" } } }
    },
    clarifying_questions: { type: "array", items: { type: "string" } },
    related: { type: "array", items: { type: "string" } },
    reason: { type: "string" }
  }
};

const LANG_NAME = { en: "English", ar: "Arabic", ur: "Urdu (in Urdu script)", "roman-ur": "Roman Urdu (Urdu written in English letters)", other: "the user's language" };

function systemPrompt(lang) {
  return `You are Zahra, a warm and clear assistant on the AHD-E-ZUHOOR academy website. You help people find and understand the PUBLISHED rulings of Ayatollah al-Sayyid Ali al-Sistani.
You are given the user's question (with any earlier conversation) and numbered PASSAGES retrieved from sistani.org. Each passage's text is split into numbered sentences like [P1.3].

ABSOLUTE RULES
1. Use ONLY the PASSAGES. Never use your own knowledge of fiqh, never guess, never add a ruling the passages do not state, never issue a fatwa.
2. A passage counts only if it DIRECTLY addresses the user's question. A passage about a similar but different case, or one that only mentions the topic as an example, does not count.
3. "rulings": for each passage you rely on, list the sentence numbers that state the ruling (e.g. ["P2.1","P2.2"]). All sentence numbers in one item must come from the same passage. Include the sentences that carry conditions and exceptions.
4. "reply": a friendly, natural answer to the user written in ${LANG_NAME[lang] || "English"}, like a helpful teacher. Explain in simple words what the quoted ruling says. Put the passage label in square brackets after each statement it supports, e.g. "Sleep invalidates wudu [P1].". Only cite passages that you listed in "rulings". Keep it short (2-6 sentences). Never write URLs or ruling numbers yourself.
5. Keep every condition, exception and qualification ("if", "unless", "as long as", "based on obligatory precaution"). Never present a conditional ruling as absolute.
6. Never merge rulings from different passages into a new ruling. You may mention two passages one after the other, each with its own citation.
7. "conditions": the conditions and exceptions stated in the cited passages, in ${LANG_NAME[lang] || "English"}, each naming its passage (e.g. "P1"). Empty if none.
8. If the ruling depends on personal facts the user has not given, set status "clarify", write a short friendly "reply" explaining why, and ask 1-3 short "clarifying_questions" in the user's language. Do not guess.
9. If no passage directly answers the question, set status "abstain", leave rulings empty, and put the reason in "reason". The "reply" may then be "".
10. "related": labels of other passages that are useful to read but are not the main answer.`;
}

function splitSentences(text) {
  const out = [];
  for (const block of String(text).split(/\n+/)) {
    const b = block.trim();
    if (!b) continue;
    for (const s of b.split(/(?<=[.!?؟۔])\s+(?=\S)/)) if (s.trim()) out.push(s.trim());
  }
  return out;
}

export function buildPassages(candidates) {
  return candidates.map((c, i) => {
    const label = "P" + (i + 1);
    const sentences = splitSentences(c.text).map((t, k) => ({ id: label + "." + (k + 1), text: t }));
    return { ...c, label, sentences };
  });
}

function passagesForPrompt(ps, maxChars = 2400) {
  return ps.map((p) => {
    const src = p.kind === "qa" ? `Official Q&A${p.topic ? " · " + p.topic : ""}` : p.kind === "bookqa" ? `${p.book} · ${p.section}` : `Islamic Laws · ${p.section}`;
    let used = 0;
    const lines = [];
    for (const s of p.sentences) {
      if (used > maxChars) { lines.push("[…]"); break; }
      lines.push(`[${s.id}] ${s.text}`);
      used += s.text.length;
    }
    return `${p.label} [${src}]` + (p.question ? `\nOfficial question: ${p.question}` : "") + `\nText:\n${lines.join("\n")}`;
  }).join("\n\n---\n\n");
}

function historyText(history) {
  return (history || []).slice(-6).map((h) => (h.role === "user" ? "User: " : "Zahra: ") + String(h.text || "").slice(0, 400)).join("\n");
}

export async function generate(env, question, context, passages, lang, history = []) {
  const user = (history.length ? `EARLIER CONVERSATION:\n${historyText(history)}\n\n` : "") +
    `USER QUESTION:\n${question}${context ? "\n\nADDITIONAL DETAILS FROM THE USER:\n" + context : ""}\n\nPASSAGES:\n${passagesForPrompt(passages)}`;
  return chat(env, { system: systemPrompt(lang), user, schema: ANSWER_SCHEMA, name: "grounded_answer", maxTokens: 1400 });
}

const URL_RE = /(https?:\/\/|www\.|sistani\.org|\.com\b|\.org\b)/i;

/** Code-level verification of the model output. Returns { ok, reason }. */
export function verifyAnswer(out, passages) {
  const byLabel = new Map(passages.map((p) => [p.label, p]));
  const sentence = new Map();
  for (const p of passages) for (const s of p.sentences) sentence.set(s.id, p.label);
  if (!out || typeof out !== "object") return { ok: false, reason: "no output" };
  const arr = (x) => (Array.isArray(x) ? x : []);
  if (out.status === "abstain") return { ok: true };
  if (out.status === "clarify") {
    if (!arr(out.clarifying_questions).length) return { ok: false, reason: "clarify without questions" };
    if ([out.reply, ...arr(out.clarifying_questions)].some((t) => URL_RE.test(String(t || "")))) return { ok: false, reason: "url in clarification" };
    return { ok: true };
  }
  if (out.status !== "answer") return { ok: false, reason: "unknown status" };
  const rulings = arr(out.rulings);
  if (!rulings.length) return { ok: false, reason: "answer without an official ruling" };
  const cited = new Set();
  for (const r of rulings) {
    const ids = arr(r.sentences);
    if (!ids.length) return { ok: false, reason: "ruling without sentences" };
    const owners = new Set(ids.map((id) => sentence.get(id)));
    if (owners.has(undefined)) return { ok: false, reason: "unknown sentence id" };
    if (owners.size !== 1) return { ok: false, reason: "one ruling mixes passages" };
    cited.add([...owners][0]);
  }
  const reply = String(out.reply || "").trim();
  if (!reply) return { ok: false, reason: "empty reply" };
  if (URL_RE.test(reply)) return { ok: false, reason: "url written by the model" };
  const marks = [...reply.matchAll(/\[(P\d+)(?:\.\d+)?\]/g)].map((m) => m[1]);
  if (!marks.length) return { ok: false, reason: "reply cites no passage" };
  for (const m of marks) if (!cited.has(m)) return { ok: false, reason: `reply cites ${m} which has no quoted ruling` };
  for (const c of arr(out.conditions)) {
    if (!cited.has(c.passage)) return { ok: false, reason: `condition cites ${c.passage} which has no quoted ruling` };
    if (URL_RE.test(String(c.text || ""))) return { ok: false, reason: "url in condition" };
  }
  for (const id of arr(out.related)) if (!byLabel.has(id)) return { ok: false, reason: `related cites unknown ${id}` };
  return { ok: true };
}

/** The official quote, assembled from the original text by sentence numbers (always verbatim). */
export function quoteFor(passage, ids) {
  const want = new Set(ids);
  return passage.sentences.filter((s) => want.has(s.id)).map((s) => s.text).join(" ");
}

/** Build the public source description from our own record (never from the model). */
export function sourceOf(p) {
  if (p.kind === "bookqa") return { type: p.book || "Book", number: p.number, label: `${p.section} · Q&A ${p.number}`, title: p.question, url: p.url, lang: p.lang };
  return p.kind === "qa"
    ? { type: "Official Q&A", number: p.number, label: `Question ${p.number}${p.topic ? " · " + p.topic : ""}`, title: p.question, url: p.url, lang: p.lang }
    : { type: p.book || "Islamic Laws", number: p.number, label: `Ruling ${p.number} · ${p.section}`, title: p.section, url: p.url, lang: p.lang };
}
