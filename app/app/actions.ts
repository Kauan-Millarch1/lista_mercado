"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getCurrentUserOrThrow, getOrCreateActiveList, getUserActiveListById } from "@/lib/data/shopping";

const PRIORITY_VALUES = ["high", "medium", "low"] as const;
type Priority = (typeof PRIORITY_VALUES)[number];

function parsePriority(value: FormDataEntryValue | null, fallback: Priority = "medium"): Priority {
  const normalized = String(value ?? "").toLowerCase();
  return PRIORITY_VALUES.includes(normalized as Priority) ? (normalized as Priority) : fallback;
}

function buildRedirect(pathname: string, params: Record<string, string | null | undefined>) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value && value.length > 0) {
      query.set(key, value);
    }
  });

  const queryString = query.toString();
  return queryString.length > 0 ? `${pathname}?${queryString}` : pathname;
}

function redirectToPath(path: string) {
  redirect(path as Parameters<typeof redirect>[0]);
}

async function resolveTargetActiveListId(userId: string, requestedListId: string | null) {
  if (!requestedListId) {
    const fallbackList = await getOrCreateActiveList(userId);
    return fallbackList.id;
  }

  const list = await getUserActiveListById(userId, requestedListId);
  if (!list) {
    const fallbackList = await getOrCreateActiveList(userId);
    return fallbackList.id;
  }

  return list.id;
}

export async function addProductToActiveList(formData: FormData) {
  const productId = String(formData.get("product_id") ?? "");
  const requestedListId = String(formData.get("list_id") ?? "");
  const redirectTo = String(formData.get("redirect_to") ?? "/app/catalog");
  const quantity = Number(formData.get("quantity") ?? 1);
  const priority = parsePriority(formData.get("priority"));

  if (!productId) {
    return;
  }

  const user = await getCurrentUserOrThrow();
  const supabase = await createSupabaseServerClient();
  const activeListId = await resolveTargetActiveListId(user.id, requestedListId || null);

  const { data: product, error: productError } = await supabase
    .from("products")
    .select("id, average_price")
    .eq("id", productId)
    .single();

  if (productError) {
    throw productError;
  }

  const { data: existingItem } = await supabase
    .from("list_items")
    .select("id, quantity")
    .eq("list_id", activeListId)
    .eq("product_id", product.id)
    .maybeSingle();

  if (existingItem) {
    const nextQuantity = Number(existingItem.quantity) + quantity;
    const nextEstimated = Number(product.average_price) * nextQuantity;

    const { error: updateError } = await supabase
      .from("list_items")
      .update({ quantity: nextQuantity, priority, estimated_price: nextEstimated, updated_at: new Date().toISOString() })
      .eq("id", existingItem.id);

    if (updateError) {
      throw updateError;
    }
  } else {
    const estimatedPrice = Number(product.average_price) * quantity;
    const { error: insertError } = await supabase.from("list_items").insert({
      list_id: activeListId,
      product_id: product.id,
      quantity,
      priority,
      estimated_price: estimatedPrice
    });

    if (insertError) {
      throw insertError;
    }
  }

  revalidatePath("/app/catalog");
  revalidatePath("/app/list");
  revalidatePath("/app/dashboard");

  redirectToPath(
    buildRedirect(redirectTo, {
      listId: activeListId,
      status: "success",
      message: "Product added to list"
    })
  );
}

export async function createActiveList(formData: FormData) {
  const titleInput = String(formData.get("title") ?? "").trim();
  const title = titleInput.length > 0 ? titleInput : "New Shopping List";
  const user = await getCurrentUserOrThrow();
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("shopping_lists")
    .insert({
      user_id: user.id,
      title,
      status: "active"
    })
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  revalidatePath("/app/list");
  revalidatePath("/app/catalog");
  redirectToPath(
    buildRedirect("/app/list", {
      listId: data.id,
      status: "success",
      message: "List created"
    })
  );
}

export async function updateListItem(formData: FormData) {
  const itemId = String(formData.get("item_id") ?? "");
  const listId = String(formData.get("list_id") ?? "");
  const quantity = Number(formData.get("quantity") ?? 1);
  const priority = parsePriority(formData.get("priority"));
  const note = String(formData.get("note") ?? "").trim();

  if (!itemId || quantity <= 0) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  const { data: existingItem, error: itemError } = await supabase
    .from("list_items")
    .select("id, product_id")
    .eq("id", itemId)
    .single();

  if (itemError) {
    throw itemError;
  }

  const { data: product, error: productError } = await supabase
    .from("products")
    .select("average_price")
    .eq("id", existingItem.product_id)
    .single();

  if (productError) {
    throw productError;
  }

  const nextEstimated = Number(product.average_price) * quantity;

  const { error: updateError } = await supabase
    .from("list_items")
    .update({
      quantity,
      priority,
      note: note.length > 0 ? note : null,
      estimated_price: nextEstimated,
      updated_at: new Date().toISOString()
    })
    .eq("id", itemId);

  if (updateError) {
    throw updateError;
  }

  revalidatePath("/app/list");
  revalidatePath("/app/dashboard");
  redirectToPath(
    buildRedirect("/app/list", {
      listId,
      status: "success",
      message: "Item updated"
    })
  );
}

export async function toggleListItemCheck(formData: FormData) {
  const itemId = String(formData.get("item_id") ?? "");
  const listId = String(formData.get("list_id") ?? "");
  const nextValue = String(formData.get("next_checked") ?? "false") === "true";

  if (!itemId) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("list_items")
    .update({ is_checked: nextValue, updated_at: new Date().toISOString() })
    .eq("id", itemId);

  if (error) {
    throw error;
  }

  revalidatePath("/app/list");
  redirectToPath(
    buildRedirect("/app/list", {
      listId
    })
  );
}

export async function removeListItem(formData: FormData) {
  const itemId = String(formData.get("item_id") ?? "");
  const listId = String(formData.get("list_id") ?? "");

  if (!itemId) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("list_items").delete().eq("id", itemId);

  if (error) {
    throw error;
  }

  revalidatePath("/app/list");
  revalidatePath("/app/dashboard");
  redirectToPath(
    buildRedirect("/app/list", {
      listId,
      status: "success",
      message: "Item removed"
    })
  );
}

export async function finalizeActiveList() {
  const user = await getCurrentUserOrThrow();
  const activeList = await getOrCreateActiveList(user.id);
  await finalizeActiveListById(activeList.id);
}

export async function finalizeActiveListById(listId: string) {
  const user = await getCurrentUserOrThrow();
  const supabase = await createSupabaseServerClient();
  const activeListId = await resolveTargetActiveListId(user.id, listId);

  const { error } = await supabase
    .from("shopping_lists")
    .update({ status: "done", finalized_at: new Date().toISOString() })
    .eq("id", activeListId)
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }

  await getOrCreateActiveList(user.id);

  revalidatePath("/app/list");
  revalidatePath("/app/history");
  revalidatePath("/app/dashboard");
  redirect("/app/history");
}

export async function finalizeListAction(formData: FormData) {
  const listId = String(formData.get("list_id") ?? "");
  if (!listId) {
    return;
  }
  await finalizeActiveListById(listId);
}

export async function updateProfileAction(formData: FormData) {
  const user = await getCurrentUserOrThrow();
  const name = String(formData.get("name") ?? "").trim();
  const avatarUrlInput = String(formData.get("avatar_url") ?? "").trim();
  const avatarUrl = avatarUrlInput.length > 0 ? avatarUrlInput : null;
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    name: name.length > 0 ? name : null,
    avatar_url: avatarUrl,
    updated_at: new Date().toISOString()
  });

  if (error) {
    throw error;
  }

  revalidatePath("/app/profile");
  redirectToPath(
    buildRedirect("/app/profile", {
      status: "success",
      message: "Profile updated"
    })
  );
}
