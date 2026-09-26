import React from "react";

/**
 * Ornate circular crest matching the Witchr Sanctum reference artwork
 * Featuring the botanical thistle, thorny vines, and skull motif
 */
export function SanctumCrest({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Witchr Sanctum Crest"
    >
      {/* Outer Glow Halo */}
      <circle cx="50" cy="50" r="46" stroke="#c084fc" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
      <circle cx="50" cy="50" r="43" stroke="#a855f7" strokeWidth="1.2" opacity="0.9" />
      <circle cx="50" cy="50" r="40" stroke="#581c87" strokeWidth="0.8" />

      {/* Radial Rays */}
      {[...Array(16)].map((_, i) => {
        const angle = (i * 360) / 16;
        return (
          <line
            key={i}
            x1="50"
            y1="6"
            x2="50"
            y2="10"
            stroke="#e9d5ff"
            strokeWidth="0.8"
            transform={`rotate(${angle} 50 50)`}
            opacity="0.75"
          />
        );
      })}

      {/* Thistle & Floral Crown Top */}
      <path
        d="M50 14 C46 22 40 26 38 32 C44 32 47 28 50 24 C53 28 56 32 62 32 C60 26 54 22 50 14 Z"
        fill="#9333ea"
        stroke="#e9d5ff"
        strokeWidth="0.8"
      />
      <circle cx="50" cy="20" r="1.5" fill="#f3e8ff" />
      <path d="M42 22 C37 18 33 20 31 24 C36 25 39 24 42 22 Z" fill="#7e22ce" stroke="#c084fc" strokeWidth="0.6" />
      <path d="M58 22 C63 18 67 20 69 24 C64 25 61 24 58 22 Z" fill="#7e22ce" stroke="#c084fc" strokeWidth="0.6" />

      {/* Skull Silhouette */}
      <path
        d="M37 42 C37 32 63 32 63 42 C63 50 61 54 57 56 L57 63 C57 65 54 66 50 66 C46 66 43 65 43 63 L43 56 C39 54 37 50 37 42 Z"
        fill="#120724"
        stroke="#d8b4fe"
        strokeWidth="1.2"
      />

      {/* Eye Sockets */}
      <ellipse cx="45" cy="45" rx="3.5" ry="4.5" fill="#040108" stroke="#a855f7" strokeWidth="0.8" />
      <ellipse cx="55" cy="45" rx="3.5" ry="4.5" fill="#040108" stroke="#a855f7" strokeWidth="0.8" />

      {/* Nasal Cavity */}
      <path d="M50 51 L48 54 L52 54 Z" fill="#a855f7" />

      {/* Teeth / Jaw markings */}
      <path d="M45 61 L45 65 M48 61 L48 65 M52 61 L52 65 M55 61 L55 65" stroke="#d8b4fe" strokeWidth="0.8" />

      {/* Thorny Botanical Vines at base */}
      <path
        d="M26 62 C32 68 40 74 50 75 C60 74 68 68 74 62 C70 76 58 84 50 85 C42 84 30 76 26 62 Z"
        fill="#2e1065"
        stroke="#c084fc"
        strokeWidth="1"
      />
      <path d="M33 70 Q37 66 42 71" stroke="#e9d5ff" strokeWidth="0.8" fill="none" />
      <path d="M67 70 Q63 66 58 71" stroke="#e9d5ff" strokeWidth="0.8" fill="none" />

      {/* Bottom Flourish Star */}
      <path d="M50 88 L51 92 L55 93 L51 94 L50 98 L49 94 L45 93 L49 92 Z" fill="#f3e8ff" />
    </svg>
  );
}

/**
 * The 7-step Moon Phase strip in electric purple luminescence
 */
export function MoonPhaseStrip({ className = "h-4" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 sm:gap-2.5 text-lavender-moon ${className}`} aria-label="Moon Phases">
      {/* Waxing Crescent */}
      <svg viewBox="0 0 20 20" width="14" height="14" fill="none" className="opacity-75 hover:opacity-100 transition-opacity">
        <circle cx="10" cy="10" r="8" stroke="#a855f7" strokeWidth="1" fill="#0a0414" />
        <path d="M10 2 A8 8 0 0 1 10 18 A5 8 0 0 0 10 2 Z" fill="#e9d5ff" />
      </svg>
      {/* First Quarter */}
      <svg viewBox="0 0 20 20" width="14" height="14" fill="none" className="opacity-80 hover:opacity-100 transition-opacity">
        <circle cx="10" cy="10" r="8" stroke="#a855f7" strokeWidth="1" fill="#0a0414" />
        <path d="M10 2 A8 8 0 0 1 10 18 L10 2 Z" fill="#e9d5ff" />
      </svg>
      {/* Waxing Gibbous */}
      <svg viewBox="0 0 20 20" width="14" height="14" fill="none" className="opacity-90 hover:opacity-100 transition-opacity">
        <circle cx="10" cy="10" r="8" stroke="#a855f7" strokeWidth="1" fill="#0a0414" />
        <path d="M10 2 A8 8 0 0 1 10 18 A5 8 0 0 1 10 2 Z" fill="#e9d5ff" />
      </svg>
      {/* Full Moon */}
      <svg viewBox="0 0 20 20" width="16" height="16" fill="none" className="filter drop-shadow-[0_0_8px_rgba(233,213,255,0.7)]">
        <circle cx="10" cy="10" r="8" fill="#f3e8ff" stroke="#c084fc" strokeWidth="1.2" />
        <circle cx="10" cy="10" r="6" fill="#e9d5ff" opacity="0.9" />
        <circle cx="7" cy="8" r="1.5" fill="#d8b4fe" opacity="0.6" />
        <circle cx="13" cy="12" r="2" fill="#d8b4fe" opacity="0.6" />
      </svg>
      {/* Waning Gibbous */}
      <svg viewBox="0 0 20 20" width="14" height="14" fill="none" className="opacity-90 hover:opacity-100 transition-opacity">
        <circle cx="10" cy="10" r="8" stroke="#a855f7" strokeWidth="1" fill="#0a0414" />
        <path d="M10 2 A8 8 0 0 0 10 18 A5 8 0 0 0 10 2 Z" fill="#e9d5ff" />
      </svg>
      {/* Last Quarter */}
      <svg viewBox="0 0 20 20" width="14" height="14" fill="none" className="opacity-80 hover:opacity-100 transition-opacity">
        <circle cx="10" cy="10" r="8" stroke="#a855f7" strokeWidth="1" fill="#0a0414" />
        <path d="M10 2 A8 8 0 0 0 10 18 L10 2 Z" fill="#e9d5ff" />
      </svg>
      {/* Waning Crescent */}
      <svg viewBox="0 0 20 20" width="14" height="14" fill="none" className="opacity-75 hover:opacity-100 transition-opacity">
        <circle cx="10" cy="10" r="8" stroke="#a855f7" strokeWidth="1" fill="#0a0414" />
        <path d="M10 2 A8 8 0 0 0 10 18 A5 8 0 0 1 10 2 Z" fill="#e9d5ff" />
      </svg>
    </div>
  );
}

/**
 * Gothic mountain & crescent engraving for the sidebar footer
 * with the motto: "A QUIETER INTERNET FOR A LOUDER MAGIC."
 */
export function SanctumMountainEngraving({ className = "w-full" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center text-center p-3 ${className}`}>
      {/* Mystical Landscape Engraving */}
      <div className="relative w-16 h-16 sm:w-18 sm:h-18 mb-2 rounded-xl bg-[#0e071c] border border-purple-900/60 p-1.5 shadow-[0_0_15px_rgba(88,28,135,0.4)] flex items-center justify-center overflow-hidden group">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-purple-300">
          {/* Night Sky Hatching */}
          <rect width="100" height="100" fill="#090312" />
          <circle cx="50" cy="30" r="20" stroke="#7e22ce" strokeWidth="0.8" strokeDasharray="2 2" />

          {/* Luminous Crescent Moon */}
          <path
            d="M58 14 A 18 18 0 1 0 74 38 A 15 15 0 1 1 58 14 Z"
            fill="#d8b4fe"
            stroke="#f3e8ff"
            strokeWidth="0.8"
            className="filter drop-shadow-[0_0_6px_rgba(216,180,254,0.7)]"
          />

          {/* Star points */}
          <circle cx="28" cy="22" r="1" fill="#f3e8ff" />
          <circle cx="38" cy="15" r="0.8" fill="#e9d5ff" />
          <circle cx="78" cy="25" r="1.2" fill="#f3e8ff" />
          <circle cx="85" cy="42" r="0.8" fill="#d8b4fe" />

          {/* Jagged Mountain Peaks */}
          <path
            d="M0 85 L25 48 L42 66 L65 38 L88 72 L100 58 L100 100 L0 100 Z"
            fill="#1b0c33"
            stroke="#a855f7"
            strokeWidth="1.2"
          />
          {/* Secondary front ridge */}
          <path
            d="M0 92 L20 74 L38 88 L58 68 L82 92 L100 80 L100 100 L0 100 Z"
            fill="#0f051e"
            stroke="#c084fc"
            strokeWidth="0.8"
          />
          {/* Subtle hatch lines on peaks */}
          <path d="M25 48 L32 80 M65 38 L72 70 M58 68 L62 90" stroke="#581c87" strokeWidth="0.7" />
        </svg>
      </div>

      {/* Editorial Gothic Motto */}
      <p className="text-[9px] font-mono tracking-widest text-lavender-moon/80 uppercase leading-relaxed max-w-[100px]">
        A quieter internet for a louder magic.
      </p>
    </div>
  );
}
