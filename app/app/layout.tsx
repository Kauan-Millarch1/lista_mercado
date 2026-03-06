import Link from "next/link";
import { redirect } from "next/navigation";
import { clearVisitorSessionAction } from "@/app/app/actions";
import { getCurrentUserOrThrow } from "@/lib/data/shopping";

export const dynamic = "force-dynamic";

type AppLayoutProps = {
  children: React.ReactNode;
};

const navItems = [
  { href: "/app/dashboard", label: "Painel" },
  { href: "/app/catalog", label: "Catalogo" },
  { href: "/app/list", label: "Lista Ativa" },
  { href: "/app/history", label: "Historico" },
  { href: "/app/profile", label: "Perfil" }
] as const;

export default async function AppLayout({ children }: AppLayoutProps) {
  let visitor;

  try {
    visitor = await getCurrentUserOrThrow();
  } catch {
    redirect("/start");
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_10%_0%,rgba(45,212,191,0.16),transparent_28%),radial-gradient(circle_at_100%_100%,rgba(56,189,248,0.14),transparent_26%),linear-gradient(140deg,#070b16_0%,#0b1120_48%,#090d1a_100%)] text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/65 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-6 py-3 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white/75 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <span className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-white/85">
              {visitor.display_name}
            </span>
            <form action={clearVisitorSessionAction}>
              <button
                className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white/90 transition-colors hover:bg-white/12"
                type="submit"
              >
                Trocar nome
              </button>
            </form>
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
