// src/hooks/useVehicles.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchVehicles, createVehicle, updateVehicle, deleteVehicle } from "@/services/vehicleService";
import type { Vehicle } from "@/types/database";

export function useVehicles() {
  return useQuery({ queryKey: ["vehicles"], queryFn: fetchVehicles });
}

export function useCreateVehicle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createVehicle,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["vehicles"] }),
  });
}

export function useUpdateVehicle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Vehicle> }) => updateVehicle(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["vehicles"] }),
  });
}

export function useDeleteVehicle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["vehicles"] }),
  });
}