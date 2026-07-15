import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../sections/Home/HeroSection";
import { WelcomeSection } from "../sections/Home/WelcomeSection";
import ProblemSection from "../sections/Home/ProblemSection";
import { AboutSection } from "../sections/Home/AboutSection";
import { AiSection } from "../sections/Home/AiSection";
import { FaqSection } from "../sections/Home/FaqSection";
import { Footer } from "../components/Footer";

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    // Restore scroll position
    const savedPos = sessionStorage.getItem("homeScrollPosition");
    if (savedPos && !hash) {
      window.scrollTo(0, parseInt(savedPos, 10));
    } else if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }

    // Save scroll position continuously
    const handleScroll = () => {
      sessionStorage.setItem("homeScrollPosition", window.scrollY.toString());
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hash]);

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        scrollBehavior: "smooth",
      }}
    >
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <AboutSection />
      <WelcomeSection />
      <AiSection />
      <FaqSection />
      <Footer />
    </div>
  );
}
