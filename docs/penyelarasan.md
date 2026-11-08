# Penyelarasan Desain: Papan Canva Klien vs Situs Saat Ini

> Dokumen keputusan. Apa yang berubah, kenapa, dan apa yang tidak boleh berubah.
> Rencana teknisnya ada di [implementation-plan.md](implementation-plan.md). Prompt eksekusi untuk Codex ada di [codex-prompt.md](codex-prompt.md).
> Dibuat: 2026-11-08.

---

## 1. Sumber acuan

### 1.1 Papan Canva klien: "DESIGN WEB - PUB - Website"

Link: https://www.canva.com/design/DAHaIi-k2f4/l6pVjPiaZLpqU51kCwmVBg/edit

Isinya satu halaman dengan tiga bagian:

| Bagian          | Isi                                           |
| --------------- | --------------------------------------------- |
| Color palette   | 4 warna (lihat 1.2)                           |
| Font            | **Hanken Grotesk** dan **Poppins**            |
| Web inspiration | hamasaiparnamandiri.co.id, bangkitperkasa.com |

### 1.2 Palet dari Canva

Hex diambil dari sampel piksel screenshot papan Canva (rata-rata area 30×30 px di tengah tiap swatch). Bisa meleset ±2 per kanal karena kompresi JPEG. Kalau klien punya hex resmi, hex itu yang dipakai.

| Nama     | Hex sampel | Kesan                                        |
| -------- | ---------- | -------------------------------------------- |
| Teal     | `#0c89a5`  | Teal gelap, jenuh                            |
| Lavender | `#b6ace8`  | Lavender kebiruan                            |
| Kuning   | `#f8e01a`  | Kuning lemon cerah                           |
| Navy     | `#2a397a`  | Biru tua keunguan (indigo), bukan navy hitam |

Cek kontras (WCAG 2.1):

| Pasangan                           | Rasio    | Hasil                                                                                    |
| ---------------------------------- | -------- | ---------------------------------------------------------------------------------------- |
| Putih di atas navy `#2a397a`       | 10,69    | Lolos AA dan AAA                                                                         |
| Navy di atas kuning                | 7,97     | Lolos AA                                                                                 |
| Navy di atas lavender              | 5,12     | Lolos AA                                                                                 |
| Putih di atas teal `#0c89a5`       | **4,09** | **Gagal AA untuk teks biasa.** Hanya boleh untuk teks besar (≥24px, atau ≥18,66px tebal) |
| Teks teal `#0c89a5` di atas putih  | **4,09** | **Gagal AA untuk teks biasa**                                                            |
| Navy di atas teal                  | 2,61     | Gagal                                                                                    |
| Putih di atas teal gelap `#0a7690` | 5,24     | Lolos AA                                                                                 |

**Keputusan:** teal Canva tetap jadi warna merek (latar besar, aksen, ikon, garis). Untuk tombol, link, dan teks teal ukuran biasa, pakai turunannya `#0a7690` (`teal-700`).

### 1.3 Inspirasi 1: PT Hamasa Iparna Mandiri

Situs pengadaan elektronik B2B, berbasis WooCommerce. Pola yang terlihat:

- Header dua lapis. Lapis atas putih: logo, kolom cari, blok "Telp/WhatsApp" dengan nomor, ikon sosial. Lapis bawah berlatar biru sangat muda: menu dengan item aktif berbentuk pill.
- Hero berupa slider banner produk.
- Kartu "Tentang Kami" berlatar putih, sudut membulat, logo + paragraf + tombol "Selengkapnya".
- Kartu produk putih membulat: foto, label kategori, nama, "Hubungi kami untuk harga". Badge "HOT".
- Tombol WhatsApp mengambang di kanan bawah ("Chat WA").
- Font: Poppins. Latar halaman abu sangat muda, konten dalam kartu putih.

### 1.4 Inspirasi 2: PT Bangkit Perkasa Sukses (distributor ATK)

Kategorinya sama persis dengan PUB. Pola yang terlihat:

- Header putih tipis: menu, nomor WhatsApp, tombol "Kontak Kami" berwarna aksen.
- **Pita teks berjalan (marquee)** berisi tagline: "A NATIONAL DISTRIBUTION COMPANY | Trust Your Stationery Need to Us | Presisi. On Time. On Target".
- Strip logo principal ("Our Principals").
- "Sekilas Cerita": judul + 3 paragraf + tombol "Tentang Kami", plus deret angka statistik (tahun, customer, produk, brand).
- **4 kartu kategori produk** bergambar, masing-masing dengan tombol lihat koleksi.
- Grid kartu produk (kategori kecil di atas, nama, "Lihat Produk").
- Pita CTA "Hubungi Kami: Dapatkan Harga Terbaik".
- **FAQ akordeon.**
- Artikel/blog.
- Font: Nunito Sans. Latar putih bersih. Satu warna aksen (merah). Sudut kecil (2–4px). Tombol chat mengambang.

---

## 2. Kondisi situs sekarang (per commit `e4689a8`)

- Stack: Next.js 16.4.4 App Router, React 19.3, Tailwind CSS 4.3, TypeScript strict, pnpm 12. Deploy Vercel dari `main` → https://pub-comprof.vercel.app/
- Konsep visual "lembar swatch": bidang warna penuh per kategori, hero navy gelap, strip kategori bergeser, label huruf kapital rapat (Archivo lebar sempit), tanpa sudut membulat, tanpa bayangan.
- Font: Archivo (judul/label) + Hanken Grotesk (isi).
- Token: `paper #f3f6fb`, `navy #0e1b33`, `blue #1b4fa8`, `teal #17a8c4`, `lavender #c9bff5`, `yellow #f4d31a`.
- Halaman: `/`, `/tentang-kami` (section `#profil`, `#visi-misi`, `#struktur-organisasi`), `/produk-layanan`, `/produk-layanan/[kategori]` (4 slug), `/galeri`, `/komitmen-jaminan`, `/kontak`. Redirect 308 dari 3 URL lama tentang-kami.
- Semua teks ada di `src/content/site.ts`. Komponen: `Nav.tsx` (client, dropdown aksesibel), `Footer.tsx`, `PageHeader.tsx` (+ `Container`).

---

## 3. Gap dan keputusan

Prinsip: **klien sudah menentukan arahnya.** Palet, font, dan dua situs acuan adalah keputusan klien. Kita tidak berdebat soal selera. Hasilnya harus terasa satu keluarga dengan dua situs acuan, tapi lebih rapi dan tetap jujur pada isi PDF.

| Aspek                                                     | Sekarang                                    | Target                                                                                          | Keputusan                                                            |
| --------------------------------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Palet                                                     | 6 warna, navy hampir hitam, ada `blue`      | 4 warna Canva + turunan tint dan teal gelap                                                     | Ganti total. Hapus `blue`. Lihat §4                                  |
| Font judul                                                | Archivo, lebar sempit, kapital              | **Poppins** 600/700, huruf biasa                                                                | Ganti                                                                |
| Font isi                                                  | Hanken Grotesk                              | **Hanken Grotesk**                                                                              | Tetap                                                                |
| Latar                                                     | Putih kebiruan, bidang warna penuh          | Latar abu-kebiruan sangat muda + kartu putih (gaya Hamasa)                                      | Ganti                                                                |
| Bentuk                                                    | Kotak tajam, tanpa bayangan                 | Sudut membulat (kartu 16px, tombol 10px, chip penuh), bayangan lembut                           | Ganti                                                                |
| Header                                                    | 1 baris navy gelap                          | 2 lapis: bar atas navy tipis (telepon + alamat singkat) + header putih (logo, menu, CTA)        | Ganti                                                                |
| Hero beranda                                              | Navy gelap + 4 strip kategori bergeser      | Latar putih/tint, teks kiri, kolase 4 foto membulat kanan                                       | Ganti                                                                |
| Marquee                                                   | Tidak ada                                   | Pita berjalan dengan tagline PUB (gaya BPS)                                                     | Tambah                                                               |
| Tentang singkat di beranda                                | Blok "Satu permintaan…" + daftar keunggulan | Kartu "Tentang Kami" (logo + paragraf + "Selengkapnya")                                         | Ganti                                                                |
| Keunggulan                                                | Daftar bergaris                             | 4 kartu kecil berikon                                                                           | Ganti                                                                |
| Kategori                                                  | 4 bidang warna penuh setinggi layar         | 4 kartu kategori bergambar (gaya BPS), aksen warna tiap kategori tetap                          | Ganti                                                                |
| Produk                                                    | Hanya di halaman kategori, foto saja        | Kartu produk (foto, kategori, nama, "Hubungi kami untuk harga") di beranda dan halaman kategori | Tambah                                                               |
| CTA kontak                                                | Baris teks + tombol                         | Pita CTA penuh berlatar navy                                                                    | Ganti                                                                |
| FAQ                                                       | Tidak ada                                   | Akordeon `<details>` dengan jawaban dari isi PDF                                                | Tambah                                                               |
| Tombol chat mengambang                                    | Tidak ada                                   | Tombol mengambang kanan bawah                                                                   | Tambah (lihat aturan WA di §5)                                       |
| Footer                                                    | Navy gelap, pita 4 warna                    | Navy Canva, 4 kolom, pita 4 warna tetap                                                         | Ubah warna dan susunan                                               |
| Statistik angka (BPS)                                     | —                                           | —                                                                                               | **Tidak dibuat.** PDF tidak punya angka; jangan dikarang             |
| Strip logo principal                                      | —                                           | —                                                                                               | **Tidak dibuat** (tidak ada data). Catat sebagai pertanyaan ke klien |
| Pencarian, keranjang, wishlist, bahasa, ikon sosial, blog | —                                           | —                                                                                               | **Tidak dibuat.** Di luar scope company profile                      |
| Slider otomatis                                           | —                                           | —                                                                                               | **Tidak dibuat.** Hero statis lebih aksesibel dan lebih cepat        |

---

## 4. Sistem desain target

### 4.1 Token warna

| Token Tailwind | Hex       | Pakai untuk                                                  |
| -------------- | --------- | ------------------------------------------------------------ |
| `navy`         | `#2a397a` | Judul, teks utama, bar atas, footer, pita CTA                |
| `navy-900`     | `#1c2754` | Hover tombol navy, teks paling gelap                         |
| `navy-50`      | `#eef0f8` | Latar section selang-seling                                  |
| `teal`         | `#0c89a5` | Aksen merek: ikon, garis, latar besar dengan teks besar      |
| `teal-700`     | `#0a7690` | Tombol sekunder, link, teks teal ukuran biasa                |
| `teal-50`      | `#e6f3f6` | Latar chip/kartu kategori Alat tulis                         |
| `lavender`     | `#b6ace8` | Aksen kategori Filing & arsip, dekorasi                      |
| `lavender-50`  | `#f2f0fc` | Latar bar menu, pill aktif, chip                             |
| `yellow`       | `#f8e01a` | **Tombol utama** (teks navy), highlight, fokus               |
| `yellow-50`    | `#fefbe3` | Latar chip kategori Perlengkapan meja                        |
| `surface`      | `#f6f7fb` | Latar halaman                                                |
| `card`         | `#ffffff` | Kartu                                                        |
| `ink`          | `#2a397a` | Alias teks utama (= navy)                                    |
| `muted`        | `#5b6485` | Teks sekunder. Cek kontras di atas putih dan `surface` ≥ 4,5 |
| `line`         | `#e1e4ef` | Garis dan border kartu                                       |

Warna per kategori (untuk aksen kartu, chip, garis atas kartu, titik label):

| Kategori          | Warna aksen | Tint          |
| ----------------- | ----------- | ------------- |
| Alat tulis        | `teal`      | `teal-50`     |
| Kertas & cetak    | `navy`      | `navy-50`     |
| Filing & arsip    | `lavender`  | `lavender-50` |
| Perlengkapan meja | `yellow`    | `yellow-50`   |

### 4.2 Tipografi

- **Poppins** (via `next/font/google`, bobot 500, 600, 700): semua heading, nama kategori, tombol, menu.
- **Hanken Grotesk** (variabel): teks isi, deskripsi, tabel, form.
- Skala: H1 hero `clamp(2.25rem, 5vw, 3.75rem)` bobot 700, tracking `-0.02em`. H1 halaman `clamp(2rem, 4vw, 3rem)`. H2 section `clamp(1.75rem, 3vw, 2.25rem)` bobot 600. H3 kartu `1.125rem–1.25rem` bobot 600. Isi `1rem–1.125rem`, line-height 1.65.
- Lebar baris isi maksimal 68ch.
- Hapus utilitas `.display`, `.label`, `.heading` gaya lama. Ganti dengan utilitas baru (lihat rencana).

### 4.3 Bentuk, bayangan, jarak

- Radius: kartu `16px`, gambar dalam kartu `12px`, tombol `10px`, chip/pill `9999px`.
- Bayangan kartu: `0 1px 2px rgb(42 57 122 / 0.06), 0 10px 30px -16px rgb(42 57 122 / 0.22)`. Saat hover kartu yang bisa diklik: naik 2px, bayangan sedikit lebih tegas. Tanpa bayangan keras atau tanpa blur.
- Border kartu: `1px solid line`.
- Kontainer: `max-w-7xl`, padding samping 16/24/32px.
- Ritme section: `py-16 sm:py-20 lg:py-24`. Jarak di atas heading lebih besar daripada di bawahnya.

### 4.4 Ikon

`lucide-react` (satu-satunya dependensi baru yang diizinkan). Ukuran 20–24px, stroke 1.75–2. Jangan emoji atau karakter unicode sebagai ikon.

### 4.5 Gerak

- Marquee: animasi CSS `translateX` linear, berhenti saat hover, **berhenti total** saat `prefers-reduced-motion: reduce` (tampil statis, teks tetap terbaca).
- Kartu: transisi `transform` dan `box-shadow` 200ms.
- Tidak ada animasi masuk yang menyembunyikan konten (konten harus terlihat walau animasi tidak jalan).

---

## 5. Aturan isi (tidak berubah)

- Teks **hanya dari PDF**, lewat `src/content/site.ts`. Penyelarasan ini soal tampilan, bukan menambah klaim.
- Data yang tidak ada tetap `[PLACEHOLDER: ...]`: tahun berdiri, WhatsApp, email, nama pengurus.
- **WhatsApp:** tombol mengambang dan semua tombol "WhatsApp" hanya muncul kalau `site.contact.whatsappHref` berisi nomor asli. Selama masih placeholder, tombol mengambang menjadi **"Telepon"** yang mengarah ke `tel:+62313522352`. Jangan pasang nomor WA palsu.
- **FAQ** hanya boleh menjawab dengan fakta yang ada di PDF. Pertanyaan yang jawabannya tidak ada di PDF tidak dibuat.
- Cakupan wilayah: pakai "Surabaya & Jawa Timur" (sesuai halaman 1–3 PDF), kecuali di blok Jaminan Pengiriman yang memang menyebut "seluruh Indonesia" (kutipan PDF halaman 8). Ketidakkonsistenan ini sudah tercatat di BRIEF.md §4.
- Nama produk di kartu diambil dari deskripsi foto yang sudah ada (field `alt` di `site.ts`). Tidak ada harga, stok, atau kode SKU.

---

## 6. Peta halaman target

### Beranda `/`

1. Bar atas navy tipis + header putih + bar menu (global).
2. **Hero**: kiri: chip kecil "Company Profile 2026", H1 "Alat Tulis Kantor, **Satu Pintu.**" (frasa kedua `teal-700`), sub dari PDF, tombol utama kuning "Hubungi Kami" (`tel:`), tombol sekunder outline teal "Lihat Produk", 3 poin bercentang (Katalog lengkap · Harga kompetitif · Antar terjadwal). Kanan: kolase 2×2 empat foto kategori membulat, tiap foto dengan chip nama kategori.
3. **Marquee**: "Alat Tulis Kantor, Satu Pintu · Katalog lengkap · Harga kompetitif · Antar terjadwal · Melayani dengan Lengkap, Cepat, dan Tepat" di atas latar navy, teks putih, pemisah titik kuning.
4. **Kartu Tentang Kami**: logo, judul "Tentang Kami", paragraf pertama profil, tombol "Selengkapnya" → `/tentang-kami`.
5. **Keunggulan**: 4 kartu berikon (Satu pintu, Harga bersaing, Antar terjadwal, Administrasi rapi).
6. **Kategori produk**: judul "Yang Kami Sediakan" + sub PDF, 4 kartu kategori bergambar dengan aksen warna dan tombol "Lihat koleksi".
7. **Produk pilihan**: 8 kartu produk dari katalog (campur kategori) + tombol "Lihat semua produk".
8. **Pita CTA** navy: "Butuh penawaran untuk pembelian partai besar?" (dari teks penutup PDF) + tombol kuning telepon.
9. **FAQ** akordeon (4–6 pertanyaan, jawaban dari PDF).
10. Footer.

### Tentang Kami `/tentang-kami`

Tetap satu halaman dengan tiga section dan anchor yang sama (`#profil`, `#visi-misi`, `#struktur-organisasi`). Header halaman berlatar `lavender-50` + breadcrumb. Profil: teks + kartu identitas putih. Visi: kartu besar navy dengan kutipan. Misi: 4 kartu bernomor dengan ikon. Struktur: bagan dalam kartu putih, kotak jabatan membulat, garis `line`/navy.

### Produk & Layanan `/produk-layanan`

Header halaman. 4 kartu kategori besar (gambar kiri, teks kanan pada desktop). Grid semua produk dengan chip filter kategori yang berupa **link** ke halaman kategori (bukan filter JavaScript). Kartu Keunggulan + "Juga tersedia".

### Detail kategori `/produk-layanan/[kategori]`

Header halaman bertint warna kategori + breadcrumb. Chip navigasi 4 kategori (yang aktif terisi warna). Grid kartu produk 2/3/4 kolom. Catatan "Hubungi kami untuk harga" + pita CTA.

### Galeri `/galeri`

Header halaman. Grid foto membulat (1 besar + 4 kecil) dengan caption di bawah. Chip ke katalog per kategori.

### Komitmen & Jaminan `/komitmen-jaminan`

Header halaman. Kiri: 5 komitmen sebagai daftar kartu berikon centang. Kanan: kartu navy "Jaminan Pengiriman Aman dan Tepat Waktu" dengan 4 poin berikon (paket, truk, lokasi, jam). Pita CTA.

### Kontak `/kontak`

Header halaman "Hubungi Kami" (judul PDF "Talk To Us" boleh jadi chip kecil). Grid kartu kontak: Telepon (aktif), WhatsApp (placeholder, tampil sebagai teks abu "Segera tersedia" + placeholder di site.ts), Email (sama), Alamat. Peta Google dalam kartu membulat. Tagline penutup.

---

## 7. Yang dipertahankan

- Struktur rute, redirect, sitemap, robots, metadata.
- Semua isi `site.ts` (boleh ditambah field, jangan mengubah teks PDF).
- Aksesibilitas: skip link, dropdown keyboard (Escape, klik luar), `aria-current`, `aria-expanded`, fokus terlihat, alt text.
- Gambar WebP yang ada di `public/images`.
- Aturan commit tanpa atribusi AI.

## 8. Risiko dan catatan

- **Foto beresolusi rendah.** Foto galeri dari PDF hanya ±290px lebar. Kartu kecil aman, tapi kolase hero dan kartu kategori besar akan terlihat lembut di layar retina. Batasi lebar render, dan minta foto asli ke klien.
- **Hex hasil sampel.** Kalau klien memberi hex resmi, cukup ganti di `globals.css`; semua komponen pakai token.
- **Arah ini konvensional.** Hasilnya akan mirip situs distributor B2B pada umumnya. Itu memang yang diminta klien lewat dua acuannya. Kualitasnya dikejar dari kerapian: jarak konsisten, kontras lolos, foto rapi, teks tidak bertele-tele.
- `PRODUCT.md` dan `DESIGN.md` harus diperbarui: palet dan font sekarang ketetapan klien (brand commitment).
