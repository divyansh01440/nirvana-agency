import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// Create a new booking
export const create = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const bookingId = await ctx.db.insert("bookings", {
      userId,
      companyName: args.companyName,
      email: args.email,
      service: args.service,
      contactNumber: args.contactNumber,
      alternativeContactNumber: args.alternativeContactNumber,
      state: args.state,
      city: args.city,
      address: args.address,
      pincode: args.pincode,
      status: "Pending",
    });

    return bookingId;
  },
});

// Get bookings for current user
export const getUserBookings = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    return await ctx.db
      .query("bookings")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
  },
});

// Get all bookings (admin only)
export const getAll = query({
  args: {
    status: v.optional(
      v.union(
        v.literal("Pending"),
        v.literal("Attended"),
        v.literal("Not Attended"),
        v.literal("Not Sure"),
        v.literal("Purchased Service"),
        v.literal("Not Interested")
      )
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const user = await ctx.db.get(userId);
    if (user?.role !== "admin") return [];

    let bookings;

    if (args.status) {
      bookings = await ctx.db
        .query("bookings")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .collect();
    } else {
      bookings = await ctx.db.query("bookings").collect();
    }

    const bookingsWithUser = await Promise.all(
      bookings.map(async (booking) => {
        const user = await ctx.db.get(booking.userId);
        return {
          ...booking,
          userName: user?.name || "Unknown",
        };
      })
    );

    return bookingsWithUser;
  },
});

// Update booking status (admin only)
export const updateStatus = mutation({
  args: {
    bookingId: v.id("bookings"),
    status: v.union(
      v.literal("Pending"),
      v.literal("Attended"),
      v.literal("Not Attended"),
      v.literal("Not Sure"),
      v.literal("Purchased Service"),
      v.literal("Not Interested")
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    if (user?.role !== "admin") throw new Error("Unauthorized");

    await ctx.db.patch(args.bookingId, {
      status: args.status,
    });
  },
});

// Get booking stats (admin only)
export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const user = await ctx.db.get(userId);
    if (user?.role !== "admin") return null;

    const bookings = await ctx.db.query("bookings").collect();

    const stats = {
      total: bookings.length,
      pending: bookings.filter((b) => b.status === "Pending").length,
      attended: bookings.filter((b) => b.status === "Attended").length,
      notAttended: bookings.filter((b) => b.status === "Not Attended").length,
      notSure: bookings.filter((b) => b.status === "Not Sure").length,
      purchased: bookings.filter((b) => b.status === "Purchased Service")
        .length,
      notInterested: bookings.filter((b) => b.status === "Not Interested")
        .length,
    };

    return stats;
  },
});
