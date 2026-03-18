import { motion } from "framer-motion";
import { Activity, Globe, Shield, Zap, ArrowUpRight, Lock, Eye } from "lucide-react";

const stats = [
  { label: "Neural Load", value: "42%", status: "Optimal", color: "text-success" },
  { label: "Threat Level", value: "Low", status: "Nominal", color: "text-primary" },
  { label: "Active Traces", value: "1,402", status: "Live", color: "text-accent" },
];

const nodes = [
  { id: 1, x: 20, y: 30, size: 4, opacity: 0.6 },
  { id: 2, x: 50, y: 15, size: 6, opacity: 0.8 },
  { id: 3, x: 80, y: 40, size: 3, opacity: 0.4 },
  { id: 4, x: 30, y: 70, size: 5, opacity: 0.7 },
  { id: 5, x: 70, y: 80, size: 7, opacity: 0.9, highlight: true },
  { id: 6, x: 10, y: 85, size: 3, opacity: 0.5 },
  { id: 7, x: 90, y: 10, size: 4, opacity: 0.6 },
];

export function SecurityOperationsPulse() {
  return (
    <div className="bg-[#020617] rounded-[2rem] border border-white/5 p-8 shadow-2xl overflow-hidden relative group h-full flex flex-col">
      {/* Background Grid & Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="relative z-10 flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <Shield size={20} />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/50">Security Operations</h4>
            <h3 className="text-lg font-bold text-white leading-tight">Neural Threat Radar</h3>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-success/10 border border-success/20 px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] font-bold text-success uppercase tracking-widest">Active Scan</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
        {/* Radar Visualization */}
        <div className="aspect-square relative flex items-center justify-center bg-white/5 rounded-full border border-white/10 overflow-hidden">
          {/* Radar Circles */}
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="absolute inset-0 border border-white/5 rounded-full m-[15%] scale-[var(--scale)]" 
              style={{ '--scale': i * 0.33 } as any} 
            />
          ))}
          
          {/* Radar Sweep */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent origin-center rounded-full opacity-40"
          />

          {/* Neural Nodes */}
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: node.highlight ? [1, 1.2, 1] : 1,
                opacity: node.opacity,
              }}
              transition={{ 
                duration: node.highlight ? 2 : 0.5, 
                repeat: node.highlight ? Infinity : 0 
              }}
              style={{ 
                left: `${node.x}%`, 
                top: `${node.y}%`,
                width: `${node.size}px`,
                height: `${node.size}px`,
              }}
              className={`absolute rounded-full ${node.highlight ? 'bg-destructive ring-4 ring-destructive/20 shadow-[0_0_15px_rgba(239,68,68,0.8)]' : 'bg-primary'}`}
            />
          ))}

          <div className="relative z-10 flex flex-col items-center">
            <Globe size={32} className="text-white/20" />
            <p className="text-[8px] font-bold text-white/30 uppercase mt-2 tracking-widest">Global Watch</p>
          </div>
        </div>

        {/* Real-time Stats */}
        <div className="space-y-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between group/item hover:bg-white/10 transition-all">
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">{stat.label}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-white">{stat.value}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${stat.color} bg-current/10 border border-current/20`}>{stat.status}</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/20 group-hover/item:text-primary transition-colors">
                <ArrowUpRight size={18} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-auto">
        <button className="flex items-center justify-center gap-2 py-3.5 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
          <Lock size={14} /> System Lockdown
        </button>
        <button className="flex items-center justify-center gap-2 py-3.5 bg-white/5 text-white text-[10px] font-bold uppercase tracking-widest border border-white/10 rounded-xl hover:bg-white/10 transition-all">
          <Eye size={14} /> Observation Mode
        </button>
      </div>
    </div>
  );
}
