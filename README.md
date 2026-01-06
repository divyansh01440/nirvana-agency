# 🌟 Nirvana Tech Solutions

A premium, dark-themed tech agency platform with glassmorphism design, complete booking system, and admin dashboard.

![Tech Stack](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Convex](https://img.shields.io/badge/Convex-F04E23?style=for-the-badge)

## ✨ Features

### 🎨 Design
- **Dark Glassmorphism Theme** - Modern, premium aesthetic
- **Custom Glass Cursor** - Unique interactive cursor effect
- **Smooth Animations** - Framer Motion powered transitions
- **Mobile Responsive** - Works perfectly on all devices
- **Animated Gradient Hero** - Eye-catching landing section

### 🔐 Authentication
- Email OTP authentication (Convex Auth)
- Role-based access control (admin/user)
- Protected routes

### 📄 Pages
1. **Home** (`/`) - Hero, services, reviews, about
2. **Projects** (`/projects`) - Portfolio showcase with 6 seeded projects
3. **Contact** (`/contact`) - Contact form for queries
4. **Book a Call** (`/book-call`) - Booking system (requires login)
5. **Admin Dashboard** (`/admin`) - Complete management system (admin only)

### 🛠️ Backend Features
- **Bookings Management** - Create, view, update status
- **Projects CRUD** - Add/delete portfolio items
- **Queries System** - Contact form submissions
- **Reviews & Ratings** - Only from users who purchased services
- **Analytics Tracking** - Automatic visitor and pageview tracking
- **Real-time Updates** - Convex reactive database

### 👨‍💼 Admin Capabilities
- View dashboard statistics
- Manage all bookings (update status)
- Review and resolve queries
- Approve/reject customer reviews
- Add/delete projects
- View analytics charts

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Setup Convex
```bash
npx convex dev
```

### 3. Seed Database (Optional)
```bash
npx convex run seed:seedDatabase
```

### 4. Start Development Server
```bash
pnpm dev
```

Visit: http://localhost:5173

## 🔐 Admin Setup - IMPORTANT!

### Step 1: Create Your Account
1. Go to `/auth`
2. Enter your email
3. Verify with code sent to email
4. Complete signup

### Step 2: Make Yourself Admin
```bash
npx convex run adminSetup:makeAdmin '{"email":"your@email.com"}'
```

### Step 3: Access Dashboard
Go to `/admin` - you now have full admin access!

**See `ADMIN_SETUP.md` for detailed instructions.**

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── CustomCursor.tsx
│   ├── Footer.tsx
│   └── Navbar.tsx
├── pages/              # Route pages
│   ├── AdminDashboard.tsx
│   ├── Auth.tsx
│   ├── BookCall.tsx
│   ├── Contact.tsx
│   ├── Home.tsx
│   ├── Projects.tsx
│   └── NotFound.tsx
├── convex/             # Backend functions
│   ├── schema.ts       # Database schema
│   ├── bookings.ts     # Booking operations
│   ├── projects.ts     # Projects CRUD
│   ├── queries.ts      # Contact queries
│   ├── reviews.ts      # Reviews system
│   ├── analytics.ts    # Analytics tracking
│   ├── seed.ts         # Database seeding
│   └── adminSetup.ts   # Admin utilities
├── index.css           # Global styles & theme
└── main.tsx            # App entry point
```

## 🎨 Theme Customization

Colors are defined in `src/index.css` using OKLCH color space:

```css
:root {
  --background: oklch(0.08 0 0);     /* Almost black */
  --foreground: oklch(0.98 0 0);     /* Pure white */
  --primary: oklch(0.75 0.15 195);   /* Neon cyan */
  --card: oklch(0.12 0 0 / 40%);     /* Glass effect */
}
```

## 🗄️ Database Schema

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `users` | User accounts | email, role, name |
| `bookings` | Service bookings | userId, service, status |
| `projects` | Portfolio items | name, thumbnailUrl, liveUrl |
| `queries` | Contact messages | name, email, message, status |
| `reviews` | Customer reviews | userId, bookingId, rating, approved |
| `analytics` | Traffic data | date, visitors, pageViews |

## 🔒 User Roles

- **`admin`** - Full dashboard access, can manage everything
- **`user`** - Can book services, leave reviews (if purchased)
- **`member`** - Reserved for future features

## 📊 Booking Status Flow

```
Pending → Attended → Purchased Service ✅
        → Not Attended ❌
        → Not Sure ❓
        → Not Interested ❌
```

Only users with "Purchased Service" status can leave reviews.

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router v7** - Client-side routing
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - Component library
- **Framer Motion** - Animations
- **Recharts** - Analytics charts
- **Sonner** - Toast notifications
- **Three.js** - 3D graphics

### Backend
- **Convex** - Real-time serverless database
- **Convex Auth** - Email OTP authentication

## 📜 Available Scripts

```bash
# Development
pnpm dev              # Start dev server
npx convex dev        # Start Convex backend

# Build
pnpm build            # Build for production
pnpm preview          # Preview production build

# Type checking
npx tsc -b --noEmit   # Check TypeScript errors

# Database
npx convex run seed:seedDatabase          # Seed test data
npx convex run adminSetup:makeAdmin       # Make user admin
npx convex run adminSetup:checkAdmin      # Check admin status
```

## 🔧 Configuration Files

- `.vlyrc.json` - Vly deployment config
- `vite.config.ts` - Vite build configuration
- `tailwind.config.ts` - Tailwind CSS config
- `tsconfig.json` - TypeScript config

## 📱 Responsive Design

Optimized for:
- **Desktop**: 1920px+
- **Laptop**: 1024px+
- **Tablet**: 768px+
- **Mobile**: 375px+

## 🎯 Key Features Detail

### Booking System
- Full form with company details, service selection
- Contact information (phone, alternative phone)
- Complete address (state, city, pincode)
- Status tracking by admin
- Email notifications (can be added)

### Admin Dashboard
- **Stats Cards**: Bookings, queries, projects, revenue
- **Bookings Table**: View all with filter by status
- **Queries Management**: Mark as resolved
- **Reviews Approval**: Approve/reject feedback
- **Projects CRUD**: Add with thumbnail, URL, description
- **Analytics Chart**: 30-day visitor trends

### Reviews System
- Only users who "Purchased Service" can review
- Admin approval required before public display
- 5-star rating with text feedback
- Displayed on homepage with user info

## 🚨 Troubleshooting

### Site not loading?
```bash
# Hard refresh browser
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)
```

### Can't access admin dashboard?
```bash
# Check admin status
npx convex run adminSetup:checkAdmin '{"email":"your@email.com"}'

# Make admin if needed
npx convex run adminSetup:makeAdmin '{"email":"your@email.com"}'
```

### TypeScript errors?
```bash
npx tsc -b --noEmit
```

### Need fresh data?
```bash
npx convex run seed:seedDatabase
```

## 📚 Documentation

- **Quick Start Guide**: `QUICK_START.md`
- **Admin Setup**: `ADMIN_SETUP.md`

## 🎉 Live Demo

**URL**: https://two-hotels-strive.vly.sh

### Test Data
The database includes:
- ✅ 6 portfolio projects
- ✅ 30 days of analytics
- ✅ Sample approved reviews (when seeded)

### Admin Access
Follow `ADMIN_SETUP.md` to create your admin account.

## 🔐 Security Features

- ✅ Email-based authentication (OTP)
- ✅ Role-based access control
- ✅ Protected admin routes
- ✅ Server-side validation
- ✅ Convex authentication integration

## 🌟 Design Highlights

- **Glassmorphism cards** with backdrop blur
- **Neon cyan accents** for modern tech feel
- **Custom cursor** with glass effect
- **Smooth page transitions** with Framer Motion
- **Animated hero gradient** for visual impact
- **Consistent spacing** and typography
- **Dark theme** optimized for readability

## 📈 Analytics

Automatic tracking of:
- Daily unique visitors
- Total page views
- 30-day trends displayed in admin dashboard

---

**Built with ❤️ for Nirvana Tech Solutions**

🚀 **Ready to manage your tech agency!**
