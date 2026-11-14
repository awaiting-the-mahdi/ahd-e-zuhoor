/*
  AHD-E-ZUHOOR — School of Islamic Jurisprudence (Fiqh)
  "The Golden Ring of the Day". Rulings follow Ayatollah al-Sayyid Ali al-Sistani.

  Please have a qualified teacher check every ruling against Ayatollah Sistani's
  Islamic Laws before students rely on it, and update this file as needed.

  Each station:
    id, name, ar, time (label on the ring), angle (0-360 position on the ring, 0 = dawn),
    color, icon, summary, video (Zahra "z" / Ali "a" lines, "board" text on screen),
    activities  list of activity objects (types: order, sort, times, qibla, khums, journey)
    quiz        [ { q, opts, a } ]
    points      key rulings shown in the "Rulings & source" tab
*/
window.AZ_FIQH = {
  marja: "Ayatollah al-Sayyid Ali al-Husayni al-Sistani",
  source: { label: "Islamic Laws, Ayatollah al-Sistani · sistani.org", href: "https://www.sistani.org/english/" },

  stations: [
    {
      id: "taharah", name: "Taharah & Wudu", ar: "الطهارة", time: "Dawn", angle: 0, color: "#7fd8ff", icon: "drop",
      summary: "Purity comes before prayer. Learn the steps of wudu, and which things are pure (tahir) or impure (najis).",
      video: [
        { k: "a", t: "Zahra, why do we do wudu before salah?", board: "Why wudu?" },
        { k: "z", t: "Salah is a meeting with Allah, and wudu prepares us for it. Salah is not valid without it." },
        { k: "a", t: "What comes first?" },
        { k: "z", t: "First the intention. Then we wash the face, from the top of the forehead down to the chin.", board: "Intention · Face" },
        { k: "z", t: "Then the right arm from the elbow to the fingertips, and then the left arm.", board: "Right arm · Left arm" },
        { k: "z", t: "Then we wipe the front of the head, then the right foot, then the left foot, using the wetness left on our hands.", board: "Head · Right foot · Left foot" },
        { k: "a", t: "Does the order matter?" },
        { k: "z", t: "Yes! The steps must be done in order, one after another without a long gap.", board: "In order, without a gap" }
      ],
      activities: [
        { type: "order", title: "Put the steps of wudu in order",
          steps: ["Make the intention (niyyah)", "Wash the face, from forehead to chin", "Wash the right arm, elbow to fingertips", "Wash the left arm, elbow to fingertips", "Wipe the front of the head", "Wipe the right foot", "Wipe the left foot"] },
        { type: "sort", title: "Tahir or najis?",
          bins: [{ id: "t", label: "Tahir (pure)", color: "#3fd0b5" }, { id: "n", label: "Najis (impure)", color: "#ff6b7d" }],
          items: [
            { t: "Rain water", bin: "t" }, { t: "Clean soil", bin: "t", note: "Clean earth is not only pure, it can also purify, as in tayammum." },
            { t: "Urine", bin: "n" }, { t: "A dog", bin: "n" }, { t: "A pig", bin: "n" },
            { t: "Blood (of an animal whose blood gushes out)", bin: "n" }, { t: "An alcoholic drink", bin: "n" }, { t: "Freshly washed clothes", bin: "t" }
          ] }
      ],
      quiz: [
        { q: "What is washed first in wudu, after the intention?", opts: ["The right arm", "The face", "The feet"], a: 1 },
        { q: "Which part of the head is wiped?", opts: ["The front", "The back", "The whole head"], a: 0 },
        { q: "Is clean soil tahir?", opts: ["Yes", "No"], a: 0 }
      ],
      points: [
        "Wudu is wajib for the daily prayers.",
        "The steps are: intention, washing the face, the right arm, the left arm, then wiping the front of the head, the right foot and the left foot.",
        "The order (tartib) must be kept, and the steps done one after the other (muwalat).",
        "Things that break wudu include: using the toilet, passing wind, and sleep that overcomes both hearing and sight."
      ]
    },
    {
      id: "salah", name: "Salah", ar: "الصلاة", time: "Morning", angle: 60, color: "#ffd36b", icon: "sun",
      summary: "Five daily prayers, seventeen rak'at, all facing the Qibla. Learn the times, the steps and find the Qibla.",
      video: [
        { k: "a", t: "How many prayers are wajib every day?", board: "The five daily prayers" },
        { k: "z", t: "Five: Fajr, Dhuhr, Asr, Maghrib and Isha." },
        { k: "a", t: "And how many rak'at?" },
        { k: "z", t: "Fajr has two, Dhuhr four, Asr four, Maghrib three and Isha four. Seventeen altogether!", board: "2 + 4 + 4 + 3 + 4 = 17" },
        { k: "a", t: "Which way do we face?" },
        { k: "z", t: "The Qibla, towards the Holy Ka'bah in Makkah.", board: "Facing the Qibla" },
        { k: "a", t: "When does Maghrib begin?" },
        { k: "z", t: "After sunset, once the redness in the eastern sky has gone.", board: "Maghrib time" }
      ],
      activities: [
        { type: "times", title: "The prayer times",
          prayers: [
            { name: "Fajr", rakat: 2, hour: 5, window: "From true dawn until sunrise." },
            { name: "Dhuhr", rakat: 4, hour: 12.5, window: "From midday (when the sun passes its highest point) until sunset. The first part of this time is for Dhuhr only." },
            { name: "Asr", rakat: 4, hour: 15.5, window: "Shares the time from midday to sunset, after Dhuhr is prayed. The last part before sunset is for Asr only." },
            { name: "Maghrib", rakat: 3, hour: 18.6, window: "After sunset, once the redness in the eastern sky has gone, until midnight." },
            { name: "Isha", rakat: 4, hour: 20, window: "Shares the time from Maghrib until midnight, after Maghrib is prayed." }
          ] },
        { type: "order", title: "Put the parts of a two-rak'at prayer in order",
          steps: ["Intention (niyyah)", "Takbirat al-ihram: “Allahu akbar”", "Standing and reciting al-Fatiha and another surah", "Ruku' (bowing)", "Two sajdahs (prostrations)", "Second rak'at, then tashahhud", "Salam"] },
        { type: "qibla", title: "Find the Qibla" }
      ],
      quiz: [
        { q: "How many rak'at does Maghrib have?", opts: ["Two", "Three", "Four"], a: 1 },
        { q: "How many rak'at are there in the five daily prayers altogether?", opts: ["Seventeen", "Twelve", "Twenty"], a: 0 },
        { q: "When does the time for Fajr end?", opts: ["At midday", "At sunrise", "At sunset"], a: 1 }
      ],
      points: [
        "The five daily prayers are wajib: Fajr (2 rak'at), Dhuhr (4), Asr (4), Maghrib (3) and Isha (4).",
        "Fajr: from true dawn until sunrise. Dhuhr and Asr: from midday until sunset. Maghrib and Isha: from Maghrib time until midnight.",
        "Maghrib time begins after sunset, once the redness in the eastern sky has disappeared.",
        "Salah is prayed facing the Qibla, towards the Holy Ka'bah."
      ]
    },
    {
      id: "everyday", name: "Everyday Fiqh", ar: "الحلال والحرام", time: "Midday", angle: 120, color: "#7fe0a8", icon: "leaf",
      summary: "What we eat and how we live. Learn which foods are halal, and the five kinds of rulings.",
      video: [
        { k: "a", t: "Zahra, how do we know if food is halal?", board: "Halal food" },
        { k: "z", t: "Some things are always haram, like pork and alcohol.", board: "Pork · Alcohol: haram" },
        { k: "z", t: "Meat from animals like cows, sheep and chickens is halal only if the animal was slaughtered the Islamic way.", board: "Islamic slaughter" },
        { k: "a", t: "What about seafood?" },
        { k: "z", t: "Fish with scales are halal, and so are shrimp. But crab and lobster are not.", board: "Fish with scales · Shrimp" },
        { k: "a", t: "And there are five kinds of rulings?" },
        { k: "z", t: "Yes: wajib, mustahab, mubah, makruh and haram. Try the rulings meter!", board: "The five rulings" }
      ],
      activities: [
        { type: "sort", title: "Halal or haram?",
          bins: [{ id: "h", label: "Halal", color: "#3fd0b5" }, { id: "x", label: "Haram", color: "#ff6b7d" }],
          items: [
            { t: "An apple", bin: "h" }, { t: "Salmon (a fish with scales)", bin: "h" }, { t: "Shrimp", bin: "h" },
            { t: "Chicken slaughtered the Islamic way", bin: "h" }, { t: "Pork", bin: "x" }, { t: "An alcoholic drink", bin: "x" },
            { t: "Crab", bin: "x" }, { t: "Catfish (a fish without scales)", bin: "x" }
          ] }
      ],
      quiz: [
        { q: "Which seafood is halal?", opts: ["Crab", "Shrimp", "Lobster"], a: 1 },
        { q: "Is a fish without scales halal?", opts: ["Yes", "No"], a: 1 },
        { q: "Replying to someone's salam is…", opts: ["Wajib", "Makruh", "Mubah"], a: 0 }
      ],
      points: [
        "Pork and alcoholic drinks are haram.",
        "Meat of halal animals is halal only when the animal is slaughtered according to Islamic law.",
        "Of sea creatures, fish with scales are halal, and shrimp is halal. Crab and lobster are haram.",
        "The five rulings are: wajib (obligatory), mustahab (recommended), mubah (permitted), makruh (disliked) and haram (forbidden)."
      ]
    },
    {
      id: "khums", name: "Khums & Zakat", ar: "الخمس والزكاة", time: "Afternoon", angle: 180, color: "#ffb547", icon: "coin",
      summary: "Giving what is due. Learn how khums is worked out and what zakat al-fitrah is.",
      video: [
        { k: "a", t: "Zahra, what is khums?", board: "Khums" },
        { k: "z", t: "Khums means one fifth. Once a year, a fifth of what is left over from our income after the year's expenses is paid as khums.", board: "One fifth of the surplus" },
        { k: "a", t: "Who receives it?" },
        { k: "z", t: "It has two halves: the share of the Imam and the share of the Sadat. It is given to Ayatollah Sistani or his authorised representatives.", board: "Sahm al-Imam · Sahm al-Sadat" },
        { k: "a", t: "And zakat al-fitrah?" },
        { k: "z", t: "On Eid al-Fitr, about three kilos of food such as wheat, rice or dates is given for each person, or its value.", board: "Zakat al-Fitrah" }
      ],
      activities: [
        { type: "khums", title: "How khums is worked out" }
      ],
      quiz: [
        { q: "What fraction is khums?", opts: ["One tenth", "One fifth", "One half"], a: 1 },
        { q: "Khums is paid on…", opts: ["Everything you earn", "What is left after the year's expenses", "Only gifts"], a: 1 },
        { q: "When is zakat al-fitrah given?", opts: ["On Eid al-Fitr", "In Muharram", "On Fridays"], a: 0 }
      ],
      points: [
        "Khums is one fifth (20%) of the surplus: what is left of a year's income after that year's expenses.",
        "Khums is divided into two halves: Sahm al-Imam and Sahm al-Sadat, given to Ayatollah Sistani or his authorised representatives.",
        "Zakat al-fitrah is given on Eid al-Fitr: about three kilograms of a staple food (such as wheat, barley, dates, raisins or rice) per person, or its value.",
        "For your own khums, contact Ayatollah Sistani's office or an authorised representative."
      ]
    },
    {
      id: "sawm", name: "Sawm", ar: "الصوم", time: "Sunset", angle: 240, color: "#ff8f6b", icon: "moon",
      summary: "Fasting in Ramadan, from Fajr until Maghrib. Learn what breaks a fast and what doesn't.",
      video: [
        { k: "a", t: "When does the fast begin and end?", board: "Suhoor to iftar" },
        { k: "z", t: "It begins at true dawn, the time of Fajr, and ends at Maghrib time.", board: "Fajr → Maghrib" },
        { k: "a", t: "What if I eat by mistake because I forgot I was fasting?" },
        { k: "z", t: "If you really forgot, your fast is still valid!", board: "Forgetting doesn't break it" },
        { k: "a", t: "Phew! And swallowing my saliva?" },
        { k: "z", t: "That's fine too. But eating or drinking on purpose breaks the fast.", board: "On purpose breaks it" }
      ],
      activities: [
        { type: "sort", title: "Does it break the fast?",
          bins: [{ id: "b", label: "Breaks the fast", color: "#ff6b7d" }, { id: "o", label: "Fast is still valid", color: "#3fd0b5" }],
          items: [
            { t: "Eating on purpose", bin: "b" }, { t: "Drinking water on purpose", bin: "b" },
            { t: "Eating because you completely forgot you were fasting", bin: "o" }, { t: "Swallowing your own saliva", bin: "o" },
            { t: "Making yourself vomit on purpose", bin: "b" }, { t: "Telling a lie about Allah, the Prophet (s) or the Imams (a)", bin: "b" },
            { t: "Brushing your teeth without swallowing anything", bin: "o" }
          ] }
      ],
      quiz: [
        { q: "When does the fast end each day?", opts: ["At sunrise", "At Maghrib time", "At midday"], a: 1 },
        { q: "Eating because you forgot you were fasting…", opts: ["Breaks the fast", "Does not break the fast"], a: 1 },
        { q: "Swallowing your own saliva…", opts: ["Breaks the fast", "Does not break the fast"], a: 1 }
      ],
      points: [
        "The fast lasts from true dawn (Fajr) until Maghrib time.",
        "Eating or drinking intentionally breaks the fast. Eating or drinking out of genuine forgetfulness does not.",
        "Swallowing one's own saliva does not break the fast.",
        "Intentional vomiting, and ascribing lies to Allah, the Prophet (s) or the Imams (a), break the fast."
      ]
    },
    {
      id: "hajj", name: "Hajj", ar: "الحج", time: "Night", angle: 300, color: "#b9a4ff", icon: "kaaba",
      summary: "The journey of a lifetime. Follow the pilgrims from the miqat to Makkah, Arafat, Muzdalifah and Mina.",
      video: [
        { k: "a", t: "Zahra, what is Hajj?", board: "Hajj" },
        { k: "z", t: "The journey to Makkah that is wajib once in a lifetime for everyone who is able.", board: "Once in a lifetime" },
        { k: "a", t: "Where do the pilgrims go?" },
        { k: "z", t: "They put on ihram at the miqat, perform Umrah in Makkah, then stand at Arafat, spend the night at Muzdalifah, and go to Mina.", board: "Miqat · Makkah · Arafat · Muzdalifah · Mina" },
        { k: "a", t: "What happens at Mina?" },
        { k: "z", t: "They stone the Jamarat, offer a sacrifice, and shave or trim their hair.", board: "Rami · Sacrifice · Shaving" }
      ],
      activities: [
        { type: "journey", title: "The journey of Hajj al-Tamattu'",
          stops: [
            { name: "Miqat", what: "Put on ihram and make the intention for Umrah." },
            { name: "Makkah · Umrah", what: "Tawaf around the Ka'bah, its prayer, Sa'y between Safa and Marwah, then taqsir (trimming)." },
            { name: "Makkah · 8th", what: "Put on ihram again, this time for Hajj." },
            { name: "Arafat · 9th", what: "Stay at Arafat from midday until sunset (wuquf)." },
            { name: "Muzdalifah", what: "Spend the night and stay until sunrise (wuquf at al-Mash'ar)." },
            { name: "Mina · 10th", what: "Stone Jamrat al-'Aqabah, offer the sacrifice, then shave or trim." },
            { name: "Makkah", what: "Tawaf of Hajj and its prayer, Sa'y, then Tawaf al-Nisa' and its prayer." },
            { name: "Mina · 11th–12th", what: "Spend the nights in Mina and stone the three Jamarat each day." }
          ] }
      ],
      quiz: [
        { q: "How often is Hajj wajib for someone who is able?", opts: ["Every year", "Once in a lifetime", "Every five years"], a: 1 },
        { q: "Where do pilgrims stand on the 9th of Dhul-Hijjah?", opts: ["Mina", "Arafat", "Madinah"], a: 1 },
        { q: "Where are the Jamarat stoned?", opts: ["Mina", "Muzdalifah", "Arafat"], a: 0 }
      ],
      points: [
        "Hajj is wajib once in a lifetime for every Muslim who is able (mustati').",
        "In Hajj al-Tamattu', Umrah is performed first, then the rites of Hajj.",
        "Pilgrims stay at Arafat on the 9th of Dhul-Hijjah, then at Muzdalifah, and perform the rites of Mina on the 10th.",
        "The details of Hajj are many: pilgrims study the Manasik (Hajj rulings) of Ayatollah Sistani before travelling."
      ]
    }
  ],

  /* The rulings meter on the main page */
  rulings: [
    { id: "wajib", name: "Wajib", en: "Obligatory", color: "#3fd0b5" },
    { id: "mustahab", name: "Mustahab", en: "Recommended", color: "#7fd8ff" },
    { id: "mubah", name: "Mubah", en: "Permitted", color: "#ffd36b" },
    { id: "makruh", name: "Makruh", en: "Disliked", color: "#ffb547" },
    { id: "haram", name: "Haram", en: "Forbidden", color: "#ff6b7d" }
  ],
  examples: [
    { t: "Praying the five daily prayers", r: "wajib" },
    { t: "Replying to someone's salam", r: "wajib" },
    { t: "Being the first to say salam", r: "mustahab" },
    { t: "Cleaning your teeth with a miswak", r: "mustahab" },
    { t: "Choosing the colour of your shirt", r: "mubah" },
    { t: "Drinking a glass of water", r: "mubah" },
    { t: "Cracking your knuckles during salah", r: "makruh" },
    { t: "Backbiting (gheebah)", r: "haram" },
    { t: "Eating pork", r: "haram" }
  ]
};
