import { useState, useEffect } from "react";
import { Search } from "lucide-react";

const navLinks = ["Home", "Marketplace", "News", "FAQ", "Affiliate", "Contact Us"];

export function Navbar() {
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
        background: scrolled ? "rgba(4, 70, 84, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.15)" : "none",
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
          className="text-white font-extrabold text-lg tracking-[3px] font-sans"
        >
          PasaiEungkot
        </span>
      </div>

      {/* Nav links - desktop */}
      <div
        className="hidden md:flex items-center gap-6 lg:gap-9"
      >
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
            style={{
              color: "rgba(255,255,255,0.88)",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.5px",
              fontFamily: "Poppins, sans-serif",
              transition: "color 0.2s, opacity 0.2s",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#3CC8D8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.88)";
            }}
          >
            {link}
          </a>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
        <button
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "white",
            transition: "all 0.2s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.15)";
          }}
        >
          <Search size={15} />
        </button>

        <button
          className="hidden sm:block"
          style={{
            padding: "8px 22px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.45)",
            borderRadius: "24px",
            color: "white",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 500,
            fontFamily: "Poppins, sans-serif",
            transition: "all 0.2s",
            letterSpacing: "0.3px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.12)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
          }}
        >
          Sign In
        </button>

        <button
          style={{
            padding: "8px 22px",
            background: "white",
            border: "none",
            borderRadius: "24px",
            color: "#0E7C8E",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 700,
            fontFamily: "Poppins, sans-serif",
            transition: "all 0.2s",
            letterSpacing: "0.3px",
            boxShadow: "0 4px 15px rgba(255,255,255,0.2)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(255,255,255,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(255,255,255,0.2)";
          }}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}
