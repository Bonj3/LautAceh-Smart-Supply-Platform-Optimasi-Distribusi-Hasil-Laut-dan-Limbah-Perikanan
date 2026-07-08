import { motion, MotionValue, useTransform } from "motion/react";
import { Search } from "lucide-react";

interface Props {
  scrollYProgress: MotionValue<number>;
}

const nodes = [
  { label: "Nelayan", x: "20%", y: "30%", color: "border-sky-700/50 text-sky-400" },
  { label: "Gudang", x: "40%", y: "60%", color: "border-slate-600/50 text-slate-400" },
  { label: "Restoran", x: "60%", y: "20%", color: "border-teal-700/50 text-teal-400" },
  { label: "Pembeli", x: "80%", y: "50%", color: "border-indigo-700/50 text-indigo-400" },
  { label: "Pemasok", x: "30%", y: "75%", color: "border-amber-700/50 text-amber-400" },
];

export default function Scene4SupplyChain({ scrollYProgress }: Props) {
  const opacity = useTransform(
    scrollYProgress,
    [0.5, 0.6, 0.7, 0.8],
    [0, 1, 1, 0]
  );

  return (
    <motion.div style={{ opacity }} className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center">
      
      {nodes.map((node, i) => (
        <div key={i} className={`absolute flex flex-col items-center opacity-60`} style={{ left: node.x, top: node.y }}>
          <div className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border ${node.color} bg-black/20 relative`}>
            <div className="w-2 h-2 rounded-full bg-current opacity-50" />
            
            {/* Searching indicator on some nodes */}
            {i % 2 === 0 && (
              <div className="absolute -top-4 -right-4 w-6 h-6 rounded-full border border-slate-500/30 bg-black/40 flex items-center justify-center">
                <Search className="w-3 h-3 text-slate-400 animate-pulse" />
              </div>
            )}
          </div>
          <span className="mt-3 text-[10px] tracking-widest uppercase text-slate-500">{node.label}</span>
        </div>
      ))}

      {/* Broken connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <line x1="22%" y1="35%" x2="38%" y2="58%" stroke="#475569" strokeWidth="1" strokeDasharray="4 8" className="animate-pulse" />
        <line x1="42%" y1="58%" x2="58%" y2="25%" stroke="#475569" strokeWidth="1" strokeDasharray="4 8" className="animate-pulse" />
        <line x1="62%" y1="25%" x2="78%" y2="48%" stroke="#475569" strokeWidth="1" strokeDasharray="4 8" className="animate-pulse" />
      </svg>
      
    </motion.div>
  );
}
