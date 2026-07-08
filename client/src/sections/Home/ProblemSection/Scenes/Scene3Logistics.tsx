import { motion, MotionValue, useTransform } from "motion/react";
import { Truck, Store, Warehouse, Clock } from "lucide-react";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function Scene3Logistics({ scrollYProgress }: Props) {
  const opacity = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.5, 0.6],
    [0, 1, 1, 0]
  );

  const truckX = useTransform(
    scrollYProgress,
    [0.35, 0.55],
    ["0vw", "20vw"]
  );

  return (
    <motion.div style={{ opacity }} className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center">
      
      {/* Warehouse */}
      <div className="absolute top-[35%] right-[45%] flex flex-col items-center opacity-70">
        <div className="w-24 h-24 bg-slate-800/40 rounded-xl flex items-center justify-center backdrop-blur-md border border-slate-700/50">
          <Warehouse className="text-slate-300 w-12 h-12" />
        </div>
        <span className="mt-4 text-slate-400 text-xs tracking-widest uppercase">Gudang</span>
      </div>

      {/* Restaurant */}
      <div className="absolute top-[35%] left-[25%] flex flex-col items-center opacity-70">
        <div className="w-24 h-24 bg-teal-900/30 rounded-xl flex items-center justify-center backdrop-blur-md border border-teal-800/50">
          <Store className="text-teal-300 w-12 h-12" />
        </div>
        <span className="mt-4 text-teal-200/60 text-xs tracking-widest uppercase">Restoran</span>
      </div>

      {/* Moving Truck */}
      <motion.div style={{ x: truckX }} className="absolute top-[55%] right-[45%] flex flex-col items-center">
        <div className="w-16 h-12 bg-sky-900/60 rounded-lg flex items-center justify-center backdrop-blur-md border border-sky-700/50 relative shadow-[0_0_15px_rgba(14,165,233,0.2)]">
          <Truck className="text-sky-300 w-6 h-6" />
          
          {/* Delay Indicator */}
          <div className="absolute -top-3 -right-3 w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center border border-amber-500/50">
            <Clock className="text-amber-400 w-3 h-3 animate-spin" style={{ animationDuration: "3s" }} />
          </div>
        </div>
      </motion.div>

      {/* Road line */}
      <div className="absolute top-[60%] left-[25%] right-[45%] h-px bg-gradient-to-r from-teal-800/20 via-slate-600/50 to-slate-800/20" />

    </motion.div>
  );
}
