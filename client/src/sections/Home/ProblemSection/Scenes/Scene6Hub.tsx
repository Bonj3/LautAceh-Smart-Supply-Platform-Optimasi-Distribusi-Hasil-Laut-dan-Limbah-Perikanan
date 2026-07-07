import { motion, MotionValue, useTransform } from "motion/react";
import { Anchor, Truck, Warehouse, Store, Users, Recycle } from "lucide-react";
import { STORY_DATA } from "../data";

interface Props {
  scrollYProgress: MotionValue<number>;
}

// ─── Data Node Ekosistem ───────────────────────────────────────────────────────
// 6 node tersebar merata 360° / 6 = 60° per node. Dimulai dari atas (270°).
const ECOSYSTEM_NODES = [
  { label: "Nelayan", icon: Anchor, angle: 270 },
  { label: "Distribusi", icon: Truck, angle: 330 },
  { label: "Cold Storage", icon: Warehouse, angle: 30 },
  { label: "Restoran", icon: Store, angle: 90 },
  { label: "Konsumen", icon: Users, angle: 150 },
  { label: "Industri Sirkular", icon: Recycle, angle: 210 },
];
// const HUB_RADIUS = 42;
const NODE_RADIUS = 155;

// ─── Komponen Gelombang Dekoratif (Nuansa Laut) ───────────────────────────────
function OceanWaves() {
  return (
    <div className="absolute bottom-0 left-0 w-full h-[30%] pointer-events-none overflow-hidden opacity-20">
      {/* Gelombang belakang */}
      <svg
        viewBox="0 0 1440 200"
        className="absolute bottom-0 w-full"
        preserveAspectRatio="none"
        style={{ height: "100%" }}
      >
        <path
          d="M0,120 C240,60 480,160 720,100 C960,40 1200,140 1440,80 L1440,200 L0,200 Z"
          fill="rgba(13,148,136,0.15)"
        />
        <path
          d="M0,140 C320,80 560,180 840,110 C1120,50 1300,150 1440,100 L1440,200 L0,200 Z"
          fill="rgba(20,184,166,0.10)"
        />
      </svg>
    </div>
  );
}

// ─── Gelembung Ambient ────────────────────────────────────────────────────────
function AmbientBubbles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[
        { size: 4, left: "12%", bottom: "20%", dur: "6s", delay: "0s" },
        { size: 3, left: "28%", bottom: "10%", dur: "8s", delay: "2s" },
        { size: 5, left: "72%", bottom: "15%", dur: "7s", delay: "1s" },
        { size: 3, left: "85%", bottom: "25%", dur: "9s", delay: "3s" },
        { size: 2, left: "45%", bottom: "8%", dur: "5s", delay: "0.5s" },
      ].map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-teal-300/20"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            bottom: b.bottom,
            animation: `float-up ${b.dur} ease-in-out ${b.delay} infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes float-up {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-60px) scale(1.2); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

// ─── Satu Node Ekosistem ──────────────────────────────────────────────────────
function EcosystemNode({
  label,
  icon: Icon,
  angle,
  index,
}: {
  label: string;
  icon: React.ElementType;
  angle: number;
  index: number;
}) {
  const rad = (angle * Math.PI) / 180;
  const cx = Math.cos(rad) * NODE_RADIUS;
  const cy = Math.sin(rad) * NODE_RADIUS;

  return (
    <div
      className="absolute flex flex-col items-center z-10"
      style={{
        left: `calc(50% + ${cx}px)`,
        top: `calc(50% + ${cy}px)`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Ikon */}
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-teal-700/60 to-teal-900/80 backdrop-blur-md border border-teal-400/40 shadow-[0_0_18px_rgba(20,184,166,0.25)]">
        <Icon className="w-5 h-5 text-teal-200" />
      </div>
      {/* Label */}
      <span className="mt-1.5 text-[8.5px] font-semibold uppercase tracking-wider text-teal-100/90 whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

// ─── Komponen Utama Scene 6 Hub ───────────────────────────────────────────────
export default function Scene6Hub({ scrollYProgress }: Props) {
  // Fade in sekali lalu tetap terlihat selamanya (tidak ada fade out)
  const sceneOpacity = useTransform(scrollYProgress, [0.75, 0.82], [0, 1]);
  const glowScale = useTransform(scrollYProgress, [0.78, 0.92], [0.3, 1.8]);
  const contentOpacity = useTransform(scrollYProgress, [0.80, 0.88], [0, 1]);

  return (
    <motion.div
      style={{ opacity: sceneOpacity }}
      className="w-screen h-screen flex-shrink-0 relative flex flex-col overflow-hidden"
    >
      {/* ── Background Gradient (Ocean-Teal Gelap) ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(175deg, #0c3547 0%, #0a2f3f 30%, #072a38 60%, #0d3d4a 100%)",
        }}
      />

      {/* ── Elemen Dekoratif Laut ── */}
      <OceanWaves />
      <AmbientBubbles />

      {/* ── Glow Cahaya Pusat (Teal Lembut) ── */}
      <motion.div
        style={{ scale: glowScale }}
        className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full pointer-events-none"
        css-note="Glow utama berwarna teal sangat lembut agar tidak menyakiti mata"
      >
        <div className="absolute inset-0 bg-teal-500/10 rounded-full blur-[100px]" />
        <div className="absolute inset-[25%] bg-teal-400/15 rounded-full blur-[60px]" />
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* ZONA ATAS: Judul & Deskripsi                                         */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-30 flex flex-col items-center text-center px-6 pt-[6vh]"
      >
        {/* Badge Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-900/50 border border-teal-500/25 text-teal-200 text-[10px] font-bold uppercase tracking-[0.15em] mb-4">
          ✦ Solusi Terintegrasi
        </div>

        {/* Headline */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-3">
          {STORY_DATA.outro.headline}
        </h2>

        {/* Garis Dekoratif (terhubung ke judul) */}
        <div className="flex items-center w-48 mb-3">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-teal-400/50" />
          <div className="mx-2 w-1.5 h-1.5 rounded-full bg-teal-400/70" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-teal-400/50" />
        </div>

        {/* Supporting Text */}
        <p className="text-teal-100/70 max-w-lg text-sm leading-relaxed">
          {STORY_DATA.outro.supporting}
        </p>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* ZONA TENGAH: Hub Network (Pusat + 6 Node Simetris Melingkar)         */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute z-20"
        css-note="top dihitung agar pas di tengah antara header dan footer"
        style={{
          opacity: contentOpacity,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="relative w-[400px] h-[400px]">
          {/* ── SVG: Lingkaran Orbit + Garis ke Pusat ── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 400 400"
          >
            <defs>
              <linearGradient id="hub-line-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.08" />
              </linearGradient>
            </defs>

            {/* Lingkaran orbit (cincin di sekeliling hub) */}
            <circle
              cx="200" cy="200" r={NODE_RADIUS}
              fill="none"
              stroke="rgba(20,184,166,0.12)"
              strokeWidth="3"
              strokeDasharray="6 6"
            />

            {/* Garis dari pusat ke setiap node */}
            {ECOSYSTEM_NODES.map((node, i) => {
              const rad = (node.angle * Math.PI) / 180;
              const nx = 200 + Math.cos(rad) * NODE_RADIUS;
              const ny = 200 + Math.sin(rad) * NODE_RADIUS;
              return (
                <line
                  key={i}
                  x1="200" y1="200"
                  x2={nx} y2={ny}
                  stroke="url(#hub-line-grad)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              );
            })}
          </svg>

          {/* ── Pusat Hub: Nama Platform ── */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
            {/* Cincin dekoratif */}
            <div className="" />
            <div className="" />

            <h3 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-teal-200 via-white to-teal-300 tracking-tight text-center leading-tight relative z-10">
              PasaiEungkot
            </h3>
            <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-teal-300/60 mt-0.5 relative z-10">
              Platform
            </span>
          </div>

          {/* ── 6 Node Ekosistem ── */}
          {ECOSYSTEM_NODES.map((node, i) => (
            <EcosystemNode
              key={node.label}
              label={node.label}
              icon={node.icon}
              angle={node.angle}
              index={i}
            />
          ))}
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* ZONA BAWAH: Benefits & Tagline                                       */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-0 left-0 right-0 flex flex-col items-center px-6 pb-[5vh] z-30"
      >
        {/* Benefit Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-4">
          {STORY_DATA.outro.benefits.map((benefit) => (
            <div
              key={benefit}
              className="px-4 py-1.5 rounded-full bg-teal-900/40 border border-teal-500/20 backdrop-blur-sm text-teal-100 font-medium text-[11px] tracking-wide"
            >
              {benefit}
            </div>
          ))}
        </div>

        {/* Tagline */}
        <p className="text-teal-300/60 font-semibold tracking-[0.2em] uppercase text-xs">
          {STORY_DATA.outro.tagline}
        </p>
      </motion.div>
    </motion.div>
  );
}
