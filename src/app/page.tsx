import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/PageHeader";
import { Marquee } from "@/components/Marquee";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { galleryItems, profile, site, strengths, ui } from "@/content/site";

const profilePhoto = galleryItems[0];

export default function Home() {
  return (
    <>
      <section className="bg-home-teal relative flex min-h-[calc(100svh-var(--site-header-height))] items-center text-white">
        <Container className="grid items-center gap-5 py-6 max-sm:pt-5 max-sm:pb-16 md:grid-cols-[.85fr_1.15fr] md:gap-12 md:py-12 lg:gap-16 lg:pt-8 lg:pb-28">
          <div className="min-w-0 md:col-start-2 md:row-start-1">
            <p className="font-heading text-xs leading-snug font-semibold uppercase sm:text-sm">
              {ui.heroChip} {"\u2013"} {site.name}
            </p>
            <h1 className="h-hero mt-3 !leading-[1.04] uppercase">
              <span className="block max-w-[12ch]">{ui.heroStart}</span>{" "}
              <span className="text-yellow block">{ui.heroEnd}</span>
            </h1>
            <p className="mt-4 max-w-lg leading-snug font-medium sm:text-lg">
              {site.description}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-5">
              <Link
                href="/kontak#whatsapp"
                className="btn text-home-dark hover:bg-lavender-50 bg-white max-sm:px-3 max-sm:text-xs"
              >
                {ui.contact}
                <ArrowRight
                  size={18}
                  className="max-sm:size-4"
                  aria-hidden="true"
                />
              </Link>
              <p className="inline-flex items-center gap-1 text-xs sm:gap-1.5 sm:text-sm">
                <MapPin
                  size={16}
                  className="shrink-0 max-sm:size-3.5"
                  aria-hidden="true"
                />
                {ui.serving} {site.area}
              </p>
            </div>
          </div>
          <div className="mx-auto w-full min-w-0 md:col-start-1 md:row-start-1 lg:max-w-[min(24rem,52svh)]">
            <div className="mx-auto grid aspect-[4/3] w-full max-w-52 place-items-center overflow-hidden rounded-[2rem] bg-[#fdfdfd] p-2 shadow-lg shadow-black/15 sm:max-w-80 sm:p-3 lg:max-w-none">
              <Image
                src="/images/brand/logo.webp"
                alt={site.name}
                width={502}
                height={413}
                sizes="(min-width: 1024px) min(384px, 52svh), (min-width: 640px) 320px, 208px"
                fetchPriority="high"
                className="h-full min-h-0 w-auto max-w-full object-contain [clip-path:inset(2px)]"
              />
            </div>
            <ul className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start lg:gap-1.5">
              {ui.heroPoints.map((point) => (
                <li
                  key={point}
                  className="bg-home-dark rounded-btn px-2.5 py-1.5 text-xs font-semibold sm:text-sm"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Container>
        <a
          href="#profil"
          className="absolute bottom-6 left-1/2 hidden min-h-11 -translate-x-1/2 items-center gap-2 rounded-full px-3 text-sm font-semibold underline decoration-white/45 underline-offset-4 hover:decoration-white lg:inline-flex"
        >
          {ui.profile}
          <ArrowDown size={16} aria-hidden="true" />
        </a>
      </section>
      <Marquee />
      <section
        id="profil"
        aria-labelledby="home-profile"
        className="bg-navy-50 text-home-dark scroll-mt-(--site-header-height)"
      >
        <Container className="grid items-center gap-8 py-12 md:grid-cols-[1.05fr_.95fr] md:gap-12 md:py-16 lg:gap-16">
          <div>
            <h2
              id="home-profile"
              className="font-heading text-4xl leading-none sm:text-5xl"
            >
              <span className="block font-medium italic">{ui.profileLead}</span>{" "}
              <span className="block font-bold">{ui.profileEmphasis}</span>
              <span
                aria-hidden="true"
                className="bg-home-teal mt-3 block h-1 w-28"
              />
            </h2>
            <p className="measure mt-6 text-lg">{profile.paragraphs[0]}</p>
            <Link
              href="/tentang-kami#profil"
              className="btn bg-home-dark hover:bg-navy mt-4 text-white"
            >
              {ui.more}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="rounded-card relative aspect-[16/10] overflow-hidden">
            <Image
              src={profilePhoto.src}
              alt={profilePhoto.alt}
              fill
              sizes="(min-width: 1280px) 550px, (min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>
      <section aria-labelledby="home-strengths" className="bg-white">
        <Container className="grid items-start gap-8 py-12 md:grid-cols-[.85fr_1.15fr] md:gap-12 md:py-16 lg:gap-16">
          <div>
            <h2 id="home-strengths" className="h-section max-w-[19ch]">
              {ui.homeStrengths}
            </h2>
            <p className="measure text-muted mt-4 text-lg">
              {ui.homeStrengthsLead}
            </p>
            <ButtonLink
              href="/produk-layanan"
              variant="secondary"
              className="mt-6"
            >
              {ui.viewProducts}
              <ArrowRight size={18} aria-hidden="true" />
            </ButtonLink>
          </div>
          <dl className="border-line divide-line divide-y border-y">
            {strengths.map(({ title, text }) => (
              <div
                key={title}
                className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-3"
              >
                <dt className="font-heading text-sm font-bold uppercase">
                  {title}
                </dt>
                <dd className="text-muted">{text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
      <CtaBand />
      <Faq />
    </>
  );
}
