/*
  AHD-E-ZUHOOR — home page search.
  Searches duas, hadith sections, Marefat questions, the Ahl al-Bayt, the Prophetic Blueprint,
  prophets, the Archive (letters, deputies, signs, places), library books and chapters,
  theology, fiqh topics and every surah. The index (assets/js/search-index.js) is built by
  tools/build-search-index.js and loaded the first time the search box is used.
  English, Urdu and Roman Urdu queries all work in every language mode.
*/
(function () {
  "use strict";
  var ME = document.currentScript;
  var form = document.getElementById("siteSearch"); if (!form) return;
  var input = form.querySelector("input"), out = document.getElementById("ssRes");
  var UR = window.AZ_LANG === "ur", L = UR ? 1 : 0;           // Roman mode shows the Urdu, which ro.js writes in Roman letters
  var CHOICE = UR ? (window.AZ_RO ? "ro" : "ur") : "en";
  var VER = "1";
  if (UR && !window.AZ_RO) { out.dir = "rtl"; out.lang = "ur"; }
  var KIND = {
    page: ["Page", "صفحہ"], dua: ["Dua", "دعا"], hadith: ["Hadith", "حدیث"], question: ["Question", "سوال"], imam: ["Ahl al-Bayt", "اہلِ بیت"],
    resemblance: ["Prophetic Blueprint", "انبیاء کا نقشِ راہ"], prophet: ["Prophet", "نبی"], letter: ["The Imam's letter", "امام کا خط"], deputy: ["Deputy", "نائب"],
    sign: ["Sign", "نشانی"], place: ["Sacred place", "مقدس مقام"], book: ["Book", "کتاب"], chapter: ["Chapter", "باب"], topic: ["Belief", "عقیدہ"],
    scholar: ["Scholar", "عالم"], fiqh: ["Fiqh", "فقہ"], surah: ["Surah", "سورہ"]
  };
  var TX = [
    { none: "Nothing found for “{q}”. Try another word or spelling.", try: "Try:", count: "{n} results" },
    { none: "”{q}“ کے لیے کچھ نہیں ملا۔ کوئی اور لفظ یا ہجے آزمائیں۔", try: "مثلاً:", count: "{n} نتائج" }
  ][L];
  var SUGG = [["Dua al-Faraj", "Dua al-Ahd", "Kamal al-Din", "Musa", "When will he come?", "Samarra"],
              ["دعائے فرج", "دعائے عہد", "کمال الدین", "موسیٰ", "وہ کب آئیں گے؟", "سامرا"]][L];

  /* ---------- matching ---------- */
  function norm(s) {
    s = String(s || "").toLowerCase().normalize("NFD")
      .replace(/[̀-ًͯ-ٰٟـۡ]/g, "")
      .replace(/[’'`ʿʾ‘]/g, "")
      .replace(/[يى]/g, "ی").replace(/ك/g, "ک").replace(/[ةهۂ]/g, "ہ").replace(/[أإآٱ]/g, "ا").replace(/ؤ/g, "و").replace(/ۓ/g, "ے")
      .replace(/[^a-z0-9؀-ۿ]+/g, " ");
    return " " + s.replace(/(.)\1+/g, "$1").trim() + " ";
  }
  /* sound-alike form of Latin words: hadith ≈ hadees, ghaybah ≈ ghaibat, qaim ≈ kaim */
  function skel(s) {
    return s.replace(/th|dh/g, "s").replace(/q/g, "k").replace(/w/g, "v").replace(/z/g, "s").replace(/ph/g, "f")
      .replace(/[aeiouy]/g, "").replace(/h(?= |$)/g, "").replace(/(.)\1+/g, "$1");
  }
  var IX = null;
  var BONUS = { page: 4, dua: 4, question: 3, book: 3, prophet: 3, letter: 2, place: 2, scholar: 2, imam: 2, deputy: 2, fiqh: 2, topic: 2, hadith: 2, sign: 1, resemblance: 1, surah: 1, chapter: 0 };
  function words(s) { var o = {}; s.trim().split(" ").forEach(function (w) { if (/[a-z]/.test(w)) o[skel(w)] = 1; }); return Object.keys(o); }
  function prep() {
    IX = (window.AZ_SEARCH || []).map(function (e) {
      var t = norm(e.t.join(" ")), all = norm(e.t.join(" ") + " " + e.s.join(" ") + " " + (e.x || ""));
      return { e: e, t: t, a: all, tw: words(t), aw: words(all), len: e.t[0].length };
    });
  }
  /* a sound-alike match on whole words: hadees = hadith, ghaybah = ghaibat */
  function fuzzy(list, sk) {
    for (var i = 0; i < list.length; i++) if (list[i] === sk || (sk.length >= 4 && list[i].indexOf(sk) === 0)) return true;
    return false;
  }
  function search(q) {
    var toks = norm(q).trim().split(" ").filter(Boolean);
    if (!toks.length) return [];
    var res = [];
    IX.forEach(function (r) {
      var score = 0;
      for (var i = 0; i < toks.length; i++) {
        var w = toks[i], sk = /[a-z]/.test(w) ? skel(w) : "", s = 0;
        if (r.t.indexOf(" " + w) > -1) s = 10;
        else if (r.t.indexOf(w) > -1) s = 6;
        else if (r.a.indexOf(" " + w) > -1) s = 4;
        else if (r.a.indexOf(w) > -1) s = 2;
        else if (sk.length >= 3) { if (fuzzy(r.tw, sk)) s = 5; else if (fuzzy(r.aw, sk)) s = 1; }
        if (!s) return;
        score += s;
      }
      if (r.t.indexOf(" " + toks.join(" ")) > -1) score += 8;     // the whole phrase at a word start in the title
      score += (BONUS[r.e.k] || 0) - Math.min(r.len, 120) / 60;
      res.push([score, r.e]);
    });
    res.sort(function (a, b) { return b[0] - a[0]; });
    return res.slice(0, 40).map(function (x) { return x[1]; });
  }

  /* ---------- display ---------- */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function href(u) {
    if (CHOICE === "en") return u;
    var h = u.indexOf("#"), base = h > -1 ? u.slice(0, h) : u, hash = h > -1 ? u.slice(h) : "";
    return base + (base.indexOf("?") > -1 ? "&" : "?") + "lang=" + CHOICE + hash;
  }
  function suggestions() {
    out.innerHTML = '<p class="ss-try">' + esc(TX.try) + " " + SUGG.map(function (s) { return '<button type="button" class="ss-chip">' + esc(s) + "</button>"; }).join("") + "</p>";
    out.hidden = false;
  }
  var sel = -1;
  function render(q) {
    sel = -1;
    if (!q.trim()) { suggestions(); return; }
    var r = search(q);
    if (!r.length) { out.innerHTML = '<p class="ss-none">' + esc(TX.none.replace("{q}", q.trim())) + "</p>"; out.hidden = false; return; }
    out.innerHTML = '<p class="ss-count" aria-live="polite">' + esc(TX.count.replace("{n}", r.length)) + "</p><ul role=\"listbox\">" + r.map(function (e) {
      return '<li><a class="ss-item" href="' + esc(href(e.u)) + '"><span class="ss-kind">' + esc(KIND[e.k] ? KIND[e.k][L] : e.k) + "</span>" +
        '<span class="ss-t">' + esc(e.t[L] || e.t[0]) + "</span>" + (e.s[L] || e.s[0] ? '<span class="ss-s">' + esc(e.s[L] || e.s[0]) + "</span>" : "") + "</a></li>";
    }).join("") + "</ul>";
    out.hidden = false;
  }
  function load(cb) {
    if (IX) return cb();
    if (window.AZ_SEARCH) { prep(); return cb(); }
    if (load.busy) return load.busy.push(cb);
    load.busy = [cb];
    var s = document.createElement("script");
    s.src = (ME && ME.src ? ME.src.replace(/search\.js.*$/, "") : "assets/js/") + "search-index.js?v=" + VER;
    s.onload = function () { prep(); var q = load.busy; load.busy = null; q.forEach(function (f) { f(); }); };
    document.head.appendChild(s);
  }

  var tmr;
  input.addEventListener("focus", function () { load(function () { render(input.value); }); });
  input.addEventListener("input", function () { clearTimeout(tmr); tmr = setTimeout(function () { load(function () { render(input.value); }); }, 120); });
  out.addEventListener("click", function (e) {
    var c = e.target.closest(".ss-chip"); if (!c) return;
    input.value = c.textContent; input.focus(); load(function () { render(input.value); });
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var a = out.querySelectorAll(".ss-item"); if (a.length) location.href = a[sel > -1 ? sel : 0].href;
  });
  input.addEventListener("keydown", function (e) {
    var a = out.querySelectorAll(".ss-item");
    if (e.key === "Escape") { if (input.value) { input.value = ""; render(""); } else { out.hidden = true; input.blur(); } return; }
    if (!a.length || (e.key !== "ArrowDown" && e.key !== "ArrowUp")) return;
    e.preventDefault();
    sel = (sel + (e.key === "ArrowDown" ? 1 : -1) + a.length) % a.length;
    [].forEach.call(a, function (x, i) { x.classList.toggle("on", i === sel); });
    a[sel].scrollIntoView({ block: "nearest" });
  });
  document.addEventListener("click", function (e) { if (!form.contains(e.target) && !input.value) out.hidden = true; });
})();
