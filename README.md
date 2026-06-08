# Tuwi Bank Account Training Web

Project này được tách từ branch:
feature/tuwi-bank-account-training-web

## Setup local

1. Cài dependencies:

```bash
npm install
```

2. Tạo file `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

3. Chạy project:

```bash
npm run dev
```

## Supabase

Dùng Supabase project riêng, không dùng chung database với FClass main.

## Deploy Vercel

Khi tạo repo GitHub mới:

1. Push folder này lên repo mới.
2. Import repo mới vào Vercel.
3. Thêm env Supabase riêng.
4. Deploy.

## Lưu ý bảo mật

Không commit `.env.local`.
Không đưa `SUPABASE_SERVICE_ROLE_KEY` lên frontend.
Nếu key từng bị lộ, hãy rotate key trong Supabase.
