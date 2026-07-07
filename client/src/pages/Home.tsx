import { Navbar } from "../components/Navbar";
import { HeroSection } from "../sections/Home/HeroSection";
import { WelcomeSection } from "../sections/Home/WelcomeSection";
import ProblemSection from "../sections/Home/ProblemSection";
import { AboutSection } from "../sections/Home/AboutSection";

function Footer() {
  return (
    <footer
      style={{
        background: "#0d2b31",
        color: "white",
        padding: "60px 48px 32px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "48px",
          marginBottom: "48px",
        }}
        className="footer-grid"
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #3CC8D8, #0891b2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              🐚
            </div>
            <span style={{ fontWeight: 800, fontSize: "18px", letterSpacing: "3px", color: "white" }}>
              OCEANIC
            </span>
          </div>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              fontWeight: 300,
              maxWidth: 280,
            }}
          >
            Bringing the finest ocean catch to your table since 2018. Freshness you can taste in every bite.
          </p>

          <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
            {['📘', '📸', '🐦', '▶️'].map((icon) => (
              <button
                key={icon}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(60,200,216,0.12)",
                  border: "1px solid rgba(60,200,216,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "14px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(60,200,216,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(60,200,216,0.12)";
                }}
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
            <h4
              style={{
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "2px",
                color: "#3CC8D8",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              {col.title}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    style={{
                      color: "rgba(255,255,255,0.55)",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: 300,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#54D9E8";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1200,
          margin: "0 auto",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>
          © 2026 Oceanic Seafood Co. All rights reserved.
        </p>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>
          Privacy Policy · Terms of Service
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 500px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
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
