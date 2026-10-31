/**
 * Lightweight Zero-Dependency Runtime Schema Validation
 * Validates Oracle AI responses strictly before allowing them to reach the UI.
 */

import type {
  OracleTarotOutput,
  OracleWorkingOutput,
  OracleIngredientReason,
  OracleRitualStep,
  OracleConversationOutput,
  OracleSuggestedAction,
} from "./types";
import { checkWorkingSafety } from "./safety";
import { SANCTUM_INGREDIENT_CATALOG } from "@/content/sanctum-workings";

export interface ValidationResult<T> {
  valid: boolean;
  data?: T;
  error?: string;
}

function isString(val: unknown): val is string {
  return typeof val === "string";
}

function isNonEmptyString(val: unknown, min = 1, max = 5000): val is string {
  if (typeof val !== "string") return false;
  const len = val.trim().length;
  return len >= min && len <= max;
}

/**
 * Validates Three-Card Tarot AI Output
 */
export function validateTarotOutput(input: unknown): ValidationResult<OracleTarotOutput> {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { valid: false, error: "Tarot output is not an object" };
  }

  const record = input as Record<string, unknown>;

  if (!isNonEmptyString(record.pattern, 30, 2000)) {
    return { valid: false, error: "Missing or invalid 'pattern' string in tarot response" };
  }

  if (!isNonEmptyString(record.consider, 10, 500)) {
    return { valid: false, error: "Missing or invalid 'consider' string in tarot response" };
  }

  if (!isNonEmptyString(record.carry, 10, 500)) {
    return { valid: false, error: "Missing or invalid 'carry' string in tarot response" };
  }

  return {
    valid: true,
    data: {
      pattern: record.pattern.trim(),
      consider: record.consider.trim(),
      carry: record.carry.trim(),
    },
  };
}

/**
 * Checks whether an ingredient is actively referenced in ritual steps.
 * Matches full name or distinctive words to ensure active physical inclusion.
 */
function isIngredientInSteps(ingredientName: string, steps: OracleRitualStep[]): boolean {
  const normName = ingredientName.trim().toLowerCase();
  const stepTexts = steps.map((s) => `${s.title} ${s.instruction}`.toLowerCase());

  // Direct phrase match
  if (stepTexts.some((text) => text.includes(normName))) {
    return true;
  }

  // Significant token match (e.g. "White Candle" -> "candle", "Black Pepper" -> "pepper")
  const stopWords = new Set(["and", "the", "for", "with", "item", "white", "black", "fresh", "dried", "pinch"]);
  const tokens = normName
    .split(/[\s_-]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 2 && !stopWords.has(t));

  if (tokens.length > 0) {
    if (stepTexts.some((text) => tokens.some((token) => text.includes(token)))) {
      return true;
    }
  }

  // Domain associations for specific catalog items
  if (normName.includes("candle") && stepTexts.some((t) => t.includes("candle") || t.includes("flame") || t.includes("wick"))) {
    return true;
  }
  if (normName.includes("bay") && stepTexts.some((t) => t.includes("bay"))) {
    return true;
  }
  if (normName.includes("salt") && stepTexts.some((t) => t.includes("salt") || t.includes("brine"))) {
    return true;
  }
  if (normName.includes("pepper") && stepTexts.some((t) => t.includes("pepper"))) {
    return true;
  }

  return false;
}

/**
 * Validates Create a Working AI Output
 * Enforces schema integrity, approved ingredients constraint, ingredient accounting,
 * morning/bedtime timing consistency, and physical safety rules.
 */
export function validateWorkingOutput(
  input: unknown,
  approvedIngredientNames: string[],
  options?: { timingCue?: "morning" | "bedtime" | "general" }
): ValidationResult<OracleWorkingOutput> {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { valid: false, error: "Working output is not an object" };
  }

  const record = input as Record<string, unknown>;

  if (!isNonEmptyString(record.title, 4, 120)) {
    return { valid: false, error: "Missing or invalid 'title' in working response" };
  }

  if (!isNonEmptyString(record.intentionDescription, 15, 600)) {
    return { valid: false, error: "Missing or invalid 'intentionDescription' in working response" };
  }

  // Validate ingredientReasons
  if (!Array.isArray(record.ingredientReasons) || record.ingredientReasons.length === 0) {
    return { valid: false, error: "Missing or empty 'ingredientReasons' array" };
  }

  const normalizedApproved = approvedIngredientNames.map((n) => n.trim().toLowerCase());

  // Verify title does not hallucinate unapproved ingredients from the catalog
  const lowerTitle = String(record.title).toLowerCase();
  for (const catalogItem of SANCTUM_INGREDIENT_CATALOG) {
    const itemLower = catalogItem.name.toLowerCase();
    const isApproved = normalizedApproved.some(
      (a) => a === itemLower || a.includes(itemLower) || itemLower.includes(a)
    );
    if (!isApproved && lowerTitle.includes(itemLower)) {
      return {
        valid: false,
        error: `Title mentions ingredient '${catalogItem.name}' which was not selected by the user.`,
      };
    }
  }

  const validatedReasons: OracleIngredientReason[] = [];

  for (const item of record.ingredientReasons) {
    if (!item || typeof item !== "object") {
      return { valid: false, error: "Malformed ingredient reason item" };
    }
    const r = item as Record<string, unknown>;
    if (!isNonEmptyString(r.name, 1, 80) || !isNonEmptyString(r.correspondence, 1, 300) || !isNonEmptyString(r.reason, 1, 500)) {
      return { valid: false, error: "Ingredient reason contains invalid string fields" };
    }

    // Verify AI did not invent an unapproved ingredient
    const lowerName = r.name.trim().toLowerCase();
    const isApproved = normalizedApproved.some((app) => lowerName.includes(app) || app.includes(lowerName));
    if (!isApproved) {
      return { valid: false, error: `AI included unapproved ingredient '${r.name}'` };
    }

    validatedReasons.push({
      name: r.name.trim(),
      correspondence: r.correspondence.trim(),
      reason: r.reason.trim(),
    });
  }

  // Validate preparationSteps
  if (!Array.isArray(record.preparationSteps) || record.preparationSteps.length === 0) {
    return { valid: false, error: "Missing or empty 'preparationSteps' array" };
  }
  const validatedPrep: string[] = [];
  for (const step of record.preparationSteps) {
    if (!isNonEmptyString(step, 5, 400)) {
      return { valid: false, error: "Invalid preparation step format" };
    }
    validatedPrep.push(step.trim());
  }

  // Validate ritualSteps
  if (!Array.isArray(record.ritualSteps) || record.ritualSteps.length < 2) {
    return { valid: false, error: "Working must have at least 2 ritualSteps" };
  }
  const validatedRitual: OracleRitualStep[] = [];
  for (let i = 0; i < record.ritualSteps.length; i++) {
    const s = record.ritualSteps[i];
    if (!s || typeof s !== "object") {
      return { valid: false, error: `Malformed ritual step at index ${i}` };
    }
    const rStep = s as Record<string, unknown>;
    const stepNum = typeof rStep.step === "number" ? rStep.step : i + 1;
    if (!isNonEmptyString(rStep.title, 2, 100) || !isNonEmptyString(rStep.instruction, 10, 600)) {
      return { valid: false, error: `Invalid title or instruction at ritual step ${i + 1}` };
    }
    validatedRitual.push({
      step: stepNum,
      title: rStep.title.trim(),
      instruction: rStep.instruction.trim(),
    });
  }

  // Closing
  if (!isNonEmptyString(record.closing, 5, 400)) {
    return { valid: false, error: "Missing or invalid 'closing' in working response" };
  }

  // Optional timing
  const optionalTiming = isString(record.optionalTiming) && record.optionalTiming.trim().length > 0
    ? record.optionalTiming.trim()
    : null;

  // Reflection prompt
  if (!isNonEmptyString(record.reflectionPrompt, 10, 400)) {
    return { valid: false, error: "Missing or invalid 'reflectionPrompt' in working response" };
  }

  // Practical takeaway
  if (!isNonEmptyString(record.practicalTakeaway, 10, 400)) {
    return { valid: false, error: "Missing or invalid 'practicalTakeaway' in working response" };
  }

  // Safety notes
  const safetyNotes = isString(record.safetyNotes) && record.safetyNotes.trim().length > 0
    ? record.safetyNotes.trim()
    : null;

  // Left out ingredients
  let validatedLeftOut: { name: string; reason: string }[] | undefined = undefined;
  if (Array.isArray(record.leftOutIngredients)) {
    validatedLeftOut = [];
    for (const item of record.leftOutIngredients) {
      if (item && typeof item === "object") {
        const lo = item as Record<string, unknown>;
        if (typeof lo.name === "string" && typeof lo.reason === "string" && lo.name.trim() && lo.reason.trim()) {
          validatedLeftOut.push({
            name: lo.name.trim(),
            reason: lo.reason.trim(),
          });
        }
      }
    }
  }

  // 1. Confirm every ingredient listed in ingredientReasons has an active physical role in ritualSteps
  for (const reason of validatedReasons) {
    if (!isIngredientInSteps(reason.name, validatedRitual)) {
      return {
        valid: false,
        error: `Ingredient '${reason.name}' is listed in ingredientReasons but not given an active role in ritualSteps. Mentioning it in the explanation alone is insufficient.`,
      };
    }
  }

  // 2. Confirm every approved ingredient is accounted for (either active in steps or in leftOutIngredients)
  for (const approved of approvedIngredientNames) {
    const normApproved = approved.trim().toLowerCase();
    const inReasons = validatedReasons.some((r) => {
      const normR = r.name.trim().toLowerCase();
      return normR.includes(normApproved) || normApproved.includes(normR);
    });
    const inLeftOut = (validatedLeftOut || []).some((lo) => {
      const normL = lo.name.trim().toLowerCase();
      return normL.includes(normApproved) || normApproved.includes(normL);
    });

    if (!inReasons && !inLeftOut) {
      return {
        valid: false,
        error: `Missing ingredient: '${approved}' was omitted without an active role in ritualSteps or an explanation in leftOutIngredients.`,
      };
    }
  }

  // Runtime Timing Consistency Check:
  // Enforce that AI responses honor timing cues (morning cannot have bedtime/sleep advice, and vice versa).
  const timingCue = options?.timingCue || "general";
  const allInstructionText = [
    record.title,
    record.intentionDescription,
    ...validatedPrep,
    ...validatedRitual.map((s) => `${s.title} ${s.instruction}`),
    record.closing,
    optionalTiming || "",
    record.reflectionPrompt,
    record.practicalTakeaway,
  ].join(" ");

  if (timingCue === "morning") {
    // Check for inappropriate bedtime/sleep advice in morning workings
    const bedtimePattern = /\b(before (going to )?(bed|sleep)|bedtime routine|wind down for sleep|fall asleep|sleep well|good night|nighttime rest|tonight before sleep)\b/i;
    if (bedtimePattern.test(allInstructionText)) {
      return {
        valid: false,
        error: "Runtime validation failed: AI response violated morning timing cue by including bedtime or sleep instructions.",
      };
    }
  } else if (timingCue === "bedtime") {
    // Check for inappropriate morning waking advice in bedtime workings
    const wakingPattern = /\b(upon waking|start (of|to) your day|morning routine|as your day begins|waking up in the morning)\b/i;
    if (wakingPattern.test(allInstructionText)) {
      return {
        valid: false,
        error: "Runtime validation failed: AI response violated bedtime timing cue by including morning waking instructions.",
      };
    }
  }

  // Ensure morning optionalTiming does not mandate sunrise or dawn
  let sanitizedTiming = optionalTiming;
  if (timingCue === "morning" && sanitizedTiming) {
    if (/\b(must be (done )?at (sunrise|dawn)|strictly at dawn|require(s)? sunrise)\b/i.test(sanitizedTiming)) {
      sanitizedTiming = "Optional tradition: Conduct during the opening hour of your day or upon waking, establishing an unhurried, grounded cadence before daily demands arrive.";
    }
  }

  const candidate: OracleWorkingOutput = {
    title: (record.title as string).trim(),
    intentionDescription: (record.intentionDescription as string).trim(),
    ingredientReasons: validatedReasons,
    preparationSteps: validatedPrep,
    ritualSteps: validatedRitual,
    closing: (record.closing as string).trim(),
    optionalTiming: sanitizedTiming,
    reflectionPrompt: (record.reflectionPrompt as string).trim(),
    practicalTakeaway: (record.practicalTakeaway as string).trim(),
    safetyNotes,
    leftOutIngredients: validatedLeftOut && validatedLeftOut.length > 0 ? validatedLeftOut : undefined,
  };

  // Run comprehensive physical safety checks
  const safetyResult = checkWorkingSafety(candidate);
  if (!safetyResult.safe) {
    return { valid: false, error: `Safety violation: ${safetyResult.violation}` };
  }

  return {
    valid: true,
    data: candidate,
  };
}

/**
 * Validates Conversational Oracle Output
 * Ensures safety, structural validity, and tolerance for minor provider key variations
 * (e.g. snake_case vs camelCase, reply vs response/message).
 */
export function validateConversationOutput(input: unknown): ValidationResult<OracleConversationOutput> {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { valid: false, error: "Conversation output is not an object" };
  }

  const record = input as Record<string, unknown>;

  // Flexible key resolution for reply
  const rawReply =
    record.reply ?? record.response ?? record.message ?? record.reflection ?? record.text;

  if (!isNonEmptyString(rawReply, 10, 4000)) {
    return { valid: false, error: "Missing or invalid 'reply' string in conversation response" };
  }

  // Flexible key resolution for reflectionQuestion
  const rawQuestion =
    record.reflectionQuestion ?? record.reflection_question ?? record.reflectionQuestionText ?? record.inquest;

  const reflectionQuestion = isNonEmptyString(rawQuestion, 5, 500)
    ? rawQuestion.trim()
    : undefined;

  let suggestedAction: OracleSuggestedAction | null = null;
  const rawAction = record.suggestedAction ?? record.suggested_action;

  if (rawAction && typeof rawAction === "object" && !Array.isArray(rawAction)) {
    const act = rawAction as Record<string, unknown>;
    const rawLabel = act.label ?? act.title ?? act.name;
    const rawHref = act.href ?? act.url ?? act.link;

    if (isNonEmptyString(rawLabel, 2, 80)) {
      let href = isNonEmptyString(rawHref, 2, 200) ? rawHref.trim() : "/sanctum/tarot";
      // Ensure href points to valid sanctum location
      if (!href.startsWith("/sanctum")) {
        href = "/sanctum/tarot";
      }

      const validTypes: Array<OracleSuggestedAction["type"]> = ["tarot", "spread", "working", "grimoire", "reflection"];
      const rawType = String(act.type || "").toLowerCase();
      let actType: OracleSuggestedAction["type"] = "reflection";
      if (rawType.includes("spread") || rawType.includes("three")) {
        actType = "spread";
      } else if (rawType.includes("tarot") || rawType.includes("card")) {
        actType = "tarot";
      } else if (rawType.includes("work") || rawType.includes("ritual")) {
        actType = "working";
      } else if (rawType.includes("grim")) {
        actType = "grimoire";
      } else if (validTypes.includes(rawType as any)) {
        actType = rawType as OracleSuggestedAction["type"];
      }

      suggestedAction = {
        label: rawLabel.trim(),
        href,
        type: actType,
      };
    }
  }

  return {
    valid: true,
    data: {
      reply: rawReply.trim(),
      reflectionQuestion,
      suggestedAction,
    },
  };
}
