export interface SanctumTarotCard {
  id: string;
  slug: string;
  number: number;
  numeral: string;
  name: string;
  shortKeywords: string[];
  traditionalThemes: string[];
  reversedThemes: string[];
  traditionalMeaning: string;
  reflectiveInterpretation: string;
  reflectionPrompt: string;
  practicalTakeaway: string;
  image: {
    src?: string;
    alt: string;
    motif: "fool" | "magician" | "high-priestess" | "hermit" | "death";
  };
}

export const SANCTUM_TAROT_DECK: SanctumTarotCard[] = [
  {
    id: "card_00_fool",
    slug: "the-fool",
    number: 0,
    numeral: "0",
    name: "The Fool",
    shortKeywords: ["Fresh Inception", "Sovereign Risk", "Beginner's Mind"],
    traditionalThemes: [
      "The threshold of a new journey",
      "Trusting unmapped territory",
      "Shedding protective cynicism",
      "Spontaneous willingness to begin",
    ],
    reversedThemes: [
      "Reckless disregard of consequences",
      "Paralysis masquerading as hesitation",
      "Fear of looking foolish or unpolished",
    ],
    traditionalMeaning:
      "The Fool stands at the edge of the cliff, unburdened by precedent. It represents the pure, unconditioned moment before experience hardens into habit—the sacred willingness to step into the unknown without demanding a guarantee.",
    reflectiveInterpretation:
      "The Fool may point toward a threshold in your life where excessive deliberation has begun to look like subtle paralysis. Rather than demanding a complete map before taking the first stride, this card invites you to consider where an honest beginner's posture is more useful than rehearsed expertise. When we surrender the compulsion to seem already arrived, we reclaim the sovereign liberty to learn in real time.",
    reflectionPrompt:
      "Where in your current routine are you protecting an illusion of certainty at the expense of genuine momentum?",
    practicalTakeaway:
      "Take one low-stakes, imperfect step today on a task you have been over-analyzing. Do not polish it before you begin; simply cross the threshold.",
    image: {
      alt: "The Fool — Occult ceremonial tarot motif of the threshold and wandering star",
      motif: "fool",
    },
  },
  {
    id: "card_01_magician",
    slug: "the-magician",
    number: 1,
    numeral: "I",
    name: "The Magician",
    shortKeywords: ["Focused Agency", "Available Tools", "Conscious Direction"],
    traditionalThemes: [
      "Alignment of personal will and action",
      "Skillful resourcefulness",
      "Bridging the conceptual into the tangible",
      "Direct mastery of available supplies",
    ],
    reversedThemes: [
      "Scattershot effort without execution",
      "Illusion of progress through over-planning",
      "Manipulating circumstances rather than addressing substance",
    ],
    traditionalMeaning:
      "The Magician stands before an altar holding the fundamental elemental instruments: wand, cup, blade, and coin. As above, so below. It symbolizes the ability to channel raw intention into material reality through focused craft and deliberate attention.",
    reflectiveInterpretation:
      "The Magician can remind you that the physical tools, mental acuity, and agency required to shift your present circumstance are already laid out on your workbench. It invites you to examine whether you have been waiting for external permission or idealized conditions, when what is truly required is the quiet decision to focus your direct influence on what is directly in front of you.",
    reflectionPrompt:
      "What simple resource, skill, or direct communication already within your reach are you currently underestimating?",
    practicalTakeaway:
      "Clear your immediate physical workspace of three unnecessary distractions and complete one concentrated 25-minute block of focused effort before nightfall.",
    image: {
      alt: "The Magician — Occult ceremonial tarot motif of focused elemental mastery",
      motif: "magician",
    },
  },
  {
    id: "card_02_high_priestess",
    slug: "the-high-priestess",
    number: 2,
    numeral: "II",
    name: "The High Priestess",
    shortKeywords: ["Unspoken Truth", "Subterranean Instinct", "Quiet Discernment"],
    traditionalThemes: [
      "The veiled threshold of knowing",
      "Instinctual resonance over loud debate",
      "Withholding reaction until insight matures",
      "Subtle pattern recognition",
    ],
    reversedThemes: [
      "Ignoring visceral gut warnings",
      "Allowing external chorus to drown instinct",
      "Chronic second-guessing of self-trust",
    ],
    traditionalMeaning:
      "Seated between pillars of dark and light before a tapestry of pomegranates, the High Priestess holds the scroll of esoteric wisdom. She represents knowledge that cannot be forced into analytical logic—the quiet certainty that precedes conscious rationalization.",
    reflectiveInterpretation:
      "The High Priestess may suggest that your analytical intellect has been talking over your instinct. When a situation produces persistent internal dissonance—even if everything appears acceptable on paper—this card invites you to pause the debate and listen to what your gut already recognizes. Truth does not always shout; often it sits quietly behind the noise.",
    reflectionPrompt:
      "What truth have you sensed for weeks that you keep trying to talk yourself out of seeing?",
    practicalTakeaway:
      "Spend ten uninterrupted minutes in silence today without your phone, notebook, or media. Give your thoughts room to settle before making your next decision.",
    image: {
      alt: "The High Priestess — Occult ceremonial tarot motif of the veiled moon and instinct",
      motif: "high-priestess",
    },
  },
  {
    id: "card_09_hermit",
    slug: "the-hermit",
    number: 9,
    numeral: "IX",
    name: "The Hermit",
    shortKeywords: ["Introspection", "Solitude", "Inner Guidance"],
    traditionalThemes: [
      "Deliberate retreat from social consensus",
      "Searching with your own lantern",
      "Deep personal integrity and self-counsel",
      "The quiet fortitude of the solitary path",
    ],
    reversedThemes: [
      "Defensive isolation out of pride",
      "Withdrawing out of bitterness rather than discernment",
      "Refusing necessary help",
    ],
    traditionalMeaning:
      "Standing atop a snow-covered mountain holding a lantern containing a six-pointed star, the Hermit retreats from the noise of the collective to find authentic illumination. The lantern lights only one step at a time, teaching that personal clarity must be walked into, not borrowed.",
    reflectiveInterpretation:
      "The Hermit can invite you to step away from the chorus of external opinions and consult your own moral lantern. When we consume too much ambient commentary, we begin confusing other people's anxieties with our own priorities. This card may point toward a need to dim the room, close the door, and measure your next move against your private standards rather than public expectations.",
    reflectionPrompt:
      "Whose expectations are currently crowding your internal space, and what would your decision look like if you did not need their approval?",
    practicalTakeaway:
      "Decline or postpone one non-essential social or digital obligation today to protect a clean pocket of solitary quiet.",
    image: {
      alt: "The Hermit — Occult ceremonial tarot motif of the solitary beacon and mountain lantern",
      motif: "hermit",
    },
  },
  {
    id: "card_13_death",
    slug: "death",
    number: 13,
    numeral: "XIII",
    name: "Death",
    shortKeywords: ["Necessary Severance", "Natural Closure", "Compost for Growth"],
    traditionalThemes: [
      "The natural conclusion of an expired cycle",
      "Pruning dead wood to feed living roots",
      "Quiet, dignified severance without panic",
      "Transformation through unburdening",
    ],
    reversedThemes: [
      "Clinging to a stagnant dynamic out of fear of void",
      "Postponing an inevitable conversation or exit",
      "Attempting to resurrect what has expired",
    ],
    traditionalMeaning:
      "The black banner with the mystic white rose rides through the battlefield without cruelty. Death in the tarot is not literal destruction, but the cosmic principle of perpetual turnover: the unavoidable clearing of decayed forms so that fresh vitality can inhabit the ground.",
    reflectiveInterpretation:
      "Death in practical divination is the sacred archetype of severance and renewal. It may point toward a habit, commitment, relationship pattern, or self-narrative that has run its course and is now merely taking up space. Refusing to let something end does not preserve it; it only prevents whatever is waiting to grow in that soil. This card invites you to let the old branch fall without guilt.",
    reflectionPrompt:
      "What role, habit, or commitment have you outgrown that you are still carrying out of sheer inertia?",
    practicalTakeaway:
      "Physically discard, delete, or sever one stale item or dead commitment today—clean out a drawer, unsubscribe from a drain, or put down an expired obligation.",
    image: {
      alt: "Death — Occult ceremonial tarot motif of the sickle, severance, and cycle renewal",
      motif: "death",
    },
  },
];

export function getRandomSanctumTarotCard(): SanctumTarotCard {
  const index = Math.floor(Math.random() * SANCTUM_TAROT_DECK.length);
  return SANCTUM_TAROT_DECK[index];
}

export function getSanctumTarotCardById(id: string): SanctumTarotCard | undefined {
  return SANCTUM_TAROT_DECK.find((c) => c.id === id);
}

export function getSanctumTarotCardBySlug(slug: string): SanctumTarotCard | undefined {
  return SANCTUM_TAROT_DECK.find((c) => c.slug === slug);
}
