import React from "react";
import Link from "next/link";
import { FourPointStar } from "@/components/OrnateFrames";
import { ArrowRight, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 md:py-32 text-center space-y-6">
      <div className="inline-flex p-4 rounded-full bg-surface border border-border-highlight text-lavender-moon mx-auto shadow-glow-purple">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3.58-.5 5.07-1.38-4.22-.92-7.37-4.68-7.37-9.19 0-4.08 2.61-7.55 6.27-8.83C14.73 2.22 13.4 2 12 2z" />
        </svg>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-dim flex items-center justify-center gap-1.5">
          <FourPointStar className="w-2.5 h-2.5" />
          <span>Arcanum 404 · Void Space</span>
          <FourPointStar className="w-2.5 h-2.5" />
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-bone tracking-wide">
          Whatever you were looking for has vanished.
        </h1>
      </div>

      <p className="text-bone-muted text-base md:text-lg max-w-md mx-auto leading-relaxed font-sans">
        The page has either dissolved into smoke, expired, or was never cast. Try searching with what’s bothering you instead.
      </p>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/spell-finder"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-surface-elevated hover:bg-surface-hover text-lavender-light border border-border-ornate hover:border-lavender font-mono text-xs uppercase tracking-ceremonial font-semibold shadow-glow-subtle transition-all min-h-[44px]"
        >
          <span>Open Spell Finder</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/rituals"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-surface hover:bg-surface-elevated border border-border text-bone font-mono text-xs uppercase tracking-ceremonial transition-colors min-h-[44px]"
        >
          <Compass className="w-4 h-4 text-lavender-moon" />
          <span>Browse Ritual Library</span>
        </Link>
      </div>
    </div>
  );
}
