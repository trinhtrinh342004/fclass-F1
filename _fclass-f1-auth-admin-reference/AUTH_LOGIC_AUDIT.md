# Auth Logic Audit

## Production references reviewed

- `src/integrations/supabase/client.ts`: Supabase browser client, persisted session, auto refresh.
- `src/hooks/useAuth.tsx`: session restore, `onAuthStateChange`, server token validation, realtime profile status update.
- `src/components/ProtectedRoute.tsx`: authenticated route guard and fallback session check.
- `src/components/AdminOnlyRoute.tsx`: admin/profile loading guard to avoid permission flash.
- `src/lib/ensureProfile.ts`: fallback profile creation for auth users missing profile rows.
- `src/pages/Auth.tsx`: email/password login/register, redirect after login, reset password entry point.
- `src/pages/AdminCommandCenter/AdminCommandCenter.tsx` and `tabs/ApprovalsTab.tsx`: pending/approved/rejected status workflow.
- Supabase migrations for `profiles`, `user_roles`, `is_admin`, `status`, approval, and admin policies.

## Reference kit coverage

- Email/password login: `src/pages/LoginPage.tsx`.
- Student register: `src/pages/RegisterPage.tsx`.
- Logout: `useAuthProfile.signOut()` plus `AuthNavbarExample`.
- Forgot password: `src/pages/ForgotPasswordPage.tsx`.
- Reset password: `src/pages/ResetPasswordPage.tsx`.
- Session restore: `AuthProvider` in `src/hooks/useAuthProfile.ts`.
- Profile restore/fallback: `ensureStudentProfile()` in `src/hooks/useAuthProfile.ts`.
- Realtime profile status refresh: `AuthProvider` subscribes to the current user's profile row.
- No role hardcode: admin/student is derived from `profiles.role` and `profiles.status`.
- No localStorage role decision: Supabase may persist tokens, but permissions are read from database.
- Route loading state: `ProtectedRoute` waits for `AuthProvider` before redirecting.
- Redirect after login: `LoginPage` routes admin to `/admin`, approved student to `/`, pending to `/pending-approval`, rejected to `/rejected`.
- Redirect after logout: `AuthNavbarExample` signs out and navigates to `/login`.

## Gaps found and fixed in this audit

- Added `AuthProvider` so every route reads one shared auth/profile state instead of creating separate subscriptions.
- Added forgot/reset password pages.
- Added fallback profile creation when an auth user exists but `profiles` row is missing.
- Changed register flow to avoid `upsert` updating an existing profile, because normal students should not have update permission on role/status.
- Added admin approved/rejected summary lists, reject confirmation, and clearer loading states.
- Added student class membership check before rendering the 27 lessons placeholder.
- Added navbar and error boundary examples for easier fclass-f1 integration.

## Integration note

Wrap fclass-f1 routes with `AuthProvider` before using `useAuthProfile`. Without the provider, the hook throws intentionally so missing wiring is obvious during development.
