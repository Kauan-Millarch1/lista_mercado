import Link from "next/link";
import type { Route } from "next";

type ButtonProps = {
  label: string;
  href: Route;
};

export function ButtonLink({ label, href }: ButtonProps) {
  return (
    <Link
      className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
      href={href}
    >
      {label}
    </Link>
  );
}
