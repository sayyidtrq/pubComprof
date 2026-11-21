import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, PageHeader } from "@/components/PageHeader";
import { galleryNote, ui } from "@/content/site";
import { getCategories, getGallery } from "@/lib/catalog";
import { toneStyles } from "@/content/tones";
export const metadata: Metadata = { title: ui.gallery };
export default async function GaleriPage() {
  const [categories, galleryItems] = await Promise.all([
    getCategories(),
    getGallery(),
  ]);
  return (
    <>
      <PageHeader
        title={ui.galleryTitle}
        lead={galleryNote}
        crumbs={[{ label: ui.home, href: "/" }, { label: ui.gallery }]}
      />
      <section className="pt-6 pb-16 sm:pt-8 sm:pb-20 lg:pt-10 lg:pb-24">
        <Container data-reveal-group className="grid gap-5 md:grid-cols-4">
          {galleryItems.map((it) => (
            <figure
              key={it.id ?? it.src}
              data-reveal
              className={`card card-hover flex flex-col p-3 ${it.big ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              <div
                className={`img-zoom relative overflow-hidden rounded-xl ${it.big ? "aspect-[16/10] md:aspect-auto md:flex-1" : "aspect-video md:max-h-[clamp(8rem,18svh,11rem)]"}`}
              >
                <Image
                  src={it.src}
                  alt={it.alt}
                  fill
                  sizes={
                    it.big
                      ? "(min-width:768px) 45vw, 90vw"
                      : "(min-width:768px) 23vw, 90vw"
                  }
                  className="object-cover"
                />
              </div>
              <figcaption className="px-2 py-4">
                <h2 className="h-card">{it.title}</h2>
                {it.text && (
                  <p className="text-muted mt-2 text-sm">{it.text}</p>
                )}
              </figcaption>
            </figure>
          ))}
        </Container>
        <Container className="mt-12">
          <h2 className="h-section">{ui.galleryCatalog}</h2>
          <nav
            aria-label={ui.categoryNav}
            className="mt-6 flex flex-wrap gap-2"
          >
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/produk-layanan/${c.slug}`}
                className={`chip text-navy min-h-11 ${toneStyles[c.tone].tint}`}
              >
                {c.name}
              </Link>
            ))}
          </nav>
        </Container>
      </section>
    </>
  );
}
