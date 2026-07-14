import { motion, MotionValue, useTransform } from "motion/react";
import { Trash2, Sparkles, AlertTriangle } from "lucide-react";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function Scene5Processing({ scrollYProgress }: Props) {
  const sceneOpacity = useTransform(
    scrollYProgress,
    [0.65, 0.7, 0.8, 0.85],
    [0, 1, 1, 0]
  );

  // Waste items fade more slowly - stay visible longer
  const wasteOpacity = useTransform(
    scrollYProgress,
    [0.72, 0.82],
    [1, 0.3]
  );

  // Fillet stays even longer  
  const filletOpacity = useTransform(
    scrollYProgress,
    [0.72, 0.84],
    [1, 0.5]
  );

  // Central fish dismantling animation
  const fishScale = useTransform(scrollYProgress, [0.68, 0.74], [1, 0.6]);
  const fishOpacity = useTransform(scrollYProgress, [0.68, 0.76], [1, 0.2]);

  const parts = [
    { label: "Kepala Ikan", angle: -60, distance: 150, isWaste: true, emoji: "🦴", desc: "Terbuang Sia-sia" },
    { label: "Tulang & Sirip", angle: -10, distance: 170, isWaste: true, emoji: "🦴", desc: "Potensi Kolagen" },
    { label: "Sisik & Kulit", angle: 40, distance: 150, isWaste: true, emoji: "✨", desc: "Bahan Kerajinan" },
    { label: "Fillet Daging", angle: 190, distance: 140, isWaste: false, emoji: "🐟", desc: "Produk Utama" },
    { label: "Jeroan", angle: 230, distance: 160, isWaste: true, emoji: "♻️", desc: "Bahan Pakan" },
  ];

  return (
    <motion.div style={{ opacity: sceneOpacity }} className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center overflow-hidden">
      
      {/* ── Atmospheric background ── */}
      <div className="absolute top-[40%] left-[50%] w-96 h-96 rounded-full bg-red-500/[0.05] blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-[60%] left-[30%] w-72 h-72 rounded-full bg-emerald-500/[0.05] blur-[100px]" />

      {/* ── Central Fish SVG (dismantles) ── */}
      <motion.div 
        style={{ scale: fishScale, opacity: fishOpacity }}
        className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
      >
        <svg width="140" height="80" viewBox="0 0 140 80" fill="none" className="drop-shadow-[0_0_30px_rgba(56,189,248,0.4)]">
          {/* Fish body */}
          <path
            d="M 110 40 C 110 55, 75 68, 45 60 C 25 55, 5 62, 5 62 L 5 18 C 5 18, 25 25, 45 20 C 75 12, 110 25, 110 40 Z"
            fill="url(#fish5-gradient)"
            stroke="#38BDF8"
            strokeWidth="1"
            opacity="0.8"
          />
          {/* Eye */}
          <circle cx="90" cy="34" r="4" fill="#0F172A" />
          <circle cx="91" cy="33" r="1.5" fill="#38BDF8" opacity="0.5" />
          {/* Gill line */}
          <path d="M 78 30 Q 82 40 78 50" stroke="#1E3A8A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Dorsal fin */}
          <path d="M 50 22 L 60 5 L 72 20" fill="#0EA5E9" opacity="0.6" />
          {/* Bottom fin */}
          <path d="M 48 58 L 56 75 L 68 58" fill="#0EA5E9" opacity="0.5" />
          {/* Tail */}
          <path d="M 5 18 L 5 62" stroke="#0EA5E9" strokeWidth="2" opacity="0.3" />
          {/* Cut lines (indicating processing) */}
          <line x1="65" y1="15" x2="65" y2="65" stroke="#EF4444" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
          <line x1="40" y1="18" x2="40" y2="62" stroke="#EF4444" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
          
          <defs>
            <linearGradient id="fish5-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#1E40AF" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Processing label */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">Proses Pengolahan</span>
        </div>
      </motion.div>

      {/* ── Scattered Parts (flying away from center) ── */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
        {parts.map((part, i) => {
          const rad = (part.angle * Math.PI) / 180;
          const x = Math.cos(rad) * part.distance;
          const y = Math.sin(rad) * part.distance;

          return (
            <motion.div
              key={i}
              style={{ opacity: part.isWaste ? wasteOpacity : filletOpacity }}
              className="absolute flex items-center justify-center"
              initial={{ x: 0, y: 0, scale: 0.5 }}
              animate={{ x, y, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: "easeOut" }}
            >
              {/* Glow behind card */}
              <div className={`absolute -inset-4 rounded-2xl blur-xl ${part.isWaste ? 'bg-red-500/10' : 'bg-emerald-500/15'}`} />
              
              {/* Part card */}
              <div className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl backdrop-blur-lg border shadow-lg
                ${part.isWaste 
                  ? 'bg-red-950/60 border-red-700/50 shadow-red-900/20' 
                  : 'bg-emerald-950/60 border-emerald-700/50 shadow-emerald-900/20'
                }
              `}>
                {/* Emoji/icon */}
                <span className="text-lg">{part.emoji}</span>
                
                {/* Text */}
                <div className="flex flex-col">
                  <span className={`text-[11px] font-semibold tracking-wide uppercase whitespace-nowrap
                    ${part.isWaste ? 'text-red-200' : 'text-emerald-200'}
                  `}>
                    {part.label}
                  </span>
                  <span className={`text-[8px] tracking-wider uppercase mt-0.5
                    ${part.isWaste ? 'text-red-400/60' : 'text-emerald-400/60'}
                  `}>
                    {part.desc}
                  </span>
                </div>

                {/* Status indicator */}
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ml-1
                  ${part.isWaste ? 'bg-red-500/20 border border-red-500/40' : 'bg-emerald-500/20 border border-emerald-500/40'}
                `}>
                  {part.isWaste 
                    ? <Trash2 className="w-2.5 h-2.5 text-red-400" />
                    : <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                  }
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Waste percentage indicator ── */}
      <motion.div 
        style={{ opacity: wasteOpacity }}
        className="absolute bottom-[16%] left-1/2 -translate-x-1/2 flex items-center gap-3"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-950/50 border border-red-700/40 backdrop-blur-sm">
          <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
          <span className="text-[10px] tracking-[0.15em] uppercase text-red-300/80 font-semibold whitespace-nowrap">
            40-60% Terbuang Sebagai Limbah
          </span>
        </div>
      </motion.div>

      {/* ── Legend ── */}
      <motion.div 
        style={{ opacity: wasteOpacity }}
        className="absolute top-[12%] right-[8%] flex flex-col gap-2"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/60 border border-red-400/50" />
          <span className="text-[9px] text-red-300/70 tracking-wider uppercase">Limbah</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500/60 border border-emerald-400/50" />
          <span className="text-[9px] text-emerald-300/70 tracking-wider uppercase">Produk</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
