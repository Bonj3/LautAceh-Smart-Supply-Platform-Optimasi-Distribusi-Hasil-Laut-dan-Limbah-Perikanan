import React, { useEffect, useRef, useState } from "react";
import { FishProtagonist } from "./ProblemSection/Fish";

/* ═══════════════════════════════════════════════════════════════════════════
   0. SCENE ASSETS — Isi path/URL foto di sini untuk mengganti ilustrasi SVG
   Gunakan: import myPhoto from "./assets/foto.jpg" lalu isi di bawah.
   Jika string kosong (""), ilustrasi SVG default tetap ditampilkan.
════════════════════════════════════════════════════════════════════════════ */

export const SCENE_ASSETS = {
  /** Foto/ilustrasi laut atau nelayan di atas kapal */
  boat: "",
  /** Foto/ilustrasi truk distribusi ikan */
  truck: "",
  /** Foto/ilustrasi gudang cold storage / depo */
  warehouse: "",
  /** Foto/ilustrasi restoran / meja makan */
  restaurant: "",
  /** Foto/ilustrasi nelayan untuk scene awal */
  fisherman: "",
  /** Logo atau gambar untuk hub SirkuLaut di scene akhir */
  hubLogo: "",
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   1. MATH / EASING UTILITIES
   Semua animasi diturunkan dari satu angka: scrollProgress (0–1).
════════════════════════════════════════════════════════════════════════════ */

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
const easeOut = (t: number) => 1 - (1 - t) * (1 - t);
const easeIn = (t: number) => t * t;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

/** Progress 0→1 di dalam window [start, end] */
const rng = (p: number, s: number, e: number) => clamp((p - s) / (e - s));

/** Siklus alpha objek: masuk → easeOut ke 1 → bertahan → easeIn ke 0 → hilang */
function objectAlpha(p: number, enter: number, peak: number, fade: number, gone: number): number {
  if (p < enter) return 0;
  if (p < peak) return easeOut(rng(p, enter, peak));
  if (p < fade) return 1;
  if (p < gone) return 1 - easeIn(rng(p, fade, gone));
  return 0;
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. SCENE TIMELINE — satu tempat untuk melihat "kapan apa muncul"
   Format tiap entri: [enter, peak, fade, gone]
   Mengubah pacing cerita cukup dengan mengubah angka di sini.
════════════════════════════════════════════════════════════════════════════ */

const TIMELINE = {
  ocean: [0.00, 0.05, 0.95, 1.00],
  waves: [0.00, 0.06, 0.94, 1.00],
  sun: [0.00, 0.08, 0.42, 0.60],
  boat: [0.02, 0.12, 0.48, 0.78],
  bubbles: [0.02, 0.10, 0.44, 0.72],
  truck: [0.16, 0.30, 0.68, 0.90],
  warehouse: [0.24, 0.38, 0.74, 0.92],
  restaurant: [0.28, 0.44, 0.78, 0.94],
  route: [0.18, 0.38, 0.72, 0.90],
  network: [0.42, 0.58, 0.86, 0.96],
  skeleton: [0.56, 0.72, 0.90, 0.98],
  hub: [0.78, 0.90, 1.00, 1.00],
} as const;

type SceneKey = keyof typeof TIMELINE;

/** Alpha untuk satu scene, dibaca langsung dari TIMELINE */
const alphaOf = (sp: number, key: SceneKey): number => {
  const [enter, peak, fade, gone] = TIMELINE[key]; // destructure, bukan spread
  return objectAlpha(sp, enter, peak, fade, gone);
};
/* ═══════════════════════════════════════════════════════════════════════════
   3. BACKGROUND GRADIENT — 5 keyframe warna diinterpolasi
════════════════════════════════════════════════════════════════════════════ */

type RGB = [number, number, number];
const hexToRgb = (h: string): RGB => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];
const mixRgb = (a: RGB, b: RGB, t: number) =>
  `rgb(${Math.round(lerp(a[0], b[0], t))},${Math.round(lerp(a[1], b[1], t))},${Math.round(lerp(a[2], b[2], t))})`;

const BG_KEYFRAMES: Array<{ p: number; t: string; b: string }> = [
  { p: 0.00, t: "#B8DFF5", b: "#0F4C81" },
  { p: 0.22, t: "#C5E8F5", b: "#155E8A" },
  { p: 0.50, t: "#EFF6FF", b: "#1E3A8A" },
  { p: 0.72, t: "#ECFDF5", b: "#0D9488" },
  { p: 1.00, t: "#F8FAFC", b: "#1E293B" },
];

function getBackground(p: number) {
  for (let i = 0; i < BG_KEYFRAMES.length - 1; i++) {
    const a = BG_KEYFRAMES[i], b = BG_KEYFRAMES[i + 1];
    if (p <= b.p) {
      const t = easeInOut((p - a.p) / (b.p - a.p));
      return { top: mixRgb(hexToRgb(a.t), hexToRgb(b.t), t), bottom: mixRgb(hexToRgb(a.b), hexToRgb(b.b), t) };
    }
  }
  const last = BG_KEYFRAMES[BG_KEYFRAMES.length - 1];
  return { top: last.t, bottom: last.b };
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. STORY DATA — konten terpisah dari visual
════════════════════════════════════════════════════════════════════════════ */

const STAGES = [
  {
    badge: "⚠ Harga Belum Transparan",
    title: "Hasil laut dimulai dari kerja keras para nelayan.",
    desc: "Banyak nelayan masih bergantung pada tengkulak sehingga harga jual ikan belum mencerminkan nilai pasar yang sebenarnya.",
    color: "#DC2626", bg: "rgba(220,38,38,0.1)", border: "rgba(220,38,38,0.25)",
  },
  {
    badge: "⚠ Distribusi Belum Efisien",
    title: "Perjalanan hasil laut berlanjut menuju pasar.",
    desc: "Distribusi masih dilakukan secara manual sehingga pasokan untuk restoran dan hotel sering tidak konsisten.",
    color: "#D97706", bg: "rgba(217,119,6,0.1)", border: "rgba(217,119,6,0.25)",
  },
  {
    badge: "⚠ Rantai Pasok Belum Terintegrasi",
    title: "Informasi stok masih tersebar dan tidak terhubung.",
    desc: "Data stok, permintaan, dan distribusi belum saling terhubung sehingga sering terjadi ketidakseimbangan pasokan.",
    color: "#7C3AED", bg: "rgba(124,58,237,0.1)", border: "rgba(124,58,237,0.25)",
  },
  {
    badge: "⚠ Limbah Belum Dimanfaatkan",
    title: "Masih banyak potensi ekonomi yang terbuang.",
    desc: "Kepala, tulang, kulit, dan sisik ikan masih belum dimanfaatkan secara optimal meskipun memiliki nilai ekonomi tinggi.",
    color: "#059669", bg: "rgba(5,150,105,0.1)", border: "rgba(5,150,105,0.25)",
  },
];

const HUB_NODES = [
  { label: "Fishermen", icon: "⚓", angle: 270 },
  { label: "Distribution", icon: "🚚", angle: 315 },
  { label: "Warehouse", icon: "🏭", angle: 0 },
  { label: "Fish Processor", icon: "🧪", angle: 45 },
  { label: "Circular Industry", icon: "♻️", angle: 90 },
  { label: "Marketplace", icon: "🛒", angle: 135 },
  { label: "Inventory", icon: "📦", angle: 180 },
  { label: "Restaurant", icon: "🍽️", angle: 225 },
  { label: "Hotel", icon: "🏨", angle: 255 },
  { label: "Consumer", icon: "👥", angle: 300 },
];

const SUCCESS = [
  { text: "Harga Lebih Transparan", icon: "💰" },
  { text: "Distribusi Digital", icon: "🚚" },
  { text: "Inventory Terintegrasi", icon: "📊" },
  { text: "Circular Economy", icon: "♻️" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   5. HOOK: scroll progress
   Satu-satunya tempat yang membaca DOM / listen scroll.
════════════════════════════════════════════════════════════════════════════ */

function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [sp, setSp] = useState(0);
  useEffect(() => {
    let id: number;
    const tick = () => {
      if (ref.current) {
        const { top, height } = ref.current.getBoundingClientRect();
        setSp(clamp(-top / (height - window.innerHeight)));
      }
      id = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(id);
  }, [ref]);
  return sp;
}

/* ═══════════════════════════════════════════════════════════════════════════
   6. SHARED STYLE HELPERS
   Menghindari duplikasi inline-style (mis. gradient text dipakai 2x di original)
════════════════════════════════════════════════════════════════════════════ */

const gradientTextStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #0F4C81 0%, #14B8A6 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

function EyebrowBadge({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "teal" }) {
  const palette =
    tone === "teal"
      ? { bg: "rgba(20,184,166,0.12)", border: "rgba(20,184,166,0.35)", color: "#0D9488" }
      : { bg: "rgba(15,76,129,0.08)", border: "rgba(15,76,129,0.14)", color: "#0F4C81" };
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "8px",
      padding: "6px 18px", borderRadius: "999px",
      background: palette.bg, border: `1px solid ${palette.border}`,
      color: palette.color, fontSize: "11px", fontWeight: 700,
      letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px",
    }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   7. SCENE COMPONENTS
   Tiap objek dunia adalah komponen kecil yang mandiri: baca sp,
   hitung alpha-nya sendiri dari TIMELINE, render atau return null.
════════════════════════════════════════════════════════════════════════════ */

function OceanFloor({ sp }: { sp: number }) {
  return <rect x="0" y="740" width="1440" height="160" fill="url(#ps-ocean)" opacity={alphaOf(sp, "ocean")} />;
}

/** Garis perjalanan yang selalu terlihat — jalur laut → daratan → hub */
function JourneyPath({ sp }: { sp: number }) {
  const PATH_D = "M 240 730 C 360 600, 540 260, 720 400 S 1030 620, 1180 660";
  return (
    <>
      <path d={PATH_D} fill="none" stroke="rgba(56,189,248,0.16)" strokeWidth="4" strokeLinecap="round" />
      <path
        d={PATH_D} fill="none" stroke="url(#ps-route)" strokeWidth="2.5" strokeLinecap="round"
        strokeDasharray="10 12" opacity={0.55 + clamp(sp / 0.8) * 0.2} className="ps-dash-flow"
      />
    </>
  );
}

const WAVE_LAYERS = [
  { y: 748, amp: 20, spd: 0.7, col: "#38BDF8", sw: 3, op: 0.38 },
  { y: 768, amp: 13, spd: 1.2, col: "#0F4C81", sw: 2, op: 0.26 },
  { y: 782, amp: 8, spd: 1.7, col: "#38BDF8", sw: 1.5, op: 0.20 },
];

function WaveLayers({ sp }: { sp: number }) {
  const a = alphaOf(sp, "waves");
  if (a < 0.01) return null;
  return (
    <>
      {WAVE_LAYERS.map((w, wi) => {
        const phase = (sp * 380 * w.spd) % 360;
        const d = `M ${-phase} ${w.y} ` +
          [1, 2, 3, 4, 5].map((i) => `Q ${i * 360 - 180 - phase} ${w.y - w.amp} ${i * 360 - phase} ${w.y}`).join(" ");
        return <path key={wi} d={d} stroke={w.col} strokeWidth={w.sw} fill="none" opacity={a * w.op} />;
      })}
    </>
  );
}

function SunRays({ sp }: { sp: number }) {
  const a = alphaOf(sp, "sun");
  if (a < 0.01) return null;
  return (
    <g opacity={a}>
      <circle cx="1250" cy="65" r="58" fill="#FDE68A" opacity="0.12" />
      <circle cx="1250" cy="65" r="34" fill="#FDE68A" opacity="0.65" />
      <circle cx="1250" cy="65" r="21" fill="#FEF3C7" opacity="0.9" />
      {Array.from({ length: 10 }, (_, ri) => {
        const rad = ((ri * 36) * Math.PI) / 180;
        return (
          <line key={ri}
            x1={1250 + Math.cos(rad) * 40} y1={65 + Math.sin(rad) * 40}
            x2={1250 + Math.cos(rad) * 68} y2={65 + Math.sin(rad) * 68}
            stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" opacity="0.65"
          />
        );
      })}
      {[280, 480, 680, 880, 1060].map((lx, li) => (
        <ellipse key={li} cx={lx} cy={790 + li * 8} rx={18 + li * 6} ry="4" fill="#38BDF8" opacity="0.07" />
      ))}
    </g>
  );
}

function BoatScene({ sp }: { sp: number }) {
  const a = alphaOf(sp, "boat");
  if (a < 0.01) return null;
  const enterP = rng(sp, 0.03, 0.20);
  const bx = lerp(-150, 200, easeOut(enterP));
  const bFloat = Math.sin(sp * Math.PI * 28) * 5;
  const dim = 1 - rng(sp, 0.32, 0.56) * 0.5;
  return (
    <g opacity={a * dim} transform={`translate(${bx}, ${758 + bFloat})`}>
      <ellipse cx="0" cy="30" rx="85" ry="9" fill="#38BDF8" opacity="0.1" />
      <path d="M -92 8 Q -80 28 80 28 Q 92 8 92 8 Z" fill="#0F4C81" opacity="0.92" />
      <path d="M -92 8 L -80 28 L 80 28 L 92 8" fill="none" stroke="#38BDF8" strokeWidth="1" opacity="0.3" />
      <rect x="-18" y="-22" width="58" height="28" rx="4" fill="#1E3A8A" opacity="0.82" />
      <rect x="-10" y="-16" width="18" height="13" rx="2" fill="#38BDF8" opacity="0.5" />
      <rect x="16" y="-16" width="14" height="13" rx="2" fill="#38BDF8" opacity="0.4" />
      {/* ── FOTO KAPAL (opsional) ─────────────────────────────────────────
          Import foto di SCENE_ASSETS.boat untuk menampilkan foto nyata.
          Contoh: import boatPhoto from "../assets/boat.jpg"
                  lalu isi SCENE_ASSETS.boat = boatPhoto
      ──────────────────────────────────────────────────────────────────── */}
      {SCENE_ASSETS.boat ? (
        <g clipPath="url(#ps-clip-boat)">
          <image href={SCENE_ASSETS.boat} x="-92" y="-87" width="184" height="174"
            preserveAspectRatio="xMidYMid slice" />
          {/* overlay warna supaya foto blend dengan palet scene */}
          <rect x="-92" y="-87" width="184" height="174" rx="92"
            fill="url(#ps-photo-blend)" />
        </g>
      ) : (
        <>
      <line x1="-42" y1="-22" x2="-42" y2="-108" stroke="#1E293B" strokeWidth="2.5" />
      <path d="M -42 -108 L -42 -18 L 22 -18 Z" fill="#EFF6FF" opacity="0.78" />
      <path d="M -42 -108 L -42 -22 L -86 -32 Z" fill="#B8DFF5" opacity="0.52" />
      <path d="M -42 -108 L -20 -100 L -42 -92 Z" fill="#38BDF8" opacity="0.9" />
      <circle cx="-58" cy="-34" r="9" fill="#1E293B" />
      <path d="M -66 -42 L -50 -42 L -48 -34 L -68 -34 Z" fill="#0F4C81" />
      <rect x="-68" y="-43" width="22" height="2.5" rx="1" fill="#0F4C81" />
      <path d="M -58 -25 L -58 -8" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M -70 -18 L -58 -16 L -46 -18" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M -58 -16 L -106 -58 L -138 -28" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M -138 -28 L -148 -6 L -145 22" stroke="#94A3B8" strokeWidth="1" fill="none" />
        </>
      )}
      {[0, 1, 2, 3].map((ni) => (
        <path key={ni}
          d={`M ${-90 + ni * 16} 28 Q ${-84 + ni * 16} ${50 + ni * 6} ${-72 + ni * 16} 42`}
          stroke="#38BDF8" strokeWidth="1.2" fill="none" opacity="0.38" strokeDasharray="4 3"
        />
      ))}
    </g>
  );
}

const BUBBLE_SPOTS = [
  { x: 180, r: 5 }, { x: 310, r: 3 }, { x: 490, r: 6 }, { x: 640, r: 4 },
  { x: 790, r: 7 }, { x: 920, r: 3 }, { x: 1050, r: 5 },
];

function RisingBubbles({ sp }: { sp: number }) {
  const a = alphaOf(sp, "bubbles");
  if (a < 0.01) return null;
  return (
    <g opacity={a}>
      {BUBBLE_SPOTS.map((b, bi) => {
        const by = 820 - ((sp * 480 * (bi + 1)) % 180);
        return <circle key={bi} cx={b.x} cy={by} r={b.r} fill="none" stroke="#38BDF8" strokeWidth="1.5" opacity={0.55 - bi * 0.05} />;
      })}
    </g>
  );
}

function TruckScene({ sp }: { sp: number }) {
  const a = alphaOf(sp, "truck");
  if (a < 0.01) return null;
  const tp = rng(sp, 0.20, 0.44);
  const tx = lerp(520, 850, easeOut(tp));
  const speed = 1 - clamp(tp * 1.4);
  const visibility = a * (0.7 + clamp(sp / 0.76) * 0.3);
  return (
    <g opacity={visibility} transform={`translate(${tx}, 748)`}>
      {speed > 0.2 && [0, 1, 2, 3].map((si) => (
        <line key={si}
          x1={-195 - si * 38} y1={-26 + si * 9} x2={-128 - si * 38} y2={-26 + si * 9}
          stroke="#38BDF8" strokeWidth={2.2 - si * 0.5} strokeLinecap="round" opacity={speed * (0.55 - si * 0.1)}
        />
      ))}
      {/* ── FOTO TRUK (opsional) ──────────────────────────────────────────
          Import foto di SCENE_ASSETS.truck untuk menampilkan foto nyata.
          Foto akan di-crop ke bounding box bodi + kabin truk.
      ──────────────────────────────────────────────────────────────────── */}
      <ellipse cx="80" cy="12" rx="178" ry="11" fill="#1E293B" opacity="0.09" />
      {SCENE_ASSETS.truck ? (
        <g clipPath="url(#ps-clip-truck)">
          <image href={SCENE_ASSETS.truck} x="-155" y="-78" width="312" height="90"
            preserveAspectRatio="xMidYMid slice" />
          <rect x="-155" y="-78" width="312" height="90" rx="6"
            fill="url(#ps-photo-blend)" />
          {/* Label tetap tampil di atas foto */}
          <text x="-43" y="-35" fill="white" fontSize="12" fontWeight="700" textAnchor="middle"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>SirkuShip</text>
        </g>
      ) : (
        <>
      <rect x="-155" y="-72" width="208" height="72" rx="4" fill="#1E293B" opacity="0.9" />
      {[-118, -66, -14, 38].map((sx, si) => (
        <line key={si} x1={sx} y1="-68" x2={sx} y2="0" stroke="#334155" strokeWidth="1" opacity="0.6" />
      ))}
      <rect x="-150" y="-62" width="5" height="58" rx="2" fill="#38BDF8" opacity="0.3" />
      <rect x="-108" y="-54" width="130" height="28" rx="3" fill="rgba(56,189,248,0.1)" />
      <text x="-43" y="-35" fill="#38BDF8" fontSize="12" fontWeight="700" textAnchor="middle">SirkuShip</text>
      <rect x="53" y="-78" width="104" height="78" rx="6" fill="#1E293B" opacity="0.95" />
      <path d="M 59 -74 L 59 -40 L 150 -40 L 150 -74 Z" fill="#38BDF8" opacity="0.38" />
      <line x1="105" y1="-74" x2="105" y2="-40" stroke="#1E293B" strokeWidth="2" opacity="0.5" />
      <circle cx="154" cy="-28" r="9" fill="#FDE68A" opacity="0.75" />
      <circle cx="154" cy="-28" r="14" fill="#FDE68A" opacity="0.14" />
        </>
      )}
      {[-88, 2, 88, 140].map((wx) => (
        <g key={wx} transform={`translate(${wx}, 9)`}>
          <circle r="20" fill="#0F172A" />
          <circle r="13" fill="#334155" />
          <circle r="5" fill="#64748B" />
          <line x1="0" y1="-13" x2="0" y2="-5" stroke="#64748B" strokeWidth="2" strokeLinecap="round" transform={`rotate(${(sp * 2400) % 360})`} />
          <line x1="-13" y1="0" x2="-5" y2="0" stroke="#64748B" strokeWidth="2" strokeLinecap="round" transform={`rotate(${(sp * 2400) % 360})`} />
        </g>
      ))}
    </g>
  );
}

function WarehouseScene({ sp }: { sp: number }) {
  const a = alphaOf(sp, "warehouse");
  if (a < 0.01) return null;
  const scale = easeOut(rng(sp, 0.26, 0.44));
  const dim = 1 - rng(sp, 0.58, 0.76) * 0.4;
  return (
    <g opacity={a * dim}>
      <g transform={`translate(350, 728) scale(${scale})`} style={{ transformOrigin: "350px 728px" }}>
        <ellipse cx="0" cy="8" rx="88" ry="12" fill="#1E293B" opacity="0.11" />
        {/* ── FOTO GUDANG (opsional) ──────────────────────────────────────
            Import foto di SCENE_ASSETS.warehouse untuk menampilkan foto nyata.
            Foto akan di-crop ke bentuk poligon bangunan gudang.
        ─────────────────────────────────────────────────────────────────── */}
        {SCENE_ASSETS.warehouse ? (
          <g clipPath="url(#ps-clip-warehouse)">
            <image href={SCENE_ASSETS.warehouse} x="-88" y="-174" width="176" height="182"
              preserveAspectRatio="xMidYMid slice" />
            <polygon points="-88,0 -88,-132 0,-174 88,-132 88,0"
              fill="url(#ps-photo-blend)" />
          </g>
        ) : (
          <path d="M -88 0 L -88 -132 L 0 -174 L 88 -132 L 88 0 Z" fill="#0F4C81" opacity="0.88" />
        )}
        <path d="M -88 -132 L 0 -174 L 88 -132" fill="none" stroke="#38BDF8" strokeWidth="2" opacity="0.4" />
        {[-60, -36, -12, 12, 36, 60].map((wx) => (
          <line key={wx} x1={wx} y1="0" x2={wx} y2="-122" stroke="#38BDF8" strokeWidth="1" opacity="0.07" />
        ))}
        <rect x="-24" y="-66" width="48" height="66" rx="2" fill="#0F172A" opacity="0.65" />
        <line x1="0" y1="-66" x2="0" y2="0" stroke="#1E3A8A" strokeWidth="1.5" />
        <rect x="-70" y="-122" width="36" height="22" rx="3" fill="#38BDF8" opacity="0.42" />
        <rect x="34" y="-122" width="36" height="22" rx="3" fill="#38BDF8" opacity="0.42" />
        <circle r="7" cx="0" cy="-158" fill="#FDE68A" opacity="0.88" className="ps-glow" />
        <text x="0" y="-188" fill="white" fontSize="14" fontWeight="700" textAnchor="middle" opacity="0.82">GUDANG</text>
        {[0, 1].map((bi) => (
          <rect key={bi} x={70 + bi * 2} y={-32 + bi * 20} width="18" height="18" rx="2" fill="#38BDF8" opacity="0.28" stroke="#38BDF8" strokeWidth="1" />
        ))}
      </g>
    </g>
  );
}

function RestaurantScene({ sp }: { sp: number }) {
  const a = alphaOf(sp, "restaurant");
  if (a < 0.01) return null;
  const scale = easeOut(rng(sp, 0.30, 0.50));
  const dim = 1 - rng(sp, 0.58, 0.76) * 0.4;
  return (
    <g opacity={a * dim}>
      <g transform={`translate(1150, 728) scale(${scale})`} style={{ transformOrigin: "1150px 728px" }}>
        <ellipse cx="0" cy="8" rx="98" ry="12" fill="#1E293B" opacity="0.11" />
        {/* ── FOTO RESTORAN (opsional) ─────────────────────────────────────
            Import foto di SCENE_ASSETS.restaurant untuk menampilkan foto nyata.
            Foto akan di-clip ke bentuk poligon bangunan restoran.
        ──────────────────────────────────────────────────────────────────── */}
        {SCENE_ASSETS.restaurant ? (
          <g clipPath="url(#ps-clip-restaurant)">
            <image href={SCENE_ASSETS.restaurant} x="-108" y="-160" width="216" height="168"
              preserveAspectRatio="xMidYMid slice" />
            <polygon points="-108,-114 0,-160 108,-114 98,8 -98,8"
              fill="url(#ps-photo-blend)" />
            {/* Label tetap tampil */}
            <rect x="-62" y="-112" width="124" height="26" rx="4" fill="rgba(13,148,136,0.85)" />
            <text x="0" y="-93" fill="white" fontSize="13" fontWeight="700" textAnchor="middle">RESTORAN</text>
          </g>
        ) : (
          <>
        <rect x="-98" y="-114" width="196" height="122" rx="5" fill="#14B8A6" opacity="0.86" />
        <path d="M -108 -114 L 0 -160 L 108 -114 Z" fill="#0D9488" opacity="0.9" />
          </>
        )}
        <rect x="-80" y="-94" width="58" height="46" rx="4" fill="#F0FDFA" opacity="0.58" />
        <rect x="22" y="-94" width="58" height="46" rx="4" fill="#F0FDFA" opacity="0.58" />
        <line x1="-51" y1="-94" x2="-51" y2="-48" stroke="#0D9488" strokeWidth="1.5" />
        <line x1="51" y1="-94" x2="51" y2="-48" stroke="#0D9488" strokeWidth="1.5" />
        <rect x="-62" y="-112" width="124" height="26" rx="4" fill="#0D9488" />
        <text x="0" y="-93" fill="white" fontSize="13" fontWeight="700" textAnchor="middle">RESTORAN</text>
        <rect x="-17" y="-46" width="34" height="54" rx="3" fill="#0F766E" />
        <text x="0" y="-175" fill="white" fontSize="14" fontWeight="600" textAnchor="middle" opacity="0.82">RESTORAN</text>
      </g>
    </g>
  );
}

/* ─── Petunjuk penggunaan foto di RestaurantScene ────────────────────────────
   Untuk menambah foto restoran, import di atas lalu isi SCENE_ASSETS.restaurant.
   Foto akan di-clip ke bentuk bangunan restoran (polygon atap + badan).
   Contoh:
     import restaurantImg from "../assets/restaurant.jpg";
     // lalu di SCENE_ASSETS: restaurant: restaurantImg
─────────────────────────────────────────────────────────────────────────────── */

function DistributionRoute({ sp }: { sp: number }) {
  const a = alphaOf(sp, "route");
  if (a < 0.01) return null;
  const lP = rng(sp, 0.30, 0.55);
  const len = 800;
  return (
    <g opacity={a}>
      <path
        d="M 350 730 L 1150 730"
        fill="none" stroke="url(#ps-route)" strokeWidth="3.5" strokeLinecap="round"
        strokeDasharray={len} strokeDashoffset={len * (1 - lP)}
      />
      {lP > 0.4 && (
        <>
          <circle cx="616" cy="730" r="6" fill="#38BDF8" opacity="0.85">
            <animate attributeName="opacity" values="0.35;0.9;0.35" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="900" cy="730" r="6" fill="#14B8A6" opacity="0.85">
            <animate attributeName="opacity" values="0.35;0.9;0.35" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
          </circle>
        </>
      )}
    </g>
  );
}

const NETWORK_NODES = [
  { x: 720, y: 380, label: "DATA HUB", r: 30, col: "#7C3AED" },
  { x: 350, y: 650, label: "Gudang", r: 20, col: "#0F4C81" },
  { x: 1150, y: 650, label: "Restoran", r: 20, col: "#14B8A6" },
  { x: 450, y: 250, label: "Nelayan", r: 20, col: "#0F4C81" },
  { x: 990, y: 250, label: "Distribusi", r: 20, col: "#14B8A6" },
  { x: 720, y: 180, label: "Permintaan", r: 18, col: "#7C3AED" },
  { x: 720, y: 550, label: "Stok", r: 18, col: "#7C3AED" },
];
const NETWORK_CROSS_LINKS: [number, number][] = [[1, 3], [2, 4], [5, 1], [6, 2]];
const NETWORK_BAR_HEIGHTS = [10, 6, 8, 5, 9];

function NetworkScene({ sp }: { sp: number }) {
  const a = alphaOf(sp, "network");
  if (a < 0.01) return null;
  const widgetAlpha = rng(sp, 0.60, 0.75);
  return (
    <g opacity={a}>
      {NETWORK_NODES.slice(1).map((n, ni) => (
        <line key={ni}
          x1={NETWORK_NODES[0].x} y1={NETWORK_NODES[0].y} x2={n.x} y2={n.y}
          stroke="url(#ps-net)" strokeWidth="2" strokeDasharray="8 6"
          opacity={rng(sp, 0.51 + ni * 0.018, 0.64 + ni * 0.018) * 0.75} className="ps-dash-flow"
        />
      ))}
      {NETWORK_CROSS_LINKS.map(([a2, b2], ci) => (
        <line key={ci}
          x1={NETWORK_NODES[a2].x} y1={NETWORK_NODES[a2].y} x2={NETWORK_NODES[b2].x} y2={NETWORK_NODES[b2].y}
          stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="5 5"
          opacity={rng(sp, 0.60 + ci * 0.02, 0.70 + ci * 0.02) * 0.35} className="ps-dash-flow"
        />
      ))}
      {NETWORK_NODES.map((n, ni) => {
        const nA = rng(sp, 0.50 + ni * 0.015, 0.62 + ni * 0.015);
        const nS = easeOut(nA);
        return (
          <g key={ni} opacity={nA} transform={`translate(${n.x}, ${n.y}) scale(${nS})`}>
            <circle r={n.r + 14} fill={n.col} opacity="0.10" />
            <circle r={n.r} fill={n.col} opacity="0.92" />
            <circle r={n.r + 2} fill="none" stroke={n.col} strokeWidth="1.5" opacity="0.4" />
            <text y="5" fill="white" fontSize={ni === 0 ? "9" : "8"} fontWeight="700" textAnchor="middle">{n.label}</text>
            {ni === 0 && (
              <g transform="translate(-12, 12)">
                {NETWORK_BAR_HEIGHTS.map((h, bi) => (
                  <rect key={bi} x={bi * 6} y={-h} width="4" height={h} rx="1" fill="white" opacity="0.45" />
                ))}
              </g>
            )}
          </g>
        );
      })}
      {widgetAlpha > 0 && (
        <g opacity={widgetAlpha} transform="translate(468, 388)">
          <rect x="-64" y="-38" width="128" height="76" rx="8" fill="rgba(255,255,255,0.11)" stroke="rgba(124,58,237,0.45)" strokeWidth="1.5" />
          <text x="0" y="-21" fill="white" fontSize="7.5" fontWeight="600" textAnchor="middle" opacity="0.82">INVENTORI REAL-TIME</text>
          {[20, 26, 16].map((h, bi) => (
            <rect key={bi} x={-44 + bi * 34} y={22 - h} width="22" height={h} rx="2" fill={["#38BDF8", "#14B8A6", "#7C3AED"][bi]} opacity="0.82" />
          ))}
        </g>
      )}
    </g>
  );
}

const SKELETON_RIBS = [-104, -72, -40, -8, 24, 56, 88, 118];
const SKELETON_LEAF_ANGLES = [0, 120, 240];
const SKELETON_VALUES = [
  { label: "Kolagen", angle: 55 },
  { label: "Biogas", angle: 180 },
  { label: "Kompos", angle: 305 },
];

function SkeletonScene({ sp }: { sp: number }) {
  const a = alphaOf(sp, "skeleton");
  if (a < 0.01) return null;
  const rotDeg = sp * 360 * 1.6;
  return (
    <g opacity={a} transform="translate(720, 380)">
      <circle r="125" fill="none" stroke="#14B8A6" strokeWidth="2" strokeDasharray="18 10" opacity="0.22" />
      <g transform={`rotate(${rotDeg})`}>
        <circle r="96" fill="none" stroke="#14B8A6" strokeWidth="2.5" strokeDasharray="22 182" opacity="0.62" />
        {SKELETON_LEAF_ANGLES.map((ang, ai) => {
          const rad = (ang * Math.PI) / 180;
          return (
            <g key={ai} transform={`translate(${Math.cos(rad) * 96}, ${Math.sin(rad) * 96}) rotate(${ang + 90})`}>
              <path d="M -6 -4 L 0 7 L 6 -4 Z" fill="#14B8A6" opacity="0.85" />
            </g>
          );
        })}
      </g>
      <path d="M -145 0 L 145 0" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" opacity="0.62" />
      <ellipse cx="-145" cy="0" rx="29" ry="21" stroke="#1E293B" strokeWidth="2" fill="none" opacity="0.58" />
      <circle cx="-157" cy="-8" r="4.5" fill="#1E293B" opacity="0.52" />
      <path d="M 145 0 L 172 -26 L 176 0 L 172 26 Z" stroke="#1E293B" strokeWidth="2" fill="none" opacity="0.58" />
      {SKELETON_RIBS.map((rx) => (
        <g key={rx}>
          <path d={`M ${rx} 0 L ${rx - 9} -34`} stroke="#1E293B" strokeWidth="2" strokeLinecap="round" opacity="0.52" />
          <path d={`M ${rx} 0 L ${rx - 9} 34`} stroke="#1E293B" strokeWidth="2" strokeLinecap="round" opacity="0.52" />
        </g>
      ))}
      {SKELETON_LEAF_ANGLES.map((ang, li) => {
        const rad = (ang * Math.PI) / 180;
        const lx = Math.cos(rad) * 148;
        const ly = Math.sin(rad) * 148;
        const lS = easeOut(rng(sp, 0.65 + li * 0.025, 0.79 + li * 0.025));
        return (
          <g key={li} transform={`translate(${lx}, ${ly}) scale(${lS}) rotate(${ang})`}>
            <path d="M 0 0 Q 14 -19 0 -33 Q -14 -19 0 0 Z" fill="#14B8A6" opacity="0.76" />
            <path d="M 0 -2 L 0 -28" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        );
      })}
      {SKELETON_VALUES.map(({ label, angle }, li) => {
        const rad = (angle * Math.PI) / 180;
        const lA = rng(sp, 0.70 + li * 0.03, 0.82 + li * 0.03);
        return (
          <g key={li} opacity={lA}>
            <rect x={Math.cos(rad) * 150 - 34} y={Math.sin(rad) * 150 - 12} width="68" height="24" rx="12" fill="rgba(20,184,166,0.18)" stroke="#14B8A6" strokeWidth="1" />
            <text x={Math.cos(rad) * 150} y={Math.sin(rad) * 150 + 5} fill="#14B8A6" fontSize="10" fontWeight="600" textAnchor="middle">{label}</text>
          </g>
        );
      })}
    </g>
  );
}

function HubScene({ sp }: { sp: number }) {
  const a = alphaOf(sp, "hub");
  if (a < 0.01) return null;
  const hs = easeOut(rng(sp, 0.82, 0.96));
  const pulse = 1 + easeOut(clamp((sp - 0.88) / 0.12)) * 0.08;
  return (
    <g opacity={a}>
      <circle cx="720" cy="380" r="310" fill="url(#ps-hub-glow)" />
      {[1, 2, 3].map((ri) => (
        <circle key={ri} cx="720" cy="380" r={94 + ri * 68} fill="none"
          stroke={ri % 2 === 0 ? "#14B8A6" : "#0F4C81"} strokeWidth="1.5" strokeDasharray="14 10"
          opacity={0.10 + ri * 0.04} className="ps-dash-flow"
        />
      ))}
      <g transform={`translate(720, 380) scale(${hs * pulse})`}>
        <circle r="74" fill="#0F4C81" opacity="0.92" />
        <circle r="82" fill="none" stroke="#14B8A6" strokeWidth="2.5" opacity="0.72" />
        <circle r="96" fill="none" stroke="#38BDF8" strokeWidth="1" opacity="0.28" />
        <text y="-9" fill="white" fontSize="15" fontWeight="800" textAnchor="middle" letterSpacing="0.5">SirkuLaut</text>
        <text y="10" fill="#38BDF8" fontSize="8.5" textAnchor="middle" letterSpacing="1.5" opacity="0.85">PLATFORM</text>
        {SCENE_ASSETS.hubLogo ? (
          <g transform="translate(-70, -70)" clipPath="url(#ps-clip-hub)">
            <image href={SCENE_ASSETS.hubLogo} x="0" y="0" width="140" height="140"
              preserveAspectRatio="xMidYMid slice" />
          </g>
        ) : (
          <text y="28" fill="rgba(255,255,255,0.45)" fontSize="18" textAnchor="middle">🐟</text>
        )}
      </g>
      {HUB_NODES.map((node, ni) => {
        const rad = (node.angle * Math.PI) / 180;
        const nr = 232;
        const nx = 720 + Math.cos(rad) * nr;
        const ny = 380 + Math.sin(rad) * nr;
        const nA = rng(sp, 0.86 + ni * 0.012, 0.98 + ni * 0.008);
        const nS = easeOut(clamp(nA));
        const lA = rng(sp, 0.87 + ni * 0.012, 0.98);
        return (
          <g key={ni}>
            <line x1="720" y1="380" x2={nx} y2={ny} stroke="url(#ps-route)" strokeWidth="1.5" strokeDasharray="6 5" opacity={lA * 0.62} className="ps-dash-flow" />
            <g opacity={nA} transform={`translate(${nx}, ${ny}) scale(${nS})`}>
              <circle r="35" fill="rgba(56,189,248,0.09)" />
              <circle r="26" fill="rgba(15,76,129,0.86)" />
              <circle r="27" fill="none" stroke="#38BDF8" strokeWidth="1.5" opacity="0.6" />
              <text y="-3" fontSize="14" textAnchor="middle">{node.icon}</text>
              <text y="13" fill="#B8DFF5" fontSize="6" fontWeight="600" textAnchor="middle">{node.label}</text>
            </g>
          </g>
        );
      })}
    </g>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   8. FISH PROTAGONIST — rendered from the dedicated fish component
════════════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════════
   9. UI OVERLAYS — header, kartu info, hub overlay, progress path
════════════════════════════════════════════════════════════════════════════ */

function SectionHeader({ sp }: { sp: number }) {
  return (
    <div style={{
      position: "absolute", top: "7%", left: 0, width: "100%", textAlign: "center",
      padding: "0 24px", zIndex: 20, opacity: clamp(1 - sp * 18),
      transform: `translateY(${-sp * 55}px)`, pointerEvents: "none",
    }}>
      <EyebrowBadge>🐟 Ikuti Perjalanan Ikan</EyebrowBadge>
      <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, color: "#1E293B", lineHeight: 1.2, marginBottom: "14px", letterSpacing: "-0.02em" }}>
        Mengapa <span style={gradientTextStyle}>SirkuLaut</span> Dibutuhkan?
      </h2>
      <p style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", color: "#64748B", lineHeight: 1.7, maxWidth: "540px", margin: "0 auto" }}>
        Scroll untuk mengikuti perjalanan ikan — dari laut hingga ekosistem digital.
      </p>
      <div className="ps-scroll-hint" style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "6px", marginTop: "28px" }}>
        <span style={{ fontSize: "10.5px", color: "#94A3B8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll</span>
        <svg width="22" height="34" viewBox="0 0 22 34" fill="none">
          <rect x="1" y="1" width="20" height="32" rx="10" stroke="#CBD5E1" strokeWidth="1.5" />
          <rect x="9" y="6" width="4" height="8" rx="2" fill="#94A3B8" className="ps-scroll-dot" />
        </svg>
      </div>
    </div>
  );
}

function StageInfoCard({ sp, stage, si }: { sp: number; stage: number; si: number }) {
  const cardOpacity = clamp(0.9 + sp * 3) * clamp(1 - rng(sp, 0.78, 0.90) * 2);
  const currentStage = Math.min(stage, 4);
  const contentOpacity = clamp((sp - 0.04) / 0.24);

  return (
    <div style={{
      position: "absolute", top: "15%", left: "4%", transform: "none",
      width: "min(340px, 36vw)", zIndex: 45, opacity: cardOpacity,
      pointerEvents: stage <= 4 ? "auto" : "none",
    }}>
      <div style={{
        background: "rgba(255,255,255,0.86)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        border: `1.5px solid ${STAGES[si].border}`, borderRadius: "22px", padding: "26px 28px",
        boxShadow: "0 28px 56px rgba(15,76,129,0.08), 0 8px 20px rgba(15,76,129,0.04)",
        transition: "border-color 0.7s ease",
      }}>
        <div style={{ display: "flex", gap: "5px", marginBottom: "18px", alignItems: "center" }}>
          {STAGES.map((s, idx) => (
            <div key={idx} style={{
              height: "5px", borderRadius: "3px",
              width: idx + 1 === currentStage ? "22px" : "5px",
              background: idx + 1 < currentStage ? "#14B8A6" : idx + 1 === currentStage ? STAGES[idx].color : "rgba(148,163,184,0.28)",
              transition: "all 0.45s cubic-bezier(0.34,1.56,0.64,1)",
            }} />
          ))}
          <span style={{ marginLeft: "auto", fontSize: "10px", color: "#94A3B8", fontWeight: 600 }}>{currentStage}/4</span>
        </div>

        <div key={`card-${si}`} style={{
          opacity: contentOpacity,
          transform: `translateY(${(1 - contentOpacity) * 14}px)`,
          transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "5px", padding: "5px 13px", borderRadius: "999px",
            background: STAGES[si].bg, color: STAGES[si].color, fontSize: "10.5px", fontWeight: 700,
            letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "14px", border: `1px solid ${STAGES[si].border}`,
          }}>
            {STAGES[si].badge}
          </div>
          <h3 style={{ fontSize: "clamp(1rem, 1.75vw, 1.3rem)", fontWeight: 700, color: "#1E293B", lineHeight: 1.35, marginBottom: "12px", letterSpacing: "-0.01em" }}>
            {STAGES[si].title}
          </h3>
          <p style={{ color: "#64748B", fontSize: "clamp(0.78rem, 1.05vw, 0.88rem)", lineHeight: 1.65, margin: 0 }}>
            {STAGES[si].desc}
          </p>
        </div>
      </div>
    </div>
  );
}

function HubOverlay({ sp, isHub, hubP }: { sp: number; isHub: boolean; hubP: number }) {
  return (
    <div style={{
      position: "absolute", inset: 0, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "flex-start", paddingTop: "4.5vh",
      zIndex: 40, opacity: hubP, pointerEvents: isHub ? "auto" : "none",
    }}>
      <div style={{ textAlign: "center", maxWidth: "580px", padding: "0 24px" }}>
        <EyebrowBadge tone="teal">✦ Solusi Terintegrasi</EyebrowBadge>
        <h2 style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)", fontWeight: 800, color: "#1E293B", lineHeight: 1.2, marginBottom: "8px", letterSpacing: "-0.02em" }}>
          SirkuLaut Menghubungkan<br />
          <span style={gradientTextStyle}>Seluruh Ekosistem Perikanan</span>
        </h2>
        <p style={{ color: "#64748B", fontSize: "0.95rem", fontWeight: 500 }}>Dari Laut ke Meja, Tanpa Sisa.</p>
      </div>

      <div style={{
        position: "absolute", bottom: "4%", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", maxWidth: "660px", width: "90%",
      }}>
        {SUCCESS.map((item, idx) => {
          const p = easeOut(rng(sp, 0.90 + idx * 0.026, 1.0));
          return (
            <div key={idx} style={{
              display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", padding: "10px 18px", borderRadius: "12px",
              color: "#0F4C81", fontWeight: 600, fontSize: "0.84rem", boxShadow: "0 4px 20px rgba(15,76,129,0.08)",
              border: "1px solid rgba(20,184,166,0.25)", opacity: p, transform: `translateY(${(1 - p) * 14}px)`,
            }}>
              <div style={{
                width: "22px", height: "22px", borderRadius: "50%",
                background: "linear-gradient(135deg, #14B8A6, #0F4C81)", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: "11px", flexShrink: 0, color: "white", fontWeight: 700,
              }}>✓</div>
              {item.icon} {item.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const PROGRESS_MILESTONES = [
  { cx: 10, cy: 40, label: "Laut", thresh: 0 },
  { cx: 122, cy: 16, label: "Nelayan", thresh: 0.14 },
  { cx: 240, cy: 27, label: "Distribusi", thresh: 0.38 },
  { cx: 358, cy: 20, label: "Rantai Pasok", thresh: 0.60 },
  { cx: 470, cy: 19, label: "SirkuLaut", thresh: 0.84 },
] as const;

function BottomProgressPath({ sp }: { sp: number }) {
  return (
    <div style={{
      position: "absolute", bottom: "2.5%", left: "50%", transform: "translateX(-50%)",
      width: "min(480px, 76vw)", zIndex: 55, opacity: clamp(1 - rng(sp, 0.81, 0.92) * 2),
    }}>
      <svg viewBox="0 0 480 58" style={{ width: "100%", overflow: "visible" }}>
        <path d="M 10 40 C 96 14, 168 12, 240 28 S 392 42, 470 18" fill="none" stroke="rgba(15,76,129,0.10)" strokeWidth="3" strokeLinecap="round" />
        <path d="M 10 40 C 96 14, 168 12, 240 28 S 392 42, 470 18" fill="none" stroke="url(#ps-route)" strokeWidth="3" strokeLinecap="round"
          strokeDasharray="480" strokeDashoffset={480 * (1 - clamp(sp / 0.84))} />

        {PROGRESS_MILESTONES.map((m, mi) => {
          const reached = sp >= m.thresh;
          const isCurrent = mi === Math.min(Math.floor(sp / 0.22), 4);
          return (
            <g key={mi}>
              {isCurrent && (
                <g transform={`translate(${m.cx}, ${m.cy})`}>
                  <circle r="14" fill="rgba(15,76,129,0.12)" className="ps-milestone-ring" />
                </g>
              )}
              <circle cx={m.cx} cy={m.cy} r={isCurrent ? 7 : 5}
                fill={reached ? "#0F4C81" : "rgba(148,163,184,0.3)"}
                stroke={reached ? "#38BDF8" : "rgba(148,163,184,0.4)"} strokeWidth="1.5" />
              <text x={m.cx} y={m.cy + 18} fill={reached ? "#0F4C81" : "rgba(148,163,184,0.55)"}
                fontSize="8.5" fontWeight={isCurrent ? "700" : "500"} textAnchor="middle"
                style={{ fontFamily: "Poppins, sans-serif" }}>
                {m.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   10. GLOBAL KEYFRAMES
════════════════════════════════════════════════════════════════════════════ */

function SceneStyles() {
  return (
    <style>{`
      @keyframes ps-card-in { from { opacity: 0; transform: translateY(13px) scale(0.975); } to { opacity: 1; transform: translateY(0) scale(1); } }
      @keyframes ps-bubble { 0%,100% { transform: translateY(0); opacity: 0.42; } 50% { transform: translateY(-8px); opacity: 0.85; } }
      @keyframes ps-fish-tail { 0%,100% { transform: skewY(0deg); transform-origin: 57px 24px; } 38% { transform: skewY(11deg); transform-origin: 57px 24px; } 72% { transform: skewY(-11deg); transform-origin: 57px 24px; } }
      .ps-fish-tail { animation: ps-fish-tail 0.52s ease-in-out infinite; }
      @keyframes ps-dash-flow { to { stroke-dashoffset: -28; } }
      .ps-dash-flow { animation: ps-dash-flow 2.4s linear infinite; }
      @keyframes ps-glow { 0%,100% { opacity: 0.65; } 50% { opacity: 1; } }
      .ps-glow { animation: ps-glow 2s ease-in-out infinite; }
      @keyframes ps-milestone-ring { 0%,100% { transform: scale(1); opacity: 0.12; } 50% { transform: scale(1.45); opacity: 0.22; } }
      .ps-milestone-ring { animation: ps-milestone-ring 1.6s ease-in-out infinite; }
      @keyframes ps-scroll-hint { 0%,100% { transform: translateY(0); opacity: 0.65; } 50% { transform: translateY(6px); opacity: 1; } }
      .ps-scroll-hint { animation: ps-scroll-hint 1.9s ease-in-out infinite; }
      @keyframes ps-scroll-dot { 0% { transform: translateY(0px); opacity: 1; } 60% { transform: translateY(14px); opacity: 0.3; } 100% { transform: translateY(14px); opacity: 0; } }
      .ps-scroll-dot { animation: ps-scroll-dot 1.9s ease-in-out infinite; }
      #problem svg text { user-select: none; pointer-events: none; }
    `}</style>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   11. MAIN COMPONENT
   Sekarang hanya berisi: hitung sp, hitung nilai turunan tingkat-section,
   lalu susun daftar komponen scene secara deklaratif.
════════════════════════════════════════════════════════════════════════════ */

export function ProblemSection() {
  const containerRef = useRef<HTMLElement>(null);
  const sp = useScrollProgress(containerRef);

  const bg = getBackground(sp);
  const stage = sp < 0.28 ? 1 : sp < 0.55 ? 2 : sp < 0.80 ? 3 : sp < 0.88 ? 4 : 5;
  const si = Math.min(stage, 4) - 1;
  const isHub = sp >= 0.83;
  const hubP = easeOut(rng(sp, 0.83, 1.0));

  return (
    <section ref={containerRef} id="problem" style={{ position: "relative", height: "600vh" }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        background: `linear-gradient(175deg, ${bg.top} 0%, ${bg.bottom} 100%)`,
        fontFamily: "Poppins, sans-serif",
      }}>
        <svg
          viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
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

            {/* ── CLIP PATHS untuk foto import ─────────────────────────────
                Setiap clipPath mengikuti bentuk bounding box scene-nya.
                Foto akan di-crop sesuai bentuk ini secara otomatis.
            ─────────────────────────────────────────────────────────────── */}

            {/* Kapal: area lambung + dek (bounding ~184×174px, center 0,0) */}
            <clipPath id="ps-clip-boat">
              <ellipse cx="0" cy="0" rx="92" ry="87" />
            </clipPath>

            {/* Truk: bounding box body + kabin */}
            <clipPath id="ps-clip-truck">
              <rect x="-155" y="-78" width="312" height="90" rx="6" />
            </clipPath>

            {/* Gudang: bentuk poligon atap segitiga + badan */}
            <clipPath id="ps-clip-warehouse">
              <polygon points="-88,0 -88,-132 0,-174 88,-132 88,0" />
            </clipPath>

            {/* Restoran: persegi + segitiga atap */}
            <clipPath id="ps-clip-restaurant">
              <polygon points="-108,-114 0,-160 108,-114 98,8 -98,8" />
            </clipPath>

            {/* Hub center circle */}
            <clipPath id="ps-clip-hub">
              <circle cx="0" cy="0" r="70" />
            </clipPath>

            {/* Overlay halus di atas foto agar blends dengan warna scene */}
            <linearGradient id="ps-photo-blend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0F4C81" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#0F4C81" stopOpacity="0.42" />
            </linearGradient>
            <radialGradient id="ps-speed-trail" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g transform={`translate(${lerp(0, 130, easeInOut(clamp(sp / 0.86)))}, ${Math.sin(sp * Math.PI * 0.8) * 6})`}>
            <OceanFloor sp={sp} />
            <JourneyPath sp={sp} />
            <WaveLayers sp={sp} />
            <SunRays sp={sp} />
            <BoatScene sp={sp} />
            <RisingBubbles sp={sp} />
            <TruckScene sp={sp} />
            <WarehouseScene sp={sp} />
            <RestaurantScene sp={sp} />
            <DistributionRoute sp={sp} />
            <NetworkScene sp={sp} />
            <SkeletonScene sp={sp} />
            <HubScene sp={sp} />
          </g>
          <FishProtagonist sp={sp} />
        </svg>

        <SectionHeader sp={sp} />
        <StageInfoCard sp={sp} stage={stage} si={si} />
        <HubOverlay sp={sp} isHub={isHub} hubP={hubP} />
        <BottomProgressPath sp={sp} />
        <SceneStyles />
      </div>
    </section>
  );
}