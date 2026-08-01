"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProductCard from "@/components/products/product-card";
import ProductCardSkeleton from "@/components/products/product-card-skeleton";
import CategoryIcon from "@/components/shared/category-icon";
import { getProducts } from "@/lib/firebase/firestore";
import { Product, CATEGORIES } from "@/types/product";
import { getLocalizedName, cn } from "@/lib/utils";

export default function ProductsPage() {
  const t = useTranslations("products");
  const tc = useTranslations("categories");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "");

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const filtered = products.filter((p) => {
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    const matchesSearch =
      !search ||
      getLocalizedName(p.name, locale).toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Page header band */}
        <div className="border-b border-slate-200 bg-gradient-to-b from-primary-50 to-white dark:border-slate-800 dark:from-primary-950/40 dark:to-slate-900">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              {t("title")}
            </h1>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
              {t("subtitle")}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="relative mb-5">
            <svg className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={t("search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-base text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Category chips */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                !selectedCategory
                  ? "bg-primary-600 text-white"
                  : "border border-slate-300 bg-white text-slate-700 hover:border-primary-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
              )}
            >
              {t("all_categories")}
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  selectedCategory === cat.slug
                    ? "bg-primary-600 text-white"
                    : "border border-slate-300 bg-white text-slate-700 hover:border-primary-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                )}
              >
                <CategoryIcon slug={cat.slug} className="h-4 w-4" />
                {tc(cat.slug)}
              </button>
            ))}
          </div>

          {/* Results */}
          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 py-20 text-center dark:border-slate-700">
              <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                {t("no_products")}
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {t("no_products_sub")}
              </p>
            </div>
          ) : (
            <>
              <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
                {t("showing", { count: filtered.length })}
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
