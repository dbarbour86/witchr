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
 * Analyzes query intent across distinct psychological and practical categories
 * (work/career, relationships/conflict, clarity/stuck, procrastination/motivation,
 * anxiety/overwhelm, grief/loss, confidence/self-worth, grounding/protection,
 * ritual/working, tarot, predictive, safety, and generic)
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

  // 2. Predictive question reframing ("will I", "when will", "future", "is he/she", "get rich")
  const isPredictive = /\b(will i|will he|will she|will they|will we|when will|going to happen|future hold|am i going to|tell my future|get rich|become rich|find love|win the)\b/i.test(text);
  if (isPredictive) {
    const isWealthQuestion = /\b(rich|wealth|money|lottery|millionaire)\b/i.test(text);
    return {
      reply: isWealthQuestion
        ? "The Oracle does not traffic in fixed prophecy or promises of sudden fortune. Wealth and material stability in the Sanctum tradition are not granted by celestial lottery; they are built through disciplined energy, sharp boundaries, and persistent mundane craft. When we fixate on whether next year brings wealth, we are often longing for relief from current insecurity. Real prosperity begins by taking conscious command of the resources and decisions directly in front of you today."
        : "The Oracle does not traffic in fixed prophecy or fatalistic certainty. The future is not a predetermined script waiting to unfold; it is continuously woven from the micro-choices and boundaries you enact today. When we demand to know the outcome in advance, we usually seek relief from the discomfort of uncertainty. Drop the demand for guaranteed outcomes and claim command of your immediate actions.",
      reflectionQuestion: isWealthQuestion
        ? "If financial security requires disciplined daily sovereignty rather than sudden luck, what concrete habit must you begin cultivating today?"
        : "If you released your fixation on how this story concludes, what is the single most honest action you must take today?",
      suggestedAction: {
        label: "Draw Today's Card",
        href: "/sanctum/tarot",
        type: "tarot",
      },
    };
  }

  // 3. Grounding / Protection / Energetic Perimeters (check before general ritual)
  const isGroundingOrProtection = /\b(ground|grounded|grounding|protect|protection|shield|shielding|ward|warding|boundaries?|perimeter|centered|safe space)\b/i.test(text);
  if (isGroundingOrProtection) {
    return {
      reply: "Grounding and protection are not abstract metaphysical postures—they are concrete physical practices. Grounding begins with sensory contact: feeling gravitational contact with the earth, acknowledging the breath, and drawing scattered focus back inside your skin. Protection is simply an intentional boundary: deciding clearly what you permit across your perimeter and what you cast out with unwavering authority. You cannot be knocked off balance when your presence is anchored in your physical form.",
      reflectionQuestion: "What invasive influence, obligation, or noise are you currently tolerating that directly compromises your inner equilibrium?",
      suggestedAction: {
        label: "Create a Grounding Working",
        href: "/sanctum/working",
        type: "working",
      },
    };
  }

  // 4. Tarot / Pull a card / Spread
  const isTarot = /\b(card|tarot|spread|pull|draw a card|pull a card|deck|shuffle)\b/i.test(text);
  if (isTarot) {
    return {
      reply: "The cards act as reflective mirrors for unconscious patterns and unexamined currents. A single card diagnostic illuminates the dominant atmospheric tone of your immediate day, while a triad spread deconstructs your present friction into ground truth, resistance, and conscious guidance. They do not predict an unchangeable fate; they reveal where your energy is currently invested.",
      reflectionQuestion: "Are you prepared to receive a perspective that challenges your current assumptions rather than merely confirming what you want to hear?",
      suggestedAction: {
        label: "Lay a Three-Card Spread",
        href: "/sanctum/tarot/three-card",
        type: "spread",
      },
    };
  }

  // 5. Work / Career / Finances / Livelihood
  const isCareerOrWork = /\b(job|career|work|workplace|boss|coworker|colleague|profession|vocation|salary|money|finances?|financial|business|layoff|laid off|hired|fired|interview|promotion|resume|client|office)\b/i.test(text);
  if (isCareerOrWork) {
    const hasMoneyTension = /\b(money|salary|afford|finances?|financial|paycheck|broke|earn)\b/i.test(text);
    return {
      reply: hasMoneyTension
        ? "Work and livelihood are where personal sovereignty most directly collides with survival needs. When you feel trapped between acute dissatisfaction and financial dread, your fear is not irrational—it is protecting your physical security. But enduring without a strategy slowly erodes your vitality. The first step is decoupling what is tolerable in the short term from what you are actively building in secret for the long term. Acknowledge the financial constraint as ground truth, but stop letting it dictate your entire sense of what is possible."
        : "Career friction is often a crisis of alignment between your inner values and external output. When your daily labor feels draining or directionless, examine whether you have outgrown the perimeter you originally built for yourself. You do not have to dismantle your livelihood overnight, but you must stop pretending that remaining in stagnation will eventually produce fulfillment. Growth requires tolerating the uncertainty of stepping into unfamiliar territory.",
      reflectionQuestion: hasMoneyTension
        ? "What part of your current work situation is truly an unchangeable financial constraint, and what part is fear pretending that no alternatives exist?"
        : "What standard of security or external validation are you maintaining at the expense of your actual fulfillment?",
      suggestedAction: {
        label: "Lay a Three-Card Spread",
        href: "/sanctum/tarot/three-card",
        type: "spread",
      },
    };
  }

  // 6. Relationship / Conflict / Relational Boundaries
  const isRelationshipOrConflict = /\b(partner|relationship|marriage|dating|spouse|husband|wife|boyfriend|girlfriend|friend|friendship|betray|betrayed|betrayal|trust|cheat|cheated|argue|arguing|argument|fight|fighting|breakup|broken up|divorce|ex\b|conflict|mother|father|parent|sibling|family)\b/i.test(text);
  if (isRelationshipOrConflict) {
    const hasBetrayal = /\b(betray|betrayed|betrayal|trust|cheat|cheated|lied|deceiv)\b/i.test(text);
    return {
      reply: hasBetrayal
        ? "Betrayal forces an abrupt and painful reckoning: it shatters your model of who someone was and forces you to confront who they actually are. In the Sanctum tradition, we do not bypass this sting with premature forgiveness. Honor the grief of broken trust, but do not internalize the other person's dishonor as proof of your own inadequacy. Rebuilding begins by reinforcing the boundaries around your own sanctuary."
        : "Relational friction often arises when surface arguments mask unexpressed boundaries or unspoken disappointments. When conflicts recur without resolution, both people are rarely fighting about the topic at hand; they are defending their emotional safety and personal sovereignty. Notice where your responsibility ends and the other person's begins. You cannot force another to understand you, but you can become uncompromisingly clear about what you will and will not tolerate.",
      reflectionQuestion: hasBetrayal
        ? "What red flag or intuitive whisper did you talk yourself out of noticing, and how will you honor your inner discernment moving forward?"
        : "What difficult truth have you withheld to maintain artificial peace, and what would it cost you to speak it plainly?",
      suggestedAction: {
        label: "Lay a Three-Card Spread",
        href: "/sanctum/tarot/three-card",
        type: "spread",
      },
    };
  }

  // 7. Motivation / Procrastination / Avoidance
  const isMotivationOrProcrastination = /\b(procrastinat|putting off|put off|avoid|avoiding|avoidance|delay|delaying|motivation|unmotivated|lazy|discipline|hesitat|stalling|paralyzed|paralysis)\b/i.test(text);
  if (isMotivationOrProcrastination) {
    return {
      reply: "Procrastination is rarely a character defect or lack of discipline; it is an emotional defense mechanism. You avoid the task because somewhere beneath the surface, completing it exposes you to judgment, imperfection, or the burden of what comes next. The mind creates resistance to keep you in the safe, familiar perimeter of the undone. Lower the threshold of initiation until resistance has nothing substantial to fight against—commit to ten minutes of focused action without attachment to perfection.",
      reflectionQuestion: "What standard of perfection or fear of evaluation are you secretly shielding yourself from by leaving this undone?",
      suggestedAction: {
        label: "Create a Working",
        href: "/sanctum/working",
        type: "working",
      },
    };
  }

  // 8. Anxiety / Overwhelm / Exhaustion / Feeling Off
  const isAnxietyOrOverwhelm = /\b(anxious|anxiety|overwhelm|overwhelmed|panic|panicking|stress|stressed|burnout|burned out|exhausted|exhaustion|can't breathe|chest tight|racing mind|spinning|off all week|feeling off|felt off|frazzled|dread)\b/i.test(text);
  if (isAnxietyOrOverwhelm) {
    return {
      reply: "When the body feels 'off' or overwhelmed without a single identifiable crisis, your nervous system is processing cumulative ambient load. Modern life demands continuous cognitive availability, fragmenting your attention and depleting your reserves. In the Sanctum, we do not analyze overwhelm through more thinking. We return to the somatic ground: drop your shoulders, feel the floor beneath your feet, and narrow your horizon to the next sixty minutes.",
      reflectionQuestion: "If you set aside every expectation that does not genuinely expire today, what is the single demand that actually requires your presence?",
      suggestedAction: {
        label: "Draw Today's Card",
        href: "/sanctum/tarot",
        type: "tarot",
      },
    };
  }

  // 9. Grief / Loss / Heartbreak
  const isGriefOrLoss = /\b(grief|grieving|grieve|mourn|mourning|loss|lost someone|death|died|passed away|heartbreak|heartbroken|sorrow|crying|sadness|letting go)\b/i.test(text);
  if (isGriefOrLoss) {
    return {
      reply: "Grief is not a dysfunction to be repaired or an obstacle to rush past; it is the natural consequence of having loved or valued something deeply. When a loss occurs, whether of a person, an identity, or an expectation, the mind struggles to map a world that no longer matches memory. Allow the sorrow to be an honored guest in your chamber rather than an adversary to silence. There is profound dignity in mourning what mattered.",
      reflectionQuestion: "What truth or memory deserves your tender reverence today, without any pressure to 'move on' or justify your feelings?",
      suggestedAction: {
        label: "Draw Today's Card",
        href: "/sanctum/tarot",
        type: "tarot",
      },
    };
  }

  // 10. Confidence / Self-Worth / Imposter Feelings
  const isConfidenceOrSelfWorth = /\b(confidence|confident|self-worth|imposter|inadequate|not good enough|insecure|insecurity|unworthy|worthless|self-doubt|doubt myself|ashamed|shame|compare myself|comparing myself|failure|fail|failed)\b/i.test(text);
  if (isConfidenceOrSelfWorth) {
    return {
      reply: "Self-doubt is the tax of expanding your perimeter. Whenever you step toward greater competence or visibility, the older, defensive parts of your psyche sound an alarm to pull you back to familiar safety. True sovereignty does not require the complete elimination of fear or insecurity; it requires acting in alignment with your values while the doubt speaks in the background. Stop waiting to feel confident before you claim your rightful space.",
      reflectionQuestion: "Whose standard or judgment are you measuring yourself against right now, and did you ever consciously choose to grant them that authority?",
      suggestedAction: {
        label: "Lay a Three-Card Spread",
        href: "/sanctum/tarot/three-card",
        type: "spread",
      },
    };
  }

  // 11. Ritual / Working / Physical Craft
  const isRitual = /\b(ritual|working|spell|altar|ceremony|candle|herb|incense|grimoire|craft|magic|magick)\b/i.test(text);
  if (isRitual) {
    return {
      reply: "In the Witchr tradition, ritual is conscious psychological architecture enacted through physical correspondence. You do not need ornate tools or rare relics to focus intent. Common cabinet staples—rosemary for mental acuity, coarse salt for perimeter boundaries, and a single black candle—provide a complete ceremonial engine when charged with deliberate focus. Physical ritual gives your unconscious mind tangible evidence of a conscious commitment.",
      reflectionQuestion: "What tangible everyday action will you pair with this ritual to anchor its intention into physical reality?",
      suggestedAction: {
        label: "Create a Working",
        href: "/sanctum/working",
        type: "working",
      },
    };
  }

  // 12. Uncertainty / Clarity / Dilemma / Decision / Feeling Stuck
  const isUncertaintyOrClarity = /\b(clarity|unclear|uncertain|uncertainty|confus|confused|confusion|decid|decision|crossroads|direction|choice|choose|dilemma|torn|stuck|blocked|friction)\b/i.test(text);
  if (isUncertaintyOrClarity) {
    const isStuck = /\b(stuck|blocked|friction|can't move)\b/i.test(text);
    return {
      reply: isStuck
        ? "Feeling stuck is rarely an absence of momentum; it is usually two opposing desires pulling with equal force. One part of you demands movement, while another protects you from the exposure, failure, or exhaustion that movement would require. Acknowledge the friction as diagnostic information rather than a flaw. Until both desires are named, no forward motion is possible."
        : "When you feel torn between paths or stalled in confusion, more thinking rarely delivers clarity. The intellect often collects excess information as a stalling tactic to avoid the discomfort of commitment. True clarity does not arrive before the choice; it forms in the wake of deliberate motion. Drop below the intellect and notice what your gut and physical body already register.",
      reflectionQuestion: isStuck
        ? "What hidden benefit or safety does remaining still currently provide you?"
        : "Which choice would you make if you did not need anyone else to validate or approve of it?",
      suggestedAction: {
        label: "Draw Today's Card",
        href: "/sanctum/tarot",
        type: "tarot",
      },
    };
  }

  // 13. General reflective counsel (catch-all)
  return {
    reply: "I receive what you bring into the chamber. Every meaningful inquiry begins by paring away external noise and naming the core current running beneath your thoughts. In the Sanctum, we do not search for magical shortcuts; we examine where your energy is bound, identify what is within your sovereignty, and formulate deliberate steps.",
    reflectionQuestion: "What is the single most honest sentence that describes the heart of what you are experiencing today?",
    suggestedAction: {
      label: "Draw Today's Card",
      href: "/sanctum/tarot",
      type: "tarot",
    },
  };
}
