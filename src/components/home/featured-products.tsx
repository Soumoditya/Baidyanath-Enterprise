"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Product } from "@/types/product";
import ProductCard from "@/components/products/product-card";
import ProductCardSkeleton from "@/components/products/product-card-skeleton";
import Reveal from "@/components/shared/reveal";
import Container from "@/components/ui/container";

interface FeaturedProductsProps {
  products: Product[];
  loading?: boolean;
}

export default function FeaturedProducts({
  products,
  loading = false,
}: FeaturedProductsProps) {
  const t = useTranslations("home");

  if (!loading && products.length === 0) return null;

  return (
    <section className="bg-slate-50 py-16 sm:py-20 dark:bg-ink-850">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl text-slate-900 sm:text-4xl dark:text-white">
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
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.map((product, i) => (
                <Reveal key={product.id} delay={Math.min(i, 6) * 0.05} className="h-full">
                  <ProductCard product={product} />
                </Reveal>
              ))}
        </div>
      </Container>
    </section>
  );
}
