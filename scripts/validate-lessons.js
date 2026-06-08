#!/usr/bin/env node
import { LESSONS, LESSON_ARCHITECTURE_WARNINGS, canonicalLessonSections } from "../src/features/lessons/lessonRegistry.js";

let failed = false;

if(LESSONS.length !== 27){
  console.error(`Expected 27 lessons, found ${LESSONS.length}.`);
  failed = true;
}

for(const lesson of LESSONS){
  if(lesson.curriculumStatus === "empty") continue;
  const flow = lesson.sectionFlow || [];
  const sameFlow = flow.length === canonicalLessonSections.length &&
    flow.every((section, index) => section === canonicalLessonSections[index]);
  if(!sameFlow && !lesson.architecture?.sectionFlowOverride){
    console.error(`Buổi ${lesson.id}: sectionFlow does not match canonicalLessonSections.`);
    failed = true;
  }
}

for(const id of [9, 11, 12, 27]){
  const lesson = LESSONS.find(item => item.id === id);
  if(!lesson){
    console.error(`Buổi ${id}: missing.`);
    failed = true;
    continue;
  }
  const warnings = lesson.__architectureWarnings || [];
  if(warnings.length){
    console.warn(`Buổi ${id}: legacy source still has architecture warnings:`);
    for(const warning of warnings) console.error(`- ${warning}`);
  }
}

if(LESSON_ARCHITECTURE_WARNINGS.length){
  console.warn(`Architecture warnings for ${LESSON_ARCHITECTURE_WARNINGS.length} lesson(s). Student UI can still render placeholders.`);
}

const expectedHouseVocabulary = {
  room: { vi: "căn phòng", ipaIncludes: "ruːm" },
  kitchen: { vi: "phòng bếp", ipaIncludes: "kɪtʃ", forbiddenIpa: ["ru:m", "ruːm", "/ru:m/"] },
  "living room": { vi: "phòng khách", ipaIncludes: "lɪvɪŋ" },
  bedroom: { vi: "phòng ngủ", ipaIncludes: "bedruːm" },
  bathroom: { vi: "phòng tắm", ipaIncludes: "bæθruːm" },
  garage: { vi: "nhà để xe", ipaIncludes: "ɡə" },
  classroom: { ipaIncludes: "klæsruːm" },
  table: { ipaIncludes: "teɪbəl" },
  chair: { vi: "cái ghế", ipaIncludes: "tʃer" },
  bed: { vi: "cái giường", ipaIncludes: "bed" },
  sofa: { vi: "ghế sofa", ipaIncludes: "soʊfə" },
  lamp: { vi: "đèn", ipaIncludes: "læmp" }
};

for(const lessonId of [11, 12]){
  const lesson = LESSONS.find(item => item.id === lessonId);
  if(!lesson) continue;
  validateVocabularySet(`Buổi ${lessonId} vocabulary`, lesson.vocabulary || []);
  validateVocabularySet(`Buổi ${lessonId} review vocabulary`, lesson.review?.reviewGames?.vocabulary || []);
  validateVocabularySet(`Buổi ${lessonId} listenPick`, lesson.listenPick?.questions || []);
}

function validateVocabularySet(label, items){
  for(const item of items || []){
    const english = normalizeEnglish(item.en || item.audio || item.audioText || item.word);
    const rule = expectedHouseVocabulary[english];
    if(!rule) continue;

    const ipa = String(item.ipa || item.phonetic || "");
    const vi = String(item.vi || item.vietnamese || "");
    if(rule.ipaIncludes && !ipa.includes(rule.ipaIncludes)){
      console.error(`${label}: "${english}" IPA mismatch. Found "${ipa}", expected to contain "${rule.ipaIncludes}".`);
      failed = true;
    }
    if(rule.forbiddenIpa?.some(forbidden => normalizeIpa(ipa).includes(normalizeIpa(forbidden)))){
      console.error(`${label}: "${english}" must not use room IPA. Found "${ipa}".`);
      failed = true;
    }
    if(rule.vi && vi && vi !== rule.vi){
      console.error(`${label}: "${english}" Vietnamese mismatch. Found "${vi}", expected "${rule.vi}".`);
      failed = true;
    }
  }
}

function normalizeEnglish(text){
  return String(text || "").trim().toLowerCase();
}

function normalizeIpa(text){
  return String(text || "").replace(/[\/\s]/g, "").toLowerCase();
}

if(failed) process.exit(1);
console.log(`Validated ${LESSONS.length} lessons against Lesson Architecture V1.`);
