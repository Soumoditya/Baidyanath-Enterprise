"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CheckoutForm from "@/components/checkout/checkout-form";

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <CheckoutForm />
      </main>
      <Footer />
    </>
  );
}
