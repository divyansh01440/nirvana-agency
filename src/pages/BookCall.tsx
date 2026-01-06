import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function BookCall() {
  const navigate = useNavigate();
  const user = useQuery(api.users.currentUser);
  const createBooking = useMutation(api.bookings.create);

  const [formData, setFormData] = useState({
    companyName: "",
    email: user?.email || "",
    service: "",
    contactNumber: user?.phone || "",
    alternativeContactNumber: "",
    state: "",
    city: "",
    address: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen custom-cursor flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Please Login First</h2>
          <p className="text-muted-foreground mb-6">
            You need to be logged in to book a call
          </p>
          <Button onClick={() => navigate("/auth")}>Login</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.service) {
      toast.error("Please select a service");
      return;
    }

    setLoading(true);
    try {
      await createBooking({
        companyName: formData.companyName,
        email: formData.email,
        service: formData.service as any,
        contactNumber: formData.contactNumber,
        alternativeContactNumber: formData.alternativeContactNumber || undefined,
        state: formData.state,
        city: formData.city,
        address: formData.address,
        pincode: formData.pincode,
      });

      toast.success("Booking submitted successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to submit booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen custom-cursor">
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Book a <span className="text-primary">Free Call</span>
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Fill out the form below and we'll get back to you within 24 hours
          </p>

          <Card className="glass-strong p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    className="glass"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="glass"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="service">Service *</Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) =>
                    setFormData({ ...formData, service: value })
                  }
                >
                  <SelectTrigger className="glass">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="glass-strong">
                    <SelectItem value="Business Automation">
                      Business Automation
                    </SelectItem>
                    <SelectItem value="E-Commerce Website">
                      E-Commerce Website
                    </SelectItem>
                    <SelectItem value="SEO">SEO</SelectItem>
                    <SelectItem value="Creative Web Development">
                      Creative Web Development
                    </SelectItem>
                    <SelectItem value="Meta Ads Marketing">
                      Meta Ads Marketing
                    </SelectItem>
                    <SelectItem value="Custom Tech Solution">
                      Custom Tech Solution
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="contactNumber">Contact Number *</Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contactNumber: e.target.value,
                      })
                    }
                    className="glass"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="altContactNumber">
                    Alternative Contact Number
                  </Label>
                  <Input
                    id="altContactNumber"
                    type="tel"
                    value={formData.alternativeContactNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        alternativeContactNumber: e.target.value,
                      })
                    }
                    className="glass"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    className="glass"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="glass"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Shop / Office Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="glass"
                  required
                />
              </div>

              <div>
                <Label htmlFor="pincode">Pincode *</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) =>
                    setFormData({ ...formData, pincode: e.target.value })
                  }
                  className="glass"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-primary hover:bg-primary/90 glow-cyan text-black text-lg h-12"
              >
                {loading ? "Submitting..." : "Submit Booking"}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
