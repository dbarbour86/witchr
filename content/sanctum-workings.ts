export type SanctumIntentionKey =
  | "Protection"
  | "Clarity"
  | "Confidence"
  | "Rest"
  | "Luck"
  | "Focus"
  | "Cleansing"
  | "Love"
  | "Prosperity";

export interface SanctumIngredientCatalogItem {
  id: string;
  name: string;
  category: "herb" | "pantry" | "candle" | "liquid";
  symbolicMeaning: string;
  supportedIntents: SanctumIntentionKey[];
  roleDescription: Record<string, string>;
  isFireHazard?: boolean;
}

export const SANCTUM_INTENTIONS: { key: SanctumIntentionKey; label: string; description: string }[] = [
  { key: "Protection", label: "Protection", description: "Hard perimeter boundaries, shielding headspace, and warding off drains." },
  { key: "Clarity", label: "Clarity", description: "Dispersing mental fog, cutting through ambiguity, and seeing true facts." },
  { key: "Confidence", label: "Confidence", description: "Sovereign nerve, standing in your authority, and eliminating shrinking." },
  { key: "Rest", label: "Rest", description: "Nervous system soothing, unburdening tension, and deep restoration." },
  { key: "Luck", label: "Luck", description: "Pivoting stagnation, noticing unseen openings, and welcoming favorable chance." },
  { key: "Focus", label: "Focus", description: "Channeled willpower, single-pointed concentration, and steady momentum." },
  { key: "Cleansing", label: "Cleansing", description: "Purging stale energetic residue, severance of residual funk, and clean resets." },
  { key: "Love", label: "Love", description: "Self-worth anchoring, softening bitter friction, and authentic sovereignty in intimacy." },
  { key: "Prosperity", label: "Prosperity", description: "Financial nerve, steady resource cultivation, and practical debt severance." },
];

export const SANCTUM_INGREDIENT_CATALOG: SanctumIngredientCatalogItem[] = [
  {
    id: "salt",
    name: "Salt",
    category: "pantry",
    symbolicMeaning: "Mineral boundary, permanence, sealing edges, and neutralizing energetic residue.",
    supportedIntents: ["Protection", "Cleansing", "Rest", "Focus"],
    roleDescription: {
      Protection: "Creates an uncrossable symbolic perimeter around your physical and mental space.",
      Cleansing: "Absorbs residual stagnant friction and seals a clean slate.",
      Rest: "Grounds erratic nervous energy and anchors quiet boundaries around your sleep.",
      Focus: "Pulls wandering thoughts back to earth, anchoring your attention to concrete reality.",
    },
  },
  {
    id: "rosemary",
    name: "Rosemary",
    category: "herb",
    symbolicMeaning: "Mental acuity, memory retention, clean discernment, and defensive warding.",
    supportedIntents: ["Clarity", "Focus", "Protection", "Cleansing"],
    roleDescription: {
      Clarity: "Cuts through cognitive fog and sharpens memory of who you actually are.",
      Focus: "Provides an aromatic anchor to lock your conscious mind into direct execution.",
      Protection: "Acts as a vigilant gatekeeper against subtle psychological entanglements.",
      Cleansing: "Sweeps away stagnant mental haze and clears the air of past arguments.",
    },
  },
  {
    id: "basil",
    name: "Basil",
    category: "herb",
    symbolicMeaning: "Prosperity accumulation, steady nerve, joyful courage, and harmonious growth.",
    supportedIntents: ["Prosperity", "Luck", "Confidence", "Protection"],
    roleDescription: {
      Prosperity: "Attracts sustainable resource movement and shifts focus from scarcity to accumulation.",
      Luck: "Opens fresh conversational and material avenues by elevating your daily presence.",
      Confidence: "Stiffens personal posture and banishes self-effacing hesitation in professional settings.",
      Protection: "Guards domestic peace and keeps interpersonal friction outside the home.",
    },
  },
  {
    id: "cinnamon",
    name: "Cinnamon",
    category: "pantry",
    symbolicMeaning: "Vital heat, accelerating momentum, financial urgency, and kinetic fire.",
    supportedIntents: ["Prosperity", "Focus", "Luck", "Confidence"],
    roleDescription: {
      Prosperity: "Accelerates slow-moving financial cycles and injects urgency into your earnings.",
      Focus: "Fires up sluggish executive function and breaks procrastination through sensory warmth.",
      Luck: "Sparks sudden breakthroughs and converts passive intention into fast momentum.",
      Confidence: "Kindles internal fire, melting away meekness before important confrontations.",
    },
  },
  {
    id: "bay_leaf",
    name: "Bay Leaf",
    category: "herb",
    symbolicMeaning: "Written petition anchor, victorious resolve, clear ambition, and silent triumph.",
    supportedIntents: ["Confidence", "Clarity", "Prosperity", "Luck"],
    roleDescription: {
      Confidence: "Carries the laurel emblem of sovereign dignity and unapologetic stature.",
      Clarity: "Serves as a clean canvas to write down and isolate your core truth plainly.",
      Prosperity: "Acts as a vessel for tangible financial targets and disciplined ambitions.",
      Luck: "Aligns your decisions with unexpected favorable turns of event.",
    },
  },
  {
    id: "black_pepper",
    name: "Black Pepper",
    category: "pantry",
    symbolicMeaning: "Abrasive banishment, sharp deterrence, and terminating energetic hospitality.",
    supportedIntents: ["Protection", "Cleansing"],
    roleDescription: {
      Protection: "Creates an aggressive irritant against psychic intrusions and unwanted attention.",
      Cleansing: "Burns away stubborn psychic rot and lingering emotional parasites.",
    },
  },
  {
    id: "honey",
    name: "Honey",
    category: "pantry",
    symbolicMeaning: "Softening resistance, sweetening bitter dynamics, and cultivating self-compassion.",
    supportedIntents: ["Love", "Rest", "Prosperity"],
    roleDescription: {
      Love: "Softens defensive hostility and nurtures tender, grounded affection.",
      Rest: "Coats the jagged edges of burnout with warm, soothing stillness.",
      Prosperity: "Draws sustained, sticky abundance and encourages gentle financial generosity.",
    },
  },
  {
    id: "coffee",
    name: "Coffee",
    category: "pantry",
    symbolicMeaning: "Rapid awakening, mental arousal, dispelling lethargy, and kinetic drive.",
    supportedIntents: ["Focus", "Clarity", "Confidence"],
    roleDescription: {
      Focus: "Ignites executive drive and commands scattered attention into line.",
      Clarity: "Pierces through sleep-deprived apathy to reveal immediate practical priorities.",
      Confidence: "Inoculates against timid posture, demanding direct and immediate action.",
    },
  },
  {
    id: "olive_oil",
    name: "Olive Oil",
    category: "liquid",
    symbolicMeaning: "Consecration, durable preservation, lubrication over friction, and resilience.",
    supportedIntents: ["Protection", "Confidence", "Prosperity", "Love"],
    roleDescription: {
      Protection: "Coats your perimeter with an invisible slick that lets other people’s chaos slide off.",
      Confidence: "Anoints your nerve and seals your sovereign boundaries against self-doubt.",
      Prosperity: "Smooths the flow of resources and secures long-term endurance.",
      Love: "Softens friction and nourishes deep emotional stamina.",
    },
  },
  {
    id: "water",
    name: "Water",
    category: "liquid",
    symbolicMeaning: "Universal fluid conduit, emotional resetting, receptive dissolution, and cleansing.",
    supportedIntents: ["Cleansing", "Rest", "Clarity", "Love"],
    roleDescription: {
      Cleansing: "Washes away old psychological grime and flushes expired tension down the drain.",
      Rest: "Cradles the nervous system and dissolves somatic tightness without resistance.",
      Clarity: "Acts as a still liquid mirror, allowing your unvarnished reflection to emerge.",
      Love: "Nourishes emotional flow, releasing hardened bitterness into fluid grace.",
    },
  },
  {
    id: "white_candle",
    name: "White Candle",
    category: "candle",
    symbolicMeaning: "All-purpose illumination, neutral truth, fresh inceptions, and quiet clarity.",
    supportedIntents: ["Clarity", "Cleansing", "Focus", "Rest", "Confidence", "Luck", "Love", "Prosperity"],
    roleDescription: {
      Clarity: "Illuminates dark corners of ambiguity with steady, unbiased illumination.",
      Cleansing: "Burns away stagnant heaviness and consecrates the working space.",
      Focus: "Acts as a tranquil visual focal point to tether a restless mind.",
      Rest: "Provides a quiet beacon of peace before slipping into uninterrupted sleep.",
      Confidence: "Anchors sovereign presence with a clean, dignified flame.",
      Luck: "Signals openness to new light and positive shifts.",
      Love: "Kindles pure, unmanipulated affection and self-worth.",
      Prosperity: "Shines light on honest avenues of growth and steady work.",
    },
    isFireHazard: true,
  },
  {
    id: "black_candle",
    name: "Black Candle",
    category: "candle",
    symbolicMeaning: "Absorption of negative patterns, void boundary, binding intrusive noise, and banishing.",
    supportedIntents: ["Protection", "Cleansing"],
    roleDescription: {
      Protection: "Absorbs intrusive energy and draws a stark line between your space and the world.",
      Cleansing: "Consumes expired emotional debt, turning old resentment into inert carbon.",
    },
    isFireHazard: true,
  },
];
