import { getCurrentUser } from "../../lib/supabase/auth.js";
import { hasSupabaseConfig, supabase } from "../../lib/supabase/client.js";
import { getLessonRowIdByNumber } from "../lessons/lessonRepository.js";
import { getPrimaryApprovedClassId } from "../student/studentRepository.js";

const STORAGE_KEY = "gateway_a1_progress_v2";
const MIGRATED_KEY = "gateway_a1_progress_v2_migrated";

export async function getMyProgress(){
  const { user } = await getCurrentUser();
  if(!user || !hasSupabaseConfig || !supabase) return { data: [], error: null };

  return supabase
    .from("student_lesson_progress")
    .select("id, lesson_id, status, progress_percent, completed_at, last_opened_at, data, lessons(lesson_number)")
    .eq("student_id", user.id);
}

export async function getProgressByLesson(lessonNumber){
  const { user } = await getCurrentUser();
  const lessonId = await getLessonRowIdByNumber(lessonNumber);
  if(!user || !lessonId || !hasSupabaseConfig || !supabase) return { data: null, error: null };

  return supabase
    .from("student_lesson_progress")
    .select("*")
    .eq("student_id", user.id)
    .eq("lesson_id", lessonId)
    .maybeSingle();
}

export async function upsertMyLessonProgress({ lessonId, classId, status = "in_progress", progressPercent = 0, data = {} }){
  const { user } = await getCurrentUser();
  const dbLessonId = await getLessonRowIdByNumber(lessonId);
  if(!user || !dbLessonId || !hasSupabaseConfig || !supabase) return { data: null, error: null };
  const approvedClass = classId ? { classId, error: null } : await getPrimaryApprovedClassId();
  if(approvedClass.error) return { data: null, error: approvedClass.error };
  if(!approvedClass.classId) return { data: null, error: new Error("Học viên cần được admin duyệt vào lớp trước khi lưu tiến độ.") };

  const payload = {
    student_id: user.id,
    class_id: approvedClass.classId,
    lesson_id: dbLessonId,
    status,
    progress_percent: progressPercent,
    data,
    last_opened_at: new Date().toISOString(),
  };
  if(status === "completed") payload.completed_at = new Date().toISOString();

  return supabase
    .from("student_lesson_progress")
    .upsert(payload, { onConflict: "student_id,lesson_id" })
    .select()
    .single();
}

export async function markLessonOpened(lessonId){
  const existing = await getProgressByLesson(lessonId);
  if(existing.data?.status === "completed"){
    await logStudentActivity({ lessonNumber: lessonId, action: "lesson_opened_again", metadata: { completed: true } });
    return supabase
      .from("student_lesson_progress")
      .update({ last_opened_at: new Date().toISOString() })
      .eq("id", existing.data.id);
  }

  const result = await upsertMyLessonProgress({
    lessonId,
    status: "in_progress",
    progressPercent: 1,
    data: { openedFrom: "app" },
  });
  await logStudentActivity({ lessonNumber: lessonId, action: "lesson_opened" });
  return result;
}

export async function markLessonCompleted(lessonId){
  const result = await upsertMyLessonProgress({
    lessonId,
    status: "completed",
    progressPercent: 100,
    data: { completedFrom: "app" },
  });
  await logStudentActivity({ lessonNumber: lessonId, action: "lesson_completed" });
  return result;
}

export async function migrateLocalProgressToSupabase(){
  if(localStorage.getItem(MIGRATED_KEY) === "true") return { migrated: false, reason: "already-migrated" };
  const approvedClass = await getPrimaryApprovedClassId();
  if(approvedClass.error) return { migrated: false, reason: "class-check-error", error: approvedClass.error };
  if(!approvedClass.classId) return { migrated: false, reason: "no-approved-class" };

  let localProgress;
  try{
    localProgress = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  }catch{
    localProgress = {};
  }

  const done = Array.isArray(localProgress.done) ? localProgress.done : [];
  const sectionsDone = localProgress.sectionsDone || {};
  const homework = localProgress.hw || {};
  if(!done.length && !Object.keys(sectionsDone).length && !Object.keys(homework).length){
    localStorage.setItem(MIGRATED_KEY, "true");
    return { migrated: false, reason: "empty" };
  }

  for(const lessonId of new Set([...done, ...Object.keys(sectionsDone).map(Number), ...Object.keys(homework).map(Number)])){
    const completed = done.includes(lessonId);
    await upsertMyLessonProgress({
      lessonId,
      classId: approvedClass.classId,
      status: completed ? "completed" : "in_progress",
      progressPercent: completed ? 100 : 50,
      data: {
        migratedFromLocalStorage: true,
        sectionsDone: sectionsDone[lessonId] || [],
        homework: homework[lessonId] || [],
      },
    });
  }

  localStorage.setItem(MIGRATED_KEY, "true");
  return { migrated: true };
}

export function remoteProgressToLocalShape(rows = []){
  const done = [];
  const sectionsDone = {};
  const hw = {};

  for(const row of rows){
    const lessonNumber = row.lessons?.lesson_number || row.lesson_number;
    if(!lessonNumber) continue;
    if(row.status === "completed") done.push(lessonNumber);
    if(row.data?.sectionsDone) sectionsDone[lessonNumber] = row.data.sectionsDone;
    if(row.data?.homework) hw[lessonNumber] = row.data.homework;
  }

  return { done, sectionsDone, hw };
}

async function logStudentActivity({ lessonNumber, action, metadata = {} }){
  const { user } = await getCurrentUser();
  const lessonId = await getLessonRowIdByNumber(lessonNumber);
  if(!user || !lessonId || !hasSupabaseConfig || !supabase) return { data: null, error: null };

  return supabase.from("student_activity_logs").insert({
    student_id: user.id,
    lesson_id: lessonId,
    action,
    metadata,
  });
}
