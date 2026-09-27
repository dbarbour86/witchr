/**
 * Witchr Sanctum Oracle AI Types & Schemas
 * Defines strict, structured inputs and outputs for AI interpretation.
 */

export type OracleRequestType = "three-card" | "working" | "conversation";

export const ORACLE_PENDING_INQUIRY_KEY = "witchr_sanctum_oracle_pending_inquiry";

export interface OracleChatMessage {
  role: "user" | "oracle";
  content: string;
}

export interface OracleSuggestedAction {
  label: string;
  href: string;
  type: "tarot" | "spread" | "working" | "grimoire" | "reflection";
}

export interface OracleConversationInput {
  message: string;
  history?: OracleChatMessage[];
}

export interface OracleConversationOutput {
  reply: string;
  reflectionQuestion?: string;
  suggestedAction?: OracleSuggestedAction | null;
}

export interface OracleTarotCardContext {
  cardName: string;
  numeral: string;
  keywords: string[];
  contextualMeaning: string;
}

export interface OracleTarotInput {
  question?: string;
  situation: OracleTarotCardContext;
  challenge: OracleTarotCardContext;
  guidance: OracleTarotCardContext;
}

export interface OracleTarotOutput {
  pattern: string;
  consider: string;
  carry: string;
}

export interface OracleApprovedIngredient {
  name: string;
  category: string;
  symbolicMeaning: string;
  correspondenceRole: string;
}

export interface OracleWorkingInput {
  intention: string;
  customIntention?: string;
  effectiveIntention: string;
  approvedIngredients: OracleApprovedIngredient[];
  fireHazardIncluded: boolean;
  unmappedCustomIngredients?: string[];
}

export interface OracleIngredientReason {
  name: string;
  correspondence: string;
  reason: string;
}

export interface OracleRitualStep {
  step: number;
  title: string;
  instruction: string;
}

export interface OracleWorkingOutput {
  title: string;
  intentionDescription: string;
  ingredientReasons: OracleIngredientReason[];
  preparationSteps: string[];
  ritualSteps: OracleRitualStep[];
  closing: string;
  optionalTiming: string | null;
  reflectionPrompt: string;
  practicalTakeaway: string;
  safetyNotes: string | null;
}

export interface OracleResponseMeta {
  source: "oracle-ai" | "written-tradition";
  fallback: boolean;
  fallbackReason?: string;
  provider?: string;
  latencyMs?: number;
}

export interface OracleApiResponse<T> {
  success: boolean;
  meta: OracleResponseMeta;
  data: T;
}
