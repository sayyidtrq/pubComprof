import Image from "next/image";
import { type Category, site, ui } from "@/content/site";
import { toneStyles } from "@/content/tones";
export function ProductCard({
  product,
  category,
}: {
  product: Category["catalog"][number];
  category: Category;
}) {
  return (
    <article className="card flex h-full min-w-0 flex-col p-3 sm:p-4">
      <div className="relative aspect-square rounded-xl bg-white">
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
      <h3 className="h-card mt-2 break-words">{product.name}</h3>
      <a
        className="mt-auto pt-4 text-sm font-semibold text-teal-700 underline"
        href={site.contact.phoneHref}
      >
        {ui.price}
      </a>
    </article>
  );
}
