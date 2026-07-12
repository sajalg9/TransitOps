// src/services/analyticsService.ts (dashboard stats portion)
import { supabase } from "./supabaseClient";

export async function fetchDashboardStats() {
  const [{ data: vehicles }, { data: drivers }, { data: trips }] = await Promise.all([
    supabase.from("vehicles").select("*"),
    supabase.from("drivers").select("*"),
    supabase.from("trips").select("*, vehicle:vehicles(*), driver:drivers(*)").order("created_at", { ascending: false }).limit(5),
  ]);

  const v = vehicles ?? [];
  const d = drivers ?? [];
  const t = trips ?? [];

  const activeVehicles = v.filter((x) => x.status !== "retired").length;
  const availableVehicles = v.filter((x) => x.status === "available").length;
  const inMaintenance = v.filter((x) => x.status === "in_shop").length;
  const onTripVehicles = v.filter((x) => x.status === "on_trip").length;
  const retiredVehicles = v.filter((x) => x.status === "retired").length;
  const driversOnDuty = d.filter((x) => x.status === "on_trip" || x.status === "available").length;

  const { count: activeTripsCount } = await supabase.from("trips").select("*", { count: "exact", head: true }).eq("status", "dispatched");
  const { count: pendingTripsCount } = await supabase.from("trips").select("*", { count: "exact", head: true }).eq("status", "draft");

  const utilization = activeVehicles > 0 ? Math.round((onTripVehicles / activeVehicles) * 100) : 0;

  return {
    activeVehicles,
    availableVehicles,
    inMaintenance,
    activeTrips: activeTripsCount ?? 0,
    pendingTrips: pendingTripsCount ?? 0,
    driversOnDuty,
    fleetUtilization: utilization,
    recentTrips: t,
    vehicleStatusBreakdown: { available: availableVehicles, on_trip: onTripVehicles, in_shop: inMaintenance, retired: retiredVehicles },
    totalVehicles: v.length,
  };
}