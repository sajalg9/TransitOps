import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/dashboard/Dashboard";
import FleetList from "@/pages/fleet/FleetList";
import DriverList from "@/pages/drivers/DriverList";
import TripDispatcher from "@/pages/trips/TripDispatcher";
import Maintenance from "@/pages/maintainence/Maintainence";
import FuelExpenses from "@/pages/fuel-expenses/FuelExpenses";
import Analytics from "@/pages/analytics/Analytics";
import SettingsPage from "@/pages/settings/Settings";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/fleet" element={<FleetList />} />
          <Route path="/drivers" element={<DriverList />} />
          <Route path="/trips" element={<TripDispatcher />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/fuel-expenses" element={<FuelExpenses />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
