import { motion, AnimatePresence } from "framer-motion";
import { Filter, Calendar, DollarSign, ArrowUpDown, Zap, Info, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RiskScoreGauge } from "@/components/shared/RiskScoreGauge";
import { useState } from "react";

const trailItems = [
  { from: "9182...501", to: "8821...002", amount: "₹12,50,000", status: "Flagged", time: "10:32 AM" },
  { from: "8821...002", to: "7712...993", amount: "₹11,90,000", status: "Flagged", time: "10:34 AM" },
  { from: "7712...993", to: "6601...114", amount: "₹11,50,000", status: "Suspicious", time: "10:37 AM" },
  { from: "6601...114", to: "5590...225", amount: "₹10,80,000", status: "Under Review", time: "10:41 AM" },
];

const statusStyles: Record<string, string> = {
  Flagged: "text-destructive",
  Suspicious: "text-warning",
  "Under Review": "text-accent",
};

export default function FundFlowPage() {
  const navigate = useNavigate();
  const [showMuleClusters, setShowMuleClusters] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden bg-[#020617]">
      {/* Filters Bar */}
      <div className="lg:hidden p-4 bg-white/5 border-b border-white/10 flex flex-wrap gap-3">
        <FilterBadge icon={Calendar} label="Last 72 Hours" />
        <FilterBadge icon={DollarSign} label="₹5,00,000+" />
        <FilterBadge icon={ArrowUpDown} label="All Types" />
      </div>

      {/* Main Graph Area */}
      <div className="flex-1 bg-transparent relative overflow-hidden">
        {/* Filters (desktop) */}
        <div className="hidden lg:flex absolute top-4 left-4 right-4 z-10 bg-[#020617]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-3 gap-6 items-center text-sm shadow-2xl">
          <div className="flex items-center gap-2 text-white/50 border-r border-white/10 pr-4">
            <Filter className="w-4 h-4" />
            <span className="font-bold text-[10px] uppercase tracking-widest">Controls</span>
          </div>
          <select className="bg-white/5 border-none rounded-lg px-3 py-1.5 text-xs font-bold text-white focus:ring-1 focus:ring-primary/20">
            <option className="bg-[#020617]">Last 72 Hours</option>
            <option className="bg-[#020617]">Last 7 Days</option>
          </select>
          <div className="h-6 w-[1px] bg-border mx-1" />
          
          <button 
            onClick={() => setShowMuleClusters(!showMuleClusters)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all ${
              showMuleClusters 
              ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105" 
              : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${showMuleClusters ? "fill-current" : ""}`} />
            Mule Detection Engine
          </button>

          <div className="ml-auto flex items-center gap-3">
             <div className="flex items-center gap-1.5 text-[10px] font-bold text-success bg-success/10 px-2 py-1 rounded border border-success/20">
                <ShieldAlert size={12} /> Live Scan Active
             </div>
          </div>
        </div>

        {/* Interactive Network */}
        <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.05" />
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect width="800" height="600" fill="url(#grid)" />

          {/* Mule Cluster Visualization Overlay */}
          <AnimatePresence>
            {showMuleClusters && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Cluster A hull */}
                <motion.path 
                  d="M 180 160 L 620 160 L 620 440 L 180 440 Z"
                  fill="url(#clusterGradient)"
                  stroke="rgba(var(--primary), 0.3)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                  opacity="0.1"
                />
                <defs>
                   <radialGradient id="clusterGradient">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                   </radialGradient>
                </defs>
                {/* Mule identifying lines */}
                <motion.line x1="200" y1="180" x2="600" y2="180" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="4" animate={{ opacity: [0.2, 0.5, 0.2], strokeDashoffset: [0, -20] }} transition={{ duration: 2, repeat: Infinity }} />
                <motion.line x1="200" y1="420" x2="600" y2="420" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="4" animate={{ opacity: [0.2, 0.5, 0.2], strokeDashoffset: [0, -20] }} transition={{ duration: 2, repeat: Infinity }} />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Edges */}
          {[
            [400, 300, 200, 180], [400, 300, 600, 180], [400, 300, 200, 420],
            [400, 300, 600, 420], [200, 180, 100, 100], [600, 180, 700, 100],
            [200, 420, 100, 500], [600, 420, 700, 500],
          ].map(([x1, y1, x2, y2], i) => (
            <motion.line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="white"
              strokeWidth="1"
              opacity="0.1"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            />
          ))}

          {/* Animated flow particles */}
          {[
            [400, 300, 200, 180], [400, 300, 600, 420],
          ].map(([x1, y1, x2, y2], i) => (
            <motion.circle
              key={`p-${i}`}
              r="2"
              fill="hsl(var(--primary))"
              initial={{ cx: x1, cy: y1, opacity: 0 }}
              animate={{ cx: [x1, x2], cy: [y1, y2], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.8 }}
            />
          ))}

          {/* Nodes */}
          {[
            { x: 400, y: 300, r: 30, color: "hsl(0, 84%, 60%)", label: "TARGET", sub: "9182...501" },
            { x: 200, y: 180, r: 22, color: "hsl(218, 85%, 30%)", label: "B", sub: "8821...002", isMule: true },
            { x: 600, y: 180, r: 22, color: "hsl(218, 85%, 30%)", label: "C", sub: "7712...993", isMule: true },
            { x: 200, y: 420, r: 20, color: "hsl(38, 92%, 50%)", label: "D", sub: "6601...114" },
            { x: 600, y: 420, r: 22, color: "hsl(0, 84%, 60%)", label: "G", sub: "5590...225", isMule: true },
            { x: 100, y: 100, r: 16, color: "hsl(218, 85%, 30%)", label: "F", sub: "" },
            { x: 700, y: 100, r: 16, color: "hsl(218, 85%, 30%)", label: "H", sub: "" },
            { x: 100, y: 500, r: 16, color: "hsl(218, 85%, 30%)", label: "I", sub: "" },
            { x: 700, y: 500, r: 16, color: "hsl(218, 85%, 30%)", label: "J", sub: "" },
          ].map((node, i) => (
            <motion.g key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.08, type: "spring", stiffness: 200 }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            >
              {node.color.includes("60%") && (
                <motion.circle cx={node.x} cy={node.y} r={node.r}
                  fill="none" stroke={node.color} strokeWidth="1"
                  animate={{ r: [node.r, node.r + 10], opacity: [0.6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              {showMuleClusters && node.isMule && (
                <motion.circle cx={node.x} cy={node.y} r={node.r + 5}
                  fill="none" stroke="hsl(var(--primary))" strokeWidth="2"
                  filter="url(#glow)"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <circle cx={node.x} cy={node.y} r={node.r} fill={node.color} className="cursor-pointer" />
              <text x={node.x} y={node.y + (node.sub ? -3 : 1)} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize={node.r > 20 ? "10" : "8"} fontWeight="bold">
                {node.label}
              </text>
              {node.sub && (
                <text x={node.x} y={node.y + 8} textAnchor="middle" fill="white" fontSize="6" opacity="0.7" fontFamily="monospace">
                  {node.sub}
                </text>
              )}
            </motion.g>
          ))}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-[#020617]/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 text-[10px] space-y-2.5 shadow-2xl font-bold uppercase tracking-wider text-white">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-2"><Info size={12} className="text-primary" /> Intelligence Key</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-destructive shadow-[0_0_10px_rgba(239,68,68,0.4)]" /> Suspicious Node</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(4,103,255,0.4)]" /> Verified Account</div>
          {showMuleClusters && (
            <motion.div 
               initial={{ opacity: 0, x: -10 }} 
               animate={{ opacity: 1, x: 0 }}
               className="flex items-center gap-2 text-primary bg-primary/10 px-2.5 py-1.5 rounded border border-primary/20"
            >
              <Zap size={10} className="fill-current" /> Predicted Mule Cluster (94% Conf)
            </motion.div>
          )}
        </div>
      </div>

      {/* Right Detail Panel */}
      <aside className="w-full lg:w-96 bg-white/[0.02] border-l border-white/10 overflow-y-auto p-8 space-y-8 backdrop-blur-xl">
        <div>
          <h2 className="text-xl font-bold text-white">Account Analysis</h2>
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">ACC: 918273645501</p>
        </div>

        <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 flex flex-col items-center">
          <RiskScoreGauge score={82} />
          <p className="mt-6 text-sm font-medium text-center text-white/50">
            High probability of <span className="text-destructive font-bold">Smurfing</span> detected.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30">Transaction Trail</h4>
          {trailItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.03] text-xs hover:bg-white/[0.06] transition-all"
            >
              <div className="flex flex-col gap-1">
                <span className="font-bold text-white/40 uppercase">{item.from}</span>
                <span className="font-bold text-primary">↓ {item.to}</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-white text-sm">{item.amount}</div>
                <div className={`font-bold uppercase text-[9px] mt-0.5 ${statusStyles[item.status]}`}>{item.status}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <button 
          onClick={() => navigate('/reports')}
          className="w-full py-4 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20">
          Generate FIU Report (PDF)
        </button>
      </aside>
    </div>
  );
}

function FilterBadge({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-white">
      <Icon className="w-3.5 h-3.5 text-white/50" />
      {label}
    </div>
  );
}
