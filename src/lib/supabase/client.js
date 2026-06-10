import { createClient } from "@supabase/supabase-js";
import { env, getEnvError, hasRequiredEnv } from "../../config/env.js";

export const hasSupabaseConfig = hasRequiredEnv();

export const supabase = hasSupabaseConfig
  ? createClient(env.supabaseUrl, env.supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export function getSupabaseConfigError(){
  return hasSupabaseConfig ? "" : getEnvError();
}

export function getSupabaseBrowserClient(){
  if(!supabase) throw new Error(getSupabaseConfigError());
  return supabase;
}

export const SUPABASE_REQUEST_TIMEOUT_MS = 9000;

export function createSupabaseTimeoutError(label, timeoutMs = SUPABASE_REQUEST_TIMEOUT_MS){
  const error = new Error(`${label} timed out after ${timeoutMs}ms`);
  error.name = "SupabaseTimeoutError";
  error.code = "SUPABASE_TIMEOUT";
  return error;
}

export function isSupabaseTimeoutError(error){
  return error?.code === "SUPABASE_TIMEOUT" || error?.name === "SupabaseTimeoutError";
}

export async function withSupabaseTimeout(operation, label, timeoutMs = SUPABASE_REQUEST_TIMEOUT_MS){
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = globalThis.setTimeout(
      () => reject(createSupabaseTimeoutError(label, timeoutMs)),
      timeoutMs,
    );
  });

  try{
    return await Promise.race([operation, timeout]);
  }finally{
    globalThis.clearTimeout(timeoutId);
  }
}

export function debugSupabaseAuth(message, details = {}){
  if(!import.meta.env?.DEV) return;
  console.debug(`[FClass auth] ${message}`, details);
}
