"use client";

import { useEffect, useState } from "react";
import Dashboard from "@/components/admin/dashboard";
import Skeleton from "@/components/ui/skeleton";
import { getProducts, getOrders } from "@/lib/firebase/firestore";
import { Product } from "@/types/product";
import { Order } from "@/types/order";

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProducts(), getOrders()])
      .then(([p, o]) => {
        setProducts(p);
        setOrders(o);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-slate-900 dark:text-white sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Your store at a glance
        </p>
      </div>

      {loading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            <Skeleton className="col-span-2 h-28 rounded-2xl" />
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-2xl" />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Skeleton className="h-56 rounded-2xl lg:col-span-2" />
            <Skeleton className="h-56 rounded-2xl" />
          </div>
        </div>
      ) : (
        <Dashboard products={products} orders={orders} />
      )}
    </div>
  );
}
