import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
      phone: v.optional(v.string()), // phone number for bookings

      // Password-based auth fields
      username: v.optional(v.string()), // unique username
      passwordHint: v.optional(v.string()), // hint for password recovery
      resetToken: v.optional(v.string()), // token for password reset
      resetTokenExpiry: v.optional(v.number()), // expiry time for reset token
    })
      .index("email", ["email"]) // index for the email. do not remove or modify
      .index("by_username", ["username"]) // index for username
      .index("by_reset_token", ["resetToken"]), // index for reset token

    // Bookings table - stores user booking requests
    bookings: defineTable({
      userId: v.id("users"),
      companyName: v.string(),
      email: v.string(),
      service: v.union(
        v.literal("Business Automation"),
        v.literal("E-Commerce Website"),
        v.literal("SEO"),
        v.literal("Creative Web Development"),
        v.literal("Meta Ads Marketing"),
        v.literal("Custom Tech Solution")
      ),
      contactNumber: v.string(),
      alternativeContactNumber: v.optional(v.string()),
      state: v.string(),
      city: v.string(),
      address: v.string(),
      pincode: v.string(),
      status: v.union(
        v.literal("Pending"),
        v.literal("Attended"),
        v.literal("Not Attended"),
        v.literal("Not Sure"),
        v.literal("Purchased Service"),
        v.literal("Not Interested")
      ),
    })
      .index("by_user", ["userId"])
      .index("by_status", ["status"]),

    // Projects table - managed by admin, displayed to users
    projects: defineTable({
      name: v.string(),
      thumbnailUrl: v.string(),
      liveUrl: v.string(),
      description: v.string(),
    }),

    // Queries/Contact messages
    queries: defineTable({
      userId: v.optional(v.id("users")),
      name: v.string(),
      email: v.string(),
      message: v.string(),
      status: v.union(v.literal("pending"), v.literal("resolved")),
    })
      .index("by_status", ["status"])
      .index("by_user", ["userId"]),

    // Reviews & Ratings - only from users who purchased services
    reviews: defineTable({
      userId: v.id("users"),
      bookingId: v.id("bookings"),
      rating: v.number(), // 1-5
      feedback: v.string(),
      approved: v.boolean(),
    })
      .index("by_user", ["userId"])
      .index("by_approved", ["approved"]),

    // Analytics/Traffic tracking
    analytics: defineTable({
      date: v.string(), // YYYY-MM-DD format
      visitors: v.number(),
      pageViews: v.number(),
    }).index("by_date", ["date"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;
