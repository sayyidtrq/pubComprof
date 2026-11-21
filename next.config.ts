import type { NextConfig } from "next";

const r2PublicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    // Admin uploads are served from the public R2 bucket.
    remotePatterns: r2PublicUrl ? [new URL(`${r2PublicUrl}/**`)] : [],
  },
  partialPrefetching: true,
  async redirects() {
    return [
      {
        source: "/tentang-kami/profil",
        destination: "/tentang-kami#profil",
        permanent: true,
      },
      {
        source: "/tentang-kami/visi-misi",
        destination: "/tentang-kami#visi-misi",
        permanent: true,
      },
      {
        source: "/komitmen-jaminan",
        destination: "/tentang-kami#komitmen-jaminan",
        permanent: true,
      },
      {
        source: "/tentang-kami/struktur-organisasi",
        destination: "/tentang-kami#struktur-organisasi",
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
