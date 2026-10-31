"use client";

import React, { useState, useEffect } from "react";
import { getSanctumProgress, SanctumProgress, INITIAL_SANCTUM_PROGRESS } from "@/lib/sanctum/progression";
import { FourPointStar } from "@/components/OrnateFrames";
import { Flame } from "lucide-react";

export function SanctumStreakBadge() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState<SanctumProgress>(INITIAL_SANCTUM_PROGRESS);

  useEffect(() => {
    setMounted(true);
    setProgress(getSanctumProgress());

    const handleProgressUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<SanctumProgress>;
      if (customEvent.detail) {
        setProgress(customEvent.detail);
      } else {
        setProgress(getSanctumProgress());
      }
    };

    window.addEventListener("sanctum:progress-updated", handleProgressUpdate);
    window.addEventListener("sanctum:date-simulated", handleProgressUpdate);
    window.addEventListener("storage", handleProgressUpdate);

    return () => {
      window.removeEventListener("sanctum:progress-updated", handleProgressUpdate);
      window.removeEventListener("sanctum:date-simulated", handleProgressUpdate);
      window.removeEventListener("storage", handleProgressUpdate);
    };
  }, []);

  const streak = mounted ? progress.currentStreak : 0;
  const longest = mounted ? progress.longestStreak : 0;

  // Correct singular/plural grammar
  const streakFullLabel =
    streak === 1 ? "1 DAY IN THE SANCTUM" : `${streak} DAYS IN THE SANCTUM`;
  const streakShortLabel =
    streak === 1 ? "1 day" : `${streak} days`;

  const ariaDescription =
    longest > 1
      ? `Current activity streak: ${streak} ${streak === 1 ? "day" : "days"}. Longest streak: ${longest} days.`
      : `Current activity streak: ${streak} ${streak === 1 ? "day" : "days"}.`;

  return (
    <div
      className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-surface border border-border-ornate/40 shadow-subtle group transition-colors hover:border-border-highlight shrink-0"
      title={ariaDescription}
      role="status"
      aria-label={ariaDescription}
    >
      {/* Mobile: Warm Amber Flame Icon */}
      <Flame className={`w-3.5 h-3.5 text-amber-400 sm:hidden shrink-0 ${streak > 0 ? "animate-pulse" : "opacity-70"}`} />

      {/* Desktop: Celestial Star Icon */}
      <FourPointStar className={`hidden sm:inline-block w-3 h-3 text-lavender-moon shrink-0 ${streak > 0 ? "animate-pulse" : "opacity-60"}`} />

      {/* Mobile: Shortened "1 day" */}
      <span className="sm:hidden text-[11px] font-mono font-bold tracking-wider text-purple-200 whitespace-nowrap">
        {streakShortLabel}
      </span>

      {/* Desktop: Full "1 DAY IN THE SANCTUM" */}
      <span className="hidden sm:inline text-[11px] uppercase tracking-ceremonial font-semibold text-lavender-light whitespace-nowrap">
        {streakFullLabel}
      </span>

      {longest > 1 && (
        <span className="hidden md:inline text-[10px] font-mono text-bone-dim pl-1 border-l border-border-subtle">
          BEST: {longest}
        </span>
      )}
    </div>
  );
}
