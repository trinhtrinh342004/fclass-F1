const SECTION_FLOW = [
  "vowel2_overview",
  "vowel2_long_i",
  "vowel2_short_i",
  "vowel2_compare_i",
  "vowel2_sound_e",
  "vowel2_sound_ae",
  "vowel2_compare_e_ae",
  "vowel2_sound_schwa",
  "vowel2_sound_uh",
  "vowel2_compare_schwa_caret",
  "vowel2_word_practice",
  "vowel2_pairs_sentences",
  "vowel2_game_record_test",
  "vowel2_homework",
  "vowel2_summary",
];

const WORD_GROUPS = [
  {
    symbol: "/iː/",
    sectionKey: "i-long",
    practiceKey: "long_i",
    title: "Âm dài /iː/",
    label: "Âm dài",
    guide: "Miệng hơi cười, lưỡi cao, kéo âm dài hơn.",
    mouth: "smile",
    soundText: "/iː/",
    words: [
      ["sheep", "/ʃiːp/", "con cừu", "🐑", "ee"],
      ["seat", "/siːt/", "ghế", "💺", "ea"],
      ["feet", "/fiːt/", "bàn chân", "🦶", "ee"],
      ["see", "/siː/", "nhìn thấy", "👀", "ee"],
      ["teacher", "/ˈtiːtʃər/", "giáo viên", "👩‍🏫", "ea"],
    ],
  },
  {
    symbol: "/ɪ/",
    sectionKey: "i-short",
    practiceKey: "short_i",
    title: "Âm ngắn /ɪ/",
    label: "Âm ngắn",
    guide: "Đọc nhanh, ngắn, miệng thả lỏng hơn /iː/.",
    mouth: "relaxed-small",
    soundText: "/ɪ/",
    words: [
      ["ship", "/ʃɪp/", "con tàu", "🚢", "i"],
      ["sit", "/sɪt/", "ngồi", "🪑", "i"],
      ["fit", "/fɪt/", "vừa / phù hợp", "✅", "i"],
      ["fish", "/fɪʃ/", "con cá", "🐟", "i"],
      ["milk", "/mɪlk/", "sữa", "🥛", "i"],
    ],
  },
  {
    symbol: "/e/",
    sectionKey: "e",
    practiceKey: "e",
    title: "Âm /e/",
    label: "Âm ngắn",
    guide: "Đọc gần giống “e” tiếng Việt, âm ngắn và rõ.",
    mouth: "medium",
    soundText: "/e/",
    words: [
      ["bed", "/bed/", "cái giường", "🛏️", "e"],
      ["pen", "/pen/", "cây bút", "🖊️", "e"],
      ["ten", "/ten/", "số mười", "🔟", "e"],
      ["egg", "/eg/", "quả trứng", "🥚", "e"],
      ["red", "/red/", "màu đỏ", "🟥", "e"],
    ],
  },
  {
    symbol: "/æ/",
    sectionKey: "ae",
    practiceKey: "ae",
    title: "Âm /æ/",
    label: "Mở miệng rộng",
    guide: "Mở miệng rộng hơn /e/, âm giống giữa “a” và “e”.",
    mouth: "wide",
    soundText: "/æ/",
    words: [
      ["cat", "/kæt/", "con mèo", "🐱", "a"],
      ["bad", "/bæd/", "xấu/tệ", "👎", "a"],
      ["man", "/mæn/", "người đàn ông", "👨", "a"],
      ["apple", "/ˈæpəl/", "quả táo", "🍎", "a"],
      ["bag", "/bæg/", "cái túi", "🎒", "a"],
    ],
  },
  {
    symbol: "/ə/",
    sectionKey: "schwa",
    practiceKey: "schwa",
    title: "Âm /ə/",
    label: "Âm nhẹ",
    guide: "Đọc rất nhẹ, nhanh, không nhấn mạnh.",
    mouth: "neutral",
    soundText: "/ə/",
    words: [
      ["teacher", "/ˈtiːtʃər/", "giáo viên", "👩‍🏫", "er"],
      ["banana", "/bəˈnænə/", "quả chuối", "🍌", ["a", "a"]],
      ["about", "/əˈbaʊt/", "về", "💬", "a"],
      ["sofa", "/ˈsoʊfə/", "ghế sofa", "🛋️", "a"],
    ],
  },
  {
    symbol: "/ʌ/",
    sectionKey: "uh",
    practiceKey: "uh",
    title: "Âm /ʌ/",
    label: "Âm ngắn rõ",
    guide: "Đọc gần giống “ă/â” tiếng Việt, âm ngắn và rõ.",
    mouth: "natural",
    soundText: "/ʌ/",
    words: [
      ["cup", "/kʌp/", "cái cốc", "🥤", "u"],
      ["sun", "/sʌn/", "mặt trời", "☀️", "u"],
      ["bus", "/bʌs/", "xe buýt", "🚌", "u"],
      ["up", "/ʌp/", "lên", "⬆️", "u"],
      ["mother", "/ˈmʌðər/", "mẹ", "👩", "o"],
    ],
  },
].map((group) => ({
  ...group,
  words: group.words.map(([word, ipa, meaning, icon, focus]) => ({ word, ipa, meaning, icon, focus })),
}));

const MINIMAL_PAIRS = [
  ["ship", "/ʃɪp/", "tàu thủy", "i", "sheep", "/ʃiːp/", "con cừu", "ee"],
  ["sit", "/sɪt/", "ngồi", "i", "seat", "/siːt/", "ghế", "ea"],
  ["fit", "/fɪt/", "phù hợp", "i", "feet", "/fiːt/", "bàn chân", "ee"],
  ["bed", "/bed/", "cái giường", "e", "bad", "/bæd/", "xấu / tệ", "a"],
  ["pen", "/pen/", "cây bút", "e", "pan", "/pæn/", "cái chảo", "a"],
  ["cup", "/kʌp/", "cái cốc", "u", "cap", "/kæp/", "mũ lưỡi trai", "a"],
].map(([left, leftIpa, leftMeaning, leftFocus, right, rightIpa, rightMeaning, rightFocus]) => ({
  left, leftIpa, leftMeaning, leftFocus, right, rightIpa, rightMeaning, rightFocus,
}));

function createComparisonSlide(leftSound, rightSound, rows) {
  return {
    leftSound,
    rightSound,
    pairs: rows.map(([leftWord, leftIpa, leftMeaning, leftHighlight, leftIcon,
      rightWord, rightIpa, rightMeaning, rightHighlight, rightIcon]) => ({
      left: {
        word: leftWord, ipa: leftIpa, meaning: leftMeaning, highlight: leftHighlight, sound: leftSound, icon: leftIcon,
      },
      right: {
        word: rightWord, ipa: rightIpa, meaning: rightMeaning, highlight: rightHighlight, sound: rightSound, icon: rightIcon,
      },
    })),
  };
}

const COMPARISON_SLIDES = {
  vowel2_compare_i: createComparisonSlide("/ɪ/", "/iː/", [
    ["ship", "/ʃɪp/", "tàu thủy", "i", "🚢", "sheep", "/ʃiːp/", "con cừu", "ee", "🐑"],
    ["sit", "/sɪt/", "ngồi", "i", "🪑", "seat", "/siːt/", "ghế", "ea", "💺"],
    ["fit", "/fɪt/", "phù hợp", "i", "✅", "feet", "/fiːt/", "bàn chân", "ee", "🦶"],
    ["bit", "/bɪt/", "một chút", "i", "🤏", "beat", "/biːt/", "đánh/nhịp", "ea", "🥁"],
    ["live", "/lɪv/", "sống", "i", "🏠", "leave", "/liːv/", "rời đi", "ea", "🚪"],
  ]),
  vowel2_compare_e_ae: createComparisonSlide("/e/", "/æ/", [
    ["bed", "/bed/", "cái giường", "e", "🛏️", "bad", "/bæd/", "xấu/tệ", "a", "👎"],
    ["pen", "/pen/", "cây bút", "e", "🖊️", "pan", "/pæn/", "cái chảo", "a", "🍳"],
    ["men", "/men/", "những người đàn ông", "e", "👨‍👨‍👦", "man", "/mæn/", "người đàn ông", "a", "👨"],
    ["ten", "/ten/", "số 10", "e", "🔟", "tan", "/tæn/", "màu rám nắng", "a", "🌞"],
    ["pet", "/pet/", "thú cưng", "e", "🐶", "pat", "/pæt/", "vỗ nhẹ", "a", "👋"],
  ]),
  vowel2_compare_schwa_caret: createComparisonSlide("/ə/", "/ʌ/", [
    ["about", "/əˈbaʊt/", "về", "a", "💬", "cup", "/kʌp/", "cái cốc", "u", "🥤"],
    ["sofa", "/ˈsoʊfə/", "ghế sofa", "a", "🛋️", "sun", "/sʌn/", "mặt trời", "u", "☀️"],
    ["banana", "/bəˈnænə/", "quả chuối", "a", "🍌", "bus", "/bʌs/", "xe buýt", "u", "🚌"],
    ["teacher", "/ˈtiːtʃər/", "giáo viên", "er", "👩‍🏫", "mother", "/ˈmʌðər/", "mẹ", "o", "👩"],
    ["away", "/əˈweɪ/", "đi xa", "a", "➡️", "up", "/ʌp/", "lên", "u", "⬆️"],
  ]),
};

const SENTENCES = [
  ["I see a sheep.", ["see", "sheep"]],
  ["Sit on the seat.", ["Sit", "seat"]],
  ["The fish is in the milk.", ["fish", "milk"]],
  ["Ten red pens.", ["Ten", "red", "pens"]],
  ["The cat has a bag.", ["cat", "bag"]],
  ["The cup is up.", ["cup", "up"]],
  ["My teacher has a banana.", ["teacher", "banana"]],
  ["The sun is up.", ["sun", "up"]],
].map(([text, focusWords]) => ({ text, focusWords }));

const CONFUSING_SENTENCES = [
  ["I see a sheep.", ["see", "sheep"], [
    ["see", "/siː/", "dễ nhầm với sit /sɪt/"],
    ["sheep", "/ʃiːp/", "dễ nhầm với ship /ʃɪp/"],
  ]],
  ["Sit on the seat.", ["Sit", "seat"], [
    ["sit", "/sɪt/", "dễ nhầm với seat /siːt/"],
  ]],
  ["The ship is big.", ["ship"], [
    ["ship", "/ʃɪp/", "dễ nhầm với sheep /ʃiːp/"],
  ]],
  ["My feet fit.", ["feet", "fit"], [
    ["feet", "/fiːt/", "dễ nhầm với fit /fɪt/"],
  ]],
  ["The bed is bad.", ["bed", "bad"], [
    ["bed", "/bed/", "dễ nhầm với bad /bæd/"],
  ]],
  ["I have a red bag.", ["red", "bag"], [
    ["red", "/red/", "là âm /e/"],
    ["bag", "/bæg/", "là âm /æ/"],
  ]],
  ["The pen is in the bag.", ["pen", "bag"], [
    ["pen", "/pen/", "dễ nhầm với pan /pæn/"],
    ["bag", "/bæg/", "có âm /æ/"],
  ]],
  ["The cat is on the bed.", ["cat", "bed"], [
    ["cat", "/kæt/", "là âm /æ/"],
    ["bed", "/bed/", "là âm /e/"],
  ]],
  ["My teacher has a cup.", ["teacher", "cup"], [
    ["teacher", "/ˈtiːtʃər/", "có âm /ə/"],
    ["cup", "/kʌp/", "có âm /ʌ/"],
  ]],
  ["The banana is on the sofa.", ["banana", "sofa"], [
    ["banana", "/bəˈnænə/", "có âm /ə/"],
    ["sofa", "/ˈsoʊfə/", "có âm /ə/"],
  ]],
  ["The sun is up.", ["sun", "up"], [
    ["sun", "/sʌn/", "có âm /ʌ/"],
    ["up", "/ʌp/", "có âm /ʌ/"],
  ]],
  ["I think about my mother.", ["about", "mother"], [
    ["about", "/əˈbaʊt/", "có âm /ə/"],
    ["mother", "/ˈmʌðər/", "có âm /ʌ/ và /ə/"],
  ]],
].map(([sentence, highlightWords, trap], id) => ({
  id,
  sentence,
  highlightWords,
  audioText: sentence,
  trap: trap.map(([word, ipa, confusion]) => ({ word, ipa, confusion })),
}));

const ADVANCED_TRAP_SENTENCES = [
  ["Please sit in the green seat.", ["sit", "green", "seat"], [["sit", "/sɪt/"], ["green", "/griːn/"], ["seat", "/siːt/"]]],
  ["Six little fish swim in the deep sea.", ["Six", "fish", "deep", "sea"], [["six", "/sɪks/"], ["fish", "/fɪʃ/"], ["deep", "/diːp/"], ["sea", "/siː/"]]],
  ["This sheep is very thin.", ["sheep", "thin"], [["sheep", "/ʃiːp/"], ["thin", "/θɪn/"]]],
  ["Tim needs a ticket.", ["Tim", "needs", "ticket"], [["Tim", "/tɪm/"], ["needs", "/niːdz/"], ["ticket", "/ˈtɪkɪt/"]]],
  ["The little ship is near the sea.", ["little", "ship", "sea"], [["little", "/ˈlɪtəl/"], ["ship", "/ʃɪp/"], ["sea", "/siː/"]]],
  ["Three green leaves are in the bin.", ["Three", "green", "leaves", "bin"], [["three", "/θriː/"], ["green", "/griːn/"], ["leaves", "/liːvz/"], ["bin", "/bɪn/"]]],
  ["The black cat sat on Ben’s bed.", ["black", "cat", "sat", "Ben’s", "bed"], [["black", "/blæk/"], ["cat", "/kæt/"], ["sat", "/sæt/"], ["Ben", "/ben/"], ["bed", "/bed/"]]],
  ["Dad has a red pen in his bag.", ["Dad", "has", "red", "pen", "bag"], [["Dad", "/dæd/"], ["has", "/hæz/"], ["red", "/red/"], ["pen", "/pen/"], ["bag", "/bæg/"]]],
  ["The man with the cap is at the desk.", ["man", "cap", "at", "desk"], [["man", "/mæn/"], ["cap", "/kæp/"], ["at", "/æt/"], ["desk", "/desk/"]]],
  ["Ten apples are in the bag.", ["Ten", "apples", "bag"], [["ten", "/ten/"], ["apples", "/ˈæpəlz/"], ["bag", "/bæg/"]]],
  ["The egg is in the black pan.", ["egg", "black", "pan"], [["egg", "/eg/"], ["black", "/blæk/"], ["pan", "/pæn/"]]],
  ["Meg has a map and a red bag.", ["Meg", "map", "red", "bag"], [["Meg", "/meg/"], ["red", "/red/"], ["map", "/mæp/"], ["bag", "/bæg/"]]],
  ["My mother is on the bus at sunset.", ["mother", "bus", "sunset"], [["mother", "/ˈmʌðər/"], ["bus", "/bʌs/"], ["sunset", "/ˈsʌnset/"]]],
  ["The teacher is about to sit on the sofa.", ["teacher", "about", "sofa"], [["teacher", "/ˈtiːtʃər/"], ["about", "/əˈbaʊt/"], ["sofa", "/ˈsoʊfə/"]]],
  ["A cup is under the yellow umbrella.", ["cup", "under", "umbrella"], [["cup", "/kʌp/"], ["under", "/ˈʌndər/"], ["umbrella", "/ʌmˈbrelə/"]]],
  ["We had lunch under the umbrella.", ["lunch", "under", "umbrella"], [["lunch", "/lʌntʃ/"], ["under", "/ˈʌndər/"], ["umbrella", "/ʌmˈbrelə/"]]],
  ["A banana and a cup are on the sofa.", ["banana", "cup", "sofa"], [["banana", "/bəˈnænə/"], ["cup", "/kʌp/"], ["sofa", "/ˈsoʊfə/"]]],
  ["The puppy runs under the bed.", ["puppy", "runs", "under", "bed"], [["puppy", "/ˈpʌpi/"], ["runs", "/rʌnz/"], ["under", "/ˈʌndər/"], ["bed", "/bed/"]]],
].map(([sentence, highlightWords, trap], id) => ({
  id,
  sentence,
  highlightWords,
  audioText: sentence,
  trap: trap.map(([word, ipa]) => ({ word, ipa, confusion: "Âm cần chú ý" })),
}));

const LISTEN_GAME = [
  {
    id: "sheep-i-long",
    word: "sheep",
    audioText: "sheep",
    correctSound: "/iː/",
    explanation: "sheep có âm dài /iː/."
  },
  {
    id: "ship-i-short",
    word: "ship",
    audioText: "ship",
    correctSound: "/ɪ/",
    explanation: "ship có âm ngắn /ɪ/."
  },
  {
    id: "bed-e",
    word: "bed",
    audioText: "bed",
    correctSound: "/e/",
    explanation: "bed có âm /e/."
  },
  {
    id: "bad-ae",
    word: "bad",
    audioText: "bad",
    correctSound: "/æ/",
    explanation: "bad có âm /æ/."
  },
  {
    id: "sofa-schwa",
    word: "sofa",
    audioText: "sofa",
    correctSound: "/ə/",
    explanation: "sofa có âm /ə/ ở cuối."
  },
  {
    id: "cup-uh",
    word: "cup",
    audioText: "cup",
    correctSound: "/ʌ/",
    explanation: "cup có âm /ʌ/."
  },
  {
    id: "seat-i-long",
    word: "seat",
    audioText: "seat",
    correctSound: "/iː/",
    explanation: "seat có âm dài /iː/."
  },
  {
    id: "sit-i-short",
    word: "sit",
    audioText: "sit",
    correctSound: "/ɪ/",
    explanation: "sit có âm ngắn /ɪ/."
  },
  {
    id: "pen-e",
    word: "pen",
    audioText: "pen",
    correctSound: "/e/",
    explanation: "pen có âm /e/."
  },
  {
    id: "pan-ae",
    word: "pan",
    audioText: "pan",
    correctSound: "/æ/",
    explanation: "pan có âm /æ/."
  }
];

export const lesson02SpellingLetterSounds = {
  id: 2,
  lessonNumber: 2,
  dayNumber: 2,
  unit: "ABC & IPA Foundation",
  module: "ipa-bootcamp",
  track: "single-vowels-1",
  title: "Buổi 2: Nguyên âm đơn 1",
  titleEn: "Monophthongs 1",
  titleVi: "Nguyên âm đơn 1",
  subtitle: "Phân biệt 6 nguyên âm đơn thường gặp",
  mainTopic: "Nguyên âm đơn /iː/ /ɪ/ /e/ /æ/ /ə/ /ʌ/",
  topicEnglish: "Monophthongs 1 – Nguyên âm đơn 1",
  topicVietnamese: "Phân biệt 6 nguyên âm đơn thường gặp",
  slug: "nguyen-am-don-1",
  curriculumStatus: "ready",
  status: { content: "ready", code: "single-vowels-1", import: "manual" },
  sectionFlow: SECTION_FLOW,
  sectionLabels: {
    vowel2_overview: "Tổng quan âm hôm nay",
    vowel2_long_i: "Âm dài /iː/",
    vowel2_short_i: "Âm ngắn /ɪ/",
    vowel2_compare_i: "So sánh /ɪ/ và /iː/",
    vowel2_sound_e: "Âm /e/",
    vowel2_sound_ae: "Âm /æ/",
    vowel2_compare_e_ae: "So sánh /e/ và /æ/",
    vowel2_sound_schwa: "Âm /ə/",
    vowel2_sound_uh: "Âm /ʌ/",
    vowel2_compare_schwa_caret: "So sánh /ə/ và /ʌ/",
    vowel2_word_practice: "Câu dễ đọc sai",
    vowel2_pairs_sentences: "Câu bẫy nâng cao",
    vowel2_game_record_test: "Game + Ghi âm AI + Mini test",
    vowel2_homework: "Bài tập về nhà",
    vowel2_summary: "Tổng kết buổi học",
  },
  objectives: [
    "Nhận biết 6 âm /iː/ /ɪ/ /e/ /æ/ /ə/ /ʌ/.",
    "Phân biệt âm ngắn, âm dài và các cặp dễ nhầm.",
    "Đọc từ, câu ngắn và luyện ghi âm.",
  ],
  vowelLesson: {
    sounds: ["/iː/", "/ɪ/", "/e/", "/æ/", "/ə/", "/ʌ/"],
    wordGroups: WORD_GROUPS,
    minimalPairs: MINIMAL_PAIRS,
    comparisons: COMPARISON_SLIDES,
    confusingSentences: CONFUSING_SENTENCES,
    advancedTrapSentences: ADVANCED_TRAP_SENTENCES,
    sentences: SENTENCES,
    listenGame: LISTEN_GAME,
    recordingWords: [
      { word: "sheep", ipa: "/ʃiːp/", meaning: "con cừu", focus: "/iː/" },
      { word: "ship", ipa: "/ʃɪp/", meaning: "tàu thủy", focus: "/ɪ/" },
      { word: "seat", ipa: "/siːt/", meaning: "ghế", focus: "/iː/" },
      { word: "sit", ipa: "/sɪt/", meaning: "ngồi", focus: "/ɪ/" },
      { word: "feet", ipa: "/fiːt/", meaning: "bàn chân", focus: "/iː/" },
      { word: "fit", ipa: "/fɪt/", meaning: "phù hợp", focus: "/ɪ/" },
      { word: "bed", ipa: "/bed/", meaning: "cái giường", focus: "/e/" },
      { word: "bad", ipa: "/bæd/", meaning: "xấu/tệ", focus: "/æ/" },
      { word: "pen", ipa: "/pen/", meaning: "cây bút", focus: "/e/" },
      { word: "pan", ipa: "/pæn/", meaning: "cái chảo", focus: "/æ/" },
      { word: "cup", ipa: "/kʌp/", meaning: "cái cốc", focus: "/ʌ/" },
      { word: "sofa", ipa: "/ˈsoʊfə/", meaning: "ghế sofa", focus: "/ə/" },
    ],
  },
  vocabulary: WORD_GROUPS.flatMap((group) => group.words.map((item) => ({
    en: item.word, vi: item.meaning, ipa: item.ipa, img: item.icon, group: group.symbol,
  }))),
  vocabGroups: Object.fromEntries(WORD_GROUPS.map((group) => [group.symbol, group.symbol])),
  minitest: [
    { q: "Chọn từ có âm /iː/", options: ["sheep", "ship"], answer: 0, explanation: "sheep có âm dài /iː/, ship có âm ngắn /ɪ/.", allowShortOptions: true },
    { q: "Chọn từ có âm /ɪ/", options: ["sit", "seat"], answer: 0, explanation: "sit có âm /ɪ/, seat có âm /iː/.", allowShortOptions: true },
    { q: "Chọn từ có âm /e/", options: ["bed", "bad"], answer: 0, explanation: "bed có âm /e/, bad có âm /æ/.", allowShortOptions: true },
    { q: "Chọn từ có âm /æ/", options: ["pen", "pan"], answer: 1, explanation: "pan có âm /æ/, pen có âm /e/.", allowShortOptions: true },
    { q: "Chọn từ có âm /ʌ/", options: ["cup", "cap"], answer: 0, explanation: "cup có âm /ʌ/, cap có âm /æ/.", allowShortOptions: true },
    { q: "Ghép âm /iː/ với từ đúng", options: ["sheep", "ship", "sit"], answer: 0, explanation: "sheep chứa âm dài /iː/.", allowShortOptions: true },
    { q: "Ghép âm /ɪ/ với từ đúng", options: ["fish", "feet", "see"], answer: 0, explanation: "fish chứa âm ngắn /ɪ/.", allowShortOptions: true },
    { q: "Ghép âm /ə/ với từ đúng", options: ["sofa", "sun", "cup"], answer: 0, explanation: "sofa có âm /ə/ ở cuối.", allowShortOptions: true },
    { q: "Nghe từ, chọn IPA đúng", options: ["/fiːt/", "/fɪt/"], answer: 0, audio: "feet", explanation: "feet có âm dài /iː/.", allowShortOptions: true },
    { q: "Nghe từ, chọn IPA đúng", options: ["/fiːt/", "/fɪt/"], answer: 1, audio: "fit", explanation: "fit có âm ngắn /ɪ/.", allowShortOptions: true },
  ],
  homework: [
    "Đọc lại 6 nhóm nguyên âm đơn.",
    "Ghi âm 12 minimal-pair words để giáo viên sửa.",
  ],
  metadata: {
    contentImported: true,
    localContentAuthoritative: true,
    sourceLessonIds: [],
    status: { content: "ready", code: "single-vowels-1", import: "manual" },
  },
};
