import { motion, MotionValue, useTransform } from "motion/react";
import {
  Truck,
  Store,
  Warehouse,
  Clock,
  Anchor,
  AlertTriangle,
  Thermometer,
  X,
} from "lucide-react";

interface Props {
  scrollYProgress: MotionValue<number>;
}

/* ── Supply-chain nodes ── */
const NODES = [
  {
    icon: Anchor,
    label: "Pelabuhan",
    x: "12%",
    y: "48%",
    bg: "bg-sky-900/70",
    border: "border-sky-500/60",
    text: "text-sky-200",
    glow: "rgba(14,165,233,0.25)",
  },
  {
    icon: Warehouse,
    label: "Gudang",
    x: "35%",
    y: "34%",
    bg: "bg-slate-800/70",
    border: "border-slate-500/60",
    text: "text-slate-200",
    glow: "rgba(148,163,184,0.20)",
  },
  {
    icon: Truck,
    label: "Distribusi",
    x: "58%",
    y: "56%",
    bg: "bg-amber-900/70",
    border: "border-amber-500/60",
    text: "text-amber-200",
    glow: "rgba(245,158,11,0.25)",
  },
  {
    icon: Store,
    label: "Restoran",
    x: "82%",
    y: "40%",
    bg: "bg-teal-900/70",
    border: "border-teal-500/60",
    text: "text-teal-200",
    glow: "rgba(20,184,166,0.25)",
  },
] as const;

/* ── Disruption badges ── */
const DISRUPTIONS = [
  {
    icon: Clock,
    label: "Terlambat 12 jam",
    x: "46%",
    y: "28%",
    color: "text-amber-300",
    bg: "bg-amber-950/80",
    border: "border-amber-400/60",
  },
  {
    icon: Thermometer,
    label: "Cold-chain putus",
    x: "68%",
    y: "65%",
    color: "text-red-300",
    bg: "bg-red-950/80",
    border: "border-red-400/60",
  },
  {
    icon: AlertTriangle,
    label: "Stok tidak pasti",
    x: "24%",
    y: "62%",
    color: "text-orange-300",
    bg: "bg-orange-950/80",
    border: "border-orange-400/60",
  },
] as const;

/* ── SVG path data for the connecting route ── */
const ROUTE_PATH =
  "M 145 285 C 220 200, 300 200, 380 210 C 460 220, 500 300, 580 320 C 660 340, 750 260, 830 250";

export default function Scene3Logistics({ scrollYProgress }: Props) {
  /* scene-level opacity */
  const opacity = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.5, 0.6],
    [0, 1, 1, 0]
  );

  /* stagger nodes left → right */
  const node0 = useTransform(scrollYProgress, [0.34, 0.40], [0, 1]);
  const node1 = useTransform(scrollYProgress, [0.36, 0.42], [0, 1]);
  const node2 = useTransform(scrollYProgress, [0.38, 0.44], [0, 1]);
  const node3 = useTransform(scrollYProgress, [0.40, 0.46], [0, 1]);
  const nodeOpacities = [node0, node1, node2, node3];

  /* disruption badges appear slightly later */
  const badgeOpacity = useTransform(scrollYProgress, [0.42, 0.48], [0, 1]);

  /* truck nudge (small shake to indicate stalling) */
  const truckShake = useTransform(
    scrollYProgress,
    [0.44, 0.46, 0.48, 0.50, 0.52],
    [0, -6, 6, -4, 0]
  );

  return (
    <motion.div
      style={{ opacity }}
      className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center overflow-hidden"
    >
      {/* ── Atmospheric background glows ── */}
      <div className="absolute top-[20%] left-[8%] w-80 h-80 rounded-full bg-sky-500/[0.10] blur-[100px]" />
      <div className="absolute bottom-[15%] right-[10%] w-96 h-96 rounded-full bg-amber-500/[0.08] blur-[120px]" />
      <div className="absolute top-[60%] left-[50%] w-72 h-72 rounded-full bg-red-500/[0.07] blur-[100px] -translate-x-1/2" />

      {/* ── SVG route lines (dashed, animated) ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Shadow / glow path */}
        <path
          d={ROUTE_PATH}
          fill="none"
          stroke="rgba(100,116,139,0.25)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Dashed main path */}
        <path
          d={ROUTE_PATH}
          fill="none"
          stroke="rgba(148,163,184,0.55)"
          strokeWidth="2.5"
          strokeDasharray="10 14"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-48"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>

        {/* X marks on the path segments to show disruption */}
        {[
          { cx: 300, cy: 205 },
          { cx: 500, cy: 310 },
          { cx: 710, cy: 295 },
        ].map((pt, i) => (
          <g key={i} opacity="0.75">
            <circle
              cx={pt.cx}
              cy={pt.cy}
              r="14"
              fill="rgba(239,68,68,0.20)"
              stroke="rgba(239,68,68,0.50)"
              strokeWidth="1.5"
            />
            <line
              x1={pt.cx - 6}
              y1={pt.cy - 6}
              x2={pt.cx + 6}
              y2={pt.cy + 6}
              stroke="rgba(239,68,68,0.8)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1={pt.cx + 6}
              y1={pt.cy - 6}
              x2={pt.cx - 6}
              y2={pt.cy + 6}
              stroke="rgba(239,68,68,0.8)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        ))}
      </svg>

      {/* ── Supply-chain Nodes ── */}
      {NODES.map((node, i) => {
        const Icon = node.icon;
        const isTruck = node.icon === Truck;

        return (
          <motion.div
            key={node.label}
            style={{
              left: node.x,
              top: node.y,
              opacity: nodeOpacities[i],
              x: isTruck ? truckShake : 0,
            }}
            className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
          >
            {/* Glow ring */}
            <div
              className="absolute w-36 h-36 rounded-full blur-2xl -z-10"
              style={{ background: node.glow }}
            />

            {/* Icon container */}
            <div
              className={`w-20 h-20 md:w-24 md:h-24 ${node.bg} rounded-2xl flex items-center justify-center backdrop-blur-xl border ${node.border} shadow-lg relative transition-transform duration-300`}
            >
              <Icon className={`${node.text} w-9 h-9 md:w-11 md:h-11`} />

              {/* Spinning clock overlay on the truck */}
              {isTruck && (
                <div className="absolute -top-3 -right-3 w-7 h-7 bg-amber-500/20 rounded-full flex items-center justify-center border border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                  <Clock
                    className="text-amber-400 w-3.5 h-3.5 animate-spin"
                    style={{ animationDuration: "3s" }}
                  />
                </div>
              )}
            </div>

            {/* Label */}
            <span className="mt-3 text-[11px] md:text-xs font-semibold tracking-[0.16em] uppercase text-slate-300">
              {node.label}
            </span>
          </motion.div>
        );
      })}

      {/* ── Disruption Badges ── */}
      {DISRUPTIONS.map((d, i) => {
        const Icon = d.icon;
        return (
          <motion.div
            key={d.label}
            style={{ left: d.x, top: d.y, opacity: badgeOpacity }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeInOut",
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full ${d.bg} border ${d.border} backdrop-blur-xl shadow-lg shadow-black/10`}
            >
              <Icon className={`w-3.5 h-3.5 ${d.color}`} />
              <span className={`text-[10px] md:text-[11px] font-semibold tracking-wider uppercase ${d.color}`}>
                {d.label}
              </span>
            </motion.div>
          </motion.div>
        );
      })}

      {/* ── Bottom "broken" indicator line ── */}
      <div className="absolute bottom-[14%] left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-70">
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-red-500/50" />
        <div className="w-6 h-6 rounded-full border border-red-500/40 bg-red-950/40 flex items-center justify-center">
          <X className="w-3 h-3 text-red-400" />
        </div>
        <span className="text-[10px] tracking-[0.2em] uppercase text-red-300/70 font-medium">
          Distribusi Manual
        </span>
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-red-500/50" />
      </div>
    </motion.div>
  );
}
