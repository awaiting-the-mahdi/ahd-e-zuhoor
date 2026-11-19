/*
  AHD-E-ZUHOOR: Roman Urdu.
  Loaded by assets/js/i18n.js when the visitor picks "Roman". The page is first built in Urdu
  (window.AZ_LANG is "ur"), then every Urdu text node, attribute and the title are written in
  Roman letters with the word list in assets/js/ro/words.js, and the page is shown left to right
  with its English fonts. Arabic (Qur'an, duas, quotations in [lang=ar] or an Arabic font) is left untouched.
*/
(function () {
  "use strict";
  var W = window.AZ_RO_WORDS || {};
  var html = document.documentElement;
  var MARKS = /[ً-ْٰـٕٖٟٔٗ٘]/g;
  var URDU = /[ٹڈڑںھہۂۃےۓگچپژ]/;            // letters Urdu uses and Arabic does not
  var ARONLY = /[ةيكهىأإؤ]/;                   // letters Arabic uses and Urdu does not
  var SCRIPT = /[؀-ۿݐ-ݿ]/;
  var WORD = /([ء-غف-ٰٟ-ۓەݐ-ݿ‌‍]+)/;
  var AR_FONT = /amiri|ruqaa|thuluth|diwani|reem|naskh|indopak|scheherazade|uthman|kufi|arabic|lateef|me_quran|kfgqpc/i;

  /* ---------- letters, for words not in the list ---------- */
  var L = { "ب": "b", "پ": "p", "ت": "t", "ٹ": "t", "ث": "s", "ج": "j", "چ": "ch", "ح": "h", "خ": "kh", "د": "d", "ڈ": "d", "ذ": "z", "ر": "r", "ڑ": "r",
    "ز": "z", "ژ": "zh", "س": "s", "ش": "sh", "ص": "s", "ض": "z", "ط": "t", "ظ": "z", "غ": "gh", "ف": "f", "ق": "q", "ک": "k", "ك": "k", "گ": "g", "ل": "l",
    "م": "m", "ن": "n", "ں": "n", "ھ": "h", "ۃ": "t", "ة": "a" };
  function letters(w) {
    var o = "", ch, prevC = false;
    for (var i = 0; i < w.length; i++) {
      ch = w[i]; var last = i === w.length - 1, first = i === 0;
      if (ch === "آ") { o += "aa"; prevC = false; }
      else if (ch === "ا" || ch === "أ" || ch === "إ" || ch === "ٱ") { o += first ? "a" : "aa"; prevC = false; }
      else if (ch === "و" || ch === "ؤ") { if (first) { o += "w"; prevC = true; } else { o += "o"; prevC = false; } }
      else if (ch === "ی" || ch === "ي" || ch === "ى" || ch === "ئ") { if (first) { o += "y"; prevC = true; } else { o += last ? "i" : "ee"; prevC = false; } }
      else if (ch === "ے" || ch === "ۓ") { o += "e"; prevC = false; }
      else if (ch === "ہ" || ch === "ه" || ch === "ۂ") { if (last && !first) o += "a"; else o += "h"; prevC = false; }
      else if (ch === "ع") { if (first) o += "a"; prevC = false; }
      else if (ch === "ء") { }
      else if (L[ch]) { if (prevC && i === 1) o += "a"; o += L[ch]; prevC = ch !== "ھ"; }
    }
    return o.replace(/(.)\1\1+/g, "$1$1");
  }

  function key(w) { return w.replace(/ۂ/g, "ہ").replace(MARKS, "").replace(/[‌‍]/g, "").replace(/ي/g, "ی").replace(/ك/g, "ک"); }
  function look(k) {
    if (W[k] !== undefined) return W[k];
    var h = k.replace(/ه/g, "ہ"); if (W[h] !== undefined) return W[h];
    if (k.length > 3 && k.slice(0, 2) === "ال" && W[k.slice(2)] !== undefined) return "al-" + W[k.slice(2)];
    if (k.length > 2 && k[0] === "و" && W[k.slice(1)] !== undefined) return "wa-" + W[k.slice(1)];
    return null;
  }
  /* words whose spelling depends on the word before or after */
  var AFTER = { "امام زمانہ": "Zamana", "امام زمانے": "Zamane", "عہد ظہور": "Zuhoor", "اہل سنت": "Sunnat", "کم عمری": "umri", "صاحب زمان": "Zaman", "صاحب الزمان": "al-Zaman", "کتب خانہ": "Khana", "خانہ منتظر": "Muntazir" };
  var BEFORE = { "صحیح مسلم": "Sahih", "صحیح بخاری": "Sahih", "صحیح ترمذی": "Sahih", "سنن ترمذی": "Sunan", "غیبت کبری": "Ghaibat", "غیبت صغری": "Ghaibat" };
  var KYA_NEXT = /^(آپ|تم|وہ|یہ|ہم|کوئی|کبھی|کسی|میں|اس|ان|ہمارے|ہماری|تمہارے|تمہاری)$/;
  function word(raw, prev, next, sent) {
    var suf = "", w = raw;
    if (/ِ$/.test(w)) { suf = "-e"; w = w.slice(0, -1); }
    else if (/ۂ$/.test(w)) { suf = "-e"; w = w.slice(0, -1) + "ہ"; }
    var k = key(w);
    if (k === "بی بی") return "Bibi";
    if (k === "میں") return (sent || next === "نے") ? "main" : "mein";
    if (k === "کیا") return (sent || KYA_NEXT.test(next || "") || next === null) ? "kya" : "kiya";
    var r = AFTER[prev + " " + k] || BEFORE[k + " " + next] || look(k);
    if (r === null) { r = letters(k); if (window.AZ_RO_MISS) window.AZ_RO_MISS[k] = r; }
    return r + suf;
  }

  var DIG = "۰۱۲۳۴۵۶۷۸۹", ADIG = "٠١٢٣٤٥٦٧٨٩";
  function punct(s) {
    return s.replace(/[۰-۹]/g, function (d) { return DIG.indexOf(d); }).replace(/[٠-٩]/g, function (d) { return ADIG.indexOf(d); })
      .replace(/۔/g, ".").replace(/،/g, ",").replace(/؟/g, "?").replace(/؛/g, ";").replace(/٪/g, "%").replace(/٫/g, ".").replace(/٬/g, ",")
      .replace(/[”“«»]/g, function (q) { return { "”": "“", "“": "”", "«": "“", "»": "”" }[q]; })
      .replace(/‏|‎/g, "");
  }

  /* Roman text for one Urdu string. capStart: capitalise the first word. */
  function roman(s, capStart, ctx) {
    var parts = punct(s).split(WORD), out = "", i, words = [], wi = 0;
    ctx = ctx ? punct(ctx) : "";
    for (i = 1; i < parts.length; i += 2) words.push(key(parts[i]));
    for (i = 0; i < parts.length; i++) {
      if (i % 2 === 0) { out += parts[i]; continue; }
      if (words[wi] === "بی" && words[wi + 1] === "بی" && /^\s+$/.test(parts[i + 1] || "")) { parts[i + 1] = ""; parts[i + 2] = "بی بی"; wi++; continue; }
      var all = ctx + out;
      var sent = (capStart !== false && !/[A-Za-z0-9\u0600-\u06FF]/.test(all)) || /:\s*[“"]$/.test(all) ||
        (/[.?!]["”’)]?\s+["“(]?$/.test(all) && !/\([a-z.]+\)\s*$/.test(all));
      var r = word(parts[i], words[wi - 1] || null, words[wi + 1] || null, sent);
      /* the prefix بے is written joined to its word: beshak, behad, beqarar */
      if (words[wi] === "بے" && words[wi + 1] && !/^(میں|اور|کا|کی|کے|سے|ہے|ہیں|کو|پر|نے|تک)$/.test(words[wi + 1]) && /^[\s\u200c]+$/.test(parts[i + 1] || "")) {
        var nx = word(parts[i + 2], "بے", words[wi + 2] || null, false);
        r = (sent ? "Be" : "be") + nx.charAt(0).toLowerCase() + nx.slice(1); i += 2; wi++;
      }
      /* ذمہ داری is one word: zimmedaari */
      if (words[wi] === "ذمہ" && /^دار/.test(words[wi + 1] || "") && /^[\s\u200c]+$/.test(parts[i + 1] || "")) {
        r = (sent ? "Zimme" : "zimme") + word(parts[i + 2], "ذمہ", words[wi + 2] || null, false); i += 2; wi++;
      }
      /* جلد: "jild" (a volume) before a number, otherwise "jald" (soon) */
      if (words[wi] === "جلد") r = /^\s*\d/.test(parts[i + 1] || "") ? "jild" : "jald";
      /* the future ending is joined to its verb: uthaeinge, hoga */
      while (/^(گے|گی|گا)$/.test(words[wi + 1] || "") && /^[\s\u200c]+$/.test(parts[i + 1] || "")) {
        r += word(parts[i + 2], words[wi], words[wi + 2] || null, false); i += 2; wi++;
      }
      if (r.charAt(0) === "(" && /\($/.test(out) && /^\)/.test(parts[i + 1] || "")) r = r.slice(1, -1);
      if (sent) r = r.charAt(0).toUpperCase() + r.slice(1);
      out += r; wi++;
    }
    return out;
  }

  /* ---------- the page ---------- */
  function isUrdu(t) { return URDU.test(t) || !ARONLY.test(t) && !/[\u064B-\u0652]/.test(t); }
  function arabicCtx(el, text) {
    var l = el.closest("[lang]"), lg = l ? (l.getAttribute("lang") || "").toLowerCase() : "";
    if (/^(ar|fa)/.test(lg)) return true;
    if (el.closest("[data-no-ro]")) return true;
    if (URDU.test(text)) return false;
    if (ARONLY.test(text)) return true;
    return AR_FONT.test(getComputedStyle(el).fontFamily.split(",")[0]);
  }
  var SERIF = "var(--serif,'Cormorant Garamond',Georgia,serif)", SANS = "var(--sans,Inter,system-ui,sans-serif)";
  function fixUp(el) {
    for (var e = el; e && e !== document.body && e !== html; e = e.parentElement) {
      if (e.getAttribute("dir") === "rtl") e.setAttribute("dir", "ltr");
      if (e.getAttribute("lang") === "ur") e.setAttribute("lang", "ur-Latn");
      if (e.hasAttribute("data-ur")) e.removeAttribute("data-ur");
      if (e.__ro) continue;
      e.__ro = 1;
      var cs = getComputedStyle(e);
      if (cs.direction === "rtl") e.style.direction = "ltr";
      if (/nastaliq/i.test(cs.fontFamily)) {
        e.style.fontFamily = /^H[1-4]$/.test(e.tagName) || e.closest("h1,h2,h3,h4") ? SERIF : SANS;
        if (parseFloat(cs.lineHeight) / parseFloat(cs.fontSize) > 1.8) e.style.lineHeight = "1.6";
      }
      if (cs.textAlign === "right" && cs.direction === "rtl") e.style.textAlign = "left";
    }
  }
  /* the text before this node in the same block, so a sentence that continues across <b>, <em> … is not capitalised */
  function before(n, p) {
    var b = p;
    while (b && b !== document.body && /^inline/.test(getComputedStyle(b).display)) b = b.parentElement;
    if (!b || b === p && !n.previousSibling) return "";
    try { var r = document.createRange(); r.setStart(b, 0); r.setEnd(n, 0); return r.toString().slice(-40); } catch (e) { return ""; }
  }
  function doText(n) {
    var v = n.nodeValue; if (!v || !SCRIPT.test(v)) return;
    var p = n.parentElement; if (!p || /^(SCRIPT|STYLE|TEXTAREA|CODE|PRE)$/.test(p.tagName)) return;
    if (arabicCtx(p, v)) return;
    var out = roman(v, true, before(n, p));
    n.nodeValue = out; DONE.set(n, out);
    fixUp(p);
  }
  /* what we wrote, so the Urdu translator does not turn a Roman word that is also English ("Academy") back into Urdu */
  var DONE = new WeakMap();
  var ATTRS = ["placeholder", "aria-label", "title", "alt"];
  function doAttrs(el) {
    if (!el.getAttribute) return;
    for (var i = 0; i < ATTRS.length; i++) {
      var v = el.getAttribute(ATTRS[i]);
      if (v && SCRIPT.test(v) && isUrdu(v)) { var o = roman(v); el.setAttribute(ATTRS[i], o); (el.__roA || (el.__roA = {}))[ATTRS[i]] = o; }
    }
  }
  var busy = false;
  function walk(root) {
    if (!root) return;
    busy = true;
    try {
      if (root.nodeType === 3) { doText(root); return; }
      if (root.nodeType !== 1 || /^(SCRIPT|STYLE)$/.test(root.tagName)) return;
      doAttrs(root);
      var els = root.querySelectorAll("[placeholder],[aria-label],[title],[alt]");
      for (var i = 0; i < els.length; i++) doAttrs(els[i]);
      var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n, list = [];
      while ((n = tw.nextNode())) list.push(n);
      list.forEach(doText);
    } finally { busy = false; }
  }
  /* pages that write their own Urdu switch the whole document to RTL and Nastaliq; keep it LTR */
  function fixRoot() {
    if (html.getAttribute("lang") === "ur") html.setAttribute("lang", "ur-Latn");
    if (html.getAttribute("dir") === "rtl") html.setAttribute("dir", "ltr");
    if (html.classList.contains("ur")) html.classList.remove("ur");
    if (html.classList.contains("az-ur")) html.classList.remove("az-ur");
    if (document.title && SCRIPT.test(document.title) && isUrdu(document.title)) document.title = roman(document.title);
  }

  var started = false;
  window.AZ_ROMANIZE = {
    text: roman,
    done: function (n) { return DONE.get(n) === n.nodeValue; },
    doneAttr: function (el, a) { return !!(el.__roA && el.__roA[a] === el.getAttribute(a)); },
    start: function () {
      if (started) return; started = true;
      fixRoot(); walk(document.body);
      new MutationObserver(fixRoot).observe(html, { attributes: true, attributeFilter: ["lang", "dir", "class"] });
      var t = document.querySelector("title");
      if (t) new MutationObserver(fixRoot).observe(t, { childList: true, characterData: true, subtree: true });
      new MutationObserver(function (muts) {
        if (busy) return;
        muts.forEach(function (m) {
          if (m.type === "characterData") walk(m.target);
          else if (m.type === "attributes") doAttrs(m.target);
          else m.addedNodes.forEach(walk);
        });
      }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
    }
  };
  fixRoot();
})();
