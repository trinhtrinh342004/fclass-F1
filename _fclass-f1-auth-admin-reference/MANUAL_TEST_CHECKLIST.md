# Manual Test Checklist

Use three accounts:

- Admin: seeded by `sql/003_seed_first_admin.sql`.
- Student A: pending, then approved.
- Student B: pending, then rejected.

## Test 1: Student register

- Go to `/register`.
- Register Student A.
- Expected: success message says the account is waiting for admin approval, or asks for email confirmation if Supabase email confirmation is enabled.
- Verify DB: `profiles.role = 'student'`, `profiles.status = 'pending'`.

## Test 2: Student pending login

- Log in as Student A.
- Expected: redirect to `/pending-approval`.

## Test 3: Pending student blocked from homepage

- While logged in as Student A pending, open `/`.
- Expected: redirected to `/pending-approval`.

## Test 4: Admin login

- Log in as the seeded admin.
- Expected: redirect to `/admin`.
- Open `/admin/approvals`.
- Expected: Student A appears in the pending list.

## Test 5: Admin approve student into class

- Select `TuWi A1` or another class.
- Click Approve.
- Expected: success message.
- Verify DB: Student A profile is `approved`; class_members row exists with `approved_by` and `approved_at`; approval_logs row exists.

## Test 6: Approved student can access homepage

- Log in as Student A.
- Open `/`.
- Expected: homepage/27 lessons render.
- If class_members is missing, expected message says admin must add student to a class.

## Test 7: Rejected student blocked

- Register Student B.
- Admin rejects Student B.
- Log in as Student B.
- Expected: redirect to `/rejected`.
- Open `/`; expected: still blocked.

## Test 8: Student cannot access admin

- Log in as Student A.
- Open `/admin/approvals`.
- Expected: redirect away from admin.

## Test 9: Reload preserves session

- Log in as admin and reload `/admin/approvals`.
- Expected: page remains after loading state.
- Log in as approved student and reload `/`.
- Expected: page remains after loading state.

## Test 10: Logout blocks old routes

- Log out from navbar.
- Open `/` or `/admin/approvals`.
- Expected: redirect to `/login`.

## Test 11: RLS blocks student role/status update

- As Student A, attempt to update own profile to `role = 'admin'` or `status = 'approved'`.
- Expected: Supabase permission/RLS error.

## Test 12: Approve does not duplicate class_members

- Approve Student A once.
- Try approving the same student again from DB/client or by re-running upsert.
- Expected: no duplicate for the same `(class_id, user_id)` because of the unique constraint and upsert.
