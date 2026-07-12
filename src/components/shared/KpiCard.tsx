// src/components/shared/KpiCard.tsx
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string | number;
  accentColor?: string;
}

export function KpiCard({ label, value, accentColor = "border-l-primary" }: Props) {
  return (
    <div className={cn("bg-card border border-border rounded-lg p-4 border-l-4", accentColor)}>
      <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}