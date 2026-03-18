import { motion } from "framer-motion";
import { FileSearch, ArrowRight, Clock, FileText, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { generateForensicPDF } from "@/utils/reportGenerator";

const chain = [
  { account: "9182...501", name: "Rajesh Kumar Enterprises", amount: "₹18,50,000", time: "10:32 AM", type: "RTGS", risk: "High" },
  { account: "8821...002", name: "Sunrise Trading Co.", amount: "₹17,80,000", time: "10:34 AM", type: "NEFT", risk: "High" },
  { account: "7712...993", name: "Meera Textiles Pvt Ltd", amount: "₹16,90,000", time: "10:37 AM", type: "NEFT", risk: "High" },
  { account: "6601...114", name: "Global Imports Inc.", amount: "₹15,50,000", time: "10:41 AM", type: "UPI", risk: "Medium" },
  { account: "5590...225", name: "Vikram Associates", amount: "₹14,20,000", time: "10:48 AM", type: "NEFT", risk: "Medium" },
];

const riskColor: Record<string, string> = {
  High: "bg-destructive/20 text-destructive border border-destructive/30",
  Medium: "bg-warning/20 text-warning border border-warning/30",
  Low: "bg-success/20 text-success border border-success/30",
};

export default function InvestigationPage() {
  const navigate = useNavigate();
  return (
    <div className="p-4 lg:p-8 max-w-[1600px] mx-auto space-y-8 w-full min-h-screen bg-[#020617]">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileSearch className="w-6 h-6 text-primary" /> Investigation
          </h1>
          <p className="text-sm text-white/50 mt-1">Complete transaction chain analysis for Case #INV-2024-0891</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/intel/briefing')}
            className="flex items-center gap-2 px-5 py-3 bg-white/5 text-white rounded-xl font-bold text-sm hover:bg-white/10 transition-all border border-white/10 shadow-sm group"
          >
            <Sparkles className="w-4 h-4 text-primary group-hover:animate-pulse" />
            AI Case Briefing
          </button>
          <button 
            onClick={() => {
              const reportPromise = new Promise((resolve) => {
                setTimeout(() => {
                   generateForensicPDF({
                    title: "FIU Compliance Summary",
                    caseId: "INV-2024-0891",
                    date: "18 March 2024",
                    investigator: "AK Sharma",
                    summary: `Automated investigation summary compiled for transaction chain INV-2024-0891. Structural patterns indicate potential smurfing behavior across 5 controlled nodes.`,
                    transactions: chain.map(c => ({
                      from: c.account,
                      to: "Next Hop",
                      amount: c.amount,
                      date: "Current session",
                      status: c.risk
                    })),
                    findings: [
                        "Velocity: 5 hops in 16 minutes",
                        "Risk: 3 nodes flagged at High systemic risk",
                        "Volume: ₹82.9L tracked across consolidated entities"
                    ]
                  });
                  resolve({ name: "FIU Case File" });
                }, 2000);
              });

              toast.promise(reportPromise, {
                loading: 'Compiling Intelligence Hub data & generating case file...',
                success: (data) => {
                  return `FIU Compliance Report generated successfully. PDF Downloaded.`;
                },
                error: 'Failed to generate report.',
              });
            }}
            className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            <FileText className="w-4 h-4" />
            Generate FIU Report
          </button>
        </div>
      </div>

      {/* Transaction Chain Visual */}
      <div className="bg-white/[0.02] rounded-[2rem] border border-white/5 p-8 shadow-2xl backdrop-blur-sm">
        <h3 className="font-bold text-lg text-white mb-6">Transaction Chain</h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          <div className="space-y-0">
            {chain.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12, duration: 0.4 }}
              >
                <div className="flex items-start gap-4 md:gap-6 relative pb-8">
                  {/* Node */}
                  <div className="relative z-10 hidden md:flex">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold border-4 border-[#020617] ${riskColor[item.risk]}`}>
                      {i + 1}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.08] transition-all group">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-white group-hover:text-primary transition-colors">{item.name}</h4>
                        <p className="text-[10px] font-medium text-white/40 uppercase tracking-widest mt-0.5">{item.account}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-white text-lg">{item.amount}</div>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${riskColor[item.risk]}`}>
                          {item.risk} Risk
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4 text-[10px] font-medium text-white/50 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 opacity-60" /> {item.time}</span>
                      <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10">{item.type}</span>
                      {i < chain.length - 1 && (
                        <span className="text-white/30 ml-auto flex items-center gap-1.5 font-bold">
                          Loss: ₹{((parseFloat(item.amount.replace(/[₹,]/g, "")) - parseFloat(chain[i + 1].amount.replace(/[₹,]/g, ""))) / 100000).toFixed(1)}L
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Arrow connector */}
                {i < chain.length - 1 && (
                  <div className="flex md:hidden items-center justify-center py-1">
                    <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <SummaryCard title="Total Amount Moved" value="₹82,90,000" subtitle="Across 5 transactions" />
        <SummaryCard title="Amount Lost in Chain" value="₹4,30,000" subtitle="Decreasing pattern detected" />
        <SummaryCard title="Time Span" value="16 min" subtitle="Unusually rapid for this volume" />
      </div>
    </div>
  );
}

function SummaryCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/[0.02] rounded-[2rem] border border-white/5 p-6 shadow-xl backdrop-blur-sm"
    >
      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{title}</p>
      <h3 className="text-2xl font-bold text-white mt-1.5">{value}</h3>
      <p className="text-[10px] font-medium text-white/30 mt-1 uppercase tracking-wider">{subtitle}</p>
    </motion.div>
  );
}
