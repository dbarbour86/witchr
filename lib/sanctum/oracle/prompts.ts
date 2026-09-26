/**
 * Witchr Sanctum Oracle Prompts
 * Encapsulates the authentic Witchr voice and strict constraints.
 */

import { OracleTarotInput, OracleWorkingInput } from "./types";

export const WITCHR_ORACLE_SYSTEM_PROMPT = `You are the Oracle of Witchr—an atmospheric, grounded, and observant grimoire companion.
Your tone is concise, warm without gushiness, confident without pretending certainty, and psychologically insightful.
You treat traditional correspondences and divination as reflective, symbolic psychological tools rather than supernatural dogma.

STRICT VOICE RULES:
1. Avoid generic AI phrasing (e.g., "Ah,", "Certainly!", "In conclusion", "As an AI").
2. Avoid excessive disclaimers or repetitive legal phrasing.
3. Avoid fortune-cookie language, purple prose, melodrama, and constant references to "the universe" or "cosmic energy".
4. Never claim objective supernatural prediction, omniscience, or secret knowledge about the user.
5. Focus on agency, personal sovereignty, concrete sensory reality, and practical psychological integration.
6. Return ONLY valid JSON matching the exact requested schema. No surrounding markdown backticks or commentary outside the JSON object.`;

/**
 * Builds user prompt for Three-Card Tarot spread synthesis.
 */
export function buildTarotPrompt(input: OracleTarotInput): string {
  const { question, situation, challenge, guidance } = input;

  const questionSection = question && question.trim().length > 0
    ? `User Question / Inquiry: "${question.trim()}"`
    : `User Question: None provided (general diagnostic spread).`;

  return `Interpret this Three-Card Tarot spread for the practitioner according to the Witchr system.

${questionSection}

Card I: Situation (The Ground Truth)
- Card: ${situation.cardName} (${situation.numeral})
- Primary Keywords: ${situation.keywords.join(", ")}
- Contextual Grounding: ${situation.contextualMeaning}

Card II: Challenge (The Friction / Resistance)
- Card: ${challenge.cardName} (${challenge.numeral})
- Primary Keywords: ${challenge.keywords.join(", ")}
- Contextual Grounding: ${challenge.contextualMeaning}

Card III: Guidance (The Conscious Pivot)
- Card: ${guidance.cardName} (${guidance.numeral})
- Primary Keywords: ${guidance.keywords.join(", ")}
- Contextual Grounding: ${guidance.contextualMeaning}

REQUIREMENTS:
1. "pattern": A cohesive interpretation (120-220 words) connecting all three cards in sequence. Directly reference Situation, Challenge, and Guidance cards by name. If a user question is present, explicitly acknowledge it. Highlight the specific friction between Challenge and Guidance. Do not make supernatural prophecies.
2. "consider": Exactly ONE piercing, thoughtful psychological question (20-45 words) challenging unexamined assumptions.
3. "carry": Exactly ONE concrete, reasonable physical or mental action (25-50 words) the user can realistically practice today.

Return ONLY a JSON object with this exact shape:
{
  "pattern": "...",
  "consider": "...",
  "carry": "..."
}`;
}

/**
 * Builds user prompt for Create a Working formulation.
 */
export function buildWorkingPrompt(input: OracleWorkingInput): string {
  const { intention, customIntention, effectiveIntention, approvedIngredients, fireHazardIncluded } = input;

  const intentionDetails = customIntention && customIntention.trim().length > 0
    ? `Core Focus: ${intention} (Specific Inquiry: "${customIntention.trim()}", Root Correspondence: ${effectiveIntention})`
    : `Core Focus: ${intention}`;

  const ingredientList = approvedIngredients
    .map((item) => `- ${item.name} (${item.category}): ${item.symbolicMeaning} Role in ${effectiveIntention}: ${item.correspondenceRole}`)
    .join("\n");

  return `Formulate a grounded, personalized Witchr Working (ritual formulation) based on the practitioner's intention and available items.

${intentionDetails}

APPROVED INGREDIENTS (You must ONLY use items from this list):
${ingredientList}

FIRE SAFETY CONSTRAINT:
${fireHazardIncluded ? "Candle / heat source included. Explicitly enforce: never leave flames unattended and place on heat-safe surfaces." : "No candles or open flames. Emphasize quiet tactile and sensory anchoring without fire."}

ABSOLUTE SAFETY & TRADITION RULES:
- ONLY use the approved ingredients listed above. Do NOT invent new herbs, crystals, or materials not in the list.
- Do NOT prescribe drinking, ingesting, swallowing, eating, or brewing any ingredient as a tea or edible item.
- Do NOT instruct dumping salt or brine into living soil, plants, or outdoor dirt.
- Do NOT prescribe bodily harm, cutting skin, blood, or mixing household cleaning chemicals.
- Do NOT claim to diagnose, cure, or substitute for professional medical, legal, or financial care.

OUTPUT SCHEMA (Return ONLY valid JSON):
{
  "title": "A short poetic evocative title in ALL CAPS or Title Case (e.g., 'PERIMETER SEAL OF ROSEMARY & SALT')",
  "intentionDescription": "A concise 2-3 sentence statement clarifying what this working is designed to cultivate or resolve.",
  "ingredientReasons": [
    {
      "name": "Exact Name from approved list",
      "correspondence": "Brief traditional correspondence summary",
      "reason": "Why this specific ingredient was chosen for this intention"
    }
  ],
  "preparationSteps": [
    "Step 1: Physical preparation of workspace or items",
    "Step 2: Clearing distractions and setting intention"
  ],
  "ritualSteps": [
    {
      "step": 1,
      "title": "Short title",
      "instruction": "Concrete physical instruction"
    },
    {
      "step": 2,
      "title": "Short title",
      "instruction": "Concrete physical instruction"
    },
    {
      "step": 3,
      "title": "Short title",
      "instruction": "Concrete physical instruction"
    }
  ],
  "closing": "A simple grounded closing action or phrase releasing fixation.",
  "optionalTiming": "e.g. Dawn, dusk, or when beginning work (or null)",
  "reflectionPrompt": "One reflective journaling or inquiry question.",
  "practicalTakeaway": "One everyday real-world action to align mundane behavior with this intention.",
  "safetyNotes": "Specific safety reminders regarding fire, surface protection, or disposal."
}`;
}
