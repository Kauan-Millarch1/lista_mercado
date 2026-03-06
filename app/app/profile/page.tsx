import { updateProfileAction } from "@/app/app/actions";
import { FeedbackBanner } from "@/components/ui/feedback-banner";
import { getCurrentUserOrThrow } from "@/lib/data/shopping";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type ProfilePageProps = {
  searchParams?: Promise<{ status?: string; message?: string }>;
};

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const user = await getCurrentUserOrThrow();
  const supabase = await createSupabaseServerClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  const defaultName = profile?.name ?? (user.user_metadata?.name as string | undefined) ?? "";
  const defaultAvatarUrl = profile?.avatar_url ?? "";

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-gray-700">Update your profile data used by the app.</p>
        <FeedbackBanner status={resolvedSearchParams.status} message={resolvedSearchParams.message} />
      </header>

      <form action={updateProfileAction} className="max-w-lg space-y-4 rounded-lg border border-border bg-white p-6">
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="name">
            Name
          </label>
          <input
            className="w-full rounded-md border border-border px-3 py-2"
            id="name"
            name="name"
            type="text"
            defaultValue={defaultName}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="avatar_url">
            Avatar URL
          </label>
          <input
            className="w-full rounded-md border border-border px-3 py-2"
            id="avatar_url"
            name="avatar_url"
            type="url"
            defaultValue={defaultAvatarUrl}
            placeholder="https://..."
          />
        </div>

        <button className="rounded-md bg-primary px-4 py-2 font-semibold text-white" type="submit">
          Save profile
        </button>
      </form>
    </section>
  );
}
