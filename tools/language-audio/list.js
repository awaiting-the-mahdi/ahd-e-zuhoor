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
const courses = W.AZ_COURSES.concat(W.AZ_COURSES.some(c => c.id === "english") ? [] : [W.AZ_COURSE_ENGLISH]);
const seen = new Map();
for (const C of courses) {
  for (const u of LV.utterances(C)) {
    const voice = LV.voiceFor(u.lang, u.who);
    if (!voice) continue;
    const key = LV.key(voice, u.text);
    if (!seen.has(key)) seen.set(key, { key, voice, lang: u.lang, text: u.text, course: C.id });
  }
}
process.stdout.write(JSON.stringify([...seen.values()], null, 1));
