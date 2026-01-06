import { useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero3DWrapper } from "@/components/Hero3DWrapper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Zap,
  ShoppingCart,
  Search,
  Code,
  TrendingUp,
  Lightbulb,
  Target,
  Rocket,
  Shield,
  Star,
} from "lucide-react";

export default function Home() {
  const trackPageView = useMutation(api.analytics.trackPageView);
  const reviews = useQuery(api.reviews.getApproved);

  useEffect(() => {
    void trackPageView();
  }, [trackPageView]);

  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [whyUsRef, whyUsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [reviewsRef, reviewsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const services = [
    {
      icon: Zap,
      title: "Business Automation",
      description:
        "Streamline operations with intelligent automation solutions tailored for your business needs.",
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce Websites",
      description:
        "Build powerful online stores with seamless payment integration and user experience.",
    },
    {
      icon: Search,
      title: "SEO Optimization",
      description:
        "Boost your visibility with data-driven SEO strategies that drive organic traffic.",
    },
    {
      icon: Code,
      title: "Creative Web Development",
      description:
        "Craft stunning, responsive websites with modern design and cutting-edge technology.",
    },
    {
      icon: TrendingUp,
      title: "Meta Ads Marketing",
      description:
        "Reach your target audience with high-converting ad campaigns on Meta platforms.",
    },
    {
      icon: Lightbulb,
      title: "Custom Tech Solutions",
      description:
        "Get bespoke technology solutions designed to solve your unique business challenges.",
    },
  ];

  const whyChooseUs = [
    {
      icon: Target,
      title: "Startup-Friendly Pricing",
      description: "Affordable packages designed for growing businesses",
    },
    {
      icon: Rocket,
      title: "Scalable Architecture",
      description: "Build once, grow infinitely with our scalable solutions",
    },
    {
      icon: Shield,
      title: "Long-Term Support",
      description: "We're with you every step of your growth journey",
    },
    {
      icon: Star,
      title: "Modern UI & Performance",
      description: "Fast, beautiful, and optimized for user experience",
    },
  ];

  return (
    <div className="min-h-screen custom-cursor">
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24"
      >
        <div className="absolute inset-0 opacity-30">
          <Hero3DWrapper />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Building{" "}
              <span className="text-primary glow-cyan-strong">Scalable</span>
              <br />
              Tech Solutions
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Helping small ventures grow from local markets to global presence
              with cutting-edge technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book-call">
                <Button
                  size="lg"
                  className="rounded-full bg-primary hover:bg-primary/90 glow-cyan text-black text-lg px-8"
                >
                  Book a Call
                </Button>
              </Link>
              <Link to="/projects">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full glass border-primary/30 text-lg px-8"
                >
                  View Projects
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About Us Section */}
      <section
        ref={aboutRef}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={aboutInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Who We Are</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            <span className="font-semibold text-primary">
              Nirvana Tech Solutions
            </span>{" "}
            is a modern technology agency focused on helping small ventures
            scale from local markets to global presence. We combine innovative
            technology with strategic thinking to deliver solutions that drive
            real business growth.
          </p>
        </motion.div>
      </section>

      {/* Services Section */}
      <section
        ref={servicesRef}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={servicesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What We Do</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive tech solutions designed to transform your business
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="glass-card glass-strong p-6 h-full">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        ref={whyUsRef}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={whyUsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We're committed to your success with our proven approach
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={whyUsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="glass-card glass-strong p-6 text-center h-full">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto glow-cyan">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      {reviews && reviews.length > 0 && (
        <section
          ref={reviewsRef}
          className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={reviewsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our Clients Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 50 }}
                animate={reviewsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-card glass-strong p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      {review.userImage ? (
                        <img
                          src={review.userImage}
                          alt={review.userName}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="font-semibold">
                          {review.userName.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">{review.userName}</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < review.rating
                                ? "fill-primary text-primary"
                                : "text-muted"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.feedback}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="glass-strong rounded-3xl p-12 glow-cyan">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Scale Your Business?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book a free consultation call and let's discuss how we can help you
            achieve your business goals.
          </p>
          <Link to="/book-call">
            <Button
              size="lg"
              className="rounded-full bg-primary hover:bg-primary/90 text-black text-lg px-8"
            >
              Schedule Your Free Call
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
