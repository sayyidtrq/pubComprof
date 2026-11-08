import { ChevronDown } from "lucide-react";
import { faqs, ui } from "@/content/site";
import { Container } from "./PageHeader";
import { SectionHeading } from "./SectionHeading";
export function Faq() {
  return (
    <section className="section">
      <Container className="max-w-4xl">
        <SectionHeading title={ui.faq} />
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="card group">
              <summary className="font-heading flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown
                  size={20}
                  aria-hidden="true"
                  className="shrink-0 transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="measure text-muted px-5 pb-5">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
