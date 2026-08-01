"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types/order";

interface OrderStatusBarProps {
  status: OrderStatus;
}

const STEPS: { key: OrderStatus; translationKey: string }[] = [
  { key: "pending_payment", translationKey: "status_pending" },
  { key: "payment_received", translationKey: "status_received" },
  { key: "processing", translationKey: "status_processing" },
  { key: "delivered", translationKey: "status_delivered" },
];

const STATUS_INDEX: Record<OrderStatus, number> = {
  pending_payment: 0,
  payment_received: 1,
  processing: 2,
  delivered: 3,
  cancelled: -1,
};

export default function OrderStatusBar({ status }: OrderStatusBarProps) {
  const t = useTranslations("orders");
  const isCancelled = status === "cancelled";
  const currentIndex = STATUS_INDEX[status];

  if (isCancelled) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
        <div className="flex items-center justify-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-red-600 dark:text-red-400"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <span className="text-lg font-bold text-red-700 dark:text-red-400">
            {t("status_cancelled")}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex min-w-[400px] items-center">
        {STEPS.map((step, i) => {
          const isPast = i < currentIndex;
          const isCurrent = i === currentIndex;
          const isFuture = i > currentIndex;

          return (
            <div key={step.key} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                {/* Circle */}
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                    isCurrent &&
                      "border-primary-600 bg-primary-600 text-white dark:border-primary-500 dark:bg-primary-500",
                    isPast &&
                      "border-primary-600 bg-primary-100 text-primary-700 dark:border-primary-500 dark:bg-primary-900 dark:text-primary-300",
                    isFuture &&
                      "border-slate-300 bg-white text-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-500"
                  )}
                >
                  {isPast ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <span className="text-sm font-bold">{i + 1}</span>
                  )}
                </div>

                {/* Label */}
                <span
                  className={cn(
                    "mt-2 text-center text-xs font-semibold leading-tight sm:text-sm",
                    isCurrent &&
                      "text-primary-700 dark:text-primary-400",
                    isPast &&
                      "text-primary-600 dark:text-primary-500",
                    isFuture &&
                      "text-slate-400 dark:text-slate-500"
                  )}
                >
                  {t(step.translationKey)}
                </span>
              </div>

              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-1 mt-[-1.25rem] h-0.5 flex-1 sm:mx-2",
                    i < currentIndex
                      ? "bg-primary-500 dark:bg-primary-600"
                      : "bg-slate-200 dark:bg-slate-700"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
