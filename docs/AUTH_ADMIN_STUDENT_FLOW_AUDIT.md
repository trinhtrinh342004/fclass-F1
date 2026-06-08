# Auth/Admin/Student Flow Audit

| Hạng mục | File | Vấn đề | Cách sửa |
| -------- | ---- | ------ | -------- |
| Supabase client | `src/lib/supabase/client.js` | Client chỉ dùng anon key từ `VITE_SUPABASE_URL` và `VITE_SUPABASE_ANON_KEY`; không thấy service role trong frontend. | Giữ nguyên, không thêm `SUPABASE_SERVICE_ROLE_KEY` vào code frontend. |
| Login/profile lookup | `src/lib/supabase/auth.js`, `src/features/auth/authService.js` | Login cũ đã gọi Supabase Auth nhưng export chưa có `signIn` tên chuẩn theo yêu cầu. | Thêm `signIn()` alias dùng `signInWithPassword`; mọi login tiếp tục lấy profile thật từ `public.profiles`. |
| Admin guard | `src/features/auth/authGuard.js` | Admin guard đã kiểm tra profile thật, nhưng cần ghi rõ chỉ `role = admin` và `status = approved`. | Giữ điều kiện chặt: không có profile, sai role, hoặc sai status đều bị chặn. |
| Student guard | `src/features/auth/authGuard.js` | Student guard cũ chỉ yêu cầu `status = approved`, chưa chặn profile admin vào khu học viên. | Bổ sung `role = student` và `status = approved`. |
| Missing profile | `src/features/auth/studentAuthRoutes.js` | Thông báo cũ thiên về hồ sơ học viên, chưa đúng yêu cầu tài khoản/admin. | Đổi sang “Không tìm thấy hồ sơ tài khoản. Vui lòng liên hệ admin.” |
| Student lesson access | `src/features/auth/studentAuthRoutes.js`, `src/main.js` | Học viên approved có thể mở bài ngay mà chưa cần duyệt vào lớp. | Thêm flow membership: approved account phải có `class_memberships.status = approved` mới mở lesson. |
| Admin page | `src/features/auth/studentAuthRoutes.js` | Admin UI cũ chỉ quản lý học viên. | Thêm tabs tổng quan, học viên, lớp học, duyệt vào lớp, tiến độ. |
| Class repository | `src/features/admin/adminRepository.js` | Chưa có repository chuẩn cho classes/memberships/progress. | Thêm `listClasses`, `createClass`, `updateClass`, `listPendingClassRequests`, `updateClassMembershipStatus`, `listStudentProgress`. |
| Student repository | `src/features/student/studentRepository.js` | Chưa có repository chuẩn cho xin lớp và progress theo lớp. | Thêm `listActiveClasses`, `requestJoinClass`, `getMyClassMemberships`, `getMyApprovedClasses`, `getMyProgress`, `upsertLessonProgress`. |
| Realtime helpers | `src/lib/supabase/realtime.js` | Helper chung tồn tại nhưng thiếu function đặt tên theo domain. | Thêm `subscribeToProfiles`, `subscribeToClassMemberships`, `subscribeToMyMemberships`, `subscribeToStudentProgress`. |
| Progress source | `src/features/progress/progressRepository.js` | Có migration localStorage sang Supabase; localStorage chỉ nên là cache/migration, không quyết định quyền. | Progress write hiện yêu cầu approved class id; localStorage không quyết định admin/student/class access. |
| localStorage | `src/main.js`, `src/features/progress/progressRepository.js` | Vẫn dùng cache tiến độ cục bộ cho UI/migration. | Chấp nhận cho cache nhẹ; quyền admin/student/class không đọc từ localStorage. |
| Mock/demo/default admin | Project search | Không thấy `defaultAdmin`, `demoAdmin`, hardcoded admin email, hoặc query `admin=true` trong frontend. | Không tạo admin mặc định; bootstrap admin bằng SQL trong docs. |
| Schema/RLS | `supabase/migrations/20260608234500_real_admin_student_class_flow.sql` | Migration cũ thiếu `classes`, `class_memberships`, `class_id` progress, và policy class membership. | Thêm migration idempotent với helper functions, RLS policies, realtime publication. |
| Service role exposure | `scripts/*`, frontend env | Service role chỉ xuất hiện trong scripts local/server-side. | Thêm `check:supabase` để cảnh báo nếu service role bị đặt bằng biến frontend. |
