import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getVisitorIdFromCookie } from "@/lib/visitor/session";

export type CurrentVisitor = {
  id: string;
  display_name: string;
};

export type ActiveListItemView = {
  id: string;
  product_id: string;
  quantity: number;
  note: string | null;
  is_checked: boolean;
  estimated_price: number;
  product_name: string;
  product_unit: string;
};

export type ShoppingListView = {
  id: string;
  visitor_id: string;
  title: string;
  status: "active" | "done";
  created_at: string;
  finalized_at: string | null;
};

export async function getCurrentUserOrThrow(): Promise<CurrentVisitor> {
  const visitorId = await getVisitorIdFromCookie();

  if (!visitorId) {
    throw new Error("Visitor not identified");
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("visitors")
    .select("id, display_name")
    .eq("id", visitorId)
    .single();

  if (error || !data) {
    throw new Error("Visitor not identified");
  }

  return data;
}

export async function getOrCreateActiveList(visitorId: string): Promise<ShoppingListView> {
  const supabase = await createSupabaseServerClient();

  const { data: existingList, error: fetchError } = await supabase
    .from("shopping_lists")
    .select("id, visitor_id, title, status, created_at, finalized_at")
    .eq("visitor_id", visitorId)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (fetchError) {
    throw fetchError;
  }

  if (existingList) {
    return existingList as ShoppingListView;
  }

  const { data: createdList, error: createError } = await supabase
    .from("shopping_lists")
    .insert({
      visitor_id: visitorId,
      title: "Minha Lista Ativa",
      status: "active"
    })
    .select("id, visitor_id, title, status, created_at, finalized_at")
    .single();

  if (createError) {
    throw createError;
  }

  return createdList as ShoppingListView;
}

export async function getUserActiveLists(visitorId: string): Promise<ShoppingListView[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("shopping_lists")
    .select("id, visitor_id, title, status, created_at, finalized_at")
    .eq("visitor_id", visitorId)
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as ShoppingListView[];
}

export async function getUserActiveListById(visitorId: string, listId: string): Promise<ShoppingListView | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("shopping_lists")
    .select("id, visitor_id, title, status, created_at, finalized_at")
    .eq("id", listId)
    .eq("visitor_id", visitorId)
    .eq("status", "active")
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (data as ShoppingListView | null) ?? null;
}

export async function getCatalogData() {
  const supabase = await createSupabaseServerClient();
  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, category, unit, average_price")
    .order("category", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  const productRows = (products ?? []) as Array<{ category?: string }>;
  const categories = [...new Set(productRows.map((product) => String(product.category ?? "")))]
    .filter((category) => category.length > 0);
  return { products: (products ?? []) as any[], categories };
}

export async function getActiveListItems(listId: string): Promise<ActiveListItemView[]> {
  const supabase = await createSupabaseServerClient();

  const { data: listItems, error: itemsError } = await supabase
    .from("list_items")
    .select("id, product_id, quantity, note, is_checked, estimated_price")
    .eq("list_id", listId)
    .order("created_at", { ascending: true });

  if (itemsError) {
    throw itemsError;
  }

  const listItemRows = (listItems ?? []) as Array<{
    id: string;
    product_id: string;
    quantity: number;
    note: string | null;
    is_checked: boolean;
    estimated_price: number;
  }>;

  const productIds = listItemRows.map((item) => item.product_id);
  if (productIds.length === 0) {
    return [];
  }

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, name, unit")
    .in("id", productIds);

  if (productsError) {
    throw productsError;
  }

  const productRows = (products ?? []) as Array<{ id: string; name: string; unit: string }>;
  const productMap = new Map(productRows.map((product) => [product.id, product]));

  return listItemRows.map((item) => {
    const product = productMap.get(item.product_id);
    return {
      ...item,
      product_name: product?.name ?? "Produto desconhecido",
      product_unit: product?.unit ?? "unit"
    };
  });
}

export async function getHistoryData(visitorId: string) {
  const supabase = await createSupabaseServerClient();

  const { data: lists, error: listsError } = await supabase
    .from("shopping_lists")
    .select("id, title, finalized_at")
    .eq("visitor_id", visitorId)
    .eq("status", "done")
    .order("finalized_at", { ascending: false });

  if (listsError) {
    throw listsError;
  }

  if (!lists || lists.length === 0) {
    return [];
  }

  const listIds = lists.map((list) => list.id);
  const { data: items, error: itemsError } = await supabase
    .from("list_items")
    .select("list_id, estimated_price")
    .in("list_id", listIds);

  if (itemsError) {
    throw itemsError;
  }

  const totalsByList = new Map<string, { count: number; total: number }>();
  for (const item of items ?? []) {
    const current = totalsByList.get(item.list_id) ?? { count: 0, total: 0 };
    totalsByList.set(item.list_id, {
      count: current.count + 1,
      total: current.total + Number(item.estimated_price)
    });
  }

  return lists.map((list) => {
    const summary = totalsByList.get(list.id) ?? { count: 0, total: 0 };
    return {
      id: list.id,
      title: list.title,
      finalized_at: list.finalized_at,
      items_count: summary.count,
      estimated_total: summary.total
    };
  });
}

export async function getDashboardData(visitorId: string) {
  const supabase = await createSupabaseServerClient();
  const activeList = await getOrCreateActiveList(visitorId);
  const activeItems = await getActiveListItems(activeList.id);

  const { data: doneLists, error: doneListsError } = await supabase
    .from("shopping_lists")
    .select("id")
    .eq("visitor_id", visitorId)
    .eq("status", "done");

  if (doneListsError) {
    throw doneListsError;
  }

  const doneListIds = (doneLists ?? []).map((list) => list.id);
  let topProductLabel = "Sem compras ainda";

  if (doneListIds.length > 0) {
    const { data: doneItems, error: doneItemsError } = await supabase
      .from("list_items")
      .select("product_id")
      .in("list_id", doneListIds);

    if (doneItemsError) {
      throw doneItemsError;
    }

    const frequency = new Map<string, number>();
    for (const item of doneItems ?? []) {
      frequency.set(item.product_id, (frequency.get(item.product_id) ?? 0) + 1);
    }

    let mostFrequentProductId: string | null = null;
    let maxCount = 0;
    for (const [productId, count] of frequency.entries()) {
      if (count > maxCount) {
        maxCount = count;
        mostFrequentProductId = productId;
      }
    }

    if (mostFrequentProductId) {
      const { data: topProduct } = await supabase
        .from("products")
        .select("name")
        .eq("id", mostFrequentProductId)
        .maybeSingle();

      topProductLabel = topProduct?.name ?? "Desconhecido";
    }
  }

  const estimatedTotal = activeItems.reduce((sum, item) => sum + Number(item.estimated_price), 0);

  return {
    active_items_count: activeItems.length,
    active_estimated_total: estimatedTotal,
    shopping_frequency: doneListIds.length,
    top_product_label: topProductLabel
  };
}
