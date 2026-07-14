/* ──────────────────────────────────────────────
   ChatBubble — Individual message bubble
   ────────────────────────────────────────────── */

import type { ChatMessage } from "./types";
import RecommendationCard from "./RecommendationCard";
import SuggestionCards from "./SuggestionCards";

interface ChatBubbleProps {
  message: ChatMessage;
  onFollowUpSelect?: (prompt: string) => void;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function ChatBubble({ message, onFollowUpSelect }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`ai-bubble-row ai-bubble-row--${message.role}`}>
      {/* AI Avatar (assistant only) */}
      {!isUser && (
        <div className="ai-bubble__avatar" aria-hidden="true">
          🤖
        </div>
      )}

      <div style={{ maxWidth: "85%" }}>
        {/* Message bubble */}
        <div className={`ai-bubble ai-bubble--${message.role}`}>
          <div className="ai-bubble__content">{message.content}</div>
        </div>

        {/* Recommendation cards (assistant only) */}
        {!isUser && message.recommendations && message.recommendations.length > 0 && (
          <div className="ai-rec-cards">
            {message.recommendations.map((product) => (
              <RecommendationCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Follow-up suggestions (assistant only) */}
        {!isUser && message.followUpSuggestions && message.followUpSuggestions.length > 0 && onFollowUpSelect && (
          <SuggestionCards
            suggestions={message.followUpSuggestions}
            onSelect={onFollowUpSelect}
            variant="chips"
          />
        )}

        {/* Timestamp */}
        <div className="ai-bubble__timestamp">{formatTime(message.timestamp)}</div>
      </div>
    </div>
  );
}
