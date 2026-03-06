import Link from "next/link";
import { redirect } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type AppLayoutProps = {
  children: React.ReactNode;
};

async function signOut() {
  "use server";

  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-6 py-4 text-sm font-semibold">
          <Link href="/app/catalog">Catalog</Link>
          <Link href="/app/list">Active List</Link>
          <Link href="/app/dashboard">Dashboard</Link>
          <Link href="/app/history">History</Link>
          <Link href="/app/profile">Profile</Link>
          <ThemeToggle />
          <form action={signOut} className="ml-auto">
            <button className="rounded-md border border-border px-3 py-1" type="submit">
              Sign out
            </button>
          </form>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}