import type { Metadata } from "next";
import Image from "next/image";
import { Container, PageHeader } from "@/components/PageHeader";
import { categories, galleryNote, galleryItems } from "@/content/site";

export const metadata: Metadata = { title: "Galeri" };

export default function GaleriPage() {
  return (
    <>
      <PageHeader
        title="Ragam Barang yang Kami Pasok"
        lead={galleryNote}
        tone="navy"
      />
      <section className="py-12 sm:py-16">
        <Container className="grid gap-4 md:grid-cols-4">
          {galleryItems.map((it) => (
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
                <span className="font-heading text-xl">{it.title}</span>
                {it.text && (
                  <span className="text-muted mt-1 block text-sm">
                    {it.text}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </Container>
        <Container className="mt-14">
          <h2 className="h-section text-3xl">Katalog foto per kategori</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <a
                  href={`/produk-layanan/${c.slug}`}
                  className={`${{ teal: "text-navy bg-teal-50", navy: "bg-navy-50 text-navy", lavender: "bg-lavender-50 text-navy", yellow: "text-navy bg-yellow-50" }[c.tone]} block px-5 py-3 font-bold hover:brightness-95`}
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
