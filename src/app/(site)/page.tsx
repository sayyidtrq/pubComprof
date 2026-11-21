import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BadgePercent,
  MapPin,
  MessageCircle,
  PackageCheck,
  Truck,
} from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/PageHeader";
import { Marquee } from "@/components/Marquee";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { galleryItems, profile, site, strengths, ui } from "@/content/site";

const profilePhoto = galleryItems[0];
const heroIcons = [PackageCheck, BadgePercent, Truck];

export default function Home() {
  return (
    <>
      <section className="bg-home-teal relative flex min-h-[calc(100svh-var(--site-header-height))] items-center text-white">
        <Container className="grid items-center gap-8 py-8 max-sm:pb-16 md:grid-cols-[.8fr_1.2fr] md:gap-12 md:py-12 lg:gap-16 lg:pb-24">
          <div className="hero-in min-w-0 md:col-start-2 md:row-start-1">
            <h1 className="h-hero text-[clamp(2.75rem,7vw,5.75rem)] !leading-[1] uppercase">
              <span className="block">{ui.heroStart}</span>{" "}
              <span className="text-yellow block">{ui.heroEnd}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-snug font-medium sm:text-xl lg:text-2xl">
              {site.description}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={site.contact.waHref}
                className="btn text-home-dark hover:bg-lavender-50 bg-white px-6 py-3.5 text-base"
              >
                <MessageCircle size={20} aria-hidden="true" />
                {ui.contact}
                <ArrowRight size={20} aria-hidden="true" />
              </a>
              <p className="inline-flex items-center gap-2 text-sm sm:text-base">
                <MapPin size={20} className="shrink-0" aria-hidden="true" />
                {ui.serving} {site.area}
              </p>
            </div>
            <ul className="mt-8 grid max-w-2xl gap-3 border-t border-white/25 pt-6 sm:grid-cols-3">
              {ui.heroPoints.map((point, i) => {
                const Icon = heroIcons[i];
                return (
                  <li key={point} className="flex items-center gap-3">
                    <span className="bg-home-dark text-yellow grid size-11 shrink-0 place-items-center rounded-xl">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <span className="font-heading text-sm leading-tight font-semibold sm:text-base">
                      {point}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="hero-pop mx-auto w-full min-w-0 md:col-start-1 md:row-start-1 lg:max-w-[min(32rem,62svh)]">
            <div className="mx-auto grid aspect-[4/3] w-full max-w-64 place-items-center overflow-hidden rounded-[2rem] bg-[#fdfdfd] p-3 shadow-2xl shadow-black/20 sm:max-w-96 lg:max-w-none">
              <Image
                src="/images/brand/logo.webp"
                alt={site.name}
                width={502}
                height={413}
                sizes="(min-width: 1024px) min(512px, 62svh), (min-width: 640px) 384px, 256px"
                fetchPriority="high"
                className="h-full min-h-0 w-auto max-w-full object-contain [clip-path:inset(2px)]"
              />
            </div>
          </div>
        </Container>
        <a
          href="#profil"
          className="absolute bottom-6 left-1/2 hidden min-h-11 -translate-x-1/2 items-center gap-2 rounded-full px-3 text-sm font-semibold underline decoration-white/45 underline-offset-4 hover:decoration-white lg:inline-flex"
        >
          {ui.profile}
          <ArrowDown size={16} className="animate-bounce" aria-hidden="true" />
        </a>
      </section>
      <Marquee />
      <section
        id="profil"
        aria-labelledby="home-profile"
        className="bg-navy-50 text-home-dark scroll-mt-(--site-header-height)"
      >
        <Container className="grid items-center gap-8 py-12 md:grid-cols-[1.05fr_.95fr] md:gap-12 md:py-16 lg:gap-16">
          <div data-reveal="left">
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
          <div
            data-reveal="right"
            className="rounded-card img-zoom relative aspect-[16/10] overflow-hidden"
          >
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
          <div data-reveal>
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
          <dl
            data-reveal-group
            className="border-line divide-line divide-y border-y"
          >
            {strengths.map(({ title, text }) => (
              <div
                key={title}
                data-reveal
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
