// src/services/settingsService.ts
import { supabase } from "./supabaseClient";
import type { OrgSettings } from "@/types/database";

export async function fetchOrgSettings() {
  const { data, error } = await supabase.from("org_settings").select("*").limit(1).single();
  if (error) throw error;
  return data as OrgSettings;
}

export async function updateOrgSettings(id: string, payload: Partial<OrgSettings>) {
  const { data, error } = await supabase.from("org_settings").update(payload).eq("id", id).select().single();
  if (error) throw error;
  return data as OrgSettings;
}