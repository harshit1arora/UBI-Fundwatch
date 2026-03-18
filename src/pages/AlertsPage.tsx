import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, X, Clock, TrendingUp, Ban, SendToBack, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { RiskScoreGauge } from "@/components/shared/RiskScoreGauge";

interface Alert {
  id: string;
  accountId: string;
  accountName: string;
  riskScore: number;
  fraudType: string;
  timestamp: string;
  amount: string;
  details: string;
}

const alertsData: Alert[] = [
  { id: "ALT-2841", accountId: "9182...501", accountName: "Rajesh Kumar Enterprises", riskScore: 92, fraudType: "Rapid Fund Movement", timestamp: "2024-03-15 10:32 AM", amount: "₹18,50,000", details: "12 transactions in 47 minutes across 8 different accounts." },
  { id: "ALT-2840", accountId: "8821...002", accountName: "Sunrise Trading Co.", riskScore: 85, fraudType: "Round-Tripping", timestamp: "2024-03-15 10:18 AM", amount: "₹12,50,000", details: "Funds returned to originating account through 3 intermediaries." },
  { id: "ALT-2839", accountId: "7712...993", accountName: "Meera Textiles Pvt Ltd", riskScore: 78, fraudType: "Structuring", timestamp: "2024-03-15 10:04 AM", amount: "₹9,90,000", details: "Multiple deposits just under ₹10L reporting threshold." },
  { id: "ALT-2838", accountId: "6601...114", accountName: "Global Imports Inc.", riskScore: 72, fraudType: "Shell Company Link", timestamp: "2024-03-15 09:45 AM", amount: "₹25,00,000", details: "Connected to 3 known shell company accounts in Mumbai." },
  { id: "ALT-2837", accountId: "5590...225", accountName: "Vikram Associates", riskScore: 55, fraudType: "Unusual Volume", timestamp: "2024-03-15 09:30 AM", amount: "₹8,20,000", details: "Transaction volume 400% above monthly average." },
  { id: "ALT-2836", accountId: "4489...336", accountName: "Lakshmi Electronics", riskScore: 48, fraudType: "Dormant Activation", timestamp: "2024-03-15 09:15 AM", amount: "₹5,50,000", details: "Account reactivated after 18 months of dormancy." },
  { id: "ALT-2835", accountId: "3378...447", accountName: "Patel & Sons Trading", riskScore: 35, fraudType: "Geographic Anomaly", timestamp: "2024-03-15 09:00 AM", amount: "₹3,80,000", details: "Transactions from 4 different states within 2 hours." },
];

function getRiskLevel(score: number) {
  if (score >= 70) return { label: "High", style: "bg-destructive/10 text-destructive border-destructive/20" };
  if (score >= 40) return { label: "Medium", style: "bg-warning/10 text-warning border-warning/20" };
  return { label: "Low", style: "bg-success/10 text-success border-success/20" };
}

function getRowAccent(score: number) {
  if (score >= 70) return "border-l-destructive";
  if (score >= 40) return "border-l-warning";
  return "border-l-success";
}

export default function AlertsPage() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const navigate = useNavigate();

  return (
    <div className="p-4 lg:p-8 max-w-[1600px] mx-auto space-y-10 w-full min-h-screen">
      {/* Premium Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-border/40">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-destructive animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60 leading-none">Intelligence Feed</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground leading-none flex items-center gap-3">
             Threat <span className="text-destructive">Command</span>
             <ShieldAlert className="text-destructive w-6 h-6 animate-pulse" />
          </h1>
          <p className="text-sm font-medium text-muted-foreground/80 tracking-tight">Real-time fraud heuristics & automated response center</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="hidden lg:flex flex-col items-end mr-6 border-r border-border/50 pr-6">
              <span className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-widest">Active Scanning</span>
              <span className="text-xl font-bold text-foreground font-mono">1,402 <span className="text-xs text-muted-foreground/30 ml-1">nodes</span></span>
           </div>
           
           <div className="flex gap-1.5 bg-secondary/50 p-1.5 rounded-[1.25rem] border border-border/40">
            {["All", "High", "Medium", "Low"].map((f) => (
              <button
                key={f}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${
                   f === 'All' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                {f}
              </button>
            ))}
           </div>
        </div>
      </header>

      {/* Modern Card-Based Table */}
      <div className="space-y-4">
        {alertsData.map((alert, i) => {
          const risk = getRiskLevel(alert.riskScore);
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedAlert(alert)}
              className="group bg-card rounded-[2rem] border border-border/50 p-6 flex flex-col md:flex-row items-center gap-6 cursor-pointer hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 transition-all relative overflow-hidden"
            >
               {/* Background Glow */}
               <div className={`absolute top-0 left-0 w-1.5 h-full ${alert.riskScore >= 70 ? 'bg-destructive' : (alert.riskScore >= 40 ? 'bg-warning' : 'bg-success')}`} />
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

               <div className="shrink-0">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl border transition-transform group-hover:scale-110 ${alert.riskScore >= 70 ? 'bg-destructive/10 border-destructive/20 text-destructive' : 'bg-warning/10 border-warning/20 text-warning'}`}>
                     {alert.riskScore}
                  </div>
               </div>

               <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-3">
                     <h3 className="text-lg font-bold text-foreground">{alert.accountName}</h3>
                     <span className="text-[10px] font-medium text-muted-foreground/60 tracking-wider">{alert.id}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] font-medium text-muted-foreground">
                     <span className="flex items-center gap-1.5 bg-secondary/80 px-2 py-0.5 rounded-md font-semibold">{alert.fraudType}</span>
                     <span className="opacity-60">{alert.accountId}</span>
                  </div>
               </div>

               <div className="shrink-0 text-center md:text-right px-8 border-x border-border/40 space-y-1">
                  <p className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider leading-none">Transaction Value</p>
                  <p className="text-xl font-bold text-foreground leading-none">{alert.amount}</p>
               </div>

               <div className="shrink-0 flex flex-col items-center md:items-end gap-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider bg-secondary p-1.5 rounded-lg border border-border/50">
                    <Clock size={12} className="text-primary" />
                    {alert.timestamp.split(' ').slice(-2).join(' ')}
                  </div>
                  <button className="bg-primary text-white text-[9px] font-semibold uppercase tracking-wider px-4 py-2 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 shadow-lg shadow-primary/20">
                     View Intelligence
                  </button>
               </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAlert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl border shadow-elevated max-w-lg w-full p-6 space-y-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold text-foreground">{selectedAlert.accountName}</h2>
                  <p className="text-sm text-muted-foreground">{selectedAlert.accountId} · {selectedAlert.id}</p>
                </div>
                <button onClick={() => setSelectedAlert(null)} className="p-1.5 hover:bg-secondary rounded-lg transition-colors">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="flex items-center gap-6">
                <RiskScoreGauge score={selectedAlert.riskScore} size="sm" />
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-destructive" />
                    <span className="font-medium text-foreground">{selectedAlert.fraudType}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {selectedAlert.timestamp}
                  </div>
                  <div className="text-lg font-semibold text-foreground">{selectedAlert.amount}</div>
                </div>
              </div>

              <div className="p-4 bg-secondary/50 rounded-xl border">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">AI Analysis</h4>
                <p className="text-sm text-foreground/80 leading-relaxed">{selectedAlert.details}</p>
              </div>

              {/* Intervention Actions */}
              <div className="space-y-3 pt-4 border-t">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-primary" /> Rapid Interventions
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button 
                    onClick={() => {
                      const notificationPromise = new Promise((resolve) => {
                        setTimeout(() => resolve({ name: "AI Smart-Intervention" }), 2000);
                      });

                      toast.promise(notificationPromise, {
                        loading: 'Freezing account & drafting AI notice...',
                        success: (data) => {
                          return `Account locked. Customer notified via AI-drafted SMS.`;
                        },
                        error: 'Failed to notify customer.',
                      });
                      
                      setSelectedAlert(null);
                    }}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive text-destructive hover:text-white transition-all border border-destructive/20 gap-2 cursor-pointer group"
                  >
                    <Ban className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                    <span className="text-xs font-bold text-center leading-tight">Freeze<br/>Account</span>
                  </button>
                  <button 
                    onClick={() => {
                      toast.warning("Outbound Blocked", { 
                        description: `RTGS/NEFT blocked. AI intervention email sent to branch manager.` 
                      });
                      setSelectedAlert(null);
                    }}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-warning/10 text-warning hover:bg-warning hover:text-white transition-all border border-warning/20 gap-2 cursor-pointer group"
                  >
                    <SendToBack className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                    <span className="text-xs font-bold text-center leading-tight">Block<br/>Transfers</span>
                  </button>
                  <button 
                    onClick={() => {
                      toast.success("Verification Requested", { 
                        description: `Automated AI KYC verification link sent to ${selectedAlert.accountName}.` 
                      });
                      setSelectedAlert(null);
                    }}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all border border-primary/20 gap-2 cursor-pointer group"
                  >
                    <Building2 className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                    <span className="text-xs font-bold text-center leading-tight">Branch<br/>Verify</span>
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => navigate("/investigation")}
                  className="flex-1 py-3 bg-secondary text-foreground rounded-xl font-bold text-sm hover:opacity-90 transition-all border shadow-sm">
                  Deep Investigate
                </button>
                <button 
                  onClick={() => {
                    toast.success("Alert dismissed.");
                    setSelectedAlert(null);
                  }}
                  className="flex-1 py-3 bg-secondary/50 text-muted-foreground rounded-xl font-bold text-sm hover:bg-secondary transition-all">
                  Dismiss
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
