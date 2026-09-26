import { getEffectiveLocalDateString } from "./progression";

export interface SanctumDailyReading {
  id: string;
  type: "daily";
  timestamp: string;
  localDate: string; // YYYY-MM-DD
  cardId: string;
  cardName: string;
  cardSlug: string;
  cardNumber: number;
  cardNumeral: string;
  shortKeywords: string[];
  interpretation: {
    theCard: string;
    whatThisMayReflectToday: string;
    reflectionPrompt: string;
    practicalTakeaway: string;
  };
  savedToGrimoire: boolean;
}

export interface SanctumPositionReading {
  positionKey: "situation" | "challenge" | "guidance";
  positionLabel: string;
  positionQuestion: string;
  cardId: string;
  cardName: string;
  cardSlug: string;
  cardNumber: number;
  cardNumeral: string;
  shortKeywords: string[];
  contextualMeaning: string;
}

export interface SanctumThreeCardReading {
  id: string;
  type: "three-card";
  timestamp: string;
  localDate: string; // YYYY-MM-DD
  question?: string;
  spreadName: string;
  positions: {
    situation: SanctumPositionReading;
    challenge: SanctumPositionReading;
    guidance: SanctumPositionReading;
  };
  combinedSynthesis: string;
  reflectionPrompt: string;
  practicalTakeaway: string;
  savedToGrimoire: boolean;
}

export interface SanctumWorkingRecord {
  id: string;
  type: "working";
  timestamp: string;
  localDate: string; // YYYY-MM-DD
  intention: string;
  customIntention?: string;
  selectedIngredients: string[];
  usedIngredients: string[];
  ingredientReasons: { name: string; correspondence: string; reason: string }[];
  title: string;
  intentionDescription: string;
  preparationSteps: string[];
  ritualSteps: { step: number; title: string; instruction: string }[];
  closing: string;
  optionalTiming?: string;
  reflectionPrompt: string;
  practicalTakeaway: string;
  safetyNotes?: string;
  savedToGrimoire: boolean;
}

export type SanctumGrimoireReading =
  | SanctumDailyReading
  | SanctumThreeCardReading
  | SanctumWorkingRecord;

export const SANCTUM_STORAGE_KEYS = {
  DAILY_DRAW: "witchr_sanctum_daily_draw",
  GRIMOIRE_READINGS: "witchr_sanctum_grimoire_readings",
} as const;

/**
 * Returns current local date in YYYY-MM-DD format based on visitor's browser clock.
 * In development mode, respects simulated date override if set.
 */
export function getTodayLocalDateString(): string {
  return getEffectiveLocalDateString();
}

/**
 * Retrieves the stored daily reading from localStorage if it matches today's local date.
 * Returns null if no draw exists for today or if running during server rendering.
 */
export function getStoredDailyReading(): SanctumDailyReading | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = localStorage.getItem(SANCTUM_STORAGE_KEYS.DAILY_DRAW);
    if (!raw) return null;

    const data: SanctumDailyReading = JSON.parse(raw);
    const today = getTodayLocalDateString();

    // Verify the draw belongs to today's calendar date
    if (data.localDate === today) {
      // Check if it is also saved in the Grimoire ledger
      const isSaved = isReadingSavedToGrimoire(data.id);
      return {
        ...data,
        savedToGrimoire: isSaved || data.savedToGrimoire,
      };
    }

    return null;
  } catch (error) {
    console.error("Failed to read Sanctum daily draw from localStorage", error);
    return null;
  }
}

/**
 * Persists today's daily reading record into localStorage.
 */
export function saveDailyReading(reading: SanctumDailyReading): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(SANCTUM_STORAGE_KEYS.DAILY_DRAW, JSON.stringify(reading));
  } catch (error) {
    console.error("Failed to save Sanctum daily draw to localStorage", error);
  }
}

/**
 * Checks if a specific reading is recorded in the Grimoire archival ledger.
 */
export function isReadingSavedToGrimoire(readingId: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    const raw = localStorage.getItem(SANCTUM_STORAGE_KEYS.GRIMOIRE_READINGS);
    if (!raw) return false;

    const list: SanctumGrimoireReading[] = JSON.parse(raw);
    return Array.isArray(list) && list.some((item) => item.id === readingId);
  } catch (error) {
    console.error("Failed to check Grimoire ledger status", error);
    return false;
  }
}

/**
 * Saves a reading to the Grimoire archival ledger.
 * Prevents duplicate saves and updates the daily record's flag if applicable.
 * Returns true if saved, or false if already present.
 */
export function saveReadingToGrimoire(reading: SanctumGrimoireReading): boolean {
  if (typeof window === "undefined") return false;

  try {
    const raw = localStorage.getItem(SANCTUM_STORAGE_KEYS.GRIMOIRE_READINGS);
    let list: SanctumGrimoireReading[] = [];
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          list = parsed;
        }
      } catch {
        list = [];
      }
    }

    const alreadyExists = list.some((item) => item.id === reading.id);
    if (!alreadyExists) {
      const updatedReading: SanctumGrimoireReading = {
        ...reading,
        savedToGrimoire: true,
      };
      list.push(updatedReading);
      localStorage.setItem(SANCTUM_STORAGE_KEYS.GRIMOIRE_READINGS, JSON.stringify(list));

      // Also sync back to daily draw record if it is a daily reading
      if (reading.type === "daily") {
        const currentDaily = getStoredDailyReading();
        if (currentDaily && currentDaily.id === reading.id) {
          saveDailyReading({ ...currentDaily, savedToGrimoire: true });
        }
      }

      return true;
    }

    return false;
  } catch (error) {
    console.error("Failed to bind reading to Grimoire ledger", error);
    return false;
  }
}

/**
 * Retrieves all saved entries from the Grimoire ledger.
 * Sorted newest first by timestamp. Gracefully ignores malformed records.
 */
export function getGrimoireEntries(): SanctumGrimoireReading[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(SANCTUM_STORAGE_KEYS.GRIMOIRE_READINGS);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const validEntries = parsed.filter(
      (item): item is SanctumGrimoireReading =>
        item &&
        typeof item === "object" &&
        typeof item.id === "string" &&
        (item.type === "daily" || item.type === "three-card" || item.type === "working")
    );

    // Sort newest first
    return validEntries.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  } catch (error) {
    console.error("Failed to parse Grimoire entries", error);
    return [];
  }
}

/**
 * Deletes an individual entry from the Grimoire ledger.
 * Reconciles the Daily Tarot saved flag if the deleted entry was today's daily draw,
 * without resetting or rerolling today's active card.
 */
export function deleteGrimoireEntry(id: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    const currentList = getGrimoireEntries();
    const targetEntry = currentList.find((item) => item.id === id);
    if (!targetEntry) return false;

    const filtered = currentList.filter((item) => item.id !== id);
    localStorage.setItem(SANCTUM_STORAGE_KEYS.GRIMOIRE_READINGS, JSON.stringify(filtered));

    // If deleting today's daily draw, update the daily record's saved flag without resetting the draw
    if (targetEntry.type === "daily") {
      const currentDaily = getStoredDailyReading();
      if (currentDaily && currentDaily.id === id) {
        saveDailyReading({ ...currentDaily, savedToGrimoire: false });
      }
    }

    return true;
  } catch (error) {
    console.error("Failed to delete Grimoire entry", error);
    return false;
  }
}

/**
 * Permanently removes all saved entries from the Grimoire ledger.
 * Reconciles the active Daily Tarot saved flag without rerolling today's card.
 */
export function clearGrimoire(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(SANCTUM_STORAGE_KEYS.GRIMOIRE_READINGS);

    // Keep today's daily card intact, but update saved status to false
    const currentDaily = getStoredDailyReading();
    if (currentDaily) {
      saveDailyReading({ ...currentDaily, savedToGrimoire: false });
    }
  } catch (error) {
    console.error("Failed to purge Grimoire ledger", error);
  }
}

/**
 * Calculates counts of saved items by category.
 */
export function countGrimoireEntriesByType(): {
  total: number;
  tarot: number;
  workings: number;
} {
  const entries = getGrimoireEntries();
  const tarot = entries.filter((e) => e.type === "daily" || e.type === "three-card").length;
  const workings = entries.filter((e) => e.type === "working").length;

  return {
    total: entries.length,
    tarot,
    workings,
  };
}

/**
 * Development-only utility to clear today's daily draw.
 * Only executes if process.env.NODE_ENV !== "production".
 */
export function clearTodayDailyReadingDevOnly(): void {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV === "production") return;

  try {
    localStorage.removeItem(SANCTUM_STORAGE_KEYS.DAILY_DRAW);
  } catch (error) {
    console.error("Failed to clear dev daily draw", error);
  }
}

