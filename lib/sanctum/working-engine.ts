import {
  SANCTUM_INGREDIENT_CATALOG,
  SANCTUM_INTENTIONS,
  SanctumIngredientCatalogItem,
  SanctumIntentionKey,
} from "@/content/sanctum-workings";

export type TimingCue = "morning" | "bedtime" | "general";

export interface WorkingEngineInput {
  intention: SanctumIntentionKey | "Something Else";
  customIntention?: string;
  selectedIngredients: string[]; // ids or names
  customIngredients?: string[];
}

export interface WorkingIngredientReason {
  name: string;
  correspondence: string;
  reason: string;
}

export interface WorkingRitualStep {
  step: number;
  title: string;
  instruction: string;
}

export interface LeftOutIngredient {
  name: string;
  reason: string;
}

export interface GeneratedWorking {
  id: string;
  title: string;
  effectiveIntention: string;
  intentionDescription: string;
  youWillNeed: string[];
  whyThese: WorkingIngredientReason[];
  preparation: string[];
  theWorking: WorkingRitualStep[];
  closing: string;
  optionalTiming?: string;
  consider: string;
  carryThisWithYou: string;
  safetyNotes?: string;
  leftOutIngredients?: LeftOutIngredient[];
  unmappedCustomIngredients?: string[];
}

export interface WorkingEngineResult {
  success: boolean;
  working?: GeneratedWorking;
  errorType?: "no_intention" | "no_ingredients" | "no_match";
  errorMessage?: string;
  suggestions?: string[];
}

/**
 * Detects explicit time-of-day cues from intention or notes.
 * Accurately prioritizes morning day-start requests even when contextual past
 * phrasing like "after a poor night's sleep" is present.
 */
export function detectTimingCue(text?: string): TimingCue {
  if (!text) return "general";
  const lower = text.toLowerCase();

  // Operative morning intention cues (starting the day, morning focus, waking)
  const morningStartPatterns = [
    /\bstart\s+(to\s+(the|a|my)|of\s+(the|a|my)|to|of|the|my|a)?\s*(day|morning)\b/i,
    /\b(day start|beginning of the day|morning calm|calm morning|calm start|morning routine|upon waking|waking up|day ahead)\b/i,
    /\b(morning|daybreak)\b/i,
  ];

  // Operative bedtime/sleep intention cues (preparing for sleep, bedtime winding down)
  const bedtimeIntentionPatterns = [
    /\b(prepare for (sleep|bed)|unwind for (sleep|bed)|before (bed|sleep)|going to (bed|sleep)|fall asleep|bedtime routine|nighttime rest|help me sleep)\b/i,
  ];

  const hasMorningStart = morningStartPatterns.some((p) => p.test(lower));
  const hasBedtimeIntention = bedtimeIntentionPatterns.some((p) => p.test(lower));

  // If the practitioner's intention is to start their day (even if referencing past sleep/night like "after a poor night's sleep"),
  // the operative timing is MORNING.
  if (hasMorningStart && !hasBedtimeIntention) {
    return "morning";
  }

  // If explicitly seeking bedtime or sleep preparation
  if (hasBedtimeIntention && !hasMorningStart) {
    return "bedtime";
  }

  // Secondary standalone checks
  const generalMorning = /\b(morning|sunrise|dawn)\b/i.test(lower);
  const generalBedtime = /\b(bedtime|before bed|for sleep)\b/i.test(lower);

  if (generalMorning && !generalBedtime) return "morning";
  if (generalBedtime && !generalMorning) return "bedtime";

  return "general";
}

/**
 * Maps custom intention phrases to nearest relevant primary intent category for correspondence checks.
 * Explicit timing cues prevent morning intentions from being misrouted to sleep/bedtime categories.
 */
export function resolveEffectiveIntention(
  intention: SanctumIntentionKey | "Something Else",
  customIntention?: string
): SanctumIntentionKey {
  if (intention !== "Something Else") {
    return intention;
  }

  const text = (customIntention || "").toLowerCase();
  const timing = detectTimingCue(text);

  // If text has morning cues and mentions calm/peace/start, map to Calm
  if (timing === "morning") {
    if (text.includes("calm") || text.includes("peace") || text.includes("start") || text.includes("ground") || text.includes("center")) {
      return "Calm";
    }
  }

  if (text.includes("calm") || text.includes("peace") || text.includes("sooth") || text.includes("tranquil") || text.includes("anxious") || text.includes("stress")) {
    return "Calm";
  }

  if (text.includes("protect") || text.includes("boundary") || text.includes("shield") || text.includes("drain") || text.includes("ward") || text.includes("harass")) {
    return "Protection";
  }
  if (text.includes("clean") || text.includes("wash") || text.includes("purge") || text.includes("reset") || text.includes("tension") || text.includes("argument") || text.includes("sever") || text.includes("banish")) {
    return "Cleansing";
  }
  if (text.includes("clear") || text.includes("fog") || text.includes("truth") || text.includes("see") || text.includes("decid") || text.includes("discern") || text.includes("insight")) {
    return "Clarity";
  }
  if (text.includes("focus") || text.includes("work") || text.includes("concentrat") || text.includes("momentum") || text.includes("procrastinat") || text.includes("discipline") || text.includes("finish") || text.includes("study")) {
    return "Focus";
  }
  if (text.includes("money") || text.includes("prosper") || text.includes("debt") || text.includes("wealth") || text.includes("business") || text.includes("financ") || text.includes("career")) {
    return "Prosperity";
  }
  if (text.includes("sleep") || text.includes("bedtime") || text.includes("rest") || text.includes("peace") || text.includes("calm") || text.includes("burnout") || text.includes("exhaust") || text.includes("anxious") || text.includes("stress")) {
    if (timing === "morning") {
      return "Clarity";
    }
    return "Rest";
  }
  if (text.includes("brave") || text.includes("confiden") || text.includes("stature") || text.includes("speak") || text.includes("imposter") || text.includes("doubt") || text.includes("authority")) {
    return "Confidence";
  }
  if (text.includes("luck") || text.includes("chance") || text.includes("fortune") || text.includes("open") || text.includes("opportunity") || text.includes("gamble")) {
    return "Luck";
  }
  if (text.includes("love") || text.includes("heart") || text.includes("soften") || text.includes("tender") || text.includes("partner") || text.includes("dating") || text.includes("intima") || text.includes("forgiv")) {
    return "Love";
  }

  // Default fallback category for unmapped custom inquiries
  return "Clarity";
}

/**
 * Checks whether a custom ingredient is hazardous or inappropriate for ritual use.
 */
function evaluateCustomIngredientSafety(ingredient: string): { isSafe: boolean; reason?: string } {
  const lower = ingredient.toLowerCase();
  if (/\b(bleach|ammonia|chemical|cleaner|acid|drain|solvent|chlorine)\b/i.test(lower)) {
    return {
      isSafe: false,
      reason: "Hazardous chemicals are unsafe and inappropriate for ritual practice.",
    };
  }
  if (/\b(blood|cut|skin|razor|blade|knife|weapon|needle)\b/i.test(lower)) {
    return {
      isSafe: false,
      reason: "Bodily harm and sharp cutting instruments violate Witchr safety standards.",
    };
  }
  if (/\b(poison|toxic|lead|mercury|gasoline|kerosene)\b/i.test(lower)) {
    return {
      isSafe: false,
      reason: "Toxic substances present severe health risks and cannot be used.",
    };
  }
  return { isSafe: true };
}

/**
 * Modular rule-based engine synthesizing a structured Witchr Working.
 * Guarantees every selected ingredient is accounted for (either integrated or explicitly explained).
 */
export function synthesizeWorking(input: WorkingEngineInput): WorkingEngineResult {
  const { intention, customIntention, selectedIngredients, customIngredients = [] } = input;

  // 1. Validation: Intention check
  if (!intention || (intention === "Something Else" && !customIntention?.trim())) {
    return {
      success: false,
      errorType: "no_intention",
      errorMessage: "Please select an intention or write what you are seeking before invoking the Working.",
    };
  }

  // 2. Validation: Ingredients check
  const totalProvided = selectedIngredients.length + customIngredients.length;
  if (totalProvided === 0) {
    return {
      success: false,
      errorType: "no_ingredients",
      errorMessage: "The Oracle needs at least one available household item to anchor the physical Working.",
    };
  }

  const timingCue = detectTimingCue(customIntention);
  const effectiveIntention = resolveEffectiveIntention(intention, customIntention);
  const intentionMeta = SANCTUM_INTENTIONS.find((i) => i.key === effectiveIntention);

  // 3. Match ingredients against correspondence catalog
  const matchingCatalogItems: SanctumIngredientCatalogItem[] = [];
  const selectedCatalogUnmatched: SanctumIngredientCatalogItem[] = [];
  const leftOutIngredients: LeftOutIngredient[] = [];

  for (const sel of selectedIngredients) {
    const item = SANCTUM_INGREDIENT_CATALOG.find(
      (c) => c.id.toLowerCase() === sel.toLowerCase() || c.name.toLowerCase() === sel.toLowerCase()
    );
    if (!item) continue;

    // Check if ingredient supports this intent directly or through general supportive correspondence
    if (item.supportedIntents.includes(effectiveIntention)) {
      if (!matchingCatalogItems.some((m) => m.id === item.id)) {
        matchingCatalogItems.push(item);
      }
    } else {
      if (!selectedCatalogUnmatched.some((u) => u.id === item.id)) {
        selectedCatalogUnmatched.push(item);
      }
    }
  }

  // If no direct matches but catalog items were selected, see if universal anchors can serve
  if (matchingCatalogItems.length === 0 && selectedCatalogUnmatched.length > 0) {
    // Universal pantry items can support with supportive intent role
    for (const item of selectedCatalogUnmatched) {
      matchingCatalogItems.push(item);
    }
    selectedCatalogUnmatched.length = 0;
  }

  // Handle no match condition (only if completely zero viable ingredients)
  if (matchingCatalogItems.length === 0 && customIngredients.length === 0) {
    return {
      success: false,
      errorType: "no_match",
      errorMessage:
        "The ingredients you’ve chosen do not strongly align with this Working yet. Rather than inventing false correspondences, Witchr recommends aligning with elements that genuinely support your intention.",
      suggestions: [
        "Include water or a white candle as a universal conduit for clarity and focus.",
        "Add coarse kitchen salt if seeking protection, cleansing, or boundary severance.",
        "Revise your primary intention to align with the physical supplies currently on your counter.",
      ],
    };
  }

  // 4. Prioritize balanced selection (up to 4 primary items)
  const sortedItems = [...matchingCatalogItems].sort((a, b) => {
    if (a.category === "candle" && b.category !== "candle") return 1;
    if (b.category === "candle" && a.category !== "candle") return -1;
    return 0;
  });

  const chosenCatalogItems = sortedItems.slice(0, 4);
  const excessCatalogItems = sortedItems.slice(4);

  // Record reasons for any excess catalog items left out to keep ritual uncluttered
  for (const excess of excessCatalogItems) {
    leftOutIngredients.push({
      name: excess.name,
      reason: "Left out to keep the ritual focused on the primary anchors without cluttering the physical space.",
    });
  }

  // Record reasons for selected catalog items that were completely incompatible
  for (const unmatched of selectedCatalogUnmatched) {
    leftOutIngredients.push({
      name: unmatched.name,
      reason: `Left out because its traditional focus does not directly reinforce ${effectiveIntention.toLowerCase()}.`,
    });
  }

  // 5. Process Custom Ingredients
  const integratedCustoms: { name: string; role: string }[] = [];
  const unmappedCustoms: string[] = [];

  for (const c of customIngredients) {
    const clean = c.trim();
    if (!clean) continue;

    const safety = evaluateCustomIngredientSafety(clean);
    if (!safety.isSafe) {
      leftOutIngredients.push({
        name: clean,
        reason: safety.reason || "Left out for practical safety reasons.",
      });
      continue;
    }

    // Safe custom ingredient: integrate into working if there is room, or list in leftOut if workspace full
    if (chosenCatalogItems.length + integratedCustoms.length < 5) {
      integratedCustoms.push({
        name: clean,
        role: "Serves as a personalized physical emblem grounding your sovereign focus.",
      });
      unmappedCustoms.push(clean);
    } else {
      leftOutIngredients.push({
        name: clean,
        reason: "Left out to maintain simplicity and prevent the working space from becoming overcrowded.",
      });
    }
  }

  const youWillNeed: string[] = [
    ...chosenCatalogItems.map((item) => item.name),
    ...integratedCustoms.map((ic) => ic.name),
  ];

  // 6. Build Why These explanations
  const whyThese: WorkingIngredientReason[] = [
    ...chosenCatalogItems.map((item) => ({
      name: item.name,
      correspondence: item.symbolicMeaning,
      reason: item.roleDescription[effectiveIntention] || "Anchors the physical foundation of the working.",
    })),
    ...integratedCustoms.map((ic) => ({
      name: ic.name,
      correspondence: "Personal physical anchor and tactile focal point.",
      reason: ic.role,
    })),
  ];

  // 7. Dynamic ritual title & description
  const displayTitle = customIntention?.trim()
    ? `A RITUAL FOR ${customIntention.trim().toUpperCase()}`
    : `A RITUAL FOR ${effectiveIntention.toUpperCase()}`;

  const intentionStatement = customIntention?.trim()
    ? `An intentional ritual formulated to address “${customIntention.trim()}” through grounded symbolic practice.`
    : `An intentional ritual formulated for ${intentionMeta?.description.toLowerCase() || effectiveIntention.toLowerCase()}.`;

  // 8. Generate Preparation Steps (Distinguishing selected ingredients from household tools)
  const preparation: string[] = [
    "Clear your immediate physical counter or table of unrelated clutter, wrappers, and devices.",
    `Selected ingredients (modest quantities): ${youWillNeed.join(", ")}.`,
    "Supporting household tools: A shallow dish, small saucer, or coaster to contain materials neatly.",
  ];
  if (chosenCatalogItems.some((i) => i.id === "bay_leaf")) {
    preparation.push("Supporting household tools: A pen or pencil for writing your guiding word upon the bay leaf or petition paper.");
  }
  if (chosenCatalogItems.some((i) => i.id === "water")) {
    preparation.push("Supporting household tools: A small clean cup or bowl of water.");
  }
  if (chosenCatalogItems.some((i) => i.isFireHazard)) {
    preparation.push("Supporting household tools: A sturdy heat-resistant dish or candleholder.");
  }
  preparation.push("Take three slow, measured breaths, inhaling through the nose and exhaling with a heavy drop of the shoulders.");

  // 9. Generate Practical Ritual Steps
  const theWorking: WorkingRitualStep[] = [];
  let stepIndex = 1;

  // Step 1: Naming the Intention (Preserving explicit user timing and phrasing)
  const statementText = customIntention?.trim()
    ? customIntention.trim()
    : `I anchor my focus in ${effectiveIntention.toLowerCase()}.`;

  theWorking.push({
    step: stepIndex++,
    title: "Define the Sovereign Boundary",
    instruction: `State your purpose aloud or write it clearly on a slip of scrap paper: “${statementText}” Keep the phrasing simple, direct, and free of pleading.`,
  });

  // Step 2+: Handling each catalog ingredient in sequence
  chosenCatalogItems.forEach((item) => {
    switch (item.id) {
      case "salt":
        theWorking.push({
          step: stepIndex++,
          title: "Scatter the Salt",
          instruction:
            timingCue === "morning"
              ? "Place a modest pinch of salt into your shallow dish or around the petition paper. Acknowledge its mineral permanence as a traditional symbol of grounded boundaries, setting aside yesterday's residue."
              : "Place a modest pinch of salt into your shallow dish or around the petition paper. Acknowledge its mineral permanence as a traditional symbol of grounded boundaries and containment.",
        });
        break;
      case "rosemary":
        theWorking.push({
          step: stepIndex++,
          title: "Awaken the Rosemary",
          instruction:
            "Take a sprig or pinch of rosemary and crush a few needles between your thumb and forefinger. Inhale the pungent, pine-like aroma deeply. Let the sharp scent dissolve mental fatigue and anchor your alertness.",
        });
        break;
      case "basil":
        theWorking.push({
          step: stepIndex++,
          title: "Anchor the Basil",
          instruction:
            "Place dried basil or a fresh leaf neatly into your shallow dish. Acknowledge that steady growth does not rush; let it symbolize patience and sustainable effort.",
        });
        break;
      case "cinnamon":
        theWorking.push({
          step: stepIndex++,
          title: "Add the Cinnamon",
          instruction:
            "Place a light pinch of cinnamon or a small stick into your dish. Acknowledge its sensory warmth as a traditional reminder of momentum, prompting you to translate thought into one practical action.",
        });
        break;
      case "bay_leaf":
        theWorking.push({
          step: stepIndex++,
          title: "Inscribe the Bay Leaf",
          instruction:
            timingCue === "morning"
              ? "Take the bay leaf and write a single guiding word for the day ahead upon it with a pen (such as 'CALM', 'CLARITY', or 'STEADY'). Place it neatly in the center of your dish."
              : "Take the bay leaf and write a single operative word upon it with a pen (such as 'CLARITY', 'SHIELD', or 'RESOLVE'). Place it directly in the center of your dish.",
        });
        break;
      case "black_pepper":
        theWorking.push({
          step: stepIndex++,
          title: "Scatter the Pepper Shield",
          instruction:
            "Add a few grains of black pepper to your dish. Declare that any draining dynamic or hostile noise is denied hospitality in your space.",
        });
        break;
      case "honey":
        theWorking.push({
          step: stepIndex++,
          title: "Add the Honey",
          instruction:
            "Add a small drop of honey to your dish beside the herbs. Soften any bitter defensiveness and invite quiet harmony into your posture.",
        });
        break;
      case "coffee":
        theWorking.push({
          step: stepIndex++,
          title: "Command the Coffee Spark",
          instruction:
            "Add a pinch of ground coffee to the dish. Let the bitter, roasty aroma serve as a wake-up call to snap you out of passive hesitation.",
        });
        break;
      case "olive_oil":
        theWorking.push({
          step: stepIndex++,
          title: "Add the Olive Oil",
          instruction:
            "Touch one drop of olive oil into your dish or beside the herbs. Let it symbolically represent smoothing over friction and easing practical movement without applying oil to skin, money, or valuables.",
        });
        break;
      case "water":
        theWorking.push({
          step: stepIndex++,
          title: "Set the Water",
          instruction:
            "Place your small cup or bowl of clean water before you. Look into the still water as a quiet symbol of mental reset and clear circulation, keeping your mind steady and unhurried.",
        });
        break;
      case "white_candle":
      case "black_candle":
        theWorking.push({
          step: stepIndex++,
          title: `Light the ${item.name}`,
          instruction: `Set the candle firmly in your heat-safe dish and light the wick. Focus your gaze on the still core of the flame for one full minute without speaking. (No flame desired? Simply use the unlit pillar as a silent architectural focal point.)`,
        });
        break;
    }
  });

  // Integrated custom ingredients steps
  integratedCustoms.forEach((custom) => {
    theWorking.push({
      step: stepIndex++,
      title: `Anchor the ${custom.name}`,
      instruction: `Place your ${custom.name} firmly within the dish. Touch the object deliberately, transferring your conscious resolve into physical reality.`,
    });
  });

  // Final ritual step: Concluding affirmation
  theWorking.push({
    step: stepIndex++,
    title: "Seal the Ritual",
    instruction:
      "Take one slow, grounding breath and press your hands flat against the table. Speak with quiet finality: 'The boundary is drawn; the ritual is set.'",
  });

  // 10. Closing Instructions
  const hasFireHazard = chosenCatalogItems.some((i) => i.isFireHazard);
  let closing =
    "Extinguish any candle flame with a snuffer or by gently fanning it out—never leave it unattended. Dispose of used ritual salt into ordinary household trash to protect soil ecosystems (or dissolve it down the drain with running water). Organic herb leaves may be returned to garden compost. Wash your hands thoroughly with cold water to mark the return to ordinary consciousness.";
  if (!hasFireHazard) {
    closing =
      "Keep any petition paper or inscribed bay leaf in a notebook or private drawer until the ritual concludes. Discard used ritual salt into ordinary household trash to protect soil ecosystems, return organic herb leaves to compost, and wash your hands in cool tap water.";
  }

  // 11. Optional Timing Note (Consistent time cues: morning never receives bedtime advice)
  let optionalTiming: string | undefined = undefined;
  if (timingCue === "morning") {
    optionalTiming =
      "Optional tradition: Conduct during the opening hour of your day or upon waking, establishing an unhurried, grounded cadence before external demands arrive.";
  } else if (timingCue === "bedtime") {
    optionalTiming =
      "Optional tradition: Conduct in the quiet hour before sleep to encourage nervous system decompression and clear away the day's residue.";
  } else if (effectiveIntention === "Protection" || effectiveIntention === "Cleansing") {
    optionalTiming =
      "Optional tradition: Conduct at twilight or during the waning moon, when energy naturally favors release and perimeter severance.";
  } else if (effectiveIntention === "Prosperity" || effectiveIntention === "Luck" || effectiveIntention === "Confidence") {
    optionalTiming =
      "Optional tradition: Conduct near sunrise or during the waxing moon, when energy symbolically aligns with fresh growth and outward momentum.";
  } else if (effectiveIntention === "Rest" || effectiveIntention === "Love") {
    optionalTiming =
      "Optional tradition: Conduct in the quiet evening hour or on a Friday to encourage nervous system decompression.";
  }

  // 12. Consider (Reflection Prompt)
  let consider = "What daily habit or boundary must you adjust in order to let this ritual do its job?";
  if (timingCue === "morning") {
    consider = "What is the single most important tone or boundary you choose to protect throughout the day ahead?";
  } else if (timingCue === "bedtime") {
    consider = "What tension or unresolved matter from today can you consciously put down until tomorrow?";
  } else if (effectiveIntention === "Protection") {
    consider = "Where did you leave a door cracked open for draining people simply out of guilt or habit?";
  } else if (effectiveIntention === "Clarity") {
    consider = "What uncomfortable truth are you avoiding by keeping yourself superficially busy?";
  } else if (effectiveIntention === "Confidence") {
    consider = "Who are you waiting to grant you permission, when you already possess the authority to proceed?";
  } else if (effectiveIntention === "Focus") {
    consider = "What single distraction costs you the most daily momentum, and why do you tolerate it?";
  } else if (effectiveIntention === "Prosperity") {
    consider = "What financial leak or unnegotiated expense have you been too anxious to look at directly?";
  } else if (effectiveIntention === "Rest") {
    consider = "What non-essential task can you abandon today without the sky falling?";
  }

  // 13. Carry This With You (Practical Real-World Action)
  let carryThisWithYou = "Translate this symbolic ritual into one concrete physical action before the sun sets today.";
  if (timingCue === "morning") {
    carryThisWithYou =
      "Take your first morning sips in deliberate quiet. Hold this calm center before opening your inbox or answering external requests.";
  } else if (timingCue === "bedtime") {
    carryThisWithYou =
      "Turn off phone notifications 30 minutes before sleep and read a physical book in low light.";
  } else if (effectiveIntention === "Protection") {
    carryThisWithYou = "Mute or archive the draining communication thread right now. Do not wait until tomorrow morning.";
  } else if (effectiveIntention === "Clarity") {
    carryThisWithYou = "Write down the three hardest facts of your situation on an index card and keep it on your desk.";
  } else if (effectiveIntention === "Confidence") {
    carryThisWithYou = "Send that straightforward email or speak up without preemptive apologies.";
  } else if (effectiveIntention === "Focus") {
    carryThisWithYou = "Close all browser tabs except the one document you must complete in your next 30-minute block.";
  } else if (effectiveIntention === "Prosperity") {
    carryThisWithYou = "Choose one bill or expense and write down its due date and your next direct step.";
  } else if (effectiveIntention === "Rest") {
    carryThisWithYou = "Step away from screens for a 15-minute walk or quiet pause to let your nervous system settle.";
  }

  // 14. Safety Notes (Relevant only to actual materials and instructions)
  let safetyNotes: string | undefined = undefined;
  if (hasFireHazard) {
    safetyNotes =
      "Fire Safety: Never leave a burning candle unattended. Always place candles on a heat-resistant surface away from drafts, pets, and flammable items. Witchcraft is an adjunct to practical self-direction, never a substitute for professional medical, legal, or financial care.";
  } else {
    safetyNotes =
      "Practical Safety: Do not ingest essential oils, unvetted herbs, or ritual salt. Dispose of salt in household trash rather than outdoor soil. Witchcraft is an adjunct to practical self-direction, never a substitute for professional medical, legal, or psychological care.";
  }

  const generated: GeneratedWorking = {
    id: `working_${effectiveIntention.toLowerCase()}_${Date.now()}`,
    title: displayTitle,
    effectiveIntention,
    intentionDescription: intentionStatement,
    youWillNeed,
    whyThese,
    preparation,
    theWorking,
    closing,
    optionalTiming,
    consider,
    carryThisWithYou,
    safetyNotes,
    leftOutIngredients: leftOutIngredients.length > 0 ? leftOutIngredients : undefined,
    unmappedCustomIngredients: unmappedCustoms.length > 0 ? unmappedCustoms : undefined,
  };

  return {
    success: true,
    working: generated,
  };
}
