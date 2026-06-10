#!/usr/bin/env node
import { createClient } from "@supabase/supabase-js";
import { TUWI_27_LESSONS } from "../src/features/curriculum/tuwi27Lessons.js";
import { assertSupabaseClientEnv, getSupabaseScriptEnv, loadLocalEnv } from "./env-utils.mjs";

loadLocalEnv();
assertSupabaseClientEnv();

const { supabaseUrl, supabaseAnonKey, serviceRoleKey } = getSupabaseScriptEnv();
const seedKey = serviceRoleKey || supabaseAnonKey;
const supabase = createClient(supabaseUrl, seedKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const rows = TUWI_27_LESSONS.map(toLessonRow);
const { data, error } = await supabase
  .from("lessons")
  .upsert(rows, { onConflict: "lesson_number" })
  .select("lesson_number,status");

if(error){
  console.error("Seed lessons thất bại:", error.message);
  if(!serviceRoleKey){
    console.error("Gợi ý: cần SUPABASE_SERVICE_ROLE_KEY trong script local hoặc đăng nhập admin có quyền ghi lessons.");
  }
  process.exitCode = 1;
}else{
  const counts = rows.reduce((acc, row) => {
    acc[row.status] = (acc[row.status] || 0) + 1;
    return acc;
  }, {});

  console.log(`Đã seed ${data?.length || rows.length} lessons.`);
  for(const [status, count] of Object.entries(counts)){
    console.log(`- ${status}: ${count}`);
  }
}

function toLessonRow(lesson){
  const status = normalizeStatus(lesson.curriculumStatus || lesson.metadata?.status?.content);
  return {
    lesson_number: lesson.id,
    slug: lesson.slug,
    title: lesson.title,
    topic_english: lesson.titleEn || lesson.mainTopic || lesson.title,
    topic_vietnamese: lesson.titleVi || lesson.subtitle || lesson.title,
    description: lesson.subtitle || null,
    status,
    content: status === "empty" ? {} : stripRuntimeOnlyFields(lesson),
    source_lessons: lesson.metadata?.sourceLessonIds || [],
  };
}

function normalizeStatus(status){
  if(["ready", "partial", "draft", "empty", "reused", "merged"].includes(status)) return status;
  return status === "empty" ? "empty" : "draft";
}

function stripRuntimeOnlyFields(lesson){
  const clone = structuredClone(lesson);
  delete clone.__architectureWarnings;
  return clone;
}
