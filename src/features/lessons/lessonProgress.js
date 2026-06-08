const STORAGE_KEY = "gateway_a1_progress_v2";

export function loadLessonProgress(){
  try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { done: [], hw: {}, sectionsDone: {} }; }
  catch{ return { done: [], hw: {}, sectionsDone: {} }; }
}

export function saveLessonProgress(progress){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }catch{}
}
