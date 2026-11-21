import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import {
  type Category,
  type GalleryItem,
  type Product,
  categories as staticCategories,
  galleryItems as staticGallery,
} from "@/content/site";
import { publicClient, supabaseConfigured } from "@/lib/supabase/server";

export const CATALOG_TAG = "catalog";

type CategoryRow = {
  id: string;
  slug: string;
  code: string;
  name: string;
  tone: Category["tone"];
  items: string;
  image: string;
  image_alt: string;
  products: {
    id: string;
    slug: string;
    code: string;
    name: string;
    description: string;
    image: string;
    image_alt: string;
    sort: number;
  }[];
};

/** All categories with their products, in admin-defined order. */
export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheTag(CATALOG_TAG);
  cacheLife("max");
  if (!supabaseConfigured) return staticCategories;

  const { data, error } = await publicClient()
    .from("categories")
    .select(
      "id, slug, code, name, tone, items, image, image_alt, products(id, slug, code, name, description, image, image_alt, sort)",
    )
    .order("sort")
    .order("name")
    .returns<CategoryRow[]>();
  if (error) throw new Error(`Gagal memuat kategori: ${error.message}`);

  return data.map((c) => ({
    id: c.id,
    slug: c.slug,
    code: c.code,
    name: c.name,
    tone: c.tone,
    items: c.items,
    image: c.image,
    imageAlt: c.image_alt,
    catalog: c.products
      .toSorted((a, b) => a.sort - b.sort || a.name.localeCompare(b.name))
      .map((p): Product => ({
        id: p.id,
        slug: p.slug,
        code: p.code,
        name: p.name,
        description: p.description,
        src: p.image,
        alt: p.image_alt,
      })),
  }));
}

export async function getCategory(slug: string) {
  return (await getCategories()).find((c) => c.slug === slug);
}

export async function getProduct(categorySlug: string, productSlug: string) {
  const category = await getCategory(categorySlug);
  const product = category?.catalog.find((p) => p.slug === productSlug);
  return category && product ? { category, product } : undefined;
}

export async function getGallery(): Promise<GalleryItem[]> {
  "use cache";
  cacheTag(CATALOG_TAG);
  cacheLife("max");
  if (!supabaseConfigured) return staticGallery;

  const { data, error } = await publicClient()
    .from("gallery_items")
    .select("id, title, text, image, image_alt, big")
    .order("sort")
    .order("created_at");
  if (error) throw new Error(`Gagal memuat galeri: ${error.message}`);
  return data.map((g) => ({
    id: g.id,
    title: g.title,
    text: g.text,
    src: g.image,
    alt: g.image_alt,
    big: g.big,
  }));
}
