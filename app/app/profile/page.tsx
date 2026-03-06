import { updateProfileAction } from "@/app/app/actions";
import { FeedbackBanner } from "@/components/ui/feedback-banner";
import { getCurrentUserOrThrow } from "@/lib/data/shopping";

type ProfilePageProps = {
  searchParams?: Promise<{ status?: string; message?: string }>;
};

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const visitor = await getCurrentUserOrThrow();

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Perfil</h1>
        <p className="text-gray-700">Atualize seu nome exibido no sistema.</p>
        <FeedbackBanner status={resolvedSearchParams.status} message={resolvedSearchParams.message} />
      </header>

      <form action={updateProfileAction} className="max-w-lg space-y-4 rounded-lg border border-border bg-white p-6">
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="name">
            Nome
          </label>
          <input
            className="w-full rounded-md border border-border px-3 py-2"
            id="name"
            name="name"
            type="text"
            defaultValue={visitor.display_name}
            minLength={2}
            required
          />
        </div>

        <button className="rounded-md bg-primary px-4 py-2 font-semibold text-white" type="submit">
          Salvar perfil
        </button>
      </form>
    </section>
  );
}
