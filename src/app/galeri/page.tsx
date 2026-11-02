import type { Metadata } from "next";
import Image from "next/image";
import { Container, PageHeader } from "@/components/PageHeader";
import { categories, galleryNote } from "@/content/site";

export const metadata: Metadata = { title: "Galeri" };

const items = [
  {
    src: "/images/gallery/alat-tulis.webp",
    alt: "Pulpen, spidol, dan buku catatan di atas meja",
    title: "Alat tulis & perlengkapan meja",
    text: "Pulpen, pensil, spidol, stapler, gunting, lem, dan aksesori meja kerja untuk kebutuhan harian.",
    w: 665,
    h: 375,
    big: true,
  },
  {
    src: "/images/gallery/kertas-cetak.webp",
    alt: "Kardus kertas HVS Copy Paper",
    title: "Kertas & cetak",
    text: "HVS A4/F4, continuous form.",
    w: 289,
    h: 175,
  },
  {
    src: "/images/gallery/filing-arsip.webp",
    alt: "Map filing berwarna-warni",
    title: "Filing & arsip",
    text: "Ordner, map, sekat, label.",
    w: 276,
    h: 175,
  },
  {
    src: "/images/gallery/stapler-clips.webp",
    alt: "Stapler, tape dispenser, penggaris, dan gunting",
    title: "Stapler & clips",
    text: "",
    w: 289,
    h: 172,
  },
  {
    src: "/images/gallery/paket-set-kantor.webp",
    alt: "Paket set kantor warna merah muda",
    title: "Paket set kantor",
    text: "",
    w: 276,
    h: 172,
  },
];

export default function GaleriPage() {
  return (
    <>
      <PageHeader
        title="Ragam Barang yang Kami Pasok"
        lead={galleryNote}
        tone="blue"
      />
      <section className="py-12 sm:py-16">
        <Container className="grid gap-4 md:grid-cols-4">
          {items.map((it) => (
            <figure
              key={it.src}
              className={`bg-white ${it.big ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              <Image
                src={it.src}
                alt={it.alt}
                width={it.w}
                height={it.h}
                sizes={
                  it.big
                    ? "(min-width:768px) 50vw, 100vw"
                    : "(min-width:768px) 25vw, 100vw"
                }
                className="h-auto w-full"
              />
              <figcaption className="p-4">
                <span className="label text-xl">{it.title}</span>
                {it.text && (
                  <span className="text-navy-soft mt-1 block text-sm">
                    {it.text}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </Container>
        <Container className="mt-14">
          <h2 className="heading text-3xl">Katalog foto per kategori</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <a
                  href={`/produk-layanan/${c.slug}`}
                  className={`tone-${c.tone} block px-5 py-3 font-bold hover:brightness-95`}
                >
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
