import type { Metadata } from "next";
import { CircleCheck, Package, Truck, MapPin, Clock } from "lucide-react";
import { Container, PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { commitments, delivery, ui } from "@/content/site";
export const metadata: Metadata = { title: ui.commitment };
const icons = [Package, Truck, MapPin, Clock];
export default function KomitmenPage() {
  return (
    <>
      <PageHeader title={ui.commitment} lead={ui.commitmentLead} tone="teal" />
      <section className="section">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="h-section">{ui.commitments}</h2>
            <ul className="mt-7 space-y-4">
              {commitments.map((c) => (
                <li key={c} className="card flex gap-4 p-5">
                  <CircleCheck
                    size={24}
                    className="shrink-0 text-teal-700"
                    aria-hidden="true"
                  />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card bg-navy self-start p-6 text-white sm:p-9">
            <h2 className="h-section">{delivery.title}</h2>
            <p className="mt-5">{delivery.lead}</p>
            <ul className="mt-6 space-y-6">
              {delivery.points.map((p, i) => {
                const Icon = icons[i];
                return (
                  <li key={p} className="flex gap-4">
                    <Icon
                      size={24}
                      className="text-yellow shrink-0"
                      aria-hidden="true"
                    />
                    <span>{p}</span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-8 border-t border-white/20 pt-6">
              {delivery.closing}
            </p>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
