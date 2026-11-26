/*
  Lists every line the language courses speak, with the native voice and recording file for each.
  Usage: node tools/language-audio/list.js > lines.json
  (generate.py runs this for you.)
*/
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.resolve(__dirname, "../..");
const ctx = { window: {}, document: {}, console };
ctx.globalThis = ctx.window;
vm.createContext(ctx);
for (const f of ["assets/js/language-data.js", "assets/js/language-voice.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, f), "utf8").replace(/\bwindow\./g, "globalThis."), ctx, { filename: f });
}
const W = ctx.window, LV = W.AZ_LANGVOICE;
/* the Urdu translations of Zahra and Ali's own lines (the same lookup as AZ_UR.t in assets/js/i18n.js) */
const DICT = Object.create(null); let PATS = [];
const norm = s => String(s).replace(/\s+/g, " ").trim();
ctx.AZ_UR = W.AZ_UR = {
  add(o) { for (const k in o) { const n = norm(k); if (n.indexOf("<") < 0) DICT[n] = o[k]; } },
  patterns(list) { PATS = PATS.concat(list); },
  t(s) {
    const n = norm(s);
    if (DICT[n] !== undefined) return DICT[n];
    for (const [re, f] of PATS) { re.lastIndex = 0; if (re.test(n)) { re.lastIndex = 0; const out = n.replace(re, f); if (out !== n) return out; } }
    return s;
  }
};
/* the order the pages load them in (a later file wins): common, the page, then the files it names in AZ_UR.also */
for (const f of ["common", "academy-languages", "language-course", "courses"]) {
  vm.runInContext(fs.readFileSync(path.join(root, "assets/js/ur/" + f + ".js"), "utf8"), ctx, { filename: f });
}
const courses = W.AZ_COURSES.concat(W.AZ_COURSES.some(c => c.id === "english") ? [] : [W.AZ_COURSE_ENGLISH]);
const seen = new Map(), missing = new Set();
function put(u, voice, text, course) {
  if (!voice) return;
  const key = LV.key(voice, text);
  if (!seen.has(key)) seen.set(key, { key, voice, lang: u.lang, text: LV.clean(text), course });
}
const all = courses.map(C => [C, LV.utterances(C)]).concat([[{ id: "welcome" }, LV.welcome(W.AZ_COURSES)]]);
for (const [C, list] of all) {
  for (const u of list) {
    if (!u.narr) { put(u, LV.voiceFor(u.lang, u.who), u.text, C.id); continue; }
    /* Zahra and Ali as themselves: their children's voices, in English and (for the Urdu site) in Urdu */
    put(u, LV.guideFor(u.lang, u.who), u.text, C.id);
    if (u.lang === "en-GB") {
      const ur = W.AZ_UR.t(u.text);
      if (ur !== u.text) put({ lang: "ur-PK" }, LV.guideFor("ur-PK", u.who), ur, C.id);
      else missing.add(u.text);
    }
  }
}
if (missing.size) process.stderr.write("no Urdu for " + missing.size + " lines:\n  " + [...missing].join("\n  ") + "\n");
process.stdout.write(JSON.stringify([...seen.values()], null, 1));
