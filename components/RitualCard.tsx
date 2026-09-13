import React from "react";
import Link from "next/link";
import { Ritual } from "@/content/types";
import { TarotCornerFlourish, FourPointStar } from "./OrnateFrames";
import { Clock, Feather, ArrowUpRight } from "lucide-react";

interface RitualCardProps {
  ritual: Ritual;
  featured?: boolean;
}

export function RitualCard({ ritual, featured = false }: RitualCardProps) {
  const categoryBadgeMap: Record<string, { badge: string; symbol: string }> = {
    Money: { badge: "border-emerald-700/40 bg-emerald-950/20 text-emerald-300", symbol: "✦" },
    Protection: { badge: "border-border-ornate bg-surface-elevated text-lavender-moon", symbol: "☽" },
    Confidence: { badge: "border-amber-700/40 bg-amber-950/20 text-amber-300", symbol: "☼" },
    Love: { badge: "border-rose-700/40 bg-rose-950/20 text-rose-300", symbol: "♡" },
    "Letting Go": { badge: "border-plum bg-surface text-lavender-light", symbol: "✂" },
    Direction: { badge: "border-sky-700/40 bg-sky-950/20 text-sky-300", symbol: "☩" },
  };

  const catStyle = categoryBadgeMap[ritual.category] || {
    badge: "border-border bg-surface text-bone-muted",
    symbol: "✧",
  };

  return (
    <article
      className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-xl border bg-surface/90 hover:bg-surface-elevated/90 transition-all duration-300 shadow-card hover:shadow-card-tarot hover:border-lavender/50 ${
        featured ? "border-border-ornate" : "border-border"
      }`}
    >
      {/* Ornate corner star flourishes */}
      <div className="absolute top-2.5 left-2.5 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
        <TarotCornerFlourish className="w-4 h-4 text-lavender-dim" />
      </div>
      <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity rotate-90">
        <TarotCornerFlourish className="w-4 h-4 text-lavender-dim" />
      </div>
      <div className="absolute bottom-2.5 left-2.5 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity -rotate-90">
        <TarotCornerFlourish className="w-4 h-4 text-lavender-dim" />
      </div>
      <div className="absolute bottom-2.5 right-2.5 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity 180">
        <TarotCornerFlourish className="w-4 h-4 text-lavender-dim" />
      </div>

      <div>
        {/* Category Badge & Duration */}
        <div className="flex items-center justify-between gap-2 mb-4 pt-1">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10.5px] font-mono uppercase tracking-wideDisplay border ${catStyle.badge}`}
          >
            <span>{catStyle.symbol}</span>
            <span>{ritual.category}</span>
          </span>
          <div className="flex items-center gap-2.5 text-xs font-mono text-bone-dim">
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-lavender-dim" />
              {ritual.estimatedTime}
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Feather className="w-3.5 h-3.5 text-lavender-dim" />
              {ritual.difficulty}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl sm:text-2xl font-semibold text-bone group-hover:text-lavender-light transition-colors leading-snug tracking-tight">
          <Link href={`/rituals/${ritual.slug}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {ritual.title}
          </Link>
        </h3>

        {/* Hook */}
        <p className="mt-3 text-sm text-bone-muted leading-relaxed line-clamp-3">
          {ritual.hook}
        </p>
      </div>

      {/* Footer Meta */}
      <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between text-xs text-bone-dim">
        <span className="flex items-center gap-1">
          <FourPointStar className="w-2.5 h-2.5 text-lavender-dim opacity-70" />
          <span>{ritual.supplies.length} ritual items</span>
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wideDisplay text-lavender group-hover:text-lavender-light transition-colors">
          <span>Perform</span>
          <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
      </div>
    </article>
  );
}
