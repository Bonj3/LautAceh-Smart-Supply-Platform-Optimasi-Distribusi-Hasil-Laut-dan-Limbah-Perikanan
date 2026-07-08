import { useRef } from "react";
import { useScroll, motion, useTransform } from "motion/react";

import BackgroundLayers from "./BackgroundLayers";
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

  // Perjalanan horisontal berakhir di 0.80 (Scene6 sudah terlihat).
  // Dari 0.80 → 1.0, x dikunci di -83.3333% agar Scene6 (Hub) tetap terlihat
  // dan tidak bergeser kemana-mana selama sisa scroll berlangsung.
  const x = useTransform(scrollYProgress, [0, 0.80, 1], ["0%", "-83.3333%", "-83.3333%"]);

  return (
    // Section height 500vh: 80% untuk perjalanan horisontal, 20% untuk menetap di Scene6 (Hub).
    // Dengan total 500vh, user punya ~100vh waktu nyaman untuk membaca penutup cerita.
    <section ref={containerRef} className="relative h-[500vh] bg-slate-900">
      
      {/* Sticky Container - fixed to viewport while scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden font-sans">
        
        {/* Dynamic Background */}
        <BackgroundLayers scrollYProgress={scrollYProgress} />

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