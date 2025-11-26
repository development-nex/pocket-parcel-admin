import z from "zod";

// Create location serviceability - for use with validate(schema) which defaults to "body"
export const createLocationServiceabilitySchema = z.object({
  location_name: z
    .string()
    .min(1, "Location name is required")
    .max(200, "Location name must not exceed 200 characters"),
  city: z
    .string()
    .min(1, "City is required")
    .max(100, "City must not exceed 100 characters"),
  state: z
    .string()
    .min(1, "State is required")
    .max(100, "State must not exceed 100 characters"),
  country: z
    .string()
    .max(100, "Country must not exceed 100 characters")
    .default("India"),
  pincode: z
    .string()
    .regex(/^\d{6}$/, "Pincode must be 6 digits")
    .optional(),
  latitude: z
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  longitude: z
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
  radius_km: z
    .number()
    .positive("Radius must be positive")
    .max(100, "Radius cannot exceed 100 km")
    .default(5.0),
  is_serviceable: z.boolean().default(true),
  service_types: z
    .array(z.enum(["STANDARD", "EXPRESS", "SAME_DAY", "NEXT_DAY", "SCHEDULED"]))
    .min(1, "At least one service type is required")
    .default(["STANDARD"]),
  estimated_days: z
    .number()
    .int()
    .positive("Estimated days must be positive")
    .default(2),
  cod_available: z.boolean().default(true),
  pickup_available: z.boolean().default(true),
  delivery_available: z.boolean().default(true),
  priority: z.number().int().min(0).default(0),
  coverage_notes: z.string().max(1000).optional(),
  operational_hours: z
    .object({
      monday: z.string().optional(),
      tuesday: z.string().optional(),
      wednesday: z.string().optional(),
      thursday: z.string().optional(),
      friday: z.string().optional(),
      saturday: z.string().optional(),
      sunday: z.string().optional(),
    })
    .optional(),
  special_instructions: z.string().max(1000).optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "UNDER_REVIEW"]).default("ACTIVE"),
});

export const updateLocationServiceabilitySchema = z.object({
  params: z.object({
    id: z.string().min(1, "Location ID is required"),
  }),
  body: z.object({
    location_name: z.string().max(200).optional(),
    city: z.string().max(100).optional(),
    state: z.string().max(100).optional(),
    country: z.string().max(100).optional(),
    pincode: z
      .string()
      .regex(/^\d{6}$/)
      .optional(),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    radius_km: z.number().positive().max(100).optional(),
    is_serviceable: z.boolean().optional(),
    service_types: z
      .array(
        z.enum(["STANDARD", "EXPRESS", "SAME_DAY", "NEXT_DAY", "SCHEDULED"])
      )
      .min(1)
      .optional(),
    estimated_days: z.number().int().positive().optional(),
    cod_available: z.boolean().optional(),
    pickup_available: z.boolean().optional(),
    delivery_available: z.boolean().optional(),
    priority: z.number().int().min(0).optional(),
    coverage_notes: z.string().max(1000).optional(),
    operational_hours: z
      .object({
        monday: z.string().optional(),
        tuesday: z.string().optional(),
        wednesday: z.string().optional(),
        thursday: z.string().optional(),
        friday: z.string().optional(),
        saturday: z.string().optional(),
        sunday: z.string().optional(),
      })
      .optional(),
    special_instructions: z.string().max(1000).optional(),
    status: z.enum(["ACTIVE", "INACTIVE", "UNDER_REVIEW"]).optional(),
  }),
});
