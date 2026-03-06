import Link from "next/link";
import type { Route } from "next";
import { addProductToActiveList } from "@/app/app/actions";
import { CatalogProductCard } from "@/components/app/catalog-product-card";
import { FeedbackBanner } from "@/components/ui/feedback-banner";
import { getCatalogData, getCurrentUserOrThrow, getOrCreateActiveList, getUserActiveLists } from "@/lib/data/shopping";

type CatalogPageProps = {
  searchParams?: Promise<{ listId?: string; category?: string; status?: string; message?: string }>;
};

function normalizeCategory(raw: string) {
  const sanitized = raw
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toUpperCase();

  if (["VEGETAIS E VERDURAS", "VERDURAS E LEGUMES"].includes(sanitized)) return "Verduras e Legumes";
  if (["LATICINIOS E OVOS"].includes(sanitized)) return "Laticinios e Ovos";
  if (["CARNES E AVES"].includes(sanitized)) return "Carnes e Aves";
  if (["PADARIA E GRAOS"].includes(sanitized)) return "Padaria e Graos";
  if (["FRUTAS"].includes(sanitized)) return "Frutas";
  if (["BEBIDAS"].includes(sanitized)) return "Bebidas";
  if (["EXODO"].includes(sanitized)) return "Outros";

  if (raw.trim().length === 0) return "Outros";
  return raw
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function categoryKey(label: string) {
  return label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .toLowerCase();
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const requestedListId = resolvedSearchParams.listId;
  const selectedCategory = resolvedSearchParams.category;
  const status = resolvedSearchParams.status;
  const message = resolvedSearchParams.message;

  const visitor = await getCurrentUserOrThrow();
  const { products } = await getCatalogData();
  const activeLists = await getUserActiveLists(visitor.id);
  const fallbackList = await getOrCreateActiveList(visitor.id);
  const selectedListId =
    activeLists.some((list) => list.id === requestedListId) && requestedListId ? requestedListId : fallbackList.id;

  const normalizedProducts = products.map((product) => ({
    ...product,
    category: normalizeCategory(String(product.category ?? ""))
  }));

  const categoriesMap = new Map<string, string>();
  for (const product of normalizedProducts) {
    const key = categoryKey(product.category);
    if (key.length === 0) continue;
    if (!categoriesMap.has(key)) {
      categoriesMap.set(key, product.category);
    }
  }
  const categories = Array.from(categoriesMap.values()).sort((a, b) => a.localeCompare(b, "pt-BR"));
  const selectedCategoryKey = selectedCategory ? categoryKey(selectedCategory) : "todas";

  const filteredProducts =
    selectedCategoryKey === "todas"
      ? normalizedProducts
      : normalizedProducts.filter((product) => categoryKey(product.category) === selectedCategoryKey);

  function buildCatalogHref(categoryLabel: string | null, listId?: string) {
    const params = new URLSearchParams();
    params.set("listId", listId ?? selectedListId);
    if (categoryLabel) params.set("category", categoryLabel);
    const query = params.toString();
    return query.length > 0 ? `/app/catalog?${query}` : "/app/catalog";
  }

  return (
    <section className="space-y-8">
      <header className="space-y-4">
        <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <h1 className="text-4xl font-semibold tracking-tight text-white">Catalogo</h1>
          <p className="mt-2 text-sm text-white/75">Navegue pelos produtos e filtre por categoria.</p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {activeLists.map((list) => {
              const isSelected = list.id === selectedListId;
              return (
                <Link
                  key={list.id}
                  href={buildCatalogHref(selectedCategory ?? null, list.id) as Route}
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
        <Link
          href={buildCatalogHref(null) as Route}
          className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide transition-colors ${
            selectedCategoryKey === "todas"
              ? "border-emerald-300/80 bg-emerald-400 text-slate-950"
              : "border-white/15 bg-white/10 text-white/90 hover:bg-white/14"
          }`}
        >
          Todas
        </Link>

        {categories.map((category) => {
          const active = categoryKey(category) === selectedCategoryKey;
          return (
            <Link
              key={category}
              href={buildCatalogHref(category) as Route}
              className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide transition-colors ${
                active
                  ? "border-emerald-300/80 bg-emerald-400 text-slate-950"
                  : "border-white/15 bg-white/10 text-white/90 hover:bg-white/14"
              }`}
            >
              {category}
            </Link>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product) => (
          <CatalogProductCard key={product.id} action={addProductToActiveList} selectedListId={selectedListId} product={product} />
        ))}
      </div>
    </section>
  );
}


