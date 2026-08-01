"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Product } from "@/types/product";
import { cn, formatPrice, getLocalizedName } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale();
  const t = useTranslations("products");
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const name = getLocalizedName(product.name, locale);
  const hasDiscount = product.mrp && product.mrp > product.price;

  function handleAddToCart() {
    addItem({
      productId: product.id,
      name,
      price: product.price,
      imageUrl: product.imageUrl,
      unit: product.unit,
      maxStock: product.inStock,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-400 dark:text-slate-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-12 w-12"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}

        {/* Stock badge */}
        <span
          className={cn(
            "absolute top-2 right-2 rounded-full px-2.5 py-1 text-xs font-semibold",
            product.inStock
              ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
              : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
          )}
        >
          {product.inStock ? t("in_stock") : t("out_of_stock")}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold leading-snug text-slate-900 dark:text-white">
          {name}
        </h3>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {product.unit}
        </p>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-slate-400 line-through dark:text-slate-500">
              {formatPrice(product.mrp!)}
            </span>
          )}
        </div>

        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={cn(
            "mt-4 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
            product.inStock
              ? added
                ? "bg-green-600 text-white"
                : "bg-primary-600 text-white hover:bg-primary-700"
              : "cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-500"
          )}
        >
          {added
            ? t("added")
            : product.inStock
              ? t("add_to_cart")
              : t("out_of_stock")}
        </button>
      </div>
    </div>
  );
}
