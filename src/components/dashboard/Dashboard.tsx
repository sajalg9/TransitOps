// src/pages/dashboard/Dashboard.tsx
import { useMemo, useState } from "react";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { KpiCard } from "@/components/shared/KpiCard";
import { RecentTrips } from "@/components/dashboard/RecentTrips";
import { VehicleStatusBars } from "@/components/dashboard/VehicleStatusBars";
import { FilterBar } from "@/components/shared/FilterBar";
import { VEHICLE_STATUS } from "@/lib/constants";
import type { VehicleStatus } from "@/lib/constants";

export default function Dashboard() {
  const { data, isLoading } = useDashboardStats();
  const [vehicleType, setVehicleType] = useState("all");
  const [status, setStatus] = useState("all");
  const [region, setRegion] = useState("all");
  const vehicles = data?.vehicles ?? [];
  const trips = data?.trips ?? [];

  const vehicleTypes = useMemo(
    () => Array.from(new Set(vehicles.map((vehicle) => vehicle.type).filter(Boolean))).sort(),
    [vehicles],
  );
  const regions = useMemo(
    () => Array.from(new Set(vehicles.map((vehicle) => vehicle.region).filter((item): item is string => Boolean(item)))).sort(),
    [vehicles],
  );
  const filteredVehicles = useMemo(
    () => vehicles.filter((vehicle) => {
      const matchesType = vehicleType === "all" || vehicle.type === vehicleType;
      const matchesStatus = status === "all" || vehicle.status === status;
      const matchesRegion = region === "all" || vehicle.region === region;
      return matchesType && matchesStatus && matchesRegion;
    }),
    [vehicles, vehicleType, status, region],
  );
  const filteredVehicleIds = useMemo(() => new Set(filteredVehicles.map((vehicle) => vehicle.id)), [filteredVehicles]);
  const filteredTrips = useMemo(
    () => trips.filter((trip) => filteredVehicleIds.has(trip.vehicle_id)),
    [trips, filteredVehicleIds],
  );
  const activeVehicles = filteredVehicles.filter((vehicle) => vehicle.status !== "retired").length;
  const availableVehicles = filteredVehicles.filter((vehicle) => vehicle.status === "available").length;
  const inMaintenance = filteredVehicles.filter((vehicle) => vehicle.status === "in_shop").length;
  const onTripVehicles = filteredVehicles.filter((vehicle) => vehicle.status === "on_trip").length;
  const retiredVehicles = filteredVehicles.filter((vehicle) => vehicle.status === "retired").length;
  const activeTrips = filteredTrips.filter((trip) => trip.status === "dispatched").length;
  const pendingTrips = filteredTrips.filter((trip) => trip.status === "draft").length;
  const fleetUtilization = activeVehicles > 0 ? Math.round((onTripVehicles / activeVehicles) * 100) : 0;
  const recentTrips = filteredTrips.slice(0, 5);
  const vehicleStatusBreakdown: Record<VehicleStatus, number> = {
    available: availableVehicles,
    on_trip: onTripVehicles,
    in_shop: inMaintenance,
    retired: retiredVehicles,
  };

  if (isLoading || !data) {
    return <div className="text-center py-12 text-muted-foreground text-sm">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <FilterBar
        filters={[
          {
            label: "Vehicle Type",
            value: vehicleType,
            onChange: setVehicleType,
            options: [
              { label: "Vehicle Type: All", value: "all" },
              ...vehicleTypes.map((type) => ({ label: type, value: type })),
            ],
          },
          {
            label: "Status",
            value: status,
            onChange: setStatus,
            options: [
              { label: "Status: All", value: "all" },
              ...VEHICLE_STATUS.map((item) => ({ label: item.replace("_", " "), value: item })),
            ],
          },
          {
            label: "Region",
            value: region,
            onChange: setRegion,
            options: [
              { label: "Region: All", value: "all" },
              ...regions.map((item) => ({ label: item, value: item })),
            ],
          },
        ]}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiCard label="Active Vehicles" value={activeVehicles} accentColor="border-l-blue-500" />
        <KpiCard label="Available Vehicles" value={availableVehicles} accentColor="border-l-success" />
        <KpiCard label="Vehicles in Maintenance" value={inMaintenance} accentColor="border-l-warning" />
        <KpiCard label="Active Trips" value={activeTrips} accentColor="border-l-blue-500" />
        <KpiCard label="Pending Trips" value={pendingTrips} accentColor="border-l-muted-foreground" />
        <KpiCard label="Fleet Utilization" value={`${fleetUtilization}%`} accentColor="border-l-success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-2">
          <h3 className="font-semibold">Recent Trips</h3>
          <RecentTrips trips={recentTrips} />
        </div>
        <div className="border border-border rounded-lg p-4">
          <VehicleStatusBars breakdown={vehicleStatusBreakdown} total={filteredVehicles.length} />
        </div>
      </div>
    </div>
  );
}
