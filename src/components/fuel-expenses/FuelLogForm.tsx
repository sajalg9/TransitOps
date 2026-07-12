// src/components/fuel-expenses/FuelLogForm.tsx
import { useState } from "react";
import { useVehicles } from "@/hooks/useVehicles";
import { useCreateFuelLog } from "@/hooks/useFuelLogs";
import { Fuel } from "lucide-react";

export function FuelLogForm({ onDone }: { onDone: () => void }) {
  const { data: vehicles = [] } = useVehicles();
  const createMutation = useCreateFuelLog();
  const [vehicleId, setVehicleId] = useState("");
  const [date, setDate] = useState("");
  const [liters, setLiters] = useState("");
  const [cost, setCost] = useState("");

  async function handleSubmit() {
    if (!vehicleId || !date || !liters) return;
    await createMutation.mutateAsync({ vehicle_id: vehicleId, date, liters: Number(liters), cost: Number(cost) || 0 });
    onDone();
  }

  return (
    <div className="space-y-3 border border-border rounded-lg p-4">
      <h4 className="font-medium flex items-center gap-2"><Fuel size={16} /> Log Fuel</h4>
      <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
        <option value="">Select vehicle</option>
        {vehicles.map((v) => <option key={v.id} value={v.id}>{v.registration_no}</option>)}
      </select>
      <div className="grid grid-cols-3 gap-2">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
        <input type="number" placeholder="Liters" value={liters} onChange={(e) => setLiters(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
        <input type="number" placeholder="Cost" value={cost} onChange={(e) => setCost(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
      </div>
      <button onClick={handleSubmit} className="w-full bg-primary text-primary-foreground rounded-md py-2 text-sm font-medium hover:opacity-90">
        Save Fuel Log
      </button>
    </div>
  );
}