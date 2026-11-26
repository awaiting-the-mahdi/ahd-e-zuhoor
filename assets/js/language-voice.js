/*
  AHD-E-ZUHOOR — Language Courses: authentic voices
  -------------------------------------------------
  Everything Zahra and Ali say in a language course (words, role-play videos, word episodes,
  quizzes) is spoken by a native neural voice for that language, recorded ahead of time into
  assets/audio/lang/ by tools/language-audio/generate.py. When a recording is missing the page
  falls back to the best native voice the visitor's device has.

  VOICES  the native voice cast for each language: Zahra = girl, Ali = boy.
          Change a name here, then run the generator again to re-record.
  key()   the file name of a recording: a hash of the voice and the exact text.
  script() the lines of a word episode (shared by the page and the generator, so every
          narrated line has a recording).
*/
(function (root) {
  "use strict";

  var VOICES = {
    /* Modern Standard / Hijazi Saudi Arabic */
    "ar-SA": { girl: "ar-SA-ZariyahNeural", boy: "ar-SA-HamedNeural" },
    /* spoken Iraqi Arabic (the Arabic role-play videos) */
    "ar-IQ": { girl: "ar-IQ-RanaNeural", boy: "ar-IQ-BasselNeural" },
    /* Tehrani Persian */
    "fa-IR": { girl: "fa-IR-DilaraNeural", boy: "fa-IR-FaridNeural" },
    /* Pakistani Urdu */
    "ur-PK": { girl: "ur-PK-UzmaNeural", boy: "ur-PK-AsadNeural" },
    /* American English (English course): Ana is a child's voice */
    "en-US": { girl: "en-US-AnaNeural", boy: "en-US-AndrewNeural" },
    /* British English (narration in every course): Maisie is a child's voice */
    "en-GB": { girl: "en-GB-MaisieNeural", boy: "en-GB-RyanNeural" }
  };

  /* Zahra and Ali's own voices: what they say as themselves (welcomes, explanations, praise), in
     English or in Urdu (Urdu and Roman Urdu sites). Children's voices: "@n" raises a voice by n
     semitones with its formants, so it sounds younger rather than squeaky (the generator does this).
     Lines in the language being taught keep the native voices above. */
  var GUIDES = {
    "en-GB": { girl: "en-US-AnaNeural", boy: "en-US-BrianNeural@4.5" },
    "ur-PK": { girl: "ur-PK-UzmaNeural@3.5", boy: "ur-PK-AsadNeural@5" }
  };
  function guideFor(lang, who) {
    var g = GUIDES[/^ur/.test(lang || "") ? "ur-PK" : "en-GB"];
    return g[who === "boy" ? "boy" : "girl"];
  }

  function voiceFor(lang, who) {
    lang = lang || "en-GB";
    var v = VOICES[lang] || VOICES[lang.split("-")[0] === "en" ? "en-GB" : ""];
    if (!v) return null;
    return v[who === "boy" ? "boy" : "girl"];
  }

  function clean(text) { return String(text).normalize("NFC").replace(/\s+/g, " ").trim(); }

  /* narration is English, except lines written wholly in Urdu script (the English course for Urdu speakers) */
  function narrLang(text) { return /[\u0600-\u06FF]/.test(text) && !/[A-Za-z]/.test(text) ? "ur-PK" : "en-GB"; }

  /* FNV-1a over UTF-16 code units: the generator computes the same value in Python */
  function key(voice, text) {
    var s = voice + "|" + clean(text), h = 0x811c9dc5;
    for (var i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return ("0000000" + h.toString(16)).slice(-8);
  }

  function greet(C) {
    return { persian: ["سلام", "salām"], urdu: ["السلام علیکم", "assalāmu ʿalaikum"], english: ["Assalamu alaykum", "اَلسّلامُ علیکم"] }[C.id] ||
      ["السَّلامُ عَلَيْكُم", "as-salāmu ʿalaykum"];
  }

  /* a word episode. k: g (Zahra) | b (Ali) | both. text: caption, say: what is spoken if different */
  function script(C, li) {
    var l = C.lessons[li], L = [], G = greet(C);
    L.push({ k: "b", t: G[0], tr: G[1], en: "Peace be upon you!", state: "wave", title: true, native: true });
    L.push({ k: "g", text: "Welcome to " + C.name + ", episode " + (li + 1) + ": " + l.title + ".", title: true });
    L.push({ k: "g", text: "Today we'll learn " + l.words.length + " new words. Are you ready?", title: true });
    L.push({ k: "b", text: "Ready!", state: "cheer", title: true });
    l.words.forEach(function (w, i) {
      var q = i % 2 ? "b" : "g", a = i % 2 ? "g" : "b";
      L.push({ k: q, text: "Here's word number " + (i + 1) + ".", w: w, show: 1 });
      L.push({ k: q, pron: true, w: w, show: 1 });
      L.push({ k: a, text: "Hmm... what does it mean?", state: "think", w: w, show: 2 });
      L.push({ k: q, text: "It means “" + w.m + "”!", state: "cheer", sfx: true, w: w, show: 3 });
      if (w.tip) L.push({ k: q, text: w.tip, w: w, show: 3 });
      L.push({ k: q, text: "Let's say it together!", w: w, show: 3 });
      L.push({ k: "both", pron: true, w: w, show: 3 });
    });
    L.push({ k: "g", text: "Great job! Now try the quiz to remember these words.", state: "wave", end: true });
    L.push({ k: "b", text: "See you in the next episode!", state: "wave", end: true });
    return L;
  }

  var WHO = { g: "girl", z: "girl", b: "boy", a: "boy" };
  /* quiz praise (the page picks one at random) */
  var PRAISE = ["Excellent!", "Mashallah!", "Brilliant!", "Well done!", "Amazing!", "Super!"];

  /* every { text, lang, who } a course can speak: used by the generator */
  function utterances(C) {
    var out = [], native = C.voice;
    function add(text, lang, who, narr) { if (text && clean(text)) out.push({ text: clean(text), lang: lang, who: who, narr: !!narr }); }
    /* the language's own name (said on the language academy page) */
    if (native.indexOf("en") !== 0) { add(C.native, native, "girl"); add(C.native, native, "boy"); }
    C.lessons.forEach(function (l, li) {
      l.words.forEach(function (w) { add(w.w, native, "girl"); add(w.w, native, "boy"); });
      script(C, li).forEach(function (line) {
        var who = WHO[line.k] || "girl";
        if (line.t) add(line.t, native, who);
        else if (!line.pron) { var nt = line.say || line.text; add(nt, narrLang(nt), who, true); }
      });
    });
    (C.scenes || []).forEach(function (sc) {
      sc.lines.forEach(function (l) { add(l.t, l.lang === "en" ? "en-GB" : (sc.voice || native), WHO[l.k] || "girl"); });
    });
    /* hero and tab greetings on the course page */
    [["girl", "Welcome to " + C.name + "! Watch an episode, take a quiz, or explore the vocabulary."],
     ["girl", "Watch us act out real situations, or pick a word episode."],
     ["boy", "Quiz time! Let's see what you remember."],
     ["girl", "Here are all your words. Tap a card to see its meaning."],
     ["girl", "Mashallah! You finished the quiz!"], ["boy", "Let's review and try again!"]].forEach(function (h) { add(h[1], "en-GB", h[0], true); });
    /* quiz feedback, said by either of them */
    PRAISE.concat(["Not quite. You'll get it next time!"]).forEach(function (t) { add(t, "en-GB", "girl", true); add(t, "en-GB", "boy", true); });
    return out;
  }

  /* the welcome on the language academy page (pages/academy-languages.html), said by both guides */
  var PACE_LINES = ["Nice and gentle. Every little step counts!", "A steady flight. Great choice!", "Rocket speed! Let's go!", "Warp drive! You're amazing!"];
  function welcome(courses) {
    var t = ["Assalamu alaykum! I'm Zahra.", "And I'm Ali! We'll be your guides on this language voyage.",
      "Just a few quick questions, and we'll be on our way!", "Which course would you like to start?",
      "How fast would you like to travel each day?", "Let's start learning!"].concat(PACE_LINES);
    courses.forEach(function (C) { t.push(C.name + "! " + C.tagline + ".", "Yay! " + C.name + " it is!"); });
    var out = [];
    t.forEach(function (x) { out.push({ text: clean(x), lang: "en-GB", who: "girl", narr: true }, { text: clean(x), lang: "en-GB", who: "boy", narr: true }); });
    return out;
  }

  /* where the recordings live, worked out from this script's own address */
  var base = "";
  try {
    var src = (document.currentScript && document.currentScript.src) || "";
    base = src.replace(/js\/language-voice\.js.*$/, "audio/lang/");
  } catch (e) {}

  /* the recording for this text in this voice, or null */
  function clip(text, lang, who, narr) {
    var have = root.AZ_AUDIO_CLIPS;
    if (!have || !base) return null;
    var v = narr ? guideFor(lang, who) : voiceFor(lang, who);
    if (!v) return null;
    var k = key(v, text);
    return have[k] ? base + k + ".mp3" : null;
  }

  /* a real Qur'an recitation for a reference like "1:2" or "2:5:4-5" (see language-data.js), or null */
  var qbase = base.replace(/lang\/$/, "quran/");
  function quran(ref) {
    var have = root.AZ_QURAN_CLIPS;
    return ref && have && have[ref] && qbase ? qbase + String(ref).replace(/:/g, "_") + ".mp3" : null;
  }

  root.AZ_LANGVOICE = { VOICES: VOICES, quran: quran, narrLang: narrLang, PRAISE: PRAISE, voiceFor: voiceFor, key: key, clean: clean, greet: greet, script: script, utterances: utterances, clip: clip, GUIDES: GUIDES, guideFor: guideFor, welcome: welcome, PACE_LINES: PACE_LINES };
})(typeof window !== "undefined" ? window : globalThis);
