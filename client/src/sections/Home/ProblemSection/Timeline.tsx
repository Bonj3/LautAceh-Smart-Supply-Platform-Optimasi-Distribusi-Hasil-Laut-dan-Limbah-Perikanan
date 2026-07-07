import React from "react";
import { alphaOf, clamp, rng } from "./utils";

export function JourneyPath({ sp }: { sp: number }) {
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

export function DistributionRoute({ sp }: { sp: number }) {
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
