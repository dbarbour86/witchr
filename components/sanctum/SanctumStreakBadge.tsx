"use client";

import React, { useState, useEffect } from "react";
import { getSanctumProgress, SanctumProgress, INITIAL_SANCTUM_PROGRESS } from "@/lib/sanctum/progression";
import { FourPointStar } from "@/components/OrnateFrames";

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
  const streakLabel =
    streak === 1 ? "1 DAY IN THE SANCTUM" : `${streak} DAYS IN THE SANCTUM`;

  const ariaDescription =
    longest > 1
      ? `Current activity streak: ${streak} ${streak === 1 ? "day" : "days"}. Longest streak: ${longest} days.`
      : `Current activity streak: ${streak} ${streak === 1 ? "day" : "days"}.`;

  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border-ornate/40 shadow-subtle group transition-colors hover:border-border-highlight"
      title={ariaDescription}
      role="status"
      aria-label={ariaDescription}
    >
      <FourPointStar className={`w-3 h-3 text-lavender-moon ${streak > 0 ? "animate-pulse" : "opacity-60"}`} />
      <span className="text-[11px] uppercase tracking-ceremonial font-semibold text-lavender-light">
        {streakLabel}
      </span>
      {longest > 1 && (
        <span className="hidden sm:inline text-[10px] font-mono text-bone-dim pl-1 border-l border-border-subtle">
          BEST: {longest}
        </span>
      )}
    </div>
  );
}
