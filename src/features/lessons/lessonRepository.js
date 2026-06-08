import { getSupabaseConfigError, hasSupabaseConfig, supabase } from "../../lib/supabase/client.js";
import { LESSONS as LOCAL_LESSONS } from "./lessonRegistry.js";

export const LESSON_SOURCE = {
  supabase: "supabase",
  fallback: "fallback",
};

let cachedRows = [];

export async function getLessons(){
  if(!hasSupabaseConfig || !supabase){
    return {
      lessons: getLocalLessons(),
      source: LESSON_SOURCE.fallback,
      warning: getSupabaseConfigError(),
    };
  }

  const { data, error } = await supabase
    .from("lessons")
    .select("id, lesson_number, slug, title, topic_english, topic_vietnamese, description, status, content, source_lessons, updated_at")
    .order("lesson_number", { ascending: true });

  if(error){
    return {
      lessons: getLocalLessons(),
      source: LESSON_SOURCE.fallback,
      warning: schemaWarning(error.message),
      error,
    };
  }

  if(!data?.length){
    return {
      lessons: getLocalLessons(),
      source: LESSON_SOURCE.fallback,
      warning: "Bảng Supabase chưa có dữ liệu lesson. Vui lòng chạy npm run seed:lessons.",
    };
  }

  cachedRows = data;
  return {
    lessons: data.map(mapLessonRow),
    source: LESSON_SOURCE.supabase,
    warning: "",
  };
}

export async function getLessonByNumber(lessonNumber){
  if(!hasSupabaseConfig || !supabase){
    return getLocalLessons().find((lesson) => lesson.id === Number(lessonNumber)) || null;
  }

  const { data, error } = await supabase
    .from("lessons")
    .select("id, lesson_number, slug, title, topic_english, topic_vietnamese, description, status, content, source_lessons, updated_at")
    .eq("lesson_number", Number(lessonNumber))
    .maybeSingle();

  if(error || !data){
    return getLocalLessons().find((lesson) => lesson.id === Number(lessonNumber)) || null;
  }

  upsertCachedRow(data);
  return mapLessonRow(data);
}

export async function upsertLesson(lesson){
  return supabase
    .from("lessons")
    .upsert(lesson, { onConflict: "lesson_number" })
    .select()
    .single();
}

export async function getLessonRowIdByNumber(lessonNumber){
  const normalized = Number(lessonNumber);
  const cached = cachedRows.find((row) => row.lesson_number === normalized);
  if(cached) return cached.id;

  if(!hasSupabaseConfig || !supabase) return null;
  const { data, error } = await supabase
    .from("lessons")
    .select("id, lesson_number")
    .eq("lesson_number", normalized)
    .maybeSingle();

  if(error || !data) return null;
  upsertCachedRow(data);
  return data.id;
}

function getLocalLessons(){
  return [...LOCAL_LESSONS].sort((a, b) => a.id - b.id);
}

function mapLessonRow(row){
  const content = row.content && Object.keys(row.content).length ? row.content : {};
  return {
    ...content,
    id: row.lesson_number,
    dbLessonId: row.id,
    unit: content.unit || `Tuwi ${Math.ceil(row.lesson_number / 3)}`,
    title: row.title,
    titleEn: row.topic_english,
    titleVi: row.topic_vietnamese,
    subtitle: row.description || row.topic_vietnamese,
    mainTopic: row.topic_english,
    curriculumStatus: row.status,
    metadata: {
      ...(content.metadata || {}),
      sourceLessonIds: row.source_lessons || [],
      status: {
        ...(content.metadata?.status || {}),
        content: row.status,
        code: "supabase",
      },
    },
    vocabulary: content.vocabulary || [],
    minitest: content.minitest || [],
    sectionFlow: content.sectionFlow || ["intro", "homework"],
    objectives: content.objectives || ["Nội dung đang được biên soạn."],
    intro: content.intro || {
      focusTitle: "Nội dung đang được biên soạn",
      focusText: "Nội dung đang được biên soạn.",
    },
    homework: content.homework || ["Nội dung đang được biên soạn."],
  };
}

function upsertCachedRow(row){
  const index = cachedRows.findIndex((item) => item.lesson_number === row.lesson_number);
  if(index >= 0) cachedRows[index] = { ...cachedRows[index], ...row };
  else cachedRows.push(row);
}

function schemaWarning(message){
  if(/relation .*lessons.* does not exist/i.test(message)){
    return "Bảng Supabase chưa được khởi tạo. Vui lòng chạy migration.";
  }
  return `Không tải được dữ liệu Supabase, đang dùng fallback local. ${message}`;
}
