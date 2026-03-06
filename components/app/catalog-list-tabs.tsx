import Link from "next/link";
import type { Route } from "next";

type CatalogListTabsProps = {
  activeTab: "catalog" | "list";
  listId?: string;
};

export function CatalogListTabs({ activeTab, listId }: CatalogListTabsProps) {
  const catalogHref = listId ? `/app/catalog?listId=${listId}` : "/app/catalog";
  const listHref = listId ? `/app/list?listId=${listId}` : "/app/list";

  return (
    <div className="inline-flex rounded-xl border border-border bg-card p-1 shadow-sm">
      <Link
        href={catalogHref as Route}
        className={`rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
          activeTab === "catalog" ? "bg-primary text-white" : "text-foreground/75 hover:bg-muted/70"
        }`}
      >
        Catalogo
      </Link>
      <Link
        href={listHref as Route}
        className={`rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
          activeTab === "list" ? "bg-primary text-white" : "text-foreground/75 hover:bg-muted/70"
        }`}
      >
        Lista Ativa
      </Link>
    </div>
  );
}
