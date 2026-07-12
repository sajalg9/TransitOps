// src/components/fleet/VehicleFormDialog.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleSchema, VehicleFormValues } from "@/lib/validators";
import { useCreateVehicle, useUpdateVehicle } from "@/hooks/useVehicles";
import type { Vehicle } from "@/types/database";
import { useEffect } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  vehicle?: Vehicle | null;
  existingRegNos: string[];
}

export function VehicleFormDialog({ open, onClose, vehicle, existingRegNos }: Props) {
  const createMutation = useCreateVehicle();
  const updateMutation = useUpdateVehicle();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      registration_no: "",
      name: "",
      type: "",
      capacity_kg: 0,
      odometer: 0,
      acquisition_cost: 0,
      status: "available",
      region: "",
    },
  });

  useEffect(() => {
    if (vehicle) reset(vehicle as VehicleFormValues);
    else reset({ registration_no: "", name: "", type: "", capacity_kg: 0, odometer: 0, acquisition_cost: 0, status: "available", region: "" });
  }, [vehicle, open]);

  if (!open) return null;

  async function onSubmit(values: VehicleFormValues) {
    const payload = {
      ...values,
      region: values.region ?? null,
    };

    if (!vehicle && existingRegNos.includes(values.registration_no)) {
      alert("Registration number must be unique.");
      return;
    }
    if (vehicle) await updateMutation.mutateAsync({ id: vehicle.id, payload });
    else await createMutation.mutateAsync(payload);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg w-full max-w-md p-6 space-y-4 border border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{vehicle ? "Edit Vehicle" : "Add Vehicle"}</h3>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="text-sm font-medium">Registration No.</label>
            <input {...register("registration_no")} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
            {errors.registration_no && <p className="text-xs text-destructive mt-1">{errors.registration_no.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium">Name / Model</label>
            <input {...register("name")} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Type</label>
              <input {...register("type")} placeholder="Van/Truck/ABC" className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium">Capacity (kg)</label>
              <input type="number" {...register("capacity_kg")} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
              {errors.capacity_kg && <p className="text-xs text-destructive mt-1">{errors.capacity_kg.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Odometer</label>
              <input type="number" {...register("odometer")} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium">Acquisition Cost</label>
              <input type="number" {...register("acquisition_cost")} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Region</label>
            <input {...register("region")} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium">Status</label>
            <select {...register("status")} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="available">Available</option>
              <option value="on_trip">On Trip</option>
              <option value="in_shop">In Shop</option>
              <option value="retired">Retired</option>
            </select>
          </div>
          <button className="w-full bg-primary text-primary-foreground rounded-md py-2 font-medium hover:opacity-90">
            {vehicle ? "Save Changes" : "Add Vehicle"}
          </button>
        </form>
      </div>
    </div>
  );
}