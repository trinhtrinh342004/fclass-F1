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
