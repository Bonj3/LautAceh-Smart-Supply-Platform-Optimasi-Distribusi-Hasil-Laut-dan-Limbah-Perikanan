/* ──────────────────────────────────────────────
   SuggestionCards — Reusable suggestion grid
   ────────────────────────────────────────────── */

import type { SuggestionItem } from "./types";

interface SuggestionCardsProps {
  suggestions: SuggestionItem[];
  onSelect: (prompt: string) => void;
  variant?: "grid" | "chips";
}

export default function SuggestionCards({
  suggestions,
  onSelect,
  variant = "grid",
}: SuggestionCardsProps) {
  if (variant === "chips") {
    return (
      <div className="ai-follow-ups">
        {suggestions.map((item, idx) => (
          <button
            key={idx}
            className="ai-follow-up-chip"
            onClick={() => onSelect(item.prompt)}
          >
            <span>{item.emoji}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="ai-suggestions">
      {suggestions.map((item, idx) => (
        <button
          key={idx}
          className="ai-suggestion-card"
          onClick={() => onSelect(item.prompt)}
        >
          <span className="ai-suggestion-card__emoji">{item.emoji}</span>
          <span className="ai-suggestion-card__label">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
