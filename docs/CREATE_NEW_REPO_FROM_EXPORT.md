# Cách tạo repo GitHub mới từ folder export

1. Mở terminal trong folder:
   tuwi-bank-account-training-web

2. Khởi tạo git mới:

```bash
git init
git add .
git commit -m "initial commit: Tuwi training web"
```

3. Tạo repo mới trên GitHub.

4. Kết nối remote:

```bash
git remote add origin <URL_REPO_MOI>
git branch -M main
git push -u origin main
```

5. Import repo mới vào Vercel.

6. Thêm biến môi trường Supabase riêng trong Vercel.
