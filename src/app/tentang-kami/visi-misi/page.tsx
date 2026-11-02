import type { Metadata } from "next";
import { Container } from "@/components/PageHeader";
import { missions, vision } from "@/content/site";

export const metadata: Metadata = { title: "Visi & Misi" };

export default function VisiMisiPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <Container className="py-14 sm:py-20">
          <h1 className="label text-yellow text-2xl">Visi</h1>
          <p className="display mt-4 max-w-5xl text-[clamp(2rem,5vw,4rem)] !leading-[1.05] !font-bold">
            {vision.text}
          </p>
          <p className="mt-10 max-w-xl border-t border-white/25 pt-5 text-lg text-white/80 italic">
            {vision.quote}
          </p>
        </Container>
      </section>
      <section className="py-14 sm:py-20">
        <Container>
          <h2 className="heading text-4xl sm:text-5xl">
            Misi: empat komitmen yang kami jalankan setiap hari
          </h2>
          <ol className="bg-rule mt-10 grid gap-px sm:grid-cols-2">
            {missions.map((m, i) => (
              <li
                key={m.title}
                className={`p-6 sm:p-8 ${["tone-teal", "tone-yellow", "tone-lavender", "tone-blue"][i]}`}
              >
                <p
                  className="label text-5xl leading-none opacity-70"
                  aria-hidden="true"
                >
                  {i + 1}
                </p>
                <h3 className="heading mt-4 text-2xl">{m.title}</h3>
                <p className="mt-2">{m.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
