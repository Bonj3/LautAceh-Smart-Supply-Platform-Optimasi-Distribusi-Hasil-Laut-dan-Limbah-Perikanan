import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { faqData, FaqItem } from "../sections/Home/FaqSection";
import { motion } from "motion/react";
import OceanBackground from "../components/OceanBackground";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        scrollBehavior: "smooth",
      }}
      className="relative min-h-screen flex flex-col bg-transparent"
    >
      <OceanBackground />
      <Link 
        to="/" 
        className="absolute top-8 left-6 md:top-10 md:left-10 z-50 flex items-center gap-2 text-white/90 hover:text-white transition-all bg-[#072430]/40 hover:bg-[#072430]/70 px-5 py-2.5 rounded-full backdrop-blur-md shadow-lg border border-white/10 hover:border-white/30"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        <span className="font-sans font-medium text-sm tracking-wide relative -top-[1px]">Kembali</span>
      </Link>

      <main className="flex-grow pt-32 pb-20 relative z-10">

        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-14 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 relative inline-block"
            >
              {/* Dark Patch for Contrast */}
              <div className="absolute inset-0 bg-[#072430]/30 blur-2xl scale-110 rounded-full -z-10"></div>

              <motion.span
                className="font-sans text-[36px] md:text-[48px] font-black tracking-[4px] uppercase"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #a5f3fb 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block"
                }}
              >
                FAQ PasaieUngkot
              </motion.span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans font-bold text-white text-[24px] md:text-[32px] leading-tight mb-4 tracking-[-0.5px]"
            >
              Temukan jawaban untuk semua pertanyaanmu.
            </motion.h2>
          </div>

          {/* FAQ List */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col border border-white/10 rounded-[20px] bg-[#0c3547]/60 backdrop-blur-lg overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
          >
            {faqData.map((item, index) => (
              <FaqItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onClick={() => toggleItem(index)}
                isLast={index === faqData.length - 1}
              />
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
