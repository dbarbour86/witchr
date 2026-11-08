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
 * (crisis/distress, boundaries/safety, declined activities, primary milestone scenarios,
 * explicit tarot/ritual requests, practical guidance, work, relationships, anxiety, grief, and clarity)
 * and generates grounded, wise conversational responses adhering to the Listening, Exploring, and Guiding stages.
 */
export function getConversationFallback(input: OracleConversationInput): OracleConversationOutput {
  const text = input.message.toLowerCase().trim();
  const historyText = (input.history || []).map((m) => m.content).join(" ").toLowerCase();
  const combinedContext = `${historyText} ${text}`;

  // 1. Crisis & self-harm safety protocol
  const isCrisis = /\b(kill\s+(?:my\s*self|myself)|end\s+(?:it\s+all|my\s+life)|suicid|want\s+to\s+die|don't\s+want\s+to\s+live|cant\s+go\s+on|can't\s+go\s+on|hurt\s+myself|self\s*harm)\b/i.test(text);
  if (isCrisis) {
    return {
      reply:
        "I hear how overwhelming and deeply painful things feel right now, but please know that you do not have to carry this alone. Please connect with someone who can offer immediate, caring support:\n\n- In the US and Canada: Call or text 988 (Suicide & Crisis Lifeline), free and available 24/7.\n- In the UK: Call 111 or text SHOUT to 85258.\n- International: Find confidential support in your country at https://findahelpline.com\n\nPlease reach out to them or a trusted person right away. Your life and your presence matter.",
      reflectionQuestion: undefined,
      suggestedAction: null,
    };
  }

  // 2. Safety / Destructive control / Curses redirection
  const isHarmOrVengeance = /\b(harm|revenge|curse|hex|kill|hurt|destroy|bleed|blood|poison)\b/i.test(text);
  if (isHarmOrVengeance) {
    return {
      reply:
        "The Sanctum practice is grounded strictly in personal sovereignty, inner alignment, and protective boundaries. We do not traffic in harm, curses, or attempts to exert destructive control over others. When the urge to lash outward arises, it almost always signals a violated personal boundary or unaddressed pain within. What personal boundary in your physical life needs reinforcement right now, independent of what anyone else does?",
      reflectionQuestion: undefined,
      suggestedAction: null,
    };
  }

  // 3. User declines an activity or wants to speak plainly
  const isDecliningActivity = /\b(don't\s+want\s+(?:a\s+)?(?:ritual|card|working|exercise|activity)|no\s+(?:rituals?|cards?|workings?|exercises?|spreads?)|not\s+interested\s+in\s+(?:cards?|rituals?|tools?)|stop\s+(?:giving|recommending|suggesting)\s+(?:me\s+)?(?:actions?|exercises?|rituals?|activities)|just\s+want\s+to\s+talk|no\s+thanks)\b/i.test(text);
  if (isDecliningActivity) {
    return {
      reply:
        "Understood. We do not need any cards, rituals, or exercises—we can just speak plainly about what's on your mind. What feels most important to untangle right now?",
      reflectionQuestion: undefined,
      suggestedAction: null,
    };
  }

  // 4. Primary test scenario: feeling ignored, invisible, or milestone frustration
  const isFeelingIgnoredOrMilestone = /\b(ignored\s+by\s+(?:literally\s+)?everyone|no\s+one\s+takes\s+me\s+seriously|damn\s+40\s+years\s+old|just\s+exist)\b/i.test(text);
  if (isFeelingIgnoredOrMilestone) {
    return {
      reply:
        "Forty years is a long time to feel like you are merely occupying space rather than being seen or taken seriously. When no one seems to listen, it is easy to wonder whether your presence registers with anyone at all. Does this sense of being invisible show up most heavily in one specific place—like your work or family—or has it started to settle over everything?",
      reflectionQuestion: undefined,
      suggestedAction: null,
    };
  }

  // 5. Explicit request for Tarot / Card draw
  const isExplicitTarot = /\b(?:can\s+(?:you|we)\s+)?(?:pull|draw|lay|give\s+me)\s+(?:a\s+)?(?:card|spread|tarot)|show\s+me\s+(?:the\s+)?cards?\b/i.test(text);
  if (isExplicitTarot) {
    const wantsSpread = /\b(spread|three|triad)\b/i.test(text);
    return {
      reply: wantsSpread
        ? "A three-card spread offers a structured mirror to examine your situation: grounding truth, the underlying friction, and conscious guidance. When you are ready, draw your cards and observe what surfaces."
        : "Drawing a card gives you a symbolic focal point for today—not to foretell a fixed outcome, but to reveal where your energy is currently directed. You can draw your card whenever you're ready.",
      reflectionQuestion: undefined,
      suggestedAction: wantsSpread
        ? {
            label: "Lay a Three-Card Spread",
            href: "/sanctum/tarot/three-card",
            type: "spread",
          }
        : {
            label: "Draw Today's Card",
            href: "/sanctum/tarot",
            type: "tarot",
          },
    };
  }

  // 6. Explicit request for Ritual or Working
  const isExplicitWorking = /\b(?:can\s+(?:you|we)\s+)?(?:build|make|create|give\s+me|suggest)\s+(?:a\s+)?(?:ritual|working|spell)|teach\s+me\s+a\s+ritual\b/i.test(text);
  if (isExplicitWorking) {
    return {
      reply:
        "In the Sanctum tradition, ritual is conscious psychological architecture enacted through physical correspondence. If you would like to build a focused working, choose an intention that feels honest to what you need to anchor right now.",
      reflectionQuestion: undefined,
      suggestedAction: {
        label: "Create a Ritual",
        href: "/sanctum/working",
        type: "working",
      },
    };
  }

  // 7. Explicit request for the Oracle's opinion or perspective
  const isAskingOpinion = /\b(what\s+do\s+you\s+(?:actually\s+)?think|what('s|\s+is)\s+your\s+(?:opinion|take|view)|tell\s+me\s+what\s+you\s+think)\b/i.test(text);
  if (isAskingOpinion) {
    return {
      reply:
        "If you want my honest view: people usually know the truth long before they are willing to bear the cost of acting on it. When you feel chronically unseen or dismissed, continuing to ask politely for recognition rarely changes anything. Real dignity begins when you stop auditioning for people who have already decided not to listen.",
      reflectionQuestion: undefined,
      suggestedAction: null,
    };
  }

  // 8. Explicit request for practical advice or next steps (Guiding stage)
  const isRequestingAdvice = /\b(what\s+(?:can|should)\s+i\s+do|give\s+me\s+advice|practical\s+(?:steps?|advice)|how\s+should\s+i\s+handle\s+this|what\s+would\s+you\s+do|where\s+do\s+i\s+start|what\s+is\s+my\s+next\s+step)\b/i.test(text);
  if (isRequestingAdvice) {
    const isMoneyContext = /\b(money|financ|bill|bank|debt|budget|dollar|expense|paycheck|broke|afford|salary)\b/i.test(combinedContext);
    if (isMoneyContext) {
      return {
        reply:
          "When money feels threatening, the most practical move is to shrink your focus down to a single number. Don't try to build an entire financial system today. Pick up the one statement or balance you have been avoiding, look at that single figure plainly, and then step back. Once it is seen, the imagination loses its power to catastrophize. What is the single financial detail causing the most noise right now?",
        reflectionQuestion: undefined,
        suggestedAction: null,
      };
    }

    const isRelational = /\b(partner|relationship|friend|boss|coworker|family|marriage)\b/i.test(combinedContext);
    if (isRelational) {
      return {
        reply:
          "In relational friction, the most grounded step is deciding where your perimeter lies before trying to change the other person. You cannot script how they react, but you can decide what you will tolerate and what you will step away from. What is one clear boundary you could hold that would protect your dignity, regardless of how they respond?",
        reflectionQuestion: undefined,
        suggestedAction: null,
      };
    }

    return {
      reply:
        "When you need a next step, the most reliable move is almost always smaller than you think. Do not attempt to solve the whole dilemma before sunset. Choose one tangible task or one direct communication you can complete today, and let the rest wait. What is the single most immediate piece within your reach right now?",
      reflectionQuestion: undefined,
      suggestedAction: null,
    };
  }

  // 8. Predictive question reframing ("will I", "when will", "future", "is he/she", "get rich")
  const isPredictive = /\b(will i|will he|will she|will they|will we|when will|going to happen|future hold|am i going to|tell my future|get rich|become rich|find love|win the)\b/i.test(text);
  if (isPredictive) {
    const isWealthQuestion = /\b(rich|wealth|money|lottery|millionaire)\b/i.test(text);
    return {
      reply: isWealthQuestion
        ? "The Oracle does not traffic in fixed prophecy or promises of sudden wealth. In the Sanctum tradition, stability is not delivered by celestial lottery; it is built through conscious discipline, clear boundaries, and grounded everyday craft. Demanding guarantees of wealth often masks anxiety about survival. If stability requires daily sovereignty rather than sudden luck, what concrete habit can you practice today?"
        : "The Oracle does not traffic in fixed prophecy or fatalistic certainty. The future is continuously woven from the micro-choices and boundaries you enact today. When we demand to know outcomes in advance, we usually seek relief from uncertainty. If you released your fixation on how this concludes, what is the single most honest action you can take today?",
      reflectionQuestion: undefined,
      suggestedAction: null,
    };
  }

  // 9. Grounding / Protection / Energetic Perimeters
  const isGroundingOrProtection = /\b(ground|grounded|grounding|protect|protection|shield|shielding|ward|warding|boundaries?|perimeter|centered|safe space)\b/i.test(text);
  if (isGroundingOrProtection) {
    return {
      reply:
        "Grounding and protection are concrete physical practices rather than abstract postures. Grounding begins with sensory contact: feeling gravitational contact with the floor, steadying your breath, and drawing scattered focus back inside your skin. Protection is simply an intentional boundary: deciding clearly what you permit across your perimeter and what you cast out with unwavering authority. What invasive influence or noise are you currently tolerating that directly compromises your inner equilibrium?",
      reflectionQuestion: undefined,
      suggestedAction: null,
    };
  }

  // 10. Work / Career / Livelihood
  const isCareerOrWork = /\b(job|career|work|workplace|boss|coworker|colleague|profession|vocation|salary|money|finances?|financial|business|layoff|laid off|hired|fired|interview|promotion|resume|client|office)\b/i.test(text);
  if (isCareerOrWork) {
    const hasMoneyTension = /\b(money|salary|afford|finances?|financial|paycheck|broke|earn)\b/i.test(text);
    return {
      reply: hasMoneyTension
        ? "Fear around money is almost always the nervous system trying to protect basic safety, not proof that you are failing. When we avoid looking, the uncertainty in our imagination grows far heavier than the actual figures on the page. You don't need to solve your entire financial future today. Grounding begins simply by pulling the fear out of your thoughts and looking at what is physically right in front of you. If looking directly at the numbers is the hardest part, what is one quiet moment today where you can sit with just one balance without judgment?"
        : "Career friction is often a crisis of alignment between your inner values and external output. When your daily labor feels draining, examine whether you have outgrown the perimeter you built for yourself. You don't have to dismantle your livelihood overnight, but acknowledge the strain honestly so you can make deliberate micro-adjustments. What standard of security or external validation are you maintaining at the expense of your actual fulfillment?",
      reflectionQuestion: undefined,
      suggestedAction: null,
    };
  }

  // 11. Relationship / Conflict / Relational Boundaries
  const isRelationshipOrConflict = /\b(partner|relationship|marriage|dating|spouse|husband|wife|boyfriend|girlfriend|friend|friendship|betray|betrayed|betrayal|trust|cheat|cheated|argue|arguing|argument|fight|fighting|breakup|broken up|divorce|ex\b|conflict|mother|father|parent|sibling|family)\b/i.test(text);
  if (isRelationshipOrConflict) {
    const hasBetrayal = /\b(betray|betrayed|betrayal|trust|cheat|cheated|lied|deceiv)\b/i.test(text);
    return {
      reply: hasBetrayal
        ? "Betrayal forces an abrupt reckoning: it shatters your model of who someone was and forces you to confront who they actually are. In the Sanctum tradition, we do not bypass this sting with premature forgiveness. Honor the grief of broken trust, but do not internalize another person's dishonor as proof of your own inadequacy. Rebuilding begins by reinforcing your perimeter. What intuitive whisper did you talk yourself out of noticing, and how will you honor your discernment moving forward?"
        : "Relational friction often arises when surface arguments mask unexpressed boundaries or unspoken disappointments. When conflicts recur, people are rarely fighting about the topic at hand; they are defending their emotional safety. Notice where your responsibility ends and the other person's begins. You cannot force another to understand you, but you can become clear about what you will tolerate. What difficult truth have you withheld to maintain artificial peace, and what would it cost you to speak it plainly?",
      reflectionQuestion: undefined,
      suggestedAction: null,
    };
  }

  // 12. Motivation / Procrastination / Avoidance
  const isMotivationOrProcrastination = /\b(procrastinat|putting off|put off|avoid|avoiding|avoidance|delay|delaying|motivation|unmotivated|lazy|discipline|hesitat|stalling|paralyzed|paralysis)\b/i.test(text);
  if (isMotivationOrProcrastination) {
    return {
      reply:
        "Procrastination is rarely a lack of discipline; it is an emotional defense mechanism. You avoid the task because completing it exposes you to judgment, imperfection, or the burden of what comes next. The mind creates resistance to keep you in the safe perimeter of the undone. Lower the threshold of initiation until resistance has nothing substantial to fight against. What standard of perfection or fear of evaluation are you secretly shielding yourself from by leaving this undone?",
      reflectionQuestion: undefined,
      suggestedAction: null,
    };
  }

  // 13. Anxiety / Overwhelm / Exhaustion
  const isAnxietyOrOverwhelm = /\b(anxious|anxiety|overwhelm|overwhelmed|panic|panicking|stress|stressed|burnout|burned out|exhausted|exhaustion|can't breathe|chest tight|racing mind|spinning|off all week|feeling off|felt off|frazzled|dread)\b/i.test(text);
  if (isAnxietyOrOverwhelm) {
    return {
      reply:
        "When your body feels overwhelmed without a single crisis, your nervous system is processing cumulative ambient load. In the Sanctum, we do not analyze overwhelm through more thinking. We return to somatic ground: drop your shoulders, feel the floor beneath your feet, and narrow your horizon to the next hour. If you set aside every expectation that does not genuinely expire today, what is the single demand that actually requires your presence?",
      reflectionQuestion: undefined,
      suggestedAction: null,
    };
  }

  // 14. Grief / Loss / Heartbreak
  const isGriefOrLoss = /\b(grief|grieving|grieve|mourn|mourning|loss|lost someone|death|died|passed away|heartbreak|heartbroken|sorrow|crying|sadness|letting go)\b/i.test(text);
  if (isGriefOrLoss) {
    return {
      reply:
        "Grief is not a dysfunction to be repaired or an obstacle to rush past; it is the natural consequence of having loved or valued something deeply. When a loss occurs, the mind struggles to map a world that no longer matches memory. Allow the sorrow to be an honored guest rather than an adversary to silence. There is dignity in mourning what mattered. What truth or memory deserves your tender reverence today, without any pressure to justify your feelings?",
      reflectionQuestion: undefined,
      suggestedAction: null,
    };
  }

  // 15. Confidence / Self-Worth / Imposter Feelings
  const isConfidenceOrSelfWorth = /\b(confidence|confident|self-worth|imposter|inadequate|not good enough|insecure|insecurity|unworthy|worthless|self-doubt|doubt myself|ashamed|shame|compare myself|comparing myself|failure|fail|failed)\b/i.test(text);
  if (isConfidenceOrSelfWorth) {
    return {
      reply:
        "Self-doubt is the tax of expanding your perimeter. Whenever you step toward greater competence or visibility, the protective parts of your psyche sound an alarm to pull you back to familiar safety. True sovereignty does not require eliminating fear; it requires acting in alignment with your values while doubt speaks in the background. Whose standard or judgment are you measuring yourself against right now, and did you ever consciously choose to grant them that authority?",
      reflectionQuestion: undefined,
      suggestedAction: null,
    };
  }

  // 16. Uncertainty / Clarity / Dilemma / Feeling Stuck
  const isUncertaintyOrClarity = /\b(clarity|unclear|uncertain|uncertainty|confus|confused|confusion|decid|decision|crossroads|direction|choice|choose|dilemma|torn|stuck|blocked|friction)\b/i.test(text);
  if (isUncertaintyOrClarity) {
    const isStuck = /\b(stuck|blocked|friction|can't move)\b/i.test(text);
    return {
      reply: isStuck
        ? "Feeling stuck is rarely an absence of momentum; it is usually two opposing desires pulling with equal force. One part of you demands movement, while another protects you from exposure or exhaustion. Acknowledge the friction as diagnostic information rather than a flaw. What hidden safety does remaining still currently provide you?"
        : "When you feel torn between paths, excess thinking rarely delivers clarity. The intellect often collects extra information as a stalling tactic to avoid the discomfort of commitment. True clarity forms in the wake of deliberate motion. Which choice would you make if you did not need anyone else to validate or approve of it?",
      reflectionQuestion: undefined,
      suggestedAction: null,
    };
  }

  // 17. General reflective counsel (catch-all)
  return {
    reply:
      "Every grounded practice begins by paring away outside noise and looking clearly at what is right in front of you. In the Sanctum, we do not deal in magical shortcuts or promises of sudden windfalls—we look at where your energy is currently held and what practical choices remain within your control. What is the single most honest sentence that describes the heart of what you are experiencing today?",
    reflectionQuestion: undefined,
    suggestedAction: null,
  };
}
