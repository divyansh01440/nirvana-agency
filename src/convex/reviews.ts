import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// Create a review (only users with purchased service)
export const create = mutation({
  args: {
    bookingId: v.id("bookings"),
    rating: v.number(),
    feedback: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Check if booking exists and user owns it
    const booking = await ctx.db.get(args.bookingId);
    if (!booking) throw new Error("Booking not found");
    if (booking.userId !== userId) throw new Error("Unauthorized");

    // Check if booking status is "Purchased Service"
    if (booking.status !== "Purchased Service") {
      throw new Error("Can only review purchased services");
    }

    // Check if user already reviewed this booking
    const existing = await ctx.db
      .query("reviews")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const alreadyReviewed = existing.some((r) => r.bookingId === args.bookingId);
    if (alreadyReviewed) {
      throw new Error("Already reviewed this booking");
    }

    const reviewId = await ctx.db.insert("reviews", {
      userId,
      bookingId: args.bookingId,
      rating: args.rating,
      feedback: args.feedback,
      approved: false, // Needs admin approval
    });

    return reviewId;
  },
});

// Get approved reviews (public)
export const getApproved = query({
  args: {},
  handler: async (ctx) => {
    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_approved", (q) => q.eq("approved", true))
      .collect();

    const reviewsWithUser = await Promise.all(
      reviews.map(async (review) => {
        const user = await ctx.db.get(review.userId);
        return {
          ...review,
          userName: user?.name || "Anonymous",
          userImage: user?.image,
        };
      })
    );

    return reviewsWithUser;
  },
});

// Get all reviews (admin only)
export const getAll = query({
  args: {
    approved: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const user = await ctx.db.get(userId);
    if (user?.role !== "admin") return [];

    let reviews;

    if (args.approved !== undefined) {
      reviews = await ctx.db
        .query("reviews")
        .withIndex("by_approved", (q) => q.eq("approved", args.approved!))
        .collect();
    } else {
      reviews = await ctx.db.query("reviews").collect();
    }

    const reviewsWithUser = await Promise.all(
      reviews.map(async (review) => {
        const user = await ctx.db.get(review.userId);
        return {
          ...review,
          userName: user?.name || "Anonymous",
          userEmail: user?.email || "N/A",
        };
      })
    );

    return reviewsWithUser;
  },
});

// Toggle review approval (admin only)
export const toggleApproval = mutation({
  args: {
    reviewId: v.id("reviews"),
    approved: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    if (user?.role !== "admin") throw new Error("Unauthorized");

    await ctx.db.patch(args.reviewId, {
      approved: args.approved,
    });
  },
});

// Get user's eligible bookings for review
export const getEligibleBookings = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    // Get bookings with "Purchased Service" status
    const bookings = await ctx.db
      .query("bookings")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const purchasedBookings = bookings.filter(
      (b) => b.status === "Purchased Service"
    );

    // Get existing reviews
    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const reviewedBookingIds = new Set(reviews.map((r) => r.bookingId));

    // Return bookings that haven't been reviewed
    return purchasedBookings.filter((b) => !reviewedBookingIds.has(b._id));
  },
});
