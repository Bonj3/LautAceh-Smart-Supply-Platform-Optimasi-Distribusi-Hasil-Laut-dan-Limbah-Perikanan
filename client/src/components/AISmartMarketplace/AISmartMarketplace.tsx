/* ──────────────────────────────────────────────
   AISmartMarketplace — Root orchestrator
   ────────────────────────────────────────────── */

import { useState, useCallback } from "react";
import "./AISmartMarketplace.css";
import type { ChatMessage } from "./types";
import { generateMockResponse } from "./mockData";
import FloatingButton from "./FloatingButton";
import ChatPanel from "./ChatPanel";

/** Generate a unique message ID */
function createId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function AISmartMarketplace() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  /* ── Open / Close handlers ── */

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setIsClosing(false);
  }, []);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    // Wait for the closing animation to finish
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  }, []);

  /* ── Send message handler ── */

  const handleSendMessage = useCallback(
    async (text: string) => {
      // If we're still on the welcome screen, switch to chat mode
      if (showWelcome) {
        setShowWelcome(false);
      }

      // Add user message
      const userMsg: ChatMessage = {
        id: createId(),
        role: "user",
        content: text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);

      // Show typing indicator
      setIsTyping(true);

      // Simulate AI thinking time (800ms–1800ms)
      const delay = 800 + Math.random() * 1000;

      await new Promise((resolve) => setTimeout(resolve, delay));

      // Generate mock response
      // ──────────────────────────────────────────
      // TODO: Replace with real API call:
      //
      //   const response = await fetch('/api/chat', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({
      //       message: text,
      //       history: messages.map(m => ({ role: m.role, content: m.content })),
      //     }),
      //   });
      //   const data = await response.json();
      //
      // ──────────────────────────────────────────
      const mockResponse = generateMockResponse(text);

      const assistantMsg: ChatMessage = {
        id: createId(),
        role: "assistant",
        content: mockResponse.text,
        timestamp: new Date(),
        recommendations: mockResponse.recommendations,
        followUpSuggestions: mockResponse.followUpSuggestions,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    },
    [showWelcome, messages]
  );

  /* ── Suggestion card click ── */

  const handleSuggestionSelect = useCallback(
    (prompt: string) => {
      handleSendMessage(prompt);
    },
    [handleSendMessage]
  );

  return (
    <>
      {/* Floating button */}
      <FloatingButton isOpen={isOpen} onClick={handleOpen} />

      {/* Chat panel */}
      <ChatPanel
        isOpen={isOpen}
        isClosing={isClosing}
        messages={messages}
        isTyping={isTyping}
        showWelcome={showWelcome}
        onClose={handleClose}
        onSendMessage={handleSendMessage}
        onSuggestionSelect={handleSuggestionSelect}
      />
    </>
  );
}
