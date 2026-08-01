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

export const CATEGORIES = [
  { slug: "healthcare", icon: "💊" },
  { slug: "cleaning", icon: "🧹" },
  { slug: "food", icon: "🥤" },
  { slug: "otc", icon: "💉" },
  { slug: "household", icon: "🏠" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];
