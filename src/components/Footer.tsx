import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, Mail, MessageCircle } from "lucide-react";
import { categories, nav, site, ui } from "@/content/site";
import { Container } from "./PageHeader";
export function Footer() {
  return (
    <footer className="bg-navy pb-20 text-white sm:pb-0">
      <div className="flex h-2" aria-hidden="true">
        <span className="bg-teal flex-1" />
        <span className="bg-navy-900 flex-1" />
        <span className="bg-lavender flex-1" />
        <span className="bg-yellow flex-1" />
      </div>
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_.9fr_1.2fr]">
        <div>
          <Image
            src="/images/brand/logo.webp"
            alt={site.name}
            width={502}
            height={413}
            className="h-24 w-auto rounded-xl bg-white p-2"
          />
          <p className="font-heading mt-5 text-lg font-semibold">
            {site.closing}
          </p>
          <p className="mt-3 max-w-sm text-sm">{site.description}</p>
        </div>
        <div>
          <h2 className="font-heading text-yellow font-semibold">{ui.pages}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  className="hover:text-yellow inline-block py-1"
                  href={n.href}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-heading text-yellow font-semibold">
            {ui.product}
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  className="hover:text-yellow inline-block py-1"
                  href={`/produk-layanan/${c.slug}`}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-heading text-yellow font-semibold">
            {ui.contact}
          </h2>
          <a
            className="mt-4 flex items-center gap-2 py-2 font-semibold"
            href={site.contact.phoneHref}
          >
            <Phone size={20} aria-hidden="true" />
            {site.contact.phone}
          </a>
          <address className="mt-3 flex gap-2 text-sm not-italic">
            <MapPin className="shrink-0" size={20} aria-hidden="true" />
            {site.contact.address}
          </address>
          {site.contact.whatsappHref && (
            <a
              href={site.contact.whatsappHref}
              className="mt-3 flex items-center gap-2"
            >
              <MessageCircle size={20} aria-hidden="true" />
              {ui.whatsapp}
            </a>
          )}
          {site.contact.emailHref && (
            <a
              href={site.contact.emailHref}
              className="mt-3 flex items-center gap-2"
            >
              <Mail size={20} aria-hidden="true" />
              {site.contact.email}
            </a>
          )}
        </div>
      </Container>
      <p className="border-t border-white/20 px-4 py-5 text-center text-sm">
        {ui.copyright} {site.name}
      </p>
    </footer>
  );
}
