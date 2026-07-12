// src/services/driverService.ts
import { supabase } from "./supabaseClient";
import type { Driver } from "@/types/database";

export async function fetchDrivers() {
  const { data, error } = await supabase.from("drivers").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data as Driver[];
}

export async function createDriver(payload: Omit<Driver, "id" | "created_at">) {
  const { data, error } = await supabase.from("drivers").insert(payload).select().single();
  if (error) throw error;
  return data as Driver;
}

export async function updateDriver(id: string, payload: Partial<Driver>) {
  const { data, error } = await supabase.from("drivers").update(payload).eq("id", id).select().single();
  if (error) throw error;
  return data as Driver;
}

export async function deleteDriver(id: string) {
  const { error } = await supabase.from("drivers").delete().eq("id", id);
  if (error) throw error;
}