import { ButtonLink } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center gap-8 px-6 py-16">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Phase 3 bootstrap</p>
        <h1 className="text-4xl font-bold">Smart Grocery Shopping List</h1>
        <p className="max-w-2xl text-base text-gray-700">
          Project skeleton initialized for MVP delivery. Use the links below to access auth and app routes.
        </p>
      </header>

      <section className="flex flex-wrap gap-3">
        <ButtonLink label="Login" href="/login" />
        <ButtonLink label="Sign Up" href="/signup" />
        <ButtonLink label="Forgot Password" href="/forgot-password" />
        <ButtonLink label="Catalog" href="/app/catalog" />
        <ButtonLink label="Active List" href="/app/list" />
        <ButtonLink label="History" href="/app/history" />
        <ButtonLink label="Dashboard" href="/app/dashboard" />
      </section>
    </main>
  );
}
