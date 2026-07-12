import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { useCloseMaintenanceLog } from "@/hooks/useMaintenance";
import type { MaintenanceLog } from "@/types/database";

export function ServiceLogTable({ logs }: { logs: MaintenanceLog[] }) {
  const closeMutation = useCloseMaintenanceLog();

  if (logs.length === 0) {
    return <div className="text-center py-12 text-muted-foreground text-sm">No service records found.</div>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-secondary/50 text-muted-foreground">
          <tr>
            <th className="text-left px-4 py-3 font-medium">Vehicle</th>
            <th className="text-left px-4 py-3 font-medium">Service</th>
            <th className="text-left px-4 py-3 font-medium">Date</th>
            <th className="text-left px-4 py-3 font-medium">Cost</th>
            <th className="text-left px-4 py-3 font-medium">Status</th>
            <th className="text-left px-4 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-t border-border">
              <td className="px-4 py-3 font-medium">{log.vehicle?.registration_no}</td>
              <td className="px-4 py-3">{log.service_type}</td>
              <td className="px-4 py-3">{formatDate(log.date)}</td>
              <td className="px-4 py-3">{formatCurrency(log.cost)}</td>
              <td className="px-4 py-3"><StatusBadge status={log.status} /></td>
              <td className="px-4 py-3">
                {log.status === "active" && (
                  <button
                    onClick={() => closeMutation.mutate({ id: log.id, vehicleId: log.vehicle_id, vehicleCurrentStatus: log.vehicle?.status ?? "available" })}
                    className="text-xs px-3 py-1.5 rounded-md bg-success/20 text-success font-medium"
                  >
                    Close
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}