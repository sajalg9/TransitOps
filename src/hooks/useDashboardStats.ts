// src/hooks/useDashboardStats.ts
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats } from "@/services/analyticsService";

export function useDashboardStats() {
  return useQuery({ queryKey: ["dashboard_stats"], queryFn: fetchDashboardStats });
}