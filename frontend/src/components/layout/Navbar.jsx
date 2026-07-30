import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Briefcase,
  Menu,
  X,
  Bell,
  LogOut,
  User as UserIcon,
  LayoutDashboard,
  ClipboardList,
  Bookmark,
  Building2,
  Users,
  BarChart3,
  Settings,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useAuth } from "../../hooks/useAuth";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function normalizeRole(role = "") {
  return role.toLowerCase().replace(/[\s_]/g, "");
}

function getInitials(name = "") {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .substring(0, 2) || "U";
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation link definitions
// ─────────────────────────────────────────────────────────────────────────────
const GUEST_LINKS = [
  { name: "Home", path: "/" },
  { name: "Find Jobs", path: "/jobs" },
  { name: "Companies", path: "/companies" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const SEEKER_LINKS = [
  { name: "Home", path: "/" },
  { name: "Find Jobs", path: "/jobs" },
  { name: "Companies", path: "/companies" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const RECRUITER_LINKS = [
  { name: "Companies", path: "/companies" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

// ─────────────────────────────────────────────────────────────────────────────
// NavLink — single desktop navigation link with active indicator
// ─────────────────────────────────────────────────────────────────────────────
const NavLink = React.memo(({ name, path, isActive, onClick }) => (
  <Link
    to={path}
    onClick={onClick}
    className={`relative py-1 text-sm font-semibold transition-colors duration-200 ${
      isActive ? "text-primary" : "text-text-secondary hover:text-primary"
    }`}
  >
    {name}
    {isActive && (
      <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-primary" />
    )}
  </Link>
));
NavLink.displayName = "NavLink";

// ─────────────────────────────────────────────────────────────────────────────
// NotificationBell — future-ready bell icon
// ─────────────────────────────────────────────────────────────────────────────
const NotificationBell = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <button
        aria-label="Notifications (coming soon)"
        disabled
        className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary transition-colors duration-200 hover:border-primary/30 hover:bg-section hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Bell className="h-4 w-4" />
      </button>
      {hovered && (
        <div className="pointer-events-none absolute right-0 top-full mt-2 z-50 w-max rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-secondary shadow-lg">
          Notifications coming soon
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ProfileDropdown — role-aware dropdown
// ─────────────────────────────────────────────────────────────────────────────
const ProfileDropdown = React.memo(({ user, isRecruiter, hasCompany, onLogout }) => {
  const navigate = useNavigate();
  const role = isRecruiter ? "recruiter" : "jobseeker";

  const roleBadgeLabel = isRecruiter ? "Recruiter" : "Job Seeker";
  const roleBadgeClass = isRecruiter
    ? "bg-blue-100 text-blue-700"
    : "bg-orange-100 text-primary";

  // ── Dropdown items by role ──
  const menuItems = useMemo(() => {
    if (isRecruiter && !hasCompany) {
      return [
        { label: "Complete Company Setup", icon: AlertCircle, path: "/company/setup" },
      ];
    }
    if (isRecruiter) {
      return [
        { label: "Recruiter Dashboard", icon: LayoutDashboard, path: "/recruiter/dashboard" },
        { label: "My Company", icon: Building2, path: "/recruiter/company" },
        { label: "Manage Jobs", icon: Briefcase, path: "/recruiter/jobs" },
        { label: "Applicants", icon: Users, path: "/recruiter/applicants" },
        { label: "Analytics", icon: BarChart3, path: "/recruiter/analytics" },
        { label: "Profile Settings", icon: Settings, path: "/recruiter/settings" },
      ];
    }
    // Job seeker
    return [
      { label: "My Applications", icon: ClipboardList, path: "/applications" },
      { label: "Saved Jobs", icon: Bookmark, disabled: true, comingSoon: true },
      { label: "Profile Settings", icon: Settings, path: "/profile" },
    ];
  }, [isRecruiter, hasCompany]);

  const initials = getInitials(user.fullname);
  const profileSrc = user.profile?.profilePhoto || user.profilePhoto || null;

  return (
    <DropdownMenu>
      {/* ── Trigger: Avatar button ── */}
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Open profile menu"
          className="group flex h-9 w-9 items-center justify-center rounded-xl border-2 border-border bg-section transition-all duration-200 hover:border-primary/50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {profileSrc ? (
            <img
              src={profileSrc}
              alt={user.fullname}
              className="h-full w-full rounded-[10px] object-cover"
            />
          ) : (
            <span className="text-xs font-bold text-primary">{initials}</span>
          )}
        </button>
      </DropdownMenuTrigger>

      {/* ── Content ── */}
      <DropdownMenuContent className="w-64 overflow-hidden py-0" align="end" sideOffset={10}>
        {/* User info header */}
        <div className="flex items-center gap-3 bg-section/60 px-4 py-4 border-b border-border">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface font-bold text-primary shadow-sm text-sm">
            {profileSrc ? (
              <img src={profileSrc} alt={user.fullname} className="h-full w-full rounded-[10px] object-cover" />
            ) : (
              initials
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-text">{user.fullname || "User"}</p>
            <p className="truncate text-xs text-text-secondary">{user.email || ""}</p>
            <span
              className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${roleBadgeClass}`}
            >
              {roleBadgeLabel}
            </span>
          </div>
        </div>

        {/* Menu items */}
        <div className="py-1.5">
          {menuItems.map((item) => (
            <div key={item.label} className="relative">
              <DropdownMenuItem
                icon={item.icon}
                disabled={item.disabled}
                onClick={item.path ? () => navigate(item.path) : undefined}
                showChevron={!item.disabled}
              >
                <span className="flex items-center gap-2">
                  {item.label}
                  {item.comingSoon && (
                    <span className="rounded-full bg-border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-text-secondary">
                      Soon
                    </span>
                  )}
                </span>
              </DropdownMenuItem>
            </div>
          ))}
        </div>

        {/* Logout */}
        <DropdownMenuSeparator className="my-0" />
        <div className="py-1.5">
          <DropdownMenuItem
            icon={LogOut}
            showChevron={false}
            destructive
            onClick={onLogout}
          >
            Logout
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
ProfileDropdown.displayName = "ProfileDropdown";

// ─────────────────────────────────────────────────────────────────────────────
// MobileDrawer — role-aware slide-down mobile navigation
// ─────────────────────────────────────────────────────────────────────────────
const MobileDrawer = React.memo(({ open, onClose, user, isAuthenticated, isRecruiter, hasCompany, isActive, onLogout }) => {
  if (!open) return null;

  const seekerDrawerLinks = [
    { name: "Home", path: "/" },
    { name: "Find Jobs", path: "/jobs" },
    { name: "Companies", path: "/companies" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const seekerAccountLinks = [
    { name: "My Applications", path: "/applications", icon: ClipboardList },
    { name: "Saved Jobs", disabled: true, icon: Bookmark, comingSoon: true },
    { name: "Profile Settings", path: "/profile", icon: Settings },
  ];

  const recruiterAccountLinks = hasCompany
    ? [
        { name: "Dashboard", path: "/recruiter/dashboard", icon: LayoutDashboard },
        { name: "My Company", path: "/recruiter/company", icon: Building2 },
        { name: "Manage Jobs", path: "/recruiter/jobs", icon: Briefcase },
        { name: "Applicants", path: "/recruiter/applicants", icon: Users },
        { name: "Analytics", path: "/recruiter/analytics", icon: BarChart3 },
        { name: "Profile Settings", path: "/recruiter/settings", icon: Settings },
      ]
    : [{ name: "Company Setup", path: "/company/setup", icon: AlertCircle }];

  return (
    <div
      className="md:hidden fixed inset-x-0 top-[68px] z-40 bg-surface border-b border-border shadow-2xl animate-in slide-in-from-top duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div className="max-h-[calc(100vh-68px)] overflow-y-auto">
        {/* Guest state */}
        {!isAuthenticated && (
          <div className="p-4 space-y-1">
            {[
              { name: "Home", path: "/" },
              { name: "Find Jobs", path: "/jobs" },
              { name: "Companies", path: "/companies" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive(link.path) ? "bg-primary/10 text-primary" : "text-text hover:bg-section"
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="h-4 w-4 text-text-secondary" />
              </Link>
            ))}
            <div className="pt-3 border-t border-border mt-3 space-y-2">
              <Link to="/login" onClick={onClose}>
                <Button variant="secondary" className="w-full justify-center h-11 text-sm">
                  Login
                </Button>
              </Link>
              <Link to="/register" onClick={onClose}>
                <Button variant="primary" className="w-full justify-center h-11 text-sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Job seeker state */}
        {isAuthenticated && !isRecruiter && (
          <div className="p-4 space-y-1">
            {/* User info */}
            <div className="flex items-center gap-3 rounded-xl bg-section border border-border px-4 py-3 mb-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-bold text-primary text-sm">
                {getInitials(user?.fullname)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-text">{user?.fullname}</p>
                <span className="text-[10px] font-bold uppercase tracking-wide text-primary bg-orange-100 px-1.5 py-0.5 rounded-full">
                  Job Seeker
                </span>
              </div>
            </div>

            {/* Nav links */}
            {seekerDrawerLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive(link.path) ? "bg-primary/10 text-primary" : "text-text hover:bg-section"
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="h-4 w-4 text-text-secondary" />
              </Link>
            ))}

            {/* Account links */}
            <div className="pt-3 border-t border-border mt-2 space-y-1">
              {seekerAccountLinks.map((link) =>
                link.disabled ? (
                  <div
                    key={link.name}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 opacity-40 cursor-not-allowed"
                  >
                    <link.icon className="h-4 w-4 text-text-secondary" />
                    <span className="text-sm font-semibold text-text">{link.name}</span>
                    <span className="ml-auto rounded-full bg-border px-1.5 py-0.5 text-[9px] font-bold uppercase text-text-secondary">
                      Soon
                    </span>
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors text-text hover:bg-section hover:text-primary"
                  >
                    <link.icon className="h-4 w-4 text-text-secondary" />
                    <span>{link.name}</span>
                    <ChevronRight className="ml-auto h-4 w-4 text-text-secondary" />
                  </Link>
                )
              )}
            </div>

            {/* Logout */}
            <div className="pt-3 border-t border-border mt-2">
              <button
                onClick={() => { onLogout(); onClose(); }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-error transition-colors hover:bg-error/5"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Recruiter state */}
        {isAuthenticated && isRecruiter && (
          <div className="p-4 space-y-1">
            {/* User info */}
            <div className="flex items-center gap-3 rounded-xl bg-section border border-border px-4 py-3 mb-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700 text-sm">
                {getInitials(user?.fullname)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-text">{user?.fullname}</p>
                <span className="text-[10px] font-bold uppercase tracking-wide text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded-full">
                  Recruiter
                </span>
              </div>
            </div>

            {/* Account / dashboard links */}
            {recruiterAccountLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive(link.path) ? "bg-primary/10 text-primary" : "text-text hover:bg-section hover:text-primary"
                }`}
              >
                <link.icon className="h-4 w-4 text-text-secondary" />
                <span>{link.name}</span>
                <ChevronRight className="ml-auto h-4 w-4 text-text-secondary" />
              </Link>
            ))}

            {/* Logout */}
            <div className="pt-3 border-t border-border mt-2">
              <button
                onClick={() => { onLogout(); onClose(); }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-error transition-colors hover:bg-error/5"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
MobileDrawer.displayName = "MobileDrawer";

// ─────────────────────────────────────────────────────────────────────────────
// Navbar (main export)
// ─────────────────────────────────────────────────────────────────────────────
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  // ── Role detection (normalized) ──
  const role = normalizeRole(user?.role);
  const isRecruiter = role === "recruiter" || role === "admin" || role === "employer";
  const isJobSeeker = !isRecruiter && isAuthenticated;
  const hasCompany = Boolean(user?.profile?.company);

  // ── Active link check ──
  const isActive = useCallback(
    (path) => {
      if (path === "/" && location.pathname === "/") return true;
      if (path !== "/" && location.pathname.startsWith(path)) return true;
      return false;
    },
    [location.pathname]
  );

  // ── Desktop nav links by role/state ──
  const navLinks = useMemo(() => {
    if (!isAuthenticated) return GUEST_LINKS;
    if (isRecruiter && !hasCompany) return []; // company setup mode — no center links
    if (isRecruiter) return RECRUITER_LINKS;
    return SEEKER_LINKS;
  }, [isAuthenticated, isRecruiter, hasCompany]);

  // ── Logout handler ──
  const handleLogout = useCallback(async () => {
    await logout();
    navigate("/login");
  }, [logout, navigate]);

  // ── Close mobile menu on route change ──
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // ── Recruiter company setup mode ──
  const isCompanySetupMode = isRecruiter && !hasCompany;

  return (
    <>
      <header className="sticky top-0 z-50 h-[68px] border-b border-border bg-surface/95 backdrop-blur-md shadow-sm transition-all duration-300">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">

          {/* ── LEFT: Logo + Mobile Hamburger ── */}
          <div className="flex items-center gap-3">
            {/* Hamburger (mobile only) */}
            <button
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-border text-text transition-colors hover:bg-section focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-5 w-5 text-primary" />
              ) : (
                <Menu className="h-5 w-5 text-text" />
              )}
            </button>

            {/* Logo */}
            <Link to="/" className="group flex items-center space-x-2.5" aria-label="JobHub Home">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
                <Briefcase className="h-4.5 w-4.5" />
              </div>
              <span className="hidden sm:inline text-xl font-black tracking-tight text-text">
                Job<span className="text-primary">Hub</span>
              </span>
            </Link>
          </div>

          {/* ── CENTER: Desktop Nav Links ── */}
          <nav
            className="hidden md:flex items-center space-x-7"
            aria-label="Main navigation"
          >
            {/* Company Setup mode — no center links, show a banner-style CTA */}
            {isCompanySetupMode && (
              <Link
                to="/company/setup"
                className="flex items-center gap-2 rounded-xl border border-warning/40 bg-warning/10 px-4 py-2 text-sm font-semibold text-warning transition-colors hover:bg-warning/20"
              >
                <AlertCircle className="h-4 w-4" />
                Complete Company Setup
              </Link>
            )}

            {/* Normal nav links */}
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                name={link.name}
                path={link.path}
                isActive={isActive(link.path)}
              />
            ))}
          </nav>

          {/* ── RIGHT: Actions ── */}
          <div className="flex items-center gap-2">
            {isAuthenticated && user ? (
              <>
                {/* Notification bell */}
                <NotificationBell />

                {/* Recruiter dashboard shortcut (company complete only) */}
                {isRecruiter && hasCompany && (
                  <Link to="/recruiter/dashboard" className="hidden md:block">
                    <Button
                      variant="secondary"
                      className="h-9 px-4 text-sm font-semibold gap-1.5 rounded-xl"
                    >
                      <LayoutDashboard className="h-3.5 w-3.5" />
                      Dashboard
                    </Button>
                  </Link>
                )}

                {/* Profile dropdown */}
                <ProfileDropdown
                  user={user}
                  isRecruiter={isRecruiter}
                  hasCompany={hasCompany}
                  onLogout={handleLogout}
                />
              </>
            ) : (
              /* Guest actions */
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login">
                  <Button variant="secondary" className="h-9 px-5 text-sm font-semibold rounded-xl">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" className="h-9 px-5 text-sm font-semibold rounded-xl">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile: show bell + avatar if authenticated */}
            {isAuthenticated && user && (
              <div className="md:hidden flex items-center gap-2">
                <NotificationBell />
              </div>
            )}

            {/* Mobile: Login/Register buttons for guests */}
            {!isAuthenticated && (
              <div className="md:hidden flex items-center gap-2">
                <Link to="/login">
                  <Button variant="secondary" className="h-8 px-3 text-xs font-semibold rounded-lg">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        user={user}
        isAuthenticated={isAuthenticated}
        isRecruiter={isRecruiter}
        hasCompany={hasCompany}
        isActive={isActive}
        onLogout={handleLogout}
      />
    </>
  );
}
