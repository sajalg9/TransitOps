// src/components/trips/TripCreateForm.tsx
import { useState } from "react";
import { useVehicles } from "@/hooks/useVehicles";
import { useDrivers } from "@/hooks/useDrivers";
import { useCreateTrip, useDispatchTrip } from "@/hooks/useTrips";
import { canDispatch, availableVehicles, availableDrivers } from "@/lib/businessRules";
import { AlertTriangle } from "lucide-react";

export function TripCreateForm() {
  const { data: vehicles = [] } = useVehicles();
  const { data: drivers = [] } = useDrivers();
  const createMutation = useCreateTrip();
  const dispatchMutation = useDispatchTrip();

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [cargoWeight, setCargoWeight] = useState("");
  const [distance, setDistance] = useState("");

  const vehicle = vehicles.find((v) => v.id === vehicleId);
  const driver = drivers.find((d) => d.id === driverId);
  const cargo = Number(cargoWeight) || 0;
  const validation = vehicleId && driverId ? canDispatch(vehicle, driver, cargo) : { ok: true };

  async function handleDispatch() {
    if (!validation.ok) return;
    const tripCode = `TR${Math.floor(Math.random() * 900 + 100)}`;
    const trip = await createMutation.mutateAsync({
      trip_code: tripCode, source, destination, vehicle_id: vehicleId, driver_id: driverId,
      cargo_weight: cargo, planned_distance_km: Number(distance) || 0,
    });
    await dispatchMutation.mutateAsync({ tripId: trip.id, vehicleId, driverId });
    setSource(""); setDestination(""); setVehicleId(""); setDriverId(""); setCargoWeight(""); setDistance("");
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Create Trip</h3>
      <div>
        <label className="text-sm font-medium">Source</label>
        <input value={source} onChange={(e) => setSource(e.target.value)} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="text-sm font-medium">Destination</label>
        <input value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="text-sm font-medium">Vehicle (available only)</label>
        <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
          <option value="">Select vehicle</option>
          {availableVehicles(vehicles).map((v) => (
            <option key={v.id} value={v.id}>{v.registration_no} — {v.capacity_kg} kg capacity</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium">Driver (available only)</label>
        <select value={driverId} onChange={(e) => setDriverId(e.target.value)} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
          <option value="">Select driver</option>
          {availableDrivers(drivers).map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium">Cargo Weight (kg)</label>
        <input type="number" value={cargoWeight} onChange={(e) => setCargoWeight(e.target.value)} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="text-sm font-medium">Planned Distance (km)</label>
        <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
      </div>
      {!validation.ok && (
        <div className="flex items-start gap-2 text-xs text-destructive border border-destructive/30 bg-destructive/10 rounded-md p-2">
          <AlertTriangle size={14} className="mt-0.5 shrink-0" />
          {validation.reason}
        </div>
      )}
      <button
        disabled={!validation.ok || !source || !destination || !vehicleId || !driverId}
        onClick={handleDispatch}
        className="w-full bg-primary text-primary-foreground rounded-md py-2 font-medium hover:opacity-90 disabled:opacity-50"
      >
        Dispatch Trip
      </button>
    </div>
  );
}