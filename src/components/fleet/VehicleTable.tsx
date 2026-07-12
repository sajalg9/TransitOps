// src/components/fleet/VehicleTable.tsx
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import type { Vehicle } from "@/types/database";

interface Props {
  vehicles: Vehicle[];
  onEdit: (v: Vehicle) => void;
}

export function VehicleTable({ vehicles, onEdit }: Props) {
  if (vehicles.length === 0) {
    return <div className="text-center py-12 text-muted-foreground text-sm">No vehicles found.</div>;
  }
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-secondary/50 text-muted-foreground">
          <tr>
            <th className="text-left px-4 py-3 font-medium">Reg. No.</th>
            <th className="text-left px-4 py-3 font-medium">Name/Model</th>
            <th className="text-left px-4 py-3 font-medium">Type</th>
            <th className="text-left px-4 py-3 font-medium">Capacity</th>
            <th className="text-left px-4 py-3 font-medium">Odometer</th>
            <th className="text-left px-4 py-3 font-medium">Acq. Cost</th>
            <th className="text-left px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr
              key={v.id}
              onClick={() => onEdit(v)}
              className="border-t border-border hover:bg-secondary/30 cursor-pointer transition-colors"
            >
              <td className="px-4 py-3 font-medium">{v.registration_no}</td>
              <td className="px-4 py-3">{v.name}</td>
              <td className="px-4 py-3">{v.type}</td>
              <td className="px-4 py-3">{formatNumber(v.capacity_kg)} kg</td>
              <td className="px-4 py-3">{formatNumber(v.odometer)}</td>
              <td className="px-4 py-3">{formatCurrency(v.acquisition_cost)}</td>
              <td className="px-4 py-3"><StatusBadge status={v.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}