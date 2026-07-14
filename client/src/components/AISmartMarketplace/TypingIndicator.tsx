/* ──────────────────────────────────────────────
   TypingIndicator — Animated thinking dots
   ────────────────────────────────────────────── */

export default function TypingIndicator() {
  return (
    <div className="ai-typing">
      {/* AI Avatar */}
      <div className="ai-bubble__avatar" aria-hidden="true">
        🤖
      </div>

      {/* Bouncing dots */}
      <div className="ai-typing__dots">
        <span className="ai-typing__dot" />
        <span className="ai-typing__dot" />
        <span className="ai-typing__dot" />
      </div>
    </div>
  );
}
