/* ──────────────────────────────────────────────
   RecommendationCard — Product recommendation
   ────────────────────────────────────────────── */

import type { ProductRecommendation } from "./types";

interface RecommendationCardProps {
  product: ProductRecommendation;
}

function FreshnessClass(freshness: ProductRecommendation["freshness"]) {
  switch (freshness) {
    case "Sangat Segar":
      return "ai-rec-card__freshness--sangat-segar";
    case "Segar":
      return "ai-rec-card__freshness--segar";
    case "Beku":
      return "ai-rec-card__freshness--beku";
    case "Olahan":
      return "ai-rec-card__freshness--olahan";
  }
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  let stars = "";
  for (let i = 0; i < full; i++) stars += "★";
  if (hasHalf) stars += "☆";
  return (
    <span className="ai-rec-card__rating">
      {stars} {rating.toFixed(1)}
    </span>
  );
}

export default function RecommendationCard({ product }: RecommendationCardProps) {
  return (
    <div className="ai-rec-card">
      {/* Product image */}
      <img
        className="ai-rec-card__image"
        src={product.image}
        alt={product.name}
        loading="lazy"
      />

      <div className="ai-rec-card__body">
        {/* Name & Price */}
        <h4 className="ai-rec-card__name">{product.name}</h4>
        <p className="ai-rec-card__price">
          {product.price}{" "}
          <span className="ai-rec-card__price-unit">/ {product.unit}</span>
        </p>

        {/* Meta info */}
        <div className="ai-rec-card__meta">
          {/* Seller */}
          <div className="ai-rec-card__meta-row">
            <svg className="ai-rec-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>{product.seller}</span>
          </div>

          {/* Location */}
          <div className="ai-rec-card__meta-row">
            <svg className="ai-rec-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{product.location}</span>
          </div>

          {/* Freshness & Rating row */}
          <div className="ai-rec-card__meta-row" style={{ gap: "10px" }}>
            <span className={`ai-rec-card__freshness ${FreshnessClass(product.freshness)}`}>
              {product.freshness}
            </span>
            <StarRating rating={product.rating} />
            <span style={{ marginLeft: "auto", opacity: 0.7 }}>
              Stok: {product.stock}
            </span>
          </div>
        </div>

        {/* Why recommended */}
        <p className="ai-rec-card__reason">{product.reason}</p>

        {/* Action button */}
        <button
          className="ai-rec-card__action"
          onClick={() => {
            // Future: navigate to product detail page
            console.log(`View product: ${product.id}`);
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Lihat Detail
        </button>
      </div>
    </div>
  );
}
