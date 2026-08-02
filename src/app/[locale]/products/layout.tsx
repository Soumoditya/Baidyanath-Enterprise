import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products — FMCG, Healthcare & Cleaning",
  description:
    "Browse Complan, Glucon-D, Sugar Free, phenyl, bleaching powder, naphthalene balls and more. Genuine products at competitive distributor prices in Rampurhat, Birbhum.",
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
