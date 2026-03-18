import { motion } from "framer-motion";
import { BrainCircuit, AlertTriangle, AlertCircle, Zap, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface InsightItem {
  type: "Critical" | "Warning" | "Info";
  message: string;
  time: string;
  icon: React.ReactNode;
}

const insights: InsightItem[] = [
  {
    type: "Critical",
    message: "Unusual rapid fund movement detected in Cluster 4-A. ₹18.5 Cr moved across 12 accounts in 47 minutes.",
    time: "2m ago",
    icon: <Zap className="w-3.5 h-3.5" />,
  },
  {
    type: "Warning",
    message: "Possible round-tripping pattern identified: A → B → C → A with decreasing amounts.",
    time: "14m ago",
    icon: <RotateCcw className="w-3.5 h-3.5" />,
  },
  {
    type: "Critical",
    message: "Shell company linkage detected between 3 flagged accounts in Mumbai region.",
    time: "28m ago",
    icon: <AlertTriangle className="w-3.5 h-3.5" />,
  },
  {
    type: "Warning",
    message: "Account 9182...501 exhibits 82% similarity to known 'Layering' patterns.",
    time: "1h ago",
    icon: <AlertCircle className="w-3.5 h-3.5" />,
  },
];

const typeStyles = {
  Critical: "border-l-destructive bg-destructive/5",
  Warning: "border-l-warning bg-warning/5",
  Info: "border-l-accent bg-accent/5",
};

const badgeStyles = {
  Critical: "bg-destructive/10 text-destructive",
  Warning: "bg-warning/10 text-warning",
  Info: "bg-accent/10 text-accent",
};

export function AIInsightsPanel() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2 mb-4">
         <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <BrainCircuit size={16} className="text-primary" /> Core Neural Insights
         </h3>
         <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-primary/20">Real-time Analysis</span>
      </div>
      
      <div className="space-y-4">
        {insights.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className={`group p-5 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all relative overflow-hidden`}
          >
            <div className={`absolute top-0 left-0 w-1 h-full ${item.type === 'Critical' ? 'bg-destructive' : 'bg-warning'}`} />
            
            <div className="flex justify-between items-center mb-2">
              <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1.5 border ${badgeStyles[item.type]} border-current`}>
                {item.icon} {item.type}
              </span>
              <span className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-wider">{item.time}</span>
            </div>
            <p className="text-sm font-semibold text-foreground/90 leading-relaxed">{item.message}</p>
          </motion.div>
        ))}
      </div>
      
      <button 
        onClick={() => navigate('/intel/briefing')}
        className="w-full relative group py-3 bg-primary text-white rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-3 shadow-md"
      >
        <Zap size={14} className="fill-current" />
        Open Expert Briefing Console
      </button>
    </div>
  );
}
