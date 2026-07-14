import { motion, MotionValue, useTransform } from "motion/react";

interface FishProps {
  scrollYProgress: MotionValue<number>;
}

export default function Fish({ scrollYProgress }: FishProps) {
  // Gerakan ikan dari kiri (off-screen) lalu perlahan bergerak ke tengah
  // Di titik 0.85 (Hub muncul), ikan menetap di tengah layar.
  const x = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.5, 0.7, 0.85, 1],
    ["-20vw", "10vw", "30vw", "40vw", "50vw", "50vw", "50vw"]
  );

  // Bobbing up and down seperti berenang secara perlahan
  // Di hub (0.85), berhenti bobbing agar diam di tengah
  const y = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.5, 0.7, 0.85, 1],
    ["0vh", "5vh", "-5vh", "8vh", "-2vh", "0vh", "0vh"]
  );

  // Rotasi ikan (0.85 ke 1 rotasinya 0 agar menghadap lurus)
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.5, 0.7, 0.85, 1],
    [0, 5, -5, 8, -2, 0, 0] 
  );

  // Skala ikan: sedikit mengecil saat masuk portal
  const scale = useTransform(
    scrollYProgress,
    [0, 0.85, 0.95, 1],
    [1, 1, 0.8, 0.8]
  );

  // Opacity: Ikan memudar di scene limbah, kembali, lalu menghilang saat menyatu dengan Hub
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.70, 0.78, 0.88, 0.92, 0.95, 1],
    [1, 1, 0.3, 0.3, 1, 0, 0]
  );

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
      }}
      className="absolute top-1/2 left-0 z-40 pointer-events-none -mt-6 -ml-6"
    >
      <div className="relative">
        <svg
          width="84"
          height="48"
          viewBox="0 0 84 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]"
        >
          {/* Simple Minimalist Tuna Fish Vector */}
          <path
            d="M 68 24 C 68 34, 45 42, 25 36 C 10 32, 2 38, 2 38 L 2 10 C 2 10, 10 16, 25 12 C 45 6, 68 14, 68 24 Z"
            fill="url(#tuna-gradient)"
          />
          <path d="M 52 20 Q 56 24 52 28" stroke="#1E3A8A" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="58" cy="20" r="2" fill="#0F172A" />
          <path d="M 30 14 L 38 4 L 46 14" fill="#38BDF8" opacity="0.6" />
          <path d="M 28 34 L 36 44 L 44 34" fill="#38BDF8" opacity="0.6" />
          
          <defs>
            <linearGradient id="tuna-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#1E40AF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </motion.div>
  );
}