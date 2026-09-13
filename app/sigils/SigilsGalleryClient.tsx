"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sigil } from "@/content/types";
import { SigilVisual } from "@/components/SigilVisual";
import { TarotCornerFlourish, FourPointStar } from "@/components/OrnateFrames";
import { X, ArrowRight, Eye } from "lucide-react";

interface SigilsGalleryClientProps {
  sigils: Sigil[];
}

export function SigilsGalleryClient({ sigils }: SigilsGalleryClientProps) {
  const [selectedSigil, setSelectedSigil] = useState<Sigil | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "Protection",
    "Confidence",
    "Money",
    "Letting Go",
    "Direction",
    "Love",
  ];

  const filteredSigils =
    activeCategory === "All"
      ? sigils
      : sigils.filter((s) => s.category.toLowerCase() === activeCategory.toLowerCase());

  const hubMap: Record<string, string> = {
    Protection: "/protection",
    Confidence: "/confidence",
    Money: "/money",
    "Letting Go": "/letting-go",
    Direction: "/direction",
    Love: "/love",
  };

  return (
    <div className="space-y-8">
      {/* Category Pills */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar border-b border-border-subtle">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wideDisplay transition-colors whitespace-nowrap min-h-[44px] ${
              activeCategory.toLowerCase() === cat.toLowerCase()
                ? "bg-surface-elevated text-lavender-light border border-border-ornate shadow-glow-subtle font-semibold"
                : "bg-surface text-bone-muted hover:text-bone hover:bg-surface-elevated border border-border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sigil Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSigils.map((sigil) => (
          <div
            key={sigil.id}
            className="tarot-frame group p-6 flex flex-col justify-between text-center"
          >
            <div className="space-y-4 flex flex-col items-center">
              <div className="p-5 rounded-xl bg-background border border-border-highlight shadow-glow-subtle w-full flex items-center justify-center">
                <SigilVisual id={sigil.id} className="w-24 h-24 text-lavender-light group-hover:text-lavender-moon transition-colors" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-ceremonial text-lavender-dim">
                  {sigil.category}
                </span>
                <h2 className="font-serif text-xl font-semibold text-bone">
                  {sigil.name}
                </h2>
                <p className="text-sm text-bone-muted italic leading-relaxed pt-1 font-serif">
                  “{sigil.intention}”
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-center">
              <button
                type="button"
                onClick={() => setSelectedSigil(sigil)}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-bone-dim hover:text-lavender-light transition-colors min-h-[44px]"
              >
                <Eye className="w-3.5 h-3.5 text-lavender-dim" />
                <span>Examine mark</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Focus View Modal */}
      {selectedSigil && (
        <div
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sigil-modal-title"
        >
          <div className="relative w-full max-w-lg rounded-2xl bg-gradient-to-b from-surface-elevated via-surface to-background border border-border-ornate p-6 sm:p-8 shadow-card-tarot space-y-6">
            {/* Corner Filigree */}
            <div className="absolute top-3 left-3 pointer-events-none opacity-50">
              <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
            </div>
            <div className="absolute top-3 right-3 pointer-events-none opacity-50 rotate-90">
              <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
            </div>

            <button
              type="button"
              onClick={() => setSelectedSigil(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-bone-dim hover:text-lavender-light hover:bg-surface-elevated transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center justify-center gap-1.5">
                <FourPointStar className="w-2.5 h-2.5" />
                <span>{selectedSigil.category}</span>
                <FourPointStar className="w-2.5 h-2.5" />
              </span>
              <h3 id="sigil-modal-title" className="font-display text-2xl md:text-3xl font-bold text-bone tracking-wide">
                {selectedSigil.name}
              </h3>
            </div>

            <div className="p-8 rounded-xl bg-background border border-border-highlight flex items-center justify-center shadow-glow-purple">
              <SigilVisual id={selectedSigil.id} className="w-44 h-44 text-lavender-light" />
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-ceremonial text-lavender-dim">
                  Plain-English Intention
                </h4>
                <p className="font-serif text-lg text-lavender-light italic mt-1 leading-relaxed">
                  “{selectedSigil.intention}”
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-ceremonial text-lavender-dim">
                  Suggestion for Use
                </h4>
                <p className="text-sm text-bone-muted mt-1 leading-relaxed font-sans">
                  {selectedSigil.suggestion}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link
                href={hubMap[selectedSigil.category] || "/rituals"}
                onClick={() => setSelectedSigil(null)}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-ceremonial text-lavender hover:text-lavender-light min-h-[44px]"
              >
                <span>View related {selectedSigil.category} hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setSelectedSigil(null)}
                className="px-5 py-2.5 rounded-lg bg-surface-elevated text-bone hover:bg-border text-xs font-mono uppercase tracking-wider transition-colors min-h-[44px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
