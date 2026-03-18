import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  trend: string;
  icon: LucideIcon;
  isAlert?: boolean;
  delay?: number;
  onClick?: () => void;
}

export function KPICard({ title, value, trend, icon: Icon, isAlert = false, delay = 0, onClick }: KPICardProps) {
  const isPositive = trend.startsWith("+");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 25 } }}
      onClick={onClick}
      className={`group relative bg-card p-6 rounded-[2rem] border border-border/50 shadow-card hover:shadow-2xl hover:shadow-primary/10 transition-all ${onClick ? 'cursor-pointer active:scale-95' : 'cursor-default'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 dark:to-transparent rounded-[2rem] pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-5">
          <div className={`p-3 rounded-2xl transition-transform group-hover:scale-110 duration-300 ${isAlert ? "bg-destructive/10 text-destructive shadow-[0_0_15px_rgba(239,68,68,0.2)]" : "bg-primary/5 text-primary shadow-[0_0_15px_rgba(4,103,255,0.1)]"}`}>
            <Icon className="w-6 h-6" />
          </div>
          <motion.span
            initial={{ opacity: 0.8 }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
            className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
              isPositive
                ? "bg-success/10 text-success border-success/20"
                : "bg-muted text-muted-foreground border-muted-foreground/10"
            }`}
          >
            {trend}
          </motion.span>
        </div>
        
        <div className="space-y-1">
          <p className="text-muted-foreground/80 text-[10px] font-bold uppercase tracking-wider">{title}</p>
          <h2 className={`text-2xl font-bold tracking-tight tabular-nums ${isAlert ? "text-destructive" : "text-foreground"}`}>
            {value}
          </h2>
        </div>
      </div>
    </motion.div>
  );
}
