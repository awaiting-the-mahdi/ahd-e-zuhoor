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
    scenes   role-play videos: list of { title, place, lines }
               place  library | garden | masjid  (the backdrop)
               lines  { k: "z" (Zahra) or "a" (Ali), t: the line in the course language,
                        tr: transliteration, en: English translation }
                      or { k, t: an English line, lang: "en" }
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
    scenes: [
      {
        "title": "In the Library",
        "place": "library",
        "lines": [
          {
            "k": "a",
            "t": "السَّلامُ عَلَيْكُم يا زَهْراء.",
            "tr": "as-salāmu ʿalaykum yā Zahrāʾ.",
            "en": "Peace be upon you, Zahra."
          },
          {
            "k": "z",
            "t": "وَعَلَيْكُمُ السَّلام يا عَلِيّ.",
            "tr": "wa ʿalaykumu s-salām yā ʿAlī.",
            "en": "And peace be upon you, Ali."
          },
          {
            "k": "a",
            "t": "ماذا تَقْرَئين؟",
            "tr": "mādhā taqraʾīn?",
            "en": "What are you reading?"
          },
          {
            "k": "z",
            "t": "أَقْرَأُ كِتابًا عَنِ النُّجوم.",
            "tr": "aqraʾu kitāban ʿani n-nujūm.",
            "en": "I'm reading a book about the stars."
          },
          {
            "k": "a",
            "t": "هَلْ أَسْتَطيعُ أَنْ أَقْرَأَ مَعَكِ؟",
            "tr": "hal astaṭīʿu an aqraʾa maʿaki?",
            "en": "Can I read with you?"
          },
          {
            "k": "z",
            "t": "نَعَم، طَبْعًا!",
            "tr": "naʿam, ṭabʿan!",
            "en": "Yes, of course!"
          },
          {
            "k": "a",
            "t": "شُكْرًا يا زَهْراء.",
            "tr": "shukran yā Zahrāʾ.",
            "en": "Thank you, Zahra."
          },
          {
            "k": "z",
            "t": "عَفْوًا.",
            "tr": "ʿafwan.",
            "en": "You're welcome."
          }
        ]
      },
      {
        "title": "In the Garden at Night",
        "place": "garden",
        "lines": [
          {
            "k": "z",
            "t": "اُنْظُرْ يا عَلِيّ، السَّماءُ جَميلة!",
            "tr": "unẓur yā ʿAlī, as-samāʾu jamīla!",
            "en": "Look, Ali, the sky is beautiful!"
          },
          {
            "k": "a",
            "t": "نَعَم، وَالنُّجومُ كَثيرة.",
            "tr": "naʿam, wa-n-nujūmu kathīra.",
            "en": "Yes, and there are so many stars."
          },
          {
            "k": "z",
            "t": "سُبْحانَ الله!",
            "tr": "subḥāna llāh!",
            "en": "Glory be to God!"
          },
          {
            "k": "a",
            "t": "الحَمْدُ لِلّه عَلى هذا الجَمال.",
            "tr": "al-ḥamdu lillāhi ʿalā hādhā l-jamāl.",
            "en": "Praise be to God for this beauty."
          }
        ]
      }
    ],
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
    scenes: [
      {
        "title": "Reading Al-Fatiha in the Library",
        "place": "library",
        "lines": [
          {
            "k": "z",
            "t": "Ali, let's read the first verse of Al-Fatiha together.",
            "lang": "en"
          },
          {
            "k": "a",
            "t": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
            "tr": "bismi llāhi r-raḥmāni r-raḥīm",
            "en": "In the name of Allah, the Most Gracious, the Most Merciful."
          },
          {
            "k": "z",
            "t": "Bism means: in the name of.",
            "lang": "en"
          },
          {
            "k": "a",
            "t": "And ar-Raḥmān and ar-Raḥīm both come from raḥma, mercy!",
            "lang": "en"
          },
          {
            "k": "z",
            "t": "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
            "tr": "al-ḥamdu lillāhi rabbi l-ʿālamīn",
            "en": "All praise is for Allah, Lord of the worlds."
          },
          {
            "k": "a",
            "t": "Al-ḥamd is praise, and rabb is Lord. We learned those words!",
            "lang": "en"
          },
          {
            "k": "z",
            "t": "Every time we understand a word, the Qur'an speaks to us more clearly.",
            "lang": "en"
          }
        ]
      }
    ],
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
    scenes: [
      {
        "title": "In the Library",
        "place": "library",
        "lines": [
          {
            "k": "a",
            "t": "سلام زهرا!",
            "tr": "salām Zahrā!",
            "en": "Hello Zahra!"
          },
          {
            "k": "z",
            "t": "سلام علی! حالت چطوره؟",
            "tr": "salām Ali! hālet chetore?",
            "en": "Hi Ali! How are you?"
          },
          {
            "k": "a",
            "t": "خوبم، ممنون. چی می‌خونی؟",
            "tr": "khubam, mamnun. chi mikhuni?",
            "en": "I'm good, thanks. What are you reading?"
          },
          {
            "k": "z",
            "t": "یه کتاب درباره‌ی ستاره‌ها می‌خونم.",
            "tr": "ye ketāb darbāre-ye setāre-hā mikhunam.",
            "en": "I'm reading a book about the stars."
          },
          {
            "k": "a",
            "t": "می‌تونم با تو بخونم؟",
            "tr": "mitunam bā to bekhunam?",
            "en": "Can I read with you?"
          },
          {
            "k": "z",
            "t": "آره، حتماً!",
            "tr": "āre, hatman!",
            "en": "Yes, of course!"
          },
          {
            "k": "a",
            "t": "مرسی زهرا.",
            "tr": "mersi Zahrā.",
            "en": "Thanks, Zahra."
          },
          {
            "k": "z",
            "t": "خواهش می‌کنم.",
            "tr": "khāhesh mikonam.",
            "en": "You're welcome."
          }
        ]
      }
    ],
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
    scenes: [
      {
        "title": "In the Library",
        "place": "library",
        "lines": [
          {
            "k": "a",
            "t": "السلام علیکم زہرا!",
            "tr": "assalāmu ʿalaikum Zahrā!",
            "en": "Peace be upon you, Zahra!"
          },
          {
            "k": "z",
            "t": "وعلیکم السلام علی! آپ کیسے ہیں؟",
            "tr": "waʿalaikum assalām Ali! āp kaise haiṅ?",
            "en": "And peace be upon you, Ali! How are you?"
          },
          {
            "k": "a",
            "t": "میں ٹھیک ہوں، شکریہ۔ آپ کیا پڑھ رہی ہیں؟",
            "tr": "maiṅ ṭhīk hūṅ, shukriya. āp kyā paṛh rahī haiṅ?",
            "en": "I'm fine, thank you. What are you reading?"
          },
          {
            "k": "z",
            "t": "میں ستاروں کے بارے میں ایک کتاب پڑھ رہی ہوں۔",
            "tr": "maiṅ sitāroṅ ke bāre meṅ ek kitāb paṛh rahī hūṅ.",
            "en": "I'm reading a book about the stars."
          },
          {
            "k": "a",
            "t": "کیا میں آپ کے ساتھ پڑھ سکتا ہوں؟",
            "tr": "kyā maiṅ āp ke sāth paṛh saktā hūṅ?",
            "en": "Can I read with you?"
          },
          {
            "k": "z",
            "t": "جی ہاں، ضرور!",
            "tr": "jī hāṅ, zarūr!",
            "en": "Yes, of course!"
          },
          {
            "k": "a",
            "t": "شکریہ زہرا۔",
            "tr": "shukriya Zahrā.",
            "en": "Thank you, Zahra."
          },
          {
            "k": "z",
            "t": "کوئی بات نہیں۔",
            "tr": "koī bāt nahīṅ.",
            "en": "No problem."
          }
        ]
      }
    ],
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
    scenes: [
      {
        "title": "In the Recitation Class",
        "place": "masjid",
        "lines": [
          {
            "k": "a",
            "t": "Zahra, how do I read this?",
            "lang": "en"
          },
          {
            "k": "a",
            "t": "مِنْ رَبِّهِمْ",
            "tr": "mir-rabbihim",
            "en": "from their Lord"
          },
          {
            "k": "z",
            "t": "The nūn comes before rā. That's idghām: the nūn merges into the rā.",
            "lang": "en"
          },
          {
            "k": "a",
            "t": "And this one?",
            "lang": "en"
          },
          {
            "k": "a",
            "t": "مِنْ بَعْدِ",
            "tr": "mim-baʿdi",
            "en": "after"
          },
          {
            "k": "z",
            "t": "Before bā, it's iqlāb. The nūn turns into a mīm sound.",
            "lang": "en"
          },
          {
            "k": "a",
            "t": "What about this?",
            "lang": "en"
          },
          {
            "k": "a",
            "t": "مِنْ هَادٍ",
            "tr": "min hād",
            "en": "any guide"
          },
          {
            "k": "z",
            "t": "Hā is a throat letter, so it's iẓhār. Say the nūn clearly!",
            "lang": "en"
          },
          {
            "k": "a",
            "t": "Idghām, iqlāb, iẓhār. I'll practise them every day, inshaAllah!",
            "lang": "en"
          }
        ]
      }
    ],
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
