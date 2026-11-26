/*
  Lists every Arabic passage on the Duas & Hadiths page (pages/hadiths.html) with the text the
  reciter voice is given. Usage: node tools/dua-audio/list.js > lines.json (make.py runs it).
  The spoken text: the alternative readings in [brackets] are left out, a separate "wa"/"fa" is
  joined to its word, and a short pause (،) is put at each phrase break the page shows.
*/
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.resolve(__dirname, "../..");
const ctx = { window: {} }; ctx.globalThis = ctx.window; vm.createContext(ctx);
for (const f of ["assets/js/duas-data.js", "assets/js/marefat-data.js"])
  vm.runInContext(fs.readFileSync(path.join(root, f), "utf8").replace(/\bwindow\./g, "globalThis."), ctx, { filename: f });
const W = ctx.window;

/* the same key as duaKey() in pages/hadiths.html: FNV-1a of the passage as written */
function key(s) {
  s = String(s).normalize("NFC").replace(/\s+/g, " ").trim(); let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return ("0000000" + h.toString(16)).slice(-8);
}
/* phrase breaks: the rules of arLines() in pages/hadiths.html. Only the firm breaks (punctuation, each
   greeting, each "Allahumma" and call) become pauses; the display's extra splits of long lines do not. */
const HARAKA = /[ً-ْٰـۡ]/g;
const bare = w => w.replace(HARAKA, "").replace(/[\[\]،؛.:!,«»“”"()]/g, "").replace(/[ٱأإآ]/g, "ا");
function phrases(s, split) {
  const ws = s.split(/\s+/).filter(Boolean), out = []; let cur = [], depth = 0;
  ws.forEach((w, i) => {
    const b = bare(w), nb = bare(ws[i + 1] || "");
    const starts = depth === 0 && cur.length >= 3 && ((b === "السلام" && /^عليك/.test(nb)) || (b === "سلام" && /^(عل|الله)/.test(nb)) || b === "اللهم" || b === "يا" && /^(سادتي|ابا|اب|ابن|وصي)/.test(nb) && cur.length >= 6);
    if (starts) { out.push(cur); cur = []; }
    cur.push(w); depth += (w.split("[").length - 1) - (w.split("]").length - 1);
    if (depth === 0 && /[،؛.:!]$/.test(w)) { out.push(cur); cur = []; }
  });
  if (cur.length) out.push(cur);
  if (!split) return out.map(l => l.join(" "));
  const fin = [];
  (function add(list) {
    list.forEach(l => {
      if (l.length <= 16) { fin.push(l); return; }
      const mid = l.length / 2; let best = -1;
      l.forEach((w, i) => { if (i > 3 && i < l.length - 3 && /^وَ?$|^وَ/.test(w) && w.indexOf("[") < 0 && (best < 0 || Math.abs(i - mid) < Math.abs(best - mid))) best = i; });
      if (best < 0) fin.push(l); else add([l.slice(0, best), l.slice(best)]);
    });
  })(out);
  const res = []; fin.forEach(l => { if (res.length && l.length < 3) res[res.length - 1] = res[res.length - 1].concat(l); else res.push(l); });
  return res.map(l => l.join(" "));
}
function spoken(s) {
  return phrases(s).map(p => p.replace(/\[[^\]]*\]/g, " ").replace(/(^|\s)([وف][َُِ]?)\s+(?=\S)/g, "$1$2").replace(/\s+/g, " ").trim().replace(/[،؛.:!]+$/, ""))
    .filter(Boolean).join("، ") + ".";
}
const out = new Map();
const put = (ar, where) => { if (!ar || !ar.trim()) return; const k = key(ar); if (!out.has(k)) out.set(k, { key: k, where, text: spoken(ar) }); };
for (const d of W.AZ_DUAS.list) { d.parts.forEach((p, i) => put(p.ar, d.id + " " + (i + 1))); }
(function walk(o, p) { if (!o || typeof o !== "object") return; for (const k in o) { if (k === "ar" && typeof o[k] === "string") put(o[k], "hadith " + p); else walk(o[k], p + "." + k); } })(W.AZ_MAREFAT, "m");
process.stdout.write(JSON.stringify([...out.values()], null, 1));
