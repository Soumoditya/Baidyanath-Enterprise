"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { useAuth } from "@/hooks/use-auth";
import { signOut } from "@/lib/firebase/auth";
import { getOrdersByUser } from "@/lib/firebase/firestore";
import { Order } from "@/types/order";
import { formatPrice } from "@/lib/utils";
import { generateBill } from "@/lib/pdf/generate-bill";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import OrderStatusBar from "@/components/checkout/order-status-bar";
import Skeleton from "@/components/ui/skeleton";

export default function AccountPage() {
  const t = useTranslations("account");
  const to = useTranslations("orders");
  const router = useRouter();
  const { user, isAdmin, isLoading } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.replace("/login");
  }, [user, isLoading, router]);

  const loadOrders = useCallback(async () => {
    if (!user) return;
    setLoadingOrders(true);
    setError("");
    try {
      setOrders(await getOrdersByUser(user.uid));
    } catch (err) {
      setError(err instanceof Error ? err.message : t("orders_error"));
    } finally {
      setLoadingOrders(false);
    }
  }, [user, t]);

  useEffect(() => {
    if (user) loadOrders();
  }, [user, loadOrders]);

  const handleSignOut = async () => {
    await signOut();
    router.replace("/");
  };

  if (isLoading || !user) {
    return (
      <>
        <Header />
        <main className="flex-1">
          <div className="mx-auto max-w-4xl space-y-4 px-4 py-12 sm:px-6 lg:px-8">
            <Skeleton className="h-28 w-full rounded-2xl" />
            <Skeleton className="h-40 w-full rounded-2xl" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const initials = (user.displayName || user.email || "?")
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Profile card */}
          <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)] dark:border-slate-700 dark:bg-slate-800">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-2xl font-bold text-white">
              {initials}
            </span>
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-2xl font-bold text-slate-900 dark:text-white">
                {user.displayName || t("customer")}
              </h1>
              <p className="truncate text-base text-slate-500 dark:text-slate-400">
                {user.email}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              {isAdmin && (
                <Link
                  href="/admin"
                  className="rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-700"
                >
                  {t("admin_panel")}
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                {t("sign_out")}
              </button>
            </div>
          </div>

          {/* Orders */}
          <h2 className="mb-4 mt-10 text-xl font-bold text-slate-900 dark:text-white">
            {t("my_orders")}
          </h2>

          {error && (
            <p className="rounded-xl bg-red-50 p-4 text-center text-sm font-medium text-red-700 dark:bg-red-900/20 dark:text-red-300">
              {error}
            </p>
          )}

          {loadingOrders ? (
            <div className="space-y-4">
              <Skeleton className="h-40 w-full rounded-2xl" />
              <Skeleton className="h-40 w-full rounded-2xl" />
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center dark:border-slate-700">
              <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                {t("no_orders")}
              </p>
              <Link
                href="/products"
                className="mt-5 inline-flex rounded-xl bg-primary-600 px-6 py-3 text-base font-bold text-white transition-colors hover:bg-primary-700"
              >
                {t("start_shopping")}
              </Link>
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
                    {to("download_bill")}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
