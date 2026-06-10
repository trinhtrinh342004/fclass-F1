# fclass-f1 Auth/Admin Reference Kit

Bộ này là code tham khảo tách riêng cho fclass-f1. Nó không thay đổi logic hiện tại của THE ANG TOEIC.

## Flow tổng quan

1. Học viên đăng ký bằng email/password ở `RegisterPage.tsx`.
2. Supabase tạo `auth.users`; trigger SQL tạo `profiles` với `role = 'student'`, `status = 'pending'`.
3. `AuthProvider` restore session/profile khi reload và fallback tạo profile nếu auth user thiếu profile.
4. Học viên pending đăng nhập được nhưng `ProtectedRoute` chuyển về `/pending-approval`.
5. Admin đăng nhập, role/status được đọc thật từ bảng `profiles`.
6. Admin vào `/admin/approvals`, chọn lớp, bấm Approve hoặc Reject.
7. Approve cập nhật `profiles.status = 'approved'` và thêm dòng `class_members`.
8. Approved student mới vào được homepage/bài học 27 buổi qua `ProtectedRoute requireApprovedStudent`.
9. `StudentHomeGuardExample` kiểm tra thêm `class_members`; approved student chưa có lớp sẽ thấy thông báo cần admin thêm vào lớp.
10. Rejected student bị chuyển về `/rejected`.

Không có hardcode admin ở frontend. Không dùng localStorage để quyết định role. localStorage của Supabase chỉ dùng để lưu session token theo cơ chế auth mặc định.

## File nên copy sang fclass-f1

Copy các file mẫu này vào project fclass-f1 và chỉnh import path theo cấu trúc thật:

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

Nếu fclass-f1 đã có Supabase client hoặc router riêng, chỉ copy logic cần thiết và giữ tên file/import theo project đó.

## SQL cần chạy

Chạy theo thứ tự trong Supabase SQL editor:

1. `sql/001_auth_schema.sql`
2. `sql/002_rls_policies.sql`
3. Đăng ký tài khoản admin đầu tiên từ UI fclass-f1.
4. Sửa email trong `sql/003_seed_first_admin.sql`, rồi chạy file đó.

`001_auth_schema.sql` seed lớp mặc định `TuWi A1`.

## Env cần có

Trong `.env` của fclass-f1:

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Nếu project dùng tên `VITE_SUPABASE_PUBLISHABLE_KEY`, `supabaseClient.ts` mẫu cũng có fallback cho biến đó.

## Test end-to-end

1. Chạy SQL schema và RLS.
2. Đăng ký tài khoản admin đầu tiên.
3. Chạy `003_seed_first_admin.sql` với email admin.
4. Đăng nhập admin, vào `/admin/approvals`.
5. Đăng ký học viên mới.
6. Đăng nhập học viên mới: phải thấy `/pending-approval`.
7. Quay lại admin, chọn lớp, bấm Approve.
8. Đăng nhập lại học viên hoặc chờ realtime profile update: học viên approved vào được `/`.
9. Đăng ký học viên khác, admin bấm Reject.
10. Học viên rejected đăng nhập: phải thấy `/rejected`.

## Checklist audit

- Role admin/student đọc từ `profiles.role`.
- Trạng thái pending/approved/rejected đọc từ `profiles.status`.
- Route admin dùng `ProtectedRoute requireAdmin`.
- Route học viên dùng `ProtectedRoute requireApprovedStudent`.
- Pending student không vào được nội dung lớp.
- Student không vào được `/admin`.
- User chưa login bị chuyển về `/login`.
- RLS bảo vệ `profiles`, `classes`, `class_members`, `approval_logs`.
- THE ANG TOEIC không bị đổi production flow vì toàn bộ file nằm trong folder tham khảo riêng.

## Tài liệu audit bổ sung

- `AUTH_LOGIC_AUDIT.md`
- `SECURITY_RLS_AUDIT.md`
- `FCLASS_F1_INTEGRATION_NOTES.md`
- `MANUAL_TEST_CHECKLIST.md`
