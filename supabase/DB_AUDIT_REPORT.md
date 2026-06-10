# fclass-f1 Database Audit Report

Audit date: 2026-06-10

## 1. Code paths audited

Audited the current project structure:

- `src/**/*`
- `supabase/**/*`
- `scripts/**/*`
- `package.json`
- `.env.example`
- existing SQL migrations in `supabase/migrations`

No root `app`, `components`, `pages`, `hooks`, `lib`, `utils`, or `services` folders exist outside `src`.

## 2. Supabase usage found in code

Frontend/runtime tables:

- `profiles`
- `classes`
- `class_memberships`
- `approval_logs`
- `lessons`
- `student_lesson_progress`
- `student_activity_logs`

Scripts:

- `scripts/check-real-supabase-flow.mjs`: checks `profiles`, `classes`, `class_memberships`, `lessons`, `student_lesson_progress`.
- `scripts/seed-27-lessons.mjs`: upserts `lessons`.
- `scripts/setup-supabase-realtime.mjs`: checks `profiles` and `lessons`.

RPC calls:

- `approve_student(p_student_id uuid, p_class_id uuid)`
- `reject_student(p_student_id uuid, p_reason text default null)`

Auth calls:

- `supabase.auth.getUser`
- `supabase.auth.getSession`
- `supabase.auth.signInWithPassword`
- `supabase.auth.signUp`
- `supabase.auth.signOut`
- `supabase.auth.resetPasswordForEmail`
- `supabase.auth.updateUser`

Storage/edge functions:

- No Supabase Storage calls found.
- No Supabase Edge Function calls found.

## 3. Database thật hiện kiểm tra được

Checked using the project `.env` and `SUPABASE_SERVICE_ROLE_KEY` through `npm run check:supabase`.

Result:

- `public.profiles`: exists/readable.
- `public.classes`: missing from PostgREST schema cache.
- `public.class_memberships`: missing from PostgREST schema cache.
- `public.lessons`: missing from PostgREST schema cache.
- `public.student_lesson_progress`: missing from PostgREST schema cache.

Limitations:

- Supabase CLI is installed, but `supabase link --project-ref <project-ref-from-env>` failed with insufficient privileges.
- No `SUPABASE_DB_URL`, `DATABASE_URL`, `POSTGRES_URL`, or DB password is available.
- Because of that, the audit could not directly inspect remote `information_schema`, constraints, triggers, functions, or policies.
- The report uses REST/service-role checks for actual table reachability and project SQL/code audit for required schema.

## 4. Required project schema

Canonical app tables:

- `profiles`: auth profile, role, approval status.
- `classes`: admin-managed classes.
- `class_memberships`: canonical app membership table used by current JS code.
- `approval_logs`: admin approve/reject audit trail.
- `lessons`: Supabase-backed 27 lesson rows.
- `student_lesson_progress`: per-student lesson progress tied to class.
- `student_activity_logs`: lesson activity logging.

Compatibility table:

- `class_members`: included because the reference/admin approval spec names it. Current app code uses `class_memberships`, so `class_members` is maintained by approval RPC for compatibility and audit checks.

## 5. Missing tables

Based on the live REST check, the database currently misses at least:

- `classes`
- `class_memberships`
- `lessons`
- `student_lesson_progress`

The check script did not test these, but migration also ensures:

- `class_members`
- `approval_logs`
- `student_activity_logs`

## 6. Missing columns

The migration adds missing columns idempotently for:

- `profiles`: `email`, `full_name`, `phone`, `role`, `status`, `note`, `created_at`, `updated_at`.
- `classes`: `name`, `description`, `level`, `status`, `created_by`, `created_at`, `updated_at`.
- `class_memberships`: `class_id`, `student_id`, `status`, `approved_by`, `approved_at`, `rejected_at`, `created_at`, `updated_at`.
- `class_members`: `class_id`, `user_id`, `status`, `approved_by`, `approved_at`, `created_at`, `updated_at`.
- `lessons`: `lesson_number`, `slug`, `title`, `topic_english`, `topic_vietnamese`, `description`, `status`, `content`, `source_lessons`, `created_at`, `updated_at`.
- `student_lesson_progress`: `student_id`, `class_id`, `lesson_id`, `status`, `progress_percent`, `completed_at`, `last_opened_at`, `data`, `created_at`, `updated_at`.
- `approval_logs`: `student_id`, `user_id`, `admin_id`, `action`, `reason`, `old_status`, `new_status`, `class_id`, `created_at`.

## 7. Policies/RLS required

RLS should be enabled for:

- `profiles`
- `classes`
- `class_memberships`
- `class_members`
- `approval_logs`
- `lessons`
- `student_lesson_progress`
- `student_activity_logs`

Required policy behavior:

- Users read only their own profile.
- Admins read/update profiles.
- Students cannot self-update `role` or `status`.
- Admins manage classes and memberships.
- Approved students read only assigned active classes.
- Pending/rejected students cannot read class/lesson/progress data.
- Admins read/write lessons.
- Approved students with approved membership read lessons.
- Students write/read only their own approved-class progress and activity.
- Admins read all progress/activity/approval logs.

No `using (true)` policy is used in the new migration.

## 8. Functions/RPC required

Security helper functions:

- `public.is_admin(user_id uuid)`
- `public.is_admin()`
- `public.is_approved_student(user_id uuid)`
- `public.is_approved_student()`
- `public.is_class_member(p_user_id uuid, target_class_id uuid)`
- `public.profile_role_status_unchanged(profile_id uuid, new_role text, new_status text)`

Auth trigger function:

- `public.handle_new_user()`

Admin approval RPC:

- `public.approve_student(p_student_id uuid, p_class_id uuid)`
- `public.reject_student(p_student_id uuid, p_reason text default null)`

## 9. Triggers required

Updated-at trigger function:

- `public.set_updated_at()`

Applied to:

- `profiles`
- `classes`
- `class_memberships`
- `class_members`
- `lessons`
- `student_lesson_progress`

Auth trigger:

- `on_auth_user_created` on `auth.users`, executing `public.handle_new_user()`.

## 10. Indexes/constraints required

Indexes:

- role/status/email indexes for `profiles`
- name/status indexes for `classes`
- class/student/status indexes for membership tables
- lesson number index for `lessons`
- student/class/lesson indexes for `student_lesson_progress`
- student/lesson indexes for `student_activity_logs`
- student/admin indexes for `approval_logs`

Constraints:

- `profiles.role in ('admin', 'student')`
- `profiles.status in ('pending', 'approved', 'rejected', 'blocked')`
- `classes.status in ('active', 'archived')`
- `class_memberships.status in ('pending', 'approved', 'rejected', 'removed')`
- `class_members.status in ('approved', 'removed')`
- `lessons.status in ('ready', 'partial', 'draft', 'empty', 'reused', 'merged')`
- `student_lesson_progress.status in ('not_started', 'in_progress', 'completed')`
- `student_lesson_progress.progress_percent between 0 and 100`
- `approval_logs.action in ('approved', 'rejected')`
- unique `(class_id, student_id)` on `class_memberships` when no duplicates already exist
- unique `(class_id, user_id)` on `class_members` when no duplicates already exist
- unique `(student_id, lesson_id)` on `student_lesson_progress` when no duplicates already exist

## 11. Migration risk assessment

Low-risk operations:

- `create table if not exists`
- `alter table add column if not exists`
- `create index if not exists`
- `create or replace function`
- `drop policy if exists` followed by replacement policy
- seed `TuWi A1` only if no class with that name exists

Potential risks:

- Adding check constraints can fail if existing rows contain invalid values.
- Unique constraints are intentionally skipped when duplicates already exist, so data is not removed. If duplicates exist, the report should be followed by manual dedupe later.
- The compatibility `class_members` table is maintained by RPC but current app code remains canonical on `class_memberships`.

No destructive operations are included:

- No `drop table`.
- No `truncate`.
- No data deletion.
- No hardcoded admin email.
- No service-role key in frontend.

## 12. Migration conclusion

Created:

- `supabase/migrations/20260610173000_auto_sync_project_database.sql`
- `supabase/seed_first_admin.sql`

Automatic migration status:

- Initially blocked before `.env` was updated because the CLI account did not have access to the old project ref.
- After `.env` was updated to project `iaowbkoulntepmtsuvye`, `supabase link` succeeded and `supabase db push --include-all --yes` applied all local migrations through `20260610173000_auto_sync_project_database.sql`.
- The first push stopped on a Postgres function parameter-name conflict for `public.is_class_member`; the migration was corrected to keep the existing function signature and use positional arguments, then `supabase db push --include-all --yes` completed successfully.
- `supabase db push --dry-run --include-all` now reports the remote database is up to date.
- A schema dump backup was attempted before migration, but Supabase CLI required Docker/pg_dump locally and Docker was unavailable. No backup file was produced. The migration itself does not drop tables, truncate data, or delete rows.
- `public.lessons` was seeded with 27 rows from local `TUWI_27_LESSONS` using a generated temporary SQL file executed by `supabase db query --linked`; the temp file was removed after seeding.

Run order in Supabase SQL Editor:

1. Register/create the first admin user in Supabase Auth.
2. Replace `YOUR_ADMIN_EMAIL_HERE` in `supabase/seed_first_admin.sql`, then run it.
3. Run `npm run check:supabase` again. With only anon keys, the script may warn that RLS returns 0 lesson rows even though the linked DB count is 27.
