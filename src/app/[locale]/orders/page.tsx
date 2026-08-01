"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AnimatedSection from "@/components/shared/animated-section";
import OrderStatusBar from "@/components/checkout/order-status-bar";
import { getOrdersByPhone } from "@/lib/firebase/firestore";
import { Order } from "@/types/order";
import { formatPrice } from "@/lib/utils";
import { generateBill } from "@/lib/pdf/generate-bill";

export default function OrdersPage() {
  const t = useTranslations("orders");
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = phone.replace(/\D/g, "").slice(-10);
    if (cleaned.length !== 10) return;
    setLoading(true);
    try {
      const results = await getOrdersByPhone(cleaned);
      setOrders(results);
    } catch {
      setOrders([]);
    }
    setSearched(true);
    setLoading(false);
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatedSection>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {t("title")}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              {t("subtitle")}
            </p>
          </AnimatedSection>

          <form onSubmit={handleSearch} className="flex gap-3 mb-8">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("phone_lookup")}
              className="flex-1 px-4 py-3 text-base rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-base disabled:opacity-50"
            >
              {loading ? "..." : t("search")}
            </button>
          </form>

          {searched && orders.length === 0 && (
            <p className="text-center text-lg text-slate-500 dark:text-slate-400 py-12">
              {t("no_orders")}
            </p>
          )}

          {orders.length > 0 && (
            <div className="space-y-6">
              {orders.map((order) => (
                <AnimatedSection key={order.id}>
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {t("order_number")}: {order.orderNumber}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {t("date")}:{" "}
                          {order.createdAt.toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <p className="text-xl font-bold text-primary-600">
                        {formatPrice(order.total)}
                      </p>
                    </div>

                    <OrderStatusBar status={order.status} />

                    <div className="mt-4 space-y-2">
                      {order.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between text-sm text-slate-600 dark:text-slate-400"
                        >
                          <span>
                            {item.name} x{item.quantity}
                          </span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => generateBill(order)}
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      {t("download_bill")}
                    </button>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
