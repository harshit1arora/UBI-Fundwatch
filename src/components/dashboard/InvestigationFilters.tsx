import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Filter, 
  ChevronDown, 
  ShieldAlert, 
  Settings2,
  Calendar,
  DollarSign,
  Layers,
  Sparkles
} from "lucide-react";

export function InvestigationFilters() {
  const [amount, setAmount] = useState(500000);
  const [types, setTypes] = useState({
    swift: true,
    crypto: true,
    ledger: false
  });

  return (
    <div className="space-y-6 flex flex-col h-full">
      {/* Filters Header */}
      <div className="bg-card rounded-[2rem] border border-border/50 p-6 shadow-xl shadow-black/5 flex flex-col gap-6">
        <div className="flex items-center gap-3 border-b border-border/50 pb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Filter size={20} />
          </div>
          <h3 className="text-lg font-black tracking-tight text-sidebar-primary uppercase">Investigation Filters</h3>
        </div>

        {/* Date Range */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
            <Calendar size={12} /> Date Range
          </label>
          <div className="relative group">
            <select className="w-full bg-secondary/50 border border-border/50 rounded-2xl py-3.5 px-4 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>Last 24 Hours</option>
              <option>Custom Range</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors" size={16} />
          </div>
        </div>

        {/* Amount Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
              <DollarSign size={12} /> Min. Amount (₹)
            </label>
            <span className="text-xs font-black text-primary font-mono bg-primary/10 px-2 py-0.5 rounded-lg border border-primary/20">
              ₹{(amount / 100000).toFixed(1)}L+
            </span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="1000000" 
            step="50000"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary" 
          />
          <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase opacity-50 px-1">
            <span>₹0</span>
            <span>₹10L+</span>
          </div>
        </div>

        {/* Transaction Types */}
        <div className="space-y-4 pt-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
            <Layers size={12} /> Transaction Type
          </label>
          <div className="space-y-3">
            {[
              { id: 'swift', label: 'SWIFT Transfers' },
              { id: 'crypto', label: 'Crypto Gateway' },
              { id: 'ledger', label: 'Internal Ledger' }
            ].map((type) => (
              <label key={type.id} className="flex items-center gap-3 group cursor-pointer">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    checked={types[type.id as keyof typeof types]}
                    onChange={() => setTypes(t => ({ ...t, [type.id]: !t[type.id as keyof typeof types] }))}
                    className="peer appearance-none w-5 h-5 rounded-md border border-border group-hover:border-primary/50 checked:bg-primary checked:border-primary transition-all cursor-pointer"
                  />
                  <motion.div 
                    initial={false}
                    animate={{ scale: types[type.id as keyof typeof types] ? 1 : 0 }}
                    className="absolute text-white pointer-events-none"
                  >
                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="2 6 5 9 10 3" />
                    </svg>
                  </motion.div>
                </div>
                <span className={`text-sm font-bold transition-colors ${types[type.id as keyof typeof types] ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {type.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Active Monitoring Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-primary p-7 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl shadow-primary/30 group"
      >
        <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:scale-110 transition-transform duration-700">
           <ShieldAlert size={140} className="translate-x-12 translate-y-4" />
        </div>
        
        <div className="relative z-10 space-y-4">
           <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Active Monitoring</span>
           </div>
           
           <div className="space-y-1">
              <h4 className="text-4xl font-black tracking-tight leading-none italic">14 Flagged</h4>
              <p className="text-xl font-black uppercase tracking-widest opacity-90 leading-none">Nodes Detected</p>
           </div>
           
           <p className="text-sm font-medium leading-relaxed opacity-80 max-w-[200px]">
             System has detected high-velocity layering patterns in the current viewport.
           </p>

           <div className="pt-2">
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-all border border-white/20 px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                 Isolate Cluster <Sparkles size={12} className="fill-current" />
              </button>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
