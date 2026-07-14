import { motion } from "motion/react";
import { routes } from "../../routes";
import { useNavigate } from "react-router-dom";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import sisikikanImg from "./sisik.jpg";
import kepalaikanImg from "./kepalaikan.jpg";
import tulangikanImg from "./tulangikan.jpg";
import jeroanikan from "./jeroanikan.jpg"

const OCEAN_BG = "https://images.unsplash.com/photo-1530053969600-caed2596d242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";
const LOBSTER_IMG = kepalaikanImg;
const TULANGIKAN_IMG = tulangikanImg;
const FISH_IMG = "https://images.unsplash.com/photo-1683405503746-0fcbc47daaa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";
const SISIKIKAN_IMG = sisikikanImg;

const floatingSeafood = [
  {
    src: LOBSTER_IMG,
    alt: "Fresh lobster",
    size: 160,
    top: "18%",
    left: "3%",
    delay: 0,
    duration: 3.5,
    rotate: -8,
  },
  {
    src: TULANGIKAN_IMG,
    alt: "Fresh crab",
    size: 140,
    bottom: "18%",
    left: "8%",
    delay: 0.8,
    duration: 4,
    rotate: 5,
  },
  {
    src: FISH_IMG,
    alt: "Fresh fish",
    size: 190,
    top: "20%",
    right: "3%",
    delay: 0.4,
    duration: 3.8,
    rotate: 6,
  },
  {
    src: SISIKIKAN_IMG,
    alt: "Fresh shrimp",
    size: 130,
    bottom: "22%",
    right: "6%",
    delay: 1.2,
    duration: 3.2,
    rotate: -5,
  },
];

function SeafoodFloat({
  src,
  alt,
  size,
  top,
  bottom,
  left,
  right,
  delay,
  duration,
  rotate,
}: {
  src: string;
  alt: string;
  size: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  delay: number;
  duration: number;
  rotate: number;
}) {
  return (
    <motion.div
      className="hidden lg:block absolute z-[5]"
      style={{
        top,
        bottom,
        left,
        right,
      }}
      animate={{ y: [0, -18, 0], rotate: [rotate, rotate + 3, rotate] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35), 0 0 30px rgba(60,200,216,0.3)",
          border: "3px solid rgba(255,255,255,0.25)",
        }}
      >
        <ImageWithFallback
          src={src}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </motion.div>
  );
}

function CounterBadge({
  label,
  count,
  icon,
  top,
  bottom,
  left,
  right,
  delay,
}: {
  label: string;
  count: string;
  icon: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, type: "spring" }}
      className="hidden xl:flex absolute z-10 bg-white/15 backdrop-blur-md border border-white/35 rounded-full px-4 py-2.5 items-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.2)] cursor-default"
      style={{
        top,
        bottom,
        left,
        right,
      }}
    >
      <span className="text-[22px]">{icon}</span>
      <div>
        <div className="text-white font-bold text-[15px] font-sans leading-tight">
          {count}
        </div>
        <div className="text-white/75 text-[11px] font-sans tracking-wide">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

// Lemon decorative element
function LemonDecor({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div
      className="hidden md:block absolute select-none text-[40px]"
      style={style}
      animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      🍋
    </motion.div>
  );
}

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden flex items-center justify-center w-full"
      style={{
        background: "linear-gradient(155deg, #022c35 0%, #055a6e 35%, #0e96b0 70%, #3CC8D8 100%)",
      }}
    >
      {/* Ocean background image */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url(${OCEAN_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      />

      {/* Radial glow overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(60,200,216,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Bubble texture */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: "45px 45px",
        }}
      />

      {/* Floating seafood images */}
      {floatingSeafood.map((item) => (
        <SeafoodFloat key={item.alt} {...item} />
      ))}

      {/* Counter badges */}
      <CounterBadge label="Tulang Ikan" count="+125 kg" icon="🦴" top="60%" left="17%" delay={0.5} />
      <CounterBadge label="Kepala Ikan" count="+205 kg" icon="🐟" top="18%" left="15%" delay={0.8} />
      <CounterBadge label="Sisik Ikan" count="+290 kg" icon="🐡" top="58%" right="16%" delay={1.0} />
      <CounterBadge label="Ikan" count="+195 kg" icon="🎣" top="22%" right="15%" delay={0.6} />

      {/* Lemon decorations */}
      <LemonDecor style={{ top: "15%", left: "38%", opacity: 0.7, zIndex: 4 }} />
      <LemonDecor style={{ bottom: "28%", left: "28%", opacity: 0.6, zIndex: 4, fontSize: "30px" }} />
      <LemonDecor style={{ bottom: "32%", right: "30%", opacity: 0.65, zIndex: 4 }} />

      {/* Starfish / shell decorations */}
      <motion.div
        className="hidden md:block absolute bottom-[12%] left-[18%] text-[35px] z-10 select-none"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        ⭐
      </motion.div>
      <motion.div
        className="hidden md:block absolute bottom-[10%] right-[22%] text-[30px] z-10 select-none"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        🐚
      </motion.div>

      {/* Center content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="relative z-20 text-center text-white w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-[10px] sm:text-[12px] md:text-[14px] tracking-[3px] sm:tracking-[5px] font-sans font-medium text-[#a5f3fb] mb-4 uppercase"
        >
          Jual Beli Limbah Ikan Perikanan Aceh
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-black font-sans leading-[1.1] tracking-[-1px] mb-5 drop-shadow-[0_4px_30px_rgba(0,0,0,0.3)] w-full"
          style={{
            fontSize: "clamp(36px, 8vw, 90px)",
            background: "linear-gradient(135deg, #ffffff 0%, #a5f3fb 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Dari Laut ke Meja,<br />Tanpa Sisa
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-sm sm:text-base md:text-lg font-sans font-light text-white/75 mb-10 leading-relaxed w-full max-w-2xl mx-auto"
        >
          Platform jual beli limbah ikan per potongan tulang, kepala, sisik, dan jeroan ikan langsung dari nelayan dan pengolah ikan Aceh. Harga transparan, pengiriman cepat, dan berkontribusi pada perikanan yang berkelanjutan.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          whileHover={{ scale: 1.07, boxShadow: "0 12px 40px rgba(255,255,255,0.35)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/portal')}
          className="px-8 py-3 sm:px-12 sm:py-4 bg-white rounded-full text-[#0E7C8E] font-sans font-bold text-xs sm:text-sm tracking-[2px] sm:tracking-[2.5px] cursor-pointer shadow-[0_8px_30px_rgba(255,255,255,0.25)] transition-shadow"
        >
          BELI IKAN
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="mt-10 sm:mt-14 flex flex-col items-center gap-2 text-white/45 text-[10px] sm:text-[12px] font-sans tracking-[2px]"
        >
          <span>GULIR</span>
          <div
            className="w-[1px] h-[30px] sm:h-[40px]"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom wave */}
      <div
        className="absolute -bottom-1 left-0 right-0 z-30"
      >
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="block w-full h-[50px] sm:h-[100px]">
          <path
            d="M0,40 C180,90 360,10 540,55 C720,100 900,20 1080,60 C1260,100 1380,40 1440,50 L1440,100 L0,100 Z"
            fill="white"
          />
          <path
            d="M0,60 C200,30 400,80 600,50 C800,20 1000,75 1200,45 C1350,25 1420,60 1440,55 L1440,100 L0,100 Z"
            fill="rgba(255,255,255,0.5)"
          />
        </svg>
      </div>
    </section>
  );
}
