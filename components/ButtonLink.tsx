import Link from "next/link";
import type { ReactNode } from "react";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
}) {
  const classes = `button-link button-${variant} ${className}`;
  const content = <>{children}<span aria-hidden="true">↗</span></>;

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return <a className={classes} href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">{content}</a>;
  }

  return <Link className={classes} href={href}>{content}</Link>;
}
