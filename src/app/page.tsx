import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/PageHeader";
import { alsoAvailable, categories, site, strengths } from "@/content/site";

export default function Home() {
  return (
    <>
      <section className="bg-navy text-white">
        <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:py-24">
          <div>
            <p className="font-heading text-lg text-white/70">
              Company Profile 2026
            </p>
            <h1 className="h-page mt-3 text-[clamp(3.5rem,10vw,7.5rem)]">
              Alat Tulis Kantor,{" "}
              <span className="text-yellow">Satu Pintu.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl">
              {site.description}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={site.contact.phoneHref}
                className="bg-yellow text-navy px-6 py-3.5 text-base font-bold hover:brightness-95"
              >
                Telepon {site.contact.phone}
              </a>
              <Link
                href="/produk-layanan"
                className="hover:text-navy border-2 border-white/60 px-6 py-3.5 text-base font-bold hover:bg-white"
              >
                Lihat produk
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/70">
              Katalog lengkap · Harga kompetitif · Antar terjadwal
              <br />
              Melayani {site.area}
            </p>
          </div>

          <ul className="flex flex-col gap-3 lg:pl-6">
            {categories.map((c, i) => (
              <li
                key={c.slug}
                style={{ ["--i" as string]: i }}
                className={`${i % 2 ? "lg:ml-10" : "lg:mr-10"}`}
              >
                <Link
                  href={`/produk-layanan/${c.slug}`}
                  className={`${{ teal: "text-navy bg-teal-50", navy: "bg-navy-50 text-navy", lavender: "bg-lavender-50 text-navy", yellow: "text-navy bg-yellow-50" }[c.tone]} group flex items-stretch justify-between overflow-hidden transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-x-2`}
                >
                  <span className="flex flex-col justify-center px-5 py-4">
                    <span className="font-heading text-3xl leading-none sm:text-4xl">
                      {c.name}
                    </span>
                    <span className="mt-1 text-sm">{c.items}</span>
                  </span>
                  <span className="relative block w-28 shrink-0 sm:w-40">
                    <Image
                      src={c.image}
                      alt={c.imageAlt}
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 className="h-section text-4xl sm:text-5xl">
                Satu permintaan. Satu faktur. Satu jadwal pengiriman.
              </h2>
              <p className="measure text-muted mt-5 text-lg">
                Pelanggan tidak perlu lagi berbelanja ke banyak toko atau
                mengumpulkan penawaran dari belasan pemasok.
              </p>
              <Link
                href="/tentang-kami#profil"
                className="decoration-yellow hover:decoration-navy mt-6 inline-block font-bold underline decoration-2"
              >
                Baca profil perusahaan
              </Link>
            </div>
            <dl className="divide-line border-line divide-y border-y">
              {strengths.map((s) => (
                <div
                  key={s.title}
                  className="grid gap-1 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6"
                >
                  <dt className="font-heading text-2xl">{s.title}</dt>
                  <dd className="text-muted">{s.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {categories.map((c) => (
        <section
          key={c.slug}
          className={`${{ teal: "text-navy bg-teal-50", navy: "bg-navy-50 text-navy", lavender: "bg-lavender-50 text-navy", yellow: "text-navy bg-yellow-50" }[c.tone]}`}
        >
          <Container className="grid items-center gap-8 py-12 sm:py-16 md:grid-cols-[1fr_1.2fr]">
            <div>
              <p
                className="font-heading text-6xl leading-none opacity-60 sm:text-7xl"
                aria-hidden="true"
              >
                {c.code}
              </p>
              <h2 className="h-page mt-2 text-5xl sm:text-6xl">{c.name}</h2>
              <p className="measure mt-4 text-lg">{c.items}</p>
              <Link
                href={`/produk-layanan/${c.slug}`}
                className="bg-navy hover:bg-navy-900 mt-6 inline-block px-5 py-3 font-bold text-white"
              >
                Lihat {c.name.toLowerCase()}
              </Link>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={c.image}
                alt={c.imageAlt}
                fill
                sizes="(min-width:768px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          </Container>
        </section>
      ))}

      <section className="py-16 sm:py-20">
        <Container className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="h-section text-3xl sm:text-4xl">Juga tersedia</h2>
            <p className="measure text-muted mt-2 text-lg">{alsoAvailable}</p>
          </div>
          <a
            href={site.contact.phoneHref}
            className="bg-navy hover:bg-navy-900 px-6 py-4 text-center text-lg font-bold text-white"
          >
            Minta penawaran: {site.contact.phone}
          </a>
        </Container>
      </section>
    </>
  );
}
