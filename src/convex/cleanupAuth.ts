import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Clean up all auth accounts for a specific email
 * This is useful when accounts get stuck in the auth system
 */
export const cleanupAuthByEmail = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // Find all auth accounts with this email
    const authAccounts = await ctx.db
      .query("authAccounts")
      .collect();

    let deletedCount = 0;

    for (const account of authAccounts) {
      // Check if this account has the email we're looking for
      if (account.emailVerified === args.email ||
          (account as any).email === args.email) {
        await ctx.db.delete(account._id);
        deletedCount++;
      }
    }

    return {
      success: true,
      message: `Cleaned up ${deletedCount} auth account(s) for ${args.email}`,
      deletedCount,
    };
  },
});

/**
 * Clean up ALL orphaned auth data (use with caution!)
 */
export const cleanupAllOrphans = mutation({
  args: {},
  handler: async (ctx, args) => {
    const users = await ctx.db.query("users").collect();
    const userIds = new Set(users.map(u => u._id));

    // Clean up orphaned auth accounts
    const authAccounts = await ctx.db.query("authAccounts").collect();
    let deletedAccounts = 0;

    for (const account of authAccounts) {
      if (!userIds.has(account.userId)) {
        await ctx.db.delete(account._id);
        deletedAccounts++;
      }
    }

    // Clean up orphaned auth sessions
    const authSessions = await ctx.db.query("authSessions").collect();
    let deletedSessions = 0;

    for (const session of authSessions) {
      if (!userIds.has(session.userId)) {
        await ctx.db.delete(session._id);
        deletedSessions++;
      }
    }

    return {
      success: true,
      message: `Cleaned up ${deletedAccounts} orphaned auth accounts and ${deletedSessions} orphaned sessions`,
      deletedAccounts,
      deletedSessions,
    };
  },
});
