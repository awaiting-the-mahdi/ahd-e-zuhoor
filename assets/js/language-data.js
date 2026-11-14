/*
  AHD-E-ZUHOOR — Language Courses data
  ------------------------------------
  Edit this file to change the five courses, their lessons and words.
  Every page (the welcome flow, videos, quizzes and vocabulary) is built from it.

  Course fields
    id       short id used in the page address (language-course.html?c=<id>)
    name     course name shown everywhere
    native   the language's own name, in its own script
    glyph    one or two letters shown on the course badge
    voice    browser speech language code used to pronounce words (e.g. "ar-SA")
    dir      "rtl" for right-to-left scripts, "ltr" otherwise
    color    accent colour for the course
    tagline  one short line
    lessons  list of { title, words: [ { w, tr, m, tip } ] }
               w   the word in its own script
               tr  transliteration (how to say it), shown and spoken if no native voice exists
               m   meaning
               tip optional extra sentence the kids say in the video
*/
window.AZ_COURSES = [
  {
    id: "arabic",
    name: "Arabic",
    native: "العربية",
    glyph: "ع",
    voice: "ar-SA",
    dir: "rtl",
    color: "#3fd0b5",
    tagline: "Read, speak and understand Arabic",
    lessons: [
      { title: "Greetings", words: [
        { w: "السَّلامُ عَلَيْكُم", tr: "as-salāmu ʿalaykum", m: "Peace be upon you", tip: "We answer with: wa ʿalaykum as-salām, and upon you be peace." },
        { w: "شُكْرًا", tr: "shukran", m: "Thank you" },
        { w: "نَعَم", tr: "naʿam", m: "Yes" },
        { w: "لا", tr: "lā", m: "No" }
      ]},
      { title: "Words of the Heart", words: [
        { w: "عِلْم", tr: "ʿilm", m: "Knowledge" },
        { w: "نُور", tr: "nūr", m: "Light" },
        { w: "صَبْر", tr: "ṣabr", m: "Patience" },
        { w: "كِتَاب", tr: "kitāb", m: "Book", tip: "The Qur'an calls itself al-Kitāb, the Book." }
      ]}
    ]
  },
  {
    id: "quranic-arabic",
    name: "Quranic Arabic",
    native: "العربية القرآنية",
    glyph: "ق",
    voice: "ar-SA",
    dir: "rtl",
    color: "#ffc94d",
    tagline: "Understand the words of the Qur'an",
    lessons: [
      { title: "Words from Al-Fatiha", words: [
        { w: "الْحَمْد", tr: "al-ḥamd", m: "All praise", tip: "Al-ḥamdu lillāh means: all praise belongs to Allah." },
        { w: "رَبّ", tr: "rabb", m: "Lord", tip: "Rabb al-ʿālamīn means Lord of all the worlds." },
        { w: "يَوْم", tr: "yawm", m: "Day" },
        { w: "صِرَاط", tr: "ṣirāṭ", m: "Path", tip: "In Al-Fatiha we ask: guide us to the straight path, aṣ-ṣirāṭ al-mustaqīm." }
      ]},
      { title: "Common Qur'anic Words", words: [
        { w: "هُدًى", tr: "hudā", m: "Guidance", tip: "The Qur'an calls itself hudan lil-muttaqīn, a guidance for the God-conscious." },
        { w: "رَحْمَة", tr: "raḥma", m: "Mercy" },
        { w: "سَمَاء", tr: "samāʾ", m: "Sky, heaven" },
        { w: "أَرْض", tr: "arḍ", m: "Earth" }
      ]}
    ]
  },
  {
    id: "persian",
    name: "Persian",
    native: "فارسی",
    glyph: "فا",
    voice: "fa-IR",
    dir: "rtl",
    color: "#a78bfa",
    tagline: "A language of poetry and scholarship",
    lessons: [
      { title: "Greetings", words: [
        { w: "سلام", tr: "salām", m: "Hello" },
        { w: "متشکرم", tr: "motashakkeram", m: "Thank you" },
        { w: "بله", tr: "bale", m: "Yes" },
        { w: "نه", tr: "na", m: "No" }
      ]},
      { title: "Words of the Heart", words: [
        { w: "دانش", tr: "dānesh", m: "Knowledge" },
        { w: "نور", tr: "nur", m: "Light" },
        { w: "صبر", tr: "sabr", m: "Patience" },
        { w: "کتاب", tr: "ketāb", m: "Book" }
      ]}
    ]
  },
  {
    id: "urdu",
    name: "Urdu",
    native: "اردو",
    glyph: "اُ",
    voice: "ur-PK",
    dir: "rtl",
    color: "#ffb547",
    tagline: "Spoken by millions across South Asia",
    lessons: [
      { title: "Greetings", words: [
        { w: "السلام علیکم", tr: "assalāmu ʿalaikum", m: "Peace be upon you" },
        { w: "شکریہ", tr: "shukriya", m: "Thank you" },
        { w: "جی ہاں", tr: "jī hāṅ", m: "Yes" },
        { w: "نہیں", tr: "nahīṅ", m: "No" }
      ]},
      { title: "Words of the Heart", words: [
        { w: "علم", tr: "ilm", m: "Knowledge" },
        { w: "روشنی", tr: "roshnī", m: "Light" },
        { w: "صبر", tr: "sabr", m: "Patience" },
        { w: "کتاب", tr: "kitāb", m: "Book" }
      ]}
    ]
  },
  {
    id: "tajweed",
    name: "Quranic Tajweed",
    native: "التجويد",
    glyph: "ت",
    voice: "ar-SA",
    dir: "rtl",
    color: "#ff7a8a",
    tagline: "Recite the Qur'an beautifully and correctly",
    lessons: [
      { title: "Tajweed Basics", words: [
        { w: "تَجْوِيد", tr: "tajwīd", m: "Giving every letter its right when reciting", tip: "Tajwīd comes from a root meaning to make something excellent." },
        { w: "مَخْرَج", tr: "makhraj", m: "The point a letter is pronounced from" },
        { w: "سُكُون", tr: "sukūn", m: "A letter with no vowel" },
        { w: "شَدَّة", tr: "shadda", m: "A doubled letter" }
      ]},
      { title: "Rules of Nūn Sākinah", words: [
        { w: "إِظْهَار", tr: "iẓhār", m: "Pronouncing the nūn clearly", tip: "It happens before the six throat letters: hamza, hā, ʿayn, ḥā, ghayn and khā." },
        { w: "إِدْغَام", tr: "idghām", m: "Merging the nūn into the next letter", tip: "Its six letters are gathered in the word yarmalūn." },
        { w: "إِقْلَاب", tr: "iqlāb", m: "Changing the nūn into a mīm sound", tip: "It happens before the letter bā." },
        { w: "إِخْفَاء", tr: "ikhfāʾ", m: "Hiding the nūn with a nasal sound" }
      ]}
    ]
  }
];
