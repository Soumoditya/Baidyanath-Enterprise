"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProductCard from "@/components/products/product-card";
import AnimatedSection from "@/components/shared/animated-section";
import { getProductBySlug, getProducts } from "@/lib/firebase/firestore";
import { Product } from "@/types/product";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice, getLocalizedName } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

export default function ProductDetailPage() {
  const t = useTranslations("products");
  const tc = useTranslations("common");
  const locale = useLocale();
  const params = useParams();
  const slug = params.slug as string;
  const addItem = useCartStore((s) => s.addItem);

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    getProductBySlug(slug)
      .then(async (p) => {
        setProduct(p);
        if (p) {
          const all = await getProducts();
          setRelated(
            all
              .filter(
                (r) =>
                  r.category === p.category && r.id !== p.id && r.inStock
              )
              .slice(0, 4)
          );
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAddToCart = () => {
    if (!product || !product.inStock) return;
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name.en,
        price: product.price,
        imageUrl: product.imageUrl,
        unit: product.unit,
        maxStock: product.inStock,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center py-20">
          <p className="text-xl text-slate-500 mb-4">{t("no_products")}</p>
          <Link
            href="/products"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            {tc("back")}
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const name = getLocalizedName(product.name, locale);
  const description = getLocalizedName(product.description, locale);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 text-base"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {tc("back")}
          </Link>

          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      className="w-24 h-24 text-slate-300 dark:text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  {name}
                </h1>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-primary-600">
                    {formatPrice(product.price)}
                  </span>
                  {product.mrp && product.mrp > product.price && (
                    <span className="text-xl text-slate-400 line-through">
                      {formatPrice(product.mrp)}
                    </span>
                  )}
                </div>

                {product.unit && (
                  <p className="text-base text-slate-500 dark:text-slate-400 mb-4">
                    {t("per_unit", { unit: product.unit })}
                  </p>
                )}

                <span
                  className={`inline-flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-sm font-medium mb-6 ${
                    product.inStock
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`}
                  />
                  {product.inStock ? t("in_stock") : t("out_of_stock")}
                </span>

                {description && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      {t("description")}
                    </h2>
                    <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                      {description}
                    </p>
                  </div>
                )}

                {product.inStock && (
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-3 text-lg font-medium hover:bg-slate-100 dark:hover:bg-slate-700 rounded-l-lg"
                      >
                        -
                      </button>
                      <span className="px-4 py-3 text-lg font-medium min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-3 text-lg font-medium hover:bg-slate-100 dark:hover:bg-slate-700 rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className={`flex-1 py-3 px-6 rounded-lg text-lg font-semibold transition-all ${
                        added
                          ? "bg-green-600 text-white"
                          : "bg-primary-600 hover:bg-primary-700 text-white"
                      }`}
                    >
                      {added ? t("added") : t("add_to_cart")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>

          {related.length > 0 && (
            <AnimatedSection className="mt-16">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                {t("related")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </AnimatedSection>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
