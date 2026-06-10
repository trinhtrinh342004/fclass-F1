-- fclass-f1 row level security policies
-- Run after 001_auth_schema.sql.

alter table public.profiles enable row level security;
alter table public.classes enable row level security;
alter table public.class_members enable row level security;
alter table public.approval_logs enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
      and p.status = 'approved'
  );
$$;

create or replace function public.is_approved_student()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'student'
      and p.status = 'approved'
  );
$$;

create or replace function public.is_approved_member_of_class(_class_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    join public.class_members cm on cm.user_id = p.id
    where p.id = auth.uid()
      and p.role = 'student'
      and p.status = 'approved'
      and cm.class_id = _class_id
      and cm.status = 'approved'
  );
$$;

drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_select_admin_all" on public.profiles;
drop policy if exists "profiles_insert_own_student_pending" on public.profiles;
drop policy if exists "profiles_update_admin" on public.profiles;

create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using (id = auth.uid());

create policy "profiles_select_admin_all"
  on public.profiles
  for select
  to authenticated
  using (public.is_admin());

create policy "profiles_insert_own_student_pending"
  on public.profiles
  for insert
  to authenticated
  with check (
    id = auth.uid()
    and role = 'student'
    and status = 'pending'
  );

-- Keep status/role changes admin-only. Do not decide admin in localStorage/frontend.
create policy "profiles_update_admin"
  on public.profiles
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "classes_select_admin_all" on public.classes;
drop policy if exists "classes_select_approved_student_own" on public.classes;
drop policy if exists "classes_insert_admin" on public.classes;
drop policy if exists "classes_update_admin" on public.classes;
drop policy if exists "classes_delete_admin" on public.classes;

create policy "classes_select_admin_all"
  on public.classes
  for select
  to authenticated
  using (public.is_admin());

create policy "classes_select_approved_student_own"
  on public.classes
  for select
  to authenticated
  using (public.is_approved_member_of_class(id));

create policy "classes_insert_admin"
  on public.classes
  for insert
  to authenticated
  with check (public.is_admin());

create policy "classes_update_admin"
  on public.classes
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "classes_delete_admin"
  on public.classes
  for delete
  to authenticated
  using (public.is_admin());

drop policy if exists "class_members_select_admin_all" on public.class_members;
drop policy if exists "class_members_select_approved_student_own" on public.class_members;
drop policy if exists "class_members_insert_admin" on public.class_members;
drop policy if exists "class_members_update_admin" on public.class_members;
drop policy if exists "class_members_delete_admin" on public.class_members;

create policy "class_members_select_admin_all"
  on public.class_members
  for select
  to authenticated
  using (public.is_admin());

create policy "class_members_select_approved_student_own"
  on public.class_members
  for select
  to authenticated
  using (
    public.is_approved_student()
    and user_id = auth.uid()
    and status = 'approved'
  );

create policy "class_members_insert_admin"
  on public.class_members
  for insert
  to authenticated
  with check (public.is_admin());

create policy "class_members_update_admin"
  on public.class_members
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "class_members_delete_admin"
  on public.class_members
  for delete
  to authenticated
  using (public.is_admin());

drop policy if exists "approval_logs_select_admin_all" on public.approval_logs;
drop policy if exists "approval_logs_insert_admin" on public.approval_logs;

create policy "approval_logs_select_admin_all"
  on public.approval_logs
  for select
  to authenticated
  using (public.is_admin());

create policy "approval_logs_insert_admin"
  on public.approval_logs
  for insert
  to authenticated
  with check (public.is_admin() and admin_id = auth.uid());

grant usage on schema public to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.classes to authenticated;
grant select, insert, update, delete on public.class_members to authenticated;
grant select, insert on public.approval_logs to authenticated;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_approved_student() to authenticated;
grant execute on function public.is_approved_member_of_class(uuid) to authenticated;
