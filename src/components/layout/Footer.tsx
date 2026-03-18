import { Shield, ExternalLink, Mail, Phone, Globe } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="relative mt-auto border-t border-border/40 bg-card/30 backdrop-blur-md px-6 py-12 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10 translate-x-1/2 translate-y-1/2" />
      
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Shield size={20} />
            </div>
            <span className="text-xl font-black tracking-tighter italic uppercase text-foreground">
              UBI <span className="text-primary">FundWatch</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed font-medium max-w-xs">
            Next-generation AI-powered Anti-Money Laundering and Fraud Detection suite. Secure, Intelligent, and Compliant.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a href="#" className="p-2 bg-secondary rounded-lg hover:text-primary transition-colors border group"><Globe size={16} /></a>
            <a href="#" className="p-2 bg-secondary rounded-lg hover:text-primary transition-colors border group"><Phone size={16} /></a>
            <a href="#" className="p-2 bg-secondary rounded-lg hover:text-primary transition-colors border group"><Mail size={16} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-6">Internal Hub</h4>
          <ul className="space-y-3">
            {['Dashboard', 'Intelligence Feed', 'Transaction Chain', 'Mule Engine'].map((link) => (
              <li key={link}>
                <a href="#" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group">
                   <div className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />
                   {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
           <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-6">Legal & Regulatory</h4>
           <ul className="space-y-3">
            {['Privacy Protocol', 'Compliance Policy', 'FIU Reporting', 'AML Standards'].map((link) => (
              <li key={link}>
                <a href="#" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group">
                   <div className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />
                   {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-primary/5 border border-primary/10 rounded-3xl p-6 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
              <Shield size={60} />
           </div>
           <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">System Integrity</h4>
           <p className="text-[10px] font-bold text-muted-foreground/80 leading-relaxed italic pr-8">
             Enterprise Grade Encryption (AES-256-GCM) active. All investigations are strictly audited for FIU compliance.
           </p>
           <button className="mt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
              Read Security Audit <ExternalLink size={10} />
           </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
           © {year} Union Bank of India · Intelligence Division
        </p>
        <div className="flex items-center gap-6">
           <a href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors italic">Privacy Policy</a>
           <a href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors italic">Terms of Intel</a>
           <a href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors italic">Cookie Vault</a>
        </div>
      </div>
    </footer>
  );
}
