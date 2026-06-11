-- Refactor Tuwi A1 from 27 lessons to 34 lessons with an 8-lesson IPA Bootcamp.
-- Safety model:
-- 1. Preserve progress for old lessons 2-27 by keeping their row ids and shifting lesson_number to 9-34.
-- 2. Archive old lesson 1 at lesson_number 1001 so existing progress is not reassigned to the new IPA Foundation.
-- 3. Upsert lightweight IPA lesson rows 1-8; the seed script can later replace content with full local JSON.

do $$
begin
  if to_regclass('public.lessons') is null then
    raise notice 'public.lessons does not exist yet; skipping IPA 34-lesson migration.';
    return;
  end if;

  update public.lessons
  set
    lesson_number = 1001,
    slug = case when slug = 'alphabet-and-nouns' then 'archive-alphabet-and-nouns-old-lesson-1' else slug end,
    title = concat('[ARCHIVE] ', title),
    status = case when status in ('ready', 'partial', 'draft', 'empty', 'reused', 'merged') then status else 'partial' end,
    content = coalesce(content, '{}'::jsonb) || jsonb_build_object(
      'archivedFromMainCurriculum', true,
      'archiveReason', 'Replaced by IPA Foundation lesson 1 in the 34-lesson curriculum.'
    ),
    updated_at = now()
  where lesson_number = 1
    and slug <> 'ipa-foundation-cach-doc-mot-tu-tieng-anh';

  update public.lessons
  set lesson_number = lesson_number + 1000,
      updated_at = now()
  where lesson_number between 2 and 27;

  update public.lessons
  set lesson_number = lesson_number - 993,
      updated_at = now()
  where lesson_number between 1002 and 1027;
end $$;

insert into public.lessons (lesson_number, slug, title, topic_english, topic_vietnamese, description, status, content, source_lessons)
values
  (1, 'ipa-foundation-cach-doc-mot-tu-tieng-anh', 'IPA Foundation – Cách đọc một từ tiếng Anh', 'IPA Foundation – Cách đọc một từ tiếng Anh', 'Nền tảng phát âm cho người mất gốc', 'Tổng quan IPA + nguyên âm ngắn', 'ready', '{"module":"ipa-bootcamp","sectionFlow":["ipa_intro","ipa_why","ipa_word_process","ipa_sound_table","ipa_mouth_visual","ipa_video_mouth","ipa_mouth_opening","ipa_audio_samples","ipa_read_symbols","ipa_compare_sounds","ipa_spell_words","ipa_image_sentence","ipa_blend_words","ipa_listen_choose_sound","ipa_self_reading","ipa_sentence_practice","ipa_ai_speaking","ipa_mini_test","ipa_mindmap","ipa_homework"],"ipa":{"learningItems":"/ɪ/ /e/ /æ/ /ʌ/ /ɒ/ /ʊ/"}}'::jsonb, '[]'::jsonb),
  (2, 'short-vs-long-vowels', 'Short vs Long Vowels – Nguyên âm ngắn và dài', 'Short vs Long Vowels – Nguyên âm ngắn và dài', 'Phân biệt âm ngắn và âm dài', 'Nguyên âm dài', 'ready', '{"module":"ipa-bootcamp","ipa":{"learningItems":"/iː/ /uː/ /ɑː/ /ɔː/ /ɜː/"}}'::jsonb, '[]'::jsonb),
  (3, 'diphthongs-nguyen-am-doi', 'Nguyên âm đơn 2', 'Nguyên âm đơn 2', 'Nguyên âm đơn 2', 'Nguyên âm đôi', 'ready', '{"module":"ipa-bootcamp","ipa":{"learningItems":"/eɪ/ /aɪ/ /ɔɪ/ /aʊ/ /əʊ/ /ɪə/ /eə/ /ʊə/"}}'::jsonb, '[]'::jsonb),
  (4, 'stop-sounds-and-nasals', 'Nguyên âm đôi', 'Nguyên âm đôi', 'Nguyên âm đôi', 'Phụ âm bật + âm mũi', 'ready', '{"module":"ipa-bootcamp","ipa":{"learningItems":"/p/ /b/ /t/ /d/ /k/ /g/ /m/ /n/ /ŋ/"}}'::jsonb, '[]'::jsonb),
  (5, 'fricatives-am-gio-am-ma-sat', 'Phụ âm bật + âm bật đôi', 'Phụ âm bật + âm bật đôi', 'Phụ âm bật + âm bật đôi', 'Phụ âm gió / ma sát', 'ready', '{"module":"ipa-bootcamp","ipa":{"learningItems":"/f/ /v/ /θ/ /ð/ /s/ /z/ /ʃ/ /ʒ/ /h/"}}'::jsonb, '[]'::jsonb),
  (6, 'difficult-consonants', 'Âm gió', 'Âm gió', 'Âm gió', 'Âm ch, j, l, r, w, y', 'ready', '{"module":"ipa-bootcamp","ipa":{"learningItems":"/tʃ/ /dʒ/ /l/ /r/ /w/ /j/"}}'::jsonb, '[]'::jsonb),
  (7, 'word-stress-and-schwa', 'Âm mũi + L/R + W/Y', 'Âm mũi + L/R + W/Y', 'Âm mũi + L/R + W/Y', 'Trọng âm + âm schwa', 'ready', '{"module":"ipa-bootcamp","ipa":{"learningItems":"word stress, syllable, /ə/"}}'::jsonb, '[]'::jsonb),
  (8, 'ipa-review-tong-on', 'Tổng ôn toàn bộ IPA', 'Tổng ôn toàn bộ IPA', 'Tổng ôn toàn bộ IPA', 'Tổng ôn IPA + đọc từ/câu', 'ready', '{"module":"ipa-bootcamp","ipa":{"learningItems":"44 âm + đọc 50 từ + 20 câu"}}'::jsonb, '[]'::jsonb)
on conflict (lesson_number) do update set
  slug = excluded.slug,
  title = excluded.title,
  topic_english = excluded.topic_english,
  topic_vietnamese = excluded.topic_vietnamese,
  description = excluded.description,
  status = excluded.status,
  content = excluded.content,
  source_lessons = excluded.source_lessons,
  updated_at = now();

do $$
declare
  lesson_count int;
  duplicate_count int;
  missing_count int;
  lesson9_title text;
begin
  if to_regclass('public.lessons') is null then
    return;
  end if;

  select count(*) into lesson_count
  from public.lessons
  where lesson_number between 1 and 34;

  if lesson_count >= 34 then
    select count(*) into duplicate_count
    from (
      select lesson_number
      from public.lessons
      where lesson_number between 1 and 34
      group by lesson_number
      having count(*) > 1
    ) dupes;

    select count(*) into missing_count
    from generate_series(1, 34) expected(lesson_number)
    left join public.lessons actual using (lesson_number)
    where actual.lesson_number is null;

    select title into lesson9_title
    from public.lessons
    where lesson_number = 9;

    if duplicate_count > 0 or missing_count > 0 or lesson9_title not ilike '%SINGULAR%PLURAL%NOUNS%' then
      raise exception '34-lesson migration verification failed. duplicates %, missing %, lesson 9 title %',
        duplicate_count, missing_count, lesson9_title;
    end if;
  else
    raise notice 'Only % lessons in range 1-34 after IPA migration; run npm run seed:lessons to complete local seed.', lesson_count;
  end if;
end $$;
