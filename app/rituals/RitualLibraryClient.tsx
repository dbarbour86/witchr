"use client";

import React, { useState } from "react";
import { Ritual } from "@/content/types";
import { RitualCard } from "@/components/RitualCard";
import { RitualFilterBar } from "@/components/RitualFilterBar";

interface RitualLibraryClientProps {
  rituals: Ritual[];
}

export function RitualLibraryClient({ rituals }: RitualLibraryClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "Money",
    "Protection",
    "Confidence",
    "Love",
    "Letting Go",
    "Direction",
  ];

  const filteredRituals =
    activeCategory === "All"
      ? rituals
      : rituals.filter(
          (r) => r.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <div className="space-y-8">
      {/* Category Filter Toolbar */}
      <div className="border-b border-border-subtle pb-4">
        <RitualFilterBar
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          categories={categories}
        />
      </div>

      {/* Ritual Count / Meta Status */}
      <div className="flex items-center justify-between text-xs font-mono uppercase tracking-ceremonial text-bone-dim">
        <span>
          Showing {filteredRituals.length} {filteredRituals.length === 1 ? "ritual" : "rituals"}
          {activeCategory !== "All" && ` in ${activeCategory}`}
        </span>
        {activeCategory !== "All" && (
          <button
            type="button"
            onClick={() => setActiveCategory("All")}
            className="hover:text-lavender-light text-lavender underline"
          >
            Reset filter
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRituals.map((ritual) => (
          <RitualCard key={ritual.slug} ritual={ritual} />
        ))}
      </div>
    </div>
  );
}
