import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ui } from "@/content/site";
export type Crumb = { label: string; href?: string };
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label={ui.breadcrumb} className="mb-6">
      <ol className="text-muted flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && <ChevronRight size={14} aria-hidden="true" />}
            {i === items.length - 1 ? (
              <span aria-current="page">{item.label}</span>
            ) : (
              <Link
                className="hover:text-navy underline"
                href={item.href || "/"}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
