import Link from "next/link";
import { createActiveList, finalizeListAction, removeListItem, toggleListItemCheck, updateListItem } from "@/app/app/actions";
import { ConfirmSubmitButton } from "@/components/ui/confirm-submit-button";
import { FeedbackBanner } from "@/components/ui/feedback-banner";
import {
  getActiveListItems,
  getCurrentUserOrThrow,
  getOrCreateActiveList,
  getUserActiveListById,
  getUserActiveLists
} from "@/lib/data/shopping";

type ListPageProps = {
  searchParams?: Promise<{ listId?: string; status?: string; message?: string }>;
};

export default async function ActiveListPage({ searchParams }: ListPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const requestedListId = resolvedSearchParams.listId;
  const status = resolvedSearchParams.status;
  const message = resolvedSearchParams.message;
  const visitor = await getCurrentUserOrThrow();
  const activeLists = await getUserActiveLists(visitor.id);

  let selectedList = requestedListId ? await getUserActiveListById(visitor.id, requestedListId) : null;

  if (!selectedList) {
    selectedList = await getOrCreateActiveList(visitor.id);
  }

  const activeItems = await getActiveListItems(selectedList.id);
  const estimatedTotal = activeItems.reduce((acc, item) => acc + Number(item.estimated_price), 0);

  return (
    <section className="space-y-6">
      <header className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold">Listas Ativas</h1>
          <strong className="text-lg">Total estimado: R$ {estimatedTotal.toFixed(2)}</strong>
        </div>

        <FeedbackBanner status={status} message={message} />

        <div className="flex flex-wrap items-center gap-2">
          {activeLists.map((list) => {
            const isSelected = list.id === selectedList.id;
            return (
              <Link
                key={list.id}
                href={`/app/list?listId=${list.id}`}
                className={`rounded-md px-3 py-1 text-sm ${
                  isSelected ? "bg-primary text-white" : "border border-border bg-white"
                }`}
              >
                {list.title}
              </Link>
            );
          })}
        </div>

        <form action={createActiveList} className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-white p-3">
          <input
            className="min-w-[220px] flex-1 rounded-md border border-border px-3 py-2 text-sm"
            name="title"
            placeholder="Nome da nova lista"
            type="text"
          />
          <button className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white" type="submit">
            Criar lista
          </button>
        </form>
      </header>

      {activeItems.length === 0 ? (
        <article className="rounded-lg border border-border bg-white p-4 text-sm text-gray-700">
          Esta lista esta vazia. Va ao catalogo e adicione produtos.
        </article>
      ) : (
        <div className="space-y-3">
          {activeItems.map((item) => (
            <article key={item.id} className="rounded-lg border border-border bg-white p-4">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-semibold">{item.product_name}</h2>
                  <p className="text-sm text-gray-600">
                    Qtd: {item.quantity} {item.product_unit} | Est: R$ {Number(item.estimated_price).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">{item.note ?? "Sem observacao"}</p>
                </div>

                <form action={toggleListItemCheck}>
                  <input type="hidden" name="item_id" value={item.id} />
                  <input type="hidden" name="list_id" value={selectedList.id} />
                  <input type="hidden" name="next_checked" value={item.is_checked ? "false" : "true"} />
                  <button className="rounded-md border border-border px-3 py-1 text-sm" type="submit">
                    {item.is_checked ? "Desmarcar" : "Marcar"}
                  </button>
                </form>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <form action={updateListItem} className="flex flex-1 flex-wrap items-center gap-2">
                  <input type="hidden" name="item_id" value={item.id} />
                  <input type="hidden" name="list_id" value={selectedList.id} />
                  <input
                    className="w-24 rounded-md border border-border px-2 py-1 text-sm"
                    min={1}
                    name="quantity"
                    step="1"
                    type="number"
                    defaultValue={item.quantity}
                  />
                  <input
                    className="min-w-[180px] flex-1 rounded-md border border-border px-2 py-1 text-sm"
                    name="note"
                    placeholder="Observacao do item"
                    type="text"
                    defaultValue={item.note ?? ""}
                  />
                  <button className="rounded-md border border-border px-3 py-1 text-sm" type="submit">
                    Salvar
                  </button>
                </form>

                <form action={removeListItem}>
                  <input type="hidden" name="item_id" value={item.id} />
                  <input type="hidden" name="list_id" value={selectedList.id} />
                  <button className="rounded-md border border-border px-3 py-1 text-sm" type="submit">
                    Remover
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      )}

      <form action={finalizeListAction}>
        <input type="hidden" name="list_id" value={selectedList.id} />
        <ConfirmSubmitButton
          confirmText="Tem certeza que deseja finalizar esta lista?"
          label="Finalizar esta lista"
          className="rounded-md bg-primary px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          disabled={activeItems.length === 0}
        />
      </form>
    </section>
  );
}
