/**
 * Centralized Oracle AI Service Client & Provider Abstraction
 * Handles provider routing, timeouts, runtime validation, and automatic deterministic fallbacks.
 */

import {
  OracleTarotInput,
  OracleTarotOutput,
  OracleWorkingInput,
  OracleWorkingOutput,
  OracleApiResponse,
} from "./types";
import { WITCHR_ORACLE_SYSTEM_PROMPT, buildTarotPrompt, buildWorkingPrompt } from "./prompts";
import { validateTarotOutput, validateWorkingOutput } from "./validation";
import { getTarotFallback, getWorkingFallback } from "./fallbacks";

interface ProviderConfig {
  provider: "gemini" | "openai";
  apiKey: string;
}

/**
 * Resolves configured AI credentials from server environment.
 */
function resolveProviderConfig(): ProviderConfig | null {
  // Check Gemini first
  const geminiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    (process.env.ORACLE_AI_PROVIDER === "gemini" ? process.env.ORACLE_AI_API_KEY : undefined);

  if (geminiKey && geminiKey.trim().length > 0) {
    return { provider: "gemini", apiKey: geminiKey.trim() };
  }

  // Check OpenAI
  const openaiKey =
    process.env.OPENAI_API_KEY ||
    (process.env.ORACLE_AI_PROVIDER === "openai" ? process.env.ORACLE_AI_API_KEY : undefined);

  if (openaiKey && openaiKey.trim().length > 0) {
    return { provider: "openai", apiKey: openaiKey.trim() };
  }

  // Generic fallback key with default provider (gemini)
  const genericKey = process.env.ORACLE_AI_API_KEY;
  if (genericKey && genericKey.trim().length > 0) {
    return { provider: "gemini", apiKey: genericKey.trim() };
  }

  return null;
}

/**
 * Invokes Gemini 1.5 Flash via standard REST API with structured JSON output.
 */
async function callGemini(apiKey: string, prompt: string, signal: AbortSignal): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;

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
