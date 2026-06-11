const alphabetLetters = [
  ["A", "apple", "🍎", "/eɪ/"], ["B", "ball", "⚽", "/biː/"], ["C", "cat", "🐱", "/siː/"],
  ["D", "dog", "🐶", "/diː/"], ["E", "egg", "🥚", "/iː/"], ["F", "fish", "🐟", "/ef/"],
  ["G", "goat", "🐐", "/dʒiː/"], ["H", "hat", "🎩", "/eɪtʃ/"], ["I", "ink", "🖋️", "/aɪ/"],
  ["J", "juice", "🧃", "/dʒeɪ/"], ["K", "kite", "🪁", "/keɪ/"], ["L", "lion", "🦁", "/el/"],
  ["M", "monkey", "🐵", "/em/"], ["N", "nose", "👃", "/en/"], ["O", "orange", "🍊", "/oʊ/"],
  ["P", "pen", "🖊️", "/piː/"], ["Q", "queen", "👑", "/kjuː/"], ["R", "rabbit", "🐰", "/ɑːr/"],
  ["S", "sun", "☀️", "/es/"], ["T", "tiger", "🐯", "/tiː/"], ["U", "umbrella", "☂️", "/juː/"],
  ["V", "van", "🚐", "/viː/"], ["W", "window", "🪟", "/ˈdʌbəl juː/"], ["X", "box", "📦", "/eks/"],
  ["Y", "yellow", "🟨", "/waɪ/"], ["Z", "zebra", "🦓", "/ziː/"],
].map(([letter, word, icon, pronunciation]) => ({
  letter,
  lower: letter.toLowerCase(),
  word,
  icon,
  pronunciation,
  reading: `${letter}, ${letter}, ${word}.`,
}));

const alphabetSectionFlow = [
  "alphabet_song",
  "alphabet_group_ag",
  "alphabet_group_hn",
  "alphabet_group_ou",
  "alphabet_group_vz",
  "alphabet_cards",
  "alphabet_vowels",
  "alphabet_listen_choose",
  "alphabet_case_match",
  "alphabet_icon_match",
  "alphabet_missing",
  "alphabet_spell_name",
  "alphabet_spell_words",
  "alphabet_starfall",
  "alphabet_chill",
];

export const lesson01 = {
  id: 1,
  title: "Buổi 1: Bảng chữ cái A–Z",
  titleEn: "Alphabet A–Z",
  titleVi: "Bảng chữ cái A–Z",
  slug: "alphabet-and-nouns",
  status: "partial",
  unit: "Tuwi 1",
  mainTopic: "Alphabet A–Z",
  track: "alphabet-foundation",
  sectionFlow: alphabetSectionFlow,
  sectionLabels: {
    alphabet_song: "Video bài hát bảng chữ cái",
    alphabet_group_ag: "Nhóm chữ A–G",
    alphabet_group_hn: "Nhóm chữ H–N",
    alphabet_group_ou: "Nhóm chữ O–U",
    alphabet_group_vz: "Nhóm chữ V–Z",
    alphabet_cards: "Thẻ học chữ cái",
    alphabet_vowels: "Nguyên âm A E I O U",
    alphabet_listen_choose: "Nghe và chọn chữ",
    alphabet_case_match: "Ghép chữ hoa - chữ thường",
    alphabet_icon_match: "Ghép chữ với biểu tượng",
    alphabet_missing: "Điền chữ còn thiếu",
    alphabet_spell_name: "Đánh vần tên của em",
    alphabet_spell_words: "Đánh vần từ đơn giản",
    alphabet_starfall: "Chơi game bảng chữ cái",
    alphabet_chill: "Video thư giãn cuối buổi",
  },
  metadata: {
    sourceLessonIds: [],
    hasTodoVideo: true,
    contentImported: true,
    status: {
      content: "partial",
      code: "tuwi34",
      import: "manual"
    }
  },
  contentCounts: {
    dialogueListen: 6,
    minitest: 10
  },
  matchAll: false,
  matchDefaultGroup: "lessonPhrases",
  objectives: [
    "Nhận diện và phát âm đúng 26 chữ cái tiếng Anh.",
    "Biết cách hỏi và trả lời khi cần đánh vần tên/từ vựng bằng mẫu How do you spell...?",
    "Hiểu danh từ là gì, nhận biết danh từ chỉ người, đồ vật, con vật, địa điểm.",
    "Làm quen với cách dùng a / an + danh từ số ít ở mức cơ bản cho người mất gốc."
  ],
  alphabetFoundation: {
    song: {
      title: "Video bài hát bảng chữ cái",
      text: "Cùng nghe và đọc theo A–Z",
      embedUrl: "https://www.youtube.com/embed/75p-N9YKqNo",
    },
    groups: {
      alphabet_group_ag: "A B C D E F G",
      alphabet_group_hn: "H I J K L M N",
      alphabet_group_ou: "O P Q R S T U",
      alphabet_group_vz: "V W X Y Z",
    },
    letters: alphabetLetters,
    vowels: alphabetLetters.filter(({ letter }) => "AEIOU".includes(letter)),
    listenChoose: [
      { audio: "B", options: ["D", "B", "P"], answer: "B" },
      { audio: "G", options: ["J", "G", "Z"], answer: "G" },
      { audio: "M", options: ["N", "W", "M"], answer: "M" },
      { audio: "V", options: ["B", "V", "W"], answer: "V" },
      { audio: "Y", options: ["I", "Y", "A"], answer: "Y" },
    ],
    casePairs: ["A", "B", "C", "D", "E", "F"],
    iconPairs: alphabetLetters.slice(0, 6),
    missingLetters: [
      { prompt: "A B C _ E", answer: "D", options: ["D", "F", "G"] },
      { prompt: "H I _ K", answer: "J", options: ["J", "L", "M"] },
      { prompt: "V W X _ Z", answer: "Y", options: ["T", "Y", "U"] },
    ],
    simpleWords: ["cat", "dog", "pen", "sun", "box", "egg", "fish", "milk", "book", "bag"],
    starfallUrl: "https://www.starfall.com/h/abcs/?mg=k",
    chillVideo: "/videos/alphabet.mp4",
  },
  review: {
    title: "Ôn đầu vào / Khởi động",
    instruction: "Vì đây là Buổi 1 nên không có bài cũ. Thay phần “Ôn bài cũ” bằng phần khởi động đầu vào. Tạo 2 game: Nghe chọn chữ cái và Quiz Bomb kiểm tra nhận diện chữ cái + danh từ cơ bản.",
    reviewGames: {
      title: "Khởi động đầu vào",
      intro: "Bảng chữ cái tiếng Anh, cách đánh vần và nhận diện danh từ.",
      vocabulary: [
        { en: "A", vi: "Chữ cái A", img: "🔤", ipa: "/eɪ/", options: ["A", "E", "I", "R"], answer: 0 },
        { en: "B", vi: "Chữ cái B", img: "🔤", ipa: "/biː/", options: ["D", "B", "P", "V"], answer: 1 },
        { en: "C", vi: "Chữ cái C", img: "🔤", ipa: "/siː/", options: ["C", "S", "Z", "G"], answer: 0 },
        { en: "E", vi: "Chữ cái E", img: "🔤", ipa: "/iː/", options: ["I", "A", "E", "O"], answer: 2 },
        { en: "G", vi: "Chữ cái G", img: "🔤", ipa: "/dʒiː/", options: ["J", "G", "C", "Z"], answer: 1 },
        { en: "H", vi: "Chữ cái H", img: "🔤", ipa: "/eɪtʃ/", options: ["A", "H", "X", "K"], answer: 1 },
        { en: "I", vi: "Chữ cái I", img: "🔤", ipa: "/aɪ/", options: ["I", "E", "Y", "A"], answer: 0 },
        { en: "J", vi: "Chữ cái J", img: "🔤", ipa: "/dʒeɪ/", options: ["G", "J", "Z", "Y"], answer: 1 },
        { en: "K", vi: "Chữ cái K", img: "🔤", ipa: "/keɪ/", options: ["K", "Q", "C", "X"], answer: 0 },
        { en: "L", vi: "Chữ cái L", img: "🔤", ipa: "/el/", options: ["R", "N", "L", "M"], answer: 2 },
        { en: "M", vi: "Chữ cái M", img: "🔤", ipa: "/em/", options: ["N", "M", "W", "L"], answer: 1 },
        { en: "O", vi: "Chữ cái O", img: "🔤", ipa: "/oʊ/", options: ["U", "O", "Q", "A"], answer: 1 },
        { en: "P", vi: "Chữ cái P", img: "🔤", ipa: "/piː/", options: ["B", "P", "T", "D"], answer: 1 },
        { en: "Q", vi: "Chữ cái Q", img: "🔤", ipa: "/kjuː/", options: ["K", "C", "Q", "G"], answer: 2 },
        { en: "R", vi: "Chữ cái R", img: "🔤", ipa: "/ɑːr/", options: ["A", "R", "L", "I"], answer: 1 },
        { en: "S", vi: "Chữ cái S", img: "🔤", ipa: "/es/", options: ["S", "C", "X", "Z"], answer: 0 },
        { en: "T", vi: "Chữ cái T", img: "🔤", ipa: "/tiː/", options: ["D", "T", "P", "E"], answer: 1 },
        { en: "U", vi: "Chữ cái U", img: "🔤", ipa: "/juː/", options: ["W", "U", "V", "Y"], answer: 1 },
        { en: "V", vi: "Chữ cái V", img: "🔤", ipa: "/viː/", options: ["B", "W", "V", "F"], answer: 2 },
        { en: "Z", vi: "Chữ cái Z", img: "🔤", ipa: "/ziː/", options: ["C", "S", "Z", "G"], answer: 2 }
      ],
      quizBomb: {
        title: "Quiz Bomb",
        instruction: "Chọn đáp án đúng trước khi hết giờ.",
        questions: [
          { q: "Có bao nhiêu chữ cái trong bảng chữ cái tiếng Anh?", options: ["24", "25", "26", "27"], answer: 2 },
          { q: "Chữ cái nào là nguyên âm?", options: ["B", "C", "A", "D"], answer: 2 },
          { q: "\"Apple\" bắt đầu bằng chữ cái nào?", options: ["A", "E", "O", "P"], answer: 0 },
          { q: "\"Book\" là loại danh từ gì?", options: ["Người", "Đồ vật", "Địa điểm", "Ý tưởng"], answer: 1 },
          { q: "\"Teacher\" là danh từ chỉ gì?", options: ["Người", "Đồ vật", "Con vật", "Địa điểm"], answer: 0 },
          { q: "Chọn câu đúng:", options: ["a apple", "an apple", "a orange", "an book"], answer: 1 },
          { q: "Chọn câu đúng:", options: ["a book", "an book", "an pen", "a eraser"], answer: 0 },
          { q: "\"Cat\" là danh từ chỉ gì?", options: ["Địa điểm", "Người", "Con vật", "Ý tưởng"], answer: 2 },
          { q: "\"School\" là danh từ chỉ gì?", options: ["Địa điểm", "Đồ vật", "Con vật", "Chữ cái"], answer: 0 },
          { q: "Chữ cái nào phát âm là /biː/?", options: ["V", "B", "P", "D"], answer: 1 },
          { q: "Chữ cái nào phát âm là /siː/?", options: ["C", "S", "Z", "G"], answer: 0 },
          { q: "\"How do you spell your name?\" nghĩa là gì?", options: ["Bạn tên gì?", "Bạn bao nhiêu tuổi?", "Bạn đánh vần tên bạn như thế nào?", "Bạn sống ở đâu?"], answer: 2 },
          { q: "\"A noun\" nghĩa là gì?", options: ["Động từ", "Danh từ", "Tính từ", "Giới từ"], answer: 1 },
          { q: "Chọn nhóm đều là danh từ:", options: ["book, pen, cat", "go, eat, sleep", "big, small, good", "in, on, at"], answer: 0 },
          { q: "Trước từ bắt đầu bằng âm nguyên âm thường dùng:", options: ["a", "an", "the only", "no"], answer: 1 },
          { q: "Trước từ bắt đầu bằng âm phụ âm thường dùng:", options: ["a", "an", "many", "some"], answer: 0 },
          { q: "\"Dog\" bắt đầu bằng chữ cái nào?", options: ["B", "D", "G", "T"], answer: 1 },
          { q: "\"Name\" là danh từ chỉ gì?", options: ["Đồ vật", "Con vật", "Tên gọi / thông tin", "Địa điểm"], answer: 2 },
          { q: "Chữ cái nào là phụ âm?", options: ["A", "E", "B", "I"], answer: 2 },
          { q: "\"It's C-A-T\" nghĩa là gì?", options: ["Nó là con mèo", "Đánh vần là C-A-T", "Tôi có một con mèo", "Tôi thích mèo"], answer: 1 }
        ]
      }
    },
    questions: [],
    structures: [
      "A is for apple.",
      "B is for book.",
      "How do you spell your name?",
      "It's A-N-N-A.",
      "A noun is a person, place, animal, or thing."
    ]
  },
  video: {
    title: "English Alphabet Pronunciation for Beginners",
    channel: "TODO: Chọn kênh học tiếng Anh phù hợp",
    duration: "TODO: Ưu tiên 2–5 phút",
    embedUrl: "TODO_VIDEO_EMBED_ALPHABET",
    watchUrl: "TODO_VIDEO_ORIGINAL_ALPHABET",
    description: "Video giúp học viên nghe và lặp lại 26 chữ cái tiếng Anh. Học viên tập phân biệt các chữ dễ nhầm như B/P, C/S, G/J, I/E, M/N, V/W.",
    scenes: [
      { label: "Phát âm 26 chữ cái tiếng Anh" },
      { label: "Phân biệt các chữ dễ nhầm: B/P, C/S, G/J, M/N, V/W" }
    ],
    questions: [
      { q: "English alphabet có bao nhiêu chữ cái?", options: ["24", "25", "26", "27"], answer: 2 },
      { q: "Chữ cái nào phát âm là /eɪ/?", options: ["A", "E", "I", "R"], answer: 0 },
      { q: "Chữ cái nào dễ bị nhầm với B khi nghe?", options: ["A", "P", "O", "X"], answer: 1 },
      { q: "\"How do you spell it?\" dùng để hỏi gì?", options: ["Hỏi tuổi", "Hỏi địa chỉ", "Hỏi cách đánh vần", "Hỏi nghề nghiệp"], answer: 2 },
      { q: "Khi đánh vần từ cat, cách đúng là:", options: ["C-T-A", "C-A-T", "K-A-T", "S-A-T"], answer: 1 }
    ],
    comprehensionQuestions: []
  },
  vocabGroups: {
    mainVocabulary: "BẢNG CHỮ CÁI — English Alphabet",
    lessonPhrases: "DANH TỪ CƠ BẢN — Basic Nouns"
  },
  vocabulary: [
    { en: "A", vi: "Chữ cái A", img: "🔤", ipa: "/eɪ/", example: "apple", group: "mainVocabulary" },
    { en: "B", vi: "Chữ cái B", img: "🔤", ipa: "/biː/", example: "book", group: "mainVocabulary" },
    { en: "C", vi: "Chữ cái C", img: "🔤", ipa: "/siː/", example: "cat", group: "mainVocabulary" },
    { en: "D", vi: "Chữ cái D", img: "🔤", ipa: "/diː/", example: "dog", group: "mainVocabulary" },
    { en: "E", vi: "Chữ cái E", img: "🔤", ipa: "/iː/", example: "egg", group: "mainVocabulary" },
    { en: "F", vi: "Chữ cái F", img: "🔤", ipa: "/ef/", example: "fish", group: "mainVocabulary" },
    { en: "G", vi: "Chữ cái G", img: "🔤", ipa: "/dʒiː/", example: "girl", group: "mainVocabulary" },
    { en: "H", vi: "Chữ cái H", img: "🔤", ipa: "/eɪtʃ/", example: "house", group: "mainVocabulary" },
    { en: "I", vi: "Chữ cái I", img: "🔤", ipa: "/aɪ/", example: "ice", group: "mainVocabulary" },
    { en: "J", vi: "Chữ cái J", img: "🔤", ipa: "/dʒeɪ/", example: "juice", group: "mainVocabulary" },
    { en: "K", vi: "Chữ cái K", img: "🔤", ipa: "/keɪ/", example: "key", group: "mainVocabulary" },
    { en: "L", vi: "Chữ cái L", img: "🔤", ipa: "/el/", example: "lemon", group: "mainVocabulary" },
    { en: "M", vi: "Chữ cái M", img: "🔤", ipa: "/em/", example: "man", group: "mainVocabulary" },
    { en: "N", vi: "Chữ cái N", img: "🔤", ipa: "/en/", example: "name", group: "mainVocabulary" },
    { en: "O", vi: "Chữ cái O", img: "🔤", ipa: "/oʊ/", example: "orange", group: "mainVocabulary" },
    { en: "P", vi: "Chữ cái P", img: "🔤", ipa: "/piː/", example: "pen", group: "mainVocabulary" },
    { en: "Q", vi: "Chữ cái Q", img: "🔤", ipa: "/kjuː/", example: "queen", group: "mainVocabulary" },
    { en: "R", vi: "Chữ cái R", img: "🔤", ipa: "/ɑːr/", example: "room", group: "mainVocabulary" },
    { en: "S", vi: "Chữ cái S", img: "🔤", ipa: "/es/", example: "student", group: "mainVocabulary" },
    { en: "T", vi: "Chữ cái T", img: "🔤", ipa: "/tiː/", example: "teacher", group: "mainVocabulary" },
    { en: "U", vi: "Chữ cái U", img: "🔤", ipa: "/juː/", example: "umbrella", group: "mainVocabulary" },
    { en: "V", vi: "Chữ cái V", img: "🔤", ipa: "/viː/", example: "van", group: "mainVocabulary" },
    { en: "W", vi: "Chữ cái W", img: "🔤", ipa: "/ˈdʌbəl juː/", example: "window", group: "mainVocabulary" },
    { en: "X", vi: "Chữ cái X", img: "🔤", ipa: "/eks/", example: "box", group: "mainVocabulary" },
    { en: "Y", vi: "Chữ cái Y", img: "🔤", ipa: "/waɪ/", example: "yellow", group: "mainVocabulary" },
    { en: "Z", vi: "Chữ cái Z", img: "🔤", ipa: "/ziː/", example: "zoo", group: "mainVocabulary" },
    
    { en: "apple 🍎", vi: "quả táo", img: "🍎", ipa: "/ˈæpəl/", group: "lessonPhrases" },
    { en: "book 📖", vi: "quyển sách", img: "📖", ipa: "/bʊk/", group: "lessonPhrases" },
    { en: "pen 🖊️", vi: "cây bút mực", img: "🖊️", ipa: "/pen/", group: "lessonPhrases" },
    { en: "pencil ✏️", vi: "cây bút chì", img: "✏️", ipa: "/ˈpensəl/", group: "lessonPhrases" },
    { en: "bag 🎒", vi: "cái túi / cặp", img: "🎒", ipa: "/bæɡ/", group: "lessonPhrases" },
    { en: "phone 📱", vi: "điện thoại", img: "📱", ipa: "/foʊn/", group: "lessonPhrases" },
    { en: "computer 💻", vi: "máy tính", img: "💻", ipa: "/kəmˈpjuːtər/", group: "lessonPhrases" },
    { en: "table 🪑", vi: "cái bàn", img: "🪑", ipa: "/ˈteɪbəl/", group: "lessonPhrases" },
    { en: "chair 🪑", vi: "cái ghế", img: "🪑", ipa: "/tʃer/", group: "lessonPhrases" },
    { en: "student 👩‍🎓", vi: "học sinh / sinh viên", img: "👩‍🎓", ipa: "/ˈstuːdənt/", group: "lessonPhrases" },
    { en: "teacher 👩‍🏫", vi: "giáo viên", img: "👩‍🏫", ipa: "/ˈtiːtʃər/", group: "lessonPhrases" },
    { en: "friend 👥", vi: "người bạn", img: "👥", ipa: "/frend/", group: "lessonPhrases" },
    { en: "cat 🐱", vi: "con mèo", img: "🐱", ipa: "/kæt/", group: "lessonPhrases" },
    { en: "dog 🐶", vi: "con chó", img: "🐶", ipa: "/dɔːɡ/", group: "lessonPhrases" },
    { en: "fish 🐟", vi: "con cá", img: "🐟", ipa: "/fɪʃ/", group: "lessonPhrases" },
    { en: "school 🏫", vi: "trường học", img: "🏫", ipa: "/skuːl/", group: "lessonPhrases" },
    { en: "classroom 🏫", vi: "phòng học", img: "🏫", ipa: "/ˈklæsruːm/", group: "lessonPhrases" },
    { en: "house 🏠", vi: "ngôi nhà", img: "🏠", ipa: "/haʊs/", group: "lessonPhrases" },
    { en: "room 🚪", vi: "căn phòng", img: "🚪", ipa: "/ruːm/", group: "lessonPhrases" },
    { en: "city 🌆", vi: "thành phố", img: "🌆", ipa: "/ˈsɪti/", group: "lessonPhrases" },
    { en: "name 🪪", vi: "tên", img: "🪪", ipa: "/neɪm/", group: "lessonPhrases" },
    { en: "letter 🔤", vi: "chữ cái", img: "🔤", ipa: "/letər/", group: "lessonPhrases" },
    { en: "word 🔡", vi: "từ", img: "🔡", ipa: "/wɜːrd/", group: "lessonPhrases" },
    { en: "noun 📌", vi: "danh từ", img: "📌", ipa: "/naʊn/", group: "lessonPhrases" }
  ],
  listenPick: {
    title: "Nghe chọn từ",
    instruction: "Phát audio từng chữ cái/từ vựng Buổi 1. Mỗi câu có 4 lựa chọn nghĩa tiếng Việt hoặc chữ cái tương ứng.",
    questions: [
      { q: "Nghe và chọn đáp án đúng.", audio: "A", options: ["A", "E", "I", "R"], answer: 0 },
      { q: "Nghe và chọn đáp án đúng.", audio: "B", options: ["P", "B", "D", "V"], answer: 1 },
      { q: "Nghe và chọn đáp án đúng.", audio: "C", options: ["S", "Z", "C", "G"], answer: 2 },
      { q: "Nghe và chọn nghĩa đúng.", audio: "apple", options: ["quả cam", "quả táo", "quyển sách", "cây bút"], answer: 1 },
      { q: "Nghe và chọn nghĩa đúng.", audio: "book", options: ["cái ghế", "quyển sách", "cái bàn", "điện thoại"], answer: 1 },
      { q: "Nghe và chọn nghĩa đúng.", audio: "teacher", options: ["học sinh", "giáo viên", "bạn bè", "người đàn ông"], answer: 1 },
      { q: "Nghe và chọn nghĩa đúng.", audio: "student", options: ["giáo viên", "học sinh / sinh viên", "phòng học", "trường học"], answer: 1 },
      { q: "Nghe và chọn nghĩa đúng.", audio: "cat", options: ["con chó", "con cá", "con mèo", "con chim"], answer: 2 },
      { q: "Nghe và chọn nghĩa đúng.", audio: "dog", options: ["con chó", "con mèo", "con cá", "con ngựa"], answer: 0 },
      { q: "Nghe và chọn nghĩa đúng.", audio: "school", options: ["căn phòng", "trường học", "thành phố", "ngôi nhà"], answer: 1 },
      { q: "Nghe và chọn nghĩa đúng.", audio: "pen", options: ["cây bút mực", "cây bút chì", "cái túi", "điện thoại"], answer: 0 },
      { q: "Nghe và chọn nghĩa đúng.", audio: "pencil", options: ["cây bút mực", "cây bút chì", "máy tính", "quyển sách"], answer: 1 },
      { q: "Nghe và chọn nghĩa đúng.", audio: "phone", options: ["máy tính", "điện thoại", "cái bàn", "cái ghế"], answer: 1 },
      { q: "Nghe và chọn nghĩa đúng.", audio: "computer", options: ["điện thoại", "máy tính", "cây bút", "cái túi"], answer: 1 },
      { q: "Nghe và chọn nghĩa đúng.", audio: "chair", options: ["cái bàn", "cái ghế", "căn phòng", "cửa sổ"], answer: 1 },
      { q: "Nghe và chọn nghĩa đúng.", audio: "table", options: ["cái ghế", "cái bàn", "căn phòng", "ngôi nhà"], answer: 1 },
      { q: "Nghe và chọn nghĩa đúng.", audio: "name", options: ["danh từ", "tên", "chữ cái", "từ"], answer: 1 },
      { q: "Nghe và chọn nghĩa đúng.", audio: "letter", options: ["từ", "câu", "chữ cái", "danh từ"], answer: 2 },
      { q: "Nghe và chọn nghĩa đúng.", audio: "word", options: ["từ", "chữ cái", "tên", "con vật"], answer: 0 },
      { q: "Nghe và chọn nghĩa đúng.", audio: "noun", options: ["động từ", "danh từ", "tính từ", "giới từ"], answer: 1 }
    ]
  },
  grammar: {
    title: "Ngữ pháp",
    intro: "Bài học ngữ pháp về chữ cái, danh từ và mạo từ a/an.",
    grammarFocus: "Alphabet and Nouns",
    formulas: [],
    examples: [],
    commonMistakes: [],
    practiceNotes: [],
    structures: [
      {
        num: 1,
        pattern: "Bảng chữ cái tiếng Anh (English Alphabet)",
        vi: "Gồm 26 chữ cái (5 nguyên âm chính A, E, I, O, U và 21 phụ âm còn lại).",
        style: "Quy tắc cơ bản",
        example: "A is for apple. B is for book.",
        exampleVi: "A dành cho quả táo. B dành cho quyển sách.",
        context: "Ghi nhớ cách phát âm chuẩn bảng chữ cái để đánh vần tốt.",
        commonMistake: "Nhầm lẫn giữa các cặp dễ nhầm: B/P, C/S, G/J, M/N, V/W."
      },
      {
        num: 2,
        pattern: "How do you spell your name?",
        vi: "Dùng để hỏi cách đánh vần tên hoặc một từ. Trả lời bằng: It's + chữ cái.",
        style: "Cấu trúc giao tiếp",
        example: "How do you spell your name? - It's M-A-I.",
        exampleVi: "Bạn đánh vần tên bạn như thế nào? - Là M-A-I.",
        context: "Hỏi lại khi chưa nghe rõ cách viết tên hoặc từ vựng.",
        commonMistake: "Quên trợ động từ 'do' hoặc đánh vần sai chữ cái."
      },
      {
        num: 3,
        pattern: "Danh từ (Noun)",
        vi: "Từ chỉ người (student), đồ vật (book), con vật (cat), hoặc địa điểm (school).",
        style: "Khái niệm ngữ pháp",
        example: "Book is a noun. School is a place.",
        exampleVi: "Sách là một danh từ. Trường học là một địa điểm.",
        context: "Giúp nhận diện danh từ cơ bản trong câu.",
        commonMistake: "Nhầm lẫn danh từ với động từ hoặc tính từ."
      },
      {
        num: 4,
        pattern: "A / An + danh từ số ít",
        vi: "Dùng 'an' trước danh từ bắt đầu bằng nguyên âm (A, E, I, O, U). Dùng 'a' trước phụ âm.",
        style: "Mạo từ",
        example: "an apple, a book, an umbrella",
        exampleVi: "một quả táo, một quyển sách, một cái ô",
        context: "Dùng trước danh từ đếm được số ít khi nói chung chung.",
        commonMistake: "Viết nhầm 'a apple' hoặc 'an book'."
      }
    ],
    sections: [
      {
        title: "PHẦN 1: Bảng chữ cái tiếng Anh",
        intro: "Tiếng Anh có 26 chữ cái.",
        tables: [
          {
            headers: ["Nhóm", "Chữ cái"],
            rows: [
              ["Nguyên âm — vowels", "A, E, I, O, U"],
              ["Phụ âm — consonants", "B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Y, Z"]
            ]
          },
          {
            headers: ["Cặp dễ nhầm", "Cách nhớ"],
            rows: [
              ["B / P", "B = /biː/, P = /piː/"],
              ["C / S", "C = /siː/, S = /es/"],
              ["G / J", "G = /dʒiː/, J = /dʒeɪ/"],
              ["M / N", "M = /em/, N = /en/"],
              ["V / W", "V = /viː/, W = /ˈdʌbəl juː/"]
            ]
          }
        ],
        items: [
          "Lưu ý: Chữ Y đôi khi có âm giống nguyên âm, nhưng ở mức cơ bản, học viên chỉ cần nhớ 5 nguyên âm chính: A, E, I, O, U."
        ]
      },
      {
        title: "PHẦN 2: Hỏi và trả lời cách đánh vần",
        tables: [
          {
            headers: ["Mục đích", "Cấu trúc", "Ví dụ"],
            rows: [
              ["Hỏi cách đánh vần", "How do you spell + từ/tên?", "How do you spell your name?"],
              ["Trả lời", "It's + chữ cái đánh vần.", "It's A-N-N-A."],
              ["Hỏi lại khi chưa nghe rõ", "Can you spell it, please?", "Can you spell it, please?"]
            ]
          }
        ],
        examples: [
          "How do you spell cat? — It's C-A-T.",
          "How do you spell book? — It's B-O-O-K.",
          "How do you spell your name? — It's M-A-I.",
          "Can you spell it, please? — Sure. P-E-N."
        ]
      },
      {
        title: "PHẦN 3: Danh từ là gì?",
        intro: "Danh từ — noun là từ dùng để gọi tên:",
        tables: [
          {
            headers: ["Loại danh từ", "Ví dụ"],
            rows: [
              ["Người — person", "student, teacher, friend"],
              ["Đồ vật — thing", "book, pen, phone, table"],
              ["Con vật — animal", "cat, dog, fish"],
              ["Địa điểm — place", "school, classroom, house, city"],
              ["Tên/ý tưởng cơ bản — name/idea", "name, word, letter, noun"]
            ]
          }
        ],
        examples: [
          "Student is a noun.",
          "Book is a noun.",
          "Cat is a noun.",
          "School is a noun."
        ],
        items: [
          "Lưu ý: Buổi 1 chỉ cần nhận diện danh từ. Danh từ số ít/số nhiều sẽ học kỹ ở Buổi 2."
        ]
      },
      {
        title: "PHẦN 4: A / An + danh từ số ít",
        intro: "Khi nói một danh từ số ít, tiếng Anh thường dùng a hoặc an phía trước.",
        tables: [
          {
            headers: ["Dùng", "Khi nào dùng", "Ví dụ"],
            rows: [
              ["a", "trước âm phụ âm", "a book, a pen, a teacher"],
              ["an", "trước âm nguyên âm", "an apple, an egg, an umbrella"]
            ]
          }
        ],
        items: [
          "Lưu ý quan trọng: Dùng a/an theo âm đầu, không chỉ nhìn chữ cái."
        ],
        examples: [
          "a book",
          "a cat",
          "a student",
          "an apple",
          "an egg",
          "an umbrella"
        ],
        mistakes: [
          { wrong: "a apple", right: "an apple" },
          { wrong: "an book", right: "a book" },
          { wrong: "a umbrella", right: "an umbrella" }
        ]
      }
    ],
    commonQA: [
      { q: "What is a noun?", a: "A noun is a person, place, animal, or thing." },
      { q: "How do you spell 'cat'?", a: "It's C-A-T." },
      { q: "Is 'teacher' a noun?", a: "Yes. Teacher is a noun." },
      { q: "Is it 'a apple' or 'an apple'?", a: "It's 'an apple.'" }
    ]
  },
  listening: {
    title: "Nghe trả lời",
    transcript: "Nghe và điền từ thích hợp vào chỗ trống để hoàn thành câu.",
    questions: [
      { q: "A is for ___.", options: ["apple", "book"], answer: 0, audio: "apple" },
      { q: "B is for ___.", options: ["cat", "book"], answer: 1, audio: "book" },
      { q: "C is for ___.", options: ["cat", "dog"], answer: 0, audio: "cat" },
      { q: "D is for ___.", options: ["dog", "apple"], answer: 0, audio: "dog" },
      { q: "How do you ___ your name?", options: ["spell", "noun"], answer: 0, audio: "spell" },
      { q: "It's ___-A-T.", options: ["C", "S"], answer: 0, audio: "C" },
      { q: "It's B-O-O-___.", options: ["K", "C"], answer: 0, audio: "K" },
      { q: "A noun is a person, place, animal, or ___.", options: ["thing", "letter"], answer: 0, audio: "thing" },
      { q: "Teacher is a ___.", options: ["noun", "letter"], answer: 0, audio: "noun" },
      { q: "School is a ___.", options: ["place", "person"], answer: 0, audio: "place" },
      { q: "Cat is an ___.", options: ["animal", "object"], answer: 0, audio: "animal" },
      { q: "Book is a ___.", options: ["thing", "place"], answer: 0, audio: "thing" },
      { q: "This is ___ apple.", options: ["a", "an"], answer: 1, audio: "an" },
      { q: "This is ___ book.", options: ["a", "an"], answer: 0, audio: "a" },
      { q: "This is ___ egg.", options: ["a", "an"], answer: 1, audio: "an" },
      { q: "This is ___ pen.", options: ["a", "an"], answer: 0, audio: "a" },
      { q: "Can you spell it, ___?", options: ["please", "noun"], answer: 0, audio: "please" },
      { q: "The word 'student' is a ___.", options: ["noun", "vowel"], answer: 0, audio: "noun" },
      { q: "A, E, I, O, U are ___.", options: ["vowels", "consonants"], answer: 0, audio: "vowels" },
      { q: "B, C, D are ___.", options: ["vowels", "consonants"], answer: 1, audio: "consonants" }
    ]
  },
  translation: {
    title: "Luyện dịch Việt ↔ Anh",
    instruction: "Dịch câu theo hướng được yêu cầu, sau đó bấm kiểm tra để xem đáp án.",
    sentences: [
      { vi: "Bảng chữ cái tiếng Anh có 26 chữ cái.", en: "The English alphabet has 26 letters.", direction: "vi-en" },
      { vi: "A là chữ cái đầu tiên.", en: "A is the first letter.", direction: "vi-en" },
      { vi: "Bạn đánh vần tên của bạn như thế nào?", en: "How do you spell your name?", direction: "vi-en" },
      { vi: "Nó được đánh vần là C-A-T.", en: "It's C-A-T.", direction: "vi-en" },
      { vi: "Bạn có thể đánh vần nó được không?", en: "Can you spell it, please?", direction: "en-vi" },
      { vi: "Danh từ là người, địa điểm, con vật hoặc đồ vật.", en: "A noun is a person, place, animal, or thing.", direction: "en-vi" },
      { vi: "\"Book\" là một danh từ.", en: "\"Book\" is a noun.", direction: "vi-en" },
      { vi: "\"Teacher\" là danh từ chỉ người.", en: "\"Teacher\" is a noun for a person.", direction: "vi-en" },
      { vi: "\"School\" là danh từ chỉ địa điểm.", en: "\"School\" is a noun for a place.", direction: "vi-en" },
      { vi: "\"Cat\" là danh từ chỉ con vật.", en: "\"Cat\" is a noun for an animal.", direction: "vi-en" },
      { vi: "Đây là một quyển sách.", en: "This is a book.", direction: "en-vi" },
      { vi: "Đây là một quả táo.", en: "This is an apple.", direction: "en-vi" },
      { vi: "Đây là một cây bút.", en: "This is a pen.", direction: "vi-en" },
      { vi: "Đây là một quả trứng.", en: "This is an egg.", direction: "vi-en" },
      { vi: "Đây là một học sinh.", en: "This is a student.", direction: "vi-en" },
      { vi: "Đây là một giáo viên.", en: "This is a teacher.", direction: "vi-en" },
      { vi: "\"Phone\" có phải là danh từ không?", en: "Is \"phone\" a noun?", direction: "en-vi" },
      { vi: "Đúng, phone là một danh từ.", en: "Yes, phone is a noun.", direction: "en-vi" },
      { vi: "A, E, I, O, U là nguyên âm.", en: "A, E, I, O, U are vowels.", direction: "vi-en" },
      { vi: "B, C, D là phụ âm.", en: "B, C, D are consonants.", direction: "vi-en" }
    ],
    exercises: []
  },
  dialogueVideo: {
    title: "Video hội thoại",
    dialogueVideoTitle: "Hội thoại đánh vần tên và nhận diện danh từ cơ bản.",
    channel: "TODO: Chọn video hội thoại beginner phù hợp",
    embedUrl: "TODO_VIDEO_EMBED_DIALOGUE_ALPHABET_NOUNS",
    watchUrl: "TODO_VIDEO_ORIGINAL_DIALOGUE_ALPHABET_NOUNS",
    description: "Hội thoại ngắn giúp học viên luyện hỏi tên, đánh vần tên/từ vựng, và nhận biết danh từ trong lớp học.",
    transcript: [
      { speaker: "A", en: "Hello! What's your name?", vi: "Xin chào! Bạn tên là gì?" },
      { speaker: "B", en: "My name is Anna.", vi: "Tên tôi là Anna." },
      { speaker: "A", en: "How do you spell Anna?", vi: "Bạn đánh vần Anna như thế nào?" },
      { speaker: "B", en: "It's A-N-N-A.", vi: "Đánh vần là A-N-N-A." },
      { speaker: "A", en: "Thank you. What is this?", vi: "Cảm ơn. Đây là gì?" },
      { speaker: "B", en: "It's a book.", vi: "Đây là một quyển sách." },
      { speaker: "A", en: "Is \"book\" a noun?", vi: "\"Book\" có phải là danh từ không?" },
      { speaker: "B", en: "Yes. Book is a noun.", vi: "Đúng. Book là một danh từ." },
      { speaker: "A", en: "What about \"teacher\"?", vi: "Còn \"teacher\" thì sao?" },
      { speaker: "B", en: "Teacher is a noun for a person.", vi: "Teacher là danh từ chỉ người." }
    ],
    comprehension: [
      { q: "What is the person's name?", options: ["Emma", "Anna", "Alice", "Amy"], answer: 1 },
      { q: "How do you spell Anna?", options: ["A-M-Y", "A-N-A", "A-N-N-A", "E-N-N-A"], answer: 2 },
      { q: "What object do they talk about?", options: ["A phone", "A book", "A bag", "A chair"], answer: 1 },
      { q: "What kind of noun is \"teacher\"?", options: ["A person", "A place", "An animal", "A thing"], answer: 0 }
    ],
    listenPickLine: [
      { prompt: "What's your name?", options: ["I'm fine.", "My name is Anna.", "It's a book.", "Yes, it is."], answer: 1 },
      { prompt: "How do you spell Anna?", options: ["It's A-N-N-A.", "It's B-O-O-K.", "It's a noun.", "It's a teacher."], answer: 0 },
      { prompt: "It's a book.", options: ["cái bàn", "quyển sách", "cái ghế", "cây bút"], answer: 1 },
      { prompt: "Is book a noun?", options: ["Yes, book is a noun.", "No, book is a verb.", "It is C-A-T.", "My name is Book."], answer: 0 },
      { prompt: "Teacher is a noun for a person.", options: ["danh từ chỉ người", "danh từ chỉ đồ vật", "danh từ chỉ con vật", "danh từ chỉ địa điểm"], answer: 0 },
      { prompt: "Can you spell it, please?", options: ["Khi hỏi tuổi", "Khi muốn người khác đánh vần", "Khi hỏi địa chỉ", "Khi hỏi giá tiền"], answer: 1 }
    ],
    fillConversation: [
      {
        wordBank: ["name", "spell", "book", "noun", "person"],
        lines: [
          { speaker: "A", text: "Hello! What's your [[name]]?" },
          { speaker: "B", text: "My name is Anna." },
          { speaker: "A", text: "How do you [[spell]] Anna?" },
          { speaker: "B", text: "It's A-N-N-A." },
          { speaker: "A", text: "What is this?" },
          { speaker: "B", text: "It's a [[book]]." },
          { speaker: "A", text: "Is \"teacher\" a [[noun]]?" },
          { speaker: "B", text: "Yes. Teacher is a noun for a [[person]]." }
        ],
        explanations: [
          "name: dùng để hỏi tên trong cấu trúc What's your name?",
          "spell: dùng để hỏi cách đánh vần How do you spell...?",
          "book: đồ vật được nhắc đến trong hội thoại",
          "noun: từ chỉ loại từ của teacher",
          "person: teacher là danh từ chỉ người"
        ]
      }
    ],
    comprehensionQuestions: []
  },
  speaking: {
    title: "Luyện nói AI",
    formula: "My name is [name]. It's [letters]. / [word] is a noun. It is a...",
    turns: [
      {
        id: 1,
        ai: { textEn: "What's your name? How do you spell it?", textVn: "Bạn tên gì? Bạn đánh vần tên như thế nào?", audioUrl: "What's your name? How do you spell it?" },
        user: {
          formula: "My name is + [name]. It's + [letters].",
          sampleEn: "My name is Mai. It's M-A-I.",
          sampleVn: "Tên tôi là Mai. Đánh vần là M-A-I.",
          sampleAudioUrl: "My name is Mai. It's M-A-I."
        }
      },
      {
        id: 2,
        ai: { textEn: "Ask me to spell my name.", textVn: "Yêu cầu tôi đánh vần tên tôi.", audioUrl: "Ask me to spell my name." },
        user: {
          formula: "How do you spell your name? / Can you spell it, please?",
          sampleEn: "How do you spell your name? Can you spell it, please?",
          sampleVn: "Bạn đánh vần tên thế nào? Làm ơn đánh vần nó giúp tôi.",
          sampleAudioUrl: "How do you spell your name? Can you spell it, please?"
        }
      },
      {
        id: 3,
        ai: { textEn: "Look around your room. Name three nouns.", textVn: "Nhìn quanh phòng của bạn. Kể tên ba danh từ.", audioUrl: "Look around your room. Name three nouns." },
        user: {
          formula: "[word] is a noun. It is a thing/place/person/animal.",
          sampleEn: "Book is a noun. Pen is a noun. Phone is a noun. They are things.",
          sampleVn: "Sách là danh từ. Bút là danh từ. Điện thoại là danh từ. Chúng là đồ vật.",
          sampleAudioUrl: "Book is a noun. Pen is a noun. Phone is a noun. They are things."
        }
      },
      {
        id: 4,
        ai: { textEn: "What nouns can you see in a classroom?", textVn: "Những danh từ nào bạn có thể nhìn thấy trong lớp học?", audioUrl: "What nouns can you see in a classroom?" },
        user: {
          formula: "I can see + [noun], [noun], and [noun].",
          sampleEn: "I can see a teacher, a student, a book, a pen, and a table.",
          sampleVn: "Tôi thấy giáo viên, học sinh, sách, bút và cái bàn.",
          sampleAudioUrl: "I can see a teacher, a student, a book, a pen, and a table."
        }
      },
      {
        id: 5,
        ai: { textEn: "Tell me about the English alphabet and nouns. Use at least 4 sentences.", textVn: "Nói cho tôi biết về bảng chữ cái tiếng Anh và danh từ. Dùng ít nhất 4 câu.", audioUrl: "Tell me about the English alphabet and nouns. Use at least 4 sentences." },
        user: {
          formula: "The English alphabet has... / A noun is... / [word] is a noun.",
          sampleEn: "The English alphabet has 26 letters. A, E, I, O, U are vowels. A noun is a person, place, animal, or thing. Book is a noun. Teacher is a noun for a person.",
          sampleVn: "Bảng chữ cái tiếng Anh có 26 chữ cái. A, E, I, O, U là nguyên âm. Danh từ là người, địa điểm, con vật hoặc đồ vật. Sách là danh từ. Giáo viên là danh từ chỉ người.",
          sampleAudioUrl: "The English alphabet has 26 letters. A, E, I, O, U are vowels. A noun is a person, place, animal, or thing. Book is a noun. Teacher is a noun for a person."
        }
      }
    ]
  },
  minitest: [
    { q: "English alphabet có bao nhiêu chữ cái?", options: ["24", "25", "26", "27"], answer: 2 },
    { q: "Chữ cái nào là nguyên âm?", options: ["B", "C", "E", "D"], answer: 2 },
    { q: "\"How do you spell your name?\" nghĩa là gì?", options: ["Bạn tên là gì?", "Bạn đánh vần tên bạn như thế nào?", "Bạn bao nhiêu tuổi?", "Bạn học ở đâu?"], answer: 1 },
    { q: "\"It's C-A-T\" nghĩa là gì?", options: ["Đây là một con mèo.", "Nó được đánh vần là C-A-T.", "Tôi thích mèo.", "Mèo là danh từ."], answer: 1 },
    { q: "\"Noun\" nghĩa là gì?", options: ["Động từ", "Danh từ", "Tính từ", "Giới từ"], answer: 1 },
    { q: "Chọn nhóm đều là danh từ:", options: ["book, cat, school", "go, eat, sleep", "big, small, nice", "in, on, at"], answer: 0 },
    { q: "\"Teacher\" là danh từ chỉ gì?", options: ["Người", "Con vật", "Đồ vật", "Địa điểm"], answer: 0 },
    { q: "Câu nào đúng?", options: ["a apple", "an apple", "an book", "an cat"], answer: 1 },
    { q: "Câu nào đúng?", options: ["a book", "an book", "an pen", "an teacher"], answer: 0 },
    { q: "\"A noun is a person, place, animal, or thing.\" nghĩa là gì?", options: ["Danh từ là hành động.", "Danh từ là màu sắc.", "Danh từ là người, địa điểm, con vật hoặc đồ vật.", "Danh từ là câu hỏi."], answer: 2 }
  ],
  mindmap: {
    type: "structured",
    center: "ALPHABET & NOUNS",
    branches: [
      {
        icon: "🔤",
        label: "Alphabet",
        sub: "26 letters",
        items: ["Vowels: A, E, I, O, U", "Consonants: B C D F...", "Spelling: How do you spell...? / It's C-A-T."]
      },
      {
        icon: "👤",
        label: "People Nouns",
        sub: "Danh từ chỉ người",
        items: ["student", "teacher", "friend"]
      },
      {
        icon: "🎒",
        label: "Thing Nouns",
        sub: "Danh từ chỉ vật",
        items: ["book", "pen", "phone", "table", "chair"]
      },
      {
        icon: "🐱",
        label: "Animal Nouns",
        sub: "Danh từ chỉ con vật",
        items: ["cat", "dog", "fish"]
      },
      {
        icon: "🏫",
        label: "Place Nouns",
        sub: "Danh từ chỉ địa điểm",
        items: ["school", "classroom", "house", "city"]
      },
      {
        icon: "🔡",
        label: "Name / Word & A / An",
        sub: "Tên gọi, từ và mạo từ",
        items: ["name", "word", "letter", "noun", "a book", "a pen", "an apple", "an egg"]
      }
    ]
  },
  homeworkRich: {
    title: "Bài tập về nhà",
    submit: "Học viên nộp bài qua nhóm lớp. Khuyến khích gửi voice note ngắn 30–60 giây.",
    deadline: "",
    tasks: [
      {
        icon: "✍️",
        title: "Bài tập 1: Viết — My Alphabet & Noun List",
        badge: "",
        desc: "Viết danh sách 10 danh từ tiếng Anh quanh bạn.",
        items: [
          "Ít nhất 3 danh từ chỉ đồ vật",
          "Ít nhất 2 danh từ chỉ người",
          "Ít nhất 2 danh từ chỉ địa điểm",
          "Ít nhất 2 danh từ chỉ con vật",
          "Viết thêm a/an trước mỗi danh từ nếu là danh từ số ít"
        ],
        showSample: true,
        sample: "1. a book — đồ vật\n2. a pen — đồ vật\n3. a teacher — người\n4. a student — người\n5. a school — địa điểm\n6. an apple — đồ vật\n7. a cat — con vật\n8. a dog — con vật",
        rubric: ""
      },
      {
        icon: "🎙️",
        title: "Bài tập 2: Nói / Ghi âm — Spell Your Name & 5 Nouns",
        badge: "",
        desc: "Ghi âm 5–8 câu ngắn.",
        items: [
          "Nói tên của bạn",
          "Đánh vần tên của bạn",
          "Nói 5 danh từ tiếng Anh",
          "Nói rõ danh từ đó thuộc nhóm nào: person, place, animal, or thing",
          "What's your name?",
          "How do you spell your name?",
          "What is a noun?",
          "Can you say five nouns?",
          "Is \"teacher\" a person, place, animal, or thing?"
        ],
        showSample: true,
        sample: "My name is Mai. It's M-A-I. A noun is a person, place, animal, or thing. Book is a noun. It is a thing. Teacher is a noun. It is a person. School is a noun. It is a place. Cat is a noun. It is an animal.",
        rubric: ""
      }
    ]
  },
  homework: [
    "Viết danh sách 10 danh từ tiếng Anh quanh bạn (3 đồ vật, 2 người, 2 địa điểm, 2 con vật, thêm a/an).",
    "Ghi âm 5–8 câu ngắn nói tên bạn, đánh vần tên và nói 5 danh từ tiếng Anh kèm nhóm của chúng."
  ]
};
