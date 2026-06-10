-- Complete fclass-f1 auth/admin approval flow on top of the existing schema.
-- This migration is intentionally idempotent and keeps existing user/class data.

create extension if not exists pgcrypto;

alter table public.profiles
  add column if not exists full_name text,
  add column if not exists phone text,
  add column if not exists email text,
  add column if not exists role text not null default 'student',
  add column if not exists status text not null default 'pending',
  add column if not exists note text,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

alter table public.profiles
  alter column role set default 'student',
  alter column status set default 'pending';

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles
  add constraint profiles_role_check check (role in ('admin', 'student'));

alter table public.profiles drop constraint if exists profiles_status_check;
alter table public.profiles
  add constraint profiles_status_check check (status in ('pending', 'approved', 'rejected', 'blocked'));

create table if not exists public.classes (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  level text default 'A1',
  status text not null default 'active',
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.classes drop constraint if exists classes_status_check;
alter table public.classes
  add constraint classes_status_check check (status in ('active', 'archived'));

create table if not exists public.class_memberships (
  id uuid default gen_random_uuid() primary key,
  class_id uuid not null references public.classes(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending',
  approved_by uuid references auth.users(id) on delete set null,
  approved_at timestamptz,
  rejected_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.class_memberships
  add column if not exists approved_by uuid references auth.users(id) on delete set null,
  add column if not exists approved_at timestamptz,
  add column if not exists rejected_at timestamptz,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

alter table public.class_memberships drop constraint if exists class_memberships_status_check;
alter table public.class_memberships
  add constraint class_memberships_status_check check (status in ('pending', 'approved', 'rejected', 'removed'));

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'class_memberships_class_student_key'
      and conrelid = 'public.class_memberships'::regclass
  ) and not exists (
    select 1
    from public.class_memberships
    group by class_id, student_id
    having count(*) > 1
  ) then
    alter table public.class_memberships
      add constraint class_memberships_class_student_key unique (class_id, student_id);
  end if;
end $$;

create table if not exists public.approval_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  admin_id uuid references public.profiles(id) on delete set null,
  action text not null check (action in ('approved', 'rejected')),
  old_status text check (old_status in ('pending', 'approved', 'rejected', 'blocked')),
  new_status text not null check (new_status in ('pending', 'approved', 'rejected', 'blocked')),
  class_id uuid references public.classes(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.student_lesson_progress
  add column if not exists class_id uuid references public.classes(id) on delete set null,
  add column if not exists data jsonb not null default '{}'::jsonb,
  add column if not exists completed_at timestamptz,
  add column if not exists last_opened_at timestamptz,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

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

drop trigger if exists update_classes_updated_at on public.classes;
create trigger update_classes_updated_at
before update on public.classes
for each row execute function public.update_updated_at_column();

drop trigger if exists update_class_memberships_updated_at on public.class_memberships;
create trigger update_class_memberships_updated_at
before update on public.class_memberships
for each row execute function public.update_updated_at_column();

drop trigger if exists update_student_lesson_progress_updated_at on public.student_lesson_progress;
create trigger update_student_lesson_progress_updated_at
before update on public.student_lesson_progress
for each row execute function public.update_updated_at_column();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone, email, role, status)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'Học viên mới'),
    new.raw_user_meta_data->>'phone',
    new.email,
    'student',
    'pending'
  )
  on conflict (id) do update
  set email = excluded.email,
      phone = coalesce(excluded.phone, profiles.phone),
      full_name = coalesce(excluded.full_name, profiles.full_name);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

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

create or replace function public.is_class_member(user_id uuid, target_class_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.class_memberships
    where student_id = user_id
      and class_id = target_class_id
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

alter table public.profiles enable row level security;
alter table public.classes enable row level security;
alter table public.class_memberships enable row level security;
alter table public.approval_logs enable row level security;
alter table public.lessons enable row level security;
alter table public.student_lesson_progress enable row level security;
alter table public.student_activity_logs enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can update own basic profile" on public.profiles;
drop policy if exists "Admins can view all profiles" on public.profiles;
drop policy if exists "Admins can update all profiles" on public.profiles;
drop policy if exists "Admins can update profile moderation fields" on public.profiles;
drop policy if exists "Profiles are readable by owner" on public.profiles;
drop policy if exists "Profiles are readable by admins" on public.profiles;
drop policy if exists "Users can update own contact fields only" on public.profiles;
drop policy if exists "Admins can update profiles" on public.profiles;

create policy "Profiles are readable by owner"
on public.profiles for select
to authenticated
using (auth.uid() = id);

create policy "Profiles are readable by admins"
on public.profiles for select
to authenticated
using (public.is_admin(auth.uid()));

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

drop policy if exists "Admins can manage classes" on public.classes;
drop policy if exists "Approved students can read active classes" on public.classes;
drop policy if exists "Assigned approved students can read active classes" on public.classes;

create policy "Admins can manage classes"
on public.classes for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "Assigned approved students can read active classes"
on public.classes for select
to authenticated
using (
  status = 'active'
  and public.is_approved_student(auth.uid())
  and public.is_class_member(auth.uid(), id)
);

drop policy if exists "Students can read own class memberships" on public.class_memberships;
drop policy if exists "Students can request class membership" on public.class_memberships;
drop policy if exists "Admins can read class memberships" on public.class_memberships;
drop policy if exists "Admins can update class memberships" on public.class_memberships;
drop policy if exists "Admins can insert class memberships" on public.class_memberships;
drop policy if exists "Admins can delete class memberships" on public.class_memberships;

create policy "Students can read own approved class memberships"
on public.class_memberships for select
to authenticated
using (
  student_id = auth.uid()
  and status = 'approved'
  and public.is_approved_student(auth.uid())
);

create policy "Students can request class membership"
on public.class_memberships for insert
to authenticated
with check (
  student_id = auth.uid()
  and status = 'pending'
  and approved_by is null
  and approved_at is null
  and rejected_at is null
  and public.is_approved_student(auth.uid())
);

create policy "Admins can read class memberships"
on public.class_memberships for select
to authenticated
using (public.is_admin(auth.uid()));

create policy "Admins can insert class memberships"
on public.class_memberships for insert
to authenticated
with check (public.is_admin(auth.uid()));

create policy "Admins can update class memberships"
on public.class_memberships for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "Admins can delete class memberships"
on public.class_memberships for delete
to authenticated
using (public.is_admin(auth.uid()));

drop policy if exists "Public can read lesson rows" on public.lessons;
drop policy if exists "Approved students can read lesson rows" on public.lessons;
drop policy if exists "Admins can read lesson rows" on public.lessons;
drop policy if exists "Admins can read lessons" on public.lessons;
drop policy if exists "Approved class students can read lessons" on public.lessons;
drop policy if exists "Admins can write lessons" on public.lessons;

create policy "Admins can read lessons"
on public.lessons for select
to authenticated
using (public.is_admin(auth.uid()));

create policy "Approved class students can read lessons"
on public.lessons for select
to authenticated
using (
  public.is_approved_student(auth.uid())
  and exists (
    select 1
    from public.class_memberships
    where student_id = auth.uid()
      and status = 'approved'
  )
);

create policy "Admins can write lessons"
on public.lessons for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Students can read own progress" on public.student_lesson_progress;
drop policy if exists "Students can insert own progress" on public.student_lesson_progress;
drop policy if exists "Students can update own progress" on public.student_lesson_progress;
drop policy if exists "Students can read own approved-class progress" on public.student_lesson_progress;
drop policy if exists "Students can insert own approved-class progress" on public.student_lesson_progress;
drop policy if exists "Students can update own approved-class progress" on public.student_lesson_progress;
drop policy if exists "Admins can read all progress" on public.student_lesson_progress;

create policy "Students can read own approved-class progress"
on public.student_lesson_progress for select
to authenticated
using (
  student_id = auth.uid()
  and public.is_approved_student(auth.uid())
  and public.is_class_member(auth.uid(), class_id)
);

create policy "Students can insert own approved-class progress"
on public.student_lesson_progress for insert
to authenticated
with check (
  student_id = auth.uid()
  and public.is_approved_student(auth.uid())
  and public.is_class_member(auth.uid(), class_id)
);

create policy "Students can update own approved-class progress"
on public.student_lesson_progress for update
to authenticated
using (
  student_id = auth.uid()
  and public.is_approved_student(auth.uid())
  and public.is_class_member(auth.uid(), class_id)
)
with check (
  student_id = auth.uid()
  and public.is_approved_student(auth.uid())
  and public.is_class_member(auth.uid(), class_id)
);

create policy "Admins can read all progress"
on public.student_lesson_progress for select
to authenticated
using (public.is_admin(auth.uid()));

drop policy if exists "approval_logs_select_admin_all" on public.approval_logs;
drop policy if exists "approval_logs_insert_admin" on public.approval_logs;

create policy "approval_logs_select_admin_all"
on public.approval_logs for select
to authenticated
using (public.is_admin(auth.uid()));

create policy "approval_logs_insert_admin"
on public.approval_logs for insert
to authenticated
with check (public.is_admin(auth.uid()) and admin_id = auth.uid());

create index if not exists profiles_status_idx on public.profiles(status);
create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists profiles_email_idx on public.profiles(email);
create index if not exists classes_status_idx on public.classes(status);
create index if not exists class_memberships_class_idx on public.class_memberships(class_id);
create index if not exists class_memberships_student_idx on public.class_memberships(student_id);
create index if not exists class_memberships_status_idx on public.class_memberships(status);
create index if not exists approval_logs_user_id_idx on public.approval_logs(user_id);
create index if not exists approval_logs_admin_id_idx on public.approval_logs(admin_id);
create index if not exists student_lesson_progress_class_idx on public.student_lesson_progress(class_id);

insert into public.classes (name, description, level, status)
select 'TuWi A1', 'Default class for approved fclass-f1 students.', 'A1', 'active'
where not exists (
  select 1 from public.classes where lower(name) = lower('TuWi A1')
);

do $$
declare
  target_table text;
begin
  foreach target_table in array array[
    'profiles',
    'classes',
    'class_memberships',
    'approval_logs',
    'lessons',
    'student_lesson_progress',
    'student_activity_logs'
  ]
  loop
    if not exists (
      select 1
      from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = target_table
    ) then
      execute format('alter publication supabase_realtime add table public.%I', target_table);
    end if;
  end loop;
end $$;

grant usage on schema public to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.classes to authenticated;
grant select, insert, update, delete on public.class_memberships to authenticated;
grant select, insert on public.approval_logs to authenticated;
grant select, insert, update on public.student_lesson_progress to authenticated;
grant select, insert on public.student_activity_logs to authenticated;
grant execute on function public.is_admin(uuid) to authenticated;
grant execute on function public.is_approved_student(uuid) to authenticated;
grant execute on function public.is_class_member(uuid, uuid) to authenticated;
