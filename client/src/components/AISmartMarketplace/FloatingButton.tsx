/* ──────────────────────────────────────────────
   FloatingButton — Bottom-right AI FAB
   ────────────────────────────────────────────── */

import { useState } from "react";

interface FloatingButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function FloatingButton({ isOpen, onClick }: FloatingButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9998,
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
      className={`ai-fab-container${isOpen ? " ai-fab-container--open" : ""}`}
    >
      {/* Always visible call-to-action text */}
      {!isOpen && (
        <span
          style={{
            background: "linear-gradient(135deg, #0d9488, #14b8a6)",
            color: "#ffffff",
            padding: "8px 16px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: 600,
            fontFamily: "var(--ai-font)",
            boxShadow: "0 4px 16px rgba(20, 184, 166, 0.4)",
            cursor: "pointer",
            animation: "ai-bounce 2s infinite ease-in-out",
          }}
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Tanya AI Asisten ✨
        </span>
      )}

    <button
      id="ai-marketplace-fab"
      style={{ position: "relative", bottom: 0, right: 0 }} // Override CSS positioning so it flows with the container
      className={`ai-fab${isOpen ? " ai-fab--open" : ""}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Buka AI Smart Marketplace"
      title="AI Smart Marketplace"
    >
      {/* Pulse ring */}
      <span className="ai-fab__pulse" />

      {/* AI Sparkle icon */}
      <svg
        className="ai-fab__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Brain / AI shape */}
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" opacity={0.3} fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="10" />
        {/* Sparkle paths */}
        <path d="M12 6v2" />
        <path d="M12 16v2" />
        <path d="M6 12h2" />
        <path d="M16 12h2" />
        <path d="M8.5 8.5l1.2 1.2" />
        <path d="M14.3 14.3l1.2 1.2" />
        <path d="M8.5 15.5l1.2-1.2" />
        <path d="M14.3 9.7l1.2-1.2" />
        {/* Center dot */}
        <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      </svg>

      {/* Tooltip on hover is replaced by the always-visible text above */}
    </button>
    </div>
  );
}
