"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import OrderTable from "@/components/admin/order-table";
import Skeleton from "@/components/ui/skeleton";
import { getOrders, updateOrderStatus } from "@/lib/firebase/firestore";
import { Order, OrderStatus } from "@/types/order";
import { cn } from "@/lib/utils";

const FILTERS: { key: OrderStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending_payment", label: "Pending" },
  { key: "payment_received", label: "Paid" },
  { key: "processing", label: "Processing" },
  { key: "delivered", label: "Delivered" },
  { key: "cancelled", label: "Cancelled" },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  const loadOrders = useCallback(() => {
    setLoading(true);
    getOrders()
      .then(setOrders)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleStatusUpdate = async (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    try {
      await updateOrderStatus(id, status);
    } catch {
      loadOrders();
    }
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: orders.length };
    for (const o of orders) c[o.status] = (c[o.status] || 0) + 1;
    return c;
  }, [orders]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter((o) => {
      const matchesFilter = filter === "all" || o.status === filter;
      const matchesSearch =
        !q ||
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [orders, filter, search]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-slate-900 dark:text-white sm:text-3xl">
          Orders
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {orders.length} total · {counts["pending_payment"] || 0} awaiting payment
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <svg className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by order #, name or phone…"
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-base text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {/* Status filter tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              filter === f.key
                ? "bg-primary-600 text-white"
                : "border border-slate-300 bg-white text-slate-700 hover:border-primary-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
            )}
          >
            {f.label}
            <span className={cn("rounded-full px-1.5 text-xs", filter === f.key ? "bg-white/20" : "bg-slate-100 dark:bg-slate-700")}>
              {counts[f.key] || 0}
            </span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-2xl" />
          ))}
        </div>
      ) : (
        <OrderTable orders={filtered} onStatusUpdate={handleStatusUpdate} />
      )}
    </div>
  );
}
