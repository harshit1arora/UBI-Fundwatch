import { motion } from "framer-motion";
import { FileText, Download, Eye, Calendar, User, AlertTriangle, ArrowLeftRight } from "lucide-react";
import { toast } from "sonner";
import { generateForensicPDF } from "@/utils/reportGenerator";

const report = {
  caseId: "INV-2024-0891",
  date: "15 March 2024",
  investigator: "AK Sharma",
  accountSummary: {
    name: "Rajesh Kumar Enterprises",
    accountNo: "918273645501",
    branch: "Mumbai — Nariman Point",
    opened: "12 Jan 2019",
    type: "Current Account",
    avgBalance: "₹4,20,000",
  },
  patterns: [
    { type: "Rapid Fund Movement", confidence: 94, description: "12 transactions in 47 minutes totaling ₹18.5 Cr, far exceeding normal patterns." },
    { type: "Smurfing / Structuring", confidence: 82, description: "Multiple deposits structured just below ₹10L reporting threshold." },
    { type: "Round-Tripping", confidence: 76, description: "Funds returned to originator via 3 intermediary accounts within 2 hours." },
  ],
  trail: [
    { from: "9182...501", to: "8821...002", amount: "₹12,50,000", date: "15 Mar 2024, 10:32 AM" },
    { from: "8821...002", to: "7712...993", amount: "₹11,90,000", date: "15 Mar 2024, 10:34 AM" },
    { from: "7712...993", to: "6601...114", amount: "₹11,50,000", date: "15 Mar 2024, 10:37 AM" },
    { from: "6601...114", to: "5590...225", amount: "₹10,80,000", date: "15 Mar 2024, 10:41 AM" },
  ],
};

export default function ReportsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8 min-h-screen bg-[#020617]">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" /> FIU Intelligence Report
          </h1>
          <p className="text-[10px] font-bold text-white/40 mt-1 uppercase tracking-widest leading-none">Case #{report.caseId} · Issued {report.date}</p>
        </div>
        <div className="flex gap-2">
          <button 
             onClick={() => {
                toast("Generating Preview", { 
                    description: "Optimizing report for interactive view...",
                    duration: 2000 
                });
                setTimeout(() => {
                    toast.success("Preview Ready", { description: "Report preview loaded in virtual secure container." });
                }, 2000);
             }}
             className="flex items-center gap-2 px-4 py-2.5 bg-white/5 text-white/50 rounded-xl font-bold text-[10px] uppercase tracking-wider hover:bg-white/10 hover:text-white border border-white/10 transition-all">
            <Eye className="w-4 h-4" /> Preview
          </button>
          <button 
            onClick={() => {
              generateForensicPDF({
                title: "FIU Intelligence Hub Report",
                caseId: report.caseId,
                date: report.date,
                investigator: report.investigator,
                summary: `Suspicious activity investigation for account ${report.accountSummary.accountNo}. Patterns detected include rapid fund movement and structuring behavior typical of mule networks.`,
                transactions: report.trail.map(t => ({
                  from: t.from,
                  to: t.to,
                  amount: t.amount,
                  date: t.date,
                  status: "Flagged"
                })),
                findings: report.patterns.map(p => `${p.type}: ${p.description} (${p.confidence}% confidence)`)
              });
              toast.success("Download Complete", { description: "Your FIU report has been saved." });
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-bold text-[10px] uppercase tracking-wider hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-white/[0.02] rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden backdrop-blur-sm">
        {/* Report Header */}
        <div className="bg-white/5 border-b border-white/10 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-lg shadow-primary/5">
              <AlertTriangle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white uppercase tracking-tight">Suspicious Transaction Report</h2>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-0.5">Financial Intelligence Unit — India</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-[10px] font-bold uppercase tracking-widest">
            <div>
              <span className="text-white/20">Case Reference</span>
              <p className="text-white mt-1">{report.caseId}</p>
            </div>
            <div>
              <span className="text-white/20">Authorized Date</span>
              <p className="text-white mt-1 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 opacity-50" /> {report.date}</p>
            </div>
            <div>
              <span className="text-white/20">Lead Investigator</span>
              <p className="text-white mt-1 flex items-center gap-1.5"><User className="w-3.5 h-3.5 opacity-50" /> {report.investigator}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Account Summary */}
          <Section title="Account Summary">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(report.accountSummary).map(([key, val]) => (
                <div key={key}>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <p className="text-sm font-medium text-foreground mt-0.5">{val}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Suspicious Patterns */}
          <Section title="Suspicious Patterns Detected">
            <div className="space-y-3">
              {report.patterns.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/[0.08] transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-white text-sm group-hover:text-primary transition-colors">{p.type}</h4>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      p.confidence >= 80 ? "bg-destructive/20 text-destructive border border-destructive/30" : "bg-warning/20 text-warning border border-warning/30"
                    }`}>
                      {p.confidence}% confidence
                    </span>
                  </div>
                  <p className="text-xs font-medium text-white/60 leading-relaxed uppercase tracking-wide opacity-80">{p.description}</p>
                  {/* Progress bar */}
                  <div className="mt-3 h-1.5 bg-border rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.confidence}%` }}
                      transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
                      className={`h-full rounded-full ${p.confidence >= 80 ? "bg-destructive" : "bg-warning"}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Transaction Trail */}
          <Section title="Transaction Trail">
            <div className="space-y-3">
              {report.trail.map((t, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.03] text-xs hover:bg-white/5 transition-all">
                  <div className="flex items-center gap-4">
                    <ArrowLeftRight className="w-4 h-4 text-primary" />
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-white/30 uppercase tracking-widest text-[9px]">{t.from}</span>
                      <span className="text-primary font-bold">→</span>
                      <span className="font-bold text-white/30 uppercase tracking-widest text-[9px]">{t.to}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white text-sm">{t.amount}</div>
                    <div className="text-[9px] font-bold text-white/20 uppercase tracking-wider mt-0.5">{t.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-5 flex items-center gap-2.5">
        <div className="w-1 h-4 bg-primary rounded-full shadow-[0_0_8px_rgba(4,103,255,0.4)]" />
        {title}
      </h3>
      {children}
    </div>
  );
}
