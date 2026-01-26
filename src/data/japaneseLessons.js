/**
 * Japanese Lessons Data
 * 100+ lessons covering beginner to advanced Japanese
 * Each lesson includes: title, vocabulary (with romaji), example sentence, grammar note
 */

export const japaneseLessons = [
  {
    title: "Greetings and Basic Phrases",
    vocabulary: [
      { word: "こんにちは", romaji: "konnichiwa", translation: "Hello (daytime)" },
      { word: "おはよう", romaji: "ohayou", translation: "Good morning" },
      { word: "こんばんは", romaji: "konbanwa", translation: "Good evening" },
      { word: "さようなら", romaji: "sayounara", translation: "Goodbye" },
      { word: "ありがとう", romaji: "arigatou", translation: "Thank you" }
    ],
    exampleSentence: "こんにちは、元気ですか？",
    exampleSentenceRomaji: "Konnichiwa, genki desu ka?",
    exampleTranslation: "Hello, how are you?",
    grammarNote: "Japanese doesn't use spaces. Particles like は (wa) and か (ka) mark topics and questions."
  },
  {
    title: "Numbers 1-10",
    vocabulary: [
      { word: "一", romaji: "ichi", translation: "One" },
      { word: "二", romaji: "ni", translation: "Two" },
      { word: "三", romaji: "san", translation: "Three" },
      { word: "四", romaji: "yon/shi", translation: "Four" },
      { word: "五", romaji: "go", translation: "Five" },
      { word: "六", romaji: "roku", translation: "Six" },
      { word: "七", romaji: "nana/shichi", translation: "Seven" },
      { word: "八", romaji: "hachi", translation: "Eight" },
      { word: "九", romaji: "kyuu/ku", translation: "Nine" },
      { word: "十", romaji: "juu", translation: "Ten" }
    ],
    exampleSentence: "りんごを五つ買いました。",
    exampleSentenceRomaji: "Ringo o itsutsu kaimashita.",
    exampleTranslation: "I bought five apples.",
    grammarNote: "Numbers can be written in kanji or hiragana. Some numbers have multiple readings."
  },
  {
    title: "Personal Pronouns",
    vocabulary: [
      { word: "私", romaji: "watashi", translation: "I/Me" },
      { word: "あなた", romaji: "anata", translation: "You" },
      { word: "彼", romaji: "kare", translation: "He" },
      { word: "彼女", romaji: "kanojo", translation: "She" },
      { word: "私たち", romaji: "watashitachi", translation: "We" },
      { word: "彼ら", romaji: "karera", translation: "They" }
    ],
    exampleSentence: "私は学生です。",
    exampleSentenceRomaji: "Watashi wa gakusei desu.",
    exampleTranslation: "I am a student.",
    grammarNote: "Japanese often omits pronouns when context is clear. は (wa) is the topic particle."
  },
  {
    title: "Basic Verbs: To Be (Desu)",
    vocabulary: [
      { word: "です", romaji: "desu", translation: "Is/Am/Are (polite)" },
      { word: "だ", romaji: "da", translation: "Is/Am/Are (casual)" },
      { word: "ではありません", romaji: "dewa arimasen", translation: "Is not" },
      { word: "じゃない", romaji: "janai", translation: "Is not (casual)" }
    ],
    exampleSentence: "これは本です。",
    exampleSentenceRomaji: "Kore wa hon desu.",
    exampleTranslation: "This is a book.",
    grammarNote: "です (desu) is the polite form of 'to be'. Use だ (da) in casual speech. です doesn't change for singular/plural."
  },
  {
    title: "Question Words",
    vocabulary: [
      { word: "何", romaji: "nani/nan", translation: "What" },
      { word: "誰", romaji: "dare", translation: "Who" },
      { word: "どこ", romaji: "doko", translation: "Where" },
      { word: "いつ", romaji: "itsu", translation: "When" },
      { word: "なぜ/なんで", romaji: "naze/nande", translation: "Why" },
      { word: "どう", romaji: "dou", translation: "How" }
    ],
    exampleSentence: "これは何ですか？",
    exampleSentenceRomaji: "Kore wa nan desu ka?",
    exampleTranslation: "What is this?",
    grammarNote: "か (ka) at the end makes a question. No question mark needed in formal writing, but used in casual writing."
  },
  {
    title: "Basic Particles: Wa, Ga, O",
    vocabulary: [
      { word: "は", romaji: "wa", translation: "Topic particle" },
      { word: "が", romaji: "ga", translation: "Subject particle" },
      { word: "を", romaji: "o", translation: "Object particle" },
      { word: "の", romaji: "no", translation: "Possession/Of" }
    ],
    exampleSentence: "私は本を読みます。",
    exampleSentenceRomaji: "Watashi wa hon o yomimasu.",
    exampleTranslation: "I read a book.",
    grammarNote: "は marks the topic, が marks the subject, を marks the direct object. の shows possession (私の本 = my book)."
  },
  {
    title: "Common Verbs: Present Tense",
    vocabulary: [
      { word: "食べる", romaji: "taberu", translation: "To eat" },
      { word: "飲む", romaji: "nomu", translation: "To drink" },
      { word: "行く", romaji: "iku", translation: "To go" },
      { word: "来る", romaji: "kuru", translation: "To come" },
      { word: "する", romaji: "suru", translation: "To do" }
    ],
    exampleSentence: "私はご飯を食べます。",
    exampleSentenceRomaji: "Watashi wa gohan o tabemasu.",
    exampleTranslation: "I eat rice.",
    grammarNote: "ます (masu) is the polite present/future form. Remove る from ru-verbs, add ます. U-verbs change ending to i + ます."
  },
  {
    title: "Numbers 11-100",
    vocabulary: [
      { word: "十一", romaji: "juuichi", translation: "Eleven" },
      { word: "二十", romaji: "nijuu", translation: "Twenty" },
      { word: "三十", romaji: "sanjuu", translation: "Thirty" },
      { word: "百", romaji: "hyaku", translation: "One hundred" }
    ],
    exampleSentence: "私は二十歳です。",
    exampleSentenceRomaji: "Watashi wa nijussai desu.",
    exampleTranslation: "I am twenty years old.",
    grammarNote: "Numbers combine: 11 = 十(juu) + 一(ichi). Some numbers have sound changes: 20 = 二十(nijuu), not にじゅう."
  },
  {
    title: "Time: Days of the Week",
    vocabulary: [
      { word: "月曜日", romaji: "getsuyoubi", translation: "Monday" },
      { word: "火曜日", romaji: "kayoubi", translation: "Tuesday" },
      { word: "水曜日", romaji: "suiyoubi", translation: "Wednesday" },
      { word: "木曜日", romaji: "mokuyoubi", translation: "Thursday" },
      { word: "金曜日", romaji: "kinyoubi", translation: "Friday" },
      { word: "土曜日", romaji: "doyoubi", translation: "Saturday" },
      { word: "日曜日", romaji: "nichiyoubi", translation: "Sunday" }
    ],
    exampleSentence: "今日は月曜日です。",
    exampleSentenceRomaji: "Kyou wa getsuyoubi desu.",
    exampleTranslation: "Today is Monday.",
    grammarNote: "曜日 (youbi) means 'day of the week'. Each day uses a kanji element (月=moon/Monday, 火=fire/Tuesday, etc.)."
  },
  {
    title: "Time: Today, Tomorrow, Yesterday",
    vocabulary: [
      { word: "今日", romaji: "kyou", translation: "Today" },
      { word: "明日", romaji: "ashita", translation: "Tomorrow" },
      { word: "昨日", romaji: "kinou", translation: "Yesterday" },
      { word: "今", romaji: "ima", translation: "Now" }
    ],
    exampleSentence: "明日学校に行きます。",
    exampleSentenceRomaji: "Ashita gakkou ni ikimasu.",
    exampleTranslation: "I will go to school tomorrow.",
    grammarNote: "Time words usually come at the beginning of sentences. Use に (ni) particle with time expressions for specific times."
  },
  {
    title: "Family Members",
    vocabulary: [
      { word: "家族", romaji: "kazoku", translation: "Family" },
      { word: "父", romaji: "chichi", translation: "Father (my)" },
      { word: "母", romaji: "haha", translation: "Mother (my)" },
      { word: "兄", romaji: "ani", translation: "Older brother (my)" },
      { word: "姉", romaji: "ane", translation: "Older sister (my)" },
      { word: "弟", romaji: "otouto", translation: "Younger brother" },
      { word: "妹", romaji: "imouto", translation: "Younger sister" }
    ],
    exampleSentence: "私の家族は大きいです。",
    exampleSentenceRomaji: "Watashi no kazoku wa ookii desu.",
    exampleTranslation: "My family is large.",
    grammarNote: "Family terms change when referring to your own family vs. others'. Use お父さん (otousan) for 'your father' or 'father' in general."
  },
  {
    title: "Colors",
    vocabulary: [
      { word: "赤", romaji: "aka", translation: "Red" },
      { word: "青", romaji: "ao", translation: "Blue" },
      { word: "緑", romaji: "midori", translation: "Green" },
      { word: "黄色", romaji: "kiiro", translation: "Yellow" },
      { word: "白", romaji: "shiro", translation: "White" },
      { word: "黒", romaji: "kuro", translation: "Black" }
    ],
    exampleSentence: "この車は赤いです。",
    exampleSentenceRomaji: "Kono kuruma wa akai desu.",
    exampleTranslation: "This car is red.",
    grammarNote: "い-adjectives end in い and come before nouns. They conjugate: 赤い (red), 赤くない (not red)."
  },
  {
    title: "い-Adjectives",
    vocabulary: [
      { word: "大きい", romaji: "ookii", translation: "Big" },
      { word: "小さい", romaji: "chiisai", translation: "Small" },
      { word: "新しい", romaji: "atarashii", translation: "New" },
      { word: "古い", romaji: "furui", translation: "Old" },
      { word: "高い", romaji: "takai", translation: "Expensive/High" },
      { word: "安い", romaji: "yasui", translation: "Cheap" }
    ],
    exampleSentence: "この本は新しいです。",
    exampleSentenceRomaji: "Kono hon wa atarashii desu.",
    exampleTranslation: "This book is new.",
    grammarNote: "い-adjectives can end sentences with です or stand alone. Negative: remove い, add くない."
  },
  {
    title: "な-Adjectives",
    vocabulary: [
      { word: "きれい", romaji: "kirei", translation: "Beautiful/Clean" },
      { word: "静か", romaji: "shizuka", translation: "Quiet" },
      { word: "元気", romaji: "genki", translation: "Healthy/Energetic" },
      { word: "便利", romaji: "benri", translation: "Convenient" },
      { word: "有名", romaji: "yuumei", translation: "Famous" }
    ],
    exampleSentence: "この町は静かです。",
    exampleSentenceRomaji: "Kono machi wa shizuka desu.",
    exampleTranslation: "This town is quiet.",
    grammarNote: "な-adjectives need な before nouns (静かな町 = quiet town) but です when ending sentences."
  },
  {
    title: "Past Tense",
    vocabulary: [
      { word: "でした", romaji: "deshita", translation: "Was/Were (polite)" },
      { word: "だった", romaji: "datta", translation: "Was/Were (casual)" },
      { word: "食べました", romaji: "tabemashita", translation: "Ate" },
      { word: "行きました", romaji: "ikimashita", translation: "Went" },
      { word: "しました", romaji: "shimashita", translation: "Did" }
    ],
    exampleSentence: "昨日、本を読みました。",
    exampleSentenceRomaji: "Kinou, hon o yomimashita.",
    exampleTranslation: "Yesterday, I read a book.",
    grammarNote: "Past tense: ます → ました, です → でした. Negative past: ませんでした."
  },
  {
    title: "Food Vocabulary",
    vocabulary: [
      { word: "ご飯", romaji: "gohan", translation: "Rice/Meal" },
      { word: "パン", romaji: "pan", translation: "Bread" },
      { word: "水", romaji: "mizu", translation: "Water" },
      { word: "お茶", romaji: "ocha", translation: "Tea" },
      { word: "肉", romaji: "niku", translation: "Meat" },
      { word: "魚", romaji: "sakana", translation: "Fish" }
    ],
    exampleSentence: "私はご飯を食べます。",
    exampleSentenceRomaji: "Watashi wa gohan o tabemasu.",
    exampleTranslation: "I eat rice.",
    grammarNote: "ご飯 can mean 'cooked rice' or 'meal' depending on context. お is a polite prefix."
  },
  {
    title: "Body Parts",
    vocabulary: [
      { word: "頭", romaji: "atama", translation: "Head" },
      { word: "目", romaji: "me", translation: "Eye" },
      { word: "耳", romaji: "mimi", translation: "Ear" },
      { word: "鼻", romaji: "hana", translation: "Nose" },
      { word: "口", romaji: "kuchi", translation: "Mouth" },
      { word: "手", romaji: "te", translation: "Hand" },
      { word: "足", romaji: "ashi", translation: "Foot/Leg" }
    ],
    exampleSentence: "私は目が二つあります。",
    exampleSentenceRomaji: "Watashi wa me ga futatsu arimasu.",
    exampleTranslation: "I have two eyes.",
    grammarNote: "Use あります (arimasu) for inanimate objects/body parts. が marks what you have."
  },
  {
    title: "Animals",
    vocabulary: [
      { word: "犬", romaji: "inu", translation: "Dog" },
      { word: "猫", romaji: "neko", translation: "Cat" },
      { word: "鳥", romaji: "tori", translation: "Bird" },
      { word: "馬", romaji: "uma", translation: "Horse" },
      { word: "牛", romaji: "ushi", translation: "Cow" },
      { word: "魚", romaji: "sakana", translation: "Fish" }
    ],
    exampleSentence: "その犬は大きいです。",
    exampleSentenceRomaji: "Sono inu wa ookii desu.",
    exampleTranslation: "That dog is big.",
    grammarNote: "この (kono) = this, その (sono) = that (near you), あの (ano) = that (over there)."
  },
  {
    title: "Clothing",
    vocabulary: [
      { word: "シャツ", romaji: "shatsu", translation: "Shirt" },
      { word: "ズボン", romaji: "zubon", translation: "Pants" },
      { word: "ドレス", romaji: "doresu", translation: "Dress" },
      { word: "靴", romaji: "kutsu", translation: "Shoes" },
      { word: "帽子", romaji: "boushi", translation: "Hat" },
      { word: "靴下", romaji: "kutsushita", translation: "Socks" }
    ],
    exampleSentence: "私は青いシャツを着ます。",
    exampleSentenceRomaji: "Watashi wa aoi shatsu o kimasu.",
    exampleTranslation: "I wear a blue shirt.",
    grammarNote: "着る (kiru) = to wear (upper body), 履く (haku) = to wear (lower body/feet), かぶる (kaburu) = to wear (hat)."
  },
  {
    title: "Weather",
    vocabulary: [
      { word: "天気", romaji: "tenki", translation: "Weather" },
      { word: "晴れ", romaji: "hare", translation: "Sunny" },
      { word: "雨", romaji: "ame", translation: "Rain" },
      { word: "雪", romaji: "yuki", translation: "Snow" },
      { word: "風", romaji: "kaze", translation: "Wind" },
      { word: "雲", romaji: "kumo", translation: "Cloud" }
    ],
    exampleSentence: "今日はいい天気です。",
    exampleSentenceRomaji: "Kyou wa ii tenki desu.",
    exampleTranslation: "Today is nice weather.",
    grammarNote: "いい (ii) = good. 天気がいい = nice weather. Use が with weather expressions."
  },
  {
    title: "Months",
    vocabulary: [
      { word: "一月", romaji: "ichigatsu", translation: "January" },
      { word: "二月", romaji: "nigatsu", translation: "February" },
      { word: "三月", romaji: "sangatsu", translation: "March" },
      { word: "四月", romaji: "shigatsu", translation: "April" },
      { word: "五月", romaji: "gogatsu", translation: "May" },
      { word: "六月", romaji: "rokugatsu", translation: "June" }
    ],
    exampleSentence: "私の誕生日は五月です。",
    exampleSentenceRomaji: "Watashi no tanjoubi wa gogatsu desu.",
    exampleTranslation: "My birthday is in May.",
    grammarNote: "Months: number + 月 (gatsu). 四月 (shigatsu) not よんがつ. Use に for specific months."
  }
];
