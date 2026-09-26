"use client";

import React, { useState, useEffect } from "react";
import {
  getSanctumProgress,
  recordSanctumActivity,
  advanceSimulatedDateDevOnly,
  clearSimulatedDateDevOnly,
  resetSanctumProgressDevOnly,
  getEffectiveLocalDateString,
  SanctumProgress,
  INITIAL_SANCTUM_PROGRESS,
  SANCTUM_DEV_SIMULATED_DATE_KEY,
} from "@/lib/sanctum/progression";
import { Wrench, ChevronDown, ChevronUp, Calendar, RefreshCw, Zap, Sparkles, Wand2, Compass } from "lucide-react";

export function SanctumDevPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState<SanctumProgress>(INITIAL_SANCTUM_PROGRESS);
  const [effectiveDate, setEffectiveDate] = useState<string>("");
  const [isSimulated, setIsSimulated] = useState<boolean>(false);
  const [notice, setNotice] = useState<string | null>(null);

  // In production builds, this component is never active
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const syncState = () => {
    setProgress(getSanctumProgress());
    const dateStr = getEffectiveLocalDateString();
    setEffectiveDate(dateStr);
    const hasOverride = !!localStorage.getItem(SANCTUM_DEV_SIMULATED_DATE_KEY);
    setIsSimulated(hasOverride);
  };

  useEffect(() => {
    setMounted(true);
    syncState();

    const handleUpdate = () => syncState();
    window.addEventListener("sanctum:progress-updated", handleUpdate);
    window.addEventListener("sanctum:date-simulated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("sanctum:progress-updated", handleUpdate);
      window.removeEventListener("sanctum:date-simulated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleSimulateDailyTarot = () => {
    const today = getEffectiveLocalDateString();
    const result = recordSanctumActivity({
      type: "daily",
      id: `sim_daily_${today}_${Math.random().toString(36).substring(2, 7)}`,
      title: "Simulated Daily Tarot",
    });
    syncState();
    showNotice(result.alreadyProcessed ? "Activity already recorded for this ID." : "Daily Tarot recorded.");
  };

  const handleSimulateThreeCard = () => {
    recordSanctumActivity({
      type: "three-card",
      id: `sim_three_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: "Simulated Three-Card Reading",
    });
    syncState();
    showNotice("Three-Card reading recorded.");
  };

  const handleSimulateWorking = () => {
    recordSanctumActivity({
      type: "working",
      id: `sim_working_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: "Simulated Practical Working",
    });
    syncState();
    showNotice("Valid Working recorded.");
  };

  const handleAdvanceOneDay = () => {
    const newDate = advanceSimulatedDateDevOnly(1);
    syncState();
    showNotice(`Date advanced +1 day: ${newDate}`);
  };

  const handleAdvanceTwoDays = () => {
    const newDate = advanceSimulatedDateDevOnly(2);
    syncState();
    showNotice(`Date advanced +2 days (missed day): ${newDate}`);
  };

  const handleFastForwardSevenDays = () => {
    // Sequentially advance 7 days and complete an activity each day
    let curDate = effectiveDate;
    for (let i = 0; i < 7; i++) {
      curDate = advanceSimulatedDateDevOnly(1);
      recordSanctumActivity({
        type: "daily",
        id: `ff_streak_${curDate}_${Math.random().toString(36).substring(2, 7)}`,
        customDate: curDate,
        title: "Fast-Forward Daily Draw",
      });
    }
    syncState();
    showNotice("Fast-forwarded 7 consecutive days! Check badges and rewards.");
  };

  const handleClearDateOverride = () => {
    clearSimulatedDateDevOnly();
    syncState();
    showNotice("Date override cleared (returned to real clock).");
  };

  const handleResetProgress = () => {
    resetSanctumProgressDevOnly();
    syncState();
    showNotice("Progression state completely reset.");
  };

  if (!mounted) return null;

  return (
    <aside
      className="fixed bottom-3 right-3 z-50 max-w-sm w-full font-mono text-xs shadow-2xl"
      aria-label="Development Progression Controls"
    >
      {/* Collapsed Bar / Trigger Button */}
      <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-elevated/95 border border-border-highlight backdrop-blur-md">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-lavender-light hover:text-bone transition-colors cursor-pointer"
          aria-expanded={isOpen}
          aria-label="Toggle Sanctum Dev Lab"
        >
          <Wrench className="w-3.5 h-3.5 text-rust animate-pulse" />
          <span className="font-semibold uppercase tracking-wider text-[11px]">
            Sanctum Dev Lab
          </span>
          <span className="text-bone-dim">·</span>
          <span className="text-bone-dim text-[10px]">
            {progress.currentStreak}d streak ({effectiveDate})
          </span>
        </button>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 text-bone-dim hover:text-bone transition-colors"
          aria-label="Collapse dev lab"
        >
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded Controls Drawer */}
      {isOpen && (
        <div className="mt-2 p-4 rounded-xl bg-surface-elevated/95 border border-border-ornate shadow-glow-purple backdrop-blur-md space-y-3.5">
          {/* Status Overview */}
          <div className="p-2.5 rounded-lg bg-surface border border-border-subtle space-y-1 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-bone-dim">Effective Date:</span>
              <span className={`font-semibold ${isSimulated ? "text-rust" : "text-bone"}`}>
                {effectiveDate} {isSimulated ? "(Simulated)" : "(Live)"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-bone-dim">Streak (Current / Best):</span>
              <span className="text-lavender-light font-semibold">
                {progress.currentStreak}d / {progress.longestStreak}d
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-bone-dim">Activities Total:</span>
              <span className="text-bone">
                {progress.totalActivities} (D:{progress.totalDailyTarot} 3C:{progress.totalThreeCardReadings} W:{progress.totalWorkings})
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-bone-dim">Badges / Rewards:</span>
              <span className="text-lavender-moon font-semibold">
                {progress.unlockedBadges.length}/7 marks · {progress.claimedRewards.length}/2 rewards
              </span>
            </div>
            {notice && (
              <div className="pt-1.5 border-t border-border-subtle text-lavender-light italic animate-in fade-in">
                {notice}
              </div>
            )}
          </div>

          {/* Action Simulation Group */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-wider text-lavender-moon block font-semibold">
              Simulate Activity Completion
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={handleSimulateDailyTarot}
                className="p-1.5 rounded bg-surface hover:bg-surface-hover text-bone border border-border-subtle text-[10px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <Sparkles className="w-2.5 h-2.5 text-lavender-moon" />
                <span>+Daily</span>
              </button>
              <button
                type="button"
                onClick={handleSimulateThreeCard}
                className="p-1.5 rounded bg-surface hover:bg-surface-hover text-bone border border-border-subtle text-[10px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <Compass className="w-2.5 h-2.5 text-lavender-moon" />
                <span>+Triad</span>
              </button>
              <button
                type="button"
                onClick={handleSimulateWorking}
                className="p-1.5 rounded bg-surface hover:bg-surface-hover text-bone border border-border-subtle text-[10px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <Wand2 className="w-2.5 h-2.5 text-lavender-moon" />
                <span>+Working</span>
              </button>
            </div>
          </div>

          {/* Calendar Advance Group */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-wider text-lavender-moon block font-semibold">
              Simulate Calendar Passage
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={handleAdvanceOneDay}
                className="p-1.5 rounded bg-surface hover:bg-surface-hover text-bone border border-border-subtle text-[10px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <Calendar className="w-2.5 h-2.5 text-lavender-light" />
                <span>+1 Day (Consecutive)</span>
              </button>
              <button
                type="button"
                onClick={handleAdvanceTwoDays}
                className="p-1.5 rounded bg-surface hover:bg-surface-hover text-rust border border-rust/30 text-[10px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <Calendar className="w-2.5 h-2.5" />
                <span>+2 Days (Miss Day)</span>
              </button>
            </div>
          </div>

          {/* Fast-Forward / Macro Group */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-wider text-lavender-moon block font-semibold">
              Scenarios & Reset
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              <button
                type="button"
                onClick={handleFastForwardSevenDays}
                className="p-1.5 rounded bg-surface hover:bg-surface-hover text-lavender-light border border-border-ornate text-[10px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Zap className="w-3 h-3 text-lavender-moon" />
                <span>Fast-Forward 7-Day Streak & Rewards</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button
                type="button"
                onClick={handleClearDateOverride}
                disabled={!isSimulated}
                className="p-1.5 rounded bg-surface hover:bg-surface-hover text-bone-muted disabled:opacity-40 border border-border-subtle text-[10px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                <span>Clear Date Override</span>
              </button>
              <button
                type="button"
                onClick={handleResetProgress}
                className="p-1.5 rounded bg-surface hover:bg-rust/20 text-rust border border-rust/40 text-[10px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                <span>Reset All Progress</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
