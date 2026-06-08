# Local To Supabase Audit

| Loại dữ liệu | File hiện tại | Đang lưu local ở đâu | Bảng Supabase mới | Ghi chú |
|---|---|---|---|---|
| Curriculum 27 buổi | `src/features/curriculum/tuwi27Lessons.js`, `src/features/curriculum/curriculumMap.js` | Hardcoded JS registry | `public.lessons` | Seed bằng `npm run seed:lessons`; app ưu tiên Supabase và fallback local nếu schema/data chưa sẵn sàng. |
| Lesson content cũ | `src/features/lessons/legacyLessonsData.js` | Hardcoded JS object lớn | `public.lessons.content` | Script seed đưa content hiện có vào JSONB, không tự bịa nội dung mới. |
| Lesson progress hoàn thành | `src/main.js`, `src/features/lessons/lessonProgress.js` | `localStorage` key `gateway_a1_progress_v2.done` | `public.student_lesson_progress` | `markLessonCompleted()` lưu Supabase; localStorage chỉ còn fallback/cache và nguồn migration lần đầu. |
| Section progress | `src/main.js` | `localStorage` key `gateway_a1_progress_v2.sectionsDone` | `public.student_lesson_progress.data.sectionsDone` | `migrateLocalProgressToSupabase()` đẩy dữ liệu cũ khi học viên approved vào `/student`. |
| Homework checklist | `src/main.js` | `localStorage` key `gateway_a1_progress_v2.hw` | `public.student_lesson_progress.data.homework` | Được migrate; thao tác hiện tại vẫn cache nhẹ local để giữ UI không vỡ. |
| Student accounts | Supabase Auth, `src/features/auth/*` | Supabase Auth, không dùng mock local | `auth.users`, `public.profiles` | Registration tạo auth user/profile pending bằng trigger. |
| Admin approval | `src/features/admin/adminStudentRepository.js` | Supabase direct query | `public.profiles` | Admin list/update đã dùng Supabase và có realtime subscription. |
| Student activity | Chưa có UI riêng | Không lưu local | `public.student_activity_logs` | Schema/RLS/realtime đã tạo để mở rộng tracking hành động. |
| Admin private notes | Chưa có UI riêng | Không lưu local | `public.admin_student_notes` | Schema/RLS đã tạo, student không đọc notes. |

LocalStorage chưa bị xóa để tránh mất dữ liệu cũ. Sau khi migration thành công, key `gateway_a1_progress_v2_migrated=true` đánh dấu dữ liệu đã được đẩy lên Supabase.
