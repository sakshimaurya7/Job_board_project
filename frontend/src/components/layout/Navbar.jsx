import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Briefcase, Menu, X, ChevronRight, LogOut, User as UserIcon, LayoutDashboard, ClipboardList } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "../../hooks/useAuth";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Find Jobs", path: "/jobs" },
    { name: "Companies", path: "/companies" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Role-based portal link shown only when authenticated
  const getPortalLink = () => {
    if (!isAuthenticated || !user) return null;
    const role = (user.role || "").toLowerCase();
    if (role === "recruiter" || role === "admin") {
      return { name: "Recruiter Dashboard", path: "/recruiter/dashboard", icon: LayoutDashboard };
    }
    return { name: "My Applications", path: "/applications", icon: ClipboardList };
  };

  const portalLink = getPortalLink();

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 h-[72px] bg-surface border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-soft transition-transform group-hover:scale-105">
            <Briefcase className="w-5 h-5 fill-current" />
          </div>
          <span className="text-2xl font-black text-text tracking-tight">
            Job<span className="text-primary">Hub</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base font-semibold transition-colors duration-200 relative py-1 ${
                  active
                    ? "text-primary font-bold"
                    : "text-text-secondary hover:text-primary"
                }`}
              >
                {link.name}
                {active && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}

          {/* Portal link for authenticated users */}
          {portalLink && (() => {
            const active = isActive(portalLink.path);
            const PortalIcon = portalLink.icon;
            return (
              <Link
                key={portalLink.name}
                to={portalLink.path}
                className={`flex items-center gap-1.5 text-base font-semibold transition-colors duration-200 relative py-1 ${
                  active
                    ? "text-primary font-bold"
                    : "text-text-secondary hover:text-primary"
                }`}
              >
                <PortalIcon className="w-4 h-4" />
                {portalLink.name}
                {active && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            );
          })()}
        </nav>

        {/* Action Buttons (Login / Register or User Profile) */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-section border border-border px-3.5 py-1.5 rounded-xl text-sm font-semibold text-text">
                <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                  {user.fullname ? user.fullname.charAt(0).toUpperCase() : <UserIcon className="w-4 h-4" />}
                </div>
                <span>{user.fullname || "User"}</span>
                <span className="text-[10px] uppercase font-bold bg-primary text-white px-2 py-0.5 rounded-md ml-1">
                  {user.role === "recruiter" ? "Employer" : "Seeker"}
                </span>
              </div>
              {/* Quick Portal shortcut button */}
              {portalLink && (
                <Link to={portalLink.path}>
                  <Button
                    variant="secondary"
                    className="h-10 px-3.5 text-sm font-semibold gap-1.5"
                  >
                    {React.createElement(portalLink.icon, { className: "w-4 h-4" })}
                    {portalLink.name}
                  </Button>
                </Link>
              )}
              <Button
                variant="outline"
                onClick={handleLogout}
                className="h-10 px-3.5 text-sm font-semibold gap-1.5"
              >
                <LogOut className="w-4 h-4 text-text-secondary" />
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="secondary" className="h-11 px-5">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" className="h-11 px-6">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-border text-text hover:bg-section focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-text" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[72px] bg-surface border-b border-border shadow-xl z-40 p-6 space-y-4 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-xl font-semibold text-base transition-colors ${
                    active
                      ? "bg-section text-primary"
                      : "text-text hover:bg-section"
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-text-secondary" />
                </Link>
              );
            })}
          </nav>
          <div className="pt-4 border-t border-border flex flex-col space-y-3">
            {isAuthenticated && user ? (
              <div className="space-y-3">
                <div className="p-3 bg-section rounded-xl border border-border flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <UserIcon className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-text">{user.fullname}</span>
                  </div>
                  <span className="text-xs uppercase font-bold bg-primary text-white px-2 py-0.5 rounded-md">
                    {user.role === "recruiter" ? "Employer" : "Seeker"}
                  </span>
                </div>

                {/* Mobile portal quick link */}
                {portalLink && (
                  <Link
                    to={portalLink.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-xl font-semibold text-base transition-colors ${
                      isActive(portalLink.path)
                        ? "bg-primary/10 text-primary border border-primary/30"
                        : "text-text hover:bg-section border border-border"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {React.createElement(portalLink.icon, { className: "w-4 h-4 text-primary" })}
                      <span>{portalLink.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-secondary" />
                  </Link>
                )}

                <Button
                  variant="outline"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" className="w-full justify-center">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full justify-center">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
