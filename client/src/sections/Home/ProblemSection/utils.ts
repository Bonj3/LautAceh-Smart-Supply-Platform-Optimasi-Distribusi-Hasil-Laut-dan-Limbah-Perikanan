import React from "react";
import { TIMELINE, BG_KEYFRAMES } from "./data";
import { SceneKey, RGB } from "./type";

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
export const easeOut = (t: number) => 1 - (1 - t) * (1 - t);
export const easeIn = (t: number) => t * t;
export const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

/** Progress 0→1 di dalam window [start, end] */
export const rng = (p: number, s: number, e: number) => clamp((p - s) / (e - s));

/** Siklus alpha objek: masuk → easeOut ke 1 → bertahan → easeIn ke 0 → hilang */
export function objectAlpha(p: number, enter: number, peak: number, fade: number, gone: number): number {
  if (p < enter) return 0;
  if (p < peak) return easeOut(rng(p, enter, peak));
  if (p < fade) return 1;
  if (p < gone) return 1 - easeIn(rng(p, fade, gone));
  return 0;
}

/** Alpha untuk satu scene, dibaca langsung dari TIMELINE */
export const alphaOf = (sp: number, key: SceneKey): number => {
  const [enter, peak, fade, gone] = TIMELINE[key];
  return objectAlpha(sp, enter, peak, fade, gone);
};

export const hexToRgb = (h: string): RGB => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];

export const mixRgb = (a: RGB, b: RGB, t: number) =>
  `rgb(${Math.round(lerp(a[0], b[0], t))},${Math.round(lerp(a[1], b[1], t))},${Math.round(lerp(a[2], b[2], t))})`;

export function getBackground(p: number) {
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

export const gradientTextStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #0F4C81 0%, #14B8A6 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};
