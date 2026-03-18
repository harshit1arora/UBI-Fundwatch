import { motion } from "framer-motion";
import { Network, Fingerprint, Database, UserCheck, ShieldAlert, Cpu, Activity, User } from "lucide-react";

const proxyNodes = [
  { id: "p1", risk: 94, name: "Node Alpha", type: "Proxy", ip: "102.x.x.x", device: "iPhone 13", sharedParams: 4 },
  { id: "p2", risk: 88, name: "Node Beta", type: "Proxy", ip: "102.x.x.x", device: "Desktop Web", sharedParams: 3 },
  { id: "p3", risk: 91, name: "Node Gamma", type: "Proxy", ip: "103.x.x.x", device: "iPhone 13", sharedParams: 5 },
  { id: "p4", risk: 82, name: "Node Delta", type: "Proxy", ip: "102.x.x.x", device: "Android App", sharedParams: 2 },
];

export function HiddenControllerDetection() {
  return (
    <div className="bg-[#020617] rounded-[2rem] border border-white/5 p-8 lg:p-10 shadow-2xl relative overflow-hidden h-full">
      {/* Background Neural Motif */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="flex flex-col h-full relative z-10">
        <div className="flex items-start justify-between mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 rounded-full h-2 bg-warning animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Pattern Synthesis</span>
            </div>
             <h3 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
               Hidden Controller <span className="text-warning">Detection</span>
               <Network className="text-warning w-6 h-6" />
             </h3>
             <p className="text-sm font-medium text-white/40 leading-relaxed max-w-sm">
               Community detection via metadata analysis isolating a single controller entity manipulating multiple proxy nodes.
             </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl text-right backdrop-blur-md">
             <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Controller Confidence</div>
             <div className="text-3xl font-mono font-bold text-white italic">97.8%</div>
          </div>
        </div>

        {/* The Network Visualization */}
        <div className="flex-1 min-h-[300px] relative bg-black/40 border border-white/5 rounded-[1.5rem] flex items-center justify-center p-6 overflow-hidden my-4 group">
            
            {/* The Puppet Master (Center) */}
            <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
               className="relative z-20"
            >
               <div className="absolute inset-0 bg-destructive/30 rounded-full blur-2xl animate-pulse" />
               <div className="w-24 h-24 bg-white/5 border border-destructive/50 rounded-full flex flex-col items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.2)] backdrop-blur-xl relative group-hover:border-destructive transition-colors">
                  <User className="w-8 h-8 text-destructive mb-1" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/70">Master Node</span>
                  <span className="text-xs font-mono font-bold text-destructive">0x88...F2</span>
               </div>

                {/* Connections radiating outwards */}
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none -z-10 overflow-visible">
                    {proxyNodes.map((_, i) => {
                        const angle = (i * (360 / proxyNodes.length) * Math.PI) / 180;
                        const length = 140;
                        const x2 = 200 + Math.cos(angle) * length;
                        const y2 = 200 + Math.sin(angle) * length;
                        return (
                            <motion.line 
                                key={i}
                                x1="200" y1="200" x2={x2} y2={y2}
                                stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                            />
                        )
                    })}
                </svg>

                {/* Data Packets indicating control flow */}
                 {proxyNodes.map((_, i) => {
                    const angle = (i * (360 / proxyNodes.length) * Math.PI) / 180;
                    const length = 140;
                    const x2 = Math.cos(angle) * length;
                    const y2 = Math.sin(angle) * length;
                    return (
                        <motion.div
                            key={`packet-${i}`}
                            animate={{
                                x: [0, x2],
                                y: [0, y2],
                                opacity: [0, 1, 0]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: "linear" }}
                            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-warning -ml-1 -mt-1 shadow-[0_0_10px_rgba(234,179,8,1)]"
                        />
                    )
                 })}
            </motion.div>

            {/* The Proxies (Orbiting) */}
            {proxyNodes.map((node, i) => {
                const angle = (i * (360 / proxyNodes.length) * Math.PI) / 180;
                const radius = 140;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                    <motion.div
                        key={node.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                        className="absolute w-16 h-16 bg-white/5 border border-white/10 rounded-full flex flex-col items-center justify-center backdrop-blur-md cursor-help hover:border-warning/50 hover:bg-white/10 transition-all z-10"
                        style={{ transform: `translate(${x}px, ${y}px)` }}
                        title={`Shared Params: ${node.sharedParams}\nIP: ${node.ip}`}
                    >
                        <UserCheck className="w-5 h-5 text-white/60 mb-1 group-hover:text-warning" />
                        <span className="text-[8px] font-mono text-white/40">{node.id}</span>
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#020617] border border-white/10 flex items-center justify-center">
                           <span className="text-[7px] font-bold text-destructive">{node.sharedParams}</span>
                        </div>
                    </motion.div>
                )
            })}
        </div>

        {/* Metadata Analysis Feed */}
        <div className="mt-4 bg-white/5 rounded-[1.5rem] border border-white/10 p-5 backdrop-blur-sm">
           <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mb-4 flex items-center gap-2">
              <Database size={12} /> Live Metadata Intersection
           </h4>
           <div className="space-y-3">
             {[
               { trace: "Identical IMEI detected across 3 nodes", match: "Device Level", confidence: "99%", icon: Cpu },
               { trace: "Same subnet IP accessing accounts sequentially", match: "Network Level", confidence: "94%", icon: Activity },
               { trace: "Shared secondary recovery email pattern", match: "Identity Level", confidence: "88%", icon: Fingerprint }
             ].map((log, i) => (
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.5 + i * 0.2 }}
                  key={i} 
                  className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/[0.05]"
                >
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/50 border border-white/5">
                         <log.icon size={14} />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-white/80">{log.trace}</p>
                         <p className="text-[9px] font-bold uppercase tracking-widest text-warning/70 mt-0.5">{log.match}</p>
                      </div>
                   </div>
                   <div className="text-right pl-4">
                      <span className="text-xs font-mono font-bold text-white">{log.confidence}</span>
                   </div>
                </motion.div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
