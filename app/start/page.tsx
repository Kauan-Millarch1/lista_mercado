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
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from("visitors").select("id").eq("id", visitorId).maybeSingle();
    if (data) {
      redirect("/app/dashboard");
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-6 px-6">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold">Bem-vindo ao Lista Mercado</h1>
        <p className="text-gray-700">Para começar, informe seu nome. Nao usamos login e senha.</p>
      </header>

      <FeedbackBanner status={params.status} message={params.message} />

      <form action={startVisitorSessionAction} className="space-y-4 rounded-lg border border-border bg-white p-6">
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="display_name">
            Seu nome
          </label>
          <input
            className="w-full rounded-md border border-border px-3 py-2"
            id="display_name"
            name="display_name"
            type="text"
            placeholder="Ex.: Kauan"
            required
            minLength={2}
          />
        </div>

        <button className="w-full rounded-md bg-primary px-3 py-2 font-semibold text-white" type="submit">
          Entrar
        </button>
      </form>
    </main>
  );
}
