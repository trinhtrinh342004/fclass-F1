import { LESSONS as LEGACY_LESSONS } from "../lessons/legacyLessonsData.js";
import { TUWI_34_CURRICULUM_MAP } from "./curriculumMap.js";
import { IPA_BOOTCAMP_LESSONS } from "./ipaBootcampLessons.js";
import { normalizeLessonToBuoi9Architecture } from "../lessons/lessonArchitecture.js";

import { lesson01 } from "../lessons/lesson-01-alphabet-and-nouns.js";
import { lesson02 } from "../lessons/lesson-02-singular-plural-nouns.js";
import { lesson04 } from "../lessons/lesson-04-personal-pronouns.js";
import { lesson08 } from "../lessons/lesson-08-capital-letter-rules.js";
import { lesson11 } from "../lessons/lesson-11-prepositions-of-time.js";
import { lesson23 } from "../lessons/lesson-23-numbers-and-time.js";
import { lesson25 } from "../lessons/lesson-25-past-continuous.js";
import { lesson26 } from "../lessons/lesson-26-tag-questions.js";

const LOCAL_LESSON_CONTENT_BY_OLD_ID = {
  1: lesson01,
  2: lesson02,
  4: lesson04,
  8: lesson08,
  11: lesson11,
  23: lesson23,
  25: lesson25,
  26: lesson26,
};

const EMPTY_SECTION_FLOW = ["intro", "homework"];

export const TUWI_34_LESSONS = TUWI_34_CURRICULUM_MAP.map((entry) => {
  const ipaLesson = IPA_BOOTCAMP_LESSONS.find((lesson) => lesson.id === entry.lessonId);
  if(ipaLesson) return structuredClone(ipaLesson);

  const oldLessonId = entry.originalLessonId || entry.lessonId;
  if (["draft", "partial", "ready"].includes(entry.status) && LOCAL_LESSON_CONTENT_BY_OLD_ID[oldLessonId]) {
    const rawDraft = remapLocalLessonContent(LOCAL_LESSON_CONTENT_BY_OLD_ID[oldLessonId], entry);
    const lessonObj = normalizeLessonToBuoi9Architecture({
      ...rawDraft,
      id: entry.lessonId,
      lessonNumber: entry.lessonId,
      dayNumber: entry.lessonId,
      slug: entry.slug,
      topicEnglish: entry.topicEnglish,
      topicVietnamese: entry.topicVietnamese,
      status: entry.status,
      sourceLessons: entry.sourceLessons,
      metadata: {
        ...(rawDraft.metadata || {}),
        curriculum: entry,
        status: {
          content: entry.status,
          code: "tuwi34",
          import: "manual"
        }
      }
    });
    return lessonObj;
  }

  const sources = entry.sourceLessons
    .map((id) => LEGACY_LESSONS.find((lesson) => lesson.id === id))
    .filter(Boolean);

  if(entry.status === "empty" || !sources.length){
    return createEmptyLesson(entry);
  }

  return createMappedLesson(entry, sources);
});

function createMappedLesson(entry, sources){
  const base = structuredClone(sources[0]);
  return {
    ...base,
    id: entry.lessonId,
    unit: `Tuwi ${Math.ceil(entry.lessonId / 3)}`,
    title: `${entry.topicEnglish} - ${entry.topicVietnamese}`,
    titleEn: entry.topicEnglish,
    titleVi: entry.topicVietnamese,
    subtitle: entry.topicVietnamese,
    mainTopic: entry.topicEnglish,
    slug: entry.slug,
    topicEnglish: entry.topicEnglish,
    topicVietnamese: entry.topicVietnamese,
    status: entry.status,
    sourceLessons: entry.sourceLessons,
    metadata: {
      ...(base.metadata || {}),
      curriculum: entry,
      status: {
        ...(base.metadata?.status || {}),
        content: entry.status,
        code: "tuwi34",
      },
      sourceLessonIds: entry.sourceLessons,
      oldLessonId: entry.originalLessonId || entry.lessonId,
    },
    curriculumStatus: entry.status,
    curriculumNotes: entry.notes,
  };
}

function createEmptyLesson(entry){
  return {
    id: entry.lessonId,
    unit: `Tuwi ${Math.ceil(entry.lessonId / 3)}`,
    title: `${entry.topicEnglish} - ${entry.topicVietnamese}`,
    titleEn: entry.topicEnglish,
    titleVi: entry.topicVietnamese,
    subtitle: "Nội dung đang được biên soạn.",
    cefrLevel: "A1",
    mainTopic: entry.topicEnglish,
    slug: entry.slug,
    topicEnglish: entry.topicEnglish,
    topicVietnamese: entry.topicVietnamese,
    status: entry.status,
    sourceLessons: entry.sourceLessons,
    sectionFlow: EMPTY_SECTION_FLOW,
    objectives: ["Nội dung đang được biên soạn."],
    intro: {
      focusTitle: "Nội dung đang được biên soạn",
      focusText: "Nội dung đang được biên soạn.",
    },
    vocabulary: [],
    minitest: [],
    homework: ["Nội dung đang được biên soạn."],
    metadata: {
      curriculum: entry,
      status: {
        content: "empty",
        code: "tuwi34",
        import: "draft",
      },
      sourceLessonIds: [],
    },
    curriculumStatus: "empty",
    curriculumNotes: entry.notes,
  };
}

export const TUWI_27_LESSONS = TUWI_34_LESSONS;

function remapLocalLessonContent(rawLesson, entry){
  const clone = structuredClone(rawLesson);
  const newId = entry.lessonId;
  const oldId = entry.originalLessonId || rawLesson.id || newId;
  clone.id = newId;
  clone.lessonNumber = newId;
  clone.dayNumber = newId;
  clone.unit = `Tuwi ${Math.ceil(newId / 3)}`;
  clone.title = replaceLessonNumberInText(clone.title, oldId, newId);
  clone.titleEn = replaceLessonNumberInText(clone.titleEn, oldId, newId);
  clone.titleVi = replaceLessonNumberInText(clone.titleVi, oldId, newId);
  clone.metadata = {
    ...(clone.metadata || {}),
    oldLessonId: oldId,
    lessonNumber: newId,
    dayNumber: newId,
  };
  return clone;
}

function replaceLessonNumberInText(value, oldId, newId){
  if(typeof value !== "string") return value;
  return value
    .replace(new RegExp(`BUỔI\\s+${oldId}\\b`, "gi"), `BUỔI ${newId}`)
    .replace(new RegExp(`Buổi\\s+${oldId}\\b`, "g"), `Buổi ${newId}`);
}
