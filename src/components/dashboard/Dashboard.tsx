// src/pages/dashboard/Dashboard.tsx
import { useState } from "react";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { KpiCard } from "@/components/shared/KpiCard";
import { RecentTrips } from "@/components/dashboard/RecentTrips";
import { VehicleStatusBars } from "@/components/dashboard/VehicleStatusBars";
import { FilterBar } from "@/components/shared/FilterBar";

export default function Dashboard() {
  const { data, isLoading } = useDashboardStats();
  const [vehicleType, setVehicleType] = useState("all");
  const [status, setStatus] = useState("all");
  const [region, setRegion] = useState("all");

  if (isLoading || !data) {
    return <div className="text-center py-12 text-muted-foreground text-sm">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <FilterBar
        filters={[
          { label: "Vehicle Type", value: vehicleType, onChange: setVehicleType, options: [{ label: "Vehicle Type: All", value: "all" }] },
          { label: "Status", value: status, onChange: setStatus, options: [{ label: "Status: All", value: "all" }] },
          { label: "Region", value: region, onChange: setRegion, options: [{ label: "Region: All", value: "all" }] },
        ]}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiCard label="Active Vehicles" value={data.activeVehicles} accentColor="border-l-blue-500" />
        <KpiCard label="Available Vehicles" value={data.availableVehicles} accentColor="border-l-success" />
        <KpiCard label="Vehicles in Maintenance" value={data.inMaintenance} accentColor="border-l-warning" />
        <KpiCard label="Active Trips" value={data.activeTrips} accentColor="border-l-blue-500" />
        <KpiCard label="Pending Trips" value={data.pendingTrips} accentColor="border-l-muted-foreground" />
        <KpiCard label="Fleet Utilization" value={`${data.fleetUtilization}%`} accentColor="border-l-success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-2">
          <h3 className="font-semibold">Recent Trips</h3>
          <RecentTrips trips={data.recentTrips} />
        </div>
        <div className="border border-border rounded-lg p-4">
          <VehicleStatusBars breakdown={data.vehicleStatusBreakdown} total={data.totalVehicles} />
        </div>
      </div>
    </div>
  );
}