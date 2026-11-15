"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, MapPin, ChevronDown, FileText } from "lucide-react";
import { nav, site, ui } from "@/content/site";

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const desktopNav = isHome ? nav.slice(0, 4) : nav;
  const desktopItemClass = isHome ? "hover:bg-white/10" : "hover:bg-surface";
  const desktopActiveClass = isHome ? "text-yellow" : "bg-lavender-50";
  // A menu counts as open only on the page it was opened from, so navigating closes it.
  const [mobileFor, setMobileFor] = useState<string | null>(null);
  const [aboutFor, setAboutFor] = useState<string | null>(null);
  const mobileOpen = mobileFor === pathname;
  const aboutOpen = aboutFor === pathname;
  const mobileButton = useRef<HTMLButtonElement>(null);
  const aboutRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!aboutOpen && !mobileOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!aboutRef.current?.contains(e.target as Node)) setAboutFor(null);
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
  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href.split("/").slice(0, 2).join("/"));
  return (
    <>
      {!isHome && (
        <div className="bg-navy hidden text-sm text-white md:block">
          <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-2 lg:px-8">
            <a
              className="inline-flex items-center gap-2"
              tabIndex={-1}
              href={site.contact.phoneHref}
            >
              <Phone size={15} aria-hidden="true" />
              {site.contact.phone}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin size={15} aria-hidden="true" />
              {site.contact.addressShort}
            </span>
            <span className="ml-auto">
              {ui.serving} {site.area}
            </span>
          </div>
        </div>
      )}
      <header
        className={`sticky top-0 z-40 ${isHome ? "bg-home-dark text-white" : "border-line text-navy border-b bg-white"}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            aria-label={`${site.name}, ${ui.homeLabel}`}
          >
            <Image
              src="/images/brand/logo.webp"
              alt=""
              width={502}
              height={413}
              className={
                isHome ? "h-12 w-auto rounded-md bg-white p-1" : "h-12 w-auto"
              }
              preload
            />
            {isHome ? (
              <span className="font-heading max-w-44 text-xs leading-tight font-bold uppercase xl:max-w-56">
                <span className="block text-[9px] font-medium italic">
                  {ui.companyProfile}
                </span>
                {site.name}
              </span>
            ) : (
              <span className="font-heading text-xl font-bold lg:hidden xl:block">
                {site.shortName}
                <span className="block max-w-36 text-[10px] leading-tight font-medium">
                  {site.name}
                </span>
              </span>
            )}
          </Link>
          <nav aria-label={ui.mainNav} className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {desktopNav.map((item) =>
                "children" in item ? (
                  <li key={item.label} ref={aboutRef} className="relative">
                    <button
                      type="button"
                      aria-expanded={aboutOpen}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      aria-controls="menu-tentang"
                      onClick={() => setAboutFor(aboutOpen ? null : pathname)}
                      className={`font-heading flex min-h-11 items-center gap-1 rounded-full px-2.5 py-2 text-xs font-medium xl:text-sm ${desktopItemClass} ${isActive(item.href) ? desktopActiveClass : ""}`}
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
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`font-heading block min-h-11 content-center rounded-full px-2.5 py-2 text-xs font-medium xl:text-sm ${desktopItemClass} ${isActive(item.href) ? desktopActiveClass : ""}`}
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
              href={site.contact.phoneHref}
              className="btn btn-primary hidden md:inline-flex"
            >
              <Phone size={18} aria-hidden="true" />
              <span>{ui.contact}</span>
              {isHome && (
                <span className="hidden xl:inline">{site.contact.phone}</span>
              )}
            </a>
            <button
              ref={mobileButton}
              type="button"
              className="rounded-btn border-line inline-flex min-h-11 min-w-11 items-center justify-center border lg:hidden"
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
            aria-label={ui.mobileNav}
            className="border-line shadow-card text-navy absolute inset-x-0 max-h-[calc(100dvh-76px)] overflow-y-auto border-b bg-white lg:hidden"
          >
            <ul className="px-4 pb-5">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={() => setMobileFor(null)}
                    className={`font-heading block rounded-lg px-3 py-3 text-sm ${isActive(item.href) ? "bg-lavender-50" : ""}`}
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
                <a
                  href={site.contact.phoneHref}
                  className="btn btn-primary w-full"
                >
                  <Phone size={18} aria-hidden="true" />
                  {ui.telephone} {site.contact.phone}
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
