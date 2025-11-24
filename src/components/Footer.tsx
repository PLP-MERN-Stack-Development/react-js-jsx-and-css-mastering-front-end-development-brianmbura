import { Cpu, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary rounded-lg p-2">
                <Cpu className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">HatupoiTech Shop</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted source for quality tech equipment and gadgets. Shop smart with HatupoiTech.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Help Center</li>
              <li className="text-sm text-muted-foreground">Contact Us</li>
              <li className="text-sm text-muted-foreground">Privacy Policy</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-secondary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-secondary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-secondary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 DineSmart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
