// src/components/drivers/DriverTable.tsx
import { StatusBadge } from "@/components/shared/StatusBadge";
import { SafetyBadge } from "./SafetyBadge";
import { formatDate, daysUntil } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { Driver } from "@/types/database";

interface Props {
  drivers: Driver[];
  onEdit: (d: Driver) => void;
}

export function DriverTable({ drivers, onEdit }: Props) {
  if (drivers.length === 0) {
    return <div className="text-center py-12 text-muted-foreground text-sm">No drivers found.</div>;
  }
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-secondary/50 text-muted-foreground">
          <tr>
            <th className="text-left px-4 py-3 font-medium">Driver</th>
            <th className="text-left px-4 py-3 font-medium">License No.</th>
            <th className="text-left px-4 py-3 font-medium">Category</th>
            <th className="text-left px-4 py-3 font-medium">Expiry</th>
            <th className="text-left px-4 py-3 font-medium">Contact</th>
            <th className="text-left px-4 py-3 font-medium">Safety</th>
            <th className="text-left px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((d) => {
            const expSoon = daysUntil(d.license_expiry) <= 30;
            return (
              <tr key={d.id} onClick={() => onEdit(d)} className="border-t border-border hover:bg-secondary/30 cursor-pointer transition-colors">
                <td className="px-4 py-3 font-medium">{d.name}</td>
                <td className="px-4 py-3">{d.license_no}</td>
                <td className="px-4 py-3">{d.license_category}</td>
                <td className={cn("px-4 py-3", expSoon && "text-destructive font-medium")}>
                  {formatDate(d.license_expiry)} {expSoon && "EXPIRING"}
                </td>
                <td className="px-4 py-3">{d.contact}</td>
                <td className="px-4 py-3"><SafetyBadge score={d.safety_score} /></td>
                <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}