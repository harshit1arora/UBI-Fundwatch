import { ArrowLeftRight, ShieldAlert, Users, TrendingUp, RefreshCw, Zap, Sparkles, AlertCircle, ShieldCheck, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";
import { generateForensicPDF } from "@/utils/reportGenerator";
import { KPICard } from "@/components/dashboard/KPICard";
import { AIInsightsPanel } from "@/components/dashboard/AIInsightsPanel";
import { NetworkGraph } from "@/components/dashboard/NetworkGraph";
import { RecentAlerts } from "@/components/dashboard/RecentAlerts";
import { GlobalRiskPulse } from "@/components/dashboard/GlobalRiskPulse";
import { InvestigationFilters } from "@/components/dashboard/InvestigationFilters";
import { FraudDNAFingerprint } from "@/components/dashboard/FraudDNAFingerprint";
import { TimeLapseReplay } from "@/components/dashboard/TimeLapseReplay";
import { SecurityOperationsPulse } from "@/components/dashboard/SecurityOperationsPulse";
import { MuleNodeTracker } from "@/components/dashboard/MuleNodeTracker";
import { LiveTransactionFeed } from "@/components/dashboard/LiveTransactionFeed";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    toast("Syncing Live Feeds", { 
      description: "Updating core banking system data...",
      icon: <RefreshCw className="w-4 h-4 animate-spin text-primary" />
    });
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Dashboard Updated", { 
        description: "Live AI algorithms have finished refreshing.",
        icon: <ShieldAlert className="w-4 h-4 text-success" />
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6 space-y-8 w-full overflow-x-hidden">
      {/* Premium Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-border/40 px-2 lg:px-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
             <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.3)]" />
             <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 leading-none">Security Operations Center</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-none flex items-center gap-3">
            Real-Time Monitoring <span className="text-primary">Console</span>
            <ShieldCheck className="text-primary w-8 h-8 opacity-80" />
          </h1>
          <p className="text-sm lg:text-base font-medium text-muted-foreground/80 tracking-tight">AI-assisted fraud detection and automated heuristic analysis</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="hidden xl:flex flex-col items-end mr-6 border-r border-border/50 pr-6">
              <span className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-widest leading-none mb-1">System Latency</span>
              <span className="text-2xl font-bold text-foreground font-mono leading-none tracking-tight">0.82 <span className="text-[10px] text-muted-foreground/30 ml-1">ms/p</span></span>
           </div>
           
           <button 
             onClick={handleRefresh}
             className="relative group overflow-hidden flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-xl font-bold text-[11px] uppercase tracking-wider hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/10"
           >
             <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
             Update System Data
           </button>
        </div>
      </header>

      {/* Top Layer: Global Risk Pulse (Full Width Sleek Card) */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <GlobalRiskPulse />
      </motion.div>

      {/* Main Grid: Multi-Column Operational Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        
        {/* Left Sidebar: Filters & Quick Intel */}
        <aside className="lg:col-span-3 h-full space-y-8">
            <div className="sticky top-6 space-y-8">
              <InvestigationFilters />
              <AIInsightsPanel />
            </div>
        </aside>

        {/* Center Section: Main Visualization & Specialized Forensics */}
        <main className="lg:col-span-9 space-y-8">
          {/* KPI Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard title="Total Volume (24h)" value="₹1,482.40 Cr" trend="+12.3%" icon={TrendingUp} delay={0.2} onClick={() => navigate("/fund-flow")} />
            <KPICard title="Total Transactions" value="24,891" trend="+8.2%" icon={ArrowLeftRight} delay={0.3} onClick={() => navigate("/fund-flow")} />
            <KPICard title="Suspicious Alerts" value="142" trend="+4.1%" icon={ShieldAlert} isAlert delay={0.4} onClick={() => navigate("/alerts")} />
            <KPICard title="High Risk Entities" value="28" trend="-2.4%" icon={Users} delay={0.5} onClick={() => navigate("/investigation")} />
          </div>

          <NetworkGraph />

          {/* SECONDARY LAYER: The Forensic Quad-Grid (Annihilates Whitespace) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
             <motion.div
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.6 }}
               className="h-full"
             >
               <SecurityOperationsPulse />
             </motion.div>
             
             <motion.div
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.65 }}
               className="h-full"
             >
               <TimeLapseReplay />
             </motion.div>

             <motion.div
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.7 }}
               className="h-full"
             >
               <FraudDNAFingerprint />
             </motion.div>

             <motion.div
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.72 }}
               className="h-full"
             >
               <MuleNodeTracker />
             </motion.div>
          </div>

          {/* TERTIARY LAYER: Transaction Telemetry & System Logs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                 <LiveTransactionFeed />
              </div>
              <div className="lg:col-span-1">
                 <motion.div
                   initial={{ x: 20, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ delay: 0.8 }}
                   className="bg-[#020617] rounded-[2rem] border border-white/5 p-8 shadow-2xl overflow-hidden relative group h-full min-h-[400px]"
                 >
                    <div className="flex items-center justify-between mb-6">
                       <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 flex items-center gap-2">
                          <AlertCircle size={14} className="text-destructive" /> Rapid System Alerts
                       </h4>
                       <button 
                         onClick={() => navigate("/alerts")}
                         className="text-[10px] font-bold text-primary uppercase tracking-wider hover:underline"
                       >
                         Live Hub
                       </button>
                    </div>
                    <div className="h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                      <RecentAlerts />
                    </div>
                 </motion.div>
              </div>
          </div>
        </main>
      </div>

      {/* NEW: Bottom Intelligence Layer - Tactical Command Stream */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="w-full relative group mt-12 mb-8"
      >
        <div className="relative bg-[#020617] border border-white/5 rounded-3xl p-8 lg:p-12 shadow-2xl overflow-hidden flex flex-col lg:flex-row gap-12">
           <div className="lg:w-1/3 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Mission Control</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                 Operational <span className="text-primary">Summary</span>
              </h2>
              <p className="text-sm lg:text-base font-medium text-white/40 leading-relaxed">
                 Advanced behavior clustering has identified 14 active nodes across legacy regional centers. Structured deposit patterns match high-risk liquidity movement signatures.
              </p>
              <div className="pt-4 flex items-center gap-6">
                  <button 
                    onClick={() => {
                       generateForensicPDF({
                          title: "Operational Summary Forensic Export",
                          caseId: "SOC-2024-LIVE",
                          date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
                          investigator: "System Administrator",
                          summary: "Automated state export from Security Operations Center. Mission Control has identified high-risk clusters in Cluster 4-A and 4-B showing Hawala-style structuring patterns.",
                          transactions: [
                             { from: "Cluster 4-A", to: "Isolated Node 0x82...501", amount: "₹18.5 Cr", date: "Last 24h", status: "Flagged" },
                             { from: "Cluster 4-B", to: "Heuristic Verification", amount: "Pending", date: "Current Session", status: "Scanning" }
                          ],
                          findings: [
                             "DNA Signature: 87.4% alignment with Hawala patterns",
                             "Velocity: High-frequency movements detected across regional centers",
                             "Action: Nodes isolated for manual forensic review"
                          ]
                       });
                       toast.success("Forensic Report Generated", { description: "SOC Mission Control state exported to PDF." });
                    }}
                    className="bg-primary text-white px-8 py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                  >
                     FORENSIC REPORT
                  </button>
                  <button 
                    onClick={() => navigate('/forensics')}
                    className="bg-white/5 text-white border border-white/10 px-8 py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                  >
                     COMMAND CONSOLE
                  </button>
              </div>
           </div>

           <div className="flex-1 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-white/30 flex items-center gap-3">
                  <Activity size={14} className="text-primary" /> Tactical Command Stream
                </h4>
                <span className="text-[10px] font-mono text-primary/40 bg-primary/5 px-2 py-1 rounded border border-primary/10 uppercase">SESSION_IDX_0xFC</span>
              </div>
              <div className="bg-black/40 rounded-2xl p-6 font-mono text-[11px] text-primary/80 border border-white/5 space-y-2 max-h-[250px] overflow-y-auto custom-scrollbar">
                 <p className="flex items-center gap-3"><span className="text-white/20">01:14</span> <span className="text-secondary font-bold">INFO</span> Initializing heuristic pass on Cluster 4-A...</p>
                 <p className="flex items-center gap-3"><span className="text-white/20">01:15</span> <span className="text-success font-bold">MATCH</span> DNA Signature 87.4% aligned with known Hawala pattern.</p>
                 <p className="flex items-center gap-3"><span className="text-white/20">01:15</span> <span className="text-destructive font-bold">EVENT</span> Isolated node 0x82...501 for manual forensic review.</p>
                 <p className="flex items-center gap-3"><span className="text-white/20">01:16</span> <span className="text-primary font-bold">LOG</span> Routing telemetry to Central Fraud Database.</p>
                 <p className="flex items-center gap-3"><span className="text-white/20">01:17</span> <span className="text-secondary font-bold">SCAN</span> Cluster 4-B identified; wait for verification...</p>
                 <p className="flex items-center gap-3"><span className="text-white/20">01:18</span> <span className="text-success font-bold">OK</span> Network handshake complete. Forensic tunnel open.</p>
              </div>
           </div>

           <div className="lg:w-1/4 grid grid-cols-1 gap-4 relative z-10">
               {[
                 { title: "Layering Depth", desc: "Analyzing 12-hop patterns.", val: "Active", color: "text-primary", icon: Zap },
                 { title: "Velocity Check", desc: "High-freq movements.", val: "3 Warnings", color: "text-destructive", icon: AlertCircle },
                 { title: "Identity Match", desc: "Shell entity links.", val: "94% Conf.", color: "text-success", icon: ShieldCheck },
               ].map((item, i) => (
                 <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.05] transition-all flex items-start gap-4">
                    <div className={`p-2 rounded-xl bg-current/10 ${item.color}`}>
                       <item.icon size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                         <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">{item.title}</h4>
                      </div>
                      <p className="text-[10px] font-medium text-white/30 leading-snug">{item.desc}</p>
                    </div>
                 </div>
               ))}
           </div>
        </div>
      </motion.div>
      
      {/* Global CSS Overrides */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}
