import { motion } from "motion/react";
import { ZoomIn, RotateCw } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

const SHRIMP_PLATE = "https://images.unsplash.com/photo-1758972572427-fc3d4193bbd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";

export function AboutSection() {
  return (
    <section
      id="about"
      style={{
        background: "#1a3d45",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Brush-stroke top edge */}
      <div
        style={{
          position: "absolute",
          top: -2,
          left: 0,
          right: 0,
          zIndex: 5,
        }}
      >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%" }}
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
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(60,200,216,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(8,145,178,0.1) 0%, transparent 50%)`,
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "120px 48px 100px",
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
        className="about-grid"
      >
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
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "12px",
              letterSpacing: "5px",
              color: "#3CC8D8",
              fontWeight: 600,
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            About
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(36px, 4vw, 56px)",
              fontWeight: 900,
              color: "white",
              lineHeight: 1.1,
              letterSpacing: "-0.5px",
              marginBottom: "28px",
            }}
          >
            ABOUT US
          </motion.h2>

          <div
            style={{
              width: 50,
              height: 4,
              background: "linear-gradient(90deg, #3CC8D8, #54D9E8)",
              borderRadius: "2px",
              marginBottom: "28px",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "15px",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.8,
              fontWeight: 300,
              marginBottom: "16px",
            }}
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
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "15px",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.8,
              fontWeight: 300,
              marginBottom: "36px",
            }}
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
            style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}
          >
            {["SHRIMPY", "BIG CLAM MUSH"].map((label) => (
              <motion.button
                key={label}
                whileHover={{ scale: 1.05, background: "#3CC8D8", color: "white" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "12px 28px",
                  background: "transparent",
                  border: "2px solid rgba(60,200,216,0.6)",
                  borderRadius: "30px",
                  color: "#54D9E8",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "12px",
                  letterSpacing: "2.5px",
                  cursor: "pointer",
                  transition: "all 0.25s",
                }}
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
            style={{ marginTop: "48px", display: "flex", flexDirection: "column", gap: "14px" }}
          >
            {[
              { icon: "🌊", text: "Sustainably sourced from certified fisheries" },
              { icon: "❄️", text: "Flash-frozen within hours of the catch" },
              { icon: "🚢", text: "Direct from dock to your doorstep" },
            ].map((item) => (
              <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "rgba(60,200,216,0.15)",
                    border: "1px solid rgba(60,200,216,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 400,
                  }}
                >
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
          style={{ position: "relative", display: "flex", justifyContent: "center" }}
        >
          {/* Main plate */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 420,
              height: 420,
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(60,200,216,0.2)",
              border: "6px solid rgba(255,255,255,0.12)",
              position: "relative",
            }}
          >
            <ImageWithFallback
              src={SHRIMP_PLATE}
              alt="Grilled shrimp on white plate"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* Inner glow */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                boxShadow: "inset 0 0 40px rgba(60,200,216,0.1)",
              }}
            />
          </motion.div>

          {/* Decorative green leaves */}
          <motion.div
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "5%",
              right: "2%",
              fontSize: "50px",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
              userSelect: "none",
            }}
          >
            🌿
          </motion.div>
          <motion.div
            animate={{ rotate: [5, -5, 5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            style={{
              position: "absolute",
              bottom: "8%",
              left: "2%",
              fontSize: "45px",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
              userSelect: "none",
            }}
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
              animate={{ y: [0, -5, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: pepper.delay }}
              style={{
                position: "absolute",
                top: pepper.top,
                left: (pepper as any).left,
                right: (pepper as any).right,
                bottom: pepper.bottom,
                width: pepper.size,
                height: pepper.size,
                borderRadius: "50%",
                background: "radial-gradient(circle, #b91c1c, #7f1d1d)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
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
            style={{
              position: "absolute",
              top: "10%",
              left: "5%",
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            }}
          >
            <ZoomIn size={20} color="white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.0 }}
            whileHover={{ scale: 1.15, rotate: 180 }}
            style={{
              position: "absolute",
              bottom: "15%",
              right: "5%",
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3CC8D8, #0891b2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(60,200,216,0.5)",
            }}
          >
            <RotateCw size={20} color="white" />
          </motion.div>

          {/* Floating lemon near plate */}
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "38%",
              left: "2%",
              fontSize: "32px",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))",
              userSelect: "none",
            }}
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
        style={{
          borderTop: "1px solid rgba(60,200,216,0.12)",
          padding: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1200,
          margin: "0 auto",
          flexWrap: "wrap",
          gap: "24px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "22px",
              fontWeight: 700,
              color: "white",
              marginBottom: "6px",
            }}
          >
            Ready to taste the ocean?
          </p>
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "14px",
              color: "rgba(255,255,255,0.55)",
              fontWeight: 300,
            }}
          >
            Order now and get free delivery on your first purchase.
          </p>
        </div>

        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "14px 36px",
              background: "linear-gradient(135deg, #3CC8D8, #0891b2)",
              border: "none",
              borderRadius: "30px",
              color: "white",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "1.5px",
              cursor: "pointer",
              boxShadow: "0 8px 30px rgba(60,200,216,0.35)",
            }}
          >
            ORDER NOW
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            style={{
              padding: "14px 36px",
              background: "transparent",
              border: "2px solid rgba(60,200,216,0.45)",
              borderRadius: "30px",
              color: "#54D9E8",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              letterSpacing: "1px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            LEARN MORE
          </motion.button>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
