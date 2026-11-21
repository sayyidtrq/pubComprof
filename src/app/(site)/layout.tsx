import { ViewTransition } from "react";
import { FloatingContact } from "@/components/FloatingContact";
import { Footer } from "@/components/Footer";
import { Motion } from "@/components/Motion";
import { Nav } from "@/components/Nav";
import { ui } from "@/content/site";
import "lenis/dist/lenis.css";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <a
        href="#isi"
        className="bg-yellow text-navy sr-only z-50 px-4 py-2 font-semibold focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        {ui.skip}
      </a>
      <Nav />
      <main id="isi" className="flex-1">
        <ViewTransition default="page">{children}</ViewTransition>
      </main>
      <Footer />
      <FloatingContact />
      <Motion />
    </>
  );
}
