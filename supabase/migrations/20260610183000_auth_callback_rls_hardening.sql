-- Harden auth/admin flow after the initial approval migration.
-- Idempotent: replaces only named policies/functions and does not drop tables or data.

create extension if not exists pgcrypto;

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

  perform pg_advisory_xact_lock(hashtext(p_student_id::text || ':' || p_class_id::text));

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
    and student_id = p_student_id;

  select id into v_membership_id
  from public.class_memberships
  where class_id = p_class_id
    and student_id = p_student_id
  order by created_at asc, id asc
  limit 1;

  if v_membership_id is null then
    insert into public.class_memberships (class_id, student_id, status, approved_by, approved_at)
    select p_class_id, p_student_id, 'approved', v_admin_id, now()
    where not exists (
      select 1
      from public.class_memberships
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
    select 1
    from public.class_members
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

-- Replaces "Assigned approved students can read active classes" so approved
-- students without a class can see active classes and submit a join request.
drop policy if exists "Assigned approved students can read active classes" on public.classes;
drop policy if exists "Approved students can read active classes" on public.classes;

create policy "Approved students can read active classes"
on public.classes for select
to authenticated
using (
  status = 'active'
  and public.is_approved_student(auth.uid())
);

-- Replaces "Students can read own approved class memberships" so students can
-- see their own pending/rejected/removed class request status without seeing
-- anyone else's membership rows.
drop policy if exists "Students can read own approved class memberships" on public.class_memberships;
drop policy if exists "Students can read own class memberships" on public.class_memberships;

create policy "Students can read own class memberships"
on public.class_memberships for select
to authenticated
using (student_id = auth.uid());

grant execute on function public.is_admin(uuid) to authenticated;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.profile_role_status_unchanged(uuid, text, text) to authenticated;
grant execute on function public.approve_student(uuid, uuid) to authenticated;
grant execute on function public.reject_student(uuid, text) to authenticated;
