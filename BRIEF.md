# Brief — Website Company Profile PT Pangudi Utama Berjaya (PUB)

> Dokumen kerja. Bagian **Status** di bawah di-update setiap fase selesai.
> Terakhir diperbarui: 2026-11-03

---

## Status

| #   | Fase                                               | Status           | Catatan                                                                       |
| --- | -------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------- |
| 0   | Ekstraksi konten dari PDF                          | ✅ Selesai       | 9 halaman dibaca, lihat bagian Konten                                         |
| 1   | Brief (dokumen ini)                                | ✅ Selesai       |                                                                               |
| 2a  | Setup repo + boilerplate Next.js                   | ✅ Selesai       | Next.js 16.4.4, React 19.3, Tailwind 4.3, pnpm 12. Push ke `main`             |
| 2b  | Hubungkan repo ke Vercel                           | ✅ Selesai       | https://pub-comprof.vercel.app/ (dikerjakan user)                             |
| 3   | Design direction (impeccable)                      | ✅ Selesai       | `PRODUCT.md`, `DESIGN.md`. Arah: lembar swatch berkode warna                  |
| 4   | Build halaman (mini loop)                          | ✅ Selesai       | 11 URL statis, lint/typecheck/build lolos, detector impeccable bersih         |
| 5   | Review akhir (a11y, performa, impeccable critique) | 🟡 Sebagian      | Belum: review agent terpisah, Lighthouse, cek visual semua halaman di desktop |
| 6   | Deploy ke Vercel                                   | 🟡 Menunggu push | Otomatis dari `main`                                                          |

Legenda: ✅ selesai · 🟡 berjalan/menunggu · ⏳ belum · ⛔ blocked

---

## 1. Ringkasan proyek

|               |                                                                                                             |
| ------------- | ----------------------------------------------------------------------------------------------------------- |
| Klien         | PT Pangudi Utama Berjaya (PUB), Surabaya                                                                    |
| Bidang        | Perdagangan besar & eceran alat tulis kantor (ATK)                                                          |
| Target pasar  | Korporasi, institusi pendidikan, instansi pemerintah (B2B)                                                  |
| Tujuan        | Mengubah company profile PDF (Canva) jadi website compro. Tidak lebih.                                      |
| Output        | Prototype website statis, siap deploy di Vercel                                                             |
| Sumber konten | `COMPRO_PT PUB_2026.pdf` (utama). `COMPANY PROFILE CP PT TERA GLOBAL SURABAYA.pdf` hanya referensi struktur |

**Prinsip:** konten diambil dari PDF apa adanya (copy dirapikan seperlunya, tidak ditambah klaim baru). Yang belum ada di PDF diisi placeholder yang jelas, bukan dikarang.

---

## 2. Sitemap

```
/                               Beranda
/tentang-kami                   (dropdown di navbar)
  ├─ /tentang-kami/profil             Profil Perusahaan + identitas
  ├─ /tentang-kami/visi-misi          Visi & 4 Misi
  └─ /tentang-kami/struktur-organisasi Struktur organisasi
/produk-layanan                 Produk & Layanan (4 kategori + keunggulan)
  └─ /produk-layanan/[kategori]       Detail kategori (katalog foto)
/galeri                         Galeri "Ragam Barang yang Kami Pasok"
/komitmen-jaminan               Komitmen layanan + Jaminan pengiriman
/kontak                         Kontak, alamat, peta
```

Navbar: `Beranda · Tentang Kami ▾ · Produk & Layanan · Galeri · Komitmen & Jaminan · Kontak` + tombol CTA "Hubungi Kami".

Item ketiga dropdown Tentang Kami = **Struktur Organisasi** (sudah ada bagannya di PDF hal. 2: Komisaris → Dirut → Finance / Operasional / GM). Bisa diganti kalau klien punya preferensi lain.

---

## 3. Konten per halaman (sumber: PDF PUB)

### Beranda

- Logo PUB + "PT Pangudi Utama Berjaya"
- Label: Company Profile 2026
- Headline: **Alat Tulis Kantor, Satu Pintu.**
- Sub: "Perdagangan alat tulis kantor dan perlengkapan administrasi untuk korporasi, institusi pendidikan, dan instansi pemerintah."
- 3 poin: Katalog lengkap · Harga kompetitif · Antar terjadwal
- "Sejak [tahun] · Melayani Surabaya & Jawa Timur" → **tahun kosong di PDF, placeholder**
- Ringkasan: profil singkat, 4 kategori produk, 4 keunggulan, CTA kontak

### Tentang Kami — Profil (hal. 2)

- Judul: Profil Perusahaan. Sub: "Mitra pengadaan alat tulis kantor yang menyatukan katalog lengkap, harga wajar, dan pengiriman tepat waktu."
- 3 paragraf profil (diambil utuh dari PDF)
- Tabel identitas: Nama, Bidang (Perdagangan besar & eceran ATK), Badan hukum (PT), Alamat (Jl. Panggung No. 5, RT 01/RW 011, Nyamplungan, Pabean Cantian, Surabaya, Jawa Timur), Telepon (031) 352 2352

### Tentang Kami — Visi & Misi (hal. 3)

- Visi: "Menjadi mitra pengadaan alat tulis kantor paling diandalkan di Jawa Timur — pilihan pertama bagi perusahaan dan instansi yang menuntut ketersediaan barang, ketepatan waktu, dan harga yang wajar."
- Kutipan: "Kami diukur bukan dari banyaknya barang yang dijual, tetapi dari seberapa jarang pelanggan kehabisan stok."
- Misi "Empat komitmen yang kami jalankan setiap hari": 01 Katalog lengkap, stok terjaga · 02 Harga yang masuk anggaran · 03 Pengadaan yang transparan · 04 Hubungan jangka panjang (deskripsi lengkap dari PDF)

### Tentang Kami — Struktur Organisasi (hal. 2)

- Bagan: Komisaris → Direktur Utama → Finance · Operasional · GM. Nama pejabat belum ada → **placeholder / tampil jabatan saja**

### Produk & Layanan (hal. 4)

- "Yang Kami Sediakan — Kelompok barang yang menutup hampir seluruh belanja ATK bulanan sebuah kantor."
- 4 kategori: Alat tulis · Kertas & cetak · Filing & arsip · Perlengkapan meja (item dari PDF)
- "Juga tersedia: tinta & toner printer, baterai, tisu, papan tulis, aksesori presentasi."
- Keunggulan: Satu pintu · Harga bersaing · Antar terjadwal · Administrasi rapi

### Produk & Layanan — Detail kategori (hal. 6–7)

- Grid foto katalog: pulpen gel, marker permanen, metallic brush pen, whiteboard marker, penghapus, correction tape, notebook (A4/A5/B5), notebook spiral, buku tulis, pencil case, map folder, legal pad
- Foto dipetakan ke 4 kategori di atas

### Galeri (hal. 5 di PDF bernomor 06)

- "Ragam Barang yang Kami Pasok — Dari alat tulis harian sampai perlengkapan arsip dan kertas cetak, tersedia untuk pengiriman rutin."
- 5 item: Alat tulis & perlengkapan meja · Kertas & cetak · Filing & arsip · Stapler & clips · Paket set kantor

### Komitmen & Jaminan (hal. 8)

- Komitmen (5 poin): layanan B2B profesional, produk berkualitas & terjamin asli, harga kompetitif untuk partai besar, konsultasi produk, tim sales & CS responsif
- Jaminan Pengiriman Aman dan Tepat Waktu (4 poin): kemasan aman, armada & logistik, tracking, reguler/ekspres

### Kontak (hal. 9)

- Teks penutup "Thank You" dijadikan intro kontak
- Tagline: "Melayani dengan Lengkap, Cepat, dan Tepat untuk Seluruh Kebutuhan Alat Tulis Kantor Anda"
- Telepon admin (031) 352 2352, alamat lengkap, embed Google Maps
- Tombol: Telepon · WhatsApp **(nomor placeholder)** · Email **(placeholder)**
- Tanpa form backend di prototype (tombol langsung ke WA/telepon/email)

---

## 4. Temuan dari PDF yang perlu dikonfirmasi klien

1. **Halaman 05 tidak ada** — nomor halaman lompat dari 04 ke 06. Ada konten yang hilang?
2. **Hal. 6–9 diambil dari template PT Tera Global Surabaya.** Teks "Service" di hal. 8 sama persis dengan "Komitmen Kami" milik Tera, alamatnya pun sama. Apa hubungan PUB dan Tera (grup/sister company)? Boleh dipakai apa adanya?
3. **Cakupan wilayah tidak konsisten:** hal. 1–3 bilang "Surabaya & Jawa Timur", hal. 8–9 bilang "seluruh Indonesia". Pilih satu.
4. **Data kosong:** tahun berdiri, email, nomor WhatsApp, nama pengurus di struktur organisasi.
5. **Catatan internal ikut tercetak** di hal. 2: "Baris [lengkapi] diisi data resmi sebelum presentasi." — tidak ditampilkan di web.
6. **Typo alamat** hal. 9: "Nyamplunhan" → "Nyamplungan".
7. **Foto produk bermerek BAOKE** dan foto stok (kurir, kantor). Pastikan PUB memang reseller resmi / boleh pakai foto tersebut. Kalau ada foto asli gudang/toko, lebih bagus.
8. **Logo** hanya ada di dalam PDF (resolusi terbatas). Minta file asli (PNG/SVG).
9. Domain yang akan dipakai.

Sampai dijawab, semua poin di atas diisi placeholder yang mudah dicari (`[PLACEHOLDER: ...]` di file konten).

---

## 5. Arah desain (awal, difinalkan agent Designer)

- **Palet dari logo & PDF:** navy gelap (#0F1E36-an), biru (#1A4BA8-an), teal (#0E9AB5-an), aksen kuning (#F2D21B-an), lavender dari huruf "P" logo. Nilai pasti diambil dari aset.
- **Karakter:** rapi, tegas, kredibel untuk pembeli B2B/pengadaan. Bukan startup SaaS. Fokus ke katalog dan kepercayaan.
- **Wajib dihindari (no AI slop):** gradient ungu-biru generik, hero dengan blob/glow, ikon emoji, kartu glassmorphism, copy marketing yang tidak ada di PDF, animasi berlebihan, layout template "3 fitur + testimonial palsu".
- **Tools:** skill `impeccable` untuk shape/craft/critique/polish, hasil dicatat di `DESIGN.md`.
- Bahasa: Indonesia. Mobile-first.

---

## 6. Tech stack & best practice

| Area            | Pilihan                                                                                |
| --------------- | -------------------------------------------------------------------------------------- |
| Framework       | Next.js versi stabil terbaru (`create-next-app@latest`), App Router, TypeScript strict |
| Styling         | Tailwind CSS v4 (token dari `DESIGN.md` via `@theme`)                                  |
| Rendering       | Full static (SSG), tanpa backend/DB                                                    |
| Konten          | Satu file typed `src/content/site.ts` — klien/dev cukup edit di sini                   |
| Gambar          | `next/image`, aset hasil ekstraksi PDF di `public/images` (WebP/AVIF)                  |
| Font            | `next/font` (self-hosted, tanpa layout shift)                                          |
| SEO             | Metadata per halaman, `sitemap.ts`, `robots.ts`, OG image, JSON-LD `LocalBusiness`     |
| Kualitas        | ESLint + Prettier, `tsc --noEmit`, `next build` wajib lolos                            |
| Package manager | pnpm                                                                                   |
| Deploy          | Vercel via integrasi GitHub (push ke `main` = production, PR = preview)                |
| Target          | Lighthouse ≥ 95 (Performance, A11y, Best Practices, SEO), WCAG 2.1 AA                  |

Dependensi seminimal mungkin. Tidak pakai UI kit berat; komponen dibuat sendiri (navbar + dropdown aksesibel, footer, section, card, gallery grid + lightbox ringan).

---

## 7. Agent & alur kerja

**Urutan: Design dulu, baru Build.**

| Agent                         | Tugas                                                                                              | Output                      |
| ----------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------- |
| **Orchestrator** (sesi utama) | Pegang brief, bagi tugas, update Status, keputusan akhir                                           | `BRIEF.md`                  |
| **Designer** (sub-agent)      | Direction + design system via impeccable: palet, tipografi, spacing, komponen, layout tiap halaman | `DESIGN.md`, token Tailwind |
| **Asset** (sub-agent)         | Ekstrak logo & foto dari PDF resolusi penuh, crop, konversi WebP                                   | `public/images/*`           |
| **Builder** (sub-agent)       | Implement halaman sesuai `DESIGN.md` + `site.ts`                                                   | Kode Next.js                |
| **Reviewer** (sub-agent)      | impeccable critique/audit, a11y, responsif, cek konten vs PDF                                      | Daftar perbaikan            |

**Mini loop engineering (per halaman):**

```
spec dari DESIGN.md → build → verify (lint, typecheck, build, screenshot desktop+mobile)
  → review (impeccable + konten vs PDF) → fix → update Status → halaman berikutnya
```

Urutan halaman: layout global (navbar/footer) → Beranda → Profil → Visi & Misi → Struktur Organisasi → Produk & Layanan → Detail kategori → Galeri → Komitmen & Jaminan → Kontak.

Setiap loop selesai = 1 commit. **Aturan commit & PR: tanpa trailer `Co-Authored-By: Claude`, tanpa footer "Generated with Claude Code", tanpa atribusi AI dalam bentuk apa pun.** Pesan commit pakai format Conventional Commits (`feat:`, `fix:`, `chore:`, ...).

Definition of done per halaman: konten sesuai PDF, lolos lint/typecheck/build, tampil benar di 375px & 1440px, tidak ada temuan impeccable kategori berat.

---

## 8. Di luar scope prototype

CMS, form kontak dengan backend, katalog dengan harga/stok/e-commerce, multi-bahasa, blog, login.

---

## 9. Yang dibutuhkan untuk mulai

- [x] Link repo GitHub: https://github.com/sayyidtrq/pubComprof.git
- [ ] Repo sudah terhubung ke project Vercel
- [ ] Jawaban poin-poin di bagian 4 (boleh menyusul; prototype jalan dengan placeholder)

---

## 10. Prompt `/goal` (siap tempel)

```
/goal Bangun website company profile PT Pangudi Utama Berjaya sesuai BRIEF.md di root project.
Sumber konten: COMPRO_PT PUB_2026.pdf. Stack: Next.js (App Router, TS strict, Tailwind v4, SSG), pnpm, deploy Vercel.
Repo: https://github.com/sayyidtrq/pubComprof.git
Commit & PR: Conventional Commits, DILARANG menambahkan "Co-Authored-By: Claude", footer "Generated with Claude Code", atau atribusi AI apa pun.
Urutan wajib: (1) boilerplate sudah ada di main — pnpm install && pnpm check dulu, (2) agent Designer pakai skill impeccable → DESIGN.md + token,
(3) agent Asset ekstrak logo & foto dari PDF, (4) agent Builder kerjakan halaman satu per satu dengan mini loop
build → verify (lint, typecheck, build, screenshot 375px & 1440px) → review impeccable → fix → commit,
(5) review akhir a11y + Lighthouse, (6) push ke main untuk deploy Vercel.
Konten hanya dari PDF; data yang tidak ada pakai [PLACEHOLDER: ...]. Tidak ada AI slop.
Update tabel Status di BRIEF.md setiap fase selesai.
Selesai bila semua halaman di Sitemap tampil di URL Vercel dan build lolos tanpa error.
```
