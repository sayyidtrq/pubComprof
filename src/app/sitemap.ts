import type { MetadataRoute } from "next";
import { categories } from "@/content/site";

const base = "https://pub-comprof.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/tentang-kami",
    "/produk-layanan",
    ...categories.map((c) => `/produk-layanan/${c.slug}`),
    "/galeri",
    "/komitmen-jaminan",
    "/kontak",
  ];
  return paths.map((p) => ({ url: `${base}${p}` }));
}
