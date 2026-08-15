"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** direction the element travels in from */
  from?: "up" | "down" | "left" | "right" | "none";
  as?: "div" | "section" | "li" | "span";
}

const OFFSET = 18;

/**
 * Scroll-in reveal. Supersedes AnimatedSection: honours reduced-motion, reveals
 * slightly before entering the viewport so slow phones never show blank gaps,
 * and supports a travel direction for more expressive composition.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as;
    return <Tag className={cn(className)}>{children}</Tag>;
  }

  const initial =
    from === "none"
      ? { opacity: 0 }
      : {
          opacity: 0,
          x: from === "left" ? -OFFSET : from === "right" ? OFFSET : 0,
          y: from === "up" ? OFFSET : from === "down" ? -OFFSET : 0,
        };

  return (
    <MotionTag
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}

// Re-export a stagger helper for grids.
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
