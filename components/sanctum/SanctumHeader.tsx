import React from "react";
import Link from "next/link";
import { FourPointStar, GrimoireStar, TarotCornerFlourish } from "@/components/OrnateFrames";
import { CelestialCircle } from "@/components/BrandSymbols";
import { Sparkles, ArrowLeft, Shield } from "lucide-react";
import { SanctumStreakBadge } from "@/components/sanctum/SanctumStreakBadge";
import { SanctumPrivateTestBanner } from "@/components/sanctum/SanctumPrivateTestBanner";

interface SanctumHeaderProps {
  currentSection?: string;
  showBackToSanctum?: boolean;
}

export function SanctumHeader({ currentSection, showBackToSanctum = false }: SanctumHeaderProps) {
  return (
    <div className="relative mb-10 pb-6 border-b border-border-subtle">
      {/* Private Test Banner with Feedback & Debrief Access */}
      <SanctumPrivateTestBanner />

      {/* Subtle Terminal Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-bone-dim mb-6">
        <div className="flex items-center gap-2">
          {showBackToSanctum ? (
            <Link
              href="/sanctum"
              className="inline-flex items-center gap-1.5 text-lavender-moon hover:text-lavender-light transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span className="uppercase tracking-ceremonial text-[11px]">Return to Sanctum Hub</span>
            </Link>
          ) : (
            <span className="flex items-center gap-1.5 uppercase tracking-ceremonial text-[11px] text-lavender-dim">
              <span className="w-1.5 h-1.5 rounded-full bg-lavender-moon animate-pulse shadow-glow-purple" />
              <span>Sanctum Chamber // Private Grimoire</span>
            </span>
          )}
          {currentSection && (
            <>
              <span className="text-border-ornate">/</span>
              <span className="text-bone-muted uppercase tracking-wideDisplay text-[11px]">{currentSection}</span>
            </>
          )}
        </div>

        {/* Real Local Progression Streak Area */}
        <SanctumStreakBadge />
      </div>

      {/* Oracle Identity & Emblem Area */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="relative group shrink-0">
          <div className="w-14 h-14 rounded-2xl bg-surface-elevated border border-border-highlight flex items-center justify-center shadow-glow-subtle relative overflow-hidden">
            <CelestialCircle className="w-16 h-16 text-lavender/30 absolute group-hover:rotate-45 transition-transform duration-700 ease-out" />
            <GrimoireStar className="w-6 h-6 text-lavender-moon relative z-10" />
            <div className="absolute top-1 left-1 opacity-50">
              <TarotCornerFlourish className="w-2.5 h-2.5 text-lavender-dim" />
            </div>
            <div className="absolute bottom-1 right-1 opacity-50 rotate-180">
              <TarotCornerFlourish className="w-2.5 h-2.5 text-lavender-dim" />
            </div>
          </div>
        </div>

        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-[10px] font-mono uppercase tracking-ceremonial text-lavender-moon">
              The Digital Oracle
            </span>
            <span className="text-bone-dim text-[10px]">·</span>
            <span className="text-[10px] font-mono text-bone-dim tracking-wider uppercase">
              Sanctum MVP v0.1
            </span>
          </div>
          <p className="text-xs text-bone-muted max-w-xl font-sans leading-relaxed">
            A cloistered occult space for diagnostic tarot draws, intentional working synthesis, and private reflection.
          </p>
        </div>
      </div>
    </div>
  );
}
