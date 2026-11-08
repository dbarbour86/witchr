/**
 * Centralized Oracle AI Service Client & Provider Abstraction
 * Handles provider routing, timeouts, runtime validation, and automatic deterministic fallbacks.
 */

import {
  OracleTarotInput,
  OracleTarotOutput,
  OracleWorkingInput,
  OracleWorkingOutput,
  OracleConversationInput,
  OracleConversationOutput,
  OracleApiResponse,
} from "./types";
import {
  WITCHR_ORACLE_SYSTEM_PROMPT,
  WITCHR_ORACLE_CONVERSATION_SYSTEM_PROMPT,
  buildTarotPrompt,
  buildWorkingPrompt,
  buildConversationPrompt,
  buildConversationMessages,
  OracleConversationMessagePayload,
} from "./prompts";
import { validateTarotOutput, validateWorkingOutput, validateConversationOutput } from "./validation";
import { getTarotFallback, getWorkingFallback, getConversationFallback } from "./fallbacks";

interface ProviderConfig {
  provider: "gemini" | "openai";
  apiKey: string;
}

interface ConversationProviderConfig {
  provider: "openai" | "gemini";
  apiKey: string;
  model: string;
  apiType: "responses" | "chat" | "gemini";
}

/**
 * Resolves all configured AI providers from server environment in priority order.
 * Used for Three-Card Tarot and Ritual Workings.
 */
function resolveAvailableProviders(): ProviderConfig[] {
  const preferred = (process.env.ORACLE_AI_PROVIDER || "").toLowerCase().trim();

  const geminiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    (preferred === "gemini" ? process.env.ORACLE_AI_API_KEY : undefined);

  const openaiKey =
    process.env.OPENAI_API_KEY ||
    (preferred === "openai" ? process.env.ORACLE_AI_API_KEY : undefined);

  const providers: ProviderConfig[] = [];

  if (preferred === "openai") {
    if (openaiKey && openaiKey.trim().length > 0) {
      providers.push({ provider: "openai", apiKey: openaiKey.trim() });
    }
    if (geminiKey && geminiKey.trim().length > 0) {
      providers.push({ provider: "gemini", apiKey: geminiKey.trim() });
    }
  } else {
    // Default: Gemini first, then OpenAI
    if (geminiKey && geminiKey.trim().length > 0) {
      providers.push({ provider: "gemini", apiKey: geminiKey.trim() });
    }
    if (openaiKey && openaiKey.trim().length > 0) {
      providers.push({ provider: "openai", apiKey: openaiKey.trim() });
    }
  }

  // Generic fallback key if no specific provider matched
  if (providers.length === 0) {
    const genericKey = process.env.ORACLE_AI_API_KEY;
    if (genericKey && genericKey.trim().length > 0) {
      providers.push({ provider: "gemini", apiKey: genericKey.trim() });
    }
  }

  return providers;
}

/**
 * Resolves configured AI providers for conversational dialogue in priority order.
 * In local development (or when ORACLE_CONVERSATION_MODEL is configured),
 * prioritizes gpt-6-luna via the OpenAI Responses API.
 * In production when unconfigured, preserves standard production routing.
 */
function resolveConversationProviders(): ConversationProviderConfig[] {
  const isLocal = process.env.NODE_ENV !== "production";
  const preferred = (process.env.ORACLE_AI_PROVIDER || "").toLowerCase().trim();
  const forcedConversationModel = process.env.ORACLE_CONVERSATION_MODEL?.trim();

  const geminiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    (preferred === "gemini" ? process.env.ORACLE_AI_API_KEY : undefined);

  const openaiKey =
    process.env.OPENAI_API_KEY ||
    (preferred === "openai" ? process.env.ORACLE_AI_API_KEY : undefined);

  const providers: ConversationProviderConfig[] = [];

  // Determine local vs production primary model for OpenAI conversation
  // In local development, default to gpt-6-luna for conversational testing
  const openaiConversationModel =
    forcedConversationModel ||
    (isLocal || preferred === "openai" ? "gpt-6-luna" : "gpt-4o-mini");

  const useResponses = openaiConversationModel.toLowerCase().includes("luna");

  if (isLocal || preferred === "openai" || forcedConversationModel) {
    // Local / OpenAI priority: Luna first, Gemini fallback
    if (openaiKey && openaiKey.trim().length > 0) {
      providers.push({
        provider: "openai",
        apiKey: openaiKey.trim(),
        model: openaiConversationModel,
        apiType: useResponses ? "responses" : "chat",
      });
    }
    if (geminiKey && geminiKey.trim().length > 0) {
      providers.push({
        provider: "gemini",
        apiKey: geminiKey.trim(),
        model: process.env.GEMINI_MODEL || "gemini-flash-latest",
        apiType: "gemini",
      });
    }
  } else {
    // Production default when unconfigured: Gemini first, OpenAI fallback
    if (geminiKey && geminiKey.trim().length > 0) {
      providers.push({
        provider: "gemini",
        apiKey: geminiKey.trim(),
        model: process.env.GEMINI_MODEL || "gemini-flash-latest",
        apiType: "gemini",
      });
    }
    if (openaiKey && openaiKey.trim().length > 0) {
      providers.push({
        provider: "openai",
        apiKey: openaiKey.trim(),
        model: openaiConversationModel,
        apiType: useResponses ? "responses" : "chat",
      });
    }
  }

  return providers;
}

function resolveProviderConfig(): ProviderConfig | null {
  const all = resolveAvailableProviders();
  return all.length > 0 ? all[0] : null;
}

/**
 * Resolves the completion token budget based on request type and environment override.
 * Conversations default to 500 tokens (enough for complete JSON and deeper answers without bloat).
 * Tarots and ritual workings default to 1500 tokens for rich multi-step instructions.
 */
function resolveMaxTokens(isConversation: boolean): number {
  if (process.env.ORACLE_MAX_TOKENS) {
    const parsed = parseInt(process.env.ORACLE_MAX_TOKENS, 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  return isConversation ? 500 : 1500;
}

/**
 * Invokes Gemini Flash via standard REST API with structured JSON output.
 * Supports either a single string prompt or multi-turn conversational contents.
 */
async function callGemini(
  apiKey: string,
  input: string | OracleConversationMessagePayload[],
  signal: AbortSignal
): Promise<string> {
  const model = process.env.GEMINI_MODEL || "gemini-flash-latest";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

  let systemInstructionText = WITCHR_ORACLE_SYSTEM_PROMPT;
  let contents: Array<{ role: "user" | "model"; parts: [{ text: string }] }> = [];

  if (Array.isArray(input)) {
    const systemMsg = input.find((m) => m.role === "system");
    if (systemMsg) {
      systemInstructionText = systemMsg.content;
    }
    const turns = input.filter((m) => m.role !== "system");

    let lastRole: "user" | "model" | null = null;
    for (const turn of turns) {
      const geminiRole = turn.role === "assistant" ? "model" : "user";
      if (geminiRole === lastRole && contents.length > 0) {
        contents[contents.length - 1].parts[0].text += `\n\n${turn.content}`;
      } else {
        contents.push({ role: geminiRole, parts: [{ text: turn.content }] });
        lastRole = geminiRole;
      }
    }

    if (contents.length > 0 && contents[0].role === "model") {
      contents.unshift({ role: "user", parts: [{ text: "Hello" }] });
    }
  } else {
    contents = [{ role: "user", parts: [{ text: input }] }];
  }

  const maxTokens = resolveMaxTokens(Array.isArray(input));

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      systemInstruction: { parts: [{ text: systemInstructionText }] },
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
        maxOutputTokens: maxTokens,
      },
    }),
    signal,
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "Unknown error");
    throw new Error(`Gemini API error [${res.status}]: ${errorText.slice(0, 150)}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text || typeof text !== "string") {
    throw new Error("Empty or malformed candidate text from Gemini");
  }

  return text;
}

/**
 * Invokes OpenAI's Responses API (/v1/responses) for modern reasoning models like gpt-6-luna.
 * Supports structured JSON object responses with 'reasoning: { effort: "low" }'.
 */
async function callOpenAIResponses(
  apiKey: string,
  model: string,
  input: OracleConversationMessagePayload[],
  signal: AbortSignal
): Promise<string> {
  const url = "https://api.openai.com/v1/responses";

  // Map messages to Responses API input format
  // System messages must be role: 'developer' for json_object formatting in the Responses API
  const formattedInput = input.map((m) => ({
    role: m.role === "system" ? "developer" : m.role,
    content: m.content,
  }));

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input: formattedInput,
      text: { format: { type: "json_object" } },
      reasoning: { effort: "low" },
    }),
    signal,
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "Unknown error");
    throw new Error(`OpenAI Responses API error [${res.status}]: ${errorText.slice(0, 150)}`);
  }

  const data = await res.json();
  let text = data.output_text || "";
  if (!text && Array.isArray(data.output)) {
    for (const item of data.output) {
      if (item.content) {
        for (const part of item.content) {
          if (part.type === "output_text" && part.text) {
            text += part.text;
          }
        }
      }
    }
  }

  if (!text || typeof text !== "string") {
    throw new Error("Empty content in OpenAI Responses API response");
  }

  return text;
}

/**
 * Invokes OpenAI chat/completions via standard REST API with JSON object response.
 * Supports either a single string prompt or multi-turn conversational messages.
 */
async function callOpenAI(
  apiKey: string,
  input: string | OracleConversationMessagePayload[],
  signal: AbortSignal
): Promise<string> {
  const url = "https://api.openai.com/v1/chat/completions";

  const messages = Array.isArray(input)
    ? input
    : [
        { role: "system", content: WITCHR_ORACLE_SYSTEM_PROMPT },
        { role: "user", content: input },
      ];

  const maxTokens = resolveMaxTokens(Array.isArray(input));

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages,
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_completion_tokens: maxTokens,
    }),
    signal,
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "Unknown error");
    throw new Error(`OpenAI API error [${res.status}]: ${errorText.slice(0, 150)}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text || typeof text !== "string") {
    throw new Error("Empty content in OpenAI response");
  }

  return text;
}

/**
 * Low-level AI execution with timeout and error capture.
 */
async function executeProviderCall(
  config: ProviderConfig,
  input: string | OracleConversationMessagePayload[],
  timeoutMs = 12_000
): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    if (config.provider === "gemini") {
      return await callGemini(config.apiKey, input, controller.signal);
    } else {
      return await callOpenAI(config.apiKey, input, controller.signal);
    }
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Synthesizes Three-Card Tarot spread through Oracle AI with automatic deterministic fallback.
 */
export async function generateTarotOracleResponse(
  input: OracleTarotInput
): Promise<OracleApiResponse<OracleTarotOutput>> {
  const startTime = Date.now();
  const providerConfig = resolveProviderConfig();

  // If no API key configured, use deterministic fallback
  if (!providerConfig) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[Oracle Tarot] No provider API key configured. Utilizing written tradition fallback.");
    }
    return {
      success: true,
      meta: {
        source: "written-tradition",
        fallback: true,
        fallbackReason: "No AI provider credentials configured",
        latencyMs: Date.now() - startTime,
      },
      data: getTarotFallback(input),
    };
  }

  try {
    const prompt = buildTarotPrompt(input);
    const rawResponseText = await executeProviderCall(providerConfig, prompt);

    // Clean potential markdown fencing if provider included it
    const cleanJson = rawResponseText.replace(/^```json\s*/i, "").replace(/^```\s*/, "").replace(/\s*```$/, "").trim();
    const parsed = JSON.parse(cleanJson);

    // Validate runtime schema
    const validation = validateTarotOutput(parsed);
    if (!validation.valid || !validation.data) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[Oracle Tarot] Output validation failed:", validation.error);
      }
      return {
        success: true,
        meta: {
          source: "written-tradition",
          fallback: true,
          fallbackReason: `Validation failed: ${validation.error}`,
          provider: providerConfig.provider,
          latencyMs: Date.now() - startTime,
        },
        data: getTarotFallback(input),
      };
    }

    if (process.env.NODE_ENV !== "production") {
      console.log(`[Oracle Tarot] Successfully generated via ${providerConfig.provider} in ${Date.now() - startTime}ms`);
    }

    return {
      success: true,
      meta: {
        source: "oracle-ai",
        fallback: false,
        provider: providerConfig.provider,
        latencyMs: Date.now() - startTime,
      },
      data: validation.data,
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[Oracle Tarot] Provider execution failed: ${errorMsg}. Falling back to written tradition.`);
    }

    return {
      success: true,
      meta: {
        source: "written-tradition",
        fallback: true,
        fallbackReason: "Provider execution failed",
        provider: providerConfig.provider,
        latencyMs: Date.now() - startTime,
      },
      data: getTarotFallback(input),
    };
  }
}

/**
 * Formulates a personalized Working through Oracle AI with automatic deterministic fallback.
 */
export async function generateWorkingOracleResponse(
  input: OracleWorkingInput
): Promise<OracleApiResponse<OracleWorkingOutput>> {
  const startTime = Date.now();
  const providerConfig = resolveProviderConfig();
  const approvedNames = input.approvedIngredients.map((i) => i.name);

  // If no API key configured, use deterministic fallback
  if (!providerConfig) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[Oracle Working] No provider API key configured. Utilizing written tradition fallback.");
    }
    return {
      success: true,
      meta: {
        source: "written-tradition",
        fallback: true,
        fallbackReason: "No AI provider credentials configured",
        latencyMs: Date.now() - startTime,
      },
      data: getWorkingFallback(input),
    };
  }

  try {
    const prompt = buildWorkingPrompt(input);
    let rawResponseText = await executeProviderCall(providerConfig, prompt);

    let cleanJson = rawResponseText.replace(/^```json\s*/i, "").replace(/^```\s*/, "").replace(/\s*```$/, "").trim();
    let parsed: unknown = null;
    try {
      parsed = JSON.parse(cleanJson);
    } catch {
      parsed = null;
    }

    // Validate runtime schema, ingredient step roles, and timing
    let validation = parsed
      ? validateWorkingOutput(parsed, approvedNames, { timingCue: input.timingCue })
      : { valid: false, error: "AI returned unparseable JSON" };

    // If initial validation fails (e.g. missing ingredient or step role), retry ONCE with explicit correction instructions
    if (!validation.valid) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[Oracle Working] Initial generation failed validation: ${validation.error}. Retrying once with targeted correction prompt.`);
      }

      const retryCorrectionPrompt = `${prompt}

CRITICAL CORRECTION REQUIRED:
Your previous response failed validation with the following error:
"${validation.error}"

RETRY REQUIREMENTS:
1. Every single approved ingredient (${approvedNames.join(", ")}) MUST either:
   - Appear in 'ingredientReasons' AND have a direct, meaningful physical instruction in 'ritualSteps'. Merely listing an item in ingredientReasons without giving it an active role in ritualSteps is forbidden.
   - OR appear in 'leftOutIngredients' with an honest, factual explanation of why it was omitted.
2. Return ONLY a valid JSON object matching the required schema.`;

      try {
        const retryText = await executeProviderCall(providerConfig, retryCorrectionPrompt);
        const retryClean = retryText.replace(/^```json\s*/i, "").replace(/^```\s*/, "").replace(/\s*```$/, "").trim();
        const retryParsed = JSON.parse(retryClean);
        const retryValidation = validateWorkingOutput(retryParsed, approvedNames, { timingCue: input.timingCue });
        if (retryValidation.valid && retryValidation.data) {
          validation = retryValidation;
        } else {
          if (process.env.NODE_ENV !== "production") {
            console.warn(`[Oracle Working] Retry failed validation: ${retryValidation.error}. Falling back to rule-based synthesis.`);
          }
        }
      } catch (retryError) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("[Oracle Working] Retry provider execution failed:", retryError);
        }
      }
    }

    // If validation still fails after retry, fall back to the validated rule-based engine
    if (!validation.valid || !validation.data) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[Oracle Working] Output validation failed after retry:", validation.error);
      }
      return {
        success: true,
        meta: {
          source: "written-tradition",
          fallback: true,
          fallbackReason: `Validation failed after retry: ${validation.error}`,
          provider: providerConfig.provider,
          latencyMs: Date.now() - startTime,
        },
        data: getWorkingFallback(input),
      };
    }

    if (process.env.NODE_ENV !== "production") {
      console.log(`[Oracle Working] Successfully formulated via ${providerConfig.provider} in ${Date.now() - startTime}ms`);
    }

    return {
      success: true,
      meta: {
        source: "oracle-ai",
        fallback: false,
        provider: providerConfig.provider,
        latencyMs: Date.now() - startTime,
      },
      data: {
        ...validation.data,
        leftOutIngredients: validation.data.leftOutIngredients || input.leftOutIngredients,
      },
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[Oracle Working] Provider execution failed: ${errorMsg}. Falling back to written tradition.`);
    }

    return {
      success: true,
      meta: {
        source: "written-tradition",
        fallback: true,
        fallbackReason: "Provider execution failed",
        provider: providerConfig.provider,
        latencyMs: Date.now() - startTime,
      },
      data: getWorkingFallback(input),
    };
  }
}

/**
 * Executes a Conversational Oracle dialogue request through the configured AI provider.
 * Automatically falls back to deterministic Witchr reflective counsel if provider is unconfigured,
 * times out, or fails validation.
 */
export async function generateConversationOracleResponse(
  input: OracleConversationInput
): Promise<OracleApiResponse<OracleConversationOutput>> {
  const startTime = Date.now();
  const conversationProviders = resolveConversationProviders();

  // If no AI keys configured, immediately use deterministic written tradition fallback
  if (conversationProviders.length === 0) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[Sanctum Oracle] fallback used: provider_unavailable");
    }
    return {
      success: true,
      meta: {
        source: "written-tradition",
        fallback: true,
        fallbackReason: "No AI provider configured",
        latencyMs: Date.now() - startTime,
      },
      data: getConversationFallback(input),
    };
  }

  const conversationMessages = buildConversationMessages(input);
  let lastError = "Provider execution failed";
  let lastProviderUsed: "gemini" | "openai" = conversationProviders[0].provider;
  let lastModelUsed = conversationProviders[0].model;

  for (const providerConfig of conversationProviders) {
    lastProviderUsed = providerConfig.provider;
    lastModelUsed = providerConfig.model;
    if (process.env.NODE_ENV !== "production") {
      console.log(`[Sanctum Oracle] provider: ${providerConfig.provider} (${providerConfig.model})`);
    }

    try {
      const timeoutMs = 15_000;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);

      let rawOutput = "";
      try {
        if (providerConfig.apiType === "responses") {
          rawOutput = await callOpenAIResponses(
            providerConfig.apiKey,
            providerConfig.model,
            conversationMessages,
            controller.signal
          );
        } else if (providerConfig.provider === "gemini") {
          rawOutput = await callGemini(providerConfig.apiKey, conversationMessages, controller.signal);
        } else {
          rawOutput = await callOpenAI(providerConfig.apiKey, conversationMessages, controller.signal);
        }
      } finally {
        clearTimeout(timer);
      }

      // Clean potential markdown code fence
      const cleanJson = rawOutput.replace(/^```json\s*/i, "").replace(/^```\s*/, "").replace(/\s*```$/, "").trim();

      // Parse JSON
      let parsed: unknown;
      try {
        parsed = JSON.parse(cleanJson);
      } catch {
        const match = cleanJson.match(/\{[\s\S]*\}/);
        if (match) {
          parsed = JSON.parse(match[0]);
        } else {
          throw new Error("Provider returned non-JSON output");
        }
      }

      // Validate structured conversation output
      const validation = validateConversationOutput(parsed);
      if (!validation.valid || !validation.data) {
        throw new Error(`Validation failed: ${validation.error}`);
      }

      if (process.env.NODE_ENV !== "production") {
        console.log("[Sanctum Oracle] provider response accepted");
      }

      // Crisis Safety Guardrail: Guarantee immediate helpline access if severe self-harm ideation is detected
      const isCrisisInput = /\b(kill\s+(?:my\s*self|myself)|end\s+(?:it\s+all|my\s+life)|suicid|want\s+to\s+die|don't\s+want\s+to\s+live|cant\s+go\s+on|can't\s+go\s+on|hurt\s+myself|self\s*harm)\b/i.test(input.message);
      let validatedData = validation.data;
      if (isCrisisInput && !validatedData.reply.includes("988")) {
        validatedData = {
          ...validatedData,
          reply: `${validatedData.reply}\n\nPlease connect with immediate, confidential human support:\n- In the US and Canada: Call or text 988 (Suicide & Crisis Lifeline, 24/7, free).\n- In the UK: Call 111 or call 116 123 (Samaritans).\n- International: https://findahelpline.com`,
          reflectionQuestion: undefined,
          suggestedAction: null,
        };
      }

      return {
        success: true,
        meta: {
          source: "oracle-ai",
          fallback: false,
          provider: providerConfig.provider,
          model: providerConfig.model,
          latencyMs: Date.now() - startTime,
        },
        data: validatedData,
      };
    } catch (error) {
      lastError = error instanceof Error ? error.message : "Unknown error";
      if (process.env.NODE_ENV !== "production") {
        console.log(`[Sanctum Oracle] provider ${providerConfig.provider} (${providerConfig.model}) error: ${lastError}`);
      }
      // If there is another provider in availableProviders, the loop automatically tries the next one!
    }
  }

  // All configured providers failed, use deterministic fallback
  if (process.env.NODE_ENV !== "production") {
    console.log(`[Sanctum Oracle] fallback used: provider_error (${lastError})`);
  }

  return {
    success: true,
    meta: {
      source: "written-tradition",
      fallback: true,
      fallbackReason: lastError,
      provider: lastProviderUsed,
      model: lastModelUsed,
      latencyMs: Date.now() - startTime,
    },
    data: getConversationFallback(input),
  };
}
