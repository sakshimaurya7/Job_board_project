import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, Mail, Phone, MapPin, Send, Globe, Share2, MessageSquare, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Four Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Company */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-soft">
                <Briefcase className="w-5 h-5 fill-current" />
              </div>
              <span className="text-2xl font-black text-text tracking-tight">
                Job<span className="text-primary">Hub</span>
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed">
              Connecting ambitious professionals with extraordinary tech companies worldwide. Build your career with top employers today.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="#social" aria-label="Website" className="w-9 h-9 rounded-xl bg-section flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#social" aria-label="Community" className="w-9 h-9 rounded-xl bg-section flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors">
                <MessageSquare className="w-4 h-4" />
              </a>
              <a href="#social" aria-label="Share" className="w-9 h-9 rounded-xl bg-section flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#social" aria-label="External Portal" className="w-9 h-9 rounded-xl bg-section flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-base font-bold text-text mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-primary transition-colors">Find Jobs</Link>
              </li>
              <li>
                <Link to="/companies" className="hover:text-primary transition-colors">Companies</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-base font-bold text-text mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li>
                <a href="#help" className="hover:text-primary transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#blog" className="hover:text-primary transition-colors">Career Blog</a>
              </li>
              <li>
                <a href="#employers" className="hover:text-primary transition-colors">Employer Solutions</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div>
            <h4 className="text-base font-bold text-text mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-text-secondary mb-5">
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>support@jobhub.com</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+1 (800) 555-0199</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>San Francisco, CA 94107</span>
              </li>
            </ul>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center">
              <input
                type="email"
                placeholder="Your email address"
                className="h-10 px-3 text-xs rounded-l-xl border border-r-0 border-border bg-section text-text placeholder:text-text-placeholder focus:outline-none w-full"
              />
              <Button type="submit" variant="primary" className="h-10 px-3 rounded-l-none rounded-r-xl">
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between text-xs text-text-secondary gap-4">
          <p>© {new Date().getFullYear()} JobHub Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#privacy" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-primary transition-colors">Terms</a>
            <a href="#cookies" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
