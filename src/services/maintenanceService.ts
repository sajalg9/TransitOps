import { supabase } from "./supabaseClient";
import type { MaintenanceLog } from "@/types/database";

export async function fetchMaintenanceLogs() {
  const { data, error } = await supabase
    .from("maintenance_logs")
    .select("*, vehicle:vehicles(*)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as MaintenanceLog[];
}

export async function createMaintenanceLog(payload: {
  vehicle_id: string; service_type: string; cost: number; date: string; notes?: string;
}) {
  const { data, error } = await supabase.from("maintenance_logs").insert({ ...payload, status: "active" }).select().single();
  if (error) throw error;
  await supabase.from("vehicles").update({ status: "in_shop" }).eq("id", payload.vehicle_id);
  return data as MaintenanceLog;
}

export async function closeMaintenanceLog(id: string, vehicleId: string, vehicleCurrentStatus: string) {
  const { error } = await supabase.from("maintenance_logs").update({ status: "completed" }).eq("id", id);
  if (error) throw error;
  if (vehicleCurrentStatus !== "retired") {
    await supabase.from("vehicles").update({ status: "available" }).eq("id", vehicleId);
  }
}