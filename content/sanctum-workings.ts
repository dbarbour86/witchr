export type SanctumIntentionKey =
  | "Calm"
  | "Confidence"
  | "Clarity"
  | "Protection"
  | "Focus"
  | "Rest"
  | "Cleansing"
  | "Luck"
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
  image?: string;
  altText?: string;
}

export const SANCTUM_INTENTIONS: { key: SanctumIntentionKey; label: string; description: string }[] = [
  { key: "Calm", label: "Calm", description: "Soothe nervous friction, steady internal turbulence, and reclaim quiet center." },
  { key: "Confidence", label: "Confidence", description: "Quiet inner strength, speaking directly, and standing in your own choices." },
  { key: "Clarity", label: "Clarity", description: "Dispersing mental fog, cutting through ambiguity, and seeing true facts." },
  { key: "Protection", label: "Protection", description: "Firm personal boundaries, shielding headspace, and warding off drains." },
  { key: "Focus", label: "Focus", description: "Channeled attention, single-pointed concentration, and steady momentum." },
  { key: "Rest", label: "Rest", description: "Nervous system soothing, unburdening tension, and deep restoration." },
  { key: "Cleansing", label: "Cleansing", description: "Purging stale energetic residue, releasing lingering frustration, and clean resets." },
  { key: "Luck", label: "Luck", description: "Noticing unseen openings, shifting perspective, and welcoming favorable chance." },
  { key: "Love", label: "Love", description: "Self-worth anchoring, softening bitter friction, and authentic connection." },
  { key: "Prosperity", label: "Prosperity", description: "Practical budgeting, steady financial habits, and taking manageable steps toward security." },
];

export const SANCTUM_INGREDIENT_CATALOG: SanctumIngredientCatalogItem[] = [
  {
    id: "salt",
    name: "Salt",
    category: "pantry",
    symbolicMeaning: "Mineral boundary, permanence, sealing edges, and neutralizing residue.",
    supportedIntents: ["Calm", "Protection", "Cleansing", "Rest", "Focus", "Clarity", "Prosperity"],
    roleDescription: {
      Calm: "Traditionally used to ground nervous restlessness and anchor quiet boundaries in your space.",
      Protection: "Creates a symbolic perimeter around your physical and mental space.",
      Cleansing: "Traditionally used to absorb residual tension and mark a clean starting line.",
      Rest: "Grounds erratic nervous energy and anchors quiet boundaries around your sleep or morning calm.",
      Focus: "Pulls wandering thoughts back to earth, anchoring your attention to concrete reality.",
      Clarity: "Clears away ambient static and anchors an unshakeable boundary so facts can be seen clearly.",
      Prosperity: "Traditionally represents preservation and stability. Here, it serves as a reminder to safeguard your existing resources.",
    },
    image: "/images/salt-witchcraft-specimen.webp",
    altText: "Coarse ritual sea salt crystals on a dark surface",
  },
  {
    id: "rosemary",
    name: "Rosemary",
    category: "herb",
    symbolicMeaning: "Mental acuity, memory retention, clean discernment, and defensive warding.",
    supportedIntents: ["Calm", "Clarity", "Focus", "Protection", "Cleansing"],
    roleDescription: {
      Calm: "Aromatically settles nervous exhaustion and anchors clear, composed focus.",
      Clarity: "Cuts through cognitive fog and sharpens memory of who you actually are.",
      Focus: "Provides an aromatic anchor to lock your conscious mind into direct execution.",
      Protection: "Acts as a vigilant gatekeeper against subtle psychological entanglements.",
      Cleansing: "Sweeps away stagnant mental haze and clears the air of past arguments.",
    },
    image: "/images/rosemary-witchcraft-hero.webp",
    altText: "Fresh rosemary sprigs under warm candlelight",
  },
  {
    id: "basil",
    name: "Basil",
    category: "herb",
    symbolicMeaning: "Traditionally associated with steady growth, grounded courage, and practical confidence.",
    supportedIntents: ["Prosperity", "Luck", "Confidence", "Protection"],
    roleDescription: {
      Prosperity: "Traditionally associated with growth and steady effort. Here, it encourages patience with long-term financial plans.",
      Luck: "Traditionally associated with noticing positive opportunities in everyday conversations.",
      Confidence: "Traditionally used to support steady composure when asking for what you need.",
      Protection: "Traditionally used to keep domestic spaces peaceful and unbothered by outside tension.",
    },
    image: "/images/basil-witchcraft-hero.webp",
    altText: "Fresh green basil leaves on a dark slate surface",
  },
  {
    id: "cinnamon",
    name: "Cinnamon",
    category: "pantry",
    symbolicMeaning: "Traditionally associated with warmth, active momentum, and focused effort.",
    supportedIntents: ["Prosperity", "Focus", "Luck", "Confidence"],
    roleDescription: {
      Prosperity: "Traditionally represents warmth and momentum. Here, it serves as a reminder to take one practical step toward your goals.",
      Focus: "Traditionally used to encourage alertness and overcome hesitation through warmth.",
      Luck: "Traditionally associated with quickening momentum and taking purposeful initiative.",
      Confidence: "Traditionally used to kindle self-assurance before speaking or making decisions.",
    },
    image: "/images/cinnamon-witchcraft-hero.webp",
    altText: "Cinnamon sticks and ground bark in warm light",
  },
  {
    id: "bay_leaf",
    name: "Bay Leaf",
    category: "herb",
    symbolicMeaning: "Traditionally used as an anchor for written intentions, quiet resolve, and clarity.",
    supportedIntents: ["Calm", "Confidence", "Clarity", "Prosperity", "Luck", "Rest", "Focus", "Protection", "Cleansing"],
    roleDescription: {
      Calm: "Traditionally used as a physical anchor for a written intention of quiet composure.",
      Confidence: "Traditionally represents quiet dignity and standing firmly in your choices.",
      Clarity: "Serves as a clean surface to write down your core priority plainly.",
      Prosperity: "Traditionally used to focus on one concrete financial priority written in your own hand.",
      Luck: "Traditionally used to keep attention open to practical opportunities.",
      Rest: "Provides a quiet anchor to write down what you are setting aside for the night or day.",
      Focus: "Tethers your conscious attention to a single written intention.",
      Protection: "Traditionally used as an emblem of firm boundaries and protective resolve.",
      Cleansing: "Helps clear mental clutter by distilling what you need into a single written word.",
    },
    image: "/images/bay-leaf-witchcraft-hero.webp",
    altText: "Dried whole bay leaves on dark slate beside candlelight",
  },
  {
    id: "black_pepper",
    name: "Black Pepper",
    category: "pantry",
    symbolicMeaning: "Traditionally associated with firm boundaries, clear limits, and warding off unwanted disruption.",
    supportedIntents: ["Protection", "Cleansing"],
    roleDescription: {
      Protection: "Traditionally used to draw a firm line against intrusive demands on your time.",
      Cleansing: "Traditionally represents clearing away lingering tension or stagnant atmosphere.",
    },
    image: "/images/black-pepper-witchcraft-hero.webp",
    altText: "Whole black peppercorns in a ritual offering bowl against deep black background",
  },
  {
    id: "honey",
    name: "Honey",
    category: "pantry",
    symbolicMeaning: "Traditionally associated with softening harsh friction, patience, and gentle self-compassion.",
    supportedIntents: ["Love", "Rest", "Prosperity"],
    roleDescription: {
      Love: "Traditionally used to soften defensive friction and encourage warm, grounded communication.",
      Rest: "Traditionally associated with soothing overexertion and bringing gentle comfort.",
      Prosperity: "Traditionally associated with gratitude for existing resources and patience in growth.",
    },
    image: "/images/honey-witchcraft-specimen.webp",
    altText: "Golden honey in a small glass vessel with dipper",
  },
  {
    id: "coffee",
    name: "Coffee",
    category: "pantry",
    symbolicMeaning: "Traditionally associated with alertness, brisk morning momentum, and dispelling lethargy.",
    supportedIntents: ["Focus", "Clarity", "Confidence"],
    roleDescription: {
      Focus: "Traditionally used to stimulate mental alertness and shift into direct action.",
      Clarity: "The familiar roasted aroma helps awaken attention and focus on immediate tasks.",
      Confidence: "Traditionally used to encourage an alert, upright posture before taking action.",
    },
    image: "/images/coffee-witchcraft-hero.webp",
    altText: "Roasted coffee beans and grounds in purple-and-black screenprint style",
  },
  {
    id: "olive_oil",
    name: "Olive Oil",
    category: "liquid",
    symbolicMeaning: "Traditionally associated with preservation, smooth transitions, and endurance under pressure.",
    supportedIntents: ["Calm", "Protection", "Confidence", "Prosperity", "Love"],
    roleDescription: {
      Calm: "Traditionally used to symbolize smoothing over rough edges and protecting a peaceful space.",
      Protection: "Traditionally represents a smooth barrier that lets external chaos slide harmlessly past.",
      Confidence: "Traditionally used as an emblem of endurance and steady inner strength.",
      Prosperity: "Traditionally represents steady sustenance and smooth resource management.",
      Love: "Traditionally used to encourage gentleness and ease strained relations.",
    },
    image: "/images/olive-oil-witchcraft-hero.webp",
    altText: "Small glass apothecary bottle of olive oil with purple glass highlights",
  },
  {
    id: "water",
    name: "Water",
    category: "liquid",
    symbolicMeaning: "Traditionally associated with emotional reset, clarity of reflection, and gentle dissolution of tension.",
    supportedIntents: ["Calm", "Cleansing", "Rest", "Clarity", "Love", "Prosperity"],
    roleDescription: {
      Calm: "A small bowl of cool water serves as a quiet focal point to dissolve physical restlessness.",
      Cleansing: "Traditionally represents washing away lingering frustration and offering a clean slate.",
      Rest: "Provides a still, tranquil presence to help quiet an overactive mind.",
      Clarity: "Acts as a still reflective surface, encouraging honest, quiet self-inquiry.",
      Love: "Traditionally symbolizes fluid empathy and letting go of rigid resentment.",
      Prosperity: "Traditionally represents steady flow and circulation. Here, it reminds you to keep practical financial movement clear and unblocked.",
    },
    image: "/images/water-witchcraft-hero.webp",
    altText: "Dark offering bowl of clear still water with subtle concentric ripples",
  },
  {
    id: "white_candle",
    name: "White Candle",
    category: "candle",
    symbolicMeaning: "Traditionally associated with quiet illumination, clear truth, and starting afresh.",
    supportedIntents: ["Calm", "Clarity", "Cleansing", "Focus", "Rest", "Confidence", "Luck", "Love", "Prosperity"],
    roleDescription: {
      Calm: "Provides a serene visual flame to help anchor steady, slow breathing.",
      Clarity: "Symbolizes bringing honest light into areas where you feel uncertain.",
      Cleansing: "Traditionally used to mark the beginning of a fresh, unburdened chapter.",
      Focus: "Serves as a tranquil visual point to pull wandering thoughts back to center.",
      Rest: "A gentle beacon of stillness before settling into rest or sleep.",
      Confidence: "Symbolizes steady inner resolve and standing clearly in your own space.",
      Luck: "Traditionally represents lighting the way for fresh opportunities.",
      Love: "Symbolizes warmth, honesty, and clear intentions in connection.",
      Prosperity: "Brings symbolic light and clarity to your practical financial planning.",
    },
    isFireHazard: true,
    image: "/images/white-candle-witchcraft-hero.webp",
    altText: "Single white pillar candle burning steadily in a dish against deep black",
  },
  {
    id: "black_candle",
    name: "Black Candle",
    category: "candle",
    symbolicMeaning: "Traditionally associated with absorbing heavy tension, drawing a protective veil, and marking firm endings.",
    supportedIntents: ["Calm", "Protection", "Cleansing"],
    roleDescription: {
      Calm: "Traditionally used to absorb ambient agitation and draw a quiet boundary against noise.",
      Protection: "Traditionally used to symbolize a stark boundary between your peace and the outside world.",
      Cleansing: "Traditionally represents letting old resentments or expired obligations burn away.",
    },
    isFireHazard: true,
    image: "/images/black-candle-witchcraft-hero.webp",
    altText: "Black candle glowing with warm candlelight on a dark background",
  },
];

/**
 * Returns matching image metadata for an ingredient by name or ID if available.
 */
export function getSanctumIngredientImage(nameOrId: string): { image: string; altText: string } | null {
  const norm = nameOrId.toLowerCase().trim();
  const match = SANCTUM_INGREDIENT_CATALOG.find(
    (c) => c.id.toLowerCase() === norm || c.name.toLowerCase() === norm
  );
  if (match?.image) {
    return { image: match.image, altText: match.altText || `${match.name} on ritual altar` };
  }
  return null;
}
