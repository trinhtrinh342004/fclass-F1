#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";
import { assertSupabaseClientEnv, getSupabaseScriptEnv, loadLocalEnv } from "./env-utils.mjs";

loadLocalEnv();
assertSupabaseClientEnv();

const { supabaseUrl, supabaseAnonKey } = getSupabaseScriptEnv();
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { error: connectionError } = await supabase.from("profiles").select("id").limit(1);
const connectedButNeedsSchema = ["PGRST205", "42P01", "42501"].includes(connectionError?.code);
if(connectionError && !connectedButNeedsSchema){
  console.error("Không kiểm tra được Supabase connection:", connectionError.message);
  process.exitCode = 1;
}else{
  let migrationApplied = false;
  try{
    execFileSync("supabase", ["--version"], { stdio: "ignore" });
    execFileSync("supabase", ["db", "push"], { stdio: "inherit" });
    migrationApplied = true;
  }catch(error){
    console.warn("Không thể tự apply schema vì thiếu Supabase CLI link hoặc DATABASE_URL. Migration đã tạo tại supabase/migrations/20260608193000_realtime_learning_schema.sql");
  }

  const { error: lessonsCheckError } = await supabase.from("lessons").select("id").limit(1);
  if(lessonsCheckError){
    console.warn("Chưa seed lessons vì bảng lessons chưa sẵn sàng:", lessonsCheckError.message);
    if(!migrationApplied) process.exitCode = 1;
  }else{
    execFileSync("node", ["scripts/seed-34-lessons.mjs"], { stdio: "inherit" });
  }
}
