import Link from "next/link";
import { addProductToActiveList } from "@/app/app/actions";
import { FeedbackBanner } from "@/components/ui/feedback-banner";
import { getCatalogData, getCurrentUserOrThrow, getOrCreateActiveList, getUserActiveLists } from "@/lib/data/shopping";

type CatalogPageProps = {
  searchParams?: Promise<{ listId?: string; status?: string; message?: string }>;
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const requestedListId = resolvedSearchParams.listId;
  const status = resolvedSearchParams.status;
  const message = resolvedSearchParams.message;
  const visitor = await getCurrentUserOrThrow();
  const { categories, products } = await getCatalogData();
  const activeLists = await getUserActiveLists(visitor.id);
  const fallbackList = await getOrCreateActiveList(visitor.id);
  const selectedListId = activeLists.some((list) => list.id === requestedListId) ? requestedListId : fallbackList.id;

  return (
    <section className="space-y-8">
      <header className="space-y-4">
        <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <h1 className="text-4xl font-semibold tracking-tight text-white">Catalogo</h1>
          <p className="mt-2 text-sm text-white/75">
            Navegue pelos produtos por categoria e adicione na lista ativa selecionada.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {activeLists.map((list) => {
              const isSelected = list.id === selectedListId;
              return (
                <Link
                  key={list.id}
                  href={`/app/catalog?listId=${list.id}`}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                    isSelected
                      ? "border-emerald-300/80 bg-emerald-400 text-slate-950"
                      : "border-white/20 bg-white/8 text-white/85 hover:bg-white/14"
                  }`}
                >
                  {list.title}
                </Link>
              );
            })}
          </div>
        </div>

        <FeedbackBanner status={status} message={message} />
      </header>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <span
            key={category}
            className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white/90"
          >
            {category}
          </span>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="space-y-4 rounded-2xl border border-white/15 bg-slate-950/55 p-4 text-white shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur"
          >
            <div className="space-y-1">
              <h2 className="text-lg font-semibold leading-tight text-white">{product.name}</h2>
              <p className="text-xs font-medium uppercase tracking-wide text-white/65">{product.category}</p>
            </div>

            <p className="text-sm text-white/85">
              Preco medio: <strong className="font-semibold text-white">R$ {Number(product.average_price).toFixed(2)}</strong> / {product.unit}
            </p>

            <form action={addProductToActiveList} className="flex items-center gap-2">
              <input name="redirect_to" type="hidden" value="/app/catalog" />
              <input name="list_id" type="hidden" value={selectedListId} />
              <input name="product_id" type="hidden" value={product.id} />
              <input
                className="w-20 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-emerald-300/45"
                min={1}
                name="quantity"
                step="1"
                type="number"
                defaultValue={1}
              />
              <button
                className="rounded-lg bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 px-3 py-2 text-sm font-semibold text-slate-950 transition-all hover:brightness-105"
                type="submit"
              >
                Adicionar
              </button>
            </form>
          </article>
        ))}
      </div>
    </section>
  );
}
