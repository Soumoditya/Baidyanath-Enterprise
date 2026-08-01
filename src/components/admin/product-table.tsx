"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Product, CATEGORIES } from "@/types/product";
import { formatPrice, cn } from "@/lib/utils";

interface ProductTableProps {
  products: Product[];
  onDelete: (id: string) => void;
  onRefresh: () => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  healthcare: "Healthcare",
  cleaning: "Cleaning",
  food: "Food & Beverages",
  otc: "OTC Medicine",
  household: "Household",
};

function getCategoryIcon(slug: string): string {
  const cat = CATEGORIES.find((c) => c.slug === slug);
  return cat?.icon || "";
}

export default function ProductTable({
  products,
  onDelete,
  onRefresh,
}: ProductTableProps) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  function handleDeleteClick(id: string) {
    setConfirmDeleteId(id);
  }

  function handleConfirmDelete() {
    if (confirmDeleteId) {
      onDelete(confirmDeleteId);
      setConfirmDeleteId(null);
    }
  }

  function handleCancelDelete() {
    setConfirmDeleteId(null);
  }

  if (products.length === 0) {
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
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
        <p className="mb-2 text-xl font-semibold text-slate-600 dark:text-slate-300">
          No products yet
        </p>
        <p className="mb-6 text-base text-slate-400 dark:text-slate-500">
          Add your first product to get started.
        </p>
        <Link
          href="/admin/products/new"
          className="rounded-xl bg-primary-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
        >
          + Add Product
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Delete confirmation dialog */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-800">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-7 w-7 text-red-600 dark:text-red-400"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Delete Product?
            </h3>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
              This product will be permanently removed. This action cannot be
              undone.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleCancelDelete}
                className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Refresh button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/80">
              <th className="px-4 py-3.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
                Image
              </th>
              <th className="px-4 py-3.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
                Name
              </th>
              <th className="px-4 py-3.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
                Price
              </th>
              <th className="px-4 py-3.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
                Category
              </th>
              <th className="px-4 py-3.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
                Stock
              </th>
              <th className="px-4 py-3.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {products.map((product) => (
              <tr
                key={product.id}
                className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
              >
                <td className="px-4 py-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-700">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name.en}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          className="h-6 w-6"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="text-base font-semibold text-slate-900 dark:text-white">
                    {product.name.en}
                  </p>
                  {product.unit && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {product.unit}
                    </p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <p className="text-base font-semibold text-slate-900 dark:text-white">
                    {formatPrice(product.price)}
                  </p>
                  {product.mrp && product.mrp > product.price && (
                    <p className="text-sm text-slate-400 line-through">
                      {formatPrice(product.mrp)}
                    </p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
                    {getCategoryIcon(product.category)}{" "}
                    {CATEGORY_LABELS[product.category] || product.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                      product.inStock
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                    )}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="rounded-lg bg-primary-50 px-3.5 py-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-100 dark:bg-primary-900/20 dark:text-primary-300 dark:hover:bg-primary-900/40"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(product.id)}
                      className="rounded-lg bg-red-50 px-3.5 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/40"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex items-start gap-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-700">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name.en}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-slate-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      className="h-8 w-8"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <p className="text-base font-semibold text-slate-900 dark:text-white">
                  {product.name.en}
                </p>
                <p className="mt-0.5 text-base font-bold text-primary-600 dark:text-primary-400">
                  {formatPrice(product.price)}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {getCategoryIcon(product.category)}{" "}
                    {CATEGORY_LABELS[product.category] || product.category}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-semibold",
                      product.inStock
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                    )}
                  >
                    {product.inStock ? "In Stock" : "Out"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="flex-1 rounded-xl bg-primary-50 px-4 py-2.5 text-center text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-100 dark:bg-primary-900/20 dark:text-primary-300 dark:hover:bg-primary-900/40"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDeleteClick(product.id)}
                className="flex-1 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/40"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
