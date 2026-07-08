import { motion, MotionValue, useTransform } from "motion/react";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function Scene5Processing({ scrollYProgress }: Props) {
  const sceneOpacity = useTransform(
    scrollYProgress,
    [0.65, 0.7, 0.8, 0.85],
    [0, 1, 1, 0]
  );

  // Waste items fade away completely before the scene ends
  const wasteOpacity = useTransform(
    scrollYProgress,
    [0.72, 0.78],
    [1, 0]
  );

  // Fillet stays slightly longer
  const filletOpacity = useTransform(
    scrollYProgress,
    [0.72, 0.82],
    [1, 0.3]
  );

  const parts = [
    { label: "Kepala", angle: -45, distance: 100, isWaste: true },
    { label: "Tulang", angle: 0, distance: 120, isWaste: true },
    { label: "Sisik & Kulit", angle: 45, distance: 100, isWaste: true },
    { label: "Fillet Daging", angle: 180, distance: 80, isWaste: false },
  ];

  return (
    <motion.div style={{ opacity: sceneOpacity }} className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center">
      
      {/* Container tracking the fish position (center screen) */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
        {parts.map((part, i) => {
          const rad = (part.angle * Math.PI) / 180;
          const x = Math.cos(rad) * part.distance;
          const y = Math.sin(rad) * part.distance;

          return (
            <motion.div
              key={i}
              style={{ opacity: part.isWaste ? wasteOpacity : filletOpacity }}
              className="absolute flex items-center justify-center"
              initial={{ x: 0, y: 0 }}
              animate={{ x, y }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className={`px-3 py-1.5 rounded-full backdrop-blur-md border text-[10px] uppercase tracking-widest font-medium whitespace-nowrap
                ${part.isWaste ? 'bg-red-900/20 border-red-800/40 text-red-300' : 'bg-emerald-900/20 border-emerald-800/40 text-emerald-300'}
              `}>
                {part.label}
              </div>
            </motion.div>
          );
        })}
      </div>
      
    </motion.div>
  );
}
