import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, User as UserIcon, Sparkles, Paperclip, Volume2, Mic, MicOff, Zap, Search, Database, Code, ArrowRight, ShieldCheck } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  cypher?: string;
  results?: any[];
}

const mockCypher: Record<string, string> = {
  "Show all accounts that received money from Account X in the last 30 days and sent it abroad": 
    "MATCH (a:Account {id: 'Account X'})-[r:TRANSFER]->(b:Account)-[r2:TRANSFER]->(c:Entity {location: 'International'})\nWHERE r.timestamp > datetime() - duration('P30D')\nRETURN b, collect(c)",
  "Analyze Account 9182...501": 
    "MATCH (a:Account {id: '9182...501'})-[:PART_OF]->(c:Cluster)\nMATCH (c)-[r:MEMBER]-(n)\nRETURN c, count(n) as cluster_size, avg(r.amount) as avg_flow",
  "Summarize recent high-risk alerts":
    "MATCH (a:Alert {status: 'Active', severity: 'High'})\nRETURN a.type, count(a) as count\nORDER BY count DESC"
};

export function AICoPilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "ai", content: "Agent 08: Operational. Input your natural language query for graph-based investigation." }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    const newMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages(prev => [...prev, newMsg]);
    setInputVal("");
    setIsTyping(true);

    // Simulate AI translating Text-to-Cypher
    setTimeout(() => {
      let cypher = "";
      let responseText = "I've analyzed the graph topology for your request. Based on the current Neo4j schema, I've constructed a traversal to identify these patterns.";
      
      // Basic matching for demo
      if (text.toLowerCase().includes("account x") || text.toLowerCase().includes("abroad")) {
        cypher = mockCypher["Show all accounts that received money from Account X in the last 30 days and sent it abroad"];
        responseText = "I've identified 3 intermediate nodes matching this pattern. The funds were routed through 'Sunrise Trading' before being exfiltrated to offshore entities in Dubai.";
      } else if (text.includes("9182")) {
        cypher = mockCypher["Analyze Account 9182...501"];
        responseText = "Account 9182...501 is a central bridge in a suspected mule cluster. It exhibits 94% structural similarity to previous exfiltration patterns.";
      } else if (text.toLowerCase().includes("summarize") || text.toLowerCase().includes("alerts")) {
        cypher = mockCypher["Summarize recent high-risk alerts"];
        responseText = "There are 12 high-risk alerts active. The primary pattern is 'Rapid Layering' (8 cases) followed by 'Smurfing' (4 cases).";
      }

      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: "ai", 
        content: responseText,
        cypher: cypher
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 w-16 h-16 bg-primary text-white rounded-2xl shadow-elevated flex items-center justify-center z-50 overflow-hidden ${isOpen ? 'hidden' : 'flex'} group`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <ShieldCheck className="w-8 h-8 fill-current" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-8 right-8 w-full max-w-[450px] h-[750px] max-h-[90vh] bg-[#020617] border border-white/10 rounded-[2rem] shadow-2xl z-50 flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-white/5 border-b border-white/10 p-6 flex items-center justify-between text-white shrink-0 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 p-1.5 overflow-hidden shadow-sm">
                   <img src="/fundwatch-logo.png" alt="UBI AI" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight leading-none text-white">GenAI Investigation Assistant</h3>
                  <p className="text-[10px] font-bold text-white/50 mt-1 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Text-to-Cypher Active
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/50 hover:text-white"
                aria-label="Close Chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-transparent">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-3 max-w-[90%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-[#020617] border border-white/10 mt-1 shadow-sm overflow-hidden p-1 pb-1">
                      {msg.role === "user" ? <UserIcon className="w-4 h-4 text-white/50" /> : <img src="/fundwatch-logo.png" alt="UBI" className="w-full h-full object-cover rounded-lg" />}
                    </div>
                    <div className="space-y-3">
                      <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.role === "user" 
                          ? "bg-primary text-white rounded-tr-none shadow-primary/20" 
                          : "bg-white/5 border border-white/10 text-white rounded-tl-none backdrop-blur-sm"
                      }`}>
                        {msg.content}
                      </div>
                      
                      {msg.cypher && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-black/60 rounded-xl p-4 border border-white/10 overflow-hidden shadow-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[9px] font-bold text-primary flex items-center gap-1.5 uppercase">
                              <Code size={12} /> Cypher Generation
                            </span>
                            <span className="text-[9px] font-bold text-white/40 uppercase">Neo4j v5.0</span>
                          </div>
                          <pre className="text-[11px] font-mono text-white/80 whitespace-pre-wrap leading-relaxed">
                            {msg.cypher}
                          </pre>
                          <div className="mt-3 flex items-center gap-2">
                             <button className="text-[10px] bg-primary text-white border border-primary px-3 py-1.5 rounded-lg font-bold hover:bg-primary/90 transition-all flex items-center gap-1.5">
                                Execute <ArrowRight size={10} />
                             </button>
                             <button className="text-[10px] text-white/50 hover:text-white/80 transition-colors uppercase font-bold px-2">Copy Query</button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                   <div className="flex gap-3 items-center">
                      <div className="w-8 h-8 rounded-full bg-[#020617] border border-white/10 flex items-center justify-center shadow-sm overflow-hidden p-1">
                        <img src="/fundwatch-logo.png" alt="UBI" className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-5 bg-white/5 border-t border-white/10 shrink-0 backdrop-blur-md">
               <div className="flex items-center gap-2 relative">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend(inputVal)}
                    placeholder="Ask investigator query..."
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl py-4 pl-5 pr-24 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  />
                  <div className="absolute right-2 flex items-center gap-1">
                     <button className="p-2 text-white/50 hover:bg-white/10 hover:text-white rounded-lg transition-colors">
                        <Mic size={18} />
                     </button>
                     <button 
                       onClick={() => handleSend(inputVal)}
                       disabled={!inputVal.trim()}
                       className="p-2.5 bg-primary text-white rounded-lg disabled:opacity-50 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                     >
                        <Send size={18} />
                     </button>
                  </div>
               </div>
                <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar py-1">
                  {["Show international flows", "Analyze Account 9182", "Recent alerts"].map(q => (
                    <button 
                      key={q} 
                      onClick={() => handleSend(q)}
                      className="whitespace-nowrap px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-[10px] font-bold text-white/50 hover:bg-primary hover:text-white hover:border-primary transition-all uppercase tracking-wider shadow-sm"
                    >
                      {q}
                    </button>
                  ))}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
