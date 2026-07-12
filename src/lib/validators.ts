// src/lib/validators.ts
import { z } from "zod";

export const vehicleSchema = z.object({
  registration_no: z.string().min(3, "Registration number required"),
  name: z.string().min(1, "Name required"),
  type: z.string().min(1, "Type required"),
  capacity_kg: z.coerce.number().positive("Capacity must be positive"),
  odometer: z.coerce.number().min(0),
  acquisition_cost: z.coerce.number().min(0),
  status: z.enum(["available", "on_trip", "in_shop", "retired"]),
  region: z.string().optional(),
});

export type VehicleFormValues = z.infer<typeof vehicleSchema>;