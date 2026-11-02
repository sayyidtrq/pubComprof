import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/PageHeader";
import { contactCopy, site } from "@/content/site";

export const metadata: Metadata = { title: "Kontak" };

export default function KontakPage() {
  return (
    <>
      <PageHeader title="Talk To Us" lead={contactCopy.lead} tone="yellow" />
      <section className="py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="measure text-lg">{contactCopy.body}</p>
            <dl className="divide-rule border-rule mt-8 divide-y border-y">
              <div className="py-4">
                <dt className="label text-navy-soft text-sm">Telepon admin</dt>
                <dd>
                  <a
                    href={site.contact.phoneHref}
                    className="label decoration-yellow text-4xl underline decoration-4"
                  >
                    {site.contact.phone}
                  </a>
                </dd>
              </div>
              <div className="py-4">
                <dt className="label text-navy-soft text-sm">WhatsApp</dt>
                <dd>{site.contact.whatsapp}</dd>
              </div>
              <div className="py-4">
                <dt className="label text-navy-soft text-sm">Email</dt>
                <dd>{site.contact.email}</dd>
              </div>
              <div className="py-4">
                <dt className="label text-navy-soft text-sm">Alamat</dt>
                <dd>
                  <address className="not-italic">
                    {site.contact.address}
                  </address>
                </dd>
              </div>
            </dl>
            <p className="label mt-8 text-2xl">{site.closing}</p>
          </div>
          <div className="min-h-96 bg-white">
            <iframe
              title="Peta lokasi PT Pangudi Utama Berjaya"
              src={site.contact.mapsEmbed}
              className="h-full min-h-96 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
