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
    customIngredients: input.unmappedCustomIngredients,
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
      leftOutIngredients: w.leftOutIngredients || input.leftOutIngredients,
    };
  }

  const isMorning = input.timingCue === "morning";

  // Ultra-safe hardcoded fallback if synthetic working failed
  return {
    title: `SOVEREIGN RITUAL FOR ${(input.effectiveIntention || input.intention).toUpperCase()}`,
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
    optionalTiming: isMorning ? "Sunrise or upon waking" : "Evening or dawn",
    reflectionPrompt: isMorning
      ? "What intentional tone will you protect throughout the hours ahead today?"
      : "What single habit currently weakens this intention, and what boundary will protect it?",
    practicalTakeaway: isMorning
      ? "Take a deliberate moment of quiet before engaging with digital messages or morning tasks."
      : "Take one tangible real-world step today that directly mirrors this ritual commitment.",
    safetyNotes: input.fireHazardIncluded ? "Place all candles on heat-safe surfaces. Never leave burning candles unattended." : null,
    leftOutIngredients: input.leftOutIngredients,
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
  const historyText = (input.history || []).map((m) => m.content).join(" ").toLowerCase();
  const combinedContext = `${historyText} ${text}`;

  // 1. Safety / Hazardous input redirection
  const isHarmOrVengeance = /\b(harm|revenge|curse|hex|kill|hurt|destroy|bleed|blood|poison)\b/i.test(text);
  if (isHarmOrVengeance) {
    return {
      reply: "The Sanctum practice is grounded strictly in personal sovereignty, inner alignment, and protective boundaries. We do not traffic in harm, curses, or attempts to exert destructive control over others. When the urge to lash outward arises, it almost always signals a violated personal boundary or unresolved powerlessness within.",
      reflectionQuestion: "What personal boundary in your physical life needs reinforcement right now, independent of what anyone else does?",
      suggestedAction: {
        label: "Create a Ritual",
        href: "/sanctum/working",
        type: "working",
      },
    };
  }

  // 2. Direct requests for ONE small action / next step (2-5 minute micro-action)
  const isRequestingAction = /\b(one\s+small\s+(?:action|step)|small\s+(?:action|step)|what\s+(?:can|should)\s+i\s+do|next\s+step|give\s+me\s+one|what\s+now|start\s+small|where\s+do\s+i\s+start|how\s+do\s+i\s+start|what\s+to\s+do)\b/i.test(text);
  const isDirectQuestionOrAction = isRequestingAction || /\b(what\s+is|what\s+are|how\s+do\s+i|can\s+you\s+give|tell\s+me\s+how|give\s+me)\b/i.test(text);

  if (isRequestingAction) {
    const isMoneyContext = /\b(money|financ|bill|bank|debt|budget|dollar|expense|paycheck|broke|afford|salary)\b/i.test(combinedContext);
    if (isMoneyContext) {
      return {
        reply: "Log into your bank account or pick up the single unopened statement you have been avoiding. Look at that one balance, write the number down on paper in black ink, and close it. Don't calculate a total, build a budget, or plan out the month. The goal is simply to bring that single number out of the dark. Once it is in ink, take one slow breath—you have faced the number, and you are still intact.",
        reflectionQuestion: undefined,
        suggestedAction: {
          label: "Create a Ritual",
          href: "/sanctum/working?intention=" + encodeURIComponent("Calm focus around finances"),
          type: "working",
        },
      };
    }

    const isStuckOrProcrastinating = /\b(procrastinat|avoid|delay|stuck|blocked|hesitat)\b/i.test(combinedContext);
    if (isStuckOrProcrastinating) {
      return {
        reply: "Pick the one task causing friction and set a timer for three minutes. Open the document or set out the single tool you need, write one rough sentence or clear one single surface, and stop when the timer sounds. Do not try to finish the whole project today. Lower the initiation threshold so resistance has nothing left to push against.",
        reflectionQuestion: undefined,
        suggestedAction: {
          label: "Create a Ritual",
          href: "/sanctum/working",
          type: "working",
        },
      };
    }

    const isOverwhelmed = /\b(overwhelm|anxious|anxiety|stress|panic|frazzled|burnout)\b/i.test(combinedContext);
    if (isOverwhelmed) {
      return {
        reply: "Step away from screens and drink a slow glass of cold water. Then sit down and write down the single thing on your mind that must be addressed before the sun sets, crossing off everything else until tomorrow. Give yourself permission to let the rest wait.",
        reflectionQuestion: undefined,
        suggestedAction: {
          label: "Draw Today's Card",
          href: "/sanctum/tarot",
          type: "tarot",
        },
      };
    }

    // Default 2-5 minute concrete action
    return {
      reply: "Choose the smallest physical piece of your dilemma right now. Set a timer for three minutes, take one direct action—write down the core issue, clear a single workspace surface, or send the one sentence you've held back—and step back. Do not solve the entire horizon at once.",
      reflectionQuestion: undefined,
      suggestedAction: {
        label: "Draw Today's Card",
        href: "/sanctum/tarot",
        type: "tarot",
      },
    };
  }

  // 3. Predictive question reframing ("will I", "when will", "future", "is he/she", "get rich")
  const isPredictive = /\b(will i|will he|will she|will they|will we|when will|going to happen|future hold|am i going to|tell my future|get rich|become rich|find love|win the)\b/i.test(text);
  if (isPredictive) {
    const isWealthQuestion = /\b(rich|wealth|money|lottery|millionaire)\b/i.test(text);
    return {
      reply: isWealthQuestion
        ? "The Oracle does not traffic in fixed prophecy or promises of sudden wealth. In the Sanctum tradition, financial stability is not delivered by celestial lottery; it is built through conscious discipline, clear boundaries, and grounded everyday craft. Demanding guarantees of wealth often masks anxiety about current survival. Real stability begins by taking sovereignty over the choices directly in front of you today."
        : "The Oracle does not traffic in fixed prophecy or fatalistic certainty. The future is continuously woven from the micro-choices and boundaries you enact today. When we demand to know outcomes in advance, we usually seek relief from uncertainty. Release the demand for guaranteed outcomes and claim command of your immediate actions.",
      reflectionQuestion: isDirectQuestionOrAction
        ? undefined
        : isWealthQuestion
        ? "If stability requires daily sovereignty rather than sudden luck, what concrete habit can you practice today?"
        : "If you released your fixation on how this concludes, what is the single most honest action you can take today?",
      suggestedAction: {
        label: "Draw Today's Card",
        href: "/sanctum/tarot",
        type: "tarot",
      },
    };
  }

  // 4. Grounding / Protection / Energetic Perimeters (check before general ritual)
  const isGroundingOrProtection = /\b(ground|grounded|grounding|protect|protection|shield|shielding|ward|warding|boundaries?|perimeter|centered|safe space)\b/i.test(text);
  if (isGroundingOrProtection) {
    return {
      reply: "Grounding and protection are concrete physical practices rather than abstract postures. Grounding begins with sensory contact: feeling gravitational contact with the floor, steadying your breath, and drawing scattered focus back inside your skin. Protection is simply an intentional boundary: deciding clearly what you permit across your perimeter and what you cast out with unwavering authority.",
      reflectionQuestion: isDirectQuestionOrAction
        ? undefined
        : "What invasive influence or noise are you currently tolerating that directly compromises your inner equilibrium?",
      suggestedAction: {
        label: "Create a Ritual",
        href: "/sanctum/working",
        type: "working",
      },
    };
  }

  // 5. Tarot / Pull a card / Spread
  const isTarot = /\b(card|tarot|spread|pull|draw a card|pull a card|deck|shuffle)\b/i.test(text);
  if (isTarot) {
    return {
      reply: "The cards act as reflective mirrors for unconscious patterns and unexamined currents. A single card diagnostic illuminates the dominant tone of your day, while a triad spread deconstructs your friction into ground truth, resistance, and conscious guidance. They do not predict an unchangeable fate; they reveal where your energy is currently invested.",
      reflectionQuestion: isDirectQuestionOrAction
        ? undefined
        : "Are you prepared to receive a perspective that challenges your assumptions rather than merely confirming them?",
      suggestedAction: {
        label: "Lay a Three-Card Spread",
        href: "/sanctum/tarot/three-card",
        type: "spread",
      },
    };
  }

  // 6. Work / Career / Finances / Livelihood
  const isCareerOrWork = /\b(job|career|work|workplace|boss|coworker|colleague|profession|vocation|salary|money|finances?|financial|business|layoff|laid off|hired|fired|interview|promotion|resume|client|office)\b/i.test(text);
  if (isCareerOrWork) {
    const hasMoneyTension = /\b(money|salary|afford|finances?|financial|paycheck|broke|earn)\b/i.test(text);
    return {
      reply: hasMoneyTension
        ? "Fear around money is almost always the nervous system trying to protect basic safety, not proof that you are failing. When we avoid looking, the uncertainty in our imagination grows far heavier than the actual figures on the page. You don't need to solve your entire financial future today. Grounding begins simply by pulling the fear out of your thoughts and looking at what is physically right in front of you."
        : "Career friction is often a crisis of alignment between your inner values and external output. When your daily labor feels draining, examine whether you have outgrown the perimeter you built for yourself. You don't have to dismantle your livelihood overnight, but acknowledge the strain honestly so you can make deliberate micro-adjustments.",
      reflectionQuestion: isDirectQuestionOrAction
        ? undefined
        : hasMoneyTension
        ? "If looking directly at the numbers is the hardest part, what is one quiet moment today where you can sit with just one balance without judgment?"
        : "What standard of security or external validation are you maintaining at the expense of your actual fulfillment?",
      suggestedAction: hasMoneyTension
        ? {
            label: "Create a Ritual",
            href: "/sanctum/working?intention=" + encodeURIComponent("Calm focus around finances"),
            type: "working",
          }
        : {
            label: "Lay a Three-Card Spread",
            href: "/sanctum/tarot/three-card",
            type: "spread",
          },
    };
  }

  // 7. Relationship / Conflict / Relational Boundaries
  const isRelationshipOrConflict = /\b(partner|relationship|marriage|dating|spouse|husband|wife|boyfriend|girlfriend|friend|friendship|betray|betrayed|betrayal|trust|cheat|cheated|argue|arguing|argument|fight|fighting|breakup|broken up|divorce|ex\b|conflict|mother|father|parent|sibling|family)\b/i.test(text);
  if (isRelationshipOrConflict) {
    const hasBetrayal = /\b(betray|betrayed|betrayal|trust|cheat|cheated|lied|deceiv)\b/i.test(text);
    return {
      reply: hasBetrayal
        ? "Betrayal forces an abrupt reckoning: it shatters your model of who someone was and forces you to confront who they actually are. In the Sanctum tradition, we do not bypass this sting with premature forgiveness. Honor the grief of broken trust, but do not internalize another person's dishonor as proof of your own inadequacy. Rebuilding begins by reinforcing your perimeter."
        : "Relational friction often arises when surface arguments mask unexpressed boundaries or unspoken disappointments. When conflicts recur, people are rarely fighting about the topic at hand; they are defending their emotional safety. Notice where your responsibility ends and the other person's begins. You cannot force another to understand you, but you can become clear about what you will tolerate.",
      reflectionQuestion: isDirectQuestionOrAction
        ? undefined
        : hasBetrayal
        ? "What intuitive whisper did you talk yourself out of noticing, and how will you honor your discernment moving forward?"
        : "What difficult truth have you withheld to maintain artificial peace, and what would it cost you to speak it plainly?",
      suggestedAction: {
        label: "Lay a Three-Card Spread",
        href: "/sanctum/tarot/three-card",
        type: "spread",
      },
    };
  }

  // 8. Motivation / Procrastination / Avoidance
  const isMotivationOrProcrastination = /\b(procrastinat|putting off|put off|avoid|avoiding|avoidance|delay|delaying|motivation|unmotivated|lazy|discipline|hesitat|stalling|paralyzed|paralysis)\b/i.test(text);
  if (isMotivationOrProcrastination) {
    return {
      reply: "Procrastination is rarely a lack of discipline; it is an emotional defense mechanism. You avoid the task because completing it exposes you to judgment, imperfection, or the burden of what comes next. The mind creates resistance to keep you in the safe perimeter of the undone. Lower the threshold of initiation until resistance has nothing substantial to fight against.",
      reflectionQuestion: isDirectQuestionOrAction
        ? undefined
        : "What standard of perfection or fear of evaluation are you secretly shielding yourself from by leaving this undone?",
      suggestedAction: {
        label: "Create a Ritual",
        href: "/sanctum/working",
        type: "working",
      },
    };
  }

  // 9. Anxiety / Overwhelm / Exhaustion / Feeling Off
  const isAnxietyOrOverwhelm = /\b(anxious|anxiety|overwhelm|overwhelmed|panic|panicking|stress|stressed|burnout|burned out|exhausted|exhaustion|can't breathe|chest tight|racing mind|spinning|off all week|feeling off|felt off|frazzled|dread)\b/i.test(text);
  if (isAnxietyOrOverwhelm) {
    return {
      reply: "When your body feels overwhelmed without a single crisis, your nervous system is processing cumulative ambient load. In the Sanctum, we do not analyze overwhelm through more thinking. We return to somatic ground: drop your shoulders, feel the floor beneath your feet, and narrow your horizon to the next hour.",
      reflectionQuestion: isDirectQuestionOrAction
        ? undefined
        : "If you set aside every expectation that does not genuinely expire today, what is the single demand that actually requires your presence?",
      suggestedAction: {
        label: "Draw Today's Card",
        href: "/sanctum/tarot",
        type: "tarot",
      },
    };
  }

  // 10. Grief / Loss / Heartbreak
  const isGriefOrLoss = /\b(grief|grieving|grieve|mourn|mourning|loss|lost someone|death|died|passed away|heartbreak|heartbroken|sorrow|crying|sadness|letting go)\b/i.test(text);
  if (isGriefOrLoss) {
    return {
      reply: "Grief is not a dysfunction to be repaired or an obstacle to rush past; it is the natural consequence of having loved or valued something deeply. When a loss occurs, the mind struggles to map a world that no longer matches memory. Allow the sorrow to be an honored guest rather than an adversary to silence. There is dignity in mourning what mattered.",
      reflectionQuestion: isDirectQuestionOrAction
        ? undefined
        : "What truth or memory deserves your tender reverence today, without any pressure to justify your feelings?",
      suggestedAction: {
        label: "Draw Today's Card",
        href: "/sanctum/tarot",
        type: "tarot",
      },
    };
  }

  // 11. Confidence / Self-Worth / Imposter Feelings
  const isConfidenceOrSelfWorth = /\b(confidence|confident|self-worth|imposter|inadequate|not good enough|insecure|insecurity|unworthy|worthless|self-doubt|doubt myself|ashamed|shame|compare myself|comparing myself|failure|fail|failed)\b/i.test(text);
  if (isConfidenceOrSelfWorth) {
    return {
      reply: "Self-doubt is the tax of expanding your perimeter. Whenever you step toward greater competence or visibility, the protective parts of your psyche sound an alarm to pull you back to familiar safety. True sovereignty does not require eliminating fear; it requires acting in alignment with your values while doubt speaks in the background.",
      reflectionQuestion: isDirectQuestionOrAction
        ? undefined
        : "Whose standard or judgment are you measuring yourself against right now, and did you ever consciously choose to grant them that authority?",
      suggestedAction: {
        label: "Lay a Three-Card Spread",
        href: "/sanctum/tarot/three-card",
        type: "spread",
      },
    };
  }

  // 12. Ritual / Working / Physical Craft
  const isRitual = /\b(ritual|working|spell|altar|ceremony|candle|herb|incense|grimoire|craft|magic|magick)\b/i.test(text);
  if (isRitual) {
    return {
      reply: "In the Witchr tradition, ritual is conscious psychological architecture enacted through physical correspondence. Common cabinet staples—rosemary for clarity, salt for perimeter boundaries, and a single candle—provide a complete ceremonial engine when charged with deliberate focus. Physical ritual gives your unconscious mind tangible evidence of a conscious commitment.",
      reflectionQuestion: isDirectQuestionOrAction
        ? undefined
        : "What tangible everyday action will you pair with this ritual to anchor its intention into physical reality?",
      suggestedAction: {
        label: "Create a Ritual",
        href: "/sanctum/working",
        type: "working",
      },
    };
  }

  // 13. Uncertainty / Clarity / Dilemma / Decision / Feeling Stuck
  const isUncertaintyOrClarity = /\b(clarity|unclear|uncertain|uncertainty|confus|confused|confusion|decid|decision|crossroads|direction|choice|choose|dilemma|torn|stuck|blocked|friction)\b/i.test(text);
  if (isUncertaintyOrClarity) {
    const isStuck = /\b(stuck|blocked|friction|can't move)\b/i.test(text);
    return {
      reply: isStuck
        ? "Feeling stuck is rarely an absence of momentum; it is usually two opposing desires pulling with equal force. One part of you demands movement, while another protects you from exposure or exhaustion. Acknowledge the friction as diagnostic information rather than a flaw. Once both desires are named, forward motion becomes possible."
        : "When you feel torn between paths, excess thinking rarely delivers clarity. The intellect often collects extra information as a stalling tactic to avoid the discomfort of commitment. True clarity forms in the wake of deliberate motion. Drop below the intellect and notice what your physical body already registers.",
      reflectionQuestion: isDirectQuestionOrAction
        ? undefined
        : isStuck
        ? "What hidden safety does remaining still currently provide you?"
        : "Which choice would you make if you did not need anyone else to validate or approve of it?",
      suggestedAction: {
        label: "Draw Today's Card",
        href: "/sanctum/tarot",
        type: "tarot",
      },
    };
  }

  // 14. General reflective counsel (catch-all)
  return {
    reply: "Every grounded practice begins by paring away outside noise and looking clearly at what is right in front of you. In the Sanctum, we do not deal in magical shortcuts or promises of sudden windfalls—we look at where your energy is currently held and what practical choices remain within your control.",
    reflectionQuestion: isDirectQuestionOrAction
      ? undefined
      : "What is the single most honest sentence that describes the heart of what you are experiencing today?",
    suggestedAction: {
      label: "Draw Today's Card",
      href: "/sanctum/tarot",
      type: "tarot",
    },
  };
}
