# Supabase Realtime Migration

## Env

Vite client ưu tiên:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Code hiện hỗ trợ fallback tạm thời từ `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY` để không vỡ `.env` hiện tại. `SUPABASE_SERVICE_ROLE_KEY` chỉ được đọc bởi script local, không import vào frontend.

## Bảng Đã Tạo

Migration `supabase/migrations/20260608193000_realtime_learning_schema.sql` tạo/cập nhật:

- `public.profiles`
- `public.lessons`
- `public.student_lesson_progress`
- `public.student_activity_logs`
- `public.admin_student_notes`

Helper functions:

- `public.is_admin(user_id uuid)`
- `public.is_approved_student(user_id uuid)`

## Realtime

Migration bật realtime an toàn cho:

- `public.profiles`
- `public.lessons`
- `public.student_lesson_progress`
- `public.student_activity_logs`

## Chạy Migration Và Seed

```bash
npm run validate:env
npm run setup:supabase
```

Nếu Supabase CLI chưa link project hoặc không có quyền apply schema, chạy SQL migration thủ công trong Supabase SQL editor, rồi chạy:

```bash
npm run seed:lessons
```

Seed script upsert 27 buổi theo `lesson_number`, không xóa progress.

## Kiểm Tra Realtime

Admin:

1. Mở `/admin/students`.
2. Đăng ký học viên mới ở tab khác.
3. Danh sách admin tự reload khi `profiles` thay đổi.

Student pending:

1. Đăng nhập học viên đang `pending`.
2. Admin duyệt ở tab khác.
3. Màn chờ hiển thị: “Tài khoản đã được duyệt. Bạn có thể vào học ngay.”

Progress:

1. Đăng nhập học viên approved.
2. Mở hoặc hoàn thành lesson.
3. `public.student_lesson_progress` được upsert và các tab khác nhận realtime update.

## Fallback

Nếu `public.lessons` chưa tồn tại hoặc chưa seed, dashboard dùng local registry 27 buổi và hiển thị warning. Khi Supabase có dữ liệu, app dùng Supabase là nguồn chính.

## Bảo Mật

- Không commit `.env` hoặc `.env.local`.
- Không hardcode Supabase key trong source.
- Không dùng service role trong frontend/browser.
- Nếu service role từng bị lộ, rotate key trong Supabase dashboard.
