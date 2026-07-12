// src/hooks/useFuelLogs.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchFuelLogs, createFuelLog } from "@/services/fuelExpenseService";

export function useFuelLogs() {
  return useQuery({ queryKey: ["fuel_logs"], queryFn: fetchFuelLogs });
}

export function useCreateFuelLog() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: createFuelLog, onSuccess: () => qc.invalidateQueries({ queryKey: ["fuel_logs"] }) });
}