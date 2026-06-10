import { getCurrentUser } from "../../lib/supabase/auth.js";
import { debugSupabaseAuth, hasSupabaseConfig, supabase, withSupabaseTimeout } from "../../lib/supabase/client.js";
import { getLessonRowIdByNumber } from "../lessons/lessonRepository.js";
import { getPrimaryApprovedClassId } from "../student/studentRepository.js";

const STORAGE_KEY = "gateway_a1_progress_v2";
const MIGRATED_KEY = "gateway_a1_progress_v2_migrated";
const IPA34_MIGRATED_KEY = "gateway_a1_progress_v2_ipa34_migrated";
const IPA34_LEGACY_LESSON1_ARCHIVE_KEY = "gateway_a1_progress_v2_legacy_lesson1_archive";

export async function getMyProgress(){
  const { user } = await getCurrentUser();
  if(!user || !hasSupabaseConfig || !supabase) return { data: [], error: null };

  try{
    const result = await withSupabaseTimeout(
      supabase
        .from("student_lesson_progress")
        .select("id, lesson_id, status, progress_percent, completed_at, last_opened_at, data, lessons(lesson_number)")
        .eq("student_id", user.id),
      "student_lesson_progress.select.mine",
    );
    debugSupabaseAuth("progress query end", {
      userId: user.id,
      count: result.data?.length || 0,
      error: result.error?.message || null,
    });
    return result;
  }catch(error){
    debugSupabaseAuth("progress query failed", { userId: user.id, error: error.message });
    return { data: [], error };
  }
}

export async function getProgressByLesson(lessonNumber){
  const { user } = await getCurrentUser();
  const lessonId = await getLessonRowIdByNumber(lessonNumber);
  if(!user || !lessonId || !hasSupabaseConfig || !supabase) return { data: null, error: null };

  try{
    return await withSupabaseTimeout(
      supabase
        .from("student_lesson_progress")
        .select("*")
        .eq("student_id", user.id)
        .eq("lesson_id", lessonId)
        .maybeSingle(),
      "student_lesson_progress.select.byLesson",
    );
  }catch(error){
    return { data: null, error };
  }
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

  try{
    return await withSupabaseTimeout(
      supabase
        .from("student_lesson_progress")
        .upsert(payload, { onConflict: "student_id,lesson_id" })
        .select()
        .single(),
      "student_lesson_progress.upsert.mine",
    );
  }catch(error){
    return { data: null, error };
  }
}

export async function markLessonOpened(lessonId){
  const existing = await getProgressByLesson(lessonId);
  if(existing.data?.status === "completed"){
    await logStudentActivity({ lessonNumber: lessonId, action: "lesson_opened_again", metadata: { completed: true } });
    try{
      return await withSupabaseTimeout(
        supabase
          .from("student_lesson_progress")
          .update({ last_opened_at: new Date().toISOString() })
          .eq("id", existing.data.id),
        "student_lesson_progress.update.lastOpened",
      );
    }catch(error){
      return { data: null, error };
    }
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

  const remapped = remapLegacyProgressNumbering({ done, sectionsDone, hw: homework });
  for(const lessonId of new Set([...remapped.done, ...Object.keys(remapped.sectionsDone).map(Number), ...Object.keys(remapped.hw).map(Number)])){
    const completed = remapped.done.includes(lessonId);
    await upsertMyLessonProgress({
      lessonId,
      classId: approvedClass.classId,
      status: completed ? "completed" : "in_progress",
      progressPercent: completed ? 100 : 50,
      data: {
        migratedFromLocalStorage: true,
        sectionsDone: remapped.sectionsDone[lessonId] || [],
        homework: remapped.hw[lessonId] || [],
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

function remapLegacyProgressNumbering(progress){
  if(localStorage.getItem(IPA34_MIGRATED_KEY) === "true") return progress;
  const allIds = [
    ...progress.done,
    ...Object.keys(progress.sectionsDone || {}).map(Number),
    ...Object.keys(progress.hw || {}).map(Number),
  ].filter(Number.isFinite);
  if(allIds.some((id) => id >= 28)){
    localStorage.setItem(IPA34_MIGRATED_KEY, "true");
    return progress;
  }

  const legacyLesson1 = {
    done: progress.done.includes(1),
    sectionsDone: progress.sectionsDone?.[1] || [],
    hw: progress.hw?.[1] || [],
  };
  if(legacyLesson1.done || legacyLesson1.sectionsDone.length || legacyLesson1.hw.length){
    localStorage.setItem(IPA34_LEGACY_LESSON1_ARCHIVE_KEY, JSON.stringify(legacyLesson1));
  }

  const remapId = (id) => {
    const numeric = Number(id);
    if(!Number.isFinite(numeric) || numeric === 1) return null;
    return numeric >= 2 && numeric <= 27 ? numeric + 7 : numeric;
  };
  const mapObjectKeys = (obj) => Object.entries(obj || {}).reduce((acc, [key, value]) => {
    const mapped = remapId(key);
    if(mapped) acc[mapped] = value;
    return acc;
  }, {});
  const migrated = {
    done: [...new Set(progress.done.map(remapId).filter(Boolean))],
    sectionsDone: mapObjectKeys(progress.sectionsDone),
    hw: mapObjectKeys(progress.hw),
  };
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    localStorage.setItem(IPA34_MIGRATED_KEY, "true");
  }catch{}
  return migrated;
}

async function logStudentActivity({ lessonNumber, action, metadata = {} }){
  const { user } = await getCurrentUser();
  const lessonId = await getLessonRowIdByNumber(lessonNumber);
  if(!user || !lessonId || !hasSupabaseConfig || !supabase) return { data: null, error: null };

  try{
    return await withSupabaseTimeout(
      supabase.from("student_activity_logs").insert({
        student_id: user.id,
        lesson_id: lessonId,
        action,
        metadata,
      }),
      "student_activity_logs.insert",
    );
  }catch(error){
    return { data: null, error };
  }
}
