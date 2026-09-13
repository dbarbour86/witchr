import React from "react";

export function GrimoireStar({ className = "w-4 h-4 text-lavender" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0L14.2 8.8L23 11L14.2 13.2L12 22L9.8 13.2L1 11L9.8 8.8Z" />
      <circle cx="12" cy="11" r="1.5" fill="#07070b" />
    </svg>
  );
}

export function FourPointStar({ className = "w-3 h-3 text-lavender-moon" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path d="M10 0L12 7.5L19.5 9.5L12 11.5L10 19L8 11.5L0.5 9.5L8 7.5Z" />
    </svg>
  );
}

export function TarotCornerFlourish({ className = "w-5 h-5 text-lavender-dim" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2 22V6C2 3.79 3.79 2 6 2H22" />
      <path d="M6 6H12M6 6V12" opacity="0.6" />
      <circle cx="6" cy="6" r="1.5" fill="currentColor" stroke="none" />
      <path d="M2 2L4 4" />
    </svg>
  );
}

export function CelestialDivider({ className = "w-full my-6 text-lavender-dim" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-border-highlight to-border-ornate" />
      <div className="flex items-center gap-2 px-2 text-lavender">
        {/* Waxing crescent */}
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 opacity-70">
          <path d="M8 1a7 7 0 1 0 7 7c0-3.86-3.14-7-7-7zm0 12.5A5.5 5.5 0 0 1 8 2.5a6.96 6.96 0 0 1 4.5 1.66A5.5 5.5 0 0 1 8 13.5z" />
        </svg>
        {/* Full moon with inner star */}
        <div className="relative flex items-center justify-center">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-lavender-light">
            <circle cx="10" cy="10" r="8" />
          </svg>
          <FourPointStar className="w-2.5 h-2.5 text-surface absolute" />
        </div>
        {/* Waning crescent */}
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 opacity-70">
          <path d="M8 1a7 7 0 1 1-7 7c0-3.86 3.14-7 7-7zm0 12.5A5.5 5.5 0 0 0 8 2.5a6.96 6.96 0 0 0-4.5 1.66A5.5 5.5 0 0 0 8 13.5z" />
        </svg>
      </div>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-border-highlight to-border-ornate" />
    </div>
  );
}

export function MoonPhaseRibbon({ className = "w-full my-4 text-lavender" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 sm:gap-6 py-3 ${className}`} aria-hidden="true">
      {/* New Moon */}
      <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-4 h-4">
          <circle cx="10" cy="10" r="7.5" strokeDasharray="2 2" />
        </svg>
        <span className="text-[9px] font-mono tracking-wider uppercase text-bone-dim hidden sm:inline">New</span>
      </div>

      {/* Waxing Crescent */}
      <div className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path d="M10 2a8 8 0 1 0 8 8c0-4.42-3.58-8-8-8zm0 14.5A6.5 6.5 0 0 1 10 3.5a8.2 8.2 0 0 1 5.3 1.95A6.5 6.5 0 0 1 10 16.5z" />
        </svg>
        <span className="text-[9px] font-mono tracking-wider uppercase text-bone-dim hidden sm:inline">Waxing</span>
      </div>

      {/* Full Moon */}
      <div className="flex flex-col items-center gap-1 text-lavender-moon scale-110">
        <div className="p-1 rounded-full border border-lavender/40 shadow-glow-purple">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <circle cx="10" cy="10" r="7.5" />
          </svg>
        </div>
        <span className="text-[9px] font-mono tracking-wider uppercase text-lavender-light font-semibold hidden sm:inline">Full</span>
      </div>

      {/* Waning Crescent */}
      <div className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path d="M10 2a8 8 0 1 1-8 8c0-4.42 3.58-8 8-8zm0 14.5A6.5 6.5 0 0 0 10 3.5a8.2 8.2 0 0 0-5.3 1.95A6.5 6.5 0 0 0 10 16.5z" />
        </svg>
        <span className="text-[9px] font-mono tracking-wider uppercase text-bone-dim hidden sm:inline">Waning</span>
      </div>

      {/* Dark Moon */}
      <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-30">
          <circle cx="10" cy="10" r="7" />
        </svg>
        <span className="text-[9px] font-mono tracking-wider uppercase text-bone-dim hidden sm:inline">Dark</span>
      </div>
    </div>
  );
}

export function RavenIcon({ className = "w-6 h-6 text-lavender" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Raven perched head & body */}
      <path d="M19 8C19 6 17 4 14 4C11.5 4 9 5.5 8 8C7 10.5 7 14 6 18L3 21" />
      <path d="M14 4L21 6L18 8.5" />
      <circle cx="15.5" cy="5.5" r="0.75" fill="currentColor" stroke="none" />
      {/* Wing feathers */}
      <path d="M9 10C11 13 14 15 17 14" />
      <path d="M8 14C10 17 13 18 15 17" />
      <path d="M7 17L10 21" />
      {/* Tiny moon hanging from beak */}
      <path d="M21 7C22 7.5 22 9 21 9.5C20.5 9 20.5 7.5 21 7Z" fill="currentColor" />
    </svg>
  );
}

export function PotionBottleIcon({ className = "w-6 h-6 text-lavender" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Cork */}
      <rect x="10" y="2" width="4" height="2" rx="0.5" fill="currentColor" />
      {/* Neck */}
      <path d="M9 4H15V7L19 12C20.5 14 20 18 18 20C16 22 8 22 6 20C4 18 3.5 14 5 12L9 7V4Z" />
      {/* Liquid level with star */}
      <path d="M6.5 14C8.5 13 15.5 13 17.5 14" strokeDasharray="1 2" />
      <circle cx="12" cy="17" r="1.5" fill="currentColor" stroke="none" />
      {/* Rising smoke wisp */}
      <path d="M12 2C11 0.5 13 0 12 -1" opacity="0.5" />
    </svg>
  );
}

export function CrystalClusterIcon({ className = "w-6 h-6 text-lavender" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Main central spire */}
      <polygon points="12,2 16,7 15,20 9,20 8,7" />
      <line x1="12" y1="2" x2="12" y2="20" opacity="0.6" />
      {/* Left crystal point */}
      <polygon points="6,9 9,12 8,20 4,20 4,13" />
      {/* Right crystal point */}
      <polygon points="18,9 20,13 20,20 16,20 15,12" />
      {/* Base facets */}
      <line x1="3" y1="21" x2="21" y2="21" strokeWidth="1.5" />
      <circle cx="12" cy="6" r="1" fill="currentColor" />
    </svg>
  );
}

export function RitualShearsIcon({ className = "w-6 h-6 text-lavender" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Ornate scissor blades */}
      <path d="M6 18C4 16 4 13 6 11L18 3" />
      <path d="M18 18C20 16 20 13 18 11L6 3" />
      {/* Center ornate screw */}
      <circle cx="12" cy="7" r="1.5" fill="currentColor" />
      {/* Finger loop left */}
      <circle cx="6" cy="18" r="3" />
      {/* Finger loop right */}
      <circle cx="18" cy="18" r="3" />
      {/* Severed cord wisp */}
      <path d="M12 11L12 15M10 13L14 13" opacity="0.5" strokeDasharray="1 2" />
    </svg>
  );
}

export function CandleAltarIcon({ className = "w-6 h-6 text-lavender" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Candle pillar */}
      <rect x="9" y="9" width="6" height="13" rx="0.5" />
      {/* Wax drip */}
      <path d="M11 9V12C11 12.5 12 12.5 12 12V9" fill="currentColor" stroke="none" />
      {/* Wick */}
      <line x1="12" y1="9" x2="12" y2="6.5" />
      {/* Flame */}
      <path
        d="M12 2C10.5 4.2 9.5 5.5 12 6.5C14.5 5.5 13.5 4.2 12 2Z"
        fill="currentColor"
      />
      {/* Star aura around flame */}
      <circle cx="12" cy="4.5" r="0.8" fill="#07070b" />
      {/* Altar base */}
      <line x1="6" y1="22" x2="18" y2="22" strokeWidth="1.8" />
    </svg>
  );
}

export function CelestialCompassIcon({ className = "w-6 h-6 text-lavender" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" strokeDasharray="2 3" opacity="0.6" />
      <circle cx="12" cy="12" r="6" />
      {/* Needle */}
      <polygon points="12,4 14,12 12,11 10,12" fill="currentColor" />
      <polygon points="12,20 14,12 12,13 10,12" opacity="0.6" />
      <circle cx="12" cy="12" r="1.5" fill="#07070b" />
      {/* Cardinal stars */}
      <circle cx="12" cy="1" r="0.75" fill="currentColor" />
      <circle cx="12" cy="23" r="0.75" fill="currentColor" />
      <circle cx="1" cy="12" r="0.75" fill="currentColor" />
      <circle cx="23" cy="12" r="0.75" fill="currentColor" />
    </svg>
  );
}
