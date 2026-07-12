// src/hooks/useDrivers.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDrivers, createDriver, updateDriver, deleteDriver } from "@/services/driverService";
import type { Driver } from "@/types/database";

export function useDrivers() {
  return useQuery({ queryKey: ["drivers"], queryFn: fetchDrivers });
}

export function useCreateDriver() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createDriver,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["drivers"] }),
  });
}

export function useUpdateDriver() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Driver> }) => updateDriver(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["drivers"] }),
  });
}

export function useDeleteDriver() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteDriver,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["drivers"] }),
  });
}