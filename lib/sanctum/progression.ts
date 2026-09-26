/**
 * Witchr Sanctum Progression & Engagement Layer
 * 
 * Manages local-only activity streaks, achievement marks (badges),
 * and reward milestone scaffolding.
 * 
 * Rules:
 * - Local-only storage: witchr_sanctum_progress
 * - Meaningful completions only: Daily Tarot draw, Three-Card synthesis, valid Working synthesis.
 * - Calendar-day streak comparison (avoids DST/millisecond drift).
 * - Multi-activity deduplication.
 * - Deleting or purging Grimoire entries never decreases progression history.
 */

export interface SanctumProgress {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null; // YYYY-MM-DD
  activeDates: string[]; // List of YYYY-MM-DD
  totalActivities: number;
  totalDailyTarot: number;
  totalThreeCardReadings: number;
  totalWorkings: number;
  unlockedBadges: string[]; // Badge IDs
  claimedRewards: string[]; // Milestone IDs
  processedActivityIds: string[]; // Deduplication IDs
}

export type SanctumActivityType = "daily" | "three-card" | "working";

export interface SanctumBadge {
  id: string;
  name: string;
  requirement: string;
  description: string;
  sigilType: "first-draw" | "the-triad" | "first-working" | "seven-nights" | "seeker" | "grimoire-keeper" | "pathworker";
  category: "divination" | "working" | "discipline";
}

export interface SanctumRewardMilestone {
  id: string;
  title: string;
  streakRequirement: number;
  rewardCopy: string;
  description: string;
}

export const SANCTUM_PROGRESS_KEY = "witchr_sanctum_progress";
export const SANCTUM_DEV_SIMULATED_DATE_KEY = "witchr_sanctum_dev_simulated_date";

export const SANCTUM_BADGES: SanctumBadge[] = [
  {
    id: "first-draw",
    name: "FIRST DRAW",
    requirement: "Complete your first Daily Tarot draw.",
    description: "The deck has answered once.",
    sigilType: "first-draw",
    category: "divination",
  },
  {
    id: "the-triad",
    name: "THE TRIAD",
    requirement: "Complete your first Three-Card Reading.",
    description: "Three cards. One pattern.",
    sigilType: "the-triad",
    category: "divination",
  },
  {
    id: "first-working",
    name: "FIRST WORKING",
    requirement: "Create your first valid Working.",
    description: "You made use of what was already at hand.",
    sigilType: "first-working",
    category: "working",
  },
  {
    id: "seven-nights",
    name: "SEVEN NIGHTS",
    requirement: "Reach a 7-day activity streak.",
    description: "Seven consecutive days inside the Sanctum.",
    sigilType: "seven-nights",
    category: "discipline",
  },
  {
    id: "seeker",
    name: "SEEKER",
    requirement: "Complete 10 total Tarot readings (Daily + Three-Card).",
    description: "Ten readings entered into practice.",
    sigilType: "seeker",
    category: "divination",
  },
  {
    id: "grimoire-keeper",
    name: "GRIMOIRE KEEPER",
    requirement: "Complete 10 total meaningful activities.",
    description: "Ten workings and readings have marked your path.",
    sigilType: "grimoire-keeper",
    category: "discipline",
  },
  {
    id: "pathworker",
    name: "PATHWORKER",
    requirement: "Create 5 valid Workings.",
    description: "Five intentions carried into practice.",
    sigilType: "pathworker",
    category: "working",
  },
];

export const SANCTUM_REWARD_MILESTONES: SanctumRewardMilestone[] = [
  {
    id: "reward-7-day-streak",
    title: "7-DAY STREAK",
    streakRequirement: 7,
    rewardCopy: "REWARD RESERVED — 1 FREE WORKING",
    description: "Milestone scaffolding: 1 complimentary formulated working reserved with account rollout.",
  },
  {
    id: "reward-30-day-streak",
    title: "30-DAY STREAK",
    streakRequirement: 30,
    rewardCopy: "COMING WITH ACCOUNTS — 5 SANCTUM CREDITS",
    description: "Milestone scaffolding: 5 Sanctum oracle credits allocated upon account sync.",
  },
];

export const INITIAL_SANCTUM_PROGRESS: SanctumProgress = {
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
  activeDates: [],
  totalActivities: 0,
  totalDailyTarot: 0,
  totalThreeCardReadings: 0,
  totalWorkings: 0,
  unlockedBadges: [],
  claimedRewards: [],
  processedActivityIds: [],
};

/**
 * Calculates calendar day difference between two YYYY-MM-DD date strings.
 * Uses UTC midnight to eliminate daylight-saving shifts and time-of-day offsets.
 */
export function getCalendarDayDifference(fromLocalDateStr: string, toLocalDateStr: string): number {
  const [y1, m1, d1] = fromLocalDateStr.split("-").map(Number);
  const [y2, m2, d2] = toLocalDateStr.split("-").map(Number);
  const utc1 = Date.UTC(y1, m1 - 1, d1);
  const utc2 = Date.UTC(y2, m2 - 1, d2);
  return Math.round((utc2 - utc1) / (1000 * 60 * 60 * 24));
}

/**
 * Returns current effective local date string in YYYY-MM-DD format.
 * In development, respects simulated date override if set.
 */
export function getEffectiveLocalDateString(): string {
  if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
    const devSimulated = localStorage.getItem(SANCTUM_DEV_SIMULATED_DATE_KEY);
    if (devSimulated && /^\d{4}-\d{2}-\d{2}$/.test(devSimulated)) {
      return devSimulated;
    }
  }

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Retrieves Sanctum progression from localStorage.
 * Hydration-safe: returns initial empty progress on server or on parse failure.
 */
export function getSanctumProgress(): SanctumProgress {
  if (typeof window === "undefined") {
    return INITIAL_SANCTUM_PROGRESS;
  }

  try {
    const raw = localStorage.getItem(SANCTUM_PROGRESS_KEY);
    if (!raw) return { ...INITIAL_SANCTUM_PROGRESS };

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return { ...INITIAL_SANCTUM_PROGRESS };

    return {
      currentStreak: typeof parsed.currentStreak === "number" ? parsed.currentStreak : 0,
      longestStreak: typeof parsed.longestStreak === "number" ? parsed.longestStreak : 0,
      lastActiveDate: typeof parsed.lastActiveDate === "string" ? parsed.lastActiveDate : null,
      activeDates: Array.isArray(parsed.activeDates) ? parsed.activeDates : [],
      totalActivities: typeof parsed.totalActivities === "number" ? parsed.totalActivities : 0,
      totalDailyTarot: typeof parsed.totalDailyTarot === "number" ? parsed.totalDailyTarot : 0,
      totalThreeCardReadings: typeof parsed.totalThreeCardReadings === "number" ? parsed.totalThreeCardReadings : 0,
      totalWorkings: typeof parsed.totalWorkings === "number" ? parsed.totalWorkings : 0,
      unlockedBadges: Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges : [],
      claimedRewards: Array.isArray(parsed.claimedRewards) ? parsed.claimedRewards : [],
      processedActivityIds: Array.isArray(parsed.processedActivityIds) ? parsed.processedActivityIds : [],
    };
  } catch (error) {
    console.error("Failed to read Sanctum progress from localStorage", error);
    return { ...INITIAL_SANCTUM_PROGRESS };
  }
}

/**
 * Saves progression state to localStorage and dispatches a change event.
 */
export function saveSanctumProgress(progress: SanctumProgress): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(SANCTUM_PROGRESS_KEY, JSON.stringify(progress));
    window.dispatchEvent(new CustomEvent("sanctum:progress-updated", { detail: progress }));
  } catch (error) {
    console.error("Failed to save Sanctum progress to localStorage", error);
  }
}

/**
 * Evaluates which badges should be unlocked based on current progress totals.
 */
export function evaluateBadges(progress: SanctumProgress): string[] {
  const unlocked = new Set<string>(progress.unlockedBadges);
  const totalTarot = progress.totalDailyTarot + progress.totalThreeCardReadings;

  if (progress.totalDailyTarot >= 1) {
    unlocked.add("first-draw");
  }
  if (progress.totalThreeCardReadings >= 1) {
    unlocked.add("the-triad");
  }
  if (progress.totalWorkings >= 1) {
    unlocked.add("first-working");
  }
  if (progress.currentStreak >= 7 || progress.longestStreak >= 7) {
    unlocked.add("seven-nights");
  }
  if (totalTarot >= 10) {
    unlocked.add("seeker");
  }
  if (progress.totalActivities >= 10) {
    unlocked.add("grimoire-keeper");
  }
  if (progress.totalWorkings >= 5) {
    unlocked.add("pathworker");
  }

  return Array.from(unlocked);
}

/**
 * Evaluates which reward milestones should be unlocked.
 */
export function evaluateRewardMilestones(progress: SanctumProgress): string[] {
  const claimed = new Set<string>(progress.claimedRewards);
  const highestStreak = Math.max(progress.currentStreak, progress.longestStreak);

  if (highestStreak >= 7) {
    claimed.add("reward-7-day-streak");
  }
  if (highestStreak >= 30) {
    claimed.add("reward-30-day-streak");
  }

  return Array.from(claimed);
}

export interface RecordActivityResult {
  progress: SanctumProgress;
  alreadyProcessed: boolean;
  newlyUnlockedBadges: SanctumBadge[];
  newlyEarnedRewards: SanctumRewardMilestone[];
}

/**
 * Records a meaningful Sanctum activity completion.
 * Handles deduplication, calendar-day streak computation, badge unlocking, and milestone tracking.
 */
export function recordSanctumActivity(params: {
  type: SanctumActivityType;
  id: string;
  customDate?: string;
  title?: string;
}): RecordActivityResult {
  if (typeof window === "undefined") {
    return {
      progress: INITIAL_SANCTUM_PROGRESS,
      alreadyProcessed: false,
      newlyUnlockedBadges: [],
      newlyEarnedRewards: [],
    };
  }

  const current = getSanctumProgress();
  const activityDate = params.customDate || getEffectiveLocalDateString();

  // Deduplication check
  if (current.processedActivityIds.includes(params.id)) {
    return {
      progress: current,
      alreadyProcessed: true,
      newlyUnlockedBadges: [],
      newlyEarnedRewards: [],
    };
  }

  // Calculate streak based on local calendar dates
  let nextCurrentStreak = current.currentStreak;
  let nextLongestStreak = current.longestStreak;
  let nextLastActiveDate = current.lastActiveDate;

  if (!current.lastActiveDate) {
    // First activity ever
    nextCurrentStreak = 1;
    nextLongestStreak = 1;
    nextLastActiveDate = activityDate;
  } else {
    const dayDiff = getCalendarDayDifference(current.lastActiveDate, activityDate);

    if (dayDiff === 0) {
      // Activity on same calendar day: streak count remains unchanged
      // (currentStreak already counts today)
      nextLastActiveDate = activityDate;
    } else if (dayDiff === 1) {
      // Exactly consecutive calendar day: increase streak
      nextCurrentStreak += 1;
      if (nextCurrentStreak > nextLongestStreak) {
        nextLongestStreak = nextCurrentStreak;
      }
      nextLastActiveDate = activityDate;
    } else if (dayDiff > 1) {
      // Gap greater than one day: missed day breaks streak, resets to 1
      nextCurrentStreak = 1;
      nextLastActiveDate = activityDate;
    } else {
      // Past day activity: do not modify current streak or last active date
    }
  }

  // Update active dates list
  const nextActiveDates = current.activeDates.includes(activityDate)
    ? current.activeDates
    : [...current.activeDates, activityDate];

  // Increment totals
  const nextTotalActivities = current.totalActivities + 1;
  const nextTotalDailyTarot = params.type === "daily" ? current.totalDailyTarot + 1 : current.totalDailyTarot;
  const nextTotalThreeCard = params.type === "three-card" ? current.totalThreeCardReadings + 1 : current.totalThreeCardReadings;
  const nextTotalWorkings = params.type === "working" ? current.totalWorkings + 1 : current.totalWorkings;

  const candidateProgress: SanctumProgress = {
    currentStreak: nextCurrentStreak,
    longestStreak: nextLongestStreak,
    lastActiveDate: nextLastActiveDate,
    activeDates: nextActiveDates,
    totalActivities: nextTotalActivities,
    totalDailyTarot: nextTotalDailyTarot,
    totalThreeCardReadings: nextTotalThreeCard,
    totalWorkings: nextTotalWorkings,
    unlockedBadges: current.unlockedBadges,
    claimedRewards: current.claimedRewards,
    processedActivityIds: [...current.processedActivityIds, params.id],
  };

  // Evaluate badges
  const updatedBadgeIds = evaluateBadges(candidateProgress);
  const newlyUnlockedIds = updatedBadgeIds.filter((id) => !current.unlockedBadges.includes(id));
  const newlyUnlockedBadges = SANCTUM_BADGES.filter((b) => newlyUnlockedIds.includes(b.id));

  // Evaluate reward milestones
  candidateProgress.unlockedBadges = updatedBadgeIds;
  const updatedRewardIds = evaluateRewardMilestones(candidateProgress);
  const newlyEarnedIds = updatedRewardIds.filter((id) => !current.claimedRewards.includes(id));
  const newlyEarnedRewards = SANCTUM_REWARD_MILESTONES.filter((r) => newlyEarnedIds.includes(r.id));
  candidateProgress.claimedRewards = updatedRewardIds;

  // Persist updated progress
  saveSanctumProgress(candidateProgress);

  // Dispatch toast event for each newly unlocked badge
  for (const badge of newlyUnlockedBadges) {
    window.dispatchEvent(new CustomEvent("sanctum:badge-unlocked", { detail: badge }));
  }

  return {
    progress: candidateProgress,
    alreadyProcessed: false,
    newlyUnlockedBadges,
    newlyEarnedRewards,
  };
}

/**
 * Calculates the next upcoming milestone for the user.
 */
export function getUpcomingMilestone(progress: SanctumProgress): {
  nextMilestone: SanctumRewardMilestone | null;
  targetStreak: number;
  remainingDays: number;
  progressRatio: number;
} {
  const current = progress.currentStreak;

  if (current < 7) {
    return {
      nextMilestone: SANCTUM_REWARD_MILESTONES[0],
      targetStreak: 7,
      remainingDays: 7 - current,
      progressRatio: Math.min(1, Math.max(0, current / 7)),
    };
  }

  if (current < 30) {
    return {
      nextMilestone: SANCTUM_REWARD_MILESTONES[1],
      targetStreak: 30,
      remainingDays: 30 - current,
      progressRatio: Math.min(1, Math.max(0, current / 30)),
    };
  }

  return {
    nextMilestone: null,
    targetStreak: 30,
    remainingDays: 0,
    progressRatio: 1,
  };
}

/* ========================================================================= */
/* DEVELOPMENT ONLY SIMULATION UTILITIES                                     */
/* ========================================================================= */

/**
 * Resets all progression state to initial empty values.
 * Only functions in non-production environments.
 */
export function resetSanctumProgressDevOnly(): void {
  if (typeof window === "undefined" || process.env.NODE_ENV === "production") return;

  try {
    localStorage.removeItem(SANCTUM_PROGRESS_KEY);
    localStorage.removeItem(SANCTUM_DEV_SIMULATED_DATE_KEY);
    window.dispatchEvent(new CustomEvent("sanctum:progress-updated", { detail: INITIAL_SANCTUM_PROGRESS }));
  } catch (error) {
    console.error("Failed to reset Sanctum progress in dev mode", error);
  }
}

/**
 * Sets or advances simulated date in localStorage without modifying OS clock.
 * Only functions in non-production environments.
 */
export function advanceSimulatedDateDevOnly(days: number): string {
  if (typeof window === "undefined" || process.env.NODE_ENV === "production") {
    return getEffectiveLocalDateString();
  }

  const currentDateStr = getEffectiveLocalDateString();
  const [y, m, d] = currentDateStr.split("-").map(Number);
  const targetDate = new Date(Date.UTC(y, m - 1, d + days));
  const newYear = targetDate.getUTCFullYear();
  const newMonth = String(targetDate.getUTCMonth() + 1).padStart(2, "0");
  const newDay = String(targetDate.getUTCDate()).padStart(2, "0");
  const newDateStr = `${newYear}-${newMonth}-${newDay}`;

  localStorage.setItem(SANCTUM_DEV_SIMULATED_DATE_KEY, newDateStr);
  window.dispatchEvent(new CustomEvent("sanctum:date-simulated", { detail: newDateStr }));
  return newDateStr;
}

/**
 * Clears simulated date override, returning to real browser clock.
 */
export function clearSimulatedDateDevOnly(): void {
  if (typeof window === "undefined" || process.env.NODE_ENV === "production") return;

  localStorage.removeItem(SANCTUM_DEV_SIMULATED_DATE_KEY);
  window.dispatchEvent(new CustomEvent("sanctum:date-simulated", { detail: null }));
}
