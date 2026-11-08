import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { CtaBand } from "@/components/CtaBand";
import { toneStyles } from "@/content/tones";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHeader } from "@/components/PageHeader";
import { categories, site, ui } from "@/content/site";

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
  return { title: c ? c.name : ui.product };
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
      <PageHeader
        title={c.name}
        lead={c.items}
        tone={c.tone}
        crumbs={[
          { label: ui.home, href: "/" },
          { label: ui.products, href: "/produk-layanan" },
          { label: c.name },
        ]}
      />
      <section className="section">
        <Container>
          <nav
            aria-label={ui.categoryNav}
            className="mb-8 flex flex-wrap gap-2"
          >
            {categories.map((x) => (
              <Link
                key={x.slug}
                href={`/produk-layanan/${x.slug}`}
                aria-current={x.slug === c.slug ? "page" : undefined}
                className={`chip min-h-11 ${x.slug === c.slug ? toneStyles[x.tone].active : `text-navy ${toneStyles[x.tone].tint}`}`}
              >
                {x.name}
              </Link>
            ))}
          </nav>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {c.catalog.map((p) => (
              <ProductCard key={p.src} product={p} category={c} />
            ))}
          </div>
          <a
            href={site.contact.phoneHref}
            className="mt-8 inline-block font-semibold text-teal-700 underline"
          >
            {ui.price}
          </a>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
