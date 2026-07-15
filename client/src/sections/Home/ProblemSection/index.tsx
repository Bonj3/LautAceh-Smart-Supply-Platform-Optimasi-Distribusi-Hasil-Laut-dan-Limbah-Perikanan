import { useRef } from "react";
import { useScroll, motion, useTransform } from "motion/react";

import Fish from "./Fish";
import OverlayCards from "./OverlayCards";

// Scenes
import Scene1Ocean from "./Scenes/Scene1Ocean";
import Scene2Fisherman from "./Scenes/Scene2Fisherman";
import Scene3Logistics from "./Scenes/Scene3Logistics";
import Scene4SupplyChain from "./Scenes/Scene4SupplyChain";
import Scene5Processing from "./Scenes/Scene5Processing";
import Scene6Hub from "./Scenes/Scene6Hub";

export default function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress through the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Perjalanan horisontal berakhir di 0.90 (Scene6 sudah terlihat).
  // Dari 0.90 → 1.0, x dikunci di -83.3333% agar Scene6 (Hub) tetap terlihat.
  const xVal = useTransform(scrollYProgress, [0, 0.90, 1], [0, -83.333333, -83.333333]);
  const x = useTransform(xVal, v => `${v}%`);

  return (
    // Section height 410vh: animasi horisontal sampai 0.90, lalu Hub menetap hingga 1.0.
    <section ref={containerRef} className="relative h-[410vh]" style={{ background: "linear-gradient(180deg, #1a7a8e 0%, #0c3547 20%, #0c3547 80%, #0c3547 100%)" }}>
      
      {/* Sticky Container - fixed to viewport while scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden font-sans">

        {/* The Continuous Horizontal Journey Container */}
        <motion.div 
          style={{ x }} 
          className="absolute top-0 left-0 h-full flex w-[600vw]"
        >
          <Scene1Ocean scrollYProgress={scrollYProgress} />
          <Scene2Fisherman scrollYProgress={scrollYProgress} />
          <Scene3Logistics scrollYProgress={scrollYProgress} />
          <Scene4SupplyChain scrollYProgress={scrollYProgress} />
          <Scene5Processing scrollYProgress={scrollYProgress} />
          <Scene6Hub scrollYProgress={scrollYProgress} />
        </motion.div>

        {/* The Tuna Fish Protagonist */}
        <Fish scrollYProgress={scrollYProgress} />

        {/* Glassmorphism Story Overlays */}
        <OverlayCards scrollYProgress={scrollYProgress} />

      </div>

    </section>
  );
}