import z from "zod";

export const ROLES = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  DELIVERY_PARTNER: "DELIVERY_PARTNER",
  WAREHOUSE_MANAGER: "WAREHOUSE_MANAGER",
  CUSTOMER_SUPPORT: "CUSTOMER_SUPPORT",
};

export const adminCreateUserSchema = z.object({
  full_name: z.string().min(2).max(100).trim(),
  email: z.string().email().trim().toLowerCase(),
  country_code: z
    .string()
    .min(1)
    .max(5)
    .trim()
    .transform((val) => val.replace(/^\+/, ""))
    .refine((val) => /^\d+$/.test(val), {
      message: "Country code must contain only digits (no + sign)",
    })
    .default("91"),
  phone_number: z.string().min(10).max(15).trim(),
  role: z.enum(Object.values(ROLES)),
  password: z.string().min(8).max(50).optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
});
