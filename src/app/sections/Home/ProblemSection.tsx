import React, { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   UTILITY FUNCTIONS
   All animation is driven by a single normalized scrollProgress (0–1).
   Each object has its own [enter, peak, exit] range.
════════════════════════════════════════════════════════════════════════════ */

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
const easeOut  = (t: number) => 1 - (1 - t) * (1 - t);
const easeIn   = (t: number) => t * t;
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

/** Normalized 0→1 progress inside a [start, end] window */
const rng = (p: number, s: number, e: number) => clamp((p - s) / (e - s));

/**
 * Smooth alpha lifecycle for an object:
 * enter → easeOut to 1 → sustain → easeIn to 0 → exit
 */
function oA(p: number, enter: number, peak: number, fade: number, gone: number): number {
  if (p < enter) return 0;
  if (p < peak)  return easeOut(rng(p, enter, peak));
  if (p < fade)  return 1;
  if (p < gone)  return 1 - easeIn(rng(p, fade, gone));
  return 0;
}

/* ═══════════════════════════════════════════════════════════════════════════
   BACKGROUND GRADIENT — 5 interpolated keyframes
════════════════════════════════════════════════════════════════════════════ */

type RGB = [number, number, number];
const h2r = (h: string): RGB => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];
const mixRGB = (a: RGB, b: RGB, t: number) =>
  `rgb(${Math.round(lerp(a[0],b[0],t))},${Math.round(lerp(a[1],b[1],t))},${Math.round(lerp(a[2],b[2],t))})`;

const BG: Array<{ p: number; t: string; b: string }> = [
  { p: 0.00, t: "#B8DFF5", b: "#0F4C81" },
  { p: 0.22, t: "#C5E8F5", b: "#155E8A" },
  { p: 0.50, t: "#EFF6FF", b: "#1E3A8A" },
  { p: 0.72, t: "#ECFDF5", b: "#0D9488" },
  { p: 1.00, t: "#F8FAFC", b: "#1E293B" },
];

function getBg(p: number) {
  for (let i = 0; i < BG.length - 1; i++) {
    const a = BG[i], b = BG[i + 1];
    if (p <= b.p) {
      const t = easeInOut((p - a.p) / (b.p - a.p));
      return { top: mixRGB(h2r(a.t), h2r(b.t), t), bot: mixRGB(h2r(a.b), h2r(b.b), t) };
    }
  }
  const last = BG[BG.length - 1];
  return { top: last.t, bot: last.b };
}

/* ═══════════════════════════════════════════════════════════════════════════
   STORY DATA
════════════════════════════════════════════════════════════════════════════ */

const STAGES = [
  {
    badge: "⚠ Harga Belum Transparan",
    title: "Hasil laut dimulai dari kerja keras para nelayan.",
    desc:  "Banyak nelayan masih bergantung pada tengkulak sehingga harga jual ikan belum mencerminkan nilai pasar yang sebenarnya.",
    color: "#DC2626", bg: "rgba(220,38,38,0.1)", border: "rgba(220,38,38,0.25)",
  },
  {
    badge: "⚠ Distribusi Belum Efisien",
    title: "Perjalanan hasil laut berlanjut menuju pasar.",
    desc:  "Distribusi masih dilakukan secara manual sehingga pasokan untuk restoran dan hotel sering tidak konsisten.",
    color: "#D97706", bg: "rgba(217,119,6,0.1)", border: "rgba(217,119,6,0.25)",
  },
  {
    badge: "⚠ Rantai Pasok Belum Terintegrasi",
    title: "Informasi stok masih tersebar dan tidak terhubung.",
    desc:  "Data stok, permintaan, dan distribusi belum saling terhubung sehingga sering terjadi ketidakseimbangan pasokan.",
    color: "#7C3AED", bg: "rgba(124,58,237,0.1)", border: "rgba(124,58,237,0.25)",
  },
  {
    badge: "⚠ Limbah Belum Dimanfaatkan",
    title: "Masih banyak potensi ekonomi yang terbuang.",
    desc:  "Kepala, tulang, kulit, dan sisik ikan masih belum dimanfaatkan secara optimal meskipun memiliki nilai ekonomi tinggi.",
    color: "#059669", bg: "rgba(5,150,105,0.1)", border: "rgba(5,150,105,0.25)",
  },
];

const HUB_NODES = [
  { label: "Nelayan",   icon: "⚓", angle: 270 },
  { label: "Restoran",  icon: "🍽️", angle: 315 },
  { label: "Hotel",     icon: "🏨", angle: 0   },
  { label: "Pengolah",  icon: "🏭", angle: 45  },
  { label: "Produk",    icon: "♻️", angle: 90  },
  { label: "Konsumen",  icon: "👥", angle: 135 },
  { label: "Inventori", icon: "📦", angle: 180 },
  { label: "Distribusi",icon: "🚚", angle: 225 },
];

const SUCCESS = [
  { text: "Harga Lebih Transparan", icon: "💰" },
  { text: "Distribusi Digital",     icon: "🚚" },
  { text: "Inventory Terintegrasi", icon: "📊" },
  { text: "Circular Economy",       icon: "♻️" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════════════════════ */

export function ProblemSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [sp, setSp] = useState(0); // single source of truth: scrollProgress 0–1

  /* Scroll tracker — runs every rAF */
  useEffect(() => {
    let id: number;
    const tick = () => {
      if (containerRef.current) {
        const { top, height } = containerRef.current.getBoundingClientRect();
        setSp(clamp(-top / (height - window.innerHeight)));
      }
      id = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(id);
  }, []);

  /* ── Derived values ───────────────────────────────────────────────────── */

  const bg    = getBg(sp);
  const stage = sp < 0.28 ? 1 : sp < 0.55 ? 2 : sp < 0.80 ? 3 : sp < 0.88 ? 4 : 5;
  const si    = Math.min(stage, 4) - 1; // safe index into STAGES[]

  /* Fish path — 8% → 75% horizontally, sinusoidal Y, converges to centre for hub */
  const swimX  = lerp(8, 75, clamp(sp / 0.86));
  const fishX  = sp >= 0.86 ? lerp(swimX, 50, easeInOut(rng(sp, 0.86, 1.0))) : swimX;
  const baseY  = 60;
  const oscY   = Math.sin(sp * Math.PI * 10) * 3.5;
  const fishY  = sp >= 0.86 ? lerp(baseY + oscY, 48, easeInOut(rng(sp, 0.86, 1.0))) : baseY + oscY;
  const fishRot  = Math.sin(sp * Math.PI * 10) * 7;
  const fishScale = sp >= 0.86 ? lerp(1, 1.45, easeInOut(rng(sp, 0.86, 1.0))) : 1;
  const fishGlowR = sp >= 0.86 ? rng(sp, 0.86, 1.0) : 0;

  /* Hub phase */
  const hubP  = easeOut(rng(sp, 0.83, 1.0));
  const isHub = sp >= 0.83;

  /* Card fade windows */
  const cardOpacity =
    clamp(sp * 14 - 0.35) *
    clamp(1 - rng(sp, 0.79, 0.88) * 2);

  return (
    <section
      ref={containerRef}
      id="problem"
      style={{ position: "relative", height: "600vh" }}
    >
      {/* ── sticky viewport ───────────────────────────────────────────── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: `linear-gradient(175deg, ${bg.top} 0%, ${bg.bot} 100%)`,
          fontFamily: "Poppins, sans-serif",
        }}
      >

        {/* ══════════════════════════════════════════════════════════════
            WORLD SVG CANVAS — all scene objects live here
        ══════════════════════════════════════════════════════════════ */}
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ps-ocean" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#0F4C81" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="ps-route" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0F4C81" />
              <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>
            <radialGradient id="ps-hub-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.28" />
              <stop offset="70%" stopColor="#0F4C81" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#0F4C81" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ps-net" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0F4C81" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {/* ── Ocean floor ─────────────────────────────────────────── */}
          <rect x="0" y="740" width="1440" height="160"
            fill="url(#ps-ocean)"
            opacity={oA(sp, 0, 0.05, 0.36, 0.50)} />

          {/* ── Animated wave layers (Stage 1) ─────────────────────── */}
          {[
            { y: 748, amp: 20, spd: 0.7, col: "#38BDF8", sw: 3,   op: 0.38 },
            { y: 768, amp: 13, spd: 1.2, col: "#0F4C81", sw: 2,   op: 0.26 },
            { y: 782, amp: 8,  spd: 1.7, col: "#38BDF8", sw: 1.5, op: 0.20 },
          ].map((w, wi) => {
            const wA = oA(sp, 0, 0.06, 0.37, 0.52);
            const phase = (sp * 380 * w.spd) % 360;
            const pts = [-phase, 360-phase, 720-phase, 1080-phase, 1440-phase, 1800-phase].map(
              (x, qi) => `${qi === 0 ? "M" : "T"} ${x} ${w.y}`
            );
            const qPts = pts.map((pt, qi) =>
              qi === 0 ? pt : `Q ${(parseFloat(pt.split(" ")[1]) - 180)} ${w.y - w.amp} ${pt.split(" ")[1]} ${w.y}`
            );
            return (
              <path
                key={wi}
                d={`M ${-phase} ${w.y} ` +
                  [1,2,3,4,5].map(i => `Q ${i*360 - 180 - phase} ${w.y - w.amp} ${i*360 - phase} ${w.y}`).join(" ")}
                stroke={w.col} strokeWidth={w.sw} fill="none"
                opacity={wA * w.op}
              />
            );
          })}

          {/* ── Sun + rays (Stage 1) ────────────────────────────────── */}
          {(() => {
            const a = oA(sp, 0, 0.08, 0.21, 0.32);
            if (a < 0.01) return null;
            return (
              <g opacity={a}>
                <circle cx="1250" cy="65" r="58" fill="#FDE68A" opacity="0.12" />
                <circle cx="1250" cy="65" r="34" fill="#FDE68A" opacity="0.65" />
                <circle cx="1250" cy="65" r="21" fill="#FEF3C7" opacity="0.9"  />
                {Array.from({ length: 10 }, (_, ri) => {
                  const a2 = ((ri * 36) * Math.PI) / 180;
                  return (
                    <line key={ri}
                      x1={1250 + Math.cos(a2) * 40} y1={65 + Math.sin(a2) * 40}
                      x2={1250 + Math.cos(a2) * 68} y2={65 + Math.sin(a2) * 68}
                      stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" opacity="0.65"
                    />
                  );
                })}
                {/* Light caustics on water */}
                {[280,480,680,880,1060].map((lx, li) => (
                  <ellipse key={li} cx={lx} cy={790 + li * 8} rx={18 + li * 6} ry="4"
                    fill="#38BDF8" opacity="0.07" />
                ))}
              </g>
            );
          })()}

          {/* ── BOAT + FISHERMAN (Stage 1, dims but persists Stage 2) ─ */}
          {(() => {
            const a = oA(sp, 0.03, 0.14, 0.32, 0.52);
            if (a < 0.01) return null;
            const enterP = rng(sp, 0.03, 0.20);
            const bX     = lerp(1400, 1060, easeOut(enterP));
            const bFloat = Math.sin(sp * Math.PI * 28) * 5;
            const dimMod = 1 - rng(sp, 0.32, 0.50) * 0.55;
            return (
              <g opacity={a * dimMod} transform={`translate(${bX}, ${758 + bFloat})`}>
                {/* Reflection */}
                <ellipse cx="0" cy="30" rx="85" ry="9" fill="#38BDF8" opacity="0.1" />
                {/* Hull */}
                <path d="M -92 8 Q -80 28 80 28 Q 92 8 92 8 Z" fill="#0F4C81" opacity="0.92" />
                <path d="M -92 8 L -80 28 L 80 28 L 92 8" fill="none" stroke="#38BDF8" strokeWidth="1" opacity="0.3" />
                {/* Cabin */}
                <rect x="-18" y="-22" width="58" height="28" rx="4" fill="#1E3A8A" opacity="0.82" />
                <rect x="-10" y="-16" width="18" height="13" rx="2" fill="#38BDF8" opacity="0.5" />
                <rect x="16"  y="-16" width="14" height="13" rx="2" fill="#38BDF8" opacity="0.4" />
                {/* Mast */}
                <line x1="-42" y1="-22" x2="-42" y2="-108" stroke="#1E293B" strokeWidth="2.5" />
                {/* Sails */}
                <path d="M -42 -108 L -42 -18 L 22 -18 Z" fill="#EFF6FF" opacity="0.78" />
                <path d="M -42 -108 L -42 -22 L -86 -32 Z" fill="#B8DFF5" opacity="0.52" />
                {/* Flag */}
                <path d="M -42 -108 L -20 -100 L -42 -92 Z" fill="#38BDF8" opacity="0.9" />
                {/* Fisherman */}
                <circle cx="-58" cy="-34" r="9" fill="#1E293B" />
                <path d="M -58 -34 L -58 -34" stroke="#1E293B" strokeWidth="0" />
                {/* Hat */}
                <path d="M -66 -42 L -50 -42 L -48 -34 L -68 -34 Z" fill="#0F4C81" />
                <rect x="-68" y="-43" width="22" height="2.5" rx="1" fill="#0F4C81" />
                {/* Body */}
                <path d="M -58 -25 L -58 -8" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M -70 -18 L -58 -16 L -46 -18" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
                {/* Rod */}
                <path d="M -58 -16 L -106 -58 L -138 -28" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                {/* Line */}
                <path d="M -138 -28 L -148 -6 L -145 22" stroke="#94A3B8" strokeWidth="1" fill="none" />
                {/* Nets */}
                {[0,1,2,3].map(ni => (
                  <path key={ni}
                    d={`M ${-90 + ni*16} 28 Q ${-84 + ni*16} ${50 + ni*6} ${-72 + ni*16} 42`}
                    stroke="#38BDF8" strokeWidth="1.2" fill="none" opacity="0.38" strokeDasharray="4 3"
                  />
                ))}
              </g>
            );
          })()}

          {/* ── Rising water bubbles (Stage 1) ─────────────────────── */}
          {(() => {
            const a = oA(sp, 0.02, 0.10, 0.30, 0.44);
            if (a < 0.01) return null;
            return (
              <g opacity={a}>
                {[{x:180,r:5},{x:310,r:3},{x:490,r:6},{x:640,r:4},{x:790,r:7},{x:920,r:3},{x:1050,r:5}].map((b, bi) => {
                  const by = 820 - ((sp * 480 * (bi + 1)) % 180);
                  return <circle key={bi} cx={b.x} cy={by} r={b.r} fill="none" stroke="#38BDF8" strokeWidth="1.5" opacity={0.55 - bi * 0.05} />;
                })}
              </g>
            );
          })()}

          {/* ── TRUCK (Stage 2) ─────────────────────────────────────── */}
          {(() => {
            const a = oA(sp, 0.22, 0.33, 0.56, 0.70);
            if (a < 0.01) return null;
            const tp = rng(sp, 0.22, 0.44);
            const tx = lerp(-200, 640, easeOut(tp));
            const speed = 1 - clamp(tp * 1.4);
            return (
              <g opacity={a} transform={`translate(${tx}, 748)`}>
                {/* Speed lines */}
                {speed > 0.2 && [0,1,2,3].map(si => (
                  <line key={si}
                    x1={-195 - si*38} y1={-26 + si*9}
                    x2={-128 - si*38} y2={-26 + si*9}
                    stroke="#38BDF8" strokeWidth={2.2 - si * 0.5} strokeLinecap="round"
                    opacity={speed * (0.55 - si*0.1)}
                  />
                ))}
                {/* Shadow */}
                <ellipse cx="80" cy="12" rx="178" ry="11" fill="#1E293B" opacity="0.09" />
                {/* Cargo box */}
                <rect x="-155" y="-72" width="208" height="72" rx="4" fill="#1E293B" opacity="0.9" />
                {[-118,-66,-14,38].map((sx, si) => (
                  <line key={si} x1={sx} y1={-68} x2={sx} y2={0} stroke="#334155" strokeWidth="1" opacity="0.6" />
                ))}
                <rect x="-150" y="-62" width="5" height="58" rx="2" fill="#38BDF8" opacity="0.3" />
                {/* Brand label */}
                <rect x="-108" y="-54" width="130" height="28" rx="3" fill="rgba(56,189,248,0.1)" />
                <text x="-43" y="-35" fill="#38BDF8" fontSize="12" fontWeight="700" textAnchor="middle">SirkuShip</text>
                {/* Cab */}
                <rect x="53" y="-78" width="104" height="78" rx="6" fill="#1E293B" opacity="0.95" />
                <path d="M 59 -74 L 59 -40 L 150 -40 L 150 -74 Z" fill="#38BDF8" opacity="0.38" />
                <line x1="105" y1="-74" x2="105" y2="-40" stroke="#1E293B" strokeWidth="2" opacity="0.5" />
                {/* Headlight */}
                <circle cx="154" cy="-28" r="9" fill="#FDE68A" opacity="0.75" />
                <circle cx="154" cy="-28" r="14" fill="#FDE68A" opacity="0.14" />
                {/* Wheels — rotated via sp */}
                {[-88, 2, 88, 140].map((wx) => (
                  <g key={wx} transform={`translate(${wx}, 9)`}>
                    <circle r="20" fill="#0F172A" />
                    <circle r="13" fill="#334155" />
                    <circle r="5"  fill="#64748B" />
                    <line x1="0" y1="-13" x2="0" y2="-5" stroke="#64748B" strokeWidth="2" strokeLinecap="round"
                      transform={`rotate(${(sp * 2400) % 360})`} />
                    <line x1="-13" y1="0" x2="-5" y2="0" stroke="#64748B" strokeWidth="2" strokeLinecap="round"
                      transform={`rotate(${(sp * 2400) % 360})`} />
                  </g>
                ))}
              </g>
            );
          })()}

          {/* ── WAREHOUSE (Stage 2, persists dimmed Stage 3) ────────── */}
          {(() => {
            const a = oA(sp, 0.28, 0.40, 0.70, 0.83);
            if (a < 0.01) return null;
            const ws = easeOut(rng(sp, 0.28, 0.44));
            const dim = 1 - rng(sp, 0.58, 0.72) * 0.45;
            return (
              <g opacity={a * dim}>
                <g transform={`translate(225, 728) scale(${ws})`} style={{ transformOrigin: "225px 728px" }}>
                  <ellipse cx="0" cy="8" rx="88" ry="12" fill="#1E293B" opacity="0.11" />
                  <path d="M -88 0 L -88 -132 L 0 -174 L 88 -132 L 88 0 Z" fill="#0F4C81" opacity="0.88" />
                  <path d="M -88 -132 L 0 -174 L 88 -132" fill="none" stroke="#38BDF8" strokeWidth="2" opacity="0.4" />
                  {[-60,-36,-12,12,36,60].map(wx => (
                    <line key={wx} x1={wx} y1="0" x2={wx} y2="-122" stroke="#38BDF8" strokeWidth="1" opacity="0.07" />
                  ))}
                  <rect x="-24" y="-66" width="48" height="66" rx="2" fill="#0F172A" opacity="0.65" />
                  <line x1="0" y1="-66" x2="0" y2="0" stroke="#1E3A8A" strokeWidth="1.5" />
                  <rect x="-70" y="-122" width="36" height="22" rx="3" fill="#38BDF8" opacity="0.42" />
                  <rect x="34"  y="-122" width="36" height="22" rx="3" fill="#38BDF8" opacity="0.42" />
                  <circle r="7" cx="0" cy="-158" fill="#FDE68A" opacity="0.88" className="ps-glow" />
                  <text x="0" y="-188" fill="white" fontSize="14" fontWeight="700" textAnchor="middle" opacity="0.82">GUDANG</text>
                  {[0,1].map(bi => (
                    <rect key={bi} x={70 + bi*2} y={-32 + bi*20} width="18" height="18" rx="2"
                      fill="#38BDF8" opacity="0.28" stroke="#38BDF8" strokeWidth="1" />
                  ))}
                </g>
              </g>
            );
          })()}

          {/* ── RESTAURANT (Stage 2, persists dimmed Stage 3) ───────── */}
          {(() => {
            const a = oA(sp, 0.33, 0.46, 0.70, 0.83);
            if (a < 0.01) return null;
            const rs = easeOut(rng(sp, 0.33, 0.50));
            const dim = 1 - rng(sp, 0.58, 0.72) * 0.45;
            return (
              <g opacity={a * dim}>
                <g transform={`translate(1185, 728) scale(${rs})`} style={{ transformOrigin: "1185px 728px" }}>
                  <ellipse cx="0" cy="8" rx="98" ry="12" fill="#1E293B" opacity="0.11" />
                  <rect x="-98" y="-114" width="196" height="122" rx="5" fill="#14B8A6" opacity="0.86" />
                  <path d="M -108 -114 L 0 -160 L 108 -114 Z" fill="#0D9488" opacity="0.9" />
                  <rect x="-80" y="-94" width="58" height="46" rx="4" fill="#F0FDFA" opacity="0.58" />
                  <rect x="22"  y="-94" width="58" height="46" rx="4" fill="#F0FDFA" opacity="0.58" />
                  <line x1="-51" y1="-94" x2="-51" y2="-48" stroke="#0D9488" strokeWidth="1.5" />
                  <line x1=" 51" y1="-94" x2=" 51" y2="-48" stroke="#0D9488" strokeWidth="1.5" />
                  <rect x="-62" y="-112" width="124" height="26" rx="4" fill="#0D9488" />
                  <text x="0" y="-93" fill="white" fontSize="13" fontWeight="700" textAnchor="middle">RESTORAN</text>
                  <rect x="-17" y="-46" width="34" height="54" rx="3" fill="#0F766E" />
                  <text x="0" y="-175" fill="white" fontSize="14" fontWeight="600" textAnchor="middle" opacity="0.82">RESTORAN</text>
                </g>
              </g>
            );
          })()}

          {/* ── DISTRIBUTION ROUTE LINE (Stage 2) ───────────────────── */}
          {(() => {
            const a = oA(sp, 0.26, 0.40, 0.60, 0.74);
            if (a < 0.01) return null;
            const lP  = rng(sp, 0.30, 0.55);
            const len = 880;
            return (
              <g opacity={a}>
                <path
                  d="M 312 718 C 460 678 610 704 740 682 C 870 660 990 698 1088 718"
                  fill="none" stroke="url(#ps-route)" strokeWidth="3.5" strokeLinecap="round"
                  strokeDasharray={len} strokeDashoffset={len * (1 - lP)}
                />
                {lP > 0.4 && (
                  <>
                    <circle cx="545" cy="693" r="6" fill="#38BDF8" opacity="0.85">
                      <animate attributeName="opacity" values="0.35;0.9;0.35" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="740" cy="681" r="6" fill="#14B8A6" opacity="0.85">
                      <animate attributeName="opacity" values="0.35;0.9;0.35" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="930" cy="703" r="6" fill="#38BDF8" opacity="0.85">
                      <animate attributeName="opacity" values="0.35;0.9;0.35" dur="1.5s" begin="1s" repeatCount="indefinite" />
                    </circle>
                  </>
                )}
              </g>
            );
          })()}

          {/* ── SUPPLY-CHAIN NETWORK NODES (Stage 3) ────────────────── */}
          {(() => {
            const bA = oA(sp, 0.48, 0.60, 0.80, 0.88);
            if (bA < 0.01) return null;
            const nodes = [
              { x: 720, y: 440, label: "DATA HUB", r: 30, col: "#7C3AED" },
              { x: 450, y: 318, label: "Nelayan",   r: 20, col: "#0F4C81" },
              { x: 990, y: 318, label: "Pasar",     r: 20, col: "#14B8A6" },
              { x: 378, y: 542, label: "Gudang",    r: 20, col: "#0F4C81" },
              { x: 1062,y: 542, label: "Distribusi",r: 20, col: "#14B8A6" },
              { x: 720, y: 248, label: "Permintaan",r: 18, col: "#7C3AED" },
              { x: 720, y: 632, label: "Stok",      r: 18, col: "#7C3AED" },
            ];
            return (
              <g opacity={bA}>
                {/* Lines from hub to satellite nodes */}
                {nodes.slice(1).map((n, ni) => (
                  <line key={ni}
                    x1={nodes[0].x} y1={nodes[0].y} x2={n.x} y2={n.y}
                    stroke="url(#ps-net)" strokeWidth="2" strokeDasharray="8 6"
                    opacity={rng(sp, 0.51 + ni*0.018, 0.64 + ni*0.018) * 0.75}
                    className="ps-dash-flow"
                  />
                ))}
                {/* Cross-node connections */}
                {([[1,3],[2,4],[5,1],[6,3]] as [number,number][]).map(([a2,b2], ci) => (
                  <line key={ci}
                    x1={nodes[a2].x} y1={nodes[a2].y} x2={nodes[b2].x} y2={nodes[b2].y}
                    stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="5 5"
                    opacity={rng(sp, 0.60 + ci*0.02, 0.70 + ci*0.02) * 0.35}
                    className="ps-dash-flow"
                  />
                ))}
                {/* Node circles + labels */}
                {nodes.map((n, ni) => {
                  const nA = rng(sp, 0.50 + ni*0.015, 0.62 + ni*0.015);
                  const nS = easeOut(nA);
                  return (
                    <g key={ni} opacity={nA} transform={`translate(${n.x}, ${n.y}) scale(${nS})`}>
                      <circle r={n.r + 14} fill={n.col} opacity="0.10" />
                      <circle r={n.r}      fill={n.col} opacity="0.92" />
                      <circle r={n.r + 2}  fill="none" stroke={n.col} strokeWidth="1.5" opacity="0.4" />
                      <text y="5" fill="white" fontSize={ni === 0 ? "9" : "8"} fontWeight="700" textAnchor="middle">{n.label}</text>
                      {/* Mini bar chart for hub only */}
                      {ni === 0 && (
                        <g transform="translate(-12, 12)">
                          {[0,1,2,3,4].map(bi => (
                            <rect key={bi} x={bi*6} y={-([10,6,8,5,9][bi])} width="4" height={[10,6,8,5,9][bi]}
                              rx="1" fill="white" opacity="0.45" />
                          ))}
                        </g>
                      )}
                    </g>
                  );
                })}
                {/* Floating real-time widget */}
                {(() => {
                  const dA = rng(sp, 0.60, 0.75);
                  return dA > 0 ? (
                    <g opacity={dA} transform="translate(468, 448)">
                      <rect x="-64" y="-38" width="128" height="76" rx="8"
                        fill="rgba(255,255,255,0.11)" stroke="rgba(124,58,237,0.45)" strokeWidth="1.5" />
                      <text x="0" y="-21" fill="white" fontSize="7.5" fontWeight="600" textAnchor="middle" opacity="0.82">INVENTORI REAL-TIME</text>
                      {[0,1,2].map(bi => (
                        <rect key={bi} x={-44 + bi*34} y={22 - [20,26,16][bi]} width="22" height={[20,26,16][bi]}
                          rx="2" fill={["#38BDF8","#14B8A6","#7C3AED"][bi]} opacity="0.82" />
                      ))}
                    </g>
                  ) : null;
                })()}
              </g>
            );
          })()}

          {/* ── FISH SKELETON + CIRCULAR ECONOMY (Stage 4) ──────────── */}
          {(() => {
            const a = oA(sp, 0.62, 0.72, 0.84, 0.90);
            if (a < 0.01) return null;
            const rotDeg = sp * 360 * 1.6;
            return (
              <g opacity={a} transform="translate(720, 480)">
                {/* Outer ring */}
                <circle r="125" fill="none" stroke="#14B8A6" strokeWidth="2" strokeDasharray="18 10" opacity="0.22" />
                {/* Rotating recycle indicator */}
                <g transform={`rotate(${rotDeg})`}>
                  <circle r="96" fill="none" stroke="#14B8A6" strokeWidth="2.5" strokeDasharray="22 182" opacity="0.62" />
                  {[0,120,240].map((ang, ai) => {
                    const rad = (ang * Math.PI) / 180;
                    return (
                      <g key={ai} transform={`translate(${Math.cos(rad)*96}, ${Math.sin(rad)*96}) rotate(${ang+90})`}>
                        <path d="M -6 -4 L 0 7 L 6 -4 Z" fill="#14B8A6" opacity="0.85" />
                      </g>
                    );
                  })}
                </g>
                {/* Spine */}
                <path d="M -145 0 L 145 0" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" opacity="0.62" />
                {/* Head */}
                <ellipse cx="-145" cy="0" rx="29" ry="21" stroke="#1E293B" strokeWidth="2" fill="none" opacity="0.58" />
                <circle cx="-157" cy="-8" r="4.5" fill="#1E293B" opacity="0.52" />
                {/* Tail */}
                <path d="M 145 0 L 172 -26 L 176 0 L 172 26 Z" stroke="#1E293B" strokeWidth="2" fill="none" opacity="0.58" />
                {/* Ribs */}
                {[-104,-72,-40,-8,24,56,88,118].map((rx) => (
                  <g key={rx}>
                    <path d={`M ${rx} 0 L ${rx-9} -34`} stroke="#1E293B" strokeWidth="2" strokeLinecap="round" opacity="0.52" />
                    <path d={`M ${rx} 0 L ${rx-9}  34`} stroke="#1E293B" strokeWidth="2" strokeLinecap="round" opacity="0.52" />
                  </g>
                ))}
                {/* Growing leaves */}
                {[0,120,240].map((ang, li) => {
                  const rad = (ang * Math.PI) / 180;
                  const lx  = Math.cos(rad) * 148;
                  const ly  = Math.sin(rad) * 148;
                  const lS  = easeOut(rng(sp, 0.65 + li*0.025, 0.79 + li*0.025));
                  return (
                    <g key={li} transform={`translate(${lx}, ${ly}) scale(${lS}) rotate(${ang})`}>
                      <path d="M 0 0 Q 14 -19 0 -33 Q -14 -19 0 0 Z" fill="#14B8A6" opacity="0.76" />
                      <path d="M 0 -2 L 0 -28" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" />
                    </g>
                  );
                })}
                {/* Value labels */}
                {["Kolagen", "Biogas", "Kompos"].map((label, li) => {
                  const angs = [55, 180, 305];
                  const rad  = (angs[li] * Math.PI) / 180;
                  const lA   = rng(sp, 0.70 + li*0.03, 0.82 + li*0.03);
                  return (
                    <g key={li} opacity={lA}>
                      <rect x={Math.cos(rad)*150 - 34} y={Math.sin(rad)*150 - 12} width="68" height="24" rx="12"
                        fill="rgba(20,184,166,0.18)" stroke="#14B8A6" strokeWidth="1" />
                      <text x={Math.cos(rad)*150} y={Math.sin(rad)*150 + 5}
                        fill="#14B8A6" fontSize="10" fontWeight="600" textAnchor="middle">{label}</text>
                    </g>
                  );
                })}
              </g>
            );
          })()}

          {/* ── SIRKULAUT HUB (Final Stage) ─────────────────────────── */}
          {(() => {
            const a = oA(sp, 0.82, 0.92, 1.0, 1.0);
            if (a < 0.01) return null;
            const hs = easeOut(rng(sp, 0.82, 0.96));
            return (
              <g opacity={a}>
                {/* Background radial glow */}
                <circle cx="720" cy="450" r="295" fill="url(#ps-hub-glow)" />
                {/* Pulsing outer rings */}
                {[1,2,3].map(ri => (
                  <circle key={ri} cx="720" cy="450"
                    r={94 + ri * 68}
                    fill="none"
                    stroke={ri % 2 === 0 ? "#14B8A6" : "#0F4C81"}
                    strokeWidth="1.5"
                    strokeDasharray="14 10"
                    opacity={0.10 + ri*0.04}
                    className="ps-dash-flow"
                  />
                ))}
                {/* Hub centre */}
                <g transform={`translate(720, 450) scale(${hs})`}>
                  <circle r="74"  fill="#0F4C81" opacity="0.92" />
                  <circle r="82"  fill="none" stroke="#14B8A6" strokeWidth="2.5" opacity="0.72" />
                  <circle r="96"  fill="none" stroke="#38BDF8" strokeWidth="1"   opacity="0.28" />
                  <text y="-9" fill="white" fontSize="15" fontWeight="800" textAnchor="middle" letterSpacing="0.5">SirkuLaut</text>
                  <text y="10" fill="#38BDF8" fontSize="8.5" textAnchor="middle" letterSpacing="1.5" opacity="0.85">PLATFORM</text>
                  <text y="28" fill="rgba(255,255,255,0.45)" fontSize="18" textAnchor="middle">🐟</text>
                </g>
                {/* Orbiting ecosystem nodes */}
                {HUB_NODES.map((node, ni) => {
                  const rad = (node.angle * Math.PI) / 180;
                  const nr  = 212;
                  const nx  = 720 + Math.cos(rad) * nr;
                  const ny  = 450 + Math.sin(rad) * nr;
                  const nA  = rng(sp, 0.86 + ni*0.016, 0.97 + ni*0.01);
                  const nS  = easeOut(clamp(nA));
                  const lA  = rng(sp, 0.87 + ni*0.016, 0.98);
                  return (
                    <g key={ni}>
                      <line x1="720" y1="450" x2={nx} y2={ny}
                        stroke="url(#ps-route)" strokeWidth="1.5" strokeDasharray="6 5"
                        opacity={lA * 0.62} className="ps-dash-flow" />
                      <g opacity={nA} transform={`translate(${nx}, ${ny}) scale(${nS})`}>
                        <circle r="35" fill="rgba(56,189,248,0.09)" />
                        <circle r="26" fill="rgba(15,76,129,0.86)" />
                        <circle r="27" fill="none" stroke="#38BDF8" strokeWidth="1.5" opacity="0.6" />
                        <text y="-3" fontSize="14" textAnchor="middle">{node.icon}</text>
                        <text y="13" fill="#B8DFF5" fontSize="6.5" fontWeight="600" textAnchor="middle">{node.label}</text>
                      </g>
                    </g>
                  );
                })}
              </g>
            );
          })()}

        </svg>
        {/* END WORLD SVG ══════════════════════════════════════════════ */}


        {/* ══════════════════════════════════════════════════════════════
            THE FISH — always visible, always the protagonist
        ══════════════════════════════════════════════════════════════ */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: `${fishY}%`,
            left: `${fishX}%`,
            transform: `translate(-50%, -50%) rotate(${fishRot}deg) scale(${fishScale})`,
            zIndex: 50,
            pointerEvents: "none",
            willChange: "transform, top, left",
            filter: fishGlowR > 0.08
              ? `drop-shadow(0 0 ${6 + fishGlowR * 22}px rgba(56,189,248,${0.45 + fishGlowR * 0.55}))`
              : "drop-shadow(0 4px 14px rgba(15,76,129,0.32))",
          }}
        >
          {/* Trailing bubbles */}
          {[1,2,3].map(bi => (
            <div key={bi} style={{
              position: "absolute",
              top: `${bi * 7 - 4}px`,
              left: `${-12 - bi * 17}px`,
              width: `${7 - bi}px`, height: `${7 - bi}px`,
              borderRadius: "50%",
              border: "1.5px solid rgba(56,189,248,0.65)",
              background: "rgba(56,189,248,0.05)",
              animation: `ps-bubble ${0.7 + bi * 0.32}s ease-in-out infinite ${bi * 0.24}s`,
            }} />
          ))}

          {/* Fish SVG */}
          <svg viewBox="0 0 72 48" width="72" height="48" fill="none">
            {/* Tail fin — CSS animated */}
            <path d="M 57 24 L 72 12 L 70 24 L 72 36 Z" fill="#0F4C81" className="ps-fish-tail" />
            {/* Dorsal fin */}
            <path d="M 20 10 Q 29 2 41 10" stroke="#0F4C81" strokeWidth="2.5" fill="none" opacity="0.6" />
            {/* Pectoral fin */}
            <path d="M 27 24 L 19 34 L 31 30 Z" fill="#1E3A8A" opacity="0.52" />
            {/* Body */}
            <ellipse cx="33" cy="24" rx="28" ry="13" fill="#0F4C81" />
            {/* Belly sheen */}
            <ellipse cx="31" cy="27" rx="20" ry="7" fill="#38BDF8" opacity="0.32" />
            {/* Scale arcs */}
            <path d="M 20 18 Q 27 15 33 18" stroke="#38BDF8" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M 33 18 Q 40 15 46 18" stroke="#38BDF8" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M 22 24 Q 29 21 35 24" stroke="#38BDF8" strokeWidth="1" fill="none" opacity="0.35" />
            {/* Eye */}
            <circle cx="11" cy="21" r="5" fill="white" />
            <circle cx="12" cy="21" r="3"   fill="#0F172A" />
            <circle cx="13" cy="20" r="1.2" fill="white" />
          </svg>
        </div>


        {/* ══════════════════════════════════════════════════════════════
            SECTION HEADER — fades as scroll begins
        ══════════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: "absolute",
            top: "7%",
            left: 0, width: "100%",
            textAlign: "center",
            padding: "0 24px",
            zIndex: 20,
            opacity: clamp(1 - sp * 18),
            transform: `translateY(${-sp * 55}px)`,
            pointerEvents: "none",
          }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 18px", borderRadius: "999px",
            background: "rgba(15,76,129,0.08)", border: "1px solid rgba(15,76,129,0.14)",
            color: "#0F4C81", fontSize: "11px", fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px",
          }}>
            🐟 Ikuti Perjalanan Ikan
          </div>
          <h2 style={{
            fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800,
            color: "#1E293B", lineHeight: 1.2, marginBottom: "14px", letterSpacing: "-0.02em",
          }}>
            Mengapa{" "}
            <span style={{
              background: "linear-gradient(135deg, #0F4C81 0%, #14B8A6 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              SirkuLaut
            </span>{" "}
            Dibutuhkan?
          </h2>
          <p style={{
            fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", color: "#64748B",
            lineHeight: 1.7, maxWidth: "540px", margin: "0 auto",
          }}>
            Scroll untuk mengikuti perjalanan ikan — dari laut hingga ekosistem digital.
          </p>
          {/* Scroll mouse indicator */}
          <div className="ps-scroll-hint" style={{
            display: "inline-flex", flexDirection: "column",
            alignItems: "center", gap: "6px", marginTop: "28px",
          }}>
            <span style={{ fontSize: "10.5px", color: "#94A3B8", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Scroll
            </span>
            <svg width="22" height="34" viewBox="0 0 22 34" fill="none">
              <rect x="1" y="1" width="20" height="32" rx="10" stroke="#CBD5E1" strokeWidth="1.5" />
              <rect x="9" y="6" width="4" height="8" rx="2" fill="#94A3B8" className="ps-scroll-dot" />
            </svg>
          </div>
        </div>


        {/* ══════════════════════════════════════════════════════════════
            PERSISTENT INFO CARD — single card, content transitions in-place
        ══════════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: "absolute",
            top: "50%", left: "3.5%",
            transform: "translateY(-55%)",
            width: "min(340px, 36vw)",
            zIndex: 45,
            opacity: cardOpacity,
            pointerEvents: stage <= 4 ? "auto" : "none",
          }}
        >
          <div style={{
            background: "rgba(255,255,255,0.86)",
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            border: `1.5px solid ${STAGES[si].border}`,
            borderRadius: "22px",
            padding: "26px 28px",
            boxShadow: "0 28px 56px rgba(15,76,129,0.08), 0 8px 20px rgba(15,76,129,0.04)",
            transition: "border-color 0.7s ease",
          }}>
            {/* Stage progress pills */}
            <div style={{ display: "flex", gap: "5px", marginBottom: "18px", alignItems: "center" }}>
              {STAGES.map((s, idx) => (
                <div key={idx} style={{
                  height: "5px", borderRadius: "3px",
                  width: idx + 1 === Math.min(stage, 4) ? "22px" : "5px",
                  background: idx + 1 < Math.min(stage, 4)
                    ? "#14B8A6"
                    : idx + 1 === Math.min(stage, 4)
                    ? STAGES[idx].color
                    : "rgba(148,163,184,0.28)",
                  transition: "all 0.45s cubic-bezier(0.34,1.56,0.64,1)",
                }} />
              ))}
              <span style={{ marginLeft: "auto", fontSize: "10px", color: "#94A3B8", fontWeight: 600 }}>
                {Math.min(stage, 4)}/4
              </span>
            </div>

            {/* Content block — key re-mounts on stage change to trigger entrance animation */}
            <div
              key={`card-${si}`}
              style={{ animation: "ps-card-in 0.45s cubic-bezier(0.34,1.56,0.64,1) both" }}
            >
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                padding: "5px 13px", borderRadius: "999px",
                background: STAGES[si].bg, color: STAGES[si].color,
                fontSize: "10.5px", fontWeight: 700,
                letterSpacing: "0.05em", textTransform: "uppercase",
                marginBottom: "14px", border: `1px solid ${STAGES[si].border}`,
              }}>
                {STAGES[si].badge}
              </div>

              <h3 style={{
                fontSize: "clamp(1rem, 1.75vw, 1.3rem)", fontWeight: 700,
                color: "#1E293B", lineHeight: 1.35,
                marginBottom: "12px", letterSpacing: "-0.01em",
              }}>
                {STAGES[si].title}
              </h3>

              <p style={{
                color: "#64748B",
                fontSize: "clamp(0.78rem, 1.05vw, 0.88rem)",
                lineHeight: 1.65, margin: 0,
              }}>
                {STAGES[si].desc}
              </p>
            </div>
          </div>
        </div>


        {/* ══════════════════════════════════════════════════════════════
            FINAL HUB OVERLAY — Stage 5 UI
        ══════════════════════════════════════════════════════════════ */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "flex-start",
          paddingTop: "4.5vh",
          zIndex: 40,
          opacity: hubP,
          pointerEvents: isHub ? "auto" : "none",
        }}>
          <div style={{ textAlign: "center", maxWidth: "580px", padding: "0 24px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "6px 18px", borderRadius: "999px",
              background: "rgba(20,184,166,0.12)", border: "1px solid rgba(20,184,166,0.35)",
              color: "#0D9488", fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px",
            }}>
              ✦ Solusi Terintegrasi
            </div>
            <h2 style={{
              fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)", fontWeight: 800,
              color: "#1E293B", lineHeight: 1.2,
              marginBottom: "8px", letterSpacing: "-0.02em",
            }}>
              SirkuLaut Menghubungkan<br />
              <span style={{
                background: "linear-gradient(135deg, #0F4C81 0%, #14B8A6 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Seluruh Ekosistem Perikanan
              </span>
            </h2>
            <p style={{ color: "#64748B", fontSize: "0.95rem", fontWeight: 500 }}>
              Dari Laut ke Meja, Tanpa Sisa.
            </p>
          </div>

          {/* Success indicators — staggered entrance */}
          <div style={{
            position: "absolute", bottom: "4%",
            left: "50%", transform: "translateX(-50%)",
            display: "flex", flexWrap: "wrap",
            justifyContent: "center", gap: "10px",
            maxWidth: "660px", width: "90%",
          }}>
            {SUCCESS.map((item, idx) => {
              const p = easeOut(rng(sp, 0.90 + idx * 0.026, 1.0));
              return (
                <div key={idx} style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  background: "rgba(255,255,255,0.88)",
                  backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                  padding: "10px 18px", borderRadius: "12px",
                  color: "#0F4C81", fontWeight: 600, fontSize: "0.84rem",
                  boxShadow: "0 4px 20px rgba(15,76,129,0.08)",
                  border: "1px solid rgba(20,184,166,0.25)",
                  opacity: p, transform: `translateY(${(1 - p) * 14}px)`,
                }}>
                  <div style={{
                    width: "22px", height: "22px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #14B8A6, #0F4C81)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "11px", flexShrink: 0, color: "white", fontWeight: 700,
                  }}>✓</div>
                  {item.icon} {item.text}
                </div>
              );
            })}
          </div>
        </div>


        {/* ══════════════════════════════════════════════════════════════
            BOTTOM PROGRESS PATH — curved ocean journey indicator
        ══════════════════════════════════════════════════════════════ */}
        <div style={{
          position: "absolute", bottom: "2.5%",
          left: "50%", transform: "translateX(-50%)",
          width: "min(480px, 76vw)",
          zIndex: 55,
          opacity: clamp(1 - rng(sp, 0.81, 0.92) * 2),
        }}>
          <svg viewBox="0 0 480 58" style={{ width: "100%", overflow: "visible" }}>
            {/* Background track */}
            <path d="M 10 40 Q 120 13 240 28 T 470 19"
              fill="none" stroke="rgba(15,76,129,0.10)" strokeWidth="3" strokeLinecap="round" />
            {/* Filled progress */}
            <path d="M 10 40 Q 120 13 240 28 T 470 19"
              fill="none" stroke="url(#ps-route)" strokeWidth="3" strokeLinecap="round"
              strokeDasharray="480" strokeDashoffset={480 * (1 - clamp(sp / 0.84))} />

            {/* Milestone nodes */}
            {([
              { cx: 10,  cy: 40, label: "Laut",        thresh: 0    },
              { cx: 122, cy: 16, label: "Nelayan",      thresh: 0.14 },
              { cx: 240, cy: 27, label: "Distribusi",   thresh: 0.38 },
              { cx: 358, cy: 20, label: "Rantai Pasok", thresh: 0.60 },
              { cx: 470, cy: 19, label: "SirkuLaut",    thresh: 0.84 },
            ] as const).map((m, mi) => {
              const reached  = sp >= m.thresh;
              const isCur    = mi === Math.min(Math.floor(sp / 0.22), 4);
              return (
                <g key={mi}>
                  {isCur && (
                    <g transform={`translate(${m.cx}, ${m.cy})`}>
                      <circle r="14" fill="rgba(15,76,129,0.12)" className="ps-milestone-ring" />
                    </g>
                  )}
                  <circle cx={m.cx} cy={m.cy}
                    r={isCur ? 7 : 5}
                    fill={reached ? "#0F4C81" : "rgba(148,163,184,0.3)"}
                    stroke={reached ? "#38BDF8" : "rgba(148,163,184,0.4)"}
                    strokeWidth="1.5"
                  />
                  <text x={m.cx} y={m.cy + 18}
                    fill={reached ? "#0F4C81" : "rgba(148,163,184,0.55)"}
                    fontSize="8.5" fontWeight={isCur ? "700" : "500"} textAnchor="middle"
                    style={{ fontFamily: "Poppins, sans-serif" }}>
                    {m.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>


        {/* ══════════════════════════════════════════════════════════════
            CSS KEYFRAME ANIMATIONS
        ══════════════════════════════════════════════════════════════ */}
        <style>{`
          /* Card content entrance */
          @keyframes ps-card-in {
            from { opacity: 0; transform: translateY(13px) scale(0.975); }
            to   { opacity: 1; transform: translateY(0)    scale(1);     }
          }

          /* Fish trailing bubbles */
          @keyframes ps-bubble {
            0%,100% { transform: translateY(0);   opacity: 0.42; }
            50%     { transform: translateY(-8px); opacity: 0.85; }
          }

          /* Fish tail wag */
          @keyframes ps-fish-tail {
            0%,100% { transform: skewY(0deg);   transform-origin: 57px 24px; }
            38%     { transform: skewY(11deg);  transform-origin: 57px 24px; }
            72%     { transform: skewY(-11deg); transform-origin: 57px 24px; }
          }
          .ps-fish-tail { animation: ps-fish-tail 0.52s ease-in-out infinite; }

          /* Animated dashed lines */
          @keyframes ps-dash-flow {
            to { stroke-dashoffset: -28; }
          }
          .ps-dash-flow { animation: ps-dash-flow 2.4s linear infinite; }

          /* Warehouse spotlight glow */
          @keyframes ps-glow {
            0%,100% { opacity: 0.65; }
            50%     { opacity: 1;    }
          }
          .ps-glow { animation: ps-glow 2s ease-in-out infinite; }

          /* Milestone pulse ring (scale via CSS transform on SVG <circle>) */
          @keyframes ps-milestone-ring {
            0%,100% { transform: scale(1);   opacity: 0.12; }
            50%     { transform: scale(1.45); opacity: 0.22; }
          }
          .ps-milestone-ring { animation: ps-milestone-ring 1.6s ease-in-out infinite; }

          /* Scroll indicator bounce */
          @keyframes ps-scroll-hint {
            0%,100% { transform: translateY(0);  opacity: 0.65; }
            50%     { transform: translateY(6px); opacity: 1;    }
          }
          .ps-scroll-hint { animation: ps-scroll-hint 1.9s ease-in-out infinite; }

          /* Scroll mouse dot */
          @keyframes ps-scroll-dot {
            0%     { transform: translateY(0px);  opacity: 1;   }
            60%    { transform: translateY(14px); opacity: 0.3; }
            100%   { transform: translateY(14px); opacity: 0;   }
          }
          .ps-scroll-dot { animation: ps-scroll-dot 1.9s ease-in-out infinite; }

          /* Prevent text selection in SVG */
          #problem svg text { user-select: none; pointer-events: none; }
        `}</style>

      </div>
    </section>
  );
}