import { motion, MotionValue, useTransform } from "motion/react";
import { Search, Anchor, Warehouse, Store, ShoppingCart, Package, HelpCircle, Unlink } from "lucide-react";

interface Props {
  scrollYProgress: MotionValue<number>;
}

const nodes = [
  { label: "Nelayan", x: "18%", y: "28%", color: "from-sky-800/80 to-sky-900/90", border: "border-sky-500/50", text: "text-sky-300", glow: "bg-sky-500/15", icon: Anchor },
  { label: "Gudang", x: "42%", y: "62%", color: "from-slate-700/80 to-slate-800/90", border: "border-slate-400/50", text: "text-slate-300", glow: "bg-slate-400/12", icon: Warehouse },
  { label: "Restoran", x: "62%", y: "22%", color: "from-teal-800/80 to-teal-900/90", border: "border-teal-500/50", text: "text-teal-300", glow: "bg-teal-500/15", icon: Store },
  { label: "Pembeli", x: "82%", y: "52%", color: "from-indigo-800/80 to-indigo-900/90", border: "border-indigo-500/50", text: "text-indigo-300", glow: "bg-indigo-500/15", icon: ShoppingCart },
  { label: "Pemasok", x: "30%", y: "75%", color: "from-amber-800/80 to-amber-900/90", border: "border-amber-500/50", text: "text-amber-300", glow: "bg-amber-500/12", icon: Package },
];

const connections = [
  { from: 0, to: 1, broken: true },
  { from: 1, to: 2, broken: true },
  { from: 2, to: 3, broken: false },
  { from: 4, to: 1, broken: true },
  { from: 0, to: 2, broken: false },
];

export default function Scene4SupplyChain({ scrollYProgress }: Props) {
  const opacity = useTransform(
    scrollYProgress,
    [0.5, 0.6, 0.7, 0.8],
    [0, 1, 1, 0]
  );

  // Stagger node entrances
  const nodeScales = nodes.map((_, i) => 
    useTransform(scrollYProgress, [0.54 + i * 0.02, 0.62 + i * 0.02], [0.5, 1])
  );

  const fragmentOpacity = useTransform(scrollYProgress, [0.58, 0.65], [0, 1]);

  return (
    <motion.div style={{ opacity }} className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center overflow-hidden">
      
      {/* ── Atmospheric background glows ── */}
      <div className="absolute top-[15%] left-[10%] w-48 md:w-80 h-48 md:h-80 rounded-full bg-sky-500/[0.06] blur-[80px] md:blur-[120px]" />
      <div className="absolute bottom-[20%] right-[15%] w-48 md:w-72 h-48 md:h-72 rounded-full bg-indigo-500/[0.06] blur-[80px] md:blur-[100px]" />
      <div className="absolute top-[50%] left-[40%] w-64 md:w-96 h-64 md:h-96 rounded-full bg-slate-500/[0.04] blur-[100px] md:blur-[130px] -translate-x-1/2 -translate-y-1/2" />

      {/* Wrapping the main network visualization to scale down on mobile */}
      <div className="absolute inset-0 w-full h-full scale-[0.6] sm:scale-75 md:scale-100 origin-center pointer-events-none">
        
        {/* ── Connecting Lines (animated, more visible) ── */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="sc4-broken-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#EF4444" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="sc4-ok-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#64748B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#64748B" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {connections.map((conn, i) => {
            const from = nodes[conn.from];
            const to = nodes[conn.to];
            return (
              <g key={i}>
                {/* Glow line */}
                <line
                  x1={from.x} y1={from.y}
                  x2={to.x} y2={to.y}
                  stroke={conn.broken ? "rgba(239,68,68,0.15)" : "rgba(100,116,139,0.1)"}
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                {/* Main line */}
                <line
                  x1={from.x} y1={from.y}
                  x2={to.x} y2={to.y}
                  stroke={conn.broken ? "url(#sc4-broken-line)" : "url(#sc4-ok-line)"}
                  strokeWidth="2"
                  strokeDasharray={conn.broken ? "8 12" : "6 8"}
                  strokeLinecap="round"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to={conn.broken ? "-40" : "28"}
                    dur={conn.broken ? "1.5s" : "3s"}
                    repeatCount="indefinite"
                  />
                </line>
                {/* Break mark on broken connections */}
                {conn.broken && (
                  <g>
                    <circle
                      cx={`calc((${parseInt(from.x)}% + ${parseInt(to.x)}%) / 2)`}
                      cy={`calc((${parseInt(from.y)}% + ${parseInt(to.y)}%) / 2)`}
                      r="8"
                      fill="rgba(239,68,68,0.2)"
                      stroke="rgba(239,68,68,0.4)"
                      strokeWidth="1"
                    />
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* ── Supply Chain Nodes (Bigger, with icons) ── */}
        {nodes.map((node, i) => {
          const Icon = node.icon;
          return (
            <motion.div
              key={i}
              className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
              style={{ left: node.x, top: node.y, scale: nodeScales[i] }}
            >
              {/* Glow */}
              <div className={`absolute w-20 h-20 md:w-28 md:h-28 rounded-full ${node.glow} blur-2xl -z-10`} />
              
              {/* Node circle */}
              <div className={`rounded-2xl flex items-center justify-center bg-gradient-to-br ${node.color} backdrop-blur-xl border ${node.border} shadow-lg relative`}
                style={{ width: '4.5rem', height: '4.5rem' }}
              >
                <Icon className={`${node.text} w-7 h-7`} />
                
                {/* Search/question indicator */}
                {i % 2 === 0 && (
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full border border-slate-400/50 bg-slate-900/80 flex items-center justify-center shadow-lg">
                    <Search className="w-3.5 h-3.5 text-slate-300 animate-pulse" />
                  </div>
                )}
                
                {/* Question mark for odd nodes */}
                {i % 2 === 1 && (
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full border border-amber-500/50 bg-amber-900/80 flex items-center justify-center shadow-lg">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  </div>
                )}
              </div>
              
              <span className="mt-2.5 text-[11px] md:text-xs font-semibold tracking-[0.14em] uppercase text-slate-300">
                {node.label}
              </span>
            </motion.div>
          );
        })}

        {/* ── Central "Fragmented" Visual ── */}
        <motion.div
          style={{ opacity: fragmentOpacity }}
          className="absolute top-[46%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
        >
          <div className="relative">
            {/* Fragmented circle */}
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="animate-pulse" style={{ animationDuration: '3s' }}>
              {/* Broken ring segments */}
              <path d="M 50 5 A 45 45 0 0 1 92 35" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
              <path d="M 95 50 A 45 45 0 0 1 75 90" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
              <path d="M 65 95 A 45 45 0 0 1 15 80" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
              <path d="M 8 65 A 45 45 0 0 1 20 15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
              {/* Center icon */}
              <circle cx="50" cy="50" r="18" fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.3)" strokeWidth="1.5" />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Unlink className="w-6 h-6 text-red-400/80" />
            </div>
          </div>
          <span className="mt-2 text-[10px] tracking-[0.2em] uppercase text-red-300/70 font-semibold">
            Terfragmentasi
          </span>
        </motion.div>
      </div>

      {/* ── Floating data fragments (decorative) ── */}
      <motion.div style={{ opacity: fragmentOpacity }} className="absolute top-[10%] md:top-[15%] left-[50%] -translate-x-1/2 z-10 scale-90 md:scale-100">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/50 border border-red-500/30 backdrop-blur-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-[9px] text-red-300/80 font-medium tracking-wider uppercase">Data Tidak Sinkron</span>
        </div>
      </motion.div>

      <motion.div style={{ opacity: fragmentOpacity }} className="absolute bottom-[10%] md:bottom-[15%] left-[50%] -translate-x-1/2 z-10 scale-90 md:scale-100">
        <div className="flex items-center gap-2 md:gap-3 opacity-60">
          <div className="w-8 md:w-14 h-px bg-gradient-to-r from-transparent to-red-500/50" />
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-500/25">
            <Unlink className="w-3 h-3 text-red-400" />
            <span className="text-[8px] md:text-[9px] tracking-[0.15em] uppercase text-red-300/70 font-medium whitespace-nowrap">
              Rantai Putus
            </span>
          </div>
          <div className="w-8 md:w-14 h-px bg-gradient-to-l from-transparent to-red-500/50" />
        </div>
      </motion.div>
    </motion.div>
  );
}
