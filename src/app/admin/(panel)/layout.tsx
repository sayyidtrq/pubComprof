import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { ExternalLink, LogOut } from "lucide-react";
import { r2Configured } from "@/lib/r2";
import { getAdmin } from "@/lib/supabase/server";
import { signOut } from "../actions";
import { AdminNav } from "../_components/AdminNav";

export default function PanelLayout({ children }: LayoutProps<"/admin">) {
  return (
    <Suspense fallback={<div className="flex-1" aria-busy="true" />}>
      <Shell>{children}</Shell>
    </Suspense>
  );
}

async function Shell({ children }: { children: React.ReactNode }) {
  // The admin panel is always per-request; never prerender the session check.
  await connection();
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <>
      <header className="bg-home-dark text-white">
        <div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-2 sm:px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <Image
              src="/images/brand/logo.webp"
              alt=""
              width={502}
              height={413}
              className="h-9 w-auto rounded bg-white p-0.5"
            />
            <span className="font-heading text-sm font-bold">Admin</span>
          </Link>
          <AdminNav />
          <div className="ml-auto flex items-center gap-1 text-sm">
            <span className="hidden text-white/70 md:inline">
              {admin.user.email}
            </span>
            <Link
              href="/"
              target="_blank"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 hover:bg-white/10"
            >
              <ExternalLink size={16} aria-hidden="true" />
              Lihat situs
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 hover:bg-white/10"
              >
                <LogOut size={16} aria-hidden="true" />
                Keluar
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        {!r2Configured && (
          <p
            role="status"
            className="mb-6 rounded-lg bg-yellow-50 px-4 py-3 text-sm"
          >
            Penyimpanan gambar (Cloudflare R2) belum dikonfigurasi, jadi unggah
            gambar belum bisa dipakai. Isi variabel <code>R2_*</code> sesuai
            README.
          </p>
        )}
        {children}
      </main>
    </>
  );
}
