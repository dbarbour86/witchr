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
  Shield,
} from "lucide-react";

/**
 * Bespoke Occult Sigil Emblems for each of the 7 Sanctum Marks
 */
function BadgeSigil({ sigilType, isUnlocked }: { sigilType: string; isUnlocked: boolean }) {
  const strokeClass = isUnlocked ? "stroke-purple-300" : "stroke-purple-900/60";
  const fillClass = isUnlocked ? "fill-purple-600/30" : "fill-transparent";

  switch (sigilType) {
    case "first-draw":
      // Single Arcana / Radiant Eye Sigil
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <circle cx="20" cy="20" r="16" className={`${strokeClass} opacity-40`} strokeWidth="1" />
          <polygon points="20,8 23,17 32,20 23,23 20,32 17,23 8,20 17,17" className={`${strokeClass} ${fillClass}`} strokeWidth="1.2" />
          <circle cx="20" cy="20" r="3" className={isUnlocked ? "fill-purple-300" : "fill-purple-900/60"} />
        </svg>
      );
    case "the-triad":
      // Sacred Triad / Trinity Sigil
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <circle cx="20" cy="20" r="16" className={`${strokeClass} opacity-40`} strokeWidth="1" />
          <polygon points="20,10 30,28 10,28" className={`${strokeClass} ${fillClass}`} strokeWidth="1.2" />
          <polygon points="20,30 10,12 30,12" className={`${strokeClass} opacity-30`} strokeWidth="1" />
          <circle cx="20" cy="20" r="2.5" className={isUnlocked ? "fill-purple-300" : "fill-purple-900/60"} />
        </svg>
      );
    case "first-working":
      // Consecrated Mortar & Herb Sigil
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <circle cx="20" cy="20" r="16" className={`${strokeClass} opacity-40`} strokeWidth="1" />
          <path d="M12 22 C12 28, 28 28, 28 22 Z" className={`${strokeClass} ${fillClass}`} strokeWidth="1.2" />
          <line x1="20" y1="9" x2="20" y2="21" className={strokeClass} strokeWidth="1.5" />
          <circle cx="20" cy="9" r="2" className={isUnlocked ? "fill-purple-300" : "fill-purple-900/60"} />
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
          <circle cx="20" cy="20" r="3" className={isUnlocked ? "fill-purple-300" : "fill-purple-900/60"} />
        </svg>
      );
    case "seeker":
      // Celestial Compass Sigil
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <circle cx="20" cy="20" r="16" className={`${strokeClass} opacity-40`} strokeWidth="1" />
          <line x1="20" y1="4" x2="20" y2="36" className={strokeClass} strokeWidth="1" />
          <line x1="4" y1="20" x2="36" y2="20" className={strokeClass} strokeWidth="1" />
          <polygon points="20,11 23,20 20,29 17,20" className={`${strokeClass} ${fillClass}`} strokeWidth="1.2" />
        </svg>
      );
    case "alchemist":
      // Alchemical Caduceus Seal
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <circle cx="20" cy="20" r="16" className={`${strokeClass} opacity-40`} strokeWidth="1" />
          <path d="M14 16 Q20 22 26 16 Q20 28 14 34" className={strokeClass} strokeWidth="1.2" />
          <path d="M26 16 Q20 22 14 16 Q20 28 26 34" className={strokeClass} strokeWidth="1.2" />
          <circle cx="20" cy="11" r="3" className={isUnlocked ? "fill-purple-300" : "fill-purple-900/60"} />
        </svg>
      );
    case "adept":
      // Grand Ouroboros / Infinite Seal
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <circle cx="20" cy="20" r="16" className={`${strokeClass} opacity-50`} strokeWidth="1.5" />
          <circle cx="20" cy="20" r="11" className={`${strokeClass} ${fillClass}`} strokeWidth="1.2" strokeDasharray="4 2" />
          <polygon points="20,14 26,24 14,24" className={strokeClass} strokeWidth="1.2" />
          <circle cx="20" cy="20" r="2" className={isUnlocked ? "fill-purple-300" : "fill-purple-900/60"} />
        </svg>
      );
    default:
      return <Award className={`w-8 h-8 ${isUnlocked ? "text-purple-300" : "text-purple-900/60"}`} />;
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
    <section
      id="marks"
      className="space-y-8 sanctum-panel sanctum-corners p-6 sm:p-9 border border-purple-900/60 relative overflow-hidden"
      aria-labelledby="sanctum-marks-heading"
    >
      {/* Decorative occult corner flourishes */}
      <div className="absolute top-2 left-2 pointer-events-none opacity-40">
        <TarotCornerFlourish className="w-4 h-4 text-purple-400" />
      </div>
      <div className="absolute top-2 right-2 pointer-events-none opacity-40 rotate-90">
        <TarotCornerFlourish className="w-4 h-4 text-purple-400" />
      </div>

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-900/40 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-purple-300">
            <FourPointStar className="w-3 h-3 text-purple-400" />
            <span>Chamber Progression & Discipline</span>
          </div>
          <h2
            id="sanctum-marks-heading"
            className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200 tracking-wide uppercase"
          >
            Sanctum Marks & Streaks
          </h2>
          <p className="text-xs sm:text-sm text-bone-muted font-sans leading-relaxed max-w-xl">
            Marks earned through intentional practice. Streaks track consecutive active days within the chamber, unlocking occult marks and practical ritual privileges.
          </p>
        </div>

        {/* Real-time streak summary badge */}
        <div className="flex items-center gap-3 bg-[#110722] p-3 rounded-xl border border-purple-800/60 shadow-[0_0_15px_rgba(168,85,247,0.2)] shrink-0">
          <div className="w-10 h-10 rounded-lg bg-[#1a0c33] border border-purple-700/60 flex items-center justify-center text-purple-300">
            <Flame className={`w-5 h-5 ${curStreak > 0 ? "text-purple-300 animate-pulse" : "text-purple-900"}`} />
          </div>
          <div>
            <div className="text-[9px] font-mono uppercase tracking-widest text-purple-400">Active Inquest</div>
            <div className="text-sm font-mono font-bold text-bone">
              {curStreak === 1 ? "1 DAY" : `${curStreak} DAYS`}
              <span className="text-[11px] text-bone-dim font-normal ml-1.5 font-sans">
                (Best: {bestStreak}d)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: Current Streak */}
        <div className="p-4 rounded-xl bg-[#0c051a] border border-purple-900/50 space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-purple-300 flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-purple-400" />
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
        <div className="p-4 rounded-xl bg-[#0c051a] border border-purple-900/50 space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-purple-300 flex items-center gap-1.5">
            <Award className="w-3 h-3 text-purple-400" />
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
        <div className="p-4 rounded-xl bg-[#0c051a] border border-purple-900/50 space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-purple-300 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>Total Inquests</span>
          </div>
          <div className="text-2xl font-mono font-bold text-bone">
            {totalActs} <span className="text-xs font-normal text-bone-dim">Completions</span>
          </div>
          <div className="text-[10px] text-bone-dim font-mono">
            {progress.totalDailyTarot} Daily · {progress.totalThreeCardReadings} Triad · {progress.totalWorkings} Workings
          </div>
        </div>
      </div>

      {/* Upcoming Milestone Card */}
      <div className="p-5 rounded-xl bg-[#0e071c] border border-purple-800/60 space-y-4 shadow-[0_0_20px_rgba(88,28,135,0.25)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-300 font-bold">
            <Gift className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Next Sanctum Milestone</span>
          </div>
          {upcoming.nextMilestone && (
            <div className="text-xs font-mono text-purple-200">
              <span className="font-bold text-white">{curStreak}</span> / {upcoming.targetStreak} Days
            </div>
          )}
        </div>

        {upcoming.nextMilestone ? (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm text-bone">
              <div>
                <span className="font-bold tracking-wide font-serif text-purple-100">{upcoming.nextMilestone.rewardCopy}</span>
                <span className="text-bone-muted font-sans ml-2 text-xs">
                  ({upcoming.remainingDays} more {upcoming.remainingDays === 1 ? "active day" : "active days"} to reach {upcoming.nextMilestone.title})
                </span>
              </div>
            </div>

            {/* Glowing Purple Progress Track */}
            <div className="w-full h-2 rounded-full bg-[#080212] border border-purple-900/60 overflow-hidden" role="progressbar" aria-valuenow={curStreak} aria-valuemin={0} aria-valuemax={upcoming.targetStreak}>
              <div
                className="h-full bg-gradient-to-r from-purple-800 via-purple-600 to-purple-400 shadow-[0_0_10px_#a855f7] transition-all duration-500 ease-out"
                style={{ width: `${Math.round(upcoming.progressRatio * 100)}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="text-xs font-mono text-purple-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span>All primary Sanctum streak milestones achieved. Your dedication is woven into the ledger.</span>
          </div>
        )}

        {/* Milestone Rewards Status Grid */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-purple-900/40 text-xs">
          {SANCTUM_REWARD_MILESTONES.map((milestone) => {
            const isClaimed = claimedRewards.includes(milestone.id);
            return (
              <div
                key={milestone.id}
                className={`p-3 rounded-lg border flex items-center justify-between gap-3 ${
                  isClaimed
                    ? "bg-[#140826] border-purple-700/70 text-bone"
                    : "bg-[#090312]/60 border-purple-950 text-bone-dim"
                }`}
              >
                <div>
                  <div className="font-mono uppercase tracking-wider text-[10px] font-semibold text-purple-300">
                    {milestone.title} ({milestone.streakRequirement}d)
                  </div>
                  <div className="text-xs font-serif font-bold mt-0.5">{milestone.rewardCopy}</div>
                </div>
                <div className="shrink-0 text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border">
                  {isClaimed ? (
                    <span className="text-purple-200 border-purple-600 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3 h-3 text-purple-400" />
                      EARNED
                    </span>
                  ) : (
                    <span className="text-bone-dim border-purple-950 flex items-center gap-1">
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
        <div className="flex items-center justify-between border-b border-purple-900/40 pb-2">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-purple-300 flex items-center gap-1.5 font-bold">
            <GrimoireStar className="w-3.5 h-3.5 text-purple-400" />
            <span>Sacred Marks ({unlockedBadges.length} / {SANCTUM_BADGES.length} Unlocked)</span>
          </div>
          <span className="text-[10px] font-mono text-purple-400/80">Local Archival Record</span>
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
                    ? "bg-[#110722] border-purple-600/70 shadow-[0_0_18px_rgba(168,85,247,0.25)] hover:border-purple-400"
                    : "bg-[#080210] border-purple-950/60 opacity-60 hover:opacity-75"
                }`}
              >
                {/* Top Row: Sigil & Unlock Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className={`p-2.5 rounded-lg border ${
                    isUnlocked
                      ? "bg-[#190b30] border-purple-500/60 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                      : "bg-[#090212] border-purple-950"
                  }`}>
                    <BadgeSigil sigilType={badge.sigilType} isUnlocked={isUnlocked} />
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest font-semibold border ${
                      isUnlocked
                        ? "bg-purple-950 border-purple-500 text-purple-200"
                        : "bg-[#0a0314] border-purple-950 text-bone-dim"
                    }`}
                  >
                    {isUnlocked ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-purple-400" />
                        <span>Consecrated</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3" />
                        <span>Dormant</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Badge Info */}
                <div className="space-y-1">
                  <h3 className={`font-serif text-base font-bold uppercase tracking-wider ${isUnlocked ? "text-purple-100" : "text-bone-muted"}`}>
                    {badge.name}
                  </h3>
                  <p className="text-xs text-bone-muted font-sans leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                {/* Requirement Footnote */}
                <div className="pt-2 border-t border-purple-950 text-[10px] font-mono text-purple-400/80 uppercase tracking-wider">
                  Requirement: {badge.requirement}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
