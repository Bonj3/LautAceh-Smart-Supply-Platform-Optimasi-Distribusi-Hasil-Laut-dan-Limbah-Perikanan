import React, { useEffect, useState } from "react";
import { MotionValue } from "motion/react";
import { STAGES, SUCCESS, PROGRESS_MILESTONES } from "./data";
import { clamp, rng, easeOut, gradientTextStyle } from "./utils";

export function EyebrowBadge({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "teal" }) {
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

export function SectionHeader({ sp }: { sp: number }) {
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
        Scroll untuk mengikuti perjalanan ikan dari laut hingga ekosistem digital.
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

export function StageInfoCard({ sp, stage, si }: { sp: number; stage: number; si: number }) {
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
          {STAGES.map((s: any, idx: number) => (
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

export function HubOverlay({ sp, isHub, hubP }: { sp: number; isHub: boolean; hubP: number }) {
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
        {SUCCESS.map((item: any, idx: number) => {
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

export function BottomProgressPath({ sp }: { sp: number }) {
  return (
    <div style={{
      position: "absolute", bottom: "2.5%", left: "50%", transform: "translateX(-50%)",
      width: "min(480px, 76vw)", zIndex: 55, opacity: clamp(1 - rng(sp, 0.81, 0.92) * 2),
    }}>
      <svg viewBox="0 0 480 58" style={{ width: "100%", overflow: "visible" }}>
        <path d="M 10 40 C 96 14, 168 12, 240 28 S 392 42, 470 18" fill="none" stroke="rgba(15,76,129,0.10)" strokeWidth="3" strokeLinecap="round" />
        <path d="M 10 40 C 96 14, 168 12, 240 28 S 392 42, 470 18" fill="none" stroke="url(#ps-route)" strokeWidth="3" strokeLinecap="round"
          strokeDasharray="480" strokeDashoffset={480 * (1 - clamp(sp / 0.84))} />

        {PROGRESS_MILESTONES.map((m: any, mi: number) => {
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
export default function StoryCard({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const [sp, setSp] = useState(scrollYProgress.get());

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', setSp);
    return unsubscribe;
  }, [scrollYProgress]);

  const stage = sp < 0.28 ? 1 : sp < 0.55 ? 2 : sp < 0.80 ? 3 : sp < 0.88 ? 4 : 5;
  const si = Math.min(stage, 4) - 1;
  const isHub = sp >= 0.83;
  const hubP = easeOut(rng(sp, 0.83, 1.0));

  return (
    <>
      <SectionHeader sp={sp} />
      <StageInfoCard sp={sp} stage={stage} si={si} />
      <HubOverlay sp={sp} isHub={isHub} hubP={hubP} />
      <BottomProgressPath sp={sp} />
    </>
  );
}

