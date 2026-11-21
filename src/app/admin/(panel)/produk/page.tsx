import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Pencil, Plus } from "lucide-react";
import { sessionClient } from "@/lib/supabase/server";
import { deleteProduct, saveProduct } from "../../actions";
import { AdminForm } from "../../_components/AdminForm";
import { DeleteButton } from "../../_components/DeleteButton";
import { ImageField } from "../../_components/ImageField";
import {
  Field,
  Notice,
  Select,
  TextArea,
  TextInput,
} from "../../_components/fields";

export const metadata: Metadata = { title: "Produk" };

type Search = {
  edit?: string;
  baru?: string;
  kategori?: string;
  pesan?: string;
};

export default async function AdminProdukPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const { edit, baru, kategori, pesan } = await searchParams;
  const supabase = await sessionClient();
  const [{ data: categories }, { data: products }] = await Promise.all([
    supabase.from("categories").select("id, slug, name").order("sort"),
    supabase
      .from("products")
      .select(
        "id, slug, code, name, description, image, image_alt, sort, category_id",
      )
      .order("sort")
      .order("name"),
  ]);
  const cats = categories ?? [];
  const catById = new Map(cats.map((c) => [c.id, c]));
  const catOrder = new Map(cats.map((c, i) => [c.id, i]));
  // Same order as the public catalog: category order first, then product order.
  const list = (products ?? [])
    .filter((p) => !kategori || catById.get(p.category_id)?.slug === kategori)
    .toSorted(
      (a, b) =>
        (catOrder.get(a.category_id) ?? 0) - (catOrder.get(b.category_id) ?? 0),
    );
  const editing = edit ? products?.find((p) => p.id === edit) : undefined;
  const showForm = Boolean(editing || baru);
  const defaultCategory =
    editing?.category_id ?? cats.find((c) => c.slug === kategori)?.id;

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="h-section">Produk</h1>
        {!showForm && (
          <Link href="/admin/produk?baru=1" className="btn btn-primary">
            <Plus size={18} aria-hidden="true" />
            Tambah produk
          </Link>
        )}
      </div>
      <Notice text={pesan} />

      {showForm ? (
        <AdminForm
          key={editing?.id ?? "baru"}
          action={saveProduct}
          title={editing ? `Ubah: ${editing.name}` : "Produk baru"}
          backHref="/admin/produk"
        >
          <input type="hidden" name="id" value={editing?.id ?? ""} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <Field label="Nama produk">
                <TextInput name="name" required defaultValue={editing?.name} />
              </Field>
              <Field label="Kategori">
                <Select
                  name="category_id"
                  required
                  defaultValue={defaultCategory ?? ""}
                >
                  <option value="" disabled>
                    Pilih kategori
                  </option>
                  {cats.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Slug URL"
                  hint="Kosongkan untuk dibuat dari nama."
                >
                  <TextInput name="slug" defaultValue={editing?.slug} />
                </Field>
                <Field label="Kode produk" hint="Opsional, misal SKU.">
                  <TextInput name="code" defaultValue={editing?.code} />
                </Field>
              </div>
              <Field label="Deskripsi" hint="Tampil di halaman detail produk.">
                <TextArea
                  name="description"
                  defaultValue={editing?.description}
                />
              </Field>
            </div>
            <div className="space-y-4">
              <ImageField folder="produk" defaultValue={editing?.image} />
              <Field
                label="Teks alternatif gambar"
                hint="Deskripsi singkat isi foto untuk pembaca layar."
              >
                <TextInput name="image_alt" defaultValue={editing?.image_alt} />
              </Field>
              <Field label="Urutan" hint="Angka kecil tampil lebih dulu.">
                <TextInput
                  name="sort"
                  type="number"
                  defaultValue={editing?.sort ?? list.length}
                />
              </Field>
            </div>
          </div>
        </AdminForm>
      ) : (
        <>
          <nav
            aria-label="Saring kategori"
            className="mb-4 flex flex-wrap gap-2"
          >
            <FilterChip href="/admin/produk" active={!kategori}>
              Semua ({products?.length ?? 0})
            </FilterChip>
            {cats.map((c) => (
              <FilterChip
                key={c.id}
                href={`/admin/produk?kategori=${c.slug}`}
                active={kategori === c.slug}
              >
                {c.name}
              </FilterChip>
            ))}
          </nav>
          <ul className="card divide-line divide-y">
            {list.map((p) => {
              const cat = catById.get(p.category_id);
              return (
                <li key={p.id} className="flex items-center gap-3 p-3 sm:gap-4">
                  <span className="bg-surface relative size-14 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-contain"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">
                      {p.name}
                    </span>
                    <span className="text-muted block truncate text-sm">
                      {cat?.name}
                      {p.code && ` · ${p.code}`}
                    </span>
                  </span>
                  {cat && (
                    <Link
                      href={`/produk-layanan/${cat.slug}/${p.slug}`}
                      target="_blank"
                      aria-label={`Lihat ${p.name} di situs`}
                      title="Lihat di situs"
                      className="rounded-btn hover:bg-surface hidden min-h-11 min-w-11 items-center justify-center sm:inline-flex"
                    >
                      <ExternalLink size={18} aria-hidden="true" />
                    </Link>
                  )}
                  <Link
                    href={`/admin/produk?edit=${p.id}`}
                    aria-label={`Ubah ${p.name}`}
                    title="Ubah"
                    className="rounded-btn hover:bg-surface inline-flex min-h-11 min-w-11 items-center justify-center text-teal-700"
                  >
                    <Pencil size={18} aria-hidden="true" />
                  </Link>
                  <DeleteButton
                    action={deleteProduct.bind(null, p.id)}
                    label={`Hapus ${p.name}`}
                    confirmText={`Hapus produk "${p.name}"? Tindakan ini tidak bisa dibatalkan.`}
                  />
                </li>
              );
            })}
            {list.length === 0 && (
              <li className="text-muted p-6 text-center">Belum ada produk.</li>
            )}
          </ul>
        </>
      )}
    </>
  );
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className="chip border-line aria-[current]:bg-navy min-h-11 border bg-white aria-[current]:border-transparent aria-[current]:text-white"
    >
      {children}
    </Link>
  );
}
