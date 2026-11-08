import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type Category, ui } from "@/content/site";
import { toneStyles } from "@/content/tones";
export function CategoryCard({
  category: c,
  wide = false,
}: {
  category: Category;
  wide?: boolean;
}) {
  return (
    <article
      className={`card-link relative overflow-hidden p-5 ${wide ? "grid gap-6 md:grid-cols-2 md:items-center" : "flex flex-col"}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-1 ${toneStyles[c.tone].accent}`}
      />
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <Image
          src={c.image}
          alt={c.imageAlt}
          fill
          sizes={
            wide
              ? "(min-width:768px) 45vw, 90vw"
              : "(min-width:1024px) 280px, (min-width:640px) 45vw, 90vw"
          }
          className="object-cover"
        />
      </div>
      <div className={wide ? "" : "flex flex-1 flex-col pt-5"}>
        <h3 className="h-card">{c.name}</h3>
        <p className="text-muted mt-3">{c.items}</p>
        <Link
          href={`/produk-layanan/${c.slug}`}
          className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 font-semibold text-teal-700"
        >
          {ui.collection}
          <ArrowRight size={20} aria-hidden="true" />
          <span className="sr-only">{c.name}</span>
        </Link>
      </div>
    </article>
  );
}
