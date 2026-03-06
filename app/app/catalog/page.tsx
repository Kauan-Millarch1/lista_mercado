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
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">Catalogo</h1>
        <p className="text-gray-700">Navegue pelos produtos por categoria e adicione na lista ativa selecionada.</p>
        <FeedbackBanner status={status} message={message} />

        <div className="flex flex-wrap items-center gap-2">
          {activeLists.map((list) => {
            const isSelected = list.id === selectedListId;
            return (
              <Link
                key={list.id}
                href={`/app/catalog?listId=${list.id}`}
                className={`rounded-md px-3 py-1 text-sm ${
                  isSelected ? "bg-primary text-white" : "border border-border bg-white"
                }`}
              >
                {list.title}
              </Link>
            );
          })}
        </div>
      </header>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <span key={category} className="rounded-full border border-border bg-white px-3 py-1 text-sm">
            {category}
          </span>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {products.map((product) => (
          <article key={product.id} className="space-y-3 rounded-lg border border-border bg-white p-4">
            <div>
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-600">{product.category}</p>
            </div>
            <p className="text-sm">
              Preco medio: R$ {Number(product.average_price).toFixed(2)} / {product.unit}
            </p>

            <form action={addProductToActiveList} className="flex items-center gap-2">
              <input name="redirect_to" type="hidden" value="/app/catalog" />
              <input name="list_id" type="hidden" value={selectedListId} />
              <input name="product_id" type="hidden" value={product.id} />
              <input
                className="w-20 rounded-md border border-border px-2 py-1 text-sm"
                min={1}
                name="quantity"
                step="1"
                type="number"
                defaultValue={1}
              />
              <button className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white" type="submit">
                Adicionar
              </button>
            </form>
          </article>
        ))}
      </div>
    </section>
  );
}
