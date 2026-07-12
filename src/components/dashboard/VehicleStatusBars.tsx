// src/components/dashboard/VehicleStatusBars.tsx
interface Props {
  breakdown: { available: number; on_trip: number; in_shop: number; retired: number };
  total: number;
}

const ROWS: { key: keyof Props["breakdown"]; label: string; color: string }[] = [
  { key: "available", label: "Available", color: "bg-success" },
  { key: "on_trip", label: "On Trip", color: "bg-blue-500" },
  { key: "in_shop", label: "In Shop", color: "bg-warning" },
  { key: "retired", label: "Retired", color: "bg-destructive" },
];

export function VehicleStatusBars({ breakdown, total }: Props) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Vehicle Status</h3>
      {ROWS.map((row) => {
        const count = breakdown[row.key];
        const pct = total > 0 ? (count / total) * 100 : 0;
        return (
          <div key={row.key} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">{row.label}</span>
              <span className="font-medium">{count}</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div className={`h-full ${row.color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}