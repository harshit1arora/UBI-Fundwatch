import { Search, Bell, Sun, Moon, User, Settings, LogOut, ShieldCheck, Mail, Activity, ArrowRight, ArrowLeftRight, Clock, Filter, Command, ChevronRight, Globe, Download, Zap } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export function TopNavbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getBreadcrumbs = () => {
    const path = window.location.pathname;
    if (path === "/") return ["System", "Dashboard"];
    const parts = path.split("/").filter(p => p);
    return ["System", ...parts.map(p => p.charAt(0).toUpperCase() + p.slice(1))];
  };

  const breadcrumbs = getBreadcrumbs();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const searchFilters = ["Accounts", "Transactions", "Entities", "Alerts"];
  const recentSearches = ["TRX-829104", "Ashish Kumar", "91827364501", "High Risk"];

  return (
    <header className="h-16 bg-sidebar border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-20 shadow-lg">
      <div className="flex-1 flex items-center gap-6">


        <motion.div 
          initial={false}
          animate={{ width: isSearchFocused ? "100%" : "85%", maxWidth: isSearchFocused ? "800px" : "500px" }}
          className="relative"
        >
          <div className="relative group">
            <div className={`absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500`} />
            <div className="relative flex items-center bg-white/10 hover:bg-white/15 border border-white/10 focus-within:border-primary/40 rounded-2xl transition-all shadow-inner overflow-hidden">
               <Search 
                className={`ml-4 transition-colors duration-200 ${isSearchFocused ? 'text-primary' : 'text-white/40'}`} 
                size={17} 
              />
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full bg-transparent py-3.5 pl-3 pr-24 text-sm text-white placeholder:text-white/40 focus:outline-none font-bold tracking-tight"
                placeholder="Neural Intelligence Search [⌘K]"
              />
              <div className="absolute right-3 flex items-center gap-2 pointer-events-none">
                <span className="text-[9px] font-bold text-primary/50 uppercase tracking-wider hidden sm:block">Deep Scan</span>
                <kbd className="hidden sm:flex h-6 select-none items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 font-mono text-[10px] font-bold text-white/40 shadow-sm">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </div>
          </div>
          
          <AnimatePresence>
            {isSearchFocused && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                className="absolute top-full left-0 right-0 mt-3 bg-[#0a2342] border border-white/10 shadow-2xl rounded-2xl overflow-hidden z-50 p-2"
              >
                {searchQuery.length === 0 ? (
                  <div className="p-2 space-y-4">
                    <div>
                      <div className="px-3 py-2 flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-wider">
                        <Clock size={12} /> Recent Intelligence Hubs
                      </div>
                      <div className="grid grid-cols-2 gap-1 px-1">
                        {recentSearches.map((item) => (
                          <button
                            key={item}
                            onClick={() => setSearchQuery(item)}
                            className="flex items-center gap-2 px-3 py-2 text-xs text-white/80 hover:bg-white/10 hover:text-white rounded-lg transition-colors text-left group"
                          >
                            <span className="truncate">{item}</span>
                            <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 ml-auto transition-opacity" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="px-3 py-2 flex items-center justify-between text-[10px] font-bold text-white/40 uppercase tracking-wider bg-white/5 rounded-lg mx-1 mb-2">
                      <span>Found Match</span>
                      <Command size={12} />
                    </div>
                    <div className="max-h-80 overflow-y-auto pr-1">
                      <div 
                         onClick={() => navigate("/investigation")}
                         className="p-3 hover:bg-white/10 cursor-pointer flex items-center gap-4 transition-all rounded-xl border border-transparent hover:border-white/10 group mx-1"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30 shadow-sm transition-transform group-hover:scale-110 text-primary">
                          <ArrowLeftRight className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-white">TRX-{searchQuery.toUpperCase()}</p>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-success/20 text-white border border-success/30">Verified</span>
                          </div>
                          <p className="text-xs text-white/50 mt-0.5">High Volume Transaction • Amount: ₹14,50,000</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-white/40">MAR 17</p>
                          <ArrowRight className="w-4 h-4 text-white/20 ml-auto mt-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Live System Indicator */}
        <div className="hidden md:flex items-center gap-4 pl-4 border-l border-white/10 h-8">
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 shadow-inner group cursor-help">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/70 uppercase">System Status</span>
            <div className="flex gap-0.5 ml-1">
               {[1, 2, 3, 2, 1].map((h, i) => (
                  <motion.div key={i} animate={{ height: [4, h * 3 + 4, 4] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }} className="w-0.5 bg-success/60 rounded-full" />
               ))}
            </div>
          </div>
          <motion.div 
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2 text-white/90 text-[11px] font-mono font-bold"
          >
             <Clock size={14} className="text-primary" />
             {currentTime.toLocaleTimeString([], { hour12: false })} <span className="text-white/40 font-sans font-bold">IST</span>
          </motion.div>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-2xl mr-2 border border-white/5">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 hover:bg-white/10 rounded-xl transition-all text-white/60 hover:text-white"
            title="Toggle Theme"
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className="p-2 hover:bg-white/10 rounded-xl transition-all text-white/60 hover:text-white" title="Export Dashboard">
            <Download size={17} />
          </button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2.5 hover:bg-white/5 rounded-xl relative transition-all text-white/60 hover:text-white outline-none group">
              <Bell size={19} className="group-hover:rotate-12 transition-transform" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-sidebar" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0 shadow-2xl border-white/10 rounded-2xl overflow-hidden mt-3 backdrop-blur-xl bg-[#0a2342]/95 text-white">
            <div className="bg-primary p-4 flex justify-between items-center text-primary-foreground">
              <div className="flex items-center gap-2 text-sm font-bold">
                <Zap size={16} className="fill-current" /> Notifications
              </div>
              <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Live Feed</span>
            </div>
            <div className="max-h-[350px] overflow-auto flex flex-col p-1.5 gap-1">
              <div 
                onClick={() => navigate("/alerts")}
                className="p-3.5 hover:bg-white/5 cursor-pointer rounded-xl flex flex-col gap-1 transition-all border border-transparent hover:border-white/10"
              >
                <div className="flex justify-between items-start">
                  <p className="text-sm font-bold text-white">High Risk Transfer Detected</p>
                  <span className="w-2 h-2 rounded-full bg-destructive mt-1 shadow-sm shadow-destructive" />
                </div>
                <p className="text-xs text-white/50 leading-relaxed">₹18.5L transferred from Acc: 9182...501 to a flagged entity.</p>
                <p className="text-[10px] text-primary font-bold mt-1">2 mins ago</p>
              </div>
            </div>
            <div 
              onClick={() => navigate("/alerts")}
              className="p-3 bg-white/5 text-center cursor-pointer hover:bg-white/10 transition-colors group"
            >
              <p className="text-xs font-bold text-primary flex items-center justify-center gap-1">
                View Intelligence Hub <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="w-[1px] h-6 bg-white/10 mx-1" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
             <div className="flex items-center gap-3 pl-2 py-1.5 pr-1 hover:bg-white/5 rounded-2xl transition-all cursor-pointer group">
               <div className="hidden lg:block text-right">
                 <p className="text-[11px] font-bold text-white leading-none font-sans">Ashish Kumar</p>
                 <p className="text-[9px] font-bold text-success mt-1 uppercase tracking-tighter shadow-success/20 drop-shadow-md">On Duty</p>
               </div>
               <div className="w-9 h-9 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center font-bold text-sm group-hover:scale-105 transition-transform border border-white/10">
                 AK
               </div>
             </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-2 shadow-2xl border-white/10 rounded-2xl mt-3 backdrop-blur-xl bg-[#0a2342]/95 text-white">
             <div className="px-3 py-4 flex flex-col items-center border-b border-white/5 mb-1">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center font-bold text-xl text-primary border border-white/10 shadow-inner mb-3">AK</div>
                <p className="font-bold text-base text-white">Ashish Kumar</p>
                <p className="text-xs text-white/40 font-medium">Lead investigator · Mumbai Control</p>
             </div>
            <DropdownMenuItem onClick={() => navigate("/settings", { state: { tab: "profile" } })} className="py-2.5 cursor-pointer rounded-xl text-sm font-medium hover:bg-white/5 focus:bg-white/5 text-white/80 focus:text-white transition-colors border border-transparent hover:border-white/5">
              <User className="mr-3 h-4 w-4 opacity-70" />
              <span>Investigator Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings", { state: { tab: "security" } })} className="py-2.5 cursor-pointer rounded-xl text-sm font-medium hover:bg-white/5 focus:bg-white/5 text-white/80 focus:text-white transition-colors border border-transparent hover:border-white/5">
              <ShieldCheck className="mr-3 h-4 w-4 opacity-70" />
              <span>Security Protocols</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/auth")} className="py-2.5 cursor-pointer rounded-xl text-sm font-bold text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive mt-1 border border-transparent hover:border-destructive/10">
              <LogOut className="mr-3 h-4 w-4" />
              <span>Deactivate Session</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
