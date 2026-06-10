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
const lesson04 = LESSONS.find((lesson) => lesson.id === 4);
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

const lesson02 = LESSONS.find((lesson) => lesson.id === 2);
const lesson02RequiredSections = [
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
  "homework_answers",
  "common_mistakes",
  "lesson_end",
];

if (!lesson02) {
  console.error("ERROR: Lesson 2 is missing.");
  failed = true;
} else {
  const lesson02Status = typeof lesson02.status === "object" ? lesson02.status.content : lesson02.status;
  const fillBlankCount = (lesson02.dialogueVideo?.fillConversation?.[0]?.lines || [])
    .reduce((count, line) => count + (String(line.text || "").match(/\[\[[^\]]+\]\]/g)?.length || 0), 0);
  const lesson02Checks = [
    [lesson02.slug === "singular-plural-nouns", "slug must remain singular-plural-nouns"],
    [lesson02.title === "BUỔI 2: TOPIC 2 — SINGULAR & PLURAL NOUNS", "title is incorrect"],
    [lesson02Status === "ready", "status must be ready"],
    [lesson02.metadata?.contentImported === true, "metadata.contentImported must be true"],
    [lesson02.metadata?.localContentAuthoritative === true, "local content must be authoritative"],
    [lesson02.review?.reviewGames?.vocabulary?.length === 20, "review listening game must have 20 questions"],
    [lesson02.review?.reviewGames?.quizBomb?.questions?.length === 20, "Quiz Bomb must have 20 questions"],
    [Object.keys(lesson02.vocabGroups || {}).length === 4, "flashcards must have 4 tabs"],
    [lesson02.matchingPairs?.length === 34, "matching game must contain all 34 singular/plural pairs"],
    [lesson02.listenPick?.questions?.length === 20, "Listening Quiz must have 20 questions"],
    [lesson02.grammar?.structures?.length === 5, "grammar must have 5 structures"],
    [lesson02.listening?.questions?.length === 20, "Nghe trả lời must have 20 questions"],
    [lesson02.translation?.sentences?.length === 24, "translation must have 24 questions"],
    [lesson02.dialogueVideo?.transcript?.length === 12, "dialogue transcript must have 12 bilingual lines"],
    [lesson02.dialogueVideo?.listenPickLine?.length === 6, "Nghe chọn thoại must have 6 questions"],
    [fillBlankCount === 8, "fill conversation must have 8 blanks"],
    [lesson02.speaking?.turns?.length === 5, "AI Speaking must have 5 prompts"],
    [lesson02.minitest?.length === 12, "Minitest must have 12 questions"],
    [lesson02.homeworkRich?.tasks?.length === 3, "Homework must have 3 tasks"],
    [lesson02.homeworkAnswers?.rows?.length === 20, "Homework answers must have 20 rows"],
    [lesson02.commonMistakes?.length === 12, "common mistakes must have 12 rows"],
    [lesson02.video?.embedUrl === "DÁN_LINK_EMBED_VIDEO_Ở_ĐÂY", "intro video placeholder changed"],
    [lesson02.video?.watchUrl === "DÁN_LINK_GỐC_Ở_ĐÂY", "intro video original placeholder changed"],
    [lesson02.dialogueVideo?.embedUrl === "DÁN_LINK_EMBED_VIDEO_HỘI_THOẠI_Ở_ĐÂY", "dialogue video placeholder changed"],
    [lesson02RequiredSections.every((section) => lesson02.sectionFlow?.includes(section)), "lesson is missing one or more required sections"],
    [lesson02.sectionFlow?.at(-1) === "lesson_end", "lesson end must be the final section"],
    [lesson02.__architectureWarnings?.length === 0, "lesson has architecture warnings"],
  ];

  for (const [ok, message] of lesson02Checks) {
    if (!ok) {
      console.error(`ERROR: Lesson 2 ${message}.`);
      failed = true;
    }
  }
}

if (!lesson04) {
  console.error("ERROR: Lesson 4 is missing.");
  failed = true;
} else {
  const lesson04Status = typeof lesson04.status === "object" ? lesson04.status.content : lesson04.status;
  const lesson04Checks = [
    [lesson04Status === "ready", "status must be ready"],
    [lesson04.title === "BUỔI 4: PERSONAL PRONOUNS — ĐẠI TỪ NHÂN XƯNG", "title is incorrect"],
    [lesson04.review?.reviewGames?.vocabulary?.length === 20, "review listening game must have 20 questions"],
    [lesson04.review?.reviewGames?.quizBomb?.questions?.length === 20, "review Quiz Bomb must have 20 questions"],
    [Object.keys(lesson04.vocabGroups || {}).length === 3, "flashcards must have 3 tabs"],
    [lesson04.vocabulary?.length === 24, "flashcards must contain 24 supplied cards"],
    [lesson04.listenPick?.questions?.length === 20, "Listening Quiz must have 20 questions"],
    [lesson04.grammar?.structures?.length === 4, "grammar must have 4 structures"],
    [lesson04.listening?.questions?.length === 20, "Nghe trả lời must have 20 questions"],
    [lesson04.translation?.sentences?.length === 20, "Luyện dịch must have 20 questions"],
    [lesson04.dialogueVideo?.transcript?.length === 10, "dialogue transcript must have 10 bilingual lines"],
    [lesson04.dialogueVideo?.listenPickLine?.length === 4, "Nghe chọn thoại must have 4 questions"],
    [lesson04.dialogueVideo?.fillConversation?.[0]?.lines?.filter((line) => /\[\[[^\]]+\]\]/.test(line.text || "")).length === 5, "dialogue cloze must have 5 blanks"],
    [lesson04.speaking?.turns?.length === 5, "AI speaking must have 5 prompts"],
    [lesson04.minitest?.length === 10, "Minitest must have 10 questions"],
    [lesson04.homeworkRich?.tasks?.length === 2, "Homework must have 2 tasks"],
    [lesson04.video?.embedUrl === "https://www.youtube.com/embed/vhQt5hWAEuc", "intro video URL is incorrect"],
    [lesson04.dialogueVideo?.embedUrl === "https://www.youtube.com/embed/zprayQY3cBk", "dialogue video URL is incorrect"],
    [lesson04.__architectureWarnings?.length === 0, `architecture warnings: ${(lesson04.__architectureWarnings || []).join("; ")}`],
    [lesson01RequiredSections.every((section) => lesson04.sectionFlow?.includes(section)), "lesson is missing one or more required sections"],
    [!JSON.stringify(lesson04).includes("TODO:"), "lesson still contains TODO content"],
  ];

  for (const [ok, message] of lesson04Checks) {
    if (!ok) {
      console.error(`ERROR: Lesson 4 ${message}.`);
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
