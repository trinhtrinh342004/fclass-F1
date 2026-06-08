# Setup Supabase riêng cho web Tuwi

## Supabase project

Project URL:
https://<YOUR_SUPABASE_PROJECT_REF>.supabase.co

## Env local

Tạo file `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Lưu ý:
- Không commit `.env.local`.
- `SUPABASE_SERVICE_ROLE_KEY` chỉ dùng server-side.
- Web hiện tại là Vite static frontend, nên không import `SUPABASE_SERVICE_ROLE_KEY` vào code client.
- Nếu key bị lộ, rotate key trong Supabase.

## Chạy migration

Nếu dùng Supabase CLI:

```bash
supabase link --project-ref <YOUR_SUPABASE_PROJECT_REF>
supabase db push
```

Nếu chưa dùng CLI:
- Copy SQL trong `supabase/migrations/20260608090000_student_login_admin_approval.sql`.
- Chạy trong Supabase Dashboard > SQL Editor.

## Tạo admin đầu tiên

1. Vào Supabase Dashboard > Authentication > Users.
2. Tạo user admin bằng email/password.
3. Vào SQL Editor chạy:

```sql
insert into public.profiles (id, full_name, email, role, status)
select id, 'Admin', email, 'admin', 'approved'
from auth.users
where email = 'EMAIL_ADMIN_CAN_THAY'
on conflict (id) do update
set role = 'admin',
    status = 'approved',
    full_name = 'Admin';
```

## Route mới

- `/student-register`
- `/student-login`
- `/student`
- `/admin/students`

## Deploy Vercel riêng

1. Vào Vercel.
2. Import cùng GitHub repo FClass.
3. Chọn Production Branch:
   `feature/tuwi-bank-account-training-web`
4. Thêm env:
   `NEXT_PUBLIC_SUPABASE_URL`
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   `SUPABASE_SERVICE_ROLE_KEY`
5. Deploy.
6. Sau này gắn domain riêng nếu cần.
