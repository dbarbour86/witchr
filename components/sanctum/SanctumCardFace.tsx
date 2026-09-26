import React from "react";
import Image from "next/image";
import { SanctumTarotCard } from "@/content/sanctum-tarot";
import {
  FourPointStar,
  GrimoireStar,
  TarotCornerFlourish,
  CelestialCompassIcon,
  PotionBottleIcon,
  CandleAltarIcon,
  RitualShearsIcon,
} from "@/components/OrnateFrames";
import { CelestialCircle, MatchstickIcon } from "@/components/BrandSymbols";

interface SanctumCardFaceProps {
  card: SanctumTarotCard;
  size?: "default" | "large";
  className?: string;
}

export function SanctumCardFace({ card, size = "large", className = "" }: SanctumCardFaceProps) {
  const isLarge = size === "large";

  // Render card-specific occult ceremonial motif
  const renderCardMotif = () => {
    switch (card.image.motif) {
      case "fool":
        return (
          <div className="relative flex items-center justify-center w-full h-full py-4">
            <CelestialCircle className="w-28 h-28 text-lavender-dim/25 absolute animate-spin-slow opacity-60" />
            <div className="w-20 h-20 rounded-full border border-border-ornate/80 flex items-center justify-center bg-surface-elevated/90 shadow-glow-subtle relative z-10">
              <CelestialCompassIcon className="w-10 h-10 text-lavender-moon" />
            </div>
            <div className="absolute top-2 right-4">
              <FourPointStar className="w-3.5 h-3.5 text-lavender-light" />
            </div>
          </div>
        );

      case "magician":
        return (
          <div className="relative flex items-center justify-center w-full h-full py-4">
            <CelestialCircle className="w-28 h-28 text-lavender-dim/25 absolute" />
            <div className="w-20 h-20 rounded-full border border-border-ornate/80 flex items-center justify-center bg-surface-elevated/90 shadow-glow-subtle relative z-10">
              <PotionBottleIcon className="w-10 h-10 text-lavender-moon" />
            </div>
            <div className="absolute bottom-2 left-4 text-lavender-dim">
              <MatchstickIcon className="w-4 h-4 text-lavender-moon" />
            </div>
          </div>
        );

      case "high-priestess":
        return (
          <div className="relative flex items-center justify-center w-full h-full py-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full border border-dashed border-border-ornate/40" />
            </div>
            <div className="w-20 h-20 rounded-full border border-border-ornate/80 flex items-center justify-center bg-surface-elevated/90 shadow-glow-subtle relative z-10">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor" className="text-lavender-moon">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3.58-.5 5.07-1.38-4.22-.92-7.37-4.68-7.37-9.19 0-4.08 2.61-7.55 6.27-8.83C14.73 2.22 13.4 2 12 2z" />
              </svg>
            </div>
            <div className="absolute top-1 text-lavender-moon">
              <FourPointStar className="w-3 h-3" />
            </div>
          </div>
        );

      case "hermit":
        return (
          <div className="relative flex items-center justify-center w-full h-full py-4">
            <div className="w-28 h-28 rounded-full bg-radial from-lavender/10 to-transparent absolute" />
            <div className="w-20 h-20 rounded-full border border-border-ornate/80 flex items-center justify-center bg-surface-elevated/90 shadow-glow-purple relative z-10">
              <CandleAltarIcon className="w-10 h-10 text-lavender-moon" />
            </div>
            <div className="absolute top-3 right-5 text-lavender-moon">
              <GrimoireStar className="w-4 h-4" />
            </div>
          </div>
        );

      case "death":
        return (
          <div className="relative flex items-center justify-center w-full h-full py-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-26 h-26 rounded-full border border-border-highlight/50" />
            </div>
            <div className="w-20 h-20 rounded-full border border-border-ornate/80 flex items-center justify-center bg-surface-elevated/90 shadow-glow-subtle relative z-10">
              <RitualShearsIcon className="w-10 h-10 text-lavender-moon" />
            </div>
            <div className="absolute bottom-2 text-lavender-dim">
              <FourPointStar className="w-2.5 h-2.5" />
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center w-full h-full">
            <GrimoireStar className="w-10 h-10 text-lavender-moon" />
          </div>
        );
    }
  };

  return (
    <div
      className={`group relative ${
        isLarge ? "w-[260px] sm:w-[280px]" : "w-[200px] sm:w-[220px]"
      } aspect-[2/3] shrink-0 rounded-xl p-3 bg-gradient-to-b from-[#1a142c] via-[#120f20] to-[#07070b] border border-border-ornate shadow-card-tarot flex flex-col justify-between select-none overflow-hidden ${className}`}
    >
      {/* Ornate Corner Flourishes */}
      <div className="absolute top-2 left-2 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
        <TarotCornerFlourish className="w-3.5 h-3.5 text-lavender-moon" />
      </div>
      <div className="absolute top-2 right-2 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity rotate-90">
        <TarotCornerFlourish className="w-3.5 h-3.5 text-lavender-moon" />
      </div>
      <div className="absolute bottom-2 left-2 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity -rotate-90">
        <TarotCornerFlourish className="w-3.5 h-3.5 text-lavender-moon" />
      </div>
      <div className="absolute bottom-2 right-2 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity rotate-180">
        <TarotCornerFlourish className="w-3.5 h-3.5 text-lavender-moon" />
      </div>

      {/* Double Inset Geometric Border */}
      <div className="absolute inset-2 rounded-lg border border-border-ornate/40 pointer-events-none group-hover:border-lavender-moon/40 transition-colors" />
      <div className="absolute inset-3 rounded border border-border-subtle/40 pointer-events-none" />

      {/* Card Header: Numeral & Constellation Dot */}
      <div className="relative z-10 pt-1 text-center flex items-center justify-center gap-2 shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-lavender-moon/60" />
        <span className="font-serif text-sm font-bold tracking-widest text-lavender-moon">
          {card.numeral}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-lavender-moon/60" />
      </div>

      {/* Card Body: Art Image (Future) or Procedural Ceremonial Motif */}
      <div className="relative z-10 flex-1 min-h-0 w-full flex items-center justify-center my-1.5 overflow-hidden rounded-lg bg-background/50 border border-border-subtle/50">
        {card.image?.src ? (
          <Image
            src={card.image.src}
            alt={card.image.alt}
            fill
            sizes={isLarge ? "280px" : "220px"}
            className="object-contain"
          />
        ) : (
          renderCardMotif()
        )}
      </div>

      {/* Card Footer: Name & Arcana Type */}
      <div className="relative z-10 pb-1 px-1 text-center shrink-0 w-full overflow-hidden flex flex-col justify-center min-h-[40px]">
        <h3
          className={`font-display font-bold tracking-wide text-bone group-hover:text-lavender-light transition-colors uppercase leading-tight line-clamp-2 ${
            isLarge ? "text-sm sm:text-base" : "text-xs sm:text-sm"
          }`}
        >
          {card.name}
        </h3>
        <p className="text-[10px] font-mono uppercase tracking-ceremonial text-lavender-dim pt-0.5">
          Major Arcana
        </p>
      </div>
    </div>
  );
}
