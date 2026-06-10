-- Set the first admin by email.
-- 1. Register this email normally from the fclass-f1 Register page.
-- 2. Replace YOUR_ADMIN_EMAIL_HERE.
-- 3. Run this once in the Supabase SQL editor.

update public.profiles
set role = 'admin',
    status = 'approved',
    updated_at = now()
where lower(email) = lower('YOUR_ADMIN_EMAIL_HERE');

-- Verify the admin row.
select id, email, full_name, role, status, created_at, updated_at
from public.profiles
where lower(email) = lower('YOUR_ADMIN_EMAIL_HERE');
