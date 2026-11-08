import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { FeatureCard } from "@/components/FeatureCard";
import { alsoAvailable, categories, strengths, ui } from "@/content/site";
import { toneStyles } from "@/content/tones";
export const metadata: Metadata = { title: ui.products };
export default function ProdukPage() {
  return (
    <>
      <PageHeader
        title={ui.supplied}
        lead={ui.suppliedLead}
        tone="teal"
        crumbs={[{ label: ui.home, href: "/" }, { label: ui.products }]}
      />
      <section className="section">
        <Container className="space-y-6">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} wide />
          ))}
        </Container>
      </section>
      <section className="section bg-navy-50">
        <Container>
          <SectionHeading title={ui.allProducts} />
          <nav
            className="mb-8 flex flex-wrap gap-2"
            aria-label={ui.categoryNav}
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
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {categories.flatMap((c) =>
              c.catalog.map((p) => (
                <ProductCard key={p.src} product={p} category={c} />
              )),
            )}
          </div>
        </Container>
      </section>
      <section className="section">
        <Container>
          <SectionHeading title={ui.strengths} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.map((f) => (
              <FeatureCard key={f.title} feature={f} />
            ))}
          </div>
          <div className="card mt-8 p-6">
            <h2 className="h-card">{ui.also}</h2>
            <p className="text-muted mt-2">{alsoAvailable}</p>
          </div>
        </Container>
      </section>
    </>
  );
}
