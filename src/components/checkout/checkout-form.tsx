"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice, cn } from "@/lib/utils";
import { createOrder } from "@/lib/firebase/firestore";
import { generateUpiLink, getUpiId } from "@/lib/upi/generate";
import { sendOrderConfirmation, sendAdminNotification } from "@/lib/emailjs/send";
import { generateBill } from "@/lib/pdf/generate-bill";
import { QRCodeSVG } from "qrcode.react";
import type { Order } from "@/types/order";

type Step = 1 | 2 | 3 | 4;

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
}

const STEP_LABELS = ["Customer Info", "Review Order", "Payment", "Confirmation"];

export default function CheckoutForm() {
  const t = useTranslations("checkout");
  const tc = useTranslations("cart");
  const { items, getTotal, clearCart } = useCartStore();

  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [orderRef, setOrderRef] = useState<Order | null>(null);

  const subtotal = getTotal();
  const total = subtotal;

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("required");
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("required");
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = t("invalid_phone");
    }

    if (!formData.address.trim()) {
      newErrors.address = t("required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, t]);

  const handleInputChange = (
    field: keyof FormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleContinueToReview = () => {
    if (validate()) {
      setStep(2);
    }
  };

  const handlePlaceOrder = async () => {
    if (isSubmitting || items.length === 0) return;
    setIsSubmitting(true);

    try {
      const orderItems = items.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl,
        unit: item.unit,
      }));

      const newOrderNumber = await createOrder({
        customerName: formData.name.trim(),
        customerPhone: formData.phone.trim(),
        customerEmail: formData.email.trim() || undefined,
        customerAddress: formData.address.trim(),
        items: orderItems,
        subtotal,
        total,
        status: "pending_payment",
        notes: formData.notes.trim() || undefined,
      });

      setOrderNumber(newOrderNumber);

      const order: Order = {
        id: "",
        orderNumber: newOrderNumber,
        customerName: formData.name.trim(),
        customerPhone: formData.phone.trim(),
        customerEmail: formData.email.trim() || undefined,
        customerAddress: formData.address.trim(),
        items: orderItems,
        subtotal,
        total,
        status: "pending_payment",
        notes: formData.notes.trim() || undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setOrderRef(order);

      const itemsSummary = items
        .map((i) => `${i.name} x${i.quantity} - ${formatPrice(i.price * i.quantity)}`)
        .join("\n");

      const emailParams = {
        customerName: formData.name.trim(),
        customerEmail: formData.email.trim(),
        customerPhone: formData.phone.trim(),
        orderNumber: newOrderNumber,
        orderTotal: formatPrice(total),
        itemsSummary,
      };

      await Promise.allSettled([
        sendOrderConfirmation(emailParams),
        sendAdminNotification(emailParams),
      ]);

      setStep(3);
    } catch (error) {
      console.error("Failed to create order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentComplete = () => {
    clearCart();
    setStep(4);
  };

  const handleDownloadBill = () => {
    if (orderRef) {
      generateBill(orderRef);
    }
  };

  const upiLink = orderNumber ? generateUpiLink(total, orderNumber) : "";
  const upiId = getUpiId();

  // Empty cart guard (except on confirmation step)
  if (items.length === 0 && step < 3) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-20 w-20 text-slate-300 dark:text-slate-600"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
          {tc("empty")}
        </p>
        <Link
          href="/products"
          className="mt-4 inline-flex items-center rounded-xl bg-primary-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-700"
        >
          {tc("continue_shopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Step indicator */}
      {step < 4 && (
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEP_LABELS.map((label, i) => {
              const stepNum = (i + 1) as Step;
              const isActive = step === stepNum;
              const isCompleted = step > stepNum;

              return (
                <div key={label} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full text-base font-bold transition-colors",
                        isActive &&
                          "bg-primary-600 text-white",
                        isCompleted &&
                          "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300",
                        !isActive &&
                          !isCompleted &&
                          "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                      )}
                    >
                      {isCompleted ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        stepNum
                      )}
                    </div>
                    <span
                      className={cn(
                        "mt-1 hidden text-xs font-medium sm:block",
                        isActive
                          ? "text-primary-600 dark:text-primary-400"
                          : "text-slate-500 dark:text-slate-400"
                      )}
                    >
                      {label}
                    </span>
                  </div>
                  {i < STEP_LABELS.length - 1 && (
                    <div
                      className={cn(
                        "mx-2 h-0.5 flex-1",
                        step > stepNum
                          ? "bg-primary-300 dark:bg-primary-700"
                          : "bg-slate-200 dark:bg-slate-700"
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 1: Customer Information */}
      {step === 1 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8">
          <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
            {t("customer_info")}
          </h2>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="checkout-name"
                className="mb-1.5 block text-base font-semibold text-slate-700 dark:text-slate-300"
              >
                {t("name")} <span className="text-red-500">*</span>
              </label>
              <input
                id="checkout-name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder={t("name_placeholder")}
                className={cn(
                  "w-full rounded-xl border px-4 py-3.5 text-base text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-500",
                  errors.name
                    ? "border-red-400 dark:border-red-500"
                    : "border-slate-300 dark:border-slate-600"
                )}
              />
              {errors.name && (
                <p className="mt-1.5 text-sm font-medium text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="checkout-phone"
                className="mb-1.5 block text-base font-semibold text-slate-700 dark:text-slate-300"
              >
                {t("phone")} <span className="text-red-500">*</span>
              </label>
              <input
                id="checkout-phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={formData.phone}
                onChange={(e) =>
                  handleInputChange(
                    "phone",
                    e.target.value.replace(/\D/g, "")
                  )
                }
                placeholder={t("phone_placeholder")}
                className={cn(
                  "w-full rounded-xl border px-4 py-3.5 text-base text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-500",
                  errors.phone
                    ? "border-red-400 dark:border-red-500"
                    : "border-slate-300 dark:border-slate-600"
                )}
              />
              {errors.phone && (
                <p className="mt-1.5 text-sm font-medium text-red-500">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="checkout-email"
                className="mb-1.5 block text-base font-semibold text-slate-700 dark:text-slate-300"
              >
                {t("email")}
              </label>
              <input
                id="checkout-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder={t("email_placeholder")}
                className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-base text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-500"
              />
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="checkout-address"
                className="mb-1.5 block text-base font-semibold text-slate-700 dark:text-slate-300"
              >
                {t("address")} <span className="text-red-500">*</span>
              </label>
              <textarea
                id="checkout-address"
                rows={3}
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder={t("address_placeholder")}
                className={cn(
                  "w-full resize-none rounded-xl border px-4 py-3.5 text-base text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-500",
                  errors.address
                    ? "border-red-400 dark:border-red-500"
                    : "border-slate-300 dark:border-slate-600"
                )}
              />
              {errors.address && (
                <p className="mt-1.5 text-sm font-medium text-red-500">
                  {errors.address}
                </p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label
                htmlFor="checkout-notes"
                className="mb-1.5 block text-base font-semibold text-slate-700 dark:text-slate-300"
              >
                {t("notes")}
              </label>
              <textarea
                id="checkout-notes"
                rows={2}
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder={t("notes_placeholder")}
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3.5 text-base text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-500"
              />
            </div>
          </div>

          <button
            onClick={handleContinueToReview}
            className="mt-6 w-full rounded-xl bg-primary-600 px-6 py-4 text-lg font-bold text-white transition-colors hover:bg-primary-700"
          >
            {t("order_summary")}
          </button>
        </div>
      )}

      {/* Step 2: Order Summary / Review */}
      {step === 2 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8">
          <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
            {t("order_summary")}
          </h2>

          {/* Customer details summary */}
          <div className="mb-6 rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50">
            <p className="text-base font-semibold text-slate-900 dark:text-white">
              {formData.name}
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {formData.phone}
              {formData.email && ` | ${formData.email}`}
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {formData.address}
            </p>
            {formData.notes && (
              <p className="mt-2 text-sm italic text-slate-500 dark:text-slate-400">
                {formData.notes}
              </p>
            )}
            <button
              onClick={() => setStep(1)}
              className="mt-2 text-sm font-semibold text-primary-600 hover:underline dark:text-primary-400"
            >
              Edit
            </button>
          </div>

          {/* Items */}
          <ul className="divide-y divide-slate-200 dark:divide-slate-700">
            {items.map((item) => (
              <li
                key={item.productId}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  {item.imageUrl && (
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-700">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-base font-medium text-slate-900 dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {formatPrice(item.price)} x {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          {/* Totals */}
          <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-base text-slate-600 dark:text-slate-400">
                {tc("subtotal")}
              </span>
              <span className="text-base font-semibold text-slate-900 dark:text-white">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                {tc("total")}
              </span>
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className={cn(
                "w-full rounded-xl px-6 py-4 text-lg font-bold text-white transition-colors",
                isSubmitting
                  ? "cursor-not-allowed bg-primary-400"
                  : "bg-primary-600 hover:bg-primary-700"
              )}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Processing...
                </span>
              ) : (
                t("place_order")
              )}
            </button>
            <button
              onClick={() => setStep(1)}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-300 px-6 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Step 3: UPI Payment */}
      {step === 3 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-900 dark:text-white">
            {t("pay_via_upi")}
          </h2>

          {/* Amount */}
          <div className="mb-6 rounded-xl bg-primary-50 p-4 text-center dark:bg-primary-900/30">
            <p className="text-sm font-medium text-primary-700 dark:text-primary-300">
              {t("payment_amount")}
            </p>
            <p className="mt-1 text-3xl font-bold text-primary-600 dark:text-primary-400">
              {formatPrice(total)}
            </p>
            <p className="mt-2 text-sm text-primary-600 dark:text-primary-400">
              {t("upi_id")}: <span className="font-semibold">{upiId}</span>
            </p>
          </div>

          {/* QR Code */}
          <div className="mb-6 flex flex-col items-center gap-4">
            <p className="text-base font-medium text-slate-700 dark:text-slate-300">
              {t("scan_qr")}
            </p>
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 dark:border-slate-600">
              <QRCodeSVG
                value={upiLink}
                size={220}
                level="M"
                includeMargin
              />
            </div>
          </div>

          {/* UPI deep link button */}
          <div className="mb-6 text-center">
            <p className="mb-3 text-base text-slate-600 dark:text-slate-400">
              {t("or_tap")}
            </p>
            <a
              href={upiLink}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-8 py-3.5 text-lg font-bold text-white transition-colors hover:bg-green-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              {t("open_upi")}
            </a>
          </div>

          {/* Order number reference */}
          <div className="mb-6 rounded-xl bg-slate-50 p-4 text-center dark:bg-slate-700/50">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t("order_number")}
            </p>
            <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              {orderNumber}
            </p>
          </div>

          {/* Confirm payment button */}
          <button
            onClick={handlePaymentComplete}
            className="w-full rounded-xl bg-primary-600 px-6 py-4 text-lg font-bold text-white transition-colors hover:bg-primary-700"
          >
            {t("i_have_paid")}
          </button>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8">
          {/* Success icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-10 text-green-600 dark:text-green-400"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
            {t("order_placed")}
          </h2>

          <p className="mb-6 text-base text-slate-600 dark:text-slate-400">
            {t("order_placed_msg")}
          </p>

          {/* Order number */}
          <div className="mb-8 rounded-xl bg-primary-50 p-5 dark:bg-primary-900/30">
            <p className="text-sm font-medium text-primary-700 dark:text-primary-300">
              {t("order_number")}
            </p>
            <p className="mt-1 text-2xl font-bold text-primary-600 dark:text-primary-400">
              {orderNumber}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleDownloadBill}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-lg font-bold text-white transition-colors hover:bg-primary-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {t("download_bill")}
            </button>

            <Link
              href="/orders"
              className="flex w-full items-center justify-center rounded-xl border border-primary-300 px-6 py-3 text-base font-semibold text-primary-600 transition-colors hover:bg-primary-50 dark:border-primary-700 dark:text-primary-400 dark:hover:bg-primary-900/20"
            >
              {t("track_order")}
            </Link>

            <Link
              href="/"
              className="flex w-full items-center justify-center rounded-xl border border-slate-300 px-6 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              {t("back_home")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
