# Create The First Admin

Use this only to bootstrap the first admin account after the user already exists in Supabase Auth.

1. Create or confirm the admin user in Supabase Authentication.
2. Open Supabase SQL Editor.
3. Replace `EMAIL_ADMIN_CAN_THAY` with the real admin email and run:

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

Notes:

- Only use this to bootstrap the first admin.
- Do not hardcode this email in frontend code.
- Do not create a default admin automatically for every user.
- Do not expose `SUPABASE_SERVICE_ROLE_KEY` to Vite, browser code, or public environment variables.
