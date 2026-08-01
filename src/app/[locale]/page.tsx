"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/home/hero-section";
import BrandsStrip from "@/components/home/brands-strip";
import CategoriesSection from "@/components/home/categories-section";
import FeaturedProducts from "@/components/home/featured-products";
import AboutSection from "@/components/home/about-section";
import BulkCta from "@/components/home/bulk-cta";
import ContactSection from "@/components/home/contact-section";
import { getProducts } from "@/lib/firebase/firestore";
import { Product } from "@/types/product";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((products) => {
        setFeaturedProducts(products.filter((p) => p.featured && p.inStock));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <BrandsStrip />
        <CategoriesSection />
        <FeaturedProducts products={featuredProducts} loading={loading} />
        <AboutSection />
        <BulkCta />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
