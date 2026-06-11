#!/usr/bin/env node
import { LESSONS } from "../src/features/lessons/lessonRegistry.js";
import { COURSE_TOTAL_LESSONS, TUWI_34_CURRICULUM_MAP } from "../src/features/curriculum/curriculumMap.js";
import { IPA_BOOTCAMP_SECTION_FLOW } from "../src/features/curriculum/ipaBootcampLessons.js";

let failed = false;

const expectedTotal = 34;
const validStatuses = new Set(["ready", "partial", "draft", "empty", "reused", "merged"]);
const seenIds = new Set();
const seenSlugs = new Set();

check(LESSONS.length === expectedTotal, `Expected ${expectedTotal} lessons in registry, found ${LESSONS.length}.`);
check(TUWI_34_CURRICULUM_MAP.length === expectedTotal, `Expected ${expectedTotal} curriculum entries, found ${TUWI_34_CURRICULUM_MAP.length}.`);
check(COURSE_TOTAL_LESSONS === expectedTotal, `COURSE_TOTAL_LESSONS must be ${expectedTotal}.`);

for (const lesson of LESSONS) {
  const { id, title, slug, topicEnglish, topicVietnamese, status } = lesson;
  check(Number.isInteger(id), "Lesson has invalid id.");
  check(id >= 1 && id <= expectedTotal, `Lesson id ${id} is outside 1-${expectedTotal}.`);
  check(!seenIds.has(id), `Duplicate lesson id ${id}.`);
  seenIds.add(id);

  check(Boolean(title), `Lesson ${id} is missing title.`);
  check(Boolean(topicEnglish), `Lesson ${id} is missing topicEnglish.`);
  check(Boolean(topicVietnamese), `Lesson ${id} is missing topicVietnamese.`);
  check(Boolean(slug), `Lesson ${id} is missing slug.`);
  if(slug){
    check(!seenSlugs.has(slug), `Duplicate slug "${slug}" at lesson ${id}.`);
    seenSlugs.add(slug);
  }

  const statusString = typeof status === "object" ? status.content : status;
  check(validStatuses.has(statusString), `Lesson ${id} has invalid status "${statusString}".`);
  check(Array.isArray(lesson.sectionFlow) && lesson.sectionFlow.length > 0, `Lesson ${id} has invalid sectionFlow.`);
  check(Array.isArray(lesson.objectives), `Lesson ${id} has invalid objectives.`);
  check(Array.isArray(lesson.vocabulary), `Lesson ${id} has invalid vocabulary.`);
  check(Array.isArray(lesson.minitest), `Lesson ${id} has invalid minitest.`);
  check(Array.isArray(lesson.homework), `Lesson ${id} has invalid homework.`);
}

for (let id = 1; id <= expectedTotal; id += 1) {
  check(seenIds.has(id), `Missing lesson id ${id}.`);
}

const expectedTitles = new Map([
  [1, "IPA Foundation – Cách đọc một từ tiếng Anh"],
  [2, "Spelling & Letter Sounds – Đánh vần và âm chữ cái"],
  [3, "Diphthongs – Nguyên âm đôi"],
  [4, "BUỔI 4: Long Vowels - Nguyên âm dài"],
  [5, "Fricatives – Âm gió / âm ma sát"],
  [6, "BUỔI 6: Consonants 1 – Phụ âm bật, âm mũi, âm cuối"],
  [7, "BUỔI 7: Consonants 2 – Phụ âm gió & Âm khó"],
  [8, "IPA Review + Word Stress – Tổng ôn IPA và trọng âm"],
]);

for (const [id, title] of expectedTitles) {
  const lesson = lessonById(id);
  check(lesson?.module === "ipa-bootcamp", `Lesson ${id} must be in IPA Bootcamp.`);
  check(lesson?.title === title, `Lesson ${id} title mismatch.`);
  check(lesson?.metadata?.localContentAuthoritative === true, `Lesson ${id} must use local authoritative IPA data.`);
}

const lesson01 = lessonById(1);
check(arrayEquals(lesson01?.sectionFlow || [], IPA_BOOTCAMP_SECTION_FLOW), "Lesson 1 IPA sidebar must have the 20 requested sections in order.");
check(lesson01?.ipa?.sounds?.length === 6, "Lesson 1 must have 6 short vowel sound cards.");
check(lesson01?.ipa?.videoSlots?.length === 7, "Lesson 1 must have 7 video slots.");
check(lesson01?.ipa?.imageSlots?.length === 6, "Lesson 1 must have 6 vocabulary image slots.");
check(lesson01?.ipa?.blendGame?.length >= 4, "Lesson 1 must have blend game data.");
check(lesson01?.ipa?.listenChooseGame?.length >= 4, "Lesson 1 must have listen-and-choose game data.");

const lesson02 = lessonById(2);
check(lesson02?.slug === "spelling-letter-sounds", "Lesson 2 must route to Spelling & Letter Sounds.");
check(lesson02?.track === "spelling-letter-sounds", "Lesson 2 must use the dedicated spelling renderer.");
check(lesson02?.sectionFlow?.length === 16, "Lesson 2 sidebar must have exactly 16 sections.");
check(lesson02?.sectionFlow?.every((section) => section.startsWith("spelling_")), "Lesson 2 must use dedicated spelling sections.");
check(lesson02?.spelling?.letterSounds?.length === 5, "Lesson 2 must compare 5 letter names and sounds.");
check(lesson02?.spelling?.cvcWords?.length === 8, "Lesson 2 must include 8 CVC words.");
check(lesson02?.spelling?.objects?.length === 6, "Lesson 2 must include 6 object spelling cards.");
check(lesson02?.minitest?.length >= 10, "Lesson 2 must include the complete spelling mini test.");
check(lesson02?.homeworkRich?.tasks?.length >= 4, "Lesson 2 must include the requested homework.");

const lesson06 = lessonById(6);
check(lesson06?.sectionFlow?.length === 16, "Lesson 6 sidebar must have the 16 requested sections.");
check(lesson06?.consonants?.sounds?.length === 9, "Lesson 6 must have 9 consonant sound cards.");
check(
  lesson06?.consonants?.sounds?.every((sound) => ["lips", "tongue", "teeth", "air", "voice"].every((key) => Boolean(sound[key]))),
  "Lesson 6 sound cards must include lips, tongue, teeth, air, and voice guidance."
);
check(lesson06?.consonants?.sounds?.find((sound) => sound.symbol === "/ŋ/")?.fixTip?.includes("Không thêm /g/"), "Lesson 6 /ŋ/ card must warn learners not to add /g/.");

const lesson03 = lessonById(3);
check(lesson03?.sectionFlow?.length === 16, "Lesson 3 Diphthongs sidebar must have exactly 16 sections.");
check(lesson03?.ipa?.sounds?.length === 8, "Lesson 3 Diphthongs must have 8 sound cards.");
check(lesson03?.ipa?.videoSlots?.length === 4, "Lesson 3 Diphthongs must have 4 safe video placeholders.");
check(lesson03?.ipa?.imageSlots?.length === 8, "Lesson 3 Diphthongs must have 8 safe image placeholders.");
check(lesson03?.ipa?.blendGame?.length === 8, "Lesson 3 Diphthongs must have 8 blend-game words.");
check(lesson03?.ipa?.listenChooseGame?.length === 8, "Lesson 3 Diphthongs must have 8 listen-and-choose rounds.");
check(lesson03?.ipa?.isGlideLesson === true, "Lesson 3 Diphthongs must enable the glide animation.");

const lesson08 = lessonById(8);
check(lesson08?.sectionFlow?.length === 18, "Lesson 8 IPA review sidebar must have exactly 18 sections.");
check(lesson08?.sectionFlow?.every((section) => section.startsWith("review8_")), "Lesson 8 must use its dedicated review section flow.");
check(lesson08?.shortVowels?.length === 6, "Lesson 8 must review 6 short vowels.");
check(lesson08?.longVowels?.length === 5, "Lesson 8 must review 5 long vowels.");
check(lesson08?.diphthongs?.length === 8, "Lesson 8 must review 8 diphthongs.");
check(new Set([
  ...(lesson08?.shortVowels || []).map((item) => item.symbol),
  ...(lesson08?.longVowels || []).map((item) => item.symbol),
  ...(lesson08?.diphthongs || []).map((item) => item.symbol),
  lesson08?.schwa?.symbol,
  ...(lesson08?.consonants?.stops || []),
  ...(lesson08?.consonants?.nasals || []),
  ...(lesson08?.consonants?.fricatives || []),
].filter(Boolean)).size === 44, "Lesson 8 must include the complete 44-sound IPA map.");
check(lesson08?.wordStress?.examples?.length === 6, "Lesson 8 must include 6 word-stress examples.");
check(Object.values(lesson08?.practiceWords || {}).flatMap((group) => group.words || []).length >= 50, "Lesson 8 must include at least 50 practice words.");
check(lesson08?.practiceSentences?.length === 20, "Lesson 8 must include 20 practice sentences.");
check(lesson08?.finalRecording?.words?.length === 10, "Lesson 8 final recording must include 10 words.");
check(lesson08?.finalRecording?.sentences?.length === 5, "Lesson 8 final recording must include 5 sentences.");
check(lesson08?.minitest?.length >= 13, "Lesson 8 final mini test must include all supplied quiz questions.");
check(lesson08?.mindmap?.branches?.length >= 8, "Lesson 8 must include the complete module mindmap.");
check(lesson08?.homeworkRich?.tasks?.length >= 4, "Lesson 8 must include post-module homework and self-assessment.");

const lesson07 = lessonById(7);
check(lesson07?.slug === "consonants-2-am-gio-va-am-kho-voi-nguoi-viet", "Lesson 7 must route to Consonants 2.");
check(lesson07?.sectionFlow?.length === 18, "Lesson 7 must preserve the 18 requested Consonants 2 sections.");
check(lesson07?.ipa?.sounds?.length === 15, "Lesson 7 must expose all 15 difficult consonant sounds.");
check(lesson07?.ipa?.comparisons?.length === 7, "Lesson 7 must expose all 7 requested consonant comparisons.");

check(!LESSONS.some((lesson) => lesson.slug === "alphabet-and-nouns"), "Old lesson 1 Alphabet and Nouns must not remain in the main route.");
check(lessonById(9)?.slug === "singular-plural-nouns", "Lesson 9 must be old Lesson 2 Singular & Plural Nouns.");
check(lessonById(9)?.title.includes("SINGULAR & PLURAL NOUNS"), "Lesson 9 title must be Singular & Plural Nouns.");
check(lessonById(10)?.slug === "countable-uncountable-nouns", "Lesson 10 must be old Lesson 3 Countable/Uncountable Nouns.");
check(lessonById(11)?.slug === "personal-pronoun", "Lesson 11 must be old Lesson 4 Personal Pronouns.");
check(lessonById(15)?.slug === "capital-letter-rules", "Lesson 15 must be old Lesson 8 Capital Letter Rules.");
check(lessonById(34)?.metadata?.oldLessonId === 27, "Old Lesson 27 must be shifted to Lesson 34.");

const ids = LESSONS.map((lesson) => lesson.id);
check(new Set(ids).size === expectedTotal, "Duplicate lesson ids detected.");
check(!ids.some((id) => id > expectedTotal), `Found lesson id greater than ${expectedTotal}.`);

if (failed) {
  console.error("Validation FAILED.");
  process.exit(1);
}

console.log("Validation PASSED. 34 lessons and IPA Bootcamp mapping are correct.");

function lessonById(id){
  return LESSONS.find((lesson) => lesson.id === id);
}

function check(ok, message){
  if(ok) return;
  console.error(`ERROR: ${message}`);
  failed = true;
}

function arrayEquals(a, b){
  return a.length === b.length && a.every((item, index) => item === b[index]);
}
