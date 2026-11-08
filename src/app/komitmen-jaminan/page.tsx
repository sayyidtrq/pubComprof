import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/PageHeader";
import { commitments, delivery } from "@/content/site";

export const metadata: Metadata = { title: "Komitmen & Jaminan Layanan" };

export default function KomitmenPage() {
  return (
    <>
      <PageHeader
        title="Komitmen & Jaminan Layanan"
        lead="PT Pangudi Utama Berjaya berkomitmen untuk selalu memberikan yang terbaik bagi seluruh pelanggan."
        tone="teal"
      />
      <section className="py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="h-section text-4xl">Komitmen kami</h2>
            <ol className="divide-line border-line mt-6 divide-y border-y">
              {commitments.map((c, i) => (
                <li key={c} className="grid grid-cols-[2.5rem_1fr] gap-3 py-4">
                  <span
                    className="font-heading text-3xl leading-none text-teal-700"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-navy self-start p-8 text-white sm:p-10">
            <h2 className="h-section text-4xl">{delivery.title}</h2>
            <p className="mt-4 text-lg">{delivery.lead}</p>
            <ol className="mt-5 list-decimal space-y-2 pl-6">
              {delivery.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
            <p className="mt-6 border-t border-white/30 pt-5 font-semibold">
              {delivery.closing}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
