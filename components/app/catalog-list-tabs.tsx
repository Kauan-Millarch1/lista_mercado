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
    <div className="inline-flex rounded-lg border border-border bg-card p-1">
      <Link
        href={catalogHref as Route}
        className={`rounded-md px-3 py-1.5 text-sm ${
          activeTab === "catalog" ? "bg-primary text-white" : "text-foreground/80"
        }`}
      >
        Catalog
      </Link>
      <Link
        href={listHref as Route}
        className={`rounded-md px-3 py-1.5 text-sm ${activeTab === "list" ? "bg-primary text-white" : "text-foreground/80"}`}
      >
        Active List
      </Link>
    </div>
  );
}
