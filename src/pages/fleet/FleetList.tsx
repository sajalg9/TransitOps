// src/pages/fleet/FleetList.tsx
import { useState, useMemo } from "react";
import { useVehicles } from "@/hooks/useVehicles";
import { VehicleTable } from "@/components/fleet/VehicleTable";
import { VehicleFormDialog } from "@/components/fleet/VehicleFormDialog";
import { SearchInput } from "@/components/shared/SearchInput";
import { FilterBar } from "@/components/shared/FilterBar";
import type { Vehicle } from "@/types/database";
import { Plus } from "lucide-react";

export default function FleetList() {
  const { data: vehicles = [], isLoading } = useVehicles();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Vehicle | null>(null);

  const types = useMemo(() => Array.from(new Set(vehicles.map((v) => v.type))), [vehicles]);

  const filtered = vehicles.filter((v) => {
    const matchesSearch = v.registration_no.toLowerCase().includes(search.toLowerCase()) || v.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || v.type === typeFilter;
    const matchesStatus = statusFilter === "all" || v.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Vehicle Registry</h1>
        <button
          onClick={() => { setEditing(null); setDialogOpen(true); }}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90"
        >
          <Plus size={16} /> Add Vehicle
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SearchInput value={search} onChange={setSearch} placeholder="Search reg. no..." />
        <FilterBar
          filters={[
            { label: "Type", value: typeFilter, onChange: setTypeFilter, options: [{ label: "Type: All", value: "all" }, ...types.map((t) => ({ label: t, value: t }))] },
            { label: "Status", value: statusFilter, onChange: setStatusFilter, options: [
              { label: "Status: All", value: "all" },
              { label: "Available", value: "available" },
              { label: "On Trip", value: "on_trip" },
              { label: "In Shop", value: "in_shop" },
              { label: "Retired", value: "retired" },
            ] },
          ]}
        />
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground text-sm">Loading vehicles...</div>
      ) : (
        <VehicleTable vehicles={filtered} onEdit={(v) => { setEditing(v); setDialogOpen(true); }} />
      )}

      <VehicleFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        vehicle={editing}
        existingRegNos={vehicles.map((v) => v.registration_no)}
      />
    </div>
  );
}