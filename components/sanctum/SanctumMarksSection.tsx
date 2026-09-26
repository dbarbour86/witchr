"use client";

import React, { useState, useEffect } from "react";
import {
  getSanctumProgress,
  getUpcomingMilestone,
  SANCTUM_BADGES,
  SANCTUM_REWARD_MILESTONES,
  SanctumProgress,
  SanctumBadge,
  INITIAL_SANCTUM_PROGRESS,
} from "@/lib/sanctum/progression";
import {
  FourPointStar,
  CelestialDivider,
  TarotCornerFlourish,
  GrimoireStar,
} from "@/components/OrnateFrames";
import {
  Sparkles,
  Flame,
  Award,
  CheckCircle2,
  Lock,
  Compass,
  Wand2,
  BookOpen,
  Calendar,
  Gift,
} from "lucide-react";

/**
 * Bespoke Occult Sigil Emblems for each of the 7 Sanctum Marks
 */
function BadgeSigil({ sigilType, isUnlocked }: { sigilType: string; isUnlocked: boolean }) {
  const strokeClass = isUnlocked ? "stroke-lavender-light" : "stroke-bone-dim";
  const fillClass = isUnlocked ? "fill-lavender-moon/20" : "fill-transparent";

  switch (sigilType) {
    case "first-draw":
      // Single Arcana / Radiant Eye Sigil
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <circle cx="20" cy="20" r="16" className={`${strokeClass} opacity-40`} strokeWidth="1" />
          <polygon points="20,8 23,17 32,20 23,23 20,32 17,23 8,20 17,17" className={`${strokeClass} ${fillClass}`} strokeWidth="1.2" />
          <circle cx="20" cy="20" r="3" className={isUnlocked ? "fill-lavender-moon" : "fill-bone-dim"} />
        </svg>
      );
    case "the-triad":
      // Sacred Triad / Trinity Sigil
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <circle cx="20" cy="20" r="16" className={`${strokeClass} opacity-40`} strokeWidth="1" />
          <polygon points="20,10 30,28 10,28" className={`${strokeClass} ${fillClass}`} strokeWidth="1.2" />
          <polygon points="20,30 10,12 30,12" className={`${strokeClass} opacity-30`} strokeWidth="1" />
          <circle cx="20" cy="20" r="2.5" className={isUnlocked ? "fill-lavender-moon" : "fill-bone-dim"} />
        </svg>
      );
    case "first-working":
      // Consecrated Mortar & Herb Sigil
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <circle cx="20" cy="20" r="16" className={`${strokeClass} opacity-40`} strokeWidth="1" />
          <path d="M12 22 C12 28, 28 28, 28 22 Z" className={`${strokeClass} ${fillClass}`} strokeWidth="1.2" />
          <line x1="20" y1="9" x2="20" y2="21" className={strokeClass} strokeWidth="1.5" />
          <circle cx="20" cy="9" r="2" className={isUnlocked ? "fill-lavender-moon" : "fill-bone-dim"} />
          <path d="M16 15 C18 13, 22 13, 24 15" className={strokeClass} strokeWidth="1" />
        </svg>
      );
    case "seven-nights":
      // Heptagram / Seven Moons Sigil
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <circle cx="20" cy="20" r="16" className={`${strokeClass} opacity-40`} strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="20" cy="20" r="10" className={`${strokeClass} ${fillClass}`} strokeWidth="1.2" />
          <polygon points="20,6 23,16 33,18 25,24 27,34 19,28 13,33 15,23 7,18 17,16" className={`${strokeClass} opacity-70`} strokeWidth="1" />
          <circle cx="20" cy="20" r="3" className={isUnlocked ? "fill-lavender-moon" : "fill-bone-dim"} />
        </svg>
      );
    case "seeker":
      // Radiant Ocular Compass Sigil
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <circle cx="20" cy="20" r="16" className={`${strokeClass} opacity-40`} strokeWidth="1" />
          <circle cx="20" cy="20" r="8" className={`${strokeClass} ${fillClass}`} strokeWidth="1" />
          <line x1="20" y1="4" x2="20" y2="36" className={strokeClass} strokeWidth="1" strokeDasharray="2 2" />
          <line x1="4" y1="20" x2="36" y2="20" className={strokeClass} strokeWidth="1" strokeDasharray="2 2" />
          <polygon points="20,14 22,20 20,26 18,20" className={isUnlocked ? "fill-lavender-moon" : "fill-bone-dim"} />
        </svg>
      );
    case "grimoire-keeper":
      // Radiant Tome Sigil
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <circle cx="20" cy="20" r="16" className={`${strokeClass} opacity-40`} strokeWidth="1" />
          <path d="M12 12 L20 15 L28 12 L28 28 L20 30 L12 28 Z" className={`${strokeClass} ${fillClass}`} strokeWidth="1.2" />
          <line x1="20" y1="15" x2="20" y2="30" className={strokeClass} strokeWidth="1.2" />
          <circle cx="20" cy="9" r="1.5" className={isUnlocked ? "fill-lavender-moon" : "fill-bone-dim"} />
        </svg>
      );
    case "pathworker":
      // Interwoven Alchemical Seal
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <circle cx="20" cy="20" r="16" className={`${strokeClass} opacity-40`} strokeWidth="1" />
          <circle cx="20" cy="20" r="11" className={`${strokeClass} ${fillClass}`} strokeWidth="1" />
          <polygon points="20,9 30,26 10,26" className={strokeClass} strokeWidth="1.2" />
          <polygon points="20,31 30,14 10,14" className={`${strokeClass} opacity-50`} strokeWidth="1" />
          <circle cx="20" cy="20" r="2.5" className={isUnlocked ? "fill-lavender-moon" : "fill-bone-dim"} />
        </svg>
      );
    default:
      return <Sparkles className="w-6 h-6 text-lavender-moon" />;
  }
}

export function SanctumMarksSection() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState<SanctumProgress>(INITIAL_SANCTUM_PROGRESS);

  const syncProgress = () => {
    setProgress(getSanctumProgress());
  };

  useEffect(() => {
    setMounted(true);
    syncProgress();

    const handleUpdate = () => syncProgress();
    window.addEventListener("sanctum:progress-updated", handleUpdate);
    window.addEventListener("sanctum:date-simulated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("sanctum:progress-updated", handleUpdate);
      window.removeEventListener("sanctum:date-simulated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const curStreak = mounted ? progress.currentStreak : 0;
  const bestStreak = mounted ? progress.longestStreak : 0;
  const totalActs = mounted ? progress.totalActivities : 0;
  const unlockedBadges = mounted ? progress.unlockedBadges : [];
  const claimedRewards = mounted ? progress.claimedRewards : [];

  const upcoming = getUpcomingMilestone(progress);

  return (
    <section className="space-y-8 tarot-frame p-6 sm:p-10 shadow-card-tarot relative overflow-hidden" aria-labelledby="sanctum-marks-heading">
      {/* Decorative occult corner flourishes */}
      <div className="absolute top-2.5 left-2.5 pointer-events-none opacity-40">
        <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
      </div>
      <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-40 rotate-90">
        <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
      </div>

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">
            <FourPointStar className="w-3 h-3" />
            <span>Progression & Sanctum Discipline</span>
          </div>
          <h2 id="sanctum-marks-heading" className="text-2xl sm:text-3xl font-display font-bold text-bone tracking-wide celestial-glow">
            SANCTUM MARKS
          </h2>
          <p className="text-xs sm:text-sm text-bone-muted font-sans leading-relaxed max-w-xl">
            Marks earned through intentional practice. Streaks track consecutive active days within the chamber, unlocking occult marks and practical ritual privileges.
          </p>
        </div>

        {/* Real-time streak summary badge */}
        <div className="flex items-center gap-3 bg-surface p-3 rounded-xl border border-border-ornate/60 shrink-0">
          <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-border-highlight flex items-center justify-center text-lavender-moon">
            <Flame className={`w-5 h-5 ${curStreak > 0 ? "text-rust animate-pulse motion-reduce:animate-none" : "text-bone-dim"}`} />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-ceremonial text-bone-dim">Active Inquest</div>
            <div className="text-sm font-mono font-bold text-bone">
              {curStreak === 1 ? "1 DAY" : `${curStreak} DAYS`}
              <span className="text-[11px] text-bone-dim font-normal ml-1.5 font-sans">
                (Longest: {bestStreak}d)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: Current Streak */}
        <div className="p-4 rounded-xl bg-surface/80 border border-border-subtle space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            <span>Current Streak</span>
          </div>
          <div className="text-2xl font-mono font-bold text-bone">
            {curStreak} <span className="text-xs font-normal text-bone-dim">{curStreak === 1 ? "Day" : "Days"}</span>
          </div>
          <div className="text-[11px] text-bone-dim font-serif italic">
            {curStreak > 0 ? "Consecutive chamber presence." : "Begin with today's draw or working."}
          </div>
        </div>

        {/* Metric 2: Longest Streak */}
        <div className="p-4 rounded-xl bg-surface/80 border border-border-subtle space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
            <Award className="w-3 h-3" />
            <span>Chamber Record</span>
          </div>
          <div className="text-2xl font-mono font-bold text-bone">
            {bestStreak} <span className="text-xs font-normal text-bone-dim">{bestStreak === 1 ? "Day" : "Days"}</span>
          </div>
          <div className="text-[11px] text-bone-dim font-serif italic">
            Preserved permanently across breaks.
          </div>
        </div>

        {/* Metric 3: Total Completed Activities */}
        <div className="p-4 rounded-xl bg-surface/80 border border-border-subtle space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Total Inquests</span>
          </div>
          <div className="text-2xl font-mono font-bold text-bone">
            {totalActs} <span className="text-xs font-normal text-bone-dim">Completions</span>
          </div>
          <div className="text-[11px] text-bone-dim font-mono">
            {progress.totalDailyTarot} Daily · {progress.totalThreeCardReadings} Triad · {progress.totalWorkings} Workings
          </div>
        </div>
      </div>

      {/* Upcoming Milestone Scaffolding Card */}
      <div className="p-5 rounded-xl bg-surface-elevated/80 border border-border-ornate space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-ceremonial text-lavender-moon font-semibold">
            <Gift className="w-4 h-4 text-lavender-moon shrink-0" />
            <span>Next Sanctum Milestone</span>
          </div>
          {upcoming.nextMilestone && (
            <div className="text-xs font-mono text-lavender-light">
              <span className="font-bold">{curStreak}</span> / {upcoming.targetStreak} Days
            </div>
          )}
        </div>

        {upcoming.nextMilestone ? (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm text-bone">
              <div>
                <span className="font-bold tracking-wide font-display">{upcoming.nextMilestone.rewardCopy}</span>
                <span className="text-bone-muted font-sans ml-2 text-xs">
                  ({upcoming.remainingDays} more {upcoming.remainingDays === 1 ? "active day" : "active days"} to reach the {upcoming.nextMilestone.title})
                </span>
              </div>
            </div>

            {/* Subtle Ceremonial Progress Track */}
            <div className="w-full h-1.5 rounded-full bg-surface border border-border-subtle overflow-hidden" role="progressbar" aria-valuenow={curStreak} aria-valuemin={0} aria-valuemax={upcoming.targetStreak}>
              <div
                className="h-full bg-gradient-to-r from-lavender-dim to-lavender-moon transition-all duration-500 ease-out"
                style={{ width: `${Math.round(upcoming.progressRatio * 100)}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="text-xs font-mono text-lavender-light flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-lavender-moon" />
            <span>All primary Sanctum streak milestones achieved. Your dedication is woven into the ledger.</span>
          </div>
        )}

        {/* Milestone Rewards Status Grid */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-border-subtle/60 text-xs">
          {SANCTUM_REWARD_MILESTONES.map((milestone) => {
            const isClaimed = claimedRewards.includes(milestone.id);
            return (
              <div
                key={milestone.id}
                className={`p-3 rounded-lg border flex items-center justify-between gap-3 ${
                  isClaimed
                    ? "bg-surface border-border-highlight text-bone"
                    : "bg-surface/50 border-border-subtle/50 text-bone-dim"
                }`}
              >
                <div>
                  <div className="font-mono uppercase tracking-wider text-[11px] font-semibold text-lavender-moon">
                    {milestone.title} ({milestone.streakRequirement}d)
                  </div>
                  <div className="text-xs font-display font-bold mt-0.5">{milestone.rewardCopy}</div>
                </div>
                <div className="shrink-0 text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border">
                  {isClaimed ? (
                    <span className="text-lavender-light border-border-ornate/60 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3 h-3 text-lavender-moon" />
                      EARNED
                    </span>
                  ) : (
                    <span className="text-bone-dim border-border-subtle flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      LOCKED
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Collection Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border-subtle pb-2">
          <div className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
            <GrimoireStar className="w-3 h-3" />
            <span>Sacred Marks ({unlockedBadges.length} / {SANCTUM_BADGES.length} Unlocked)</span>
          </div>
          <span className="text-[11px] font-mono text-bone-dim">Local Archival Record</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list" aria-label="Sanctum achievement badges">
          {SANCTUM_BADGES.map((badge) => {
            const isUnlocked = unlockedBadges.includes(badge.id);

            return (
              <div
                key={badge.id}
                role="listitem"
                className={`relative p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between gap-4 ${
                  isUnlocked
                    ? "bg-surface-elevated/90 border-border-ornate shadow-glow-subtle hover:border-lavender-moon"
                    : "bg-surface/40 border-border-subtle/60 opacity-65 hover:opacity-80"
                }`}
              >
                {/* Top Row: Sigil & Unlock Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className={`p-2 rounded-lg border ${
                    isUnlocked
                      ? "bg-surface border-border-highlight shadow-subtle"
                      : "bg-surface/50 border-border-subtle/50"
                  }`}>
                    <BadgeSigil sigilType={badge.sigilType} isUnlocked={isUnlocked} />
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest font-semibold border ${
                      isUnlocked
                        ? "bg-lavender-dim/20 text-lavender-light border-border-ornate"
                        : "bg-surface text-bone-dim border-border-subtle"
                    }`}
                  >
                    {isUnlocked ? (
                      <>
                        <FourPointStar className="w-2 h-2 text-lavender-moon" />
                        <span>UNLOCKED</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-2 h-2 text-bone-dim" />
                        <span>LOCKED</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Middle: Title & Requirement */}
                <div className="space-y-1">
                  <h3 className={`font-display text-base font-bold tracking-wide ${
                    isUnlocked ? "text-bone" : "text-bone-muted"
                  }`}>
                    {badge.name}
                  </h3>
                  <p className="text-xs text-bone-dim font-sans leading-relaxed">
                    {badge.requirement}
                  </p>
                </div>

                {/* Bottom: Occult description / quote */}
                <div className={`pt-2 border-t text-[11px] font-serif italic ${
                  isUnlocked
                    ? "border-border-subtle text-lavender-moon/90"
                    : "border-border-subtle/40 text-bone-dim"
                }`}>
                  “{badge.description}”
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Privacy Notice Reminder */}
      <div className="p-4 rounded-xl bg-surface/40 border border-border-subtle text-xs text-bone-muted leading-relaxed font-sans flex items-start gap-2.5">
        <FourPointStar className="w-3.5 h-3.5 text-lavender-moon shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-bone font-mono uppercase tracking-wider text-[11px]">Sanctum Privacy Notice: </span>
          Saved Grimoire entries, activity streaks, and marks remain stored in this browser. When you ask the Oracle to interpret a spread or formulate a working, only the specific cards, question, or approved ingredients for that inquiry are sent securely to Witchr&apos;s server-side AI oracle. Sanctum does not store your reading history in the cloud or transmit unrelated browser data.
        </div>
      </div>
    </section>
  );
}
