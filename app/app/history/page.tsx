import { getCurrentUserOrThrow, getHistoryData } from "@/lib/data/shopping";

export default async function HistoryPage() {
  const user = await getCurrentUserOrThrow();
  const history = await getHistoryData(user.id);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">History</h1>
        <p className="text-gray-700">Review finalized shopping lists and spending estimates.</p>
      </header>

      {history.length === 0 ? (
        <article className="rounded-lg border border-border bg-white p-4 text-sm text-gray-700">
          No finalized lists yet.
        </article>
      ) : (
        <div className="space-y-3">
          {history.map((list) => (
            <article key={list.id} className="rounded-lg border border-border bg-white p-4">
              <h2 className="font-semibold">{list.title}</h2>
              <p className="text-sm text-gray-600">Date: {new Date(list.finalized_at ?? "").toLocaleDateString()}</p>
              <p className="text-sm">
                Items: {list.items_count} | Estimated total: ${list.estimated_total.toFixed(2)}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
