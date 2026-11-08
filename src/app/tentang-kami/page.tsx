import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/PageHeader";
import { missions, orgChart, profile, vision } from "@/content/site";

export const metadata: Metadata = { title: "Tentang Kami" };

const box =
  "border-2 border-navy bg-white px-6 py-3 text-center font-heading text-xl";

const sections = [
  { id: "profil", label: "Profil Perusahaan" },
  { id: "visi-misi", label: "Visi & Misi" },
  { id: "struktur-organisasi", label: "Struktur Organisasi" },
];

export default function TentangKamiPage() {
  return (
    <>
      <PageHeader title="Tentang Kami" lead={profile.lead} tone="teal">
        <nav aria-label="Bagian halaman" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="bg-navy hover:bg-navy-900 block px-4 py-2 text-sm font-bold text-white"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <section
        id="profil"
        aria-labelledby="h-profil"
        className="scroll-mt-16 py-14 sm:py-20"
      >
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 id="h-profil" className="h-section text-4xl sm:text-5xl">
              Profil Perusahaan
            </h2>
            <div className="mt-6 space-y-6 text-lg">
              {profile.paragraphs.map((p) => (
                <p key={p} className="measure">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <aside
            aria-labelledby="identitas"
            className="border-yellow self-start border-t-8 bg-white p-6"
          >
            <h3 id="identitas" className="font-heading text-2xl">
              Identitas perusahaan
            </h3>
            <dl className="divide-line mt-4 divide-y">
              {profile.identity.map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-[7rem_1fr] gap-3 py-3 text-sm"
                >
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </Container>
      </section>

      <section id="visi-misi" aria-labelledby="h-visi" className="scroll-mt-16">
        <div className="bg-navy text-white">
          <Container className="py-14 sm:py-20">
            <h2 id="h-visi" className="font-heading text-yellow text-2xl">
              Visi
            </h2>
            <p className="h-page mt-4 max-w-5xl text-[clamp(2rem,5vw,4rem)] !leading-[1.05] !font-bold">
              {vision.text}
            </p>
            <p className="mt-10 max-w-xl border-t border-white/25 pt-5 text-lg text-white/80 italic">
              {vision.quote}
            </p>
          </Container>
        </div>
        <Container className="py-14 sm:py-20">
          <h3 className="h-section text-4xl sm:text-5xl">
            Misi: empat komitmen yang kami jalankan setiap hari
          </h3>
          <ol className="bg-line mt-10 grid gap-px sm:grid-cols-2">
            {missions.map((m, i) => (
              <li
                key={m.title}
                className={`p-6 sm:p-8 ${["text-navy bg-teal-50", "text-navy bg-yellow-50", "bg-lavender-50 text-navy", "bg-navy text-white"][i]}`}
              >
                <p
                  className="font-heading text-5xl leading-none opacity-70"
                  aria-hidden="true"
                >
                  {i + 1}
                </p>
                <h4 className="h-section mt-4 text-2xl">{m.title}</h4>
                <p className="mt-2">{m.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section
        id="struktur-organisasi"
        aria-labelledby="h-struktur"
        className="bg-lavender-50 text-navy scroll-mt-16 py-14 sm:py-20"
      >
        <Container>
          <h2 id="h-struktur" className="h-page text-5xl sm:text-6xl">
            Struktur Organisasi
          </h2>
          <figure className="mt-10">
            <div
              className="mx-auto flex max-w-3xl flex-col items-center"
              role="img"
              aria-label="Bagan: Komisaris membawahi Direktur Utama, yang membawahi Finance, Operasional, dan GM."
            >
              <div className={box}>{orgChart.top}</div>
              <span className="bg-navy h-8 w-0.5" aria-hidden="true" />
              <div className={box}>{orgChart.second}</div>
              <span className="bg-navy h-8 w-0.5" aria-hidden="true" />
              <div className="relative grid w-full grid-cols-3 gap-3 pt-8 sm:gap-6">
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
                    <div className={`${box} !px-2 !text-base sm:!text-xl`}>
                      {t}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <figcaption className="mx-auto mt-10 max-w-3xl text-center text-sm">
              [PLACEHOLDER: nama pejabat belum tersedia di company profile]
            </figcaption>
          </figure>
        </Container>
      </section>
    </>
  );
}
