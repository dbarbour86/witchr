/**
 * Lightweight Zero-Dependency Runtime Schema Validation
 * Validates Oracle AI responses strictly before allowing them to reach the UI.
 */

import type { OracleTarotOutput, OracleWorkingOutput, OracleIngredientReason, OracleRitualStep } from "./types";
import { checkWorkingSafety } from "./safety";

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
 * Validates Create a Working AI Output
 * Enforces schema integrity, approved ingredients constraint, and physical safety rules.
 */
export function validateWorkingOutput(
  input: unknown,
  approvedIngredientNames: string[]
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

  const candidate: OracleWorkingOutput = {
    title: record.title.trim(),
    intentionDescription: record.intentionDescription.trim(),
    ingredientReasons: validatedReasons,
    preparationSteps: validatedPrep,
    ritualSteps: validatedRitual,
    closing: record.closing.trim(),
    optionalTiming,
    reflectionPrompt: record.reflectionPrompt.trim(),
    practicalTakeaway: record.practicalTakeaway.trim(),
    safetyNotes,
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
