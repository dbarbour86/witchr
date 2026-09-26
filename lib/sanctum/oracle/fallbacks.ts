/**
 * Deterministic Fallbacks for Oracle AI Service
 * Ensures 100% reliability by falling back to Witchr's local rules-based engines
 * if AI credentials are unset, rate limits are reached, or validation fails.
 */

import { OracleTarotInput, OracleTarotOutput, OracleWorkingInput, OracleWorkingOutput } from "./types";
import { generateOracleSynthesis } from "../three-card-engine";
import { synthesizeWorking } from "../working-engine";
import { SanctumTarotCard, getSanctumTarotCardById, SANCTUM_TAROT_DECK } from "@/content/sanctum-tarot";
import { SanctumIntentionKey } from "@/content/sanctum-workings";

/**
 * Resolves a SanctumTarotCard from card name or id, with safe fallback.
 */
function resolveCard(name: string): SanctumTarotCard {
  const found = SANCTUM_TAROT_DECK.find(
    (c) => c.name.toLowerCase() === name.toLowerCase() || c.id.toLowerCase() === name.toLowerCase()
  );
  return found || SANCTUM_TAROT_DECK[0];
}

/**
 * Deterministic fallback for Three-Card Tarot
 */
export function getTarotFallback(input: OracleTarotInput): OracleTarotOutput {
  const situationCard = resolveCard(input.situation.cardName);
  const challengeCard = resolveCard(input.challenge.cardName);
  const guidanceCard = resolveCard(input.guidance.cardName);

  const localRes = generateOracleSynthesis(
    situationCard,
    challengeCard,
    guidanceCard,
    input.question
  );

  return {
    pattern: localRes.pattern,
    consider: localRes.consider,
    carry: localRes.carryWithYou,
  };
}

/**
 * Deterministic fallback for Create a Working
 */
export function getWorkingFallback(input: OracleWorkingInput): OracleWorkingOutput {
  const intentionKey = (input.intention as SanctumIntentionKey) || "Clarity";
  const ingredientNames = input.approvedIngredients.map((i) => i.name);

  const synthResult = synthesizeWorking({
    intention: intentionKey,
    customIntention: input.customIntention,
    selectedIngredients: ingredientNames,
  });

  if (synthResult.success && synthResult.working) {
    const w = synthResult.working;
    return {
      title: w.title,
      intentionDescription: w.intentionDescription,
      ingredientReasons: w.whyThese.map((wt) => ({
        name: wt.name,
        correspondence: wt.correspondence,
        reason: wt.reason,
      })),
      preparationSteps: w.preparation,
      ritualSteps: w.theWorking.map((s) => ({
        step: s.step,
        title: s.title,
        instruction: s.instruction,
      })),
      closing: w.closing,
      optionalTiming: w.optionalTiming || null,
      reflectionPrompt: w.consider,
      practicalTakeaway: w.carryThisWithYou,
      safetyNotes: w.safetyNotes || null,
    };
  }

  // Ultra-safe hardcoded fallback if synthetic working failed
  return {
    title: `SOVEREIGN WORKING FOR ${input.intention.toUpperCase()}`,
    intentionDescription: `A grounded, focused ritual container to align your personal authority and conscious intentions.`,
    ingredientReasons: input.approvedIngredients.map((ing) => ({
      name: ing.name,
      correspondence: ing.symbolicMeaning,
      reason: ing.correspondenceRole,
    })),
    preparationSteps: [
      "Find a quiet, clear surface free of mundane clutter or digital distractions.",
      "Place your selected ingredients before you and take three measured breaths.",
    ],
    ritualSteps: [
      {
        step: 1,
        title: "Perimeter Grounding",
        instruction: "Ground your focus into your physical body and state your core intention clearly in your mind.",
      },
      {
        step: 2,
        title: "Sensory Anchoring",
        instruction: "Hold or arrange your materials deliberately, allowing their symbolic correspondences to focus your intent.",
      },
      {
        step: 3,
        title: "Closing Commitment",
        instruction: "Speak one direct boundary or commitment aloud, sealing the working into everyday action.",
      },
    ],
    closing: "Release fixation on outcomes. Extinguish any flames safely.",
    optionalTiming: "Evening or dawn",
    reflectionPrompt: "What single habit currently weakens this intention, and what boundary will protect it?",
    practicalTakeaway: "Take one tangible real-world step today that directly mirrors this ritual commitment.",
    safetyNotes: input.fireHazardIncluded ? "Place all candles on heat-safe surfaces. Never leave burning candles unattended." : null,
  };
}
