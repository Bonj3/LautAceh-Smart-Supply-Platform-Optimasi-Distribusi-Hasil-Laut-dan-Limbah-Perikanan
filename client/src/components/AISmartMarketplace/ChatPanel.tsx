/* ──────────────────────────────────────────────
   ChatPanel — Side panel container
   ────────────────────────────────────────────── */

import { useRef, useEffect } from "react";
import type { ChatMessage } from "./types";
import WelcomeScreen from "./WelcomeScreen";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import MessageInput from "./MessageInput";

interface ChatPanelProps {
  isOpen: boolean;
  isClosing: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
  showWelcome: boolean;
  onClose: () => void;
  onSendMessage: (message: string) => void;
  onSuggestionSelect: (prompt: string) => void;
}

export default function ChatPanel({
  isOpen,
  isClosing,
  messages,
  isTyping,
  showWelcome,
  onClose,
  onSendMessage,
  onSuggestionSelect,
}: ChatPanelProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (contentRef.current) {
      requestAnimationFrame(() => {
        contentRef.current!.scrollTop = contentRef.current!.scrollHeight;
      });
    }
  }, [messages, isTyping]);

  if (!isOpen && !isClosing) return null;

  return (
    <>
      {/* Mobile overlay */}
      <div
        className="ai-overlay"
        onClick={onClose}
        style={{ display: isClosing ? "block" : undefined }}
        role="presentation"
      />

      {/* Panel */}
      <div
        className={`ai-panel${isClosing ? " ai-panel--closing" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="AI Smart Marketplace"
        id="ai-marketplace-panel"
      >
        {/* ── Header ── */}
        <div className="ai-panel__header">
          <div className="ai-panel__header-left">
            <div className="ai-panel__avatar" aria-hidden="true">
              🐟
            </div>
            <div>
              <h3 className="ai-panel__title">AI Smart Marketplace</h3>
              <p className="ai-panel__subtitle">
                <span className="ai-panel__status-dot" />
                Online · SirkuLaut
              </p>
            </div>
          </div>
          <button
            className="ai-panel__close"
            onClick={onClose}
            aria-label="Tutup panel"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* ── Content Area ── */}
        <div className="ai-panel__content" ref={contentRef}>
          {showWelcome ? (
            <WelcomeScreen onSuggestionSelect={onSuggestionSelect} />
          ) : (
            <>
              {messages.map((msg) => (
                <ChatBubble
                  key={msg.id}
                  message={msg}
                  onFollowUpSelect={onSuggestionSelect}
                />
              ))}
              {isTyping && <TypingIndicator />}
            </>
          )}
        </div>

        {/* ── Input Area ── */}
        <MessageInput onSend={onSendMessage} disabled={isTyping} />
      </div>
    </>
  );
}
