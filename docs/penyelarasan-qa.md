# Laporan penyelarasan desain PUB

Tanggal: 8 November 2026. Branch: `design/penyelarasan-canva`, dari `origin/main` pada `c83afcc`. Branch dipush; tidak ada merge, push main, atau PR.

## Perubahan per halaman

| Halaman               | Hasil                                                                                                                                                |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Global                | Palet Canva, Poppins dan Hanken Grotesk, kartu membulat, header berlapis, menu aktif pill, footer empat kolom, tombol telepon mengambang.            |
| Beranda               | Hero kolase empat foto, marquee, profil singkat, empat keunggulan, empat kategori, delapan produk pilihan, CTA navy, lima FAQ dari konten PDF.       |
| Tentang Kami          | Anchor lama tetap; profil dan identitas, visi navy, empat kartu misi, bagan organisasi membulat. Placeholder tahun dan nama pengurus tetap terlihat. |
| Produk & Layanan      | Empat kategori lebar, semua 22 produk, chip kategori berupa link, kartu keunggulan dan ketersediaan lain.                                            |
| Empat detail kategori | Header tint, breadcrumb, chip aktif, grid 2/3/4 kolom, link permintaan harga, CTA telepon.                                                           |
| Galeri                | Satu foto besar dan empat kecil dengan caption; link ke kategori.                                                                                    |
| Komitmen & Jaminan    | Lima kartu komitmen, panel pengiriman navy dengan empat ikon, CTA.                                                                                   |
| Kontak                | Empat kartu kontak, telepon aktif, WhatsApp/email bertuliskan Segera tersedia, peta membulat, tagline.                                               |

Semua teks lama di site.ts dibandingkan secara rekursif dengan origin/main dan tetap identik. Perubahan nilai lama hanya Tone blue menjadi navy; nama produk, label UI, FAQ, dan teks galeri ditambahkan pada sumber konten yang sama. Tidak ada perubahan PDF, aset WebP, next.config.ts, redirect, sitemap.ts, robots.ts, atau .impeccable/.

## Penyesuaian terhadap rencana

- Perubahan nama Tone serta migrasi kelas pada halaman lama ikut fase 1 agar tidak meninggalkan referensi token yang dihapus. Penyusunan halaman tetap mengikuti urutan fase 4-7.
- Fase 1 diperiksa melalui HTML produksi karena browser masih diunduh. Fase berikutnya memakai Chromium; QA akhir mencakup seluruh halaman pada empat lebar.
- Nama produk dipendekkan dari alt yang sudah ada saat QA; alt asli tetap utuh. Gambar utama kategori tidak ditambahkan lagi ke grid detail, sesuai opsi yang diizinkan fase 6.
- Menu ada di header putih mengikuti rincian fase 3; tidak ditambahkan baris navigasi ketiga. Nama panjang logo disembunyikan pada 1024-1279px agar menu dan CTA tetap muat.
- emailHref nullable ditambahkan seperti whatsappHref supaya email hanya aktif setelah data resmi tersedia. Tidak ada nomor/email buatan.
- Tautan telepon di bar atas merupakan duplikat CTA dan dikeluarkan dari urutan Tab agar skip link langsung diikuti logo. Tautan telepon CTA tetap tersedia melalui keyboard.
- QA menemukan marquee statis sempat terpotong pada reduced motion. CSS diperbaiki untuk membungkus semua teks; batas setiap item diperiksa ulang pada empat lebar.

## Hasil QA fase 8

Pengujian terhadap build produksi melalui pnpm start, Chromium headless dengan screenshot, pemeriksaan DOM, interaksi keyboard, dan axe-core. Pemeriksaan otomatis tidak menggantikan semua pengalaman pengguna pembaca layar.

| Poin                                         | Hasil                         | Bukti / batas                                                                                                                                                     |
| -------------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pnpm check                                   | Lolos                         | ESLint, typecheck, Prettier tanpa error atau warning baru.                                                                                                        |
| pnpm build                                   | Lolos                         | Seluruh rute berhasil dibangun.                                                                                                                                   |
| 375 / 768 / 1280 / 1440px                    | Lolos                         | 10 halaman x 4 lebar = 40 pemeriksaan; scrollWidth sama dengan innerWidth.                                                                                        |
| Gambar termuat dan alt                       | Lolos                         | Tidak ada naturalWidth nol setelah lazy loading dipicu; seluruh gambar memiliki atribut alt.                                                                      |
| Tampilan dan urutan section                  | Lolos                         | Screenshot fase per halaman pada 375/1440px; hero 1440x900 lengkap dan CTA mobile terlihat tanpa scroll pada 375x812.                                             |
| Tab, skip link, fokus                        | Lolos                         | Skip link lalu logo; outline 3px; dropdown dan konten bisa diakses.                                                                                               |
| Dropdown dan menu mobile                     | Lolos                         | Enter membuka, Escape menutup dan mengembalikan fokus, klik luar menutup dropdown, pemilihan item menutup menu, termasuk anchor halaman yang sama.                |
| FAQ keyboard                                 | Lolos                         | Enter pada summary membuka details tanpa JavaScript.                                                                                                              |
| Reduced motion                               | Lolos                         | animation-name none; duplikat display none; track dan semua item asli berada dalam viewport pada empat lebar.                                                     |
| Kontras                                      | Lolos                         | Seluruh pasangan teks terpakai >=4.5:1, tabel di bawah. Teal merek hanya aksen.                                                                                   |
| WCAG otomatis                                | Lolos                         | Nol pelanggaran axe untuk tag WCAG 2 A/AA dan 2.1 AA pada semua 10 halaman di 375 dan 1440px.                                                                     |
| 12 URL                                       | Lolos                         | Sepuluh halaman, /sitemap.xml, dan /robots.txt semuanya 200.                                                                                                      |
| Tiga redirect lama                           | Lolos                         | /tentang-kami/profil, /visi-misi, /struktur-organisasi menghasilkan 308 ke anchor masing-masing.                                                                  |
| Kontak                                       | Lolos                         | Tidak ada link WhatsApp saat null; tombol mengambang menuju tel:+62313522352. Kartu kontak tidak menampilkan placeholder mentah.                                  |
| Peta                                         | Lolos                         | Iframe Google Maps memuat pin Jl. Panggung No. 5, diperiksa dengan screenshot setelah lazy loading.                                                               |
| Konten dan file terlarang                    | Lolos                         | Teks lama identik, FAQ merujuk teks sumber, file terlarang dan rute tidak berubah.                                                                                |
| Grep terakhir                                | Lolos                         | src, DESIGN.md, PRODUCT.md bersih dari font/token lama dan trailer atribusi yang dilarang. Dokumen instruksi lama tetap memuat larangannya.                       |
| Push branch                                  | Lolos                         | Branch tersedia di origin. Main tidak diubah.                                                                                                                     |
| Lighthouse / perangkat fisik / pembaca layar | Tidak bisa dicek dalam QA ini | Tidak dijalankan; tidak ada klaim skor Lighthouse atau sertifikasi aksesibilitas menyeluruh. QA memakai Chromium desktop emulasi viewport, bukan perangkat fisik. |

## Kontras warna

Dihitung dengan luminansi relatif sRGB dan rumus WCAG (L1+0.05)/(L2+0.05). Pasangan terbalik memiliki rasio sama. Warna garis, titik dekoratif, serta foto tidak dipakai sebagai warna teks. Fokus kuning dibantu ring navy pada latar terang.

| Teks             | Latar                |   Rasio | AA normal |
| ---------------- | -------------------- | ------: | --------- |
| navy #2a397a     | white #ffffff        | 10.69:1 | Lolos     |
| navy #2a397a     | surface #f6f7fb      |  9.98:1 | Lolos     |
| navy #2a397a     | navy-50 #eef0f8      |  9.39:1 | Lolos     |
| navy #2a397a     | teal-50 #e6f3f6      |  9.42:1 | Lolos     |
| navy #2a397a     | lavender #b6ace8     |  5.12:1 | Lolos     |
| navy #2a397a     | lavender-50 #f2f0fc  |  9.49:1 | Lolos     |
| navy #2a397a     | yellow #f8e01a       |  7.97:1 | Lolos     |
| navy #2a397a     | yellow-50 #fefbe3    | 10.24:1 | Lolos     |
| navy #2a397a     | yellow-hover #ecd51a |  7.18:1 | Lolos     |
| muted #5b6485    | white #ffffff        |  5.82:1 | Lolos     |
| muted #5b6485    | surface #f6f7fb      |  5.44:1 | Lolos     |
| muted #5b6485    | navy-50 #eef0f8      |  5.12:1 | Lolos     |
| muted #5b6485    | teal-50 #e6f3f6      |  5.13:1 | Lolos     |
| muted #5b6485    | lavender-50 #f2f0fc  |  5.17:1 | Lolos     |
| muted #5b6485    | yellow-50 #fefbe3    |  5.58:1 | Lolos     |
| teal-700 #0a7690 | white #ffffff        |  5.24:1 | Lolos     |
| teal-700 #0a7690 | surface #f6f7fb      |  4.90:1 | Lolos     |
| white #ffffff    | navy #2a397a         | 10.69:1 | Lolos     |
| white #ffffff    | navy-900 #1c2754     | 14.31:1 | Lolos     |
| white #ffffff    | teal-700 #0a7690     |  5.24:1 | Lolos     |
| yellow #f8e01a   | navy #2a397a         |  7.97:1 | Lolos     |

## Pertanyaan terbuka untuk klien

1. Apakah ada hex palet resmi sebagai pengganti hasil sampel Canva?
2. Berapa nomor WhatsApp, email, tahun berdiri, dan nama pengurus yang resmi?
3. Mohon logo asli dan foto toko/gudang/produk beresolusi tinggi; apakah foto bermerek dalam PDF boleh digunakan?
4. Apakah ingin menampilkan principal? Jika ya, perlu nama dan logo resmi serta izin penggunaannya.
5. Mohon konfirmasi cakupan wilayah Jawa Timur versus seluruh Indonesia dan hubungan PUB dengan PT Tera Global Surabaya.
6. Apakah halaman PDF bernomor 05 hilang, dan domain apa yang akan dipakai?

Foto PDF beresolusi rendah tetap menjadi keterbatasan visual; tidak diganti dengan foto atau klaim buatan.

## Commit

Fase 1-7: 98637c7, 7b58a92, 39eaaae, 12fc37f, 93026fb, a56a687, 4be5182. Commit fase 8 berisi laporan ini, dokumentasi desain/produk, checklist, dan perbaikan QA; hash akhir tercantum pada laporan penyerahan dan git log branch.
