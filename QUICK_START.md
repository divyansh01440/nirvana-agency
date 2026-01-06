# ⚡ Quick Start - Nirvana Tech Solutions

## 🎯 Your Site is Ready!

**Live URL**: https://two-hotels-strive.vly.sh

## 🔐 Login as Admin (3 Steps)

### Step 1: Create Account
1. Go to https://two-hotels-strive.vly.sh/auth
2. Enter your email
3. Get verification code from email
4. Complete signup

### Step 2: Make Yourself Admin
```bash
npx convex dev
# Then in another terminal:
npx convex run adminSetup:makeAdmin '{"email":"YOUR_EMAIL_HERE"}'
```

### Step 3: Access Dashboard
Go to: https://two-hotels-strive.vly.sh/admin

## 📄 Pages Available

| Page | URL | Description |
|------|-----|-------------|
| **Home** | `/` | Hero, services, reviews |
| **Auth** | `/auth` | Login/signup |
| **Projects** | `/projects` | Portfolio showcase |
| **Contact** | `/contact` | Contact form |
| **Book Call** | `/book-call` | Booking system (requires login) |
| **Admin** | `/admin` | Dashboard (admin only) |

## 🎨 What You Have

### Frontend
- ✅ Dark/Light theme switcher
- ✅ Dark glassmorphism theme (default)
- ✅ Light glassmorphism theme
- ✅ Custom glass cursor (adapts to theme)
- ✅ Animated gradient hero
- ✅ Mobile responsive
- ✅ Smooth animations (Framer Motion)

### Backend (Convex)
- ✅ User authentication (email OTP)
- ✅ Bookings management
- ✅ Projects CRUD
- ✅ Contact queries
- ✅ Reviews system
- ✅ Analytics tracking
- ✅ Role-based access (admin/user)

### Admin Features
- ✅ View all bookings and update status
- ✅ Manage contact queries
- ✅ Approve/reject reviews
- ✅ Add/delete projects
- ✅ View analytics and stats

## 🗄️ Database Tables

Already seeded with test data:

| Table | Records | Purpose |
|-------|---------|---------|
| `projects` | 6 | Portfolio items |
| `reviews` | 3 | Customer testimonials |
| `analytics` | 30 days | Traffic data |

## 🚀 Development Commands

```bash
# Start Convex backend
npx convex dev

# Run development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type checking
npx tsc -b --noEmit
```

## 🔧 Admin Commands

```bash
# Make user admin
npx convex run adminSetup:makeAdmin '{"email":"user@example.com"}'

# Check admin status
npx convex run adminSetup:checkAdmin '{"email":"user@example.com"}'

# Add test data (if needed)
npx convex run seed:seedAll
```

## 📊 Admin Dashboard Features

When logged in as admin at `/admin`:

### 1. Overview Stats
- Total bookings
- Pending queries
- Total projects
- Revenue estimates

### 2. Bookings Management
- View all bookings with details
- Update status: Pending → Attended → Purchased Service
- Track contact info and addresses

### 3. Queries Management
- See contact form submissions
- Mark as resolved
- View user emails

### 4. Reviews Management
- Approve customer reviews
- Only users with "Purchased Service" status can review
- Approved reviews show on homepage

### 5. Projects Management
- Add new projects (with thumbnail, URL, description)
- Delete projects
- Projects display on `/projects` page

### 6. Analytics
- 30-day visitor trends
- Page view tracking
- Automatic analytics collection

## 🎨 Theme Customization

Colors are defined in `src/index.css`:

```css
--background: oklch(0.08 0 0);  /* Almost black */
--primary: oklch(0.75 0.15 195); /* Neon cyan */
--card: oklch(0.12 0 0 / 40%);  /* Glass effect */
```

## 🔒 Security Features

- ✅ Email-based authentication
- ✅ Role-based access control
- ✅ Admin-only routes protected
- ✅ Server-side validation
- ✅ Convex authentication

## 📱 Mobile Responsive

All pages work perfectly on:
- Desktop (1920px+)
- Laptop (1024px+)
- Tablet (768px+)
- Mobile (375px+)

## 🐛 Troubleshooting

### Site not loading?
1. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear browser cache
3. Try incognito mode

### Can't access admin?
```bash
npx convex run adminSetup:checkAdmin '{"email":"your@email.com"}'
```

### Need to reseed data?
```bash
npx convex run seed:seedAll
```

## 📚 Documentation

- **Admin Setup**: See `ADMIN_SETUP.md`
- **Error Fix**: See `ERROR_FIXED.md`
- **Deployment**: See `ACTION_REQUIRED.md`

## 🎉 You're All Set!

Your Nirvana Tech Solutions platform is production-ready with:
- Beautiful dark glassmorphism UI
- Complete booking and admin system
- Real-time database
- Mobile responsive design
- Test data already seeded

**Start managing your tech agency now!** 🚀
