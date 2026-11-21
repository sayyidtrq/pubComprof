import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { CtaBand } from "@/components/CtaBand";
import { toneStyles } from "@/content/tones";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHeader } from "@/components/PageHeader";
import { site, ui } from "@/content/site";
import { getCategories } from "@/lib/catalog";

type Params = { kategori: string };

// Catalog data is cached, so waiting for it beats flashing a skeleton.
export const instant = false;

export async function generateStaticParams(): Promise<Params[]> {
  const categories = await getCategories();
  return categories.map((c) => ({ kategori: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { kategori } = await params;
  const c = (await getCategories()).find((x) => x.slug === kategori);
  return { title: c ? c.name : ui.product };
}

export default async function KategoriPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { kategori } = await params;
  const categories = await getCategories();
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
      <section className="pt-6 pb-16 sm:pt-8 sm:pb-20 lg:pt-10 lg:pb-24">
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
          <div
            data-reveal-group
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4"
          >
            {c.catalog.map((p) => (
              <ProductCard key={p.id ?? p.slug} product={p} category={c} />
            ))}
          </div>
          <a
            href={site.contact.waHref}
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
