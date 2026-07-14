import { useState, useEffect } from "react";

interface SellerTimerBadgeProps {
  /** ISO timestamp when the sale started */
  waktuMulaiJual: string;
  /** Duration in hours */
  durasiJam: number;
  /** Callback when time expires */
  onExpired?: () => void;
}

export function SellerTimerBadge({
  waktuMulaiJual,
  durasiJam,
  onExpired,
}: SellerTimerBadgeProps) {
  const [remaining, setRemaining] = useState<number>(0);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const endTime =
      new Date(waktuMulaiJual).getTime() + durasiJam * 60 * 60 * 1000;

    const tick = () => {
      const diff = endTime - Date.now();
      if (diff <= 0) {
        setRemaining(0);
        setExpired(true);
        onExpired?.();
        return;
      }
      setRemaining(diff);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [waktuMulaiJual, durasiJam, onExpired]);

  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  const pad = (n: number) => n.toString().padStart(2, "0");

  // Calculate progress (0 to 1)
  const totalMs = durasiJam * 60 * 60 * 1000;
  const progress = Math.max(0, remaining / totalMs);

  // Color based on remaining time
  const urgency =
    progress > 0.5
      ? "text-emerald-600 bg-emerald-50 border-emerald-200"
      : progress > 0.2
        ? "text-amber-600 bg-amber-50 border-amber-200"
        : "text-red-600 bg-red-50 border-red-200";

  if (expired) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200">
        <span className="w-2 h-2 rounded-full bg-gray-400" />
        Kedaluwarsa
      </span>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${urgency}`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            progress > 0.5
              ? "bg-emerald-500 animate-pulse"
              : progress > 0.2
                ? "bg-amber-500 animate-pulse"
                : "bg-red-500 animate-pulse"
          }`}
        />
        {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </span>
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${
            progress > 0.5
              ? "bg-emerald-500"
              : progress > 0.2
                ? "bg-amber-500"
                : "bg-red-500"
          }`}
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
