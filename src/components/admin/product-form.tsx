"use client";

import { useState } from "react";
import { Product, CATEGORIES, getCategoryLabel } from "@/types/product";
import { addProduct, updateProduct } from "@/lib/firebase/firestore";
import { slugify, cn } from "@/lib/utils";
import ImageUploader from "@/components/admin/image-uploader";

interface ProductFormProps {
  product?: Product;
  onSaved: () => void;
}

export default function ProductForm({ product, onSaved }: ProductFormProps) {
  const isEditing = !!product;

  // Name fields
  const [nameEn, setNameEn] = useState(product?.name.en || "");
  const [nameBn, setNameBn] = useState(product?.name.bn || "");
  const [nameHi, setNameHi] = useState(product?.name.hi || "");

  // Description fields
  const [descEn, setDescEn] = useState(product?.description.en || "");
  const [descBn, setDescBn] = useState(product?.description.bn || "");
  const [descHi, setDescHi] = useState(product?.description.hi || "");

  // Product details
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [mrp, setMrp] = useState(product?.mrp?.toString() || "");
  const [category, setCategory] = useState(
    product?.category || CATEGORIES[0].slug
  );
  const [unit, setUnit] = useState(product?.unit || "");
  const [inStock, setInStock] = useState(product?.inStock ?? true);
  const [featured, setFeatured] = useState(product?.featured ?? false);

  // Image
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
  const [imagePublicId, setImagePublicId] = useState(
    product?.imagePublicId || ""
  );

  // Form state
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Validation
    if (!nameEn.trim()) {
      setError("Product Name (English) is required.");
      return;
    }
    if (!price || parseFloat(price) <= 0) {
      setError("Please enter a valid price.");
      return;
    }

    setIsSaving(true);

    try {
      const productData = {
        name: {
          en: nameEn.trim(),
          ...(nameBn.trim() && { bn: nameBn.trim() }),
          ...(nameHi.trim() && { hi: nameHi.trim() }),
        },
        slug: slugify(nameEn.trim()),
        description: {
          en: descEn.trim(),
          ...(descBn.trim() && { bn: descBn.trim() }),
          ...(descHi.trim() && { hi: descHi.trim() }),
        },
        price: parseFloat(price),
        ...(mrp && parseFloat(mrp) > 0 && { mrp: parseFloat(mrp) }),
        category,
        imageUrl,
        ...(imagePublicId && { imagePublicId }),
        inStock,
        unit: unit.trim(),
        featured,
        sortOrder: product?.sortOrder ?? Date.now(),
      };

      if (isEditing && product) {
        await updateProduct(product.id, productData);
      } else {
        await addProduct(productData);
      }

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onSaved();
      }, 1500);
    } catch {
      setError("Failed to save product. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Success message */}
      {showSuccess && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center text-lg font-semibold text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300">
          Product saved successfully!
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center text-base font-medium text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
          {error}
        </div>
      )}

      {/* ── Product Name ── */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          Product Name
        </h3>

        <div>
          <label
            htmlFor="name-en"
            className="mb-2 block text-base font-semibold text-slate-700 dark:text-slate-200"
          >
            Name in English <span className="text-red-500">*</span>
          </label>
          <input
            id="name-en"
            type="text"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            placeholder="e.g. Hajmola Candy"
            required
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-lg text-slate-900 placeholder-slate-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-primary-400"
          />
        </div>

        <div>
          <label
            htmlFor="name-bn"
            className="mb-2 block text-base font-medium text-slate-600 dark:text-slate-300"
          >
            Name in Bengali (optional)
          </label>
          <input
            id="name-bn"
            type="text"
            value={nameBn}
            onChange={(e) => setNameBn(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-lg text-slate-900 placeholder-slate-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-primary-400"
          />
        </div>

        <div>
          <label
            htmlFor="name-hi"
            className="mb-2 block text-base font-medium text-slate-600 dark:text-slate-300"
          >
            Name in Hindi (optional)
          </label>
          <input
            id="name-hi"
            type="text"
            value={nameHi}
            onChange={(e) => setNameHi(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-lg text-slate-900 placeholder-slate-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-primary-400"
          />
        </div>
      </section>

      {/* ── Description ── */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          Description
        </h3>

        <div>
          <label
            htmlFor="desc-en"
            className="mb-2 block text-base font-medium text-slate-600 dark:text-slate-300"
          >
            Description in English
          </label>
          <textarea
            id="desc-en"
            value={descEn}
            onChange={(e) => setDescEn(e.target.value)}
            rows={3}
            placeholder="Brief product description..."
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 placeholder-slate-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-primary-400"
          />
        </div>

        <div>
          <label
            htmlFor="desc-bn"
            className="mb-2 block text-base font-medium text-slate-600 dark:text-slate-300"
          >
            Description in Bengali (optional)
          </label>
          <textarea
            id="desc-bn"
            value={descBn}
            onChange={(e) => setDescBn(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 placeholder-slate-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-primary-400"
          />
        </div>

        <div>
          <label
            htmlFor="desc-hi"
            className="mb-2 block text-base font-medium text-slate-600 dark:text-slate-300"
          >
            Description in Hindi (optional)
          </label>
          <textarea
            id="desc-hi"
            value={descHi}
            onChange={(e) => setDescHi(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 placeholder-slate-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-primary-400"
          />
        </div>
      </section>

      {/* ── Pricing & Details ── */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          Pricing & Details
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="price"
              className="mb-2 block text-base font-semibold text-slate-700 dark:text-slate-200"
            >
              Selling Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-medium text-slate-400">
                &#8377;
              </span>
              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="0.00"
                className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-10 pr-4 text-lg text-slate-900 placeholder-slate-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-primary-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="mrp"
              className="mb-2 block text-base font-medium text-slate-600 dark:text-slate-300"
            >
              MRP (optional, for showing discount)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-medium text-slate-400">
                &#8377;
              </span>
              <input
                id="mrp"
                type="number"
                min="0"
                step="0.01"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-10 pr-4 text-lg text-slate-900 placeholder-slate-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-primary-400"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-base font-semibold text-slate-700 dark:text-slate-200"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-lg text-slate-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-primary-400"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {getCategoryLabel(cat.slug)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="unit"
              className="mb-2 block text-base font-medium text-slate-600 dark:text-slate-300"
            >
              Unit (e.g. 500g, 1L, 10 tablets)
            </label>
            <input
              id="unit"
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="e.g. 500g"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-lg text-slate-900 placeholder-slate-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-primary-400"
            />
          </div>
        </div>
      </section>

      {/* ── Toggles ── */}
      <section className="space-y-5">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          Availability
        </h3>

        {/* In Stock toggle */}
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-700 dark:bg-slate-800">
          <div>
            <p className="text-base font-semibold text-slate-800 dark:text-slate-100">
              In Stock
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Customers can order this product
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={inStock}
            onClick={() => setInStock(!inStock)}
            className={cn(
              "relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:ring-offset-2 dark:focus:ring-offset-slate-800",
              inStock
                ? "bg-green-500"
                : "bg-slate-300 dark:bg-slate-600"
            )}
          >
            <span
              className={cn(
                "inline-block h-6 w-6 rounded-full bg-white shadow-sm transition-transform",
                inStock ? "translate-x-7" : "translate-x-1"
              )}
            />
          </button>
        </div>

        {/* Featured toggle */}
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-700 dark:bg-slate-800">
          <div>
            <p className="text-base font-semibold text-slate-800 dark:text-slate-100">
              Featured Product
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Show on the homepage
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={featured}
            onClick={() => setFeatured(!featured)}
            className={cn(
              "relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:ring-offset-2 dark:focus:ring-offset-slate-800",
              featured
                ? "bg-primary-500"
                : "bg-slate-300 dark:bg-slate-600"
            )}
          >
            <span
              className={cn(
                "inline-block h-6 w-6 rounded-full bg-white shadow-sm transition-transform",
                featured ? "translate-x-7" : "translate-x-1"
              )}
            />
          </button>
        </div>
      </section>

      {/* ── Image ── */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          Product Image
        </h3>
        <ImageUploader
          currentImage={imageUrl || undefined}
          onUpload={(url, publicId) => {
            setImageUrl(url);
            setImagePublicId(publicId);
          }}
        />
      </section>

      {/* ── Submit ── */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSaving}
          className={cn(
            "w-full rounded-xl px-6 py-4 text-lg font-bold text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:ring-offset-2 dark:focus:ring-offset-slate-900",
            isSaving
              ? "cursor-not-allowed bg-primary-400 dark:bg-primary-600"
              : "bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
          )}
        >
          {isSaving ? (
            <span className="flex items-center justify-center gap-3">
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Saving...
            </span>
          ) : isEditing ? (
            "Update Product"
          ) : (
            "Save Product"
          )}
        </button>
      </div>
    </form>
  );
}
