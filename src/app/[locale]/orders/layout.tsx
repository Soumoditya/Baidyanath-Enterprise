import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Order",
  description:
    "Look up your Baidyanath Enterprise order by phone number to see its status and download your bill.",
};

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
