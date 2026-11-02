// Single source of truth for site copy. Content comes from COMPRO_PT PUB_2026.pdf.
// Unknown data is marked [PLACEHOLDER: ...]. See BRIEF.md section 4.

export const site = {
  name: "PT Pangudi Utama Berjaya",
  shortName: "PUB",
  tagline: "Alat Tulis Kantor, Satu Pintu.",
  closing: "Melayani dengan Lengkap, Cepat, dan Tepat",
  description:
    "Perdagangan alat tulis kantor dan perlengkapan administrasi untuk korporasi, institusi pendidikan, dan instansi pemerintah.",
  since: "[PLACEHOLDER: tahun berdiri]",
  area: "Surabaya & Jawa Timur",
  contact: {
    phone: "(031) 352 2352",
    phoneHref: "tel:+62313522352",
    whatsapp: "[PLACEHOLDER: nomor WhatsApp]",
    email: "[PLACEHOLDER: email]",
    address:
      "Jl. Panggung No. 5, RT 01 / RW 011, Nyamplungan, Pabean Cantian, Surabaya, Jawa Timur 60162",
    mapsEmbed:
      "https://www.google.com/maps?q=Jl.+Panggung+No.+5+Nyamplungan+Pabean+Cantian+Surabaya&output=embed",
  },
} as const;

export const nav = [
  { label: "Beranda", href: "/" },
  {
    label: "Tentang Kami",
    href: "/tentang-kami/profil",
    children: [
      { label: "Profil Perusahaan", href: "/tentang-kami/profil" },
      { label: "Visi & Misi", href: "/tentang-kami/visi-misi" },
      {
        label: "Struktur Organisasi",
        href: "/tentang-kami/struktur-organisasi",
      },
    ],
  },
  { label: "Produk & Layanan", href: "/produk-layanan" },
  { label: "Galeri", href: "/galeri" },
  { label: "Komitmen & Jaminan", href: "/komitmen-jaminan" },
  { label: "Kontak", href: "/kontak" },
] as const;

export type Tone = "teal" | "blue" | "lavender" | "yellow";

export type Category = {
  slug: string;
  code: string;
  name: string;
  tone: Tone;
  items: string;
  image: string;
  imageAlt: string;
  catalog: { src: string; alt: string }[];
};

export const categories: Category[] = [
  {
    slug: "alat-tulis",
    code: "A",
    name: "Alat tulis",
    tone: "teal",
    items: "Pulpen, pensil, spidol, highlighter, penghapus, refill.",
    image: "/images/gallery/alat-tulis.webp",
    imageAlt: "Pulpen, spidol, dan buku catatan di atas meja",
    catalog: [
      {
        src: "/images/catalog/gel-retractable.webp",
        alt: "Pulpen gel tekan merah dan biru",
      },
      {
        src: "/images/catalog/gel-classic.webp",
        alt: "Pulpen gel hitam Classic dalam kotak",
      },
      { src: "/images/catalog/gel-refill.webp", alt: "Isi ulang pulpen gel" },
      { src: "/images/catalog/gel-navy.webp", alt: "Pulpen gel biru tua" },
      {
        src: "/images/catalog/marker-permanen.webp",
        alt: "Spidol permanen hitam, satu kotak",
      },
      {
        src: "/images/catalog/spidol-whiteboard.webp",
        alt: "Spidol papan tulis",
      },
      {
        src: "/images/catalog/marker-tiga-warna.webp",
        alt: "Spidol tiga warna",
      },
      {
        src: "/images/catalog/marker-set-warna.webp",
        alt: "Satu set spidol warna",
      },
      {
        src: "/images/catalog/marker-warna-cerah.webp",
        alt: "Spidol warna cerah",
      },
      {
        src: "/images/catalog/metallic-brush-pen.webp",
        alt: "Metallic brush pen emas, perak, putih",
      },
      { src: "/images/catalog/pen-metalik.webp", alt: "Pulpen metalik" },
      {
        src: "/images/catalog/penghapus-ujian.webp",
        alt: "Penghapus 2B untuk ujian",
      },
      { src: "/images/catalog/correction-tape.webp", alt: "Correction tape" },
    ],
  },
  {
    slug: "kertas-cetak",
    code: "K",
    name: "Kertas & cetak",
    tone: "blue",
    items: "HVS A4/F4, continuous form, kertas thermal, nota.",
    image: "/images/gallery/kertas-cetak.webp",
    imageAlt: "Tumpukan kardus kertas HVS Copy Paper",
    catalog: [
      {
        src: "/images/catalog/notebook.webp",
        alt: "Notebook sampul keras ukuran A4, A5, B5",
      },
      {
        src: "/images/catalog/notebook-spiral.webp",
        alt: "Notebook A5 spiral atas",
      },
      { src: "/images/catalog/buku-tulis.webp", alt: "Buku tulis bergambar" },
      {
        src: "/images/catalog/legal-pad.webp",
        alt: "Legal pad ukuran A4, A5, B5",
      },
    ],
  },
  {
    slug: "filing-arsip",
    code: "F",
    name: "Filing & arsip",
    tone: "lavender",
    items: "Ordner, binder, map, sekat, label, box arsip.",
    image: "/images/gallery/filing-arsip.webp",
    imageAlt: "Map filing berwarna-warni",
    catalog: [
      { src: "/images/catalog/map-folder.webp", alt: "Map folder warna-warni" },
      {
        src: "/images/catalog/folder-warna.webp",
        alt: "Folder dengan kertas catatan",
      },
      { src: "/images/catalog/pouch.webp", alt: "Pouch dokumen" },
    ],
  },
  {
    slug: "perlengkapan-meja",
    code: "P",
    name: "Perlengkapan meja",
    tone: "yellow",
    items: "Stapler, paper clip, gunting, lem, tape dispenser.",
    image: "/images/gallery/stapler-clips.webp",
    imageAlt: "Stapler, tape dispenser, penggaris, dan gunting",
    catalog: [
      {
        src: "/images/gallery/paket-set-kantor.webp",
        alt: "Paket set perlengkapan kantor warna merah muda",
      },
      { src: "/images/catalog/pencil-case.webp", alt: "Pencil case" },
    ],
  },
];

export const alsoAvailable =
  "Tinta & toner printer, baterai, tisu, papan tulis, dan aksesori presentasi.";

export const strengths = [
  {
    title: "Satu pintu",
    text: "Ratusan SKU dari banyak merek dalam satu pesanan.",
  },
  {
    title: "Harga bersaing",
    text: "Pembelian langsung dari distributor dan principal.",
  },
  {
    title: "Antar terjadwal",
    text: "Pengiriman rutin sesuai jadwal belanja bulanan.",
  },
  {
    title: "Administrasi rapi",
    text: "Penawaran, faktur, dan rekap pembelian siap audit.",
  },
] as const;

export const profile = {
  lead: "Mitra pengadaan alat tulis kantor yang menyatukan katalog lengkap, harga wajar, dan pengiriman tepat waktu.",
  paragraphs: [
    "PT Pangudi Utama Berjaya adalah perusahaan perdagangan yang menyediakan alat tulis kantor (ATK), perlengkapan administrasi, dan kebutuhan operasional perkantoran bagi perusahaan, institusi pendidikan, serta instansi pemerintah di Surabaya dan sekitarnya.",
    "Kami memposisikan diri sebagai mitra pengadaan satu pintu: pelanggan tidak perlu lagi berbelanja ke banyak toko atau mengumpulkan penawaran dari belasan pemasok. Satu permintaan, satu faktur, satu jadwal pengiriman, untuk seluruh kebutuhan ATK bulanan.",
    "Dengan hubungan langsung ke distributor dan principal, kami menjaga ketersediaan stok sekaligus menekan harga. Setiap pesanan ditangani oleh tim yang memahami spesifikasi barang, sehingga risiko salah item atau keterlambatan dapat ditekan sekecil mungkin.",
  ],
  identity: [
    ["Nama", "PT Pangudi Utama Berjaya"],
    ["Bidang", "Perdagangan besar & eceran ATK"],
    ["Badan hukum", "Perseroan Terbatas (PT)"],
    [
      "Alamat",
      "Jl. Panggung No. 5, RT 01 / RW 011, Nyamplungan, Pabean Cantian, Surabaya, Jawa Timur",
    ],
    ["Telepon", "(031) 352 2352"],
  ],
} as const;

export const vision = {
  text: "Menjadi mitra pengadaan alat tulis kantor paling diandalkan di Jawa Timur: pilihan pertama bagi perusahaan dan instansi yang menuntut ketersediaan barang, ketepatan waktu, dan harga yang wajar.",
  quote:
    "Kami diukur bukan dari banyaknya barang yang dijual, tetapi dari seberapa jarang pelanggan kehabisan stok.",
};

export const missions = [
  {
    title: "Katalog lengkap, stok terjaga",
    text: "Menyediakan rangkaian ATK yang lengkap dan mutakhir, dengan ketersediaan stok yang konsisten untuk kebutuhan rutin pelanggan.",
  },
  {
    title: "Harga yang masuk anggaran",
    text: "Menjaga harga tetap kompetitif melalui pembelian langsung ke distributor dan pengelolaan rantai pasok yang efisien.",
  },
  {
    title: "Pengadaan yang transparan",
    text: "Memberikan layanan cepat dan akurat dari penawaran, pengiriman, hingga penagihan, tanpa biaya yang tidak disepakati.",
  },
  {
    title: "Hubungan jangka panjang",
    text: "Merespons cepat, menyelesaikan masalah sampai tuntas, dan tumbuh bersama pelanggan serta mitra pemasok.",
  },
] as const;

export const orgChart = {
  top: "Komisaris",
  second: "Direktur Utama",
  third: ["Finance", "Operasional", "GM"],
};

export const commitments = [
  "Melayani pelanggan B2B (kantor, institusi, perusahaan, distributor, retail) dengan pendekatan profesional.",
  "Menyediakan produk berkualitas, lengkap, dan terjamin keasliannya.",
  "Harga yang kompetitif dan transparan untuk pembelian grosir atau partai besar.",
  "Layanan konsultasi dan rekomendasi produk sesuai kebutuhan bisnis Anda.",
  "Tim sales dan customer service yang responsif dan berpengalaman.",
];

export const delivery = {
  title: "Jaminan Pengiriman Aman dan Tepat Waktu",
  lead: "Kami memahami pentingnya kecepatan dan keamanan dalam distribusi. Karena itu:",
  points: [
    "Semua pengiriman dikemas dengan standar keamanan tinggi.",
    "Didukung armada dan jasa logistik terpercaya yang mampu menjangkau seluruh Indonesia.",
    "Tracking pengiriman yang jelas dan update.",
    "Pilihan pengiriman reguler maupun ekspres sesuai kebutuhan pelanggan.",
  ],
  closing:
    "Dengan layanan pengiriman yang terencana dan sistematis, kami memastikan semua produk sampai di lokasi tujuan dalam kondisi baik dan tepat waktu.",
};

export const contactCopy = {
  lead: "PT Pangudi Utama Berjaya siap menjadi mitra terpercaya untuk pengadaan alat tulis kantor bagi perusahaan Anda.",
  body: "Kami percaya bahwa dengan produk yang lengkap, layanan yang profesional, serta komitmen pada kualitas, kami dapat mendukung kelancaran operasional dan produktivitas bisnis Anda. Jangan ragu untuk menghubungi tim kami untuk informasi lebih lanjut, konsultasi kebutuhan, atau penawaran harga khusus untuk pembelian partai besar.",
};

export const galleryNote =
  "Dari alat tulis harian sampai perlengkapan arsip dan kertas cetak, tersedia untuk pengiriman rutin.";
