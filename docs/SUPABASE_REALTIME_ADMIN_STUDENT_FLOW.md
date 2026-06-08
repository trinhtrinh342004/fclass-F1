# Supabase Realtime Admin Student Flow

## Schema

- `public.profiles`: one row per `auth.users` account with `role` (`admin`, `student`) and `status` (`pending`, `approved`, `rejected`, `blocked`).
- `public.classes`: admin-managed classes with `status` (`active`, `archived`).
- `public.class_memberships`: student class join requests with `status` (`pending`, `approved`, `rejected`, `removed`).
- `public.lessons`: 27 lesson rows seeded without duplicate `lesson_number`.
- `public.student_lesson_progress`: student progress tied to `student_id`, `lesson_id`, and `class_id`.

## RLS

Migration: `supabase/migrations/20260608234500_real_admin_student_class_flow.sql`.

- `profiles`: users read their own profile; admins read/update all profiles; users cannot self-change `role` or `status`.
- `classes`: admins CRUD classes; approved students read active classes.
- `class_memberships`: students read their own memberships and create pending requests; admins read/update memberships.
- `lessons`: admins read/write lessons; approved students with an approved class membership read lessons.
- `student_lesson_progress`: students read/insert/update only their own approved-class progress; admins read all progress.

Helper functions:

- `public.is_admin(user_id uuid)`
- `public.is_approved_student(user_id uuid)`
- `public.is_class_member(user_id uuid, target_class_id uuid)`

## Flows

Student registration:

1. `/student-register` calls Supabase Auth signup.
2. Auth metadata includes `full_name`, `phone`, and `role = student`.
3. `public.handle_new_user()` creates `profiles.role = student`, `profiles.status = pending`.
4. Student sees “Đăng ký thành công. Vui lòng chờ admin duyệt tài khoản.”

Login:

1. `/student-login` calls `signInWithPassword`.
2. The app queries `public.profiles` by `auth.user.id`.
3. Missing profile is blocked.
4. `admin + approved` goes to `/admin`.
5. `student + approved` goes to `/student`.
6. `pending`, `rejected`, and `blocked` show explicit status messages.

Admin approval:

1. `/admin` checks Supabase Auth and `profiles.role = admin`, `profiles.status = approved`.
2. Admin manages tabs for overview, students, classes, class requests, and progress.
3. Student account actions update `profiles.status`.

Class join:

1. Approved students see active classes in `/student`.
2. “Xin vào lớp” inserts `class_memberships.status = pending`.
3. Admin approves/rejects/removes in `/admin`.
4. Only `class_memberships.status = approved` unlocks lessons.

Progress:

1. Opening a lesson checks approved student and approved class membership.
2. `markLessonOpened()` writes `student_lesson_progress` with `class_id`.
3. Completion writes `status = completed`, `progress_percent = 100`, and `completed_at`.
4. Admin progress tab summarizes opened lessons, completed lessons, percent, and last activity.

## Realtime

Realtime publication is enabled for:

- `profiles`
- `classes`
- `class_memberships`
- `student_lesson_progress`

Frontend subscriptions:

- Admin subscribes to profiles, classes, memberships, and progress.
- Student subscribes to own profile, own memberships, and own progress.

Manual realtime test:

1. Open `/admin` in one tab as an approved admin.
2. Open `/student` in another tab as a student.
3. Register or approve a student, request class access, approve membership, then open a lesson.
4. Confirm the relevant UI updates without a hard reload.

## First Admin

See `docs/CREATE_FIRST_ADMIN.md`.

## Do Not Do

- Do not hardcode admin emails in frontend code.
- Do not use localStorage to decide admin/student permissions.
- Do not expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.
- Do not create a default admin automatically.
