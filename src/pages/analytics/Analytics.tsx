import { useAnalytics } from "@/hooks/useAnalytics";
import { KpiStrip } from "@/components/analytics/KpiStrip";
import { RevenueChart } from "@/components/analytics/RevenueChart";
import { TopCostliestVehicles } from "@/components/analytics/TopCostliestVehicle";
import { CsvExportButton } from "@/components/shared/CsvExportButton";

export default function Analytics() {
  const { data, isLoading } = useAnalytics();

  if (isLoading || !data) {
    return <div className="text-center py-12 text-muted-foreground text-sm">Loading analytics...</div>;
  }

  const exportRows = data.topCostliest.map((item) => ({
    vehicle: item.vehicle.registration_no,
    total_cost: item.totalCost,
    roi_pct: item.roi,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <CsvExportButton filename="transitops_report" rows={exportRows} />
      </div>

      <KpiStrip
        fuelEfficiency={data.fuelEfficiency}
        fleetUtilization={data.fleetUtilization}
        operationalCost={data.operationalCost}
        vehicleRoi={data.vehicleRoi}
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-3">Monthly Revenue</h3>
          <RevenueChart data={data.monthlyRevenue} />
        </div>
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-3">Top Costliest Vehicles</h3>
          <TopCostliestVehicles items={data.topCostliest} />
        </div>
      </div>
    </div>
  );
}
