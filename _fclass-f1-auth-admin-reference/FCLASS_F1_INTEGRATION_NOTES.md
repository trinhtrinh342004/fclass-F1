# fclass-f1 Integration Notes

## Copy these files first

- `src/lib/supabaseClient.ts`
- `src/hooks/useAuthProfile.ts`
- `src/components/ProtectedRoute.tsx`
- `src/components/AdminRoute.tsx`
- `src/components/ApprovedStudentRoute.tsx`
- `src/components/AuthNavbarExample.tsx`
- `src/components/AuthErrorBoundary.tsx`
- `src/pages/LoginPage.tsx`
- `src/pages/RegisterPage.tsx`
- `src/pages/ForgotPasswordPage.tsx`
- `src/pages/ResetPasswordPage.tsx`
- `src/pages/PendingApprovalPage.tsx`
- `src/pages/RejectedPage.tsx`
- `src/pages/AdminApprovalPage.tsx`
- `src/pages/AdminStudentsPage.tsx`
- `src/pages/AdminClassesPage.tsx`
- `src/pages/AdminLayoutExample.tsx`
- `src/pages/StudentHomeGuardExample.tsx`
- `src/router-example.tsx`

## Add env vars

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Restart the dev server after changing env vars.

## Wrap the app

In fclass-f1 `main.tsx` or `App.tsx`, wrap routes with `AuthProvider`:

```tsx
import { BrowserRouter } from "react-router-dom";
import AuthErrorBoundary from "./components/AuthErrorBoundary";
import { AuthProvider } from "./hooks/useAuthProfile";
import RouterExample from "./router-example";

export default function App() {
  return (
    <BrowserRouter>
      <AuthErrorBoundary>
        <AuthProvider>
          <RouterExample />
        </AuthProvider>
      </AuthErrorBoundary>
    </BrowserRouter>
  );
}
```

If you copy `router-example.tsx` as-is, it already includes `AuthProvider`; avoid wrapping twice.

## Protect the 27 lessons homepage

Replace the placeholder inside `StudentHomeGuardExample.tsx`, or wrap the existing homepage directly:

```tsx
<ProtectedRoute requireApprovedStudent>
  <ExistingFclassF1HomePage />
</ProtectedRoute>
```

Keep the class_members check if students should only see assigned classes.

## Navbar

Use `AuthNavbarExample` as a model:

- Not logged in: show Đăng nhập / Đăng ký.
- Logged in: show user name and Đăng xuất.
- Admin: show Admin link.

Do not store role/status in localStorage for navbar state. Read from `useAuthProfile()`.

## Supabase Auth settings

If email confirmation is enabled:

- Add your local URL and production URL in Supabase Auth URL configuration.
- Add `/reset-password` to redirect URLs.
- New users may not have a session immediately after register; the SQL trigger creates the pending profile after confirmation.

If email confirmation is disabled:

- `RegisterPage.tsx` creates the pending profile immediately if the trigger did not already create it.

## SQL order

1. `sql/001_auth_schema.sql`
2. `sql/002_rls_policies.sql`
3. Register the first admin account.
4. Edit and run `sql/003_seed_first_admin.sql`.

## Names to change manually

- Supabase env values.
- Styling classes if fclass-f1 does not use Tailwind.
- Route paths if fclass-f1 has different URL structure.
- The placeholder homepage in `StudentHomeGuardExample.tsx`.
- Class name/description if `TuWi A1` is not the final default class.
