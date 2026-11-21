"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { type Tone, slugify } from "@/content/site";
import { CATALOG_TAG } from "@/lib/catalog";
import {
  ALLOWED_TYPES,
  MAX_BYTES,
  deleteUploaded,
  presignUpload,
  r2Configured,
} from "@/lib/r2";
import {
  getAdmin,
  sessionClient,
  supabaseConfigured,
} from "@/lib/supabase/server";

export type ActionState = { error?: string; ok?: string } | undefined;

const TONES: Tone[] = ["teal", "navy", "lavender", "yellow"];
const FOLDERS = ["produk", "kategori", "galeri"] as const;

const text = (form: FormData, key: string) =>
  String(form.get(key) ?? "").trim();
const int = (form: FormData, key: string) =>
  Number.parseInt(text(form, key), 10) || 0;

async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin.supabase;
}

/** Friendly message for the database errors an admin can actually cause. */
function explain(error: { code?: string; message: string }) {
  if (error.code === "23505")
    return "Slug sudah dipakai. Ganti slug agar unik.";
  if (error.code === "23514")
    return "Slug hanya boleh huruf kecil, angka, dan tanda hubung.";
  return `Gagal menyimpan: ${error.message}`;
}

function done(message: string): ActionState {
  updateTag(CATALOG_TAG);
  return { ok: message };
}

// ---------- Auth ----------

export async function signIn(
  _: ActionState,
  form: FormData,
): Promise<ActionState> {
  if (!supabaseConfigured)
    return { error: "Database belum dikonfigurasi di server ini." };
  const supabase = await sessionClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: text(form, "email"),
    password: String(form.get("password") ?? ""),
  });
  if (error) return { error: "Email atau kata sandi salah." };
  if (!(await getAdmin())) {
    await supabase.auth.signOut();
    return { error: "Akun ini bukan admin." };
  }
  redirect("/admin");
}

export async function signOut() {
  const supabase = await sessionClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ---------- Uploads ----------

export async function createUploadUrl(input: {
  folder: string;
  contentType: string;
  size: number;
}) {
  await requireAdmin();
  if (!r2Configured)
    return { error: "Penyimpanan gambar (R2) belum dikonfigurasi." } as const;
  if (!FOLDERS.includes(input.folder as (typeof FOLDERS)[number]))
    return { error: "Folder tidak dikenal." } as const;
  if (!(ALLOWED_TYPES as readonly string[]).includes(input.contentType))
    return { error: "Format gambar harus WebP, JPG, atau PNG." } as const;
  if (input.size > MAX_BYTES)
    return { error: "Ukuran gambar maksimal 5 MB." } as const;
  return presignUpload(input.folder, input.contentType);
}

/** Removes an uploaded file that ended up unused (form cancelled or image replaced). */
export async function discardUpload(src: string) {
  await requireAdmin();
  await deleteUploaded(src);
}

// ---------- Categories ----------

export async function saveCategory(
  _: ActionState,
  form: FormData,
): Promise<ActionState> {
  const supabase = await requireAdmin();
  const id = text(form, "id");
  const name = text(form, "name");
  const image = text(form, "image");
  const tone = text(form, "tone") as Tone;
  if (!name) return { error: "Nama kategori wajib diisi." };
  if (!image) return { error: "Gambar kategori wajib diunggah." };
  if (!TONES.includes(tone)) return { error: "Warna tidak valid." };

  const row = {
    name,
    slug: slugify(text(form, "slug") || name),
    code: text(form, "code"),
    tone,
    items: text(form, "items"),
    image,
    image_alt: text(form, "image_alt") || name,
    sort: int(form, "sort"),
  };
  const previous = text(form, "previous_image");
  const { error } = id
    ? await supabase.from("categories").update(row).eq("id", id)
    : await supabase.from("categories").insert(row);
  if (error) return { error: explain(error) };
  if (previous && previous !== image) await deleteUploaded(previous);
  return done(id ? "Kategori diperbarui." : "Kategori ditambahkan.");
}

export async function deleteCategory(id: string): Promise<ActionState> {
  const supabase = await requireAdmin();
  const { data } = await supabase
    .from("categories")
    .select("image, products(image)")
    .eq("id", id)
    .single();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) return { error: explain(error) };
  if (data) {
    await Promise.all(
      [data.image, ...data.products.map((p) => p.image)].map(deleteUploaded),
    );
  }
  return done("Kategori dan produknya dihapus.");
}

// ---------- Products ----------

export async function saveProduct(
  _: ActionState,
  form: FormData,
): Promise<ActionState> {
  const supabase = await requireAdmin();
  const id = text(form, "id");
  const name = text(form, "name");
  const image = text(form, "image");
  const categoryId = text(form, "category_id");
  if (!name) return { error: "Nama produk wajib diisi." };
  if (!categoryId) return { error: "Pilih kategori." };
  if (!image) return { error: "Gambar produk wajib diunggah." };

  const row = {
    category_id: categoryId,
    name,
    slug: slugify(text(form, "slug") || name),
    code: text(form, "code"),
    description: text(form, "description"),
    image,
    image_alt: text(form, "image_alt") || name,
    sort: int(form, "sort"),
  };
  const previous = text(form, "previous_image");
  const { error } = id
    ? await supabase.from("products").update(row).eq("id", id)
    : await supabase.from("products").insert(row);
  if (error) return { error: explain(error) };
  if (previous && previous !== image) await deleteUploaded(previous);
  return done(id ? "Produk diperbarui." : "Produk ditambahkan.");
}

export async function deleteProduct(id: string): Promise<ActionState> {
  const supabase = await requireAdmin();
  const { data } = await supabase
    .from("products")
    .select("image")
    .eq("id", id)
    .single();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { error: explain(error) };
  if (data) await deleteUploaded(data.image);
  return done("Produk dihapus.");
}

// ---------- Gallery ----------

export async function saveGalleryItem(
  _: ActionState,
  form: FormData,
): Promise<ActionState> {
  const supabase = await requireAdmin();
  const id = text(form, "id");
  const title = text(form, "title");
  const image = text(form, "image");
  if (!title) return { error: "Judul wajib diisi." };
  if (!image) return { error: "Foto wajib diunggah." };

  const row = {
    title,
    text: text(form, "text"),
    image,
    image_alt: text(form, "image_alt") || title,
    big: form.get("big") === "on",
    sort: int(form, "sort"),
  };
  const previous = text(form, "previous_image");
  const { error } = id
    ? await supabase.from("gallery_items").update(row).eq("id", id)
    : await supabase.from("gallery_items").insert(row);
  if (error) return { error: explain(error) };
  if (previous && previous !== image) await deleteUploaded(previous);
  return done(id ? "Foto diperbarui." : "Foto ditambahkan.");
}

export async function deleteGalleryItem(id: string): Promise<ActionState> {
  const supabase = await requireAdmin();
  const { data } = await supabase
    .from("gallery_items")
    .select("image")
    .eq("id", id)
    .single();
  const { error } = await supabase.from("gallery_items").delete().eq("id", id);
  if (error) return { error: explain(error) };
  if (data) await deleteUploaded(data.image);
  return done("Foto dihapus.");
}
