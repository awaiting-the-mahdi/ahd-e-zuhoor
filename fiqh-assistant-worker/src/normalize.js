import { GLOSSARY, ROMAN_URDU_MARKERS } from "./glossary.js";
import { normLoose } from "./text.js";

/** Detect the language of the question: "en", "ar", "ur" or "roman-ur". */
export function detectLanguage(q) {
  const s = String(q);
  const arabicScript = (s.match(/[؀-ۿ]/g) || []).length;
  const latin = (s.match(/[a-z]/gi) || []).length;
  if (arabicScript > latin) {
    // Letters used in Urdu (and Persian) but not in Arabic.
    return /[ٹڈڑںےۓھگکیہۃ]/.test(s) ? "ur" : "ar";
  }
  const words = normLoose(s).split(/[^a-z']+/).filter(Boolean);
  const hits = words.filter((w) => ROMAN_URDU_MARKERS.includes(w)).length;
  return hits >= 2 || (words.length && hits / words.length > 0.2) ? "roman-ur" : "en";
}

/** Find glossary groups mentioned in the question and return their search terms. */
export function expandTerms(q) {
  const loose = " " + normLoose(q).replace(/[^\p{L}\p{N}' -]+/gu, " ") + " ";
  const out = { en: [], ar: [], ur: [], matched: [] };
  for (const g of GLOSSARY) {
    const hit = g.match.find((m) => {
      const lm = normLoose(m);
      return /[a-z]/.test(lm) ? loose.includes(" " + lm + " ") : loose.includes(lm);
    });
    if (hit) {
      out.matched.push(hit);
      for (const k of ["en", "ar", "ur"]) for (const t of g[k]) if (!out[k].includes(t)) out[k].push(t);
    }
  }
  return out;
}

/** Content words used for lexical scoring of candidate passages. */
const STOP = new Set("a an the is are was were be been of to in on for at by with and or not no do does did can could should would may might must if it its this that these those what which who whom how why when where i me my we our you your he she they them his her their there here from as about into than then so such also any some all very just only".split(" "));
export function contentWords(q) {
  return [...new Set(normLoose(q).split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 2 && !STOP.has(w)))];
}
