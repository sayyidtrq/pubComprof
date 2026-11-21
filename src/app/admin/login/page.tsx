import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/content/site";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Masuk" };

export default function LoginPage() {
  return (
    <main className="grid flex-1 place-items-center px-4 py-16">
      <div className="card w-full max-w-sm p-6 sm:p-8">
        <Image
          src="/images/brand/logo.webp"
          alt={site.name}
          width={502}
          height={413}
          className="h-14 w-auto"
          preload
        />
        <h1 className="h-card mt-5">Masuk ke panel admin</h1>
        <p className="text-muted mt-1 text-sm">
          Kelola produk, kategori, dan galeri {site.name}.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
