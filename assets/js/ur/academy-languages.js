/* Urdu — Language Courses welcome flow */
AZ_UR.also = ["courses"];
AZ_UR.add({
  "Language Courses": "زبان کے کورس",
  "Zahra & Ali": "زہرا اور علی",
  "Learn with Zahra and Ali, one word at a time.": "زہرا اور علی کے ساتھ سیکھیں، ایک ایک لفظ کر کے۔",
  "Get started": "شروع کریں",
  "← Back to the Academy": "← اکیڈمی پر واپس",
  "Gentle orbit": "ہلکا مدار", "5 minutes a day": "روزانہ 5 منٹ",
  "Steady flight": "مستحکم پرواز", "10 minutes a day": "روزانہ 10 منٹ",
  "Rocket speed": "راکٹ کی رفتار", "15 minutes a day": "روزانہ 15 منٹ",
  "Warp drive": "تیز ترین سفر", "20 minutes a day": "روزانہ 20 منٹ",
  "Your voyage begins!": "آپ کا سفر شروع ہو رہا ہے!",
  "Continue": "جاری رکھیں", "Back": "واپس", "Progress": "پیش رفت",
  "Sound on": "آواز چالو", "Sound off": "آواز بند",
  "Zahra and Ali, your guides": "زہرا اور علی، آپ کے رہنما",
  "Choose a course": "کورس منتخب کریں", "Choose your pace": "اپنی رفتار منتخب کریں",
  "Zahra": "زہرا", "Ali": "علی",
  "Nice and gentle. Every little step counts!": "آرام سے اور سکون سے۔ ہر چھوٹا قدم اہم ہے!",
  "A steady flight. Great choice!": "مستحکم پرواز۔ بہت اچھا انتخاب!",
  "Rocket speed! Let's go!": "راکٹ کی رفتار! چلیں!",
  "Warp drive! You're amazing!": "تیز ترین سفر! آپ کمال ہیں!",
  "Assalamu alaykum! I'm Zahra.": "السلام علیکم! میں زہرا ہوں۔",
  "And I'm Ali! We'll be your guides on this language voyage.": "اور میں علی ہوں! زبان کے اس سفر میں ہم آپ کے رہنما ہوں گے۔",
  "Just a few quick questions, and we'll be on our way!": "بس چند مختصر سوال، اور پھر ہم روانہ ہوں گے!",
  "Which course would you like to start?": "آپ کون سا کورس شروع کرنا چاہیں گے؟",
  "How fast would you like to travel each day?": "آپ روزانہ کتنی رفتار سے سفر کرنا چاہیں گے؟",
  "Yay!": "واہ!",
  "Let's start learning!": "آئیں سیکھنا شروع کریں!",
  "Start learning": "سیکھنا شروع کریں"
});
AZ_UR.patterns([
  [/^Yay! (.+) it is!$/, function (m, c) { return "واہ! تو پھر " + AZ_UR.t(c) + "!"; }],
  /* choosing a course: "Arabic! Read, speak and understand Arabic." */
  [/^([^!]+)! (.+)\.$/, function (m, c, t) { var uc = AZ_UR.t(c), ut = AZ_UR.t(t); return uc !== c && ut !== t ? uc + "! " + ut + "۔" : m; }]
]);
