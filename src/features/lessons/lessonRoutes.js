import { getLessonById } from "./lessonService.js";

export function resolveLessonRoute(pathname = window.location.pathname){
  const match = pathname.match(/^\/lesson\/(\d+)$/);
  if(!match) return { matched: false };

  const lesson = getLessonById(Number(match[1]));
  return lesson
    ? { matched: true, lesson }
    : { matched: true, redirect: "/" };
}
