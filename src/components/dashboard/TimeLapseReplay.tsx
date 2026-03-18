import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Play, Pause, RotateCcw, Activity, ShieldAlert, Radio, Search, Fingerprint } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import * as d3 from "d3";

interface Node extends d3.SimulationNodeDatum {
  id: string;
  type: "account" | "bank" | "flagged";
  day: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
  day: number;
}

const MOCK_DATA = {
  nodes: [
    { id: "A1", type: "account", day: 1 },
    { id: "A2", type: "account", day: 2 },
    { id: "A3", type: "account", day: 5 },
    { id: "A4", type: "account", day: 10 },
    { id: "A5", type: "account", day: 15 },
    { id: "A6", type: "account", day: 20 },
    { id: "A7", type: "account", day: 25 },
    { id: "A8", type: "account", day: 28 },
  ] as Node[],
  links: [
    { source: "A1", target: "A2", day: 3 },
    { source: "A2", target: "A3", day: 6 },
    { source: "A3", target: "A4", day: 12 },
    { source: "A4", target: "A5", day: 16 },
    { source: "A5", target: "A6", day: 22 },
    { source: "A6", target: "A7", day: 26 },
    { source: "A7", target: "A8", day: 29 },
    { source: "A1", target: "A4", day: 18 },
    { source: "A2", target: "A8", day: 30 },
  ] as Link[]
};

export function TimeLapseReplay() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [day, setDay] = useState(0);
  const [riskScore, setRiskScore] = useState(12);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let interval: any;
    if (isPlaying && day < 30) {
      interval = setInterval(() => {
        setDay(prev => {
          const next = prev + 1;
          if (next >= 30) {
            setIsPlaying(false);
            return 30;
          }
          return next;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying, day]);

  useEffect(() => {
    setRiskScore(Math.floor(12 + (day * 2.8)));
  }, [day]);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 400;
    const height = 250;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const currentNodes = MOCK_DATA.nodes.filter(n => n.day <= day);
    const currentLinks = MOCK_DATA.links.filter(l => l.day <= day);

    const simulation = d3.forceSimulation<Node>(currentNodes)
      .force("link", d3.forceLink<Node, Link>(currentLinks).id(d => d.id).distance(50))
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const linkG = svg.append("g").attr("class", "links");
    const nodeG = svg.append("g").attr("class", "nodes");

    const link = linkG.selectAll("line")
      .data(currentLinks)
      .enter().append("line")
      .attr("stroke", day > 25 ? "#ef4444" : "#94a3b8")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2);

    const node = nodeG.selectAll("circle")
      .data(currentNodes)
      .enter().append("circle")
      .attr("r", 8)
      .attr("fill", d => day > 25 ? "#ef4444" : "#3b82f6")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .call(d3.drag<SVGCircleElement, Node>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any);

    node.append("title").text(d => d.id);

    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as any).x)
        .attr("y1", d => (d.source as any).y)
        .attr("x2", d => (d.target as any).x)
        .attr("y2", d => (d.target as any).y);

      node
        .attr("cx", d => d.x!)
        .attr("cy", d => d.y!);
    });

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => { simulation.stop(); };
  }, [day]);

  const togglePlayback = () => setIsPlaying(!isPlaying);
  const reset = () => {
    setDay(0);
    setIsPlaying(false);
  };

  return (
    <div className="bg-[#020617] rounded-[2rem] border border-white/5 p-8 shadow-2xl overflow-hidden relative group h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
            <Timer size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Time-Lapse Fraud Replay</h4>
            <p className="text-[10px] font-semibold text-white/50">Reconstructing Temporal Ring Formation</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-success/5 border border-success/10 rounded-full">
           <Radio size={12} className="text-success animate-pulse" />
           <span className="text-[9px] font-bold text-success uppercase tracking-widest">Temporal Analysis</span>
        </div>
      </div>

      <div className="flex-1 min-h-[220px] bg-white/5 rounded-xl border border-white/10 relative overflow-hidden mb-6 flex flex-col items-center justify-center backdrop-blur-sm">
        <svg ref={svgRef} className="w-full h-full" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid meet" />
        
        <div className="absolute top-4 right-4 text-right">
          <div className={`text-2xl font-bold font-mono tracking-tighter ${day > 25 ? 'text-destructive animate-pulse' : 'text-primary'}`}>
            {riskScore.toFixed(0)}%
          </div>
          <p className="text-[8px] font-black uppercase tracking-widest text-white/30">Risk Index</p>
        </div>

        <div className="absolute bottom-4 left-4">
          <div className="text-xs font-bold text-white bg-[#020617]/80 backdrop-blur px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
            <Activity size={12} className={day > 25 ? 'text-destructive' : 'text-primary'} />
            Day {day.toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
           <button 
             onClick={togglePlayback}
             className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all shrink-0"
           >
             {isPlaying ? <Pause size={18} /> : <Play size={18} className="translate-x-0.5" />}
           </button>
           <div className="flex-1">
              <Slider 
                value={[day]} 
                onValueChange={(val) => { setDay(val[0]); setIsPlaying(false); }}
                max={30}
                min={0}
                step={1}
                className="cursor-pointer"
              />
              <div className="flex justify-between mt-2">
                 <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Day 01</span>
                 <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Day 30</span>
              </div>
           </div>
           <button 
             onClick={reset}
             className="w-10 h-10 rounded-xl border border-white/10 hover:bg-white/5 text-white/50 hover:text-white flex items-center justify-center transition-all shrink-0"
           >
             <RotateCcw size={18} />
           </button>
        </div>

        <div className="bg-white/5 px-4 py-3 rounded-xl border border-white/10 backdrop-blur-sm">
           <AnimatePresence mode="wait">
             <motion.div
               key={day < 10 ? 'early' : (day < 25 ? 'mid' : 'late')}
               initial={{ opacity: 0, y: 5 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -5 }}
               className="flex items-center justify-between mb-1"
             >
                <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Status Report</span>
                <span className={`text-[9px] font-black uppercase ${day > 25 ? 'text-destructive' : 'text-primary'}`}>
                  {day < 10 ? "Dormant" : (day < 25 ? "Activating" : "Critical Pattern")}
                </span>
             </motion.div>
           </AnimatePresence>
           <p className="text-[10px] font-medium text-white/80 leading-snug">
              {day < 10 ? "Initial layering nodes identified. Behavior consistent with standard retail banking." : 
               day < 25 ? "Mule account activation sequence detected. Rapid lateral fund flow between regional nodes." :
               "Structural signature matched. 87.4% similarity to known Hawala ring topology. Auto-freeze recommended."}
           </p>
        </div>
      </div>
    </div>
  );
}
