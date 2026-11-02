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
