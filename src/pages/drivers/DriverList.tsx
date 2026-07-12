import { useState } from "react";
import { useDrivers } from "@/hooks/useDrivers";
import { DriverTable } from "@/components/drivers/DriverTable";
import { DriverFormDialog } from "@/components/drivers/DriverFormDialog";
import { SearchInput } from "@/components/shared/SearchInput";
import { FilterBar } from "@/components/shared/FilterBar";
import type { Driver } from "@/types/database";
import { Plus } from "lucide-react";

export default function DriverList() {
  const { data: drivers = [], isLoading } = useDrivers();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Driver | null>(null);

  const filtered = drivers.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.license_no.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Drivers & Safety Profiles</h1>
        <button
          onClick={() => { setEditing(null); setDialogOpen(true); }}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90"
        >
          <Plus size={16} /> Add Driver
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SearchInput value={search} onChange={setSearch} placeholder="Search name/license..." />
        <FilterBar
          filters={[
            { label: "Status", value: statusFilter, onChange: setStatusFilter, options: [
              { label: "Status: All", value: "all" },
              { label: "Available", value: "available" },
              { label: "On Trip", value: "on_trip" },
              { label: "Off Duty", value: "off_duty" },
              { label: "Suspended", value: "suspended" },
            ] },
          ]}
        />
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground text-sm">Loading drivers...</div>
      ) : (
        <DriverTable drivers={filtered} onEdit={(d) => { setEditing(d); setDialogOpen(true); }} />
      )}

      <DriverFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        driver={editing}
        existingLicenseNos={drivers.map((d) => d.license_no)}
      />
    </div>
  );
}