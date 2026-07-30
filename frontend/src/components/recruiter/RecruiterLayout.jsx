import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import RecruiterHeader from "./RecruiterHeader";

export function RecruiterLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Sidebar Navigation */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Backdrop overlay for mobile drawer */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Top Header */}
      <RecruiterHeader
        onMobileMenuToggle={() => setMobileOpen(!mobileOpen)}
        collapsed={collapsed}
      />

      {/* Main Page Content Outlet */}
      <main
        className={`transition-all duration-300 min-h-[calc(100vh-72px)] p-6 lg:p-8 ${
          collapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default RecruiterLayout;
