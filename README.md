# Tuwi Bank Account Training Web

Static Vite web app for Tuwi students to study the CEFR A1 bank-account training curriculum, log in as approved learners, and let admins review student registrations.

## Folder Structure

```text
src/
  main.js
  config/env.js
  lib/supabase/
  features/auth/
  features/admin/
  features/curriculum/
  features/lessons/
  components/
  styles/
  assets/
docs/
supabase/
scripts/
```

Legacy Gateway lesson data is kept in `src/features/lessons/legacyLessonsData.js` and exposed through the Tuwi 27-lesson registry.

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

`.env.local` for this Vite frontend:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Do not add server-only Supabase keys to the frontend bundle.

## Supabase Setup

1. Create a separate Supabase project for Tuwi.
2. Add the env values above from Project Settings.
3. Apply `supabase/migrations/20260608090000_student_login_admin_approval.sql`.
4. Register the first admin user, then update that row in `profiles` to `role = 'admin'` and `status = 'approved'` from the Supabase dashboard or SQL editor.

## Routes

- `/` lesson dashboard
- `/lesson/1` to `/lesson/27`
- `/student-register`
- `/student-login`
- `/student`
- `/admin/students`

## Deploy To Vercel

Import the repo into Vercel, set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, then deploy from the protected production branch.

## Security Notes

- Commit only `.env.example`, never `.env` or `.env.local`.
- The frontend uses only the Supabase URL and anon key.
- Admin approval uses Supabase auth, profiles, and RLS policies.
- Rotate any Supabase key that was ever pasted into source, docs, tickets, or chat.
