export const lesson05 = {
  id: 5,
  lessonNumber: 5,
  dayNumber: 5,
  title: "BUỔI 5: Diphthongs – Nguyên âm đôi",
  titleEn: "Diphthongs",
  titleVi: "Nguyên âm đôi",
  subtitle: "Học cách đọc âm trượt từ âm này sang âm khác",
  cefrLevel: "A0-A1",
  unit: "ABC & IPA Foundation",
  module: "ABC & IPA Foundation",
  track: "diphthongs",
  slug: "diphthongs",
  mainTopic: "Diphthongs",
  estimatedMinutes: 75,
  lessonType: "abc-ipa-foundation",
  status: "ready",
  sectionFlow: [
    "diph_intro",
    "diph_glide_rule",
    "diph_sound_table",
    "diph_mouth_shapes",
    "diph_mouth_videos",
    "diph_audio_samples",
    "diph_read_ipa",
    "diph_spell_words",
    "diph_compare_sounds",
    "diph_image_sentence",
    "diph_blend_game",
    "diph_listen_choose",
    "diph_sentence_reading",
    "diph_ai_speaking",
    "diph_mini_test",
    "diph_homework"
  ],
  architecture: {
    preserveSectionFlow: true,
    source: "Buổi 5 MD: Diphthongs",
    sourceOfTruth: "Buổi 5 MD"
  },
  metadata: {
    contentImported: true,
    importedFromMd: true,
    hasTodoVideo: false,
    localContentAuthoritative: true,
    sourceLessonIds: [],
    status: {
      content: "ready",
      code: "diphthongs",
      import: "manual"
    }
  },
  objectives: [
    "Hiểu nguyên âm đôi là gì (âm trượt từ âm đầu sang âm sau).",
    "Biết cách trượt âm khi đọc nguyên âm đôi.",
    "Nhận biết 8 nguyên âm đôi cơ bản: /eɪ/, /aɪ/, /ɔɪ/, /aʊ/, /əʊ/, /ɪə/, /eə/, /ʊə/.",
    "Đọc được các từ mẫu: say, time, boy, house, go, ear, hair, tour.",
    "Nhìn khẩu hình bắt đầu và kết thúc của mỗi âm để phát âm chính xác.",
    "Đánh vần/tách âm và ghép âm thành từ có nguyên âm đôi.",
    "Đọc các câu ngắn chứa nguyên âm đôi một cách tự nhiên.",
    "Hoàn thành mini test và bài tập về nhà đạt kết quả tốt."
  ],
  diphthongs: {
    sounds: [
      {
        symbol: "/eɪ/",
        name: "ây",
        keyword: "say",
        ipa: "/seɪ/",
        glide: "/e/ → /ɪ/",
        sentence: "I say hello.",
        meaning: "nói",
        audioSlot: "AUDIO_SOUND_EI",
        imageSlot: "IMAGE_SLOT_SAY",
        mouthStartSlot: "MOUTH_START_EI",
        mouthEndSlot: "MOUTH_END_EI",
        lips: "Bắt đầu mở vừa ở /e/, sau đó kéo nhẹ sang /ɪ/.",
        tongue: "Bắt đầu ở phía trước, nâng nhẹ lên ở cuối âm.",
        air: "Trượt nhẹ, liền mạch.",
        voice: "Có giọng (voiced).",
        mistake: "Đọc quá ngắn hoặc đọc thành /e/ đơn.",
        fix: "Kéo nhẹ phần cuối về /ɪ/ (say = /seɪ/)."
      },
      {
        symbol: "/aɪ/",
        name: "ai",
        keyword: "time",
        ipa: "/taɪm/",
        glide: "/a/ → /ɪ/",
        sentence: "It is time.",
        meaning: "thời gian",
        audioSlot: "AUDIO_SOUND_AI",
        imageSlot: "IMAGE_SLOT_TIME",
        mouthStartSlot: "MOUTH_START_AI",
        mouthEndSlot: "MOUTH_END_AI",
        lips: "Bắt đầu mở rộng ở /a/, sau đó kéo lên về /ɪ/.",
        tongue: "Từ thấp chuyển lên phía trước.",
        air: "Trượt rõ.",
        voice: "Có giọng (voiced).",
        mistake: "Đọc thành /a/ đơn, thiếu phần /ɪ/.",
        fix: "Bắt đầu mở miệng rộng, kết thúc nhẹ ở /ɪ/ (time = /taɪm/)."
      },
      {
        symbol: "/ɔɪ/",
        name: "oi",
        keyword: "boy",
        ipa: "/bɔɪ/",
        glide: "/ɔ/ → /ɪ/",
        sentence: "He is a boy.",
        meaning: "cậu bé",
        audioSlot: "AUDIO_SOUND_OI",
        imageSlot: "IMAGE_SLOT_BOY",
        mouthStartSlot: "MOUTH_START_OI",
        mouthEndSlot: "MOUTH_END_OI",
        lips: "Bắt đầu hơi tròn ở /ɔ/, sau đó kéo nhẹ về /ɪ/.",
        tongue: "Từ phía sau chuyển lên phía trước.",
        air: "Trượt tự nhiên.",
        voice: "Có giọng (voiced).",
        mistake: "Đọc quá giống \"ôi\" tiếng Việt, không rõ phần trượt.",
        fix: "Giữ phần đầu hơi tròn môi, rồi trượt nhẹ về /ɪ/ (boy = /bɔɪ/)."
      },
      {
        symbol: "/aʊ/",
        name: "ao",
        keyword: "house",
        ipa: "/haʊs/",
        glide: "/a/ → /ʊ/",
        sentence: "This is my house.",
        meaning: "ngôi nhà",
        audioSlot: "AUDIO_SOUND_AU",
        imageSlot: "IMAGE_SLOT_HOUSE",
        mouthStartSlot: "MOUTH_START_AU",
        mouthEndSlot: "MOUTH_END_AU",
        lips: "Bắt đầu mở rộng ở /a/, sau đó tròn nhẹ về /ʊ/.",
        tongue: "Từ thấp chuyển lùi nhẹ về sau.",
        air: "Trượt rõ.",
        voice: "Có giọng (voiced).",
        mistake: "Đọc thiếu phần tròn môi cuối.",
        fix: "Cuối âm nhớ tròn môi nhẹ (house = /haʊs/)."
      },
      {
        symbol: "/əʊ/",
        name: "âu/êu",
        keyword: "go",
        ipa: "/gəʊ/",
        glide: "/ə/ → /ʊ/",
        sentence: "I go home.",
        meaning: "đi",
        audioSlot: "AUDIO_SOUND_OU",
        imageSlot: "IMAGE_SLOT_GO",
        mouthStartSlot: "MOUTH_START_OU",
        mouthEndSlot: "MOUTH_END_OU",
        lips: "Bắt đầu thả lỏng, sau đó tròn nhẹ về /ʊ/.",
        tongue: "Ở giữa rồi lùi nhẹ về sau.",
        air: "Trượt nhẹ.",
        voice: "Có giọng (voiced).",
        mistake: "Đọc thành /o/ tiếng Việt hoặc kéo quá cứng.",
        fix: "Bắt đầu nhẹ, kết thúc tròn môi (go = /gəʊ/)."
      },
      {
        symbol: "/ɪə/",
        name: "ia",
        keyword: "ear",
        ipa: "/ɪə/",
        glide: "/ɪ/ → /ə/",
        sentence: "This is my ear.",
        meaning: "tai",
        audioSlot: "AUDIO_SOUND_IA",
        imageSlot: "IMAGE_SLOT_EAR",
        mouthStartSlot: "MOUTH_START_IA",
        mouthEndSlot: "MOUTH_END_IA",
        lips: "Bắt đầu hơi dẹt ở /ɪ/, kết thúc thả lỏng ở /ə/.",
        tongue: "Từ phía trước chuyển về giữa.",
        air: "Nhẹ.",
        voice: "Có giọng (voiced).",
        mistake: "Đọc thành \"ia\" tiếng Việt quá rõ và cứng.",
        fix: "Đọc nhẹ, trượt về âm /ə/ ở cuối (ear = /ɪə/)."
      },
      {
        symbol: "/eə/",
        name: "eơ",
        keyword: "hair",
        ipa: "/heə/",
        glide: "/e/ → /ə/",
        sentence: "This is my hair.",
        meaning: "tóc",
        audioSlot: "AUDIO_SOUND_EA",
        imageSlot: "IMAGE_SLOT_HAIR",
        mouthStartSlot: "MOUTH_START_EA",
        mouthEndSlot: "MOUTH_END_EA",
        lips: "Bắt đầu mở vừa ở /e/, kết thúc thả lỏng ở /ə/.",
        tongue: "Từ phía trước chuyển về giữa.",
        air: "Nhẹ.",
        voice: "Có giọng (voiced).",
        mistake: "Đọc thành /e/ đơn, thiếu phần /ə/.",
        fix: "Sau /e/, thả lỏng miệng về /ə/ (hair = /heə/)."
      },
      {
        symbol: "/ʊə/",
        name: "ua",
        keyword: "tour",
        ipa: "/tʊə/",
        glide: "/ʊ/ → /ə/",
        sentence: "This is a tour.",
        meaning: "chuyến tham quan",
        audioSlot: "AUDIO_SOUND_UA",
        imageSlot: "IMAGE_SLOT_TOUR",
        mouthStartSlot: "MOUTH_START_UA",
        mouthEndSlot: "MOUTH_END_UA",
        lips: "Bắt đầu tròn nhẹ ở /ʊ/, kết thúc thả lỏng ở /ə/.",
        tongue: "Từ phía sau chuyển về giữa.",
        air: "Nhẹ.",
        voice: "Có giọng (voiced).",
        mistake: "Đọc quá nặng như \"ua\" tiếng Việt.",
        fix: "Đọc nhẹ, không kéo quá cứng (tour = /tʊə/)."
      }
    ],
    videos: [
      {
        slot: "VIDEO_SLOT_DIPHTHONGS_INTRO",
        title: "Nguyên âm đôi là gì?",
        desc: "Giải thích khái niệm nguyên âm đôi là âm trượt và cách di chuyển cơ miệng."
      },
      {
        slot: "VIDEO_SLOT_DIPHTHONGS_TO_I",
        title: "Nhóm âm trượt về /ɪ/",
        desc: "Luyện phát âm chi tiết 3 âm trượt về /ɪ/: /eɪ/, /aɪ/, /ɔɪ/ qua các từ say, time, boy."
      },
      {
        slot: "VIDEO_SLOT_DIPHTHONGS_TO_U",
        title: "Nhóm âm trượt về /ʊ/",
        desc: "Luyện phát âm chi tiết 2 âm trượt về /ʊ/: /aʊ/, /əʊ/ qua các từ house, go."
      },
      {
        slot: "VIDEO_SLOT_DIPHTHONGS_TO_SCHWA",
        title: "Nhóm âm trượt về /ə/",
        desc: "Luyện phát âm chi tiết 3 âm trượt về /ə/: /ɪə/, /eə/, /ʊə/ qua các từ ear, hair, tour."
      }
    ],
    audioList: [
      { symbol: "/eɪ/", words: ["say", "day", "name"] },
      { symbol: "/aɪ/", words: ["time", "five", "bike"] },
      { symbol: "/ɔɪ/", words: ["boy", "toy", "coin"] },
      { symbol: "/aʊ/", words: ["house", "now", "cow"] },
      { symbol: "/əʊ/", words: ["go", "no", "home"] },
      { symbol: "/ɪə/", words: ["ear", "near", "clear"] },
      { symbol: "/eə/", words: ["hair", "chair", "bear"] },
      { symbol: "/ʊə/", words: ["tour", "sure", "pure"] }
    ],
    spellingWords: [
      { word: "say", ipa: "/seɪ/", split: ["/s/", "/eɪ/"], glide: "/e/ → /ɪ/", meaning: "nói", sentence: "I say hello." },
      { word: "time", ipa: "/taɪm/", split: ["/t/", "/aɪ/", "/m/"], glide: "/a/ → /ɪ/", meaning: "thời gian", sentence: "It is time." },
      { word: "boy", ipa: "/bɔɪ/", split: ["/b/", "/ɔɪ/"], glide: "/ɔ/ → /ɪ/", meaning: "cậu bé", sentence: "He is a boy." },
      { word: "house", ipa: "/haʊs/", split: ["/h/", "/aʊ/", "/s/"], glide: "/a/ → /ʊ/", meaning: "ngôi nhà", sentence: "This is my house." },
      { word: "go", ipa: "/gəʊ/", split: ["/g/", "/əʊ/"], glide: "/ə/ → /ʊ/", meaning: "đi", sentence: "I go home." },
      { word: "ear", ipa: "/ɪə/", split: ["/ɪə/"], glide: "/ɪ/ → /ə/", meaning: "tai", sentence: "This is my ear." },
      { word: "hair", ipa: "/heə/", split: ["/h/", "/eə/"], glide: "/e/ → /ə/", meaning: "tóc", sentence: "This is my hair." },
      { word: "tour", ipa: "/tʊə/", split: ["/t/", "/ʊə/"], glide: "/ʊ/ → /ə/", meaning: "chuyến tham quan", sentence: "This is a tour." }
    ],
    comparisons: [
      {
        title: "Cặp 1: /eɪ/ vs /aɪ/",
        desc: "Cách trượt từ /e/ vs /a/ sang cùng kết thúc /ɪ/.",
        items: [
          { symbol: "/eɪ/", keyword: "say", ipa: "/seɪ/", glide: "/e/ → /ɪ/" },
          { symbol: "/aɪ/", keyword: "time", ipa: "/taɪm/", glide: "/a/ → /ɪ/" }
        ]
      },
      {
        title: "Cặp 2: /aʊ/ vs /əʊ/",
        desc: "Cách trượt từ /a/ vs /ə/ sang cùng kết thúc tròn môi /ʊ/.",
        items: [
          { symbol: "/aʊ/", keyword: "now", ipa: "/naʊ/", glide: "/a/ → /ʊ/" },
          { symbol: "/əʊ/", keyword: "no", ipa: "/nəʊ/", glide: "/ə/ → /ʊ/" }
        ]
      },
      {
        title: "Cặp 3: /ɪə/ vs /eə/ vs /ʊə/",
        desc: "Các âm cùng kết thúc thả lỏng ở âm /ə/ (schwa).",
        items: [
          { symbol: "/ɪə/", keyword: "ear", ipa: "/ɪə/", glide: "/ɪ/ → /ə/" },
          { symbol: "/eə/", keyword: "hair", ipa: "/heə/", glide: "/e/ → /ə/" },
          { symbol: "/ʊə/", keyword: "tour", ipa: "/tʊə/", glide: "/ʊ/ → /ə/" }
        ]
      }
    ]
  },
  vocabulary: [
    { en: "say", vi: "nói", ipa: "/seɪ/", group: "diphthongsWords", img: "🗣️" },
    { en: "day", vi: "ngày", ipa: "/deɪ/", group: "diphthongsWords", img: "📅" },
    { en: "name", vi: "tên", ipa: "/neɪm/", group: "diphthongsWords", img: "🪪" },
    { en: "time", vi: "thời gian", ipa: "/taɪm/", group: "diphthongsWords", img: "⏰" },
    { en: "five", vi: "số năm", ipa: "/faɪv/", group: "diphthongsWords", img: "5️⃣" },
    { en: "bike", vi: "xe đạp", ipa: "/baɪk/", group: "diphthongsWords", img: "🚲" },
    { en: "boy", vi: "cậu bé", ipa: "/bɔɪ/", group: "diphthongsWords", img: "👦" },
    { en: "toy", vi: "đồ chơi", ipa: "/tɔɪ/", group: "diphthongsWords", img: "🧸" },
    { en: "coin", vi: "tiền xu", ipa: "/kɔɪn/", group: "diphthongsWords", img: "🪙" },
    { en: "house", vi: "ngôi nhà", ipa: "/haʊs/", group: "diphthongsWords", img: "🏠" },
    { en: "now", vi: "bây giờ", ipa: "/naʊ/", group: "diphthongsWords", img: "⏳" },
    { en: "cow", vi: "con bò sữa", ipa: "/kaʊ/", group: "diphthongsWords", img: "🐄" },
    { en: "go", vi: "đi", ipa: "/ɡəʊ/", group: "diphthongsWords", img: "🚶" },
    { en: "no", vi: "không", ipa: "/nəʊ/", group: "diphthongsWords", img: "❌" },
    { en: "home", vi: "nhà / tổ ấm", ipa: "/həʊm/", group: "diphthongsWords", img: "🏡" },
    { en: "ear", vi: "tai", ipa: "/ɪə/", group: "diphthongsWords", img: "👂" },
    { en: "near", vi: "gần", ipa: "/nɪə/", group: "diphthongsWords", img: "📍" },
    { en: "clear", vi: "rõ ràng / trong sạch", ipa: "/klɪə/", group: "diphthongsWords", img: "🧼" },
    { en: "hair", vi: "tóc", ipa: "/heə/", group: "diphthongsWords", img: "💇" },
    { en: "chair", vi: "cái ghế", ipa: "/tʃeə/", group: "diphthongsWords", img: "🪑" },
    { en: "bear", vi: "con gấu", ipa: "/beə/", group: "diphthongsWords", img: "🐻" },
    { en: "tour", vi: "chuyến tham quan", ipa: "/tʊə/", group: "diphthongsWords", img: "🚌" },
    { en: "sure", vi: "chắc chắn", ipa: "/ʃʊə/", group: "diphthongsWords", img: "👍" },
    { en: "pure", vi: "tinh khiết", ipa: "/pjʊə/", group: "diphthongsWords", img: "🧪" }
  ],
  vocabGroups: {
    diphthongsWords: "Từ vựng chứa nguyên âm đôi"
  },
  minitest: [
    { q: "Nguyên âm đôi là gì?", options: ["Âm đọc rất ngắn", "Âm trượt từ âm này sang âm khác trong cùng một âm đọc", "Âm không cần di chuyển khẩu hình"], answer: 1, part: "Phần 1: Khái niệm" },
    { q: "Âm /eɪ/ có thể hiểu là trượt từ:", options: ["/e/ sang /ɪ/", "/a/ sang /ʊ/", "/ʊ/ sang /ə/"], answer: 0, part: "Phần 1: Khái niệm" },
    { q: "/seɪ/ là từ nào?", options: ["say", "see", "sit"], answer: 0, part: "Phần 2: Nhìn IPA chọn từ" },
    { q: "/taɪm/ là từ nào?", options: ["team", "time", "tame"], answer: 1, part: "Phần 2: Nhìn IPA chọn từ" },
    { q: "/bɔɪ/ là từ nào?", options: ["boy", "buy", "bay"], answer: 0, part: "Phần 2: Nhìn IPA chọn từ" },
    { q: "/haʊs/ là từ nào?", options: ["horse", "house", "hair"], answer: 1, part: "Phần 2: Nhìn IPA chọn từ" },
    { q: "Nghe từ 'say'. Chọn nguyên âm chính:", options: ["/eɪ/", "/aɪ/", "/ɔɪ/"], answer: 0, audio: "say", part: "Phần 3: Nghe chọn âm" },
    { q: "Nghe từ 'time'. Chọn nguyên âm chính:", options: ["/eɪ/", "/aɪ/", "/aʊ/"], answer: 1, audio: "time", part: "Phần 3: Nghe chọn âm" },
    { q: "Nghe từ 'house'. Chọn nguyên âm chính:", options: ["/əʊ/", "/aʊ/", "/ʊə/"], answer: 1, audio: "house", part: "Phần 3: Nghe chọn âm" },
    { q: "Nghe từ 'go'. Chọn nguyên âm chính:", options: ["/aʊ/", "/əʊ/", "/eə/"], answer: 1, audio: "go", part: "Phần 3: Nghe chọn âm" }
  ],
  mindmap: {
    type: "structured",
    center: "Diphthongs – Nguyên âm đôi",
    branches: [
      { label: "Khái niệm", items: ["Âm trượt", "Mouth starts shape 1", "Mouth glides to shape 2", "Đọc liền mạch"] },
      { label: "Trượt về /ɪ/", items: ["/eɪ/ (say)", "/aɪ/ (time)", "/ɔɪ/ (boy)"] },
      { label: "Trượt về /ʊ/", items: ["/aʊ/ (house)", "/əʊ/ (go)"] },
      { label: "Trượt về /ə/", items: ["/ɪə/ (ear)", "/eə/ (hair)", "/ʊə/ (tour)"] },
      { label: "Lỗi hay gặp", items: ["Đọc quá ngắn", "Thiếu âm đuôi", "Không trượt khẩu hình"] }
    ]
  },
  homeworkRich: {
    title: "Bài tập về nhà - Buổi 5: Nguyên âm đôi",
    submit: "Nộp file ghi âm qua nhóm lớp Zalo.",
    deadline: "Trước buổi học tiếp theo",
    tasks: [
      {
        title: "Nhiệm vụ 1: Luyện phát âm 8 nguyên âm đôi",
        badge: "Bắt buộc",
        desc: "Nghe và đọc lại mỗi nguyên âm đôi 5 lần thật rõ âm trượt.",
        items: ["/eɪ/", "/aɪ/", "/ɔɪ/", "/aʊ/", "/əʊ/", "/ɪə/", "/eə/", "/ʊə/"]
      },
      {
        title: "Nhiệm vụ 2: Ghi âm 24 từ mẫu",
        badge: "Bắt buộc",
        desc: "Ghi âm đọc to, rõ ràng 24 từ vựng chứa nguyên âm đôi.",
        items: [
          "say, day, name",
          "time, five, bike",
          "boy, toy, coin",
          "house, now, cow",
          "go, no, home",
          "ear, near, clear",
          "hair, chair, bear",
          "tour, sure, pure"
        ]
      },
      {
        title: "Nhiệm vụ 3: Ghi âm 8 câu ngắn",
        badge: "Bắt buộc",
        desc: "Ghi âm đọc 8 câu mẫu chứa các từ có nguyên âm đôi.",
        items: [
          "I say hello.",
          "It is time.",
          "He is a boy.",
          "This is my house.",
          "I go home.",
          "This is my ear.",
          "This is my hair.",
          "This is a tour."
        ]
      },
      {
        title: "Nhiệm vụ 4: So sánh cặp âm dễ nhầm",
        badge: "Khuyến khích",
        desc: "Luyện nghe và đọc phân biệt:",
        items: [
          "/eɪ/ vs /aɪ/ (say vs time)",
          "/aʊ/ vs /əʊ/ (now vs no)",
          "/ɪə/ vs /eə/ vs /ʊə/ (ear vs hair vs tour)"
        ]
      }
    ]
  },
  homework: [
    "Luyện đọc 8 nguyên âm đôi mỗi âm 5 lần.",
    "Ghi âm đọc 24 từ vựng mẫu.",
    "Ghi âm đọc 8 câu mẫu ngắn.",
    "Luyện nói phân biệt các cặp âm dễ nhầm.",
    "Chuẩn bị trước Buổi 6 về Phụ âm bật, âm mũi và âm cuối."
  ]
};
