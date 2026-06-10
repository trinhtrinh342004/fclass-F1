# Security RLS Audit

## Source of truth

Permissions must come from Supabase:

- `profiles.role` decides `admin` or `student`.
- `profiles.status` decides `pending`, `approved`, or `rejected`.
- `class_members` decides which class an approved student can read.

The frontend may hide links for UX, but security is enforced by route guards and RLS.

## Tables covered

- `profiles`: enabled RLS.
- `classes`: enabled RLS.
- `class_members`: enabled RLS.
- `approval_logs`: enabled RLS.

## Functions covered

- `public.is_admin()`: security definer; true only for `role = 'admin'` and `status = 'approved'`.
- `public.is_approved_student()`: security definer; true only for approved students.
- `public.is_approved_member_of_class(uuid)`: security definer; true only when the current approved student has an approved class_members row for that class.

Security definer functions are used to avoid recursive or hidden-row problems when policies need to inspect protected tables.

## Policy behavior

- Users can read only their own profile.
- Admin can read all profiles.
- New users can insert only their own `student/pending` profile.
- Only admin can update profiles, including status changes.
- Admin can read/insert/update/delete classes.
- Approved students can read only classes assigned to them through `class_members`.
- Admin can read/insert/update/delete class_members.
- Approved students can read only their own approved class_members rows.
- Admin can insert and read approval_logs.

## Explicitly avoided

- No `using (true)` policy.
- No student policy that can update `role` or `status`.
- No frontend-local admin seed.
- No localStorage role/status cache.
- No class read policy that exposes all classes to approved students.

## Manual RLS smoke tests

Run these from the app or Supabase SQL editor using separate users:

1. As pending student, selecting from `classes` should return no rows.
2. As pending student, updating own `profiles.status = 'approved'` should fail.
3. As approved student without class_members, selecting from `classes` should return no rows.
4. As approved student with class_members, selecting from `classes` should return only assigned classes.
5. As student, selecting all `profiles` should return only own profile.
6. As admin, selecting `profiles/classes/class_members` should work.
7. As admin, approving a student should update `profiles` and insert/upsert `class_members`.

## Rollback notes

If a wrong first admin is seeded, use the rollback snippet in `sql/003_seed_first_admin.sql`, then seed the correct email. For a full schema rollback in a disposable Supabase project, drop dependent tables in this order: `approval_logs`, `class_members`, `classes`, `profiles`, then drop helper functions/triggers.
