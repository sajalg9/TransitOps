// src/components/dashboard/RecentTrips.tsx
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { Trip } from "@/types/database";

export function RecentTrips({ trips }: { trips: Trip[] }) {
  if (trips.length === 0) return <p className="text-sm text-muted-foreground py-6 text-center">No trips yet.</p>;
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-secondary/50 text-muted-foreground">
          <tr>
            <th className="text-left px-4 py-3 font-medium">Trip</th>
            <th className="text-left px-4 py-3 font-medium">Vehicle</th>
            <th className="text-left px-4 py-3 font-medium">Driver</th>
            <th className="text-left px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((t) => (
            <tr key={t.id} className="border-t border-border">
              <td className="px-4 py-3 font-medium">{t.trip_code}</td>
              <td className="px-4 py-3">{t.vehicle?.registration_no ?? "—"}</td>
              <td className="px-4 py-3">{t.driver?.name ?? "—"}</td>
              <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}