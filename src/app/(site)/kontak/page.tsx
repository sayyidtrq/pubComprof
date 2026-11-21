import type { Metadata } from "next";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { Container, PageHeader } from "@/components/PageHeader";
import { contactCopy, site, ui, nav } from "@/content/site";
export const metadata: Metadata = { title: nav[4].label };
export default function KontakPage() {
  return (
    <>
      <PageHeader title={ui.contact} lead={contactCopy.lead} />
      <section className="section">
        <Container>
          <p className="measure text-muted text-lg">{contactCopy.body}</p>
          <dl
            data-reveal-group
            className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <div id="whatsapp" data-reveal className="card scroll-mt-24 p-6">
              <dt className="font-heading flex items-center gap-3 font-semibold">
                <MessageCircle
                  size={24}
                  className="text-teal-700"
                  aria-hidden="true"
                />
                {ui.whatsappLabel}
              </dt>
              <dd className="mt-2">
                <ul>
                  {site.contact.whatsapp.map(({ number, href }) => (
                    <li key={number}>
                      <a
                        href={href}
                        className="inline-flex min-h-11 items-center font-semibold text-teal-700 underline"
                      >
                        {number}
                      </a>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div data-reveal className="card p-6">
              <dt className="font-heading flex items-center gap-3 font-semibold">
                <Mail size={24} className="text-teal-700" aria-hidden="true" />
                {ui.emailLabel}
              </dt>
              <dd className="text-muted mt-4">
                {site.contact.emailHref ? (
                  <a
                    href={site.contact.emailHref}
                    className="text-teal-700 underline"
                  >
                    {site.contact.email}
                  </a>
                ) : (
                  ui.availableSoon
                )}
              </dd>
            </div>
            <div data-reveal className="card p-6">
              <dt className="font-heading flex items-center gap-3 font-semibold">
                <MapPin
                  size={24}
                  className="text-teal-700"
                  aria-hidden="true"
                />
                {ui.addressLabel}
              </dt>
              <dd className="mt-4">
                <address className="not-italic">{site.contact.address}</address>
              </dd>
            </div>
          </dl>
          <div data-reveal className="card mt-10 overflow-hidden">
            <iframe
              title={ui.mapTitle}
              src={site.contact.mapsEmbed}
              className="h-[400px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="font-heading mt-9 max-w-3xl text-xl font-semibold sm:text-2xl">
            {site.closing}
          </p>
        </Container>
      </section>
    </>
  );
}
