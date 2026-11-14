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
    tagline: "The language of the Qur'an",
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
    id: "turkish",
    name: "Turkish",
    native: "Türkçe",
    glyph: "Ç",
    voice: "tr-TR",
    dir: "ltr",
    color: "#ff7a8a",
    tagline: "A bridge between East and West",
    lessons: [
      { title: "Greetings", words: [
        { w: "Merhaba", tr: "mer-ha-ba", m: "Hello" },
        { w: "Teşekkürler", tr: "te-shek-kür-ler", m: "Thank you" },
        { w: "Evet", tr: "e-vet", m: "Yes" },
        { w: "Hayır", tr: "ha-yuhr", m: "No" }
      ]},
      { title: "Words of the Heart", words: [
        { w: "Bilgi", tr: "bil-gi", m: "Knowledge" },
        { w: "Işık", tr: "uh-shuhk", m: "Light" },
        { w: "Sabır", tr: "sa-buhr", m: "Patience" },
        { w: "Kitap", tr: "ki-tap", m: "Book" }
      ]}
    ]
  },
  {
    id: "english",
    name: "English",
    native: "English",
    glyph: "A",
    voice: "en-GB",
    dir: "ltr",
    color: "#5ab0ff",
    tagline: "Words for a life of learning",
    lessons: [
      { title: "Good Character", words: [
        { w: "Patience", tr: "pay-shuns", m: "Staying calm and steady when things are hard" },
        { w: "Gratitude", tr: "gra-ti-tyood", m: "Feeling and showing thanks" },
        { w: "Kindness", tr: "kynd-ness", m: "Being gentle and caring towards others" },
        { w: "Honesty", tr: "on-es-tee", m: "Always telling the truth" }
      ]},
      { title: "The Seeker's Words", words: [
        { w: "Knowledge", tr: "nol-ij", m: "What we learn and understand" },
        { w: "Wisdom", tr: "wiz-dum", m: "Using knowledge in the right way" },
        { w: "Guidance", tr: "gy-dens", m: "Being shown the right path" },
        { w: "Hope", tr: "hohp", m: "Trusting that good is coming" }
      ]}
    ]
  }
];
