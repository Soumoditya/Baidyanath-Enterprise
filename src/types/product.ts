export interface LocalizedString {
  en: string;
  bn?: string;
  hi?: string;
}

export interface Product {
  id: string;
  name: LocalizedString;
  slug: string;
  description: LocalizedString;
  price: number;
  mrp?: number;
  category: string;
  imageUrl: string;
  imagePublicId?: string;
  inStock: boolean;
  unit: string;
  featured: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: LocalizedString;
  slug: string;
  icon: string;
  sortOrder: number;
  isActive: boolean;
}

// Category slugs match Mrinal Kanti Pramanik's actual distribution lines.
// `icon` is a plain emoji fallback used only in functional dropdowns/tables;
// the marketing homepage renders the richer <CategoryIcon /> SVG set instead.
export const CATEGORIES = [
  { slug: "health-drinks", icon: "🥛" },
  { slug: "otc", icon: "💊" },
  { slug: "cleaning", icon: "🧴" },
  { slug: "household", icon: "🏠" },
  { slug: "food", icon: "🍪" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];
