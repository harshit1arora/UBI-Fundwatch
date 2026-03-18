import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ArrowLeftRight,
  ShieldAlert,
  FileSearch,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  HelpCircle,
  LogOut,
  Bot,
  Sparkles,
  Database
} from "lucide-react";

interface NavItem {
  icon: any;
  label: string;
  path: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: ArrowLeftRight, label: "Transactions", path: "/fund-flow" },
  { icon: ShieldAlert, label: "Alerts", path: "/alerts" },
  { icon: FileSearch, label: "Investigation", path: "/investigation" },
  { icon: Database, label: "Forensics Center", path: "/forensics" },
  { icon: Sparkles, label: "Intel Briefing", path: "/intel/briefing", badge: "NEW" },
  { icon: FileText, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-full bg-sidebar z-30 flex flex-col border-r border-sidebar-border"
    >
      {/* Logo Area */}
      <div className="h-24 flex items-center gap-4 px-6 shrink-0 border-b border-sidebar-border bg-black/10">
        <div className="w-12 h-12 shrink-0 bg-white p-2 rounded-[1rem] flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.4)] overflow-hidden transition-transform duration-500 hover:scale-105">
          <img src="/fundwatch-logo.png" alt="FundWatch Logo" className="w-full h-full object-cover rounded-lg" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <div className="flex flex-col">
                <span className="text-white font-black text-xl tracking-tight leading-none group-hover:text-primary transition-colors">
                  UBI <span className="text-white">FundWatch</span>
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-hidden">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center gap-4 px-4 py-3.5 rounded-[1.25rem] transition-all duration-300 relative ${
                isActive
                  ? "bg-white/10 text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] border border-white/10"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 bg-primary/10 blur-xl rounded-[1.25rem] -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 duration-300 ${isActive ? 'text-white' : ''}`} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {(item.label === "Alerts" || item.badge) && (
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        item.badge === "NEW" ? "bg-primary text-white" : "bg-destructive text-destructive-foreground"
                      }`}
                    >
                      {item.badge || "12"}
                    </motion.span>
                  )}
                </AnimatePresence>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-white/60 hover:text-white hover:bg-white/5 transition-colors">
          <HelpCircle className="w-5 h-5 shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-bold tracking-tight whitespace-nowrap"
              >
                Support Hub
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        <Link to="/auth" className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-white/60 hover:text-white hover:bg-white/5 transition-colors">
          <LogOut className="w-5 h-5 shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-bold tracking-tight whitespace-nowrap"
              >
                Deactivate
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center py-3 mt-2 rounded-[1.25rem] text-white/40 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/5 hidden lg:flex"
        >
          {collapsed ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
        </button>
      </div>
    </motion.aside>
  );
}
