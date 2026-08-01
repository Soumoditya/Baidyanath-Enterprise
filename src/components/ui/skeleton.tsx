import { cn } from "@/lib/utils";

/** Shimmer placeholder block. Compose several to build loading states. */
export default function Skeleton({
  className,
}: {
  className?: string;
}) {
  return <div className={cn("skeleton rounded-md", className)} />;
}
