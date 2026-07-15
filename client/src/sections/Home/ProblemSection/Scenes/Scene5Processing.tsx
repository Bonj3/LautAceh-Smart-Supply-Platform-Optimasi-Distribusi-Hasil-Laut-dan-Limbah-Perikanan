import { motion, MotionValue, useTransform } from "motion/react";
import { AlertTriangle, ArrowRight } from "lucide-react";

interface Props {
  scrollYProgress: MotionValue<number>;
}

// Data bagian-bagian ikan
const FISH_PARTS = [
  {
    label: "Kepala Ikan",
    emoji: "🦴",
    desc: "Bahan kaldu & pakan",
    isWaste: true,
    angle: -55,
    distance: 165,
  },
  {
    label: "Tulang & Sirip",
    emoji: "🦴",
    desc: "Kolagen & suplemen",
    isWaste: true,
    angle: 0,
    distance: 180,
  },
  {
    label: "Sisik & Kulit",
    emoji: "✨",
    desc: "Kerajinan & kosmetik",
    isWaste: true,
    angle: 55,
    distance: 165,
  },
  {
    label: "Fillet Daging",
    emoji: "🐟",
    desc: "Produk utama",
    isWaste: false,
    angle: 180,
    distance: 155,
  },
  {
    label: "Jeroan",
    emoji: "♻️",
    desc: "Pakan ternak & pupuk",
    isWaste: true,
    angle: 125,
    distance: 170,
  },
];

// ── Cincin persentase limbah (ring chart) ──
function WasteRing() {
  const wastePercent = 55;
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (wastePercent / 100) * circumference;

  return (
    <div className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background ring */}
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="6"
        />
        {/* Waste portion */}
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke="url(#waste-ring-grad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000"
        />
        <defs>
          <linearGradient id="waste-ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
        </defs>
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm md:text-xl font-black text-white/90 leading-none">{wastePercent}%</span>
        <span className="text-[5px] md:text-[7px] uppercase tracking-[0.15em] text-white/40 font-semibold mt-0.5">Terbuang</span>
      </div>
    </div>
  );
}

export default function Scene5Processing({ scrollYProgress }: Props) {
  // Scene5 range: 0.60 → 0.75
  const sceneOpacity = useTransform(scrollYProgress, [0.58, 0.63, 0.73, 0.77], [0, 1, 1, 0]);

  // Staggered reveals for parts
  const partsOpacity = useTransform(scrollYProgress, [0.62, 0.67], [0, 1]);
  const partsScale = useTransform(scrollYProgress, [0.62, 0.67], [0.8, 1]);

  // Central fish
  const fishScale = useTransform(scrollYProgress, [0.60, 0.65, 0.70, 0.75], [0.7, 1, 0.85, 0.5]);
  const fishOpacity = useTransform(scrollYProgress, [0.60, 0.64, 0.70, 0.75], [0, 1, 0.6, 0.15]);

  // Bottom stats
  const statsOpacity = useTransform(scrollYProgress, [0.64, 0.68], [0, 1]);

  return (
    <motion.div
      style={{ opacity: sceneOpacity }}
      className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center overflow-hidden"
    >
      {/* ── Subtle atmospheric glows ── */}
      <div className="absolute top-[35%] left-[48%] w-64 md:w-[500px] h-64 md:h-[500px] rounded-full bg-rose-500/[0.04] blur-[100px] md:blur-[150px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-[65%] left-[35%] w-48 md:w-[300px] h-48 md:h-[300px] rounded-full bg-amber-500/[0.03] blur-[80px] md:blur-[120px]" />
      <div className="absolute top-[30%] right-[20%] w-48 md:w-[250px] h-48 md:h-[250px] rounded-full bg-teal-500/[0.04] blur-[80px] md:blur-[100px]" />

      {/* ── Top label ── */}
      <motion.div
        style={{ opacity: partsOpacity }}
        className="absolute top-[8%] left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
      >
        <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-sm whitespace-nowrap">
          <AlertTriangle className="w-2.5 h-2.5 md:w-3 md:h-3 text-amber-400" />
          <span className="text-[9px] md:text-[10px] tracking-[0.15em] md:tracking-[0.2em] uppercase text-white/60 font-semibold">
            Proses Pengolahan Ikan
          </span>
        </div>
      </motion.div>

      {/* Wrapper to scale down central diagram on mobile */}
      <div className="absolute inset-0 w-full h-full scale-[0.6] sm:scale-[0.8] md:scale-100 origin-center pointer-events-none">
        
        {/* ── Central Fish SVG ── */}
        <motion.div
          style={{ scale: fishScale, opacity: fishOpacity }}
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10"
        >
          <svg
            width="160" height="90" viewBox="0 0 160 90" fill="none"
            className="drop-shadow-[0_0_40px_rgba(56,189,248,0.3)]"
          >
            {/* Body */}
            <path
              d="M 125 45 C 125 62, 85 75, 50 65 C 28 59, 8 67, 8 67 L 8 23 C 8 23, 28 31, 50 25 C 85 15, 125 28, 125 45 Z"
              fill="url(#fish5-grad)"
              opacity="0.85"
            />
            {/* Eye */}
            <circle cx="102" cy="38" r="5" fill="#0F172A" />
            <circle cx="103.5" cy="36.5" r="2" fill="#38BDF8" opacity="0.6" />
            {/* Gill */}
            <path d="M 88 33 Q 93 45 88 57" stroke="#1E3A8A" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
            {/* Fins */}
            <path d="M 55 25 L 67 6 L 80 23" fill="#0EA5E9" opacity="0.5" />
            <path d="M 52 65 L 62 84 L 75 65" fill="#0EA5E9" opacity="0.4" />
            {/* Cut lines */}
            <line x1="72" y1="12" x2="72" y2="78" stroke="#f87171" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.5" />
            <line x1="45" y1="20" x2="45" y2="70" stroke="#f87171" strokeWidth="1" strokeDasharray="4 6" opacity="0.3" />

            <defs>
              <linearGradient id="fish5-grad" x1="0" y1="0" x2="1" y2="0.3">
                <stop offset="0%" stopColor="#0EA5E9" />
                <stop offset="50%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#1E40AF" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* ── Scattered Parts ── */}
        <motion.div
          style={{ opacity: partsOpacity, scale: partsScale }}
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
        >
          {FISH_PARTS.map((part, i) => {
            const rad = (part.angle * Math.PI) / 180;
            const x = Math.cos(rad) * part.distance;
            const y = Math.sin(rad) * part.distance;

            return (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: 0, top: 0 }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                animate={{ x, y, opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.4 + i * 0.12,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                {/* Card */}
                <div
                  className={`
                    relative flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-xl border shadow-xl
                    -translate-x-1/2 -translate-y-1/2
                    ${part.isWaste
                      ? "bg-gradient-to-br from-red-950/70 to-red-900/40 border-red-600/30 shadow-red-950/30"
                      : "bg-gradient-to-br from-emerald-950/70 to-emerald-900/40 border-emerald-600/30 shadow-emerald-950/30"
                    }
                  `}
                >
                  {/* Emoji circle */}
                  <div
                    className={`
                      w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-base
                      ${part.isWaste
                        ? "bg-red-500/15 border border-red-500/25"
                        : "bg-emerald-500/15 border border-emerald-500/25"
                      }
                    `}
                  >
                    {part.emoji}
                  </div>

                  {/* Text */}
                  <div className="flex flex-col min-w-0">
                    <span
                      className={`text-[11px] font-bold tracking-wide uppercase whitespace-nowrap leading-tight
                        ${part.isWaste ? "text-red-100/90" : "text-emerald-100/90"}
                      `}
                    >
                      {part.label}
                    </span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <ArrowRight className={`w-2.5 h-2.5 flex-shrink-0 ${part.isWaste ? "text-red-400/50" : "text-emerald-400/50"}`} />
                      <span
                        className={`text-[8px] tracking-wider uppercase
                          ${part.isWaste ? "text-red-300/50" : "text-emerald-300/50"}
                        `}
                      >
                        {part.desc}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ── Bottom Stats Bar ── */}
      <motion.div
        style={{ opacity: statsOpacity }}
        className="absolute bottom-[8%] md:bottom-[10%] left-1/2 -translate-x-1/2 flex flex-col md:flex-row items-center gap-2 md:gap-6 z-20 w-[90%] md:w-auto bg-black/20 md:bg-transparent p-3 md:p-0 rounded-2xl md:rounded-none backdrop-blur-md md:backdrop-blur-none"
      >
        {/* Waste ring */}
        <div className="flex items-center gap-4 md:gap-0">
          <WasteRing />
          
          {/* Mobile legend (only visible on mobile, alongside ring) */}
          <div className="flex flex-col gap-1.5 md:hidden">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-red-400 to-red-500 shadow-[0_0_8px_rgba(248,113,113,0.4)]" />
              <span className="text-[9px] text-white/60 tracking-wider uppercase font-medium">Limbah</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
              <span className="text-[9px] text-white/60 tracking-wider uppercase font-medium">Produk</span>
            </div>
          </div>
        </div>

        {/* Separator - Hidden on mobile */}
        <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

        {/* Info text */}
        <div className="flex flex-col gap-2 w-full md:w-auto items-center md:items-start text-center md:text-left">
          {/* Desktop Legend (hidden on mobile) */}
          <div className="hidden md:flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-red-400 to-red-500 shadow-[0_0_8px_rgba(248,113,113,0.4)]" />
              <span className="text-[10px] text-white/50 tracking-wider uppercase font-medium">
                Limbah — Potensi belum dimanfaatkan
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
              <span className="text-[10px] text-white/50 tracking-wider uppercase font-medium">
                Produk — Dijual di pasaran
              </span>
            </div>
          </div>
          
          <div className="mt-1 md:mt-1 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 w-full md:w-auto">
            <span className="text-[9px] text-amber-300/80 font-semibold tracking-wide block">
              💡 Setiap bagian memiliki nilai ekonomi tinggi
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
