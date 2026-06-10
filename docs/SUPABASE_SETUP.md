# Supabase Setup

## Environment

Use these frontend variables:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Do not expose private Supabase credentials in Vite source, docs examples, or frontend env files.

The frontend reads only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Do not use `NEXT_PUBLIC_*` or any `service_role` key in frontend env files.

## Auth Redirect URLs

In Supabase Dashboard, open **Authentication > URL Configuration**:

- Site URL: `https://fclass-f1.vercel.app` (or the exact production domain currently serving fclass-f1).
- Additional Redirect URLs:
  - `https://fclass-f1.vercel.app/auth/callback`
  - `https://fclass-f1.vercel.app/reset-password`
  - `http://localhost:5173/auth/callback`
  - `http://localhost:5173/reset-password`

If production uses a custom domain, add the same `/auth/callback` and `/reset-password` paths for that custom domain too. Forgot-password emails redirect to `/reset-password`; signup/email-confirmation links redirect to `/auth/callback`.

## Migration

Apply:

```bash
supabase db push
```

or paste these migrations into the Supabase SQL editor:

- `supabase/migrations/20260608090000_student_login_admin_approval.sql`
- `supabase/migrations/20260608193000_realtime_learning_schema.sql`

Then seed lesson rows:

```bash
npm run seed:lessons
```

## Profiles Table

The migration creates `public.profiles` with:

- `role`: `student` or `admin`
- `status`: `pending`, `approved`, `rejected`, or `blocked`

RLS policies let students read/update their own basic profile and let approved admins view/update all profiles.

The realtime schema also creates `lessons`, `student_lesson_progress`, `student_activity_logs`, and `admin_student_notes`.

## First Admin

1. Register or create the first user.
2. In Supabase SQL editor, update that user's profile to `role = 'admin'` and `status = 'approved'`.
3. Open `/admin/students` and verify the admin table loads.

## Test Flow

1. Register a student at `/student-register`.
2. Confirm the new profile is `pending`.
3. Verify pending users see: "Tài khoản của bạn đang chờ admin duyệt."
4. Approve the student from `/admin/approvals`.
5. Log in again and confirm `/` opens the 27-lesson homepage only after class approval.

If any private Supabase key was ever leaked, rotate it in the Supabase dashboard before deploying.
