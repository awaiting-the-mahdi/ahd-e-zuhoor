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
  /* کیا: "kya" (what? / the word that opens a yes-no question) or "kiya" (did, done: the past of کرنا).
     Grammar does most of the work: "kiya" is a transitive past verb, so its subject takes نے (hum ne paida kiya),
     or it is passive (kiya gaya, kiya ja raha hai), or negated (nahin kiya). */
  var KYA_NEXT = /^(آپ|تم|تو|وہ|یہ|ہم|کوئی|کبھی|کسی|اس|ان|ہمارے|ہماری|تمہارے|تمہاری|تمھارا|تمھاری|تمھارے|تمہیں|انہیں|اسے|ایسا|ایسی|ایسے|واقعی|سچ|جب|اگر)$/;
  /* the passive after "kiya": gaya, ja raha, ja sake, jayega … (not jaanoon / jaanta: "kya jaanoon", what do I know) */
  var PASSIVE = /^(گیا|گئی|گئے|گیے|گئیں|جا|جائے|جائیں|جائیگا|جائیگی|جاتا|جاتی|جاتے|جانا|جارہا|جارہی|جارہے|جاسکتا|جاسکتی|جاسکتے|جاسکے|جاسکی|جاچکا|جاچکی|جاچکے)$/;
  var AUX = /^(ہے|ہیں|تھا|تھی|تھے|تھیں|ہو|ہوں|ہوگا|ہوگی|ہوگے|ہوتا|ہوتی|ہوتے)$/;
  /* the noun or adjective of a compound verb: ادا کیا, نازل کیا, بیان کیا … */
  var CONJ = /^(ادا|ظاہر|بیان|قبول|پیدا|شروع|ختم|عطا|منع|حاصل|معاف|یاد|پیش|اختیار|نازل|ثابت|قائم|تیار|جمع|خرچ|تقسیم|ذکر|وعدہ|فیصلہ|کام|انکار|اقرار|اعلان|استعمال|تسلیم|دور|بند|روانہ|زندہ|ہلاک|تباہ|برباد|گمراہ|عمل|ظلم|شکر|صبر|اطاعت|اتباع|مسخر|مقرر|طے|حل|پورا|پوری|جاری|تبدیل|محسوس|معلوم|سجدہ|توبہ|کفر|شرک|فساد|غور|قتل|حرام|حلال|واضح|ذلیل|رسوا|مبتلا|محروم|بلند|داخل|خارج|آباد|سیراب|درست|صاف|پاک|روشن|ترک|طلب|احسان|اشارہ|انتظار|ارادہ|بھروسہ|یقین|تصدیق|انتخاب|مضبوط|غرق|مسلط|جدا|الگ|ایجاد|مطالبہ|مشورہ|حملہ|جہاد|ہجرت|سفر|خطاب|کلام|مقابلہ|معاہدہ|احترام|تعمیر|حفاظت|تلاوت|تعریف|تبلیغ|اصلاح|انصاف|تخلیق|خلق|کوشش|محنت|برآمد|سایہ|پیچھا|اختلاف|اظہار|تعجب|عجب|نصیب|منتقل|ہموار|آزاد|خوش|راضی|ناراض|سرفراز|ممتاز|فراموش|نظرانداز|برداشت|مخاطب|غضب|جادو|زخمی|اکٹھا|آلودہ|مظاہرہ|منتخب|بخل|انحراف|سلام|تجاوز|تمنا|عبادت|جھگڑا|شک|برپا|افترا|وحی|صالح|برتاؤ|انفاق|احسان|سوال|ذبح|بلند|غلط|کمی|اضافہ|پیروی|نفرت|محبت|لعنت|سرکشی|تکبر|استکبار|مذاق|استہزاء|انتقام|تقاضا|اہتمام|قیام|نکاح|طلاق|رجوع|انتظام|بندوبست|خیال|گمان|دعوی|دعویٰ|التجا|فریاد|امداد|نصرت|نافرمانی|خیانت|وفا|ایفا|افطار|اعتکاف|حج|عمرہ|غسل|وضو|تیمم|رخ|عہد|احساس|سودا|پسند|آسان|مقدم|موخر|مؤخر|باہر|باخبر|اعراض|خبردار|آگاہ|پرہیز|لمس|نکاح|جماع|سپرد|سوار|زیر|زِیر|زیادتیاں|زیادتی|باتیں|شہید|رنجیدہ|غمگین|واجب|نقل|اعتراض|لمبا|مختص|محفوظ|مخصوص|شمار|احاطہ|پختہ|تنہا|برابر|بری|دعوی|دعویٰ|عرض|مسخر|ایجاد|کالا|مہیا)$/;
  var QWORD = /^(کیوں|کب|کہاں|کیسے|کیسا|کیسی|کس|کن|کون|کتنا|کتنی|کتنے|کدھر)$/;
  /* c: { prev, next, sent (sentence start), start (clause start), joined (no punctuation before), q (sentence ends in ?),
          qBefore (a question word earlier in the sentence), ne (ergative نے earlier in the clause) } */
  var KYA_PREV = /^(تو|اور|پھر|اب|تب|کو|کا|کی|کے|تمہارا|تمہاری|تمہارے|ہمارا|ہماری|ہمارے|میرا|میری|میرے|تیرا|تیری|تیرے|آپکا|ان|اس)$/;
  var SUBJ = /^(تم|میں|یہ|وہ|ہم|آپ|لوگ|تو|کرکے|کرکر)$/;
  /* after "ne kya": the verb, or the object then its verb (tum ne kya kaha, kya jawaab diya, kya paida kiya) */
  var SAID = /^(کہا|دیکھا|سنا|سوچا|پایا|سمجھا|چاہا|مانگا|بھیجا|کمایا|لکھا|پڑھا|سیکھا|فرمایا|بتایا|کیا|جواب)$/;
  var VERB2 = /^(کیا|کئے|کیے|کی|دیا|دی|دیے|دیئے|لیا|لی|لئے|بھیج|کہا|قرار)$/;
  var LINK = /^(کہ|تو|اور|پھر|یا|لیکن|مگر|جب|جس|جو|جن|جنہیں|اگر|ان|اس|وہ|یہ)$/;
  /* speech verbs: what follows is a new clause (Fir'aun ne kaha: woh daleel kya hai) */
  var SAY = /^(کہا|کہتے|کہتا|کہتی|کہیں|کہے|پوچھا|پوچھتے|فرمایا|بولا|بولے|دیکھا|جانتا|جانتے)$/;
  function kya(c) { var r = kya0(c); if (r === "kya" && c.S) c.S.kya = true; return r; }
  function kya0(c) {
    var prev = c.prev || "", next = c.nextJoined ? c.next || "" : "";   // punctuation after کیا ends its clause
    if (/^(اور|کہ|تاکہ|لیکن|مگر|بلکہ|جبکہ|تو)$/.test(next)) next = "";   // so does a conjunction: … sawaar kiya aur …
    var content = next && !AUX.test(next);
    if (prev === "بھی" && c.prev2) prev = c.prev2;                      // jihaad bhi kiya
    if (PASSIVE.test(next)) return "kiya";                              // kiya gaya, kiya ja raha hai
    if (/^(ہوا|ہوئی|ہوئے)$/.test(next) && c.next2 && !AUX.test(c.next2) && !/^(کہ|جو|ہے|\?)$/.test(c.next2)) return "kiya";  // kiya hua waada
    if (c.next === "کیا" && (c.nextJoined || c.prev === "کیا")) return "kya";  // kya kya, kya kiya (also "کیا کیا, کیا ہے")
    if ((c.sent || c.start) && prev !== "کیا") return "kya";            // Kya tum … ? / … ke kya jab hum …
    if (c.joined && content && (AUX.test(prev) || /^(دی|دیا|گیا|گئی|گئے)$|جائے$/.test(prev))) return "kya";  // … hai. Kya tum …
    if (prev === "کیا" && (c.joined || !content)) return content ? "kya" : "kiya";  // kya kya (what all) / kya kiya
    if (c.joined && (prev === "نہیں" || prev === "نہ")) return "kiya";  // nahin kiya
    if (c.joined && KYA_PREV.test(prev)) return "kya";                  // to kya, aur kya, un ka kya hoga, tumhaara kya khayaal
    if (c.joined && prev === "نے") return content && !/^(جنہیں|جس|جو|جن|وہ|یہ|اور|تو|کہ)$/.test(next) ? "kya" : "kiya";  // tum ne kya kaha / logon ne kiya jinhein …
    if (c.ne && content && !LINK.test(next) && !/^کر/.test(next) && !CONJ.test(prev) && (SAID.test(next) || VERB2.test(c.next2 || ""))) return "kya";  // ne … kya jawaab diya, kya paida kiya
    if (/^کر/.test(next)) return !c.rel && (SUBJ.test(prev) || /^(یہ|وہ)$/.test(c.prev2 || "")) ? "kya" : "kiya";  // tum kya karoge, yeh hissa kya karta hai / tasbeeh kiya karo, jo kuch woh kiya karte the
    if (c.like && !content) return "kiya";                             // jis tarah pehle kiya tha
    if (CONJ.test(prev) && !(!content && c.q && !c.qBefore && !c.ne)) return "kiya";  // ada kiya, nazil kiya hai, paida kiya phir … (but: Hajj kya hai?)
    if (KYA_NEXT.test(next) && !c.ne) return "kya";                     // kya aap, kya yeh log
    if (!content) {
      if (c.q && !c.qBefore && !c.ne) return "kya";                     // yeh kya hai?
      if (next) return c.ne ? "kiya" : "kya";                           // tum ne … kiya hai / us waqt kya hoga
      if (c.S && c.S.kya && !c.ne && !CONJ.test(prev)) return "kya";    // neki kya hai aur burai kya.
      return c.ne || !c.q ? "kiya" : "kya";                             // us ne kiya.
    }
    return c.ne ? "kiya" : "kya";                                       // hum ne … kiya, phir … / tum kya chahte ho
  }
  function word(raw, prev, next, sent, kc) {
    var suf = "", w = raw;
    if (/ِ$/.test(w)) { suf = "-e"; w = w.slice(0, -1); }
    else if (/ۂ$/.test(w)) { suf = "-e"; w = w.slice(0, -1) + "ہ"; }
    var k = key(w);
    if (k === "بی بی") return "Bibi";
    if (k === "میں") return (sent || next === "نے") ? "main" : "mein";
    if (k === "کیا") { kc = kc || {}; kc.prev = prev; kc.next = next; kc.sent = sent; return kya(kc); }
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
  /* two Urdu words written as one Roman word */
  var JOIN = { "آن لائن": "online", "ان شاء": "In sha", "بات چیت": "baat cheet" };
  function sent0(all) { return !/[A-Za-z0-9]/.test(all) || /[.?!]["”’)]?\s+["“(]?$/.test(all); }
  /* کیا written joined to the next word (کیاہے, کیاجائے, کیااور): split it so the کیا rule sees both */
  var KYA_GLUED = /(^|[^\u0600-\u06FF])کیا(ہے|ہیں|تھا|تھی|تھے|گیا|گئی|گئے|گیے|جائے|جائیں|جائیگا|جائےگا|جاتا|جاتی|جاتے|جارہا|جارہی|جارہے|جاسکتا|جاسکتی|جاسکے|جانا|اور|تو|تم|ہم|ان|اس|یہ|وہ|اگر|جانیں|جانے|جہنم|جہّنم)(?![\u0600-\u06FF])/g;
  function roman(s, capStart, ctx) {
    s = String(s).replace(KYA_GLUED, "$1کیا $2");
    var parts = punct(s).split(WORD), out = "", i, words = [], wi = 0;
    ctx = ctx ? punct(ctx) : "";
    for (i = 1; i < parts.length; i += 2) words.push(key(parts[i]));
    /* for each word, what the کیا rule needs: does its sentence end in a question mark, is there a question
       word before it in the sentence, is there an ergative نے before it in its clause, does a clause start here */
    var KC = [], j, start = 0, cl = 0;
    for (j = 0; j < words.length; j++) {
      var gb = parts[2 * j] || "";
      if (j > 0 && /[,;:\-(]/.test(gb)) cl = j;
      if (j > 0 && (words[j - 1] === "کہ" || words[j - 1] === "تو" || words[j - 1] === "یا" || SAY.test(words[j - 1]))) cl = j;
      var ne = false, rel = false, like = false;
      for (var m = cl; m < j; m++) {
        if (words[m] === "نے") ne = true;
        if (words[m] === "جو" || words[m] === "جس" || words[m] === "جن") rel = true;
        if (words[m] === "طرح" && m > 0 && /^(جس|اس|اسی)$/.test(words[m - 1])) like = true;
      }
      KC[j] = { start: j > 0 && (cl === j), joined: j > 0 && /^[\s\u200c]*$/.test(gb), ne: ne, rel: rel, like: like, prev2: words[j - 2] || null, next2: words[j + 2] || null,
        nextJoined: /^[\s\u200c]*$/.test(parts[2 * j + 2] || "") };
      var gap = parts[2 * j + 2] || "";
      if (/[.!?]/.test(gap) || j === words.length - 1) {
        var isQ = /\?/.test(gap), seen = false, S = {};
        for (m = start; m <= j; m++) {
          KC[m].q = isQ; KC[m].qBefore = seen; KC[m].S = S;
          if (QWORD.test(words[m]) || (words[m] === "کیا" && (m === start || KYA_NEXT.test(words[m + 1] || "")))) seen = true;
        }
        start = j + 1; cl = j + 1;
      }
    }
    for (i = 0; i < parts.length; i++) {
      if (i % 2 === 0) { out += parts[i]; continue; }
      if (words[wi] === "بی" && words[wi + 1] === "بی" && /^\s+$/.test(parts[i + 1] || "")) { parts[i + 1] = ""; parts[i + 2] = "بی بی"; wi++; continue; }
      if (JOIN[words[wi] + " " + words[wi + 1]] && /^[\s\u200c]+$/.test(parts[i + 1] || "")) {
        var jr = JOIN[words[wi] + " " + words[wi + 1]];
        out += (sent0(ctx + out) ? jr.charAt(0).toUpperCase() + jr.slice(1) : jr); i += 2; wi += 2; continue;
      }
      var all = ctx + out;
      var sent = (capStart !== false && !/[A-Za-z0-9\u0600-\u06FF]/.test(all)) || /:\s*[“"]$/.test(all) ||
        (/[.?!]["”’)]?\s+["“(]?$/.test(all) && !/\([a-z.]+\)\s*$/.test(all));
      var r = word(parts[i], words[wi - 1] || null, words[wi + 1] || null, sent, KC[wi]);
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
