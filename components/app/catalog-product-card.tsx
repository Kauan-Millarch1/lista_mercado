"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";

type ProductCardProps = {
  action: (formData: FormData) => void | Promise<void>;
  selectedListId: string;
  product: {
    id: string;
    name: string;
    category: string;
    unit: string;
    average_price: number;
  };
};

export function CatalogProductCard({ action, selectedListId, product }: ProductCardProps) {
  const [isSuccessAnimating, setIsSuccessAnimating] = useState(false);
  const bypassSubmitRef = useRef(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (bypassSubmitRef.current) {
      return;
    }

    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) {
      return;
    }

    setIsSuccessAnimating(true);

    window.setTimeout(() => {
      bypassSubmitRef.current = true;
      form.requestSubmit();
    }, 360);
  }

  return (
    <article
      className={`space-y-4 rounded-2xl border border-white/15 bg-slate-950/55 p-4 text-white shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur ${
        isSuccessAnimating ? "card-success-feedback" : ""
      }`}
    >
      <div className="space-y-1">
        <h2 className="text-lg font-semibold leading-tight text-white">{product.name}</h2>
        <p className="text-xs font-medium uppercase tracking-wide text-white/65">{product.category}</p>
      </div>

      <p className="text-sm text-white/85">
        Preco medio: <strong className="font-semibold text-white">R$ {Number(product.average_price).toFixed(2)}</strong> / {product.unit}
      </p>

      <form action={action} onSubmit={handleSubmit} className="flex items-center gap-2">
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
  );
}
