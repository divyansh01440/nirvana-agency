# Nirvana Tech Solutions - Full Stack Agency Platform

A premium, full-stack website for a tech agency with dark glassmorphism UI, 3D elements, and comprehensive admin dashboard.

## Features Implemented

### Frontend
- ✅ **Dark Glassmorphism Theme** - Black & charcoal background with neon cyan accents
- ✅ **Custom Glass Cursor** - Interactive cursor with hover effects
- ✅ **Floating Glass Navbar** - Shrinks on scroll with mobile responsive menu
- ✅ **3D Hero Section** - Three.js animated sphere with particles
- ✅ **Scroll-based Animations** - Framer Motion animations throughout

### Pages
1. **Home** - Hero, About Us, Services, Why Choose Us, Reviews, CTA
2. **Projects** - Grid layout showcasing all projects
3. **Contact** - Contact form with business info
4. **Book a Call** - Multi-field booking form (requires login)
5. **Admin Dashboard** - Complete management system

### Admin Dashboard Features
- **Overview Stats** - Total traffic, bookings, pending calls, purchased services
- **Bookings Management** - View and update booking statuses
- **Queries Management** - Handle customer contact messages
- **Reviews Management** - Approve/hide customer reviews
- **Projects Management** - Add/delete projects (auto-appears on Projects page)

### Backend (Convex)
All backend functions are fully implemented with proper authentication and role-based access control:
- Bookings CRUD with status management
- Projects CRUD (admin only)
- Queries/Contact messages
- Reviews with approval system
- Analytics tracking
- User authentication with admin roles

## Database Schema

### Tables
- **users** - Extended with phone field for bookings
- **bookings** - Company info, service selection, contact details, address, status
- **projects** - Name, thumbnail, live URL, description
- **queries** - Contact form submissions
- **reviews** - Ratings and feedback (requires purchased service status)
- **analytics** - Daily traffic and page views

## Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Routing**: React Router v7
- **Styling**: Tailwind CSS + shadcn/ui components
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Animations**: Framer Motion
- **Backend/Database**: Convex (real-time, serverless)
- **Auth**: Convex Auth with OTP
- **Charts**: Recharts (for admin analytics)

## Getting Started

1. **Install dependencies** (already done):
   ```bash
   pnpm install
   ```

2. **Start development servers**:
   ```bash
   # Terminal 1 - Convex backend
   npx convex dev

   # Terminal 2 - Vite frontend
   pnpm dev
   ```

3. **Create an admin user**:
   - Sign up through the /auth page
   - Manually update the user role to "admin" in Convex dashboard
   - Go to your Convex dashboard → Data → users table
   - Edit your user record and set role: "admin"

4. **Access features**:
   - Home: `/`
   - Projects: `/projects`
   - Contact: `/contact`
   - Book a Call: `/book-call` (requires login)
   - Admin Dashboard: `/admin` (requires admin role)

## Test Data

The database has been seeded with:
- 6 sample projects with images from Unsplash
- 7 days of analytics data

## Key Features by Role

### Public Users
- View home page with services and reviews
- Browse projects portfolio
- Submit contact form
- View approved reviews

### Authenticated Users
- All public features
- Book consultation calls
- View their booking history
- Submit reviews (only for purchased services)

### Admin Users
- All user features
- View analytics dashboard
- Manage all bookings and update statuses
- View and respond to queries
- Approve/hide reviews
- Add/delete projects
- View comprehensive statistics

## UI/UX Highlights

1. **Glassmorphism Effects**:
   - Frosted glass cards with backdrop blur
   - Subtle borders and transparency
   - Smooth hover transitions with glow effects

2. **3D Interactive Hero**:
   - Rotating distorted sphere
   - Floating particle system
   - Smooth animations

3. **Responsive Design**:
   - Mobile-first approach
   - Hamburger menu for mobile
   - Grid layouts adapt to screen size

4. **Custom Cursor**:
   - Dot + outline design
   - Scales on hover over interactive elements
   - Neon cyan color matching theme

5. **Animations**:
   - Fade-in on scroll
   - Staggered animations for cards
   - Smooth page transitions

## Color Scheme

- **Background**: `oklch(0.08 0 0)` - Almost black
- **Primary/Accent**: `oklch(0.75 0.15 195)` - Neon cyan
- **Glass**: Semi-transparent charcoal with backdrop blur
- **Text**: White/light gray for readability

## Services Offered

1. Business Automation
2. E-Commerce Websites
3. SEO Optimization
4. Creative Web Development
5. Meta Ads Marketing
6. Custom Tech Solutions

## Booking Flow

1. User creates account or logs in
2. Fills out comprehensive booking form:
   - Company details
   - Service selection
   - Contact information (primary + alternate)
   - Complete address (state, city, address, pincode)
3. Submission creates booking with "Pending" status
4. Admin reviews and updates status through dashboard
5. If status changed to "Purchased Service", user can leave review

## Admin Workflow

1. **Monitor Dashboard** - Check overview stats
2. **Review Bookings** - Update statuses as calls are completed
3. **Handle Queries** - Mark as resolved after response
4. **Manage Reviews** - Approve quality reviews for public display
5. **Update Portfolio** - Add new projects as completed

## Future Enhancements (Optional)

- WhatsApp integration for booking notifications
- Email notifications on booking/query submission
- Advanced analytics charts with date range filtering
- File upload for project thumbnails
- Booking calendar view
- Review reply system
- Multi-language support

## Notes

- All animations use Framer Motion for smooth performance
- Custom cursor is CSS-based for lightweight implementation
- Glassmorphism effects use backdrop-filter for modern browsers
- Three.js animations are optimized to maintain 60fps
- All forms use proper validation and error handling
- Toast notifications for all user actions

---

**Built by vly AI** - A complete, production-ready platform ready for deployment!
