import React from "react";
import Image from "next/image";
import { TarotCardPosition } from "@/content/types";
import { TarotCornerFlourish } from "@/components/OrnateFrames";

interface SpreadCardVisualProps {
  position: TarotCardPosition;
  totalPositions: number;
  className?: string;
}

/**
 * SpreadCardVisual
 *
 * Represents an individual physical tarot card position in a spread layout.
 * Features the approved face-down Witchr tarot card-back artwork with
 * standardized 2:3 aspect ratio, fixed responsive width, independent
 * wrapping title, position description, and diagnostic telemetry footer.
 */
export function SpreadCardVisual({
  position,
  totalPositions,
  className = "",
}: SpreadCardVisualProps) {
  return (
    <div
      className={`group relative flex flex-col items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#130726]/95 via-[#0b0416]/95 to-[#05020c] border border-purple-900/60 hover:border-purple-500/80 shadow-[0_6px_25px_rgba(0,0,0,0.7)] hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] transition-all duration-300 w-full max-w-[260px] sm:w-[195px] md:w-[200px] lg:w-[205px] shrink-0 select-none ${className}`}
    >
      {/* Subtle corner flourishes */}
      <div className="absolute top-2 left-2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
        <TarotCornerFlourish className="w-3 h-3 text-purple-400" />
      </div>
      <div className="absolute top-2 right-2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity rotate-90">
        <TarotCornerFlourish className="w-3 h-3 text-purple-400" />
      </div>
      <div className="absolute bottom-2 left-2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity -rotate-90">
        <TarotCornerFlourish className="w-3 h-3 text-purple-400" />
      </div>
      <div className="absolute bottom-2 right-2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity rotate-180">
        <TarotCornerFlourish className="w-3 h-3 text-purple-400" />
      </div>

      {/* Subtle Inset Frame */}
      <div className="absolute inset-1.5 rounded-xl border border-purple-950/70 pointer-events-none group-hover:border-purple-800/40 transition-colors" />

      {/* 1. Header: Position Number Pill */}
      <div className="relative z-10 flex items-center justify-center w-full mb-3 shrink-0">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10061f] border border-purple-800/80 text-[10px] font-mono uppercase tracking-[0.2em] text-purple-300 font-semibold shadow-[0_0_8px_rgba(168,85,247,0.25)]">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_#c084fc]" />
          <span>CARD {position.number.toString().padStart(2, "0")}</span>
        </div>
      </div>

      {/* 2. Physical Face-Down Tarot Card Image */}
      <div className="relative z-10 flex justify-center w-full my-1 shrink-0">
        <div className="relative w-[130px] sm:w-[145px] aspect-[2/3] shrink-0 rounded-lg overflow-hidden border border-purple-800/60 shadow-[0_6px_20px_rgba(0,0,0,0.8)] group-hover:border-purple-400/90 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all duration-300 transform-gpu group-hover:-translate-y-1">
          <Image
            src="/images/sanctum/tarot/back-of-card.png"
            alt={`Card ${position.number} Face Down Tarot Card`}
            fill
            sizes="(max-width: 640px) 130px, 145px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* 3. Text Layout (Title & Description beneath card with clear vertical separation) */}
      <div className="relative z-10 w-full mt-3 pt-3 border-t border-purple-900/40 flex-1 flex flex-col justify-between space-y-2">
        {/* Title: Fixed height container, centered, wraps naturally */}
        <div className="min-h-[40px] flex items-center justify-center px-1 text-center">
          <h4 className="font-serif text-xs sm:text-[13px] font-bold uppercase tracking-wider text-bone group-hover:text-purple-200 transition-colors leading-snug line-clamp-2 break-words">
            {position.name}
          </h4>
        </div>

        {/* Description: Explaining what the drawn card means in this position */}
        <div className="min-h-[48px] flex items-center justify-center px-1 text-center">
          <p className="text-[11px] text-bone-muted font-sans leading-relaxed italic line-clamp-3">
            “{position.question}”
          </p>
        </div>

        {/* 4. Diagnostic Footer */}
        <div className="w-full pt-2 border-t border-purple-900/40 text-[9px] font-mono uppercase tracking-widest text-purple-400/80 flex items-center justify-between px-1 shrink-0">
          <span>Diagnostic</span>
          <span>
            {position.number}/{totalPositions}
          </span>
        </div>
      </div>
    </div>
  );
}
