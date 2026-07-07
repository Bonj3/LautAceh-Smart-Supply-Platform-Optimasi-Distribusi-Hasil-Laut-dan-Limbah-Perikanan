import React, { useEffect, useState } from "react";
import { MotionValue } from "motion/react";
import { alphaOf } from "./utils";

export function OceanFloor({ sp }: { sp: number }) {
  return <rect x="0" y="740" width="1440" height="160" fill="url(#ps-ocean)" opacity={alphaOf(sp, "ocean")} />;
}

const WAVE_LAYERS = [
  { y: 748, amp: 20, spd: 0.7, col: "#38BDF8", sw: 3, op: 0.38 },
  { y: 768, amp: 13, spd: 1.2, col: "#0F4C81", sw: 2, op: 0.26 },
  { y: 782, amp: 8, spd: 1.7, col: "#38BDF8", sw: 1.5, op: 0.20 },
];

export function WaveLayers({ sp }: { sp: number }) {
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

export function SunRays({ sp }: { sp: number }) {
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

export default function Environment({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const [sp, setSp] = useState(scrollYProgress.get());

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", setSp);
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <>
      <OceanFloor sp={sp} />
      <WaveLayers sp={sp} />
      <SunRays sp={sp} />
      <RisingBubbles sp={sp} />
    </>
  );
}

const BUBBLE_SPOTS = [
  { x: 180, r: 5 }, { x: 310, r: 3 }, { x: 490, r: 6 }, { x: 640, r: 4 },
  { x: 790, r: 7 }, { x: 920, r: 3 }, { x: 1050, r: 5 },
];

export function RisingBubbles({ sp }: { sp: number }) {
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