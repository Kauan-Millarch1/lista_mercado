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
        <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-semibold tracking-tight text-white">Listas Ativas</h1>
            <strong className="text-lg text-white">Total estimado: R$ {estimatedTotal.toFixed(2)}</strong>
          </div>
        </div>

        <FeedbackBanner status={status} message={message} />

        <div className="flex flex-wrap items-center gap-2">
          {activeLists.map((list) => {
            const isSelected = list.id === selectedList.id;
            return (
              <Link
                key={list.id}
                href={`/app/list?listId=${list.id}`}
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

        <form action={createActiveList} className="rounded-2xl border border-white/15 bg-slate-950/55 p-3 shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur">
          <div className="flex flex-wrap items-center gap-2">
            <input
              className="min-w-[220px] flex-1 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/45 outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/45"
              name="title"
              placeholder="Nome da nova lista"
              type="text"
            />
            <button className="rounded-lg bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 px-3 py-2 text-sm font-semibold text-slate-950 transition-all hover:brightness-105" type="submit">
              Criar lista
            </button>
          </div>
        </form>
      </header>

      {activeItems.length === 0 ? (
        <article className="rounded-2xl border border-white/15 bg-slate-950/55 p-4 text-sm text-white/80 shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur">
          Esta lista esta vazia. Va ao catalogo e adicione produtos.
        </article>
      ) : (
        <div className="space-y-3">
          {activeItems.map((item) => (
            <article key={item.id} className="rounded-2xl border border-white/15 bg-slate-950/55 p-4 text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-white">{item.product_name}</h2>
                  <p className="text-sm text-white/75">
                    Qtd: {item.quantity} {item.product_unit} | Est: R$ {Number(item.estimated_price).toFixed(2)}
                  </p>
                  <p className="text-xs text-white/55">{item.note ?? "Sem observacao"}</p>
                </div>

                <form action={toggleListItemCheck}>
                  <input type="hidden" name="item_id" value={item.id} />
                  <input type="hidden" name="list_id" value={selectedList.id} />
                  <input type="hidden" name="next_checked" value={item.is_checked ? "false" : "true"} />
                  <button className="rounded-lg border border-white/20 bg-white/8 px-3 py-1.5 text-sm text-white transition-colors hover:bg-white/14" type="submit">
                    {item.is_checked ? "Desmarcar" : "Marcar"}
                  </button>
                </form>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <form action={updateListItem} className="flex flex-1 flex-wrap items-center gap-2">
                  <input type="hidden" name="item_id" value={item.id} />
                  <input type="hidden" name="list_id" value={selectedList.id} />
                  <input
                    className="w-24 rounded-lg border border-white/20 bg-white/10 px-2 py-1.5 text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/45"
                    min={1}
                    name="quantity"
                    step="1"
                    type="number"
                    defaultValue={item.quantity}
                  />
                  <input
                    className="min-w-[180px] flex-1 rounded-lg border border-white/20 bg-white/10 px-2 py-1.5 text-sm text-white placeholder:text-white/45 outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/45"
                    name="note"
                    placeholder="Observacao do item"
                    type="text"
                    defaultValue={item.note ?? ""}
                  />
                  <button className="rounded-lg border border-white/20 bg-white/8 px-3 py-1.5 text-sm text-white transition-colors hover:bg-white/14" type="submit">
                    Salvar
                  </button>
                </form>

                <form action={removeListItem}>
                  <input type="hidden" name="item_id" value={item.id} />
                  <input type="hidden" name="list_id" value={selectedList.id} />
                  <button className="rounded-lg border border-red-300/40 bg-red-400/10 px-3 py-1.5 text-sm text-red-100 transition-colors hover:bg-red-400/20" type="submit">
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
          className="rounded-lg bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 px-4 py-2 font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={activeItems.length === 0}
        />
      </form>
    </section>
  );
}
