import { motion } from "framer-motion";
import { Activity, User, MapPin, TrendingUp, AlertCircle, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const muleNodes = [
  { id: "M-4021", loc: "Mumbai, MH", activity: "High Intensity", risk: 94, avatar: "AK" },
  { id: "M-8291", loc: "Delhi, DL", activity: "Rapid Layering", risk: 88, avatar: "SK" },
  { id: "M-1044", loc: "Dubai, UAE", activity: "Exfiltration", risk: 91, avatar: "RJ" },
];

export function MuleNodeTracker() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#020617] rounded-[2rem] border border-white/5 p-8 shadow-2xl overflow-hidden relative group h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Live Asset Tracking</h4>
          <h3 className="text-base font-bold text-white">Active Mule Nodes</h3>
        </div>
        <div className="p-2 bg-primary/5 rounded-lg text-primary">
          <Activity size={18} />
        </div>
      </div>

      <div className="space-y-4 flex-1">
        {muleNodes.map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary/20 to-accent/20 flex items-center justify-center font-bold text-xs text-primary border border-primary/20 group-hover:scale-110 transition-transform">
              {node.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase">{node.id}</span>
                <span className="text-[10px] font-bold text-destructive">{node.risk}% Risk</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5 mt-1">
                <MapPin size={10} className="text-white/50" />
                <span className="text-[10px] text-white/50 font-medium">{node.loc}</span>
                <span className="text-[8px] mx-1 opacity-20">•</span>
                <span className="text-[10px] text-primary font-bold">{node.activity}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-white/50 uppercase opacity-50">Global Saturation</span>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '72%' }}
                className="h-full bg-primary"
              />
            </div>
            <span className="text-[10px] font-bold text-white font-mono">72%</span>
          </div>
        </div>
        <button 
          onClick={() => navigate('/investigation')}
          className="text-[10px] font-bold text-primary uppercase flex items-center gap-1.5 hover:underline decoration-2 underline-offset-4"
        >
          Full Registry <ExternalLink size={12} />
        </button>
      </div>
    </div>
  );
}
