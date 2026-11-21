"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImageUp, LoaderCircle } from "lucide-react";
import { createUploadUrl, discardUpload } from "../actions";

const MAX_EDGE = 1600;

/** Downscales and re-encodes to WebP in the browser so R2 stores small files. */
async function toWebp(file: File): Promise<Blob> {
  if (file.type === "image/svg+xml") throw new Error("SVG tidak didukung.");
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/webp", 0.82),
  );
  return blob ?? file;
}

export function ImageField({
  folder,
  defaultValue = "",
  label = "Gambar",
}: {
  folder: "produk" | "kategori" | "galeri";
  defaultValue?: string;
  label?: string;
}) {
  const [src, setSrc] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  // Uploads made in this form session that have not been saved yet.
  const fresh = useRef<string | null>(null);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const blob = await toWebp(file);
      const res = await createUploadUrl({
        folder,
        contentType: blob.type || file.type,
        size: blob.size,
      });
      if ("error" in res) throw new Error(res.error);
      const put = await fetch(res.uploadUrl, {
        method: "PUT",
        body: blob,
        headers: { "content-type": blob.type || file.type },
      });
      if (!put.ok) throw new Error(`Unggah gagal (${put.status}).`);
      if (fresh.current) void discardUpload(fresh.current);
      fresh.current = res.publicUrl;
      setSrc(res.publicUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unggah gagal.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <span className="admin-label">{label}</span>
      <input type="hidden" name="image" value={src} />
      <input type="hidden" name="previous_image" value={defaultValue} />
      <label className="border-line mt-1.5 flex cursor-pointer items-center gap-4 rounded-xl border border-dashed bg-white p-3 transition-colors hover:border-teal-700">
        <span className="bg-surface relative grid size-24 shrink-0 place-items-center overflow-hidden rounded-lg">
          {src ? (
            <Image
              src={src}
              alt=""
              fill
              sizes="96px"
              className="object-contain"
            />
          ) : (
            <ImageUp className="text-muted" aria-hidden="true" />
          )}
          {busy && (
            <span className="absolute inset-0 grid place-items-center bg-white/70">
              <LoaderCircle className="animate-spin" aria-hidden="true" />
            </span>
          )}
        </span>
        <span className="text-sm">
          <span className="font-semibold text-teal-700">
            {src ? "Ganti gambar" : "Pilih gambar"}
          </span>
          <span className="text-muted block">
            JPG, PNG, atau WebP. Otomatis dikecilkan ke WebP.
          </span>
        </span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          disabled={busy}
          onChange={(e) => onFile(e.target.files?.[0])}
        />
      </label>
      {error && (
        <p role="alert" className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
