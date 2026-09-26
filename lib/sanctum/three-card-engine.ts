import { SanctumTarotCard, SANCTUM_TAROT_DECK } from "@/content/sanctum-tarot";

export type SpreadPositionKey = "situation" | "challenge" | "guidance";

export interface SpreadPositionConfig {
  key: SpreadPositionKey;
  numeral: string;
  label: string;
  inquiry: string;
}

export const THREE_CARD_POSITIONS: SpreadPositionConfig[] = [
  {
    key: "situation",
    numeral: "I",
    label: "Situation",
    inquiry: "What is most present or relevant right now?",
  },
  {
    key: "challenge",
    numeral: "II",
    label: "Challenge",
    inquiry: "What tension, obstacle, pattern, or blind spot deserves attention?",
  },
  {
    key: "guidance",
    numeral: "III",
    label: "Guidance",
    inquiry: "What perspective or action may help move forward?",
  },
];

/**
 * Deterministic position-specific interpretations for the initial 5-card MVP deck.
 * Contextualizes each card according to its position in the triad spread.
 */
const POSITION_INTERPRETATIONS: Record<string, Record<SpreadPositionKey, string>> = {
  card_00_fool: {
    situation:
      "The Fool marks a clean threshold or the onset of an unfamiliar chapter. What was previously structured has loosened, placing you at the starting line of something you cannot yet fully map.",
    challenge:
      "The friction of The Fool lies in the urge to demand absolute guarantees before taking a step. You may be using endless analysis or waiting for perfect validation to avoid the necessary vulnerability of beginning.",
    guidance:
      "Adopt a beginner’s posture. Drop the burden of having to appear already seasoned or unshakeable. Take one sovereign, imperfect step into the open space without waiting for permission.",
  },
  card_01_magician: {
    situation:
      "The Magician indicates that the fundamental tools, resources, and influence required to navigate this matter are already in your physical possession. The raw materials are laid out on your workbench.",
    challenge:
      "The friction here is scattered focus or the temptation to tinker endlessly with plans rather than committing to direct execution. You risk substituting the illusion of preparation for actual focused labor.",
    guidance:
      "Align your direct will with what your hands can physically reach today. Strip away auxiliary noise, select your core instrument, and apply concentrated attention to the immediate lever of change.",
  },
  card_02_high_priestess: {
    situation:
      "The High Priestess shows that much of what is driving this circumstance operates beneath the surface. Unspoken motives, instinctual undertones, or quiet patterns are exerting more influence than obvious appearances.",
    challenge:
      "The difficulty here is allowing external chatter or analytical rationalization to overpower your visceral gut discernment. You may be talking yourself out of an internal truth you already recognize.",
    guidance:
      "Step back from debate and observe. Protect a pocket of silence before committing to a stance. Listen to what your body and quiet intuition report when you stop looking for external consensus.",
  },
  card_14_temperance: {
    situation:
      "Temperance marks a dynamic requiring careful blending and continuous calibration. Different pressures, obligations, or emotions are in play, requiring steady hands to maintain equilibrium rather than sudden rupture.",
    challenge:
      "The friction of Temperance is the temptation toward all-or-nothing extremes or restless impatience. You may be trying to force a swift outcome when what is actually needed is the stamina to let elements distill in their own time.",
    guidance:
      "Practice conscious moderation and gradual adjustment. Do not swing between reactive poles; blend opposing considerations patiently. Small, steady corrections will yield far greater leverage than a dramatic overreaction.",
  },
  card_18_moon: {
    situation:
      "The Moon shows that this circumstance is steeped in ambiguity, unverified projections, or submerged emotional currents. Not all facts are visible in the daylight, and much is being filtered through fear or imagination.",
    challenge:
      "The obstacle here is mistaking anxious illusions for objective truth. You risk reacting to shadowy phantoms, catastrophizing unverified signals, or allowing unexamined dread to distort your discernment.",
    guidance:
      "Navigate by instinct, not paranoia. Slow down and refuse to draw hasty conclusions while the fog is thick. Distinguish between what you actually know for certain and what your anxiety is projecting into the dark.",
  },
  card_09_hermit: {
    situation:
      "The Hermit marks a phase of necessary interiority and deliberate stepping back. The matter at hand cannot be resolved through collective consensus; it requires private examination and personal alignment.",
    challenge:
      "The risk is falling into defensive isolation or withdrawing out of bitterness rather than discernment. Alternatively, you may be terrified of quiet solitude because of the uncomfortable truths it surfaces.",
    guidance:
      "Carry your own lantern. Measure your next decision against your private internal standards rather than external approval. Dim the room, close the door, and proceed by the light of your own quiet integrity.",
  },
  card_13_death: {
    situation:
      "Death indicates that a definite cycle, role, or dynamic has reached its natural conclusion. What is present is the quiet transition phase where old forms are giving way to make room for what comes next.",
    challenge:
      "The resistance lies in clinging to dead momentum out of comfort or fear of the unknown. Attempting to keep an expired pattern on artificial life support drains the vitality needed for new growth.",
    guidance:
      "Allow the severance to be clean. Acknowledge what has run its course with dignity and release your grip without drama or self-recrimination. Clearing the ground is itself the creative act.",
  },
};

/**
 * Retrieves the contextual meaning for a specific card in a specific spread position.
 */
export function getCardPositionMeaning(card: SanctumTarotCard, position: SpreadPositionKey): string {
  const cardMap = POSITION_INTERPRETATIONS[card.id];
  if (cardMap && cardMap[position]) {
    return cardMap[position];
  }
  // Graceful fallback to card's default reflective interpretation
  return card.reflectiveInterpretation;
}

/**
 * Shuffles the deck and draws exactly 3 UNIQUE cards with no duplicates.
 */
export function drawThreeUniqueCards(): [SanctumTarotCard, SanctumTarotCard, SanctumTarotCard] {
  const deckCopy = [...SANCTUM_TAROT_DECK];

  // Fisher-Yates shuffle
  for (let i = deckCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deckCopy[i], deckCopy[j]] = [deckCopy[j], deckCopy[i]];
  }

  return [deckCopy[0], deckCopy[1], deckCopy[2]];
}

export interface OracleSynthesisResult {
  pattern: string;
  consider: string;
  carryWithYou: string;
}

/**
 * Deterministic synthesis engine combining Situation, Challenge, and Guidance cards.
 * Bridges the three cards into a cohesive narrative and acknowledges the user's question if provided.
 * Reusable and designed to be replaced or augmented with AI in future phases.
 */
export function generateOracleSynthesis(
  situation: SanctumTarotCard,
  challenge: SanctumTarotCard,
  guidance: SanctumTarotCard,
  question?: string
): OracleSynthesisResult {
  const cleanQuestion = question?.trim();
  const inquiryLead = cleanQuestion
    ? `In looking at your inquiry regarding “${cleanQuestion}”, the cards outline a clear diagnostic trajectory.`
    : `The cards present a clear diagnostic trajectory across your current circumstance.`;

  // Dynamic synthesis narrative based on card interplay
  const patternParagraph = `${inquiryLead} At the base, ${situation.name} (${situation.numeral}) establishes your present ground truth: you are navigating ${situation.shortKeywords[0].toLowerCase()} and ${situation.shortKeywords[1].toLowerCase()}. However, the central friction is exposed by ${challenge.name} (${challenge.numeral}), where ${challenge.shortKeywords[0].toLowerCase()} risks hardening into an obstacle or unexamined pattern. Moving forward does not mean brute-forcing the friction, but pivoting through the counsel of ${guidance.name} (${guidance.numeral})—choosing ${guidance.shortKeywords[0].toLowerCase()} to restore clean sovereignty and intentional momentum.`;

  // Contextual reflective question synthesized from Challenge + Guidance
  const considerPrompt = `How does the perspective in ${guidance.name} directly dissolve the friction you are encountering in ${challenge.name}?`;

  // Cohesive practical takeaway combining Guidance + Situation
  const carryTakeaway = `Anchor your day in the posture of ${guidance.name}: ${guidance.practicalTakeaway}`;

  return {
    pattern: patternParagraph,
    consider: considerPrompt,
    carryWithYou: carryTakeaway,
  };
}
