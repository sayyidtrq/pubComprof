import { Phone } from "lucide-react";
import { site, contactCopy, ui } from "@/content/site";
import { ButtonLink } from "./Button";
import { Container } from "./PageHeader";
export function CtaBand() {
  return (
    <section className="bg-navy py-12 text-white sm:py-16">
      <Container className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <h2 className="h-section">{ui.cta}</h2>
          <p className="measure mt-4">{contactCopy.lead}</p>
        </div>
        <ButtonLink
          href={site.contact.phoneHref}
          icon={<Phone size={20} aria-hidden="true" />}
        >
          {ui.contact}
        </ButtonLink>
      </Container>
    </section>
  );
}
