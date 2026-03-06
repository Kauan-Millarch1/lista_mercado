import { getCurrentUserOrThrow, getDashboardData } from "@/lib/data/shopping";

export default async function DashboardPage() {
  const user = await getCurrentUserOrThrow();
  const dashboard = await getDashboardData(user.id);

  const metrics = [
    { label: "Itens na lista ativa", value: String(dashboard.active_items_count) },
    { label: "Total estimado", value: `R$ ${dashboard.active_estimated_total.toFixed(2)}` },
    { label: "Frequencia de compras", value: `${dashboard.shopping_frequency} listas finalizadas` },
    { label: "Produto mais comprado", value: dashboard.top_product_label }
  ];

  return (
    <section className="space-y-6">
      <header className="surface-card bg-gradient-to-br from-card via-card to-muted/35 p-5">
        <h1 className="text-3xl font-semibold tracking-tight">Painel</h1>
        <p className="mt-1 text-sm text-foreground/70">Visao rapida do seu comportamento de compra e gasto atual.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article key={metric.label} className="surface-card surface-card-hover p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground/60">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold leading-tight">{metric.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
