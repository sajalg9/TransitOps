// src/hooks/useOrgSettings.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchOrgSettings, updateOrgSettings } from "@/services/settingsService";
import type { OrgSettings } from "@/types/database";

export function useOrgSettings() {
  return useQuery({ queryKey: ["org_settings"], queryFn: fetchOrgSettings });
}

export function useUpdateOrgSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<OrgSettings> }) => updateOrgSettings(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["org_settings"] }),
  });
}