import { Navbar } from "../components/Navbar";
import { HeroSection } from "../sections/Home/HeroSection";
import { WelcomeSection } from "../sections/Home/WelcomeSection";
import { ProblemSection } from "../sections/Home/ProblemSection";
import { AboutSection } from "../sections/Home/AboutSection";
import { Footer } from "../components/Footer";

export default function Home() {
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
      <WelcomeSection />
      <AboutSection />
      <Footer />
    </div>
  );
}
