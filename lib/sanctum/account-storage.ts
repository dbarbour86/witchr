/**
 * Witchr Sanctum: Account Data Isolation & Legacy Storage Engine
 * 
 * Strict multi-tenant isolation for browser-stored state:
 * - Scopes all storage keys by user ID when authenticated (e.g., `_usr_<userId>`).
 * - Preserves un-scoped legacy browser records independently.
 * - Enforces explicit user confirmation before importing legacy data.
 * - Prevents data leakage between Account A and Account B.
 */

export const SANCTUM_BASE_KEYS = {
  DAILY_DRAW: "witchr_sanctum_daily_draw",
  GRIMOIRE_READINGS: "witchr_sanctum_grimoire_readings",
  PROGRESS: "witchr_sanctum_progress",
  ORACLE_CHAT: "witchr_sanctum_oracle_chat",
  LEGACY_DECISION: "witchr_sanctum_legacy_decision",
} as const;

let currentActiveUserId: string | null = null;

/**
 * Updates the globally active authenticated user ID for synchronous storage helpers.
 */
export function setActiveSanctumUserId(id: string | null): void {
  currentActiveUserId = id ? id.trim() : null;
}

/**
 * Returns the currently active authenticated user ID, or null if guest.
 */
export function getActiveSanctumUserId(): string | null {
  return currentActiveUserId;
}

/**
 * Returns an account-isolated storage key.
 * If userId is provided or active, scopes the key specifically to that user.
 * If userId is null/undefined, returns the un-scoped legacy/guest key.
 */
export function getAccountScopedKey(baseKey: string, userId?: string | null): string {
  const targetId = userId !== undefined ? userId : currentActiveUserId;
  if (targetId && typeof targetId === "string" && targetId.trim().length > 0) {
    return `${baseKey}_usr_${targetId.trim()}`;
  }
  return baseKey;
}

export interface LegacyDataSummary {
  grimoireCount: number;
  hasDailyDraw: boolean;
  hasStreak: boolean;
  streakDays: number;
}

/**
 * Inspects un-scoped legacy records in this browser.
 */
export function getLegacyDataSummary(): LegacyDataSummary {
  if (typeof window === "undefined") {
    return { grimoireCount: 0, hasDailyDraw: false, hasStreak: false, streakDays: 0 };
  }

  try {
    const rawGrimoire = localStorage.getItem(SANCTUM_BASE_KEYS.GRIMOIRE_READINGS);
    const grimoireEntries = rawGrimoire ? JSON.parse(rawGrimoire) : [];
    const grimoireCount = Array.isArray(grimoireEntries) ? grimoireEntries.length : 0;

    const rawDaily = localStorage.getItem(SANCTUM_BASE_KEYS.DAILY_DRAW);
    const hasDailyDraw = Boolean(rawDaily && rawDaily.length > 2);

    const rawProgress = localStorage.getItem(SANCTUM_BASE_KEYS.PROGRESS);
    let streakDays = 0;
    if (rawProgress) {
      const parsed = JSON.parse(rawProgress);
      streakDays = parsed.currentStreak || 0;
    }

    return {
      grimoireCount,
      hasDailyDraw,
      hasStreak: streakDays > 0,
      streakDays,
    };
  } catch {
    return { grimoireCount: 0, hasDailyDraw: false, hasStreak: false, streakDays: 0 };
  }
}

/**
 * Checks whether an account has already made a decision (imported or dismissed) regarding legacy data.
 */
export function getLegacyDecisionForAccount(userId: string): "imported" | "dismissed" | null {
  if (typeof window === "undefined" || !userId) return null;
  const decisionKey = getAccountScopedKey(SANCTUM_BASE_KEYS.LEGACY_DECISION, userId);
  const val = localStorage.getItem(decisionKey);
  if (val === "imported" || val === "dismissed") {
    return val;
  }
  return null;
}

/**
 * Explicitly imports legacy browser records into the specified account.
 * Crucially, leaves original legacy records intact so they are not destroyed.
 */
export function importLegacyDataToAccount(userId: string): { importedCount: number } {
  if (typeof window === "undefined" || !userId) return { importedCount: 0 };

  let importedCount = 0;
  try {
    // 1. Import Grimoire
    const legacyGrimoireRaw = localStorage.getItem(SANCTUM_BASE_KEYS.GRIMOIRE_READINGS);
    const accountGrimoireKey = getAccountScopedKey(SANCTUM_BASE_KEYS.GRIMOIRE_READINGS, userId);
    if (legacyGrimoireRaw) {
      const legacyList = JSON.parse(legacyGrimoireRaw);
      if (Array.isArray(legacyList) && legacyList.length > 0) {
        const existingAccountRaw = localStorage.getItem(accountGrimoireKey);
        const existingAccountList = existingAccountRaw ? JSON.parse(existingAccountRaw) : [];
        const existingIds = new Set(existingAccountList.map((e: any) => e.id));

        const merged = [...existingAccountList];
        for (const entry of legacyList) {
          if (!existingIds.has(entry.id)) {
            merged.push(entry);
            importedCount++;
          }
        }
        localStorage.setItem(accountGrimoireKey, JSON.stringify(merged));
      }
    }

    // 2. Import Progression / Streak (if account progression does not exist)
    const legacyProgressRaw = localStorage.getItem(SANCTUM_BASE_KEYS.PROGRESS);
    const accountProgressKey = getAccountScopedKey(SANCTUM_BASE_KEYS.PROGRESS, userId);
    if (legacyProgressRaw && !localStorage.getItem(accountProgressKey)) {
      localStorage.setItem(accountProgressKey, legacyProgressRaw);
    }

    // 3. Import Daily Draw (if account daily draw does not exist)
    const legacyDailyRaw = localStorage.getItem(SANCTUM_BASE_KEYS.DAILY_DRAW);
    const accountDailyKey = getAccountScopedKey(SANCTUM_BASE_KEYS.DAILY_DRAW, userId);
    if (legacyDailyRaw && !localStorage.getItem(accountDailyKey)) {
      localStorage.setItem(accountDailyKey, legacyDailyRaw);
    }

    // 4. Mark decision
    const decisionKey = getAccountScopedKey(SANCTUM_BASE_KEYS.LEGACY_DECISION, userId);
    localStorage.setItem(decisionKey, "imported");

    // Notify listeners
    window.dispatchEvent(new CustomEvent("sanctum:grimoire-updated"));
    window.dispatchEvent(new CustomEvent("sanctum:progress-updated"));
  } catch (err) {
    console.error("[Account Storage] Import legacy error:", err);
  }

  return { importedCount };
}

/**
 * Explicitly dismisses the legacy import prompt for this account without copying records.
 */
export function dismissLegacyDataForAccount(userId: string): void {
  if (typeof window === "undefined" || !userId) return;
  const decisionKey = getAccountScopedKey(SANCTUM_BASE_KEYS.LEGACY_DECISION, userId);
  localStorage.setItem(decisionKey, "dismissed");
  window.dispatchEvent(new CustomEvent("sanctum:grimoire-updated"));
}

/**
 * Seamlessly carries over the initial guest Oracle conversation into the account if the account chat is empty.
 * Ensures the practitioner's preview question and answer are preserved upon signup/login.
 */
export function carryOverGuestDialogueToAccount(userId: string): void {
  if (typeof window === "undefined" || !userId) return;

  try {
    const accountChatKey = getAccountScopedKey(SANCTUM_BASE_KEYS.ORACLE_CHAT, userId);
    const accountExisting = localStorage.getItem(accountChatKey);

    // Only carry over if account chat is completely uninitialized
    if (!accountExisting) {
      const guestChatRaw = localStorage.getItem(SANCTUM_BASE_KEYS.ORACLE_CHAT);
      if (guestChatRaw) {
        localStorage.setItem(accountChatKey, guestChatRaw);
      }
    }
  } catch (err) {
    console.error("[Account Storage] Dialogue carryover error:", err);
  }
}
