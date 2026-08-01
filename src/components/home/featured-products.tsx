"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Product } from "@/types/product";
import ProductCard from "@/components/products/product-card";
import ProductCardSkeleton from "@/components/products/product-card-skeleton";
import AnimatedSection from "@/components/shared/animated-section";

interface FeaturedProductsProps {
  products: Product[];
  loading?: boolean;
}

export default function FeaturedProducts({
  products,
  loading = false,
}: FeaturedProductsProps) {
  const t = useTranslations("home");

  // Nothing featured yet and not loading — hide the section entirely.
  if (!loading && products.length === 0) return null;

  return (
    <AnimatedSection>
      <section className="bg-slate-50 dark:bg-slate-800/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                {t("featured_title")}
              </h2>
              <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
                {t("featured_subtitle")}
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-base font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              {t("view_all")}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              : products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
