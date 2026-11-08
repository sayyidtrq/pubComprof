import Image from "next/image";
import Link from "next/link";
import { categories, nav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="flex h-2" aria-hidden="true">
        <span className="text-navy flex-1 bg-teal-50" />
        <span className="bg-navy flex-1 text-white" />
        <span className="bg-lavender-50 text-navy flex-1" />
        <span className="text-navy flex-1 bg-yellow-50" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <Image
            src="/images/brand/logo.webp"
            alt={site.name}
            width={502}
            height={413}
            className="h-20 w-auto rounded-sm bg-white p-1"
          />
          <p className="font-heading mt-5 text-2xl">{site.closing}</p>
          <p className="mt-3 max-w-sm text-sm text-white/75">
            {site.description}
          </p>
        </div>
        <div>
          <h2 className="font-heading text-sm text-white/60">Halaman</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.label}>
                <Link href={n.href} className="hover:text-yellow">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="font-heading mt-6 text-sm text-white/60">Produk</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/produk-layanan/${c.slug}`}
                  className="hover:text-yellow"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-heading text-sm text-white/60">Hubungi kami</h2>
          <p className="mt-3 text-sm">Admin</p>
          <a
            href={site.contact.phoneHref}
            className="font-heading text-yellow block text-3xl"
          >
            {site.contact.phone}
          </a>
          <address className="mt-4 text-sm leading-relaxed text-white/80 not-italic">
            {site.contact.address}
          </address>
        </div>
      </div>
      <p className="border-t border-white/15 px-4 py-4 text-center text-xs text-white/60">
        © 2026 {site.name}
      </p>
    </footer>
  );
}
