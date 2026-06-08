-- 1. Create public.profiles table if not exists
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  phone text,
  role text not null default 'student',
  status text not null default 'pending',
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Drop and recreate constraints to ensure safe values and uniqueness
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check check (role in ('admin', 'student'));

alter table public.profiles drop constraint if exists profiles_status_check;
alter table public.profiles add constraint profiles_status_check check (status in ('pending', 'approved', 'rejected'));

alter table public.profiles drop constraint if exists profiles_email_key;
alter table public.profiles add constraint profiles_email_key unique (email);

-- 3. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- 4. Create security definer helper functions to avoid recursion in RLS policies
create or replace function public.is_admin(user_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = user_id
      and role = 'admin'
      and status = 'approved'
  );
$$;

create or replace function public.is_approved_student(user_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = user_id
      and role = 'student'
      and status = 'approved'
  );
$$;

create or replace function public.profile_role_status_unchanged(profile_id uuid, new_role text, new_status text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = profile_id
      and role = new_role
      and status = new_status
  );
$$;

-- 5. Drop existing policies on profiles and recreate them cleanly
drop policy if exists "Profiles are readable by owner" on public.profiles;
drop policy if exists "Profiles are readable by admins" on public.profiles;
drop policy if exists "Users can update own contact fields only" on public.profiles;
drop policy if exists "Admins can update profiles" on public.profiles;
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can update own basic profile" on public.profiles;
drop policy if exists "Admins can view all profiles" on public.profiles;
drop policy if exists "Admins can update all profiles" on public.profiles;
drop policy if exists "Admins can update profile moderation fields" on public.profiles;

-- Select policies
create policy "Profiles are readable by owner"
on public.profiles for select
to authenticated
using (auth.uid() = id);

create policy "Profiles are readable by admins"
on public.profiles for select
to authenticated
using (public.is_admin(auth.uid()));

-- Update policies
create policy "Users can update own contact fields only"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (
  auth.uid() = id
  and public.profile_role_status_unchanged(id, role, status)
);

create policy "Admins can update profiles"
on public.profiles for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- 6. Trigger to automatically create profile when user registers
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    full_name,
    phone,
    email,
    role,
    status
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'Học viên mới'),
    new.raw_user_meta_data->>'phone',
    new.email,
    'student',
    'pending'
  )
  on conflict (id) do update
  set
    email = excluded.email,
    phone = coalesce(excluded.phone, profiles.phone),
    full_name = coalesce(excluded.full_name, profiles.full_name);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Trigger for update_updated_at_column if trigger doesn't exist
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists update_profiles_updated_at on public.profiles;
create trigger update_profiles_updated_at
before update on public.profiles
for each row execute function public.update_updated_at_column();

-- Indexes for performance
create index if not exists profiles_status_idx on public.profiles(status);
create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists profiles_email_idx on public.profiles(email);

-- 7. Safe SQL block to promote admin@gmail.com to admin (if the user exists)
do $$
declare
  admin_uid uuid;
begin
  select id into admin_uid
  from auth.users
  where email = 'admin@gmail.com'
  limit 1;

  if admin_uid is not null then
    insert into public.profiles (id, full_name, email, role, status)
    values (admin_uid, 'Admin', 'admin@gmail.com', 'admin', 'approved')
    on conflict (id) do update
    set role = 'admin',
        status = 'approved',
        full_name = 'Admin',
        email = 'admin@gmail.com';
    raise notice 'Successfully promoted admin@gmail.com to admin.';
  else
    raise notice 'User admin@gmail.com does not exist in auth.users. Cannot promote to admin.';
  end if;
end $$;
