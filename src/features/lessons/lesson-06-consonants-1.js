export const lesson06Consonants1 = {
  id: 6,
  lessonNumber: 6,
  dayNumber: 6,
  title: "Âm gió",
  titleEn: "Âm gió",
  titleVi: "Âm gió",
  subtitle: "Bật âm rõ, không nuốt âm cuối",
  cefrLevel: "A0-A1",
  unit: "ABC & IPA Foundation",
  module: "ABC & IPA Foundation",
  track: "consonants-1",
  slug: "consonants-1-stop-sounds-and-nasals",
  mainTopic: "Âm gió",
  estimatedMinutes: 75,
  lessonType: "abc-ipa-foundation",
  status: "ready",
  sectionFlow: [
    "consonants1_consonant_intro",
    "consonants1_stop_intro",
    "consonants1_nasal_intro",
    "consonants1_sound_table",
    "consonants1_mouth_shapes",
    "consonants1_final_sound_intro",
    "consonants1_audio_samples",
    "consonants1_read_ipa",
    "consonants1_cvc_spelling",
    "consonants1_final_sound_practice",
    "consonants1_compare_pairs",
    "consonants1_listen_choose_final",
    "consonants1_sentence_reading",
    "consonants1_ai_speaking",
    "consonants1_mini_test",
    "consonants1_homework"
  ],
  architecture: {
    preserveSectionFlow: true,
    source: "Buổi 6 MD: Âm gió",
    sourceOfTruth: "Buổi 6 MD"
  },
  metadata: {
    contentImported: true,
    importedFromMd: true,
    hasTodoVideo: false,
    localContentAuthoritative: true,
    sourceLessonIds: [],
    status: {
      content: "ready",
      code: "consonants-1",
      import: "manual"
    }
  },
  objectives: [
    "Hiểu phụ âm là gì (âm có điểm chặn hoặc cản hơi).",
    "Biết âm bật là gì (chặn hơi ngắn rồi bật ra).",
    "Biết âm mũi là gì (hơi thoát qua đường mũi).",
    "Nhận biết và đọc đúng 9 phụ âm hôm nay: /p/, /b/, /t/, /d/, /k/, /g/, /m/, /n/, /ŋ/.",
    "Biết phân biệt âm vô thanh (không rung cổ họng) và hữu thanh (có rung).",
    "Khắc phục lỗi nuốt âm cuối (final sounds) phổ biến của người Việt.",
    "Đọc chuẩn từ mẫu: pen, bag, ten, dog, cat, go, man, no, sing.",
    "So sánh phân biệt các cặp âm bật tương ứng: p/b, t/d, k/g.",
    "Ghép âm và đánh vần các từ CVC có âm cuối rõ ràng.",
    "Hoàn thành mini test và luyện nói AI để kiểm tra phát âm."
  ],
  consonants: {
    sounds: [
      {
        symbol: "/p/",
        name: "p vô thanh",
        keyword: "pen",
        ipa: "/pen/",
        sentence: "This is a pen.",
        group: "stop",
        voicing: "voiceless",
        lips: "Hai môi đóng lại rồi bật ra.",
        tongue: "Thả lỏng.",
        teeth: "Hai hàm răng mở tự nhiên sau khi môi bật ra.",
        air: "Bật ra nhẹ.",
        voice: "Không rung giọng.",
        commonMistake: "Nuốt âm /p/ ở cuối từ.",
        fixTip: "Bật nhẹ môi ở cuối từ (cup = /kʌp/).",
        audioSlot: "AUDIO_SOUND_P",
        imageSlot: "IMAGE_SLOT_PEN",
        mouthImageSlot: "MOUTH_SHAPE_P"
      },
      {
        symbol: "/b/",
        name: "b hữu thanh",
        keyword: "bag",
        ipa: "/bæg/",
        sentence: "This is a bag.",
        group: "stop",
        voicing: "voiced",
        lips: "Hai môi đóng lại rồi bật ra.",
        tongue: "Thả lỏng.",
        teeth: "Hai hàm răng mở tự nhiên sau khi môi bật ra.",
        air: "Nhẹ hơn /p/.",
        voice: "Có rung giọng.",
        commonMistake: "Đọc /b/ quá giống /p/.",
        fixTip: "Đặt tay lên cổ để cảm nhận rung giọng (bag = /bæg/).",
        audioSlot: "AUDIO_SOUND_B",
        imageSlot: "IMAGE_SLOT_BAG",
        mouthImageSlot: "MOUTH_SHAPE_B"
      },
      {
        symbol: "/t/",
        name: "t vô thanh",
        keyword: "ten",
        ipa: "/ten/",
        sentence: "I am ten.",
        group: "stop",
        voicing: "voiceless",
        lips: "Mở nhẹ.",
        tongue: "Đầu lưỡi chạm vùng sau răng trên rồi bật ra.",
        teeth: "Răng trên là mốc để đặt đầu lưỡi.",
        air: "Bật ra nhẹ.",
        voice: "Không rung giọng.",
        commonMistake: "Nuốt âm cuối /t/ trong cat.",
        fixTip: "Kết thúc từ bằng một cú bật nhẹ (cat = /kæt/).",
        audioSlot: "AUDIO_SOUND_T",
        imageSlot: "IMAGE_SLOT_TEN",
        mouthImageSlot: "MOUTH_SHAPE_T"
      },
      {
        symbol: "/d/",
        name: "d hữu thanh",
        keyword: "dog",
        ipa: "/dɒg/",
        sentence: "This is a dog.",
        group: "stop",
        voicing: "voiced",
        lips: "Mở nhẹ.",
        tongue: "Đầu lưỡi chạm vùng sau răng trên rồi bật ra.",
        teeth: "Răng trên là mốc để đặt đầu lưỡi.",
        air: "Nhẹ.",
        voice: "Có rung giọng.",
        commonMistake: "Đọc /d/ quá giống /t/.",
        fixTip: "Đặt tay lên cổ, đọc /d/ phải có rung (dog = /dɒg/).",
        audioSlot: "AUDIO_SOUND_D",
        imageSlot: "IMAGE_SLOT_DOG",
        mouthImageSlot: "MOUTH_SHAPE_D"
      },
      {
        symbol: "/k/",
        name: "k vô thanh",
        keyword: "cat",
        ipa: "/kæt/",
        sentence: "This is a cat.",
        group: "stop",
        voicing: "voiceless",
        lips: "Mở.",
        tongue: "Phần sau lưỡi chạm vòm mềm rồi bật ra.",
        teeth: "Hai hàm răng mở tự nhiên.",
        air: "Bật ra ở phía sau miệng.",
        voice: "Không rung giọng.",
        commonMistake: "Nuốt âm /k/ cuối từ như book.",
        fixTip: "Bật nhẹ âm cuối ở phía sau miệng (book = /bʊk/).",
        audioSlot: "AUDIO_SOUND_K",
        imageSlot: "IMAGE_SLOT_CAT",
        mouthImageSlot: "MOUTH_SHAPE_K"
      },
      {
        symbol: "/g/",
        name: "g hữu thanh",
        keyword: "go",
        ipa: "/gəʊ/",
        sentence: "I go home.",
        group: "stop",
        voicing: "voiced",
        lips: "Mở.",
        tongue: "Phần sau lưỡi chạm vòm mềm rồi bật ra.",
        teeth: "Hai hàm răng mở tự nhiên.",
        air: "Nhẹ.",
        voice: "Có rung giọng.",
        commonMistake: "Đọc /g/ quá giống /k/ hoặc bỏ /g/ cuối từ.",
        fixTip: "Có rung giọng khi đọc /g/ (dog = /dɒg/).",
        audioSlot: "AUDIO_SOUND_G",
        imageSlot: "IMAGE_SLOT_GO",
        mouthImageSlot: "MOUTH_SHAPE_G"
      },
      {
        symbol: "/m/",
        name: "m mũi",
        keyword: "man",
        ipa: "/mæn/",
        sentence: "He is a man.",
        group: "nasal",
        voicing: "voiced",
        lips: "Hai môi đóng.",
        tongue: "Thả lỏng.",
        teeth: "Hai hàm răng không chạm nhau.",
        air: "Đi qua mũi.",
        voice: "Có rung giọng.",
        commonMistake: "Mở môi quá sớm.",
        fixTip: "Giữ môi đóng nhẹ khi bắt đầu /m/ (man = /mæn/).",
        audioSlot: "AUDIO_SOUND_M",
        imageSlot: "IMAGE_SLOT_MAN",
        mouthImageSlot: "MOUTH_SHAPE_M"
      },
      {
        symbol: "/n/",
        name: "n mũi",
        keyword: "no",
        ipa: "/nəʊ/",
        sentence: "No, thank you.",
        group: "nasal",
        voicing: "voiced",
        lips: "Mở nhẹ.",
        tongue: "Đầu lưỡi chạm vùng sau răng trên.",
        teeth: "Răng trên là mốc để đặt đầu lưỡi.",
        air: "Đi qua mũi.",
        voice: "Có rung giọng.",
        commonMistake: "Nhầm /n/ với /ŋ/.",
        fixTip: "/n/ dùng đầu lưỡi ở phía trước (no = /nəʊ/).",
        audioSlot: "AUDIO_SOUND_N",
        imageSlot: "IMAGE_SLOT_NO",
        mouthImageSlot: "MOUTH_SHAPE_N"
      },
      {
        symbol: "/ŋ/",
        name: "ng mũi sau",
        keyword: "sing",
        ipa: "/sɪŋ/",
        sentence: "I sing.",
        group: "nasal",
        voicing: "voiced",
        lips: "Mở nhẹ.",
        tongue: "Phần sau lưỡi nâng lên chạm vòm mềm.",
        teeth: "Hai hàm răng mở tự nhiên.",
        air: "Đi qua mũi.",
        voice: "Có rung giọng.",
        commonMistake: "Đọc thêm /g/ thành sing-gờ.",
        fixTip: "Không thêm /g/ nếu IPA chỉ là /ŋ/ (sing = /sɪŋ/).",
        audioSlot: "AUDIO_SOUND_NG",
        imageSlot: "IMAGE_SLOT_SING",
        mouthImageSlot: "MOUTH_SHAPE_NG"
      }
    ],
    videos: [
      {
        slot: "VIDEO_SLOT_CONSONANTS_INTRO",
        title: "Phụ âm là gì?",
        desc: "Tìm hiểu khái niệm phụ âm và sự cản trở luồng hơi trong khoang miệng."
      },
      {
        slot: "VIDEO_SLOT_STOP_SOUNDS_P_B_T_D_K_G",
        title: "Phụ âm bật (Stop sounds)",
        desc: "Hướng dẫn chi tiết khẩu hình và cách bật các âm /p/, /b/, /t/, /d/, /k/, /g/."
      },
      {
        slot: "VIDEO_SLOT_NASAL_SOUNDS_M_N_NG",
        title: "Âm mũi (Nasal sounds)",
        desc: "Hiểu đường đi của hơi qua mũi để đọc chuẩn /m/, /n/, /ŋ/."
      },
      {
        slot: "VIDEO_SLOT_FINAL_SOUND_TRAINER",
        title: "Cách bật âm cuối",
        desc: "Khắc phục lỗi nuốt âm đuôi và cách đọc rõ phụ âm kết thúc từ."
      },
      {
        slot: "VIDEO_SLOT_NG_MOUTH_SHAPE",
        title: "Khẩu hình âm /ŋ/",
        desc: "Hướng dẫn nâng cao phần sau lưỡi chạm vòm mềm, tránh đọc sai thành âm /g/."
      }
    ],
    spellingWords: [
      { word: "pen", ipa: "/pen/", split: ["/p/", "/e/", "/n/"], meaning: "cây bút", sentence: "This is a pen." },
      { word: "bag", ipa: "/bæg/", split: ["/b/", "/æ/", "/g/"], meaning: "cái túi", sentence: "This is a bag." },
      { word: "ten", ipa: "/ten/", split: ["/t/", "/e/", "/n/"], meaning: "số mười", sentence: "I am ten." },
      { word: "dog", ipa: "/dɒg/", split: ["/d/", "/ɒ/", "/g/"], meaning: "con chó", sentence: "This is a dog." },
      { word: "cat", ipa: "/kæt/", split: ["/k/", "/æ/", "/t/"], meaning: "con mèo", sentence: "This is a cat." },
      { word: "man", ipa: "/mæn/", split: ["/m/", "/æ/", "/n/"], meaning: "người đàn ông", sentence: "He is a man." },
      { word: "sun", ipa: "/sʌn/", split: ["/s/", "/ʌ/", "/n/"], meaning: "mặt trời", sentence: "The sun is hot." },
      { word: "sing", ipa: "/sɪŋ/", split: ["/s/", "/ɪ/", "/ŋ/"], meaning: "hát", sentence: "I sing." }
    ],
    audioList: [
      { symbol: "/p/", words: ["pen", "cup", "map"] },
      { symbol: "/b/", words: ["bag", "bed", "cab"] },
      { symbol: "/t/", words: ["ten", "cat", "sit"] },
      { symbol: "/d/", words: ["dog", "bed", "red"] },
      { symbol: "/k/", words: ["cat", "book", "back"] },
      { symbol: "/g/", words: ["go", "dog", "bag"] },
      { symbol: "/m/", words: ["man", "map", "mom"] },
      { symbol: "/n/", words: ["no", "pen", "sun"] },
      { symbol: "/ŋ/", words: ["sing", "king", "long"] }
    ],
    comparisons: [
      {
        title: "Cặp 1: /p/ và /b/",
        desc: "Môi đóng bật giống nhau. /p/ không rung, /b/ rung giọng.",
        items: [
          { symbol: "/p/", keyword: "pen", ipa: "/pen/", detail: "Không rung cổ họng" },
          { symbol: "/b/", keyword: "bag", ipa: "/bæg/", detail: "Rung cổ họng" }
        ],
        pairs: [
          { wordA: "pat", ipaA: "/pæt/", wordB: "bat", ipaB: "/bæt/" },
          { wordA: "cup", ipaA: "/kʌp/", wordB: "cab", ipaB: "/kæb/" }
        ]
      },
      {
        title: "Cặp 2: /t/ và /d/",
        desc: "Đầu lưỡi chạm răng trên. /t/ không rung, /d/ rung giọng.",
        items: [
          { symbol: "/t/", keyword: "ten", ipa: "/ten/", detail: "Không rung cổ họng" },
          { symbol: "/d/", keyword: "dog", ipa: "/dɒg/", detail: "Rung cổ họng" }
        ],
        pairs: [
          { wordA: "ten", ipaA: "/ten/", wordB: "den", ipaB: "/den/" },
          { wordA: "bet", ipaA: "/bet/", wordB: "bed", ipaB: "/bed/" }
        ]
      },
      {
        title: "Cặp 3: /k/ và /g/",
        desc: "Sau lưỡi chặn vòm mềm. /k/ không rung, /g/ rung giọng.",
        items: [
          { symbol: "/k/", keyword: "cat", ipa: "/kæt/", detail: "Không rung cổ họng" },
          { symbol: "/g/", keyword: "go", ipa: "/gəʊ/", detail: "Rung cổ họng" }
        ],
        pairs: [
          { wordA: "cap", ipaA: "/kæp/", wordB: "gap", ipaB: "/gæp/" },
          { wordA: "back", ipaA: "/bæk/", wordB: "bag", ipaB: "/bæg/" }
        ]
      }
    ]
  },
  vocabulary: [
    { en: "pen", vi: "cây bút", ipa: "/pen/", group: "consonantsWords", img: "🖊️" },
    { en: "cup", vi: "cái tách/ly", ipa: "/kʌp/", group: "consonantsWords", img: "🥤" },
    { en: "map", vi: "bản đồ", ipa: "/mæp/", group: "consonantsWords", img: "🗺️" },
    { en: "bag", vi: "cái túi", ipa: "/bæg/", group: "consonantsWords", img: "💼" },
    { en: "bed", vi: "cái giường", ipa: "/bed/", group: "consonantsWords", img: "🛏️" },
    { en: "cab", vi: "xe taxi", ipa: "/kæb/", group: "consonantsWords", img: "🚕" },
    { en: "ten", vi: "số mười", ipa: "/ten/", group: "consonantsWords", img: "🔟" },
    { en: "cat", vi: "con mèo", ipa: "/kæt/", group: "consonantsWords", img: "🐱" },
    { en: "sit", vi: "ngồi", ipa: "/sɪt/", group: "consonantsWords", img: "🪑" },
    { en: "dog", vi: "con chó", ipa: "/dɒg/", group: "consonantsWords", img: "🐶" },
    { en: "red", vi: "màu đỏ", ipa: "/red/", group: "consonantsWords", img: "🔴" },
    { en: "go", vi: "đi", ipa: "/gəʊ/", group: "consonantsWords", img: "🚶" },
    { en: "book", vi: "quyển sách", ipa: "/bʊk/", group: "consonantsWords", img: "📖" },
    { en: "back", vi: "phía sau/lưng", ipa: "/bæk/", group: "consonantsWords", img: "🔙" },
    { en: "man", vi: "người đàn ông", ipa: "/mæn/", group: "consonantsWords", img: "👨" },
    { en: "no", vi: "không", ipa: "/nəʊ/", group: "consonantsWords", img: "❌" },
    { en: "sun", vi: "mặt trời", ipa: "/sʌn/", group: "consonantsWords", img: "☀️" },
    { en: "sing", vi: "hát", ipa: "/sɪŋ/", group: "consonantsWords", img: "🎤" },
    { en: "king", vi: "vua", ipa: "/kɪŋ/", group: "consonantsWords", img: "👑" },
    { en: "long", vi: "dài", ipa: "/lɒŋ/", group: "consonantsWords", img: "📏" }
  ],
  vocabGroups: {
    consonantsWords: "Từ vựng phụ âm & âm đuôi"
  },
  minitest: [
    {
      q: "Phụ âm thường có đặc điểm chính nào khác nguyên âm?",
      options: [
        "Luôn kéo dài hơi cực lâu",
        "Có điểm chặn, điểm bật hoặc điểm cản luồng hơi trong miệng",
        "Không cần dùng tới môi hay lưỡi"
      ],
      answer: 1,
      part: "Phần 1: Khái niệm"
    },
    {
      q: "Âm nào là âm mũi trong tiếng Anh?",
      options: ["/p/", "/t/", "/m/"],
      answer: 2,
      part: "Phần 1: Khái niệm"
    },
    {
      q: "/pen/ là từ nào?",
      options: ["pen", "ten", "den"],
      answer: 0,
      part: "Phần 2: Nhìn IPA chọn từ"
    },
    {
      q: "/bæg/ là từ nào?",
      options: ["back", "bag", "big"],
      answer: 1,
      part: "Phần 2: Nhìn IPA chọn từ"
    },
    {
      q: "/sɪŋ/ là từ nào?",
      options: ["sin", "sing", "sit"],
      answer: 1,
      part: "Phần 2: Nhìn IPA chọn từ"
    },
    {
      q: "Nghe từ và chọn âm cuối: 'cap'",
      options: ["/p/", "/t/", "/b/"],
      answer: 0,
      audio: "cap",
      part: "Phần 3: Nghe chọn âm cuối"
    },
    {
      q: "Nghe từ và chọn âm cuối: 'cat'",
      options: ["/p/", "/t/", "/d/"],
      answer: 1,
      audio: "cat",
      part: "Phần 3: Nghe chọn âm cuối"
    },
    {
      q: "Nghe từ và chọn âm cuối: 'bag'",
      options: ["/k/", "/g/", "/ŋ/"],
      answer: 1,
      audio: "bag",
      part: "Phần 3: Nghe chọn âm cuối"
    },
    {
      q: "Nghe từ và chọn âm cuối: 'sing'",
      options: ["/n/", "/ŋ/", "/g/"],
      answer: 1,
      audio: "sing",
      part: "Phần 3: Nghe chọn âm cuối"
    }
  ],
  homeworkRich: {
    title: "Bài tập về nhà - Buổi 6: Âm gió",
    submit: "Nộp file ghi âm qua nhóm lớp Zalo.",
    deadline: "Trước buổi học tiếp theo",
    tasks: [
      {
        title: "Nhiệm vụ 1: Luyện phát âm 9 phụ âm",
        badge: "Bắt buộc",
        desc: "Nghe và đọc lại mỗi âm 5 lần thật rõ điểm chặn/bật.",
        items: ["/p/", "/b/", "/t/", "/d/", "/k/", "/g/", "/m/", "/n/", "/ŋ/"]
      },
      {
        title: "Nhiệm vụ 2: Đọc 18 từ vựng mẫu",
        badge: "Bắt buộc",
        desc: "Ghi âm đọc to rõ các từ có bật âm cuối rõ ràng.",
        items: [
          "pen, cup, map",
          "bag, bed, cab",
          "ten, cat, sit",
          "dog, red, go",
          "book, back",
          "man, no, sun, sing"
        ]
      },
      {
        title: "Nhiệm vụ 3: Đọc cặp âm cuối phân biệt",
        badge: "Bắt buộc",
        desc: "Đọc to các cặp/bộ từ tối thiểu để làm nổi bật âm đuôi khác nhau.",
        items: [
          "cap - cat - cab",
          "back - bag",
          "sin - sing",
          "ten - den",
          "pat - bat"
        ]
      },
      {
        title: "Nhiệm vụ 4: Đọc 8 câu mẫu",
        badge: "Bắt buộc",
        desc: "Đọc trôi chảy câu ngắn chú ý bật phụ âm đuôi.",
        items: [
          "This is a pen.",
          "This is a bag.",
          "I am ten.",
          "This is a dog.",
          "This is a cat.",
          "I go home.",
          "He is a man.",
          "I sing."
        ]
      },
      {
        title: "Nhiệm vụ 5: Chuẩn bị buổi sau",
        badge: "Làm trước",
        desc: "Xem trước Buổi 7: Âm mũi + L/R + W/Y.",
        items: [
          "/f/ và /v/ khác nhau ở độ rung.",
          "/s/ và /z/ khác nhau ở độ rung.",
          "/θ/ và /ð/ cần đặt đầu lưỡi giữa răng."
        ]
      }
    ]
  },
  homework: [
    "Nghe và đọc lại 9 phụ âm hôm nay mỗi âm 5 lần.",
    "Ghi âm đọc 18 từ vựng chứa âm bật, âm mũi.",
    "Ghi âm đọc các cặp âm cuối: cap - cat - cab, back - bag, sin - sing.",
    "Ghi âm đọc 8 câu luyện tập trong buổi học.",
    "Chuẩn bị bài học Buổi 7: Âm mũi + L/R + W/Y."
  ]
};
