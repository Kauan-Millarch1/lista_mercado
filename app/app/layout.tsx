import Link from "next/link";
import { redirect } from "next/navigation";
import { clearVisitorSessionAction } from "@/app/app/actions";
import { getCurrentUserOrThrow } from "@/lib/data/shopping";

export const dynamic = "force-dynamic";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
  let visitor;

  try {
    visitor = await getCurrentUserOrThrow();
  } catch {
    redirect("/start");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white">
        <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-6 py-4 text-sm font-semibold">
          <Link href="/app/dashboard">Painel</Link>
          <Link href="/app/catalog">Catalogo</Link>
          <Link href="/app/list">Lista Ativa</Link>
          <Link href="/app/history">Historico</Link>
          <Link href="/app/profile">Perfil</Link>
          <span className="ml-auto text-xs text-gray-500">{visitor.display_name}</span>
          <form action={clearVisitorSessionAction}>
            <button className="rounded-md border border-border px-3 py-1" type="submit">
              Trocar nome
            </button>
          </form>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
