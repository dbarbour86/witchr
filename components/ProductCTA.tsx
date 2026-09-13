import React from "react";
import { TarotCornerFlourish, FourPointStar } from "./OrnateFrames";
import { ExternalLink, BookOpen } from "lucide-react";

export interface ProductCTAProps {
  title: string;
  description: string;
  productUrl?: string | null;
  ctaText?: string;
  eyebrow?: string;
  className?: string;
  disabled?: boolean;
}

/**
 * Reusable Product / Field Guide callout designed for future Etsy or digital product monetization.
 * Strictly renders nothing when no real product URL is supplied or when disabled.
 */
export function ProductCTA({
  title,
  description,
  productUrl,
  ctaText = "View on Etsy",
  eyebrow = "Companion Field Guide",
  className = "",
  disabled = false,
}: ProductCTAProps) {
  // Safety rule: Do not render when no active, valid product URL is supplied
  if (disabled || !productUrl || productUrl.trim().length === 0) {
    return null;
  }

  return (
    <aside
      aria-label={title}
      className={`tarot-frame p-6 md:p-8 rounded-2xl relative overflow-hidden bg-surface-elevated/80 border border-border-ornate shadow-card-tarot my-10 ${className}`}
    >
      <div className="absolute top-2.5 left-2.5 pointer-events-none opacity-40">
        <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
      </div>
      <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-40 rotate-90">
        <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-surface border border-border-highlight text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon">
            <FourPointStar className="w-2.5 h-2.5" />
            <span>{eyebrow}</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-bone tracking-wide">
            {title}
          </h3>
          <p className="text-sm text-bone-muted leading-relaxed font-sans">
            {description}
          </p>
        </div>

        <div className="shrink-0">
          <a
            href={productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface-hover hover:bg-surface-elevated border border-border-ornate hover:border-lavender text-lavender-light text-xs font-mono uppercase tracking-ceremonial font-semibold shadow-glow-purple transition-all min-h-[44px]"
          >
            <BookOpen className="w-3.5 h-3.5 text-lavender-moon" />
            <span>{ctaText}</span>
            <ExternalLink className="w-3 h-3 text-lavender-dim" />
          </a>
        </div>
      </div>
    </aside>
  );
}
