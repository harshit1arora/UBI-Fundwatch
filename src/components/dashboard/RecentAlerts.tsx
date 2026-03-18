import { motion } from "framer-motion";
import { AlertTriangle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const alerts = [
  { id: "ALT-2841", account: "9182...501", type: "Rapid Fund Movement", risk: "High", time: "2 min ago" },
  { id: "ALT-2840", account: "8821...002", type: "Round-Tripping", risk: "High", time: "14 min ago" },
  { id: "ALT-2839", account: "7712...993", type: "Structuring", risk: "Medium", time: "28 min ago" },
  { id: "ALT-2838", account: "6601...114", type: "Shell Company Link", risk: "High", time: "45 min ago" },
  { id: "ALT-2837", account: "5590...225", type: "Unusual Volume", risk: "Medium", time: "1h ago" },
];

const riskStyles: Record<string, string> = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-warning/10 text-warning",
  Low: "bg-success/10 text-success",
};

export function RecentAlerts() {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-4">
      <div className="divide-y divide-border/50">
        {alerts.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => navigate("/alerts")}
            className="group relative p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-transparent hover:border-primary/20 transition-all cursor-pointer overflow-hidden mb-3"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-all" />
            <div className="flex items-start gap-4 relative z-10">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-110 ${alert.risk === 'High' ? 'bg-destructive/10 border-destructive/20 text-destructive' : 'bg-warning/10 border-warning/20 text-warning'}`}>
                 <AlertTriangle size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold text-white group-hover:text-primary transition-colors tracking-tight">{alert.type}</p>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border ${riskStyles[alert.risk]} border-current`}>{alert.risk}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                   <p className="text-[10px] text-white/50 font-medium opacity-80 bg-white/5 px-1.5 py-0.5 rounded">{alert.account}</p>
                   <span className="text-[10px] font-bold text-white/30">{alert.id}</span>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-white/5 h-6">
                   <div className="flex items-center gap-2 text-[10px] text-white/60 font-bold uppercase tracking-wider">
                      <Clock size={10} className="text-white/30" />
                      {alert.time}
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-success/60 animate-pulse" />
                      <span className="text-[10px] font-bold text-success/60 uppercase tracking-wider">Neural Confidence: 92.4%</span>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
