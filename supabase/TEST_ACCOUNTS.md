# Fclass Supabase Test Accounts

Use these accounts to test the real Supabase Auth + profile + class access flow.

## Accounts

| Role | Email | Password | Profile status |
| --- | --- | --- | --- |
| Admin | `admin.test@fclass.local` | `AdminTest@123456` | `approved` |
| Student | `student.approved@fclass.local` | `StudentTest@123456` | `approved` |
| Student | `student.pending@fclass.local` | `StudentTest@123456` | `pending` |
| Student | `student.rejected@fclass.local` | `StudentTest@123456` | `rejected` |

## Expected Behavior

- `admin.test@fclass.local` can sign in and open `/admin` and `/admin/approvals`.
- `student.approved@fclass.local` can sign in and open the 27-lesson homepage.
- `student.approved@fclass.local` has an approved membership for class `TuWi A1`.
- `student.pending@fclass.local` can sign in, then is routed to `/pending-approval`.
- `student.rejected@fclass.local` can sign in, then is routed to `/rejected`.
- Pending and rejected test students must not have any active approved class membership.

## Run Seed

Set local/server-only env vars:

```powershell
$env:VITE_SUPABASE_URL="https://YOUR_PROJECT.supabase.co"
$env:SUPABASE_SERVICE_ROLE_KEY="YOUR_SERVICE_ROLE_KEY"
npm run seed:test-accounts
```

The script also accepts `SUPABASE_URL` instead of `VITE_SUPABASE_URL`.

Do not add `SUPABASE_SERVICE_ROLE_KEY` to frontend code, Vercel public env, or any `VITE_`/`NEXT_PUBLIC_` variable. The seed script refuses to run if `VITE_SUPABASE_SERVICE_ROLE_KEY` is present.

## What The Script Does

- Creates or updates the four Supabase Auth users with confirmed email.
- Upserts matching rows in `profiles`.
- Creates class `TuWi A1` if it does not exist.
- Adds `student.approved@fclass.local` to `TuWi A1` in `class_memberships` with `status = approved`.
- Maintains compatibility table `class_members` if it exists.
- Deactivates approved memberships for pending/rejected test students instead of deleting data.
- Inserts approval logs idempotently if `approval_logs` exists.
- Verifies profiles, class, and membership state after seeding.
