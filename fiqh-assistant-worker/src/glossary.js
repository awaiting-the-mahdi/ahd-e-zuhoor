/*
  Spellings and translations of common fiqh terms.
  "match" lists ways people type the term (English, Roman Urdu, Arabic, Urdu).
  "en" / "ar" / "ur" are the words used to search sistani.org in that language.
  Add more groups as needed. Searching on sistani.org is literal, so these matter.
*/
export const GLOSSARY = [
  { match: ["wudu", "wudhu", "wuzu", "wuzoo", "vuzu", "wazu", "wadu", "ablution", "وضو", "وضوء"], en: ["wudu", "ablution"], ar: ["الوضوء"], ur: ["وضو"] },
  { match: ["ghusl", "gusl", "ghusal", "ritual bath", "غسل"], en: ["ghusl"], ar: ["الغسل"], ur: ["غسل"] },
  { match: ["tayammum", "tayamum", "tayyamum", "tayammu", "تیمم", "التيمم"], en: ["tayammum"], ar: ["التيمم"], ur: ["تیمم"] },
  { match: ["salah", "salat", "salaat", "namaz", "namaaz", "nimaz", "prayer", "pray", "praying", "صلاة", "الصلاة", "نماز"], en: ["prayer"], ar: ["الصلاة"], ur: ["نماز"] },
  { match: ["qasr", "qasar", "musafir", "safar", "travel", "traveller", "traveler", "journey", "مسافر", "سفر", "قصر"], en: ["traveller", "qasr"], ar: ["المسافر"], ur: ["مسافر"] },
  { match: ["sawm", "saum", "roza", "rozah", "rozay", "rozey", "roze", "fast", "fasting", "siyam", "صوم", "الصوم", "روزہ", "روزے"], en: ["fasting"], ar: ["الصوم"], ur: ["روزہ"] },
  { match: ["khums", "khumus", "khoms", "خمس", "الخمس"], en: ["khums"], ar: ["الخمس"], ur: ["خمس"] },
  { match: ["zakat", "zakah", "zakaat", "zakaah", "fitra", "fitrah", "زكاة", "زکات", "زکوة", "زکوٰۃ"], en: ["zakat"], ar: ["الزكاة"], ur: ["زکوٰۃ"] },
  { match: ["hajj", "haj", "hajj", "umrah", "umra", "ihram", "حج", "الحج", "عمرہ"], en: ["hajj"], ar: ["الحج"], ur: ["حج"] },
  { match: ["najis", "najas", "najasat", "najasah", "impure", "impurity", "napak", "na pak", "naapaak", "نجس", "نجاست", "ناپاک"], en: ["najis", "impure"], ar: ["نجس"], ur: ["نجس"] },
  { match: ["tahir", "taahir", "paak", "pak", "pure", "purity", "tahara", "taharah", "طاهر", "پاک", "طہارت"], en: ["pure", "tahir"], ar: ["طاهر"], ur: ["پاک"] },
  { match: ["dog", "dogs", "kutta", "kutte", "kuttay", "كلب", "الكلب", "کتا"], en: ["dog"], ar: ["الكلب"], ur: ["کتا"] },
  { match: ["pig", "pork", "swine", "suar", "sooar", "soowar", "خنزير", "سور"], en: ["pork", "pig"], ar: ["الخنزير"], ur: ["سور"] },
  { match: ["alcohol", "alcoholic", "wine", "beer", "sharab", "sharaab", "khamr", "خمر", "الخمر", "شراب"], en: ["alcohol"], ar: ["الخمر"], ur: ["شراب"] },
  { match: ["shrimp", "prawn", "prawns", "jhinga", "jheenga", "روبيان", "جھینگا"], en: ["shrimp"], ar: ["الروبيان"], ur: ["جھینگا"] },
  { match: ["fish", "machli", "machhli", "seafood", "سمك", "مچھلی"], en: ["fish"], ar: ["السمك"], ur: ["مچھلی"] },
  { match: ["zabiha", "zabeeha", "dhabiha", "slaughter", "slaughtered", "halal meat", "meat", "gosht", "ذبيحة", "ذبیحہ", "گوشت"], en: ["slaughter", "meat"], ar: ["الذبيحة"], ur: ["ذبیحہ"] },
  { match: ["music", "musiqi", "mosiqi", "song", "songs", "gana", "gaana", "ghina", "غناء", "الغناء", "موسیقی"], en: ["music"], ar: ["الغناء"], ur: ["موسیقی"] },
  { match: ["interest", "riba", "sood", "sud", "usury", "ربا", "الربا", "سود"], en: ["interest", "riba"], ar: ["الربا"], ur: ["سود"] },
  { match: ["bank", "banking", "بنك", "بینک"], en: ["bank"], ar: ["البنك"], ur: ["بینک"] },
  { match: ["insurance", "beema", "bima", "تأمين", "بیمہ"], en: ["insurance"], ar: ["التأمين"], ur: ["بیمہ"] },
  { match: ["gambling", "jua", "juwa", "lottery", "قمار", "جوا"], en: ["gambling", "lottery"], ar: ["القمار"], ur: ["جوا"] },
  { match: ["nikah", "nikkah", "marriage", "marry", "married", "shadi", "shaadi", "نكاح", "الزواج", "نکاح", "شادی"], en: ["marriage"], ar: ["الزواج"], ur: ["نکاح"] },
  { match: ["mutah", "mut'ah", "muta", "temporary marriage", "متعة", "متعہ"], en: ["temporary marriage"], ar: ["المتعة"], ur: ["متعہ"] },
  { match: ["talaq", "talaaq", "divorce", "طلاق", "الطلاق"], en: ["divorce"], ar: ["الطلاق"], ur: ["طلاق"] },
  { match: ["hijab", "purdah", "pardah", "parda", "veil", "حجاب", "الحجاب", "پردہ"], en: ["hijab"], ar: ["الحجاب"], ur: ["پردہ"] },
  { match: ["janabat", "janabah", "janaabat", "jinabat", "جنابة", "جنابت"], en: ["janabah"], ar: ["الجنابة"], ur: ["جنابت"] },
  { match: ["haiz", "haidh", "hayd", "menstruation", "period", "periods", "menses", "حيض", "الحيض", "حیض"], en: ["menstruation", "haidh"], ar: ["الحيض"], ur: ["حیض"] },
  { match: ["qibla", "qiblah", "kibla", "قبلة", "القبلة", "قبلہ"], en: ["qibla"], ar: ["القبلة"], ur: ["قبلہ"] },
  { match: ["adhan", "azan", "azaan", "iqamah", "iqamat", "أذان", "اذان"], en: ["adhan"], ar: ["الأذان"], ur: ["اذان"] },
  { match: ["taqlid", "taqleed", "marja", "marja'", "mujtahid", "تقليد", "تقلید", "مرجع"], en: ["taqlid", "mujtahid"], ar: ["التقليد"], ur: ["تقلید"] },
  { match: ["sleep", "sleeping", "neend", "nind", "نوم", "نیند"], en: ["sleep"], ar: ["النوم"], ur: ["نیند"] },
  { match: ["vomit", "vomiting", "qay", "ulti", "قيء", "قے", "الٹی"], en: ["vomit"], ar: ["القيء"], ur: ["قے"] },
  { match: ["toothpaste", "brush", "miswak", "manjan", "معجون", "مسواک"], en: ["toothpaste"], ar: ["معجون"], ur: ["مسواک"] },
  { match: ["smoking", "smoke", "cigarette", "sigret", "cigarette", "tobacco", "hookah", "shisha", "تدخين", "سگریٹ"], en: ["smoking"], ar: ["التدخين"], ur: ["سگریٹ"] },
  { match: ["tattoo", "tattoos", "وشم", "ٹیٹو"], en: ["tattoo"], ar: ["الوشم"], ur: ["ٹیٹو"] },
  { match: ["beard", "daadhi", "dadhi", "darhi", "shave", "shaving", "لحية", "داڑھی"], en: ["beard"], ar: ["اللحية"], ur: ["داڑھی"] },
  { match: ["gold", "silver", "jewellery", "jewelry", "ذهب", "سونا", "چاندی"], en: ["gold"], ar: ["الذهب"], ur: ["سونا"] },
  { match: ["blood", "khoon", "khun", "دم", "الدم", "خون"], en: ["blood"], ar: ["الدم"], ur: ["خون"] },
  { match: ["backbiting", "gheebat", "ghibat", "gheebah", "ghibah", "غيبة", "غیبت"], en: ["backbiting"], ar: ["الغيبة"], ur: ["غیبت"] },
  { match: ["eclipse", "grahan", "ayat prayer", "salat al-ayat", "خسوف", "کسوف", "گرہن"], en: ["eclipse"], ar: ["الكسوف"], ur: ["گرہن"] },
  { match: ["moon sighting", "crescent", "chand", "hilal", "هلال", "چاند"], en: ["crescent"], ar: ["الهلال"], ur: ["چاند"] },
  { match: ["dead body", "corpse", "mayyit", "mayyat", "janaza", "funeral", "burial", "ميت", "میت", "جنازہ"], en: ["corpse", "funeral"], ar: ["الميت"], ur: ["میت"] },
  { match: ["make-up", "makeup", "nail polish", "nailpolish", "cosmetics", "مكياج"], en: ["nail polish", "make-up"], ar: ["المكياج"], ur: ["میک اپ"] }
];

/* Words that strongly suggest Roman Urdu when written in Latin script. */
export const ROMAN_URDU_MARKERS = ["kya", "kia", "hai", "hain", "hy", "ka", "ki", "ke", "mein", "main", "me", "se", "ko", "agar", "to", "kar", "karna", "karne", "sakte", "sakta", "sakti", "jaiz", "najaiz", "hota", "hoti", "hoga", "wala", "wali", "nahi", "nahin", "kaise", "kyun", "kyon", "chahiye"];
