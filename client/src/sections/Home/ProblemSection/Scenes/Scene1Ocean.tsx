import { motion, MotionValue, useTransform } from "motion/react";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function Scene1Ocean({ scrollYProgress }: Props) {
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <motion.div style={{ opacity }} className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center overflow-hidden">
      {/* Sun */}
      <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-amber-200/20 rounded-full blur-3xl" />
      <div className="absolute top-[25%] right-[15%] w-32 h-32 bg-amber-300/40 rounded-full blur-2xl" />
      <div className="absolute top-[28%] right-[17%] w-16 h-16 bg-amber-100 rounded-full blur-sm" />

      {/* Subtle Waves using SVG */}
      <div className="absolute bottom-0 left-0 w-full h-[40vh] opacity-30">
        <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
          <path fill="#38BDF8" fillOpacity="0.4" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,192C960,203,1056,181,1152,149.3C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-[80%]" preserveAspectRatio="none">
          <path fill="#0F4C81" fillOpacity="0.6" d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,224C840,245,960,267,1080,256C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>

      {/* Distant Boat */}
      <div className="absolute top-[55%] right-[25%] opacity-40">
        <div className="w-16 h-4 bg-slate-800 rounded-b-xl relative">
          <div className="absolute -top-6 left-4 w-1 h-6 bg-slate-800"></div>
          <div className="absolute -top-5 left-4 w-0 h-0 border-l-[12px] border-l-slate-300 border-b-[16px] border-b-transparent"></div>
        </div>
      </div>

      {/* Bubbles */}
      <div className="absolute bottom-[10%] left-[20%] w-2 h-2 rounded-full border border-sky-300 opacity-50 animate-ping" style={{ animationDuration: "3s" }} />
      <div className="absolute bottom-[20%] left-[40%] w-3 h-3 rounded-full border border-sky-300 opacity-30 animate-ping" style={{ animationDuration: "4s", animationDelay: "1s" }} />
      <div className="absolute bottom-[15%] left-[60%] w-1.5 h-1.5 rounded-full border border-sky-300 opacity-60 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
    </motion.div>
  );
}
