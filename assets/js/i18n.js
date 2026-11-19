/*
  AHD-E-ZUHOOR — site-wide English / اردو / Roman Urdu switch.
  Roman (?lang=ro) builds the page in Urdu, then assets/js/ro.js writes it in Roman letters
  (word list: assets/js/ro/words.js). The language courses stay in English in Roman mode.

  Load this file in the <head> of every page:  <script src="../assets/js/i18n.js"></script>
  (from index.html: assets/js/i18n.js).

  How it works
  - The visitor's choice is kept in localStorage ("az-lang") and can be set with ?lang=ur or ?lang=en.
  - In Urdu, the page loads assets/js/ur/common.js and assets/js/ur/<page>.js. Each calls
        AZ_UR.add({ "Exact English text": "اردو متن", ... })
    and optionally AZ_UR.patterns([ [/^Question (\d+) of (\d+)$/, "سوال $1 از $2"] ]).
    A pattern's replacement may also be a function; inside it, AZ_UR.t(text) translates a part.
  - Every text node, every element whose inner HTML matches a key (for text with <b>, <em> …),
    and the placeholder / aria-label / title / alt attributes are translated, including content
    the page builds later (a MutationObserver watches for it).
  - Text not in the dictionary simply stays in English.
  - Pages that translate themselves (Marefat, Hadiths) set <html data-own-i18n>; this script then
    only translates the shared site menu there.
*/
(function () {
  "use strict";
  var KEY = "az-lang";
  function readLang() {
    var q = null;
    try { q = new URLSearchParams(location.search).get("lang"); } catch (e) {}
    try {
      if (q === "ur" || q === "en" || q === "ro") { localStorage.setItem(KEY, q); return q; }
      var v = localStorage.getItem(KEY);
      return v === "ur" || v === "ro" ? v : "en";
    } catch (e) { return q === "ur" || q === "ro" ? q : "en"; }
  }
  var CHOICE = readLang();

  var me = document.currentScript;
  var BASE = me && me.src ? me.src.replace(/i18n\.js(\?.*)?$/, "") : "assets/js/";
  var file = location.pathname.split("/").pop() || "index.html";
  var PAGE = file.replace(/\.html?$/, "") || "index";
  var html = document.documentElement;
  var own = html.hasAttribute("data-own-i18n");
  /* Roman Urdu: the page is built in Urdu and then written in Roman letters by assets/js/ro.js.
     The language courses stay in English in Roman mode. */
  var COURSE = /^(language-course|academy-languages)$/.test(PAGE);
  var RO = CHOICE === "ro" && !COURSE;
  var LANG = CHOICE === "ro" ? (COURSE ? "en" : "ur") : CHOICE;
  window.AZ_LANG = LANG;
  window.AZ_RO = RO;

  /* ---------- dictionary ---------- */
  var DICT = Object.create(null), HTMLD = Object.create(null), PATS = [];
  function norm(s) { return String(s).replace(/\s+/g, " ").trim(); }
  window.AZ_UR = {
    add: function (o) { for (var k in o) { var n = norm(k); if (n.indexOf("<") > -1) HTMLD[n] = o[k]; else DICT[n] = o[k]; } },
    patterns: function (list) { PATS = PATS.concat(list); },
    /* translate one string (used by scripts, e.g. for spoken lines) */
    t: function (s) { return tr(norm(s)) || s; }
  };
  function tr(n) {
    if (!n) return null;
    if (DICT[n] !== undefined) return DICT[n];
    for (var i = 0; i < PATS.length; i++) {
      var re = PATS[i][0]; re.lastIndex = 0;
      if (re.test(n)) { re.lastIndex = 0; var out = n.replace(re, PATS[i][1]); if (out !== n) return out; }
    }
    return null;
  }

  /* ---------- styles + button ---------- */
  var css =
    ".az-lang{position:fixed;bottom:calc(16px + env(safe-area-inset-bottom,0px));left:16px;z-index:1003;box-shadow:0 6px 20px rgba(0,0,0,.35);padding:3px;border-radius:99px;display:flex;gap:2px;" +
    "border:1px solid rgba(215,188,128,.55);background:rgba(5,13,25,.82);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}" +
    ".az-lang button{border:0;margin:0;background:none;color:#f3e2b5;cursor:pointer;padding:4px 11px;border-radius:99px;font:500 12.5px/1.4 Inter,system-ui,sans-serif;letter-spacing:0;text-transform:none}" +
    ".az-lang button[lang=ur]{font-family:'Noto Nastaliq Urdu',serif;font-size:12.5px;line-height:1.4;padding:0 11px 4px}" +
    ".az-lang button:hover{background:rgba(215,188,128,.12)}" +
    ".az-lang button[aria-pressed=true]{background:rgba(215,188,128,.26);color:#fff;cursor:default}" +
    "html.az-ur-wait body{opacity:0}" +
    "html.az-ur body{transition:opacity .25s}" +
    "html.az-ur [data-ur]{font-family:'Noto Nastaliq Urdu',serif!important;letter-spacing:0!important;text-transform:none!important;font-style:normal!important;line-height:1.95}" +
    "html.az-ur [data-ur] [lang=ar],html.az-ur [lang=ar][data-ur]{font-family:Amiri,serif!important}";
  var st = document.createElement("style"); st.textContent = css;
  (document.head || html).appendChild(st);

  /* English | اردو | Roman */
  function addButton() {
    var old = document.getElementById("langBtn"); if (old) old.remove();
    if (document.querySelector(".az-lang")) return;
    var box = document.createElement("div");
    box.className = "az-lang"; box.setAttribute("role", "group"); box.setAttribute("aria-label", "Language");
    box.setAttribute("data-no-ur", ""); box.setAttribute("data-no-ro", "");
    [["en", "English", "en", "Read in English"], ["ur", "اردو", "ur", "اردو میں پڑھیں"], ["ro", "Roman", "en", "Roman Urdu mein parhein"]].forEach(function (o) {
      var b = document.createElement("button");
      b.type = "button"; b.textContent = o[1]; b.lang = o[2]; b.setAttribute("aria-label", o[3]);
      b.setAttribute("aria-pressed", CHOICE === o[0] ? "true" : "false");
      b.addEventListener("click", function () {
        if (CHOICE === o[0]) return;
        try { localStorage.setItem(KEY, o[0]); } catch (e) {}
        var u = new URL(location.href); u.searchParams.set("lang", o[0]); location.href = u.toString();
      });
      box.appendChild(b);
    });
    document.body.appendChild(box);
  }

  /* keep links inside the site in the chosen language even where storage is blocked */
  function keepLangInLinks() {
    if (CHOICE === "en") return;
    [].forEach.call(document.querySelectorAll("a[href]"), function (a) {
      var h = a.getAttribute("href");
      if (!h || /^(https?:|mailto:|tel:|#|javascript:)/i.test(h)) return;
      if (CHOICE === "ro" && /[?&]lang=ur\b/.test(h)) { a.setAttribute("href", h.replace(/([?&]lang=)ur\b/, "$1ro")); return; }
      if (!/\.html?(#|$)/.test(h) || /[?&]lang=/.test(h)) return;
      a.setAttribute("href", h.replace(/(\.html?)(#|$)/, "$1?lang=" + CHOICE + "$2"));
    });
  }

  function onReady(fn) { if (document.readyState !== "loading") fn(); else document.addEventListener("DOMContentLoaded", fn); }

  if (LANG !== "ur") { onReady(function () { addButton(); keepLangInLinks(); }); return; }

  /* ---------- Urdu ---------- */
  /* On a page that translates itself, only the shared parts (the site menu) are translated here. */
  var SHARED = ".az-home-button,.az-menu-overlay";
  if (!RO) html.classList.add("az-ur");
  if (!own && !RO) html.lang = "ur";
  if (!own || RO) html.classList.add("az-ur-wait");
  var reveal = function () { html.classList.remove("az-ur-wait"); };
  setTimeout(reveal, 2500);
  /* Roman: load the word list and the romanizer; roman() runs once the Urdu is in place */
  var RO_V = "5"; /* raise when ro.js or ro/words.js change, so browsers fetch the new files */
  var roReady = RO ? load(BASE + "ro/words.js?v=" + RO_V).then(function () { return load(BASE + "ro.js?v=" + RO_V); }) : null;
  function roman() { if (!RO) return Promise.resolve(); return roReady.then(function () { if (window.AZ_ROMANIZE) window.AZ_ROMANIZE.start(); }); }

  var font = document.createElement("link");
  if (RO) font.media = "print";
  font.rel = "stylesheet";
  font.href = "https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;600&family=Amiri:wght@400;700&display=swap";
  (document.head || html).appendChild(font);

  function load(src) {
    return new Promise(function (res) {
      var s = document.createElement("script"); s.src = src; s.onload = s.onerror = function () { res(); };
      (document.head || html).appendChild(s);
    });
  }

  var INLINE = /^(B|STRONG|EM|I|SMALL|SPAN|BR|A|SUP|SUB|U|MARK)$/;
  /* letters used in Urdu but not in Arabic: Urdu text a page writes itself also gets the Urdu font */
  var URDU_CHARS = /[ٹڈڑںھہۂۃےۓ]/;
  function markUr(el) { if (RO) return; if (el && el.nodeType === 1 && !el.hasAttribute("lang")) { el.setAttribute("data-ur", ""); if (!el.hasAttribute("dir")) el.setAttribute("dir", "rtl"); } }
  function doText(n) {
    var raw = n.nodeValue; if (!raw || !/[A-Za-z\u0600-\u06FF]/.test(raw)) return;
    var p = n.parentElement; if (!p || /^(SCRIPT|STYLE|TEXTAREA|CODE|PRE)$/.test(p.tagName) || p.closest("[data-no-ur]")) return;
    if (RO && window.AZ_ROMANIZE && window.AZ_ROMANIZE.done(n)) return;
    var u = tr(norm(raw));
    if (u === null) { if (URDU_CHARS.test(raw) && !p.closest("[lang]:not([lang=ur])")) markUr(p); return; }
    var lead = raw.match(/^\s*/)[0], trail = raw.match(/\s*$/)[0];
    n.nodeValue = lead + u + trail; markUr(p);
  }
  function doAttrs(el) {
    ["placeholder", "aria-label", "title", "alt"].forEach(function (a) {
      var v = el.getAttribute && el.getAttribute(a); if (!v || !/[A-Za-z]/.test(v)) return;
      if (RO && window.AZ_ROMANIZE && window.AZ_ROMANIZE.doneAttr(el, a)) return;
      var u = tr(norm(v)); if (u !== null && u !== v) el.setAttribute(a, u);
    });
  }
  function doHTML(el) {
    var c = el.children; if (!c.length || c.length > 6) return false;
    for (var i = 0; i < c.length; i++) if (!INLINE.test(c[i].tagName) || c[i].children.length > 1) return false;
    var k = norm(el.innerHTML); var u = HTMLD[k];
    if (u === undefined) return false;
    el.innerHTML = u; markUr(el); return true;
  }
  var busy = false;
  function walk(root) {
    if (!root) return;
    busy = true;
    try {
      if (root.nodeType === 3) { doText(root); return; }
      if (root.nodeType !== 1 || /^(SCRIPT|STYLE)$/.test(root.tagName)) return;
      if (root.closest && root.closest("[data-no-ur]")) return;
      doAttrs(root);
      if (doHTML(root)) return;
      var els = root.querySelectorAll("*");
      for (var i = 0; i < els.length; i++) { doAttrs(els[i]); if (els[i].children.length) doHTML(els[i]); }
      var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n, list = [];
      while ((n = w.nextNode())) list.push(n);
      list.forEach(doText);
    } finally { busy = false; }
  }

  /* a page's dictionary may ask for shared files too:  AZ_UR.also = ["courses"]; */
  if (own) {
    var shared = load(BASE + "ur/common.js");
    var doShared = function (n) {
      if (n.nodeType !== 1) return;
      if (n.matches(SHARED)) walk(n);
      else [].forEach.call(n.querySelectorAll(SHARED), walk);
    };
    onReady(function () {
      addButton();
      shared.then(function () {
        doShared(document.body); keepLangInLinks();
        roman().then(reveal);
        new MutationObserver(function (muts) {
          if (busy) return;
          muts.forEach(function (m) {
            var t = m.target.nodeType === 1 ? m.target : m.target.parentElement;
            if (m.type !== "childList" && t && t.closest(SHARED)) { if (m.type === "attributes") doAttrs(t); else walk(m.target); return; }
            m.addedNodes.forEach(function (n) {
              var inside = n.parentElement && n.parentElement.closest(SHARED);
              if (inside) walk(n); else doShared(n);
              if (n.nodeType === 1) keepLangInLinks();
            });
          });
        }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["aria-label", "title"] });
      });
    });
    return;
  }

  var ready = load(BASE + "ur/common.js")
    .then(function () { return load(BASE + "ur/" + PAGE + ".js"); })
    .then(function () { return Promise.all((window.AZ_UR.also || []).map(function (n) { return load(BASE + "ur/" + n + ".js"); })); });
  onReady(function () {
    addButton();
    ready.then(function () {
      if (document.title) { var t = tr(norm(document.title)); if (t) document.title = t; }
      walk(document.body);
      keepLangInLinks();
      roman().then(reveal);
      new MutationObserver(function (muts) {
        if (busy) return;
        muts.forEach(function (m) {
          if (m.type === "characterData") walk(m.target);
          else if (m.type === "attributes") doAttrs(m.target);
          else m.addedNodes.forEach(function (n) { walk(n); if (n.nodeType === 1) keepLangInLinks(); });
        });
      }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["placeholder", "aria-label", "title", "alt"] });
    });
  });
})();
