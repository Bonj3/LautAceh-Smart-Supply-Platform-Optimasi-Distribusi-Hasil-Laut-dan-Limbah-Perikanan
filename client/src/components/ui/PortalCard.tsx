import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { TooltipMarketplace } from "@/components/ui/TooltipMarketplace";
import { motion } from "motion/react";

/* ──────────────────────────────────────────────
   Props
   ────────────────────────────────────────────── */

interface PortalCardProps {
  /** Title shown at the bottom of the card */
  title: string;
  /** Background image URL */
  imageSrc: string;
  /** Alternate rotation direction on hover */
  rotateDirection?: "cw" | "ccw";
  /** Optional click/navigation handler */
  onClick?: () => void;
  /** Tooltip type to show instead of description */
  tooltipType?: "fresh" | "industri";
  /** Animation delay in seconds */
  animationDelay?: number;
}

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */

export function PortalCard({
  title,
  imageSrc,
  rotateDirection = "cw",
  onClick,
  tooltipType,
  animationDelay = 0,
}: PortalCardProps) {
  const rotateClass =
    rotateDirection === "cw"
      ? "hover:rotate-1"
      : "hover:-rotate-1";

  return (
    <div
      style={{
        opacity: 0,
        animation: `flyInFlip 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
        animationDelay: `${animationDelay}s`
      }}
    >
      <div
        className={`
          portal-card
          relative w-full h-full overflow-hidden rounded-3xl cursor-pointer
          transition-all duration-500 ease-out flex flex-col
          ${rotateClass}
          hover:shadow-[0_25px_60px_-12px_rgba(0,200,200,0.4)]
        `}
        onClick={onClick}
      >
        <ImageWithFallback
          src={imageSrc}
          alt={title}
          className="
          absolute inset-0 w-full h-full object-cover
          transition-transform duration-700 ease-out
          hover:scale-105
        "
        />

        {/* ── Ocean Gradient Overlay ── */}
        <div
          className="
          portal-card__overlay
          absolute inset-0
          translate-y-1/3
          hover:translate-y-0
          transition-transform duration-500 ease-out
        "
        />

        {/* ── Text Content ── */}
        <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 z-10 flex items-center gap-2">
          <h2 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg leading-tight hover:text-[#5de8d4] transition-colors duration-300">
            {title}
          </h2>
          {tooltipType && (
            <div onClick={(e) => e.stopPropagation()}>
              <TooltipMarketplace type={tooltipType} />
            </div>
          )}
        </div>

        {/* ── Scoped styles ── */}
        <style>{`
        @keyframes flyInFlip {
          0% {
            opacity: 0;
            transform: perspective(1000px) translateZ(-600px) rotateY(60deg) scale(0.5);
          }
          100% {
            opacity: 1;
            transform: perspective(1000px) translateZ(0) rotateY(0deg) scale(1);
          }
        }
        
        .portal-card {
          aspect-ratio: 2 / 3; /* Portrait card layout */
        }
        
        /* Netflix Spotlight Effect with :has() */
        /* Only apply dimming if ANY portal-card is hovered */
        .group\\/netflix:has(.portal-card:hover) .portal-card:not(:hover) {
          transform: scale(0.95);
          filter: brightness(0.5) grayscale(30%);
        }
        
        /* The hovered card gets a slight scale and stays bright */
        .group\\/netflix:has(.portal-card:hover) .portal-card:hover {
          transform: scale(1.05); /* Reduced scale from 1.10 */
          filter: brightness(1.1) grayscale(0%);
          z-index: 20;
        }

        .portal-card__overlay {
          background: linear-gradient(
            to top,
            #0a2e3c 0%,
            rgba(10, 46, 60, 0.5) 50%,
            transparent 100%
          );
        }
      `}</style>
      </div>
    </div>
  );
}
