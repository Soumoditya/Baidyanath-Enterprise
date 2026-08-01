"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import OrderStatusBar from "@/components/checkout/order-status-bar";
import { getOrderById, updateOrderStatus } from "@/lib/firebase/firestore";
import { Order, OrderStatus } from "@/types/order";
import { formatPrice } from "@/lib/utils";
import { generateBill } from "@/lib/pdf/generate-bill";

export default function AdminOrderDetailPage() {
  const t = useTranslations("admin");
  const to = useTranslations("orders");
  const params = useParams();
  const orderId = params.orderId as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrderById(orderId)
      .then(setOrder)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [orderId]);

  const handleStatusChange = async (status: OrderStatus) => {
    if (!order) return;
    await updateOrderStatus(order.id, status);
    setOrder({ ...order, status });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-slate-500">Order not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 text-base"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {t("orders")}
      </Link>

      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        {t("order_details")}: {order.orderNumber}
      </h1>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
        <OrderStatusBar status={order.status} />

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t("customer")}</p>
            <p className="text-base font-medium text-slate-900 dark:text-white">{order.customerName}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{to("date")}</p>
            <p className="text-base font-medium text-slate-900 dark:text-white">
              {order.createdAt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Phone</p>
            <a href={`tel:${order.customerPhone}`} className="text-base font-medium text-primary-600">
              {order.customerPhone}
            </a>
          </div>
          {order.customerEmail && (
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
              <p className="text-base text-slate-900 dark:text-white">{order.customerEmail}</p>
            </div>
          )}
          <div className="sm:col-span-2">
            <p className="text-sm text-slate-500 dark:text-slate-400">Address</p>
            <p className="text-base text-slate-900 dark:text-white">{order.customerAddress}</p>
          </div>
          {order.notes && (
            <div className="sm:col-span-2">
              <p className="text-sm text-slate-500 dark:text-slate-400">Notes</p>
              <p className="text-base text-slate-900 dark:text-white">{order.notes}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{to("items")}</h2>
        <div className="space-y-3">
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
              <div>
                <p className="text-base font-medium text-slate-900 dark:text-white">{item.name}</p>
                <p className="text-sm text-slate-500">
                  {formatPrice(item.price)} x {item.quantity}
                </p>
              </div>
              <p className="text-base font-semibold text-slate-900 dark:text-white">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between">
          <span className="text-lg font-bold text-slate-900 dark:text-white">{to("total")}</span>
          <span className="text-lg font-bold text-primary-600">{formatPrice(order.total)}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={order.status}
          onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
          className="px-4 py-3 text-base rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
        >
          <option value="pending_payment">{to("status_pending")}</option>
          <option value="payment_received">{to("status_received")}</option>
          <option value="processing">{to("status_processing")}</option>
          <option value="delivered">{to("status_delivered")}</option>
          <option value="cancelled">{to("status_cancelled")}</option>
        </select>
        <button
          onClick={() => generateBill(order)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors font-medium text-base"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {to("download_bill")}
        </button>
      </div>
    </div>
  );
}
