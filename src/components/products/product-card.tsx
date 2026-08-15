"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Product } from "@/types/product";
import { cn, formatPrice, getLocalizedName } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { whatsappProductUrl } from "@/lib/whatsapp";

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
  const discountPct = hasDiscount
    ? Math.round(((product.mrp! - product.price) / product.mrp!) * 100)
    : 0;

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
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] dark:border-slate-700 dark:bg-slate-800">
      {/* Image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-700"
      >
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300 dark:text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}

        {/* Discount badge */}
        {hasDiscount && (
          <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
            {discountPct}% {t("off")}
          </span>
        )}

        {/* Stock badge */}
        <span
          className={cn(
            "absolute right-2 top-2 rounded-full px-2.5 py-1 text-xs font-semibold",
            product.inStock
              ? "bg-green-100 text-green-700 dark:bg-green-900/60 dark:text-green-300"
              : "bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300"
          )}
        >
          {product.inStock ? t("in_stock") : t("out_of_stock")}
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-slate-900 transition-colors hover:text-primary-600 dark:text-white dark:hover:text-primary-400">
            {name}
          </h3>
        </Link>

        {product.unit && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {product.unit}
          </p>
        )}

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-slate-400 line-through dark:text-slate-500">
              {formatPrice(product.mrp!)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-stretch gap-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={cn(
              "flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
              product.inStock
                ? added
                  ? "bg-green-600 text-white"
                  : "bg-primary-600 text-white hover:bg-primary-700"
                : "cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-500"
            )}
          >
            {added ? t("added") : product.inStock ? t("add_to_cart") : t("out_of_stock")}
          </button>

          <a
            href={whatsappProductUrl(name, product.unit)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("order_whatsapp")}
            title={t("order_whatsapp")}
            className="flex w-11 shrink-0 items-center justify-center rounded-xl border border-green-600 text-green-600 transition-colors hover:bg-green-50 dark:hover:bg-green-950/30"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
          </a>
        </div>
      </div>
    </div>
  );
}
