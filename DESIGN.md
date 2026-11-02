# Design system: PUB Company Profile

Dokumen ini ditulis dari hasil build, bukan sebelum build. Token ada di `src/app/globals.css`.

## Konsep

Lembar swatch: katalog ATK sebagai satu indeks berkode warna. Tiap kategori produk memegang satu warna dari logo, dan warna itu dipakai konsisten sebagai navigasi, latar section, dan bingkai foto. Latar halaman putih kebiruan, tinta navy, bidang warna penuh per kategori.

## Warna

| Token       | Nilai     | Peran                                           |
| ----------- | --------- | ----------------------------------------------- |
| `paper`     | `#f3f6fb` | Latar halaman, putih dingin kebiruan            |
| `navy`      | `#0e1b33` | Teks, navbar, hero, footer                      |
| `navy-soft` | `#2c3a55` | Teks sekunder                                   |
| `teal`      | `#17a8c4` | Kategori Alat tulis                             |
| `blue`      | `#1b4fa8` | Kategori Kertas & cetak (teks putih)            |
| `lavender`  | `#c9bff5` | Kategori Filing & arsip                         |
| `yellow`    | `#f4d31a` | Kategori Perlengkapan meja, tombol utama, fokus |
| `rule`      | `#cfd8e6` | Garis pemisah                                   |

Teks di atas teal, lavender, dan yellow memakai navy. Teks di atas blue memakai putih. Kombinasi ini sudah dicek memenuhi kontras AA.

## Tipografi

- Tampilan dan label: Archivo (variabel, sumbu lebar). `.display` lebar 75%, bobot 800, untuk judul halaman. `.label` lebar 62%, huruf kapital, untuk nama kategori dan label. `.heading` lebar 90%, bobot 700, untuk judul section.
- Isi: Hanken Grotesk. Lebar baris maksimum 66ch (`.measure`).
- Ukuran judul halaman: `clamp(2.75rem, 8vw, 6rem)`. Beranda sampai 7.5rem.

## Komponen

- `.tone-teal/blue/lavender/yellow`: bidang warna kategori (latar + warna teks).
- Strip kategori di hero: tautan lebar penuh dengan foto rata di ujung kanan, bergeser selang-seling di desktop, masuk dengan transform (tanpa opacity, konten selalu terlihat).
- Pita warna empat segmen di atas footer.
- Navbar navy sticky, dropdown "Tentang Kami" aksesibel (tombol dengan `aria-expanded`, Escape menutup, klik di luar menutup), menu ponsel berupa disclosure.
- Tombol utama kuning dengan teks navy. Tombol sekunder garis putih di atas navy.
- Fokus keyboard: outline kuning 3px dengan lingkar navy, terlihat di latar terang dan gelap.

## Aturan

- Tidak ada kartu ikon sama besar, tidak ada kicker di atas judul, tidak ada gradient, tidak ada glassmorphism, tidak ada bayangan keras.
- Warna kategori tidak boleh dipakai untuk makna lain.
- Gerak: satu momen masuk di hero. Menghormati `prefers-reduced-motion`.
- Teks hanya dari PDF. Data yang belum ada ditandai `[PLACEHOLDER: ...]` di `src/content/site.ts`.

## Aset

Semua foto dipotong dari `COMPRO_PT PUB_2026.pdf` dan dikonversi ke WebP di `public/images`. Foto galeri (dari halaman 5 PDF) beresolusi rendah, sekitar 290px lebar, jadi tampak lembut di layar besar. Ganti dengan foto asli dari klien bila tersedia. Tidak ada aset hasil generate gambar.
