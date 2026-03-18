import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, Cpu, Lock, User, Mail, Building, Sparkles, Fingerprint, Globe } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Verifying identity protocols...");
    
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success(isLogin ? "Session established, Lead Investigator." : "Access Request submitted successfully.", {
        icon: <Fingerprint className="text-[#0467FF] w-4 h-4" />
      });
      navigate("/");
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-4 relative overflow-hidden font-display selection:bg-[#0467FF]/10 selection:text-[#0467FF]">
      {/* Immersive Background Layers - Light Mode */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/auth-hero-light.png')] bg-cover bg-center opacity-40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white/40 to-slate-50/50" />
        
        {/* Soft Mesh Gradients */}
        <motion.div 
            animate={{ 
                x: [-20, 20, -20],
                y: [-20, 20, -20],
                rotate: [0, 5, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-[#0467FF]/5 rounded-full blur-[120px]" 
        />
        <motion.div 
            animate={{ 
                x: [20, -20, 20],
                y: [20, -20, 20],
                rotate: [0, -5, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-slate-200/40 rounded-full blur-[100px]" 
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1250px] grid lg:grid-cols-2 gap-20 items-center">
        
        {/* Left: Branding & Status (Clean/Light) */}
        <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="hidden lg:block space-y-10"
        >
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 bg-white border border-slate-200/60 p-3 rounded-2xl flex items-center justify-center shadow-xl shadow-slate-200/40 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <img src="/fundwatch-logo.png" alt="Logo" className="w-full h-full object-contain" />
             </div>
             <div className="space-y-0.5">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">UBI <span className="text-[#0467FF]">FundWatch</span></h1>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mt-1 leading-none">Intelligence Hub Console</p>
             </div>
          </div>

          <div className="space-y-6">
             <h2 className="text-6xl font-black text-slate-950 tracking-[ -0.04em] leading-[0.95]">
                Intelligent <span className="text-slate-400">Fund Tracking.</span><br />
                Secured by <span className="text-[#0467FF] relative">
                    Neural AI
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 1, duration: 1 }}
                        className="absolute bottom-1 left-0 h-2 bg-[#0467FF]/10 -z-10" 
                    />
                </span>
             </h2>
             <p className="text-slate-500/90 max-w-md text-lg font-medium leading-[1.6]">
                Empowering India's investigators with next-gen Hawala detection, rapid fund chain analysis, and automated regulatory compliance.
             </p>
          </div>

          <div className="flex gap-4 pt-4">
             {[
                { label: "AI Core", icon: Cpu, val: "99.9%" },
                { label: "Encryption", icon: Lock, val: "AES-256" },
                { label: "Global Node", icon: Globe, val: "Active" }
             ].map((feature, i) => (
                <div key={i} className="flex flex-col gap-1 p-5 rounded-3xl bg-white/60 border border-slate-200/50 shadow-sm backdrop-blur-md min-w-[130px] group hover:border-[#0467FF]/30 transition-all duration-300">
                   <feature.icon className="w-5 h-5 text-[#0467FF]/60 group-hover:text-[#0467FF] transition-colors" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">{feature.label}</span>
                   <span className="text-sm font-bold text-slate-900">{feature.val}</span>
                </div>
             ))}
          </div>
        </motion.div>

        {/* Right: Premium Light Form */}
        <div className="relative">
           {/* Sophisticated Glow shadows */}
           <div className="absolute -inset-10 bg-[#0467FF]/5 rounded-[4rem] blur-[100px] opacity-0 group-hover:opacity-100 transition duration-1000" />
           
           <motion.div
             initial={{ opacity: 0, scale: 0.98, y: 30 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="relative bg-white/70 backdrop-blur-3xl border border-white rounded-[3rem] p-8 lg:p-12 shadow-[0_22px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden"
           >
             <div className="relative z-10">
               <div className="flex items-center justify-between mb-12">
                  <div className="space-y-1">
                     <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#0467FF] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#0467FF]">Secure Session Initiation</span>
                     </div>
                     <h3 className="text-4xl font-black text-slate-900 tracking-tight">
                        {isLogin ? "Sign In" : "Register Access"}
                     </h3>
                  </div>
                  <Sparkles className="text-[#0467FF]/20 w-10 h-10" />
               </div>

               <AnimatePresence mode="wait">
                 <motion.form
                   key={isLogin ? 'login' : 'signup'}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   onSubmit={handleSubmit}
                   className="space-y-6"
                 >
                   {!isLogin && (
                     <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 ml-1">Full Name</label>
                       <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300 group-focus-within:text-[#0467FF] transition-colors" />
                          <input required type="text" placeholder="e.g. Ashish Kumar" className="w-full bg-slate-50 border border-slate-200/60 rounded-2xl py-4.5 pl-12 pr-6 text-slate-900 text-sm font-bold focus:bg-white focus:border-[#0467FF]/50 focus:ring-4 focus:ring-[#0467FF]/5 outline-none transition-all placeholder:text-slate-300 shadow-sm shadow-slate-100/50" />
                       </div>
                     </div>
                   )}

                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 ml-1">Official Investigator Email</label>
                     <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300 group-focus-within:text-[#0467FF] transition-colors" />
                        <input required type="email" placeholder="official@ubifundwatch.com" className="w-full bg-slate-50 border border-slate-200/60 rounded-2xl py-4.5 pl-12 pr-6 text-slate-900 text-sm font-bold focus:bg-white focus:border-[#0467FF]/50 focus:ring-4 focus:ring-[#0467FF]/5 outline-none transition-all placeholder:text-slate-300 shadow-sm shadow-slate-100/50" />
                     </div>
                   </div>

                   <div className="space-y-2">
                     <div className="flex justify-between items-center px-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Security Passphrase</label>
                        {isLogin && <button type="button" className="text-[10px] font-bold text-[#0467FF] hover:underline transition-all uppercase">Forgot Passphrase?</button>}
                     </div>
                     <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300 group-focus-within:text-[#0467FF] transition-colors" />
                        <input required type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200/60 rounded-2xl py-4.5 pl-12 pr-6 text-slate-900 text-sm font-bold focus:bg-white focus:border-[#0467FF]/50 focus:ring-4 focus:ring-[#0467FF]/5 outline-none transition-all placeholder:text-slate-300 shadow-sm shadow-slate-100/50" />
                     </div>
                   </div>

                   {!isLogin && (
                     <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 ml-1">Division HQ Code</label>
                       <div className="relative group">
                          <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300 group-focus-within:text-[#0467FF] transition-colors" />
                          <input required type="text" placeholder="AML-MUM-HQ-01" className="w-full bg-slate-50 border border-slate-200/60 rounded-2xl py-4.5 pl-12 pr-6 text-slate-900 text-sm font-bold focus:bg-white focus:border-[#0467FF]/50 focus:ring-4 focus:ring-[#0467FF]/5 outline-none transition-all placeholder:text-slate-300 shadow-sm shadow-slate-100/50" />
                       </div>
                     </div>
                   )}

                   <button type="submit" className="w-full group relative py-5 bg-[#0467FF] text-white font-black rounded-2xl overflow-hidden hover:opacity-95 transition-all flex items-center justify-center gap-3 mt-4 active:scale-[0.985] shadow-xl shadow-[#0467FF]/30">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      <span className="uppercase tracking-[0.25em] text-[11px] font-black">{isLogin ? "Authenticate Hub Access" : "Submit Authorization Request"}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </button>
                 </motion.form>
               </AnimatePresence>

               <div className="mt-10 pt-10 border-t border-slate-100 flex flex-col items-center gap-5">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                     {isLogin ? "Institutional Access Required?" : "Already Authorized?"}
                  </p>
                  <button 
                    onClick={() => setIsLogin(!isLogin)} 
                    className="group flex items-center gap-2 text-[11px] font-black text-slate-900 hover:text-[#0467FF] transition-all uppercase tracking-widest"
                  >
                    {isLogin ? "Apply for Investigation Clearance" : "Return to Secure Login"}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
             </div>
           </motion.div>
           
           {/* Security Footer - Clean Light Version */}
           <div className="mt-8 flex items-center justify-center gap-8 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
               <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-900">
                  <ShieldCheck size={14} className="text-[#0467FF]" /> FIU Compliant
               </div>
               <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-900">
                  <Globe size={14} className="text-[#0467FF]" /> PCI-DSS-Ready
               </div>
               <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-900">
                  <Sparkles size={14} className="text-[#0467FF]" /> ISO 27001
               </div>
           </div>
        </div>
      </div>
    </div>
  );
}
