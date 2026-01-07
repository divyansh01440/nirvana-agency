import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { ROLES } from "./schema";

/**
 * Make an existing user an admin.
 * Run this function once to set up your admin account:
 * npx convex run adminSetup:makeAdmin '{"email":"your-email@example.com"}'
 */
export const makeAdmin = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // Find user by email
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      throw new Error(`No user found with email: ${args.email}`);
    }

    // Update user role to admin
    await ctx.db.patch(user._id, {
      role: ROLES.ADMIN,
    });

    return {
      success: true,
      message: `User ${args.email} is now an admin!`,
      userId: user._id,
    };
  },
});

/**
 * Check if a user is an admin by email
 */
export const checkAdmin = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      return { exists: false, isAdmin: false };
    }

    return {
      exists: true,
      isAdmin: user.role === ROLES.ADMIN,
      role: user.role,
      email: user.email,
      name: user.name,
    };
  },
});

/**
 * Delete a user account by email (use carefully!)
 * npx convex run adminSetup:deleteUser '{"email":"user@example.com"}'
 */
export const deleteUser = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      throw new Error(`No user found with email: ${args.email}`);
    }

    // Delete the user
    await ctx.db.delete(user._id);

    return {
      success: true,
      message: `User ${args.email} has been deleted`,
    };
  },
});

/**
 * Create admin account with predefined credentials
 * npx convex run adminSetup:createAdminAccount '{}'
 */
export const createAdminAccount = mutation({
  args: {},
  handler: async (ctx, args) => {
    const adminEmail = "nirvanatech07@gmail.com";

    // Check if admin already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", adminEmail))
      .first();

    if (existingUser) {
      return {
        success: false,
        message: `Admin account ${adminEmail} already exists. Please delete it first or login with existing credentials.`,
        alreadyExists: true,
      };
    }

    // Note: We cannot directly create a password-protected account from a mutation
    // The user must use the signup form to create the account with password
    return {
      success: false,
      message: "Please use the signup form at /auth to create the admin account with email: nirvanatech07@gmail.com and password: SalmanBhai..98",
      needsSignup: true,
    };
  },
});
