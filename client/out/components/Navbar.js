"use strict";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, LogOut, User, ChevronDown } from "lucide-react";
import { routes } from "../routes";
import { useAuth } from "../context/AuthContext";
const navLinks = [
  { label: "Home", to: routes.home, type: "route" },
  { label: "Marketplace", to: routes.marketplace, type: "route" },
  { label: "News", to: "#news", type: "section" },
  { label: "FAQ", to: "#faq", type: "section" },
  { label: "Affiliate", to: "#affiliate", type: "section" },
  { label: "Contact Us", to: routes.contact, type: "route" }
];
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      className: "px-4 sm:px-6 md:px-8 lg:px-12 py-[18px] flex items-center justify-between transition-all duration-400 ease-in-out w-full",
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1e3,
        background: scrolled ? "rgba(4, 70, 84, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.15)" : "none"
      },
      children: [
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }, children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #3CC8D8, #0891b2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                boxShadow: "0 4px 15px rgba(60,200,216,0.4)"
              },
              children: "\u{1F41A}"
            }
          ),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "text-white font-extrabold text-lg tracking-[3px] font-sans",
              children: "PasaiEungkot"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "hidden md:flex items-center gap-6 lg:gap-9",
            children: navLinks.map((link) => {
              const linkStyle = {
                color: "rgba(255,255,255,0.88)",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.5px",
                fontFamily: "Poppins, sans-serif",
                transition: "color 0.2s",
                cursor: "pointer",
                whiteSpace: "nowrap"
              };
              if (link.type === "route") {
                return /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: link.to,
                    style: linkStyle,
                    onMouseEnter: (e) => {
                      e.currentTarget.style.color = "#3CC8D8";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.88)";
                    },
                    children: link.label
                  },
                  link.label
                );
              }
              return /* @__PURE__ */ jsx(
                "a",
                {
                  href: link.to,
                  style: linkStyle,
                  onMouseEnter: (e) => {
                    e.currentTarget.style.color = "#3CC8D8";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.88)";
                  },
                  children: link.label
                },
                link.label
              );
            })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3 lg:gap-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              style: {
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
                flexShrink: 0
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.25)";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
              },
              children: /* @__PURE__ */ jsx(Search, { size: 15 })
            }
          ),
          isLoggedIn && user ? (
            /* ── Logged In: Profile Dropdown ── */
            /* @__PURE__ */ jsxs("div", { ref: profileRef, className: "relative", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setProfileOpen(!profileOpen),
                  className: "flex items-center gap-2 cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 rounded-full py-1.5 px-3 transition-all",
                  children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white",
                        style: { background: "linear-gradient(135deg, #3CC8D8, #0891b2)" },
                        children: user.name.charAt(0).toUpperCase()
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "hidden sm:block text-white text-xs font-medium max-w-[100px] truncate", children: user.name }),
                    /* @__PURE__ */ jsx(ChevronDown, { size: 14, className: `text-white/60 transition-transform ${profileOpen ? "rotate-180" : ""}` })
                  ]
                }
              ),
              profileOpen && /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "absolute right-0 top-[calc(100%+8px)] w-56 bg-[#0c3040]/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.4)] overflow-hidden z-50",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 border-b border-white/10", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-white font-semibold truncate", children: user.name }),
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] text-white/40 truncate", children: user.email }),
                      /* @__PURE__ */ jsx("span", { className: "inline-block mt-1 text-[9px] bg-[#3CC8D8]/20 text-[#3CC8D8] px-2 py-0.5 rounded-full font-medium", children: user.role === "seller" ? "Nelayan / Pengepul" : "Pembeli" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "py-1", children: [
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          onClick: () => {
                            setProfileOpen(false);
                            navigate(routes.dashboard);
                          },
                          className: "w-full flex items-center gap-3 px-4 py-2.5 text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer",
                          children: [
                            /* @__PURE__ */ jsx(User, { size: 14 }),
                            "Profil Saya"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          onClick: () => {
                            setProfileOpen(false);
                            logout();
                            navigate(routes.home);
                          },
                          className: "w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-400/80 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer",
                          children: [
                            /* @__PURE__ */ jsx(LogOut, { size: 14 }),
                            "Keluar"
                          ]
                        }
                      )
                    ] })
                  ]
                }
              )
            ] })
          ) : (
            /* ── Not Logged In: Login / Register buttons ── */
            /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                Link,
                {
                  to: routes.login,
                  className: "hidden sm:block",
                  style: {
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
                    textDecoration: "none"
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
                  },
                  children: "Masuk"
                }
              ),
              /* @__PURE__ */ jsx(
                Link,
                {
                  to: routes.register,
                  style: {
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
                    textDecoration: "none"
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(255,255,255,0.3)";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(255,255,255,0.2)";
                  },
                  children: "Daftar"
                }
              )
            ] })
          )
        ] })
      ]
    }
  );
}
