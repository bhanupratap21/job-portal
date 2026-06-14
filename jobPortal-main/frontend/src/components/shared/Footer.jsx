import { Facebook, Twitter, Linkedin, Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground border-t border-border py-8 mt-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">JobPortal</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Your trusted platform for finding top talent and the best jobs.
            Let's build your future together.
          </p>
          <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>contact@jobportal.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Indore, India</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="aboutus" className="hover:text-primary">
                About Us
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-primary">
                Careers
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-primary">
                Blog
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-primary">
                Press
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="/" className="hover:text-primary">
                Help Center
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-primary">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-primary">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-primary">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay in the loop</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get updates on the latest job postings and hiring trends.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <Input type="email" placeholder="Your email" className="flex-1" />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-7 border-t border-border pt-3 flex flex-col md:flex-row justify-between items-center gap-4 px-4 sm:px-6 lg:px-8">
        <p className="text-xs text-muted-foreground">
          © 2025 JobPortal. All rights reserved.
        </p>

        <p className="text-xs text-muted-foreground font-medium text-center md:text-sm">
          Made with ❤️ by{" "}
          <span className="text-[#6A38C2] font-semibold hover:text-[#5b30a6] cursor-pointer transition-colors duration-300">
            Bhanupratap Bhana
          </span>
        </p>

        <div className="flex space-x-5">
          <a
            href="https://facebook.com"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-blue-600 transform hover:scale-110 transition duration-200"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://x.com/bhanupr13956631"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-sky-500 transform hover:scale-110 transition duration-200"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/bhanupratap-bhana-31b17b173/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-blue-800 transform hover:scale-110 transition duration-200"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
