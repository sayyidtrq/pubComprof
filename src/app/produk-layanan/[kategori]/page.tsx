import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHeader } from "@/components/PageHeader";
import { categories, site } from "@/content/site";

type Params = { kategori: string };

export function generateStaticParams(): Params[] {
  return categories.map((c) => ({ kategori: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { kategori } = await params;
  const c = categories.find((x) => x.slug === kategori);
  return { title: c ? c.name : "Produk" };
}

export default async function KategoriPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { kategori } = await params;
  const c = categories.find((x) => x.slug === kategori);
  if (!c) notFound();

  return (
    <>
      <PageHeader title={c.name} lead={c.items} tone={c.tone} />
      <section className="py-12 sm:py-16">
        <Container>
          <nav
            aria-label="Kategori produk"
            className="mb-10 flex flex-wrap gap-2"
          >
            {categories.map((x) => (
              <Link
                key={x.slug}
                href={`/produk-layanan/${x.slug}`}
                aria-current={x.slug === c.slug ? "page" : undefined}
                className={`${{ teal: "text-navy bg-teal-50", navy: "bg-navy-50 text-navy", lavender: "bg-lavender-50 text-navy", yellow: "text-navy bg-yellow-50" }[x.tone]} px-4 py-2 text-sm font-bold ${x.slug === c.slug ? "ring-navy ring-offset-surface ring-2 ring-offset-2" : "opacity-70 hover:opacity-100"}`}
              >
                {x.name}
              </Link>
            ))}
          </nav>
          <ul className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>li]:mb-4 [&>li]:break-inside-avoid">
            <li className="relative aspect-[16/10] overflow-hidden bg-white">
              <Image
                src={c.image}
                alt={c.imageAlt}
                fill
                sizes="(min-width:1024px) 25vw, 50vw"
                className="object-cover"
              />
            </li>
            {c.catalog.map((p) => (
              <li key={p.src} className="bg-white">
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={600}
                  height={600}
                  sizes="(min-width:1024px) 25vw, 50vw"
                  className="h-auto w-full"
                />
              </li>
            ))}
          </ul>
          <p className="text-muted mt-10 max-w-2xl">
            Foto produk diambil dari company profile. Untuk ketersediaan,
            spesifikasi, dan penawaran harga, hubungi admin di{" "}
            <a
              href={site.contact.phoneHref}
              className="text-navy font-bold underline"
            >
              {site.contact.phone}
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
