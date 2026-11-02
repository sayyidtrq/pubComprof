// Single source of truth for site copy. Content comes from COMPRO_PT PUB_2026.pdf.
// Unknown data is marked [PLACEHOLDER: ...] — see BRIEF.md section 4.

export const site = {
  name: "PT Pangudi Utama Berjaya",
  shortName: "PUB",
  tagline: "Alat Tulis Kantor, Satu Pintu.",
  description:
    "Perdagangan alat tulis kantor dan perlengkapan administrasi untuk korporasi, institusi pendidikan, dan instansi pemerintah.",
  contact: {
    phone: "(031) 352 2352",
    phoneHref: "tel:+62313522352",
    whatsapp: "[PLACEHOLDER: nomor WhatsApp]",
    email: "[PLACEHOLDER: email]",
    address:
      "Jl. Panggung No. 5, RT 01 / RW 011, Nyamplungan, Pabean Cantian, Surabaya, Jawa Timur 60162",
  },
} as const;
