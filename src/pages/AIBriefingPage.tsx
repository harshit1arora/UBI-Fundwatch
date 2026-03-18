import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  PlayCircle, 
  PauseCircle, 
  Mic, 
  MicOff, 
  Volume2, 
  Send,
  Sparkles,
  Command,
  Activity,
  ShieldCheck,
  Zap,
  ArrowRight,
  Globe,
  MessageSquare,
  Bot
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Language = "en-IN" | "hi-IN";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const briefingContent: Record<Language, string> = {
  "en-IN": "Investigator, Case #91B82 shows high-probability laundering. At 14:00 yesterday, three Mumbai accounts received structured deposits, consolidated into a single offshore entity. This matches a 'Round-Tripping' signature. I recommend an immediate freeze on Transaction #RX9203.",
  "hi-IN": "नमस्ते इन्वेस्टिगेटर। केस #91B82 में लॉन्ड्रिंग की उच्च संभावना है। कल दोपहर 2 बजे, तीन मुंबई खातों में पैसा आया और फिर उन्हें एक विदेशी खाते में भेज दिया गया। यह 'राउंड-ट्रिपिंग' का स्पष्ट मामला है। मैं तुरंत ट्रांजेक्शन #RX9203 को रोकने की सलाह देता हूँ।"
};

const aiResponses: Record<Language, string[]> = {
  "en-IN": [
    "I've cross-referenced this with previous mule activities in the same region. The pattern is 94% similar.",
    "The beneficiary account is registered under a shell entity in Cayman Islands. I've initiated a deep trace.",
    "Yes, I can freeze the funds immediately. Please confirm your authorization code.",
    "The total exposure is ₹18.5 Lakhs across 12 hops."
  ],
  "hi-IN": [
    "मैंने इसी क्षेत्र में पिछली संदिग्ध गतिविधियों के साथ इसकी तुलना की है। यह पैटर्न 94% समान है।",
    "लाभार्थी खाता केमैन आइलैंड्स में एक शेल कंपनी के नाम से पंजीकृत है। मैंने इसकी जांच शुरू कर दी है।",
    "हाँ, मैं तुरंत फंड फ्रीज कर सकता हूँ। कृपया अपने ऑथराइजेशन कोड की पुष्टि करें।",
    "कुल जोखिम ₹18.5 लाख है जो 12 अलग-अलग ट्रांजेक्शन में फैला हुआ है।"
  ]
};

export default function AIBriefingPage() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<Language>("en-IN");
  const [isBriefing, setIsBriefing] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [isBriefFinished, setIsBriefFinished] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, currentText]);

  const speak = (text: string, language: Language) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    
    // Attempt to find a good Indian voice
    let indianVoice;
    if (language === "en-IN") {
      indianVoice = voices.find(v => v.lang === "en-IN" && (v.name.includes("Neerja") || v.name.includes("Prabhat"))) || voices.find(v => v.lang === "en-IN");
    } else {
      indianVoice = voices.find(v => v.lang === "hi-IN" && (v.name.includes("Swara") || v.name.includes("Madhur"))) || voices.find(v => v.lang === "hi-IN");
    }
    
    if (indianVoice) utterance.voice = indianVoice;
    utterance.lang = language;
    utterance.pitch = 1.0;
    utterance.rate = 1.1;
    
    utterance.onend = () => {
      if (!isBriefFinished) {
        setIsBriefFinished(true);
        setIsBriefing(false);
        setMessages([{ role: "assistant", content: briefingContent[language] }]);
      }
      setIsTyping(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const startBriefing = () => {
    setIsBriefing(true);
    setIsBriefFinished(false);
    setMessages([]);
    setCurrentText("");
    
    let i = 0;
    const text = briefingContent[lang];
    const interval = setInterval(() => {
      if (i < text.length) {
        setCurrentText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 40);

    speak(text, lang);
  };

  const handleStopBrief = () => {
    window.speechSynthesis.cancel();
    setIsBriefing(false);
  };

  const handleSendMessage = (text = userInput) => {
    if (!text.trim()) return;
    
    const newMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(newMessages);
    setUserInput("");
    setIsTyping(true);

    // Simulated AI Response
    setTimeout(() => {
      const responses = aiResponses[lang];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages([...newMessages, { role: "assistant", content: randomResponse }]);
      speak(randomResponse, lang);
    }, 1500);
  };

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error("Speech Recognition not supported in this browser.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
      setIsListening(false);
      handleSendMessage(transcript);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  };

  return (
    <div className="min-h-screen bg-[#050b18] text-white flex overflow-hidden font-sans">
      <div className="flex w-full max-w-[1600px] mx-auto overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
      {/* Sidebar - Case Data */}
      <div className="w-85 border-r border-white/5 p-6 flex flex-col gap-6 bg-[#0a1121]/60 backdrop-blur-3xl z-20">
        <div className="space-y-4">
           <button onClick={() => navigate("/")} className="p-2 hover:bg-white/5 rounded-full transition-colors w-fit">
              <X size={20} className="text-white/60" />
           </button>
           <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center font-bold text-2xl text-primary border border-primary/30 shadow-lg shadow-primary/10">SI</div>
             <div>
               <h2 className="text-xl font-bold tracking-tight leading-none text-white">Sneha Iyer</h2>
               <div className="flex items-center gap-2 mt-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                 <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">Active Case Analyst</p>
               </div>
             </div>
           </div>
           
           <div className="bg-white/5 rounded-2xl p-4 border border-white/5 mt-4">
              <div className="flex items-center justify-between mb-3">
                 <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Match Analytics</span>
                 <Zap size={12} className="text-primary fill-current" />
              </div>
              <div className="flex items-end gap-1">
                 <span className="text-3xl font-black text-primary leading-none">92%</span>
                 <span className="text-[10px] font-bold text-success/80 pb-0.5">Pattern Match</span>
              </div>
           </div>
        </div>

        <div ref={scrollRef} className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-wider flex items-center gap-2"><Command size={10} /> Case Background</h4>
            <div className="text-xs text-white/60 leading-relaxed font-medium bg-white/5 p-3 rounded-xl border border-white/5">
              Rapid fund layering detected across 12 Mumbai legacy accounts. High probability of structured money laundering for offshore transit.
            </div>
          </div>

          <div className="space-y-3">
             <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-wider flex items-center gap-2"><Sparkles size={10} /> Risk Assessment</h4>
             <div className="grid grid-cols-2 gap-2">
               <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                 <p className="text-[9px] font-bold text-white/30 uppercase mb-1">Authenticity</p>
                 <p className="text-lg font-bold text-success tracking-tight">98.5%</p>
               </div>
               <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                 <p className="text-[9px] font-bold text-white/30 uppercase mb-1">Risk Score</p>
                 <p className="text-lg font-bold text-destructive tracking-tight">82.1</p>
               </div>
             </div>
          </div>

          <AnimatePresence>
            {messages.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3 border-t border-white/5 pt-6"
              >
                <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-wider flex items-center gap-2"><MessageSquare size={10} /> Investigation Log</h4>
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex flex-col gap-1.5 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                       <p className={`text-[10px] font-bold uppercase tracking-wider ${msg.role === 'user' ? 'text-primary' : 'text-white/40'}`}>
                         {msg.role === 'user' ? 'Investigator' : 'AI Copilot'}
                       </p>
                       <div className={`text-xs p-3 rounded-2xl max-w-[90%] border ${msg.role === 'user' ? 'bg-primary/10 border-primary/20 text-white' : 'bg-white/5 border-white/10 text-white/80'}`}>
                         {msg.content}
                       </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-1.5 p-2 bg-white/5 rounded-full w-fit">
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="pt-4 border-t border-white/5 space-y-4">
           <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-white/30 uppercase">Language Selection</span>
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                 <button 
                  onClick={() => setLang("en-IN")}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${lang === "en-IN" ? "bg-primary text-white shadow-lg" : "text-white/40 hover:text-white"}`}>EN</button>
                 <button 
                  onClick={() => setLang("hi-IN")}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${lang === "hi-IN" ? "bg-primary text-white shadow-lg" : "text-white/40 hover:text-white"}`}>हिन्दी</button>
              </div>
           </div>
           <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-white/40 uppercase tracking-wider">Case Status</span>
              <span className="text-destructive font-bold tracking-wider uppercase bg-destructive/10 px-2 py-0.5 rounded border border-destructive/20">Critical Alert</span>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative flex flex-col bg-[#050b18]">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-0 opacity-40">
           <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-1/4 -right-1/4 w-full h-full bg-primary/20 rounded-full blur-[180px]" 
           />
           <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute -bottom-1/4 -left-1/4 w-full h-full bg-blue-900/10 rounded-full blur-[200px]" 
           />
        </div>

        {/* Top Navbar */}
        <div className="p-8 flex items-center justify-between relative z-10 w-full">
           <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20 border border-white/10 group">
                 <Bot className="text-white group-hover:scale-110 transition-transform" size={24} />
              </div>
              <div className="space-y-0.5">
                 <h2 className="text-lg font-black tracking-tight uppercase leading-none text-white">DetectionCopilot <span className="text-primary ml-1 font-mono">v4.0</span></h2>
                 <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Union Bank Anti-Money Laundering AI</p>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
                 <Globe size={14} className="text-primary" />
                 <span className="text-[10px] font-bold tracking-widest text-white/60 uppercase">{lang === 'en-IN' ? 'English (India)' : 'हिन्दी (भारत)'}</span>
              </div>
              <button className="p-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 text-white/50 hover:text-white transition-all">
                <Volume2 size={20} />
              </button>
           </div>
        </div>

        {/* Central Hub */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 max-w-4xl mx-auto w-full">
           <AnimatePresence mode="wait">
             {!isBriefFinished && !isBriefing ? (
               <motion.div 
                key="start"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-8 text-center"
               >
                 <div className="relative">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute inset-0 bg-primary rounded-full blur-[80px]"
                    />
                    <div className="relative w-40 h-40 rounded-full border-4 border-white/5 bg-[#0a1121] flex items-center justify-center shadow-2xl p-8">
                       <Bot size={80} className="text-white/20 animate-pulse" />
                    </div>
                 </div>
                 <div className="space-y-4">
                   <h1 className="text-5xl font-black uppercase tracking-tight leading-none text-white">
                     {lang === 'en-IN' ? "Ready to Brief" : "ब्रीफिंग के लिए तैयार"}
                   </h1>
                   <p className="text-white/50 text-base max-w-sm mx-auto font-medium leading-relaxed">
                     {lang === 'en-IN' ? "Expert-level spoken briefing on Case #91B82 with real-time Indian dialect support." : "केस #91B82 पर विशेषज्ञ स्तर की ब्रीफिंग, रीयल-टाइम भारतीय बोली सहायता के साथ।"}
                   </p>
                 </div>
                 <button 
                  onClick={startBriefing}
                  className="group relative flex items-center justify-center"
                 >
                   <div className="absolute inset-0 bg-primary/40 rounded-3xl blur-2xl group-hover:scale-125 transition-transform" />
                   <div className="relative flex items-center gap-4 bg-primary px-10 py-5 rounded-3xl text-sm font-black uppercase tracking-[0.2em] shadow-2xl transition-all hover:-translate-y-1 active:scale-95 text-white">
                      <PlayCircle size={22} fill="white" />
                      {lang === 'en-IN' ? "Start Expert Session" : "सत्र शुरू करें"}
                   </div>
                 </button>
               </motion.div>
             ) : (
               <motion.div 
                key="active"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full flex flex-col items-center gap-12"
               >
                  {/* Avatar & Waveform */}
                  <div className="flex flex-col items-center gap-6">
                     <div className="relative group">
                        <AnimatePresence>
                          {(isBriefing || isListening) && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ 
                                opacity: [0.1, 0.4, 0.1], 
                                scale: [1.5, 2.5, 1.5]
                              }}
                              transition={{ duration: 3, repeat: Infinity }}
                              className="absolute inset-0 bg-primary/20 rounded-full blur-[100px]"
                            />
                          )}
                        </AnimatePresence>
                        
                        <div className={`w-48 h-48 rounded-full border-[10px] border-[#0a1121] shadow-2xl overflow-hidden relative z-10 bg-sidebar ring-1 ring-white/10 ${isListening ? 'ring-destructive/50 ring-offset-4 ring-offset-[#050b18]' : ''}`}>
                           <img 
                              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&mouth=smile&skinColor=edb98a&clothingColor=05396b&accessories=eyepatch" 
                              alt="AI Brief" 
                              className="w-full h-full object-cover scale-110 translate-y-2"
                           />
                           
                           {(isBriefing || isTyping || isListening) && (
                             <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                               <div className="flex gap-2 h-16 items-center">
                                 {[1, 2, 3, 4, 3, 2, 1].map((h, i) => (
                                   <motion.div 
                                      key={i}
                                      animate={{ 
                                        height: isListening ? [10, 40, 10] : (isBriefing ? [15, h * 12 + 15, 15] : [10, 20, 10])
                                      }}
                                      transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.08 }}
                                      className={`w-1.5 rounded-full shadow-[0_0_15px_rgba(4,103,255,0.7)] ${isListening ? 'bg-destructive shadow-destructive' : 'bg-primary shadow-primary'}`}
                                   />
                                 ))}
                               </div>
                             </div>
                           )}
                        </div>
                     </div>
                     <div className="text-center space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                           {isListening ? (lang === 'en-IN' ? "Listening..." : "सुन रहा हूँ...") : (isBriefing ? (lang === 'en-IN' ? "Briefing Investigator" : "इन्वेस्टीगेटर को जानकारी") : (lang === 'en-IN' ? "Ready for Discussion" : "चर्चा के लिए तैयार"))}
                        </span>
                        <h2 className="text-4xl font-bold tracking-tight text-white leading-none">
                          {isBriefing ? (lang === 'en-IN' ? "Strategic Brief" : "रणनीतिक ब्रीफिंग") : (isListening ? (lang === 'en-IN' ? "Voice Input Active" : "वॉयस इनपुट चालू") : (lang === "en-IN" ? "Analysis Complete" : "विश्लेषण पूर्ण"))}
                        </h2>
                     </div>
                  </div>

                  {/* Message Display Area */}
                  <div className="w-full relative">
                    <AnimatePresence mode="wait">
                      {isBriefing ? (
                        <motion.div 
                          key="briefing"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-10 flex flex-col gap-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] leading-relaxed text-xl font-medium text-white/90 font-sans"
                        >
                          <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl">
                            <Bot size={24} />
                          </div>
                          {currentText}
                          <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                             <div className="flex gap-1">
                               <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                             </div>
                             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Processing Real-time Forensics</span>
                             <button 
                              onClick={handleStopBrief}
                              className="ml-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-destructive transition-colors"
                             >
                               <PauseCircle size={14} /> Stop
                             </button>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="chat"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="w-full flex flex-col gap-8 items-center"
                        >
                           <div className="bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[2rem] p-8 w-full shadow-2xl max-h-[300px] overflow-y-auto custom-scrollbar flex flex-col gap-6">
                              {messages.map((msg, i) => (
                                <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${msg.role === 'assistant' ? 'bg-primary/20 border-primary/20 text-primary' : 'bg-white/10 border-white/10 text-white/60'}`}>
                                    {msg.role === 'assistant' ? <Bot size={16} /> : <div className="text-[10px] font-bold">INV</div>}
                                  </div>
                                  <div className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : ''}`}>
                                    <div className={`text-sm p-4 rounded-2xl ${msg.role === 'assistant' ? 'bg-white/5 border border-white/5 text-white/90' : 'bg-primary text-white border border-primary/20 shadow-lg shadow-primary/10'}`}>
                                      {msg.content}
                                    </div>
                                  </div>
                                </div>
                              ))}
                              {isTyping && (
                                <div className="flex gap-1.5 pl-12">
                                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                                </div>
                              )}
                           </div>

                           <div className="w-full max-w-2xl relative">
                              <input 
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder={lang === 'en-IN' ? "Ask follow-up questions..." : "अगले प्रश्न पूछें..."}
                                className="w-full bg-[#0a1121] border border-white/10 rounded-[1.5rem] py-5 pl-14 pr-32 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium backdrop-blur-xl focus:border-primary/40 shadow-2xl"
                              />
                              <div className="absolute left-5 top-1/2 -translate-y-1/2">
                                 <button 
                                  onClick={toggleListening}
                                  className={`p-2 rounded-full transition-all ${isListening ? 'bg-destructive text-white animate-pulse' : 'text-white/20 hover:text-white'}`}>
                                   {isListening ? <Mic size={20} /> : <MicOff size={20} />}
                                 </button>
                              </div>
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                 <button 
                                  onClick={() => handleSendMessage()}
                                  className="p-3 bg-primary text-white hover:bg-primary/90 rounded-2xl transition-all shadow-lg shadow-primary/20">
                                   <Send size={18} />
                                 </button>
                              </div>
                           </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* Global Footer Controls */}
        <div className="p-8 flex items-center justify-between relative z-10 w-full">
           <div className="flex items-center gap-6">
             <div className="flex flex-col">
               <span className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-0.5 ml-1">Live Engine</span>
               <div className="bg-success/10 border border-success/20 px-3 py-1 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  <span className="text-[10px] font-bold text-success uppercase tracking-widest">Real-Time Core Sync</span>
               </div>
             </div>
           </div>
           
           <div className="flex bg-white/5 border border-white/5 p-1 rounded-2xl">
             <button className="flex items-center gap-2 px-6 py-2 rounded-xl text-[11px] font-black bg-white text-black shadow-lg">
               INVESTIGATION LOG
             </button>
             <button 
              onClick={() => {
                const reportPromise = new Promise((resolve) => setTimeout(() => resolve({}), 2000));
                toast.promise(reportPromise, {
                  loading: 'Generating FIU Case File...',
                  success: 'Report saved to Intelligence Hub.',
                  error: 'Generation failed.',
                });
              }}
              className="flex items-center gap-2 px-6 py-2 rounded-xl text-[11px] font-black text-white/40 hover:text-white transition-all uppercase tracking-widest">
               GENERATE COMPLIANCE REPORT
             </button>
           </div>
        </div>
      </div>
      
      {/* Global Toast Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
        }
      `}</style>
      </div>
    </div>
  );
}
