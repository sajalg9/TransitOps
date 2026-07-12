// src/services/fuelExpenseService.ts
import { supabase } from "./supabaseClient";
import type { FuelLog, Expense } from "@/types/database";

export async function fetchFuelLogs() {
  const { data, error } = await supabase.from("fuel_logs").select("*, vehicle:vehicles(*)").order("created_at", { ascending: false });
  if (error) throw error;
  return data as FuelLog[];
}

export async function createFuelLog(payload: { vehicle_id: string; trip_id?: string | null; date: string; liters: number; cost: number }) {
  const { data, error } = await supabase.from("fuel_logs").insert(payload).select().single();
  if (error) throw error;
  return data as FuelLog;
}

export async function fetchExpenses() {
  const { data, error } = await supabase.from("expenses").select("*, vehicle:vehicles(*)").order("created_at", { ascending: false });
  if (error) throw error;
  return data as Expense[];
}

export async function createExpense(payload: { vehicle_id?: string | null; trip_id?: string | null; toll: number; misc: number; agent_expense: number; date: string }) {
  const { data, error } = await supabase.from("expenses").insert(payload).select().single();
  if (error) throw error;
  return data as Expense;
}