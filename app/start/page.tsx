import { startVisitorSessionAction } from "@/app/app/actions";
import { FeedbackBanner } from "@/components/ui/feedback-banner";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getVisitorIdFromCookie } from "@/lib/visitor/session";
import { redirect } from "next/navigation";

type StartPageProps = {
  searchParams?: Promise<{ status?: string; message?: string }>;
};

export default async function StartPage({ searchParams }: StartPageProps) {
  const params = searchParams ? await searchParams : {};
  const visitorId = await getVisitorIdFromCookie();

  if (visitorId) {
    try {
      const supabase = await createSupabaseServerClient();
      const { data } = await supabase.from("visitors").select("id").eq("id", visitorId).maybeSingle();
      if (data) {
        redirect("/app/dashboard");
      }
    } catch {
      // Ignore and keep rendering start page to allow a new session.
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(45,212,191,0.24),transparent_28%),radial-gradient(circle_at_85%_80%,rgba(56,189,248,0.16),transparent_30%),linear-gradient(135deg,#060912_0%,#0c1020_45%,#090d19_100%)]" />
      <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />

      <section className="relative w-full max-w-xl space-y-6 text-white">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Lista Mercado</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Bem-vindo ao Lista Mercado</h1>
          <p className="max-w-lg text-sm text-white/65 sm:text-base">Para começar, informe seu nome. Não usamos login e senha.</p>
        </header>

        <FeedbackBanner status={params.status} message={params.message} />

        <form
          action={startVisitorSessionAction}
          className="space-y-5 rounded-2xl border border-white/20 bg-white/[0.09] p-6 shadow-[0_18px_48px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-7"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/85" htmlFor="display_name">
              Seu nome
            </label>
            <input
              className="w-full rounded-xl border border-white/25 bg-black/35 px-4 py-3 text-white outline-none transition-all placeholder:text-white/45 focus-visible:border-emerald-300/70 focus-visible:ring-2 focus-visible:ring-emerald-300/35"
              id="display_name"
              name="display_name"
              type="text"
              placeholder="Ex.: Kauan"
              required
              minLength={2}
            />
          </div>

          <button
            className="w-full rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 px-4 py-3 text-base font-semibold text-slate-950 transition-all hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50"
            type="submit"
          >
            Entrar
          </button>
        </form>
      </section>
    </main>
  );
}
