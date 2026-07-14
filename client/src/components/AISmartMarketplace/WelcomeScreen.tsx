/* ──────────────────────────────────────────────
   WelcomeScreen — Initial greeting interface
   ────────────────────────────────────────────── */

import SuggestionCards from "./SuggestionCards";
import { defaultSuggestions } from "./mockData";

interface WelcomeScreenProps {
  onSuggestionSelect: (prompt: string) => void;
}

export default function WelcomeScreen({ onSuggestionSelect }: WelcomeScreenProps) {
  return (
    <div className="ai-welcome">
      {/* Animated AI Avatar */}
      <div className="ai-welcome__avatar" aria-hidden="true">
        🐟
      </div>

      <h2 className="ai-welcome__title">
        Selamat datang di
        <br />
        AI Smart Marketplace
      </h2>

      <p className="ai-welcome__subtitle">
        Saya akan membantu menemukan produk yang paling sesuai dengan kebutuhan
        Anda.
      </p>

      {/* Suggestion cards */}
      <SuggestionCards
        suggestions={defaultSuggestions}
        onSelect={onSuggestionSelect}
        variant="grid"
      />
    </div>
  );
}
