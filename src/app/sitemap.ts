import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

const BASE = "https://baidyanath-enterprise.vercel.app";
const paths = ["", "/products", "/about", "/contact", "/orders"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    }))
  );
}
