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
  [2, "Short vs Long Vowels – Nguyên âm ngắn và dài"],
  [3, "Diphthongs – Nguyên âm đôi"],
  [4, "Stop Sounds & Nasals – Âm bật và âm mũi"],
  [5, "Fricatives – Âm gió / âm ma sát"],
  [6, "Difficult Consonants – Âm dễ sai với người Việt"],
  [7, "Word Stress & Schwa – Trọng âm và âm /ə/"],
  [8, "IPA Review – Tổng ôn IPA và đọc từ/câu"],
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
