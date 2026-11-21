"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, MessageCircle, ChevronDown, FileText } from "lucide-react";
import { nav, site, ui } from "@/content/site";

export function Nav() {
  const pathname = usePathname();
  // A menu counts as open only on the page it was opened from, so navigating closes it.
  const [mobileFor, setMobileFor] = useState<string | null>(null);
  const [aboutFor, setAboutFor] = useState<string | null>(null);
  const mobileOpen = mobileFor === pathname;
  const aboutOpen = aboutFor === pathname;
  const mobileButton = useRef<HTMLButtonElement>(null);
  const aboutRef = useRef<HTMLLIElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!aboutOpen && !mobileOpen) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (aboutOpen && !aboutRef.current?.contains(target)) setAboutFor(null);
      if (mobileOpen && !headerRef.current?.contains(target))
        setMobileFor(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (aboutOpen) {
          setAboutFor(null);
          aboutRef.current?.querySelector("button")?.focus();
        }
        if (mobileOpen) {
          setMobileFor(null);
          mobileButton.current?.focus();
        }
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [aboutOpen, mobileOpen]);
  const current = (href: string) => {
    if (pathname === href) return "page";
    if (pathname.startsWith(`${href}/`)) return "location";
  };
  return (
    <header
      ref={headerRef}
      className="bg-home-dark sticky top-0 z-40 text-white"
    >
      <div className="mx-auto flex h-(--site-header-height) max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2"
          aria-label={`${site.name}, ${ui.homeLabel}`}
        >
          <Image
            src="/images/brand/logo.webp"
            alt=""
            width={502}
            height={413}
            className="h-12 w-auto shrink-0 rounded-md bg-white p-1"
            preload
          />
          <span className="font-heading max-w-44 text-xs leading-tight font-bold uppercase xl:max-w-56">
            <span className="block text-[9px] font-medium italic">
              {ui.companyProfile}
            </span>
            {site.name}
          </span>
        </Link>
        <nav aria-label={ui.mainNav} className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {nav.map((item) =>
              "children" in item ? (
                <li key={item.label} ref={aboutRef} className="relative">
                  <button
                    type="button"
                    aria-expanded={aboutOpen}
                    aria-current={current(item.href)}
                    aria-controls="menu-tentang"
                    onClick={() => setAboutFor(aboutOpen ? null : pathname)}
                    className="font-heading aria-[current]:text-yellow flex min-h-11 items-center gap-1 rounded-full px-2.5 py-2 text-sm font-medium whitespace-nowrap hover:bg-white/10"
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      aria-hidden="true"
                      className={aboutOpen ? "rotate-180" : ""}
                    />
                  </button>
                  {aboutOpen && (
                    <ul
                      id="menu-tentang"
                      className="card text-navy absolute top-full left-0 mt-2 min-w-64 p-2"
                    >
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className="hover:bg-lavender-50 flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-sm"
                            onClick={() => setAboutFor(null)}
                          >
                            <FileText size={16} aria-hidden="true" />
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
                    aria-current={current(item.href)}
                    className="font-heading aria-[current]:text-yellow block min-h-11 content-center rounded-full px-2.5 py-2 text-sm font-medium whitespace-nowrap hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={site.contact.waHref}
            className="btn btn-primary hidden sm:inline-flex"
          >
            <MessageCircle size={18} aria-hidden="true" />
            <span>{ui.contact}</span>
            <span className="hidden 2xl:inline">{site.contact.waNumber}</span>
          </a>
          <button
            ref={mobileButton}
            type="button"
            className="rounded-btn inline-flex min-h-11 min-w-11 items-center justify-center border border-white/40 xl:hidden"
            aria-label={mobileOpen ? ui.close : ui.menu}
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
            onClick={() => setMobileFor(mobileOpen ? null : pathname)}
          >
            {mobileOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav
          id="menu-mobile"
          data-lenis-prevent
          aria-label={ui.mobileNav}
          className="border-line shadow-card text-navy absolute inset-x-0 top-full max-h-[calc(100dvh-var(--site-header-height))] overflow-y-auto overscroll-contain border-b bg-white xl:hidden"
        >
          <ul className="px-4 pb-5">
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={current(item.href)}
                  onClick={() => setMobileFor(null)}
                  className="font-heading block rounded-lg px-3 py-3 text-sm aria-[current]:bg-yellow-50"
                >
                  {item.label}
                </Link>
                {"children" in item && (
                  <ul className="border-line ml-6 border-l pl-3">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          onClick={() => setMobileFor(null)}
                          className="block min-h-11 py-2.5 text-sm"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="pt-4">
              <a href={site.contact.waHref} className="btn btn-primary w-full">
                <MessageCircle size={18} aria-hidden="true" />
                {ui.whatsapp} {site.contact.waNumber}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
