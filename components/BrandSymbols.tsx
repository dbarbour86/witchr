import React from "react";

export function MatchstickIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Matchstick body */}
      <line x1="6" y1="18" x2="16" y2="8" />
      {/* Match head */}
      <circle cx="17.5" cy="6.5" r="2" fill="currentColor" stroke="none" />
      {/* Tiny spark lines */}
      <path d="M19 4L21 2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M20 7.5L22 8" stroke="currentColor" strokeWidth="1.2" />
      <path d="M16 3.5L16 1.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function CandleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Candle base */}
      <rect x="9" y="10" width="6" height="11" rx="0.5" />
      {/* Wick */}
      <line x1="12" y1="10" x2="12" y2="7.5" />
      {/* Flame */}
      <path
        d="M12 3C11 5 9.8 6 12 7.5C14.2 6 13 5 12 3Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function CelestialCircle({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={className}
      aria-hidden="true"
    >
      {/* Outer concentric subtle ring */}
      <circle cx="50" cy="50" r="46" strokeDasharray="3 4" opacity="0.4" />
      {/* Main clean circle */}
      <circle cx="50" cy="50" r="38" />
      {/* Cardinal tick marks */}
      <line x1="50" y1="6" x2="50" y2="18" />
      <line x1="50" y1="82" x2="50" y2="94" />
      <line x1="6" y1="50" x2="18" y2="50" />
      <line x1="82" y1="50" x2="94" y2="50" />
      {/* Center point */}
      <circle cx="50" cy="50" r="2.5" fill="currentColor" />
    </svg>
  );
}

export function SaltPerimeterMark({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <circle cx="30" cy="30" r="26" strokeDasharray="2 6" strokeLinecap="round" />
      <circle cx="30" cy="30" r="18" strokeDasharray="3 5" opacity="0.6" />
      <path d="M22 30H38M30 22V38" strokeWidth="1" opacity="0.8" />
    </svg>
  );
}
