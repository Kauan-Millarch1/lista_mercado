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
      <header className="rounded-2xl border border-white/15 bg-white/[0.08] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <h1 className="text-3xl font-semibold tracking-tight text-white">Painel</h1>
        <p className="mt-1 text-sm text-white/75">Visao rapida do seu comportamento de compra e gasto atual.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article key={metric.label} className="rounded-2xl border border-white/15 bg-slate-950/55 p-4 text-white shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/60">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold leading-tight text-white">{metric.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
