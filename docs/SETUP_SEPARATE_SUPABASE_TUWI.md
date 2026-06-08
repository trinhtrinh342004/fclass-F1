# Separate Supabase Setup For Tuwi

This Vite frontend should use only:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Apply the migration in `supabase/migrations/20260608090000_student_login_admin_approval.sql`, then configure the first admin profile with `role = 'admin'` and `status = 'approved'`.

Routes that depend on Supabase:

- `/student-register`
- `/student-login`
- `/student`
- `/admin/students`

Never place server-only Supabase credentials in this frontend app. If any private key was exposed outside Supabase, rotate it immediately.
