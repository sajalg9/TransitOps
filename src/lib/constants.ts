export const ROLES = ["fleet_manager", "dispatcher", "safety_officer", "financial_analyst"] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<Role, string> = {
  fleet_manager: "Fleet Manager",
  dispatcher: "Dispatcher",
  safety_officer: "Safety Officer",
  financial_analyst: "Financial Analyst",
};

export const VEHICLE_STATUS = ["available", "on_trip", "in_shop", "retired"] as const;
export type VehicleStatus = (typeof VEHICLE_STATUS)[number];

export const DRIVER_STATUS = ["available", "on_trip", "off_duty", "suspended"] as const;
export type DriverStatus = (typeof DRIVER_STATUS)[number];

export const TRIP_STATUS = ["draft", "dispatched", "completed", "cancelled"] as const;
export type TripStatus = (typeof TRIP_STATUS)[number];

export const MAINTENANCE_STATUS = ["active", "completed"] as const;
export type MaintenanceStatus = (typeof MAINTENANCE_STATUS)[number];

export const STATUS_COLORS: Record<string, string> = {
  available: "bg-success/20 text-success border-success/30",
  on_trip: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  in_shop: "bg-warning/20 text-warning border-warning/30",
  retired: "bg-destructive/20 text-destructive border-destructive/30",
  off_duty: "bg-muted text-muted-foreground border-border",
  suspended: "bg-warning/20 text-warning border-warning/30",
  draft: "bg-muted text-muted-foreground border-border",
  dispatched: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  completed: "bg-success/20 text-success border-success/30",
  cancelled: "bg-destructive/20 text-destructive border-destructive/30",
  active: "bg-warning/20 text-warning border-warning/30",
};

export const NAV_ITEMS = [
  { label: "Dashboard", path: "/dashboard", icon: "LayoutDashboard" },
  { label: "Fleet", path: "/fleet", icon: "Truck" },
  { label: "Drivers", path: "/drivers", icon: "Users" },
  { label: "Trips", path: "/trips", icon: "Route" },
  { label: "Maintenance", path: "/maintenance", icon: "Wrench" },
  { label: "Fuel & Expenses", path: "/fuel-expenses", icon: "Fuel" },
  { label: "Analytics", path: "/analytics", icon: "BarChart3" },
  { label: "Settings", path: "/settings", icon: "Settings" },
] as const;
// src/lib/constants.ts (append)
export const RBAC_MATRIX: Record<Role, Record<string, "full" | "view" | "none">> = {
  fleet_manager:     { fleet: "full", drivers: "full", trips: "none", fuel_exp: "view", analytics: "full" },
  dispatcher:        { fleet: "view", drivers: "none", trips: "full", fuel_exp: "none", analytics: "none" },
  safety_officer:    { fleet: "none", drivers: "full", trips: "view", fuel_exp: "none", analytics: "none" },
  financial_analyst: { fleet: "view", drivers: "none", trips: "none", fuel_exp: "full", analytics: "full" },
};

export const RBAC_MODULES = ["fleet", "drivers", "trips", "fuel_exp", "analytics"] as const;
export const RBAC_MODULE_LABELS: Record<string, string> = {
  fleet: "Fleet", drivers: "Drivers", trips: "Trips", fuel_exp: "Fuel/Exp", analytics: "Analytics",
};