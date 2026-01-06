import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// Create a query (contact message)
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    const queryId = await ctx.db.insert("queries", {
      userId: userId || undefined,
      name: args.name,
      email: args.email,
      message: args.message,
      status: "pending",
    });

    return queryId;
  },
});

// Get all queries (admin only)
export const getAll = query({
  args: {
    status: v.optional(v.union(v.literal("pending"), v.literal("resolved"))),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const user = await ctx.db.get(userId);
    if (user?.role !== "admin") return [];

    if (args.status) {
      return await ctx.db
        .query("queries")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .collect();
    }

    return await ctx.db.query("queries").collect();
  },
});

// Update query status (admin only)
export const updateStatus = mutation({
  args: {
    queryId: v.id("queries"),
    status: v.union(v.literal("pending"), v.literal("resolved")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    if (user?.role !== "admin") throw new Error("Unauthorized");

    await ctx.db.patch(args.queryId, {
      status: args.status,
    });
  },
});

// Get query stats (admin only)
export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const user = await ctx.db.get(userId);
    if (user?.role !== "admin") return null;

    const queries = await ctx.db.query("queries").collect();

    return {
      total: queries.length,
      pending: queries.filter((q) => q.status === "pending").length,
      resolved: queries.filter((q) => q.status === "resolved").length,
    };
  },
});
