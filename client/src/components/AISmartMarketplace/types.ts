/* ──────────────────────────────────────────────
   AI Smart Marketplace — Type Definitions
   ────────────────────────────────────────────── */

export type BuyerPersona = "home" | "restaurant" | "industrial";

export interface ProductRecommendation {
  id: number;
  image: string;
  name: string;
  price: string;
  seller: string;
  location: string;
  freshness: "Sangat Segar" | "Segar" | "Beku" | "Olahan";
  stock: number;
  rating: number;
  unit: string;
  reason: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  recommendations?: ProductRecommendation[];
  followUpSuggestions?: SuggestionItem[];
}

export interface SuggestionItem {
  emoji: string;
  label: string;
  prompt: string;
}

/** Request body shape — matches the existing Express /api/chat endpoint */
export interface AIServiceRequest {
  message: string;
  history: { role: string; content: string }[];
}

/** Response body shape — to be extended once backend supports structured output */
export interface AIServiceResponse {
  reply: string;
  recommendations?: ProductRecommendation[];
  followUpSuggestions?: SuggestionItem[];
}
