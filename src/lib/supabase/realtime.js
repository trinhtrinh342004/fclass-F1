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
