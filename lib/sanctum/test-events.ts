/**
 * Lightweight, strictly local-only analytics for Sanctum Private Test Round 1.
 *
 * CRITICAL PRIVACY RULES:
 * - Stored purely in browser localStorage under `witchr_sanctum_test_events`.
 * - NEVER transmits data to external servers, cloud providers, or analytics trackers.
 * - Stores ONLY operational event names, ISO timestamps, local dates, and feature tags.
 * - NEVER logs user questions, personal reflections, ingredients, custom intentions,
 *   or AI generated outputs.
 */

import { SANCTUM_STORAGE_KEYS } from "./storage";
import { SANCTUM_PROGRESS_KEY, SANCTUM_DEV_SIMULATED_DATE_KEY, INITIAL_SANCTUM_PROGRESS } from "./progression";

export const SANCTUM_TEST_EVENTS_STORAGE_KEY = "witchr_sanctum_test_events";

export type SanctumTestEventName =
  | "sanctum_entered"
  | "daily_tarot_started"
  | "daily_tarot_completed"
  | "daily_tarot_saved"
  | "three_card_started"
  | "three_card_completed"
  | "three_card_saved"
  | "working_started"
  | "working_completed"
  | "working_saved"
  | "grimoire_opened"
  | "badge_unlocked";

export interface SanctumTestEvent {
  eventName: SanctumTestEventName;
  timestamp: string; // ISO 8601
  localDate: string; // YYYY-MM-DD
  feature?: string;
}

/**
 * Records a local-only event to aid voluntary tester debriefs and session review.
 */
export function recordSanctumTestEvent(eventName: SanctumTestEventName, feature?: string): void {
  if (typeof window === "undefined") return;

  try {
    const raw = localStorage.getItem(SANCTUM_TEST_EVENTS_STORAGE_KEY);
    const events: SanctumTestEvent[] = raw ? JSON.parse(raw) : [];

    const now = new Date();
    const localDate = now.toLocaleDateString("en-CA"); // YYYY-MM-DD

    events.push({
      eventName,
      timestamp: now.toISOString(),
      localDate,
      feature,
    });

    // Keep log bounded to last 150 events
    const bounded = events.slice(-150);
    localStorage.setItem(SANCTUM_TEST_EVENTS_STORAGE_KEY, JSON.stringify(bounded));
  } catch (err) {
    // Fail silently in private browsing or quota limits
    console.debug("Unable to append to local test event log", err);
  }
}

/**
 * Returns recorded local-only test events.
 */
export function getSanctumTestEvents(): SanctumTestEvent[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(SANCTUM_TEST_EVENTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Clears local test events only.
 */
export function clearSanctumTestEvents(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(SANCTUM_TEST_EVENTS_STORAGE_KEY);
  } catch {
    // noop
  }
}

/**
 * Complete Sanctum-only test reset utility for handing device to the next tester.
 * Clears daily draw, grimoire readings, progression/streaks, and test events.
 * Leaves all non-Sanctum Witchr browser state completely untouched.
 */
export function resetSanctumTestData(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(SANCTUM_STORAGE_KEYS.DAILY_DRAW);
    localStorage.removeItem(SANCTUM_STORAGE_KEYS.GRIMOIRE_READINGS);
    localStorage.removeItem(SANCTUM_PROGRESS_KEY);
    localStorage.removeItem(SANCTUM_DEV_SIMULATED_DATE_KEY);
    localStorage.removeItem(SANCTUM_TEST_EVENTS_STORAGE_KEY);

    // Notify all active listeners across Sanctum pages
    window.dispatchEvent(new CustomEvent("sanctum:progress-updated", { detail: INITIAL_SANCTUM_PROGRESS }));
    window.dispatchEvent(new CustomEvent("sanctum:date-simulated", { detail: null }));
    window.dispatchEvent(new CustomEvent("sanctum:grimoire-updated", { detail: [] }));
    window.dispatchEvent(new CustomEvent("sanctum:daily-tarot-reset"));
  } catch (err) {
    console.error("Failed to reset Sanctum test data", err);
  }
}
