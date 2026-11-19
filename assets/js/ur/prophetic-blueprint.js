/* Urdu — the Prophetic Blueprint */
(function () {
  var names = {
    "Prophet Adam (AS)": "حضرت آدم (ع)", "Prophet Nuh (AS)": "حضرت نوح (ع)", "Prophet Ibrahim (AS)": "حضرت ابراہیم (ع)",
    "Prophet Musa (AS)": "حضرت موسیٰ (ع)", "Prophet Isa (AS)": "حضرت عیسیٰ (ع)", "Prophet Yusuf (AS)": "حضرت یوسف (ع)",
    "Prophet Khizr (AS)": "حضرت خضر (ع)", "Prophet Muhammad (SAWW)": "حضرت محمد مصطفیٰ (ص)"
  };
  var laqab = {
    "Safiyullah": "صفی اللہ", "Najiyullah": "نجی اللہ", "Khalilullah": "خلیل اللہ", "Kalimullah": "کلیم اللہ",
    "Ruhullah": "روح اللہ", "Al-Siddiq": "الصدیق", "Al-Abd al-Salih": "العبد الصالح", "Habibullah": "حبیب اللہ"
  };
  var d = {
    "The Prophetic Blueprint | AHD-E-ZUHOOR": "انبیاء کا نقشِ راہ | عہدِ ظہور",
    "THE PROPHETIC LEGACY": "انبیاء کی میراث",
    "The Prophetic Blueprint": "انبیاء کا نقشِ راہ",
    "Imam Mahdi (ATFS)": "امام مہدی (عج)",
    "Adam (AS)": "آدم (ع)", "Nuh (AS)": "نوح (ع)", "Ibrahim (AS)": "ابراہیم (ع)", "Musa (AS)": "موسیٰ (ع)",
    "Isa (AS)": "عیسیٰ (ع)", "Yusuf (AS)": "یوسف (ع)", "Khizr (AS)": "خضر (ع)", "Muhammad (SAWW)": "محمد (ص)",
    "Choose a star above and begin exploring.": "اوپر کسی ستارے کو چھوئیں اور سفر شروع کیجیے۔",
    "✦ THE THREAD OF DIVINE GUIDANCE ✦": "✦ الٰہی ہدایت کا سلسلہ ✦",
    "Across Generations.": "نسل در نسل۔",
    "Towards the Awaited Promise.": "اس وعدے کی طرف جس کا سب کو انتظار ہے۔",
    "Explore the lives and divine missions of the Prophets (as),": "انبیاء (ع) کی زندگیوں اور ان کے الٰہی مشن کو پڑھیے،",
    "discover their resemblances to Imam Mahdi (atfs),": "دیکھیے کہ امام مہدی (عج) کی زندگی میں ان کی کیا جھلک ہے،",
    "and uncover the prophetic patterns of Ghaibat.": "اور سمجھیے کہ غیبت کا سلسلہ انبیاء کے زمانے سے کیسے چلا آ رہا ہے۔",
    "A LEGACY OF PROPHECY · A PROMISE OF RETURN": "انبیاء کی میراث · ظہور کا وعدہ",
    "Discover the Answer <span aria-hidden=\"true\">→</span>": "جواب جانیے <span aria-hidden=\"true\">←</span>",
    "Discover the Answer": "جواب جانیے",
    "Interactive Prophetic Blueprint": "انبیاء کا انٹرایکٹو نقشِ راہ",
    "A luminous golden network of interconnected points": "ایک دوسرے سے جڑے روشن سنہری نقطوں کا جال",
    "About the Prophetic Legacy": "انبیاء کی میراث کے بارے میں"
  };
  for (var k in names) d[k] = names[k];
  for (var l in laqab) d[l] = laqab[l];
  AZ_UR.add(d);
  function n(x) { return names[x] || laqab[x] || x; }
  AZ_UR.patterns([
    [/^Do you know why (.+?) is known by the laqab (.+?)\?$/, function (m, a, b) { return "کیا آپ جانتے ہیں کہ " + n(a) + " کو ”" + n(b) + "“ کا لقب کیوں دیا گیا؟"; }],
    [/^Do you know the resemblance between (.+?) and our Imam \(ATFS\)\?$/, function (m, a) { return "کیا آپ " + n(a) + " اور ہمارے امام (عج) کے درمیان مشابہت جانتے ہیں؟"; }]
  ]);
})();
