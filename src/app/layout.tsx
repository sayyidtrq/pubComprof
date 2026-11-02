import type { Metadata } from "next";
import { Archivo, Hanken_Grotesk } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { site } from "@/content/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pub-comprof.vercel.app"),
  title: {
    default: `${site.name}: ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${archivo.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#isi"
          className="bg-yellow text-navy sr-only z-50 px-4 py-2 font-semibold focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Lompat ke konten
        </a>
        <Nav />
        <main id="isi" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
