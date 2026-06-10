import { supabase } from "../../lib/supabase/client.js";

export async function listStudents(filter = "pending"){
  let query = supabase
    .from("profiles")
    .select("id, full_name, phone, email, role, status, note, created_at, updated_at")
    .eq("role", "student")
    .order("created_at", { ascending: false });

  if(filter !== "all") query = query.eq("status", filter);
  return query;
}

export async function updateStudentStatus(studentId, status){
  return supabase
    .from("profiles")
    .update({ status })
    .eq("id", studentId)
    .eq("role", "student")
    .select("id, status")
    .single();
}

export async function approveStudentForClass(studentId, classId, adminId){
  const now = new Date().toISOString();

  const current = await supabase
    .from("profiles")
    .select("id, status")
    .eq("id", studentId)
    .eq("role", "student")
    .maybeSingle();
  if(current.error) return { data: null, error: current.error };

  const profileResult = await supabase
    .from("profiles")
    .update({ status: "approved" })
    .eq("id", studentId)
    .eq("role", "student")
    .select("id, status")
    .single();
  if(profileResult.error) return profileResult;

  const membershipResult = await supabase
    .from("class_memberships")
    .upsert({
      class_id: classId,
      student_id: studentId,
      status: "approved",
      approved_by: adminId,
      approved_at: now,
      rejected_at: null,
    }, { onConflict: "class_id,student_id" })
    .select("id, class_id, student_id, status")
    .single();
  if(membershipResult.error) return { data: null, error: membershipResult.error };

  await logApprovalAction({
    studentId,
    adminId,
    classId,
    action: "approved",
    oldStatus: current.data?.status || null,
    newStatus: "approved",
  });

  return {
    data: {
      profile: profileResult.data,
      membership: membershipResult.data,
    },
    error: null,
  };
}

export async function rejectStudent(studentId, adminId, classId = null){
  const current = await supabase
    .from("profiles")
    .select("id, status")
    .eq("id", studentId)
    .eq("role", "student")
    .maybeSingle();
  if(current.error) return { data: null, error: current.error };

  const profileResult = await supabase
    .from("profiles")
    .update({ status: "rejected" })
    .eq("id", studentId)
    .eq("role", "student")
    .select("id, status")
    .single();
  if(profileResult.error) return profileResult;

  await logApprovalAction({
    studentId,
    adminId,
    classId,
    action: "rejected",
    oldStatus: current.data?.status || null,
    newStatus: "rejected",
  });

  return { data: profileResult.data, error: null };
}

export async function logApprovalAction({ studentId, adminId, classId, action, oldStatus, newStatus }){
  return supabase
    .from("approval_logs")
    .insert({
      user_id: studentId,
      admin_id: adminId,
      class_id: classId,
      action,
      old_status: oldStatus,
      new_status: newStatus,
    });
}

export async function listClasses(){
  return supabase
    .from("classes")
    .select("id, name, description, level, status, created_by, created_at, updated_at")
    .order("created_at", { ascending: false });
}

export async function createClass(data){
  return supabase
    .from("classes")
    .insert({
      name: data.name,
      description: data.description || null,
      level: data.level || "A1",
      status: data.status || "active",
    })
    .select("id, name, description, level, status, created_at")
    .single();
}

export async function updateClass(id, data){
  const payload = {};
  if("name" in data) payload.name = data.name;
  if("description" in data) payload.description = data.description || null;
  if("level" in data) payload.level = data.level || "A1";
  if("status" in data) payload.status = data.status;

  return supabase
    .from("classes")
    .update(payload)
    .eq("id", id)
    .select("id, name, description, level, status, updated_at")
    .single();
}

export async function listPendingClassRequests(){
  return supabase
    .from("class_memberships")
    .select(`
      id,
      class_id,
      student_id,
      status,
      created_at,
      approved_at,
      rejected_at,
      classes(id, name, level, status)
    `)
    .eq("status", "pending")
    .order("created_at", { ascending: true });
}

export async function listClassMemberships(){
  return supabase
    .from("class_memberships")
    .select(`
      id,
      class_id,
      student_id,
      status,
      created_at,
      approved_at,
      rejected_at,
      classes(id, name, level, status)
    `)
    .order("created_at", { ascending: false });
}

export async function updateClassMembershipStatus(id, status, adminId){
  const now = new Date().toISOString();
  const payload = { status };

  if(status === "approved"){
    payload.approved_by = adminId;
    payload.approved_at = now;
    payload.rejected_at = null;
  }
  if(status === "rejected"){
    payload.rejected_at = now;
  }
  if(status === "removed"){
    payload.rejected_at = now;
  }

  return supabase
    .from("class_memberships")
    .update(payload)
    .eq("id", id)
    .select("id, status, approved_by, approved_at, rejected_at")
    .single();
}

export async function listStudentProgress(){
  return supabase
    .from("student_lesson_progress")
    .select(`
      id,
      student_id,
      class_id,
      lesson_id,
      status,
      progress_percent,
      completed_at,
      last_opened_at,
      updated_at,
      lessons(lesson_number, title),
      classes(id, name)
    `)
    .order("updated_at", { ascending: false });
}

export async function getStudentProgress(studentId){
  return supabase
    .from("student_lesson_progress")
    .select("*, lessons(lesson_number,title), classes(id,name)")
    .eq("student_id", studentId)
    .order("updated_at", { ascending: false });
}
