/*
  Retrieval-only mode (no AI): decide how closely each official passage matches the question.
  The question is broken into "concepts": each glossary topic it mentions (with all its spellings
  and translations) and each remaining meaningful word. A passage's relevance is the share of
  concepts it contains. Ruling words such as "halal", "allowed" or "break" are ignored because
  answers phrase them differently.
*/
import { GLOSSARY, ROMAN_URDU_MARKERS } from "./glossary.js";
import { normLoose } from "./text.js";

const GENERIC = new Set([
  // English question and ruling words
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "am", "of", "to", "in", "on", "for", "at", "by", "with", "and", "or", "not", "no", "do", "does", "did", "can", "could", "should", "would", "may", "might", "must", "if", "it", "its", "this", "that", "these", "those", "what", "which", "who", "how", "why", "when", "where", "i", "me", "my", "we", "our", "you", "your", "he", "she", "they", "them", "his", "her", "their", "there", "from", "as", "about", "into", "than", "then", "so", "any", "some", "all", "very", "just", "also", "get", "got", "have", "has", "had", "will", "one", "someone", "person", "people", "thing", "things",
  "ruling", "rule", "rulings", "fatwa", "hukm", "permissible", "permitted", "allowed", "allow", "allowe", "halal", "haram", "jaiz", "najaiz", "forbidden", "prohibited", "obligatory", "wajib", "mustahab", "makruh", "valid", "invalid", "break", "breaks", "broken", "invalidate", "invalidates", "okay", "ok", "sistani", "ayatollah", "islam", "islamic", "muslim", "muslims", "shia", "please", "tell", "know", "want",
  // Arabic and Urdu function and ruling words
  "هل", "ما", "ماذا", "في", "من", "على", "عن", "الى", "إلى", "او", "أو", "يجوز", "جائز", "حكم", "حرام", "حلال", "يبطل", "تبطل", "هو", "هي",
  "کیا", "ہے", "ہیں", "میں", "سے", "کا", "کی", "کے", "کو", "اور", "یا", "جائز", "ناجائز", "حکم", "حرام", "حلال", "ٹوٹ", "جاتا", "جاتی", "سکتے", "سکتا", "سکتی", "ہو", "تو", "اگر"
]);
for (const w of ROMAN_URDU_MARKERS) GENERIC.add(w);
["toot", "tootna", "tootta", "jata", "jati", "khana", "peena", "karna", "hona", "wala", "wali", "kia", "ky", "to", "me", "main", "while", "during", "after", "before", "wearing", "using", "use", "doing", "something", "anything"].forEach((w) => GENERIC.add(w));
for (const w of [...GENERIC]) GENERIC.add(normLoose(w));

function words(s) {
  return normLoose(s).split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 2 && !GENERIC.has(w));
}

/** Concepts in the question: glossary topics (with all alternatives) plus other meaningful words. */
export function concepts(question) {
  const loose = " " + normLoose(question).replace(/[^\p{L}\p{N}' -]+/gu, " ") + " ";
  const out = [];
  const used = new Set();
  for (const g of GLOSSARY) {
    const alts = [...g.match, ...g.en, ...g.ar, ...g.ur].map(normLoose);
    const hit = g.match.map(normLoose).find((m) => (/[a-z]/.test(m) ? loose.includes(" " + m + " ") : loose.includes(m)));
    if (hit) {
      out.push({ label: g.en[0], alts: [...new Set(alts)] });
      hit.split(" ").forEach((w) => used.add(w));
      [...g.match, ...g.en, ...g.ar, ...g.ur].forEach((m) => normLoose(m).split(" ").forEach((w) => used.add(w)));
    }
  }
  for (const w of words(question)) {
    if (used.has(w)) continue;
    used.add(w);
    // simple English stemming: plurals and -ing
    const alts = [w];
    if (/[a-z]/.test(w)) {
      if (w.endsWith("ies")) alts.push(w.slice(0, -3) + "y");
      else if (w.endsWith("s") && w.length > 4) alts.push(w.slice(0, -1));
      if (w.endsWith("ing") && w.length > 5) alts.push(w.slice(0, -3));
    }
    out.push({ label: w, alts });
  }
  return out;
}

/* Words that reveal what kind of answer is wanted. Used only to rank, never to pass the threshold. */
const INTENTS = [
  { triggers: ["break", "breaks", "broken", "invalidate", "invalidates", "invalid", "toot", "tootna", "tootta", "batil", "يبطل", "تبطل", "مبطل", "ٹوٹ", "باطل"], targets: ["invalidat", "nullif", "break", "يبطل", "مبطلات", "باطل"] },
  { triggers: ["halal", "haram", "allowed", "permissible", "permitted", "jaiz", "najaiz", "forbidden", "حلال", "حرام", "يجوز", "جائز", "ناجائز"], targets: ["permissible", "lawful", "unlawful", "haram", "halal", "allowed", "forbidden", "prohibited", "يجوز", "حرام", "حلال", "جائز"] },
  { triggers: ["wajib", "obligatory", "must", "farz", "farz", "واجب", "فرض"], targets: ["obligatory", "wajib", "واجب"] },
  { triggers: ["najis", "napak", "impure", "pak", "paak", "pure", "tahir", "نجس", "طاهر", "پاک", "ناپاک"], targets: ["impur", "najis", "pure", "tahir", "نجس", "طاهر", "پاک"] }
];
export function intents(question) {
  const loose = " " + normLoose(question).replace(/[^\p{L}\p{N}' -]+/gu, " ") + " ";
  return INTENTS.filter((it) => it.triggers.some((t) => { const n = normLoose(t); return /[a-z]/.test(n) ? loose.includes(" " + n + " ") : loose.includes(n); })).flatMap((it) => it.targets.map(normLoose));
}

function has(hay, alt) {
  return /[a-z]/.test(alt) ? new RegExp("(^|[^a-z])" + alt.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "[a-z]{0,3}($|[^a-z])").test(hay) : hay.includes(alt);
}

/**
 * found: share of the question's concepts present in the passage (0..1), used for the threshold.
 * score: found plus a ranking bonus when the concepts also appear in the official question itself.
 */
export function relevance(c, cs, wanted = []) {
  if (!cs.length) return { found: 0, score: 0 };
  const hay = normLoose((c.question || "") + " " + (c.section || "") + " " + c.text);
  const qhay = normLoose(c.question || c.section || "");
  const ahay = normLoose(c.text);
  let found = 0, inQ = 0, inA = 0;
  for (const k of cs) {
    if (k.alts.some((a) => has(hay, a))) found++;
    if (k.alts.some((a) => has(qhay, a))) inQ++;
    if (k.alts.some((a) => has(ahay, a))) inA++;
  }
  const f = found / cs.length;
  // The ruling itself (the answer text) naming the topic matters most.
  let bonus = 0.25 * (inA / cs.length) + 0.12 * (inQ / cs.length);
  if (f >= 0.99 && wanted.length) {
    const title = normLoose(c.section || c.topic || "");
    if (wanted.some((w) => title.includes(w))) bonus += 0.2;
    else if (wanted.some((w) => qhay.includes(w))) bonus += 0.12;
    else if (wanted.some((w) => hay.includes(w))) bonus += 0.06;
  }
  bonus += 0.05 * Math.min(1, 350 / Math.max(80, c.text.length)); // shorter, more direct passages first
  return { found: f, score: f + bonus };
}

/** Search terms for sistani.org when no AI is used. */
export function searchTermsFromConcepts(cs, lang) {
  const en = [], ar = [], ur = [];
  for (const k of cs) {
    const g = GLOSSARY.find((g) => g.en[0] === k.label);
    if (g) { en.push(...g.en); ar.push(...g.ar); ur.push(...g.ur); continue; }
    const w = k.label;
    if (/[a-z]/.test(w)) en.push(w);
    else if (lang === "ar") ar.push(w);
    else ur.push(w);
  }
  const u = (a) => [...new Set(a)];
  // Specific (longer) plain words first after glossary terms.
  return { en: u(en).slice(0, 5), ar: u(ar).slice(0, 2), ur: u(ur).slice(0, 2) };
}
