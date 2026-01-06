import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// Track page view (called on each page load)
export const trackPageView = mutation({
  args: {},
  handler: async (ctx) => {
    const today = new Date().toISOString().split("T")[0];

    // Find today's record
    const existing = await ctx.db
      .query("analytics")
      .withIndex("by_date", (q) => q.eq("date", today))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        pageViews: existing.pageViews + 1,
      });
    } else {
      await ctx.db.insert("analytics", {
        date: today,
        visitors: 1,
        pageViews: 1,
      });
    }
  },
});

// Track unique visitor
export const trackVisitor = mutation({
  args: {},
  handler: async (ctx) => {
    const today = new Date().toISOString().split("T")[0];

    const existing = await ctx.db
      .query("analytics")
      .withIndex("by_date", (q) => q.eq("date", today))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        visitors: existing.visitors + 1,
      });
    } else {
      await ctx.db.insert("analytics", {
        date: today,
        visitors: 1,
        pageViews: 1,
      });
    }
  },
});

// Get analytics data (admin only)
export const getStats = query({
  args: {
    days: v.optional(v.number()), // Get last N days
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const user = await ctx.db.get(userId);
    if (user?.role !== "admin") return null;

    const days = args.days || 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startDateStr = startDate.toISOString().split("T")[0];

    const analytics = await ctx.db.query("analytics").collect();

    const filteredData = analytics
      .filter((a) => a.date >= startDateStr)
      .sort((a, b) => a.date.localeCompare(b.date));

    const totalVisitors = filteredData.reduce((sum, a) => sum + a.visitors, 0);
    const totalPageViews = filteredData.reduce(
      (sum, a) => sum + a.pageViews,
      0
    );

    return {
      totalVisitors,
      totalPageViews,
      dailyData: filteredData,
    };
  },
});

// Get total traffic (admin only)
export const getTotalTraffic = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const user = await ctx.db.get(userId);
    if (user?.role !== "admin") return null;

    const analytics = await ctx.db.query("analytics").collect();

    const totalVisitors = analytics.reduce((sum, a) => sum + a.visitors, 0);
    const totalPageViews = analytics.reduce((sum, a) => sum + a.pageViews, 0);

    return {
      visitors: totalVisitors,
      pageViews: totalPageViews,
    };
  },
});
