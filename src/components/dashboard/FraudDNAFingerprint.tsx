import { motion } from "framer-motion";
import { Fingerprint, Share2, Shield, Zap, TrendingUp, Search, Info } from "lucide-react";
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

interface DNAAttribute {
  subject: string;
  A: number; // Known Pattern
  B: number; // Current Cluster
  fullMark: number;
}

const data: DNAAttribute[] = [
  { subject: 'Hops depth', A: 120, B: 110, fullMark: 150 },
  { subject: 'Timing Gap', A: 98, B: 130, fullMark: 150 },
  { subject: 'Amount Ratio', A: 86, B: 130, fullMark: 150 },
  { subject: 'Entry Points', A: 99, B: 100, fullMark: 150 },
  { subject: 'Exit Points', A: 85, B: 90, fullMark: 150 },
  { subject: 'Node Degree', A: 65, B: 85, fullMark: 150 },
];

export function FraudDNAFingerprint() {
  return (
    <div className="bg-[#020617] rounded-[2rem] border border-white/5 p-8 shadow-2xl overflow-hidden relative group h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
            <Fingerprint size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Fraud DNA Fingerprinting</h4>
            <p className="text-[10px] font-semibold text-white/50">Vector-based Topology Matching</p>
          </div>
        </div>
        <div className="px-2 py-1 bg-primary/5 border border-primary/10 rounded-full">
           <span className="text-[9px] font-bold text-primary uppercase tracking-widest">GraphML Active</span>
        </div>
      </div>

      <div className="flex-1 min-h-[250px] relative mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 8, fontWeight: 700 }} />
            <Radar
              name="Hawala Ring"
              dataKey="A"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.5}
            />
            <Radar
              name="Current Cluster"
              dataKey="B"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
        
        <div className="absolute top-0 right-0 bg-[#020617]/80 backdrop-blur p-2 rounded-lg border border-white/10 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-[8px] font-bold text-white/50 uppercase">Hawala Pattern</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-destructive" />
            <span className="text-[8px] font-bold text-white/50 uppercase">Current Trace</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20 relative overflow-hidden">
           <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Share2 size={14} className="text-destructive" />
                <span className="text-xs font-bold text-white">Active Hawala Match</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-destructive">87.4%</span>
                <p className="text-[8px] font-bold text-destructive/60 uppercase -mt-1">Similarity</p>
              </div>
           </div>
           
           <div className="space-y-1.5">
             <div className="flex items-center justify-between text-[10px]">
                <span className="text-white/50 font-medium">Topological Alignment</span>
                <span className="text-white font-bold">92.1%</span>
             </div>
             <div className="w-full h-1 bg-destructive/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "92.1%" }}
                  className="h-full bg-destructive"
                />
             </div>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
           <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center backdrop-blur-sm">
              <Zap size={14} className="text-warning mx-auto mb-1" />
              <p className="text-[8px] font-bold text-white/50 uppercase">Timing Gap</p>
              <p className="text-xs font-black text-white">Sub-30m</p>
           </div>
           <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center backdrop-blur-sm">
              <TrendingUp size={14} className="text-success mx-auto mb-1" />
              <p className="text-[8px] font-bold text-white/50 uppercase">Ratio Shift</p>
              <p className="text-xs font-black text-white">Critical</p>
           </div>
        </div>
      </div>

      <button className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest border border-white/10 transition-all flex items-center justify-center gap-2">
        <Search size={14} /> Open Structural Library
      </button>
    </div>
  );
}
