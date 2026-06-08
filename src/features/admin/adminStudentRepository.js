import { supabase } from "../../lib/supabase/client.js";

export async function listStudents(filter = "pending"){
  let query = supabase
    .from("profiles")
    .select("id, full_name, phone, email, role, status, note, created_at")
    .order("created_at", { ascending: false });

  if(filter !== "all") query = query.eq("status", filter);
  return query;
}

export async function updateStudentStatus(studentId, status){
  return supabase.from("profiles").update({ status }).eq("id", studentId);
}

export async function getStudentProgress(studentId){
  return supabase
    .from("student_lesson_progress")
    .select("*, lessons(lesson_number,title)")
    .eq("student_id", studentId)
    .order("updated_at", { ascending: false });
}
