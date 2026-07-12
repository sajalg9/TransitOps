// src/components/analytics/KpiStrip.tsx
import { KpiCard } from "@/components/shared/KpiCard";

interface Props {
  fuelEfficiency: number;
  fleetUtilization: number;
  operationalCost: number;
  vehicleRoi: number;
}

export function KpiStrip({ fuelEfficiency, fleetUtilization, operationalCost, vehicleRoi }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <KpiCard label="Fuel Efficiency" value={`${fuelEfficiency} km/l`} accentColor="border-l-blue-500" />
      <KpiCard label="Fleet Utilization" value={`${fleetUtilization}%`} accentColor="border-l-success" />
      <KpiCard label="Operational Cost" value={operationalCost.toLocaleString("en-IN")} accentColor="border-l-warning" />
      <KpiCard label="Vehicle ROI" value={`${vehicleRoi}%`} accentColor="border-l-success" />
    </div>
  );
}