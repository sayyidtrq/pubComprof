import type { ComponentProps, ReactNode } from "react";
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
      <Container className="hero-in py-6 sm:py-8 lg:py-10">
        <Breadcrumb
          items={crumbs || [{ label: ui.home, href: "/" }, { label: title }]}
        />
        <h1 className="h-page">{title}</h1>
        {lead && <p className="measure text-muted mt-3 text-lg">{lead}</p>}
        {children}
      </Container>
    </section>
  );
}
export function Container({
  children,
  className = "",
  ...rest
}: ComponentProps<"div"> & {
  children: ReactNode;
  "data-reveal"?: boolean | "left" | "right" | "zoom";
  "data-reveal-group"?: boolean;
}) {
  return (
    <div
      {...rest}
      className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
