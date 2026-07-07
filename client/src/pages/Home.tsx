import { Navbar } from "../components/Navbar";
import { HeroSection } from "../sections/Home/HeroSection";
import { WelcomeSection } from "../sections/Home/WelcomeSection";
import ProblemSection from "../sections/Home/ProblemSection";
import { AboutSection } from "../sections/Home/AboutSection";

function Footer() {
  return (
    <footer className="bg-[#0d2b31] text-white px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-8 font-sans w-full">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12 mb-12">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-[0_4px_15px_rgba(60,200,216,0.3)]" style={{ background: "linear-gradient(135deg, #3CC8D8, #0891b2)" }}>
              🐚
            </div>
            <span className="font-extrabold text-lg tracking-[3px] text-white">
              OCEANIC
            </span>
          </div>
          <p className="text-sm text-white/50 leading-[1.7] font-light max-w-[280px]">
            Bringing the finest ocean catch to your table since 2018. Freshness you can taste in every bite.
          </p>

          <div className="flex gap-2.5 mt-6">
            {['📘', '📸', '🐦', '▶️'].map((icon) => (
              <button
                key={icon}
                className="w-9 h-9 rounded-full bg-[#3cc8d81f] border border-[#3cc8d833] flex items-center justify-center cursor-pointer text-sm transition-colors duration-200 hover:bg-[#3cc8d840]"
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {[
          {
            title: "Company",
            links: ["About Us", "Our Mission", "Careers", "Press"],
          },
          {
            title: "Products",
            links: ["Fresh Fish", "Lobster", "Crab", "Shrimp", "Octopus"],
          },
          {
            title: "Support",
            links: ["FAQ", "Contact Us", "Delivery Info", "Returns"],
          },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-[13px] font-bold tracking-[2px] text-[#3CC8D8] uppercase mb-5">
              {col.title}
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/55 no-underline text-sm font-light transition-colors duration-200 hover:text-[#54D9E8]"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="w-full max-w-7xl mx-auto border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="text-[13px] text-white/35 font-light">
          © 2026 Oceanic Seafood Co. All rights reserved.
        </p>
        <p className="text-[13px] text-white/35 font-light">
          Privacy Policy · Terms of Service
        </p>
      </div>
    </footer>
  );
}

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
