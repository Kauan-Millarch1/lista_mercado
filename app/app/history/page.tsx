import { getCurrentUserOrThrow, getHistoryData } from "@/lib/data/shopping";

export default async function HistoryPage() {
  const user = await getCurrentUserOrThrow();
  const history = (await getHistoryData(user.id)) as Array<{
    id: string;
    title: string;
    finalized_at: string | null;
    items_count: number;
    estimated_total: number;
  }>;

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Historico</h1>
        <p className="text-gray-700">Revise listas finalizadas e estimativas de gasto.</p>
      </header>

      {history.length === 0 ? (
        <article className="rounded-lg border border-border bg-white p-4 text-sm text-gray-700">
          Nenhuma lista finalizada ainda.
        </article>
      ) : (
        <div className="space-y-3">
          {history.map((list) => (
            <article key={list.id} className="rounded-lg border border-border bg-white p-4">
              <h2 className="font-semibold">{list.title}</h2>
              <p className="text-sm text-gray-600">Data: {new Date(list.finalized_at ?? "").toLocaleDateString()}</p>
              <p className="text-sm">
                Itens: {list.items_count} | Total estimado: R$ {list.estimated_total.toFixed(2)}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
