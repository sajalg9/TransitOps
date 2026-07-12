// src/pages/trips/TripDispatcher.tsx
import { useTrips } from "@/hooks/useTrips";
import { TripCreateForm } from "@/components/trips/TripCreateForm";
import { LiveBoard } from "@/components/trips/LiveBoard";

export default function TripDispatcher() {
  const { data: trips = [], isLoading } = useTrips();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Trip Dispatcher</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-border rounded-lg p-4">
          <TripCreateForm />
        </div>
        <div className="border border-border rounded-lg p-4">
          {isLoading ? <p className="text-sm text-muted-foreground">Loading trips...</p> : <LiveBoard trips={trips} />}
        </div>
      </div>
    </div>
  );
}