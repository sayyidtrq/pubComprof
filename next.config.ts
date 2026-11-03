import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
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
