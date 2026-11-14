/*
  AHD-E-ZUHOOR — School of Theology and Islamic Thought
  "The Five Moons of Belief": one moon for each root of religion (Usul al-Din).

  Edit this file to change any text. Please have a qualified scholar review it.

  Each moon:
    id, name, ar (Arabic name), en (English name), color, question (the big question)
    summary      one or two sentences
    verse        { ar, en, ref }  a Qur'an verse or hadith shown on the moon
    video        lines Zahra ("z") and Ali ("a") speak; "board" puts text on the screen
    reasoning    { intro, steps: [in the correct order], conclusion }
    questions    [ { q, a } ]  questions people ask
    quiz         [ { q, opts: [...], a: index of the right option } ]
    terms        [ { ar, tr, en } ]
*/
window.AZ_THEOLOGY = {
  moons: [
    {
      id: "tawhid", name: "Tawhid", ar: "التوحيد", en: "The Oneness of God", color: "#ffd36b",
      question: "Who made everything, and how do we know He is One?",
      summary: "Allah is One. He has no partner, no equal and nothing is like Him. He alone creates and sustains everything.",
      verse: { ar: "قُلْ هُوَ اللَّهُ أَحَدٌ", en: "Say: He is Allah, the One.", ref: "Surah al-Ikhlas 112:1" },
      video: [
        { k: "a", t: "Zahra, who made all these stars?", board: "Who made everything?" },
        { k: "z", t: "Allah made them, and everything else too." },
        { k: "a", t: "But how do we know there is a Maker?" },
        { k: "z", t: "Think of a book in the library. A book doesn't write itself. Someone wrote it.", board: "A book needs a writer" },
        { k: "z", t: "This whole universe, so perfectly ordered, points to its wise Maker.", board: "Order points to a wise Maker" },
        { k: "a", t: "And why only one God?" },
        { k: "z", t: "The Qur'an says: had there been gods in the heavens and earth besides Allah, both would have been ruined.", board: "Surah al-Anbiya 21:22" },
        { k: "a", t: "So the harmony of the universe shows there is one Creator!" },
        { k: "z", t: "Exactly. That is Tawhid, the first root of our religion.", board: "Tawhid: Allah is One" }
      ],
      reasoning: {
        intro: "Put these thoughts in order to reach the conclusion.",
        steps: [
          "A book cannot write itself. It needs a writer.",
          "The universe is full of order and design.",
          "Order and design point to a wise Maker."
        ],
        conclusion: "So the universe has a wise Creator: Allah."
      },
      questions: [
        { q: "Who created Allah?", a: "Nobody. Everything that is created needs a creator, but Allah is not created. He is the Creator, who has always existed and always will." },
        { q: "Can we see Allah?", a: "No. Allah is not a body and has no shape or place, so eyes cannot see Him. We know Him through His signs, with our minds and our hearts." },
        { q: "Why is Tawhid the first root?", a: "Every other belief is built on it: Allah's justice, the prophets He sends, the Imams He appoints and the Day of Return." }
      ],
      quiz: [
        { q: "What does Tawhid mean?", opts: ["Believing Allah is One", "Believing in angels", "Praying five times a day"], a: 0 },
        { q: "Which surah begins: “Say: He is Allah, the One”?", opts: ["Surah al-Fatiha", "Surah al-Ikhlas", "Surah Yasin"], a: 1 },
        { q: "What does order in the universe point to?", opts: ["Chance", "A wise Maker", "Nothing at all"], a: 1 }
      ],
      terms: [
        { ar: "تَوْحِيد", tr: "tawḥīd", en: "Believing that Allah is One" },
        { ar: "شِرْك", tr: "shirk", en: "Associating partners with Allah" },
        { ar: "خَالِق", tr: "khāliq", en: "Creator" }
      ]
    },
    {
      id: "adl", name: "'Adl", ar: "العدل", en: "Divine Justice", color: "#4fd1c5",
      question: "Is God fair? Why do hard things happen?",
      summary: "Allah is perfectly just. He never wrongs anyone and never does anything without wisdom.",
      verse: { ar: "إِنَّ اللَّهَ لَا يَظْلِمُ النَّاسَ شَيْئًا", en: "Indeed, Allah does not wrong people at all.", ref: "Surah Yunus 10:44" },
      video: [
        { k: "a", t: "Zahra, is Allah always fair?", board: "Is Allah always fair?" },
        { k: "z", t: "Always. People are unfair because they need something, or because they don't know better." },
        { k: "z", t: "Allah needs nothing and knows everything, so He never wrongs anyone.", board: "Allah needs nothing · knows everything" },
        { k: "a", t: "Then why do hard things happen?" },
        { k: "z", t: "Many come from people's wrong choices. Others are tests that make us stronger, and Allah's reward for patience is greater than any hardship.", board: "Tests · patience · reward" },
        { k: "a", t: "Do we really choose what we do?" },
        { k: "z", t: "Yes. Allah gave us free will, so we are responsible for our choices. Imam al-Sadiq called it a matter between two matters.", board: "Free will" },
        { k: "a", t: "So Allah's justice is complete, in this world and the next!" },
        { k: "z", t: "That's right. That is 'Adl.", board: "'Adl: Divine Justice" }
      ],
      reasoning: {
        intro: "Put these thoughts in order to reach the conclusion.",
        steps: [
          "People act unjustly out of need or ignorance.",
          "Allah needs nothing.",
          "Allah knows everything."
        ],
        conclusion: "So Allah is never unjust."
      },
      questions: [
        { q: "If Allah is just, why is there suffering?", a: "Much suffering comes from people's wrong choices. Other hardships are tests that bring patience, growth and great reward. Allah's justice is complete, including in the Hereafter." },
        { q: "Do we have free will?", a: "Yes. We are not forced, and we are not left entirely on our own either, since our ability comes from Allah. Imam al-Sadiq (a) called this “a matter between two matters”." },
        { q: "Why is 'Adl counted as a root?", a: "Allah's justice is the foundation for trusting His promises: He rewards good, sends guidance and never asks us beyond what we can do." }
      ],
      quiz: [
        { q: "Why are people sometimes unjust?", opts: ["Out of need or ignorance", "Because they are strong", "Because of the weather"], a: 0 },
        { q: "Does Allah ever wrong anyone?", opts: ["Sometimes", "Never", "Only in this world"], a: 1 },
        { q: "What did Imam al-Sadiq (a) call our free will?", opts: ["A matter between two matters", "Complete freedom", "No choice at all"], a: 0 }
      ],
      terms: [
        { ar: "عَدْل", tr: "ʿadl", en: "Justice" },
        { ar: "ظُلْم", tr: "ẓulm", en: "Injustice, wrongdoing" },
        { ar: "اِخْتِيَار", tr: "ikhtiyār", en: "Free will, choice" }
      ]
    },
    {
      id: "nubuwwah", name: "Nubuwwah", ar: "النبوة", en: "Prophethood", color: "#6fb6ff",
      question: "Why did God send prophets?",
      summary: "Allah sent prophets to guide humanity, from Prophet Adam (a) to the last of them, Prophet Muhammad (s).",
      verse: { ar: "وَلَٰكِن رَّسُولَ اللَّهِ وَخَاتَمَ النَّبِيِّينَ", en: "...but he is the Messenger of Allah and the Seal of the Prophets.", ref: "Surah al-Ahzab 33:40" },
      video: [
        { k: "a", t: "Zahra, why did Allah send prophets?", board: "Why prophets?" },
        { k: "z", t: "Our minds are a gift, but some things only Allah can tell us, like how to worship Him and what happens after this life." },
        { k: "z", t: "Prophets bring that guidance from Allah.", board: "Guidance from Allah" },
        { k: "a", t: "How did people know a prophet was real?" },
        { k: "z", t: "Through miracles no one could copy, and through their truthful, perfect lives.", board: "Miracles · truthful lives" },
        { k: "a", t: "What was Prophet Muhammad's greatest miracle?" },
        { k: "z", t: "The Holy Qur'an! And it is still with us today.", board: "The Holy Qur'an" },
        { k: "a", t: "Do prophets ever make mistakes?" },
        { k: "z", t: "No. They are ma'sum, protected from sin and error, so we can trust everything they bring.", board: "'Ismah: protected from sin" }
      ],
      reasoning: {
        intro: "Put these thoughts in order to reach the conclusion.",
        steps: [
          "Allah is wise and wants us to reach perfection.",
          "We cannot know everything we need on our own.",
          "A wise God sends guides to show the way."
        ],
        conclusion: "These guides are the prophets."
      },
      questions: [
        { q: "Why isn't our reason enough on its own?", a: "Reason tells us that Allah exists and is just, but the details of worship, the unseen and the Hereafter come through revelation." },
        { q: "What is 'ismah?", a: "Being protected from sin and error. A prophet must be ma'sum, otherwise people could not fully trust his message." },
        { q: "How many prophets were there?", a: "Narrations mention 124,000 prophets. Five are the great Ulu al-'Azm: Nuh, Ibrahim, Musa, 'Isa and Muhammad (peace be upon them)." }
      ],
      quiz: [
        { q: "Who is the last prophet?", opts: ["Prophet Musa (a)", "Prophet Muhammad (s)", "Prophet Ibrahim (a)"], a: 1 },
        { q: "What is the greatest miracle of Prophet Muhammad (s)?", opts: ["The Holy Qur'an", "The parting of the sea", "The ark"], a: 0 },
        { q: "What does ma'sum mean?", opts: ["Very old", "Protected from sin and error", "Living in Makkah"], a: 1 }
      ],
      terms: [
        { ar: "نَبِيّ", tr: "nabī", en: "Prophet" },
        { ar: "وَحْي", tr: "waḥy", en: "Revelation" },
        { ar: "مُعْجِزَة", tr: "muʿjiza", en: "Miracle" },
        { ar: "عِصْمَة", tr: "ʿiṣma", en: "Infallibility" }
      ]
    },
    {
      id: "imamah", name: "Imamah", ar: "الإمامة", en: "Divine Leadership", color: "#4fcf8f",
      question: "Who guides us after the Prophet (s)?",
      summary: "After the Holy Prophet (s), Allah appointed twelve Imams from his family to guide the Ummah, from Imam Ali (a) to Imam al-Mahdi (atfs).",
      verse: { ar: "إِنِّي تَارِكٌ فِيكُمُ الثَّقَلَيْنِ كِتَابَ اللَّهِ وَعِتْرَتِي أَهْلَ بَيْتِي", en: "I am leaving among you the two weighty things: the Book of Allah and my family, my Ahl al-Bayt.", ref: "Hadith al-Thaqalayn" },
      video: [
        { k: "a", t: "Zahra, after the Prophet passed away, who guided the people?", board: "Who guides after the Prophet (s)?" },
        { k: "z", t: "The Imams. Allah chose them, and the Prophet announced them." },
        { k: "z", t: "At Ghadir Khumm he declared: whoever I am his master, Ali is his master.", board: "Ghadir Khumm" },
        { k: "a", t: "How many Imams are there?" },
        { k: "z", t: "Twelve. The last is Imam al-Mahdi, who is alive today, in occultation.", board: "Twelve Imams" },
        { k: "a", t: "Like the sun behind the clouds!" },
        { k: "z", t: "Exactly. That's why we learn Marefat: to know the Imam of our time.", board: "Imam of our time" }
      ],
      reasoning: {
        intro: "Put these thoughts in order to reach the conclusion.",
        steps: [
          "Prophethood ended with Prophet Muhammad (s).",
          "People still need a guide who protects and explains the religion.",
          "Allah's grace would not leave the Ummah without a guide."
        ],
        conclusion: "So Allah appointed infallible Imams after the Prophet (s)."
      },
      questions: [
        { q: "Why must an Imam be chosen by Allah?", a: "Only Allah knows who is truly infallible and most knowledgeable, so the Imam is chosen by Him and announced by the Prophet (s) or by the previous Imam." },
        { q: "Who are the twelve Imams?", a: "Imam Ali, Imam al-Hasan, Imam al-Husayn, Imam Zayn al-Abidin, Imam al-Baqir, Imam al-Sadiq, Imam al-Kazim, Imam al-Rida, Imam al-Jawad, Imam al-Hadi, Imam al-Askari and Imam al-Mahdi (peace be upon them)." },
        { q: "What happened at Ghadir?", a: "Returning from his last Hajj in 10 AH, the Prophet (s) stopped at Ghadir Khumm and declared: “Whoever I am his master (mawla), Ali is his master.”" }
      ],
      quiz: [
        { q: "How many Imams are there?", opts: ["Seven", "Twelve", "Fourteen"], a: 1 },
        { q: "Where did the Prophet (s) declare Imam Ali (a) as mawla?", opts: ["Ghadir Khumm", "Badr", "Ta'if"], a: 0 },
        { q: "Who is the Imam of our time?", opts: ["Imam al-Rida (a)", "Imam al-Mahdi (atfs)", "Imam al-Husayn (a)"], a: 1 }
      ],
      terms: [
        { ar: "إِمَام", tr: "imām", en: "Divinely appointed leader" },
        { ar: "وِلَايَة", tr: "wilāya", en: "Guardianship" },
        { ar: "غَيْبَة", tr: "ghayba", en: "Occultation" },
        { ar: "ثَقَلَيْن", tr: "thaqalayn", en: "The two weighty things" }
      ],
      next: { label: "Continue to Marefat of the Imam of the Time", href: "academy-marefat.html" }
    },
    {
      id: "maad", name: "Ma'ad", ar: "المعاد", en: "The Return", color: "#ff8fb0",
      question: "What happens after this life?",
      summary: "After this life, Allah will bring everyone back on the Day of Judgement, where every deed is weighed and justice is made complete.",
      verse: { ar: "فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ", en: "So whoever does an atom's weight of good will see it.", ref: "Surah al-Zalzala 99:7" },
      video: [
        { k: "a", t: "Zahra, what happens after we die?", board: "What happens after this life?" },
        { k: "z", t: "Our souls move on to the barzakh, a world between this life and the Day of Judgement.", board: "Barzakh" },
        { k: "a", t: "And then?" },
        { k: "z", t: "On the Day of Judgement, Allah will raise everyone again, and every deed will be seen, even an atom's weight of good.", board: "An atom's weight of good" },
        { k: "a", t: "Isn't it hard to bring everyone back?" },
        { k: "z", t: "The One who created us the first time can easily create us again. The Qur'an makes this very point.", board: "Surah Yasin 36:79" },
        { k: "a", t: "So every good deed counts!" },
        { k: "z", t: "Every single one. That is Ma'ad, the Return.", board: "Ma'ad: The Return" }
      ],
      reasoning: {
        intro: "Put these thoughts in order to reach the conclusion.",
        steps: [
          "Allah is perfectly just.",
          "In this world, many good people are not rewarded and many wrongdoers escape.",
          "Perfect justice must take place somewhere."
        ],
        conclusion: "So there must be a Day of Return and Judgement."
      },
      questions: [
        { q: "What is barzakh?", a: "The world between death and the Day of Judgement, where the soul lives on." },
        { q: "Why do we need a Day of Judgement?", a: "Because Allah is just, and in this world good and evil are not always repaid. On that Day every deed receives its full reward or consequence." },
        { q: "Will our bodies return too?", a: "Yes. Resurrection is of both body and soul." }
      ],
      quiz: [
        { q: "What is the world between death and Judgement called?", opts: ["Barzakh", "Jannah", "Dunya"], a: 0 },
        { q: "According to Surah al-Zalzala, which deeds will be seen?", opts: ["Only big deeds", "Even an atom's weight", "None"], a: 1 },
        { q: "Which root of religion proves a Day of Judgement is needed?", opts: ["Divine Justice", "Prophethood", "Language"], a: 0 }
      ],
      terms: [
        { ar: "مَعَاد", tr: "maʿād", en: "The Return, resurrection" },
        { ar: "بَرْزَخ", tr: "barzakh", en: "The world between death and Judgement" },
        { ar: "قِيَامَة", tr: "qiyāma", en: "The Day of Resurrection" },
        { ar: "مِيزَان", tr: "mīzān", en: "The scale of deeds" }
      ]
    }
  ],

  scholars: [
    { name: "Shaykh al-Mufid", ar: "الشيخ المفيد", years: "d. 413 AH · 1022 CE", city: "Baghdad", idea: "A master theologian of Baghdad. His Awa'il al-Maqalat set out Shia beliefs with clear reasoning." },
    { name: "Shaykh al-Tusi", ar: "الشيخ الطوسي", years: "d. 460 AH · 1067 CE", city: "Najaf", idea: "Founded the great seminary of Najaf and wrote Tahdhib al-Ahkam and al-Istibsar, two of the four major books of hadith." },
    { name: "Allama al-Hilli", ar: "العلامة الحلي", years: "d. 726 AH · 1325 CE", city: "Hilla", idea: "His Kashf al-Murad and al-Bab al-Hadi 'Ashar are still studied to learn theology." },
    { name: "Mulla Sadra", ar: "ملا صدرا", years: "d. 1050 AH · 1640 CE", city: "Shiraz", idea: "Philosopher of “transcendent wisdom”, bringing together reason, revelation and spiritual insight." },
    { name: "Allama Tabataba'i", ar: "العلامة الطباطبائي", years: "d. 1402 AH · 1981 CE", city: "Qom", idea: "Author of al-Mizan, a great commentary that explains the Qur'an through the Qur'an." },
    { name: "Shahid Mutahhari", ar: "الشهيد مطهري", years: "d. 1399 AH · 1979 CE", city: "Tehran", idea: "Explained Islamic belief for modern minds in books such as Divine Justice ('Adl-e Ilahi)." }
  ]
};
