/* Text helpers: HTML to plain text, and normalisation used for matching and verification. */

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", "#39": "'" };

export function decodeEntities(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+\d*);/gi, (m, e) => {
    if (e[0] === "#") {
      const code = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

/** Turn an HTML fragment into plain text, keeping line breaks from <br> and block tags. */
export function stripTags(html) {
  const t = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h\d)>/gi, "\n")
    .replace(/<[^>]+>/g, "");
  return decodeEntities(t)
    .split("\n")
    .map((l) => l.replace(/[ \t ]+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Normalisation for verbatim checks: identical wording is required, but differences in
 * whitespace, quote marks, dashes and invisible characters are ignored.
 */
export function normStrict(s) {
  return String(s)
    .normalize("NFC")
    .replace(/[​-‏‪-‮⁠﻿ـ]/g, "") // zero-width marks, tatweel
    .replace(/[‘’‛′`]/g, "'")
    .replace(/[“”‟″]/g, '"')
    .replace(/[‐-―−]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

/** Loose normalisation for keyword matching: lower case, no diacritics or transliteration marks. */
export function normLoose(s) {
  return normStrict(s)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")       // Latin diacritics (ḍ → d, ū → u)
    .replace(/[ً-ٰٟ]/g, "") // Arabic harakat
    .replace(/[ʿʾ'’‘]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .toLowerCase();
}
