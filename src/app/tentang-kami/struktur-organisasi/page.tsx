import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/PageHeader";
import { orgChart } from "@/content/site";

export const metadata: Metadata = { title: "Struktur Organisasi" };

const box = "border-2 border-navy bg-white px-6 py-3 text-center label text-xl";

export default function StrukturPage() {
  return (
    <>
      <PageHeader
        title="Struktur Organisasi"
        lead="Garis tanggung jawab di PT Pangudi Utama Berjaya."
        tone="lavender"
      />
      <section className="py-14 sm:py-20">
        <Container>
          <figure>
            <div
              className="mx-auto flex max-w-3xl flex-col items-center"
              role="img"
              aria-label="Bagan: Komisaris membawahi Direktur Utama, yang membawahi Finance, Operasional, dan GM."
            >
              <div className={`${box} tone-lavender`}>{orgChart.top}</div>
              <span className="bg-navy h-8 w-0.5" aria-hidden="true" />
              <div className={box}>{orgChart.second}</div>
              <span className="bg-navy h-8 w-0.5" aria-hidden="true" />
              <div className="relative grid w-full grid-cols-3 gap-3 pt-8 sm:gap-6">
                <span
                  className="bg-navy absolute top-0 right-[16.6%] left-[16.6%] h-0.5"
                  aria-hidden="true"
                />
                {orgChart.third.map((t) => (
                  <div key={t} className="relative">
                    <span
                      className="bg-navy absolute -top-8 left-1/2 h-8 w-0.5"
                      aria-hidden="true"
                    />
                    <div className={`${box} !px-2 !text-base sm:!text-xl`}>
                      {t}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <figcaption className="text-navy-soft mx-auto mt-10 max-w-3xl text-center text-sm">
              [PLACEHOLDER: nama pejabat belum tersedia di company profile]
            </figcaption>
          </figure>
        </Container>
      </section>
    </>
  );
}
