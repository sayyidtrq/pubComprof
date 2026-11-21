"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin/produk", label: "Produk" },
  { href: "/admin/kategori", label: "Kategori" },
  { href: "/admin/galeri", label: "Galeri" },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Admin">
      <ul className="flex gap-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              aria-current={pathname.startsWith(l.href) ? "page" : undefined}
              className="font-heading aria-[current]:text-yellow block min-h-11 content-center rounded-full px-3 text-sm font-medium hover:bg-white/10"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
