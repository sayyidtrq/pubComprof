import Image from "next/image";
import Link from "next/link";
import { Check, Phone, ArrowRight } from "lucide-react";
import { Container } from "@/components/PageHeader";
import { ButtonLink } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { FeatureCard } from "@/components/FeatureCard";
import { Marquee } from "@/components/Marquee";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import {
  alsoAvailable,
  categories,
  site,
  strengths,
  profile,
  ui,
} from "@/content/site";
export default function Home() {
  return (
    <>
      <section className="bg-white">
        <Container className="grid items-center gap-10 py-10 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:py-20">
          <div>
            <p className="chip bg-lavender-50">{ui.heroChip}</p>
            <h1 className="h-hero mt-5">
              {ui.heroStart} <span className="text-teal-700">{ui.heroEnd}</span>
            </h1>
            <p className="measure text-muted mt-5 text-lg">
              {site.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink
                href={site.contact.phoneHref}
                icon={<Phone size={20} aria-hidden="true" />}
              >
                {ui.contact}
              </ButtonLink>
              <ButtonLink href="/produk-layanan" variant="secondary">
                {ui.viewProducts}
                <ArrowRight size={20} aria-hidden="true" />
              </ButtonLink>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {ui.heroPoints.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <Check
                    className="text-teal-700"
                    size={18}
                    aria-hidden="true"
                  />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-lavender-50 grid max-w-[560px] grid-cols-2 gap-3 rounded-3xl p-3 sm:gap-4 sm:p-5">
            {categories.map((c, i) => (
              <Link
                key={c.slug}
                href={`/produk-layanan/${c.slug}`}
                className="group rounded-card relative aspect-[4/3] overflow-hidden"
              >
                <Image
                  src={c.image}
                  alt={c.imageAlt}
                  fill
                  loading={i < 2 ? "eager" : "lazy"}
                  sizes="(min-width:1024px) 250px, (min-width:640px) 240px, 42vw"
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <span className="font-heading absolute right-2 bottom-2 left-2 rounded-xl bg-white px-2 py-2 text-xs font-semibold sm:text-sm">
                  {c.name}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <Marquee />
      <section className="section">
        <Container>
          <div className="card grid gap-8 p-6 sm:p-10 md:grid-cols-[.6fr_1.4fr]">
            <div className="bg-lavender-50 flex items-center justify-center rounded-xl p-8">
              <Image
                src="/images/brand/logo.webp"
                alt={site.name}
                width={502}
                height={413}
                sizes="(min-width:768px) 240px, 65vw"
                className="h-auto w-full max-w-60"
              />
            </div>
            <div className="self-center">
              <SectionHeading title={ui.about} />
              <p className="measure text-muted text-lg">
                {profile.paragraphs[0]}
              </p>
              <ButtonLink
                href="/tentang-kami"
                variant="secondary"
                className="mt-6"
              >
                {ui.more}
                <ArrowRight size={20} aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
          <div className="mt-16">
            <SectionHeading title={ui.strengths} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {strengths.map((f) => (
                <FeatureCard key={f.title} feature={f} />
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="section bg-navy-50">
        <Container>
          <SectionHeading title={ui.supplied} sub={ui.suppliedLead} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
          </div>
          <p className="text-muted mt-7">
            <strong className="text-navy">{ui.also}: </strong>
            {alsoAvailable}
          </p>
        </Container>
      </section>
      <section className="section">
        <Container>
          <SectionHeading title={ui.featured} />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {categories.flatMap((c) =>
              c.catalog
                .slice(0, 2)
                .map((p) => (
                  <ProductCard key={p.src} product={p} category={c} />
                )),
            )}
          </div>
          <div className="mt-8 text-center">
            <ButtonLink href="/produk-layanan" variant="secondary">
              {ui.viewAll}
              <ArrowRight size={20} aria-hidden="true" />
            </ButtonLink>
          </div>
        </Container>
      </section>
      <CtaBand />
      <Faq />
    </>
  );
}
