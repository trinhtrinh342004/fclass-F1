import { supabase } from "../../lib/supabase/client.js";

const STATUS_ACTIONS = {
  approve: "approved",
  reject: "rejected",
  block: "blocked",
  unblock: "approved",
};

export async function listStudents(filter = "pending"){
  let query = supabase
    .from("profiles")
    .select("id, full_name, phone, email, role, status, note, created_at")
    .order("created_at", { ascending: false });

  if(filter !== "all") query = query.eq("status", filter);
  return query;
}

export async function updateStudentStatus(id, status){
  return supabase.from("profiles").update({ status }).eq("id", id);
}

export function approveStudent(id){
  return updateStudentStatus(id, STATUS_ACTIONS.approve);
}

export function rejectStudent(id){
  return updateStudentStatus(id, STATUS_ACTIONS.reject);
}

export function blockStudent(id){
  return updateStudentStatus(id, STATUS_ACTIONS.block);
}

export function unblockStudent(id){
  return updateStudentStatus(id, STATUS_ACTIONS.unblock);
}
