import { motion } from "motion/react";
import { ZoomIn, RotateCw } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

const SHRIMP_PLATE = "https://images.unsplash.com/photo-1758972572427-fc3d4193bbd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";

export function AboutSection() {
  return (
    <section
      id="about"
      className="bg-[#1a3d45] relative overflow-hidden w-full"
    >
      {/* Brush-stroke top edge */}
      <div className="absolute -top-0.5 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="block w-full h-[40px] sm:h-[80px]"
        >
          <path
            d="M0,80 C80,35 160,65 280,38 C400,12 500,70 640,44 C780,18 900,72 1040,35 C1160,8 1300,60 1380,30 C1420,18 1440,40 1440,40 L1440,0 L0,0 Z"
            fill="#f0fbfd"
          />
          <path
            d="M0,80 C120,45 240,70 380,42 C520,15 640,68 800,38 C960,10 1100,65 1260,32 C1370,12 1430,45 1440,38 L1440,0 L0,0 Z"
            fill="rgba(240,251,253,0.5)"
          />
        </svg>
      </div>

      {/* Background texture */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(60,200,216,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(8,145,178,0.1) 0%, transparent 50%)`,
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-[2] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans text-[11px] md:text-[12px] tracking-[4px] md:tracking-[5px] text-[#3CC8D8] font-semibold uppercase mb-3"
          >
            About
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans font-black text-white leading-[1.1] tracking-[-0.5px] mb-6 md:mb-7"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            ABOUT US
          </motion.h2>

          <div
            className="w-10 md:w-[50px] h-1 rounded-sm mb-6 md:mb-7"
            style={{
              background: "linear-gradient(90deg, #3CC8D8, #54D9E8)",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-sans text-sm md:text-[15px] text-white/70 leading-[1.8] font-light mb-4"
          >
            We are passionate about bringing the ocean's finest treasures to your plate.
            Founded by a team of seafood enthusiasts, we source only the highest-quality
            catch from sustainable fisheries around the world.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-sans text-sm md:text-[15px] text-white/70 leading-[1.8] font-light mb-8 md:mb-9"
          >
            Every piece is handled with care from boat to table — maintaining the
            natural freshness, flavour, and nutritional value your family deserves.
          </motion.p>

          {/* Pill buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-3 sm:gap-4"
          >
            {["SHRIMPY", "BIG CLAM MUSH"].map((label) => (
              <motion.button
                key={label}
                whileHover={{ scale: 1.05, background: "#3CC8D8", color: "white" }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2.5 sm:px-7 sm:py-3 bg-transparent border-2 border-[#3cc8d899] rounded-full text-[#54D9E8] font-sans font-bold text-[11px] sm:text-[12px] tracking-[2px] sm:tracking-[2.5px] cursor-pointer transition-colors duration-250"
              >
                {label}
              </motion.button>
            ))}
          </motion.div>

          {/* Features list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 md:mt-12 flex flex-col gap-3.5"
          >
            {[
              { icon: "🌊", text: "Sustainably sourced from certified fisheries" },
              { icon: "❄️", text: "Flash-frozen within hours of the catch" },
              { icon: "🚢", text: "Direct from dock to your doorstep" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3.5">
                <div className="w-9 h-9 md:w-[38px] md:h-[38px] rounded-full bg-[#3cc8d826] border border-[#3cc8d84d] flex items-center justify-center text-base md:text-lg shrink-0">
                  {item.icon}
                </div>
                <p className="font-sans text-xs md:text-[14px] text-white/70 font-normal">
                  {item.text}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right - plate image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center items-center py-10"
        >
          {/* Main plate */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] aspect-square rounded-full overflow-hidden relative border-4 md:border-[6px] border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4),0_0_50px_rgba(60,200,216,0.15)] md:shadow-[0_40px_80px_rgba(0,0,0,0.5),0_0_60px_rgba(60,200,216,0.2)]"
          >
            <ImageWithFallback
              src={SHRIMP_PLATE}
              alt="Grilled shrimp on white plate"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_rgba(60,200,216,0.1)] md:shadow-[inset_0_0_40px_rgba(60,200,216,0.1)]" />
          </motion.div>

          {/* Decorative green leaves */}
          <motion.div
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:block absolute top-[5%] right-[2%] text-[40px] lg:text-[50px] select-none drop-shadow-md"
          >
            🌿
          </motion.div>
          <motion.div
            animate={{ rotate: [5, -5, 5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="hidden md:block absolute bottom-[8%] left-[2%] text-[36px] lg:text-[45px] select-none drop-shadow-md"
          >
            🌱
          </motion.div>

          {/* Pepper seeds scattered */}
          {[
            { top: "18%", left: "8%", size: "14px", delay: 0 },
            { top: "30%", right: "5%", size: "12px", delay: 0.3 },
            { bottom: "25%", right: "8%", size: "16px", delay: 0.6 },
            { bottom: "15%", left: "18%", size: "10px", delay: 0.9 },
            { top: "12%", left: "22%", size: "12px", delay: 1.2 },
          ].map((pepper, i) => (
            <motion.div
              key={i}
              className="hidden md:block absolute rounded-full shadow-md"
              animate={{ y: [0, -5, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: pepper.delay }}
              style={{
                top: pepper.top,
                left: pepper.left,
                right: pepper.right,
                bottom: pepper.bottom,
                width: pepper.size,
                height: pepper.size,
                background: "radial-gradient(circle, #b91c1c, #7f1d1d)",
              }}
            />
          ))}

          {/* Action icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ scale: 1.15 }}
            className="absolute top-[5%] md:top-[10%] left-[10%] md:left-[5%] w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center cursor-pointer shadow-[0_8px_20px_rgba(0,0,0,0.2)] md:shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
          >
            <ZoomIn size={18} color="white" className="md:w-5 md:h-5" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.0 }}
            whileHover={{ scale: 1.15, rotate: 180 }}
            className="absolute bottom-[10%] md:bottom-[15%] right-[10%] md:right-[5%] w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center cursor-pointer shadow-[0_8px_20px_rgba(60,200,216,0.4)] md:shadow-[0_8px_24px_rgba(60,200,216,0.5)]"
            style={{
              background: "linear-gradient(135deg, #3CC8D8, #0891b2)",
            }}
          >
            <RotateCw size={18} color="white" className="md:w-5 md:h-5" />
          </motion.div>

          {/* Floating lemon near plate */}
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:block absolute top-[38%] left-[2%] text-[28px] lg:text-[32px] select-none drop-shadow-md"
          >
            🍋
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom CTA stripe */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 border-t border-[#3cc8d81f] flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 relative z-[2] text-center md:text-left"
      >
        <div>
          <p className="font-sans text-xl md:text-[22px] font-bold text-white mb-1.5 md:mb-2">
            Ready to taste the ocean?
          </p>
          <p className="font-sans text-xs md:text-[14px] text-white/55 font-light">
            Order now and get free delivery on your first purchase.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center w-full md:w-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto px-8 py-3 md:px-9 md:py-3.5 border-none rounded-full text-white font-sans font-bold text-xs md:text-[13px] tracking-[1.5px] cursor-pointer shadow-[0_8px_25px_rgba(60,200,216,0.3)] md:shadow-[0_8px_30px_rgba(60,200,216,0.35)]"
            style={{
              background: "linear-gradient(135deg, #3CC8D8, #0891b2)",
            }}
          >
            ORDER NOW
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full sm:w-auto px-8 py-3 md:px-9 md:py-3.5 bg-transparent border-2 border-[#3cc8d873] rounded-full text-[#54D9E8] font-sans font-semibold text-xs md:text-[13px] tracking-[1px] cursor-pointer transition-colors"
          >
            LEARN MORE
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
