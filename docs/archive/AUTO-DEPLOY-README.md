# Auto Deploy Script

Script tự động hóa workflow: commit → push → create PR → auto merge vào main.

## Cách sử dụng

### 1. Chạy script với commit message:
```bash
./auto-deploy.sh "feat: add new feature"
```

### 2. Chạy script và nhập commit message sau:
```bash
./auto-deploy.sh
```

## Script sẽ tự động:

1. ✅ Kiểm tra git status
2. ✅ Stage tất cả changes
3. ✅ Tạo commit với message của bạn
4. ✅ Push lên remote (tạo branch mới nếu đang ở main)
5. ✅ Tạo Pull Request với gh CLI
6. ✅ Auto merge PR vào main

## Yêu cầu

- Git đã được cấu hình
- GitHub CLI (`gh`) đã được cài đặt và authenticated
- Có quyền push và merge trên repository

## Lưu ý

- Nếu đang ở branch `main`, script sẽ tự động tạo branch mới
- PR sẽ được auto merge khi tất cả checks pass
- Script sẽ dừng nếu có lỗi xảy ra

## Ví dụ

```bash
# Refactor game
./auto-deploy.sh "refactor: implement rounds & chunking for match game"

# Fix bug
./auto-deploy.sh "fix: correct shuffle algorithm"

# Add feature
./auto-deploy.sh "feat: add next round button"
```
