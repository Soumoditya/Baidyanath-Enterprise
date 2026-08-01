import type { SVGProps } from "react";

interface CategoryIconProps extends SVGProps<SVGSVGElement> {
  slug: string;
}

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Clean line icons per product category (replaces the old emoji set). */
export default function CategoryIcon({ slug, ...props }: CategoryIconProps) {
  switch (slug) {
    case "health-drinks":
      // Nutrition drink / glass
      return (
        <svg {...base} {...props}>
          <path d="M6 3h12l-1.2 16.2A2 2 0 0 1 14.8 21H9.2a2 2 0 0 1-2-1.8L6 3Z" />
          <path d="M6.5 9h11" />
          <path d="M12 12v5" />
        </svg>
      );
    case "otc":
      // Capsule + cross (healthcare)
      return (
        <svg {...base} {...props}>
          <rect x="3" y="10.5" width="10" height="5" rx="2.5" transform="rotate(-45 3 10.5)" />
          <path d="M15 7v4M13 9h4" />
          <circle cx="16.5" cy="15.5" r="4.5" />
        </svg>
      );
    case "cleaning":
      // Spray bottle
      return (
        <svg {...base} {...props}>
          <path d="M9 8h4a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z" />
          <path d="M9 8V5h3" />
          <path d="M12 5h3l2-1.5M15 5l2 1.5" />
          <path d="M9.5 12.5h3" />
        </svg>
      );
    case "household":
      // Home
      return (
        <svg {...base} {...props}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
          <path d="M9.5 21v-6h5v6" />
        </svg>
      );
    case "food":
    default:
      // Grocery box
      return (
        <svg {...base} {...props}>
          <path d="M3 7.5 12 3l9 4.5-9 4.5-9-4.5Z" />
          <path d="M3 7.5V16.5L12 21l9-4.5V7.5" />
          <path d="M12 12v9" />
        </svg>
      );
  }
}
