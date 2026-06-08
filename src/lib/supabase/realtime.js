import { hasSupabaseConfig, supabase } from "./client.js";

export function subscribeToTable({ table, event = "*", filter, callback }){
  if(!hasSupabaseConfig || !supabase) return null;

  const channel = supabase.channel(`realtime:${table}:${filter || "all"}:${crypto.randomUUID()}`);
  channel
    .on("postgres_changes", {
      event,
      schema: "public",
      table,
      ...(filter ? { filter } : {}),
    }, callback)
    .subscribe();

  return channel;
}

export function unsubscribe(channel){
  if(channel && supabase) supabase.removeChannel(channel);
}

export function unsubscribeAll(channels = []){
  channels.forEach(unsubscribe);
}

export function subscribeToProfiles(callback){
  return subscribeToTable({ table: "profiles", callback });
}

export function subscribeToClassMemberships(callback){
  return subscribeToTable({ table: "class_memberships", callback });
}

export function subscribeToMyMemberships(studentId, callback){
  if(!studentId) return null;
  return subscribeToTable({
    table: "class_memberships",
    filter: `student_id=eq.${studentId}`,
    callback,
  });
}

export function subscribeToStudentProgress(studentId, callback){
  if(!studentId) return null;
  return subscribeToTable({
    table: "student_lesson_progress",
    filter: `student_id=eq.${studentId}`,
    callback,
  });
}
