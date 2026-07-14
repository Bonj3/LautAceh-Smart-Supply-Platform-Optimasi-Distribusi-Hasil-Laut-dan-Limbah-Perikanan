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
    <button
      id="ai-marketplace-fab"
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

      {/* Tooltip on hover */}
      {isHovered && (
        <span
          style={{
            position: "absolute",
            right: "calc(100% + 12px)",
            top: "50%",
            transform: "translateY(-50%)",
            whiteSpace: "nowrap",
            padding: "6px 14px",
            borderRadius: "8px",
            background: "rgba(8, 45, 58, 0.92)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(0, 180, 180, 0.2)",
            color: "#e2eff3",
            fontSize: "12.5px",
            fontWeight: 500,
            fontFamily: "var(--ai-font)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
            pointerEvents: "none",
            animation: "ai-fade-in 0.2s ease",
          }}
        >
          AI Smart Marketplace ✨
        </span>
      )}
    </button>
  );
}
