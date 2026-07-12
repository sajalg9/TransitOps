// src/lib/businessRules.ts
import type { Vehicle, Driver } from "@/types/database";

export interface RuleResult {
  ok: boolean;
  reason?: string;
}

export function canDispatch(vehicle: Vehicle | undefined, driver: Driver | undefined, cargoWeight: number): RuleResult {
  if (!vehicle) return { ok: false, reason: "Select a vehicle." };
  if (!driver) return { ok: false, reason: "Select a driver." };
  if (vehicle.status === "in_shop") return { ok: false, reason: "Vehicle is in shop and cannot be dispatched." };
  if (vehicle.status === "retired") return { ok: false, reason: "Vehicle is retired and cannot be dispatched." };
  if (vehicle.status === "on_trip") return { ok: false, reason: "Vehicle is already on a trip." };
  if (driver.status === "suspended") return { ok: false, reason: "Driver is suspended and cannot be assigned." };
  if (driver.status === "on_trip") return { ok: false, reason: "Driver is already on a trip." };
  if (new Date(driver.license_expiry) < new Date()) return { ok: false, reason: "Driver's license has expired." };
  if (cargoWeight > vehicle.capacity_kg) {
    return { ok: false, reason: `Capacity exceeded by ${cargoWeight - vehicle.capacity_kg} kg — dispatch blocked.` };
  }
  return { ok: true };
}

export function availableVehicles(vehicles: Vehicle[]) {
  return vehicles.filter((v) => v.status === "available");
}

export function availableDrivers(drivers: Driver[]) {
  return drivers.filter((d) => d.status === "available" && new Date(d.license_expiry) >= new Date());
}