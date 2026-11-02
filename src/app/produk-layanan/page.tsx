import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, PageHeader } from "@/components/PageHeader";
import { alsoAvailable, categories, strengths } from "@/content/site";

export const metadata: Metadata = { title: "Produk & Layanan" };

export default function ProdukPage() {
  return (
    <>
      <PageHeader
        title="Yang Kami Sediakan"
        lead="Kelompok barang yang menutup hampir seluruh belanja ATK bulanan sebuah kantor."
        tone="yellow"
      />
      {categories.map((c) => (
        <section
          key={c.slug}
          className={`tone-${c.tone}`}
          aria-labelledby={`k-${c.slug}`}
        >
          <Container className="grid items-center gap-8 py-12 sm:py-14 md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative aspect-[16/10] overflow-hidden md:order-2">
              <Image
                src={c.image}
                alt={c.imageAlt}
                fill
                sizes="(min-width:768px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 id={`k-${c.slug}`} className="display text-5xl sm:text-6xl">
                {c.name}
              </h2>
              <p className="mt-4 text-lg">{c.items}</p>
              <Link
                href={`/produk-layanan/${c.slug}`}
                className="bg-navy hover:bg-navy-soft mt-6 inline-block px-5 py-3 font-bold text-white"
              >
                Lihat katalog foto
              </Link>
            </div>
          </Container>
        </section>
      ))}

      <section className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="heading text-4xl">Keunggulan</h2>
            <p className="text-navy-soft mt-4 text-lg">
              Juga tersedia: {alsoAvailable.toLowerCase()}
            </p>
          </div>
          <dl className="divide-rule border-rule divide-y border-y">
            {strengths.map((s) => (
              <div
                key={s.title}
                className="grid gap-1 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6"
              >
                <dt className="label text-2xl">{s.title}</dt>
                <dd className="text-navy-soft">{s.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
    </>
  );
}
