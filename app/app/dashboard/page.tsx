import { getCurrentUserOrThrow, getDashboardData } from "@/lib/data/shopping";

export default async function DashboardPage() {
  const user = await getCurrentUserOrThrow();
  const dashboard = await getDashboardData(user.id);

  const metrics = [
    { label: "Items in active list", value: String(dashboard.active_items_count) },
    { label: "Estimated total", value: `$${dashboard.active_estimated_total.toFixed(2)}` },
    { label: "Shopping frequency", value: `${dashboard.shopping_frequency} finalized lists` },
    { label: "Most purchased product", value: dashboard.top_product_label }
  ];

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-foreground/80">Quick overview of your current shopping activity.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <article key={metric.label} className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-foreground/70">{metric.label}</p>
            <p className="text-xl font-bold">{metric.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
