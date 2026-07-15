import { motion, MotionValue, useTransform } from "motion/react";
import { User, DollarSign, AlertTriangle } from "lucide-react";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function Scene2Fisherman({ scrollYProgress }: Props) {
  const opacity = useTransform(
    scrollYProgress,
    [0.1, 0.18, 0.32, 0.42],
    [0, 1, 1, 0]
  );

  const lineShake = useTransform(
    scrollYProgress,
    [0.2, 0.22, 0.24, 0.26, 0.28, 0.3],
    [0, -10, 10, -10, 10, 0]
  );

  const fishermanScale = useTransform(scrollYProgress, [0.14, 0.22], [0.8, 1]);
  const middlemanScale = useTransform(scrollYProgress, [0.16, 0.24], [0.8, 1]);

  return (
    <motion.div style={{ opacity }} className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center overflow-hidden">
      
      {/* ── Atmospheric background glows ── */}
      <div className="absolute top-[30%] right-[25%] w-48 md:w-72 h-48 md:h-72 rounded-full bg-sky-500/[0.08] blur-[80px] md:blur-[100px]" />
      <div className="absolute top-[35%] left-[25%] w-48 md:w-72 h-48 md:h-72 rounded-full bg-amber-500/[0.08] blur-[80px] md:blur-[100px]" />

      {/* ── Fisherman Element (Right / Top on mobile) ── */}
      <motion.div 
        style={{ scale: fishermanScale }}
        className="absolute top-[18%] left-[50%] -translate-x-1/2 md:translate-x-0 md:top-[30%] md:left-auto md:right-[22%] flex flex-col items-center"
      >
        {/* Glow behind */}
        <div className="absolute -inset-4 md:-inset-6 bg-sky-500/10 rounded-full blur-2xl" />
        
        {/* Fisherman SVG — scaled down on mobile */}
        <div className="relative mb-2 md:mb-3 scale-[0.6] sm:scale-75 md:scale-100 origin-center">
          <svg width="120" height="140" viewBox="0 0 120 140" fill="none" className="drop-shadow-[0_0_20px_rgba(56,189,248,0.3)]">
            <ellipse cx="60" cy="130" rx="50" ry="8" fill="#0EA5E9" opacity="0.15" />
            <path d="M 20 110 Q 30 125 60 125 Q 90 125 100 110 Z" fill="#1E3A8A" opacity="0.8" />
            <path d="M 22 110 Q 30 123 60 123 Q 90 123 98 110" stroke="#38BDF8" strokeWidth="0.8" fill="none" opacity="0.5" />
            <circle cx="55" cy="72" r="12" fill="#0C4A6E" />
            <circle cx="55" cy="72" r="11" fill="#0E7490" opacity="0.8" />
            <circle cx="55" cy="69" r="4" fill="#FCD34D" opacity="0.3" />
            <path d="M 45 83 L 40 108 L 52 108 L 55 90 L 58 108 L 70 108 L 65 83 Z" fill="#0C4A6E" opacity="0.9" />
            <path d="M 42 68 Q 55 55 68 68" fill="#1E3A8A" />
            <line x1="42" y1="68" x2="68" y2="68" stroke="#334155" strokeWidth="1" />
            <line x1="70" y1="78" x2="105" y2="30" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="105" y1="30" x2="105" y2="95" stroke="#64748B" strokeWidth="0.8" strokeDasharray="2 3" />
            <g transform="translate(100, 90)">
              <path d="M 0 0 Q 4 -3 8 0 Q 4 3 0 0 Z" fill="#38BDF8" opacity="0.7" />
              <path d="M 8 0 L 12 -2 L 12 2 Z" fill="#38BDF8" opacity="0.5" />
            </g>
          </svg>
        </div>

        {/* Icon circle */}
        <div className="w-12 h-12 md:w-16 md:h-16 bg-sky-900/70 rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-md border border-sky-500/50 shadow-[0_0_20px_rgba(14,165,233,0.2)]">
          <User className="text-sky-200 w-6 h-6 md:w-8 md:h-8" />
        </div>
        <span className="mt-2 md:mt-3 text-sky-100 text-xs md:text-sm font-semibold tracking-[0.15em] uppercase drop-shadow-md">Nelayan</span>
        <span className="text-sky-300/60 text-[9px] md:text-[10px] mt-0.5 md:mt-1 tracking-wide">Penangkap Ikan</span>
      </motion.div>

      {/* ── Middleman Element (Left / Bottom on mobile) ── */}
      <motion.div 
        style={{ scale: middlemanScale }}
        className="absolute bottom-[18%] left-[50%] -translate-x-1/2 md:translate-x-0 md:bottom-auto md:top-[30%] md:left-[22%] flex flex-col items-center"
      >
        {/* Glow behind */}
        <div className="absolute -inset-4 md:-inset-6 bg-amber-500/10 rounded-full blur-2xl" />

        {/* Middleman SVG — scaled down on mobile */}
        <div className="relative mb-2 md:mb-3 scale-[0.6] sm:scale-75 md:scale-100 origin-center">
          <svg width="120" height="140" viewBox="0 0 120 140" fill="none" className="drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            <ellipse cx="60" cy="130" rx="45" ry="7" fill="#F59E0B" opacity="0.1" />
            <path d="M 35 85 Q 35 125 60 125 Q 85 125 85 85 Z" fill="#78350F" opacity="0.7" />
            <path d="M 38 85 Q 38 122 60 122 Q 82 122 82 85" stroke="#F59E0B" strokeWidth="0.8" fill="none" opacity="0.4" />
            <text x="60" y="110" textAnchor="middle" fill="#FCD34D" fontSize="20" fontWeight="bold" opacity="0.6">$</text>
            <circle cx="60" cy="55" r="14" fill="#78350F" />
            <circle cx="60" cy="55" r="13" fill="#92400E" opacity="0.8" />
            <path d="M 45 68 L 42 85 L 78 85 L 75 68 Z" fill="#78350F" opacity="0.9" />
            <line x1="60" y1="68" x2="60" y2="85" stroke="#F59E0B" strokeWidth="1" opacity="0.5" />
            <rect x="47" y="42" width="26" height="6" rx="2" fill="#451A03" opacity="0.8" />
            <path d="M 42 72 L 28 78 L 25 75" stroke="#78350F" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 78 72 L 92 78 L 95 75" stroke="#78350F" strokeWidth="3" strokeLinecap="round" fill="none" />
            <text x="20" y="65" fill="#FCD34D" fontSize="12" opacity="0.5">$</text>
            <text x="95" y="60" fill="#FCD34D" fontSize="10" opacity="0.4">$</text>
            <text x="30" y="45" fill="#FCD34D" fontSize="8" opacity="0.3">$</text>
          </svg>
        </div>

        {/* Icon circle */}
        <div className="w-12 h-12 md:w-16 md:h-16 bg-amber-900/70 rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-md border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <DollarSign className="text-amber-300 w-6 h-6 md:w-8 md:h-8" />
        </div>
        <span className="mt-2 md:mt-3 text-amber-100 text-xs md:text-sm font-semibold tracking-[0.15em] uppercase drop-shadow-md">Tengkulak</span>
        <span className="text-amber-300/60 text-[9px] md:text-[10px] mt-0.5 md:mt-1 tracking-wide">Perantara Harga</span>
      </motion.div>

      {/* ── Broken Connection Line ── */}
      <motion.div 
        style={{ y: lineShake }} 
        className="absolute top-[50%] md:top-[48%] left-[15%] right-[15%] sm:left-[25%] sm:right-[25%] md:left-[34%] md:right-[34%] -translate-y-1/2 md:translate-y-0"
      >
        <div className="absolute inset-0 h-1 bg-red-500/20 blur-md" />
        
        {/* On mobile: vertical line, on desktop: horizontal */}
        <div className="hidden md:block h-0 border-t-[3px] border-dashed border-red-400/70 relative">
          <div 
            className="absolute inset-0 h-1 -top-0.5"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(239,68,68,0.4), transparent)',
              animation: 'shimmer 2s ease-in-out infinite',
            }}
          />
        </div>
        
        {/* Center badge */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 md:gap-2 bg-red-900/80 px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs text-red-100 uppercase tracking-[0.1em] md:tracking-[0.12em] font-semibold border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)] backdrop-blur-md whitespace-nowrap">
          <AlertTriangle className="w-3 h-3 md:w-3.5 md:h-3.5 text-red-300" />
          Harga Tidak Transparan
        </div>

        {/* X marks */}
        <div className="hidden md:flex absolute top-1/2 left-[25%] -translate-y-1/2 w-5 h-5 rounded-full bg-red-500/20 items-center justify-center border border-red-500/40">
          <span className="text-red-400 text-[10px] font-bold">✕</span>
        </div>
        <div className="hidden md:flex absolute top-1/2 right-[25%] -translate-y-1/2 w-5 h-5 rounded-full bg-red-500/20 items-center justify-center border border-red-500/40">
          <span className="text-red-400 text-[10px] font-bold">✕</span>
        </div>
      </motion.div>

      {/* ── Comparison labels ── */}
      <div className="absolute bottom-[6%] md:bottom-[22%] left-1/2 -translate-x-1/2 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 md:gap-8 opacity-70">
        <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-sky-900/40 border border-sky-500/30 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-sky-400" />
          <span className="text-sky-200 text-[10px] md:text-[11px] font-medium tracking-wide">Harga Rendah</span>
        </div>
        <div className="text-slate-500 text-sm md:text-lg hidden sm:block">→</div>
        <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-amber-900/40 border border-amber-500/30 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-amber-200 text-[10px] md:text-[11px] font-medium tracking-wide">Margin Tinggi</span>
        </div>
      </div>

      {/* ── Decorative fish ── */}
      <div className="absolute bottom-[10%] left-[10%] opacity-20 hidden md:block">
        <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
          <path d="M 0 4 Q 4 0 8 4 Q 4 8 0 4 Z" fill="#38BDF8" />
          <path d="M 8 4 L 14 1 L 14 7 Z" fill="#38BDF8" />
        </svg>
      </div>
      <div className="absolute bottom-[14%] right-[12%] opacity-15 scale-125 hidden md:block">
        <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
          <path d="M 16 4 Q 12 0 8 4 Q 12 8 16 4 Z" fill="#38BDF8" />
          <path d="M 8 4 L 2 1 L 2 7 Z" fill="#38BDF8" />
        </svg>
      </div>

      <style>{`
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `}</style>
    </motion.div>
  );
}
