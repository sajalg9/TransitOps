// src/pages/settings/Settings.tsx
import { GeneralSettingsForm } from "@/components/settings/GeneralSettingsForm";
import { RbacTable } from "@/components/settings/RbacTable";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings & RBAC</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-border rounded-lg p-4">
          <GeneralSettingsForm />
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold">Role-Based Access (RBAC)</h3>
          <RbacTable />
        </div>
      </div>
    </div>
  );
}