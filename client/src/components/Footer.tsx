import { Link } from "react-router-dom";
import { routes } from "../routes";
import textUrl from "../assets/logo-pasaieungkot.png";
import iconUrl from "../assets/PasaieUngkot.png";

export function Footer() {
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
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <img
              src={iconUrl}
              alt="PasaiEungkot Icon"
              style={{ height: "40px", objectFit: "contain" }}
            />
            <img 
              src={textUrl} 
              alt="PasaiEungkot Text" 
              style={{ 
                height: "20px", 
                objectFit: "contain",
                filter: "brightness(1.8) drop-shadow(0px 0px 2px rgba(255,255,255,0.2))"
              }} 
            />
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
            Platform digital yang menghubungkan seluruh ekosistem perikanan Aceh — dari nelayan hingga konsumen — secara transparan, efisien, dan berkelanjutan.
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
            title: "Platform",
            links: [
              { label: "Beranda", to: routes.home },
              { label: "Marketplace", to: routes.marketplace },
              { label: "Edukasi", to: routes.education },
              { label: "Tentang Kami", to: "#about-us" },
            ],
          },
          {
            title: "Produk Limbah",
            links: [
              { label: "Tulang Ikan", to: routes.marketplace },
              { label: "Sisik Ikan", to: routes.marketplace },
              { label: "Kepala Ikan", to: routes.marketplace },
              { label: "Jeroan Ikan", to: routes.marketplace },
            ],
          },
          {
            title: "Bantuan",
            links: [
              { label: "FAQ", to: "#faq" },
              { label: "Hubungi Kami", to: routes.contact },
              { label: "Info Pengiriman", to: "#" },
              { label: "Pengembalian", to: "#" },
            ],
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
                <li key={link.label}>
                  <Link
                    to={link.to}
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
                    {link.label}
                  </Link>
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
          © 2026 PasaiEungkot. Hak Cipta Dilindungi.
        </p>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>
          Kebijakan Privasi · Syarat & Ketentuan
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
