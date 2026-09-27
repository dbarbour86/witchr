import React from "react";
import Image from "next/image";
import { TarotCornerFlourish, FourPointStar } from "@/components/OrnateFrames";

import { OracleAltarScene } from "@/components/sanctum/SanctumTriptychAssets";

interface OracleFigureProps {
  src?: string;
  alt?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "hero";
  variant?: "portrait" | "altar";
}

/**
 * Dedicated visual component for the Oracle figure.
 * Provides an atmospheric ceremonial SVG illustration or altar scene by default,
 * while remaining fully prepared to accept a final generated illustration asset later.
 */
export function OracleFigure({
  src,
  alt = "The Oracle of Witchr",
  className = "",
  size = "md",
  variant = "portrait",
}: OracleFigureProps) {
  const sizeClasses = {
    sm: "w-28 h-36 sm:w-32 sm:h-40",
    md: "w-44 h-56 sm:w-52 sm:h-64",
    lg: "w-60 h-72 sm:w-72 sm:h-88",
    hero: "w-full max-w-[420px] aspect-[4/3] sm:aspect-[1.25/1]",
  }[size];

  return (
    <div
      className={`relative sanctum-panel sanctum-corners rounded-2xl border border-purple-900/70 overflow-hidden flex flex-col items-center justify-center p-3 shadow-[0_0_35px_rgba(88,28,135,0.35)] group ${sizeClasses} ${className}`}
      aria-label={alt}
    >
      {/* Corner Ornate Accents */}
      <div className="absolute top-2 left-2 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity z-10">
        <TarotCornerFlourish className="w-3 h-3 text-purple-400" />
      </div>
      <div className="absolute top-2 right-2 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity rotate-90 z-10">
        <TarotCornerFlourish className="w-3 h-3 text-purple-400" />
      </div>
      <div className="absolute bottom-2 left-2 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity -rotate-90 z-10">
        <TarotCornerFlourish className="w-3 h-3 text-purple-400" />
      </div>
      <div className="absolute bottom-2 right-2 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity rotate-180 z-10">
        <TarotCornerFlourish className="w-3 h-3 text-purple-400" />
      </div>

      {/* Atmospheric Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/40 via-[#0a0316] to-[#040108] -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-32 bg-purple-500/15 rounded-full blur-[45px] pointer-events-none" />

      {src ? (
        // Custom asset image slot
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-center filter contrast-125"
            sizes="(max-width: 640px) 160px, 280px"
          />
        </div>
      ) : variant === "altar" ? (
        // Rich Ceremonial Altar Scene
        <div className="relative w-full h-full flex flex-col items-center justify-between p-1">
          <div className="w-full flex-1 flex items-center justify-center overflow-hidden rounded-lg">
            <OracleAltarScene className="w-full h-full object-cover" />
          </div>
        </div>
      ) : (
        // Ceremonial Canonical Vector Illustration
        <div className="relative w-full h-full flex flex-col items-center justify-between py-2">
          {/* Top Label */}
          <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-mono tracking-[0.24em] text-purple-300/80 uppercase shrink-0">
            <FourPointStar className="w-2.5 h-2.5 text-purple-400" />
            <span>THE SIGHT UNVEILED</span>
            <FourPointStar className="w-2.5 h-2.5 text-purple-400" />
          </div>

          {/* Central Sacred Oracle Silhouette & Third Eye */}
          <div className="relative w-full flex-1 flex items-center justify-center">
            <svg
              viewBox="0 0 160 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full max-h-[170px] text-purple-300"
            >
              <defs>
                {/* Halftone texture */}
                <pattern id="oracle-figure-halftone" width="6" height="6" patternUnits="userSpaceOnUse">
                  <circle cx="3" cy="3" r="0.6" fill="#a855f7" opacity="0.35" />
                </pattern>
                {/* Radial Glow */}
                <radialGradient id="oracle-third-eye-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f3e8ff" stopOpacity="0.8" />
                  <stop offset="40%" stopColor="#c084fc" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#7e22ce" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Halftone aura background */}
              <circle cx="80" cy="80" r="70" fill="url(#oracle-figure-halftone)" />

              {/* Radiant Halo & Concentric Orbital Rings */}
              <circle cx="80" cy="75" r="65" stroke="#7e22ce" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.6" />
              <circle cx="80" cy="75" r="54" stroke="#a855f7" strokeWidth="0.9" opacity="0.75" />
              <circle cx="80" cy="75" r="45" stroke="#c084fc" strokeWidth="0.6" strokeDasharray="2 2" />

              {/* Radiating 12-Ray Celestial Starburst */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 360) / 12;
                return (
                  <line
                    key={i}
                    x1="80"
                    y1="16"
                    x2="80"
                    y2="28"
                    stroke="#e9d5ff"
                    strokeWidth="0.8"
                    transform={`rotate(${angle} 80 75)`}
                    opacity="0.7"
                  />
                );
              })}

              {/* Veiled Cowl & Hood Silhouette */}
              <path
                d="M80 32 C55 32, 42 55, 38 88 C34 122, 28 152, 25 175 L135 175 C132 152, 126 122, 122 88 C118 55, 105 32, 80 32 Z"
                fill="#0d041c"
                stroke="#a855f7"
                strokeWidth="1.2"
              />

              {/* Inner Cowl Shadow Layer */}
              <path
                d="M80 40 C60 40, 50 60, 48 90 C46 118, 42 145, 40 175 L120 175 C118 145, 114 118, 112 90 C110 60, 100 40, 80 40 Z"
                fill="#07020e"
              />

              {/* Draped Cowl Fold Linework */}
              <path d="M52 85 Q70 120 74 175" stroke="#581c87" strokeWidth="0.9" fill="none" />
              <path d="M108 85 Q90 120 86 175" stroke="#581c87" strokeWidth="0.9" fill="none" />
              <path d="M80 40 L80 70" stroke="#7e22ce" strokeWidth="0.75" strokeDasharray="2 2" />

              {/* Crescent Moon Headdress / Diadem */}
              <path
                d="M74 48 A 12 12 0 1 0 86 48 A 9 9 0 1 1 74 48 Z"
                fill="#d8b4fe"
                stroke="#f3e8ff"
                strokeWidth="0.75"
                opacity="0.95"
              />

              {/* The Third Eye (Center of Vision) */}
              <g transform="translate(80, 75)">
                {/* Glow aura */}
                <circle cx="0" cy="0" r="16" fill="url(#oracle-third-eye-glow)" />

                {/* Eye Contour */}
                <path
                  d="M-14 0 C-7 -9, 7 -9, 14 0 C7 9, -7 9, -14 0 Z"
                  fill="#1b0836"
                  stroke="#f3e8ff"
                  strokeWidth="1"
                />

                {/* Iris & Pupil */}
                <circle cx="0" cy="0" r="4.5" fill="#a855f7" stroke="#e9d5ff" strokeWidth="0.7" />
                <circle cx="0" cy="0" r="2" fill="#ffffff" />

                {/* Vertical and Horizontal Focus Marks */}
                <line x1="0" y1="-12" x2="0" y2="-7" stroke="#e9d5ff" strokeWidth="0.8" />
                <line x1="0" y1="12" x2="0" y2="7" stroke="#e9d5ff" strokeWidth="0.8" />
                <line x1="-18" y1="0" x2="-14" y2="0" stroke="#e9d5ff" strokeWidth="0.8" />
                <line x1="18" y1="0" x2="14" y2="0" stroke="#e9d5ff" strokeWidth="0.8" />
              </g>

              {/* Ceremonial Pectoral Altar Sigil */}
              <g transform="translate(80, 130)">
                <circle cx="0" cy="0" r="9" stroke="#c084fc" strokeWidth="0.75" strokeDasharray="2 2" />
                <path d="M0 -7 L5 5 L-5 5 Z" stroke="#e9d5ff" strokeWidth="0.75" fill="none" />
                <circle cx="0" cy="0" r="1.5" fill="#f3e8ff" />
              </g>

              {/* Orbiting Starlight / Dithered Sparks */}
              <circle cx="28" cy="50" r="1.2" fill="#e9d5ff" />
              <circle cx="132" cy="50" r="1.2" fill="#e9d5ff" />
              <circle cx="34" cy="115" r="1" fill="#c084fc" />
              <circle cx="126" cy="115" r="1" fill="#c084fc" />
            </svg>
          </div>

          {/* Bottom Ceremonial Status Bar */}
          <div className="flex items-center gap-2 pt-1 border-t border-purple-900/40 w-full justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_#c084fc]" />
            <span className="text-[9px] font-mono tracking-widest text-purple-300 uppercase">
              ATTENTIVE // READY
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
