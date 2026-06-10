# Migration Guide to fclass-f1

## 1. Copy file

Từ folder `_fclass-f1-auth-admin-reference`, copy sang fclass-f1:

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

Nếu fclass-f1 đã có file cùng tên, merge logic thủ công thay vì ghi đè.

## 2. Sửa import path

Code mẫu dùng import tương đối như:

```ts
import { supabase } from "../lib/supabaseClient";
import { useAuthProfile } from "../hooks/useAuthProfile";
```

Nếu fclass-f1 dùng alias `@`, có thể đổi thành:

```ts
import { supabase } from "@/lib/supabaseClient";
import { useAuthProfile } from "@/hooks/useAuthProfile";
```

## 3. Cắm vào App.tsx/router

Nếu fclass-f1 đang dùng `BrowserRouter + Routes`, copy nội dung trong `router-example.tsx` vào router hiện tại.

Các route tối thiểu:

- `/login` -> `LoginPage`
- `/register` -> `RegisterPage`
- `/forgot-password` -> `ForgotPasswordPage`
- `/reset-password` -> `ResetPasswordPage`
- `/pending-approval` -> `PendingApprovalPage`
- `/rejected` -> `RejectedPage`
- `/` -> `StudentHomeGuardExample` hoặc homepage 27 buổi bọc trong `ProtectedRoute requireApprovedStudent`
- `/admin` -> `ProtectedRoute requireAdmin` + `AdminLayoutExample`
- `/admin/approvals` -> `AdminApprovalPage`
- `/admin/students` -> `AdminStudentsPage`
- `/admin/classes` -> `AdminClassesPage`

Nếu dùng `useAuthProfile`, phải bọc router bằng `AuthProvider` một lần:

```tsx
import { AuthProvider } from "./hooks/useAuthProfile";

<AuthProvider>
  <Routes>{/* routes */}</Routes>
</AuthProvider>
```

Ví dụ bọc homepage hiện tại:

```tsx
<Route
  path="/"
  element={
    <ProtectedRoute requireApprovedStudent>
      <ExistingFclassF1HomePage />
    </ProtectedRoute>
  }
/>
```

## 4. Cắm Supabase env

Trong `.env` của fclass-f1:

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Restart dev server sau khi sửa `.env`.

## 5. Chạy SQL theo thứ tự

Trong Supabase SQL editor:

1. Chạy `sql/001_auth_schema.sql`.
2. Chạy `sql/002_rls_policies.sql`.
3. Mở fclass-f1, đăng ký tài khoản admin đầu tiên.
4. Sửa `YOUR_ADMIN_EMAIL_HERE` trong `sql/003_seed_first_admin.sql`.
5. Chạy `sql/003_seed_first_admin.sql`.

Không set admin bằng frontend, localStorage, hoặc biến JavaScript. Admin đầu tiên phải được set bằng SQL trong database.
`001_auth_schema.sql` tự seed lớp mặc định `TuWi A1`.

## 6. Test bằng 3 tài khoản

### Admin

1. Đăng nhập email admin đã seed.
2. Sau login phải vào `/admin`.
3. Vào `/admin/approvals`, thấy danh sách học viên pending.

### Student pending

1. Đăng ký học viên mới.
2. Đăng nhập học viên đó.
3. Phải bị chuyển tới `/pending-approval`.
4. Thử vào `/` hoặc route bài học trực tiếp: vẫn phải về `/pending-approval`.
5. Thử vào `/admin`: không được vào admin.

### Student approved

1. Admin chọn lớp và bấm Approve.
2. Kiểm tra Supabase:
   - `profiles.status = 'approved'`
   - có dòng `class_members` với `user_id` của học viên
   - có dòng `approval_logs`
3. Học viên đăng nhập lại hoặc refresh.
4. Học viên vào được `/` và xem nội dung 27 buổi.

### Student rejected

1. Admin bấm Reject cho một học viên pending khác.
2. Học viên đó đăng nhập.
3. Phải bị chuyển tới `/rejected`.

## 7. Phần cần chỉnh thủ công

- Style UI cho khớp fclass-f1.
- Import alias theo cấu trúc project.
- Thay placeholder ở `StudentHomeGuardExample.tsx` bằng homepage 27 buổi thật.
- Có thể dùng luôn `AdminStudentsPage.tsx` và `AdminClassesPage.tsx`, hoặc thay bằng UI thật nếu fclass-f1 đã có.
- Gắn `AuthNavbarExample` vào navbar thật nếu cần auth state.
- Nếu fclass-f1 bật email confirmation, đảm bảo Site URL/Redirect URLs trong Supabase Auth đã trỏ đúng domain fclass-f1.
- Thêm `/reset-password` vào Redirect URLs để reset password chạy đúng.
- Nếu đã có bảng `profiles/classes`, so sánh schema trước khi chạy SQL để tránh trùng tên cột khác ý nghĩa.

## 8. Kiểm tra bảo mật

- Không hardcode email admin trong React.
- Không check admin bằng localStorage.
- Không cho frontend tự set `role = admin`.
- Không cho student tự đổi `status`.
- Admin route phải dùng `ProtectedRoute requireAdmin`.
- Student lesson route phải dùng `ProtectedRoute requireApprovedStudent`.
- Database phải bật RLS và dùng policies trong `002_rls_policies.sql`.
