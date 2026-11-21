import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Container } from "@/components/PageHeader";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ProductCard } from "@/components/ProductCard";
import { CtaBand } from "@/components/CtaBand";
import { site, ui } from "@/content/site";
import { toneStyles } from "@/content/tones";
import { getCategories, getProduct } from "@/lib/catalog";

type Params = { kategori: string; produk: string };

// Product data is cached, so waiting for it beats flashing a skeleton.
export const instant = false;

export async function generateStaticParams(): Promise<Params[]> {
  const categories = await getCategories();
  return categories.flatMap((c) =>
    c.catalog.map((p) => ({ kategori: c.slug, produk: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { kategori, produk } = await params;
  const found = await getProduct(kategori, produk);
  if (!found) return { title: ui.product };
  const { category, product } = found;
  return {
    title: `${product.name} · ${category.name}`,
    description: product.description || `${product.name}. ${category.items}`,
    alternates: {
      canonical: `/produk-layanan/${category.slug}/${product.slug}`,
    },
    openGraph: { images: [{ url: product.src, alt: product.alt }] },
  };
}

export default async function ProdukDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { kategori, produk } = await params;
  const found = await getProduct(kategori, produk);
  if (!found) notFound();
  const { category, product } = found;
  const tone = toneStyles[category.tone];
  const related = category.catalog
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);
  const ask = site.contact.whatsapp[0];
  const askHref = `${ask.href}?text=${encodeURIComponent(
    `${ui.productAskText} ${product.name}${product.code ? ` (${product.code})` : ""}.`,
  )}`;

  return (
    <>
      <section className={tone.tint}>
        <Container className="py-6 sm:py-8 lg:py-10">
          <Breadcrumb
            items={[
              { label: ui.home, href: "/" },
              { label: ui.products, href: "/produk-layanan" },
              {
                label: category.name,
                href: `/produk-layanan/${category.slug}`,
              },
              { label: product.name },
            ]}
          />
          <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-14">
            <div className="hero-pop card relative aspect-square overflow-hidden bg-white">
              <Image
                src={product.src}
                alt={product.alt}
                fill
                preload
                sizes="(min-width:1280px) 600px, (min-width:768px) 45vw, 90vw"
                className="object-contain p-6"
              />
            </div>
            <div className="hero-in">
              <p className="text-muted flex items-center gap-2 text-sm">
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 rounded-full ${tone.accent}`}
                />
                {ui.productCategory}:{" "}
                <Link
                  href={`/produk-layanan/${category.slug}`}
                  className="font-semibold underline"
                >
                  {category.name}
                </Link>
              </p>
              <h1 className="h-page mt-3">{product.name}</h1>
              {product.code && (
                <p className="text-muted mt-2 text-sm">
                  {ui.productCode}:{" "}
                  <span className="text-navy font-semibold">
                    {product.code}
                  </span>
                </p>
              )}
              <p className="measure text-muted mt-5 text-lg whitespace-pre-line">
                {product.description || ui.productFallback}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={askHref} className="btn btn-primary">
                  <MessageCircle size={18} aria-hidden="true" />
                  {ui.productAsk}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
      {related.length > 0 && (
        <section className="section">
          <Container>
            <h2 data-reveal className="h-section mb-8">
              {ui.productRelated}
            </h2>
            <div
              data-reveal-group
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4"
            >
              {related.map((p) => (
                <ProductCard
                  key={p.id ?? p.slug}
                  product={p}
                  category={category}
                />
              ))}
            </div>
            <Link
              href={`/produk-layanan/${category.slug}`}
              className="link-arrow mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-teal-700"
            >
              <ArrowLeft size={18} aria-hidden="true" />
              {ui.productBack} {category.name}
            </Link>
          </Container>
        </section>
      )}
      <CtaBand />
    </>
  );
}
