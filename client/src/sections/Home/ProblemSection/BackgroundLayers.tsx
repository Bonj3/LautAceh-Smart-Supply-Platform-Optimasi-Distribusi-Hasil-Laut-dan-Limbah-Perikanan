import { motion, MotionValue, useTransform } from "motion/react";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function BackgroundLayers({ scrollYProgress }: Props) {
  // Animasi warna background: Sunrise (Ocean) -> Siang (Logistics) -> Gelap (Waste) -> Glowing Blue (Hub)
  const bgTop = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.85, 1],
    ["#B8DFF5", "#EFF6FF", "#1E293B", "#0F172A", "#06102B"]
  );

  const bgBottom = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.85, 1],
    ["#0F4C81", "#1E3A8A", "#0F172A", "#020617", "#0F4C81"]
  );

  return (
    <motion.div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background: useTransform(() => `linear-gradient(175deg, ${bgTop.get()} 0%, ${bgBottom.get()} 100%)`)
      }}
    />
  );
}
