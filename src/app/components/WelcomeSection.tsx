import { motion } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const FISH_IMG = "https://images.unsplash.com/photo-1683405503746-0fcbc47daaa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";
const LOBSTER_IMG = "https://images.unsplash.com/photo-1519351635902-7c60d09cb2ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";
const OCTOPUS_IMG = "https://images.unsplash.com/photo-1778439800463-3691caa978b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";
const PROMO_BG = "https://images.unsplash.com/photo-1651323018466-b36b7df1d2b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";

const serviceCards = [
  {
    title: "Fish",
    icon: "🐟",
    img: FISH_IMG,
    description: "Line-caught daily. Silver-bright and ocean-fresh.",
    color: "#0891b2",
  },
  {
    title: "Lobster",
    icon: "🦞",
    img: LOBSTER_IMG,
    description: "Premium Atlantic lobster. Sweet, tender, legendary.",
    color: "#0E7C8E",
  },
  {
    title: "Octopus",
    icon: "🐙",
    img: OCTOPUS_IMG,
    description: "Wild-caught deep-sea octopus. Silky and flavourful.",
    color: "#048092",
  },
];

function ServiceCard({
  title,
  icon,
  img,
  description,
  color,
  delay,
}: {
  title: string;
  icon: string;
  img: string;
  description: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, boxShadow: "0 24px 60px rgba(14,124,142,0.18)" }}
      style={{
        background: "white",
        borderRadius: "24px",
        padding: "32px 24px",
        textAlign: "center",
        boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.3s",
        cursor: "default",
        flex: 1,
        minWidth: 0,
      }}
    >
      {/* Circular image */}
      <div
        style={{
          width: 110,
          height: 110,
          borderRadius: "50%",
          overflow: "hidden",
          margin: "0 auto 20px",
          boxShadow: `0 12px 35px ${color}40`,
          border: `3px solid ${color}25`,
          position: "relative",
        }}
      >
        <ImageWithFallback
          src={img}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Icon badge */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${color}, #3CC8D8)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "-18px auto 16px",
          fontSize: "18px",
          boxShadow: `0 4px 14px ${color}55`,
          position: "relative",
          zIndex: 2,
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 700,
          fontSize: "18px",
          color: "#1a3a42",
          marginBottom: "8px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "13px",
          color: "#6b8a90",
          lineHeight: 1.6,
          fontWeight: 400,
        }}
      >
        {description}
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        style={{
          marginTop: "20px",
          padding: "9px 24px",
          background: `linear-gradient(135deg, ${color}, #3CC8D8)`,
          border: "none",
          borderRadius: "20px",
          color: "white",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          fontSize: "12px",
          letterSpacing: "0.5px",
          cursor: "pointer",
        }}
      >
        View More
      </motion.button>
    </motion.div>
  );
}

export function WelcomeSection() {
  return (
    <section
      id="about-us"
      style={{
        background: "#f0fbfd",
        padding: "80px 0 100px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 48px",
        }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "13px",
              letterSpacing: "6px",
              color: "#3CC8D8",
              fontWeight: 600,
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            Welcome
          </p>
          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 800,
              color: "#1a3a42",
              lineHeight: 1.15,
              letterSpacing: "-0.5px",
            }}
          >
            SEAFOOD COMPANY
          </h2>
          <div
            style={{
              width: 60,
              height: 4,
              background: "linear-gradient(90deg, #3CC8D8, #0891b2)",
              borderRadius: "2px",
              margin: "16px auto 0",
            }}
          />
        </motion.div>

        {/* Main grid: promo card + service cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: "28px",
            alignItems: "start",
          }}
          className="welcome-grid"
        >
          {/* Promo card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              borderRadius: "28px",
              overflow: "hidden",
              position: "relative",
              minHeight: 360,
              cursor: "pointer",
            }}
          >
            {/* Dark seafood background */}
            <div
              style={{
                position: "absolute",
                inset: 0,
              }}
            >
              <ImageWithFallback
                src={PROMO_BG}
                alt="Seafood platter"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(2,28,34,0.92) 40%, rgba(5,60,72,0.65) 100%)",
                }}
              />
            </div>

            {/* Content overlay */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                padding: "36px 28px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                minHeight: 360,
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(60,200,216,0.2)",
                  border: "1px solid rgba(60,200,216,0.4)",
                  borderRadius: "20px",
                  padding: "4px 14px",
                  marginBottom: "16px",
                  width: "fit-content",
                }}
              >
                <span
                  style={{
                    color: "#54D9E8",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  Special Offer
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 800,
                  fontSize: "22px",
                  color: "white",
                  lineHeight: 1.2,
                  marginBottom: "10px",
                }}
              >
                SEAFOOD BEST<br />FRESH FOOD
              </h3>

              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: "6px",
                }}
              >
                Full combo only
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "4px",
                  marginBottom: "24px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "44px",
                    fontWeight: 800,
                    color: "#3CC8D8",
                    lineHeight: 1,
                  }}
                >
                  99
                </span>
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#54D9E8",
                  }}
                >
                  $
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "12px 32px",
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  border: "none",
                  borderRadius: "24px",
                  color: "white",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "1.5px",
                  cursor: "pointer",
                  width: "fit-content",
                  boxShadow: "0 6px 20px rgba(34,197,94,0.4)",
                }}
              >
                SHOP NOW
              </motion.button>
            </div>
          </motion.div>

          {/* Service cards */}
          <div
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            {serviceCards.map((card, i) => (
              <ServiceCard key={card.title} {...card} delay={i * 0.15 + 0.2} />
            ))}
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            marginTop: "60px",
          }}
        >
          {[
            { num: "50+", label: "Species Available", icon: "🐠" },
            { num: "2K+", label: "Happy Customers", icon: "😊" },
            { num: "24h", label: "Fast Delivery", icon: "🚀" },
            { num: "100%", label: "Fresh Guaranteed", icon: "✨" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "28px 20px",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ fontSize: "30px", marginBottom: "8px" }}>{stat.icon}</div>
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 800,
                  fontSize: "28px",
                  color: "#0891b2",
                  lineHeight: 1.1,
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                  color: "#6b8a90",
                  fontWeight: 500,
                  marginTop: "4px",
                  letterSpacing: "0.3px",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .welcome-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .welcome-grid > div:last-child {
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  );
}
