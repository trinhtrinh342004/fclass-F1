import { lesson04LongVowels } from "../lessons/lesson-04-long-vowels.js";
import { lesson06Consonants1 } from "../lessons/lesson-06-consonants-1.js";
import { lesson08IpaReview } from "../lessons/lesson-08-ipa-review.js";
import { lesson07Consonants2 } from "../lessons/lesson-07-consonants-2.js";

export const IPA_BOOTCAMP_SECTION_FLOW = [
  "ipa_intro",
  "ipa_why",
  "ipa_word_process",
  "ipa_sound_table",
  "ipa_mouth_visual",
  "ipa_video_mouth",
  "ipa_mouth_opening",
  "ipa_audio_samples",
  "ipa_read_symbols",
  "ipa_compare_sounds",
  "ipa_spell_words",
  "ipa_image_sentence",
  "ipa_blend_words",
  "ipa_listen_choose_sound",
  "ipa_self_reading",
  "ipa_sentence_practice",
  "ipa_ai_speaking",
  "ipa_mini_test",
  "ipa_mindmap",
  "ipa_homework",
];

const VIDEO_SLOTS = [
  "VIDEO_SLOT_INTRO_IPA_PROCESS",
  "VIDEO_SLOT_SOUND_I_SHORT",
  "VIDEO_SLOT_SOUND_E",
  "VIDEO_SLOT_SOUND_AE",
  "VIDEO_SLOT_SOUND_CARET",
  "VIDEO_SLOT_SOUND_O_SHORT",
  "VIDEO_SLOT_SOUND_U_SHORT",
];

const LESSON_1_SOUNDS = [
  {
    symbol: "/ɪ/",
    name: "i ngắn",
    word: "sit",
    ipa: "/sɪt/",
    sentence: "I sit.",
    mouth: {
      lips: "môi hơi mở, kéo nhẹ sang hai bên",
      tongue: "lưỡi cao vừa, hơi đưa ra trước",
      teeth: "răng mở hẹp",
      air: "hơi tự nhiên, ngắn",
      voice: "có rung",
      mistake: "đọc quá dài thành /iː/",
    },
  },
  {
    symbol: "/e/",
    name: "e ngắn",
    word: "pen",
    ipa: "/pen/",
    sentence: "This is a pen.",
    mouth: {
      lips: "môi mở vừa, hơi dẹt",
      tongue: "lưỡi ở giữa, đầu lưỡi gần răng dưới",
      teeth: "răng mở vừa",
      air: "hơi tự nhiên",
      voice: "có rung",
      mistake: "đọc thành /æ/ quá mở",
    },
  },
  {
    symbol: "/æ/",
    name: "a bẹt",
    word: "cat",
    ipa: "/kæt/",
    sentence: "This is a cat.",
    mouth: {
      lips: "môi mở rộng",
      tongue: "lưỡi thấp, hơi đưa ra trước",
      teeth: "răng mở rõ",
      air: "hơi tự nhiên",
      voice: "có rung",
      mistake: "đọc thành /e/",
    },
  },
  {
    symbol: "/ʌ/",
    name: "ơ ngắn",
    word: "cup",
    ipa: "/kʌp/",
    sentence: "This is a cup.",
    mouth: {
      lips: "môi thả lỏng",
      tongue: "lưỡi thấp vừa, ở giữa miệng",
      teeth: "răng mở vừa",
      air: "hơi ngắn và nhẹ",
      voice: "có rung",
      mistake: "đọc thành âm /a/ tiếng Việt",
    },
  },
  {
    symbol: "/ɒ/",
    name: "o ngắn",
    word: "dog",
    ipa: "/dɒg/",
    sentence: "This is a dog.",
    mouth: {
      lips: "môi tròn nhẹ",
      tongue: "lưỡi thấp, lùi về sau",
      teeth: "răng mở",
      air: "hơi tự nhiên",
      voice: "có rung",
      mistake: "đọc quá giống /ɔː/",
    },
  },
  {
    symbol: "/ʊ/",
    name: "u ngắn",
    word: "book",
    ipa: "/bʊk/",
    sentence: "This is a book.",
    mouth: {
      lips: "môi tròn nhẹ, không chu quá mạnh",
      tongue: "lưỡi cao vừa, lùi về sau",
      teeth: "răng mở hẹp",
      air: "hơi ngắn",
      voice: "có rung",
      mistake: "đọc thành /uː/ quá dài",
    },
  },
];

const LESSON_1_IMAGES = [
  { word: "sit", ipa: "/sɪt/", sentence: "I sit.", slot: "IMAGE_SLOT_SIT" },
  { word: "pen", ipa: "/pen/", sentence: "This is a pen.", slot: "IMAGE_SLOT_PEN" },
  { word: "cat", ipa: "/kæt/", sentence: "This is a cat.", slot: "IMAGE_SLOT_CAT" },
  { word: "cup", ipa: "/kʌp/", sentence: "This is a cup.", slot: "IMAGE_SLOT_CUP" },
  { word: "dog", ipa: "/dɒg/", sentence: "This is a dog.", slot: "IMAGE_SLOT_DOG" },
  { word: "book", ipa: "/bʊk/", sentence: "This is a book.", slot: "IMAGE_SLOT_BOOK" },
];

const LESSON_1_BLEND_GAME = [
  { sounds: ["/k/", "/æ/", "/t/"], answer: "cat" },
  { sounds: ["/p/", "/e/", "/n/"], answer: "pen" },
  { sounds: ["/k/", "/ʌ/", "/p/"], answer: "cup" },
  { sounds: ["/b/", "/ʊ/", "/k/"], answer: "book" },
];

const LESSON_1_LISTEN_GAME = [
  { audioText: "cat", answer: "/æ/", options: ["/æ/", "/e/", "/ʌ/", "/ʊ/"] },
  { audioText: "pen", answer: "/e/", options: ["/ɪ/", "/e/", "/æ/", "/ɒ/"] },
  { audioText: "cup", answer: "/ʌ/", options: ["/ʌ/", "/ɒ/", "/e/", "/ʊ/"] },
  { audioText: "book", answer: "/ʊ/", options: ["/uː/", "/ɪ/", "/ʊ/", "/ɒ/"] },
];

export const IPA_BOOTCAMP_CURRICULUM_MAP = [
  {
    lessonId: 1,
    topicEnglish: "IPA Foundation – Cách đọc một từ tiếng Anh",
    topicVietnamese: "Nền tảng phát âm cho người mất gốc",
    slug: "ipa-foundation-cach-doc-mot-tu-tieng-anh",
    sourceLessons: [],
    status: "ready",
    notes: "Buổi 1 IPA Foundation thay thế Buổi 1 Alphabet and Nouns cũ.",
  },
  {
    lessonId: 2,
    topicEnglish: "Short vs Long Vowels – Nguyên âm ngắn và dài",
    topicVietnamese: "Phân biệt âm ngắn và âm dài",
    slug: "short-vs-long-vowels",
    sourceLessons: [],
    status: "ready",
    notes: "IPA Bootcamp lesson.",
  },
  {
    lessonId: 3,
    topicEnglish: "Diphthongs – Nguyên âm đôi",
    topicVietnamese: "Học cách đọc âm trượt",
    slug: "diphthongs-nguyen-am-doi",
    sourceLessons: [],
    status: "ready",
    notes: "IPA Bootcamp lesson.",
  },
  {
    lessonId: 4,
    topicEnglish: "Long Vowels – Nguyên âm dài",
    topicVietnamese: "Hiểu dấu /ː/ và biết kéo dài âm đúng cách",
    slug: "long-vowels",
    sourceLessons: [],
    status: "ready",
    notes: "Buổi 4 có structure riêng theo Long Vowels.",
  },
  {
    lessonId: 5,
    topicEnglish: "Fricatives – Âm gió / âm ma sát",
    topicVietnamese: "Phân biệt hơi và rung giọng",
    slug: "fricatives-am-gio-am-ma-sat",
    sourceLessons: [],
    status: "ready",
    notes: "IPA Bootcamp lesson.",
  },
  {
    lessonId: 6,
    topicEnglish: "Consonants 1 – Phụ âm bật, âm mũi, âm cuối",
    topicVietnamese: "Bật âm rõ, không nuốt âm cuối",
    slug: "consonants-1-stop-sounds-and-nasals",
    sourceLessons: [],
    status: "ready",
    notes: "Buổi 6 có structure riêng theo Consonants 1.",
  },
  {
    lessonId: 7,
    topicEnglish: "Consonants 2 – Âm gió và âm khó",
    topicVietnamese: "Phân biệt hơi, rung giọng và sửa âm khó với người Việt",
    slug: "consonants-2-am-gio-va-am-kho-voi-nguoi-viet",
    sourceLessons: [],
    status: "ready",
    notes: "Buổi 7 dùng nội dung chi tiết từ MD Consonants 2.",
  },
  {
    lessonId: 8,
    topicEnglish: "IPA Review – Tổng ôn IPA và đọc từ/câu",
    topicVietnamese: "Tổng ôn 44 âm + đọc từ + đọc câu",
    slug: "ipa-review-tong-on",
    sourceLessons: [],
    status: "ready",
    notes: "IPA Bootcamp review lesson.",
  },
];

export const IPA_BOOTCAMP_LESSONS = [
  createIpaLesson({
    id: 1,
    title: "IPA Foundation – Cách đọc một từ tiếng Anh",
    subtitle: "Nền tảng phát âm cho người mất gốc",
    topic: "Tổng quan IPA + nguyên âm ngắn",
    learningItems: "/ɪ/ /e/ /æ/ /ʌ/ /ɒ/ /ʊ/",
    outcome: "Học sinh hiểu IPA là gì, biết đọc 6 nguyên âm ngắn cơ bản, biết nhìn khẩu hình miệng/lưỡi/răng/môi để bắt chước âm.",
    sectionFlow: IPA_BOOTCAMP_SECTION_FLOW,
    sounds: LESSON_1_SOUNDS,
    videoSlots: VIDEO_SLOTS,
    imageSlots: LESSON_1_IMAGES,
    blendGame: LESSON_1_BLEND_GAME,
    listenChooseGame: LESSON_1_LISTEN_GAME,
    minitest: [
      { q: "IPA giúp em làm gì?", options: ["Nhìn ký hiệu để biết cách đọc", "Dịch văn bản dài", "Học toán", "Viết hoa tên riêng"], answer: 0 },
      { q: "Dấu /ː/ nghĩa là gì?", options: ["kéo dài âm", "đọc nhỏ lại", "bỏ âm cuối", "đọc thật nhanh"], answer: 0 },
      { q: "Từ cat có âm chính nào hôm nay?", options: ["/æ/", "/ʊ/", "/ɒ/", "/ɪ/"], answer: 0 },
      { q: "Từ book có âm chính nào hôm nay?", options: ["/ʊ/", "/e/", "/æ/", "/ʌ/"], answer: 0 },
      { q: "Khi học phát âm cần quan sát gì?", options: ["môi, lưỡi, răng, hơi", "màu bút", "số trang", "chữ viết hoa"], answer: 0 },
    ],
  }),
  createIpaLesson({
    id: 2,
    title: "Short vs Long Vowels – Nguyên âm ngắn và dài",
    subtitle: "Phân biệt âm ngắn và âm dài",
    topic: "Nguyên âm dài",
    learningItems: "/iː/ /uː/ /ɑː/ /ɔː/ /ɜː/",
    outcome: "Học sinh hiểu dấu /ː/ là kéo dài âm, phân biệt được âm ngắn và âm dài.",
  }),
  createIpaLesson({
    id: 3,
    title: "Diphthongs – Nguyên âm đôi",
    subtitle: "Học cách đọc âm trượt",
    topic: "Nguyên âm đôi",
    learningItems: "/eɪ/ /aɪ/ /ɔɪ/ /aʊ/ /əʊ/ /ɪə/ /eə/ /ʊə/",
    outcome: "Học sinh biết đọc các âm trượt như say, time, boy, house, go.",
  }),
  {
    ...lesson04LongVowels,
    id: 4,
    lessonNumber: 4,
    dayNumber: 4,
    slug: "long-vowels",
    module: "ipa-bootcamp",
    topicEnglish: "Long Vowels – Nguyên âm dài",
    topicVietnamese: "Hiểu dấu /ː/ và biết kéo dài âm đúng cách",
  },
  createIpaLesson({
    id: 5,
    title: "Fricatives – Âm gió / âm ma sát",
    subtitle: "Phân biệt hơi và rung giọng",
    topic: "Phụ âm gió / ma sát",
    learningItems: "/f/ /v/ /θ/ /ð/ /s/ /z/ /ʃ/ /ʒ/ /h/",
    outcome: "Học sinh phân biệt s/z, f/v, th hữu thanh/vô thanh, sh và zh.",
  }),
  {
    ...lesson06Consonants1,
    id: 6,
    lessonNumber: 6,
    dayNumber: 6,
    slug: "consonants-1-stop-sounds-and-nasals",
    module: "ipa-bootcamp",
    topicEnglish: "Consonants 1 – Phụ âm bật, âm mũi, âm cuối",
    topicVietnamese: "Bật âm rõ, không nuốt âm cuối",
  },
  createConsonants2Lesson(),
  {
    ...lesson08IpaReview,
    unit: "IPA Bootcamp",
    module: "ipa-bootcamp",
    title: "IPA Review + Word Stress – Tổng ôn IPA và trọng âm",
    titleEn: "IPA Review + Word Stress",
    titleVi: "Tổng ôn IPA và trọng âm",
    topicEnglish: "IPA Review + Word Stress – Tổng ôn IPA và trọng âm",
    topicVietnamese: "Tổng ôn ABC, spelling, IPA, âm cuối và trọng âm cơ bản",
    slug: "ipa-review-tong-on",
    curriculumStatus: "ready",
  },
];

function createIpaLesson({
  id,
  title,
  subtitle,
  topic,
  learningItems,
  outcome,
  sectionFlow = ["ipa_intro", "ipa_sound_table", "ipa_audio_samples", "ipa_self_reading", "ipa_mini_test", "ipa_homework"],
  sounds = createSoundList(learningItems),
  videoSlots = ["VIDEO_SLOT_IPA_PLACEHOLDER"],
  imageSlots = [],
  blendGame = [],
  listenChooseGame = [],
  minitest = createDefaultIpaMinitest(topic),
}){
  return {
    id,
    unit: "IPA Bootcamp",
    title,
    titleEn: title,
    titleVi: subtitle,
    subtitle,
    cefrLevel: "A1",
    mainTopic: topic,
    topicEnglish: title,
    topicVietnamese: subtitle,
    slug: IPA_BOOTCAMP_CURRICULUM_MAP.find((entry) => entry.lessonId === id)?.slug,
    status: {
      content: "ready",
      code: "ipa",
      import: "manual",
    },
    curriculumStatus: "ready",
    module: "ipa-bootcamp",
    sectionFlow,
    objectives: [
      `Chủ đề: ${topic}.`,
      `Học gì: ${learningItems}.`,
      outcome,
    ],
    ipa: {
      topic,
      learningItems,
      outcome,
      sounds,
      videoSlots,
      imageSlots,
      blendGame,
      listenChooseGame,
    },
    vocabulary: sounds.map((sound) => ({
      en: sound.word || sound.symbol,
      vi: sound.name || topic,
      ipa: sound.ipa || sound.symbol,
      example: sound.sentence || "",
      group: "ipaSounds",
    })),
    vocabGroups: {
      ipaSounds: "IPA sounds",
      practiceWords: "Practice words",
    },
    minitest,
    homework: [
      `Đọc lại các âm: ${learningItems}.`,
      "Ghi âm 5 từ mẫu và gửi giáo viên sửa phát âm.",
    ],
    metadata: {
      contentImported: true,
      localContentAuthoritative: true,
      sourceLessonIds: [],
      status: {
        content: "ready",
        code: "ipa",
        import: "manual",
      },
    },
  };
}

function createConsonants2Lesson(){
  const sounds = lesson07Consonants2.consonants.sounds.map((sound) => ({
    ...sound,
    word: sound.keyword,
    mouth: {
      lips: sound.lips,
      tongue: sound.tongue,
      teeth: sound.teeth,
      air: sound.air,
      voice: sound.voice,
      mistake: sound.commonMistake,
      fixTip: sound.fixTip,
    },
  }));
  const comparisons = lesson07Consonants2.consonants.comparisons;

  return {
    ...structuredClone(lesson07Consonants2),
    module: "ipa-bootcamp",
    topicEnglish: "Consonants 2 – Âm gió và âm khó",
    topicVietnamese: "Phân biệt hơi, rung giọng và sửa âm khó với người Việt",
    curriculumStatus: "ready",
    ipa: {
      topic: lesson07Consonants2.mainTopic,
      learningItems: sounds.map((sound) => sound.symbol).join(" "),
      outcome: lesson07Consonants2.objectives.join(" "),
      sounds,
      comparisons,
      videoSlots: lesson07Consonants2.consonants.videos.map((video) => video.slot),
      imageSlots: sounds.map((sound) => ({
        word: sound.word,
        ipa: sound.ipa,
        sentence: sound.sentence,
        slot: sound.imageSlot,
      })),
      blendGame: comparisons.flatMap((comparison) => comparison.pairs).map((pair) => ({
        sounds: [pair.ipaA, pair.ipaB],
        answer: pair.wordA,
      })),
      listenChooseGame: comparisons.flatMap((comparison) => comparison.items.map((item) => ({
          audioText: item.keyword,
          answer: item.symbol,
          options: comparison.items.map((option) => option.symbol),
        }))),
    },
  };
}

function createSoundList(learningItems){
  return String(learningItems)
    .split(/\s+/)
    .filter(Boolean)
    .map((symbol) => ({
      symbol,
      name: "âm IPA",
      word: symbol.replace(/\//g, ""),
      ipa: symbol,
      sentence: `Listen and repeat ${symbol}.`,
      mouth: {
        lips: "quan sát môi theo video mẫu",
        tongue: "đặt lưỡi theo hướng dẫn của giáo viên",
        teeth: "giữ răng mở tự nhiên",
        air: "đẩy hơi đều",
        voice: "kiểm tra rung giọng khi cần",
        mistake: "đọc theo thói quen tiếng Việt",
      },
    }));
}

function createDefaultIpaMinitest(topic){
  return [
    { q: `Bài hôm nay tập trung vào nội dung nào?`, options: [topic, "Past simple", "Possessives", "Capital letters"], answer: 0 },
    { q: "Khi luyện phát âm, bước nào quan trọng nhất?", options: ["Nghe - nhìn khẩu hình - nhắc lại", "Chép 20 lần", "Dịch sang tiếng Việt", "Bỏ âm cuối"], answer: 0 },
    { q: "Nếu chưa có audio thật, em nên dùng gì trong app?", options: ["nút nghe placeholder/TTS", "bỏ qua bài", "đổi bài", "tắt trình duyệt"], answer: 0 },
  ];
}
