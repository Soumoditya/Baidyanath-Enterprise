"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import DashboardStats from "@/components/admin/dashboard-stats";
import { getProducts, getOrders } from "@/lib/firebase/firestore";
import { Product } from "@/types/product";
import { Order } from "@/types/order";

export default function AdminDashboard() {
  const t = useTranslations("admin");
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        {t("dashboard")}
      </h1>
      <DashboardStats products={products} orders={orders} />
    </div>
  );
}
