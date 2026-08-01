"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const t = useTranslations("cart");
  const tc = useTranslations("common");
  const { items, removeItem, updateQuantity, clearCart, getTotal } =
    useCartStore();

  const total = getTotal();
  const isEmpty = items.length === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl dark:bg-slate-900"
            role="dialog"
            aria-modal="true"
            aria-label={t("title")}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {t("title")}
              </h2>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
                aria-label={tc("close")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Cart content */}
            {isEmpty ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-20 w-20 text-slate-300 dark:text-slate-600"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
                  {t("empty")}
                </p>
                <p className="text-base text-slate-400 dark:text-slate-500">
                  {t("empty_subtitle")}
                </p>
                <Link
                  href="/products"
                  onClick={onClose}
                  className="mt-4 inline-flex items-center rounded-xl bg-primary-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-700"
                >
                  {t("continue_shopping")}
                </Link>
              </div>
            ) : (
              <>
                {/* Items list */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li
                        key={item.productId}
                        className="flex gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800"
                      >
                        {/* Product image */}
                        {item.imageUrl && (
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-white dark:bg-slate-700">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}

                        {/* Product details */}
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <p className="text-base font-semibold leading-tight text-slate-900 dark:text-white">
                              {item.name}
                            </p>
                            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                              {formatPrice(item.price)}{" "}
                              {item.unit && (
                                <span className="text-slate-400 dark:text-slate-500">
                                  / {item.unit}
                                </span>
                              )}
                            </p>
                          </div>

                          <div className="mt-2 flex items-center justify-between">
                            {/* Quantity controls */}
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.quantity - 1
                                  )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-lg font-bold text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                                aria-label={`Decrease ${item.name} quantity`}
                              >
                                -
                              </button>
                              <span className="flex h-9 w-10 items-center justify-center text-base font-semibold text-slate-900 dark:text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.quantity + 1
                                  )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-lg font-bold text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                                aria-label={`Increase ${item.name} quantity`}
                              >
                                +
                              </button>
                            </div>

                            {/* Line total and remove */}
                            <div className="flex items-center gap-3">
                              <span className="text-base font-bold text-slate-900 dark:text-white">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                              <button
                                onClick={() => removeItem(item.productId)}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                                aria-label={`${t("remove")} ${item.name}`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-5 w-5"
                                >
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-200 px-5 py-4 dark:border-slate-700">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                      {t("subtotal")}
                    </span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link
                      href="/checkout"
                      onClick={onClose}
                      className="flex items-center justify-center rounded-xl bg-primary-600 px-6 py-3.5 text-lg font-bold text-white transition-colors hover:bg-primary-700"
                    >
                      {t("checkout")}
                    </Link>
                    <button
                      onClick={clearCart}
                      className="flex items-center justify-center rounded-xl border border-red-300 px-6 py-3 text-base font-semibold text-red-600 transition-colors hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      {t("clear")}
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
