import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { sessionClient } from "@/lib/supabase/server";
import { deleteGalleryItem, saveGalleryItem } from "../../actions";
import { AdminForm } from "../../_components/AdminForm";
import { DeleteButton } from "../../_components/DeleteButton";
import { ImageField } from "../../_components/ImageField";
import { Field, Notice, TextArea, TextInput } from "../../_components/fields";

export const metadata: Metadata = { title: "Galeri" };

type Search = { edit?: string; baru?: string; pesan?: string };

export default async function AdminGaleriPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const { edit, baru, pesan } = await searchParams;
  const supabase = await sessionClient();
  const { data } = await supabase
    .from("gallery_items")
    .select("id, title, text, image, image_alt, big, sort")
    .order("sort")
    .order("created_at");
  const items = data ?? [];
  const editing = edit ? items.find((g) => g.id === edit) : undefined;
  const showForm = Boolean(editing || baru);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="h-section">Galeri</h1>
        {!showForm && (
          <Link href="/admin/galeri?baru=1" className="btn btn-primary">
            <Plus size={18} aria-hidden="true" />
            Tambah foto
          </Link>
        )}
      </div>
      <Notice text={pesan} />

      {showForm ? (
        <AdminForm
          key={editing?.id ?? "baru"}
          action={saveGalleryItem}
          title={editing ? `Ubah: ${editing.title}` : "Foto baru"}
          backHref="/admin/galeri"
        >
          <input type="hidden" name="id" value={editing?.id ?? ""} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <ImageField
                folder="galeri"
                label="Foto"
                defaultValue={editing?.image}
              />
              <Field label="Teks alternatif foto">
                <TextInput name="image_alt" defaultValue={editing?.image_alt} />
              </Field>
            </div>
            <div className="space-y-4">
              <Field label="Judul">
                <TextInput
                  name="title"
                  required
                  defaultValue={editing?.title}
                />
              </Field>
              <Field label="Keterangan" hint="Opsional.">
                <TextArea name="text" rows={3} defaultValue={editing?.text} />
              </Field>
              <Field label="Urutan">
                <TextInput
                  name="sort"
                  type="number"
                  defaultValue={editing?.sort ?? items.length}
                />
              </Field>
              <label className="flex min-h-11 items-center gap-3">
                <input
                  type="checkbox"
                  name="big"
                  defaultChecked={editing?.big}
                  className="size-5 accent-teal-700"
                />
                <span className="text-sm">
                  Tampilkan besar (2×2 kolom di layar lebar)
                </span>
              </label>
            </div>
          </div>
        </AdminForm>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((g) => (
            <li key={g.id} className="card overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={g.image}
                  alt=""
                  fill
                  sizes="(min-width:1024px) 360px, (min-width:640px) 45vw, 90vw"
                  className="object-cover"
                />
                {g.big && (
                  <span className="chip bg-yellow text-navy absolute top-2 left-2 text-xs">
                    Besar
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 p-3">
                <span className="min-w-0 flex-1 truncate font-semibold">
                  {g.title}
                </span>
                <Link
                  href={`/admin/galeri?edit=${g.id}`}
                  aria-label={`Ubah ${g.title}`}
                  title="Ubah"
                  className="rounded-btn hover:bg-surface inline-flex min-h-11 min-w-11 items-center justify-center text-teal-700"
                >
                  <Pencil size={18} aria-hidden="true" />
                </Link>
                <DeleteButton
                  action={deleteGalleryItem.bind(null, g.id)}
                  label={`Hapus ${g.title}`}
                  confirmText={`Hapus foto "${g.title}"? Tindakan ini tidak bisa dibatalkan.`}
                />
              </div>
            </li>
          ))}
          {items.length === 0 && (
            <li className="card text-muted p-6 text-center sm:col-span-full">
              Belum ada foto.
            </li>
          )}
        </ul>
      )}
    </>
  );
}
