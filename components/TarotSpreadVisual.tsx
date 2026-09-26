import React from "react";
import { TarotCardPosition } from "@/content/types";
import { FourPointStar, TarotCornerFlourish } from "./OrnateFrames";

interface TarotSpreadVisualProps {
  positions: TarotCardPosition[];
}

export function TarotSpreadVisual({ positions }: TarotSpreadVisualProps) {
  return (
    <div className="my-10 p-6 md:p-8 rounded-2xl bg-surface/90 border border-border-highlight relative overflow-hidden shadow-card-tarot">
      <div className="text-center mb-8 space-y-1">
        <span className="text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center justify-center gap-1.5">
          <FourPointStar className="w-2.5 h-2.5" />
          <span>Occult Deck Architecture</span>
          <FourPointStar className="w-2.5 h-2.5" />
        </span>
        <h3 className="font-display text-2xl md:text-3xl text-bone">
          Card Placement & Diagnostic Inquiries
        </h3>
      </div>

      <div
        className={`grid gap-5 justify-center ${
          positions.length === 3
            ? "grid-cols-1 sm:grid-cols-3 max-w-3xl mx-auto"
            : positions.length === 4
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4 max-w-4xl mx-auto"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-5xl mx-auto"
        }`}
      >
        {positions.map((pos) => (
          <div
            key={pos.number}
            className="group relative w-full max-w-[200px] aspect-[2/3] mx-auto flex flex-col justify-between p-4 rounded-xl border border-border-ornate/60 bg-gradient-to-b from-surface-elevated via-surface to-[#0a0812] hover:border-lavender-moon/80 hover:shadow-glow-purple transition-all duration-300 shadow-card-tarot select-none overflow-hidden"
          >
            {/* Ornate corner marks */}
            <div className="absolute top-2 left-2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
              <TarotCornerFlourish className="w-3 h-3 text-lavender-moon" />
            </div>
            <div className="absolute top-2 right-2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity rotate-90">
              <TarotCornerFlourish className="w-3 h-3 text-lavender-moon" />
            </div>
            <div className="absolute bottom-2 left-2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity -rotate-90">
              <TarotCornerFlourish className="w-3 h-3 text-lavender-moon" />
            </div>
            <div className="absolute bottom-2 right-2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity rotate-180">
              <TarotCornerFlourish className="w-3 h-3 text-lavender-moon" />
            </div>

            {/* Inset Border */}
            <div className="absolute inset-1.5 rounded-lg border border-border-subtle/30 pointer-events-none" />

            {/* Position Header with numeral */}
            <div className="relative z-10 flex items-center justify-between border-b border-border-subtle/40 pb-1.5 shrink-0">
              <span className="font-mono text-xs text-lavender-moon font-semibold flex items-center gap-1">
                <span>Card {pos.number}</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-lavender-moon shadow-glow-purple" />
            </div>

            {/* Card Content: Title & Question */}
            <div className="relative z-10 flex-1 min-h-0 flex flex-col justify-center my-1 text-center px-1 overflow-hidden">
              <h4 className="font-serif text-xs sm:text-sm font-semibold text-bone group-hover:text-lavender-light transition-colors leading-snug line-clamp-2">
                {pos.name}
              </h4>
              <p className="text-[11px] text-bone-muted mt-1 leading-relaxed italic line-clamp-3">
                “{pos.question}”
              </p>
            </div>

            {/* Diagnostic Footer */}
            <div className="relative z-10 pt-1.5 border-t border-border-subtle/40 text-[9px] font-mono uppercase tracking-wider text-bone-dim flex items-center justify-between shrink-0">
              <span>Diagnostic</span>
              <span>{pos.number}/{positions.length}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
