export type AnalyticsEventName =
  | "spell_finder_started"
  | "spell_finder_category_selected"
  | "spell_finder_result_viewed"
  | "ritual_viewed"
  | "ritual_related_clicked"
  | "tarot_spread_viewed"
  | "problem_hub_viewed"
  | "email_placeholder_submitted";

export interface AnalyticsEventProps {
  category?: string;
  ritualSlug?: string;
  tarotSlug?: string;
  hubSlug?: string;
  source?: string;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Lightweight analytics event dispatcher.
 * Prepared for plug-and-play integration with Plausible, GA4, PostHog, or custom telemetry.
 * In V1 production, it operates safely without third-party network requests or console noise.
 */
export function trackEvent(
  eventName: AnalyticsEventName,
  props?: AnalyticsEventProps
): void {
  if (typeof window === "undefined") return;

  // If a provider like Plausible is loaded in window
  const win = window as unknown as {
    plausible?: (event: string, options?: { props?: AnalyticsEventProps }) => void;
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
  };

  if (typeof win.plausible === "function") {
    win.plausible(eventName, { props });
  }

  // Prepared for development debugging only if localStorage flag is set
  if (
    process.env.NODE_ENV === "development" &&
    typeof localStorage !== "undefined" &&
    localStorage.getItem("witchr_debug_analytics") === "true"
  ) {
    // eslint-disable-next-line no-console
    console.debug(`[Witchr Analytics] ${eventName}`, props);
  }
}
