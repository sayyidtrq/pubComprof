import { site } from "@/content/site";

// Temporary page until the design and build phases (BRIEF.md) replace it.
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-4 px-4 py-16">
      <p className="text-sm tracking-wide uppercase">{site.name}</p>
      <h1 className="text-4xl font-semibold">{site.tagline}</h1>
      <p className="text-lg">{site.description}</p>
      <p className="text-sm">
        Situs sedang dibangun. Hubungi kami di{" "}
        <a className="underline" href={site.contact.phoneHref}>
          {site.contact.phone}
        </a>
        .
      </p>
    </main>
  );
}
