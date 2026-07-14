import { motion, MotionValue, useTransform } from "motion/react";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function BackgroundLayers({ scrollYProgress }: Props) {
  // Animasi warna background: Sunrise (Ocean) -> Siang (Logistics) -> Gelap (Waste) -> Glowing Blue (Hub)
  const bgTop = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.85, 1],
    ["#7DD3FC", "#DBEAFE", "#1E293B", "#0F172A", "#08132B"] // Brighter ocean top -> deeper darks
  );

  const bgBottom = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.85, 1],
    ["#0284C7", "#1E3A8A", "#0F172A", "#020617", "#0E395B"] // Richer ocean bottom
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
