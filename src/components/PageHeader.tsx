import type { ReactNode } from "react";
import type { Tone } from "@/content/site";

export function PageHeader({
  title,
  lead,
  tone = "teal",
  children,
}: {
  title: string;
  lead?: string;
  tone?: Tone;
  children?: ReactNode;
}) {
  return (
    <section
      className={
        {
          teal: "bg-teal-50",
          navy: "bg-navy-50",
          lavender: "bg-lavender-50",
          yellow: "bg-yellow-50",
        }[tone]
      }
    >
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-12 sm:px-6 sm:pt-20 sm:pb-16 lg:px-8">
        <h1 className="h-page text-[clamp(2.75rem,8vw,6rem)]">{title}</h1>
        {lead && <p className="measure mt-5 text-lg sm:text-xl">{lead}</p>}
        {children}
      </div>
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
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
