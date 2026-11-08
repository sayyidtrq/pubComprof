# Implementation Plan: Penyelarasan Desain ke Papan Canva

> Rencana teknis untuk menjalankan keputusan di [penyelarasan.md](penyelarasan.md).
> Dikerjakan oleh agent coding (Codex) dengan prompt di [codex-prompt.md](codex-prompt.md).
> Baca penyelarasan.md lebih dulu: semua nilai warna, font, dan aturan isi ada di sana.

---

## 0. Aturan kerja

1. **Branch:** kerjakan di `design/penyelarasan-canva`, dibuat dari `main` terbaru. Jangan commit langsung ke `main`.
2. **Commit per fase** (fase 1–8 di bawah), format Conventional Commits, bahasa Inggris, contoh: `feat(design): add canva palette tokens and poppins`.
3. **Dilarang** menambahkan `Co-Authored-By`, `Generated with ...`, atau atribusi AI apa pun di commit, PR, atau kode.
4. **Next.js 16 berbeda dari yang mungkin kamu kenal.** Sesuai `AGENTS.md`, baca panduan terkait di `node_modules/next/dist/docs/` sebelum menulis kode yang menyentuh API Next (font, image, metadata, routing, config). Perhatikan pemberitahuan deprecation.
5. **Dependensi:** hanya boleh menambah `lucide-react` (versi stabil terbaru). Tidak boleh UI kit (shadcn, MUI, dsb.), tidak boleh library animasi, carousel, atau accordion.
6. **Isi:** semua teks tetap dari `src/content/site.ts`. Teks PDF yang sudah ada tidak boleh diubah. Field baru boleh ditambah.
7. **Setiap fase** harus lolos `pnpm check` (lint + typecheck + prettier) dan `pnpm build` sebelum commit.
8. Jangan menyentuh: `next.config.ts` (kecuali benar-benar perlu, dan jelaskan alasannya), redirect, `robots.ts`, `sitemap.ts`, file PDF, `.impeccable/`.

---

## Fase 1: Token, font, utilitas dasar

**File:** `src/app/globals.css`, `src/app/layout.tsx`, `package.json`

- [x] `pnpm add lucide-react`
- [x] Di `layout.tsx`: ganti `Archivo` dengan `Poppins` (`weight: ["500","600","700"]`, `variable: "--font-poppins"`, `display: "swap"`, subset latin). Hanken Grotesk tetap.
- [x] Di `globals.css`, ganti seluruh blok `@theme` dengan token di penyelarasan.md §4.1:
  ```css
  --color-navy: #2a397a;
  --color-navy-900: #1c2754;
  --color-navy-50: #eef0f8;
  --color-teal: #0c89a5;
  --color-teal-700: #0a7690;
  --color-teal-50: #e6f3f6;
  --color-lavender: #b6ace8;
  --color-lavender-50: #f2f0fc;
  --color-yellow: #f8e01a;
  --color-yellow-50: #fefbe3;
  --color-surface: #f6f7fb;
  --color-card: #ffffff;
  --color-muted: #5b6485;
  --color-line: #e1e4ef;
  --font-sans: var(--font-hanken), system-ui, sans-serif;
  --font-heading: var(--font-poppins), system-ui, sans-serif;
  --radius-card: 16px;
  --radius-btn: 10px;
  --shadow-card:
    0 1px 2px rgb(42 57 122 / 0.06), 0 10px 30px -16px rgb(42 57 122 / 0.22);
  --shadow-card-hover:
    0 2px 4px rgb(42 57 122 / 0.08), 0 16px 36px -16px rgb(42 57 122 / 0.3);
  ```
- [x] `body`: latar `surface`, warna `navy`, font Hanken, line-height 1.65.
- [x] Hapus `.display`, `.label`, `.heading`, `.tone-*`, `.strip-in` dan keyframes-nya. Ganti dengan utilitas `@layer components`:
  - `.h-hero`, `.h-page`, `.h-section`, `.h-card`: font heading + ukuran dari penyelarasan.md §4.2.
  - `.btn`, `.btn-primary` (kuning, teks navy, hover sedikit lebih gelap), `.btn-secondary` (outline `teal-700`, teks `teal-700`, hover isi `teal-700` teks putih), `.btn-navy` (navy, teks putih, hover `navy-900`). Semua: radius `--radius-btn`, padding `0.75rem 1.25rem`, font heading 600, `inline-flex items-center gap-2`, tinggi minimal 44px.
  - `.card`: latar putih, border `line`, radius `--radius-card`, `--shadow-card`. `.card-link`: `.card` + hover naik 2px + `--shadow-card-hover`, transisi 200ms.
  - `.chip`: pill, `text-sm`, font heading 500, padding `0.375rem 0.875rem`.
  - `.measure`: `max-inline-size: 68ch`.
- [x] Fokus: outline 3px `yellow` + ring navy (pertahankan pola yang ada, sesuaikan warna). `::selection` kuning dengan teks navy.
- [x] Marquee keyframes (`@keyframes marquee { to { transform: translateX(-50%) } }`) dan kelas `.marquee-track`, yang berhenti saat `:hover` dan **tidak beranimasi** di `prefers-reduced-motion: reduce`.

**Selesai bila:** build lolos, tidak ada referensi tersisa ke `font-archivo`, `.display`, `.label`, `.heading`, `tone-`, `strip-in`, `paper`, atau `blue` (cek dengan grep). Halaman boleh terlihat berantakan di akhir fase ini.

## Fase 2: Data dan komponen dasar

**File:** `src/content/site.ts`, `src/components/*`

- [x] `site.ts`:
  - Ubah tipe `Tone` jadi `"teal" | "navy" | "lavender" | "yellow"`. Kategori Kertas & cetak: `tone: "navy"`.
  - Tambah `name` di tiap item `catalog` (nama produk pendek yang diturunkan dari `alt`, contoh: alt "Pulpen gel tekan merah dan biru" → name "Pulpen gel tekan"). Jangan menambah klaim, merek baru, atau spesifikasi.
  - Tambah `contact.whatsappHref: null as string | null` (tetap `null` sampai klien memberi nomor) dan `contact.addressShort` = `"Jl. Panggung No. 5, Surabaya"`.
  - Tambah `marquee: string[]` = `["Alat Tulis Kantor, Satu Pintu", "Katalog lengkap", "Harga kompetitif", "Antar terjadwal", "Melayani dengan Lengkap, Cepat, dan Tepat"]`.
  - Tambah `faqs: {q: string; a: string}[]`, **hanya** dengan jawaban yang tersurat di PDF. Contoh yang boleh:
    - "Produk apa saja yang disediakan PUB?" → 4 kategori + "Juga tersedia".
    - "Siapa saja pelanggan PUB?" → perusahaan, institusi pendidikan, instansi pemerintah di Surabaya dan sekitarnya.
    - "Bagaimana cara meminta penawaran?" → hubungi admin di (031) 352 2352; penawaran khusus untuk pembelian partai besar.
    - "Bagaimana pengiriman barang?" → pengiriman rutin sesuai jadwal belanja bulanan; pilihan reguler maupun ekspres; dikemas dengan standar keamanan.
    - "Apakah administrasi pembelian rapi?" → penawaran, faktur, dan rekap pembelian siap audit; satu faktur untuk seluruh kebutuhan.
  - Tambah ikon per keunggulan dan per misi sebagai **nama string** (contoh `"store"`), lalu petakan ke komponen lucide di komponen UI. Jangan import React di `site.ts`.
  - Tambah peta tone: `toneStyles: Record<Tone, { accent: string; tint: string; text: string }>` berisi nama kelas Tailwind **lengkap dan literal** (Tailwind v4 butuh kelas literal agar ikut terbentuk), contoh `{ accent: "bg-teal", tint: "bg-teal-50", text: "text-teal-700" }`. Simpan di file baru `src/content/tones.ts` kalau lebih rapi.
- [x] Komponen baru di `src/components/`:
  - `Button.tsx`: `ButtonLink` (Next `Link` atau `<a>` untuk `tel:`/`mailto:`), varian `primary | secondary | navy`, ikon opsional.
  - `SectionHeading.tsx`: judul + sub opsional, rata kiri atau tengah. **Tanpa eyebrow/kicker** di atas judul.
  - `ProductCard.tsx`: gambar dalam kotak `aspect-square` berlatar putih, `object-contain`, padding kecil; titik warna + nama kategori; nama produk (`h-card`); teks "Hubungi kami untuk harga" sebagai link ke `tel:`.
  - `CategoryCard.tsx`: gambar atas (`aspect-[4/3]`, `object-cover`, radius 12px), garis aksen 4px warna kategori di atas, nama, daftar item, link "Lihat koleksi" + ikon panah.
  - `FeatureCard.tsx`: ikon dalam kotak bulat tint, judul, teks.
  - `Marquee.tsx`: isi diduplikasi dua kali untuk loop mulus, duplikat kedua `aria-hidden`, pemisah titik kuning.
  - `CtaBand.tsx`: pita navy, judul, teks, tombol kuning telepon.
  - `Faq.tsx`: `<details>`/`<summary>` di dalam kartu, ikon chevron berputar saat terbuka, tanpa JavaScript.
  - `FloatingContact.tsx`: tombol bulat kanan bawah (`fixed bottom-5 right-5`, z di atas konten, di bawah header). Kalau `whatsappHref` ada → link WA berlabel "Chat WhatsApp". Kalau `null` → link `tel:` berlabel "Telepon kami". Label terlihat di ≥sm, hanya ikon di mobile (dengan `aria-label`).
  - `Breadcrumb.tsx`: `nav aria-label="Breadcrumb"` + `ol`, item terakhir `aria-current="page"`.
  - `PageHeader.tsx`: tulis ulang. Latar tint (prop `tone`, default `lavender-50`), breadcrumb, judul `h-page`, lead. Tetap ekspor `Container`.

**Selesai bila:** semua komponen ada, bertipe, dipakai minimal di satu tempat atau di fase berikutnya; build lolos.

## Fase 3: Header dan footer global

**File:** `src/components/Nav.tsx`, `src/components/Footer.tsx`, `src/app/layout.tsx`

- [x] **Bar atas** (`bg-navy text-white text-sm`, tinggi ±36px, disembunyikan di <md): ikon telepon + "(031) 352 2352" (link `tel:`), ikon lokasi + alamat singkat. Kanan: "Melayani Surabaya & Jawa Timur".
- [x] **Header utama** (putih, `sticky top-0`, border bawah `line`, bayangan tipis saat menempel boleh tapi tidak wajib): logo (gambar + "PUB" / "PT Pangudi Utama Berjaya" dalam font heading), menu desktop (≥lg), tombol `btn-primary` "Hubungi Kami" (ikon telepon) di ≥md.
- [x] Menu desktop: item teks navy font heading 500; item aktif berbentuk pill `bg-lavender-50 text-navy`; hover `bg-surface`. Dropdown "Tentang Kami" jadi kartu putih membulat dengan bayangan, item dengan ikon kecil, tetap menutup lewat Escape, klik luar, dan saat item dipilih. Pertahankan logika state berbasis `pathname` yang ada (lolos lint `react-hooks/set-state-in-effect`).
- [x] Menu mobile: tombol ikon `Menu`/`X` (lucide) dengan `aria-label`; panel putih penuh lebar di bawah header; sub-item Tentang Kami terindentasi; tombol kuning telepon di bawah.
- [x] Footer: latar `navy`, pita 4 warna (teal, navy-900, lavender, yellow) di atasnya. 4 kolom di desktop: (1) logo dalam kotak putih membulat + tagline penutup + deskripsi, (2) Halaman, (3) Produk, (4) Kontak dengan ikon (telepon, alamat; WA dan email hanya kalau ada isinya). Bawah: "© 2026 PT Pangudi Utama Berjaya".
- [x] Pasang `<FloatingContact />` di `layout.tsx`.

**Selesai bila:** keyboard bisa membuka dan menutup dropdown dan menu mobile, Escape menutup, fokus terlihat, tidak ada scroll horizontal di 375px.

## Fase 4: Beranda

**File:** `src/app/page.tsx`

Ikuti urutan di penyelarasan.md §6 "Beranda", poin 2–9:

- [x] Hero (latar putih dengan panel `lavender-50` membulat di belakang kolase pada desktop). Kolase 2×2 pakai `next/image` dengan `sizes` yang benar, foto `object-cover` radius 16px, chip nama kategori di sudut tiap foto. Batasi lebar render kolase maksimal ±560px karena foto beresolusi rendah.
- [x] Marquee.
- [x] Kartu Tentang Kami (grid 2 kolom di desktop: logo besar dalam kotak tint | judul, paragraf profil pertama, tombol `btn-secondary` "Selengkapnya").
- [x] Keunggulan: 4 `FeatureCard` (grid 1/2/4).
- [x] Kategori: `SectionHeading` "Yang Kami Sediakan" + 4 `CategoryCard` (grid 1/2/4) + baris "Juga tersedia: …".
- [x] Produk pilihan: 8 `ProductCard` (2 dari tiap kategori, atau sebanyak yang ada untuk kategori yang lebih sedikit), grid 2/3/4, tombol "Lihat semua produk".
- [x] `CtaBand`.
- [x] `Faq`.

**Selesai bila:** first viewport di 1440×900 menampilkan H1, sub, dua tombol, dan kolase; di 375px H1 dan tombol utama terlihat tanpa scroll.

## Fase 5: Tentang Kami

**File:** `src/app/tentang-kami/page.tsx`

- [x] `PageHeader` (tint lavender) + breadcrumb + chip anchor (Profil, Visi & Misi, Struktur Organisasi) sebagai pill link.
- [x] Anchor dan id section **tetap sama**. Tetap `scroll-mt` agar tidak tertutup header sticky (sesuaikan dengan tinggi header baru).
- [x] Profil: paragraf kiri + kartu identitas kanan (tabel `dl`, ikon per baris).
- [x] Visi: kartu besar `bg-navy` putih, kutipan dengan aksen garis kuning tipis di kiri (≤2px, bukan border tebal).
- [x] Misi: 4 kartu putih bernomor (nomor dalam lingkaran tint) + ikon.
- [x] Struktur: bagan di dalam `.card`, kotak jabatan membulat 10px, Komisaris berlatar `navy` putih, lainnya putih berborder; konektor garis navy 2px. Caption placeholder tetap.

## Fase 6: Produk & Layanan + detail kategori

**File:** `src/app/produk-layanan/page.tsx`, `src/app/produk-layanan/[kategori]/page.tsx`

- [x] Halaman induk: `PageHeader` tint teal-50; 4 kartu kategori lebar (gambar kiri, teks kanan di ≥md); section "Semua produk" dengan chip link ke tiap kategori + grid seluruh `ProductCard`; section Keunggulan (pakai ulang `FeatureCard`) + "Juga tersedia".
- [x] Detail kategori: `PageHeader` dengan tint kategori + breadcrumb (Beranda › Produk & Layanan › {kategori}); chip nav 4 kategori (aktif terisi: teal → `bg-teal-700 text-white`, navy → `bg-navy text-white`, lavender → `bg-lavender text-navy`, yellow → `bg-yellow text-navy`; tidak aktif: latar tint + teks navy); grid `ProductCard` (gambar utama kategori ikut sebagai kartu pertama tanpa label produk, atau hilangkan); catatan harga; `CtaBand`.
- [x] `generateStaticParams`, `generateMetadata`, `notFound()` tetap.

## Fase 7: Galeri, Komitmen & Jaminan, Kontak

- [x] **Galeri:** grid `md:grid-cols-4`, item besar `col-span-2 row-span-2`, `figure` = `.card` dengan gambar radius 12px dan `figcaption`. Chip link ke katalog kategori.
- [x] **Komitmen & Jaminan:** kiri: 5 komitmen sebagai daftar dalam `.card`, ikon `CircleCheck` teal; kanan: kartu `bg-navy` dengan judul jaminan, lead, 4 poin berikon (`Package`, `Truck`, `MapPin`, `Clock`), penutup dipisah garis tipis putih/20. Lalu `CtaBand`.
- [x] **Kontak:** `PageHeader` "Hubungi Kami" + lead PDF. Grid 2×2 kartu kontak berikon: Telepon (link besar), WhatsApp, Email (tampilkan "Segera tersedia" dengan warna `muted` selama placeholder; jangan tampilkan teks `[PLACEHOLDER: …]` mentah di kartu ini), Alamat. Paragraf PDF di atas grid. Peta di `.card` berradius dengan `overflow-hidden`, tinggi 360–420px. Tagline penutup.

> Catatan placeholder: di halaman Kontak, ganti tampilan placeholder mentah dengan "Segera tersedia". Di tempat lain (struktur organisasi, tahun berdiri) **biarkan** `[PLACEHOLDER: …]` tetap terlihat, karena itu penanda untuk klien.

## Fase 8: Dokumentasi, QA, push

- [x] Perbarui `DESIGN.md`: tulis ulang dari hasil build (konsep, token, tipografi, komponen, aturan). Hapus konsep "lembar swatch".
- [x] Perbarui `PRODUCT.md` bagian Brand Commitments: palet 4 warna dan font Hanken Grotesk + Poppins adalah ketetapan klien (papan Canva), plus dua situs acuan.
- [x] Perbarui tabel Status di `BRIEF.md`: tambah baris "7 | Penyelarasan desain ke papan Canva | ✅ / 🟡 | catatan".
- [x] QA manual dengan `pnpm build && pnpm start`, cek di 375px, 768px, 1280px, 1440px:
  - Tidak ada scroll horizontal (`document.documentElement.scrollWidth === innerWidth`).
  - Semua gambar termuat (tidak ada `naturalWidth === 0`).
  - Tab dari atas: skip link → logo → menu → dropdown → konten; fokus selalu terlihat.
  - Dropdown dan menu mobile bisa dibuka dan ditutup dengan keyboard.
  - `prefers-reduced-motion`: marquee berhenti.
  - Kontras teks di atas setiap warna lolos AA (lihat tabel di penyelarasan.md §1.2 dan §4.1).
  - Semua 12 URL (`/`, `/tentang-kami`, `/produk-layanan`, 4 detail kategori, `/galeri`, `/komitmen-jaminan`, `/kontak`, `/sitemap.xml`, `/robots.txt`) merespons 200; 3 URL lama tentang-kami merespons 308.
- [x] Grep terakhir: tidak ada `Archivo`, `tone-`, `strip-in`, `#0e1b33`, `#17a8c4`, `#1b4fa8`, `Co-Authored-By`.
- [x] Push branch `design/penyelarasan-canva`. **Jangan merge ke `main`.** Jangan buat PR kecuali diminta.

---

## Definition of done

1. Semua checklist fase 1–8 tercentang.
2. `pnpm check` dan `pnpm build` lolos tanpa error dan tanpa warning baru.
3. Tampilan memakai palet dan font papan Canva, dan terasa satu keluarga dengan dua situs acuan (header dua lapis, kartu putih membulat, marquee, kartu kategori dan produk, pita CTA, FAQ, tombol kontak mengambang, footer navy).
4. Tidak ada teks baru di luar isi PDF, kecuali label UI (Lihat koleksi, Selengkapnya, Hubungi kami untuk harga, Segera tersedia, Breadcrumb, judul FAQ).
5. Laporan akhir berisi: daftar commit, hal yang menyimpang dari rencana beserta alasannya, hasil QA per poin, dan pertanyaan terbuka untuk klien.
