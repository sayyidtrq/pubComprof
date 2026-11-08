import type { Metadata } from "next";
import { Building2, Briefcase, Landmark, MapPin, Phone } from "lucide-react";
import { Container, PageHeader } from "@/components/PageHeader";
import { FeatureCard } from "@/components/FeatureCard";
import {
  missions,
  orgChart,
  profile,
  vision,
  nav,
  ui,
  site,
} from "@/content/site";
export const metadata: Metadata = { title: ui.about };
const box =
  "rounded-btn border-2 border-navy bg-white px-2 py-3 text-center font-heading text-sm font-semibold sm:px-6 sm:text-xl";
const identityIcons = [Building2, Briefcase, Landmark, MapPin, Phone];
export default function TentangKamiPage() {
  return (
    <>
      <PageHeader title={ui.about} lead={profile.lead}>
        <nav aria-label={ui.sectionNav} className="mt-7 flex flex-wrap gap-2">
          {nav[1].children.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="chip hover:bg-navy min-h-11 bg-white hover:text-white"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </PageHeader>
      <section
        id="profil"
        className="section scroll-mt-24"
        aria-labelledby="h-profil"
      >
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 id="h-profil" className="h-section">
              {ui.profile}
            </h2>
            <div className="text-muted mt-6 space-y-5 text-lg">
              {profile.paragraphs.map((p) => (
                <p key={p} className="measure">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <aside
            className="card self-start p-6 sm:p-8"
            aria-labelledby="identitas"
          >
            <h3 id="identitas" className="h-card">
              {ui.identity}
            </h3>
            <dl className="divide-line mt-5 divide-y">
              {profile.identity.map(([k, v], i) => {
                const Icon = identityIcons[i];
                return (
                  <div key={k} className="py-4">
                    <dt className="text-muted flex items-center gap-2 text-sm">
                      <Icon size={18} aria-hidden="true" />
                      {k}
                    </dt>
                    <dd className="mt-1 font-medium">
                      {i === 4 ? <a href={site.contact.phoneHref}>{v}</a> : v}
                    </dd>
                  </div>
                );
              })}
            </dl>
            <p className="text-muted mt-5 text-sm">{site.since}</p>
          </aside>
        </Container>
      </section>
      <section id="visi-misi" className="scroll-mt-24" aria-labelledby="h-visi">
        <Container>
          <div className="rounded-card bg-navy p-6 text-white sm:p-10 lg:p-12">
            <h2 id="h-visi" className="h-section">
              {ui.vision}
            </h2>
            <p className="measure font-heading mt-5 text-xl leading-relaxed sm:text-2xl">
              {vision.text}
            </p>
            <blockquote className="measure border-yellow mt-8 border-l-2 pl-5 text-lg italic">
              {vision.quote}
            </blockquote>
          </div>
          <div className="section">
            <h2 className="h-section">{ui.missions}</h2>
            <ol className="mt-8 grid gap-5 sm:grid-cols-2">
              {missions.map((m, i) => (
                <li key={m.title}>
                  <FeatureCard feature={m} number={i + 1} />
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>
      <section
        id="struktur-organisasi"
        className="section bg-lavender-50 scroll-mt-24"
        aria-labelledby="h-struktur"
      >
        <Container>
          <h2 id="h-struktur" className="h-section">
            {ui.structure}
          </h2>
          <figure className="card mt-8 p-4 py-8 sm:p-10">
            <div
              className="mx-auto flex max-w-3xl flex-col items-center"
              role="img"
              aria-label={ui.orgAlt}
            >
              <div className="rounded-btn bg-navy font-heading px-6 py-3 text-center font-semibold text-white sm:text-xl">
                {orgChart.top}
              </div>
              <span className="bg-navy h-8 w-0.5" aria-hidden="true" />
              <div className={box}>{orgChart.second}</div>
              <span className="bg-navy h-8 w-0.5" aria-hidden="true" />
              <div className="relative grid w-full grid-cols-3 gap-2 pt-8 sm:gap-6">
                <span
                  className="bg-navy absolute top-0 right-[16.6%] left-[16.6%] h-0.5"
                  aria-hidden="true"
                />
                {orgChart.third.map((t) => (
                  <div key={t} className="relative">
                    <span
                      className="bg-navy absolute -top-8 left-1/2 h-8 w-0.5"
                      aria-hidden="true"
                    />
                    <div className={box}>{t}</div>
                  </div>
                ))}
              </div>
            </div>
            <figcaption className="text-muted mx-auto mt-8 max-w-3xl text-center text-sm">
              {ui.orgPlaceholder}
            </figcaption>
          </figure>
        </Container>
      </section>
    </>
  );
}
