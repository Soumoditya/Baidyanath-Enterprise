"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Product } from "@/types/product";
import ProductCard from "@/components/products/product-card";
import AnimatedSection from "@/components/shared/animated-section";

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const t = useTranslations("home");

  return (
    <AnimatedSection>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {t("featured_products")}
          </h2>
          <Link
            href="/products"
            className="text-base font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            {t("view_all_products")} &rarr;
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
}
