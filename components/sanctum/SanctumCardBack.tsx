import React from "react";
import { FourPointStar, GrimoireStar, TarotCornerFlourish } from "@/components/OrnateFrames";
import { CelestialCircle } from "@/components/BrandSymbols";

interface SanctumCardBackProps {
  label?: string;
  sublabel?: string;
  size?: "default" | "large";
}

export function SanctumCardBack({ label, sublabel, size = "default" }: SanctumCardBackProps) {
  const isLarge = size === "large";

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`group relative w-full ${
          isLarge ? "max-w-[280px] h-[420px]" : "max-w-[220px] h-[340px]"
        } rounded-xl p-3 bg-gradient-to-b from-surface-elevated via-surface to-[#0a0812] border border-border-ornate shadow-card-tarot hover:border-lavender-moon/80 hover:shadow-glow-purple transition-all duration-300 flex flex-col items-center justify-between select-none`}
      >
        {/* Ornate Corner Flourishes */}
        <div className="absolute top-2 left-2 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity">
          <TarotCornerFlourish className="w-3.5 h-3.5 text-lavender-moon" />
        </div>
        <div className="absolute top-2 right-2 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity rotate-90">
          <TarotCornerFlourish className="w-3.5 h-3.5 text-lavender-moon" />
        </div>
        <div className="absolute bottom-2 left-2 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity -rotate-90">
          <TarotCornerFlourish className="w-3.5 h-3.5 text-lavender-moon" />
        </div>
        <div className="absolute bottom-2 right-2 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity rotate-180">
          <TarotCornerFlourish className="w-3.5 h-3.5 text-lavender-moon" />
        </div>

        {/* Double Inset Geometric Border */}
        <div className="absolute inset-2 rounded-lg border border-border-highlight/50 pointer-events-none group-hover:border-lavender/30 transition-colors" />
        <div className="absolute inset-3 rounded border border-border-subtle/30 pointer-events-none" />

        {/* Top Arcane Glyph */}
        <div className="pt-2 text-lavender-dim group-hover:text-lavender-moon transition-colors">
          <FourPointStar className="w-2.5 h-2.5" />
        </div>

        {/* Card Center Occult Back Pattern */}
        <div className="relative flex items-center justify-center w-full py-6">
          <CelestialCircle className="w-24 h-24 text-lavender-dim/20 absolute group-hover:scale-105 group-hover:text-lavender/35 transition-all duration-500" />
          <div className="w-16 h-16 rounded-full border border-border-ornate/60 flex items-center justify-center bg-background/60 shadow-subtle group-hover:border-lavender-moon transition-colors">
            <GrimoireStar className="w-7 h-7 text-lavender-moon shadow-glow-purple" />
          </div>
        </div>

        {/* Bottom Arcane Glyph */}
        <div className="pb-2 text-lavender-dim group-hover:text-lavender-moon transition-colors">
          <FourPointStar className="w-2.5 h-2.5" />
        </div>
      </div>

      {/* Card Label & Sublabel */}
      {label && (
        <div className="text-center space-y-0.5">
          <h4 className="font-serif text-sm font-semibold text-bone tracking-wide group-hover:text-lavender-light">
            {label}
          </h4>
          {sublabel && (
            <p className="text-[11px] font-mono uppercase tracking-wider text-bone-dim">
              {sublabel}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
