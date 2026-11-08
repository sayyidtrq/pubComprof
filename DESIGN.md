# Design system: PUB Company Profile

## Konsep

Company profile pemasok ATK dengan katalog yang mudah dipindai, kartu putih membulat, dan jalur telepon yang selalu dekat. Palet dan font mengikuti papan Canva klien. Acuan Hamasa Iparna Mandiri diterapkan pada header berlapis dan kartu; acuan Bangkit Perkasa Sukses pada kategori bergambar, marquee, CTA, dan FAQ. Keputusan utama: [docs/penyelarasan.md](docs/penyelarasan.md).

## Token

| Token       | Hex     | Peran                                   |
| ----------- | ------- | --------------------------------------- |
| navy / ink  | #2a397a | Judul, teks, header kontak, footer, CTA |
| navy-900    | #1c2754 | Hover tombol dan pita footer            |
| navy-50     | #eef0f8 | Section dan kategori kertas             |
| teal        | #0c89a5 | Aksen dekoratif kategori alat tulis     |
| teal-700    | #0a7690 | Link, tombol, ikon                      |
| teal-50     | #e6f3f6 | Tint kategori alat tulis                |
| lavender    | #b6ace8 | Aksen filing dan chip aktif             |
| lavender-50 | #f2f0fc | Header halaman, menu aktif, tint filing |
| yellow      | #f8e01a | Tombol utama, fokus, aksen meja         |
| yellow-50   | #fefbe3 | Tint kategori meja                      |
| surface     | #f6f7fb | Latar halaman                           |
| card        | #ffffff | Kartu                                   |
| muted       | #5b6485 | Deskripsi dan breadcrumb                |
| line        | #e1e4ef | Border dan pemisah                      |

Hover tombol utama memakai #ecd51a dengan teks navy. Teal merek hanya untuk aksen; teks biasa memakai teal-700. Hasil kontras tercantum dalam laporan QA.

## Tipografi dan bentuk

Poppins 500/600/700 untuk heading, menu, chip, dan tombol; Hanken Grotesk variabel untuk isi. Keduanya di-host sendiri melalui next/font. H1 hero 36-60px, H1 halaman 32-48px, H2 28-36px, H3 18px. Isi maksimal 68ch dan line-height 1.65.

Kartu radius 16px, gambar 12px, tombol 10px, chip pill. Bayangan kartu: 0 1px 2px rgb(42 57 122 / 0.06), 0 10px 30px -16px rgb(42 57 122 / 0.22). Kartu kategori bergerak naik 2px saat hover, transisi 200ms. Kontainer 1280px dengan padding 16/24/32px; section berjarak 64/80/96px.

## Komponen dan halaman

- Header bar kontak navy di desktop, header putih sticky, menu aktif lavender; dropdown dan disclosure mobile memakai state berbasis pathname, Escape mengembalikan fokus.
- Hero statis: teks kiri, kolase empat kategori kanan, maksimal 560px. Tombol utama kuning dan outline teal.
- CategoryCard dengan garis aksen atas 4px; ProductCard memakai object-contain, nama dari alt katalog, dan link harga ke telepon.
- FeatureCard dengan ikon lucide dan tint; Mission menggunakan komponen yang sama dengan nomor.
- PageHeader dengan breadcrumb dan tint kategori; kategori memakai link statis, tanpa filter JavaScript.
- Marquee CSS berulang, berhenti saat hover; mode reduced motion menampilkan semua teks asli statis dan menyembunyikan duplikat.
- FAQ memakai details/summary; CTA navy dengan tombol kuning; tombol kontak mengambang berlabel pada desktop dan ikon pada ponsel.
- Footer empat kolom dengan pita empat warna. Kontak WhatsApp/email hanya menjadi tautan jika href resmi tersedia; kartu kosong menampilkan label dari konten.

## Aksesibilitas dan isi

Fokus kuning dengan ring navy, skip link, aria-current, aria-expanded, alt, landmark dan breadcrumb dipertahankan. Ikon dekoratif aria-hidden. Tidak ada animasi yang menyembunyikan isi, slider, gradient, emoji, atau statistik buatan. Semua teks situs berasal dari src/content/site.ts; teks PDF lama dipertahankan. Nomor WhatsApp dan email tetap placeholder pada data. Font dan gambar mengikuti panduan Next.js lokal; gambar menggunakan sizes dan preload atau eager untuk konten awal.

## Aset

Aset WebP asli hasil ekstraksi PDF tetap dipakai. Sebagian foto galeri sekitar 290px lebar, sehingga tampak lembut saat diperbesar. Tidak ada logo principal tambahan atau gambar baru; file asli beresolusi tinggi perlu diminta ke klien.
