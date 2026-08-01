"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import OrderTable from "@/components/admin/order-table";
import { getOrders, updateOrderStatus } from "@/lib/firebase/firestore";
import { Order, OrderStatus } from "@/types/order";

export default function AdminOrdersPage() {
  const t = useTranslations("admin");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

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
    await updateOrderStatus(id, status);
    loadOrders();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        {t("orders")}
      </h1>
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        </div>
      ) : (
        <OrderTable orders={orders} onStatusUpdate={handleStatusUpdate} />
      )}
    </div>
  );
}
