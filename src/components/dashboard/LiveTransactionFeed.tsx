import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, Clock, DollarSign, Fingerprint } from "lucide-react";
import { useNavigate } from "react-router-dom";

const transactions = [
  { id: "TX-4821", amount: "₹4,82,000", type: "out", status: "Flagged", time: "10:42:01", entity: "Aman Gupta" },
  { id: "TX-4822", amount: "₹12,40,000", type: "in", status: "Verified", time: "10:41:45", entity: "Shell Co Alpha" },
  { id: "TX-4823", amount: "₹2,15,000", type: "out", status: "Review", time: "10:40:12", entity: "Bridge Node 4" },
  { id: "TX-4824", amount: "₹8,50,000", type: "in", status: "Verified", time: "10:38:55", entity: "Tech Corp B" },
];

export function LiveTransactionFeed() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#020617] rounded-[2rem] border border-white/5 p-8 shadow-2xl overflow-hidden relative group h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-white/50 flex items-center gap-2">
          <Clock size={16} className="text-primary" /> Live Operational Feed
        </h3>
        <span className="text-[10px] bg-success/10 text-success px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-success/20">Synced</span>
      </div>

      <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
        {transactions.map((tx, i) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.type === 'out' ? 'bg-destructive/10 text-destructive' : 'bg-success/10 text-success'} border border-current/20`}>
                {tx.type === 'out' ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
              </div>
              <div>
                <p className="text-xs font-bold text-white">{tx.amount}</p>
                <p className="text-[10px] text-white/50 font-medium">{tx.entity}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold font-mono text-white/40 mb-1">{tx.time}</p>
              <div className="flex items-center gap-1 justify-end">
                <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full border ${
                  tx.status === 'Flagged' ? 'bg-destructive/10 text-destructive border-destructive/20' : 
                  tx.status === 'Review' ? 'bg-warning/10 text-warning border-warning/20' : 
                  'bg-success/10 text-success border-success/20'
                }`}>
                  {tx.status}
                </span>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded">
                  <Fingerprint size={10} className="text-primary" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button 
        onClick={() => navigate('/fund-flow')}
        className="w-full mt-4 py-2 text-[10px] font-bold text-primary uppercase border border-primary/20 rounded-lg hover:bg-primary/5 transition-all"
      >
        View Full Transaction Log
      </button>
    </div>
  );
}
