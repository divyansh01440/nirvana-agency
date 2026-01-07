import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";

// Generate a simple reset token
function generateResetToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Request password reset - returns the hint
export const requestPasswordReset = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      throw new ConvexError("No account found with this email");
    }

    // Return the password hint if available
    return {
      hint: user.passwordHint || "No hint available",
      email: user.email,
    };
  },
});

// Generate reset token
export const generatePasswordResetToken = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      throw new ConvexError("No account found with this email");
    }

    const resetToken = generateResetToken();
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    await ctx.db.patch(user._id, {
      resetToken,
      resetTokenExpiry,
    });

    return {
      token: resetToken,
      hint: user.passwordHint || "No hint available",
    };
  },
});

// Verify reset token and hint
export const verifyResetToken = query({
  args: {
    token: v.string(),
    hint: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_reset_token", (q) => q.eq("resetToken", args.token))
      .first();

    if (!user) {
      throw new ConvexError("Invalid reset token");
    }

    if (!user.resetTokenExpiry || user.resetTokenExpiry < Date.now()) {
      throw new ConvexError("Reset token has expired");
    }

    // Verify hint matches
    if (user.passwordHint?.toLowerCase() !== args.hint.toLowerCase()) {
      throw new ConvexError("Incorrect password hint");
    }

    return { valid: true, email: user.email };
  },
});

// Get user by username or email
export const getUserByIdentifier = query({
  args: {
    identifier: v.string(), // can be username or email
  },
  handler: async (ctx, args) => {
    // Try to find by email first
    let user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.identifier))
      .first();

    // If not found, try username
    if (!user) {
      user = await ctx.db
        .query("users")
        .withIndex("by_username", (q) => q.eq("username", args.identifier))
        .first();
    }

    if (!user) {
      return null;
    }

    return {
      email: user.email,
      username: user.username,
      name: user.name,
    };
  },
});
