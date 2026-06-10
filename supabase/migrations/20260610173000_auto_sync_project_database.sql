-- Auto-sync fclass-f1 project database requirements.
-- Safe principles: no drop table, no truncate, no data delete. This file only creates
-- missing objects, adds missing columns, replaces named RLS policies, and seeds
-- required default rows idempotently.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Core tables used by the app
-- ---------------------------------------------------------------------------

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

alter table public.profiles
  add column if not exists email text,
  add column if not exists full_name text,
  add column if not exists phone text,
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
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  level text default 'A1',
  status text not null default 'active',
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.classes
  add column if not exists name text,
  add column if not exists description text,
  add column if not exists level text default 'A1',
  add column if not exists status text not null default 'active',
  add column if not exists created_by uuid references auth.users(id) on delete set null default auth.uid(),
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

alter table public.classes drop constraint if exists classes_status_check;
alter table public.classes
  add constraint classes_status_check check (status in ('active', 'archived'));

create table if not exists public.class_memberships (
  id uuid primary key default gen_random_uuid(),
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
  add column if not exists class_id uuid references public.classes(id) on delete cascade,
  add column if not exists student_id uuid references auth.users(id) on delete cascade,
  add column if not exists status text not null default 'pending',
  add column if not exists approved_by uuid references auth.users(id) on delete set null,
  add column if not exists approved_at timestamptz,
  add column if not exists rejected_at timestamptz,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

alter table public.class_memberships drop constraint if exists class_memberships_status_check;
alter table public.class_memberships
  add constraint class_memberships_status_check check (status in ('pending', 'approved', 'rejected', 'removed'));

-- Compatibility table for the reference naming (`class_members`). The app uses
-- `class_memberships` as canonical storage, but this keeps external SQL/RPC
-- checks compatible without renaming existing project code.
create table if not exists public.class_members (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'approved',
  approved_by uuid references public.profiles(id) on delete set null,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.class_members
  add column if not exists class_id uuid references public.classes(id) on delete cascade,
  add column if not exists user_id uuid references public.profiles(id) on delete cascade,
  add column if not exists status text not null default 'approved',
  add column if not exists approved_by uuid references public.profiles(id) on delete set null,
  add column if not exists approved_at timestamptz,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

alter table public.class_members drop constraint if exists class_members_status_check;
alter table public.class_members
  add constraint class_members_status_check check (status in ('approved', 'removed'));

create table if not exists public.lessons (
  id bigint generated by default as identity primary key,
  lesson_number int not null unique,
  slug text not null unique,
  title text not null,
  topic_english text not null,
  topic_vietnamese text not null,
  description text,
  status text not null default 'draft',
  content jsonb not null default '{}'::jsonb,
  source_lessons jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.lessons
  add column if not exists lesson_number int,
  add column if not exists slug text,
  add column if not exists title text,
  add column if not exists topic_english text,
  add column if not exists topic_vietnamese text,
  add column if not exists description text,
  add column if not exists status text not null default 'draft',
  add column if not exists content jsonb not null default '{}'::jsonb,
  add column if not exists source_lessons jsonb not null default '[]'::jsonb,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

alter table public.lessons drop constraint if exists lessons_status_check;
alter table public.lessons
  add constraint lessons_status_check check (status in ('ready', 'partial', 'draft', 'empty', 'reused', 'merged'));

create table if not exists public.student_lesson_progress (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  class_id uuid references public.classes(id) on delete set null,
  lesson_id bigint not null references public.lessons(id) on delete cascade,
  status text not null default 'not_started',
  progress_percent int not null default 0,
  completed_at timestamptz,
  last_opened_at timestamptz,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.student_lesson_progress
  add column if not exists student_id uuid references auth.users(id) on delete cascade,
  add column if not exists class_id uuid references public.classes(id) on delete set null,
  add column if not exists lesson_id bigint references public.lessons(id) on delete cascade,
  add column if not exists status text not null default 'not_started',
  add column if not exists progress_percent int not null default 0,
  add column if not exists completed_at timestamptz,
  add column if not exists last_opened_at timestamptz,
  add column if not exists data jsonb not null default '{}'::jsonb,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

alter table public.student_lesson_progress drop constraint if exists student_lesson_progress_status_check;
alter table public.student_lesson_progress
  add constraint student_lesson_progress_status_check check (status in ('not_started', 'in_progress', 'completed'));

alter table public.student_lesson_progress drop constraint if exists student_lesson_progress_percent_check;
alter table public.student_lesson_progress
  add constraint student_lesson_progress_percent_check check (progress_percent between 0 and 100);

create table if not exists public.student_activity_logs (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references auth.users(id) on delete cascade,
  lesson_id bigint references public.lessons(id) on delete set null,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.approval_logs (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.profiles(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  admin_id uuid references public.profiles(id) on delete set null,
  action text not null,
  reason text,
  old_status text,
  new_status text,
  class_id uuid references public.classes(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.approval_logs
  add column if not exists student_id uuid references public.profiles(id) on delete cascade,
  add column if not exists user_id uuid references public.profiles(id) on delete cascade,
  add column if not exists admin_id uuid references public.profiles(id) on delete set null,
  add column if not exists action text,
  add column if not exists reason text,
  add column if not exists old_status text,
  add column if not exists new_status text,
  add column if not exists class_id uuid references public.classes(id) on delete set null,
  add column if not exists created_at timestamptz not null default now();

update public.approval_logs
set student_id = coalesce(student_id, user_id),
    user_id = coalesce(user_id, student_id)
where student_id is null
   or user_id is null;

alter table public.approval_logs drop constraint if exists approval_logs_action_check;
alter table public.approval_logs
  add constraint approval_logs_action_check check (action in ('approved', 'rejected'));

-- ---------------------------------------------------------------------------
-- Safe uniqueness/indexes. Unique constraints are skipped if duplicate rows
-- already exist so migration never destroys production data.
-- ---------------------------------------------------------------------------

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'class_memberships_class_student_key'
      and conrelid = 'public.class_memberships'::regclass
  ) and not exists (
    select 1 from public.class_memberships
    group by class_id, student_id
    having count(*) > 1
  ) then
    alter table public.class_memberships
      add constraint class_memberships_class_student_key unique (class_id, student_id);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'class_members_class_user_key'
      and conrelid = 'public.class_members'::regclass
  ) and not exists (
    select 1 from public.class_members
    group by class_id, user_id
    having count(*) > 1
  ) then
    alter table public.class_members
      add constraint class_members_class_user_key unique (class_id, user_id);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'student_lesson_progress_student_lesson_key'
      and conrelid = 'public.student_lesson_progress'::regclass
  ) and not exists (
    select 1 from public.student_lesson_progress
    group by student_id, lesson_id
    having count(*) > 1
  ) then
    alter table public.student_lesson_progress
      add constraint student_lesson_progress_student_lesson_key unique (student_id, lesson_id);
  end if;
end $$;

create index if not exists profiles_status_idx on public.profiles(status);
create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists profiles_email_idx on public.profiles(email);
create index if not exists classes_status_idx on public.classes(status);
create index if not exists classes_name_idx on public.classes(lower(name));
create index if not exists class_memberships_class_idx on public.class_memberships(class_id);
create index if not exists class_memberships_student_idx on public.class_memberships(student_id);
create index if not exists class_memberships_status_idx on public.class_memberships(status);
create index if not exists class_members_class_idx on public.class_members(class_id);
create index if not exists class_members_user_idx on public.class_members(user_id);
create index if not exists class_members_status_idx on public.class_members(status);
create index if not exists lessons_lesson_number_idx on public.lessons(lesson_number);
create index if not exists student_lesson_progress_student_idx on public.student_lesson_progress(student_id);
create index if not exists student_lesson_progress_class_idx on public.student_lesson_progress(class_id);
create index if not exists student_lesson_progress_lesson_idx on public.student_lesson_progress(lesson_id);
create index if not exists student_activity_logs_student_idx on public.student_activity_logs(student_id);
create index if not exists student_activity_logs_lesson_idx on public.student_activity_logs(lesson_id);
create index if not exists approval_logs_student_idx on public.approval_logs(student_id);
create index if not exists approval_logs_user_id_idx on public.approval_logs(user_id);
create index if not exists approval_logs_admin_id_idx on public.approval_logs(admin_id);

-- ---------------------------------------------------------------------------
-- Triggers/functions
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_classes_updated_at on public.classes;
create trigger set_classes_updated_at
before update on public.classes
for each row execute function public.set_updated_at();

drop trigger if exists set_class_memberships_updated_at on public.class_memberships;
create trigger set_class_memberships_updated_at
before update on public.class_memberships
for each row execute function public.set_updated_at();

drop trigger if exists set_class_members_updated_at on public.class_members;
create trigger set_class_members_updated_at
before update on public.class_members
for each row execute function public.set_updated_at();

drop trigger if exists set_lessons_updated_at on public.lessons;
create trigger set_lessons_updated_at
before update on public.lessons
for each row execute function public.set_updated_at();

drop trigger if exists set_student_lesson_progress_updated_at on public.student_lesson_progress;
create trigger set_student_lesson_progress_updated_at
before update on public.student_lesson_progress
for each row execute function public.set_updated_at();

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

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select public.is_admin(auth.uid());
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

create or replace function public.is_approved_student()
returns boolean
language sql
security definer
set search_path = public
as $$
  select public.is_approved_student(auth.uid());
$$;

create or replace function public.is_class_member(p_user_id uuid, target_class_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.class_memberships
    where student_id = p_user_id
      and class_id = target_class_id
      and status = 'approved'
  ) or exists (
    select 1 from public.class_members cm
    where cm.user_id = p_user_id
      and cm.class_id = target_class_id
      and cm.status = 'approved'
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

create or replace function public.approve_student(p_student_id uuid, p_class_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_admin_id uuid := auth.uid();
  v_old_status text;
  v_membership_id uuid;
begin
  if not public.is_admin(v_admin_id) then
    raise exception 'Only approved admins can approve students.';
  end if;

  if p_student_id is null or p_class_id is null then
    raise exception 'Student id and class id are required.';
  end if;

  select status into v_old_status
  from public.profiles
  where id = p_student_id
    and role = 'student';

  if v_old_status is null then
    raise exception 'Student profile not found.';
  end if;

  update public.profiles
  set status = 'approved'
  where id = p_student_id
    and role = 'student';

  update public.class_memberships
  set status = 'approved',
      approved_by = v_admin_id,
      approved_at = now(),
      rejected_at = null
  where class_id = p_class_id
    and student_id = p_student_id
  returning id into v_membership_id;

  if v_membership_id is null then
    insert into public.class_memberships (class_id, student_id, status, approved_by, approved_at)
    select p_class_id, p_student_id, 'approved', v_admin_id, now()
    where not exists (
      select 1 from public.class_memberships
      where class_id = p_class_id
        and student_id = p_student_id
    )
    returning id into v_membership_id;
  end if;

  update public.class_members
  set status = 'approved',
      approved_by = v_admin_id,
      approved_at = now()
  where class_id = p_class_id
    and user_id = p_student_id;

  insert into public.class_members (class_id, user_id, status, approved_by, approved_at)
  select p_class_id, p_student_id, 'approved', v_admin_id, now()
  where not exists (
    select 1 from public.class_members
    where class_id = p_class_id
      and user_id = p_student_id
  );

  insert into public.approval_logs (
    student_id,
    user_id,
    admin_id,
    action,
    old_status,
    new_status,
    class_id
  )
  values (
    p_student_id,
    p_student_id,
    v_admin_id,
    'approved',
    v_old_status,
    'approved',
    p_class_id
  );

  return jsonb_build_object(
    'student_id', p_student_id,
    'class_id', p_class_id,
    'membership_id', v_membership_id,
    'status', 'approved'
  );
end;
$$;

create or replace function public.reject_student(p_student_id uuid, p_reason text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_admin_id uuid := auth.uid();
  v_old_status text;
begin
  if not public.is_admin(v_admin_id) then
    raise exception 'Only approved admins can reject students.';
  end if;

  if p_student_id is null then
    raise exception 'Student id is required.';
  end if;

  select status into v_old_status
  from public.profiles
  where id = p_student_id
    and role = 'student';

  if v_old_status is null then
    raise exception 'Student profile not found.';
  end if;

  update public.profiles
  set status = 'rejected'
  where id = p_student_id
    and role = 'student';

  insert into public.approval_logs (
    student_id,
    user_id,
    admin_id,
    action,
    reason,
    old_status,
    new_status
  )
  values (
    p_student_id,
    p_student_id,
    v_admin_id,
    'rejected',
    p_reason,
    v_old_status,
    'rejected'
  );

  return jsonb_build_object(
    'student_id', p_student_id,
    'status', 'rejected'
  );
end;
$$;

-- ---------------------------------------------------------------------------
-- RLS policies
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.classes enable row level security;
alter table public.class_memberships enable row level security;
alter table public.class_members enable row level security;
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
drop policy if exists "Students can read own approved class memberships" on public.class_memberships;
drop policy if exists "Students can request class membership" on public.class_memberships;
drop policy if exists "Admins can read class memberships" on public.class_memberships;
drop policy if exists "Admins can insert class memberships" on public.class_memberships;
drop policy if exists "Admins can update class memberships" on public.class_memberships;
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

drop policy if exists "class_members_select_admin_all" on public.class_members;
drop policy if exists "class_members_select_approved_student_own" on public.class_members;
drop policy if exists "class_members_insert_admin" on public.class_members;
drop policy if exists "class_members_update_admin" on public.class_members;
drop policy if exists "class_members_delete_admin" on public.class_members;

create policy "class_members_select_admin_all"
on public.class_members for select
to authenticated
using (public.is_admin(auth.uid()));

create policy "class_members_select_approved_student_own"
on public.class_members for select
to authenticated
using (
  user_id = auth.uid()
  and status = 'approved'
  and public.is_approved_student(auth.uid())
);

create policy "class_members_insert_admin"
on public.class_members for insert
to authenticated
with check (public.is_admin(auth.uid()));

create policy "class_members_update_admin"
on public.class_members for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "class_members_delete_admin"
on public.class_members for delete
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
    select 1 from public.class_memberships
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

drop policy if exists "Students can insert own activity" on public.student_activity_logs;
drop policy if exists "Students can read own activity" on public.student_activity_logs;
drop policy if exists "Admins can read all activity" on public.student_activity_logs;

create policy "Students can insert own activity"
on public.student_activity_logs for insert
to authenticated
with check (
  student_id = auth.uid()
  and public.is_approved_student(auth.uid())
);

create policy "Students can read own activity"
on public.student_activity_logs for select
to authenticated
using (student_id = auth.uid());

create policy "Admins can read all activity"
on public.student_activity_logs for select
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

-- ---------------------------------------------------------------------------
-- Seeds, realtime, and grants
-- ---------------------------------------------------------------------------

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
    'class_members',
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
grant select, insert, update, delete on public.class_members to authenticated;
grant select, insert on public.approval_logs to authenticated;
grant select, insert, update on public.lessons to authenticated;
grant select, insert, update on public.student_lesson_progress to authenticated;
grant select, insert on public.student_activity_logs to authenticated;
grant execute on function public.is_admin(uuid) to authenticated;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_approved_student(uuid) to authenticated;
grant execute on function public.is_approved_student() to authenticated;
grant execute on function public.is_class_member(uuid, uuid) to authenticated;
grant execute on function public.approve_student(uuid, uuid) to authenticated;
grant execute on function public.reject_student(uuid, text) to authenticated;
