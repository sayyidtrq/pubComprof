# PUB Company Profile

Website company profile PT Pangudi Utama Berjaya. Rencana, sitemap, dan status pengerjaan ada di [BRIEF.md](BRIEF.md).

## Stack

Next.js (App Router), TypeScript strict, Tailwind CSS v4, pnpm. Deploy ke Vercel.

## Menjalankan

```bash
pnpm install
pnpm dev
```

Buka http://localhost:3000.

## Script

| Script           | Fungsi                        |
| ---------------- | ----------------------------- |
| `pnpm dev`       | Dev server                    |
| `pnpm build`     | Build production              |
| `pnpm lint`      | ESLint                        |
| `pnpm typecheck` | Cek tipe TypeScript           |
| `pnpm format`    | Format kode dengan Prettier   |
| `pnpm check`     | Lint + typecheck + cek format |

## Konten

Semua teks situs ada di `src/content/site.ts`. Data yang belum tersedia ditandai `[PLACEHOLDER: ...]`.

## Commit

Pakai Conventional Commits (`feat:`, `fix:`, `chore:`, ...). Tanpa trailer atau footer atribusi AI.

## Admin & konten dinamis

Produk, kategori, dan galeri dikelola di `/admin` (Supabase untuk data + login, Cloudflare R2 untuk gambar).

1. Salin `.env.example` ke `.env.local` dan isi nilainya (juga di Vercel → Environment Variables).
2. Skema database ada di `supabase/migrations/`, data awal di `supabase/seed.sql`.
3. Buat user di Supabase → Authentication → Users, matikan sign-up publik, lalu daftarkan sebagai admin:
   `insert into public.admins (user_id) select id from auth.users where email = '...';`
4. R2: buat bucket, aktifkan akses publik, set CORS (izinkan `PUT` dengan header `content-type` dari domain situs), dan buat API token Object Read & Write untuk bucket itu.
5. `vercel.json` menjalankan `/api/keepalive` setiap hari supaya project Supabase free tidak di-pause; isi `CRON_SECRET`.

Tanpa env Supabase, situs memakai konten statis di `src/content/site.ts`.
