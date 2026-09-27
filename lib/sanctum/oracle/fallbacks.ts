/**
 * Deterministic Fallbacks for Oracle AI Service
 * Ensures 100% reliability by falling back to Witchr's local rules-based engines
 * if AI credentials are unset, rate limits are reached, or validation fails.
 */

import {
  OracleTarotInput,
  OracleTarotOutput,
  OracleWorkingInput,
  OracleWorkingOutput,
  OracleConversationInput,
  OracleConversationOutput,
} from "./types";
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

/**
 * Deterministic fallback for Conversational Oracle Dialogue
 * Analyzes query intent (stuck, clarity, working/ritual, cards, predictive, or safety)
 * and generates grounded, psychologically insightful counsel with actionable Sanctum guidance.
 */
export function getConversationFallback(input: OracleConversationInput): OracleConversationOutput {
  const text = input.message.toLowerCase().trim();

  // 1. Safety / Hazardous input redirection
  const isHarmOrVengeance = /\b(harm|revenge|curse|hex|kill|hurt|destroy|bleed|blood|poison)\b/i.test(text);
  if (isHarmOrVengeance) {
    return {
      reply: "The Sanctum practice is grounded strictly in personal sovereignty, inner alignment, and protective boundaries. We do not traffic in harm, curses, or attempts to exert destructive control over others. When the urge to lash outward arises, it almost always signals a violated personal boundary or unresolved powerlessness within.",
      reflectionQuestion: "What personal boundary in your physical life needs reinforcement right now, independent of what anyone else does?",
      suggestedAction: {
        label: "Create a Protection Working",
        href: "/sanctum/working",
        type: "working",
      },
    };
  }

  // 2. Predictive question reframing ("will I", "when will", "future", "is he/she")
  const isPredictive = /\b(will i|will he|will she|when will|going to happen|future hold|am i going to|tell my future)\b/i.test(text);
  if (isPredictive) {
    return {
      reply: "The Oracle does not traffic in fixed prophecy or fatalistic certainty. The future is not a predetermined script waiting to unfold; it is continuously woven from the micro-choices and boundaries you enact today. When we demand to know the outcome in advance, we usually seek relief from the discomfort of uncertainty.",
      reflectionQuestion: "If you released your fixation on how this story concludes, what is the single most honest action you must take today?",
      suggestedAction: {
        label: "Draw Today's Card",
        href: "/sanctum/tarot",
        type: "tarot",
      },
    };
  }

  // 3. Feeling stuck / friction / resistance
  if (text.includes("stuck") || text.includes("friction") || text.includes("blocked") || text.includes("can't move")) {
    return {
      reply: "Feeling stuck is rarely an absence of momentum; it is usually two opposing desires pulling with equal force. One part of you demands movement, while another protects you from the exposure, failure, or exhaustion that movement would require. Acknowledge the friction as diagnostic information rather than a flaw.",
      reflectionQuestion: "What hidden benefit or safety does remaining still currently provide you?",
      suggestedAction: {
        label: "Lay a Three-Card Spread",
        href: "/sanctum/tarot/three-card",
        type: "spread",
      },
    };
  }

  // 4. Clarity / Decision / Confusion
  if (text.includes("clarity") || text.includes("confus") || text.includes("decid") || text.includes("direction") || text.includes("choice")) {
    return {
      reply: "Confusion often disguises an uncomfortable truth we already know but hesitate to admit. When clarity feels out of reach, stop seeking more information. The mind collects excess data to postpone the discomfort of choice. Drop below the intellect and notice what your gut and physical body already register.",
      reflectionQuestion: "Which choice would you make if you did not need anyone else to validate or approve of it?",
      suggestedAction: {
        label: "Draw Today's Card",
        href: "/sanctum/tarot",
        type: "tarot",
      },
    };
  }

  // 5. Ritual / Working / Ingredients / Pantry
  if (text.includes("ritual") || text.includes("working") || text.includes("spell") || text.includes("herb") || text.includes("candle") || text.includes("altar")) {
    return {
      reply: "In the Witchr tradition, ritual is conscious psychological architecture enacted through physical correspondence. You do not need exotic curios to focus intent—common cabinet staples like rosemary for mental acuity, coarse salt for grounding boundaries, and a single black candle provide a complete ceremonial engine.",
      reflectionQuestion: "What tangible everyday action will you take to physically match the ritual intention you formulate?",
      suggestedAction: {
        label: "Create a Working",
        href: "/sanctum/working",
        type: "working",
      },
    };
  }

  // 6. Tarot / Pull a card / Spread
  if (text.includes("card") || text.includes("tarot") || text.includes("spread") || text.includes("pull")) {
    return {
      reply: "The cards act as reflective mirrors for unconscious patterns. A single card diagnostic illuminates the dominant atmospheric current of your immediate day, while a triad spread deconstructs your present friction into ground truth, resistance, and conscious guidance.",
      reflectionQuestion: "Are you prepared to receive a perspective that challenges your current assumptions?",
      suggestedAction: {
        label: "Lay a Three-Card Spread",
        href: "/sanctum/tarot/three-card",
        type: "spread",
      },
    };
  }

  // 7. General reflective counsel
  return {
    reply: "I hear what you bring into the chamber. Every inquiry begins by stripping away mundane noise and naming what is actually present. In the Sanctum, we do not bypass physical reality or wait for passive signs; we look directly at where your energy is bound, clarify your ground truth, and formulate deliberate action.",
    reflectionQuestion: "What is the simplest, most honest sentence that summarizes what you are experiencing right now?",
    suggestedAction: {
      label: "Draw Today's Card",
      href: "/sanctum/tarot",
      type: "tarot",
    },
  };
}
