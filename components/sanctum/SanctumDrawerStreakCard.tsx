"use client";

import React, { useState, useEffect } from "react";
import { getSanctumProgress, SanctumProgress, INITIAL_SANCTUM_PROGRESS } from "@/lib/sanctum/progression";
import { Flame } from "lucide-react";

export function SanctumDrawerStreakCard() {
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
  const best = mounted ? progress.longestStreak : 0;

  const currentLabel = `${streak}-${streak === 1 ? "day" : "day"} streak`;
  const bestLabel = `Best streak: ${best} ${best === 1 ? "day" : "days"}`;

  return (
    <div className="w-full p-3.5 sm:p-4 rounded-xl bg-[#0e041d] border border-purple-800/60 flex items-center gap-3.5 sm:gap-4 transition-colors">
      {/* Flame Icon Container with rounded square outline */}
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#1c0836] border border-purple-700/60 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.2)]">
        <Flame className={`w-6 h-6 text-amber-400 ${streak > 0 ? "animate-pulse" : "opacity-75"}`} />
      </div>

      {/* Text Stack */}
      <div className="flex flex-col min-w-0 flex-1 leading-snug">
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-purple-300/80 font-medium">
          YOUR PRACTICE
        </span>
        <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white capitalize break-words">
          {currentLabel}
        </span>
        <span className="text-xs font-mono text-purple-300/70 pt-0.5 break-words">
          {bestLabel}
        </span>
      </div>
    </div>
  );
}

