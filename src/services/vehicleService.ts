// src/services/vehicleService.ts
import { supabase } from "./supabaseClient";
import type { Vehicle } from "@/types/database";

export async function fetchVehicles() {
  const { data, error } = await supabase.from("vehicles").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data as Vehicle[];
}

export async function createVehicle(payload: Omit<Vehicle, "id" | "created_at">) {
  const { data, error } = await supabase.from("vehicles").insert(payload).select().single();
  if (error) throw error;
  return data as Vehicle;
}

export async function updateVehicle(id: string, payload: Partial<Vehicle>) {
  const { data, error } = await supabase.from("vehicles").update(payload).eq("id", id).select().single();
  if (error) throw error;
  return data as Vehicle;
}

export async function deleteVehicle(id: string) {
  const { error } = await supabase.from("vehicles").delete().eq("id", id);
  if (error) throw error;
}