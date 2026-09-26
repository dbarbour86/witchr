/**
 * Witchr Sanctum Working Safety Engine
 * Validates AI-generated Working text against strict occult and physical safety rules.
 * If any violation is detected, output must be rejected and fallback invoked immediately.
 */

import type { OracleWorkingOutput } from "./types";

const FORBIDDEN_HAZARD_PATTERNS: Array<{ regex: RegExp; rule: string }> = [
  // 1. Ingestion / consumption hazards
  {
    regex: /\b(drink|sip|swallow|eat|ingest|consume|edible|brew\s+as\s+tea|steep\s+and\s+drink|tincture\s+to\s+drink)\b/i,
    rule: "No ingestion, drinking, or internal consumption of ritual items.",
  },
  // 2. Essential oil internal consumption
  {
    regex: /\b(drink\s+(?:essential\s+)?oil|swallow\s+oil|undiluted\s+oil\s+on\s+(?:eyes|mucous|genitals))\b/i,
    rule: "No internal or hazardous application of essential oils.",
  },
  // 3. Toxic smoke & burning unknown / dangerous substances
  {
    regex: /\b(burn(?:ing)?\s+(?:plastic|chemical|bleach|treated\s+wood|poison|toxic|unknown))\b/i,
    rule: "No burning of toxic or hazardous materials.",
  },
  // 4. Unattended candles or fire
  {
    regex: /\b(leave\s+(?:the\s+)?(?:candle|flame|fire)\s+(?:burn(?:ing)?|unattended)|walk\s+away\s+while\s+(?:lit|burning)|overnight\s+flame)\b/i,
    rule: "Never leave candles or open flames unattended.",
  },
  // 5. Mixing household chemicals
  {
    regex: /\b(bleach|ammonia|mixing\s+(?:bleach|acids)|combine\s+vinegar\s+and\s+bleach)\b/i,
    rule: "No mixing of household chemicals or hazardous vapors.",
  },
  // 6. Bodily harm / blood / cutting
  {
    regex: /\b(cut\s+(?:your\s+)?skin|draw\s+blood|bleed|puncture|pierce|wound|inflict\s+pain)\b/i,
    rule: "No physical harm, cutting, bloodletting, or self-injury.",
  },
  // 7. Medical treatment substitution
  {
    regex: /\b(cure|substitute\s+for\s+medical|replace\s+(?:doctor|therapy|medication)|stop\s+(?:taking\s+)?meds|heal\s+(?:cancer|infection|disease))\b/i,
    rule: "Ritual practice must never claim to diagnose, cure, or replace professional healthcare.",
  },
  // 8. Legal or financial guarantees
  {
    regex: /\b(guaranteed\s+(?:court|legal|money|lottery|financial|wealth)|invest\s+all|legal\s+settlement\s+guarantee)\b/i,
    rule: "No legal or financial guarantees masquerading as ritual outcomes.",
  },
  // 9. Ecological damage: dumping salt into living soil
  {
    regex: /\b(pour\s+salt\s+(?:into|onto|in)\s+(?:soil|earth|dirt|grass|garden|plants?)|salt\s+the\s+(?:earth|ground|soil))\b/i,
    rule: "Never dump salt into living outdoor soil, gardens, or plant beds.",
  },
];

export interface SafetyCheckResult {
  safe: boolean;
  violation?: string;
}

/**
 * Inspects all text fields in an OracleWorkingOutput for safety compliance.
 */
export function checkWorkingSafety(working: OracleWorkingOutput): SafetyCheckResult {
  const textCorpus = [
    working.title,
    working.intentionDescription,
    ...working.ingredientReasons.map((r) => `${r.name} ${r.correspondence} ${r.reason}`),
    ...working.preparationSteps,
    ...working.ritualSteps.map((s) => `${s.title} ${s.instruction}`),
    working.closing,
    working.optionalTiming || "",
    working.reflectionPrompt,
    working.practicalTakeaway,
    working.safetyNotes || "",
  ].join("\n");

  for (const { regex, rule } of FORBIDDEN_HAZARD_PATTERNS) {
    if (regex.test(textCorpus)) {
      return {
        safe: false,
        violation: rule,
      };
    }
  }

  return { safe: true };
}
