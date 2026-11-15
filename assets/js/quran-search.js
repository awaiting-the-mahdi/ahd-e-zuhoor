/*
  Forgiving surah search: handles typos, different English spellings
  (Fatiha / Fateha / Fatihah / Faatiha), "Al-" prefixes, Arabic and Urdu script,
  surah numbers and English meanings. Returns surah indexes (0-113) best first.
*/
(function () {
  "use strict";
  // Extra common names and spellings people type.
  var ALIAS = {
    1: "fatiha fateha fatihah alhamd hamd opening", 2: "baqara baqarah bakra cow", 3: "imran imraan,aal e imran,ale imran", 4: "nisa nisaa women", 5: "maida maidah table",
    6: "anam anaam cattle", 7: "araf aaraf", 9: "tauba tawba taubah repentance baraat", 10: "yunus younus jonah", 11: "hud hood", 12: "yusuf yousuf joseph",
    13: "rad raad thunder", 14: "ibrahim abraham", 17: "isra,bani israil,night journey", 18: "kahf kahaf cave", 19: "maryam mariam mary", 20: "taha ta ha",
    21: "anbiya prophets", 22: "hajj haj", 23: "muminun mominoon believers", 24: "noor nur light", 25: "furqan furqaan criterion", 26: "shuara poets",
    27: "naml ant", 28: "qasas stories", 29: "ankabut spider", 30: "rum room romans", 31: "luqman lukman", 32: "sajda sajdah prostration", 33: "ahzab",
    36: "yasin yaseen yaaseen,ya sin", 38: "sad saad", 39: "zumar", 40: "ghafir momin mumin", 41: "fussilat ha mim sajda", 47: "muhammad", 48: "fath fatah victory",
    49: "hujurat", 50: "qaf", 51: "dhariyat zariyat", 53: "najm star", 54: "qamar moon", 55: "rahman rehman rahmaan", 56: "waqia waqiah waqiyah event",
    57: "hadid iron", 59: "hashr", 62: "jumua jumuah juma friday", 63: "munafiqun hypocrites", 67: "mulk tabarak", 71: "nuh nooh noah", 72: "jinn",
    73: "muzzammil muzammil", 74: "muddaththir mudassir", 76: "insan dahr hal ata", 78: "naba amma", 85: "buruj burooj", 87: "ala aala", 93: "duha zuha",
    94: "inshirah,sharh,alam nashrah,alam nashrah laka", 95: "tin teen fig", 96: "alaq iqra", 97: "qadr qadar", 99: "zalzala zilzal", 101: "qaria qariah", 102: "takathur",
    103: "asr", 105: "fil feel elephant", 106: "quraish quraysh", 108: "kauthar kausar kawthar", 109: "kafirun kafiroon", 110: "nasr", 111: "lahab masad tabbat",
    112: "ikhlas ikhlaas,qul huwallah,qul hu wallah,tauheed tawhid", 113: "falaq", 114: "nas naas"
  };
  function base(s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/['’`ʿʾ-]/g, " ").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  }
  function stripAl(s) { return s.replace(/^(al|an|ar|as|at|ad|az|ash|ad|aal|e)\s*/, ""); }
  // Sound key: merge spellings that sound alike, collapse doubled letters, drop vowels after the first letter.
  function sound(s) {
    s = stripAl(base(s)).replace(/\s+/g, "");
    s = s.replace(/ph/g, "f").replace(/q/g, "k").replace(/c/g, "k").replace(/th|dh|z/g, "z").replace(/sh/g, "s").replace(/kh/g, "k").replace(/gh/g, "g")
         .replace(/w/g, "u").replace(/y/g, "i").replace(/(.)\1+/g, "$1");
    if (!s) return "";
    return s[0] + s.slice(1).replace(/[aeiou]/g, "").replace(/h$/, "");
  }
  function arabic(s) {
    return String(s).normalize("NFD").replace(/[ً-ٰٟۖ-ۭ]/g, "").replace(/[إأآٱ]/g, "ا").replace(/ى/g, "ي").replace(/[ةه]/g, "ه").replace(/^ال/, "").replace(/\s+/g, "");
  }
  function lev(a, b) {
    if (Math.abs(a.length - b.length) > 3) return 9;
    var p = [], i, j;
    for (j = 0; j <= b.length; j++) p[j] = j;
    for (i = 1; i <= a.length; i++) {
      var prev = p[0]; p[0] = i;
      for (j = 1; j <= b.length; j++) { var t = p[j]; p[j] = Math.min(p[j] + 1, p[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = t; }
    }
    return p[b.length];
  }
  var INDEX = null;
  function build(SUR) {
    INDEX = SUR.map(function (s, i) {
      var al = (ALIAS[i + 1] || "").split(",").reduce(function (a, ph) { ph = ph.trim(); if (!ph) return a; return a.concat(ph.indexOf(" ") > 0 && ALIAS[i + 1].indexOf(",") >= 0 ? [ph] : ph.split(" ")); }, []);
      var names = [s[0], s[2]].concat(al);
      var words = [];
      names.forEach(function (n) { var b = stripAl(base(n)); words.push(b.replace(/\s+/g, "")); b.split(" ").forEach(function (w) { if (w.length > 2) words.push(w); }); });
      return { words: words, sounds: words.map(sound), ar: arabic(s[1]) };
    });
  }
  window.AZQuranSearch = function (query, SUR) {
    if (!INDEX) build(SUR);
    var q = String(query || "").trim();
    if (!q) return [];
    if (/^\d+$/.test(q)) { var n = +q; return n >= 1 && n <= 114 ? [n - 1] : []; }
    var scored = [];
    if (/[؀-ۿ]/.test(q)) {
      var qa = arabic(q);
      INDEX.forEach(function (x, i) { if (x.ar.indexOf(qa) >= 0) scored.push([i, x.ar === qa ? 0 : 1]); else if (qa.length > 2 && lev(qa, x.ar) <= 1) scored.push([i, 2]); });
    } else {
      var qb = stripAl(base(q)).replace(/\s+/g, ""), qs = sound(q);
      if (!qb) return [];
      INDEX.forEach(function (x, i) {
        var best = 99;
        x.words.forEach(function (w, k) {
          if (w === qb) best = Math.min(best, 0);
          else if (w.indexOf(qb) === 0) best = Math.min(best, 1);
          else if (qb.length >= 3 && w.indexOf(qb) > 0) best = Math.min(best, 2);
          if (qs.length >= 2 && x.sounds[k] === qs) best = Math.min(best, 1.5);
          else if (qs.length >= 2 && x.sounds[k].indexOf(qs) === 0) best = Math.min(best, 2.5);
          if (qb.length >= 4) { var d = lev(qb, w.slice(0, qb.length + 1)), d2 = lev(qb, w); var dd = Math.min(d, d2); if (dd <= (qb.length >= 7 ? 2 : 1)) best = Math.min(best, 3 + dd); }
        });
        if (best < 99) scored.push([i, best]);
      });
    }
    scored.sort(function (a, b) { return a[1] - b[1] || a[0] - b[0]; });
    // Keep only results close to the best one, so a clear match is not buried in weak guesses.
    var top = scored.length ? scored[0][1] : 0;
    return scored.filter(function (s) { return s[1] <= top + 1.5; }).map(function (s) { return s[0]; });
  };
})();
