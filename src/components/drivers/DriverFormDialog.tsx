// src/components/drivers/DriverFormDialog.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { driverSchema, DriverFormValues } from "@/lib/validators";
import { useCreateDriver, useUpdateDriver } from "@/hooks/useDrivers";
import type { Driver } from "@/types/database";
import { useEffect } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  driver?: Driver | null;
  existingLicenseNos: string[];
}

export function DriverFormDialog({ open, onClose, driver, existingLicenseNos }: Props) {
  const createMutation = useCreateDriver();
  const updateMutation = useUpdateDriver();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DriverFormValues>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      name: "", license_no: "", license_category: "", license_expiry: "",
      contact: "", safety_score: 100, status: "available",
    },
  });

  useEffect(() => {
    if (driver) reset(driver as DriverFormValues);
    else reset({ name: "", license_no: "", license_category: "", license_expiry: "", contact: "", safety_score: 100, status: "available" });
  }, [driver, open]);

  if (!open) return null;

  async function onSubmit(values: DriverFormValues) {
    if (!driver && existingLicenseNos.includes(values.license_no)) {
      alert("License number must be unique.");
      return;
    }
    if (driver) await updateMutation.mutateAsync({ id: driver.id, payload: values });
    else await createMutation.mutateAsync(values);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg w-full max-w-md p-6 space-y-4 border border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{driver ? "Edit Driver" : "Add Driver"}</h3>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input {...register("name")} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">License No.</label>
              <input {...register("license_no")} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
              {errors.license_no && <p className="text-xs text-destructive mt-1">{errors.license_no.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <input {...register("license_category")} placeholder="LMV/HMV" className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">License Expiry</label>
            <input type="date" {...register("license_expiry")} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium">Contact</label>
            <input {...register("contact")} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Safety Score</label>
              <input type="number" {...register("safety_score")} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <select {...register("status")} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="available">Available</option>
                <option value="on_trip">On Trip</option>
                <option value="off_duty">Off Duty</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
          <button className="w-full bg-primary text-primary-foreground rounded-md py-2 font-medium hover:opacity-90">
            {driver ? "Save Changes" : "Add Driver"}
          </button>
        </form>
      </div>
    </div>
  );
}