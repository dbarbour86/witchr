import React from "react";
import { TarotCardPosition } from "@/content/types";
import { FourPointStar } from "./OrnateFrames";
import { SpreadCardVisual } from "./tarot/SpreadCardVisual";

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
        <p className="text-xs text-bone-dim font-sans max-w-lg mx-auto pt-1">
          Lay your physical tarot deck face down according to the positions below.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 sm:gap-7 lg:gap-8 items-stretch">
        {positions.map((pos) => (
          <SpreadCardVisual
            key={pos.number}
            position={pos}
            totalPositions={positions.length}
          />
        ))}
      </div>
    </div>
  );
}

