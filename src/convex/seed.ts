import { mutation } from "./_generated/server";

// Seed function to populate database with test data
export const seedDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    // Create projects
    const projects = [
      {
        name: "TechShop E-Commerce",
        thumbnailUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
        liveUrl: "https://techshop-demo.example.com",
        description: "Modern e-commerce platform with seamless checkout and inventory management",
      },
      {
        name: "FitTrack Health App",
        thumbnailUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800",
        liveUrl: "https://fittrack-demo.example.com",
        description: "Health and fitness tracking application with AI-powered insights",
      },
      {
        name: "LocalBiz SEO Platform",
        thumbnailUrl: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800",
        liveUrl: "https://localbiz-demo.example.com",
        description: "SEO optimization platform for small and medium businesses",
      },
      {
        name: "Creative Portfolio Pro",
        thumbnailUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800",
        liveUrl: "https://portfolio-demo.example.com",
        description: "Stunning portfolio website for creative professionals",
      },
      {
        name: "AutoFlow Business Suite",
        thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
        liveUrl: "https://autoflow-demo.example.com",
        description: "Complete business automation solution with workflow management",
      },
      {
        name: "SocialBoost Marketing",
        thumbnailUrl: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800",
        liveUrl: "https://socialboost-demo.example.com",
        description: "Meta ads management platform with analytics and reporting",
      },
    ];

    const createdProjects = [];
    for (const project of projects) {
      const id = await ctx.db.insert("projects", project);
      createdProjects.push(id);
    }

    // Add initial analytics data for the past 7 days
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];

      await ctx.db.insert("analytics", {
        date: dateStr,
        visitors: Math.floor(Math.random() * 100) + 50,
        pageViews: Math.floor(Math.random() * 200) + 100,
      });
    }

    return {
      message: "Database seeded successfully!",
      projectsCreated: createdProjects.length,
    };
  },
});
