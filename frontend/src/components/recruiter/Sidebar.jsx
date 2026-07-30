import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  Briefcase,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/recruiter/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Company",
      path: "/recruiter/company",
      icon: Building2,
    },
    {
      name: "Post Job",
      path: "/recruiter/jobs/create",
      icon: PlusCircle,
      highlight: true,
    },
    {
      name: "Manage Jobs",
      path: "/recruiter/jobs",
      icon: Briefcase,
    },
    {
      name: "Applicants",
      path: "/recruiter/applicants",
      icon: Users,
    },
    {
      name: "Analytics",
      path: "/recruiter/analytics",
      icon: BarChart3,
    },
    {
      name: "Settings",
      path: "/recruiter/settings",
      icon: Settings,
    },
  ];

  const isActive = (path) => {
    if (path === "/recruiter/dashboard" && location.pathname === "/recruiter/dashboard") {
      return true;
    }
    if (path !== "/recruiter/dashboard" && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-surface border-r border-border flex flex-col justify-between transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } ${
        mobileOpen
          ? "translate-x-0 w-64 shadow-2xl"
          : "-translate-x-full lg:translate-x-0"
      }`}
    >
      {/* Sidebar Header & Brand */}
      <div>
        <div className="h-[72px] px-4 flex items-center justify-between border-b border-border">
          <Link
            to="/recruiter/dashboard"
            className="flex items-center gap-3 overflow-hidden group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold shrink-0 shadow-sm transition-transform group-hover:scale-105">
              <Briefcase className="w-5 h-5 fill-current" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-xl font-black text-text tracking-tight leading-none">
                  Job<span className="text-primary">Hub</span>
                </span>
                <span className="text-[10px] font-bold text-primary tracking-wider uppercase mt-1">
                  Employer Portal
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg border border-border text-text-secondary hover:text-primary hover:bg-section transition-colors"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1.5">
          {menuItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileOpen && setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl font-semibold text-sm transition-all group relative ${
                  active
                    ? "bg-primary text-white shadow-soft"
                    : item.highlight
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "text-text-secondary hover:text-text hover:bg-section"
                }`}
                title={collapsed ? item.name : undefined}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${
                    active
                      ? "text-white"
                      : item.highlight
                      ? "text-primary"
                      : "text-text-secondary group-hover:text-primary"
                  }`}
                />

                {!collapsed && <span>{item.name}</span>}

                {/* Tooltip on Collapsed Sidebar */}
                {collapsed && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 bg-text text-white text-xs font-semibold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-md">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer: User Profile & Quick Actions */}
      <div className="p-3 border-t border-border space-y-2">
        {/* Recruiter Pro Banner (if expanded) */}
        {!collapsed && (
          <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-primary/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary shrink-0" />
              <span className="text-xs font-bold text-text">Pro ATS Active</span>
            </div>
          </div>
        )}

        {/* User Card */}
        <div
          className={`flex items-center justify-between p-2.5 rounded-xl bg-section border border-border ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
              {user?.fullname ? user.fullname.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
            </div>
            {!collapsed && (
              <div className="flex flex-col truncate">
                <span className="text-xs font-bold text-text truncate">
                  {user?.fullname || "Recruiter"}
                </span>
                <span className="text-[10px] text-text-secondary truncate">
                  {user?.email}
                </span>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-text-secondary hover:text-error hover:bg-error/10 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
