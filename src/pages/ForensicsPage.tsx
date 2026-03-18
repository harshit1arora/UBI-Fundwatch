import { motion } from "framer-motion";
import { Shield, Zap, Search, Fingerprint, Timer, Database, Share2, Scan } from "lucide-react";
import { FraudDNAFingerprint } from "@/components/dashboard/FraudDNAFingerprint";
import { TimeLapseReplay } from "@/components/dashboard/TimeLapseReplay";
import { HiddenControllerDetection } from "@/components/dashboard/HiddenControllerDetection";
import { generateForensicPDF } from "@/utils/reportGenerator";
import { toast } from "sonner";

export default function ForensicsPage() {
  return (
    <div className="min-h-screen bg-[#020617] p-4 lg:p-8 space-y-8 w-full">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
             <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_12px_rgba(4,103,255,0.3)]" />
             <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 leading-none">Advanced Forensic Division</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white leading-none flex items-center gap-3">
            Graph Intelligence <span className="text-primary">& Diagnostics</span>
            <Shield className="text-primary w-8 h-8 opacity-80" />
          </h1>
          <p className="text-sm lg:text-base font-medium text-white/50 tracking-tight">Deep structural analysis of transaction networks and temporal pattern matching</p>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={() => {
                generateForensicPDF({
                    title: "Graph Intelligence Forensic Export",
                    caseId: "FRN-8821-X",
                    date: "18 March 2024",
                    investigator: "Automated System Scan",
                    summary: "Full system forensic scan of active fund clusters. Identified multiple structural anomalies and high-velocity exfiltration vectors.",
                    transactions: [
                        { from: "Sihouette Cluster", to: "Bridge Entity Alpha", amount: "₹1.4L /sec", date: "Last 2h", status: "Active Scan" },
                        { from: "Recursive Loop B", to: "Exit Node", amount: "Variable", date: "Last 12h", status: "Critical" }
                    ],
                    findings: [
                        "Velocity Vector: 1.4L /sec sustained",
                        "Structural Depth: 12-Hop average layering",
                        "Triggers: 4 heuristic rules in critical violation"
                    ]
                });
                toast.success("Forensic Log Exported", { description: "PDF report has been generated successfully." });
             }}
             className="flex items-center gap-2 px-6 py-3 bg-white/5 text-white/50 rounded-xl font-bold text-[10px] hover:bg-white/10 hover:text-white transition-all border border-white/10 shadow-sm uppercase tracking-widest"
           >
             <Database size={14} /> Export Forensic Log
           </button>
           <button 
             onClick={() => {
                const scanPromise = new Promise((resolve) => setTimeout(resolve, 3000));
                toast.promise(scanPromise, {
                  loading: 'Scanning global transaction graph for hidden clusters...',
                  success: 'System Scan Complete. 4 New anomalies identified in South-East Asia corridor.',
                  error: 'Scan failed due to network latency.',
                });
             }}
             className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold text-[10px] hover:opacity-90 transition-all shadow-lg shadow-primary/20 uppercase tracking-widest"
           >
             <Scan size={14} /> Run Full System Scan
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-full items-stretch flex-1 pb-10">
        {/* Left Column: DNA & Pattern Library */}
        <div className="xl:col-span-4 space-y-8 flex flex-col h-full">
           <div className="flex-1">
             <FraudDNAFingerprint />
           </div>
           
           <div className="bg-white/[0.02] rounded-[2rem] border border-white/5 p-8 shadow-2xl backdrop-blur-sm">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-6 flex items-center gap-2">
                 <Fingerprint size={14} className="text-primary" /> Pattern Match History
              </h4>
              <div className="space-y-3">
                 {[
                   { name: "Sihouette Cluster", time: "2h ago", match: "94%", color: "text-destructive" },
                   { name: "Bridge Entity Alpha", time: "5h ago", match: "82%", color: "text-warning" },
                   { name: "Recursive Loop B", time: "12h ago", match: "91%", color: "text-destructive" }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50">
                      <div>
                        <p className="text-xs font-bold text-foreground">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground">{item.time}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-black ${item.color}`}>{item.match}</span>
                        <p className="text-[8px] font-bold text-muted-foreground uppercase">Score</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Center Column: Temporal Replay & Controller Intel */}
        <div className="xl:col-span-8 space-y-8 flex flex-col h-full">
           {/* Tier 1: Time Replay */}
           <div className="h-[450px]">
              <TimeLapseReplay />
           </div>

           {/* Tier 2: Hidden Controller (New Algorithm) */}
           <div className="flex-1 min-h-[500px]">
              <HiddenControllerDetection />
           </div>

           {/* Tier 3: Macro Metrics */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
              <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 shadow-2xl backdrop-blur-sm">
                 <div className="flex items-center gap-2 mb-3">
                    <Timer size={16} className="text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Velocity Vector</span>
                 </div>
                 <h3 className="text-2xl font-bold text-white">1.4L <span className="text-xs text-white/30 font-medium">/sec</span></h3>
                 <p className="text-[10px] font-medium text-white/20 mt-2 uppercase tracking-wider">Sustained exfiltration velocity across nodes.</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 shadow-2xl backdrop-blur-sm">
                 <div className="flex items-center gap-2 mb-3">
                    <Share2 size={16} className="text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Structural Depth</span>
                 </div>
                 <h3 className="text-2xl font-bold text-white">12-Hop</h3>
                 <p className="text-[10px] font-medium text-white/20 mt-2 uppercase tracking-wider">Average layering depth before final exit.</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 shadow-2xl backdrop-blur-sm">
                 <div className="flex items-center gap-2 mb-3">
                    <Zap size={16} className="text-destructive" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Critical Triggers</span>
                 </div>
                 <h3 className="text-2xl font-bold text-destructive">4 Active</h3>
                 <p className="text-[10px] font-medium text-white/20 mt-2 uppercase tracking-wider">Heuristic rules currently in critical violation.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
