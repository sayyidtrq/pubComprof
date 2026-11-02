import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/PageHeader";
import { profile } from "@/content/site";

export const metadata: Metadata = { title: "Profil Perusahaan" };

export default function ProfilPage() {
  return (
    <>
      <PageHeader title="Profil Perusahaan" lead={profile.lead} tone="teal" />
      <section className="py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6 text-lg">
            {profile.paragraphs.map((p) => (
              <p key={p} className="measure">
                {p}
              </p>
            ))}
          </div>
          <aside
            aria-labelledby="identitas"
            className="border-yellow self-start border-t-8 bg-white p-6"
          >
            <h2 id="identitas" className="label text-2xl">
              Identitas perusahaan
            </h2>
            <dl className="divide-rule mt-4 divide-y">
              {profile.identity.map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-[7rem_1fr] gap-3 py-3 text-sm"
                >
                  <dt className="text-navy-soft">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </Container>
      </section>
    </>
  );
}
