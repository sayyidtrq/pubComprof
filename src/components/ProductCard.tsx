import Image from "next/image";
import Link from "next/link";
import type { Category, Product } from "@/content/site";
import { toneStyles } from "@/content/tones";
export function ProductCard({
  product,
  category,
}: {
  product: Product;
  category: Category;
}) {
  return (
    <article
      data-reveal
      className="card card-hover relative flex h-full min-w-0 flex-col p-3 sm:p-4"
    >
      <div className="img-zoom relative aspect-square overflow-hidden rounded-xl bg-white">
        <Image
          src={product.src}
          alt={product.alt}
          fill
          sizes="(min-width:1280px) 280px, (min-width:640px) 30vw, 45vw"
          className="object-contain p-2"
        />
      </div>
      <p className="text-muted mt-4 flex items-center gap-2 text-sm">
        <span
          aria-hidden="true"
          className={`h-2 w-2 shrink-0 rounded-full ${toneStyles[category.tone].accent}`}
        />
        {category.name}
      </p>
      <h3 className="h-card mt-2 break-words">
        {/* The ::after overlay makes the whole card open the detail page. */}
        <Link
          href={`/produk-layanan/${category.slug}/${product.slug}`}
          className="after:absolute after:inset-0 after:rounded-[inherit] after:content-['']"
        >
          {product.name}
        </Link>
      </h3>
    </article>
  );
}
