#!/usr/bin/env node
import { LESSONS } from "../src/features/lessons/lessonRegistry.js";

const lesson = LESSONS.find((item) => item.id === 11);
if(!lesson) fail("Lesson 11 is missing.");

const status = typeof lesson.status === "object" ? lesson.status.content : lesson.status;
const blankCount = (lesson.dialogueVideo?.fillConversation || [])
  .reduce((total, dialogue) => total + (dialogue.lines || [])
    .reduce((count, line) => count + (String(line.text || "").match(/\[\[[^\]]+\]\]/g)?.length || 0), 0), 0);
const requiredSections = [
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

const checks = [
  [status === "ready", "status must be ready"],
  [lesson.metadata?.localContentAuthoritative === true, "local content must be authoritative"],
  [lesson.review?.reviewGames?.vocabulary?.length === 20, "review listening game must have 20 questions"],
  [lesson.review?.reviewGames?.quizBomb?.questions?.length === 20, "review Quiz Bomb must have 20 questions"],
  [Object.keys(lesson.vocabGroups || {}).length === 4, "flashcards must have 4 tabs"],
  [lesson.matchingPairs?.length === 10, "matching game must have 10 pairs"],
  [lesson.listenPick?.questions?.length === 20, "Listening Quiz must have 20 questions"],
  [lesson.grammar?.structures?.length === 5, "grammar must have 5 structures"],
  [lesson.grammar?.commonQA?.length === 5, "grammar must have 5 Common Q&A pairs"],
  [lesson.listening?.questions?.length === 24, "Nghe trả lời must have 24 questions"],
  [lesson.translation?.sentences?.length === 30, "translation must have 30 questions"],
  [lesson.dialogueVideo?.transcript?.length === 12, "dialogue transcript must have 12 bilingual lines"],
  [lesson.dialogueVideo?.listenPickLine?.length === 6, "Nghe chọn thoại must have 6 questions"],
  [blankCount === 8, "fill conversation must have 8 blanks"],
  [lesson.speaking?.turns?.length === 6, "AI Speaking must have 6 prompts"],
  [lesson.minitest?.length === 15, "Minitest must have 15 questions"],
  [lesson.homeworkRich?.tasks?.length === 3, "Homework must have 3 tasks"],
  [lesson.homeworkAnswers?.rows?.length === 10, "Homework answers must have 10 rows"],
  [lesson.commonMistakes?.length === 10, "common mistakes must have 10 rows"],
  [lesson.video?.embedUrl === "DÁN_LINK_EMBED_VIDEO_Ở_ĐÂY", "intro video placeholder changed"],
  [lesson.dialogueVideo?.embedUrl === "DÁN_LINK_EMBED_VIDEO_HỘI_THOẠI_Ở_ĐÂY", "dialogue video placeholder changed"],
  [requiredSections.every((section) => lesson.sectionFlow?.includes(section)), "one or more required sections are missing"],
  [lesson.sectionFlow?.at(-1) === "lesson_end", "lesson end must be the final section"],
  [lesson.__architectureWarnings?.length === 0, "lesson has architecture warnings"],
  [!JSON.stringify(lesson).includes("TODO:"), "lesson still contains TODO content"],
];

for(const [ok, message] of checks){
  if(!ok) fail(message);
}

console.log("Validated complete Lesson 11 content and flow.");

function fail(message){
  console.error(`Lesson 11 validation failed: ${message}`);
  process.exit(1);
}
