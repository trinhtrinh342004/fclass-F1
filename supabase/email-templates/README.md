# Hướng dẫn Cấu hình Email Template & Redirect URLs trên Supabase

Tài liệu này hướng dẫn cách cập nhật template email xác nhận đăng ký học viên thương hiệu **TuWi A1 / FClass** và các cấu hình điều hướng cần thiết trên Supabase Dashboard.

---

## 1. Cấu hình Email Template

Hãy làm theo các bước dưới đây để thay đổi email mặc định của Supabase sang email HTML thương hiệu TuWi A1:

1. Đăng nhập vào [Supabase Dashboard](https://supabase.com/dashboard).
2. Chọn project của bạn (`fclass-f1` hoặc tương ứng).
3. Tại menu bên trái, chọn **Authentication** -> **Email Templates**.
4. Chọn tab **Confirm signup** (Xác nhận đăng ký).
5. Thực hiện các cấu hình sau:
   - **Subject (Tiêu đề Email):** 
     ```text
     Xác nhận email để hoàn tất đăng ký TuWi A1
     ```
   - **Body (Nội dung Email):**
     - Mở file [confirm-signup.html](./confirm-signup.html) trong repo này.
     - Sao chép toàn bộ mã nguồn HTML.
     - Dán đè (paste) toàn bộ mã nguồn vào khung soạn thảo **Body** trên Supabase Dashboard.
6. Nhấp vào nút **Save** ở góc dưới cùng bên phải để lưu thay đổi.

---

## 2. Cấu hình URL Của Trang Web (Site URL) & URL Điều Hướng (Redirect URLs)

Để đảm bảo sau khi học viên bấm vào nút xác nhận trong email, hệ thống sẽ tự động đăng nhập và điều hướng họ về đúng trang web tương ứng theo môi trường (Production hoặc Local), bạn cần cấu hình các mục sau:

1. Tại mục **Authentication** trên Supabase Dashboard, chọn **URL Configuration** (hoặc **Settings**).
2. Cấu hình các trường thông tin:
   - **Site URL:**
     ```text
     https://fclass-f1.vercel.app
     ```
   - **Redirect URLs:** Thêm tất cả các đường link sau:
     - `https://fclass-f1.vercel.app/auth/callback` (Dành cho Production)
     - `http://localhost:5173/auth/callback` (Dành cho môi trường phát triển Vite Local)
     - `http://localhost:3000/auth/callback` (Dành cho các môi trường chạy cổng 3000 nếu có)
3. Nhấp vào nút **Save** để lưu lại.

---

## 3. Hoạt Động của Flow Xác Thực Email

1. Học viên đăng ký tài khoản tại trang `/register`.
2. Supabase gửi email xác nhận TuWi A1 (được cấu hình ở Bước 1) tới Gmail của học viên.
3. Học viên nhấp vào nút **Xác nhận email** (trỏ tới `{{ .ConfirmationURL }}`).
4. Supabase điều hướng người dùng tới `/auth/callback?code=...` của trang web (Site URL hoặc Redirect URL tương ứng).
5. Client-side trao đổi `code` lấy `session` và kiểm tra hồ sơ:
   - Nếu hồ sơ đang chờ duyệt (`status = 'pending'`), người dùng được chuyển tới trang trạng thái Chờ duyệt `/pending-approval`.
   - Nếu đã được duyệt (`status = 'approved'`), chuyển tới lớp học chính `/`.
