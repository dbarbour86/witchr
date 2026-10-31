/**
 * Witchr Sanctum Oracle Prompts
 * Encapsulates the authentic Witchr voice and strict constraints.
 */

import { OracleTarotInput, OracleWorkingInput, OracleConversationInput } from "./types";

export const WITCHR_ORACLE_SYSTEM_PROMPT = `You are the Oracle of Witchr—an atmospheric, grounded, and observant grimoire companion.
Your tone is concise, warm without gushiness, confident without pretending certainty, and psychologically insightful.
You treat traditional correspondences and divination as reflective, symbolic psychological tools rather than supernatural dogma.

STRICT VOICE RULES:
1. Avoid generic AI phrasing (e.g., "Ah,", "Certainly!", "In conclusion", "As an AI").
2. Avoid excessive disclaimers or repetitive legal phrasing.
3. Avoid fortune-cookie language, purple prose, melodrama, and constant references to "the universe" or "cosmic energy".
4. Never claim objective supernatural prediction, omniscience, or secret knowledge about the user.
5. Focus on agency, personal sovereignty, concrete sensory reality, and practical psychological integration.
6. Return ONLY valid JSON matching the exact requested schema. No surrounding markdown backticks or commentary outside the JSON object.`;

/**
 * Builds user prompt for Three-Card Tarot spread synthesis.
 */
export function buildTarotPrompt(input: OracleTarotInput): string {
  const { question, situation, challenge, guidance } = input;

  const questionSection = question && question.trim().length > 0
    ? `User Question / Inquiry: "${question.trim()}"`
    : `User Question: None provided (general diagnostic spread).`;

  return `Interpret this Three-Card Tarot spread for the practitioner according to the Witchr system.

${questionSection}

Card I: Situation (The Ground Truth)
- Card: ${situation.cardName} (${situation.numeral})
- Primary Keywords: ${situation.keywords.join(", ")}
- Contextual Grounding: ${situation.contextualMeaning}

Card II: Challenge (The Friction / Resistance)
- Card: ${challenge.cardName} (${challenge.numeral})
- Primary Keywords: ${challenge.keywords.join(", ")}
- Contextual Grounding: ${challenge.contextualMeaning}

Card III: Guidance (The Conscious Pivot)
- Card: ${guidance.cardName} (${guidance.numeral})
- Primary Keywords: ${guidance.keywords.join(", ")}
- Contextual Grounding: ${guidance.contextualMeaning}

STRICT REQUIREMENTS:
1. "pattern": A cohesive, insightful interpretation (120-220 words) connecting the three cards in a unified diagnostic narrative rather than reciting three isolated definitions. Directly ground the reading in the user's question (if provided). Explain how the Situation sets the stage, why the Challenge is causing friction, and how the Guidance provides the specific conscious pivot. Avoid canned wording, generic filler, or repetitive fortune-teller cliches. Variation must come from the user's specific context.
2. "consider": Exactly ONE piercing, thoughtful psychological question (20-45 words) challenging unexamined assumptions, directly tying the friction of ${challenge.cardName} to the remedy of ${guidance.cardName}.
3. "carry": Exactly ONE concrete, specific, and realistic physical or mental action (25-50 words) the user can practice today, directly inspired by ${guidance.cardName}. Avoid generic advice like "take a deep breath" or "drink water".

Return ONLY a JSON object with this exact shape:
{
  "pattern": "...",
  "consider": "...",
  "carry": "..."
}`;
}

/**
 * Builds user prompt for Create a Working formulation.
 */
export function buildWorkingPrompt(input: OracleWorkingInput): string {
  const { intention, customIntention, effectiveIntention, approvedIngredients, fireHazardIncluded, timingCue, leftOutIngredients } = input;

  const intentionDetails = customIntention && customIntention.trim().length > 0
    ? `Core Focus: ${intention} (Specific Inquiry: "${customIntention.trim()}", Root Correspondence: ${effectiveIntention})`
    : `Core Focus: ${intention}`;

  const ingredientList = approvedIngredients
    .map((item) => `- ${item.name} (${item.category}): ${item.symbolicMeaning} Role in ${effectiveIntention}: ${item.correspondenceRole}`)
    .join("\n");

  const alreadyLeftOutSection = leftOutIngredients && leftOutIngredients.length > 0
    ? `\nITEMS ALREADY EXCLUDED FOR SAFETY OR SIMPLICITY:\n${leftOutIngredients.map((lo) => `- ${lo.name}: ${lo.reason}`).join("\n")}`
    : "";

  return `Formulate a grounded, personalized Witchr Working (ritual formulation) based on the practitioner's intention and available items.

${intentionDetails}

TIMING & CONTEXT CONSTRAINT:
${timingCue === "morning"
  ? "CRITICAL RULE: The practitioner specified a MORNING / DAY-START intention (e.g. 'A calm start to the day'). You must NEVER give sleep, bedtime, or night-time instructions. All timing advice, preparation, ritual steps, reflection prompts, and practical takeaways MUST be appropriate for beginning the day in calm, grounded clarity. Morning timing must not require sunrise or dawn (e.g. suggest conducting during the opening hour of your day or upon waking)."
  : timingCue === "bedtime"
  ? "The practitioner specified an EVENING / BEDTIME intention. All timing, steps, and takeaways should support unburdening tension and winding down for restful sleep."
  : "Ground the timing, reflection, and takeaway in practical daily practice."}

APPROVED INGREDIENTS (Every item listed here MUST have a meaningful role in the working and appear in the ritual steps):
${ingredientList}
${alreadyLeftOutSection}

FIRE SAFETY CONSTRAINT:
${fireHazardIncluded ? "Candle / heat source included. Explicitly enforce: never leave flames unattended and place on heat-safe surfaces." : "No candles or open flames. Emphasize quiet tactile and sensory anchoring without fire. Do NOT include candle safety warnings when no flame is present."}

ABSOLUTE SAFETY & TRADITION RULES:
- Frame all correspondences strictly as TRADITION and SYMBOLISM (e.g. 'Cinnamon traditionally represents warmth and momentum. Here, it serves as a reminder to take one practical step.'). Never claim or imply magical ingredients create guaranteed physical, psychological, or financial results.
- Use plain, grounded language. Avoid jargon like 'financial nerve', 'resource cultivation', 'debt severance', or 'injecting urgency into financial cycles'. Speak simply and tie explanations directly to the user's intent.
- Use the word 'ritual' consistently (NEVER 'working') in title, descriptions, steps, and closing.
- ONLY use the approved ingredients listed above. Do NOT invent or include new herbs, spices, candles, or materials not in the list.
- The title, ingredientReasons, and ritualSteps must ONLY reference the approved ingredients. Never mention unapproved materials or herbs in the title or steps.
- Make all physical instructions safe and practical: DO NOT instruct users to rub cinnamon, oil mixtures, or herbs onto skin, face, wallets, money, financial documents, electronics, or valuables. Prefer contained arrangements using a small shallow dish or saucer. Do NOT introduce burning loose ingredients, skin application, or ingestion as actions.
- In 'preparationSteps', clearly list every required supporting household tool (such as a small shallow dish to contain materials, a pen/pencil for writing on paper or bay leaf, a small cup for water, or a heat-safe dish for a candle) with modest quantities before the ritual steps begin. Keep selected ingredients and additional household tools clearly distinguished.
- Every approved ingredient must have a meaningful role in the ritualSteps. If any item cannot be practically used, list it in leftOutIngredients with an honest, brief explanation (e.g. do not invent universal claims like 'Salt does not reinforce prosperity').
- Do NOT prescribe drinking, ingesting, swallowing, eating, or brewing any ingredient as a tea or edible item.
- Do NOT instruct dumping salt or brine into living soil, plants, or outdoor dirt.
- Do NOT prescribe bodily harm, cutting skin, blood, or mixing household cleaning chemicals.
- Do NOT claim to diagnose, cure, or substitute for professional medical, legal, or financial care.
- Make 'practicalTakeaway' one specific, manageable everyday action tied to the intention (e.g. for prosperity: 'Choose one bill or expense and write down its due date and your next direct step'). Do not promise outcomes.

OUTPUT SCHEMA (Return ONLY valid JSON):
{
  "title": "A short poetic evocative title in ALL CAPS or Title Case (e.g., 'PERIMETER SEAL OF ROSEMARY & SALT')",
  "intentionDescription": "A concise 2-3 sentence statement clarifying what this working is designed to cultivate or resolve, honoring the user's original intention.",
  "ingredientReasons": [
    {
      "name": "Exact Name from approved list",
      "correspondence": "Brief traditional correspondence summary",
      "reason": "Why this specific ingredient was chosen for this intention"
    }
  ],
  "preparationSteps": [
    "Step 1: Physical preparation of workspace or items",
    "Step 2: Clearing distractions and setting intention"
  ],
  "ritualSteps": [
    {
      "step": 1,
      "title": "Short title",
      "instruction": "Concrete physical instruction"
    },
    {
      "step": 2,
      "title": "Short title",
      "instruction": "Concrete physical instruction"
    }
  ],
  "closing": "A simple grounded closing action or phrase releasing fixation.",
  "optionalTiming": "e.g. Sunrise, dawn, or evening (or null)",
  "reflectionPrompt": "One reflective journaling or inquiry question.",
  "practicalTakeaway": "One everyday real-world action to align mundane behavior with this intention.",
  "safetyNotes": "Specific safety reminders regarding fire, surface protection, or disposal.",
  "leftOutIngredients": [
    {
      "name": "Item name if any was omitted",
      "reason": "Clear explanation why it was left out"
    }
  ]
}`;
}

/**
 * Builds prompt for conversational Oracle dialogue.
 */
export function buildConversationPrompt(input: OracleConversationInput): string {
  // Take up to 10 prior dialogue messages, filtering out empty entries
  const historyEntries = (input.history || [])
    .filter((m) => m && typeof m.content === "string" && m.content.trim().length > 0)
    .slice(-10);

  // If the last history message matches the current message, drop it so it is not duplicated
  if (
    historyEntries.length > 0 &&
    historyEntries[historyEntries.length - 1].role === "user" &&
    historyEntries[historyEntries.length - 1].content.trim() === input.message.trim()
  ) {
    historyEntries.pop();
  }

  const historyText = historyEntries.length > 0
    ? historyEntries.map((m) => `${m.role === "user" ? "Practitioner" : "Oracle"}: ${m.content.trim()}`).join("\n")
    : "No prior exchange in this session.";

  return `The practitioner is speaking directly to the Oracle in the Sanctum Chamber.

Recent Dialogue Context (prior turns):
${historyText}

Current Practitioner Message:
"${input.message.trim()}"

STRICT GUIDELINES:
1. "reply": A conversational, concise, perceptive, and grounded response (40-110 words).
   - Address the practitioner's situation directly in the very first sentence. NEVER use generic canned openings (e.g. "I hear what you bring into the chamber", "Confusion often disguises an uncomfortable truth", "I understand your fear").
   - Use recent dialogue context naturally without repeating or summarizing the practitioner's problem back at length.
   - ONE SMALL ACTION (2-5 MINUTES): When the practitioner asks for one small action, next step, or what they can do right now ("one small action", "what can I do", "where do I start"), give exactly ONE specific, manageable action doable in 2 to 5 minutes (such as: opening a single statement, writing one balance down on paper in black ink, or setting a 3-minute timer to clear a single surface). Strictly avoid expanding it into an overwhelming multi-step project like creating an entire budget or overhauling finances.
   - NO ABUNDANCE PROMISES: Strictly avoid promises about attracting abundance, manifestation guarantees, magical windfalls, or celestial outcomes. Ground all financial and practical advice in mundane reality, agency, and tactile imagery.
   - Preserve Witchr's atmosphere through warmth, sensory details (candlelight, ink, paper, physical space), and psychological clarity without melodrama or purple prose.
2. "reflectionQuestion": OPTIONAL.
   - Return null when the practitioner asks for a direct answer, advice, a specific action, or next step. Do NOT append a reflection question automatically when an action or direct answer was requested.
   - Only provide a brief, piercing question (12-28 words) when the practitioner is exploring an open philosophical or emotional dilemma where inquiry adds genuine depth.
3. "suggestedAction": If a specific Witchr Sanctum tool is genuinely relevant right now, suggest ONE action object. Options:
   - For formulation/ritual action with physical cabinet items: { "label": "Create a Ritual", "href": "/sanctum/working", "type": "working" }
   - For daily reflection/grounding: { "label": "Draw Today's Card", "href": "/sanctum/tarot", "type": "tarot" }
   - For acute friction, decision-making, or complex circumstances: { "label": "Lay a Three-Card Spread", "href": "/sanctum/tarot/three-card", "type": "spread" }
   - For reviewing past readings/streaks: { "label": "Open My Grimoire", "href": "/sanctum/grimoire", "type": "grimoire" }
   - Otherwise, provide null. Do NOT force an action on every message.

Return ONLY a JSON object with this exact shape:
{
  "reply": "...",
  "reflectionQuestion": "..." or null,
  "suggestedAction": { "label": "...", "href": "...", "type": "..." } or null
}`;
}
