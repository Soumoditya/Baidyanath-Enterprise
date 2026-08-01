"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import ProductForm from "@/components/admin/product-form";

export default function NewProductPage() {
  const t = useTranslations("admin");
  const router = useRouter();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        {t("add_product")}
      </h1>
      <ProductForm onSaved={() => router.push("/admin/products")} />
    </div>
  );
}
