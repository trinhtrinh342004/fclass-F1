#!/usr/bin/env node
import { createClient } from "@supabase/supabase-js";
import { getSupabaseScriptEnv, loadLocalEnv } from "./env-utils.mjs";

loadLocalEnv();

const { supabaseUrl, supabaseAnonKey, serviceRoleKey } = getSupabaseScriptEnv();
const requiredTables = [
  "profiles",
  "classes",
  "class_memberships",
  "lessons",
  "student_lesson_progress",
];

let failed = false;

function pass(message){
  console.log(`PASS ${message}`);
}

function warn(message){
  console.warn(`WARN ${message}`);
}

function fail(message){
  failed = true;
  console.error(`FAIL ${message}`);
}

if(!supabaseUrl || !supabaseAnonKey){
  fail("Thiếu VITE_SUPABASE_URL hoặc VITE_SUPABASE_ANON_KEY.");
  process.exit(1);
}

if(process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY){
  fail("Service role key đang bị expose bằng biến frontend. Không dùng VITE_/NEXT_PUBLIC_ cho SUPABASE_SERVICE_ROLE_KEY.");
}

const checkKey = serviceRoleKey || supabaseAnonKey;
const supabase = createClient(supabaseUrl, checkKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

pass("Supabase env hợp lệ cho script.");
if(serviceRoleKey) warn("Đang dùng SUPABASE_SERVICE_ROLE_KEY local/server-side để kiểm tra schema.");
else warn("Không có service role key; kiểm tra bảng có thể bị RLS chặn với anon key.");

for(const table of requiredTables){
  const { error } = await supabase.from(table).select("*").limit(1);
  if(error) fail(`Không đọc được public.${table}: ${error.message}`);
  else pass(`Tìm thấy public.${table}.`);
}

const { data: lessons, error: lessonsError } = await supabase
  .from("lessons")
  .select("lesson_number")
  .order("lesson_number", { ascending: true });

if(lessonsError){
  warn(`Không đếm được lessons vì RLS/quyền truy cập: ${lessonsError.message}`);
}else{
  const uniqueLessons = new Set((lessons || []).map((row) => row.lesson_number));
  if(uniqueLessons.size >= 27) pass(`Lessons có ${uniqueLessons.size} lesson_number duy nhất.`);
  else warn(`Lessons hiện có ${uniqueLessons.size}/27 lesson_number duy nhất. Chạy npm run seed:lessons nếu thiếu.`);
}

const { data: activeClasses, error: classesError } = await supabase
  .from("classes")
  .select("id, status")
  .eq("status", "active")
  .limit(5);

if(classesError) warn(`Không kiểm tra được lớp active: ${classesError.message}`);
else pass(`Truy vấn classes active hoạt động (${activeClasses?.length || 0} mẫu).`);

if(failed) process.exit(1);
pass("Hoàn tất kiểm tra Supabase admin/student/class flow.");
