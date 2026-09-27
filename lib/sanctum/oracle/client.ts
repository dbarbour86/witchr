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
import { WITCHR_ORACLE_SYSTEM_PROMPT, buildTarotPrompt, buildWorkingPrompt, buildConversationPrompt } from "./prompts";
import { validateTarotOutput, validateWorkingOutput, validateConversationOutput } from "./validation";
import { getTarotFallback, getWorkingFallback, getConversationFallback } from "./fallbacks";

interface ProviderConfig {
  provider: "gemini" | "openai";
  apiKey: string;
}

/**
 * Resolves all configured AI providers from server environment in priority order.
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

function resolveProviderConfig(): ProviderConfig | null {
  const all = resolveAvailableProviders();
  return all.length > 0 ? all[0] : null;
}

/**
 * Invokes Gemini Flash via standard REST API with structured JSON output.
 */
async function callGemini(apiKey: string, prompt: string, signal: AbortSignal): Promise<string> {
  const model = process.env.GEMINI_MODEL || "gemini-flash-latest";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: WITCHR_ORACLE_SYSTEM_PROMPT }] },
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
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
 * Invokes OpenAI chat/completions via standard REST API with JSON object response.
 */
async function callOpenAI(apiKey: string, prompt: string, signal: AbortSignal): Promise<string> {
  const url = "https://api.openai.com/v1/chat/completions";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: WITCHR_ORACLE_SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
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
  prompt: string,
  timeoutMs = 12_000
): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    if (config.provider === "gemini") {
      return await callGemini(config.apiKey, prompt, controller.signal);
    } else {
      return await callOpenAI(config.apiKey, prompt, controller.signal);
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
    const rawResponseText = await executeProviderCall(providerConfig, prompt);

    const cleanJson = rawResponseText.replace(/^```json\s*/i, "").replace(/^```\s*/, "").replace(/\s*```$/, "").trim();
    const parsed = JSON.parse(cleanJson);

    // Validate runtime schema and safety
    const validation = validateWorkingOutput(parsed, approvedNames);
    if (!validation.valid || !validation.data) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[Oracle Working] Output validation failed:", validation.error);
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
      data: validation.data,
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
  const availableProviders = resolveAvailableProviders();

  // If no AI keys configured, immediately use deterministic written tradition fallback
  if (availableProviders.length === 0) {
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

  const prompt = buildConversationPrompt(input);
  let lastError = "Provider execution failed";
  let lastProviderUsed: "gemini" | "openai" = availableProviders[0].provider;

  for (const providerConfig of availableProviders) {
    lastProviderUsed = providerConfig.provider;
    if (process.env.NODE_ENV !== "production") {
      console.log(`[Sanctum Oracle] provider: ${providerConfig.provider}`);
    }

    try {
      const timeoutMs = 12_000;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);

      let rawOutput = "";
      try {
        if (providerConfig.provider === "gemini") {
          rawOutput = await callGemini(providerConfig.apiKey, prompt, controller.signal);
        } else {
          rawOutput = await callOpenAI(providerConfig.apiKey, prompt, controller.signal);
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
      lastError = error instanceof Error ? error.message : "Unknown error";
      if (process.env.NODE_ENV !== "production") {
        console.log(`[Sanctum Oracle] provider ${providerConfig.provider} error: ${lastError}`);
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
      latencyMs: Date.now() - startTime,
    },
    data: getConversationFallback(input),
  };
}
