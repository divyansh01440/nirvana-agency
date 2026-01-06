import { Link } from "react-router";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-strong border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="https://harmless-tapir-303.convex.cloud/api/storage/779a82d1-7f12-47d3-8366-6de246739ec6"
                alt="Nirvana Tech Solutions"
                className="h-10 w-auto"
              />
              <span className="font-black text-xl uppercase">Nirvana Tech</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Building scalable tech solutions for growing businesses. From local ventures to global presence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Our Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/book-call" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Book a Call
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Business Automation</li>
              <li>E-Commerce Websites</li>
              <li>SEO Optimization</li>
              <li>Creative Web Development</li>
              <li>Meta Ads Marketing</li>
              <li>Custom Tech Solutions</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <Mail size={16} className="text-primary mt-0.5" />
                <div className="flex flex-col space-y-1">
                  <a href="mailto:info@nirvanatech.com" className="hover:text-primary transition-colors">
                    info@nirvanatech.com
                  </a>
                  <a href="mailto:support@nirvanatech.com" className="hover:text-primary transition-colors">
                    support@nirvanatech.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <Phone size={16} className="text-primary mt-0.5" />
                <div className="flex flex-col space-y-1">
                  <span>+1 (555) 123-4567</span>
                  <span>+1 (555) 987-6543</span>
                </div>
              </li>
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <MapPin size={16} className="text-primary mt-0.5" />
                <div className="flex flex-col">
                  <span>123 Tech Street</span>
                  <span>Silicon Valley, CA 94000</span>
                  <span>United States</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Nirvana Tech Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
