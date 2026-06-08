import { subscribeToTable, unsubscribe } from "../../lib/supabase/realtime.js";

export function subscribeToMyProgress(studentId, callback){
  if(!studentId) return null;
  return subscribeToTable({
    table: "student_lesson_progress",
    filter: `student_id=eq.${studentId}`,
    callback,
  });
}

export { unsubscribe };
