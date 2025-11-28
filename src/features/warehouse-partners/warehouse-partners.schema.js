import z from "zod";
export const uuidSchema = z.string().uuid("Invalid UUID format");
export const validationPatterns = {
  uuid: uuidSchema,
  phone: z.string().min(10).max(15).trim(),
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8).max(50),
  name: z.string().min(2).max(100).trim(),
  optionalString: z.string().optional(),
  positiveNumber: z.number().positive(),
  nonNegativeNumber: z.number().min(0),
};

export const partnerStatusUpdateSchema = z.object({
  status: z.enum(["PENDING_REVIEW", "APPROVED", "REJECTED", "SUSPENDED"]),
  review_notes: z.string().max(1000).optional(),
});

export const updateWarehousePartnerSchema = z.object({
  full_name: validationPatterns.name.optional(),
  phone_number: validationPatterns.phone.optional(),
  email_address: validationPatterns.email.optional(),
  full_address: z.string().min(10).max(500).trim().optional(),
  city: z.string().min(2).max(100).trim().optional(),
  state: z.string().min(2).max(100).trim().optional(),
  postal_code: z.string().min(3).max(10).trim().optional(),
  country: z.string().min(2).max(100).trim().optional(),
  property_type: z.string().min(1).max(50).trim().optional(),
  available_space_size: z.string().min(1).max(100).trim().optional(),
  ground_floor_access: z.boolean().optional(),
  direct_road_access: z.boolean().optional(),
  parking_loading_area_available: z.boolean().optional(),
  availability_timeline: z.string().min(1).max(200).trim().optional(),
  prior_rental_experience: z.boolean().optional(),
  rental_experience_details: z.string().max(1000).optional(),
  //   property_images: z.array(z.string()).min(1).max(10).optional(),
});
