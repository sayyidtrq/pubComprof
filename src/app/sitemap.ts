import type { MetadataRoute } from "next";
import { getCategories } from "@/lib/catalog";

const base = "https://pub-comprof.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCategories();
  const paths = [
    "",
    "/tentang-kami",
    "/produk-layanan",
    ...categories.flatMap((c) => [
      `/produk-layanan/${c.slug}`,
      ...c.catalog.map((p) => `/produk-layanan/${c.slug}/${p.slug}`),
    ]),
    "/galeri",
    "/kontak",
  ];
  return paths.map((p) => ({ url: `${base}${p}` }));
}
