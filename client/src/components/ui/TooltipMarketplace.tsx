import * as React from "react";
import { useState, useEffect, useRef } from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

function IconQuestionCircle({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export function TooltipMarketplace({ type = "industri" }: { type?: "fresh" | "industri" }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Toggle open state on trigger click/tap
  const handleTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  // Close when clicking outside of the tooltip trigger or content
  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;
      if (
        contentRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [open]);

  return (
    <HoverCardPrimitive.Root open={open} onOpenChange={setOpen} openDelay={150} closeDelay={500}>
      <HoverCardPrimitive.Trigger asChild>
        <span
          ref={triggerRef}
          onClick={handleTriggerClick}
          style={{ display: "inline-flex", cursor: "pointer", marginLeft: "8px", verticalAlign: "middle" }}
        >
          <IconQuestionCircle style={{ width: "20px", height: "20px", color: open ? "#ffffff" : "#5de8d4", transition: "color 0.2s" }} />
        </span>
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          ref={contentRef}
          side="top"
          align="start"
          sideOffset={12}
          avoidCollisions={true}
          collisionPadding={16}
          className="tooltip-card-container"
          style={{ zIndex: 9999 }}
        >
          {/* Image Section */}
          <div className="tooltip-card-img-wrap">
            <ImageWithFallback
              src={
                type === "fresh"
                  ? "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80"
                  : "https://images.unsplash.com/photo-1579631542720-3a87824fff86?w=600&q=80"
              }
              alt={type === "fresh" ? "Ikan Fresh" : "Bahan Baku Industri"}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Content Section */}
          <div className="tooltip-card-body">
            <h3 className="tooltip-card-title">
              {type === "fresh" ? "Apa itu Ikan Fresh?" : "Apa itu Bahan Baku Industri?"}
            </h3>
            <p className="tooltip-card-desc">
              {type === "fresh"
                ? "Ikan segar berkualitas tinggi langsung dari tangkapan nelayan Aceh. Cocok untuk hidangan keluarga maupun bisnis kuliner yang mengutamakan kesegaran dan cita rasa laut terbaik."
                : "Bahan baku industri adalah limbah atau hasil samping ikan yang masih memiliki nilai guna. Produk-produk ini dapat diolah kembali oleh pelaku usaha menjadi berbagai produk, seperti pupuk organik, pakan ternak, tepung ikan, dan kebutuhan industri lainnya."}
            </p>

            {/* Footer Row */}
            <div className="tooltip-card-footer">
              <span className="tooltip-card-badge">
                {type === "fresh" ? "KATEGORI MARKETPLACE #1" : "KATEGORI MARKETPLACE #2"}
              </span>
              <a
                href="#"
                className="tooltip-card-link"
                onMouseEnter={(e) => e.currentTarget.style.color = "#0369a1"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#0284c7"}
                onClick={(e) => e.preventDefault()}
              >
                Pelajari selengkapnya &gt;
              </a>
            </div>
          </div>

          <HoverCardPrimitive.Arrow
            style={{
              fill: "#ffffff",
              width: "12px",
              height: "6px"
            }}
          />

          {/* Scoped CSS styling for mobile responsiveness & animations */}
          <style>{`
            .tooltip-card-container {
              z-index: 1000;
              width: 420px;
              max-width: calc(100vw - 32px);
              background-color: #ffffff;
              border-radius: 16px;
              border: 1px solid #e2e8f0;
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.06);
              overflow: hidden;
              font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
            }
            
            /* Animations using Radix state attributes */
            .tooltip-card-container[data-state="open"] {
              animation: mp-fade-in 0.2s ease-out forwards;
            }
            .tooltip-card-container[data-state="closed"] {
              animation: mp-fade-out 0.5s ease-in-out forwards;
              pointer-events: none;
            }

            .tooltip-card-img-wrap {
              width: 100%;
              height: 220px;
              overflow: hidden;
              position: relative;
            }
            .tooltip-card-body {
              padding: 24px;
              text-align: left;
            }
            .tooltip-card-title {
              font-size: 20px;
              font-weight: 700;
              color: #0f172a;
              margin: 0 0 12px 0;
              line-height: 1.3;
            }
            .tooltip-card-desc {
              font-size: 13.5px;
              line-height: 1.6;
              color: #475569;
              margin: 0 0 24px 0;
            }
            .tooltip-card-footer {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 12px;
            }
            .tooltip-card-badge {
              display: inline-block;
              padding: 6px 14px;
              border-radius: 9999px;
              font-size: 10px;
              font-weight: 700;
              color: #0284c7;
              background-color: #eff6ff;
              letter-spacing: 0.5px;
              text-transform: uppercase;
              white-space: nowrap;
            }
            .tooltip-card-link {
              font-size: 13px;
              font-weight: 600;
              color: #0284c7;
              text-decoration: none;
              display: inline-flex;
              align-items: center;
              gap: 4px;
              white-space: nowrap;
            }

            @keyframes mp-fade-in {
              from { opacity: 0; transform: translateY(8px); }
              to { opacity: 1; transform: translateY(0); }
            }

            @keyframes mp-fade-out {
              from { opacity: 1; transform: translateY(0); }
              to { opacity: 0; transform: translateY(8px); }
            }

            /* Responsive styling for Mobile / Android screens */
            @media (max-width: 480px) {
              .tooltip-card-container {
                width: calc(100vw - 24px);
                border-radius: 12px;
              }
              .tooltip-card-img-wrap {
                height: 140px;
              }
              .tooltip-card-body {
                padding: 16px;
              }
              .tooltip-card-title {
                font-size: 16px;
                margin-bottom: 8px;
              }
              .tooltip-card-desc {
                font-size: 12px;
                margin-bottom: 16px;
                line-height: 1.5;
              }
              .tooltip-card-badge {
                padding: 4px 10px;
                font-size: 9px;
              }
              .tooltip-card-link {
                font-size: 11px;
              }
            }
          `}</style>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
}
