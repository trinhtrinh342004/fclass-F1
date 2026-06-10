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

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'profiles_role_check'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_role_check check (role in ('admin', 'student'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'profiles_status_check'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_status_check check (status in ('pending', 'approved', 'rejected', 'blocked'));
  end if;
end $$;

create table if not exists public.classes (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  level text default 'A1',
  status text not null default 'active',
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint classes_status_check check (status in ('active', 'archived'))
);

create table if not exists public.class_memberships (
  id uuid default gen_random_uuid() primary key,
  class_id uuid not null references public.classes(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending',
  approved_by uuid references auth.users(id) on delete set null,
  approved_at timestamptz,
  rejected_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(class_id, student_id),
  constraint class_memberships_status_check check (status in ('pending', 'approved', 'rejected', 'removed'))
);

alter table public.student_lesson_progress
  add column if not exists class_id uuid references public.classes(id) on delete set null,
  add column if not exists data jsonb not null default '{}'::jsonb,
  add column if not exists completed_at timestamptz,
  add column if not exists last_opened_at timestamptz,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'student_lesson_progress_status_check'
      and conrelid = 'public.student_lesson_progress'::regclass
  ) then
    alter table public.student_lesson_progress
      add constraint student_lesson_progress_status_check check (status in ('not_started', 'in_progress', 'completed'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'student_lesson_progress_percent_check'
      and conrelid = 'public.student_lesson_progress'::regclass
  ) then
    alter table public.student_lesson_progress
      add constraint student_lesson_progress_percent_check check (progress_percent between 0 and 100);
  end if;
end $$;

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
alter table public.lessons enable row level security;
alter table public.student_lesson_progress enable row level security;

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

create policy "Students can read own class memberships"
on public.class_memberships for select
to authenticated
using (student_id = auth.uid());

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

create policy "Admins can update class memberships"
on public.class_memberships for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Public can read lesson rows" on public.lessons;
drop policy if exists "Admins can write lessons" on public.lessons;
drop policy if exists "Admins can read lessons" on public.lessons;
drop policy if exists "Approved class students can read lessons" on public.lessons;

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
drop policy if exists "Admins can read all progress" on public.student_lesson_progress;
drop policy if exists "Students can read own approved-class progress" on public.student_lesson_progress;
drop policy if exists "Students can insert own approved-class progress" on public.student_lesson_progress;
drop policy if exists "Students can update own approved-class progress" on public.student_lesson_progress;

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

create index if not exists profiles_status_idx on public.profiles(status);
create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists classes_status_idx on public.classes(status);
create index if not exists class_memberships_class_idx on public.class_memberships(class_id);
create index if not exists class_memberships_student_idx on public.class_memberships(student_id);
create index if not exists class_memberships_status_idx on public.class_memberships(status);
create index if not exists student_lesson_progress_class_idx on public.student_lesson_progress(class_id);

do $$
declare
  target_table text;
begin
  foreach target_table in array array[
    'profiles',
    'classes',
    'class_memberships',
    'student_lesson_progress'
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
