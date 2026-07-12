// src/components/settings/GeneralSettingsForm.tsx
import { useState, useEffect } from "react";
import { useOrgSettings, useUpdateOrgSettings } from "@/hooks/useOrgSettings";

export function GeneralSettingsForm() {
  const { data: settings } = useOrgSettings();
  const updateMutation = useUpdateOrgSettings();
  const [depotName, setDepotName] = useState("");
  const [currency, setCurrency] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("");

  useEffect(() => {
    if (settings) {
      setDepotName(settings.depot_name);
      setCurrency(settings.currency);
      setDistanceUnit(settings.distance_unit);
    }
  }, [settings]);

  async function handleSave() {
    if (!settings) return;
    await updateMutation.mutateAsync({ id: settings.id, payload: { depot_name: depotName, currency, distance_unit: distanceUnit } });
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">General</h3>
      <div>
        <label className="text-sm font-medium">Depot Name</label>
        <input value={depotName} onChange={(e) => setDepotName(e.target.value)} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="text-sm font-medium">Currency</label>
        <input value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="text-sm font-medium">Distance Unit</label>
        <input value={distanceUnit} onChange={(e) => setDistanceUnit(e.target.value)} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
      </div>
      <button onClick={handleSave} className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium hover:opacity-90">
        Save Changes
      </button>
    </div>
  );
}