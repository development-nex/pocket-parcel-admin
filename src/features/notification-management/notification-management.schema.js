import z from "zod";

export const createNotificationSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must not exceed 255 characters"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(5000, "Message must not exceed 5000 characters"),
  type: z
    .enum([
      "GENERAL",
      "ORDER_UPDATE",
      "DELIVERY_UPDATE",
      "PROMOTION",
      "SYSTEM",
      "ALERT",
      "REMINDER",
    ])
    .default("GENERAL"),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).default("NORMAL"),
  targetAudience: z
    .enum(["ALL_USERS", "SPECIFIC_USERS", "SEGMENTS", "FILTERS"])
    .default("ALL_USERS"),
  targetUserIds: z.array(z.string()).optional().nullable(),
  targetSegments: z.array(z.string()).optional().nullable(),
  imageUrl: z.url().optional().nullable(),
  actionUrl: z.string().optional().nullable(),
  scheduledFor: z.iso.datetime().optional().nullable(),
});

export const updateNotificationSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must not exceed 255 characters")
    .optional(),
  message: z
    .string()
    .min(1, "Message is required")
    .max(5000, "Message must not exceed 5000 characters")
    .optional(),
  type: z
    .enum([
      "GENERAL",
      "ORDER_UPDATE",
      "DELIVERY_UPDATE",
      "PROMOTION",
      "SYSTEM",
      "ALERT",
      "REMINDER",
    ])
    .optional(),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).optional(),
  targetAudience: z
    .enum(["ALL_USERS", "SPECIFIC_USERS", "SEGMENTS", "FILTERS"])
    .optional(),
  targetUserIds: z.array(z.string()).optional().nullable(),
  targetSegments: z.array(z.string()).optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  actionUrl: z.string().optional().nullable(),
  scheduledFor: z.iso.datetime().optional().nullable(),
});
