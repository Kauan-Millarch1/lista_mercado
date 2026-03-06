import Link from "next/link";
import { createActiveList, finalizeListAction, removeListItem, toggleListItemCheck, updateListItem } from "@/app/app/actions";
import { CatalogListTabs } from "@/components/app/catalog-list-tabs";
import { ConfirmSubmitButton } from "@/components/ui/confirm-submit-button";
import { FeedbackBanner } from "@/components/ui/feedback-banner";
import { ProductImage } from "@/components/ui/product-image";
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

const priorityOrder = {
  high: 0,
  medium: 1,
  low: 2
} as const;

const priorityLabel = {
  high: "High",
  medium: "Medium",
  low: "Low"
} as const;

const priorityBadgeClass = {
  high: "bg-rose-600/90 text-white",
  medium: "bg-amber-500/90 text-black",
  low: "bg-emerald-600/80 text-white"
} as const;

export default async function ActiveListPage({ searchParams }: ListPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const requestedListId = resolvedSearchParams.listId;
  const status = resolvedSearchParams.status;
  const message = resolvedSearchParams.message;
  const user = await getCurrentUserOrThrow();
  const activeLists = await getUserActiveLists(user.id);

  let selectedList = requestedListId ? await getUserActiveListById(user.id, requestedListId) : null;

  if (!selectedList) {
    selectedList = await getOrCreateActiveList(user.id);
  }

  const activeItems = await getActiveListItems(selectedList.id);
  const sortedItems = [...activeItems].sort((a, b) => {
    const byPriority = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (byPriority !== 0) {
      return byPriority;
    }
    return a.product_name.localeCompare(b.product_name);
  });
  const estimatedTotal = sortedItems.reduce((acc, item) => acc + Number(item.estimated_price), 0);

  return (
    <section className="space-y-6">
      <header className="space-y-4">
        <CatalogListTabs activeTab="list" listId={selectedList.id} />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold">Active Lists</h1>
          <strong className="text-lg">Estimated total: ${estimatedTotal.toFixed(2)}</strong>
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
                  isSelected ? "bg-primary text-white" : "border border-border bg-card"
                }`}
              >
                {list.title}
              </Link>
            );
          })}
        </div>

        <form action={createActiveList} className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-3">
          <input
            className="min-w-[220px] flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
            name="title"
            placeholder="New list title"
            type="text"
          />
          <button className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white" type="submit">
            Create list
          </button>
        </form>
      </header>

      {sortedItems.length === 0 ? (
        <article className="rounded-lg border border-border bg-card p-4 text-sm text-foreground/80">
          This list is empty. Go to the catalog and add products.
        </article>
      ) : (
        <div className="space-y-3">
          {sortedItems.map((item) => (
            <article key={item.id} className="rounded-lg border border-border bg-card p-4">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <ProductImage src={item.product_image_url} alt={`Photo of ${item.product_name}`} size="sm" />
                  <div>
                  <h2 className="font-semibold">{item.product_name}</h2>
                  <p className="text-sm text-foreground/70">
                    Qty: {item.quantity} {item.product_unit} | Est: ${Number(item.estimated_price).toFixed(2)}
                  </p>
                  <p className="mt-1 text-xs text-foreground/70">{item.note ?? "No note"}</p>
                  <span className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${priorityBadgeClass[item.priority]}`}>
                    {priorityLabel[item.priority]} priority
                  </span>
                  </div>
                </div>

                <form action={toggleListItemCheck}>
                  <input type="hidden" name="item_id" value={item.id} />
                  <input type="hidden" name="list_id" value={selectedList.id} />
                  <input type="hidden" name="next_checked" value={item.is_checked ? "false" : "true"} />
                  <button className="rounded-md border border-border px-3 py-1 text-sm" type="submit">
                    {item.is_checked ? "Uncheck" : "Check"}
                  </button>
                </form>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <form action={updateListItem} className="flex flex-1 flex-wrap items-center gap-2">
                  <input type="hidden" name="item_id" value={item.id} />
                  <input type="hidden" name="list_id" value={selectedList.id} />
                  <input
                    className="w-24 rounded-md border border-border bg-background px-2 py-1 text-sm"
                    min={1}
                    name="quantity"
                    step="1"
                    type="number"
                    defaultValue={item.quantity}
                  />
                  <select
                    name="priority"
                    defaultValue={item.priority}
                    className="rounded-md border border-border bg-background px-2 py-1 text-sm"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <input
                    className="min-w-[180px] flex-1 rounded-md border border-border bg-background px-2 py-1 text-sm"
                    name="note"
                    placeholder="Item note"
                    type="text"
                    defaultValue={item.note ?? ""}
                  />
                  <button className="rounded-md border border-border px-3 py-1 text-sm" type="submit">
                    Save
                  </button>
                </form>

                <form action={removeListItem}>
                  <input type="hidden" name="item_id" value={item.id} />
                  <input type="hidden" name="list_id" value={selectedList.id} />
                  <button className="rounded-md border border-border px-3 py-1 text-sm" type="submit">
                    Remove
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
          label="Finalize this list"
          className="rounded-md bg-primary px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          disabled={sortedItems.length === 0}
        />
      </form>
    </section>
  );
}
