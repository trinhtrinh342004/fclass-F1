import { LESSONS } from "./lessonRegistry.js";

export function getAllLessons(){
  return [...LESSONS].sort((a, b) => a.id - b.id);
}

export function getLessonById(id){
  return getAllLessons().find((lesson) => lesson.id === Number(id)) || null;
}

export function isValidLessonId(id){
  return Boolean(getLessonById(id));
}
