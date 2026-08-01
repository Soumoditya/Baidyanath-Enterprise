import type { MetadataRoute } from "next";

const BASE = "https://baidyanath-enterprise.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/login"],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
