import type { ReactNode } from "react";
import { type Tone, ui } from "@/content/site";
import { toneStyles } from "@/content/tones";
import { Breadcrumb, type Crumb } from "./Breadcrumb";
export function PageHeader({
  title,
  lead,
  tone = "lavender",
  children,
  crumbs,
}: {
  title: string;
  lead?: string;
  tone?: Tone;
  children?: ReactNode;
  crumbs?: Crumb[];
}) {
  return (
    <section className={toneStyles[tone].tint}>
      <Container className="py-10 sm:py-14">
        <Breadcrumb
          items={crumbs || [{ label: ui.home, href: "/" }, { label: title }]}
        />
        <h1 className="h-page">{title}</h1>
        {lead && <p className="measure text-muted mt-5 text-lg">{lead}</p>}
        {children}
      </Container>
    </section>
  );
}
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
