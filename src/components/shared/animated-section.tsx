"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  const reduceMotion = useReducedMotion();

  // Render plainly when the visitor prefers reduced motion — never hide content
  // behind an animation they've asked not to see.
  if (reduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      // Reveal slightly before the section scrolls into view so slower phones
      // never show a blank gap mid-scroll.
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -120px 0px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
