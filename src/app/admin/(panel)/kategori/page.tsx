import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { toneStyles } from "@/content/tones";
import type { Tone } from "@/content/site";
import { sessionClient } from "@/lib/supabase/server";
import { deleteCategory, saveCategory } from "../../actions";
import { AdminForm } from "../../_components/AdminForm";
import { DeleteButton } from "../../_components/DeleteButton";
import { ImageField } from "../../_components/ImageField";
import { Field, Notice, Select, TextInput } from "../../_components/fields";

export const metadata: Metadata = { title: "Kategori" };

const TONES: { value: Tone; label: string }[] = [
  { value: "teal", label: "Teal" },
  { value: "navy", label: "Navy" },
  { value: "lavender", label: "Lavender" },
  { value: "yellow", label: "Kuning" },
];

type Search = { edit?: string; baru?: string; pesan?: string };

export default async function AdminKategoriPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const { edit, baru, pesan } = await searchParams;
  const supabase = await sessionClient();
  const { data } = await supabase
    .from("categories")
    .select(
      "id, slug, code, name, tone, items, image, image_alt, sort, products(count)",
    )
    .order("sort");
  const categories = (data ?? []).map((c) => ({
    ...c,
    tone: c.tone as Tone,
    count: (c.products as unknown as { count: number }[])[0]?.count ?? 0,
  }));
  const editing = edit ? categories.find((c) => c.id === edit) : undefined;
  const showForm = Boolean(editing || baru);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="h-section">Kategori</h1>
        {!showForm && (
          <Link href="/admin/kategori?baru=1" className="btn btn-primary">
            <Plus size={18} aria-hidden="true" />
            Tambah kategori
          </Link>
        )}
      </div>
      <Notice text={pesan} />

      {showForm ? (
        <AdminForm
          key={editing?.id ?? "baru"}
          action={saveCategory}
          title={editing ? `Ubah: ${editing.name}` : "Kategori baru"}
          backHref="/admin/kategori"
        >
          <input type="hidden" name="id" value={editing?.id ?? ""} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <Field label="Nama kategori">
                <TextInput name="name" required defaultValue={editing?.name} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Slug URL"
                  hint="Mengubahnya akan mengubah alamat halaman."
                >
                  <TextInput name="slug" defaultValue={editing?.slug} />
                </Field>
                <Field label="Kode" hint="Opsional, misal A.">
                  <TextInput name="code" defaultValue={editing?.code} />
                </Field>
              </div>
              <Field
                label="Contoh barang"
                hint="Tampil di bawah nama kategori."
              >
                <TextInput name="items" defaultValue={editing?.items} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Warna aksen">
                  <Select name="tone" defaultValue={editing?.tone ?? "teal"}>
                    {TONES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Urutan">
                  <TextInput
                    name="sort"
                    type="number"
                    defaultValue={editing?.sort ?? categories.length}
                  />
                </Field>
              </div>
            </div>
            <div className="space-y-4">
              <ImageField
                folder="kategori"
                label="Foto sampul"
                defaultValue={editing?.image}
              />
              <Field label="Teks alternatif foto">
                <TextInput name="image_alt" defaultValue={editing?.image_alt} />
              </Field>
            </div>
          </div>
        </AdminForm>
      ) : (
        <ul className="card divide-line divide-y">
          {categories.map((c) => (
            <li key={c.id} className="flex items-center gap-3 p-3 sm:gap-4">
              <span className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </span>
              <span
                aria-hidden="true"
                className={`h-8 w-1.5 shrink-0 rounded-full ${toneStyles[c.tone].accent}`}
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold">{c.name}</span>
                <span className="text-muted block truncate text-sm">
                  /{c.slug} · {c.count} produk
                </span>
              </span>
              <Link
                href={`/admin/kategori?edit=${c.id}`}
                aria-label={`Ubah ${c.name}`}
                title="Ubah"
                className="rounded-btn hover:bg-surface inline-flex min-h-11 min-w-11 items-center justify-center text-teal-700"
              >
                <Pencil size={18} aria-hidden="true" />
              </Link>
              <DeleteButton
                action={deleteCategory.bind(null, c.id)}
                label={`Hapus ${c.name}`}
                confirmText={`Hapus kategori "${c.name}" beserta ${c.count} produk di dalamnya? Tindakan ini tidak bisa dibatalkan.`}
              />
            </li>
          ))}
          {categories.length === 0 && (
            <li className="text-muted p-6 text-center">Belum ada kategori.</li>
          )}
        </ul>
      )}
    </>
  );
}
