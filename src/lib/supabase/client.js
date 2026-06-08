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
