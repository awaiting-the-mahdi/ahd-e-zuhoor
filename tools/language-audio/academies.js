/*
  Zahra and Ali's lines in the Theology and Fiqh academies (pages/academy-theology.html,
  pages/academy-fiqh.html): the explainer videos, their spoken feedback, flash-card answers,
  and the Arabic verses and terms. Used by list.js, so generate.py records them with the rest.
  Each academy page reads its own Urdu dictionaries (assets/js/ur/common.js + the page's file),
  so the Urdu of each line is looked up with that page's dictionaries.
*/
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.resolve(__dirname, "../..");
const read = f => fs.readFileSync(path.join(root, f), "utf8");

function urdu(files) {
  const DICT = Object.create(null); let PATS = [];
  const norm = s => String(s).replace(/\s+/g, " ").trim();
  const UR = {
    add(o) { for (const k in o) { const n = norm(k); if (n.indexOf("<") < 0) DICT[n] = o[k]; } },
    patterns(list) { PATS = PATS.concat(list); },
    t(s) {
      const n = norm(s);
      if (DICT[n] !== undefined) return DICT[n];
      for (const [re, f] of PATS) { re.lastIndex = 0; if (re.test(n)) { re.lastIndex = 0; const out = n.replace(re, f); if (out !== n) return out; } }
      return s;
    }
  };
  const ctx = { window: {}, AZ_UR: UR }; ctx.window.AZ_UR = UR; vm.createContext(ctx);
  const load = f => vm.runInContext(read("assets/js/ur/" + f + ".js"), ctx, { filename: f });
  files.forEach(load); (UR.also || []).forEach(load);
  return UR;
}

/* string literals said by the kids in a page: V.say("..."), kr.say("..."), tBub texts */
function literals(page) {
  const src = read(page), out = new Set();
  for (const m of src.matchAll(/\.say\(\s*"((?:[^"\\]|\\.)+)"/g)) out.add(JSON.parse('"' + m[1] + '"'));
  return [...out];
}

module.exports = function academies() {
  const ctx = { window: {} }; ctx.globalThis = ctx.window; vm.createContext(ctx);
  for (const f of ["assets/js/fiqh-data.js", "assets/js/theology-data.js"])
    vm.runInContext(read(f).replace(/\bwindow\./g, "globalThis."), ctx, { filename: f });
  const W = ctx.window, WHO = { z: "girl", a: "boy" }, out = [];
  const say = (page, text, who) => out.push({ page, text, who, narr: true });
  const both = (page, text) => { say(page, text, "girl"); say(page, text, "boy"); };
  /* Fiqh */
  for (const st of W.AZ_FIQH.stations) {
    (st.video || []).forEach(l => say("academy-fiqh", l.t, WHO[l.k] || "girl"));
  }
  literals("pages/academy-fiqh.html").forEach(t => say("academy-fiqh", t, "girl"));
  /* Theology */
  for (const m of W.AZ_THEOLOGY.moons) {
    (m.video || []).forEach(l => say("academy-theology", l.t, WHO[l.k] || "girl"));
    (m.questions || []).forEach(q => both("academy-theology", q.a));
    if (m.verse && m.verse.ar) out.push({ page: "academy-theology", text: m.verse.ar, who: "girl", lang: "ar-SA" });
    (m.terms || []).forEach(t => t.ar && out.push({ page: "academy-theology", text: t.ar, who: "girl", lang: "ar-SA" }));
  }
  literals("pages/academy-theology.html").forEach(t => say("academy-theology", t, "girl"));
  const UR = { "academy-fiqh": urdu(["common", "academy-fiqh"]), "academy-theology": urdu(["common", "academy-theology"]) };
  return out.filter(u => u.text && String(u.text).trim()).map(u => Object.assign(u, { ur: u.narr ? UR[u.page].t(u.text) : null }));
};
