import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// Get all projects (public)
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("projects").collect();
  },
});

// Create project (admin only)
export const create = mutation({
  args: {
    name: v.string(),
    thumbnailUrl: v.string(),
    liveUrl: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    if (user?.role !== "admin") throw new Error("Unauthorized");

    const projectId = await ctx.db.insert("projects", {
      name: args.name,
      thumbnailUrl: args.thumbnailUrl,
      liveUrl: args.liveUrl,
      description: args.description,
    });

    return projectId;
  },
});

// Delete project (admin only)
export const remove = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    if (user?.role !== "admin") throw new Error("Unauthorized");

    await ctx.db.delete(args.projectId);
  },
});

// Update project (admin only)
export const update = mutation({
  args: {
    projectId: v.id("projects"),
    name: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    if (user?.role !== "admin") throw new Error("Unauthorized");

    const { projectId, ...updates } = args;
    await ctx.db.patch(projectId, updates);
  },
});
