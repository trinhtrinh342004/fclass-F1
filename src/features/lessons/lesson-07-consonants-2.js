export const lesson07Consonants2 = {
  id: 7,
  lessonNumber: 7,
  dayNumber: 7,
  title: "Âm mũi + L/R + W/Y",
  titleEn: "Âm mũi + L/R + W/Y",
  titleVi: "Âm mũi + L/R + W/Y",
  subtitle: "Sửa các lỗi phát âm phổ biến và luyện âm gió",
  cefrLevel: "A0-A1",
  unit: "ABC & IPA Foundation",
  module: "ABC & IPA Foundation",
  track: "consonants-2",
  slug: "consonants-2-am-gio-va-am-kho-voi-nguoi-viet",
  mainTopic: "Âm mũi + L/R + W/Y",
  estimatedMinutes: 90,
  lessonType: "abc-ipa-foundation",
  status: "ready",
  sectionFlow: [
    "consonants2_intro_fricative",
    "consonants2_voicing",
    "consonants2_pair_f_v",
    "consonants2_pair_s_z",
    "consonants2_pair_th",
    "consonants2_pair_sh_zh",
    "consonants2_pair_ch_j",
    "consonants2_pair_l_r",
    "consonants2_pair_w_j",
    "consonants2_mouth_shapes",
    "consonants2_mouth_videos",
    "consonants2_listen_choose",
    "consonants2_minimal_pairs",
    "consonants2_sentence_reading",
    "consonants2_ai_speaking",
    "consonants2_mini_test",
    "consonants2_mindmap",
    "consonants2_homework"
  ],
  architecture: {
    preserveSectionFlow: true,
    source: "Buổi 7 MD: Âm mũi + L/R + W/Y",
    sourceOfTruth: "Buổi 7 MD"
  },
  metadata: {
    contentImported: true,
    importedFromMd: true,
    hasTodoVideo: false,
    localContentAuthoritative: true,
    sourceLessonIds: [],
    status: {
      content: "ready",
      code: "consonants-2",
      import: "manual"
    }
  },
  objectives: [
    "Hiểu âm gió là gì và vì sao tiếng Anh cần bật hơi rõ.",
    "Phân biệt được âm vô thanh (không rung cổ) và hữu thanh (có rung cổ).",
    "Biết cách đặt môi, răng, lưỡi khi phát âm 15 âm khó: /f/, /v/, /s/, /z/, /θ/, /ð/, /ʃ/, /ʒ/, /tʃ/, /dʒ/, /l/, /r/, /w/, /j/, /h/.",
    "Biết đặt tay lên cổ họng để kiểm tra rung giọng.",
    "Nghe và chọn đúng âm trong các cặp dễ nhầm.",
    "Đọc được từ, cụm từ và câu ngắn chứa âm khó rõ ràng, tự nhiên.",
    "Luyện nói với AI để nhận phản hồi sửa lỗi phát âm ngay lập tức."
  ],
  consonants: {
    sounds: [
      {
        symbol: "/f/",
        name: "f vô thanh",
        keyword: "fan",
        ipa: "/fæn/",
        sentence: "I have five very fine flowers.",
        group: "fricative",
        voicing: "voiceless",
        lips: "Môi dưới chạm răng trên.",
        tongue: "Thả lỏng.",
        teeth: "Môi dưới chạm răng trên.",
        air: "Thổi hơi ra.",
        voice: "Không rung giọng.",
        commonMistake: "Không bật hơi đủ ở /f/.",
        fixTip: "Đầu răng cửa chạm nhẹ môi dưới và thổi hơi.",
        audioSlot: "AUDIO_SOUND_F",
        imageSlot: "IMAGE_SLOT_FAN",
        mouthImageSlot: "MOUTH_SHAPE_F"
      },
      {
        symbol: "/v/",
        name: "v hữu thanh",
        keyword: "van",
        ipa: "/væn/",
        sentence: "The van is very fast.",
        group: "fricative",
        voicing: "voiced",
        lips: "Môi dưới chạm răng trên.",
        tongue: "Thả lỏng.",
        teeth: "Môi dưới chạm răng trên.",
        air: "Thổi hơi ra.",
        voice: "Có rung giọng.",
        commonMistake: "Đọc /v/ thành /d/ hoặc /z/.",
        fixTip: "Giống /f/ nhưng làm cổ họng rung khi đẩy hơi.",
        audioSlot: "AUDIO_SOUND_V",
        imageSlot: "IMAGE_SLOT_VAN",
        mouthImageSlot: "MOUTH_SHAPE_V"
      },
      {
        symbol: "/s/",
        name: "s vô thanh",
        keyword: "see",
        ipa: "/siː/",
        sentence: "She sees six small cats.",
        group: "fricative",
        voicing: "voiceless",
        lips: "Môi hơi kéo ngang.",
        tongue: "Lưỡi gần răng.",
        teeth: "Gần khép.",
        air: "Thổi hơi ra khe răng.",
        voice: "Không rung giọng.",
        commonMistake: "Bỏ âm cuối /s/.",
        fixTip: "Khép răng lại và đẩy hơi như tiếng gió rít.",
        audioSlot: "AUDIO_SOUND_S",
        imageSlot: "IMAGE_SLOT_SEE",
        mouthImageSlot: "MOUTH_SHAPE_S"
      },
      {
        symbol: "/z/",
        name: "z hữu thanh",
        keyword: "zoo",
        ipa: "/zuː/",
        sentence: "The zoo is very busy.",
        group: "fricative",
        voicing: "voiced",
        lips: "Môi hơi kéo ngang.",
        tongue: "Lưỡi gần răng.",
        teeth: "Gần khép.",
        air: "Thổi hơi ra khe răng.",
        voice: "Có rung giọng.",
        commonMistake: "Đọc /z/ giống /s/ hoặc bỏ âm cuối.",
        fixTip: "Giống /s/ nhưng làm cổ họng rung mạnh.",
        audioSlot: "AUDIO_SOUND_Z",
        imageSlot: "IMAGE_SLOT_ZOO",
        mouthImageSlot: "MOUTH_SHAPE_Z"
      },
      {
        symbol: "/θ/",
        name: "th vô thanh",
        keyword: "think",
        ipa: "/θɪŋk/",
        sentence: "I think this is good.",
        group: "fricative",
        voicing: "voiceless",
        lips: "Mở nhẹ.",
        tongue: "Giữa hai răng.",
        teeth: "Cắn nhẹ đầu lưỡi.",
        air: "Thổi hơi ra.",
        voice: "Không rung giọng.",
        commonMistake: "Đọc /θ/ thành /t/ hoặc /s/.",
        fixTip: "Đặt đầu lưỡi chạm nhẹ giữa hai răng rồi thổi hơi ra.",
        audioSlot: "AUDIO_SOUND_TH_VOICELESS",
        imageSlot: "IMAGE_SLOT_THINK",
        mouthImageSlot: "MOUTH_SHAPE_TH_VOICELESS"
      },
      {
        symbol: "/ð/",
        name: "th hữu thanh",
        keyword: "this",
        ipa: "/ðɪs/",
        sentence: "They are my mother and father.",
        group: "fricative",
        voicing: "voiced",
        lips: "Mở nhẹ.",
        tongue: "Giữa hai răng.",
        teeth: "Cắn nhẹ đầu lưỡi.",
        air: "Thổi hơi ra.",
        voice: "Có rung giọng.",
        commonMistake: "Đọc /ð/ thành /d/ hoặc /z/.",
        fixTip: "Đặt đầu lưỡi giữa hai răng và rung giọng khi đẩy hơi.",
        audioSlot: "AUDIO_SOUND_TH_VOICED",
        imageSlot: "IMAGE_SLOT_THIS",
        mouthImageSlot: "MOUTH_SHAPE_TH_VOICED"
      },
      {
        symbol: "/ʃ/",
        name: "sh vô thanh",
        keyword: "she",
        ipa: "/ʃiː/",
        sentence: "She washes the dishes.",
        group: "fricative",
        voicing: "voiceless",
        lips: "Hơi tròn.",
        tongue: "Lưỡi nâng.",
        teeth: "Gần khép.",
        air: "Thổi hơi mạnh ra.",
        voice: "Không rung giọng.",
        commonMistake: "Đọc /ʃ/ thành /s/.",
        fixTip: "Tròn môi, đưa môi ra trước và thổi hơi mạnh (shh).",
        audioSlot: "AUDIO_SOUND_SH",
        imageSlot: "IMAGE_SLOT_SHE",
        mouthImageSlot: "MOUTH_SHAPE_SH"
      },
      {
        symbol: "/ʒ/",
        name: "zh hữu thanh",
        keyword: "usual",
        ipa: "/ˈjuːʒuəl/",
        sentence: "I usually watch television.",
        group: "fricative",
        voicing: "voiced",
        lips: "Hơi tròn.",
        tongue: "Lưỡi nâng.",
        teeth: "Gần khép.",
        air: "Thổi hơi ra.",
        voice: "Có rung giọng.",
        commonMistake: "Đọc giống /ʃ/ hoặc không phát âm rõ.",
        fixTip: "Giống /ʃ/ nhưng rung giọng.",
        audioSlot: "AUDIO_SOUND_ZH",
        imageSlot: "IMAGE_SLOT_USUAL",
        mouthImageSlot: "MOUTH_SHAPE_ZH"
      },
      {
        symbol: "/tʃ/",
        name: "ch vô thanh",
        keyword: "cheap",
        ipa: "/tʃiːp/",
        sentence: "The teacher is in the chair.",
        group: "affricate",
        voicing: "voiceless",
        lips: "Hơi tròn.",
        tongue: "Bật nhanh.",
        teeth: "Gần khép.",
        air: "Bật hơi mạnh.",
        voice: "Không rung giọng.",
        commonMistake: "Nuốt âm cuối hoặc đọc quá nhẹ.",
        fixTip: "Bật mạnh như âm 'ch' nhưng không rung cổ.",
        audioSlot: "AUDIO_SOUND_CH",
        imageSlot: "IMAGE_SLOT_CHEAP",
        mouthImageSlot: "MOUTH_SHAPE_CH"
      },
      {
        symbol: "/dʒ/",
        name: "j hữu thanh",
        keyword: "jeep",
        ipa: "/dʒiːp/",
        sentence: "I like orange juice.",
        group: "affricate",
        voicing: "voiced",
        lips: "Hơi tròn.",
        tongue: "Bật nhanh.",
        teeth: "Gần khép.",
        air: "Bật hơi.",
        voice: "Có rung giọng.",
        commonMistake: "Đọc quá nhẹ hoặc nhầm với /tʃ/.",
        fixTip: "Giống /tʃ/ nhưng rung giọng mạnh.",
        audioSlot: "AUDIO_SOUND_JH",
        imageSlot: "IMAGE_SLOT_JEEP",
        mouthImageSlot: "MOUTH_SHAPE_JH"
      },
      {
        symbol: "/l/",
        name: "l hữu thanh",
        keyword: "light",
        ipa: "/laɪt/",
        sentence: "Please look around the room.",
        group: "liquid",
        voicing: "voiced",
        lips: "Mở nhẹ.",
        tongue: "Chạm sau răng trên.",
        teeth: "Không quan trọng.",
        air: "Hơi đi ra hai bên lưỡi.",
        voice: "Có rung giọng.",
        commonMistake: "Nhầm lẫn giữa /l/ và /r/.",
        fixTip: "Đầu lưỡi chạm hẳn vào chân răng trên để bật âm.",
        audioSlot: "AUDIO_SOUND_L",
        imageSlot: "IMAGE_SLOT_LIGHT",
        mouthImageSlot: "MOUTH_SHAPE_L"
      },
      {
        symbol: "/r/",
        name: "r hữu thanh",
        keyword: "right",
        ipa: "/raɪt/",
        sentence: "I really like rice.",
        group: "liquid",
        voicing: "voiced",
        lips: "Hơi tròn.",
        tongue: "Lưỡi cong nhẹ, không chạm.",
        teeth: "Không chạm.",
        air: "Hơi đi ra tự nhiên.",
        voice: "Có rung giọng.",
        commonMistake: "Nhầm với /l/.",
        fixTip: "Cong lưỡi nhẹ về sau, đầu lưỡi không chạm bất kỳ điểm nào.",
        audioSlot: "AUDIO_SOUND_R",
        imageSlot: "IMAGE_SLOT_RIGHT",
        mouthImageSlot: "MOUTH_SHAPE_R"
      },
      {
        symbol: "/w/",
        name: "w hữu thanh",
        keyword: "we",
        ipa: "/wiː/",
        sentence: "We want water.",
        group: "glide",
        voicing: "voiced",
        lips: "Tròn môi.",
        tongue: "Lưỡi lùi nhẹ.",
        teeth: "Không.",
        air: "Mở nhanh môi.",
        voice: "Có rung giọng.",
        commonMistake: "Đọc giống /v/.",
        fixTip: "Chu tròn môi như nói 'u', rồi mở ra thật nhanh.",
        audioSlot: "AUDIO_SOUND_W",
        imageSlot: "IMAGE_SLOT_WE",
        mouthImageSlot: "MOUTH_SHAPE_W"
      },
      {
        symbol: "/j/",
        name: "y hữu thanh",
        keyword: "yes",
        ipa: "/jes/",
        sentence: "Yes, you are young.",
        group: "glide",
        voicing: "voiced",
        lips: "Mở nhẹ.",
        tongue: "Lưỡi nâng cao.",
        teeth: "Không.",
        air: "Hơi đi ra tự nhiên.",
        voice: "Có rung giọng.",
        commonMistake: "Nhầm với âm 'd' hay 'z'.",
        fixTip: "Khẩu hình giống như nói âm 'i' rồi trượt nhanh.",
        audioSlot: "AUDIO_SOUND_Y",
        imageSlot: "IMAGE_SLOT_YES",
        mouthImageSlot: "MOUTH_SHAPE_Y"
      },
      {
        symbol: "/h/",
        name: "h vô thanh",
        keyword: "he",
        ipa: "/hiː/",
        sentence: "He is hungry.",
        group: "fricative",
        voicing: "voiceless",
        lips: "Mở nhẹ.",
        tongue: "Thả lỏng.",
        teeth: "Không.",
        air: "Hơi nhẹ từ cổ họng.",
        voice: "Không rung giọng.",
        commonMistake: "Bỏ âm /h/ ở đầu từ hoặc đọc quá mạnh.",
        fixTip: "Chỉ hà hơi nhẹ từ cổ họng ra.",
        audioSlot: "AUDIO_SOUND_H",
        imageSlot: "IMAGE_SLOT_HE",
        mouthImageSlot: "MOUTH_SHAPE_H"
      }
    ],
    videos: [
      {
        slot: "VIDEO_SLOT_VOICING_DIFFERENCE",
        title: "Phân biệt âm vô thanh và hữu thanh",
        desc: "Cách đặt tay lên cổ để cảm nhận rung giọng và so sánh f/v, s/z."
      },
      {
        slot: "VIDEO_SLOT_TH_SOUNDS",
        title: "Cách phát âm /θ/ và /ð/",
        desc: "Nhìn trực quan lưỡi cắn nhẹ giữa hai răng, sửa lỗi đọc thành t, d, s, z."
      },
      {
        slot: "VIDEO_SLOT_L_R_DIFFERENCE",
        title: "Phân biệt /l/ và /r/",
        desc: "Sửa lỗi lẫn l/r thông qua vị trí chạm của đầu lưỡi."
      }
    ],
    audioList: [
      { symbol: "/f/", words: ["fan", "fine", "ferry", "safe", "leaf"] },
      { symbol: "/v/", words: ["van", "vine", "very", "save", "leave"] },
      { symbol: "/s/", words: ["sip", "bus", "rice", "price", "seal"] },
      { symbol: "/z/", words: ["zip", "buzz", "rise", "prize", "zeal"] },
      { symbol: "/θ/", words: ["think", "thin", "three", "thank", "mouth"] },
      { symbol: "/ð/", words: ["this", "then", "they", "that", "mother"] },
      { symbol: "/ʃ/", words: ["she", "ship", "shop", "wash", "English"] },
      { symbol: "/ʒ/", words: ["usual", "television", "measure", "vision", "decision"] },
      { symbol: "/tʃ/", words: ["cheap", "choke", "chin", "chair", "teacher"] },
      { symbol: "/dʒ/", words: ["jeep", "joke", "gym", "January", "orange"] },
      { symbol: "/l/", words: ["light", "long", "look", "love"] },
      { symbol: "/r/", words: ["right", "red", "room", "rice"] },
      { symbol: "/w/", words: ["we", "water", "want", "window"] },
      { symbol: "/j/", words: ["yes", "you", "young", "yellow"] },
      { symbol: "/h/", words: ["he", "her", "house", "hello", "hungry"] }
    ],
    comparisons: [
      {
        title: "Cặp 1: /f/ và /v/",
        desc: "Cùng chạm môi răng. /f/ thổi hơi không rung cổ, /v/ thổi hơi rung cổ.",
        items: [
          { symbol: "/f/", keyword: "fan", ipa: "/fæn/", detail: "Không rung cổ họng" },
          { symbol: "/v/", keyword: "van", ipa: "/væn/", detail: "Rung cổ họng" }
        ],
        pairs: [
          { wordA: "fan", ipaA: "/fæn/", wordB: "van", ipaB: "/væn/" },
          { wordA: "fine", ipaA: "/faɪn/", wordB: "vine", ipaB: "/vaɪn/" },
          { wordA: "safe", ipaA: "/seɪf/", wordB: "save", ipaB: "/seɪv/" }
        ]
      },
      {
        title: "Cặp 2: /s/ và /z/",
        desc: "Cùng khe răng. /s/ xì hơi không rung, /z/ xì hơi rung cổ.",
        items: [
          { symbol: "/s/", keyword: "sip", ipa: "/sɪp/", detail: "Không rung cổ họng" },
          { symbol: "/z/", keyword: "zip", ipa: "/zɪp/", detail: "Rung cổ họng" }
        ],
        pairs: [
          { wordA: "sip", ipaA: "/sɪp/", wordB: "zip", ipaB: "/zɪp/" },
          { wordA: "bus", ipaA: "/bʌs/", wordB: "buzz", ipaB: "/bʌz/" },
          { wordA: "rice", ipaA: "/raɪs/", wordB: "rise", ipaB: "/raɪz/" }
        ]
      },
      {
        title: "Cặp 3: /θ/ và /ð/",
        desc: "Lưỡi đặt giữa hai răng. /θ/ thổi hơi không rung, /ð/ rung giọng.",
        items: [
          { symbol: "/θ/", keyword: "think", ipa: "/θɪŋk/", detail: "Không rung cổ họng" },
          { symbol: "/ð/", keyword: "this", ipa: "/ðɪs/", detail: "Rung cổ họng" }
        ],
        pairs: [
          { wordA: "thin", ipaA: "/θɪn/", wordB: "then", ipaB: "/ðen/" },
          { wordA: "three", ipaA: "/θriː/", wordB: "they", ipaB: "/ðeɪ/" }
        ]
      },
      {
        title: "Cặp 4: /l/ và /r/",
        desc: "/l/ chạm răng trên sáng rõ, /r/ cong lưỡi không chạm.",
        items: [
          { symbol: "/l/", keyword: "light", ipa: "/laɪt/", detail: "Lưỡi chạm răng trên" },
          { symbol: "/r/", keyword: "right", ipa: "/raɪt/", detail: "Lưỡi cong lùi sau" }
        ],
        pairs: [
          { wordA: "light", ipaA: "/laɪt/", wordB: "right", ipaB: "/raɪt/" },
          { wordA: "long", ipaA: "/lɒŋ/", wordB: "wrong", ipaB: "/rɒŋ/" },
          { wordA: "low", ipaA: "/ləʊ/", wordB: "row", ipaB: "/rəʊ/" }
        ]
      },
      {
        title: "Cặp 5: /ʃ/ và /ʒ/",
        desc: "Cùng tròn môi và nâng lưỡi. /ʃ/ không rung cổ, /ʒ/ có rung giọng.",
        items: [
          { symbol: "/ʃ/", keyword: "she", ipa: "/ʃiː/", detail: "Không rung cổ họng" },
          { symbol: "/ʒ/", keyword: "usual", ipa: "/ˈjuːʒuəl/", detail: "Rung cổ họng" }
        ],
        pairs: [
          { wordA: "she", ipaA: "/ʃiː/", wordB: "usual", ipaB: "/ˈjuːʒuəl/" },
          { wordA: "ship", ipaA: "/ʃɪp/", wordB: "vision", ipaB: "/ˈvɪʒən/" },
          { wordA: "wash", ipaA: "/wɒʃ/", wordB: "measure", ipaB: "/ˈmeʒə/" }
        ]
      },
      {
        title: "Cặp 6: /tʃ/ và /dʒ/",
        desc: "Cùng bật nhanh ở phía trước miệng. /tʃ/ không rung cổ, /dʒ/ có rung giọng.",
        items: [
          { symbol: "/tʃ/", keyword: "cheap", ipa: "/tʃiːp/", detail: "Không rung cổ họng" },
          { symbol: "/dʒ/", keyword: "jeep", ipa: "/dʒiːp/", detail: "Rung cổ họng" }
        ],
        pairs: [
          { wordA: "cheap", ipaA: "/tʃiːp/", wordB: "jeep", ipaB: "/dʒiːp/" },
          { wordA: "choke", ipaA: "/tʃəʊk/", wordB: "joke", ipaB: "/dʒəʊk/" },
          { wordA: "chin", ipaA: "/tʃɪn/", wordB: "gym", ipaB: "/dʒɪm/" }
        ]
      },
      {
        title: "Cặp 7: /w/ và /j/",
        desc: "/w/ bắt đầu bằng môi tròn; /j/ bắt đầu bằng lưỡi nâng cao như âm y.",
        items: [
          { symbol: "/w/", keyword: "wet", ipa: "/wet/", detail: "Môi tròn rồi mở nhanh" },
          { symbol: "/j/", keyword: "yet", ipa: "/jet/", detail: "Lưỡi nâng cao rồi trượt" }
        ],
        pairs: [
          { wordA: "wet", ipaA: "/wet/", wordB: "yet", ipaB: "/jet/" },
          { wordA: "we", ipaA: "/wiː/", wordB: "ye", ipaB: "/jiː/" },
          { wordA: "west", ipaA: "/west/", wordB: "yes", ipaB: "/jes/" }
        ]
      }
    ]
  },
  vocabulary: [
    { en: "fan", vi: "cái quạt", ipa: "/fæn/", group: "consonants2Words", img: "🪭" },
    { en: "van", vi: "xe tải nhỏ", ipa: "/væn/", group: "consonants2Words", img: "🚐" },
    { en: "sip", vi: "nhấp môi", ipa: "/sɪp/", group: "consonants2Words", img: "☕" },
    { en: "zip", vi: "khoá kéo", ipa: "/zɪp/", group: "consonants2Words", img: "🤐" },
    { en: "think", vi: "suy nghĩ", ipa: "/θɪŋk/", group: "consonants2Words", img: "🧠" },
    { en: "this", vi: "cái này", ipa: "/ðɪs/", group: "consonants2Words", img: "👉" },
    { en: "she", vi: "cô ấy", ipa: "/ʃiː/", group: "consonants2Words", img: "👩" },
    { en: "usual", vi: "thông thường", ipa: "/ˈjuːʒuəl/", group: "consonants2Words", img: "🔄" },
    { en: "cheap", vi: "rẻ", ipa: "/tʃiːp/", group: "consonants2Words", img: "🏷️" },
    { en: "jeep", vi: "xe jeep", ipa: "/dʒiːp/", group: "consonants2Words", img: "🚘" },
    { en: "light", vi: "ánh sáng", ipa: "/laɪt/", group: "consonants2Words", img: "💡" },
    { en: "right", vi: "bên phải/đúng", ipa: "/raɪt/", group: "consonants2Words", img: "➡️" },
    { en: "wet", vi: "ướt", ipa: "/wet/", group: "consonants2Words", img: "💦" },
    { en: "yet", vi: "chưa", ipa: "/jet/", group: "consonants2Words", img: "⏳" },
    { en: "he", vi: "anh ấy", ipa: "/hiː/", group: "consonants2Words", img: "👨" }
  ],
  vocabGroups: {
    consonants2Words: "Từ vựng âm gió & âm khó"
  },
  minitest: [
    {
      q: "Âm nào sau đây là âm vô thanh (không rung cổ)?",
      options: ["/f/", "/v/", "/z/"],
      answer: 0,
      part: "Phần 1: Nghe chọn âm"
    },
    {
      q: "Cách đặt lưỡi chính xác của âm /θ/ và /ð/ là gì?",
      options: [
        "Đầu lưỡi chạm chân răng trên",
        "Đầu lưỡi cắn nhẹ giữa hai răng",
        "Cong lưỡi ra phía sau"
      ],
      answer: 1,
      part: "Phần 1: Nghe chọn âm"
    },
    {
      q: "/θɪŋk/ là từ nào?",
      options: ["sink", "think", "tink"],
      answer: 1,
      part: "Phần 2: Nhìn IPA chọn từ"
    },
    {
      q: "/ʃiː/ là từ nào?",
      options: ["see", "she", "sea"],
      answer: 1,
      part: "Phần 2: Nhìn IPA chọn từ"
    },
    {
      q: "/dʒuːs/ là từ nào?",
      options: ["juice", "choose", "shoes"],
      answer: 0,
      part: "Phần 2: Nhìn IPA chọn từ"
    }
  ],
  mindmap: {
    type: "structured",
    center: "Âm mũi + L/R + W/Y",
    branches: [
      {
        label: "Âm gió (Fricatives)",
        items: ["/f/ fan", "/s/ see", "/θ/ think", "/ʃ/ she", "/h/ he"]
      },
      {
        label: "Cặp Vô thanh/Hữu thanh",
        items: ["/f/ - /v/", "/s/ - /z/", "/θ/ - /ð/", "/ʃ/ - /ʒ/", "/tʃ/ - /dʒ/"]
      },
      {
        label: "Âm khó người Việt",
        items: ["Lưỡi cắn nhẹ (/θ/, /ð/)", "Lưỡi chạm/không chạm (/l/, /r/)", "Môi tròn mở nhanh (/w/)", "Trượt âm (/j/)"]
      },
      {
        label: "Cách luyện tập",
        items: ["Đặt tay lên cổ họng", "Dùng tờ giấy thổi hơi", "Nhìn gương khẩu hình"]
      }
    ]
  },
  homeworkRich: {
    title: "Bài tập về nhà - Buổi 7: Âm mũi + L/R + W/Y",
    submit: "Nộp file ghi âm qua nhóm lớp Zalo.",
    deadline: "Trước buổi học tiếp theo",
    tasks: [
      {
        title: "Nhiệm vụ 1: Luyện âm trước gương",
        badge: "Bắt buộc",
        desc: "Luyện mỗi âm 5 lần trước gương, chú ý răng/môi/lưỡi.",
        items: ["/f/ /v/", "/s/ /z/", "/θ/ /ð/", "/ʃ/ /ʒ/", "/tʃ/ /dʒ/", "/l/ /r/", "/w/ /j/", "/h/"]
      },
      {
        title: "Nhiệm vụ 2: Ghi âm 8 cặp từ tối thiểu (minimal pairs)",
        badge: "Bắt buộc",
        desc: "Đọc to rõ ràng để phân biệt sự khác nhau của các cặp từ.",
        items: ["fan - van", "sip - zip", "think - this", "she - usual", "cheap - jeep", "light - right", "wet - yet", "he - house"]
      },
      {
        title: "Nhiệm vụ 3: Đọc đoạn văn ngắn",
        badge: "Bắt buộc",
        desc: "Ghi âm đoạn văn chú ý phát âm gió và âm khó.",
        items: ["Hello, everyone. Today I practise English pronunciation. I can say /f/ and /v/. I can say 'think' and 'this'. I can read 'light' and 'right'. I will practise every day."]
      }
    ]
  },
  homework: [
    "Luyện phát âm 15 phụ âm trước gương.",
    "Ghi âm 8 cặp từ tối thiểu phân biệt hơi/rung.",
    "Ghi âm đoạn văn ngắn tự giới thiệu.",
    "Chuẩn bị bài tiếp theo Buổi 8: Tổng ôn toàn bộ IPA."
  ]
};
