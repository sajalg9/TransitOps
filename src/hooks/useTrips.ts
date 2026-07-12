import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTrips, createTrip, dispatchTrip, completeTrip, cancelTrip } from "@/services/tripService";

export function useTrips() {
  return useQuery({ queryKey: ["trips"], queryFn: fetchTrips });
}

function invalidateAll(qc: ReturnType<typeof useQueryClient>) {
  qc.invalidateQueries({ queryKey: ["trips"] });
  qc.invalidateQueries({ queryKey: ["vehicles"] });
  qc.invalidateQueries({ queryKey: ["drivers"] });
}

export function useCreateTrip() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: createTrip, onSuccess: () => invalidateAll(qc) });
}

export function useDispatchTrip() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ tripId, vehicleId, driverId }: { tripId: string; vehicleId: string; driverId: string }) =>
      dispatchTrip(tripId, vehicleId, driverId),
    onSuccess: () => invalidateAll(qc),
  });
}

export function useCompleteTrip() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ tripId, vehicleId, driverId, finalOdometer, fuelConsumed }: { tripId: string; vehicleId: string; driverId: string; finalOdometer: number; fuelConsumed: number }) =>
      completeTrip(tripId, vehicleId, driverId, finalOdometer, fuelConsumed),
    onSuccess: () => invalidateAll(qc),
  });
}

export function useCancelTrip() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ tripId, vehicleId, driverId }: { tripId: string; vehicleId: string; driverId: string }) =>
      cancelTrip(tripId, vehicleId, driverId),
    onSuccess: () => invalidateAll(qc),
  });
}