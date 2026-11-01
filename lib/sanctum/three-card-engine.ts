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
  card_03_empress: {
    situation:
      "The Empress indicates that the ground beneath you is fertile and receptive. What you are engaging with has the capacity for genuine, organic expansion, provided it receives patient cultivation and sensory presence.",
    challenge:
      "The friction here is demanding hurried results or attempting to force an inorganic pace. You risk depleting your own reserves by over-giving or treating a delicate creative gestation like a mechanical emergency.",
    guidance:
      "Nourish the roots before demanding fruit. Protect your physical vitality and allow the process to unfold in its own rhythm. Tend the conditions of growth with generosity and quiet confidence.",
  },
  card_04_emperor: {
    situation:
      "The Emperor establishes a need for structural clarity, firm perimeters, and sober governance. The circumstance requires an authoritative hand to establish order where ambiguity has created instability.",
    challenge:
      "The danger is confusing rigid control with genuine authority. You may be attempting to micromanage unpredictable elements out of unexpressed anxiety, or conversely, neglecting to enforce necessary boundaries.",
    guidance:
      "Build the scaffold. Define non-negotiable boundaries, establish clear operational standards, and take sovereign responsibility for directing what is under your direct jurisdiction.",
  },
  card_05_hierophant: {
    situation:
      "The Hierophant marks a situation governed by foundational principles, lineage wisdom, or structured frameworks. The solution calls for aligning with proven traditions rather than improvising from scratch.",
    challenge:
      "The friction of The Hierophant lies in rigid dogmatism or blind conformity. You may be clinging to obsolete rules out of fear of nonconformity, or rejecting sound counsel purely out of reflexive defiance.",
    guidance:
      "Anchor your decision in enduring principles. Consult credible mentorship or time-tested frameworks, while filtering the advice through your own authentic ethical discernment.",
  },
  card_06_lovers: {
    situation:
      "The Lovers marks an essential crossroads where personal values and authentic desire must align. You stand before a choice that cannot be resolved through compromise or superficial appeasement.",
    challenge:
      "The friction lies in moral ambivalence or trying to remain in two contradictory postures simultaneously. Straddling the fence preserves an illusion of safety while slowly bleeding away conviction.",
    guidance:
      "Choose from wholeness. Commit fully to the path that reflects your core integrity rather than external validation. Wholehearted allegiance to one direction unlocks clarity.",
  },
  card_07_chariot: {
    situation:
      "The Chariot shows that dynamic momentum has gathered, but competing drives or conflicting demands threaten to pull the reins in opposite directions. Forward passage requires concentrated mastery.",
    challenge:
      "The hazard is losing your center under acceleration or letting internal doubts steer the course. Fragmented effort or reactive aggression will overturn your progress.",
    guidance:
      "Harness opposing forces toward a single focal point. Grip your central intention firmly, ignore peripheral disruptions, and drive steadily through the friction with unwavering discipline.",
  },
  card_08_strength: {
    situation:
      "Strength marks a circumstance where raw emotional intensity or formidable resistance is present. True progress will not come through brute force, but through grounded composure and enduring resolve.",
    challenge:
      "The obstacle is falling into reactive anger or collapsing under sustained pressure. Lashing out or retreating into wounded silence only gives volatility the upper hand.",
    guidance:
      "Subdue the roaring lion with gentle mastery. Meet hostility or inner doubt with steady breathing, calm dignity, and unshakable patience. Fortitude that refuses to panic always outlasts aggression.",
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
 * Bridges the three cards into a cohesive narrative grounded in each card's spread position,
 * directly acknowledging the user's inquiry, and avoiding canned repetitive formulas.
 */
export function generateOracleSynthesis(
  situation: SanctumTarotCard,
  challenge: SanctumTarotCard,
  guidance: SanctumTarotCard,
  question?: string
): OracleSynthesisResult {
  const cleanQuestion = question?.trim();

  // Position-specific contextual meanings
  const situationMeaning = getCardPositionMeaning(situation, "situation");
  const challengeMeaning = getCardPositionMeaning(challenge, "challenge");
  const guidanceMeaning = getCardPositionMeaning(guidance, "guidance");

  // Dynamic contextual opening connecting spread
  const opening = cleanQuestion
    ? `Looking directly into your inquiry regarding “${cleanQuestion}”, the cards outline a clear diagnostic trajectory across your situation.`
    : `The triad reveals a clear progression connecting your immediate ground truth to conscious resolution.`;

  // Connected narrative weaving Situation -> Challenge -> Guidance
  const narrative = `${opening} At the foundation, ${situation.name} (${situation.numeral}) establishes your present ground reality: ${situationMeaning} Yet this dynamic encounters acute resistance in ${challenge.name} (${challenge.numeral}), where ${challengeMeaning.toLowerCase().replace(/^[a-z]/, (c) => c.toLowerCase())} Rather than reacting impulsively or attempting to force an outcome, the conscious pivot lies in ${guidance.name} (${guidance.numeral}): ${guidanceMeaning}`;

  // Piercing psychological reflection tailored to the cards
  const considerPrompt = cleanQuestion
    ? `Regarding “${cleanQuestion}”, how does adopting the stance of ${guidance.name} dissolve the specific friction highlighted by ${challenge.name}?`
    : `Where is the tension in ${challenge.name} inviting you to step into the conscious maturity of ${guidance.name}?`;

  // Concrete, non-generic practical takeaway
  const carryTakeaway = cleanQuestion
    ? `In direct response to “${cleanQuestion}”, align your actions with ${guidance.name}: ${guidance.practicalTakeaway}`
    : `Carry the counsel of ${guidance.name} into your day: ${guidance.practicalTakeaway}`;

  return {
    pattern: narrative,
    consider: considerPrompt,
    carryWithYou: carryTakeaway,
  };
}
