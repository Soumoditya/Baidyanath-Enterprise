"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import OrderStatusBar from "@/components/checkout/order-status-bar";
import Skeleton from "@/components/ui/skeleton";
import { Link } from "@/i18n/navigation";
import { getOrdersByPhone } from "@/lib/firebase/firestore";
import { Order } from "@/types/order";
import { formatPrice } from "@/lib/utils";
import { generateBill } from "@/lib/pdf/generate-bill";

export default function OrdersPage() {
  const t = useTranslations("orders");
  const ta = useTranslations("account");
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = phone.replace(/\D/g, "").slice(-10);
    if (cleaned.length !== 10) {
      setError(t("invalid_phone"));
      return;
    }
    setLoading(true);
    setError("");
    try {
      setOrders(await getOrdersByPhone(cleaned));
    } catch (err) {
      // Surface the real reason rather than silently showing "no orders".
      setOrders([]);
      setError(err instanceof Error ? err.message : t("lookup_error"));
    }
    setSearched(true);
    setLoading(false);
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="border-b border-slate-200 bg-gradient-to-b from-primary-50 to-white dark:border-slate-800 dark:from-primary-950/40 dark:to-slate-900">
          <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              {t("title")}
            </h1>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
              {t("subtitle")}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("phone_lookup")}
              className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="shrink-0 rounded-xl bg-primary-600 px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
            >
              {loading ? t("searching") : t("search")}
            </button>
          </form>

          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            {t("account_hint")}{" "}
            <Link href="/login" className="font-semibold text-primary-600 hover:underline dark:text-primary-400">
              {ta("sign_in")}
            </Link>
          </p>

          {error && (
            <p className="mt-6 rounded-xl bg-red-50 p-4 text-center text-sm font-medium text-red-700 dark:bg-red-900/20 dark:text-red-300">
              {error}
            </p>
          )}

          <div className="mt-8">
            {loading ? (
              <div className="space-y-5">
                <Skeleton className="h-44 w-full rounded-2xl" />
                <Skeleton className="h-44 w-full rounded-2xl" />
              </div>
            ) : searched && orders.length === 0 && !error ? (
              <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center dark:border-slate-700">
                <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                  {t("no_orders")}
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {t("no_orders_sub")}
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)] dark:border-slate-700 dark:bg-slate-800"
                  >
                    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {order.orderNumber}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {order.createdAt.toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
                        {formatPrice(order.total)}
                      </p>
                    </div>

                    <OrderStatusBar status={order.status} />

                    <ul className="mt-4 space-y-1.5">
                      {order.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex justify-between gap-3 text-sm text-slate-600 dark:text-slate-400"
                        >
                          <span className="min-w-0 truncate">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="shrink-0">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => generateBill(order)}
                      className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                    >
                      <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {t("download_bill")}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
