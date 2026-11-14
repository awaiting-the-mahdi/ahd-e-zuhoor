/*
  AHD-E-ZUHOOR — Marefat of the Imam of the Time
  "The Hidden Sun": a journey from the Messenger (s), through Lady Fatima (sa)
  and the Twelve Imams (as), to the living Imam behind the clouds.

  Edit this file to change any text. Please have a qualified scholar review it.

  Sources. Narrations marked "Kamal al-Din" were checked against the English
  translation in this repository (assets/books/Kamaluddin-Vol-1.pdf and -Vol-2.pdf,
  tr. S. Athar Husain Rizvi); chapter numbers follow Shaykh Saduq's original order.
  "al-Ghayba (Tusi)" was checked against assets/books/Al-Ghayba.pdf.
  Dates follow the commonly held Shia reports; other reports exist for several of them.
*/
window.AZ_MAREFAT = {

  /* The hadith that opens the journey */
  opening: {
    ar: "مَنْ مَاتَ وَلَمْ يَعْرِفْ إِمَامَ زَمَانِهِ مَاتَ مِيتَةً جَاهِلِيَّةً",
    en: "Whoever dies without knowing the Imam of his time dies the death of ignorance.",
    ref: "The Messenger of Allah (s) · Kamal al-Din, ch. 38 · cf. Sahih Muslim 1851"
  },

  /* The supplication of recognition taught by Imam al-Sadiq (as) to Zurarah */
  marefaDua: {
    lines: [
      { ar: "اللَّهُمَّ عَرِّفْنِي نَفْسَكَ", en: "O Allah, make Yourself known to me", tail: "for if You do not, I will not recognise Your Prophet." },
      { ar: "اللَّهُمَّ عَرِّفْنِي رَسُولَكَ", en: "O Allah, make Your Messenger known to me", tail: "for if You do not, I will not recognise Your Proof." },
      { ar: "اللَّهُمَّ عَرِّفْنِي حُجَّتَكَ", en: "O Allah, make Your Proof known to me", tail: "for if You do not, I will stray from my religion." }
    ],
    ref: "Imam Ja'far al-Sadiq (as) to Zurarah · Kamal al-Din, ch. 33 · al-Kafi 1:337"
  },

  /* ---------------- I. THE MESSENGER ---------------- */
  prophet: {
    name: "Muhammad al-Mustafa", ar: "مُحَمَّدٌ رَسُولُ اللهِ ﷺ",
    facts: [
      ["Born", "17 Rabi' al-Awwal, Year of the Elephant (c. 570 CE), Makkah"],
      ["Mission", "27 Rajab (610 CE), Cave of Hira"],
      ["Returned to his Lord", "28 Safar 11 AH (632 CE), Madinah"]
    ],
    verses: [
      { ar: "وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ", en: "And We have not sent you except as a mercy to all the worlds.", ref: "al-Anbiya 21:107" },
      { ar: "وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ", en: "And indeed, you are of a great moral character.", ref: "al-Qalam 68:4" },
      { ar: "وَمَا يَنطِقُ عَنِ الْهَوَىٰ ۝ إِنْ هُوَ إِلَّا وَحْيٌ يُوحَىٰ", en: "Nor does he speak from desire. It is only a revelation revealed.", ref: "al-Najm 53:3–4" }
    ],
    why: [
      { t: "The door to Allah", d: "We cannot see Allah, so He sent a human being we can see, hear and follow. Whatever we know of how to pray, fast, love and live, we know through him." },
      { t: "The last messenger", d: "\"Muhammad is … the Messenger of Allah and the Seal of the Prophets\" (al-Ahzab 33:40). No prophet comes after him — so the guidance he left must be enough until the end of time." },
      { t: "He did not leave us alone", d: "A messenger who is the last must provide for the centuries after him. In his final days he named exactly what he was leaving behind." }
    ],
    thaqalayn: {
      ar: "إِنِّي تَارِكٌ فِيكُمُ الثَّقَلَيْنِ: كِتَابَ اللهِ وَعِتْرَتِي أَهْلَ بَيْتِي، وَإِنَّهُمَا لَنْ يَفْتَرِقَا حَتَّىٰ يَرِدَا عَلَيَّ الْحَوْضَ",
      en: "I am leaving among you the Two Weighty Things: the Book of Allah and my family, my Ahl al-Bayt. And they will never separate from each other until they return to me at the Pool.",
      ref: "Sahih Muslim 2408 · Sunan al-Tirmidhi 3788 · Musnad Ahmad"
    },
    twelve: {
      ar: "لَا يَزَالُ الدِّينُ قَائِمًا حَتَّىٰ تَقُومَ السَّاعَةُ أَوْ يَكُونَ عَلَيْكُمُ اثْنَا عَشَرَ خَلِيفَةً كُلُّهُمْ مِنْ قُرَيْشٍ",
      en: "This religion will remain standing until the Hour is established, or until there have been twelve successors over you, all of them from Quraysh.",
      ref: "Sahih Muslim 1821 · cf. Sahih al-Bukhari 7222"
    },
    jabir: {
      intro: "When the verse \"Obey Allah and obey the Messenger and those vested with authority among you\" (al-Nisa 4:59) was revealed, Jabir ibn Abdullah al-Ansari asked who \"those vested with authority\" were. The Prophet (s) named them, one by one:",
      names: ["Ali ibn Abi Talib", "al-Hasan", "al-Husayn", "Ali ibn al-Husayn", "Muhammad ibn Ali — al-Baqir. \"You will meet him, O Jabir; convey my salaam to him.\"", "Ja'far ibn Muhammad, al-Sadiq", "Musa ibn Ja'far", "Ali ibn Musa", "Muhammad ibn Ali", "Ali ibn Muhammad", "al-Hasan ibn Ali", "…then the one who bears my name and my kunya — the Proof of Allah in His earth and His remnant among His servants."],
      close: "\"He will be hidden from his followers and friends — an occultation in which none will remain firm in belief in his Imamate except one whose heart Allah has tested for faith.\" Jabir asked: will they benefit from him in his occultation? \"Yes, by the One who sent me with prophethood! They will benefit from his light … as people benefit from the sun when clouds hide it.\"",
      ref: "Kamal al-Din, ch. 23 (Jabir ibn Abdullah al-Ansari)"
    }
  },

  /* ---------------- II. LADY FATIMA ---------------- */
  fatima: {
    name: "Fatima al-Zahra", ar: "فَاطِمَةُ الزَّهْرَاءُ عَلَيْهَا السَّلَامُ",
    facts: [
      ["Born", "20 Jumada al-Thani, 5th year of the mission, Makkah"],
      ["Martyred", "3 Jumada al-Thani 11 AH, Madinah (another report: 13 Jumada al-Awwal)"],
      ["Resting place", "Unknown to this day — she asked to be buried at night, in secret"]
    ],
    sayings: [
      { ar: "فَاطِمَةُ بَضْعَةٌ مِنِّي، فَمَنْ أَغْضَبَهَا أَغْضَبَنِي", en: "Fatima is a part of me; whoever angers her has angered me.", ref: "The Prophet (s) · Sahih al-Bukhari 3714" },
      { ar: "سَيِّدَةُ نِسَاءِ أَهْلِ الْجَنَّةِ", en: "\"…the mistress of the women of Paradise.\"", ref: "The Prophet (s) · Sahih al-Bukhari 3624" },
      { ar: "الْمَهْدِيُّ مِنْ عِتْرَتِي، مِنْ وَلَدِ فَاطِمَةَ", en: "The Mahdi is from my family, from the children of Fatima.", ref: "The Prophet (s) · Sunan Abi Dawud 4284" }
    ],
    bridge: [
      { t: "Daughter of Prophethood", d: "The only child of the Prophet (s) through whom his line continued — the answer to the taunt of \"abtar\", the one cut off. Allah replied: \"Indeed, We have given you al-Kawthar\" — abundance (al-Kawthar 108:1)." },
      { t: "Mother of Imamate", d: "Eleven of the Twelve Imams descend from her. The tablet given to her by her father, which Jabir saw and copied, named all twelve and their mothers (Kamal al-Din, ch. 28)." },
      { t: "She spoke of Imamate herself", d: "In her sermon in the Prophet's mosque she said Allah made \"obedience to us an order for the community, and our Imamate a safety from division.\"" }
    ],
    sermon: { ar: "وَطَاعَتَنَا نِظَامًا لِلْمِلَّةِ، وَإِمَامَتَنَا أَمَانًا مِنَ الْفُرْقَةِ", ref: "Sermon of Fadak · al-Ihtijaj · Balaghat al-Nisa'" },
    mahdi: {
      ar: "وَفِي ابْنَةِ رَسُولِ اللهِ لِي أُسْوَةٌ حَسَنَةٌ",
      en: "In the daughter of the Messenger of Allah I have a good example.",
      ref: "Imam al-Mahdi (atfs), in a letter answering those who doubted him · al-Ghayba (Tusi), no. 245"
    }
  },

  /* ---------------- III. THE TWELVE ---------------- */
  starsVerse: { ar: "وَعَلَامَاتٍ ۚ وَبِالنَّجْمِ هُمْ يَهْتَدُونَ", en: "And landmarks; and by the star they are guided.", ref: "al-Nahl 16:16" },
  starsHadith: { en: "We are like the stars: when one sets, another rises.", ref: "Imam al-Baqir (as) · Kamal al-Din, ch. 32" },

  imams: [
    { n: 1, name: "Ali ibn Abi Talib", ar: "عَلِيُّ بْنُ أَبِي طَالِبٍ", title: "Amir al-Mu'minin", tar: "أَمِيرُ الْمُؤْمِنِينَ",
      born: "13 Rajab, 30 years after the Year of the Elephant · inside the Ka'bah, Makkah", died: "21 Ramadan 40 AH · Kufa", rest: "Najaf",
      light: "The first to believe, the gate of the city of knowledge. At Ghadir Khumm the Prophet (s) raised his hand and said: \"Whoever's master I am, Ali is his master\" (Sunan al-Tirmidhi 3713).",
      qaim: "Yes, O Allah! The earth is never empty of one who stands for Allah with a proof — either manifest and well known, or fearful and hidden — so that the proofs of Allah and His clear signs are not nullified.",
      qref: "Nahj al-Balagha, Saying 147 (to Kumayl)" },
    { n: 2, name: "al-Hasan ibn Ali", ar: "الْحَسَنُ بْنُ عَلِيٍّ", title: "al-Mujtaba", tar: "الْمُجْتَبَىٰ",
      born: "15 Ramadan 3 AH · Madinah", died: "28 Safar 50 AH, poisoned · Madinah", rest: "Jannat al-Baqi'",
      light: "\"Al-Hasan and al-Husayn are the masters of the youth of Paradise\" (Sunan al-Tirmidhi 3768). His peace treaty preserved the faithful when the sword could not.",
      qaim: "There is none among us except that the allegiance of the tyrant of his time falls on his neck — except the Qa'im, behind whom 'Isa son of Maryam will pray. Allah keeps his birth secret and his person unseen, so that when he appears no one's allegiance is on his neck … Allah will prolong his life in his occultation, then bring him forth in the form of a young man under forty, so that it be known that Allah has power over all things.",
      qref: "Kamal al-Din, ch. 29" },
    { n: 3, name: "al-Husayn ibn Ali", ar: "الْحُسَيْنُ بْنُ عَلِيٍّ", title: "Sayyid al-Shuhada", tar: "سَيِّدُ الشُّهَدَاءِ",
      born: "3 Sha'ban 4 AH · Madinah", died: "10 Muharram 61 AH · Karbala", rest: "Karbala",
      light: "\"Husayn is from me and I am from Husayn\" (Sunan al-Tirmidhi 3775). At Karbala he gave everything so that the religion of his grandfather would live.",
      qaim: "The Mahdi of this nation is my ninth descendant. He will have an occultation, and he is the one whose inheritance shall be divided while he is alive.",
      qref: "Kamal al-Din, ch. 30" },
    { n: 4, name: "Ali ibn al-Husayn", ar: "عَلِيُّ بْنُ الْحُسَيْنِ", title: "Zayn al-'Abidin, al-Sajjad", tar: "زَيْنُ الْعَابِدِينَ",
      born: "5 Sha'ban 38 AH · Madinah", died: "25 Muharram 95 AH · Madinah", rest: "Jannat al-Baqi'",
      light: "Survivor of Karbala, he taught a wounded community through supplication: al-Sahifa al-Sajjadiyya and the Treatise of Rights.",
      qaim: "O Abu Khalid, those of the time of his occultation who believe in his Imamate and await his reappearance are better than the people of every age — for Allah gives them such intellect, understanding and recognition that the occultation becomes for them like presence … Awaiting the reappearance is the best act of worship.",
      qref: "Kamal al-Din, ch. 31" },
    { n: 5, name: "Muhammad ibn Ali", ar: "مُحَمَّدُ بْنُ عَلِيٍّ", title: "al-Baqir", tar: "الْبَاقِرُ",
      born: "1 Rajab 57 AH · Madinah", died: "7 Dhu al-Hijjah 114 AH · Madinah", rest: "Jannat al-Baqi'",
      light: "\"The one who splits knowledge open.\" As a child he was present at Karbala; decades earlier the Prophet (s) had sent him salaam through Jabir.",
      qaim: "In the Qa'im of the family of Muhammad there are resemblances to five prophets: to Yunus — returning from occultation as a young man though advanced in age; to Yusuf — hidden from the elite and the public alike; to Musa — constant fear and a long occultation; to 'Isa — people will differ about him; and to Muhammad — he will rise.",
      qref: "Kamal al-Din, ch. 32" },
    { n: 6, name: "Ja'far ibn Muhammad", ar: "جَعْفَرُ بْنُ مُحَمَّدٍ", title: "al-Sadiq", tar: "الصَّادِقُ",
      born: "17 Rabi' al-Awwal 83 AH · Madinah", died: "25 Shawwal 148 AH · Madinah", rest: "Jannat al-Baqi'",
      light: "Thousands studied under him — jurists, theologians and scientists. Through him the school of the Ahl al-Bayt was written down.",
      qaim: "In the master of this affair there is a resemblance to Yusuf: Allah places a veil between him and the people, so that they see him but do not recognise him.",
      qref: "Kamal al-Din, ch. 33" },
    { n: 7, name: "Musa ibn Ja'far", ar: "مُوسَىٰ بْنُ جَعْفَرٍ", title: "al-Kazim", tar: "الْكَاظِمُ",
      born: "7 Safar 128 AH · al-Abwa'", died: "25 Rajab 183 AH, in prison · Baghdad", rest: "Kazimayn",
      light: "\"The one who restrains his anger.\" Years in the prisons of Harun, worshipping in the dark — the Bab al-Hawa'ij, the door through which needs are answered.",
      qaim: "When the fifth descendant of the seventh Imam goes into occultation — for the sake of Allah, guard your religion. Let none of you abandon his religion.",
      qref: "Kamal al-Din, ch. 34" },
    { n: 8, name: "Ali ibn Musa", ar: "عَلِيُّ بْنُ مُوسَىٰ", title: "al-Rida", tar: "الرِّضَا",
      born: "11 Dhu al-Qa'dah 148 AH · Madinah", died: "End of Safar 203 AH, poisoned · Tus", rest: "Mashhad",
      light: "At Nishapur, before thousands of scribes, he narrated: \"'There is no god but Allah' is My fortress\" — then added: \"with its conditions, and I am one of its conditions\" ('Uyun Akhbar al-Rida).",
      qaim: "May my father and mother be sacrificed for the namesake of my grandfather, who resembles me and resembles Musa ibn 'Imran — clothed in garments of light, shining with the rays of holiness.",
      qref: "Kamal al-Din, ch. 35" },
    { n: 9, name: "Muhammad ibn Ali", ar: "مُحَمَّدُ بْنُ عَلِيٍّ", title: "al-Jawad, al-Taqi", tar: "الْجَوَادُ",
      born: "10 Rajab 195 AH · Madinah", died: "End of Dhu al-Qa'dah 220 AH, aged 25 · Baghdad", rest: "Kazimayn",
      light: "He became Imam at about eight years old and silenced the scholars of Baghdad — just as Allah gave Yahya \"wisdom while yet a child\" (Maryam 19:12). He prepared hearts for an Imam who would be younger still.",
      qaim: "O Abu'l-Qasim, the Qa'im is from us and he is the Mahdi. It is obligatory to await him in his occultation and to obey him in his appearance. He is the third of my descendants … Allah will set his affair right in a single night, as He set right the affair of Musa, who went to fetch fire for his family and returned a prophet and messenger. The best deed of our followers is awaiting the relief.",
      qref: "To 'Abd al-'Azim al-Hasani · Kamal al-Din, ch. 36" },
    { n: 10, name: "Ali ibn Muhammad", ar: "عَلِيُّ بْنُ مُحَمَّدٍ", title: "al-Hadi, al-Naqi", tar: "الْهَادِي",
      born: "15 Dhu al-Hijjah 212 AH · near Madinah", died: "3 Rajab 254 AH · Samarra", rest: "Samarra",
      light: "Kept under watch in Samarra for twenty years, he taught Ziyarat al-Jami'a al-Kabira: \"Whoever wants Allah begins with you.\"",
      qaim: "The Imamate is mine while I live. When Allah's decree reaches me, my successor will come to you. And how will you be with the successor after the successor?",
      qref: "Kamal al-Din, ch. 37" },
    { n: 11, name: "al-Hasan ibn Ali", ar: "الْحَسَنُ بْنُ عَلِيٍّ", title: "al-'Askari", tar: "الْعَسْكَرِيُّ",
      born: "8 Rabi' al-Thani 232 AH · Madinah", died: "8 Rabi' al-Awwal 260 AH, aged 28 · Samarra", rest: "Samarra",
      light: "Held in the military garrison ('askar) of Samarra, he guided through trusted agents and letters — preparing his followers for an Imam they would reach only that way.",
      qaim: "[Carrying a boy of about three, whose face was like the full moon:] O Ahmad, were it not for your honour with Allah I would not have shown you this son of mine. He bears the name and kunya of the Messenger of Allah … His example in this nation is like Khidr and Dhul-Qarnayn. By Allah, he will have an occultation in which none will be saved except one whom Allah keeps firm in belief in his Imamate and grants the success to pray for his reappearance.",
      qref: "Kamal al-Din, ch. 38 (Ahmad ibn Ishaq al-Ash'ari)" },
    { n: 12, name: "Muhammad ibn al-Hasan", ar: "مُحَمَّدُ بْنُ الْحَسَنِ", title: "al-Mahdi, al-Qa'im, Sahib al-Zaman", tar: "الْمَهْدِيُّ صَاحِبُ الزَّمَانِ",
      born: "15 Sha'ban 255 AH · Samarra", died: "Alive — in occultation", rest: "Present among us, unrecognised",
      light: "\"The remnant of Allah is better for you, if you are believers\" (Hud 11:86). Imam since 260 AH; hidden since then; through four deputies until 329 AH; in the long occultation ever since.",
      qaim: "Each of my forefathers had the allegiance of the tyrant of his time on his neck; when I appear, no tyrant's allegiance will be on mine. As for how people benefit from me in my occultation — it is as they benefit from the sun when clouds conceal it from the eyes. I am a security for the people of the earth as the stars are a security for the people of the heavens … And pray much for the hastening of relief, for in that is your own relief.",
      qref: "His letter to Ishaq ibn Ya'qub · Kamal al-Din, ch. 45" }
  ],

  /* The letter: a torch passed from hand to hand */
  torches: {
    en: "Allah appointed torches of guidance from the time of Adam until Imam Hasan al-'Askari, so that whenever a guide departed, another took up his place and his torch. When Allah took al-'Askari, did you think He had abandoned His religion and cut His bond with His creation? Never — until the Day of Judgement.",
    ref: "Imam al-Mahdi (atfs), letter · al-Ghayba (Tusi), no. 245"
  },

  /* ---------------- IV. THE HIDDEN SUN — questions ---------------- */
  questions: [
    {
      id: "always", q: "Must there always be an Imam?",
      ponder: "The Qur'an is still with us. The Prophet said its companion would never separate from it. So where is the companion today?",
      a: [
        { k: "Qur'an", t: "\"You are only a warner, and for every people there is a guide.\"", r: "al-Ra'd 13:7" },
        { k: "Qur'an", t: "\"The day We will call every people by their Imam.\"", r: "al-Isra 17:71" },
        { k: "Hadith", t: "\"…the earth shall not be devoid of a Proof until the Hour comes, whether apparent and known, or unseen and hidden. … Someone asked: how will people benefit from a hidden Proof? He said: as they benefit from the sun hidden behind the clouds.\"", r: "Imam Zayn al-'Abidin (as) · Kamal al-Din, ch. 21" },
        { k: "Reason", t: "The Book and the family \"will never separate until they return to me at the Pool.\" The Book is here, unchanged. If the family had no living Imam, the two would have separated — and the Prophet's promise would be broken. Even the Sunni scholar Ibn Hajar al-Haytami wrote that the hadith points to someone of the Ahl al-Bayt worthy of being held to in every age, until the Day of Resurrection, just as the Book is.", r: "al-Sawa'iq al-Muhriqa, ch. 11" }
      ],
      close: "The question was never whether there is an Imam today. It is whether we know him."
    },
    {
      id: "born", q: "Was he really born? Has anyone seen him?",
      ponder: "Most of history reaches us through witnesses we never met. How many witnesses would you need?",
      a: [
        { k: "Witness", t: "Lady Hakima, sister of Imam al-Hadi and aunt of Imam al-'Askari, stayed in the house on the night of 15 Sha'ban 255 AH and described the birth in detail.", r: "Kamal al-Din, ch. 42" },
        { k: "Witness", t: "Imam al-'Askari showed his son to trusted companions — Ahmad ibn Ishaq among them — and wrote to him: \"The infant is born. Keep this a secret.\"", r: "Kamal al-Din, ch. 38 & 42" },
        { k: "History", t: "For about seventy years (260–329 AH), letters in the Imam's name answered questions through four successive deputies in Baghdad — Uthman ibn Sa'id, his son Muhammad, Husayn ibn Ruh and Ali ibn Muhammad al-Samuri. Shaykh Saduq, author of Kamal al-Din, was himself born after a prayer requested from the Imam in one of those letters.", r: "Kamal al-Din, ch. 45" },
        { k: "History", t: "Sunni historians recorded his birth too — among them Ibn Khallikan, who gives 15 Sha'ban 255 AH.", r: "Wafayat al-A'yan, entry Muhammad ibn al-Hasan al-'Askari" }
      ],
      close: "His birth was hidden from a regime that was watching for it — not from history."
    },
    {
      id: "life", q: "How can a man live for more than a thousand years?",
      ponder: "Is a long life harder for Allah than life itself? Which is the greater miracle — that you exist at all, or that one servant's life is lengthened?",
      a: [
        { k: "Qur'an", t: "\"He remained among them a thousand years less fifty\" — Nuh (as), and that was only his time among his people.", r: "al-'Ankabut 29:14" },
        { k: "Qur'an", t: "The Sleepers of the Cave slept 309 years. 'Uzayr died for a hundred years while his food did not spoil. 'Isa (as) was raised and is alive, awaited by all Muslims. Of Yunus: \"he would have remained in its belly until the Day they are resurrected.\"", r: "al-Kahf 18:25 · al-Baqarah 2:259 · al-Nisa 4:158 · al-Saffat 37:144" },
        { k: "Hadith", t: "\"In the Qa'im there is a resemblance to Nuh — and that is long life.\"", r: "Imam Zayn al-'Abidin (as) · Kamal al-Din, ch. 31" },
        { k: "Science", t: "Ageing is a biological process, not a fixed law. Greenland sharks have been dated to at least 272 years — perhaps 400 or more — using radiocarbon in their eye lenses.", r: "Nielsen et al., Science 353 (2016)" }
      ],
      close: "The One who keeps a heart beating for sixty years is not weaker at a thousand.",
      chart: true
    },
    {
      id: "why", q: "Why must he be hidden?",
      ponder: "Musa (as) watched Khidr damage a boat, take a life and rebuild a wall for no pay — and objected each time. What would he have said if he had known the reasons?",
      a: [
        { k: "Hadith", t: "\"So that when he rises, no one's allegiance will be on his neck.\" Every Imam before him lived under a tyrant's rule; he will owe allegiance to none.", r: "Imam al-Rida (as) & Imam al-Sadiq (as) · Kamal al-Din, ch. 44" },
        { k: "Hadith", t: "Protection: his resemblance to Musa is \"constant fear and caution.\" Eleven Imams were killed. The last was hidden so that the promise could not be killed.", r: "Imam al-Sadiq (as) · Kamal al-Din, ch. 33" },
        { k: "Hadith", t: "A test: \"Occultation is necessary for the master of this affair — so much so that some who believed in it will turn away.\"", r: "Imam al-Kazim (as) · Kamal al-Din, ch. 34" },
        { k: "Hadith", t: "\"The wisdom of his occultation is the wisdom of the occultations of the Proofs before him. It will not be revealed until after his appearance — just as the wisdom of what Khidr did was not clear to Musa until they parted.\"", r: "Imam al-Sadiq (as) to Abdullah ibn al-Fadl · Kamal al-Din, ch. 44" }
      ],
      close: "We are told enough reasons to trust, and not so many that trust becomes unnecessary.",
      khidr: true
    },
    {
      id: "use", q: "What use is an Imam no one can see?",
      ponder: "On a cloudy day, does the earth go dark? Does anything stop growing?",
      a: [
        { k: "Prophet", t: "\"They will benefit from his light … as people benefit from the sun when clouds hide it.\"", r: "The Prophet (s) to Jabir · Kamal al-Din, ch. 23" },
        { k: "Imam", t: "\"As for how people benefit from me in my occultation — it is like the sun when clouds conceal it from the eyes.\"", r: "Imam al-Mahdi (atfs) · Kamal al-Din, ch. 45" },
        { k: "Imam", t: "\"We are neither negligent in caring for you, nor forgetful of remembering you.\"", r: "Imam al-Mahdi (atfs), letter to Shaykh al-Mufid · al-Ihtijaj · cited in Mikyal al-Makarim" }
      ],
      close: "Clouds hide the sun from the eye — not from the earth.",
      sun: true
    },
    {
      id: "met", q: "Could I have passed him without knowing?",
      ponder: "Yusuf's brothers stood before him, spoke to him and traded with him — and did not know him. What veil would be thick enough to hide a brother?",
      a: [
        { k: "Hadith", t: "\"Yusuf's brothers were sons of prophets. They traded with him, and he was their brother — yet they did not recognise him until he said: I am Yusuf. Why then does this nation deny that Allah may conceal His Proof from them?\"", r: "Imam al-Sadiq (as) · Kamal al-Din, ch. 33" },
        { k: "Hadith", t: "\"…Allah places a veil between him and the people, so that they see him but do not recognise him.\"", r: "Imam al-Sadiq (as) · Kamal al-Din, ch. 33" }
      ],
      close: "Hidden does not mean far. It means unrecognised."
    }
  ],

  /* Khidr and Musa — al-Kahf 18:71–82 */
  khidr: [
    { icon: "boat", seen: "He damaged a poor family's boat.", wisdom: "A king was seizing every sound boat. The flaw saved it.", ref: "18:79" },
    { icon: "child", seen: "He took the life of a boy.", wisdom: "Allah would give the believing parents a purer, kinder child in his place.", ref: "18:80–81" },
    { icon: "wall", seen: "He rebuilt a wall for a town that refused them food.", wisdom: "Beneath it lay the treasure of two orphans, kept safe until they came of age.", ref: "18:82" }
  ],

  /* Lifespans for the chart (years) */
  lifespans: [
    { label: "Global average life expectancy", v: 73, note: "WHO, 2019" },
    { label: "Oldest documented human", v: 122, note: "Jeanne Calment, 1875–1997" },
    { label: "Greenland shark (at least)", v: 272, note: "Science, 2016" },
    { label: "Nuh (as) among his people", v: 950, note: "al-'Ankabut 29:14" },
    { label: "Imam al-Mahdi (atfs), today", v: 0, live: true, note: "since 255 AH · and counting" }
  ],

  deputies: [
    { name: "Uthman ibn Sa'id al-'Amri", yrs: "260 – c. 265 AH" },
    { name: "Muhammad ibn Uthman al-'Amri", yrs: "to 305 AH" },
    { name: "al-Husayn ibn Ruh al-Nawbakhti", yrs: "305 – 326 AH" },
    { name: "Ali ibn Muhammad al-Samuri", yrs: "326 – 329 AH" }
  ],
  lastLetter: {
    en: "O Ali ibn Muhammad al-Samuri … you will die in six days. So settle your affairs, and appoint no one in your place, for the complete occultation has now begun. There will be no appearance except after the permission of Allah — after a long time, when hearts have hardened and the earth is filled with injustice.",
    ref: "Kamal al-Din, ch. 45"
  },

  /* ---------------- V. HE IS WAITING ---------------- */
  waiting: {
    covenant: {
      ar: "وَلَوْ أَنَّ أَشْيَاعَنَا وَفَّقَهُمُ اللهُ لِطَاعَتِهِ عَلَىٰ اجْتِمَاعٍ مِنَ الْقُلُوبِ فِي الْوَفَاءِ بِالْعَهْدِ عَلَيْهِمْ، لَمَا تَأَخَّرَ عَنْهُمُ الْيُمْنُ بِلِقَائِنَا",
      en: "If our followers — may Allah grant them success in His obedience — were united in heart in fulfilling the covenant upon them, the blessing of meeting us would not have been delayed for them.",
      ref: "Imam al-Mahdi (atfs), letter to Shaykh al-Mufid · al-Ihtijaj · Bihar al-Anwar 53:177"
    },
    sadiq: { en: "Whoever would be pleased to be among the companions of the Qa'im, let him wait — and act with piety and good character while he waits.", ref: "Imam al-Sadiq (as) · al-Ghayba (al-Nu'mani), ch. 11" },
    tent: { en: "Whoever dies awaiting this affair is like one who is with the Qa'im in his tent — rather, like one who fought beside the Messenger of Allah.", ref: "Imam al-Sadiq (as) · Kamal al-Din, ch. 33" },
    practices: [
      { t: "Know him", d: "Learn his names, his rights and his story — this page is a beginning, not an end.", ref: "\"Make Your Proof known to me.\"" },
      { t: "Pray for his return", d: "Recite Du'a al-Faraj and \"Allahumma kun li-waliyyik\". Imam al-'Askari tied salvation to being granted success in praying for his reappearance.", ref: "Kamal al-Din, ch. 38" },
      { t: "Become someone worth calling", d: "Piety and good character are the preparation the Imams named. Waiting is not sitting; it is getting ready.", ref: "al-Ghayba (al-Nu'mani)" },
      { t: "Give for his safety", d: "Give charity with the intention of his protection, and remember him in your gatherings.", ref: "Mikyal al-Makarim" },
      { t: "Renew the covenant", d: "Each morning, renew your pledge with Du'a al-'Ahd.", ref: "Below" }
    ]
  },

  /* ---------------- VI. THE COVENANT ---------------- */
  ahd: {
    lines: [
      { ar: "اللَّهُمَّ إِنِّي أُجَدِّدُ لَهُ فِي صَبِيحَةِ يَوْمِي هَٰذَا وَمَا عِشْتُ مِنْ أَيَّامِي", en: "O Allah, I renew for him, on the morning of this day and for as long as I live," },
      { ar: "عَهْدًا وَعَقْدًا وَبَيْعَةً لَهُ فِي عُنُقِي", en: "a covenant, a bond and a pledge of allegiance to him upon my neck," },
      { ar: "لَا أَحُولُ عَنْهَا وَلَا أَزُولُ أَبَدًا", en: "from which I will never turn and never waver." },
      { ar: "اللَّهُمَّ أَرِنِي الطَّلْعَةَ الرَّشِيدَةَ وَالْغُرَّةَ الْحَمِيدَةَ", en: "O Allah, show me the rightly-guided countenance and the praiseworthy brow." }
    ],
    note: "Imam al-Sadiq (as): whoever recites this covenant for forty mornings will be among the helpers of our Qa'im.",
    ref: "Du'a al-'Ahd · Misbah al-Za'ir (Ibn Tawus) · Bihar al-Anwar 102:111"
  }
};
