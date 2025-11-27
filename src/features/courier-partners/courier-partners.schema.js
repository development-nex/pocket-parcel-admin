import z from "zod";

export const createCourierPartnerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .trim(),
  code: z
    .string()
    .min(2, "Code must be at least 2 characters")
    .max(50, "Code must not exceed 50 characters")
    .toUpperCase()
    .regex(
      /^[A-Z0-9_-]+$/,
      "Code must contain only uppercase letters, numbers, hyphens and underscores"
    )
    .trim(),
  logo: z
    .string()
    .url("Logo must be a valid URL")
    .max(500, "Logo URL must not exceed 500 characters")
    .optional()
    .nullable(),
  description: z
    .string()
    .max(1000, "Description must not exceed 1000 characters")
    .trim()
    .optional()
    .nullable(),
  contact_person: z
    .string()
    .max(100, "Contact person name must not exceed 100 characters")
    .trim()
    .optional()
    .nullable(),
  contact_email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email must not exceed 255 characters")
    .toLowerCase()
    .trim()
    .optional()
    .nullable(),
  contact_phone: z
    .string()
    .max(20, "Phone number must not exceed 20 characters")
    .regex(/^[+]?[0-9\s()-]+$/, "Invalid phone number format")
    .trim()
    .optional()
    .nullable(),
  website: z
    .string()
    .url("Website must be a valid URL")
    .max(255, "Website URL must not exceed 255 characters")
    .trim()
    .optional()
    .nullable(),
  api_endpoint: z
    .string()
    .url("API endpoint must be a valid URL")
    .max(500, "API endpoint must not exceed 500 characters")
    .trim()
    .optional()
    .nullable(),
  api_key: z
    .string()
    .max(500, "API key must not exceed 500 characters")
    .trim()
    .optional()
    .nullable(),
  api_secret: z
    .string()
    .max(500, "API secret must not exceed 500 characters")
    .trim()
    .optional()
    .nullable(),
  additional_config: z
    .object({
      max_weight_kg: z.number().optional().nullable(),
      supports_cod: z.boolean().optional().nullable(),
      supports_reverse_pickup: z.boolean().optional().nullable(),
    })
    .optional()
    .nullable(),
  is_active: z.boolean().default(true),
  priority: z
    .number()
    .int("Priority must be an integer")
    .min(0, "Priority must be at least 0")
    .default(0),
});

export const updateCourierPartnerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .trim()
    .optional(),
  code: z
    .string()
    .min(2, "Code must be at least 2 characters")
    .max(50, "Code must not exceed 50 characters")
    .toUpperCase()
    .regex(
      /^[A-Z0-9_-]+$/,
      "Code must contain only uppercase letters, numbers, hyphens and underscores"
    )
    .trim()
    .optional(),
  logo: z
    .string()
    .url("Logo must be a valid URL")
    .max(500, "Logo URL must not exceed 500 characters")
    .optional()
    .nullable(),
  description: z
    .string()
    .max(1000, "Description must not exceed 1000 characters")
    .trim()
    .optional()
    .nullable(),
  contact_person: z
    .string()
    .max(100, "Contact person name must not exceed 100 characters")
    .trim()
    .optional()
    .nullable(),
  contact_email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email must not exceed 255 characters")
    .toLowerCase()
    .trim()
    .optional()
    .nullable(),
  contact_phone: z
    .string()
    .max(20, "Phone number must not exceed 20 characters")
    .regex(/^[+]?[0-9\s()-]+$/, "Invalid phone number format")
    .trim()
    .optional()
    .nullable(),
  website: z
    .string()
    .url("Website must be a valid URL")
    .max(255, "Website URL must not exceed 255 characters")
    .trim()
    .optional()
    .nullable(),
  api_endpoint: z
    .string()
    .url("API endpoint must be a valid URL")
    .max(500, "API endpoint must not exceed 500 characters")
    .trim()
    .optional()
    .nullable(),
  api_key: z
    .string()
    .max(500, "API key must not exceed 500 characters")
    .trim()
    .optional()
    .nullable(),
  api_secret: z
    .string()
    .max(500, "API secret must not exceed 500 characters")
    .trim()
    .optional()
    .nullable(),
  additional_config: z
    .object({
      max_weight_kg: z.number().optional().nullable(),
      supports_cod: z.boolean().optional().nullable(),
      supports_reverse_pickup: z.boolean().optional().nullable(),
    })
    .optional()
    .nullable(),
  is_active: z.boolean().optional(),
  priority: z
    .number()
    .int("Priority must be an integer")
    .min(0, "Priority must be at least 0")
    .optional(),
});
