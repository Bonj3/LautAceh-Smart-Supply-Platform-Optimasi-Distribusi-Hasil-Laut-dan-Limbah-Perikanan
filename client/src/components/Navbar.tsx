import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, LogOut, User, ChevronDown } from "lucide-react";
import { routes } from "../routes";
import { useAuth } from "../context/AuthContext";

// const navLinks = ["Home", "Marketplace", "News", "FAQ", "Affiliate", "Mulai Menjual "];
const navLinks = [
  { label: "Home", to: routes.home, type: "route" },
  { label: "Marketplace", to: routes.marketplace, type: "route" },
  { label: "News", to: "#news", type: "section" },
  { label: "FAQ", to: "#faq", type: "section" },
  { label: "Affiliate", to: "#affiliate", type: "section" },
  { label: "Mulai Menjual", to: routes.penjual, type: "route" },
];

export function Navbar({ theme = "dark" }: { theme?: "light" | "dark" }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  const isPenjual = user?.role === "seller";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
          const isMarketplace = link.label === "Marketplace";
          const linkStyle = {
            color: theme === "light" ? "rgba(17, 24, 39, 0.85)" : "rgba(255,255,255,0.88)",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.5px",
            fontFamily: "Poppins, sans-serif",
            transition: "color 0.2s",
            cursor: "pointer",
            whiteSpace: "nowrap" as const,
          };

          if (isPenjual && isMarketplace) {
            return (
              <Link
                key={link.label}
                to={routes.penjual}
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#0E7C8E";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme === "light" ? "rgba(17, 24, 39, 0.85)" : "rgba(255,255,255,0.88)";
                }}
              >
                Dashboard Penjual
              </Link>
            );
          }

          if (link.type === "route") {
            return (
              <Link
                key={link.label}
                to={link.to}
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#3CC8D8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.88)";
                }}
              >
                {link.label}
              </Link>
            );
          }


          return (
            <a
              key={link.label}
              href={link.to}
              style={linkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#3CC8D8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.88)";
              }}
            >
              {link.label}
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

        {isLoggedIn && user ? (
          /* ── Logged In: Profile Dropdown ── */
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 rounded-full py-1.5 px-3 transition-all"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg, #3CC8D8, #0891b2)" }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:block text-white text-xs font-medium max-w-[100px] truncate">
                {user.name}
              </span>
              <ChevronDown size={14} className={`text-white/60 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
            </button>

            {profileOpen && (
              <div
                className="absolute right-0 top-[calc(100%+8px)] w-56 bg-[#0c3040]/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.4)] overflow-hidden z-50"
              >
                {/* User info header */}
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-sm text-white font-semibold truncate">{user.name}</p>
                  <p className="text-[10px] text-white/40 truncate">{user.email}</p>
                  <span className="inline-block mt-1 text-[9px] bg-[#3CC8D8]/20 text-[#3CC8D8] px-2 py-0.5 rounded-full font-medium">
                    {user.role === "seller" ? "Nelayan / Pengepul" : "Pembeli"}
                  </span>
                </div>

                {/* Menu items */}
                <div className="py-1">
                  <button
                    onClick={() => { setProfileOpen(false); navigate(routes.dashboard); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <User size={14} />
                    Profil Saya
                  </button>
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      logout();
                      navigate(routes.home);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-400/80 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
                  >
                    <LogOut size={14} />
                    Keluar
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ── Not Logged In: Login / Register buttons ── */
          <>
            <Link
              to={routes.login}
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
                textDecoration: "none",
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
              Masuk
            </Link>

            <Link
              to={routes.register}
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
                textDecoration: "none",
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
              Daftar
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
