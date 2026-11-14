/*
  Live retrieval from the official website of the Office of Ayatollah al-Sistani.
  Nothing is stored permanently: pages are fetched per question (with a short cache to
  avoid repeating identical requests) and only the relevant passages are used.
*/
import { stripTags, normStrict } from "./text.js";

export const BASE = "https://www.sistani.org";
export const SITE_LANG = { en: "english", ar: "arabic", ur: "urdu" };
const UA = "FiqhResearchAssistant/1.0";
const CACHE_SECONDS = 6 * 3600;

async function cached(key, producer) {
  const cache = typeof caches !== "undefined" ? caches.default : null;
  const req = cache ? new Request("https://cache.internal/" + encodeURIComponent(key)) : null;
  if (cache) {
    const hit = await cache.match(req);
    if (hit) return hit.text();
  }
  const text = await producer();
  if (cache) await cache.put(req, new Response(text, { headers: { "Cache-Control": "max-age=" + CACHE_SECONDS } }));
  return text;
}

async function fetchText(url, init = {}, tries = 2) {
  let last;
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { ...init, headers: { "User-Agent": UA, ...(init.headers || {}) }, redirect: "follow", signal: AbortSignal.timeout(12000) });
      if (!r.ok) throw new Error("HTTP " + r.status + " for " + url);
      return await r.text();
    } catch (e) {
      last = e;
    }
  }
  throw last;
}

export function getPage(url) {
  return cached("page:" + url, () => fetchText(url));
}

/** Run sistani.org's own search. part = "qa" or "book". Returns the results page HTML. */
export async function siteSearch(lang, part, query) {
  const L = SITE_LANG[lang];
  return cached(`search:${L}:${part}:${query}`, async () => {
    const body = new URLSearchParams({ s: query, is_ajax: "1" });
    const raw = await fetchText(`${BASE}/${L}/${part}/search/`, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json, text/javascript, */*; q=0.01",
        Referer: `${BASE}/${L}/${part}/`
      }
    });
    let sid;
    try { sid = JSON.parse(raw).sid; } catch { sid = null; }
    if (!sid || !/^\d+$/.test(sid)) throw new Error("sistani.org search did not return a result id");
    return fetchText(`${BASE}/${L}/${part}/search/${sid}/`);
  });
}

/** Parse Q&A blocks (search results or topic pages). */
export function parseQA(html, lang) {
  const out = [];
  for (const block of html.split('<div class="one-qa">').slice(1)) {
    const id = (block.match(/name="(\d+)"/) || [])[1];
    const q = block.match(/<span class="nvy b">[^<]*<\/span>\s*:?\s*([\s\S]*?)<div class="b">/);
    const a = block.match(/<div class="b">\s*<span class="nvy">[^<]*<\/span>\s*:?\s*([\s\S]*?)<\/div>/);
    const topic = block.match(/<a class="fr" href="([^"]+)">([^<]*)<\/a>/);
    if (!id || !q || !a) continue;
    out.push({
      pid: `qa-${lang}-${id}`,
      kind: "qa",
      lang,
      number: id,
      question: stripTags(q[1]),
      text: stripTags(a[1]),
      topic: topic ? stripTags(topic[2]) : "",
      url: `${BASE}/${SITE_LANG[lang]}/qa/${id}/`
    });
  }
  return out;
}

/** Parse book search results into section links. */
export function parseBookResults(html) {
  const out = [];
  for (const block of html.split('<div class="one-result">').slice(1)) {
    const links = [...block.matchAll(/<a href="(\/[a-z]+\/book\/(\d+)\/(\d+)\/)">([^<]*)<\/a>/g)];
    const book = block.match(/<a href="\/[a-z]+\/book\/\d+\/">([^<]*)<\/a>/);
    for (const l of links) out.push({ url: BASE + l[1], bookId: l[2], sectionId: l[3], section: stripTags(l[4]), book: book ? stripTags(book[1]) : "" });
  }
  return out;
}

/** The table of contents of an English book: every section with its title and link. */
export const TOC_BOOKS = { 48: "Islamic Laws", 47: "Hajj Rituals", 46: "A Code of Practice For Muslims in the West" };
export async function bookToc(bookId) {
  const html = await getPage(`${BASE}/english/book/${bookId}/`);
  const out = [];
  const seen = new Set();
  for (const m of html.matchAll(new RegExp(`<a href="(/english/book/${bookId}/(\\d+)/)">([^<]+)</a>`, "g"))) {
    if (seen.has(m[2])) continue;
    seen.add(m[2]);
    out.push({ url: BASE + m[1], bookId: String(bookId), sectionId: m[2], section: stripTags(m[3]), book: TOC_BOOKS[bookId] || "" });
  }
  return out;
}

/** Split a book section page into numbered rulings ("Ruling 12. ..."). */
export function parseRulings(html, meta) {
  const title = stripTags((html.match(/<h1 class="c">([\s\S]*?)<\/h1>/) || [, ""])[1]);
  const body = (html.match(/<div class="baz book-text">([\s\S]*?)<\/div>/) || [, ""])[1];
  const text = stripTags(body);
  const marks = [...text.matchAll(/(^|\n)Ruling (\d+)\./g)];
  return marks.map((m, i) => {
    const start = m.index + m[1].length;
    const end = i + 1 < marks.length ? marks[i + 1].index : text.length;
    const n = m[2];
    return {
      pid: `book-${meta.bookId}-${meta.sectionId}-r${n}`,
      kind: "ruling",
      lang: "en",
      number: n,
      book: meta.book,
      section: title || meta.section,
      text: text.slice(start, end).trim(),
      url: meta.url
    };
  });
}

/**
 * Source verification: fetch the passage's official page and confirm that the exact
 * quoted text is present there. Returns true only if it is.
 */
export async function verifyOnSource(passage, quote) {
  const html = await getPage(passage.url);
  const pageText = normStrict(stripTags(html));
  return pageText.includes(normStrict(quote));
}
