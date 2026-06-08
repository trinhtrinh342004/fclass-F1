import { LESSONS as LEGACY_LESSONS } from "../lessons/legacyLessonsData.js";
import { TUWI_27_CURRICULUM_MAP } from "./curriculumMap.js";

const EMPTY_SECTION_FLOW = ["intro", "homework"];

export const TUWI_27_LESSONS = TUWI_27_CURRICULUM_MAP.map((entry) => {
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
    metadata: {
      ...(base.metadata || {}),
      curriculum: entry,
      status: {
        ...(base.metadata?.status || {}),
        content: entry.status,
        code: "tuwi27",
      },
      sourceLessonIds: entry.sourceLessons,
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
        code: "tuwi27",
        import: "draft",
      },
      sourceLessonIds: [],
    },
    curriculumStatus: "empty",
    curriculumNotes: entry.notes,
  };
}
