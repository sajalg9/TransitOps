// src/components/trips/LiveBoard.tsx
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { Trip } from "@/types/database";
import { useCompleteTrip, useCancelTrip } from "@/hooks/useTrips";
import { useState } from "react";

export function LiveBoard({ trips }: { trips: Trip[] }) {
  const completeMutation = useCompleteTrip();
  const cancelMutation = useCancelTrip();
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [odometer, setOdometer] = useState("");
  const [fuel, setFuel] = useState("");

  async function handleComplete(trip: Trip) {
    if (!odometer || !fuel) return;
    await completeMutation.mutateAsync({
      tripId: trip.id, vehicleId: trip.vehicle_id, driverId: trip.driver_id,
      finalOdometer: Number(odometer), fuelConsumed: Number(fuel),
    });
    setCompletingId(null);
    setOdometer("");
    setFuel("");
  }

  const activeTrips = trips.filter((t) => t.status !== "draft" || true).slice(0, 10);

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Live Board</h3>
      {activeTrips.length === 0 && <p className="text-sm text-muted-foreground">No trips yet.</p>}
      {activeTrips.map((t) => (
        <div key={t.id} className="border border-border rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{t.trip_code}</p>
              <p className="text-xs text-muted-foreground">{t.source} → {t.destination}</p>
              <p className="text-xs text-muted-foreground">{t.vehicle?.registration_no} / {t.driver?.name}</p>
            </div>
            <StatusBadge status={t.status} />
          </div>
          {t.status === "dispatched" && completingId !== t.id && (
            <div className="flex gap-2">
              <button onClick={() => setCompletingId(t.id)} className="text-xs px-3 py-1.5 rounded-md bg-success/20 text-success font-medium">
                Complete
              </button>
              <button
                onClick={() => cancelMutation.mutate({ tripId: t.id, vehicleId: t.vehicle_id, driverId: t.driver_id })}
                className="text-xs px-3 py-1.5 rounded-md bg-destructive/20 text-destructive font-medium"
              >
                Cancel
              </button>
            </div>
          )}
          {completingId === t.id && (
            <div className="flex flex-wrap gap-2 items-center">
              <input placeholder="Final odometer" value={odometer} onChange={(e) => setOdometer(e.target.value)} className="text-xs rounded-md border border-input bg-background px-2 py-1.5 w-32" />
              <input placeholder="Fuel used (L)" value={fuel} onChange={(e) => setFuel(e.target.value)} className="text-xs rounded-md border border-input bg-background px-2 py-1.5 w-28" />
              <button onClick={() => handleComplete(t)} className="text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground font-medium">
                Confirm
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}