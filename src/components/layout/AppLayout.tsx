import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { TopNavbar } from "./TopNavbar";
import { AICoPilot } from "../chat/AICoPilot";
import { Footer } from "./Footer";
import { motion } from "framer-motion";

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[#f8fafc] dark:bg-[#020617] relative overflow-hidden selection:bg-primary/20">
      {/* High-end Neural Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      <AppSidebar />
      
      <div className="flex-1 ml-[72px] lg:ml-64 flex flex-col transition-all duration-300 relative z-10 min-h-screen">
        <TopNavbar />
        <main className="flex-1 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 w-full"
          >
            <Outlet />
          </motion.div>
          <Footer />
        </main>
      </div>
      <AICoPilot />
    </div>
  );
}
