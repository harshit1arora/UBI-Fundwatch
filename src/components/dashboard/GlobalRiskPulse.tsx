import { motion, AnimatePresence } from "framer-motion";
import { Zap, Activity, ShieldCheck, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";

export function GlobalRiskPulse() {
  const [risk, setRisk] = useState(64);
  const [pulseColor, setPulseColor] = useState("text-warning");

  useEffect(() => {
    const interval = setInterval(() => {
      const newRisk = Math.max(30, Math.min(95, 64 + (Math.random() * 10 - 5)));
      setRisk(Math.round(newRisk));
      
      if (newRisk > 80) setPulseColor("text-destructive");
      else if (newRisk > 50) setPulseColor("text-warning");
      else setPulseColor("text-success");
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#020617] border border-white/5 rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.5)]"
    >
      {/* Background Neural Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      
      {/* Background Animated Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"
      />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="space-y-4 max-w-xl">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_10px_rgba(34,197,94,0.3)]" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-white/40">Real-time Intelligence</span>
          </div>
          <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
             Global Banking <span className="text-primary font-semibold">Risk Index</span>
          </h3>
          <p className="text-sm lg:text-base font-medium text-white/50 leading-relaxed">
            Advanced behavioral analysis indexed across all institutional nodes. Current signature confidence: <span className="text-white/80 font-bold">98.24%</span>
          </p>
          
          <div className="flex flex-wrap gap-3 pt-2">
            {[
              { label: "Mule Activity", status: "MODERATE", color: "text-warning", icon: Zap },
              { label: "Network Health", status: "CRITICAL", color: "text-destructive", icon: AlertTriangle },
              { label: "AI Prediction", status: "STABLE", color: "text-success", icon: ShieldCheck },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 flex items-center gap-3 backdrop-blur-md hover:bg-white/10 transition-all cursor-crosshair">
                 <stat.icon size={16} className={stat.color} />
                 <div className="text-[10px] font-black text-white/50 uppercase tracking-widest">{stat.label}: <span className="text-white ml-1">{stat.status}</span></div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-10 bg-white/[0.03] border border-white/[0.05] rounded-[2.5rem] p-8 backdrop-blur-sm self-stretch lg:self-center">
          <div className="text-right space-y-2">
            <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">LIVE ENGINE LOAD</div>
            <div className="flex items-center justify-end gap-3 text-primary">
              <Activity size={24} className="animate-pulse" />
              <span className="text-4xl font-mono font-black tracking-[calc(1em*-0.05)] italic">842 <span className="text-xs opacity-40 font-sans tracking-widest not-italic ml-1 uppercase">tps</span></span>
            </div>
            <div className="flex gap-1 justify-end opacity-40">
               {[2, 4, 3, 5, 2, 6, 4, 3].map((h, i) => (
                  <motion.div key={i} animate={{ height: [4, h * 3 + 4, 4] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }} className="w-1 bg-primary rounded-full" />
               ))}
            </div>
          </div>

          <div className="w-[1px] h-20 bg-white/10" />

          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <svg className="w-32 h-32 transform -rotate-90 relative">
              <circle
                cx="64"
                cy="64"
                r="52"
                stroke="currentColor"
                strokeWidth="10"
                fill="none"
                className="text-white/[0.02]"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="52"
                stroke="currentColor"
                strokeWidth="10"
                fill="none"
                strokeDasharray={326.7}
                animate={{ strokeDashoffset: 326.7 - (risk / 100) * 326.7 }}
                transition={{ duration: 2, ease: "circOut" }}
                className={`${pulseColor.replace('text-', 'stroke-')} transition-colors duration-500`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black font-mono tracking-tighter text-white italic">{risk}</span>
              <span className="text-[9px] font-black uppercase text-white/30 tracking-[0.3em] leading-none">INDEX</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
