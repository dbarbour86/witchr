"use client";

import React from "react";

interface RitualFilterBarProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  categories: string[];
}

export function RitualFilterBar({
  activeCategory,
  onSelectCategory,
  categories,
}: RitualFilterBarProps) {
  return (
    <div
      role="toolbar"
      aria-label="Filter rituals by category"
      className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar"
    >
      {categories.map((category) => {
        const isActive = activeCategory.toLowerCase() === category.toLowerCase();
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2.5 rounded-lg text-xs md:text-sm font-mono uppercase tracking-wideDisplay transition-all whitespace-nowrap min-h-[44px] flex items-center justify-center border ${
              isActive
                ? "bg-surface-elevated text-lavender-light border-border-ornate shadow-glow-subtle font-semibold"
                : "bg-surface text-bone-muted hover:text-bone border-border hover:border-border-highlight hover:bg-surface-elevated"
            }`}
            aria-pressed={isActive}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
