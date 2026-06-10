import { getCurrentUser } from "../../lib/supabase/auth.js";
import { debugSupabaseAuth, supabase, withSupabaseTimeout } from "../../lib/supabase/client.js";
import { getLessonRowIdByNumber } from "../lessons/lessonRepository.js";

export async function listActiveClasses(){
  debugSupabaseAuth("classes query start");
  try{
    const result = await withSupabaseTimeout(
      supabase
        .from("classes")
        .select("id, name, description, level, status, created_at")
        .eq("status", "active")
        .order("created_at", { ascending: false }),
      "classes.select.active",
    );
    debugSupabaseAuth("classes query end", {
      count: result.data?.length || 0,
      error: result.error?.message || null,
    });
    return result;
  }catch(error){
    debugSupabaseAuth("classes query failed", { error: error.message });
    return { data: [], error };
  }
}

export async function requestJoinClass(classId){
  const { user, error } = await getCurrentUser();
  if(error || !user) return { data: null, error: error || new Error("Vui lòng đăng nhập để xin vào lớp.") };

  return supabase
    .from("class_memberships")
    .insert({
      class_id: classId,
      student_id: user.id,
      status: "pending",
    })
    .select("id, class_id, student_id, status, created_at")
    .single();
}

export async function getMyClassMemberships(){
  const { user, error } = await getCurrentUser();
  if(error || !user) return { data: [], error: error || null };

  debugSupabaseAuth("class_memberships query start", { userId: user.id });
  try{
    const result = await withSupabaseTimeout(
      supabase
        .from("class_memberships")
        .select("id, class_id, student_id, status, approved_at, rejected_at, created_at, classes(id, name, description, level, status)")
        .eq("student_id", user.id)
        .order("created_at", { ascending: false }),
      "class_memberships.select.mine",
    );
    debugSupabaseAuth("class_memberships query end", {
      userId: user.id,
      count: result.data?.length || 0,
      statuses: (result.data || []).map((item) => item.status),
      error: result.error?.message || null,
    });
    return result;
  }catch(error){
    debugSupabaseAuth("class_memberships query failed", { userId: user.id, error: error.message });
    return { data: [], error };
  }
}

export async function getMyApprovedClasses(){
  const result = await getMyClassMemberships();
  if(result.error) return result;
  return {
    data: (result.data || []).filter((membership) => membership.status === "approved" && membership.classes?.status === "active"),
    error: null,
  };
}

export async function getMyProgress(){
  const { user, error } = await getCurrentUser();
  if(error || !user) return { data: [], error: error || null };

  try{
    const result = await withSupabaseTimeout(
      supabase
        .from("student_lesson_progress")
        .select("id, lesson_id, class_id, status, progress_percent, completed_at, last_opened_at, data, lessons(lesson_number), classes(id, name)")
        .eq("student_id", user.id),
      "student_lesson_progress.select.dashboard",
    );
    debugSupabaseAuth("student dashboard progress query end", {
      userId: user.id,
      count: result.data?.length || 0,
      error: result.error?.message || null,
    });
    return result;
  }catch(queryError){
    debugSupabaseAuth("student dashboard progress query failed", { userId: user.id, error: queryError.message });
    return { data: [], error: queryError };
  }
}

export async function upsertLessonProgress({ lessonId, classId, status = "in_progress", progressPercent = 0, data = {} }){
  const { user, error } = await getCurrentUser();
  const dbLessonId = await getLessonRowIdByNumber(lessonId);
  if(error || !user) return { data: null, error: error || new Error("Vui lòng đăng nhập để lưu tiến độ.") };
  if(!dbLessonId) return { data: null, error: new Error("Không tìm thấy lesson trong Supabase.") };
  if(!classId) return { data: null, error: new Error("Học viên cần được duyệt vào lớp trước khi lưu tiến độ.") };

  const payload = {
    student_id: user.id,
    class_id: classId,
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
      "student_lesson_progress.upsert.dashboard",
    );
  }catch(queryError){
    return { data: null, error: queryError };
  }
}

export async function getPrimaryApprovedClassId(){
  const { data, error } = await getMyApprovedClasses();
  if(error) return { classId: null, error };
  return { classId: data?.[0]?.class_id || null, error: null };
}

export async function requireApprovedClassMembership(){
  const { data, error } = await getMyApprovedClasses();
  if(error) return { ok: false, error, membership: null };
  const membership = data?.[0] || null;
  return { ok: Boolean(membership), error: null, membership };
}
