import { motion } from "motion/react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

const OCEAN_BG = "https://images.unsplash.com/photo-1530053969600-caed2596d242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";
const LOBSTER_IMG = "https://images.unsplash.com/photo-1778327565155-89df3fb82f65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";
const CRAB_IMG = "https://images.unsplash.com/photo-1553659971-f01207815844?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";
const FISH_IMG = "https://images.unsplash.com/photo-1683405503746-0fcbc47daaa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";
const SHRIMP_IMG = "https://images.unsplash.com/photo-1758972572427-fc3d4193bbd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";

const counters = [
  { label: "Tulang Ikan", count: "+125 kg", icon: "🦴", top: "28%", left: "8%" },
  { label: "Kepala Ikan", count: "+205 kg", icon: "🐟", top: "20%", left: "20%" },
  { label: "Sisik Ikan", count: "+290 kg", icon: "🐡", top: "55%", right: "18%" },
  { label: "Jeroan Ikan", count: "+195 kg", icon: "🎣", top: "25%", right: "8%" },
];

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
    src: CRAB_IMG,
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
    src: SHRIMP_IMG,
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
      style={{
        position: "absolute",
        top,
        bottom,
        left,
        right,
        zIndex: 5,
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
      style={{
        position: "absolute",
        top,
        bottom,
        left,
        right,
        zIndex: 10,
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.35)",
        borderRadius: "50px",
        padding: "10px 18px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        cursor: "default",
      }}
    >
      <span style={{ fontSize: "22px" }}>{icon}</span>
      <div>
        <div
          style={{
            color: "white",
            fontWeight: 700,
            fontSize: "15px",
            fontFamily: "Poppins, sans-serif",
            lineHeight: 1.1,
          }}
        >
          {count}
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: "11px",
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "0.5px",
          }}
        >
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
      style={{ position: "absolute", fontSize: "40px", userSelect: "none", ...style }}
      animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      🍋
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(155deg, #022c35 0%, #055a6e 35%, #0e96b0 70%, #3CC8D8 100%)",
      }}
    >
      {/* Ocean background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${OCEAN_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          opacity: 0.22,
          zIndex: 0,
        }}
      />

      {/* Radial glow overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(60,200,216,0.18) 0%, transparent 70%)",
          zIndex: 1,
        }}
      />

      {/* Bubble texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: "45px 45px",
          zIndex: 1,
        }}
      />

      {/* Floating seafood images */}
      {floatingSeafood.map((item) => (
        <SeafoodFloat key={item.alt} {...item} />
      ))}

      {/* Counter badges */}
      <CounterBadge label="Tulang Ikan" count="+125 kg" icon="🦴" top="30%" left="6%" delay={0.5} />
      <CounterBadge label="Kepala Ikan" count="+205 kg" icon="🐟" top="18%" left="22%" delay={0.8} />
      <CounterBadge label="Sisik Ikan" count="+290 kg" icon="🐡" top="58%" right="16%" delay={1.0} />
      <CounterBadge label="Jeroan Ikan" count="+195 kg" icon="🎣" top="22%" right="6%" delay={0.6} />

      {/* Lemon decorations */}
      <LemonDecor style={{ top: "15%", left: "38%", opacity: 0.7, zIndex: 4 }} />
      <LemonDecor style={{ bottom: "28%", left: "28%", opacity: 0.6, zIndex: 4, fontSize: "30px" }} />
      <LemonDecor style={{ bottom: "32%", right: "30%", opacity: 0.65, zIndex: 4 }} />

      {/* Starfish / shell decorations */}
      <motion.div
        style={{ position: "absolute", bottom: "12%", left: "18%", fontSize: "35px", zIndex: 4, userSelect: "none" }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        ⭐
      </motion.div>
      <motion.div
        style={{ position: "absolute", bottom: "10%", right: "22%", fontSize: "30px", zIndex: 4, userSelect: "none" }}
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
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          color: "white",
          padding: "0 24px",
          maxWidth: 700,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            fontSize: "14px",
            letterSpacing: "5px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            color: "#a5f3fb",
            marginBottom: "16px",
            textTransform: "uppercase",
          }}
        >
          Jual Beli Limbah Ikan Perikanan Aceh
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            fontSize: "clamp(48px, 7vw, 90px)",
            fontWeight: 900,
            fontFamily: "Poppins, sans-serif",
            lineHeight: 1.05,
            letterSpacing: "-1px",
            marginBottom: "20px",
            textShadow: "0 4px 30px rgba(0,0,0,0.3)",
            background: "linear-gradient(135deg, #ffffff 0%, #a5f3fb 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Limbah Ikan,<br />Nilai Ekonomi Nyata
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{
            fontSize: "16px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 300,
            color: "rgba(255,255,255,0.75)",
            marginBottom: "40px",
            lineHeight: 1.7,
          }}
        >
          Platform jual beli limbah ikan per potongan — tulang, kepala, sisik, dan jeroan ikan — langsung dari nelayan dan pengolah ikan Aceh. Harga transparan, pengiriman cepat, dan berkontribusi pada perikanan yang berkelanjutan.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          whileHover={{ scale: 1.07, boxShadow: "0 12px 40px rgba(255,255,255,0.35)" }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: "16px 48px",
            background: "white",
            border: "none",
            borderRadius: "50px",
            color: "#0E7C8E",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: "14px",
            letterSpacing: "2.5px",
            cursor: "pointer",
            boxShadow: "0 8px 30px rgba(255,255,255,0.25)",
          }}
        >
          BELI LIMBAH IKAN
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            marginTop: "56px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            color: "rgba(255,255,255,0.45)",
            fontSize: "12px",
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "2px",
          }}
        >
          <span>GULIR</span>
          <div
            style={{
              width: 1,
              height: 40,
              background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom wave */}
      <div
        style={{
          position: "absolute",
          bottom: -2,
          left: 0,
          right: 0,
          zIndex: 20,
        }}
      >
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ display: "block", width: "100%" }}>
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
