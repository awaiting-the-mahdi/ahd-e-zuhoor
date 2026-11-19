/*
  AHD-E-ZUHOOR — Language Courses data
  ------------------------------------
  Edit this file to change the five courses, their lessons and words.
  (When the site is read in Urdu, the Urdu course is replaced by the English course at the end of this file.)
  Every page (the welcome flow, videos, quizzes and vocabulary) is built from it.

  Course fields
    id       short id used in the page address (language-course.html?c=<id>)
    name     course name shown everywhere
    native   the language's own name, in its own script
    glyph    one or two letters shown on the course badge
    voice    language code of the native voice (e.g. "ar-SA"); the voice cast is in language-voice.js.
             After editing words or lines, run tools/language-audio/generate.py to record them.
    dir      "rtl" for right-to-left scripts, "ltr" otherwise
    color    accent colour for the course
    tagline  one short line
    scenes   role-play videos: list of { title, place, voice, dialect, lines }
               place  library | garden | masjid  (the backdrop)
               voice  optional: the dialect's voice code, when the video is in a spoken dialect
                      (e.g. "ar-IQ" for Iraqi Arabic); otherwise the course voice
               dialect optional: the dialect's name, shown on the video card
               lines  { k: "z" (Zahra) or "a" (Ali), t: the line in the course language,
                        tr: transliteration, en: English translation, q: Qur'an reference (see below) }
                      or { k, t: an English line, lang: "en" }
    lessons  list of { title, words: [ { w, tr, m, tip } ] }
               w   the word in its own script
               tr  transliteration (how to say it), shown; spoken only if no native voice exists
               m   meaning
               tip optional extra sentence the kids say in the video
               q   optional Qur'an reference (see below)

  Qur'an recitation (q, on a scene line or a word)
    The text is then played from a real reciter instead of a speech voice:
      "1:2"         the whole verse (Surah 1, verse 2), recited by Mishary Alafasy
      "2:5:4-5"     words 4 to 5 of that verse, cut from Alafasy's recitation of it
      "1:2:3"       one word on its own, from Quran.com's word-by-word recitation
    Word numbers are as on quran.com. After adding or changing one, run
    tools/language-audio/quran.py to download it.
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
        "voice": "ar-IQ",
        "dialect": "Iraqi Arabic",
        "lines": [
          { "k": "a", "t": "السلام عليكم زهراء!", "tr": "as-salāmu ʿalaykum Zahrāʾ!", "en": "Peace be upon you, Zahra!" },
          { "k": "z", "t": "وعليكم السلام علي! شلونك؟", "tr": "w-ʿalaykum is-salām ʿAli! shlōnak?", "en": "And peace be upon you, Ali! How are you?" },
          { "k": "a", "t": "الحمد لله زين. شدتقرين؟", "tr": "il-ḥamdu lillāh zēn. shdatiqrīn?", "en": "Good, praise be to God. What are you reading?" },
          { "k": "z", "t": "دا أقرا كتاب عن النجوم.", "tr": "da-aqra ktāb ʿan in-njūm.", "en": "I'm reading a book about the stars." },
          { "k": "a", "t": "أگدر أقرا وياچ؟", "tr": "agdar aqra wiyyāch?", "en": "Can I read with you?" },
          { "k": "z", "t": "إي أكيد! تفضّل اگعد.", "tr": "ī akīd! tfaḍḍal igʿid.", "en": "Yes, of course! Go ahead, sit down." },
          { "k": "a", "t": "الله يخليچ زهراء.", "tr": "allah ykhallīch Zahrāʾ.", "en": "Thank you, Zahra (literally: may God keep you)." },
          { "k": "z", "t": "تدلّل.", "tr": "tdallal.", "en": "You're most welcome (literally: be my honoured guest)." }
        ]
      },
      {
        "title": "In the Garden at Night",
        "place": "garden",
        "voice": "ar-IQ",
        "dialect": "Iraqi Arabic",
        "lines": [
          { "k": "z", "t": "علي، باوع السما شگد حلوة!", "tr": "ʿAli, bāwiʿ is-sima shgadd ḥilwa!", "en": "Ali, look how beautiful the sky is!" },
          { "k": "a", "t": "إي والله، والنجوم هواية!", "tr": "ī wallāh, w-in-njūm hwāya!", "en": "Yes, truly, and there are so many stars!" },
          { "k": "z", "t": "سبحان الله!", "tr": "subḥān allāh!", "en": "Glory be to God!" },
          { "k": "a", "t": "الحمد لله على هالجمال.", "tr": "il-ḥamdu lillāh ʿala hal-jamāl.", "en": "Praise be to God for all this beauty." }
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
            "t": "بِسْمِ اللّٰهِ الرَّحْمَٰنِ الرَّحِيمِ",
            "q": "1:1",
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
            "t": "الْحَمْدُ لِلّٰهِ رَبِّ الْعَالَمِينَ",
            "q": "1:2",
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
        { w: "الْحَمْد", q: "1:2:1", tr: "al-ḥamd", m: "All praise", tip: "Al-ḥamdu lillāh means: all praise belongs to Allah." },
        { w: "رَبّ", q: "1:2:3", tr: "rabb", m: "Lord", tip: "Rabb al-ʿālamīn means Lord of all the worlds." },
        { w: "يَوْم", q: "1:4:2", tr: "yawm", m: "Day" },
        { w: "صِرَاط", q: "1:7:1", tr: "ṣirāṭ", m: "Path", tip: "In Al-Fatiha we ask: guide us to the straight path, aṣ-ṣirāṭ al-mustaqīm." }
      ]},
      { title: "Common Qur'anic Words", words: [
        { w: "هُدًى", q: "20:10:18", tr: "hudā", m: "Guidance", tip: "The Qur'an calls itself hudan lil-muttaqīn, a guidance for the God-conscious." },
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
    /* most devices have no Persian voice: an Urdu voice reads the same script closely.
       With neither, the lines are not read out in English; the transliteration is shown instead. */
    voiceAlt: ["ur-PK", "ur-IN", "ur"],
    noTranslitVoice: true,
    dir: "rtl",
    color: "#a78bfa",
    tagline: "A language of poetry and scholarship",
    scenes: [
      {
        "title": "In the Library",
        "place": "library",
        "lines": [
          { "k": "a", "t": "سلام زهرا!", "tr": "salām Zahrā!", "en": "Hello Zahra!" },
          { "k": "z", "t": "سلام علی جان! حالت چطوره؟", "tr": "salām Ali jān! hālet chetore?", "en": "Hi Ali, dear! How are you?" },
          { "k": "a", "t": "خوبم، الحمدلله. چی می‌خونی؟", "tr": "khubam, alhamdolellāh. chi mikhuni?", "en": "I'm well, praise be to God. What are you reading?" },
          { "k": "z", "t": "یه کتاب درباره‌ی ستاره‌ها می‌خونم.", "tr": "ye ketāb darbāre-ye setāre-hā mikhunam.", "en": "I'm reading a book about the stars." },
          { "k": "a", "t": "می‌شه منم باهات بخونم؟", "tr": "mishe manam bāhāt bekhunam?", "en": "May I read it with you too?" },
          { "k": "z", "t": "آره، حتماً! بیا بشین.", "tr": "āre, hatman! biyā beshin.", "en": "Yes, of course! Come, sit down." },
          { "k": "a", "t": "دستت درد نکنه، زهرا جان.", "tr": "dastet dard nakone, Zahrā jān.", "en": "Thank you, dear Zahra (literally: may your hand not hurt)." },
          { "k": "z", "t": "خواهش می‌کنم، قابلی نداره.", "tr": "khāhesh mikonam, qābeli nadāre.", "en": "You're welcome, it's nothing at all." }
        ]
      }
    ],
    lessons: [
      { title: "Greetings", words: [
        { w: "سلام", tr: "salām", m: "Hello" },
        { w: "ممنون", tr: "mamnun", m: "Thank you" },
        { w: "خداحافظ", tr: "khodāhāfez", m: "Goodbye" },
        { w: "بله", tr: "bale", m: "Yes" }
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
          { "k": "a", "t": "السلام علیکم زہرا!", "tr": "assalāmu ʿalaikum Zahra!", "en": "Peace be upon you, Zahra!" },
          { "k": "z", "t": "وعلیکم السلام علی! کیسے ہو؟", "tr": "waʿalaikum assalām Ali! kaise ho?", "en": "And peace be upon you, Ali! How are you?" },
          { "k": "a", "t": "میں ٹھیک ہوں، الحمدللہ۔ تم کیا پڑھ رہی ہو؟", "tr": "main ṭhīk hūn, alḥamdulillāh. tum kyā paṛh rahī ho?", "en": "I'm fine, praise be to God. What are you reading?" },
          { "k": "z", "t": "ستاروں کے بارے میں ایک کتاب پڑھ رہی ہوں۔", "tr": "sitāron ke bāre mein ek kitāb paṛh rahī hūn.", "en": "I'm reading a book about the stars." },
          { "k": "a", "t": "کیا میں بھی تمہارے ساتھ پڑھ لوں؟", "tr": "kyā main bhī tumhāre sāth paṛh lūn?", "en": "Can I read with you too?" },
          { "k": "z", "t": "ہاں ہاں، کیوں نہیں! آؤ، بیٹھو۔", "tr": "hān hān, kyūn nahīn! āo, baiṭho.", "en": "Yes, of course, why not! Come, sit down." },
          { "k": "a", "t": "بہت شکریہ زہرا۔", "tr": "bahut shukriya Zahra.", "en": "Thanks a lot, Zahra." },
          { "k": "z", "t": "کوئی بات نہیں۔", "tr": "koī bāt nahīn.", "en": "No problem." }
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
            "q": "2:5:4-5",
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
            "q": "2:27:5-6",
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
            "q": "13:33:38-39",
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

/*
  English for Urdu speakers.
  Shown in place of the Urdu course when the site is read in Urdu (AZ_LANG === "ur").
  Fields as above, except: tr is how the English sounds, written in Urdu script, and
  en / m / tip are in Urdu (they are the learner's own language here).
*/
window.AZ_COURSE_ENGLISH = {
  id: "english",
  name: "English",
  native: "English",
  glyph: "En",
  voice: "en-US",
  dir: "ltr",
  color: "#7fb8ff",
  tagline: "انگریزی بولیں، پڑھیں اور سمجھیں",
  scenes: [
    {
      "title": "In the Library",
      "place": "library",
      "lines": [
        { "k": "a", "t": "Assalamu alaykum, Zahra!", "tr": "اَلسّلامُ علیکم، زہرا!", "en": "السلام علیکم، زہرا!" },
        { "k": "z", "t": "Wa alaykum assalam, Ali! How are you?", "tr": "وعلیکم السلام، علی! ہاؤ آر یو؟", "en": "وعلیکم السلام، علی! آپ کیسے ہیں؟" },
        { "k": "a", "t": "I'm good, thanks! What are you reading?", "tr": "آئم گُڈ، تھینکس! وَٹ آر یو رِیڈنگ؟", "en": "میں ٹھیک ہوں، شکریہ! آپ کیا پڑھ رہی ہیں؟" },
        { "k": "z", "t": "It's a book about the stars.", "tr": "اِٹس اے بُک اَباؤٹ دی اسٹارز۔", "en": "یہ ستاروں کے بارے میں ایک کتاب ہے۔" },
        { "k": "a", "t": "Can I read it with you?", "tr": "کین آئی رِیڈ اِٹ وِد یو؟", "en": "کیا میں بھی آپ کے ساتھ پڑھ سکتا ہوں؟" },
        { "k": "z", "t": "Sure! Come and sit down.", "tr": "شیور! کَم اینڈ سِٹ ڈاؤن۔", "en": "ضرور! آئیں، بیٹھ جائیں۔" },
        { "k": "a", "t": "Thanks, Zahra.", "tr": "تھینکس، زہرا۔", "en": "شکریہ، زہرا۔" },
        { "k": "z", "t": "No problem!", "tr": "نو پرابلم!", "en": "کوئی بات نہیں!" }
      ]
    },
    {
      "title": "At the Masjid",
      "place": "masjid",
      "lines": [
        { "k": "z", "t": "Wow, look, Ali! The masjid is so beautiful.", "tr": "واؤ، لُک، علی! دی مسجد اِز سو بیوٹیفُل۔", "en": "واہ، دیکھیں علی! مسجد کتنی خوبصورت ہے۔" },
        { "k": "a", "t": "It's time to pray. Let's go and make wudu.", "tr": "اِٹس ٹائم ٹو پرے۔ لیٹس گو اینڈ میک وضو۔", "en": "نماز کا وقت ہو گیا ہے۔ چلیں وضو کر لیں۔" },
        { "k": "z", "t": "After salah, let's read some Qur'an.", "tr": "آفٹر صلاۃ، لیٹس رِیڈ سَم قرآن۔", "en": "نماز کے بعد تھوڑا قرآن پڑھتے ہیں۔" },
        { "k": "a", "t": "And let's make dua for Imam al-Mahdi.", "tr": "اینڈ لیٹس میک دُعا فار امام المہدی۔", "en": "اور امام مہدی کے لیے دعا کرتے ہیں۔" },
        { "k": "z", "t": "Yes! May Allah hasten his return.", "tr": "یس! مے اللہ ہیسن ہِز رِٹرن۔", "en": "جی ہاں! اللہ ان کے ظہور میں جلدی فرمائے۔" },
        { "k": "a", "t": "Ameen!", "tr": "آمین!", "en": "آمین!" }
      ]
    }
  ],
  lessons: [
    { title: "Greetings", words: [
      { w: "Hello", tr: "ہیلو", m: "سلام / خوش آمدید" },
      { w: "Good morning", tr: "گُڈ مارننگ", m: "صبح بخیر" },
      { w: "Thank you", tr: "تھینک یو", m: "شکریہ", tip: "کسی کا شکریہ ادا کرنا اچھے اخلاق کی نشانی ہے۔" },
      { w: "Please", tr: "پلیز", m: "براہِ کرم" },
      { w: "Goodbye", tr: "گُڈ بائے", m: "خدا حافظ" }
    ]},
    { title: "My Family", words: [
      { w: "Mother", tr: "مَدَر", m: "امی / ماں", tip: "جنت ماں کے قدموں تلے ہے۔" },
      { w: "Father", tr: "فادَر", m: "ابو / والد" },
      { w: "Brother", tr: "بْرَدَر", m: "بھائی" },
      { w: "Sister", tr: "سِسٹَر", m: "بہن" },
      { w: "Friend", tr: "فْرینڈ", m: "دوست" }
    ]},
    { title: "Words of the Heart", words: [
      { w: "Knowledge", tr: "نالِج", m: "علم" },
      { w: "Light", tr: "لائٹ", m: "روشنی / نور" },
      { w: "Patience", tr: "پیشَنس", m: "صبر" },
      { w: "Hope", tr: "ہوپ", m: "امید", tip: "انتظار امید کے ساتھ ہوتا ہے۔" },
      { w: "Justice", tr: "جَسٹِس", m: "عدل / انصاف", tip: "امام مہدی زمین کو عدل سے بھر دیں گے۔" }
    ]},
    { title: "At the Masjid", words: [
      { w: "Prayer", tr: "پریئر", m: "نماز / دعا" },
      { w: "Book", tr: "بُک", m: "کتاب" },
      { w: "Read", tr: "رِیڈ", m: "پڑھنا" },
      { w: "Learn", tr: "لَرن", m: "سیکھنا" },
      { w: "Wait", tr: "ویٹ", m: "انتظار کرنا" }
    ]}
  ]
};
/* in Urdu, the English course takes the Urdu course's place */
window.AZ_COURSE_ALIAS = {};
(function () {
  if (window.AZ_LANG === "ur") {
    for (var i = 0; i < window.AZ_COURSES.length; i++) {
      if (window.AZ_COURSES[i].id === "urdu") { window.AZ_COURSES[i] = window.AZ_COURSE_ENGLISH; break; }
    }
    window.AZ_COURSE_ALIAS.urdu = "english";
  } else {
    window.AZ_COURSE_ALIAS.english = "urdu";
  }
})();
