import {
  SANCTUM_INGREDIENT_CATALOG,
  SANCTUM_INTENTIONS,
  SanctumIngredientCatalogItem,
  SanctumIntentionKey,
} from "@/content/sanctum-workings";

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
 * Maps custom intention phrases to nearest relevant primary intent category for correspondence checks.
 */
function resolveEffectiveIntention(
  intention: SanctumIntentionKey | "Something Else",
  customIntention?: string
): SanctumIntentionKey {
  if (intention !== "Something Else") {
    return intention;
  }

  const text = (customIntention || "").toLowerCase();
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
  if (text.includes("sleep") || text.includes("rest") || text.includes("peace") || text.includes("calm") || text.includes("burnout") || text.includes("exhaust") || text.includes("anxious") || text.includes("stress")) {
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
 * Modular rule-based engine synthesizing a structured Witchr Working.
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

  const effectiveIntention = resolveEffectiveIntention(intention, customIntention);
  const intentionMeta = SANCTUM_INTENTIONS.find((i) => i.key === effectiveIntention);

  // 3. Match ingredients against correspondence catalog
  const matchingCatalogItems: SanctumIngredientCatalogItem[] = [];

  for (const item of SANCTUM_INGREDIENT_CATALOG) {
    const isSelected = selectedIngredients.some(
      (sel) => sel.toLowerCase() === item.id.toLowerCase() || sel.toLowerCase() === item.name.toLowerCase()
    );
    if (isSelected && item.supportedIntents.includes(effectiveIntention)) {
      matchingCatalogItems.push(item);
    }
  }

  // 4. Handle no match condition (Never fabricate false correspondences)
  if (matchingCatalogItems.length === 0) {
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

  // 5. Select 1 to 4 optimal items (do not overload if user checked 10 items)
  // Prioritize primary anchors: non-candle pantry items first, then candles/liquids
  const sortedItems = [...matchingCatalogItems].sort((a, b) => {
    // If only one candle, keep it, but prefer a balanced pantry mix
    if (a.category === "candle" && b.category !== "candle") return 1;
    if (b.category === "candle" && a.category !== "candle") return -1;
    return 0;
  });

  // Pick up to 4 meaningful ingredients
  const chosenCatalogItems = sortedItems.slice(0, 4);
  const youWillNeed = chosenCatalogItems.map((item) => item.name);

  // Add custom ingredients only as optional physical vessels/notes if provided
  const unmappedCustoms: string[] = [];
  customIngredients.forEach((c) => {
    const clean = c.trim();
    if (clean) unmappedCustoms.push(clean);
  });

  // 6. Build Why These explanations
  const whyThese: WorkingIngredientReason[] = chosenCatalogItems.map((item) => ({
    name: item.name,
    correspondence: item.symbolicMeaning,
    reason: item.roleDescription[effectiveIntention] || "Anchors the physical foundation of the working.",
  }));

  // 7. Dynamic working title & description
  const displayTitle = customIntention?.trim()
    ? `A WORKING FOR ${customIntention.trim().toUpperCase()}`
    : `A WORKING FOR ${effectiveIntention.toUpperCase()}`;

  const intentionStatement = customIntention?.trim()
    ? `An intentional working formulated to address “${customIntention.trim()}” through grounded symbolic practice.`
    : `An intentional working formulated for ${intentionMeta?.description.toLowerCase() || effectiveIntention.toLowerCase()}.`;

  // 8. Generate Preparation Steps
  const preparation: string[] = [
    "Clear your immediate physical counter or table of unrelated clutter, wrappers, and devices.",
    `Gather your chosen supplies: ${youWillNeed.join(", ")}.`,
    "Take three slow breaths, inhaling through the nose and exhaling with a heavy drop of the shoulders.",
  ];
  if (chosenCatalogItems.some((i) => i.isFireHazard)) {
    preparation.push("Prepare a sturdy, heat-resistant dish or coaster for any candle work.");
  }

  // 9. Generate Practical Ritual Steps
  const theWorking: WorkingRitualStep[] = [];
  let stepIndex = 1;

  // Step 1: Naming the Intention
  theWorking.push({
    step: stepIndex++,
    title: "Define the Sovereign Boundary",
    instruction: `State your purpose aloud or write it clearly on a slip of scrap paper: “${
      customIntention?.trim() ? customIntention.trim() : `I anchor my focus in ${effectiveIntention.toLowerCase()}.`
    }” Keep the phrasing simple, direct, and free of pleading.`,
  });

  // Step 2+: Handling each ingredient in sequence
  chosenCatalogItems.forEach((item) => {
    switch (item.id) {
      case "salt":
        theWorking.push({
          step: stepIndex++,
          title: "Cast the Salt Boundary",
          instruction:
            "Pour a pinch or small circle of salt around your workspace or petition paper. Feel the mineral weight of permanence. Mentally seal out all distractions outside this ring.",
        });
        break;
      case "rosemary":
        theWorking.push({
          step: stepIndex++,
          title: "Awaken the Rosemary",
          instruction:
            "Crush a few needles between your thumb and forefinger. Inhale the pungent, pine-like aroma deeply. Let the sharp scent dissolve mental fatigue and anchor your alertness.",
        });
        break;
      case "basil":
        theWorking.push({
          step: stepIndex++,
          title: "Anchor the Basil",
          instruction:
            "Bruise a leaf or place dried basil upon your workspace. Acknowledge that steady growth does not rush; ground your nerve in sustainable accumulation.",
        });
        break;
      case "cinnamon":
        theWorking.push({
          step: stepIndex++,
          title: "Stir the Cinnamon Heat",
          instruction:
            "Dust a light pinch of cinnamon across your petition or hold a stick between your palms. Acknowledge the kinetic warmth, demanding that your intention move from thought into direct labor.",
        });
        break;
      case "bay_leaf":
        theWorking.push({
          step: stepIndex++,
          title: "Inscribe the Bay Leaf",
          instruction:
            "Take the bay leaf and write a single operative word upon it with a pen (such as 'CLARITY', 'SHIELD', or 'RESOLVE'). Place it directly in the center of your working space.",
        });
        break;
      case "black_pepper":
        theWorking.push({
          step: stepIndex++,
          title: "Scatter the Pepper Shield",
          instruction:
            "Flick three grains of black pepper outward away from your body. Declare that any draining dynamic or hostile noise is denied hospitality in your space.",
        });
        break;
      case "honey":
        theWorking.push({
          step: stepIndex++,
          title: "Anoint with Honey",
          instruction:
            "Dab a microscopic drop of honey onto the corner of your paper or bowl. Soften any bitter defensiveness and invite quiet harmony into your posture.",
        });
        break;
      case "coffee":
        theWorking.push({
          step: stepIndex++,
          title: "Command the Coffee Spark",
          instruction:
            "Scatter a pinch of ground coffee. Let the bitter, roasty aroma serve as a biological wake-up call to snap you out of passive paralysis.",
        });
        break;
      case "olive_oil":
        theWorking.push({
          step: stepIndex++,
          title: "Seal with Olive Oil",
          instruction:
            "Touch one drop of olive oil to your fingertip and mark the edge of your paper or vessel. Let it form a slick barrier that allows chaotic friction to slide harmlessly away.",
        });
        break;
      case "water":
        theWorking.push({
          step: stepIndex++,
          title: "Engage the Water Reset",
          instruction:
            "Place a small bowl or cup of cold water before you. Dip your fingertips in and touch your temples or wrists. Release somatic heat and emotional tension into the cool fluid.",
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

  // Final working step: Concluding affirmation
  theWorking.push({
    step: stepIndex++,
    title: "Seal the Working",
    instruction:
      "Clap your hands once firmly or press both palms flat against the table. Speak with quiet finality: 'The boundary is drawn; the working is set.'",
  });

  // 10. Closing Instructions
  let closing =
    "Extinguish any candle flame with a snuffer or by gently fanning it out—never leave it unattended. Dispose of used ritual salt into ordinary household trash to protect soil ecosystems (or dissolve it down the drain with running water). Organic herb leaves may be returned to garden compost. Wash your hands thoroughly with cold water to mark the return to ordinary consciousness.";
  if (!chosenCatalogItems.some((i) => i.isFireHazard)) {
    closing =
      "Keep any petition paper in a notebook or private drawer until the working concludes. Discard used ritual salt into ordinary household trash to protect soil ecosystems, return organic herb leaves to compost, and wash your hands in cool tap water.";
  }

  // 11. Optional Timing Note
  let optionalTiming: string | undefined = undefined;
  if (effectiveIntention === "Protection" || effectiveIntention === "Cleansing") {
    optionalTiming = "Optional tradition: Conduct at twilight or during the waning moon, when energy naturally favors release and perimeter severance.";
  } else if (effectiveIntention === "Prosperity" || effectiveIntention === "Luck" || effectiveIntention === "Confidence") {
    optionalTiming = "Optional tradition: Conduct near sunrise or during the waxing moon, when energy symbolically aligns with fresh growth and outward momentum.";
  } else if (effectiveIntention === "Rest" || effectiveIntention === "Love") {
    optionalTiming = "Optional tradition: Conduct in the quiet hour before sleep or on a Friday evening to encourage nervous system decompression.";
  }

  // 12. Consider (Reflection Prompt)
  let consider = "What daily habit or boundary must you adjust in order to let this working do its job?";
  if (effectiveIntention === "Protection") {
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
  if (effectiveIntention === "Protection") {
    carryThisWithYou = "Mute or archive the draining communication thread right now. Do not wait until tomorrow morning.";
  } else if (effectiveIntention === "Clarity") {
    carryThisWithYou = "Write down the three hardest facts of your situation on an index card and keep it on your desk.";
  } else if (effectiveIntention === "Confidence") {
    carryThisWithYou = "Send that straightforward email or speak up without preemptive apologies.";
  } else if (effectiveIntention === "Focus") {
    carryThisWithYou = "Close all browser tabs except the one document you must complete in your next 30-minute block.";
  } else if (effectiveIntention === "Prosperity") {
    carryThisWithYou = "Review your last three bank transactions and cancel one recurring subscription you do not use.";
  } else if (effectiveIntention === "Rest") {
    carryThisWithYou = "Turn off phone notifications 45 minutes before sleep and read a physical book in low light.";
  }

  // 14. Safety Notes
  let safetyNotes: string | undefined = undefined;
  if (chosenCatalogItems.some((i) => i.isFireHazard)) {
    safetyNotes =
      "Fire Safety: Never leave a burning candle unattended. Always use a heat-resistant dish on a level surface. Keep away from drafts, curtains, pets, and children. Witchcraft is an adjunct to practical self-direction, never a substitute for medical, financial, or legal care.";
  } else {
    safetyNotes =
      "Practical Safety: Do not ingest essential oils or unvetted herbs. This ritual is symbolic and psychological—never a substitute for professional medical, legal, or psychological care.";
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
    unmappedCustomIngredients: unmappedCustoms.length > 0 ? unmappedCustoms : undefined,
  };

  return {
    success: true,
    working: generated,
  };
}
