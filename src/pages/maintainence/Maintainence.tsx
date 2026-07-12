import { useMaintenanceLogs } from "@/hooks/useMaintenance";
import { MaintenanceForm } from "@/components/maintenance/MaintenanceForm";
import { ServiceLogTable } from "@/components/maintenance/ServiceLogTable";

export default function Maintenance() {
  const { data: logs = [], isLoading } = useMaintenanceLogs();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Maintenance</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-border rounded-lg p-4">
          <MaintenanceForm />
        </div>
        <div>
          <h3 className="font-semibold mb-3">Service Log</h3>
          {isLoading ? <p className="text-sm text-muted-foreground">Loading...</p> : <ServiceLogTable logs={logs} />}
        </div>
      </div>
    </div>
  );
}