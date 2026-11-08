# Prompt untuk Codex

Salin seluruh blok di bawah ke Codex, dengan root repo `pubComprof` sebagai working directory.

---

```text
Kamu mengerjakan penyelarasan desain website company profile PT Pangudi Utama Berjaya (PUB),
pemasok alat tulis kantor di Surabaya. Repo: https://github.com/sayyidtrq/pubComprof
Situs live: https://pub-comprof.vercel.app/ (deploy otomatis dari main).

## Konteks
Situs sudah jadi (Next.js 16 App Router, React 19, Tailwind CSS v4, TypeScript strict, pnpm).
Klien memberi papan desain Canva berisi palet 4 warna, 2 font, dan 2 situs acuan.
Tugasmu menyelaraskan tampilan situs dengan papan itu tanpa mengubah isi.

## Baca dulu, berurutan, sebelum menulis kode
1. AGENTS.md: Next.js 16 punya breaking changes. Baca panduan di node_modules/next/dist/docs/
   untuk API yang kamu sentuh (next/font, next/image, metadata, routing).
2. docs/penyelarasan.md: SUMBER KEBENARAN untuk warna (hex), font, bentuk, aturan isi,
   dan peta tiap halaman. Kalau ada konflik, dokumen ini yang menang.
3. docs/implementation-plan.md: fase 1–8 dengan checklist dan kriteria selesai. Kerjakan berurutan.
4. src/content/site.ts, src/components/*, src/app/**: kode yang ada sekarang.
5. BRIEF.md bagian 4 (data yang belum ada), PRODUCT.md, DESIGN.md.

Kamu tidak perlu membuka Canva atau situs acuan. Semua nilai yang dibutuhkan sudah ada di docs/.

## Aturan keras (melanggar satu saja = gagal)
- Buat branch `design/penyelarasan-canva` dari main terbaru. Commit per fase dengan
  Conventional Commits (bahasa Inggris). Push branch itu. JANGAN merge atau push ke main.
- DILARANG menambahkan "Co-Authored-By", "Generated with ...", atau atribusi AI apa pun
  di pesan commit, PR, kode, atau komentar.
- Teks situs hanya dari src/content/site.ts. Jangan ubah teks PDF yang sudah ada.
  Jangan mengarang klaim, angka statistik, testimoni, logo klien/principal, harga, stok,
  tahun berdiri, nomor WhatsApp, atau email. Data yang tidak ada tetap [PLACEHOLDER: ...]
  (kecuali di kartu kontak, yang menampilkan "Segera tersedia" sesuai rencana).
- FAQ hanya boleh menjawab dengan fakta yang tersurat di isi PDF yang ada di site.ts.
- Satu-satunya dependensi baru yang boleh ditambah: lucide-react. Tidak boleh UI kit,
  library animasi, carousel, atau accordion. Akordeon pakai <details>/<summary>.
- Tidak ada slider otomatis, gradient text, glassmorphism, bayangan keras (tanpa blur),
  border kiri tebal berwarna, emoji sebagai ikon, atau label kecil (eyebrow/kicker)
  di atas judul section.
- Tombol WhatsApp hanya muncul kalau site.contact.whatsappHref berisi nomor. Selama null,
  tombol mengambang jadi "Telepon kami" ke tel:+62313522352.
- Teal Canva #0c89a5 gagal kontras AA untuk teks biasa. Untuk tombol, link, dan teks teal
  ukuran biasa pakai teal-700 #0a7690. Setiap pasangan teks/latar baru wajib lolos WCAG AA.
- Jangan ubah rute, redirect di next.config.ts, sitemap.ts, robots.ts, file PDF, atau .impeccable/.
- Pertahankan aksesibilitas yang sudah ada: skip link, dropdown dengan aria-expanded
  (tertutup lewat Escape, klik luar, dan saat item dipilih), aria-current, fokus terlihat, alt text.
  Logika state menu berbasis pathname di Nav.tsx sudah lolos lint react-hooks/set-state-in-effect.
  Jangan kembalikan ke setState di dalam useEffect.
- Tailwind v4: kelas yang dipilih secara dinamis harus ditulis literal utuh di kode
  (contoh peta { teal: "bg-teal-50" }), bukan dirangkai dari string seperti `bg-${tone}-50`.

## Cara kerja per fase (mini loop)
1. Implementasikan checklist fase.
2. Jalankan `pnpm check` lalu `pnpm build`. Perbaiki sampai lolos tanpa error dan warning baru.
3. Untuk fase yang mengubah tampilan: jalankan `pnpm start`, buka halaman yang tersentuh
   di lebar 375px dan 1440px, lalu cek: tidak ada scroll horizontal, tidak ada gambar rusak,
   teks tidak terpotong, dan urutan section sesuai docs/penyelarasan.md §6.
   Kalau tidak bisa membuka browser, cek lewat HTML hasil render dan jelaskan keterbatasannya di laporan.
4. Commit fase itu. Lanjut ke fase berikutnya.

## Selesai bila
Semua kriteria "Definition of done" di docs/implementation-plan.md terpenuhi,
dan branch design/penyelarasan-canva sudah di-push.

## Laporan akhir (tulis dalam bahasa Indonesia)
1. Daftar commit (hash + pesan).
2. Ringkasan perubahan per halaman.
3. Hal yang menyimpang dari rencana, beserta alasannya.
4. Hasil QA per poin di Fase 8: lolos / gagal / tidak bisa dicek, dan alasannya.
5. Pasangan warna baru yang kamu pakai, beserta rasio kontrasnya.
6. Pertanyaan terbuka untuk klien (hex resmi, nomor WA, email, foto asli resolusi tinggi,
   logo principal bila ingin ditampilkan, dll.).

Kalau ada keputusan yang tidak tercakup di docs/, pilih opsi yang paling sederhana dan paling
dekat dengan dua situs acuan seperti dideskripsikan di docs/penyelarasan.md §1.3–1.4,
catat di laporan, lalu lanjutkan. Jangan berhenti untuk bertanya kecuali sebuah aturan keras
tidak mungkin dipenuhi.
```
