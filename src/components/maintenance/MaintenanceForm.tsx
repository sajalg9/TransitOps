import { useState } from "react";
import { useVehicles } from "@/hooks/useVehicles";
import { useCreateMaintenanceLog } from "@/hooks/useMaintenance";

export function MaintenanceForm() {
  const { data: vehicles = [] } = useVehicles();
  const createMutation = useCreateMaintenanceLog();

  const [vehicleId, setVehicleId] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");

  const eligibleVehicles = vehicles.filter((v) => v.status !== "in_shop" && v.status !== "retired");

  async function handleSubmit() {
    if (!vehicleId || !serviceType || !date) return;
    await createMutation.mutateAsync({ vehicle_id: vehicleId, service_type: serviceType, cost: Number(cost) || 0, date });
    setVehicleId(""); setServiceType(""); setCost(""); setDate("");
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Log Service Record</h3>
      <div>
        <label className="text-sm font-medium">Vehicle</label>
        <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
          <option value="">Select vehicle</option>
          {eligibleVehicles.map((v) => (
            <option key={v.id} value={v.id}>{v.registration_no} — {v.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium">Service Type</label>
        <input value={serviceType} onChange={(e) => setServiceType(e.target.value)} placeholder="Oil Change" className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium">Cost</label>
          <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium">Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </div>
      </div>
      <button onClick={handleSubmit} className="w-full bg-primary text-primary-foreground rounded-md py-2 font-medium hover:opacity-90">
        Save
      </button>
    </div>
  );
}