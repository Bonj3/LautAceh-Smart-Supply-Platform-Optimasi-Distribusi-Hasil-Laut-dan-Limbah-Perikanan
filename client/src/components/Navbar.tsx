import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { routes } from "../routes";

const navLinks = ["Beranda", "Toko", "Berita", "FAQ", "Afiliasi", "Mulai Menjual"];

export function Navbar({ theme = "dark" }: { theme?: "light" | "dark" }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="px-4 sm:px-6 md:px-8 lg:px-12 py-[18px] flex items-center justify-between transition-all duration-400 ease-in-out w-full"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: theme === "light" ? "rgba(255, 255, 255, 0.98)" : (scrolled ? "rgba(4, 70, 84, 0.92)" : "transparent"),
        backdropFilter: (scrolled || theme === "light") ? "blur(16px)" : "none",
        boxShadow: (scrolled || theme === "light") ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
        borderBottom: theme === "light" ? "1px solid rgba(0,0,0,0.05)" : "none",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #3CC8D8, #0891b2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            boxShadow: "0 4px 15px rgba(60,200,216,0.4)",
          }}
        >
          🐚
        </div>
        <span
          className={`font-extrabold text-lg tracking-[3px] font-sans ${theme === "light" ? "text-gray-900" : "text-white"}`}
        >
          PasaiEungkot
        </span>
      </div>

      {/* Nav links - desktop */}
      <div
        className="hidden md:flex items-center gap-6 lg:gap-9"
      >
        {navLinks.map((link) => {
          const isMarketplace = link === "Marketplace" || link === "Toko";
          const isPenjual = link === "Mulai Menjual";
          const linkStyle = {
            color: theme === "light" ? "rgba(17, 24, 39, 0.85)" : "rgba(255,255,255,0.88)",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.5px",
            fontFamily: "Poppins, sans-serif",
            transition: "color 0.2s, opacity 0.2s",
            cursor: "pointer",
            whiteSpace: "nowrap" as const,
          };

          if (isMarketplace) {
            return (
              <Link
                key={link}
                to={routes.marketplace}
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#3CC8D8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.88)";
                }}
              >
                {link}
              </Link>
            );
          }
          if (isPenjual) {
            return (
              <Link
                key={link}
                to={routes.penjual}
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#0E7C8E";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme === "light" ? "rgba(17, 24, 39, 0.85)" : "rgba(255,255,255,0.88)";
                }}
              >
                {link}
              </Link>
            );
          }

          return (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              style={linkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#3CC8D8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.88)";
              }}
            >
              {link}
            </a>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
        <button
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: theme === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.15)",
            border: theme === "light" ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: theme === "light" ? "#4b5563" : "white",
            transition: "all 0.2s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.15)";
          }}
        >
          <Search size={15} />
        </button>

        <button
          className="hidden sm:block"
          style={{
            padding: "8px 22px",
            background: "transparent",
            border: theme === "light" ? "1px solid rgba(0,0,0,0.15)" : "1px solid rgba(255,255,255,0.45)",
            borderRadius: "24px",
            color: theme === "light" ? "#374151" : "white",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 500,
            fontFamily: "Poppins, sans-serif",
            transition: "all 0.2s",
            letterSpacing: "0.3px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.12)";
            e.currentTarget.style.borderColor = theme === "light" ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = theme === "light" ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.45)";
          }}
        >
          Sign In
        </button>

        <button
          style={{
            padding: "8px 22px",
            background: theme === "light" ? "#0E7C8E" : "white",
            border: "none",
            borderRadius: "24px",
            color: theme === "light" ? "white" : "#0E7C8E",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 700,
            fontFamily: "Poppins, sans-serif",
            transition: "all 0.2s",
            letterSpacing: "0.3px",
            boxShadow: theme === "light" ? "0 4px 15px rgba(14,124,142,0.3)" : "0 4px 15px rgba(255,255,255,0.2)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = theme === "light" ? "0 6px 20px rgba(14,124,142,0.4)" : "0 6px 20px rgba(255,255,255,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = theme === "light" ? "0 4px 15px rgba(14,124,142,0.3)" : "0 4px 15px rgba(255,255,255,0.2)";
          }}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}
