import { motion, MotionValue, useTransform } from "motion/react";
import { STORY_DATA } from "./data";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function OverlayCards({ scrollYProgress }: Props) {
  // Animasi untuk setiap card. Mereka muncul (fade in & slide up) lalu menghilang.
  
  const introOpacity = useTransform(scrollYProgress, [0, 0.05, 0.12, 0.15], [0, 1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.05, 0.12, 0.15], [50, 0, 0, -50]);

  const card2Opacity = useTransform(scrollYProgress, [0.15, 0.2, 0.3, 0.35], [0, 1, 1, 0]);
  const card2Y = useTransform(scrollYProgress, [0.15, 0.2, 0.3, 0.35], [50, 0, 0, -50]);

  const card3Opacity = useTransform(scrollYProgress, [0.35, 0.4, 0.5, 0.55], [0, 1, 1, 0]);
  const card3Y = useTransform(scrollYProgress, [0.35, 0.4, 0.5, 0.55], [50, 0, 0, -50]);

  const card4Opacity = useTransform(scrollYProgress, [0.55, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const card4Y = useTransform(scrollYProgress, [0.55, 0.6, 0.7, 0.75], [50, 0, 0, -50]);

  const card5Opacity = useTransform(scrollYProgress, [0.75, 0.78, 0.82, 0.85], [0, 1, 1, 0]);
  const card5Y = useTransform(scrollYProgress, [0.75, 0.78, 0.82, 0.85], [50, 0, 0, -50]);

  const CardTemplate = ({ opacity, y, title, description }: any) => (
    <motion.div
      style={{ opacity, y }}
      className="absolute top-[20%] right-[10%] w-[90%] max-w-[400px] pointer-events-none"
    >
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight">
          {title}
        </h3>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );

  return (
    <div className="absolute inset-0 z-50 pointer-events-none">
      
      {/* Intro Scene 1 */}
      <motion.div
        style={{ opacity: introOpacity, y: introY }}
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[90%] max-w-[600px] text-center"
      >
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg">
          {STORY_DATA.intro.headline}
        </h1>
        <p className="text-slate-200 text-lg md:text-xl leading-relaxed drop-shadow-md">
          {STORY_DATA.intro.supporting}
        </p>
      </motion.div>

      {/* Cards for Scenes 2-5 */}
      <CardTemplate 
        opacity={card2Opacity} 
        y={card2Y} 
        title={STORY_DATA.scenes[0].title} 
        description={STORY_DATA.scenes[0].description} 
      />
      <CardTemplate 
        opacity={card3Opacity} 
        y={card3Y} 
        title={STORY_DATA.scenes[1].title} 
        description={STORY_DATA.scenes[1].description} 
      />
      <CardTemplate 
        opacity={card4Opacity} 
        y={card4Y} 
        title={STORY_DATA.scenes[2].title} 
        description={STORY_DATA.scenes[2].description} 
      />
      <CardTemplate 
        opacity={card5Opacity} 
        y={card5Y} 
        title={STORY_DATA.scenes[3].title} 
        description={STORY_DATA.scenes[3].description} 
      />

    </div>
  );
}
