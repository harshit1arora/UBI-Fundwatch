import { motion } from "framer-motion";

interface RiskScoreGaugeProps {
  score: number;
  label?: string;
  size?: "sm" | "md" | "lg";
}

export function RiskScoreGauge({ score, label = "Risk Score", size = "md" }: RiskScoreGaugeProps) {
  const sizes = { sm: 80, md: 128, lg: 160 };
  const s = sizes[size];
  const half = s / 2;
  const strokeWidth = size === "sm" ? 6 : 8;
  const radius = half - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 70) return "text-destructive";
    if (score >= 40) return "text-warning";
    return "text-success";
  };

  const getStroke = () => {
    if (score >= 70) return "hsl(0, 84%, 60%)";
    if (score >= 40) return "hsl(38, 92%, 50%)";
    return "hsl(142, 71%, 45%)";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: s, height: s }}>
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${s} ${s}`}>
          <circle
            cx={half}
            cy={half}
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={half}
            cy={half}
            r={radius}
            fill="none"
            stroke={getStroke()}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className={`font-black tabular-nums ${getColor()} ${
              size === "sm" ? "text-lg" : size === "md" ? "text-3xl" : "text-4xl"
            }`}
          >
            {score}
          </motion.span>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
