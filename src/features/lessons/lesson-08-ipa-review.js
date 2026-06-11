export const lesson08IpaReview = {
  id: 8,
  lessonNumber: 8,
  dayNumber: 8,
  title: "Tổng ôn toàn bộ IPA",
  titleEn: "Tổng ôn toàn bộ IPA",
  titleVi: "Tổng ôn toàn bộ IPA",
  subtitle: "Tổng ôn ABC, spelling, IPA, âm cuối và trọng âm cơ bản",
  cefrLevel: "A0-A1",
  unit: "ABC & IPA Foundation",
  module: "ABC & IPA Foundation",
  track: "ipa-review",
  slug: "ipa-review-word-stress-tong-on",
  mainTopic: "Tổng ôn toàn bộ IPA",
  estimatedMinutes: 90,
  lessonType: "abc-ipa-foundation",
  status: "ready",
  sectionFlow: [
    "review8_alphabet",
    "review8_spelling",
    "review8_short_vowels",
    "review8_long_vowels",
    "review8_diphthongs",
    "review8_consonants",
    "review8_final_sounds",
    "review8_schwa",
    "review8_syllable",
    "review8_word_stress",
    "review8_read_50_words",
    "review8_read_20_sentences",
    "review8_listen_choose",
    "review8_ipa_to_word",
    "review8_recording",
    "review8_mini_test",
    "review8_mindmap",
    "review8_homework"
  ],
  architecture: {
    preserveSectionFlow: true,
    source: "Buổi 8 MD: Tổng ôn toàn bộ IPA",
    sourceOfTruth: "Buổi 8 MD"
  },
  metadata: {
    contentImported: true,
    importedFromMd: true,
    hasTodoVideo: false,
    localContentAuthoritative: true,
    sourceLessonIds: [],
    status: {
      content: "ready",
      code: "ipa-review",
      import: "manual"
    }
  },
  objectives: [
    "Ôn lại 26 chữ cái tiếng Anh và cách spell tên, spell từ.",
    "Ôn lại letter name và letter sound.",
    "Ôn lại nguyên âm ngắn /ɪ/ /e/ /æ/ /ʌ/ /ɒ/ /ʊ/.",
    "Ôn lại nguyên âm dài /iː/ /uː/ /ɑː/ /ɔː/ /ɜː/.",
    "Ôn lại 8 nguyên âm đôi /eɪ/ /aɪ/ /ɔɪ/ /aʊ/ /əʊ/ /ɪə/ /eə/ /ʊə/.",
    "Ôn lại phụ âm bật, âm mũi, âm gió và âm khó.",
    "Hiểu âm cuối quan trọng và không nuốt âm cuối.",
    "Hiểu schwa /ə/ là âm yếu, nhẹ, hay gặp trong tiếng Anh.",
    "Hiểu syllable là âm tiết và đếm âm tiết bằng vỗ tay.",
    "Hiểu word stress – âm tiết được đọc rõ hơn trong từ.",
    "Đọc 50 từ tổng hợp và 20 câu ngắn.",
    "Hoàn thành final mini test cuối module."
  ],
  // Alphabet review data
  alphabet: {
    letters: "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z",
    trickLetters: [
      { letter: "G", ipa: "/dʒiː/", mistake: "nhầm với J" },
      { letter: "J", ipa: "/dʒeɪ/", mistake: "nhầm với G" },
      { letter: "H", ipa: "/eɪtʃ/", mistake: "đọc kiểu \"hờ\"" },
      { letter: "W", ipa: "/ˈdʌbəl juː/", mistake: "đọc thiếu \"double u\"" },
      { letter: "Z", ipa: "/zed/ hoặc /ziː/", mistake: "không biết có 2 cách đọc" }
    ],
    quiz: [
      {
        q: "Chữ G đọc là:",
        options: ["/dʒiː/", "/dʒeɪ/", "/keɪ/"],
        answer: 0
      },
      {
        q: "Chữ W đọc là:",
        options: ["/viː/", "/ˈdʌbəl juː/", "/waɪ/"],
        answer: 1
      },
      {
        q: "Chữ H đọc là:",
        options: ["/hiː/", "/eɪtʃ/", "/hɑː/"],
        answer: 1
      }
    ]
  },
  // Spelling review data
  spelling: {
    spellWords: [
      { word: "cat", spelling: "C-A-T", meaning: "con mèo" },
      { word: "dog", spelling: "D-O-G", meaning: "con chó" },
      { word: "pen", spelling: "P-E-N", meaning: "cây bút" },
      { word: "book", spelling: "B-O-O-K", meaning: "quyển sách" },
      { word: "cup", spelling: "C-U-P", meaning: "cái cốc" },
      { word: "bag", spelling: "B-A-G", meaning: "cái túi" }
    ],
    phrases: [
      "How do you spell your name?",
      "How do you spell \"cat\"?"
    ],
    examples: [
      { name: "Lan", spelling: "L-A-N" },
      { name: "Minh", spelling: "M-I-N-H" }
    ]
  },
  // Short vowels
  shortVowels: [
    { symbol: "/ɪ/", name: "i ngắn", word: "sit", ipa: "/sɪt/", mistake: "/ɪ/ không đọc dài thành /iː/" },
    { symbol: "/e/", name: "e ngắn", word: "pen", ipa: "/pen/", mistake: "/e/ không mở quá thành /æ/" },
    { symbol: "/æ/", name: "a há rộng", word: "cat", ipa: "/kæt/", mistake: "/æ/ cần mở miệng rộng hơn /e/" },
    { symbol: "/ʌ/", name: "â ngắn", word: "cup", ipa: "/kʌp/", mistake: "/ʌ/ không tròn môi" },
    { symbol: "/ɒ/", name: "o ngắn", word: "dog", ipa: "/dɒg/", mistake: "/ɒ/ hơi tròn môi" },
    { symbol: "/ʊ/", name: "u ngắn", word: "book", ipa: "/bʊk/", mistake: "/ʊ/ không kéo dài thành /uː/" }
  ],
  // Long vowels
  longVowels: [
    { symbol: "/iː/", name: "i dài", word: "see", ipa: "/siː/", shortPair: "/ɪ/", shortWord: "sit" },
    { symbol: "/uː/", name: "u dài", word: "food", ipa: "/fuːd/", shortPair: "/ʊ/", shortWord: "full" },
    { symbol: "/ɑː/", name: "a dài", word: "car", ipa: "/kɑː/", shortPair: null, shortWord: null },
    { symbol: "/ɔː/", name: "o dài", word: "door", ipa: "/dɔː/", shortPair: "/ɒ/", shortWord: "cot" },
    { symbol: "/ɜː/", name: "ơ dài", word: "bird", ipa: "/bɜːd/", shortPair: null, shortWord: null }
  ],
  // Diphthongs
  diphthongs: [
    { symbol: "/eɪ/", name: "ây", word: "say", slide: "/e/ → /ɪ/" },
    { symbol: "/aɪ/", name: "ai", word: "time", slide: "/a/ → /ɪ/" },
    { symbol: "/ɔɪ/", name: "oi", word: "boy", slide: "/ɔ/ → /ɪ/" },
    { symbol: "/aʊ/", name: "ao", word: "house", slide: "/a/ → /ʊ/" },
    { symbol: "/əʊ/", name: "âu/êu", word: "go", slide: "/ə/ → /ʊ/" },
    { symbol: "/ɪə/", name: "ia", word: "ear", slide: "/ɪ/ → /ə/" },
    { symbol: "/eə/", name: "eơ", word: "hair", slide: "/e/ → /ə/" },
    { symbol: "/ʊə/", name: "ua", word: "tour", slide: "/ʊ/ → /ə/" }
  ],
  // Consonant groups
  consonants: {
    stops: ["/p/", "/b/", "/t/", "/d/", "/k/", "/g/"],
    nasals: ["/m/", "/n/", "/ŋ/"],
    fricatives: ["/f/", "/v/", "/θ/", "/ð/", "/s/", "/z/", "/ʃ/", "/ʒ/", "/tʃ/", "/dʒ/", "/l/", "/r/", "/w/", "/j/", "/h/"],
    pairs: [
      { a: "/p/", b: "/b/", note: "/b/ có rung giọng" },
      { a: "/t/", b: "/d/", note: "/d/ có rung giọng" },
      { a: "/k/", b: "/g/", note: "/g/ có rung giọng" },
      { a: "/f/", b: "/v/", note: "/v/ có rung giọng" },
      { a: "/s/", b: "/z/", note: "/z/ có rung giọng" },
      { a: "/θ/", b: "/ð/", note: "lưỡi giữa hai răng" },
      { a: "/ʃ/", b: "/ʒ/", note: "môi hơi tròn, âm sh/zh" },
      { a: "/tʃ/", b: "/dʒ/", note: "ch/j" },
      { a: "/l/", b: "/r/", note: "lưỡi khác nhau" },
      { a: "/w/", b: "/j/", note: "w tròn môi, j giống y nhẹ" }
    ]
  },
  // Final sounds
  finalSounds: [
    { word: "cap", ipa: "/kæp/", final: "/p/" },
    { word: "cat", ipa: "/kæt/", final: "/t/" },
    { word: "cab", ipa: "/kæb/", final: "/b/" },
    { word: "back", ipa: "/bæk/", final: "/k/" },
    { word: "bag", ipa: "/bæg/", final: "/g/" },
    { word: "sing", ipa: "/sɪŋ/", final: "/ŋ/" }
  ],
  // Schwa
  schwa: {
    symbol: "/ə/",
    description: "Âm yếu, nhẹ, thường xuất hiện trong âm tiết không nhấn.",
    examples: [
      { word: "teacher", ipa: "/ˈtiːtʃə/", note: "âm cuối /ə/" },
      { word: "about", ipa: "/əˈbaʊt/", note: "âm đầu /ə/" },
      { word: "banana", ipa: "/bəˈnɑːnə/", note: "âm đầu và âm cuối /ə/" },
      { word: "computer", ipa: "/kəmˈpjuːtə/", note: "âm đầu và âm cuối /ə/" }
    ]
  },
  // Syllable
  syllable: {
    description: "Syllable nghĩa là âm tiết. Mỗi từ có thể có 1, 2, 3 hoặc nhiều âm tiết.",
    examples: [
      { word: "cat", syllableCount: 1, split: "cat" },
      { word: "teacher", syllableCount: 2, split: "tea-cher" },
      { word: "banana", syllableCount: 3, split: "ba-na-na" },
      { word: "student", syllableCount: 2, split: "stu-dent" },
      { word: "family", syllableCount: 3, split: "fa-mi-ly" },
      { word: "computer", syllableCount: 3, split: "com-pu-ter" }
    ]
  },
  // Word stress
  wordStress: {
    description: "Word stress = âm tiết được đọc rõ hơn trong từ.",
    ipaNote: "Dấu ˈ đứng trước âm tiết được nhấn.",
    examples: [
      {
        word: "teacher",
        ipa: "/ˈtiːtʃə/",
        syllables: ["TEA", "cher"],
        stressIndex: 0,
        meaning: "giáo viên",
        note: "Trọng âm ở âm tiết 1. Âm cuối /ə/ đọc nhẹ.",
        audioSlot: "AUDIO_WORD_TEACHER"
      },
      {
        word: "banana",
        ipa: "/bəˈnɑːnə/",
        syllables: ["ba", "NA", "na"],
        stressIndex: 1,
        meaning: "quả chuối",
        note: "Trọng âm ở âm tiết 2. Có schwa /ə/ ở âm tiết yếu.",
        audioSlot: "AUDIO_WORD_BANANA"
      },
      {
        word: "about",
        ipa: "/əˈbaʊt/",
        syllables: ["a", "BOUT"],
        stressIndex: 1,
        meaning: "về, khoảng",
        note: "Trọng âm ở âm tiết 2. Âm đầu /ə/ đọc nhẹ.",
        audioSlot: "AUDIO_WORD_ABOUT"
      },
      {
        word: "student",
        ipa: "/ˈstjuːdənt/",
        syllables: ["STU", "dent"],
        stressIndex: 0,
        meaning: "học sinh",
        note: "Trọng âm ở âm tiết 1.",
        audioSlot: "AUDIO_WORD_STUDENT"
      },
      {
        word: "family",
        ipa: "/ˈfæməli/",
        syllables: ["FA", "mi", "ly"],
        stressIndex: 0,
        meaning: "gia đình",
        note: "Trọng âm ở âm tiết 1.",
        audioSlot: "AUDIO_WORD_FAMILY"
      },
      {
        word: "computer",
        ipa: "/kəmˈpjuːtə/",
        syllables: ["com", "PU", "ter"],
        stressIndex: 1,
        meaning: "máy tính",
        note: "Trọng âm ở âm tiết 2. Có schwa /ə/ ở âm tiết yếu.",
        audioSlot: "AUDIO_WORD_COMPUTER"
      }
    ]
  },
  // 50 practice words grouped
  practiceWords: {
    group1: {
      label: "Nhóm 1: Alphabet & spelling words",
      words: [
        { word: "cat", ipa: "/kæt/" },
        { word: "dog", ipa: "/dɒg/" },
        { word: "pen", ipa: "/pen/" },
        { word: "book", ipa: "/bʊk/" },
        { word: "cup", ipa: "/kʌp/" },
        { word: "bag", ipa: "/bæg/" },
        { word: "bed", ipa: "/bed/" },
        { word: "bus", ipa: "/bʌs/" }
      ]
    },
    group2: {
      label: "Nhóm 2: Short vowels",
      words: [
        { word: "sit", ipa: "/sɪt/" },
        { word: "big", ipa: "/bɪg/" },
        { word: "fish", ipa: "/fɪʃ/" },
        { word: "pen", ipa: "/pen/" },
        { word: "red", ipa: "/red/" },
        { word: "cat", ipa: "/kæt/" },
        { word: "hat", ipa: "/hæt/" },
        { word: "cup", ipa: "/kʌp/" },
        { word: "sun", ipa: "/sʌn/" },
        { word: "dog", ipa: "/dɒg/" },
        { word: "box", ipa: "/bɒks/" },
        { word: "book", ipa: "/bʊk/" },
        { word: "look", ipa: "/lʊk/" },
        { word: "good", ipa: "/gʊd/" }
      ]
    },
    group3: {
      label: "Nhóm 3: Long vowels",
      words: [
        { word: "see", ipa: "/siː/" },
        { word: "green", ipa: "/griːn/" },
        { word: "teacher", ipa: "/ˈtiːtʃə/" },
        { word: "food", ipa: "/fuːd/" },
        { word: "moon", ipa: "/muːn/" },
        { word: "school", ipa: "/skuːl/" },
        { word: "car", ipa: "/kɑː/" },
        { word: "park", ipa: "/pɑːk/" },
        { word: "door", ipa: "/dɔː/" },
        { word: "four", ipa: "/fɔː/" },
        { word: "bird", ipa: "/bɜːd/" },
        { word: "girl", ipa: "/gɜːl/" },
        { word: "nurse", ipa: "/nɜːs/" }
      ]
    },
    group4: {
      label: "Nhóm 4: Diphthongs",
      words: [
        { word: "say", ipa: "/seɪ/" },
        { word: "day", ipa: "/deɪ/" },
        { word: "time", ipa: "/taɪm/" },
        { word: "five", ipa: "/faɪv/" },
        { word: "boy", ipa: "/bɔɪ/" },
        { word: "toy", ipa: "/tɔɪ/" },
        { word: "house", ipa: "/haʊs/" },
        { word: "now", ipa: "/naʊ/" },
        { word: "go", ipa: "/gəʊ/" },
        { word: "home", ipa: "/həʊm/" },
        { word: "ear", ipa: "/ɪə/" },
        { word: "hair", ipa: "/heə/" },
        { word: "tour", ipa: "/tʊə/" }
      ]
    },
    group5: {
      label: "Nhóm 5: Consonants & final sounds",
      words: [
        { word: "cap", ipa: "/kæp/" },
        { word: "cat", ipa: "/kæt/" },
        { word: "cab", ipa: "/kæb/" },
        { word: "back", ipa: "/bæk/" },
        { word: "bag", ipa: "/bæg/" },
        { word: "sing", ipa: "/sɪŋ/" },
        { word: "king", ipa: "/kɪŋ/" },
        { word: "man", ipa: "/mæn/" },
        { word: "no", ipa: "/nəʊ/" },
        { word: "red", ipa: "/red/" }
      ]
    }
  },
  // 20 sentences
  practiceSentences: [
    { sentence: "I sit.", focus: "sit", focusIpa: "/sɪt/", finalSound: "/t/" },
    { sentence: "This is a pen.", focus: "pen", focusIpa: "/pen/", finalSound: "/n/" },
    { sentence: "This is a cat.", focus: "cat", focusIpa: "/kæt/", finalSound: "/t/" },
    { sentence: "This is a cup.", focus: "cup", focusIpa: "/kʌp/", finalSound: "/p/" },
    { sentence: "This is a dog.", focus: "dog", focusIpa: "/dɒg/", finalSound: "/g/" },
    { sentence: "This is a book.", focus: "book", focusIpa: "/bʊk/", finalSound: "/k/" },
    { sentence: "I see.", focus: "see", focusIpa: "/siː/", finalSound: null },
    { sentence: "I like food.", focus: "food", focusIpa: "/fuːd/", finalSound: "/d/" },
    { sentence: "This is a car.", focus: "car", focusIpa: "/kɑː/", finalSound: null },
    { sentence: "This is a door.", focus: "door", focusIpa: "/dɔː/", finalSound: null },
    { sentence: "This is a bird.", focus: "bird", focusIpa: "/bɜːd/", finalSound: "/d/" },
    { sentence: "I say hello.", focus: "say", focusIpa: "/seɪ/", finalSound: null },
    { sentence: "It is time.", focus: "time", focusIpa: "/taɪm/", finalSound: "/m/" },
    { sentence: "He is a boy.", focus: "boy", focusIpa: "/bɔɪ/", finalSound: null },
    { sentence: "This is my house.", focus: "house", focusIpa: "/haʊs/", finalSound: "/s/" },
    { sentence: "I go home.", focus: "go", focusIpa: "/gəʊ/", finalSound: null },
    { sentence: "This is my ear.", focus: "ear", focusIpa: "/ɪə/", finalSound: null },
    { sentence: "This is my hair.", focus: "hair", focusIpa: "/heə/", finalSound: null },
    { sentence: "I sing.", focus: "sing", focusIpa: "/sɪŋ/", finalSound: "/ŋ/" },
    { sentence: "No, thank you.", focus: "no", focusIpa: "/nəʊ/", finalSound: null }
  ],
  // Listen & choose quiz
  listenChooseGame: [
    {
      part: "Phần 1: Nghe chọn nguyên âm",
      questions: [
        { audioText: "sit", question: "Chọn âm chính của từ 'sit':", options: ["/ɪ/", "/iː/", "/e/"], answer: 0 },
        { audioText: "see", question: "Chọn âm chính của từ 'see':", options: ["/ɪ/", "/iː/", "/e/"], answer: 1 },
        { audioText: "cat", question: "Chọn âm chính của từ 'cat':", options: ["/e/", "/æ/", "/ʌ/"], answer: 1 },
        { audioText: "time", question: "Chọn âm chính của từ 'time':", options: ["/eɪ/", "/aɪ/", "/ɔɪ/"], answer: 1 }
      ]
    },
    {
      part: "Phần 2: Nghe chọn âm cuối",
      questions: [
        { audioText: "cap", question: "Âm cuối của từ 'cap' là:", options: ["/p/", "/t/", "/b/"], answer: 0 },
        { audioText: "cat", question: "Âm cuối của từ 'cat' là:", options: ["/p/", "/t/", "/b/"], answer: 1 },
        { audioText: "sing", question: "Âm cuối của từ 'sing' là:", options: ["/n/", "/ŋ/", "/g/"], answer: 1 }
      ]
    }
  ],
  // IPA to word quiz
  ipaToWordGame: [
    { ipa: "/kæt/", options: ["cat", "cut", "cot"], answer: 0 },
    { ipa: "/bʊk/", options: ["back", "book", "bike"], answer: 1 },
    { ipa: "/siː/", options: ["sit", "see", "say"], answer: 1 },
    { ipa: "/taɪm/", options: ["time", "team", "ten"], answer: 0 },
    { ipa: "/sɪŋ/", options: ["sin", "sing", "sit"], answer: 1 },
    { ipa: "/bəˈnɑːnə/", options: ["banana", "bird", "bag"], answer: 0 }
  ],
  // Final recording
  finalRecording: {
    words: ["cat", "book", "see", "food", "time", "house", "sing", "teacher", "banana", "computer"],
    sentences: [
      "This is a cat.",
      "I like food.",
      "It is time.",
      "This is my house.",
      "I can read English words."
    ],
    rubric: ["short_vowels", "long_vowels", "diphthongs", "final_sounds", "schwa", "word_stress"]
  },
  // Mini test (5 parts, 100 points total)
  minitest: [
    // Phần 1: Alphabet & spelling (15 pts)
    {
      q: "How do you spell \"cat\"?",
      options: ["C-A-T", "K-A-T", "C-E-T"],
      answer: 0,
      part: "Phần 1: Alphabet & spelling"
    },
    {
      q: "Chữ W đọc là:",
      options: ["/waɪ/", "/ˈdʌbəl juː/", "/viː/"],
      answer: 1,
      part: "Phần 1: Alphabet & spelling"
    },
    // Phần 2: IPA review (25 pts)
    {
      q: "/sɪt/ là từ nào?",
      options: ["sit", "seat", "set"],
      answer: 0,
      part: "Phần 2: IPA review"
    },
    {
      q: "/siː/ là từ nào?",
      options: ["sit", "see", "say"],
      answer: 1,
      part: "Phần 2: IPA review"
    },
    {
      q: "/seɪ/ là từ nào?",
      options: ["say", "see", "sit"],
      answer: 0,
      part: "Phần 2: IPA review"
    },
    {
      q: "/kæt/ là từ nào?",
      options: ["cat", "cut", "cot"],
      answer: 0,
      part: "Phần 2: IPA review"
    },
    {
      q: "/bɜːd/ là từ nào?",
      options: ["bird", "bed", "bad"],
      answer: 0,
      part: "Phần 2: IPA review"
    },
    // Phần 3: Final sounds (20 pts)
    {
      q: "Âm cuối của từ 'cap' là:",
      options: ["/p/", "/t/", "/b/"],
      answer: 0,
      audio: "cap",
      part: "Phần 3: Final sounds"
    },
    {
      q: "Âm cuối của từ 'cat' là:",
      options: ["/p/", "/t/", "/b/"],
      answer: 1,
      audio: "cat",
      part: "Phần 3: Final sounds"
    },
    {
      q: "Âm cuối của từ 'sing' là:",
      options: ["/n/", "/ŋ/", "/g/"],
      answer: 1,
      audio: "sing",
      part: "Phần 3: Final sounds"
    },
    // Phần 4: Schwa & word stress (20 pts)
    {
      q: "Âm /ə/ thường là âm như thế nào?",
      options: ["Âm mạnh", "Âm yếu, nhẹ", "Âm luôn kéo dài"],
      answer: 1,
      part: "Phần 4: Schwa & word stress"
    },
    {
      q: "Từ teacher nhấn âm nào?",
      options: ["TEA-cher", "tea-CHER"],
      answer: 0,
      part: "Phần 4: Schwa & word stress"
    },
    {
      q: "Từ banana nhấn âm nào?",
      options: ["BA-na-na", "ba-NA-na", "ba-na-NA"],
      answer: 1,
      part: "Phần 4: Schwa & word stress"
    }
  ],
  // Mindmap
  mindmap: {
    type: "structured",
    center: "Tổng ôn toàn bộ IPA",
    branches: [
      {
        label: "Alphabet",
        items: ["26 chữ cái", "chữ hoa/chữ thường", "G/J/H/W/Z dễ sai"]
      },
      {
        label: "Spelling",
        items: ["How do you spell...?", "spell tên", "spell từ đơn giản"]
      },
      {
        label: "Letter vs Sound",
        items: ["Letter = chữ nhìn thấy", "Sound = âm nghe thấy", "IPA = ký hiệu âm thanh"]
      },
      {
        label: "Vowels",
        items: [
          "Short: /ɪ/ /e/ /æ/ /ʌ/ /ɒ/ /ʊ/",
          "Long: /iː/ /uː/ /ɑː/ /ɔː/ /ɜː/",
          "Diphthongs: /eɪ/ /aɪ/ /ɔɪ/ /aʊ/ /əʊ/ /ɪə/ /eə/ /ʊə/"
        ]
      },
      {
        label: "Consonants",
        items: ["stop sounds", "nasal sounds", "fricatives", "difficult sounds", "final sounds"]
      },
      {
        label: "Schwa /ə/",
        items: ["âm yếu, nhẹ", "âm tiết không nhấn"]
      },
      {
        label: "Syllable",
        items: ["âm tiết", "vỗ tay đếm"]
      },
      {
        label: "Word stress",
        items: ["âm tiết đọc rõ hơn", "dấu ˈ trong IPA"]
      }
    ]
  },
  // Homework / post-module tasks
  homeworkRich: {
    title: "Bài tập sau module – Tổng ôn toàn bộ IPA",
    submit: "Nộp file ghi âm qua nhóm lớp Zalo.",
    deadline: "Trước buổi học tiếp theo",
    tasks: [
      {
        title: "Nhiệm vụ 1: Ôn 44 âm IPA cơ bản",
        badge: "Bắt buộc",
        desc: "Nghe lại bản đồ IPA và đọc theo mỗi âm 3 lần.",
        items: [
          "Short vowels: /ɪ/ /e/ /æ/ /ʌ/ /ɒ/ /ʊ/",
          "Long vowels: /iː/ /uː/ /ɑː/ /ɔː/ /ɜː/",
          "Diphthongs: /eɪ/ /aɪ/ /ɔɪ/ /aʊ/ /əʊ/ /ɪə/ /eə/ /ʊə/",
          "Consonants: /p/ /b/ /t/ /d/ /k/ /g/ /m/ /n/ /ŋ/ /f/ /v/ /θ/ /ð/ /s/ /z/ /ʃ/ /ʒ/ /tʃ/ /dʒ/ /h/ /l/ /r/ /w/ /j/"
        ]
      },
      {
        title: "Nhiệm vụ 2: Đọc lại 50 từ",
        badge: "Bắt buộc",
        desc: "Chọn ít nhất 20/50 từ và ghi âm lại.",
        items: ["Nhóm 1-5 trong phần Đọc 50 từ"]
      },
      {
        title: "Nhiệm vụ 3: Đọc lại 20 câu",
        badge: "Bắt buộc",
        desc: "Chọn ít nhất 10/20 câu và ghi âm lại.",
        items: ["Câu 1-20 trong phần Đọc 20 câu"]
      },
      {
        title: "Nhiệm vụ 4: Tự đánh giá",
        badge: "Bắt buộc",
        desc: "Tick checklist tự đánh giá sau module.",
        items: [
          "Em thuộc bảng chữ cái.",
          "Em spell được tên của mình.",
          "Em hiểu letter name khác letter sound.",
          "Em biết IPA dùng để đọc từ.",
          "Em đọc được nguyên âm ngắn.",
          "Em đọc được nguyên âm dài.",
          "Em đọc được nguyên âm đôi.",
          "Em biết không nuốt âm cuối.",
          "Em biết schwa /ə/ là âm yếu.",
          "Em biết trọng âm là âm tiết đọc rõ hơn."
        ]
      }
    ]
  },
  homework: [
    "Ôn lại 44 âm IPA cơ bản: nguyên âm ngắn, dài, đôi và phụ âm.",
    "Ghi âm ít nhất 20/50 từ trong buổi học.",
    "Ghi âm ít nhất 10/20 câu trong buổi học.",
    "Tự đánh giá checklist sau module.",
    "Chuẩn bị học grammar/từ vựng ở các buổi tiếp theo."
  ],
  // Result scoring
  scoring: {
    levels: [
      {
        min: 85,
        max: 100,
        label: "Xuất sắc",
        message: "Hoàn thành rất tốt module ABC & IPA Foundation. Học sinh có thể chuyển sang các bài grammar/từ vựng tiếp theo."
      },
      {
        min: 70,
        max: 84,
        label: "Đạt",
        message: "Đạt yêu cầu. Cần luyện thêm một số âm yếu hoặc âm cuối."
      },
      {
        min: 50,
        max: 69,
        label: "Cần cố gắng",
        message: "Cần ôn lại nguyên âm ngắn/dài/đôi và final sounds."
      },
      {
        min: 0,
        max: 49,
        label: "Cần học lại",
        message: "Nên học lại các phần trọng tâm: alphabet, short vowels, final sounds, word stress."
      }
    ]
  },
  vocabulary: [
    { en: "cat", vi: "con mèo", ipa: "/kæt/", group: "review8Words", img: "🐱" },
    { en: "dog", vi: "con chó", ipa: "/dɒg/", group: "review8Words", img: "🐶" },
    { en: "pen", vi: "cây bút", ipa: "/pen/", group: "review8Words", img: "🖊️" },
    { en: "book", vi: "quyển sách", ipa: "/bʊk/", group: "review8Words", img: "📖" },
    { en: "see", vi: "nhìn thấy", ipa: "/siː/", group: "review8Words", img: "👁️" },
    { en: "food", vi: "thức ăn", ipa: "/fuːd/", group: "review8Words", img: "🍱" },
    { en: "car", vi: "xe ô tô", ipa: "/kɑː/", group: "review8Words", img: "🚗" },
    { en: "bird", vi: "con chim", ipa: "/bɜːd/", group: "review8Words", img: "🐦" },
    { en: "time", vi: "thời gian", ipa: "/taɪm/", group: "review8Words", img: "⏰" },
    { en: "house", vi: "ngôi nhà", ipa: "/haʊs/", group: "review8Words", img: "🏠" },
    { en: "teacher", vi: "giáo viên", ipa: "/ˈtiːtʃə/", group: "review8StressWords", img: "👩‍🏫" },
    { en: "banana", vi: "quả chuối", ipa: "/bəˈnɑːnə/", group: "review8StressWords", img: "🍌" },
    { en: "student", vi: "học sinh", ipa: "/ˈstjuːdənt/", group: "review8StressWords", img: "🎒" },
    { en: "family", vi: "gia đình", ipa: "/ˈfæməli/", group: "review8StressWords", img: "👨‍👩‍👧" },
    { en: "computer", vi: "máy tính", ipa: "/kəmˈpjuːtə/", group: "review8StressWords", img: "💻" }
  ],
  vocabGroups: {
    review8Words: "Từ vựng tổng ôn",
    review8StressWords: "Từ luyện trọng âm"
  }
};
