// src/components/fuel-expenses/FuelLogTable.tsx
import { formatDate, formatCurrency } from "@/lib/formatters";
import type { FuelLog } from "@/types/database";

export function FuelLogTable({ logs }: { logs: FuelLog[] }) {
  if (logs.length === 0) return <p className="text-sm text-muted-foreground py-6 text-center">No fuel logs yet.</p>;
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-secondary/50 text-muted-foreground">
          <tr>
            <th className="text-left px-4 py-3 font-medium">Vehicle</th>
            <th className="text-left px-4 py-3 font-medium">Date</th>
            <th className="text-left px-4 py-3 font-medium">Liters</th>
            <th className="text-left px-4 py-3 font-medium">Cost</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((l) => (
            <tr key={l.id} className="border-t border-border">
              <td className="px-4 py-3 font-medium">{l.vehicle?.registration_no}</td>
              <td className="px-4 py-3">{formatDate(l.date)}</td>
              <td className="px-4 py-3">{l.liters} L</td>
              <td className="px-4 py-3">{formatCurrency(l.cost)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}