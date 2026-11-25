/*
  Lists the narration text for every chapter of every library book, in English and Urdu.
  Used by tools/library-audio/make.py.   node tools/library-audio/list.js > chapters.json
*/
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm"), crypto = require("crypto");
const ROOT = path.resolve(__dirname, "../..");
const html = fs.readFileSync(path.join(ROOT, "pages/knowledge-library.html"), "utf8");
const a = html.indexOf("var BOOKS=") + 10;
let d = 0, i = a;
for (; i < html.length; i++) { if (html[i] === "[") d++; else if (html[i] === "]") { d--; if (!d) break; } }
const BOOKS = JSON.parse(html.slice(a, i + 1));

const ctx = { window: {}, console };
ctx.window.window = ctx.window;
const UR = {};
ctx.AZ_UR = { add: o => { for (const k in o) UR[k.replace(/\s+/g, " ").trim()] = o[k]; }, patterns() {} };
vm.createContext(ctx);
vm.runInContext("var window=this.window;", ctx);
for (const f of ["assets/js/ur/library-summaries.js", "assets/js/ur/knowledge-library.js"])
  vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx);
const LIB_UR = ctx.window.AZ_LIB_UR || [];
const ur = s => UR[String(s).replace(/\s+/g, " ").trim()] || null;

const clean = s => String(s).replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").trim();
/* "§heading§text" → "heading. text" */
const para = (p, stop) => { const m = /^§([^§]*)§([\s\S]*)$/.exec(p); return m ? clean(m[1]).replace(/[.:۔]$/, "") + (stop || ".") + "\n" + clean(m[2]) : clean(p); };
const URN = ["", "پہلا", "دوسرا", "تیسرا", "چوتھا", "پانچواں", "چھٹا", "ساتواں", "آٹھواں", "نواں", "دسواں", "گیارہواں", "بارہواں", "تیرہواں", "چودہواں", "پندرہواں"];

const out = [];
BOOKS.forEach((b, bi) => {
  b.ch.forEach((c, ci) => {
    /* English */
    let en = (ci === 0 ? clean(b.t) + ", by " + clean(b.au).replace(/ & /g, " and ") + ".\nA chapter by chapter summary.\n\n" : "") +
      "Chapter " + (ci + 1) + ". " + clean(c[0]) + ".\n\n" + c[1].map(p => para(p)).join("\n\n");
    /* Urdu: the site's Urdu summaries and chapter titles */
    const u = (LIB_UR[bi] || [])[ci], ut = ur(c[0]), ub = ur(b.t);
    let urText = null;
    if (u && u.length && ut) {
      urText = (ci === 0 ? (ub || clean(b.t)) + "۔\nہر باب کا خلاصہ۔\n\n" : "") +
        (URN[ci + 1] || ("باب " + (ci + 1))) + " باب۔ " + clean(ut) + "۔\n\n" + u.map(p => para(p, "۔")).join("\n\n");
    }
    for (const [lang, text] of [["en", en], ["ur", urText]]) {
      if (!text) continue;
      const key = bi + "-" + ci, h = crypto.createHash("sha1").update(lang + "|" + text).digest("hex").slice(0, 10);
      out.push({ lang, book: bi, chapter: ci, key, hash: h, title: lang === "en" ? clean(c[0]) : clean(ut), text });
    }
  });
});
process.stdout.write(JSON.stringify(out));
