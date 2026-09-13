export interface CorrespondenceItem {
  slug: string;
  name: string;
  category: "herb" | "ingredient" | "candle" | "symbol";
  categoryLabel: string;
  primaryIntent: string;
  routePrefix: "herbs" | "ingredients" | "candles" | "symbols";
  oneLiner: string;
  quickAnswer: string;
  correspondences: {
    uses: string[];
    element?: string;
    planet?: string;
    colors?: string[];
    intentions?: string[];
    symbolicAssociations?: string[];
  };
  traditionalLore: string[];
  modernWitchrUse: string[];
  tryIt: {
    title: string;
    instruction: string;
  };
  relatedHubSlug: string;
  relatedRitualSlugs: string[];
  sources?: string[];
  seoTitle: string;
  seoDescription: string;
}

export const CORRESPONDENCES: CorrespondenceItem[] = [
  {
    slug: "rosemary",
    name: "Rosemary",
    category: "herb",
    categoryLabel: "Herb",
    primaryIntent: "Protection",
    routePrefix: "herbs",
    oneLiner: "An old standby for protection, mental clarity, and getting lingering energy out of your space.",
    quickAnswer:
      "In witchcraft, rosemary is used primarily for boundary protection, cleansing stagnant spaces, and sharpening mental clarity. Traditionally regarded as an all-purpose protective botanical, practitioners frequently burn dried sprigs, steep it into boundary washes, or place it on altars to reinforce psychological resolve, clear domestic fatigue, and signal that draining presences are unwelcome.",
    correspondences: {
      uses: ["Boundary protection", "Cleansing stagnant spaces", "Mental clarity & focus", "Remembrance & fidelity"],
      element: "Fire",
      planet: "Sun",
      colors: ["Green", "White", "Pale Gold"],
      intentions: ["Perimeter defense", "Clearing emotional static", "Sharpening resolve", "Honoring boundaries"],
      symbolicAssociations: ["Vigilance", "Unwavering presence", "Clean slate", "Mental stamina"],
    },
    traditionalLore: [
      "Rosemary (Salvia rosmarinus) has an extensive history across Mediterranean, European, and regional folk customs. In many traditional European households, sprigs were hung over doorways and tucked beneath pillows to ward off night terrors, unwanted spirits, and malicious envy.",
      "Because of its pungent, camphor-rich aroma and evergreen nature, rosemary became a widespread symbol of remembrance, fidelity, and incorruptibility. In folk magic systems, it frequently functions as a universal substitute herb when specialty botanical supplies are unobtainable.",
    ],
    modernWitchrUse: [
      "In modern witchcraft, rosemary serves as a physical cue to reset your nervous system and mark clean boundaries. It is especially useful when someone’s constant entitlement or workplace drama is occupying uninvited space in your thoughts.",
      "Use it as a sensory anchor during boundary-setting rituals. Holding a sprig while writing out non-negotiable personal limits turns an abstract intention into a grounded physical reality.",
      "A simple simmer pot with fresh rosemary, citrus peel, and coarse salt makes an effective household wash for cleaning entryway floors after hosting draining guests.",
    ],
    tryIt: {
      title: "The Written Boundary Anchor",
      instruction:
        "Place a fresh or dried sprig of rosemary directly on top of a folded piece of paper containing a boundary intention. Keep it on your desk or nightstand for three days until the boundary is spoken aloud.",
    },
    relatedHubSlug: "protection",
    relatedRitualSlugs: ["leave-me-alone-protection"],
    seoTitle: "Rosemary in Witchcraft: Uses & Meaning",
    seoDescription:
      "Learn how rosemary is traditionally used in witchcraft for protection, cleansing, and remembrance, plus common correspondences and simple modern uses.",
  },
  {
    slug: "basil",
    name: "Basil",
    category: "herb",
    categoryLabel: "Herb",
    primaryIntent: "Protection",
    routePrefix: "herbs",
    oneLiner: "A familiar kitchen herb used to pacify volatile environments, protect domestic peace, and repel hostility.",
    quickAnswer:
      "In witchcraft, basil is used for domestic protection, diffusing volatile household tension, and attracting steady prosperity. Its sharp, peppery aroma is traditionally associated with warding off interpersonal conflict and neutralizing passive-aggressive hostility, making it a staple botanical for guarding entryways, harmonizing living spaces, and establishing emotional equilibrium.",
    correspondences: {
      uses: ["Domestic boundary defense", "Diffusing interpersonal volatility", "Prosperity & steady momentum", "Emotional equilibrium"],
      element: "Fire",
      planet: "Mars",
      colors: ["Deep Green", "Gold", "Warm Amber"],
      intentions: ["Household harmony", "Hostility warding", "Business boundary enforcement", "Courage"],
      symbolicAssociations: ["Domestic sovereignty", "Fierce guardianship", "Peacemaking without compromise"],
    },
    traditionalLore: [
      "Basil (Ocimum basilicum) carries a dual reputation in historical folklore. In ancient Greco-Roman lore, it was occasionally tied to grief and basilisk mythology, while in Indian, Italian, and Eastern Mediterranean traditions, it was revered as a sacred herb of protection, domestic harmony, and good fortune.",
      "In European folk magic and Hoodoo traditions, basil water has long been sprinkled across floorboards and shop thresholds to pacify anger between partners, prevent hostile interference, and draw respectful trade into business spaces.",
    ],
    modernWitchrUse: [
      "For contemporary practitioners, basil is the antidote to chronic household tension and family guilt-tripping. It represents protection that does not require hostility—defending your peace firmly while maintaining your composure.",
      "Keep a potted basil plant near the front door or home-office desk as a living sentinel against workplace bleed-through. When ending your workday, physically pinch a leaf to release the volatile oils as a sensory cue that work demands stop at the threshold.",
      "Add dried basil to protective salt blends when dressing black or green candles for personal autonomy and peaceful living.",
    ],
    tryIt: {
      title: "Threshold Pacification Sweep",
      instruction:
        "Steep a handful of basil leaves in hot water for ten minutes. Allow it to cool, strain into a spray bottle, and lightly spritz your front doorknob and threshold while stating your intention for quiet, dignified peace.",
    },
    relatedHubSlug: "protection",
    relatedRitualSlugs: ["leave-me-alone-protection"],
    seoTitle: "Basil in Witchcraft: Uses & Meaning",
    seoDescription:
      "Explore the traditional magical uses of basil for protection, domestic peace, and warding, plus correspondences and practical modern witchcraft applications.",
  },
  {
    slug: "salt",
    name: "Salt",
    category: "ingredient",
    categoryLabel: "Ritual Ingredient",
    primaryIntent: "Protection",
    routePrefix: "ingredients",
    oneLiner: "The bedrock of protective magic: ancient, non-negotiable mineral grounding for drawing lines that hold.",
    quickAnswer:
      "In witchcraft, salt is the foundational element for physical and energetic boundary-making. Revered across nearly all historical folk cultures for its preserving and purifying qualities, salt is cast into circles, sprinkled across doorways, or added to wash water to absorb negativity, establish impermeable perimeters, and signal that nothing disruptive may cross into your space.",
    correspondences: {
      uses: ["Casting perimeters", "Mineral grounding", "Sealing thresholds", "Absorbing disruptive energy"],
      element: "Earth",
      planet: "Saturn / Earth",
      colors: ["White", "Slate Gray", "Obsidian Black"],
      intentions: ["Perimeter defense", "Unyielding boundaries", "Preservation of peace", "Clearing emotional static"],
      symbolicAssociations: ["Permanence", "Incorruptibility", "Hard limits", "Primal bedrock"],
    },
    traditionalLore: [
      "Salt has served as one of the most culturally vital minerals in human civilization. Because it halts decay and preserves nourishment, ancient Mediterranean, Middle Eastern, and Celtic traditions treated salt as a sacred symbol of enduring covenants, hospitality, and spiritual incorruptibility.",
      "In folklore across Europe, Asia, and the Americas, salt was considered the ultimate deterrent against malevolent spirits, curses, and the evil eye. Throwing a pinch over the left shoulder, laying a line across the front door, or ringing an altar in coarse salt are among the oldest documented protective rituals in world folk magic.",
    ],
    modernWitchrUse: [
      "Modern witchcraft avoids magical thinking about salt: mineral grains cannot physically stop a person from texting you. What salt does is somatic perimeter defense. Pouring a visible, crunchy line creates an unambiguous psychological boundary that your brain instantly respects.",
      "Coarse sea salt, kosher salt, and pantry salt function identically in ritual work. You do not need costly exotic salts to establish boundaries.",
      "Use salt as a physical barrier around candles or bowls during release rites, reminding yourself that everything outside the perimeter belongs to the outside world, not to you.",
    ],
    tryIt: {
      title: "The Front Threshold Perimeter",
      instruction:
        "Pour a thin, discrete line of coarse kitchen salt directly across your front doorstep on a dry evening. Inhale deeply and state aloud: 'Everything that honors my peace is welcome; all chaotic noise stays outside.' Sweep it away after 24 hours.",
    },
    relatedHubSlug: "protection",
    relatedRitualSlugs: ["leave-me-alone-protection", "return-to-sender"],
    seoTitle: "Salt in Witchcraft: Uses & Protective Meaning",
    seoDescription:
      "Understand why salt is the ultimate mineral for protection, circle casting, and boundary work in modern witchcraft and historical folk traditions.",
  },
  {
    slug: "black",
    name: "Black Candle",
    category: "candle",
    categoryLabel: "Candle",
    primaryIntent: "Protection",
    routePrefix: "candles",
    oneLiner: "The ceremonial tool of finality, severing expired ties, absorbing heavy energy, and marking a decisive end.",
    quickAnswer:
      "In witchcraft, black candles are used for protection, banishing unwanted habits, cord-cutting, and absorbing negative emotional energy. Rather than representing malevolence, the color black in occult practice symbolizes the fertile darkness, unyielding boundaries, and total absorption of light, making black candles the premier ceremonial tool for ending parasitic dynamics and demanding privacy.",
    correspondences: {
      uses: ["Banishing emotional drains", "Cord-cutting rites", "Reversing unwanted projections", "Absolute privacy"],
      element: "Fire / Earth",
      planet: "Saturn",
      colors: ["Black", "Obsidian", "Charcoal"],
      intentions: ["Terminating access", "Boundary enforcement", "Closure", "Rejecting guilt"],
      symbolicAssociations: ["Finality", "The velvet void", "Complete absorption", "Silence"],
    },
    traditionalLore: [
      "In color magic and Western ceremonial traditions, black corresponds to Saturn—the planetary ruler of boundaries, limitation, time, discipline, and endings. While popular culture often associates black candles with dark magic, historical folk magicians viewed black candles as defensive shields.",
      "Black absorbs the entire visible light spectrum. Symbolically, a black candle acts like an energetic sponge, drawing in discord, heavy grief, and harmful projections, then burning them down to inert carbon and ash.",
    ],
    modernWitchrUse: [
      "A black candle is Witchr’s signature instrument when you have had enough. It is the visual exclamation point at the end of a relationship, an expired job, or months of accommodating someone else's emotional chaos.",
      "Lighting black wax provides a solemn, focused container for severance. When paired with cord-cutting or burning written grievances, it anchors your commitment to not reopen the door tomorrow morning.",
      "Always observe standard fire safety: burn candles on heat-resistant ceramic or metal trays, never leave an open flame unattended, and ensure proper ventilation.",
    ],
    tryIt: {
      title: "The Cord Severing Anchor",
      instruction:
        "Carve the single word 'ENOUGH' into a black taper candle using a pin. Burn it for fifteen minutes in a heatproof dish while writing down the boundary you are enforcing. Extinguish the flame with finality.",
    },
    relatedHubSlug: "protection",
    relatedRitualSlugs: ["leave-me-alone-protection", "return-to-sender"],
    seoTitle: "Black Candle Meaning & Protection Uses in Witchcraft",
    seoDescription:
      "Discover the true magical meaning of black candles in witchcraft: protection, boundary enforcement, banishing, and absorbing negativity without superstition.",
  },
  {
    slug: "pentagram",
    name: "Pentagram",
    category: "symbol",
    categoryLabel: "Symbol",
    primaryIntent: "Protection",
    routePrefix: "symbols",
    oneLiner: "A classical five-pointed talisman of whole-self sovereignty, elemental harmony, and unbreachable containment.",
    quickAnswer:
      "In witchcraft, the upright pentagram is an ancient protective symbol representing the harmony of the five elements: Earth, Air, Fire, Water, and Spirit. Enclosed within a circle to become a pentacle, it functions as a talisman of personal sovereignty and psychic defense, symbolically containing chaotic forces and grounding the practitioner in their complete physical and spiritual authority.",
    correspondences: {
      uses: ["Perimeter sealing", "Elemental balance", "Warding personal space", "Sovereign authority"],
      element: "Quintessence (Spirit over Matter)",
      planet: "Venus / Planetary harmony",
      colors: ["Silver", "Deep Violet", "Gold", "White"],
      intentions: ["Whole-body grounding", "Shielding against intrusion", "Elemental alignment", "Self-containment"],
      symbolicAssociations: ["The microcosm", "Golden ratio", "Unified will", "Unbreakable perimeter"],
    },
    traditionalLore: [
      "The pentagram is one of humanity’s oldest geometric symbols, dating back to ancient Mesopotamia, Pythagorean Greece, and medieval Christian iconography where it symbolized the five wounds of Christ and the seal of Solomon.",
      "In Renaissance occult philosophy and modern Wiccan traditions, the five points came to represent the four material elements (Earth, Air, Fire, Water) crowned and governed by Spirit (Akasha). The unbroken single line required to draw a pentagram made it a premier folk talisman for trapping chaotic spirits and establishing sacred space.",
    ],
    modernWitchrUse: [
      "For modern witches, the pentagram is not spooky gothic theater; it is a mathematical map of personal wholeness. It represents bringing your thoughts (Air), passions (Fire), emotions (Water), and physical body (Earth) under the executive guidance of your sovereign Will (Spirit).",
      "Tracing a pentagram in the air or visualizing it upon your front door reinforces your energetic perimeter when you feel scattered, overwhelmed, or invaded by demanding people.",
      "Wear a simple pentagram pendant or keep a small wooden tile on your desk as an unyielding reminder that you are a self-contained ecosystem that does not require outside validation to be complete.",
    ],
    tryIt: {
      title: "The Five-Pointed Threshold Seal",
      instruction:
        "Using your index and middle fingers, trace a clean five-pointed star in the air before your entryway or mirror, starting at the top point and moving downward to the lower right. Breathe out slowly and declare your space sovereign.",
    },
    relatedHubSlug: "protection",
    relatedRitualSlugs: ["leave-me-alone-protection"],
    seoTitle: "Pentagram Meaning & Protective Symbolism in Witchcraft",
    seoDescription:
      "Learn the true history, elemental correspondences, and protective symbolism of the pentagram in modern witchcraft and historical folklore.",
  },
];

export function getCorrespondenceBySlug(slug: string): CorrespondenceItem | undefined {
  return CORRESPONDENCES.find((c) => c.slug === slug);
}

export function getCorrespondencesByCategory(category: CorrespondenceItem["category"]): CorrespondenceItem[] {
  return CORRESPONDENCES.filter((c) => c.category === category);
}

export function getCorrespondencesByHub(hubSlug: string): CorrespondenceItem[] {
  return CORRESPONDENCES.filter((c) => c.relatedHubSlug === hubSlug);
}
