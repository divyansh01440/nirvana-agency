# 🔐 Admin Login Setup Guide

## Step 1: Create Your User Account

1. **Go to your site**: https://two-hotels-strive.vly.sh
2. **Navigate to** `/auth` (or click "Login" in the navbar)
3. **Enter your email** (the one you want to use as admin)
4. **Click "Send Code"**
5. **Check your email** for the verification code
6. **Enter the code** and complete signup

✅ You now have a regular user account.

## Step 2: Make Yourself Admin

Now you need to upgrade your account to admin role.

### Option A: Using Convex CLI (Recommended)

1. **Make sure Convex is running**:
   ```bash
   npx convex dev
   ```

2. **In a new terminal, run the admin setup command**:
   ```bash
   npx convex run adminSetup:makeAdmin '{"email":"your-email@example.com"}'
   ```

   Replace `your-email@example.com` with the email you used to sign up.

3. **You should see**:
   ```
   ✓ User your-email@example.com is now an admin!
   ```

✅ You are now an admin!

### Option B: Using Convex Dashboard

1. **Go to**: https://dashboard.convex.dev
2. **Select your project**
3. **Click on "Data"** in the sidebar
4. **Find the "users" table**
5. **Find your user record** (search by email)
6. **Click "Edit"** on your user
7. **Set the `role` field to**: `"admin"`
8. **Click "Save"**

✅ You are now an admin!

## Step 3: Access Admin Dashboard

1. **Go to**: https://two-hotels-strive.vly.sh/admin
2. **You should see the full admin dashboard** with:
   - 📊 Stats cards (total bookings, queries, projects, revenue)
   - 📅 Bookings management
   - 💬 Queries/messages
   - ⭐ Reviews
   - 🎨 Projects management
   - 📈 Analytics

## Verify Admin Access

To verify you're an admin:

```bash
npx convex run adminSetup:checkAdmin '{"email":"your-email@example.com"}'
```

You should see:
```json
{
  "exists": true,
  "isAdmin": true,
  "role": "admin",
  "email": "your-email@example.com"
}
```

## Admin Features

As an admin, you can:

### 📊 Dashboard Overview
- View total bookings, queries, projects
- See revenue metrics
- Track booking statuses

### 📅 Manage Bookings
- View all user bookings
- Update booking status:
  - Pending → Attended
  - Attended → Purchased Service
  - Mark as "Not Interested", "Not Attended", etc.
- View full booking details (contact, address, service)

### 💬 Manage Queries
- View contact form submissions
- Mark queries as resolved
- See user details

### ⭐ Manage Reviews
- Approve/reject user reviews
- Only users who "Purchased Service" can leave reviews
- Reviews appear on homepage after approval

### 🎨 Manage Projects
- Add new projects (name, thumbnail, live URL, description)
- Delete projects
- Projects appear on `/projects` page

### 📈 View Analytics
- See visitor and pageview trends
- Analytics are tracked automatically

## User Roles

The system has 3 roles:

1. **`admin`** - Full access to dashboard, can manage everything
2. **`user`** - Regular user, can book services, leave reviews
3. **`member`** - (Currently unused, reserved for future features)

## Security Notes

- ✅ Admin routes are protected by role checking
- ✅ Only admins can update booking statuses
- ✅ Only admins can approve reviews
- ✅ Only admins can add/delete projects
- ✅ Regular users cannot access `/admin` page

## Troubleshooting

### "Not authenticated" error
- Make sure you're logged in
- Clear browser cache and login again

### "Unauthorized" error when accessing admin
- Your role is not set to "admin"
- Run the `makeAdmin` command again with your email

### Can't find your user in Convex dashboard
- Make sure you completed the email verification
- Check the "users" table, not "authAccounts"

### Admin dashboard shows "You must be an admin"
- Your role field might be missing or incorrect
- Use Option B above to manually set role to "admin"

## Quick Reference

```bash
# Make user admin
npx convex run adminSetup:makeAdmin '{"email":"your@email.com"}'

# Check admin status
npx convex run adminSetup:checkAdmin '{"email":"your@email.com"}'

# Start Convex dev server
npx convex dev
```

---

## 🎉 That's It!

Once you've completed these steps, you'll have full admin access to manage:
- Bookings
- User queries
- Reviews
- Projects
- Analytics

**Admin Dashboard URL**: https://two-hotels-strive.vly.sh/admin

Happy managing! 🚀
