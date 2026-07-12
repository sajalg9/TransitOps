import type { VehicleStatus, DriverStatus, TripStatus, MaintenanceStatus, Role } from "@/lib/constants";

export interface Profile {
  id: string;
  full_name: string;
  role: Role;
  avatar_url: string | null;
}

export interface Vehicle {
  id: string;
  registration_no: string;
  name: string;
  type: string;
  capacity_kg: number;
  odometer: number;
  acquisition_cost: number;
  status: VehicleStatus;
  region: string | null;
  created_at: string;
}

export interface Driver {
  id: string;
  name: string;
  license_no: string;
  license_category: string;
  license_expiry: string;
  contact: string;
  safety_score: number;
  status: DriverStatus;
  created_at: string;
}

export interface Trip {
  id: string;
  trip_code: string;
  source: string;
  destination: string;
  vehicle_id: string;
  driver_id: string;
  cargo_weight: number;
  planned_distance_km: number;
  status: TripStatus;
  dispatched_at: string | null;
  completed_at: string | null;
  final_odometer: number | null;
  fuel_consumed_l: number | null;
  created_at: string;
  vehicle?: Vehicle;
  driver?: Driver;
}

export interface MaintenanceLog {
  id: string;
  vehicle_id: string;
  service_type: string;
  cost: number;
  date: string;
  status: MaintenanceStatus;
  notes: string | null;
  created_at: string;
  vehicle?: Vehicle;
}

export interface FuelLog {
  id: string;
  vehicle_id: string;
  trip_id: string | null;
  date: string;
  liters: number;
  cost: number;
  created_at: string;
  vehicle?: Vehicle;
}

export interface Expense {
  id: string;
  trip_id: string | null;
  vehicle_id: string | null;
  toll: number;
  misc: number;
  agent_expense: number;
  date: string;
  created_at: string;
  vehicle?: Vehicle;
}