// src/components/analytics/TopCostliestVehicles.tsx
import { formatCurrency } from "@/lib/formatters";

interface Item { vehicle: { registration_no: string }; totalCost: number }

export function TopCostliestVehicles({ items }: { items: Item[] }) {
  if (items.length === 0) return <p className="text-sm text-muted-foreground py-6 text-center">No cost data yet.</p>;
  const max = Math.max(...items.map((i) => i.totalCost), 1);
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.vehicle.registration_no} className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="font-medium">{item.vehicle.registration_no}</span>
            <span className="text-muted-foreground">{formatCurrency(item.totalCost)}</span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${(item.totalCost / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}