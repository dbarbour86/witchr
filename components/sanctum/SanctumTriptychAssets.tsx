import React from "react";

/**
 * Detailed engraved radiant sun face matching the vintage occult print reference.
 * Features serene closed/heavy-lidded eyes, classical linework shading, and 24 radiating solar flares.
 */
export function RadiantSunEngraving({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Engraved Celestial Sun Face"
    >
      <defs>
        <radialGradient id="sun-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f3e8ff" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#c084fc" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#6b21a8" stopOpacity="0" />
        </radialGradient>
        <pattern id="sun-halftone" width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.6" fill="#c084fc" opacity="0.45" />
        </pattern>
      </defs>

      {/* Halftone Halo */}
      <circle cx="80" cy="80" r="74" fill="url(#sun-halftone)" />

      {/* Concentric Orbital Rings */}
      <circle cx="80" cy="80" r="70" stroke="#7e22ce" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="80" cy="80" r="52" stroke="#a855f7" strokeWidth="0.8" opacity="0.8" />
      <circle cx="80" cy="80" r="48" stroke="#d8b4fe" strokeWidth="1" />

      {/* 24 Engraved Solar Rays (alternating spear rays and serpentine flames) */}
      {[...Array(24)].map((_, i) => {
        const angle = (i * 360) / 24;
        const isSpear = i % 2 === 0;
        return (
          <g key={i} transform={`rotate(${angle} 80 80)`}>
            {isSpear ? (
              // Straight spear-ray with center spine
              <path
                d="M78 48 L80 10 L82 48 Z"
                fill="#c084fc"
                stroke="#f3e8ff"
                strokeWidth="0.75"
                opacity="0.85"
              />
            ) : (
              // Serpentine flame-ray
              <path
                d="M78 48 Q84 32 77 22 Q72 14 80 15 Q86 25 82 48 Z"
                fill="#9333ea"
                stroke="#e9d5ff"
                strokeWidth="0.6"
                opacity="0.75"
              />
            )}
          </g>
        );
      })}

      {/* Sun Face Disk */}
      <circle cx="80" cy="80" r="46" fill="#0d051c" stroke="#d8b4fe" strokeWidth="1.2" />
      <circle cx="80" cy="80" r="42" fill="url(#sun-core-glow)" opacity="0.25" />

      {/* Classical Woodcut Shading & Facial Features */}
      {/* Eyebrows */}
      <path d="M57 68 C63 64 71 65 74 70" stroke="#d8b4fe" strokeWidth="1" strokeLinecap="round" fill="none" />
      <path d="M103 68 C97 64 89 65 86 70" stroke="#d8b4fe" strokeWidth="1" strokeLinecap="round" fill="none" />

      {/* Serene Closed Eyes with Eyelashes */}
      <path d="M58 74 C63 78 71 78 75 74" stroke="#f3e8ff" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M62 76 L60 79 M66 77 L66 80 M71 76 L73 79" stroke="#c084fc" strokeWidth="0.75" />

      <path d="M102 74 C97 78 89 78 85 74" stroke="#f3e8ff" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M98 76 L100 79 M94 77 L94 80 M89 76 L87 79" stroke="#c084fc" strokeWidth="0.75" />

      {/* Third Eye Mark on Forehead */}
      <circle cx="80" cy="62" r="2.5" fill="#f3e8ff" />
      <path d="M74 62 C77 59 83 59 86 62 C83 65 77 65 74 62 Z" stroke="#c084fc" strokeWidth="0.8" fill="none" />

      {/* Nose */}
      <path d="M80 70 L78 85 C77 87 76 89 80 89 C84 89 83 87 82 85" stroke="#d8b4fe" strokeWidth="1" strokeLinecap="round" fill="none" />
      <circle cx="75" cy="87" r="1.2" fill="#7e22ce" />
      <circle cx="85" cy="87" r="1.2" fill="#7e22ce" />

      {/* Serene Lips */}
      <path d="M72 98 C76 96 80 97 80 97 C80 97 84 96 88 98" stroke="#f3e8ff" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M74 98 C78 102 82 102 86 98" stroke="#d8b4fe" strokeWidth="0.9" fill="none" />
      <path d="M77 104 C79 105 81 105 83 104" stroke="#7e22ce" strokeWidth="0.8" strokeLinecap="round" fill="none" />

      {/* Cheek Contour Hatching */}
      <path d="M58 84 Q62 90 64 96" stroke="#7e22ce" strokeWidth="0.6" strokeDasharray="1.5 1.5" fill="none" />
      <path d="M102 84 Q98 90 96 96" stroke="#7e22ce" strokeWidth="0.6" strokeDasharray="1.5 1.5" fill="none" />

      {/* Tiny Cardinal Stars */}
      <circle cx="80" cy="4" r="1.5" fill="#f3e8ff" />
      <circle cx="80" cy="156" r="1.5" fill="#f3e8ff" />
      <circle cx="4" cy="80" r="1.5" fill="#f3e8ff" />
      <circle cx="156" cy="80" r="1.5" fill="#f3e8ff" />
    </svg>
  );
}

/**
 * Detailed Death's-Head Hawk Moth (Acherontia atropos) engraving with skull thorax,
 * wing venation, and crescent moon crown matching the ticket panel aesthetic.
 */
export function DeathsHeadMothEngraving({ className = "w-28 h-20" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Engraved Death's-Head Hawk Moth"
    >
      <defs>
        <pattern id="moth-dither" width="3" height="3" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="0.5" fill="#c084fc" opacity="0.35" />
        </pattern>
      </defs>

      {/* Crescent Moon Above Moth */}
      <g transform="translate(100, 16)">
        <path
          d="M-7 -6 A 8 8 0 1 0 7 -6 A 6.5 6.5 0 1 1 -7 -6 Z"
          fill="#d8b4fe"
          stroke="#f3e8ff"
          strokeWidth="0.75"
        />
        <circle cx="0" cy="-6" r="1" fill="#ffffff" />
      </g>

      {/* Left Forewing */}
      <path
        d="M96 52 C72 32 35 25 10 32 C4 48 18 80 48 94 C70 102 92 82 96 66 Z"
        fill="#120626"
        stroke="#c084fc"
        strokeWidth="1.1"
      />
      {/* Left Wing Venation */}
      <path d="M96 56 Q55 45 20 38" stroke="#a855f7" strokeWidth="0.8" fill="none" />
      <path d="M96 58 Q60 62 28 62" stroke="#a855f7" strokeWidth="0.7" fill="none" />
      <path d="M96 62 Q72 80 46 90" stroke="#7e22ce" strokeWidth="0.8" fill="none" />
      <path d="M40 45 Q50 65 52 82" stroke="#e9d5ff" strokeWidth="0.6" strokeDasharray="1.5 2" fill="none" />
      <circle cx="34" cy="50" r="3" stroke="#f3e8ff" strokeWidth="0.6" strokeDasharray="1 1" />

      {/* Right Forewing */}
      <path
        d="M104 52 C128 32 165 25 190 32 C196 48 182 80 152 94 C130 102 108 82 104 66 Z"
        fill="#120626"
        stroke="#c084fc"
        strokeWidth="1.1"
      />
      {/* Right Wing Venation */}
      <path d="M104 56 Q145 45 180 38" stroke="#a855f7" strokeWidth="0.8" fill="none" />
      <path d="M104 58 Q140 62 172 62" stroke="#a855f7" strokeWidth="0.7" fill="none" />
      <path d="M104 62 Q128 80 154 90" stroke="#7e22ce" strokeWidth="0.8" fill="none" />
      <path d="M160 45 Q150 65 148 82" stroke="#e9d5ff" strokeWidth="0.6" strokeDasharray="1.5 2" fill="none" />
      <circle cx="166" cy="50" r="3" stroke="#f3e8ff" strokeWidth="0.6" strokeDasharray="1 1" />

      {/* Left Hindwing */}
      <path
        d="M96 68 C80 78 65 96 68 112 C78 118 92 110 98 88 Z"
        fill="#0b0318"
        stroke="#9333ea"
        strokeWidth="0.9"
      />
      {/* Right Hindwing */}
      <path
        d="M104 68 C120 78 135 96 132 112 C122 118 108 110 102 88 Z"
        fill="#0b0318"
        stroke="#9333ea"
        strokeWidth="0.9"
      />

      {/* Moth Body: Segmented Abdomen */}
      <path
        d="M96 65 C96 60 104 60 104 65 L104 115 C104 122 96 122 96 115 Z"
        fill="#090214"
        stroke="#d8b4fe"
        strokeWidth="1"
      />
      {/* Abdomen Segments */}
      {[72, 80, 88, 96, 104, 112].map((y) => (
        <line key={y} x1="97" y1={y} x2="103" y2={y} stroke="#c084fc" strokeWidth="0.8" />
      ))}

      {/* Thorax: The Skull Mask Emblem */}
      <path
        d="M94 48 C94 40 106 40 106 48 C106 58 104 62 100 62 C96 62 94 58 94 48 Z"
        fill="#1e0b38"
        stroke="#f3e8ff"
        strokeWidth="1"
      />
      {/* Skull Eye Sockets */}
      <ellipse cx="98" cy="48" rx="1.8" ry="2.2" fill="#06010c" stroke="#c084fc" strokeWidth="0.6" />
      <ellipse cx="102" cy="48" rx="1.8" ry="2.2" fill="#06010c" stroke="#c084fc" strokeWidth="0.6" />
      {/* Nasal cavity & mouth */}
      <path d="M100 52 L99.2 54 L100.8 54 Z" fill="#d8b4fe" />
      <path d="M98 57 H102" stroke="#f3e8ff" strokeWidth="0.6" />

      {/* Head and Feathered Antennae */}
      <circle cx="100" cy="38" r="3" fill="#140628" stroke="#d8b4fe" strokeWidth="0.8" />
      {/* Left Antenna */}
      <path d="M98 37 Q86 30 76 34" stroke="#e9d5ff" strokeWidth="0.9" strokeLinecap="round" fill="none" />
      <path d="M94 36 L93 34 M90 34 L89 32 M85 33 L84 31 M80 34 L79 32" stroke="#c084fc" strokeWidth="0.6" />
      {/* Right Antenna */}
      <path d="M102 37 Q114 30 124 34" stroke="#e9d5ff" strokeWidth="0.9" strokeLinecap="round" fill="none" />
      <path d="M106 36 L107 34 M110 34 L111 32 M115 33 L116 31 M120 34 L121 32" stroke="#c084fc" strokeWidth="0.6" />
    </svg>
  );
}

/**
 * Triple Moon Diadem glyph for panel headers: Waxing, Full, Waning.
 */
export function TripleMoonDiadem({ className = "w-16 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Triple Moon Goddess Glyph"
    >
      {/* Waxing Crescent Left */}
      <path
        d="M16 3 A 7 7 0 1 0 16 17 A 5.5 7 0 0 1 16 3 Z"
        fill="#c084fc"
        stroke="#f3e8ff"
        strokeWidth="0.6"
      />
      {/* Full Moon Center */}
      <circle cx="32" cy="10" r="7" fill="#f3e8ff" stroke="#c084fc" strokeWidth="0.8" />
      <circle cx="32" cy="10" r="5" stroke="#9333ea" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
      <circle cx="32" cy="10" r="1.5" fill="#7e22ce" />
      {/* Waning Crescent Right */}
      <path
        d="M48 3 A 7 7 0 1 1 48 17 A 5.5 7 0 0 0 48 3 Z"
        fill="#c084fc"
        stroke="#f3e8ff"
        strokeWidth="0.6"
      />
    </svg>
  );
}

/**
 * Atmospheric Oracle Altar Scene Artwork:
 * The veiled Oracle seated at her altar with dripping wax candle, amethyst crystals,
 * and laid tarot cards, illuminated in deep black and violet candlelight.
 */
export function OracleAltarScene({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="The Oracle at the Divination Altar"
    >
      <defs>
        {/* Violet Candle Glow */}
        <radialGradient id="altar-candle-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f3e8ff" stopOpacity="0.9" />
          <stop offset="35%" stopColor="#c084fc" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#7e22ce" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#07020d" stopOpacity="0" />
        </radialGradient>
        {/* Oracle Aura */}
        <radialGradient id="oracle-aura" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#9333ea" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#581c87" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#06020c" stopOpacity="0" />
        </radialGradient>
        {/* Halftone backdrop */}
        <pattern id="altar-halftone" width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="2.5" cy="2.5" r="0.6" fill="#a855f7" opacity="0.3" />
        </pattern>
      </defs>

      {/* Atmospheric Background & Aura */}
      <rect width="360" height="280" fill="#07020e" />
      <circle cx="180" cy="110" r="130" fill="url(#oracle-aura)" />
      <circle cx="180" cy="110" r="110" fill="url(#altar-halftone)" />

      {/* Radiant Concentric Celestial Rings behind Head */}
      <circle cx="180" cy="95" r="85" stroke="#7e22ce" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.6" />
      <circle cx="180" cy="95" r="70" stroke="#a855f7" strokeWidth="0.9" opacity="0.8" />
      <circle cx="180" cy="95" r="58" stroke="#c084fc" strokeWidth="0.6" strokeDasharray="2 2" />

      {/* Radiating 16 Celestial Sunbeams */}
      {[...Array(16)].map((_, i) => {
        const angle = (i * 360) / 16;
        return (
          <line
            key={i}
            x1="180"
            y1="22"
            x2="180"
            y2="34"
            stroke="#e9d5ff"
            strokeWidth="0.8"
            transform={`rotate(${angle} 180 95)`}
            opacity="0.65"
          />
        );
      })}

      {/* Triple Moon Diadem above Head */}
      <g transform="translate(180, 42)">
        <path d="M-15 0 A 6 6 0 1 0 -15 12 A 4.5 6 0 0 1 -15 0 Z" fill="#c084fc" stroke="#f3e8ff" strokeWidth="0.6" />
        <circle cx="0" cy="6" r="6" fill="#f3e8ff" stroke="#c084fc" strokeWidth="0.8" />
        <circle cx="0" cy="6" r="1.5" fill="#7e22ce" />
        <path d="M15 0 A 6 6 0 1 1 15 12 A 4.5 6 0 0 0 15 0 Z" fill="#c084fc" stroke="#f3e8ff" strokeWidth="0.6" />
      </g>

      {/* The Oracle's Veiled Cowl & Hood Silhouette */}
      <path
        d="M180 48 C145 48, 126 72, 118 115 C110 155, 95 190, 85 220 L275 220 C265 190, 250 155, 242 115 C234 72, 215 48, 180 48 Z"
        fill="#0d041e"
        stroke="#a855f7"
        strokeWidth="1.2"
      />

      {/* Inner Cowl Shadow Layer */}
      <path
        d="M180 58 C155 58, 142 80, 136 120 C130 155, 122 185, 115 220 L245 220 C238 185, 230 155, 224 120 C218 80, 205 58, 180 58 Z"
        fill="#06010a"
      />

      {/* Draped Cowl Fold Linework */}
      <path d="M142 110 Q160 160 165 220" stroke="#581c87" strokeWidth="0.9" fill="none" />
      <path d="M218 110 Q200 160 195 220" stroke="#581c87" strokeWidth="0.9" fill="none" />
      <path d="M180 58 L180 90" stroke="#7e22ce" strokeWidth="0.75" strokeDasharray="2 2" />

      {/* Constellation Embroidery on Hood (Little Stars) */}
      <circle cx="138" cy="85" r="1.2" fill="#f3e8ff" />
      <circle cx="150" cy="72" r="1.2" fill="#d8b4fe" />
      <circle cx="210" cy="72" r="1.2" fill="#d8b4fe" />
      <circle cx="222" cy="85" r="1.2" fill="#f3e8ff" />
      <line x1="138" y1="85" x2="150" y2="72" stroke="#c084fc" strokeWidth="0.4" strokeDasharray="1 2" />
      <line x1="210" y1="72" x2="222" y2="85" stroke="#c084fc" strokeWidth="0.4" strokeDasharray="1 2" />

      {/* The Oracle's Face (Delicate Oval in Shadow) */}
      <path
        d="M165 95 C165 82, 195 82, 195 95 C195 118, 188 132, 180 134 C172 132, 165 118, 165 95 Z"
        fill="#120526"
        stroke="#9333ea"
        strokeWidth="0.8"
      />

      {/* Eyes & Third Eye */}
      {/* Third Eye on Forehead */}
      <g transform="translate(180, 92)">
        <circle cx="0" cy="0" r="10" fill="url(#altar-candle-glow)" opacity="0.6" />
        <path d="M-8 0 C-4 -5, 4 -5, 8 0 C4 5, -4 5, -8 0 Z" fill="#240a45" stroke="#f3e8ff" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="2.2" fill="#c084fc" />
        <circle cx="0" cy="0" r="1" fill="#ffffff" />
      </g>

      {/* Left Eye */}
      <path d="M169 104 C172 101, 176 101, 178 104" stroke="#e9d5ff" strokeWidth="0.9" fill="none" />
      <circle cx="174" cy="104.5" r="1.2" fill="#d8b4fe" />

      {/* Right Eye */}
      <path d="M182 104 C184 101, 188 101, 191 104" stroke="#e9d5ff" strokeWidth="0.9" fill="none" />
      <circle cx="186" cy="104.5" r="1.2" fill="#d8b4fe" />

      {/* Delicate Nose & Mouth */}
      <path d="M180 106 L179 116 L181 116" stroke="#9333ea" strokeWidth="0.8" strokeLinecap="round" fill="none" />
      <path d="M176 122 C178 121, 182 121, 184 122" stroke="#d8b4fe" strokeWidth="0.9" strokeLinecap="round" fill="none" />

      {/* Contemplative Hand / Arm under Chin */}
      <path
        d="M174 135 C170 142, 160 165, 155 185 L185 185 C186 168, 184 150, 182 135 Z"
        fill="#120626"
        stroke="#a855f7"
        strokeWidth="0.8"
      />
      {/* Crescent Moon Necklace */}
      <path
        d="M176 142 A 5 5 0 1 0 184 142 A 4 4 0 1 1 176 142 Z"
        fill="#f3e8ff"
        stroke="#c084fc"
        strokeWidth="0.6"
      />

      {/* ------------------------------------------------------------- */}
      {/* THE OCCULT ALTAR TABLE (Foreground Velvet Altar & Offerings) */}
      {/* ------------------------------------------------------------- */}
      {/* Altar Surface Shelf */}
      <path
        d="M20 200 L340 200 L350 280 L10 280 Z"
        fill="#0b0318"
        stroke="#7e22ce"
        strokeWidth="1.2"
      />
      <line x1="20" y1="204" x2="340" y2="204" stroke="#a855f7" strokeWidth="0.75" />

      {/* Altar Cloth Front Drape with Sacred Geometry */}
      <path d="M40 204 L40 280 M320 204 L320 280" stroke="#581c87" strokeWidth="0.8" strokeDasharray="3 3" />
      <circle cx="180" cy="245" r="28" stroke="#9333ea" strokeWidth="0.8" strokeDasharray="2 2" />
      <polygon points="180,222 200,258 160,258" stroke="#c084fc" strokeWidth="0.7" fill="none" />
      <circle cx="180" cy="245" r="3" fill="#f3e8ff" />

      {/* 1. Left Altar: Tall Violet Dripping Candle */}
      <g transform="translate(68, 145)">
        {/* Ambient Candlelight Glow */}
        <circle cx="12" cy="10" r="42" fill="url(#altar-candle-glow)" opacity="0.85" />

        {/* Rising Smoke Wisp */}
        <path
          d="M12 4 Q8 -8 16 -18 Q22 -28 14 -38 Q8 -48 18 -58"
          stroke="#d8b4fe"
          strokeWidth="1"
          strokeDasharray="2 3"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        />

        {/* Golden/Violet Candle Flame */}
        <path
          d="M12 2 C9 8, 8 13, 12 18 C16 13, 15 8, 12 2 Z"
          fill="#f3e8ff"
          stroke="#c084fc"
          strokeWidth="0.8"
        />
        <circle cx="12" cy="12" r="1.5" fill="#a855f7" />

        {/* Candle Wick */}
        <line x1="12" y1="18" x2="12" y2="23" stroke="#e9d5ff" strokeWidth="1" />

        {/* Melting Wax Pillar */}
        <path
          d="M6 23 C7 23, 17 23, 18 23 C19 35, 19 60, 18 68 L6 68 C5 60, 5 35, 6 23 Z"
          fill="#1c0738"
          stroke="#c084fc"
          strokeWidth="1"
        />
        {/* Dripping Wax Trails */}
        <path d="M8 23 V36 C8 38 9 38 9 36 V23" fill="#9333ea" />
        <path d="M14 23 V44 C14 46 16 46 16 44 V23" fill="#9333ea" />
        <path d="M17 23 V32 C17 34 18 34 18 32 V23" fill="#9333ea" />

        {/* Wax Pool at Base */}
        <ellipse cx="12" cy="68" rx="14" ry="4" fill="#2a0c4f" stroke="#c084fc" strokeWidth="0.8" />
      </g>

      {/* 2. Beside Candle: Amethyst Crystals & Lavender Sprig */}
      <g transform="translate(102, 190)">
        {/* Crystal spire 1 */}
        <polygon points="10,2 14,8 12,24 6,24 5,8" fill="#200a40" stroke="#d8b4fe" strokeWidth="0.8" />
        <line x1="10" y1="2" x2="9" y2="24" stroke="#a855f7" strokeWidth="0.6" />
        {/* Crystal spire 2 */}
        <polygon points="18,10 22,14 20,24 15,24 14,14" fill="#180730" stroke="#c084fc" strokeWidth="0.7" />
        {/* Crystal base facet */}
        <line x1="3" y1="24" x2="24" y2="24" stroke="#e9d5ff" strokeWidth="1" />
      </g>

      {/* 3. Center Altar: Three Laid Tarot Cards Spread */}
      {/* Card 1 (Left tilted) */}
      <g transform="translate(142, 198) rotate(-8 18 25)">
        <rect width="36" height="52" rx="2.5" fill="#130728" stroke="#d8b4fe" strokeWidth="1" />
        <rect x="2.5" y="2.5" width="31" height="47" rx="1.5" stroke="#7e22ce" strokeWidth="0.6" />
        {/* Sun/Moon card art */}
        <circle cx="18" cy="22" r="7" stroke="#c084fc" strokeWidth="0.75" />
        <path d="M18 17 L18 27 M13 22 L23 22" stroke="#e9d5ff" strokeWidth="0.6" />
        <line x1="8" y1="42" x2="28" y2="42" stroke="#a855f7" strokeWidth="0.6" />
      </g>

      {/* Card 2 (Center dominant) */}
      <g transform="translate(164, 192)">
        <rect width="36" height="54" rx="2.5" fill="#1b0838" stroke="#f3e8ff" strokeWidth="1.2" />
        <rect x="2.5" y="2.5" width="31" height="49" rx="1.5" stroke="#c084fc" strokeWidth="0.7" />
        {/* Radiant star motif */}
        <circle cx="18" cy="24" r="8" fill="#300d60" stroke="#f3e8ff" strokeWidth="0.8" />
        <path d="M18 12 L19.5 22 L28 24 L19.5 26 L18 36 L16.5 26 L8 24 L16.5 22 Z" fill="#e9d5ff" />
        <circle cx="18" cy="24" r="2" fill="#7e22ce" />
        <line x1="8" y1="44" x2="28" y2="44" stroke="#c084fc" strokeWidth="0.8" />
      </g>

      {/* Card 3 (Right tilted) */}
      <g transform="translate(186, 198) rotate(8 18 25)">
        <rect width="36" height="52" rx="2.5" fill="#130728" stroke="#d8b4fe" strokeWidth="1" />
        <rect x="2.5" y="2.5" width="31" height="47" rx="1.5" stroke="#7e22ce" strokeWidth="0.6" />
        {/* Chalice / Pentacle motif */}
        <circle cx="18" cy="24" r="7" stroke="#c084fc" strokeWidth="0.75" />
        <polygon points="18,18 22,28 14,28" stroke="#f3e8ff" strokeWidth="0.6" fill="none" />
        <line x1="8" y1="42" x2="28" y2="42" stroke="#a855f7" strokeWidth="0.6" />
      </g>

      {/* 4. Right Altar: Herb Sprig & Offering Bowl */}
      <g transform="translate(245, 195)">
        <ellipse cx="20" cy="18" rx="18" ry="6" fill="#16062b" stroke="#c084fc" strokeWidth="0.8" />
        <ellipse cx="20" cy="17" rx="12" ry="3" fill="#320d58" />
        <circle cx="18" cy="16" r="1.5" fill="#f3e8ff" />
        <circle cx="23" cy="17" r="1.2" fill="#d8b4fe" />
      </g>
    </svg>
  );
}

/**
 * Custom Occult Ticket Icons for the 5 admission buttons:
 * 1. OracleSpeechIcon (Speech bubble with stars and divination linework)
 * 2. DailyTarotCardIcon (Single tarot card with radiant sun face)
 * 3. ThreeCardFanIcon (Fanned trio of tarot cards)
 * 4. CauldronWorkingIcon (Occult cauldron with bubbling star and vapors)
 * 5. GrimoireBookIcon (Sacred open grimoire with bookmark)
 */

export function OracleSpeechIcon({ className = "w-5 h-5 text-purple-300" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M21 11.5C21 15.64 16.97 19 12 19C10.45 19 8.98 18.67 7.7 18.07L3 19.5L4.45 15.65C3.54 14.45 3 13.03 3 11.5C3 7.36 7.03 4 12 4C16.97 4 21 7.36 21 11.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner four-point star */}
      <path d="M12 7L12.8 10.2L16 11L12.8 11.8L12 15L11.2 11.8L8 11L11.2 10.2Z" fill="currentColor" opacity="0.9" />
      <circle cx="16.5" cy="8.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

export function DailyTarotCardIcon({ className = "w-5 h-5 text-purple-300" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <line x1="12" y1="5.5" x2="12" y2="7" stroke="currentColor" strokeWidth="1" />
      <line x1="12" y1="17" x2="12" y2="18.5" stroke="currentColor" strokeWidth="1" />
      <line x1="5.5" y1="12" x2="7" y2="12" stroke="currentColor" strokeWidth="1" />
      <line x1="17" y1="12" x2="18.5" y2="12" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function ThreeCardFanIcon({ className = "w-5 h-5 text-purple-300" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {/* Left Card */}
      <rect
        x="3"
        y="5"
        width="10"
        height="15"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
        transform="rotate(-15 8 12.5)"
        opacity="0.7"
      />
      {/* Right Card */}
      <rect
        x="11"
        y="5"
        width="10"
        height="15"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
        transform="rotate(15 16 12.5)"
        opacity="0.7"
      />
      {/* Center Card */}
      <rect x="7" y="4" width="10" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="#120626" />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

export function CauldronWorkingIcon({ className = "w-5 h-5 text-purple-300" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {/* Cauldron Rim and Belly */}
      <ellipse cx="12" cy="9" rx="8" ry="2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M4.5 9.5 C4.5 16, 8 20, 12 20 C16 20, 19.5 16, 19.5 9.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      {/* Feet */}
      <line x1="7" y1="19" x2="5" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="17" y1="19" x2="19" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Rising Bubbles and Vapor */}
      <path d="M12 7 C11.5 5, 13 4, 12 2" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1.5" />
      <circle cx="9" cy="5" r="1" fill="currentColor" />
      <circle cx="15" cy="4" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function GrimoireBookIcon({ className = "w-5 h-5 text-purple-300" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {/* Open Book Wings */}
      <path
        d="M12 6 C10 4.5, 6 4.5, 3 5 V19 C6 18.5, 10 18.5, 12 20 C14 18.5, 18 18.5, 21 19 V5 C18 4.5, 14 4.5, 12 6 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* Spine line */}
      <line x1="12" y1="6" x2="12" y2="20" stroke="currentColor" strokeWidth="1.4" />
      {/* Ribbon Bookmark */}
      <path d="M12 6 V15 L14 13.5 L16 15 V6" fill="currentColor" opacity="0.8" />
    </svg>
  );
}
