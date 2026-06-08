import {
  LESSON_ARCHITECTURE_WARNINGS as LEGACY_LESSON_ARCHITECTURE_WARNINGS,
  canonicalLessonSections,
  lessonArchitectureV1,
} from "./legacyLessonsData.js";
import { TUWI_27_LESSONS } from "../curriculum/tuwi27Lessons.js";

export const LESSONS = TUWI_27_LESSONS;

const activeSourceIds = new Set(
  LESSONS.flatMap((lesson) => lesson.metadata?.sourceLessonIds || [])
);

export const LESSON_ARCHITECTURE_WARNINGS = LEGACY_LESSON_ARCHITECTURE_WARNINGS
  .filter((warning) => activeSourceIds.has(warning.id));

export { canonicalLessonSections, lessonArchitectureV1 };
