import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Baidyanath Enterprise, founded by Mrinal Kanti Pramanik, is a trusted FMCG, healthcare and cleaning products distributor serving Rampurhat and Birbhum, West Bengal.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
