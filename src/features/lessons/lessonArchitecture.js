// Canonical lesson architecture for Gateway A1 lessons.

export const LESSON_ARCHITECTURE_VERSION = "lessonArchitectureV1";
export const LESSON_PLACEHOLDER = "Cần bổ sung nội dung theo template Buổi 9";

export const canonicalLessonSections = [
  "intro",
  "review",
  "video",
  "vocab",
  "vocab_match",
  "listen_pick",
  "grammar",
  "listen_quiz",
  "translate",
  "dialogue_video",
  "dialogue_video_quiz",
  "dialogue_video_order",
  "speaking",
  "minitest",
  "mindmap",
  "homework"
];

export const lessonSectionFlowOverrides = {
  1: {
    source: "Buổi 1 Alphabet Foundation",
    sectionFlow: [
      "alphabet_song",
      "alphabet_group_ag",
      "alphabet_group_hn",
      "alphabet_group_ou",
      "alphabet_group_vz",
      "alphabet_cards",
      "alphabet_vowels",
      "alphabet_listen_choose",
      "alphabet_image_guess",
      "alphabet_missing",
      "alphabet_quick_read",
      "alphabet_spell_name",
      "alphabet_split_word",
      "alphabet_icon_read",
      "alphabet_teacher_challenge",
      "alphabet_starfall",
      "alphabet_chill"
    ]
  },
  31: {
    source: "Buổi 31 MD",
    sectionFlow: [
      "intro",
      "vocab",
      "grammar",
      "translate",
      "speaking",
      "minitest",
      "mindmap",
      "homework"
    ],
    skipSections: [
      "review",
      "video",
      "vocab_match",
      "listen_pick",
      "listen_quiz",
      "dialogue_video",
      "dialogue_video_quiz",
      "dialogue_video_order",
      "story",
      "dictation",
      "writing",
      "sprint",
      "listen_choose",
      "sent_order",
      "role_play"
    ],
    suppressSectionData: [
      "review",
      "video",
      "listenPick",
      "listening",
      "dialogueVideo",
      "sentenceOrder",
      "listenChoose",
      "rolePlay",
      "minitest_videos"
    ]
  }
};

export const lessonArchitectureV1 = {
  version: LESSON_ARCHITECTURE_VERSION,
  placeholder: LESSON_PLACEHOLDER,
  canonicalLessonSections,
  requiredCounts: {
    reviewListenChoose: 20,
    reviewQuizBomb: 20,
    flashcardTabs: 2,
    listenPick: 20,
    listeningQuiz: 20,
    translation: 20,
    dialogueListen: 10,
    speakingPrompts: 5,
    minitest: 20,
    homeworkTasks: 2
  }
};

/**
 * @typedef {Object} QuizQuestion
 * @property {string} q
 * @property {string[]} options
 * @property {number} answer
 * @property {string=} audio
 * @property {string=} explanation
 */

/**
 * @typedef {Object} Flashcard
 * @property {string} en
 * @property {string} vi
 * @property {string=} ipa
 * @property {string=} img
 * @property {string=} example
 * @property {string=} group
 */

/**
 * @typedef {Object} DialogueLine
 * @property {string} speaker
 * @property {string} en
 * @property {string} vi
 * @property {string=} keyword
 * @property {string=} audioText
 */

/**
 * @typedef {Object} SpeakingPrompt
 * @property {number|string} id
 * @property {{textEn:string,textVn?:string,audioUrl?:string}} ai
 * @property {{formula:string,sampleEn:string,sampleVn?:string,sampleAudioUrl?:string,criteria?:string[]}} user
 */

/**
 * @typedef {Object} HomeworkTask
 * @property {string} title
 * @property {string} desc
 * @property {string[]=} items
 * @property {string=} badge
 * @property {string=} sample
 * @property {string=} rubric
 */

/**
 * @typedef {Object} LessonSection
 * @property {string} id
 * @property {string} title
 * @property {boolean=} optional
 */

/**
 * @typedef {Object} Lesson
 * @property {number} id
 * @property {string} title
 * @property {string[]} sectionFlow
 * @property {Object} metadata
 */

/**
 * Normalize one raw lesson into the Buoi 9 architecture.
 *
 * @param {Object} rawLesson
 * @param {Object|null=} previousLesson
 * @returns {Lesson}
 */
export function normalizeLessonToBuoi9Architecture(rawLesson={}, previousLesson=null){
  const lesson = { ...rawLesson };
  const id = Number(lesson.id || lesson.lessonNumber || lesson.dayNumber || 0);
  lesson.id = id;
  lesson.unit = lesson.unit || inferUnit(id);
  lesson.title = lesson.title || lesson.titleVi || `${LESSON_PLACEHOLDER} - Buổi ${id || "?"}`;
  lesson.subtitle = lesson.titleEn || lesson.subtitle || lesson.mainTopic || "";
  lesson.objectives = normalizeObjectives(lesson.learningObjectives || lesson.objectives);

  lesson.metadata = normalizeMetadata(lesson);
  lesson.status = lesson.metadata.status;
  const appendedSections = Array.isArray(rawLesson.appendSections)
    ? rawLesson.appendSections.filter(Boolean)
    : [];
  lesson.sectionFlow = [...canonicalLessonSections, ...appendedSections];
  lesson.skipSections = [];
  lesson.architecture = {
    version: LESSON_ARCHITECTURE_VERSION,
    normalizedAt: "build-time",
    sourceOfTruth: "Buổi 9",
    ...(appendedSections.length ? { sectionFlowExtension: appendedSections } : {})
  };

  lesson.review = normalizeReview(lesson, previousLesson);
  lesson.video = normalizeVideo(lesson.video, lesson);
  const vocabBundle = normalizeVocabulary(lesson);
  lesson.vocabulary = vocabBundle.vocabulary;
  lesson.vocabGroups = vocabBundle.vocabGroups;
  lesson.matchAll = lesson.matchAll ?? true;
  lesson.matchDefaultGroup = lesson.matchDefaultGroup || null;
  lesson.listenPickAll = lesson.listenPickAll ?? true;
  lesson.listenPick = normalizeListenPick(lesson, lesson.vocabulary);
  lesson.grammar = normalizeGrammar(lesson.grammar, lesson);
  lesson.listening = normalizeListening(lesson.listening, lesson);
  lesson.translation = normalizeTranslation(lesson.translation, lesson);
  lesson.dialogueVideo = normalizeDialogueVideo(lesson.dialogueVideo, lesson);
  lesson.speaking = normalizeSpeaking(lesson.speaking, lesson);
  lesson.minitest = normalizeMinitest(lesson.minitest, lesson);
  lesson.mindmap = normalizeMindmap(lesson.mindmap, lesson);
  lesson.homeworkRich = normalizeHomeworkRich(lesson.homeworkRich, lesson.homework, lesson);
  lesson.homework = normalizeHomeworkList(lesson.homework, lesson.homeworkRich);
  lesson.extensionSections = collectExtensionSections(rawLesson);
  lesson.technicalNotes = normalizeTechnicalNotes(rawLesson);
  applyLessonSectionFlowOverride(lesson);
  lesson.__architectureWarnings = validateLessonArchitecture(lesson);

  return lesson;
}

export function createPlaceholderLesson(id){
  return {
    id,
    unit: inferUnit(id),
    title: `${LESSON_PLACEHOLDER} - Buổi ${id}`,
    subtitle: "Lesson Architecture Template",
    objectives: [LESSON_PLACEHOLDER],
    __placeholderLesson: true
  };
}

export function ensureLessonRange(rawLessons, total=31){
  const byId = new Map((rawLessons || []).map(lesson => [Number(lesson.id), lesson]));
  const lessons = [];
  for(let id=1; id<=total; id++){
    lessons.push(byId.get(id) || createPlaceholderLesson(id));
  }
  return lessons;
}

export function validateLessonArchitecture(lesson){
  const warnings = [];
  const activeSections = new Set(lesson.sectionFlow || canonicalLessonSections);
  const hasCustomFlow = Boolean(
    lesson.architecture?.sectionFlowOverride ||
    lesson.architecture?.sectionFlowExtension
  );
  const isActive = section => activeSections.has(section);
  const countReal = arr => (arr || []).filter(item => !item?.__placeholder).length;
  const requireCount = (label, arr, required) => {
    const actual = countReal(arr);
    if(actual < required) warnings.push(`${label}: cần ${required}, hiện có ${actual}`);
  };

  if(!lesson.metadata) warnings.push("metadata: thiếu metadata đầu bài");
  if(!sameArray(lesson.sectionFlow, canonicalLessonSections) && !hasCustomFlow){
    warnings.push("sectionFlow: không khớp canonicalLessonSections");
  }
  if(isActive("review")){
    requireCount("review Game 1 Nghe chọn từ", lesson.review?.reviewGames?.vocabulary, 20);
    requireCount("review Game 2 Quiz Bomb", lesson.review?.reviewGames?.quizBomb?.questions, 20);
  }
  if(isActive("vocab") && Object.keys(lesson.vocabGroups || {}).length < 2){
    warnings.push("flashcard tabs: cần ít nhất 2 tab");
  }
  if(isActive("listen_pick")) requireCount("Listening Quiz Nghe chọn từ", lesson.listenPick?.questions, 20);
  if(isActive("listen_quiz")) requireCount("Nghe trả lời", lesson.listening?.questions, 20);
  if(isActive("grammar")){
    const realStructures = countReal(lesson.grammar?.structures);
    if(realStructures < 4) warnings.push(`grammar structures: cần 4-5, hiện có ${realStructures}`);
  }
  if(isActive("translate")) requireCount("Luyện dịch", lesson.translation?.sentences, 20);
  if(isActive("dialogue_video")){
    const bilingualLines = (lesson.dialogueVideo?.transcript || [])
      .filter(line => !line.__placeholder && line.en && line.vi).length;
    if(bilingualLines < 1) warnings.push("dialogue transcript: thiếu transcript song ngữ");
  }
  if(isActive("dialogue_video_quiz")) {
    requireCount("Nghe chọn thoại", lesson.dialogueVideo?.listenPickLine, contentCount(lesson, "dialogueListen", 10));
  }
  if(isActive("dialogue_video_order")){
    const clozeCount = countReal(lesson.dialogueVideo?.fillConversation);
    if(clozeCount < 1) warnings.push("Điền hội thoại: cần ít nhất 1 dialogue cloze");
  }
  if(isActive("speaking")) requireCount("Luyện nói AI", lesson.speaking?.turns, 5);
  if(isActive("minitest")) requireCount("Minitest", lesson.minitest, contentCount(lesson, "minitest", 20));
  if(isActive("mindmap") && (!lesson.mindmap || lesson.mindmap.__placeholder)) warnings.push("mindmap: thiếu nội dung mindmap");
  if(isActive("homework")){
    const homeworkCount = countReal(lesson.homeworkRich?.tasks);
    if(homeworkCount < 2) warnings.push(`homework: cần ít nhất 2 task, hiện có ${homeworkCount}`);
  }
  return warnings;
}

export function canonicalSectionIdFromHeading(heading=""){
  const normalized = stripAccents(String(heading).toLowerCase())
    .replace(/^#+\s*/, "")
    .replace(/^\d+[\.)-]?\s*/, "")
    .replace(/\s+/g, " ")
    .trim();
  const aliases = [
    ["intro", ["muc tieu bai hoc", "objectives", "learning objectives", "meta", "metadata"]],
    ["review", ["on bai cu", "review"]],
    ["video", ["gioi thieu video", "video gioi thieu", "intro video"]],
    ["vocab", ["tu vung", "tu vung flashcard", "flashcard", "vocabulary", "vocab"]],
    ["vocab_match", ["ghep tu", "matching game", "matching"]],
    ["listen_pick", ["nghe chon tu", "listening quiz"]],
    ["grammar", ["ngu phap", "grammar"]],
    ["listen_quiz", ["nghe tra loi", "listen answer", "listening comprehension", "listening"]],
    ["translate", ["luyen dich", "viet anh anh viet", "viet -> anh", "anh -> viet", "translation"]],
    ["dialogue_video", ["video hoi thoai", "dialogue video"]],
    ["dialogue_video_quiz", ["nghe chon thoai", "dialogue listening"]],
    ["dialogue_video_order", ["dien hoi thoai", "dialogue cloze"]],
    ["speaking", ["luyen noi ai", "speaking ai", "speaking"]],
    ["minitest", ["minitest", "mini test"]],
    ["mindmap", ["mindmap", "so do tu duy"]],
    ["homework", ["bai tap ve nha", "homework"]],
    ["technical_notes", ["ghi chu ky thuat", "web import", "technical notes"]]
  ];
  const found = aliases.find(([, names]) => names.some(name => normalized.includes(name)));
  return found ? found[0] : null;
}

function normalizeMetadata(lesson){
  const titleVi = lesson.titleVi || lesson.title || LESSON_PLACEHOLDER;
  const titleEn = lesson.titleEn || lesson.subtitle || titleVi;
  const grammarFocus = lesson.grammarFocus || lesson.grammar?.title || lesson.grammar?.formula || LESSON_PLACEHOLDER;
  const mainTopic = lesson.mainTopic || lesson.topic || lesson.title || LESSON_PLACEHOLDER;
  return {
    ...(lesson.metadata || {}),
    lessonNumber: lesson.lessonNumber || lesson.id,
    dayNumber: lesson.dayNumber || lesson.id,
    titleVi,
    titleEn,
    cefrLevel: lesson.cefrLevel || "A1",
    mainTopic,
    grammarFocus,
    learningObjectives: normalizeObjectives(lesson.learningObjectives || lesson.objectives),
    status: normalizeStatus(lesson)
  };
}

function normalizeStatus(lesson){
  if(lesson.status && typeof lesson.status === "object") {
    return {
      code: lesson.status.code || LESSON_ARCHITECTURE_VERSION,
      content: lesson.status.content || inferContentStatus(lesson),
      import: lesson.status.import || lesson.status.importStatus || "manual"
    };
  }
  return {
    code: LESSON_ARCHITECTURE_VERSION,
    content: typeof lesson.status === "string" ? lesson.status : inferContentStatus(lesson),
    import: lesson.importStatus || lesson.importedFrom || "manual"
  };
}

function inferContentStatus(lesson){
  if(lesson.__placeholderLesson) return "placeholder";
  const hasExpandedContent = lesson.review?.reviewGames || lesson.dialogueVideo || lesson.translation || lesson.listenPick;
  return hasExpandedContent ? "ready" : "partial";
}

function normalizeObjectives(objectives){
  const list = Array.isArray(objectives) ? objectives.filter(Boolean) : [];
  return list.length ? list : [LESSON_PLACEHOLDER];
}

function normalizeReview(lesson, previousLesson){
  const review = { ...(lesson.review || {}) };
  const prevVocab = previousLesson?.vocabulary || lesson.vocabulary || [];
  const prevQuestions = previousLesson?.minitest || previousLesson?.listening?.questions || [];
  const existingGames = review.reviewGames || {};
  const vocabulary = fillToCount(
    normalizeReviewVocabulary(existingGames.vocabulary || review.vocabulary || [], prevVocab),
    20,
    i => reviewVocabFromSource(prevVocab, i)
  );
  const quizBombQuestions = fillToCount(
    normalizeQuizQuestions(existingGames.quizBomb?.questions || review.quizBomb?.questions || [], "Ôn bài cũ"),
    20,
    i => reviewQuizFromSource(prevQuestions, prevVocab, i)
  );
  return {
    ...review,
    title: review.title || `Ôn bài cũ - Buổi ${Math.max(1, lesson.id - 1)}`,
    topic: review.topic || previousLesson?.title || LESSON_PLACEHOLDER,
    recallStructure: review.recallStructure || review.structures || previousLesson?.grammar?.structures?.map(s => s.pattern) || [LESSON_PLACEHOLDER],
    reviewGames: {
      title: existingGames.title || review.title || "Ôn bài cũ",
      intro: existingGames.intro || review.intro || "Ôn lại từ vựng và cấu trúc của buổi trước.",
      vocabulary,
      quizBomb: {
        title: existingGames.quizBomb?.title || "Quiz Bomb",
        instruction: existingGames.quizBomb?.instruction || "Chọn đáp án đúng trước khi hết giờ.",
        questions: quizBombQuestions
      }
    }
  };
}

function normalizeReviewVocabulary(items, sourceVocab){
  const vocabByEnglish = buildVocabularyIndex(sourceVocab);
  return (items || []).map((item, i) => {
    const source = vocabByEnglish.get(normalizeEnglishKey(item.en || item.word)) || sourceVocab[i] || {};
    const en = item.en || item.word || source.en || LESSON_PLACEHOLDER;
    const vi = item.vi || item.meaningVi || source.vi || LESSON_PLACEHOLDER;
    const options = normalizeOptions(item.options, item.answer, vi, sourceVocab.map(v => v.vi));
    return {
      ...item,
      en,
      vi,
      img: item.img || item.emoji || source.img || "🎧",
      ipa: item.ipa || item.phonetic || source.ipa || source.phonetic || "",
      options,
      answer: options.indexOf(vi) >= 0 ? options.indexOf(vi) : (Number.isInteger(item.answer) ? item.answer : 0)
    };
  });
}

function reviewVocabFromSource(sourceVocab, i){
  const source = sourceVocab[i % Math.max(1, sourceVocab.length)] || {};
  if(source.en && source.vi){
    const options = normalizeOptions([], 0, source.vi, sourceVocab.map(v => v.vi));
    return {
      en: source.en,
      vi: source.vi,
      img: source.img || "🎧",
      ipa: source.ipa || "",
      options,
      answer: options.indexOf(source.vi)
    };
  }
  return placeholderReviewVocab(i);
}

function placeholderReviewVocab(i){
  return {
    en: `${LESSON_PLACEHOLDER} ${i + 1}`,
    vi: LESSON_PLACEHOLDER,
    img: "🎧",
    ipa: "",
    options: [LESSON_PLACEHOLDER, "A", "B", "C"],
    answer: 0,
    __placeholder: true
  };
}

function normalizeEnglishKey(text){
  return String(text || "").trim().toLowerCase();
}

function buildVocabularyIndex(vocabulary=[]){
  const index = new Map();
  for(const item of vocabulary || []){
    const key = normalizeEnglishKey(item?.en || item?.word);
    if(key && !index.has(key)) index.set(key, item);
  }
  return index;
}

function reviewQuizFromSource(sourceQuestions, sourceVocab, i){
  const q = sourceQuestions[i % Math.max(1, sourceQuestions.length)];
  if(q?.q && q?.options?.length){
    return normalizeQuizQuestion(q, i, "Ôn bài cũ");
  }
  const vocab = sourceVocab[i % Math.max(1, sourceVocab.length)];
  if(vocab?.en && vocab?.vi){
    const options = normalizeOptions([], 0, vocab.vi, sourceVocab.map(v => v.vi));
    return {
      q: `${vocab.en} nghĩa là gì?`,
      options,
      answer: options.indexOf(vocab.vi),
      explanation: `${vocab.en} = ${vocab.vi}`
    };
  }
  return placeholderQuizQuestion(i, "Ôn bài cũ");
}

function normalizeVideo(video, lesson){
  const source = video || {};
  const videos = Array.isArray(source.videos) && source.videos.length
    ? source.videos.map((item, i) => normalizeVideoItem(item, lesson, i))
    : null;
  const base = normalizeVideoItem(source, lesson, 0);
  if(videos) {
    return {
      ...source,
      title: source.title || lesson.title,
      description: source.description || base.description,
      duration: source.duration || videos[0]?.duration || "2-5 phút",
      sceneSummary: source.sceneSummary || "cảnh chính",
      videos,
      questions: fillToCount(normalizeQuizQuestions(source.questions || [], "Video"), 4, i => placeholderQuizQuestion(i, "Video"))
    };
  }
  return {
    ...base,
    questions: fillToCount(normalizeQuizQuestions(source.questions || [], "Video"), 4, i => placeholderQuizQuestion(i, "Video"))
  };
}

function normalizeVideoItem(item={}, lesson, index){
  const title = item.title || lesson.title || LESSON_PLACEHOLDER;
  const query = encodeURIComponent(`${title} English lesson`);
  const fallbackSearchUrl = item.fallbackSearchUrl || `https://www.youtube.com/results?search_query=${query}`;
  const watchUrl = item.watchUrl || item.sourceUrl || item.url || item.embedUrl || fallbackSearchUrl;
  return {
    ...item,
    title,
    channel: item.channel || item.source || "YouTube",
    duration: item.duration || "2-5 phút",
    embedUrl: item.embedUrl || item.url || "",
    watchUrl,
    fallbackSearchUrl,
    description: item.description || LESSON_PLACEHOLDER,
    sceneSummary: item.sceneSummary || `cảnh chính trong video ${index + 1}`,
    scenes: Array.isArray(item.scenes) && item.scenes.length ? item.scenes : [{ label: LESSON_PLACEHOLDER, __placeholder: true }]
  };
}

function normalizeVocabulary(lesson){
  let vocabulary = (lesson.vocabulary || lesson.videoVocabulary || []).map(normalizeFlashcard);
  if(!vocabulary.length){
    vocabulary = [placeholderFlashcard(0, "mainVocabulary"), placeholderFlashcard(1, "lessonPhrases")];
  }
  const originalGroups = lesson.vocabGroups || {};
  let groupKeys = Object.keys(originalGroups);
  if(groupKeys.length < 2){
    const split = Math.ceil(vocabulary.length / 2);
    vocabulary = vocabulary.map((card, i) => ({
      ...card,
      group: i < split ? "mainVocabulary" : "lessonPhrases"
    }));
    return {
      vocabulary,
      vocabGroups: {
        mainVocabulary: originalGroups[groupKeys[0]] || "Từ vựng chính của bài",
        lessonPhrases: "Expressions / dialogue keywords / grammar phrases"
      }
    };
  }
  vocabulary = vocabulary.map((card, i) => {
    const group = card.group && originalGroups[card.group] ? card.group : groupKeys[i % groupKeys.length];
    return { ...card, group };
  });
  return {
    vocabulary,
    vocabGroups: groupKeys.reduce((acc, key) => {
      acc[key] = originalGroups[key];
      return acc;
    }, {})
  };
}

function normalizeFlashcard(card={}, i=0){
  return {
    ...card,
    en: card.en || card.word || `${LESSON_PLACEHOLDER} ${i + 1}`,
    vi: card.vi || card.meaningVi || LESSON_PLACEHOLDER,
    img: card.img || card.emoji || "📝",
    ipa: card.ipa || "",
    example: card.example || card.exampleEn || "",
    group: card.group
  };
}

function placeholderFlashcard(i, group){
  return { en: `${LESSON_PLACEHOLDER} ${i + 1}`, vi: LESSON_PLACEHOLDER, img: "📝", ipa: "", group, __placeholder: true };
}

function normalizeListenPick(lesson, vocabulary){
  const source = lesson.listenPick?.questions || lesson.listenPick || [];
  const questions = Array.isArray(source)
    ? source.map((q, i) => normalizeAudioChoiceQuestion(q, i, vocabulary, "Nghe chọn từ"))
    : [];
  return {
    title: lesson.listenPick?.title || "Nghe chọn từ",
    instruction: lesson.listenPick?.instruction || "Nghe audio rồi chọn đáp án đúng.",
    questions: fillToCount(questions, 20, i => audioChoiceFromVocab(vocabulary, i))
  };
}

function normalizeListening(listening={}, lesson){
  const source = listening.questions || [];
  return {
    ...listening,
    title: listening.title || "Nghe trả lời",
    transcript: listening.transcript || LESSON_PLACEHOLDER,
    questions: fillToCount(
      normalizeQuizQuestions(source, "Nghe trả lời").map((q, i) => ({ ...q, audio: q.audio || q.q || `${lesson.title} question ${i + 1}` })),
      20,
      i => listeningQuestionFromLesson(lesson, i)
    )
  };
}

function normalizeGrammar(grammar={}, lesson){
  const structures = Array.isArray(grammar.structures) ? grammar.structures.map((s, i) => ({
    ...s,
    num: s.num || i + 1,
    pattern: s.pattern || s.title || LESSON_PLACEHOLDER,
    vi: s.vi || s.explanationVi || LESSON_PLACEHOLDER,
    style: s.style || s.explanation || "Cấu trúc chính",
    example: s.example || s.examples?.[0]?.en || LESSON_PLACEHOLDER,
    exampleVi: s.exampleVi || s.examples?.[0]?.vi || LESSON_PLACEHOLDER,
    context: s.context || s.usage || LESSON_PLACEHOLDER,
    commonMistake: s.commonMistake || s.mistake || LESSON_PLACEHOLDER
  })) : [];
  return {
    ...grammar,
    title: grammar.title || lesson.grammarFocus || "Ngữ pháp",
    intro: grammar.intro || LESSON_PLACEHOLDER,
    badge: grammar.badge || "4-5 CẤU TRÚC CÂU CHÍNH",
    formula: grammar.formula || structures[0]?.pattern || LESSON_PLACEHOLDER,
    structures: fillToCount(structures, 4, i => ({
      num: i + 1,
      pattern: LESSON_PLACEHOLDER,
      vi: LESSON_PLACEHOLDER,
      style: "Cần bổ sung giải thích ngắn",
      example: LESSON_PLACEHOLDER,
      exampleVi: LESSON_PLACEHOLDER,
      context: LESSON_PLACEHOLDER,
      commonMistake: LESSON_PLACEHOLDER,
      __placeholder: true
    })).slice(0, 5),
    commonQA: fillToCount(grammar.commonQA || [], 4, i => ({
      q: `${LESSON_PLACEHOLDER} Q${i + 1}`,
      a: LESSON_PLACEHOLDER,
      __placeholder: true
    }))
  };
}

function normalizeTranslation(translation={}, lesson){
  const source = translation.sentences || translation || [];
  const sentences = Array.isArray(source) ? source.map((s, i) => ({
    ...s,
    vi: s.vi || s.vietnamese || (s.direction === "en-vi" ? s.answer : LESSON_PLACEHOLDER),
    en: s.en || s.english || (s.direction === "en-vi" ? s.prompt : LESSON_PLACEHOLDER),
    direction: s.direction || (i % 5 === 4 ? "en-vi" : "vi-en")
  })) : [];
  return {
    title: translation.title || "Luyện dịch Việt ↔ Anh",
    instruction: translation.instruction || "Dịch câu theo hướng được yêu cầu, sau đó bấm kiểm tra để xem đáp án.",
    sentences: fillToCount(sentences, 20, i => translationFromLesson(lesson, i))
  };
}

function normalizeDialogueVideo(dialogueVideo={}, lesson){
  const transcript = normalizeTranscript(dialogueVideo.transcript || dialogueVideo.dialogue || []);
  const listenPickLine = normalizeDialogueListen(
    dialogueVideo.listenPickLine || dialogueVideo.listenChoose || [],
    transcript,
    contentCount(lesson, "dialogueListen", 10)
  );
  return {
    ...dialogueVideo,
    title: dialogueVideo.title || "Video hội thoại",
    description: dialogueVideo.description || LESSON_PLACEHOLDER,
    label: dialogueVideo.label || "Dialogue video",
    embedUrl: dialogueVideo.embedUrl || dialogueVideo.url || "",
    watchUrl: dialogueVideo.watchUrl || dialogueVideo.sourceUrl || dialogueVideo.url || dialogueVideo.fallbackSearchUrl || youtubeSearchUrl(dialogueVideo.title || lesson.title),
    fallbackSearchUrl: dialogueVideo.fallbackSearchUrl || youtubeSearchUrl(dialogueVideo.title || lesson.title),
    transcript,
    keywords: dialogueVideo.keywords || [],
    comprehension: fillToCount(normalizeQuizQuestions(dialogueVideo.comprehension || dialogueVideo.videoQuestions || [], "Video hội thoại"), 4, i => placeholderQuizQuestion(i, "Video hội thoại")),
    listenPickLine,
    fillConversation: fillToCount(dialogueVideo.fillConversation || [], 1, () => placeholderFillConversation())
  };
}

function normalizeTranscript(lines){
  const transcript = (lines || []).map((line, i) => ({
    ...line,
    speaker: line.speaker || (i % 2 ? "B" : "A"),
    en: line.en || line.english || line.text || LESSON_PLACEHOLDER,
    vi: line.vi || line.vietnamese || LESSON_PLACEHOLDER,
    keyword: line.keyword || "",
    audioText: line.audioText || line.audio || line.en || line.english || line.text || LESSON_PLACEHOLDER
  }));
  return transcript.length ? transcript : [{
    speaker: "A",
    en: LESSON_PLACEHOLDER,
    vi: LESSON_PLACEHOLDER,
    audioText: LESSON_PLACEHOLDER,
    __placeholder: true
  }];
}

function normalizeDialogueListen(rounds, transcript, targetCount=10){
  const normalized = (rounds || []).map((round, i) => normalizeLinePickRound(round, transcript, i));
  return fillToCount(normalized, targetCount, i => linePickFromTranscript(transcript, i));
}

function normalizeLinePickRound(round={}, transcript, i){
  const line = transcript[i % Math.max(1, transcript.length)] || {};
  const correctText = round.options?.[round.answer]?.text || round.options?.[round.answer] || line.en || LESSON_PLACEHOLDER;
  const options = normalizeDialogueOptions(round.options, correctText, transcript);
  return {
    ...round,
    prompt: round.prompt || round.audioText || line.audioText || line.en || LESSON_PLACEHOLDER,
    audioText: round.audioText || round.prompt || line.audioText || line.en || LESSON_PLACEHOLDER,
    options,
    answer: Math.max(0, options.findIndex(opt => (typeof opt === "string" ? opt : opt.text) === correctText))
  };
}

function linePickFromTranscript(transcript, i){
  const line = transcript[i % Math.max(1, transcript.length)] || {};
  if(line.__placeholder) {
    return {
      prompt: LESSON_PLACEHOLDER,
      audioText: LESSON_PLACEHOLDER,
      options: [LESSON_PLACEHOLDER, "A", "B", "C"],
      answer: 0,
      __placeholder: true
    };
  }
  const options = normalizeDialogueOptions([], line.en, transcript);
  return {
    prompt: line.audioText || line.en,
    audioText: line.audioText || line.en,
    options,
    answer: options.findIndex(opt => (typeof opt === "string" ? opt : opt.text) === line.en),
    sourceTranscriptIndex: i % transcript.length
  };
}

function normalizeSpeaking(speaking={}, lesson){
  const turns = Array.isArray(speaking.turns) ? speaking.turns : speakingFromLegacy(speaking);
  return {
    ...speaking,
    title: speaking.title || "Luyện nói AI",
    formula: speaking.formula || lesson.grammar?.formula || LESSON_PLACEHOLDER,
    turns: fillToCount(turns.map((turn, i) => normalizeSpeakingTurn(turn, i, lesson)), 5, i => placeholderSpeakingTurn(i, lesson))
  };
}

function normalizeSpeakingTurn(turn={}, i, lesson){
  return {
    ...turn,
    id: turn.id || i + 1,
    ai: {
      ...(turn.ai || {}),
      textEn: turn.ai?.textEn || turn.ai?.en || LESSON_PLACEHOLDER,
      textVn: turn.ai?.textVn || turn.ai?.vi || "",
      audioUrl: turn.ai?.audioUrl || turn.ai?.textEn || turn.ai?.en || LESSON_PLACEHOLDER
    },
    user: {
      ...(turn.user || {}),
      formula: turn.user?.formula || lesson.grammar?.formula || LESSON_PLACEHOLDER,
      sampleEn: turn.user?.sampleEn || turn.user?.en || LESSON_PLACEHOLDER,
      sampleVn: turn.user?.sampleVn || turn.user?.sampleVi || turn.user?.vi || "",
      sampleAudioUrl: turn.user?.sampleAudioUrl || turn.user?.sampleEn || turn.user?.en || LESSON_PLACEHOLDER,
      criteria: turn.user?.criteria || ["grammar", "vocabulary", "pronunciation/speaking"]
    }
  };
}

function speakingFromLegacy(speaking={}){
  const questions = speaking.questions || [];
  const dialogue = speaking.dialogue || [];
  if(!dialogue.length) return [];
  const turns = [];
  for(let i=0;i<dialogue.length;i+=2){
    const ai = dialogue[i] || {};
    const user = dialogue[i+1] || {};
    const q = questions[Math.floor(i/2)] || {};
    turns.push({
      id: turns.length + 1,
      ai: { textEn: ai.en || q.q || "", textVn: ai.vi || "", audioUrl: ai.audioUrl || ai.en || q.q || "" },
      user: { formula: q.formula || "", sampleEn: user.en || q.sampleAnswer || "", sampleVn: user.vi || "", sampleAudioUrl: user.audioUrl || user.en || q.sampleAnswer || "" }
    });
  }
  return turns;
}

function normalizeMinitest(minitest=[], lesson){
  const source = Array.isArray(minitest) ? minitest : [];
  const targetCount = contentCount(lesson, "minitest", 20);
  return fillToCount(source.map((q, i) => normalizeQuizQuestion(q, i, "Minitest")), targetCount, i => minitestFromLesson(lesson, i));
}

function normalizeMindmap(mindmap={}, lesson){
  if(mindmap && Object.keys(mindmap).length){
    return {
      ...mindmap,
      center: mindmap.center || lesson.title,
      branches: mindmap.branches?.length ? mindmap.branches : placeholderMindmapBranches()
    };
  }
  return {
    type: "structured",
    center: lesson.title || LESSON_PLACEHOLDER,
    branches: placeholderMindmapBranches(),
    __placeholder: true
  };
}

function normalizeHomeworkRich(homeworkRich={}, homeworkList=[], lesson){
  const existingTasks = homeworkRich?.tasks || [];
  const tasksFromSimple = (homeworkList || []).map((text, i) => ({
    icon: i === 0 ? "✍️" : i === 1 ? "🎙️" : "📌",
    title: i === 0 ? "Bài viết" : i === 1 ? "Bài nói / ghi âm / video" : `Bài tập ${i + 1}`,
    badge: i < 2 ? "Bắt buộc" : "Luyện thêm",
    desc: text,
    items: [text],
    sample: LESSON_PLACEHOLDER,
    rubric: "Đúng yêu cầu, dùng từ vựng và cấu trúc của bài."
  }));
  const tasks = fillToCount(existingTasks.length ? existingTasks : tasksFromSimple, 2, i => ({
    icon: i === 0 ? "✍️" : "🎙️",
    title: i === 0 ? "Bài viết" : "Bài nói / ghi âm / video",
    badge: "Cần bổ sung",
    desc: LESSON_PLACEHOLDER,
    items: [LESSON_PLACEHOLDER],
    sample: LESSON_PLACEHOLDER,
    rubric: "Cần bổ sung tiêu chí chấm theo template Buổi 9.",
    __placeholder: true
  }));
  return {
    title: homeworkRich.title || `Homework - Buổi ${lesson.id}`,
    submit: homeworkRich.submit || "Nộp bài qua nhóm lớp.",
    deadline: homeworkRich.deadline ?? "Trước buổi học tiếp theo",
    tasks
  };
}

function normalizeHomeworkList(homework=[], homeworkRich){
  if(Array.isArray(homework) && homework.length) return homework;
  return (homeworkRich.tasks || []).map(task => task.desc || task.title || LESSON_PLACEHOLDER);
}

function applyLessonSectionFlowOverride(lesson){
  const override = lessonSectionFlowOverrides[lesson.id];
  if(!override) return;

  const sectionFlow = (override.sectionFlow || []).filter(Boolean);
  if(sectionFlow.length){
    lesson.sectionFlow = sectionFlow;
  }

  const skipped = new Set([
    ...canonicalLessonSections.filter(section => !lesson.sectionFlow.includes(section)),
    ...(override.skipSections || [])
  ]);
  lesson.skipSections = [...skipped];
  lesson.architecture = {
    ...lesson.architecture,
    sectionFlowOverride: {
      source: override.source || `Lesson ${lesson.id}`,
      sectionCount: lesson.sectionFlow.length
    }
  };

  (override.suppressSectionData || []).forEach(key => {
    if(Object.prototype.hasOwnProperty.call(lesson, key)){
      delete lesson[key];
    }
  });
}

function normalizeQuizQuestions(source, topic){
  return (source || []).map((q, i) => normalizeQuizQuestion(q, i, topic));
}

function normalizeQuizQuestion(q={}, i=0, topic="Quiz"){
  const answer = Number.isInteger(q.answer) ? q.answer : Number.isInteger(q.correct) ? q.correct : 0;
  const correctText = q.options?.[answer] || q.correctAnswer || LESSON_PLACEHOLDER;
  const providedOptions = Array.isArray(q.options) ? q.options.map(String).filter(Boolean).slice(0, 4) : [];
  const options = q.allowShortOptions && providedOptions.length >= 2
    ? providedOptions
    : normalizeOptions(q.options, answer, correctText, []);
  return {
    ...q,
    q: q.q || q.question || `${topic} ${i + 1}: ${LESSON_PLACEHOLDER}`,
    options,
    answer: Math.max(0, Math.min(answer, options.length - 1)),
    explanation: q.explanation || ""
  };
}

function normalizeAudioChoiceQuestion(q={}, i, vocabulary, topic){
  const base = normalizeQuizQuestion(q, i, topic);
  const source = buildVocabularyIndex(vocabulary).get(normalizeEnglishKey(q.audioText || q.audio || q.en || q.word));
  return {
    ...base,
    audio: q.audioText || q.audio || q.en || base.q,
    audioText: q.audioText || q.audio || q.en || base.q,
    ttsText: q.ttsText || q.audioText || q.audio || q.en || base.q,
    en: q.en || q.word || source?.en || vocabulary[i % Math.max(1, vocabulary.length)]?.en || base.q,
    vi: q.vi || source?.vi || "",
    ipa: q.ipa || q.phonetic || source?.ipa || source?.phonetic || ""
  };
}

function audioChoiceFromVocab(vocabulary, i){
  const item = vocabulary[i % Math.max(1, vocabulary.length)] || {};
  if(item.__placeholder || !item.en || !item.vi) {
    return {
      q: LESSON_PLACEHOLDER,
      audio: LESSON_PLACEHOLDER,
      options: [LESSON_PLACEHOLDER, "A", "B", "C"],
      answer: 0,
      __placeholder: true
    };
  }
  const options = normalizeOptions([], 0, item.vi, vocabulary.map(v => v.vi));
  return {
    q: "Nghe và chọn nghĩa đúng.",
    audio: item.en,
    audioText: item.en,
    ttsText: item.en,
    en: item.en,
    vi: item.vi,
    ipa: item.ipa || item.phonetic || "",
    options,
    answer: options.indexOf(item.vi)
  };
}

function listeningQuestionFromLesson(lesson, i){
  const vocab = lesson.vocabulary?.[i % Math.max(1, lesson.vocabulary.length)] || {};
  if(vocab.en && vocab.vi && !vocab.__placeholder){
    const options = normalizeOptions([], 0, vocab.vi, lesson.vocabulary.map(v => v.vi));
    return {
      q: "Chọn nghĩa đúng của câu/từ bạn nghe.",
      audio: vocab.en,
      options,
      answer: options.indexOf(vocab.vi)
    };
  }
  return placeholderQuizQuestion(i, "Nghe trả lời");
}

function translationFromLesson(lesson, i){
  const vocab = lesson.vocabulary?.[i % Math.max(1, lesson.vocabulary.length)] || {};
  if(vocab.en && vocab.vi && !vocab.__placeholder){
    const direction = i % 5 === 4 ? "en-vi" : "vi-en";
    return {
      vi: vocab.vi,
      en: vocab.en,
      direction
    };
  }
  return { vi: LESSON_PLACEHOLDER, en: LESSON_PLACEHOLDER, direction: i % 5 === 4 ? "en-vi" : "vi-en", __placeholder: true };
}

function minitestFromLesson(lesson, i){
  const pools = [
    ...(lesson.grammar?.commonQA || []).map(qa => ({ q: qa.q, options: [qa.a, LESSON_PLACEHOLDER, "A", "B"], answer: 0 })),
    ...(lesson.listening?.questions || []),
    ...(lesson.listenPick?.questions || [])
  ].filter(q => q?.q && q?.options?.length && !q.__placeholder);
  if(pools.length) return normalizeQuizQuestion(pools[i % pools.length], i, "Minitest");
  return placeholderQuizQuestion(i, "Minitest");
}

function placeholderQuizQuestion(i, topic){
  return {
    q: `${topic} ${i + 1}: ${LESSON_PLACEHOLDER}`,
    options: [LESSON_PLACEHOLDER, "A", "B", "C"],
    answer: 0,
    explanation: LESSON_PLACEHOLDER,
    __placeholder: true
  };
}

function placeholderSpeakingTurn(i, lesson){
  return {
    id: i + 1,
    ai: { textEn: `${LESSON_PLACEHOLDER} ${i + 1}`, textVn: "", audioUrl: `${LESSON_PLACEHOLDER} ${i + 1}` },
    user: {
      formula: lesson.grammar?.formula || LESSON_PLACEHOLDER,
      sampleEn: LESSON_PLACEHOLDER,
      sampleVn: "",
      sampleAudioUrl: LESSON_PLACEHOLDER,
      criteria: ["grammar", "vocabulary", "pronunciation/speaking"]
    },
    __placeholder: true
  };
}

function placeholderFillConversation(){
  return {
    title: "Dialogue cloze",
    lines: [
      { speaker: "A", text: `[[${LESSON_PLACEHOLDER}]]` },
      { speaker: "B", text: LESSON_PLACEHOLDER }
    ],
    wordBank: [LESSON_PLACEHOLDER],
    explanations: [LESSON_PLACEHOLDER],
    __placeholder: true
  };
}

function placeholderMindmapBranches(){
  return [
    { icon: "📚", label: "Vocabulary", sub: "", items: [LESSON_PLACEHOLDER] },
    { icon: "📋", label: "Grammar", sub: "", items: [LESSON_PLACEHOLDER] },
    { icon: "🎤", label: "Speaking patterns", sub: "", items: [LESSON_PLACEHOLDER] },
    { icon: "⚠️", label: "Common mistakes", sub: "", items: [LESSON_PLACEHOLDER] }
  ];
}

function normalizeOptions(options, answer, correctText, distractors=[]){
  const result = Array.isArray(options) ? options.map(String).filter(Boolean).slice(0, 4) : [];
  if(correctText && !result.includes(correctText)){
    const safeAnswer = Number.isInteger(answer) ? Math.max(0, Math.min(answer, 3)) : 0;
    result.splice(safeAnswer, 0, correctText);
  }
  for(const d of distractors){
    if(result.length >= 4) break;
    if(d && !result.includes(d)) result.push(String(d));
  }
  while(result.length < 4) result.push(result.length === 0 ? LESSON_PLACEHOLDER : `Option ${result.length + 1}`);
  return result.slice(0, 4);
}

function normalizeDialogueOptions(options=[], correctText, transcript){
  const rawOptions = options.map(opt => typeof opt === "string" ? opt : (opt?.text || "")).filter(Boolean);
  const distractors = transcript.map(line => line.en).filter(Boolean);
  return normalizeOptions(rawOptions, 0, correctText, distractors);
}

function fillToCount(items, count, factory){
  const result = Array.isArray(items) ? [...items] : [];
  for(let i=result.length; i<count; i++) result.push(factory(i));
  return result;
}

function contentCount(lesson, key, fallback){
  const value = Number(lesson?.contentCounts?.[key]);
  return Number.isInteger(value) && value >= 0 ? value : fallback;
}

function collectExtensionSections(rawLesson){
  const extensionKeys = ["pointShout", "thisOrThat", "mysteryBag", "quizBomb", "listenChoose", "sentenceOrder", "rolePlay", "listeningTest", "videoVocabulary", "extraFlashcards"];
  return extensionKeys.filter(key => rawLesson?.[key]).map(key => ({ key, data: rawLesson[key] }));
}

function normalizeTechnicalNotes(rawLesson){
  const notes = [];
  if(rawLesson?.technicalNotes) notes.push(rawLesson.technicalNotes);
  if(rawLesson?.webImportNotes) notes.push(rawLesson.webImportNotes);
  if(rawLesson?.extensionSections?.length) notes.push("Legacy extension sections preserved outside canonical flow.");
  return notes;
}

function youtubeSearchUrl(title){
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${title || "English lesson"} FClass`)}`;
}

function inferUnit(id){
  if(id <= 1) return "Starter";
  if(id <= 4) return "Unit 1";
  if(id <= 7) return "Unit 2";
  if(id <= 10) return "Unit 3";
  if(id <= 15) return "Unit 4";
  if(id <= 20) return "Unit 5";
  if(id <= 25) return "Unit 6";
  return "Review";
}

function sameArray(a=[], b=[]){
  return a.length === b.length && a.every((item, i) => item === b[i]);
}

function stripAccents(input){
  return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
}
