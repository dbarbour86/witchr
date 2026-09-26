"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FourPointStar, GrimoireStar, TarotCornerFlourish } from "@/components/OrnateFrames";
import { CelestialCircle } from "@/components/BrandSymbols";

interface SanctumCardBackProps {
  label?: string;
  sublabel?: string;
  size?: "default" | "large";
}

export function SanctumCardBack({ label, sublabel, size = "default" }: SanctumCardBackProps) {
  const [imageError, setImageError] = useState(false);
  const isLarge = size === "large";
  const widthClass = isLarge ? "w-[260px] sm:w-[280px]" : "w-[200px] sm:w-[220px]";

  return (
    <div className={`flex flex-col items-center gap-2.5 ${widthClass}`}>
      <div
        className={`group relative ${widthClass} aspect-[2/3] shrink-0 rounded-xl overflow-hidden border border-border-ornate shadow-card-tarot hover:border-lavender-moon/80 hover:shadow-glow-purple transition-all duration-300 select-none bg-surface`}
      >
        {!imageError ? (
          <Image
            src="/images/sanctum/tarot/back-of-card.png"
            alt="Face Down Witchr Tarot Card Back"
            fill
            sizes={isLarge ? "280px" : "220px"}
            className="object-cover"
            priority
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full p-3 bg-gradient-to-b from-surface-elevated via-surface to-[#0a0812] flex flex-col items-center justify-between">
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
            <div className="pt-1 text-lavender-dim group-hover:text-lavender-moon transition-colors shrink-0">
              <FourPointStar className="w-2.5 h-2.5" />
            </div>

            {/* Card Center Occult Back Pattern */}
            <div className="relative flex items-center justify-center w-full flex-1 min-h-0 py-2">
              <CelestialCircle className="w-24 h-24 text-lavender-dim/20 absolute group-hover:scale-105 group-hover:text-lavender/35 transition-all duration-500" />
              <div className="w-16 h-16 rounded-full border border-border-ornate/60 flex items-center justify-center bg-background/60 shadow-subtle group-hover:border-lavender-moon transition-colors">
                <GrimoireStar className="w-7 h-7 text-lavender-moon shadow-glow-purple" />
              </div>
            </div>

            {/* Bottom Arcane Glyph */}
            <div className="pb-1 text-lavender-dim group-hover:text-lavender-moon transition-colors shrink-0">
              <FourPointStar className="w-2.5 h-2.5" />
            </div>
          </div>
        )}
      </div>

      {/* Card Label & Sublabel */}
      {label && (
        <div className="w-full text-center space-y-0.5 px-1 shrink-0 overflow-hidden">
          <h4 className="font-serif text-sm font-semibold text-bone tracking-wide group-hover:text-lavender-light truncate">
            {label}
          </h4>
          {sublabel && (
            <p className="text-[11px] font-mono uppercase tracking-wider text-bone-dim line-clamp-2 leading-tight">
              {sublabel}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
