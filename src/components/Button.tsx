import Link from "next/link";
import type { ReactNode } from "react";
export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "navy";
  icon?: ReactNode;
  className?: string;
}) {
  const classes = `btn ${{ primary: "btn-primary", secondary: "btn-secondary", navy: "btn-navy" }[variant]} ${className}`;
  return href.startsWith("/") ? (
    <Link href={href} className={classes}>
      {icon}
      {children}
    </Link>
  ) : (
    <a href={href} className={classes}>
      {icon}
      {children}
    </a>
  );
}
