// src/components/drivers/SafetyBadge.tsx
import { cn } from "@/lib/utils";

export function SafetyBadge({ score }: { score: number }) {
  const color =
    score >= 90 ? "bg-success/20 text-success border-success/30" :
    score >= 70 ? "bg-warning/20 text-warning border-warning/30" :
    "bg-destructive/20 text-destructive border-destructive/30";
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border", color)}>
      {score}
    </span>
  );
}