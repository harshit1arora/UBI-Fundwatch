import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const nodes = [
  { id: 1, x: 50, y: 50, r: 8, color: "destructive", label: "A" },
  { id: 2, x: 25, y: 35, r: 6, color: "primary", label: "B" },
  { id: 3, x: 75, y: 30, r: 6, color: "primary", label: "C" },
  { id: 4, x: 30, y: 70, r: 7, color: "warning", label: "D" },
  { id: 5, x: 70, y: 72, r: 5, color: "primary", label: "E" },
  { id: 6, x: 15, y: 60, r: 5, color: "primary", label: "F" },
  { id: 7, x: 85, y: 55, r: 6, color: "destructive", label: "G" },
  { id: 8, x: 50, y: 20, r: 5, color: "primary", label: "H" },
];

const edges = [
  [1, 2], [1, 3], [1, 4], [1, 5], [2, 6], [3, 7], [1, 8], [4, 6], [5, 7], [2, 8], [3, 8],
];

const colorMap: Record<string, string> = {
  destructive: "hsl(0, 84%, 60%)",
  primary: "hsl(218, 85%, 30%)",
  warning: "hsl(38, 92%, 50%)",
};

export function NetworkGraph() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-card rounded-xl border shadow-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-foreground">Live Fraud Network Analysis</h3>
        <button 
          onClick={() => navigate("/fund-flow")}
          className="text-accent text-sm font-medium hover:underline underline-offset-4"
        >
          View Full Map →
        </button>
      </div>
      <div className="h-72 lg:h-80 bg-secondary/50 rounded-lg border border-dashed border-border relative overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {/* Edges */}
          {edges.map(([from, to], i) => {
            const a = nodes.find((n) => n.id === from)!;
            const b = nodes.find((n) => n.id === to)!;
            return (
              <motion.line
                key={`e-${i}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="hsl(var(--border))"
                strokeWidth="0.3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
              />
            );
          })}
          {/* Nodes */}
          {nodes.map((node, i) => (
            <motion.g key={node.id}>
              {/* Pulse ring for destructive */}
              {node.color === "destructive" && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  fill="none"
                  stroke={colorMap[node.color]}
                  strokeWidth="0.3"
                  initial={{ r: node.r, opacity: 0.6 }}
                  animate={{ r: node.r + 4, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill={colorMap[node.color]}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.06, type: "spring", stiffness: 200 }}
                onClick={() => toast("Node Analyzed", { description: `Account ${node.label} selected for deep network analysis.` })}
                className="cursor-pointer"
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
              <text
                x={node.x}
                y={node.y + 0.8}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="3"
                fontWeight="bold"
                className="pointer-events-none select-none"
              >
                {node.label}
              </text>
            </motion.g>
          ))}
        </svg>
        <div className="absolute bottom-3 left-3 bg-card/80 backdrop-blur p-2.5 rounded-lg border text-[10px] space-y-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive" /> Suspicious
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" /> Verified
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-warning" /> Under Review
          </div>
        </div>
      </div>
    </div>
  );
}
