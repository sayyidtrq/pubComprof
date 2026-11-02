"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";

export function Nav() {
  const pathname = usePathname();
  // A menu counts as open only on the page it was opened from, so navigating closes it.
  const [mobileFor, setMobileFor] = useState<string | null>(null);
  const [aboutFor, setAboutFor] = useState<string | null>(null);
  const mobileOpen = mobileFor === pathname;
  const aboutOpen = aboutFor === pathname;
  const aboutRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!aboutOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!aboutRef.current?.contains(e.target as Node)) setAboutFor(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAboutFor(null);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [aboutOpen]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href.split("/").slice(0, 2).join("/"));

  return (
    <header className="bg-navy sticky top-0 z-40 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${site.name}, beranda`}
        >
          <Image
            src="/images/brand/logo.webp"
            alt=""
            width={502}
            height={413}
            className="h-10 w-auto rounded-sm bg-white p-0.5"
            priority
          />
          <span className="label hidden text-lg leading-none sm:block">
            {site.shortName}
            <span className="block text-[0.7rem] font-semibold tracking-[0.08em] text-white/70">
              {site.name}
            </span>
          </span>
        </Link>

        <nav aria-label="Utama" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) =>
              "children" in item ? (
                <li key={item.label} ref={aboutRef} className="relative">
                  <button
                    type="button"
                    aria-expanded={aboutOpen}
                    aria-controls="menu-tentang"
                    onClick={() => setAboutFor(aboutOpen ? null : pathname)}
                    className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold whitespace-nowrap hover:bg-white/10 ${isActive(item.href) ? "text-yellow" : ""}`}
                  >
                    {item.label}
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      aria-hidden="true"
                      className={`transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`}
                    >
                      <path
                        d="M1 1l4 4 4-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                    </svg>
                  </button>
                  {aboutOpen && (
                    <ul
                      id="menu-tentang"
                      className="bg-paper text-navy border-yellow absolute top-full left-0 min-w-64 border-t-4 py-2 shadow-[0_12px_28px_-8px_rgba(14,27,51,0.45)]"
                    >
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className="block px-4 py-2.5 text-sm font-semibold hover:bg-white"
                            aria-current={
                              pathname === c.href ? "page" : undefined
                            }
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`block px-3 py-2 text-sm font-semibold whitespace-nowrap hover:bg-white/10 ${isActive(item.href) ? "text-yellow" : ""}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.contact.phoneHref}
            className="bg-yellow text-navy hidden px-4 py-2 text-sm font-bold hover:brightness-95 xl:block"
          >
            Hubungi Kami{" "}
            <span className="font-semibold">{site.contact.phone}</span>
          </a>
          <button
            type="button"
            className="border border-white/40 px-3 py-2 text-sm font-semibold lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
            onClick={() => setMobileFor(mobileOpen ? null : pathname)}
          >
            {mobileOpen ? "Tutup" : "Menu"}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="menu-mobile"
          aria-label="Utama (ponsel)"
          className="border-t border-white/15 lg:hidden"
        >
          <ul className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block py-3 text-base font-semibold"
                >
                  {item.label}
                </Link>
                {"children" in item && (
                  <ul className="mb-1 ml-3 border-l border-white/25 pl-4">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className="block py-2 text-sm text-white/85"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="py-3">
              <a
                href={site.contact.phoneHref}
                className="bg-yellow text-navy block px-4 py-3 text-center font-bold"
              >
                Telepon {site.contact.phone}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
