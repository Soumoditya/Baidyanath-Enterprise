"use client";

import { useTranslations } from "next-intl";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { whatsappOrderUrl } from "@/lib/whatsapp";

export default function CartPage() {
  const t = useTranslations("cart");
  const { items, removeItem, updateQuantity, clearCart, getTotal } =
    useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            {t("title")}
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <svg
                className="w-20 h-20 text-slate-300 dark:text-slate-600 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
              <p className="text-xl text-slate-500 dark:text-slate-400 mb-2">
                {t("empty")}
              </p>
              <p className="text-base text-slate-400 dark:text-slate-500 mb-6">
                {t("empty_subtitle")}
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-lg font-medium"
              >
                {t("continue_shopping")}
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
                  >
                    <div className="w-20 h-20 rounded-lg bg-slate-100 dark:bg-slate-700 flex-shrink-0 overflow-hidden">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {formatPrice(item.price)}
                        {item.unit && ` / ${item.unit}`}
                      </p>
                    </div>
                    <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="px-3 py-2 text-base font-medium hover:bg-slate-100 dark:hover:bg-slate-700 rounded-l-lg"
                      >
                        -
                      </button>
                      <span className="px-3 py-2 text-base font-medium min-w-[2.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="px-3 py-2 text-base font-medium hover:bg-slate-100 dark:hover:bg-slate-700 rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-base font-semibold text-slate-900 dark:text-white w-24 text-right">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      aria-label={t("remove")}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg text-slate-600 dark:text-slate-400">
                    {t("subtotal")}
                  </span>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    {formatPrice(getTotal())}
                  </span>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/checkout"
                    className="flex-1 rounded-lg bg-primary-600 px-6 py-3.5 text-center text-lg font-semibold text-white transition-colors hover:bg-primary-700"
                  >
                    {t("checkout")}
                  </Link>
                  <a
                    href={whatsappOrderUrl(
                      items.map((i) => ({
                        name: i.name,
                        quantity: i.quantity,
                        price: i.price,
                        unit: i.unit,
                      })),
                      getTotal()
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-green-600 px-6 py-3.5 text-center text-lg font-semibold text-green-700 transition-colors hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950/30"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
                    {t("order_whatsapp")}
                  </a>
                </div>
                <button
                  onClick={clearCart}
                  className="mt-3 w-full rounded-lg border border-slate-300 px-6 py-2.5 text-sm text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700"
                >
                  {t("clear")}
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
