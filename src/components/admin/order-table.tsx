"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Order, OrderStatus } from "@/types/order";
import { formatPrice, cn } from "@/lib/utils";

interface OrderTableProps {
  orders: Order[];
  onStatusUpdate: (id: string, status: OrderStatus) => void;
}

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; bg: string; text: string }
> = {
  pending_payment: {
    label: "Pending Payment",
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-300",
  },
  payment_received: {
    label: "Payment Received",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-300",
  },
  processing: {
    label: "Processing",
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-700 dark:text-purple-300",
  },
  delivered: {
    label: "Delivered",
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-700 dark:text-green-300",
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-700 dark:text-red-300",
  },
};

const ALL_STATUSES: OrderStatus[] = [
  "pending_payment",
  "payment_received",
  "processing",
  "delivered",
  "cancelled",
];

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function OrderTable({ orders, onStatusUpdate }: OrderTableProps) {
  const [changingStatusId, setChangingStatusId] = useState<string | null>(null);

  function handleStatusChange(orderId: string, newStatus: OrderStatus) {
    onStatusUpdate(orderId, newStatus);
    setChangingStatusId(null);
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-16 dark:border-slate-600 dark:bg-slate-800/50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mb-4 h-16 w-16 text-slate-300 dark:text-slate-600"
        >
          <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        </svg>
        <p className="mb-2 text-xl font-semibold text-slate-600 dark:text-slate-300">
          No orders yet
        </p>
        <p className="text-base text-slate-400 dark:text-slate-500">
          Orders will appear here when customers place them.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/80">
              <th className="px-4 py-3.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
                Order #
              </th>
              <th className="px-4 py-3.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
                Customer
              </th>
              <th className="px-4 py-3.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
                Phone
              </th>
              <th className="px-4 py-3.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
                Items
              </th>
              <th className="px-4 py-3.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
                Total
              </th>
              <th className="px-4 py-3.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
                Status
              </th>
              <th className="px-4 py-3.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
                Date
              </th>
              <th className="px-4 py-3.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {orders.map((order) => {
              const statusCfg = STATUS_CONFIG[order.status];

              return (
                <tr
                  key={order.id}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-base font-semibold text-primary-600 hover:underline dark:text-primary-400"
                    >
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-base text-slate-900 dark:text-white">
                    {order.customerName}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                    {order.customerPhone}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                    {order.items.length}{" "}
                    {order.items.length === 1 ? "item" : "items"}
                  </td>
                  <td className="px-4 py-3 text-base font-semibold text-slate-900 dark:text-white">
                    {formatPrice(order.total)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                        statusCfg.bg,
                        statusCfg.text
                      )}
                    >
                      {statusCfg.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setChangingStatusId(
                            changingStatusId === order.id ? null : order.id
                          )
                        }
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                      >
                        Change Status
                      </button>

                      {changingStatusId === order.id && (
                        <>
                          {/* Click-away backdrop */}
                          <div
                            className="fixed inset-0 z-30"
                            onClick={() => setChangingStatusId(null)}
                          />
                          <div className="absolute right-0 top-full z-40 mt-1 w-52 rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-600 dark:bg-slate-700">
                            {ALL_STATUSES.map((status) => {
                              const cfg = STATUS_CONFIG[status];
                              return (
                                <button
                                  key={status}
                                  onClick={() =>
                                    handleStatusChange(order.id, status)
                                  }
                                  className={cn(
                                    "flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-600",
                                    order.status === status
                                      ? "bg-slate-50 dark:bg-slate-600/50"
                                      : ""
                                  )}
                                >
                                  <span
                                    className={cn(
                                      "inline-flex rounded-full px-2 py-0.5 text-xs font-semibold",
                                      cfg.bg,
                                      cfg.text
                                    )}
                                  >
                                    {cfg.label}
                                  </span>
                                  {order.status === status && (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth={2.5}
                                      className="ml-auto h-4 w-4 text-primary-600 dark:text-primary-400"
                                    >
                                      <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {orders.map((order) => {
          const statusCfg = STATUS_CONFIG[order.status];

          return (
            <div
              key={order.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
              {/* Header row */}
              <div className="flex items-start justify-between">
                <div>
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="text-base font-bold text-primary-600 hover:underline dark:text-primary-400"
                  >
                    {order.orderNumber}
                  </Link>
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <span
                  className={cn(
                    "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                    statusCfg.bg,
                    statusCfg.text
                  )}
                >
                  {statusCfg.label}
                </span>
              </div>

              {/* Customer info */}
              <div className="mt-3 space-y-1">
                <p className="text-base font-semibold text-slate-900 dark:text-white">
                  {order.customerName}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {order.customerPhone}
                </p>
              </div>

              {/* Order info */}
              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-700">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {order.items.length}{" "}
                  {order.items.length === 1 ? "item" : "items"}
                </span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  {formatPrice(order.total)}
                </span>
              </div>

              {/* Status change */}
              <div className="mt-3">
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(
                      order.id,
                      e.target.value as OrderStatus
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-medium text-slate-700 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:focus:border-primary-400"
                >
                  {ALL_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {STATUS_CONFIG[status].label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
