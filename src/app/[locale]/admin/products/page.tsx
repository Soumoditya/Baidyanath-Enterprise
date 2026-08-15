"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "@/i18n/navigation";
import ProductTable from "@/components/admin/product-table";
import Skeleton from "@/components/ui/skeleton";
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "@/lib/firebase/firestore";
import { Product, CATEGORIES, getCategoryLabel } from "@/types/product";
import { cn } from "@/lib/utils";

type SortKey = "recent" | "name" | "price-asc" | "price-desc";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<SortKey>("recent");

  const loadProducts = useCallback(() => {
    setLoading(true);
    getProducts()
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    loadProducts();
  };

  // Inline stock toggle — optimistic, then persist.
  const handleToggleStock = async (id: string, inStock: boolean) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, inStock } : p)));
    try {
      await updateProduct(id, { inStock });
    } catch {
      loadProducts(); // revert to server truth on failure
    }
  };

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesCat = !category || p.category === category;
      const matchesSearch =
        !search || p.name.en.toLowerCase().includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    });
    list = [...list];
    switch (sort) {
      case "name":
        list.sort((a, b) => a.name.en.localeCompare(b.name.en));
        break;
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      default:
        list.sort((a, b) => (b.sortOrder || 0) - (a.sortOrder || 0));
    }
    return list;
  }, [products, search, category, sort]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl text-slate-900 dark:text-white sm:text-3xl">
            Products
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {products.length} total · {products.filter((p) => !p.inStock).length} out of stock
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-700"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Add Product
        </Link>
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <svg className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-base text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>{getCategoryLabel(c.slug)}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        >
          <option value="recent">Newest</option>
          <option value="name">Name A–Z</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className={cn("h-24 rounded-2xl")} />
          ))}
        </div>
      ) : (
        <ProductTable
          products={filtered}
          onDelete={handleDelete}
          onRefresh={loadProducts}
          onToggleStock={handleToggleStock}
        />
      )}
    </div>
  );
}
