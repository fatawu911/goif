import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">GOIF</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Solving social problems that confront our communities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/projects", label: "Projects" },
                { to: "/events", label: "Events" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0 text-secondary" />
                <span className="text-primary-foreground/80">+233 54 173 3250</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0 text-secondary" />
                <a
                  href="mailto:globalopeninitiative@gmail.com"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  globalopeninitiative@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Linkedin, href: "#" },
              ].map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={`Social media link ${index + 1}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} GOIF. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
