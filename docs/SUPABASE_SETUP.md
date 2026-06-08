# Supabase Setup

## Environment

Use these frontend variables:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Do not expose private Supabase credentials in Vite source, docs examples, or frontend env files.

## Migration

Apply:

```bash
supabase db push
```

or paste `supabase/migrations/20260608090000_student_login_admin_approval.sql` into the Supabase SQL editor.

## Profiles Table

The migration creates `public.profiles` with:

- `role`: `student` or `admin`
- `status`: `pending`, `approved`, `rejected`, or `blocked`

RLS policies let students read/update their own basic profile and let approved admins view/update all profiles.

## First Admin

1. Register or create the first user.
2. In Supabase SQL editor, update that user's profile to `role = 'admin'` and `status = 'approved'`.
3. Open `/admin/students` and verify the admin table loads.

## Test Flow

1. Register a student at `/student-register`.
2. Confirm the new profile is `pending`.
3. Verify pending users see: "Tài khoản của bạn đang chờ admin duyệt."
4. Approve the student from `/admin/students`.
5. Log in again and confirm `/student` can open lessons.

If any private Supabase key was ever leaked, rotate it in the Supabase dashboard before deploying.
