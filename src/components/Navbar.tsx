import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { signOut } = useAuthActions();
  const navigate = useNavigate();
  const user = useQuery(api.users.currentUser);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    void signOut();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled ? "w-[95%] md:w-[85%]" : "w-[95%] md:w-[90%]"
      }`}
    >
      <div
        className={`glass-strong px-6 py-3 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "py-2" : ""
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="https://harmless-tapir-303.convex.cloud/api/storage/779a82d1-7f12-47d3-8366-6de246739ec6"
            alt="Nirvana Tech Solutions"
            className="h-12 w-auto transform hover:scale-110 transition-transform"
          />
          <span className="font-black text-xl hidden md:block uppercase">
            Nirvana Tech
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-sm font-black uppercase tracking-wider hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/projects"
            className="text-sm font-black uppercase tracking-wider hover:text-primary transition-colors"
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className="text-sm font-black uppercase tracking-wider hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          {user?.role === "admin" && (
            <Link to="/admin">
              <Button
                variant="outline"
                className="glass border-4 border-black font-black uppercase"
              >
                Dashboard
              </Button>
            </Link>
          )}
          {user ? (
            <>
              <Link to="/book-call">
                <Button className="bg-primary hover:bg-primary/90 text-black border-4 border-black font-black uppercase shadow-[4px_4px_0_0_#000]">
                  Book Call
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="font-black uppercase"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button
                variant="outline"
                className="glass border-4 border-black font-black uppercase"
              >
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-2 glass-strong p-6 space-y-4"
        >
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-primary transition-colors"
          >
            Our Projects
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-primary transition-colors"
          >
            Contact Us
          </Link>
          <div className="pt-4 border-t border-white/10 space-y-2">
            <div className="flex justify-center pb-2">
              <ThemeToggle />
            </div>
            {user?.role === "admin" && (
              <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full glass border-4 border-black font-black uppercase"
                >
                  Dashboard
                </Button>
              </Link>
            )}
            {user ? (
              <>
                <Link to="/book-call" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-black border-4 border-black font-black uppercase shadow-[4px_4px_0_0_#000]">
                    Book Call
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full font-black uppercase"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full glass border-4 border-black font-black uppercase"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
