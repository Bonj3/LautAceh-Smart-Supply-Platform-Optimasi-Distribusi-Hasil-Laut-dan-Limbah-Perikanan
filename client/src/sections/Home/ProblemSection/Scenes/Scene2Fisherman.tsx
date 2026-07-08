import { motion, MotionValue, useTransform } from "motion/react";
import { User, DollarSign } from "lucide-react";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function Scene2Fisherman({ scrollYProgress }: Props) {
  // Hanya terlihat di area progress tertentu (0.15 - 0.35)
  const opacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.3, 0.4],
    [0, 1, 1, 0]
  );

  const lineShake = useTransform(
    scrollYProgress,
    [0.2, 0.22, 0.24, 0.26, 0.28, 0.3],
    [0, -10, 10, -10, 10, 0]
  );

  return (
    <motion.div style={{ opacity }} className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center">
      {/* Fisherman Element */}
      <div className="absolute top-[40%] right-[30%] flex flex-col items-center">
        <div className="w-20 h-20 bg-sky-900/40 rounded-full flex items-center justify-center backdrop-blur-sm border border-sky-700/50">
          <User className="text-sky-300 w-10 h-10" />
        </div>
        <span className="mt-4 text-sky-200 text-sm font-medium tracking-widest uppercase">Nelayan</span>
      </div>

      {/* Middleman / Buyer Element */}
      <div className="absolute top-[40%] left-[30%] flex flex-col items-center">
        <div className="w-20 h-20 bg-amber-900/40 rounded-full flex items-center justify-center backdrop-blur-sm border border-amber-700/50">
          <DollarSign className="text-amber-400 w-10 h-10" />
        </div>
        <span className="mt-4 text-amber-200/80 text-sm font-medium tracking-widest uppercase">Tengkulak</span>
      </div>

      {/* Broken Connection Line */}
      <motion.div 
        style={{ y: lineShake }} 
        className="absolute top-[45%] left-[38%] right-[38%] h-0 border-t-2 border-dashed border-red-500/60"
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-900/60 px-2 py-1 rounded text-[10px] text-red-200 uppercase tracking-widest border border-red-700/50">
          Harga Tidak Transparan
        </div>
      </motion.div>
    </motion.div>
  );
}
