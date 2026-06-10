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
const lesson08 = LESSONS.find((lesson) => lesson.id === 8);
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

if (!lesson08) {
  console.error("ERROR: Lesson 8 is missing.");
  failed = true;
} else {
  const lesson08Status = typeof lesson08.status === "object" ? lesson08.status.content : lesson08.status;
  const fillBlankCount = (lesson08.dialogueVideo?.fillConversation?.[0]?.lines || [])
    .reduce((count, line) => count + (String(line.text || "").match(/\[\[[^\]]+\]\]/g)?.length || 0), 0);
  const lesson08Checks = [
    [lesson08Status === "ready", "status must be ready"],
    [lesson08.title === "BUỔI 8: CAPITAL LETTER RULES — NGUYÊN TẮC VIẾT HOA", "title is incorrect"],
    [lesson08.metadata?.contentImported === true, "metadata.contentImported must be true"],
    [lesson08.metadata?.localContentAuthoritative === true, "local content must be authoritative"],
    [lesson08.review?.reviewGames?.vocabulary?.length === 20, "review listening game must have 20 questions"],
    [lesson08.review?.reviewGames?.quizBomb?.questions?.length === 20, "review Quiz Bomb must have 20 questions"],
    [lesson08.video?.embedUrl === "https://www.youtube.com/embed/OQnIb4Hdwys", "intro video embed URL is incorrect"],
    [Object.keys(lesson08.vocabGroups || {}).length === 2, "flashcards must have 2 tabs"],
    [lesson08.vocabulary?.length === 33, "flashcards must contain 33 items"],
    [lesson08.listenPick?.questions?.length === 20, "Listening Quiz must have 20 questions"],
    [lesson08.grammar?.sections?.filter((section) => section.title?.startsWith("Quy tắc ")).length === 7, "grammar must show 7 capitalization rules"],
    [lesson08.listening?.questions?.length === 20, "Nghe trả lời must have 20 questions"],
    [lesson08.translation?.sentences?.length === 20, "translation and correction practice must have 20 questions"],
    [lesson08.translation?.sentences?.every((sentence) => sentence.strictCase), "capitalization exercises must use strict case checking"],
    [lesson08.dialogueVideo?.embedUrl === "https://www.youtube.com/embed/mrUGNyo2P-w", "dialogue video embed URL is incorrect"],
    [lesson08.dialogueVideo?.transcript?.length === 10, "dialogue transcript must have 10 bilingual lines"],
    [lesson08.dialogueVideo?.listenPickLine?.length === 4, "Nghe chọn thoại must have 4 questions"],
    [fillBlankCount === 5, "dialogue cloze must have 5 blanks"],
    [lesson08.speaking?.turns?.length === 5, "AI Speaking must have 5 prompts"],
    [lesson08.minitest?.length === 10, "Minitest must have 10 questions"],
    [lesson08.mindmap?.branches?.length === 8, "mindmap must cover 8 capitalization groups"],
    [lesson08.homeworkRich?.tasks?.length === 3, "homework must have 3 tasks"],
    [lesson08.__architectureWarnings?.length === 0, `architecture warnings: ${(lesson08.__architectureWarnings || []).join("; ")}`],
    [lesson01RequiredSections.every((section) => lesson08.sectionFlow?.includes(section)), "lesson is missing one or more required sections"],
    [!JSON.stringify(lesson08).includes("TODO:"), "lesson still contains TODO content"],
  ];

  for (const [ok, message] of lesson08Checks) {
    if (!ok) {
      console.error(`ERROR: Lesson 8 ${message}.`);
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
