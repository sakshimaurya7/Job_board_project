import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Bell,
  Search,
  PlusCircle,
  User,
  LogOut,
  Building2,
  ExternalLink,
  ChevronDown,
  Settings,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/button";

export function RecruiterHeader({ onMobileMenuToggle, collapsed }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recruiter/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header
      className={`sticky top-0 z-30 h-[72px] bg-surface/95 backdrop-blur-md border-b border-border transition-all duration-300 ${
        collapsed ? "lg:ml-20" : "lg:ml-64"
      }`}
    >
      <div className="h-full px-6 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Global Search */}
        <div className="flex items-center gap-4 flex-1 max-w-lg">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-xl border border-border text-text hover:bg-section focus:outline-none"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-5 h-5 text-text" />
          </button>

          {/* Quick Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative w-full hidden sm:block">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs, candidates, or company info..."
              className="w-full h-10 pl-10 pr-4 bg-section rounded-xl border border-border text-xs font-medium text-text placeholder:text-text-secondary focus:outline-none focus:border-primary transition-all"
            />
          </form>
        </div>

        {/* Right: Quick Actions, View Public Site, Notifications & Profile Avatar */}
        <div className="flex items-center gap-3">
          {/* Post Job Quick Button */}
          <Link to="/recruiter/jobs/create" className="hidden sm:block">
            <Button
              variant="primary"
              className="h-10 px-4 text-xs font-bold rounded-xl gap-2 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              Post Job
            </Button>
          </Link>

          {/* View Public Site Link */}
          <Link
            to="/"
            target="_blank"
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-text-secondary hover:text-primary hover:bg-section transition-colors border border-border/60"
            title="Preview public jobseeker platform"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {/* Notification Icon */}
          <div className="relative">
            <button
              onClick={() => navigate("/recruiter/applicants")}
              className="p-2.5 rounded-xl border border-border text-text-secondary hover:text-primary hover:bg-section transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-pulse" />
            </button>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center gap-2.5 p-1.5 rounded-xl border border-border hover:bg-section transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                {user?.fullname ? user.fullname.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
              </div>
              <span className="hidden sm:block text-xs font-bold text-text max-w-[100px] truncate">
                {user?.fullname || "Recruiter"}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-text-secondary hidden sm:block" />
            </button>

            {/* Dropdown Menu */}
            {profileMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-surface rounded-2xl border border-border shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                onClick={() => setProfileMenuOpen(false)}
              >
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-xs font-bold text-text truncate">{user?.fullname}</p>
                  <p className="text-[10px] text-text-secondary truncate">{user?.email}</p>
                </div>

                <div className="py-1">
                  <Link
                    to="/recruiter/company"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-text-secondary hover:text-primary hover:bg-section transition-colors"
                  >
                    <Building2 className="w-4 h-4 text-primary" />
                    My Company
                  </Link>

                  <Link
                    to="/recruiter/settings"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-text-secondary hover:text-primary hover:bg-section transition-colors"
                  >
                    <Settings className="w-4 h-4 text-primary" />
                    Settings
                  </Link>

                  <Link
                    to="/"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-text-secondary hover:text-primary hover:bg-section transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-primary" />
                    Switch to Candidate View
                  </Link>
                </div>

                <div className="border-t border-border pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-error hover:bg-error/10 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default RecruiterHeader;
