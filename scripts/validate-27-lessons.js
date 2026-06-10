#!/usr/bin/env node
import { LESSONS } from "../src/features/lessons/lessonRegistry.js";
import { TUWI_27_CURRICULUM_MAP } from "../src/features/curriculum/curriculumMap.js";

let failed = false;

// 1. Check total number of lessons is exactly 27
if (LESSONS.length !== 27) {
  console.error(`ERROR: Expected 27 lessons in registry, found ${LESSONS.length}.`);
  failed = true;
}

if (TUWI_27_CURRICULUM_MAP.length !== 27) {
  console.error(`ERROR: Expected 27 lessons in curriculum map, found ${TUWI_27_CURRICULUM_MAP.length}.`);
  failed = true;
}

// 2. Check IDs are 1-27 sequential, non-duplicate, and no lesson >= 28
const seenIds = new Set();
const seenSlugs = new Set();

const validStatuses = new Set(["ready", "partial", "draft", "empty", "reused", "merged"]);

for (const lesson of LESSONS) {
  const { id, title, slug, topicEnglish, topicVietnamese, status } = lesson;
  
  // Check id
  if (id === undefined || id === null) {
    console.error(`ERROR: Lesson has undefined/null id.`);
    failed = true;
    continue;
  }
  
  if (id < 1 || id > 27) {
    console.error(`ERROR: Lesson id ${id} is outside valid 1-27 range.`);
    failed = true;
  }
  
  if (seenIds.has(id)) {
    console.error(`ERROR: Duplicate lesson id detected: ${id}.`);
    failed = true;
  }
  seenIds.add(id);
  
  // Check required fields
  if (!title) {
    console.error(`ERROR: Lesson ${id} is missing title.`);
    failed = true;
  }
  if (!topicEnglish) {
    console.error(`ERROR: Lesson ${id} is missing topicEnglish.`);
    failed = true;
  }
  if (!topicVietnamese) {
    console.error(`ERROR: Lesson ${id} is missing topicVietnamese.`);
    failed = true;
  }
  
  // Check slug
  if (!slug) {
    console.error(`ERROR: Lesson ${id} is missing slug.`);
    failed = true;
  } else {
    if (seenSlugs.has(slug)) {
      console.error(`ERROR: Duplicate slug detected: "${slug}" in Lesson ${id}.`);
      failed = true;
    }
    seenSlugs.add(slug);
  }
  
  // Check status
  const statusString = typeof status === "object" ? status.content : status;
  if (!statusString) {
    console.error(`ERROR: Lesson ${id} is missing status.`);
    failed = true;
  } else if (!validStatuses.has(statusString)) {
    console.error(`ERROR: Lesson ${id} has invalid status "${statusString}".`);
    failed = true;
  }

  // Check draft/empty safety to prevent app crash
  if (status === "empty" || status === "draft") {
    // Must have objectives, intro, vocabulary, minitest, homework, sectionFlow
    if (!Array.isArray(lesson.sectionFlow) || lesson.sectionFlow.length === 0) {
      console.error(`ERROR: Lesson ${id} (${status}) has invalid/empty sectionFlow.`);
      failed = true;
    }
    if (!lesson.intro || typeof lesson.intro !== "object") {
      console.error(`ERROR: Lesson ${id} (${status}) has invalid/missing intro.`);
      failed = true;
    }
    if (!Array.isArray(lesson.objectives)) {
      console.error(`ERROR: Lesson ${id} (${status}) has invalid/missing objectives.`);
      failed = true;
    }
    if (!Array.isArray(lesson.vocabulary)) {
      console.error(`ERROR: Lesson ${id} (${status}) has invalid/missing vocabulary.`);
      failed = true;
    }
    if (!Array.isArray(lesson.minitest)) {
      console.error(`ERROR: Lesson ${id} (${status}) has invalid/missing minitest.`);
      failed = true;
    }
    if (!Array.isArray(lesson.homework)) {
      console.error(`ERROR: Lesson ${id} (${status}) has invalid/missing homework.`);
      failed = true;
    }
  }
}

const lesson01 = LESSONS.find((lesson) => lesson.id === 1);
const lesson25 = LESSONS.find((lesson) => lesson.id === 25);
const lesson01RequiredSections = [
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
  "homework",
];

if (!lesson01) {
  console.error("ERROR: Lesson 1 is missing.");
  failed = true;
} else {
  const lesson01Status = typeof lesson01.status === "object" ? lesson01.status.content : lesson01.status;
  const lesson01Checks = [
    [lesson01.slug === "alphabet-and-nouns", "slug must remain alphabet-and-nouns"],
    [lesson01.title === "Bảng chữ cái & Danh từ", "title must remain Bảng chữ cái & Danh từ"],
    [lesson01.topicEnglish === "Alphabet and Nouns", "topicEnglish is incorrect"],
    [lesson01.topicVietnamese === "Bảng chữ cái và Danh từ", "topicVietnamese is incorrect"],
    [lesson01Status === "partial", "status must be partial while video URLs are TODO"],
    [lesson01.metadata?.contentImported === true, "metadata.contentImported must be true"],
    [lesson01.metadata?.hasTodoVideo === true, "metadata.hasTodoVideo must be true"],
    [lesson01.review?.reviewGames?.vocabulary?.length === 20, "review listening game must have 20 questions"],
    [lesson01.review?.reviewGames?.quizBomb?.questions?.length === 20, "Quiz Bomb must have 20 questions"],
    [lesson01.vocabulary?.length === 50, "flashcards must contain 26 letters and 24 nouns"],
    [lesson01.listenPick?.questions?.length === 20, "Nghe chọn từ must have 20 questions"],
    [lesson01.listening?.questions?.length === 20, "Nghe trả lời must have 20 questions"],
    [lesson01.translation?.sentences?.length === 20, "Luyện dịch must have 20 questions"],
    [lesson01.dialogueVideo?.listenPickLine?.length === 6, "Nghe chọn thoại must keep the 6 supplied questions"],
    [lesson01.speaking?.turns?.length === 5, "Luyện nói AI must have 5 prompts"],
    [lesson01.minitest?.length === 10, "Minitest must keep the 10 supplied questions"],
    [lesson01.homeworkRich?.tasks?.length === 2, "Homework must have 2 tasks"],
    [lesson01.video?.embedUrl === "TODO_VIDEO_EMBED_ALPHABET", "alphabet video TODO marker changed"],
    [lesson01.dialogueVideo?.embedUrl === "TODO_VIDEO_EMBED_DIALOGUE_ALPHABET_NOUNS", "dialogue video TODO marker changed"],
    [!JSON.stringify(lesson01).includes("Nội dung đang được biên soạn"), "lesson still contains the empty-content placeholder"],
    [lesson01RequiredSections.every((section) => lesson01.sectionFlow?.includes(section)), "lesson is missing one or more required sections"],
  ];

  for (const [ok, message] of lesson01Checks) {
    if (!ok) {
      console.error(`ERROR: Lesson 1 ${message}.`);
      failed = true;
    }
  }
}

if (!lesson25) {
  console.error("ERROR: Lesson 25 is missing.");
  failed = true;
} else {
  const lesson25Status = typeof lesson25.status === "object" ? lesson25.status.content : lesson25.status;
  const lesson25RequiredSections = [
    ...lesson01RequiredSections,
    "homework_answers",
    "common_mistakes",
    "lesson_end",
  ];
  const lesson25Blanks = (lesson25.dialogueVideo?.fillConversation?.[0]?.lines || [])
    .reduce((total, line) => total + (String(line.text || "").match(/\[\[[^\]]+\]\]/g) || []).length, 0);
  const lesson25Checks = [
    [lesson25Status === "ready", "status must be ready"],
    [lesson25.title === "BUỔI 25: PAST CONTINUOUS TENSE", "title is incorrect"],
    [lesson25.metadata?.localContentAuthoritative === true, "local content must be authoritative"],
    [lesson25.review?.reviewGames?.vocabulary?.length === 20, "review listening game must have 20 questions"],
    [lesson25.review?.reviewGames?.quizBomb?.questions?.length === 20, "review Quiz Bomb must have 20 questions"],
    [Object.keys(lesson25.vocabGroups || {}).length === 4, "flashcards must have 4 tabs"],
    [lesson25.matchingPairs?.length === 10, "matching game must have 10 supplied pairs"],
    [lesson25.listenPick?.questions?.length === 20, "Listening Quiz must have 20 questions"],
    [lesson25.grammar?.structures?.length === 5, "grammar must have 5 structures"],
    [lesson25.grammar?.commonQA?.length === 4, "Common Q&A must have 4 pairs"],
    [lesson25.listening?.questions?.length === 24, "Nghe trả lời must have 24 questions"],
    [lesson25.translation?.sentences?.length === 30, "Luyện dịch must have 30 questions"],
    [lesson25.dialogueVideo?.transcript?.length === 10, "dialogue transcript must have 10 bilingual lines"],
    [lesson25.dialogueVideo?.listenPickLine?.length === 6, "Nghe chọn thoại must have 6 questions"],
    [lesson25Blanks === 10, "dialogue cloze must have 10 blanks"],
    [lesson25.speaking?.turns?.length === 6, "AI speaking must have 6 prompts"],
    [lesson25.minitest?.length === 15, "Minitest must have 15 questions"],
    [lesson25.homeworkRich?.tasks?.length === 4, "Homework must have 4 tasks"],
    [lesson25.homeworkAnswers?.rows?.length === 10, "Homework 1 answers must have 10 rows"],
    [lesson25.commonMistakes?.length === 10, "common mistakes must have 10 rows"],
    [lesson25.video?.embedUrl === "DÁN_LINK_EMBED_VIDEO_Ở_ĐÂY", "intro video placeholder changed"],
    [lesson25.dialogueVideo?.embedUrl === "DÁN_LINK_EMBED_VIDEO_HỘI_THOẠI_Ở_ĐÂY", "dialogue video placeholder changed"],
    [lesson25RequiredSections.every((section) => lesson25.sectionFlow?.includes(section)), "lesson is missing one or more required sections"],
    [lesson25.__architectureWarnings?.length === 0, `architecture warnings: ${(lesson25.__architectureWarnings || []).join("; ")}`],
    [!JSON.stringify(lesson25).includes("TODO:"), "lesson still contains TODO content"],
  ];

  for (const [ok, message] of lesson25Checks) {
    if (!ok) {
      console.error(`ERROR: Lesson 25 ${message}.`);
      failed = true;
    }
  }
}

// Check completeness of IDs (1 to 27)
for (let i = 1; i <= 27; i++) {
  if (!seenIds.has(i)) {
    console.error(`ERROR: Missing lesson with ID ${i}.`);
    failed = true;
  }
}

if (failed) {
  console.error("❌ Validation FAILED.");
  process.exit(1);
} else {
  console.log("✅ Validation PASSED. 27 lessons successfully audited.");
  process.exit(0);
}
