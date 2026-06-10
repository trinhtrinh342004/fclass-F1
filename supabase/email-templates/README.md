# Supabase Auth Email Templates

Các template trong thư mục này dùng cho email xác thực thương hiệu **TuWi A1 / FClass**:

- `confirm-signup.html`: xác nhận đăng ký.
- `reset-password.html`: đặt lại mật khẩu.

## Cấu hình Reset Password

Trong Supabase Dashboard, mở **Authentication > Email Templates > Reset Password**:

1. Đặt Subject thành:

   ```text
   Đặt lại mật khẩu TuWi A1
   ```

2. Mở `reset-password.html`, paste toàn bộ HTML vào Body.
3. Giữ nguyên biến Supabase `{{ .ConfirmationURL }}` trong nút CTA và fallback link.
4. Chọn **Save**.

## Cấu hình Confirm Signup

Trong **Authentication > Email Templates > Confirm signup**:

1. Đặt Subject thành:

   ```text
   Xác nhận email để hoàn tất đăng ký TuWi A1
   ```

2. Paste nội dung `confirm-signup.html` vào Body và chọn **Save**.

## URL Configuration bắt buộc

Trong Supabase Dashboard, mở **Authentication > URL Configuration**:

- Site URL:

  ```text
  https://fclass-f1.vercel.app
  ```

- Redirect URLs:

  ```text
  https://fclass-f1.vercel.app/auth/callback
  https://fclass-f1.vercel.app/reset-password
  http://localhost:5173/auth/callback
  http://localhost:5173/reset-password
  ```

Project này dùng Vite port `5173`. Chỉ thêm `http://localhost:3000/auth/callback` hoặc
`http://localhost:3000/reset-password` nếu app thực sự được chạy ở port `3000`.

Không để production Site URL là `http://localhost:3000`. Khi gửi reset từ production,
kiểm tra link trong email mở về `https://fclass-f1.vercel.app/auth/callback?type=recovery`.

## Flow Reset Password

1. Người dùng gửi yêu cầu tại `/forgot-password`.
2. Frontend gọi `resetPasswordForEmail` với redirect URL lấy từ origin hiện tại:
   `/auth/callback?type=recovery`.
3. Supabase gửi email dùng `reset-password.html`.
4. `/auth/callback` xử lý recovery token ở query hoặc hash và chuyển sang `/reset-password`.
5. Sau khi cập nhật mật khẩu, frontend xóa recovery session và chuyển về `/login`.

Link hết hạn hoặc không hợp lệ sẽ hiển thị thông báo tiếng Việt và nút gửi lại link.
