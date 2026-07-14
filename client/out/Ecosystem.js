"use strict";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { SCENE_ASSETS, HUB_NODES } from "./data";
import { alphaOf, clamp, easeOut, lerp, rng } from "./utils";
export function BoatScene({ sp }) {
  const a = alphaOf(sp, "boat");
  if (a < 0.01) return null;
  const enterP = rng(sp, 0.03, 0.2);
  const bx = lerp(-150, 200, easeOut(enterP));
  const bFloat = Math.sin(sp * Math.PI * 28) * 5;
  const dim = 1 - rng(sp, 0.32, 0.56) * 0.5;
  return /* @__PURE__ */ jsxs("g", { opacity: a * dim, transform: `translate(${bx}, ${758 + bFloat})`, children: [
    /* @__PURE__ */ jsx("ellipse", { cx: "0", cy: "30", rx: "85", ry: "9", fill: "#38BDF8", opacity: "0.1" }),
    /* @__PURE__ */ jsx("path", { d: "M -92 8 Q -80 28 80 28 Q 92 8 92 8 Z", fill: "#0F4C81", opacity: "0.92" }),
    /* @__PURE__ */ jsx("path", { d: "M -92 8 L -80 28 L 80 28 L 92 8", fill: "none", stroke: "#38BDF8", strokeWidth: "1", opacity: "0.3" }),
    /* @__PURE__ */ jsx("rect", { x: "-18", y: "-22", width: "58", height: "28", rx: "4", fill: "#1E3A8A", opacity: "0.82" }),
    /* @__PURE__ */ jsx("rect", { x: "-10", y: "-16", width: "18", height: "13", rx: "2", fill: "#38BDF8", opacity: "0.5" }),
    /* @__PURE__ */ jsx("rect", { x: "16", y: "-16", width: "14", height: "13", rx: "2", fill: "#38BDF8", opacity: "0.4" }),
    SCENE_ASSETS.boat ? /* @__PURE__ */ jsxs("g", { clipPath: "url(#ps-clip-boat)", children: [
      /* @__PURE__ */ jsx("image", { href: SCENE_ASSETS.boat, x: "-92", y: "-87", width: "184", height: "174", preserveAspectRatio: "xMidYMid slice" }),
      /* @__PURE__ */ jsx("rect", { x: "-92", y: "-87", width: "184", height: "174", rx: "92", fill: "url(#ps-photo-blend)" })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("line", { x1: "-42", y1: "-22", x2: "-42", y2: "-108", stroke: "#1E293B", strokeWidth: "2.5" }),
      /* @__PURE__ */ jsx("path", { d: "M -42 -108 L -42 -18 L 22 -18 Z", fill: "#EFF6FF", opacity: "0.78" }),
      /* @__PURE__ */ jsx("path", { d: "M -42 -108 L -42 -22 L -86 -32 Z", fill: "#B8DFF5", opacity: "0.52" }),
      /* @__PURE__ */ jsx("path", { d: "M -42 -108 L -20 -100 L -42 -92 Z", fill: "#38BDF8", opacity: "0.9" }),
      /* @__PURE__ */ jsx("circle", { cx: "-58", cy: "-34", r: "9", fill: "#1E293B" }),
      /* @__PURE__ */ jsx("path", { d: "M -66 -42 L -50 -42 L -48 -34 L -68 -34 Z", fill: "#0F4C81" }),
      /* @__PURE__ */ jsx("rect", { x: "-68", y: "-43", width: "22", height: "2.5", rx: "1", fill: "#0F4C81" }),
      /* @__PURE__ */ jsx("path", { d: "M -58 -25 L -58 -8", stroke: "#1E293B", strokeWidth: "4.5", strokeLinecap: "round" }),
      /* @__PURE__ */ jsx("path", { d: "M -70 -18 L -58 -16 L -46 -18", stroke: "#1E293B", strokeWidth: "3.5", strokeLinecap: "round" }),
      /* @__PURE__ */ jsx("path", { d: "M -58 -16 L -106 -58 L -138 -28", stroke: "#1E293B", strokeWidth: "1.8", strokeLinecap: "round", fill: "none" }),
      /* @__PURE__ */ jsx("path", { d: "M -138 -28 L -148 -6 L -145 22", stroke: "#94A3B8", strokeWidth: "1", fill: "none" })
    ] }),
    [0, 1, 2, 3].map((ni) => /* @__PURE__ */ jsx(
      "path",
      {
        d: `M ${-90 + ni * 16} 28 Q ${-84 + ni * 16} ${50 + ni * 6} ${-72 + ni * 16} 42`,
        stroke: "#38BDF8",
        strokeWidth: "1.2",
        fill: "none",
        opacity: "0.38",
        strokeDasharray: "4 3"
      },
      ni
    ))
  ] });
}
export function TruckScene({ sp }) {
  const a = alphaOf(sp, "truck");
  if (a < 0.01) return null;
  const tp = rng(sp, 0.2, 0.44);
  const tx = lerp(520, 850, easeOut(tp));
  const speed = 1 - clamp(tp * 1.4);
  const visibility = a * (0.7 + clamp(sp / 0.76) * 0.3);
  return /* @__PURE__ */ jsxs("g", { opacity: visibility, transform: `translate(${tx}, 748)`, children: [
    speed > 0.2 && [0, 1, 2, 3].map((si) => /* @__PURE__ */ jsx(
      "line",
      {
        x1: -195 - si * 38,
        y1: -26 + si * 9,
        x2: -128 - si * 38,
        y2: -26 + si * 9,
        stroke: "#38BDF8",
        strokeWidth: 2.2 - si * 0.5,
        strokeLinecap: "round",
        opacity: speed * (0.55 - si * 0.1)
      },
      si
    )),
    /* @__PURE__ */ jsx("ellipse", { cx: "80", cy: "12", rx: "178", ry: "11", fill: "#1E293B", opacity: "0.09" }),
    SCENE_ASSETS.truck ? /* @__PURE__ */ jsxs("g", { clipPath: "url(#ps-clip-truck)", children: [
      /* @__PURE__ */ jsx("image", { href: SCENE_ASSETS.truck, x: "-155", y: "-78", width: "312", height: "90", preserveAspectRatio: "xMidYMid slice" }),
      /* @__PURE__ */ jsx("rect", { x: "-155", y: "-78", width: "312", height: "90", rx: "6", fill: "url(#ps-photo-blend)" }),
      /* @__PURE__ */ jsx("text", { x: "-43", y: "-35", fill: "white", fontSize: "12", fontWeight: "700", textAnchor: "middle", style: { textShadow: "0 1px 4px rgba(0,0,0,0.6)" }, children: "SirkuShip" })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("rect", { x: "-155", y: "-72", width: "208", height: "72", rx: "4", fill: "#1E293B", opacity: "0.9" }),
      [-118, -66, -14, 38].map((sx, si) => /* @__PURE__ */ jsx("line", { x1: sx, y1: "-68", x2: sx, y2: "0", stroke: "#334155", strokeWidth: "1", opacity: "0.6" }, si)),
      /* @__PURE__ */ jsx("rect", { x: "-150", y: "-62", width: "5", height: "58", rx: "2", fill: "#38BDF8", opacity: "0.3" }),
      /* @__PURE__ */ jsx("rect", { x: "-108", y: "-54", width: "130", height: "28", rx: "3", fill: "rgba(56,189,248,0.1)" }),
      /* @__PURE__ */ jsx("text", { x: "-43", y: "-35", fill: "#38BDF8", fontSize: "12", fontWeight: "700", textAnchor: "middle", children: "SirkuShip" }),
      /* @__PURE__ */ jsx("rect", { x: "53", y: "-78", width: "104", height: "78", rx: "6", fill: "#1E293B", opacity: "0.95" }),
      /* @__PURE__ */ jsx("path", { d: "M 59 -74 L 59 -40 L 150 -40 L 150 -74 Z", fill: "#38BDF8", opacity: "0.38" }),
      /* @__PURE__ */ jsx("line", { x1: "105", y1: "-74", x2: "105", y2: "-40", stroke: "#1E293B", strokeWidth: "2", opacity: "0.5" }),
      /* @__PURE__ */ jsx("circle", { cx: "154", cy: "-28", r: "9", fill: "#FDE68A", opacity: "0.75" }),
      /* @__PURE__ */ jsx("circle", { cx: "154", cy: "-28", r: "14", fill: "#FDE68A", opacity: "0.14" })
    ] }),
    [-88, 2, 88, 140].map((wx) => /* @__PURE__ */ jsxs("g", { transform: `translate(${wx}, 9)`, children: [
      /* @__PURE__ */ jsx("circle", { r: "20", fill: "#0F172A" }),
      /* @__PURE__ */ jsx("circle", { r: "13", fill: "#334155" }),
      /* @__PURE__ */ jsx("circle", { r: "5", fill: "#64748B" }),
      /* @__PURE__ */ jsx("line", { x1: "0", y1: "-13", x2: "0", y2: "-5", stroke: "#64748B", strokeWidth: "2", strokeLinecap: "round", transform: `rotate(${sp * 2400 % 360})` }),
      /* @__PURE__ */ jsx("line", { x1: "-13", y1: "0", x2: "-5", y2: "0", stroke: "#64748B", strokeWidth: "2", strokeLinecap: "round", transform: `rotate(${sp * 2400 % 360})` })
    ] }, wx))
  ] });
}
export function WarehouseScene({ sp }) {
  const a = alphaOf(sp, "warehouse");
  if (a < 0.01) return null;
  const scale = easeOut(rng(sp, 0.26, 0.44));
  const dim = 1 - rng(sp, 0.58, 0.76) * 0.4;
  return /* @__PURE__ */ jsx("g", { opacity: a * dim, children: /* @__PURE__ */ jsxs("g", { transform: `translate(350, 728) scale(${scale})`, style: { transformOrigin: "350px 728px" }, children: [
    /* @__PURE__ */ jsx("ellipse", { cx: "0", cy: "8", rx: "88", ry: "12", fill: "#1E293B", opacity: "0.11" }),
    SCENE_ASSETS.warehouse ? /* @__PURE__ */ jsxs("g", { clipPath: "url(#ps-clip-warehouse)", children: [
      /* @__PURE__ */ jsx("image", { href: SCENE_ASSETS.warehouse, x: "-88", y: "-174", width: "176", height: "182", preserveAspectRatio: "xMidYMid slice" }),
      /* @__PURE__ */ jsx("polygon", { points: "-88,0 -88,-132 0,-174 88,-132 88,0", fill: "url(#ps-photo-blend)" })
    ] }) : /* @__PURE__ */ jsx("path", { d: "M -88 0 L -88 -132 L 0 -174 L 88 -132 L 88 0 Z", fill: "#0F4C81", opacity: "0.88" }),
    /* @__PURE__ */ jsx("path", { d: "M -88 -132 L 0 -174 L 88 -132", fill: "none", stroke: "#38BDF8", strokeWidth: "2", opacity: "0.4" }),
    [-60, -36, -12, 12, 36, 60].map((wx) => /* @__PURE__ */ jsx("line", { x1: wx, y1: "0", x2: wx, y2: "-122", stroke: "#38BDF8", strokeWidth: "1", opacity: "0.07" }, wx)),
    /* @__PURE__ */ jsx("rect", { x: "-24", y: "-66", width: "48", height: "66", rx: "2", fill: "#0F172A", opacity: "0.65" }),
    /* @__PURE__ */ jsx("line", { x1: "0", y1: "-66", x2: "0", y2: "0", stroke: "#1E3A8A", strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx("rect", { x: "-70", y: "-122", width: "36", height: "22", rx: "3", fill: "#38BDF8", opacity: "0.42" }),
    /* @__PURE__ */ jsx("rect", { x: "34", y: "-122", width: "36", height: "22", rx: "3", fill: "#38BDF8", opacity: "0.42" }),
    /* @__PURE__ */ jsx("circle", { r: "7", cx: "0", cy: "-158", fill: "#FDE68A", opacity: "0.88", className: "ps-glow" }),
    /* @__PURE__ */ jsx("text", { x: "0", y: "-188", fill: "white", fontSize: "14", fontWeight: "700", textAnchor: "middle", opacity: "0.82", children: "GUDANG" }),
    [0, 1].map((bi) => /* @__PURE__ */ jsx("rect", { x: 70 + bi * 2, y: -32 + bi * 20, width: "18", height: "18", rx: "2", fill: "#38BDF8", opacity: "0.28", stroke: "#38BDF8", strokeWidth: "1" }, bi))
  ] }) });
}
export function RestaurantScene({ sp }) {
  const a = alphaOf(sp, "restaurant");
  if (a < 0.01) return null;
  const scale = easeOut(rng(sp, 0.3, 0.5));
  const dim = 1 - rng(sp, 0.58, 0.76) * 0.4;
  return /* @__PURE__ */ jsx("g", { opacity: a * dim, children: /* @__PURE__ */ jsxs("g", { transform: `translate(1150, 728) scale(${scale})`, style: { transformOrigin: "1150px 728px" }, children: [
    /* @__PURE__ */ jsx("ellipse", { cx: "0", cy: "8", rx: "98", ry: "12", fill: "#1E293B", opacity: "0.11" }),
    SCENE_ASSETS.restaurant ? /* @__PURE__ */ jsxs("g", { clipPath: "url(#ps-clip-restaurant)", children: [
      /* @__PURE__ */ jsx("image", { href: SCENE_ASSETS.restaurant, x: "-108", y: "-160", width: "216", height: "168", preserveAspectRatio: "xMidYMid slice" }),
      /* @__PURE__ */ jsx("polygon", { points: "-108,-114 0,-160 108,-114 98,8 -98,8", fill: "url(#ps-photo-blend)" }),
      /* @__PURE__ */ jsx("rect", { x: "-62", y: "-112", width: "124", height: "26", rx: "4", fill: "rgba(13,148,136,0.85)" }),
      /* @__PURE__ */ jsx("text", { x: "0", y: "-93", fill: "white", fontSize: "13", fontWeight: "700", textAnchor: "middle", children: "RESTORAN" })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("rect", { x: "-98", y: "-114", width: "196", height: "122", rx: "5", fill: "#14B8A6", opacity: "0.86" }),
      /* @__PURE__ */ jsx("path", { d: "M -108 -114 L 0 -160 L 108 -114 Z", fill: "#0D9488", opacity: "0.9" })
    ] }),
    /* @__PURE__ */ jsx("rect", { x: "-80", y: "-94", width: "58", height: "46", rx: "4", fill: "#F0FDFA", opacity: "0.58" }),
    /* @__PURE__ */ jsx("rect", { x: "22", y: "-94", width: "58", height: "46", rx: "4", fill: "#F0FDFA", opacity: "0.58" }),
    /* @__PURE__ */ jsx("line", { x1: "-51", y1: "-94", x2: "-51", y2: "-48", stroke: "#0D9488", strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx("line", { x1: "51", y1: "-94", x2: "51", y2: "-48", stroke: "#0D9488", strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx("rect", { x: "-62", y: "-112", width: "124", height: "26", rx: "4", fill: "#0D9488" }),
    /* @__PURE__ */ jsx("text", { x: "0", y: "-93", fill: "white", fontSize: "13", fontWeight: "700", textAnchor: "middle", children: "RESTORAN" }),
    /* @__PURE__ */ jsx("rect", { x: "-17", y: "-46", width: "34", height: "54", rx: "3", fill: "#0F766E" }),
    /* @__PURE__ */ jsx("text", { x: "0", y: "-175", fill: "white", fontSize: "14", fontWeight: "600", textAnchor: "middle", opacity: "0.82", children: "RESTORAN" })
  ] }) });
}
const NETWORK_NODES = [
  { x: 720, y: 380, label: "DATA HUB", r: 30, col: "#7C3AED" },
  { x: 350, y: 650, label: "Gudang", r: 20, col: "#0F4C81" },
  { x: 1150, y: 650, label: "Restoran", r: 20, col: "#14B8A6" },
  { x: 450, y: 250, label: "Nelayan", r: 20, col: "#0F4C81" },
  { x: 990, y: 250, label: "Distribusi", r: 20, col: "#14B8A6" },
  { x: 720, y: 180, label: "Permintaan", r: 18, col: "#7C3AED" },
  { x: 720, y: 550, label: "Stok", r: 18, col: "#7C3AED" }
];
const NETWORK_CROSS_LINKS = [[1, 3], [2, 4], [5, 1], [6, 2]];
const NETWORK_BAR_HEIGHTS = [10, 6, 8, 5, 9];
export function NetworkScene({ sp }) {
  const a = alphaOf(sp, "network");
  if (a < 0.01) return null;
  const widgetAlpha = rng(sp, 0.6, 0.75);
  return /* @__PURE__ */ jsxs("g", { opacity: a, children: [
    NETWORK_NODES.slice(1).map((n, ni) => /* @__PURE__ */ jsx(
      "line",
      {
        x1: NETWORK_NODES[0].x,
        y1: NETWORK_NODES[0].y,
        x2: n.x,
        y2: n.y,
        stroke: "url(#ps-net)",
        strokeWidth: "2",
        strokeDasharray: "8 6",
        opacity: rng(sp, 0.51 + ni * 0.018, 0.64 + ni * 0.018) * 0.75,
        className: "ps-dash-flow"
      },
      ni
    )),
    NETWORK_CROSS_LINKS.map(([a2, b2], ci) => /* @__PURE__ */ jsx(
      "line",
      {
        x1: NETWORK_NODES[a2].x,
        y1: NETWORK_NODES[a2].y,
        x2: NETWORK_NODES[b2].x,
        y2: NETWORK_NODES[b2].y,
        stroke: "#7C3AED",
        strokeWidth: "1.5",
        strokeDasharray: "5 5",
        opacity: rng(sp, 0.6 + ci * 0.02, 0.7 + ci * 0.02) * 0.35,
        className: "ps-dash-flow"
      },
      ci
    )),
    NETWORK_NODES.map((n, ni) => {
      const nA = rng(sp, 0.5 + ni * 0.015, 0.62 + ni * 0.015);
      const nS = easeOut(nA);
      return /* @__PURE__ */ jsxs("g", { opacity: nA, transform: `translate(${n.x}, ${n.y}) scale(${nS})`, children: [
        /* @__PURE__ */ jsx("circle", { r: n.r + 14, fill: n.col, opacity: "0.10" }),
        /* @__PURE__ */ jsx("circle", { r: n.r, fill: n.col, opacity: "0.92" }),
        /* @__PURE__ */ jsx("circle", { r: n.r + 2, fill: "none", stroke: n.col, strokeWidth: "1.5", opacity: "0.4" }),
        /* @__PURE__ */ jsx("text", { y: "5", fill: "white", fontSize: ni === 0 ? "9" : "8", fontWeight: "700", textAnchor: "middle", children: n.label }),
        ni === 0 && /* @__PURE__ */ jsx("g", { transform: "translate(-12, 12)", children: NETWORK_BAR_HEIGHTS.map((h, bi) => /* @__PURE__ */ jsx("rect", { x: bi * 6, y: -h, width: "4", height: h, rx: "1", fill: "white", opacity: "0.45" }, bi)) })
      ] }, ni);
    }),
    widgetAlpha > 0 && /* @__PURE__ */ jsxs("g", { opacity: widgetAlpha, transform: "translate(468, 388)", children: [
      /* @__PURE__ */ jsx("rect", { x: "-64", y: "-38", width: "128", height: "76", rx: "8", fill: "rgba(255,255,255,0.11)", stroke: "rgba(124,58,237,0.45)", strokeWidth: "1.5" }),
      /* @__PURE__ */ jsx("text", { x: "0", y: "-21", fill: "white", fontSize: "7.5", fontWeight: "600", textAnchor: "middle", opacity: "0.82", children: "INVENTORI REAL-TIME" }),
      [20, 26, 16].map((h, bi) => /* @__PURE__ */ jsx("rect", { x: -44 + bi * 34, y: 22 - h, width: "22", height: h, rx: "2", fill: ["#38BDF8", "#14B8A6", "#7C3AED"][bi], opacity: "0.82" }, bi))
    ] })
  ] });
}
const SKELETON_RIBS = [-104, -72, -40, -8, 24, 56, 88, 118];
const SKELETON_LEAF_ANGLES = [0, 120, 240];
const SKELETON_VALUES = [
  { label: "Kolagen", angle: 55 },
  { label: "Biogas", angle: 180 },
  { label: "Kompos", angle: 305 }
];
export function SkeletonScene({ sp }) {
  const a = alphaOf(sp, "skeleton");
  if (a < 0.01) return null;
  const rotDeg = sp * 360 * 1.6;
  return /* @__PURE__ */ jsxs("g", { opacity: a, transform: "translate(720, 380)", children: [
    /* @__PURE__ */ jsx("circle", { r: "125", fill: "none", stroke: "#14B8A6", strokeWidth: "2", strokeDasharray: "18 10", opacity: "0.22" }),
    /* @__PURE__ */ jsxs("g", { transform: `rotate(${rotDeg})`, children: [
      /* @__PURE__ */ jsx("circle", { r: "96", fill: "none", stroke: "#14B8A6", strokeWidth: "2.5", strokeDasharray: "22 182", opacity: "0.62" }),
      SKELETON_LEAF_ANGLES.map((ang, ai) => {
        const rad = ang * Math.PI / 180;
        return /* @__PURE__ */ jsx("g", { transform: `translate(${Math.cos(rad) * 96}, ${Math.sin(rad) * 96}) rotate(${ang + 90})`, children: /* @__PURE__ */ jsx("path", { d: "M -6 -4 L 0 7 L 6 -4 Z", fill: "#14B8A6", opacity: "0.85" }) }, ai);
      })
    ] }),
    /* @__PURE__ */ jsx("path", { d: "M -145 0 L 145 0", stroke: "#1E293B", strokeWidth: "3.5", strokeLinecap: "round", opacity: "0.62" }),
    /* @__PURE__ */ jsx("ellipse", { cx: "-145", cy: "0", rx: "29", ry: "21", stroke: "#1E293B", strokeWidth: "2", fill: "none", opacity: "0.58" }),
    /* @__PURE__ */ jsx("circle", { cx: "-157", cy: "-8", r: "4.5", fill: "#1E293B", opacity: "0.52" }),
    /* @__PURE__ */ jsx("path", { d: "M 145 0 L 172 -26 L 176 0 L 172 26 Z", stroke: "#1E293B", strokeWidth: "2", fill: "none", opacity: "0.58" }),
    SKELETON_RIBS.map((rx) => /* @__PURE__ */ jsxs("g", { children: [
      /* @__PURE__ */ jsx("path", { d: `M ${rx} 0 L ${rx - 9} -34`, stroke: "#1E293B", strokeWidth: "2", strokeLinecap: "round", opacity: "0.52" }),
      /* @__PURE__ */ jsx("path", { d: `M ${rx} 0 L ${rx - 9} 34`, stroke: "#1E293B", strokeWidth: "2", strokeLinecap: "round", opacity: "0.52" })
    ] }, rx)),
    SKELETON_LEAF_ANGLES.map((ang, li) => {
      const rad = ang * Math.PI / 180;
      const lx = Math.cos(rad) * 148;
      const ly = Math.sin(rad) * 148;
      const lS = easeOut(rng(sp, 0.65 + li * 0.025, 0.79 + li * 0.025));
      return /* @__PURE__ */ jsxs("g", { transform: `translate(${lx}, ${ly}) scale(${lS}) rotate(${ang})`, children: [
        /* @__PURE__ */ jsx("path", { d: "M 0 0 Q 14 -19 0 -33 Q -14 -19 0 0 Z", fill: "#14B8A6", opacity: "0.76" }),
        /* @__PURE__ */ jsx("path", { d: "M 0 -2 L 0 -28", stroke: "#0D9488", strokeWidth: "1.5", strokeLinecap: "round" })
      ] }, li);
    }),
    SKELETON_VALUES.map(({ label, angle }, li) => {
      const rad = angle * Math.PI / 180;
      const lA = rng(sp, 0.7 + li * 0.03, 0.82 + li * 0.03);
      return /* @__PURE__ */ jsxs("g", { opacity: lA, children: [
        /* @__PURE__ */ jsx("rect", { x: Math.cos(rad) * 150 - 34, y: Math.sin(rad) * 150 - 12, width: "68", height: "24", rx: "12", fill: "rgba(20,184,166,0.18)", stroke: "#14B8A6", strokeWidth: "1" }),
        /* @__PURE__ */ jsx("text", { x: Math.cos(rad) * 150, y: Math.sin(rad) * 150 + 5, fill: "#14B8A6", fontSize: "10", fontWeight: "600", textAnchor: "middle", children: label })
      ] }, li);
    })
  ] });
}
export function HubScene({ sp }) {
  const a = alphaOf(sp, "hub");
  if (a < 0.01) return null;
  const hs = easeOut(rng(sp, 0.82, 0.96));
  const pulse = 1 + easeOut(clamp((sp - 0.88) / 0.12)) * 0.08;
  return /* @__PURE__ */ jsxs("g", { opacity: a, children: [
    /* @__PURE__ */ jsx("circle", { cx: "720", cy: "380", r: "310", fill: "url(#ps-hub-glow)" }),
    [1, 2, 3].map((ri) => /* @__PURE__ */ jsx(
      "circle",
      {
        cx: "720",
        cy: "380",
        r: 94 + ri * 68,
        fill: "none",
        stroke: ri % 2 === 0 ? "#14B8A6" : "#0F4C81",
        strokeWidth: "1.5",
        strokeDasharray: "14 10",
        opacity: 0.1 + ri * 0.04,
        className: "ps-dash-flow"
      },
      ri
    )),
    /* @__PURE__ */ jsxs("g", { transform: `translate(720, 380) scale(${hs * pulse})`, children: [
      /* @__PURE__ */ jsx("circle", { r: "74", fill: "#0F4C81", opacity: "0.92" }),
      /* @__PURE__ */ jsx("circle", { r: "82", fill: "none", stroke: "#14B8A6", strokeWidth: "2.5", opacity: "0.72" }),
      /* @__PURE__ */ jsx("circle", { r: "96", fill: "none", stroke: "#38BDF8", strokeWidth: "1", opacity: "0.28" }),
      /* @__PURE__ */ jsx("text", { y: "-9", fill: "white", fontSize: "15", fontWeight: "800", textAnchor: "middle", letterSpacing: "0.5", children: "SirkuLaut" }),
      /* @__PURE__ */ jsx("text", { y: "10", fill: "#38BDF8", fontSize: "8.5", textAnchor: "middle", letterSpacing: "1.5", opacity: "0.85", children: "PLATFORM" }),
      SCENE_ASSETS.hubLogo ? /* @__PURE__ */ jsx("g", { transform: "translate(-70, -70)", clipPath: "url(#ps-clip-hub)", children: /* @__PURE__ */ jsx("image", { href: SCENE_ASSETS.hubLogo, x: "0", y: "0", width: "140", height: "140", preserveAspectRatio: "xMidYMid slice" }) }) : /* @__PURE__ */ jsx("text", { y: "28", fill: "rgba(255,255,255,0.45)", fontSize: "18", textAnchor: "middle", children: "\u{1F41F}" })
    ] }),
    HUB_NODES.map((node, ni) => {
      const rad = node.angle * Math.PI / 180;
      const nr = 232;
      const nx = 720 + Math.cos(rad) * nr;
      const ny = 380 + Math.sin(rad) * nr;
      const nA = rng(sp, 0.86 + ni * 0.012, 0.98 + ni * 8e-3);
      const nS = easeOut(clamp(nA));
      const lA = rng(sp, 0.87 + ni * 0.012, 0.98);
      return /* @__PURE__ */ jsxs("g", { children: [
        /* @__PURE__ */ jsx("line", { x1: "720", y1: "380", x2: nx, y2: ny, stroke: "url(#ps-route)", strokeWidth: "1.5", strokeDasharray: "6 5", opacity: lA * 0.62, className: "ps-dash-flow" }),
        /* @__PURE__ */ jsxs("g", { opacity: nA, transform: `translate(${nx}, ${ny}) scale(${nS})`, children: [
          /* @__PURE__ */ jsx("circle", { r: "35", fill: "rgba(56,189,248,0.09)" }),
          /* @__PURE__ */ jsx("circle", { r: "26", fill: "rgba(15,76,129,0.86)" }),
          /* @__PURE__ */ jsx("circle", { r: "27", fill: "none", stroke: "#38BDF8", strokeWidth: "1.5", opacity: "0.6" }),
          /* @__PURE__ */ jsx("text", { y: "-3", fontSize: "14", textAnchor: "middle", children: node.icon }),
          /* @__PURE__ */ jsx("text", { y: "13", fill: "#B8DFF5", fontSize: "6", fontWeight: "600", textAnchor: "middle", children: node.label })
        ] })
      ] }, ni);
    })
  ] });
}
export default function Ecosystem({ scrollYProgress }) {
  const [sp, setSp] = useState(scrollYProgress.get());
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", setSp);
    return unsubscribe;
  }, [scrollYProgress]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(BoatScene, { sp }),
    /* @__PURE__ */ jsx(TruckScene, { sp }),
    /* @__PURE__ */ jsx(WarehouseScene, { sp }),
    /* @__PURE__ */ jsx(RestaurantScene, { sp }),
    /* @__PURE__ */ jsx(NetworkScene, { sp }),
    /* @__PURE__ */ jsx(SkeletonScene, { sp })
  ] });
}
