export async function fetchAnalytics() {
  const [{ data: vehicles }, { data: trips }, { data: fuelLogs }, { data: maintenanceLogs }, { data: expenses }] = await Promise.all([
    supabase.from("vehicles").select("*"),
    supabase.from("trips").select("*").eq("status", "completed"),
    supabase.from("fuel_logs").select("*"),
    supabase.from("maintenance_logs").select("*"),
    supabase.from("expenses").select("*"),
  ]);

  const v = vehicles ?? [];
  const t = trips ?? [];
  const f = fuelLogs ?? [];
  const m = maintenanceLogs ?? [];
  const e = expenses ?? [];

  const totalDistance = t.reduce((s, x) => s + (x.planned_distance_km ?? 0), 0);
  const totalFuelLiters = f.reduce((s, x) => s + x.liters, 0);
  const fuelEfficiency = totalFuelLiters > 0 ? +(totalDistance / totalFuelLiters).toFixed(1) : 0;

  const totalFuelCost = f.reduce((s, x) => s + x.cost, 0);
  const totalMaintenanceCost = m.reduce((s, x) => s + x.cost, 0);
  const totalExpenseCost = e.reduce((s, x) => s + x.toll + x.misc + x.agent_expense, 0);
  const operationalCost = totalFuelCost + totalMaintenanceCost + totalExpenseCost;

  const activeVehicles = v.filter((x) => x.status !== "retired").length;
  const onTripVehicles = v.filter((x) => x.status === "on_trip").length;
  const fleetUtilization = activeVehicles > 0 ? Math.round((onTripVehicles / activeVehicles) * 100) : 0;

  // per-vehicle cost breakdown for "Top Costliest Vehicles" + ROI
  const perVehicle = v.map((vehicle) => {
    const vFuel = f.filter((x) => x.vehicle_id === vehicle.id).reduce((s, x) => s + x.cost, 0);
    const vMaint = m.filter((x) => x.vehicle_id === vehicle.id).reduce((s, x) => s + x.cost, 0);
    const vExpense = e.filter((x) => x.vehicle_id === vehicle.id).reduce((s, x) => s + x.toll + x.misc + x.agent_expense, 0);
    const vTripsRevenue = t.filter((x) => x.vehicle_id === vehicle.id).length * 5000; // simple assumed revenue/trip
    const totalCost = vFuel + vMaint + vExpense;
    const roi = vehicle.acquisition_cost > 0 ? +(((vTripsRevenue - totalCost) / vehicle.acquisition_cost) * 100).toFixed(1) : 0;
    return { vehicle, totalCost, roi };
  });

  const avgRoi = perVehicle.length > 0 ? +(perVehicle.reduce((s, x) => s + x.roi, 0) / perVehicle.length).toFixed(1) : 0;
  const topCostliest = [...perVehicle].sort((a, b) => b.totalCost - a.totalCost).slice(0, 5);

  // monthly revenue (assumed) from completed trips grouped by month
  const monthlyMap: Record<string, number> = {};
  t.forEach((trip) => {
    const month = new Date(trip.completed_at ?? trip.created_at).toLocaleString("en-IN", { month: "short" });
    monthlyMap[month] = (monthlyMap[month] ?? 0) + 5000;
  });
  const monthlyRevenue = Object.entries(monthlyMap).map(([month, revenue]) => ({ month, revenue }));

  return {
    fuelEfficiency,
    fleetUtilization,
    operationalCost,
    vehicleRoi: avgRoi,
    topCostliest,
    monthlyRevenue,
    allTrips: t,
    allFuelLogs: f,
    allMaintenance: m,
    allExpenses: e,
  };
}