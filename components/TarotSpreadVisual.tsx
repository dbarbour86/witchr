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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {positions.map((pos) => (
          <div
            key={pos.number}
            className="group relative flex flex-col justify-between p-5 rounded-xl border border-border-ornate/60 bg-gradient-to-b from-surface-elevated to-surface hover:border-lavender/70 transition-all duration-300 shadow-card hover:shadow-glow-subtle min-h-[190px]"
          >
            {/* Ornate corner marks */}
            <div className="absolute top-2 left-2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
              <TarotCornerFlourish className="w-3 h-3 text-lavender-moon" />
            </div>
            <div className="absolute top-2 right-2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity rotate-90">
              <TarotCornerFlourish className="w-3 h-3 text-lavender-moon" />
            </div>

            {/* Position Header with Roman/Arabic numeral */}
            <div className="flex items-center justify-between border-b border-border-subtle pb-2.5 mb-2">
              <span className="font-mono text-xs text-lavender-moon font-semibold flex items-center gap-1">
                <span>Card {pos.number}</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-lavender-moon shadow-glow-purple" />
            </div>

            <div>
              <h4 className="font-serif text-sm font-semibold text-bone group-hover:text-lavender-light transition-colors leading-snug">
                {pos.name}
              </h4>
              <p className="text-xs text-bone-muted mt-2 leading-relaxed italic">
                “{pos.question}”
              </p>
            </div>

            <div className="pt-2.5 mt-2 border-t border-border-subtle/50 text-[10px] font-mono uppercase tracking-wider text-bone-dim flex items-center justify-between">
              <span>Diagnostic</span>
              <span>{pos.number}/{positions.length}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
