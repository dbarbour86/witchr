import React from "react";

export type SanctumCardVariant = "daily-tarot" | "three-card" | "working" | "grimoire";

interface SanctumCardBackgroundProps {
  variant: SanctumCardVariant;
  className?: string;
}

/**
 * Reusable, subtle occult illustration background for Sanctum workstation cards.
 *
 * Design Characteristics:
 * - Ghosted, watermark-style duotone artwork in Witchr electric purple and luminous lavender.
 * - Masked with a smooth horizontal gradient so text on the left stays 100% crisp and readable.
 * - Responsive vector SVG anchored towards the right side of the card.
 * - Atmospheric, low-contrast, non-distracting visual texture that deepens on card hover.
 */
export function SanctumCardBackground({ variant, className = "" }: SanctumCardBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute inset-0 overflow-hidden z-0 transition-opacity duration-500 opacity-20 sm:opacity-25 group-hover:opacity-40 ${className}`}
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 25%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,1) 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 25%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,1) 100%)",
      }}
    >
      <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[85%] md:w-[80%] h-full flex items-center justify-end">
        {variant === "daily-tarot" && <DailyTarotMotif />}
        {variant === "three-card" && <ThreeCardMotif />}
        {variant === "working" && <WorkingMotif />}
        {variant === "grimoire" && <GrimoireMotif />}
      </div>
    </div>
  );
}

/**
 * 1. DAILY TAROT MOTIF
 * Single tarot card silhouette, luminous crescent moon, celestial compass rays, and orbital rings.
 */
function DailyTarotMotif() {
  return (
    <svg
      viewBox="0 0 360 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-h-[300px] object-contain object-right"
    >
      <defs>
        {/* Subtle halftone stipple matrix */}
        <pattern id="tarot-halftone" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="0.75" fill="#a855f7" opacity="0.4" />
        </pattern>
        {/* Radial purple glow aura */}
        <radialGradient id="tarot-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#7e22ce" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Halftone texture background fill */}
      <rect x="80" y="20" width="260" height="240" fill="url(#tarot-halftone)" />

      {/* Radial Altar Aura */}
      <circle cx="255" cy="140" r="100" fill="url(#tarot-aura)" />

      {/* Outer Celestial Compass & Orbital Rings */}
      <circle cx="255" cy="140" r="115" stroke="#9333ea" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.5" />
      <circle cx="255" cy="140" r="95" stroke="#a855f7" strokeWidth="1" opacity="0.6" />
      <circle cx="255" cy="140" r="82" stroke="#581c87" strokeWidth="0.8" opacity="0.7" />

      {/* 8-Point Compass Rays */}
      <g stroke="#c084fc" strokeWidth="0.75" opacity="0.55">
        <line x1="255" y1="15" x2="255" y2="265" strokeDasharray="2 3" />
        <line x1="130" y1="140" x2="380" y2="140" strokeDasharray="2 3" />
        <line x1="165" y1="50" x2="345" y2="230" strokeDasharray="1 3" />
        <line x1="165" y1="230" x2="345" y2="50" strokeDasharray="1 3" />
      </g>

      {/* The Single Tarot Card */}
      <g id="tarot-card">
        {/* Card Drop Shadow / Depth Backing */}
        <rect x="207" y="62" width="96" height="156" rx="6" fill="#0c0418" stroke="#581c87" strokeWidth="1" />
        
        {/* Main Card Body */}
        <rect x="205" y="60" width="100" height="160" rx="6" fill="#130728" stroke="#a855f7" strokeWidth="1.5" />
        
        {/* Inner Ornate Card Frame */}
        <rect x="211" y="66" width="88" height="148" rx="4" stroke="#c084fc" strokeWidth="0.8" strokeDasharray="4 2" opacity="0.85" />
        <rect x="215" y="70" width="80" height="140" rx="3" stroke="#e9d5ff" strokeWidth="0.5" opacity="0.6" />

        {/* Card Corner Flourishes */}
        <path d="M217 76 L223 76 M217 76 L217 82" stroke="#f3e8ff" strokeWidth="0.8" />
        <path d="M293 76 L287 76 M293 76 L293 82" stroke="#f3e8ff" strokeWidth="0.8" />
        <path d="M217 204 L223 204 M217 204 L217 198" stroke="#f3e8ff" strokeWidth="0.8" />
        <path d="M293 204 L287 204 M293 204 L293 198" stroke="#f3e8ff" strokeWidth="0.8" />

        {/* Card Centerpiece: Crescent Moon & Starburst */}
        <g transform="translate(255, 140)">
          {/* Inner circle of the card */}
          <circle cx="0" cy="0" r="32" stroke="#a855f7" strokeWidth="0.8" fill="#0e051e" />
          <circle cx="0" cy="0" r="28" stroke="#c084fc" strokeWidth="0.5" strokeDasharray="2 2" />

          {/* Luminous Crescent Moon */}
          <path
            d="M-4 -18 A 20 20 0 1 0 16 14 A 16 16 0 1 1 -4 -18 Z"
            fill="#d8b4fe"
            stroke="#f3e8ff"
            strokeWidth="0.75"
            opacity="0.9"
          />

          {/* Center 8-Point Diamond Star */}
          <path d="M0 -7 L2 -2 L7 0 L2 2 L0 7 L-2 2 L-7 0 L-2 -2 Z" fill="#ffffff" />
          <circle cx="0" cy="0" r="1.5" fill="#a855f7" />

          {/* Card Cardinal Rays */}
          <line x1="0" y1="-28" x2="0" y2="-22" stroke="#e9d5ff" strokeWidth="1" />
          <line x1="0" y1="28" x2="0" y2="22" stroke="#e9d5ff" strokeWidth="1" />
          <line x1="-28" y1="0" x2="-22" y2="0" stroke="#e9d5ff" strokeWidth="1" />
          <line x1="28" y1="0" x2="22" y2="0" stroke="#e9d5ff" strokeWidth="1" />
        </g>

        {/* Card Header & Footer Filigree */}
        <path d="M235 84 Q255 78 275 84" stroke="#c084fc" strokeWidth="0.8" fill="none" />
        <circle cx="255" cy="80" r="2" fill="#e9d5ff" />
        <path d="M235 196 Q255 202 275 196" stroke="#c084fc" strokeWidth="0.8" fill="none" />
        <circle cx="255" cy="200" r="2" fill="#e9d5ff" />
      </g>

      {/* Ritual Card Altar Base Plate */}
      <line x1="170" y1="230" x2="340" y2="230" stroke="#7e22ce" strokeWidth="1.2" />
      <line x1="190" y1="234" x2="320" y2="234" stroke="#a855f7" strokeWidth="0.8" strokeDasharray="3 3" />
      <line x1="210" y1="238" x2="300" y2="238" stroke="#581c87" strokeWidth="0.6" />

      {/* Orbiting Starlight / Dithered Sparks */}
      <circle cx="175" cy="95" r="1.2" fill="#e9d5ff" />
      <circle cx="335" cy="85" r="1.5" fill="#f3e8ff" />
      <circle cx="160" cy="180" r="1" fill="#c084fc" />
      <circle cx="330" cy="195" r="1.2" fill="#d8b4fe" />
      <path d="M335 125 L337 130 L342 131 L337 132 L335 137 L333 132 L328 131 L333 130 Z" fill="#e9d5ff" opacity="0.8" />
      <path d="M175 135 L176.5 139 L180.5 140 L176.5 141 L175 145 L173.5 141 L169.5 140 L173.5 139 Z" fill="#c084fc" opacity="0.7" />
    </svg>
  );
}

/**
 * 2. THREE-CARD READING MOTIF
 * Triad spread arrangement, triple moon symbolism, sacred geometry triangle, and diagnostic ray energy.
 */
function ThreeCardMotif() {
  return (
    <svg
      viewBox="0 0 360 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-h-[300px] object-contain object-right"
    >
      <defs>
        <pattern id="triad-halftone" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="0.75" fill="#c084fc" opacity="0.35" />
        </pattern>
        <radialGradient id="triad-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.22" />
          <stop offset="70%" stopColor="#6b21a8" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Halftone texture background */}
      <rect x="70" y="20" width="280" height="240" fill="url(#triad-halftone)" />

      {/* Triad Energy Aura */}
      <circle cx="260" cy="145" r="105" fill="url(#triad-aura)" />

      {/* Sacred Triad Geometry (Outer Rings & Inscribed Triangle) */}
      <circle cx="260" cy="145" r="110" stroke="#7e22ce" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.5" />
      <circle cx="260" cy="145" r="85" stroke="#9333ea" strokeWidth="0.8" opacity="0.6" />
      
      {/* Triad Connecting Geometric Triangle */}
      <polygon
        points="260,65 185,205 335,205"
        stroke="#c084fc"
        strokeWidth="0.8"
        strokeDasharray="2 3"
        fill="none"
        opacity="0.6"
      />

      {/* Triple Moon Symbol (Hovering above the Triad Spread) */}
      <g transform="translate(260, 52)">
        {/* Full Moon Center */}
        <circle cx="0" cy="0" r="11" fill="#180a32" stroke="#d8b4fe" strokeWidth="1" />
        <circle cx="0" cy="0" r="8" fill="#e9d5ff" opacity="0.85" />
        <circle cx="-2" cy="-2" r="2" fill="#c084fc" opacity="0.5" />

        {/* Waxing Crescent (Left) */}
        <path
          d="M-17 -9 A 9 9 0 0 1 -17 9 A 6 9 0 0 0 -17 -9 Z"
          fill="#c084fc"
          stroke="#e9d5ff"
          strokeWidth="0.8"
        />

        {/* Waning Crescent (Right) */}
        <path
          d="M17 -9 A 9 9 0 0 0 17 9 A 6 9 0 0 1 17 -9 Z"
          fill="#c084fc"
          stroke="#e9d5ff"
          strokeWidth="0.8"
        />

        {/* Connecting lunar beam */}
        <line x1="-30" y1="0" x2="-22" y2="0" stroke="#a855f7" strokeWidth="0.75" />
        <line x1="22" y1="0" x2="30" y2="0" stroke="#a855f7" strokeWidth="0.75" />
      </g>

      {/* The 3 Cards in Spread */}
      {/* 1. Left Card: Situation (Tilted -6 deg) */}
      <g transform="translate(192, 160) rotate(-7)">
        <rect x="-35" y="-55" width="70" height="110" rx="5" fill="#0d041a" stroke="#6b21a8" strokeWidth="1" />
        <rect x="-31" y="-51" width="62" height="102" rx="3" stroke="#a855f7" strokeWidth="0.75" strokeDasharray="3 2" />
        {/* Card Glyph */}
        <circle cx="0" cy="0" r="14" stroke="#c084fc" strokeWidth="0.6" />
        <path d="M0 -8 L0 8 M-8 0 L8 0" stroke="#e9d5ff" strokeWidth="0.75" />
      </g>

      {/* 2. Right Card: Guidance (Tilted +7 deg) */}
      <g transform="translate(328, 160) rotate(7)">
        <rect x="-35" y="-55" width="70" height="110" rx="5" fill="#0d041a" stroke="#6b21a8" strokeWidth="1" />
        <rect x="-31" y="-51" width="62" height="102" rx="3" stroke="#a855f7" strokeWidth="0.75" strokeDasharray="3 2" />
        {/* Card Glyph */}
        <circle cx="0" cy="0" r="14" stroke="#c084fc" strokeWidth="0.6" />
        <polygon points="0,-8 7,6 -7,6" stroke="#e9d5ff" strokeWidth="0.75" fill="none" />
      </g>

      {/* 3. Center Card: Challenge / Core Pivot (Standing tall and elevated) */}
      <g transform="translate(260, 150)">
        <rect x="-42" y="-68" width="84" height="136" rx="6" fill="#130728" stroke="#c084fc" strokeWidth="1.5" />
        <rect x="-37" y="-63" width="74" height="126" rx="4" stroke="#e9d5ff" strokeWidth="0.8" strokeDasharray="4 2" opacity="0.9" />
        <rect x="-33" y="-59" width="66" height="118" rx="3" stroke="#9333ea" strokeWidth="0.5" />

        {/* Center Card Glyph: The Eye / Diamond of Perception */}
        <circle cx="0" cy="0" r="22" stroke="#a855f7" strokeWidth="0.8" fill="#0e041e" />
        <path d="M-16 0 C-8 -11, 8 -11, 16 0 C8 11, -8 11, -16 0 Z" stroke="#e9d5ff" strokeWidth="0.9" fill="#200d3b" />
        <circle cx="0" cy="0" r="5" fill="#f3e8ff" />
        <circle cx="0" cy="0" r="2" fill="#581c87" />

        {/* Top & bottom card marks */}
        <path d="M-12 -45 L12 -45" stroke="#c084fc" strokeWidth="0.8" />
        <circle cx="0" cy="-45" r="1.5" fill="#ffffff" />
        <path d="M-12 45 L12 45" stroke="#c084fc" strokeWidth="0.8" />
        <circle cx="0" cy="45" r="1.5" fill="#ffffff" />
      </g>

      {/* Spread Altar Baseline Arc */}
      <path d="M140 235 Q 260 255 360 235" stroke="#9333ea" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.6" />
      <line x1="160" y1="240" x2="360" y2="240" stroke="#581c87" strokeWidth="0.8" />

      {/* Arcane Spread Glyphs & Coordinates */}
      <g fill="#c084fc" opacity="0.75" fontSize="8" fontFamily="monospace">
        <text x="188" y="235" textAnchor="middle">I</text>
        <text x="260" y="235" textAnchor="middle">II</text>
        <text x="332" y="235" textAnchor="middle">III</text>
      </g>
    </svg>
  );
}

/**
 * 3. CREATE A WORKING MOTIF
 * Ritual candle with dripping wax & flame, botanical herbs/rosemary, ceremonial bowl/mortar, and consecrated pantry tools.
 */
function WorkingMotif() {
  return (
    <svg
      viewBox="0 0 360 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-h-[300px] object-contain object-right"
    >
      <defs>
        <pattern id="working-halftone" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="0.75" fill="#a855f7" opacity="0.3" />
        </pattern>
        <radialGradient id="flame-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f3e8ff" stopOpacity="0.4" />
          <stop offset="35%" stopColor="#c084fc" stopOpacity="0.25" />
          <stop offset="75%" stopColor="#7e22ce" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Halftone texture background */}
      <rect x="80" y="20" width="270" height="240" fill="url(#working-halftone)" />

      {/* Flame & Altar Aura */}
      <circle cx="265" cy="115" r="90" fill="url(#flame-aura)" />

      {/* Consecration Working Circle */}
      <circle cx="265" cy="150" r="105" stroke="#7e22ce" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.45" />
      <circle cx="265" cy="150" r="80" stroke="#9333ea" strokeWidth="0.8" opacity="0.5" />

      {/* Rising Incense Smoke Swirls */}
      <path
        d="M265 92 C255 75, 275 60, 262 42 C250 25, 268 12, 260 2"
        stroke="#c084fc"
        strokeWidth="1"
        strokeDasharray="2 3"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M268 90 C278 78, 265 62, 274 46"
        stroke="#e9d5ff"
        strokeWidth="0.75"
        strokeDasharray="1 3"
        fill="none"
        opacity="0.5"
      />

      {/* The Ritual Pillar Candle */}
      <g id="ritual-candle">
        {/* Flame teardrop */}
        <ellipse cx="265" cy="104" rx="8" ry="14" fill="#a855f7" opacity="0.6" />
        <path
          d="M265 93 C261 101, 260 108, 265 113 C270 108, 269 101, 265 93 Z"
          fill="#f3e8ff"
          stroke="#ffffff"
          strokeWidth="0.8"
        />
        <circle cx="265" cy="107" r="2.5" fill="#facc15" opacity="0.8" />
        <line x1="265" y1="113" x2="265" y2="119" stroke="#3b0764" strokeWidth="1.2" />

        {/* Candle Column */}
        <path
          d="M254 122 C257 121, 273 121, 276 122 L277 195 L253 195 Z"
          fill="#17092e"
          stroke="#c084fc"
          strokeWidth="1.2"
        />
        
        {/* Wax Drips */}
        <path d="M257 122 C257 130, 260 134, 261 136 C262 134, 263 126, 264 122" fill="#c084fc" opacity="0.8" />
        <path d="M272 122 C272 128, 274 132, 275 133 C276 131, 276 125, 276 122" fill="#c084fc" opacity="0.8" />
        
        {/* Pillar Highlight line */}
        <line x1="258" y1="138" x2="258" y2="190" stroke="#e9d5ff" strokeWidth="0.6" opacity="0.5" />
      </g>

      {/* Botanical Sprigs: Rosemary & Herbs on Left */}
      <g id="botanical-herb-left" stroke="#c084fc" strokeWidth="1" fill="none">
        {/* Main stem curving upward */}
        <path d="M190 220 C205 185, 225 155, 246 135" />
        {/* Paired herbal needle leaves */}
        <path d="M208 190 C200 186, 195 188, 192 192" strokeWidth="0.8" />
        <path d="M214 180 C222 176, 228 178, 230 183" strokeWidth="0.8" />
        <path d="M222 165 C214 160, 208 162, 205 167" strokeWidth="0.8" />
        <path d="M230 152 C238 147, 245 150, 248 155" strokeWidth="0.8" />
        <path d="M239 142 C232 136, 227 138, 225 143" strokeWidth="0.8" />
      </g>

      {/* Botanical Sprig: Lavender / Flora on Right */}
      <g id="botanical-herb-right" stroke="#d8b4fe" strokeWidth="0.9" fill="none">
        <path d="M335 220 C320 180, 305 150, 285 130" />
        {/* Buds */}
        <circle cx="316" cy="180" r="2" fill="#a855f7" stroke="none" />
        <circle cx="304" cy="160" r="2" fill="#c084fc" stroke="none" />
        <circle cx="295" cy="144" r="1.8" fill="#e9d5ff" stroke="none" />
        <circle cx="286" cy="132" r="1.5" fill="#f3e8ff" stroke="none" />
      </g>

      {/* Ritual Mortar / Working Bowl & Pestle */}
      <g id="ritual-mortar">
        {/* Pestle Angled at 45 deg */}
        <rect
          x="285"
          y="160"
          width="8"
          height="45"
          rx="4"
          transform="rotate(32 285 160)"
          fill="#220b42"
          stroke="#e9d5ff"
          strokeWidth="0.9"
        />

        {/* Bowl Rim */}
        <ellipse cx="265" cy="195" rx="46" ry="9" fill="#1b0836" stroke="#c084fc" strokeWidth="1.2" />
        <ellipse cx="265" cy="195" rx="40" ry="6" fill="#0c0318" stroke="#a855f7" strokeWidth="0.75" />

        {/* Bowl Basin Body */}
        <path
          d="M219 195 C222 230, 308 230, 311 195 Z"
          fill="#130526"
          stroke="#c084fc"
          strokeWidth="1.2"
        />

        {/* Mortar Foot / Base */}
        <path d="M245 227 L285 227 L290 234 L240 234 Z" fill="#0d031c" stroke="#9333ea" strokeWidth="0.8" />

        {/* Elemental Earth/Salt Glyph on Bowl Face */}
        <g transform="translate(265, 212)">
          <circle cx="0" cy="0" r="8" stroke="#e9d5ff" strokeWidth="0.75" fill="#200a40" />
          <line x1="0" y1="-8" x2="0" y2="8" stroke="#d8b4fe" strokeWidth="0.75" />
          <line x1="-8" y1="0" x2="8" y2="0" stroke="#d8b4fe" strokeWidth="0.75" />
        </g>
      </g>

      {/* Altar Working Surface Line */}
      <line x1="160" y1="234" x2="350" y2="234" stroke="#7e22ce" strokeWidth="1.2" />
      <line x1="180" y1="238" x2="330" y2="238" stroke="#a855f7" strokeWidth="0.75" strokeDasharray="3 3" />
    </svg>
  );
}

/**
 * 4. MY GRIMOIRE MOTIF
 * Open antique leather folio with curved vellum pages, archive seal sigil, celestial bookmark, and mystical ledger lines.
 */
function GrimoireMotif() {
  return (
    <svg
      viewBox="0 0 360 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-h-[300px] object-contain object-right"
    >
      <defs>
        <pattern id="grimoire-halftone" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="0.75" fill="#a855f7" opacity="0.32" />
        </pattern>
        <radialGradient id="grimoire-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.25" />
          <stop offset="65%" stopColor="#7e22ce" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Halftone texture background */}
      <rect x="80" y="20" width="270" height="240" fill="url(#grimoire-halftone)" />

      {/* Archive Glow Aura */}
      <circle cx="260" cy="140" r="105" fill="url(#grimoire-aura)" />

      {/* Archival Latitude / Longitude Circles */}
      <circle cx="260" cy="140" r="115" stroke="#7e22ce" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.45" />
      <circle cx="260" cy="140" r="85" stroke="#9333ea" strokeWidth="0.8" opacity="0.55" />

      {/* Floating Mystic Archive Seal (Above Grimoire) */}
      <g id="archive-seal" transform="translate(260, 68)">
        <circle cx="0" cy="0" r="28" stroke="#a855f7" strokeWidth="1.2" fill="#120524" />
        <circle cx="0" cy="0" r="24" stroke="#c084fc" strokeWidth="0.75" strokeDasharray="3 2" />
        <circle cx="0" cy="0" r="20" stroke="#581c87" strokeWidth="0.6" />

        {/* 8-Point Grimoire Star */}
        <path
          d="M0 -15 L3 -4 L14 0 L3 4 L0 15 L-3 4 L-14 0 L-3 -4 Z"
          fill="#d8b4fe"
          stroke="#ffffff"
          strokeWidth="0.75"
        />
        <circle cx="0" cy="0" r="2" fill="#581c87" />

        {/* Cardinal Seal Marks */}
        <circle cx="0" cy="-22" r="1" fill="#f3e8ff" />
        <circle cx="0" cy="22" r="1" fill="#f3e8ff" />
        <circle cx="-22" cy="0" r="1" fill="#f3e8ff" />
        <circle cx="22" cy="0" r="1" fill="#f3e8ff" />
      </g>

      {/* The Open Grimoire Book */}
      <g id="open-grimoire">
        {/* Book Binding / Hardcover Base Silhouette */}
        <path
          d="M170 216 C195 212, 235 214, 258 220 L262 220 C285 214, 325 212, 350 216 L345 222 C320 218, 285 220, 260 225 C235 220, 200 218, 175 222 Z"
          fill="#1b0836"
          stroke="#7e22ce"
          strokeWidth="1"
        />

        {/* Stacked Paper Leaf Thickness Lines */}
        <path d="M174 212 C200 207, 235 209, 258 214" stroke="#581c87" strokeWidth="0.75" fill="none" />
        <path d="M346 212 C320 207, 285 209, 262 214" stroke="#581c87" strokeWidth="0.75" fill="none" />

        {/* Left Vellum Page Surface */}
        <path
          d="M260 212 C235 206, 198 208, 175 216 L185 135 C208 127, 238 126, 260 134 Z"
          fill="#120526"
          stroke="#c084fc"
          strokeWidth="1.2"
        />

        {/* Right Vellum Page Surface */}
        <path
          d="M260 212 C285 206, 322 208, 345 216 L335 135 C312 127, 282 126, 260 134 Z"
          fill="#14062a"
          stroke="#c084fc"
          strokeWidth="1.2"
        />

        {/* Book Spine Center Gutter */}
        <line x1="260" y1="134" x2="260" y2="212" stroke="#e9d5ff" strokeWidth="1.5" />

        {/* Left Page Markings: Archive Ledger Lines & Sacred Seal */}
        <g stroke="#a855f7" strokeWidth="0.7" opacity="0.65">
          <line x1="195" y1="145" x2="248" y2="142" />
          <line x1="194" y1="155" x2="248" y2="152" />
          <line x1="193" y1="165" x2="248" y2="162" />
          <line x1="192" y1="175" x2="248" y2="172" />
          <line x1="191" y1="185" x2="248" y2="182" />
          <line x1="190" y1="195" x2="248" y2="192" />
        </g>
        {/* Small Left Page Sigil */}
        <circle cx="220" cy="168" r="10" stroke="#d8b4fe" strokeWidth="0.75" fill="#0d031c" opacity="0.8" />
        <path d="M220 162 L220 174 M214 168 L226 168" stroke="#f3e8ff" strokeWidth="0.75" opacity="0.8" />

        {/* Right Page Markings: Arcane Script & Celestial Chart */}
        <g stroke="#a855f7" strokeWidth="0.7" opacity="0.65">
          <line x1="272" y1="142" x2="325" y2="145" />
          <line x1="272" y1="152" x2="326" y2="155" />
          <line x1="272" y1="162" x2="327" y2="165" />
          <line x1="272" y1="172" x2="328" y2="175" />
          <line x1="272" y1="182" x2="329" y2="185" />
          <line x1="272" y1="192" x2="330" y2="195" />
        </g>
        {/* Small Right Page Moon Chart */}
        <circle cx="300" cy="168" r="10" stroke="#d8b4fe" strokeWidth="0.75" fill="#0d031c" opacity="0.8" />
        <path d="M298 160 A 8 8 0 1 0 306 172 A 6 6 0 1 1 298 160 Z" fill="#e9d5ff" opacity="0.85" />

        {/* Flowing Celestial Bookmark Ribbon */}
        <path
          d="M260 212 C257 225, 252 238, 258 252 L266 248 L274 252 C268 238, 263 225, 260 212 Z"
          fill="#a855f7"
          stroke="#f3e8ff"
          strokeWidth="0.8"
        />
      </g>

      {/* Archival Quadrant Marks (Corner Framing) */}
      <g stroke="#c084fc" strokeWidth="0.8" opacity="0.6">
        <path d="M150 40 L165 40 M150 40 L150 55" />
        <path d="M350 40 L335 40 M350 40 L350 55" />
        <path d="M150 250 L165 250 M150 250 L150 235" />
        <path d="M350 250 L335 250 M350 250 L350 235" />
      </g>
    </svg>
  );
}
