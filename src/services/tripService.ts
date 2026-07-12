// src/services/tripService.ts
import { supabase } from "./supabaseClient";
import type { Trip } from "@/types/database";

export async function fetchTrips() {
  const { data, error } = await supabase
    .from("trips")
    .select("*, vehicle:vehicles(*), driver:drivers(*)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as Trip[];
}

export async function createTrip(payload: {
  trip_code: string; source: string; destination: string;
  vehicle_id: string; driver_id: string; cargo_weight: number; planned_distance_km: number;
}) {
  const { data, error } = await supabase.from("trips").insert({ ...payload, status: "draft" }).select().single();
  if (error) throw error;
  return data as Trip;
}

export async function dispatchTrip(tripId: string, vehicleId: string, driverId: string) {
  const { error: tripErr } = await supabase.from("trips").update({ status: "dispatched", dispatched_at: new Date().toISOString() }).eq("id", tripId);
  if (tripErr) throw tripErr;
  const { error: vErr } = await supabase.from("vehicles").update({ status: "on_trip" }).eq("id", vehicleId);
  if (vErr) throw vErr;
  const { error: dErr } = await supabase.from("drivers").update({ status: "on_trip" }).eq("id", driverId);
  if (dErr) throw dErr;
}

export async function completeTrip(tripId: string, vehicleId: string, driverId: string, finalOdometer: number, fuelConsumed: number) {
  const { error: tripErr } = await supabase.from("trips").update({
    status: "completed", completed_at: new Date().toISOString(), final_odometer: finalOdometer, fuel_consumed_l: fuelConsumed,
  }).eq("id", tripId);
  if (tripErr) throw tripErr;
  await supabase.from("vehicles").update({ status: "available", odometer: finalOdometer }).eq("id", vehicleId);
  await supabase.from("drivers").update({ status: "available" }).eq("id", driverId);
}

export async function cancelTrip(tripId: string, vehicleId: string, driverId: string) {
  const { error: tripErr } = await supabase.from("trips").update({ status: "cancelled" }).eq("id", tripId);
  if (tripErr) throw tripErr;
  await supabase.from("vehicles").update({ status: "available" }).eq("id", vehicleId);
  await supabase.from("drivers").update({ status: "available" }).eq("id", driverId);
}