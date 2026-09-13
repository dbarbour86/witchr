import React from "react";
import { CandleAltarIcon, TarotCornerFlourish, FourPointStar } from "./OrnateFrames";

interface PracticalActionCalloutProps {
  action: string;
  category?: string;
}

export function PracticalActionCallout({ action }: PracticalActionCalloutProps) {
  return (
    <aside
      aria-label="Practical Real-World Action"
      className="my-12 p-6 md:p-8 rounded-xl border border-border-ornate bg-gradient-to-br from-surface-elevated/90 via-surface to-background relative overflow-hidden shadow-card-tarot"
    >
      {/* Corner Filigree */}
      <div className="absolute top-2.5 left-2.5 pointer-events-none opacity-60">
        <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
      </div>
      <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-60 rotate-90">
        <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
      </div>
      <div className="absolute bottom-2.5 left-2.5 pointer-events-none opacity-60 -rotate-90">
        <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
      </div>
      <div className="absolute bottom-2.5 right-2.5 pointer-events-none opacity-60 180">
        <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
      </div>

      <div className="flex items-start gap-4 sm:gap-5">
        <div className="p-3 rounded-lg bg-background/80 text-lavender-moon shrink-0 mt-0.5 border border-border-highlight shadow-glow-subtle">
          <CandleAltarIcon className="w-6 h-6 text-lavender-moon" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FourPointStar className="w-2.5 h-2.5 text-lavender-moon" />
            <span className="text-[11px] font-mono tracking-ceremonial uppercase text-lavender-moon font-semibold">
              Witchr Signature Principle
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-bone font-medium tracking-tight">
            Now do something in the real world.
          </h2>
          <p className="text-lavender-light text-base md:text-lg leading-relaxed pt-1 font-sans">
            {action}
          </p>
          <p className="text-xs text-bone-dim pt-2 border-t border-border-subtle/80 font-mono">
            A ritual without earthly action is just wishful thinking. Ground the intention before the clock runs out on today.
          </p>
        </div>
      </div>
    </aside>
  );
}
