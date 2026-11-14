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
    furu        which of the 10 Furu' al-Din this station teaches (empty = a foundation)
    sources     exact sistani.org sections for this station
    sourceNote  shown when sistani.org has no dedicated English chapter on the topic
*/
window.AZ_FIQH = {
  marja: "Ayatollah al-Sayyid Ali al-Husayni al-Sistani",
  source: { label: "Islamic Laws, Ayatollah al-Sistani · sistani.org", href: "https://www.sistani.org/english/" },

  stations: [
    {
      id: "taharah", name: "Taharah & Wudu", ar: "الطهارة", time: "Dawn", angle: 0, color: "#7fd8ff", icon: "drop",
      furu: [],
      sources: [{"label": "Islamic Laws · Ablution (Wuḍūʾ)", "href": "https://www.sistani.org/english/book/48/2154/"}, {"label": "Islamic Laws · Things that invalidate wuḍūʾ", "href": "https://www.sistani.org/english/book/48/2159/"}, {"label": "Islamic Laws · Impurities (Najāsāt)", "href": "https://www.sistani.org/english/book/48/2128/"}],
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
      id: "salah", name: "Salah", ar: "الصلاة", time: "Morning", angle: 40, color: "#ffd36b", icon: "sun",
      furu: [1],
      sources: [{"label": "Islamic Laws · The obligatory daily prayers", "href": "https://www.sistani.org/english/book/48/2208/"}, {"label": "Islamic Laws · Time for Ẓuhr and ʿAṣr", "href": "https://www.sistani.org/english/book/48/2209/"}, {"label": "Islamic Laws · Time for Maghrib and ʿIshāʾ", "href": "https://www.sistani.org/english/book/48/2212/"}, {"label": "Islamic Laws · Time for Ṣubḥ", "href": "https://www.sistani.org/english/book/48/2213/"}, {"label": "Islamic Laws · Rules of Qibla", "href": "https://www.sistani.org/english/book/48/2218/"}],
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
      id: "everyday", name: "Everyday Fiqh", ar: "الحلال والحرام", time: "Midday", angle: 80, color: "#7fe0a8", icon: "leaf",
      furu: [],
      sources: [{"label": "Islamic Laws · Eating and Drinking", "href": "https://www.sistani.org/english/book/48/8227/"}, {"label": "Islamic Laws · Slaughtering and Hunting Animals", "href": "https://www.sistani.org/english/book/48/8218/"}, {"label": "Islamic Laws · Fishing", "href": "https://www.sistani.org/english/book/48/8226/"}, {"label": "Official Q&A · Question 15041 (sea animals)", "href": "https://www.sistani.org/english/qa/15041/"}],
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
      id: "khums", name: "Khums & Zakat", ar: "الخمس والزكاة", time: "Afternoon", angle: 120, color: "#ffb547", icon: "coin",
      furu: [4, 5],
      sources: [{"label": "Islamic Laws · Khums", "href": "https://www.sistani.org/english/book/48/2305/"}, {"label": "Islamic Laws · Distribution of khums", "href": "https://www.sistani.org/english/book/48/2312/"}, {"label": "Islamic Laws · Zakat (Ruling 1871)", "href": "https://www.sistani.org/english/book/48/2314/"}, {"label": "Islamic Laws · Conditions for zakat", "href": "https://www.sistani.org/english/book/48/2315/"}, {"label": "Islamic Laws · Zakat of wheat, barley, dates and raisins", "href": "https://www.sistani.org/english/book/48/2316/"}, {"label": "Islamic Laws · Niṣāb for gold", "href": "https://www.sistani.org/english/book/48/2317/"}],
      summary: "Giving what is due: how khums is worked out, the ten things on which zakat is wajib, and zakat al-fitrah.",
      video: [
        { k: "a", t: "Zahra, what is khums?", board: "Khums" },
        { k: "z", t: "Khums means one fifth. Once a year, a fifth of what is left over from our income after the year's expenses is paid as khums.", board: "One fifth of the surplus" },
        { k: "a", t: "Who receives it?" },
        { k: "z", t: "It has two halves: the share of the Imam and the share of the Sadat. It is given to Ayatollah Sistani or his authorised representatives.", board: "Sahm al-Imam · Sahm al-Sadat" },
        { k: "a", t: "And zakat al-fitrah?" },
        { k: "z", t: "On Eid al-Fitr, about three kilos of food such as wheat, rice or dates is given for each person, or its value.", board: "Zakat al-Fitrah" },
        { k: "a", t: "And zakat on wealth?" },
        { k: "z", t: "In Ayatollah Sistani's rulings, zakat is wajib on ten things: wheat, barley, dates, raisins, gold, silver, camels, cows, sheep and goats, and business goods based on obligatory precaution.", board: "Ten things" },
        { k: "z", t: "But only once they reach a minimum amount, called the nisab, and other conditions are met.", board: "Nisab and conditions" }
      ],
      activities: [
        { type: "khums", title: "How khums is worked out" },
        { type: "sort", title: "Is it among the ten things zakat is wajib on?",
          bins: [{ id: "y", label: "Among the ten", color: "#3fd0b5" }, { id: "n", label: "Not among the ten", color: "#ff6b7d" }],
          items: [
            { t: "Wheat", bin: "y" }, { t: "Dates", bin: "y" }, { t: "Raisins", bin: "y" }, { t: "Gold", bin: "y" }, { t: "Sheep", bin: "y" },
            { t: "Business goods", bin: "y", note: "Zakat on business goods is based on obligatory precaution." },
            { t: "Apples", bin: "n" }, { t: "The house you live in", bin: "n" }, { t: "A car you use yourself", bin: "n" }
          ] }
      ],
      quiz: [
        { q: "What fraction is khums?", opts: ["One tenth", "One fifth", "One half"], a: 1 },
        { q: "Khums is paid on…", opts: ["Everything you earn", "What is left after the year's expenses", "Only gifts"], a: 1 },
        { q: "When is zakat al-fitrah given?", opts: ["On Eid al-Fitr", "In Muharram", "On Fridays"], a: 0 },
        { q: "On how many things is zakat wajib in Ayatollah Sistani's rulings?", opts: ["Seven", "Nine", "Ten"], a: 2 },
        { q: "Once gold reaches its nisab, what share is given as zakat?", opts: ["One fortieth (2.5%)", "One fifth (20%)", "One half"], a: 0 }
      ],
      points: [
        "Khums is one fifth (20%) of the surplus: what is left of a year's income after that year's expenses.",
        "Khums is divided into two halves: Sahm al-Imam and Sahm al-Sadat, given to Ayatollah Sistani or his authorised representatives.",
        "Zakat al-fitrah is given on Eid al-Fitr: about three kilograms of a staple food (such as wheat, barley, dates, raisins or rice) per person, or its value.",
        "Ruling 1871: zakat is wajib on ten things: wheat, barley, dates, raisins, gold, silver, camels, cows, sheep (and goats), and business goods based on obligatory precaution.",
        "Ruling 1872: zakat becomes wajib on these when they reach the taxable limit (nisab), are the person's own property, and the other conditions are met.",
        "Ruling 1880: the nisab of wheat, barley, dates and raisins is 300 sa', approximately 847 kilograms.",
        "Ruling 1912: the first nisab of gold is twenty legal (shar'i) mithqals, equal to fifteen common mithqals; once reached, and the other conditions are fulfilled, one fortieth (2.5%) is given as zakat.",
        "Ruling 1873: for cows, sheep, camels, gold and silver, zakat becomes wajib after they have been owned for eleven months, at the beginning of the twelfth month.",
        "For your own khums and zakat, contact Ayatollah Sistani's office or an authorised representative."
      ]
    },
    {
      id: "amr", name: "Amr bil Ma'ruf & Nahi anil Munkar", short: "Amr & Nahi", ar: "الأمر بالمعروف والنهي عن المنكر", time: "Late afternoon", angle: 160, color: "#5fd8c8", icon: "hand",
      furu: [7, 8],
      sources: [{ label: "Islamic Laws · Chapter Seven: Enjoining Good and Forbidding Evil (Rulings 1867–1869)", href: "https://www.sistani.org/english/book/48/2313/" }],
      summary: "Enjoining good and forbidding evil: when it becomes wajib, its five conditions, and its levels, from Ayatollah Sistani's Islamic Laws.",
      video: [
        { k: "a", t: "Zahra, my friend keeps missing his prayers. What should I do?", board: "Enjoining good" },
        { k: "z", t: "Enjoining good and forbidding evil is one of our most important duties. The Qur'an says: there must be a nation among you summoning to goodness, enjoining good and forbidding evil.", board: "Surah Al 'Imran 3:104" },
        { k: "a", t: "Do I have to say something every time?" },
        { k: "z", t: "It becomes wajib when five conditions are met: you know it is wrong, your words may have an effect, the person intends to carry on, he is not excused, and you are not in danger of serious harm.", board: "The five conditions" },
        { k: "a", t: "How should I do it?" },
        { k: "z", t: "Start gently. First show you dislike the wrong, then advise kindly with words, choosing the way that troubles him least and helps most.", board: "Gently, step by step" },
        { k: "z", t: "And even when we can't change something, we should never be indifferent to wrong.", board: "Never indifferent" }
      ],
      activities: [
        { type: "order", title: "The levels of enjoining good and forbidding evil",
          steps: ["Showing heartfelt dislike of the wrong, for example by turning away", "Advising and guiding with words", "Physical action: only with a fully qualified jurist's permission (obligatory precaution), and never causing injury"] },
        { type: "sort", title: "Is it wajib to speak up in this case?",
          bins: [{ id: "w", label: "Wajib here", color: "#3fd0b5" }, { id: "x", label: "Not wajib here", color: "#ffb547" }],
          items: [
            { t: "You know it is wrong, your advice may help, and the person keeps doing it", bin: "w" },
            { t: "The person has already stopped and does not intend to do it again", bin: "x", note: "Condition 3: the wrongdoer must intend to continue." },
            { t: "You do not know whether the act is good or bad", bin: "x", note: "Condition 1: one must know what is good and evil. Sometimes it is wajib to learn first." },
            { t: "Speaking up would bring serious harm to you", bin: "x", note: "Condition 5, unless the matter is so important that one must bear harm for it." },
            { t: "The person sincerely believes the act is permitted", bin: "x", note: "Condition 4: the wrongdoer must not be legally excused. But some acts, like killing an innocent person, must always be prevented." }
          ] }
      ],
      quiz: [
        { q: "When the good deed is wajib and the evil deed is haram, enjoining good and forbidding evil is…", opts: ["A collective obligation (wajib kifa'i)", "Only for scholars", "Never required"], a: 0 },
        { q: "Which level should come first?", opts: ["Physical action", "Heartfelt dislike or kind words", "Ignoring it"], a: 1 },
        { q: "If the person has stopped and will not repeat the wrong, is it wajib to forbid him?", opts: ["Yes", "No"], a: 1 }
      ],
      points: [
        "Ruling 1867: when the good deed is wajib and the evil deed is haram, enjoining good and forbidding evil is a collective obligation (wajib kifa'i): if some people carry it out, others are excused. But no one may be indifferent: expressing aversion in speech and actions is an individual obligation.",
        "For mustahab and makruh acts it is recommended, while respecting the other person and never being so harsh that they turn away from religion.",
        "Ruling 1868: five conditions: (1) knowing good and evil; (2) deeming it probable that it will have an effect (by obligatory precaution, disapproval must still be shown even if it will not); (3) the wrongdoer intends to continue; (4) the wrongdoer is not legally excused; (5) no significant harm or unendurable hardship to the one enjoining, except where the matter is so important that it must be borne.",
        "Ruling 1869: the levels are heartfelt aversion, verbal advice, then physical action. Start with the first or second level and the gentlest effective way. Physical action requires, by obligatory precaution, authorisation from a fully qualified jurist, and must never break a bone or wound the body."
      ]
    },
    {
      id: "sawm", name: "Sawm", ar: "الصوم", time: "Sunset", angle: 200, color: "#ff8f6b", icon: "moon",
      furu: [2],
      sources: [{"label": "Islamic Laws · Fasting (Ṣawm)", "href": "https://www.sistani.org/english/book/48/2277/"}, {"label": "Islamic Laws · Things that invalidate a fast", "href": "https://www.sistani.org/english/book/48/2279/"}],
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
      id: "tawalla", name: "Tawalla & Tabarra", ar: "التولّي والتبرّي", time: "Evening", angle: 240, color: "#ff9fb8", icon: "heart",
      furu: [9, 10],
      sources: [],
      sourceNote: "sistani.org's English books have no dedicated chapter on Tawalla and Tabarra. This station uses the Qur'an and is for a qualified scholar to review.",
      summary: "Loving the Prophet (s), his Ahl al-Bayt (a) and those who love them, and distancing ourselves from their enemies and from injustice.",
      video: [
        { k: "a", t: "Zahra, what is tawalla?", board: "Tawalla: love and loyalty" },
        { k: "z", t: "Tawalla means loving and following the Prophet and his Ahl al-Bayt, and loving those who love them." },
        { k: "z", t: "The Qur'an says: Say, I do not ask you for any reward for it, except love of my near relatives.", board: "Surah al-Shura 42:23" },
        { k: "a", t: "And tabarra?" },
        { k: "z", t: "Tabarra means distancing ourselves from the enemies of Allah, His Messenger and the Ahl al-Bayt, and from their injustice.", board: "Tabarra: distancing from wrong" },
        { k: "a", t: "So loving the good and staying away from injustice go together!" },
        { k: "z", t: "Yes. And true love shows in following their teachings in how we live.", board: "Love shown in action" }
      ],
      activities: [
        { type: "sort", title: "Tawalla or Tabarra?",
          bins: [{ id: "t", label: "Tawalla", color: "#ff9fb8" }, { id: "b", label: "Tabarra", color: "#7fd8ff" }],
          items: [
            { t: "Loving the Ahl al-Bayt (a)", bin: "t" }, { t: "Following their teachings in daily life", bin: "t" },
            { t: "Loving those who love them", bin: "t" }, { t: "Commemorating their joys and sorrows", bin: "t" },
            { t: "Rejecting the injustice done to them", bin: "b" }, { t: "Keeping away from the path of their enemies", bin: "b" },
            { t: "Refusing to support oppression", bin: "b" }
          ] }
      ],
      quiz: [
        { q: "What does tawalla mean?", opts: ["Loving and following the Prophet (s) and his Ahl al-Bayt (a)", "Paying khums", "Travelling for Hajj"], a: 0 },
        { q: "Which verse speaks of love of the Prophet's near relatives?", opts: ["Surah al-Shura 42:23", "Surah al-Fil 105:1", "Surah al-Kawthar 108:1"], a: 0 },
        { q: "What does tabarra mean?", opts: ["Distancing from the enemies of Allah and the Ahl al-Bayt (a) and from injustice", "Being rude to everyone", "Avoiding all people"], a: 0 }
      ],
      points: [
        "Tawalla: loving and following the Prophet (s) and his Ahl al-Bayt (a), and loving those who love them.",
        "Qur'an 42:23: “Say: I do not ask you for any reward for it except love of [my] near relatives.”",
        "Tabarra: distancing oneself from the enemies of Allah, His Messenger and the Ahl al-Bayt (a), and from their injustice.",
        "Qur'an 58:22: “You will not find a people who believe in Allah and the Last Day loving those who oppose Allah and His Messenger.”"
      ]
    },
    {
      id: "jihad", name: "Jihad", ar: "الجهاد", time: "Night", angle: 280, color: "#e8885a", icon: "shield",
      furu: [6],
      sources: [],
      sourceNote: "sistani.org's English books have no dedicated chapter on jihad. This station uses the Qur'an and a well-known hadith, and is for a qualified scholar to review. For any ruling on jihad or defence, follow the guidance of Ayatollah Sistani's office.",
      summary: "Striving in the way of Allah, beginning with the greater jihad: the struggle against one's own self.",
      video: [
        { k: "a", t: "Zahra, what does jihad mean?", board: "Jihad: striving" },
        { k: "z", t: "Jihad means striving and making an effort in the way of Allah. It is one of the Furu' al-Din." },
        { k: "z", t: "The Qur'an says: as for those who strive for Us, We will surely guide them to Our ways.", board: "Surah al-'Ankabut 29:69" },
        { k: "a", t: "Is there a jihad for children like us?" },
        { k: "z", t: "Yes! When some companions came back from battle, the Prophet said they had completed the lesser jihad, and the greater jihad remained: the struggle against one's own self.", board: "The greater jihad" },
        { k: "a", t: "So controlling my anger and telling the truth is jihad too!" },
        { k: "z", t: "Exactly. The rulings about defending Islam and Muslims have strict conditions, which the qualified marja' explains.", board: "Conditions set by the marja'" }
      ],
      activities: [
        { type: "sort", title: "Striving against the self, or giving in to it?",
          bins: [{ id: "s", label: "Striving (jihad al-nafs)", color: "#3fd0b5" }, { id: "g", label: "Giving in to the self", color: "#ff6b7d" }],
          items: [
            { t: "Controlling your anger", bin: "s" }, { t: "Waking up for Fajr prayer", bin: "s" }, { t: "Telling the truth when it is hard", bin: "s" },
            { t: "Forgiving someone who hurt you", bin: "s" }, { t: "Backbiting about a classmate", bin: "g" }, { t: "Lying to get out of trouble", bin: "g" },
            { t: "Delaying salah to keep playing", bin: "g" }
          ] }
      ],
      quiz: [
        { q: "What does jihad mean?", opts: ["Striving in the way of Allah", "Fasting", "Travelling"], a: 0 },
        { q: "What did the Prophet (s) call the struggle against one's own self?", opts: ["The greater jihad", "The lesser jihad", "Umrah"], a: 0 },
        { q: "Who explains the conditions of defending Islam and Muslims?", opts: ["The qualified marja'", "Anyone who wants to", "Nobody"], a: 0 }
      ],
      points: [
        "Jihad, striving in the way of Allah, is one of the Furu' al-Din.",
        "Qur'an 29:69: “As for those who strive for Us, We will surely guide them to Our ways.”",
        "It is reported (in al-Kafi) that the Prophet (s) called the struggle against one's own self (jihad al-nafs) the greater jihad.",
        "The rulings on defending Islam and Muslims have detailed conditions set by the qualified marja' according to circumstances. Follow the guidance of Ayatollah Sistani's office, never your own judgement."
      ]
    },
    {
      id: "hajj", name: "Hajj", ar: "الحج", time: "Before dawn", angle: 320, color: "#b9a4ff", icon: "kaaba",
      furu: [3],
      sources: [{"label": "Hajj Rituals · Obligation to perform Hajj", "href": "https://www.sistani.org/english/book/47/2082/"}, {"label": "Hajj Rituals · Hajj al-Tamattuʿ", "href": "https://www.sistani.org/english/book/47/2089/"}],
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
