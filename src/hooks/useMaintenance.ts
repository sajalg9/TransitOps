import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMaintenanceLogs, createMaintenanceLog, closeMaintenanceLog } from "@/services/maintenanceService";

export function useMaintenanceLogs() {
  return useQuery({ queryKey: ["maintenance"], queryFn: fetchMaintenanceLogs });
}

function invalidateAll(qc: ReturnType<typeof useQueryClient>) {
  qc.invalidateQueries({ queryKey: ["maintenance"] });
  qc.invalidateQueries({ queryKey: ["vehicles"] });
}

export function useCreateMaintenanceLog() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: createMaintenanceLog, onSuccess: () => invalidateAll(qc) });
}

export function useCloseMaintenanceLog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, vehicleId, vehicleCurrentStatus }: { id: string; vehicleId: string; vehicleCurrentStatus: string }) =>
      closeMaintenanceLog(id, vehicleId, vehicleCurrentStatus),
    onSuccess: () => invalidateAll(qc),
  });
}