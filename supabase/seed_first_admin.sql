-- Bootstrap the first admin after the user already exists in Supabase Auth.
-- Replace YOUR_ADMIN_EMAIL_HERE with the real admin email before running.

update public.profiles
set role = 'admin',
    status = 'approved',
    updated_at = now()
where lower(email) = lower('YOUR_ADMIN_EMAIL_HERE');

select id, email, full_name, role, status, created_at, updated_at
from public.profiles
where lower(email) = lower('YOUR_ADMIN_EMAIL_HERE');
