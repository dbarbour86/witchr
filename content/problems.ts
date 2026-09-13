import { ProblemHub } from "./types";

export const PROBLEM_HUBS: ProblemHub[] = [
  {
    slug: "money",
    title: "Money",
    category: "Money",
    headline: "Things feel tighter than they should. Stop looking away.",
    intro: [
      "Financial anxiety is rarely about math alone. It is about shame, avoidance, and feeling like the ground beneath your feet is perpetually shifting.",
      "Lighting candles does not print currency, and anyone selling you an 'instant abundance spell' is robbing you. What ritual does is interrupt the biological freeze state that makes you dread opening your mail, giving you the stomach to look your numbers in the eye and make decisive moves.",
    ],
    keyPerspective:
      "Treat money not as a mystical mystery, but as physical fuel and practical trade. When you bring reverence and discipline to your ledger, panic loses its grip.",
    ritualSlugs: ["money-reset", "money-candle", "get-your-shit-together"],
    tarotSlug: "what-needs-my-attention",
    sigilIds: ["money-discipline", "clarity"],
    seoTitle: "Money Rituals & Financial Clarity | Witchr",
    seoDescription:
      "Break through financial avoidance, money anxiety, and wage paralysis with practical, grounded rituals and reflective tools.",
  },
  {
    slug: "protection",
    title: "Protection",
    category: "Protection",
    headline: "You need stronger boundaries. Not an apology for having them.",
    intro: [
      "You don’t need to believe in psychic vampires to know that certain people leave you feeling exhausted, irritated, and hollowed out.",
      "Protection magic in the modern world is fundamentally about perimeter defense. It is about deciding who gets access to your attention, refusing to carry emotional garbage that belongs to others, and learning to say 'no' without a defensive paragraph attached.",
    ],
    keyPerspective:
      "Boundaries are not mean; they are the distance at which I can love both you and myself simultaneously. When you seal your edges, you stop leaking vital energy.",
    ritualSlugs: [
      "leave-me-alone-protection",
      "return-to-sender",
      "cut-the-cord",
    ],
    tarotSlug: "should-i-let-this-go",
    sigilIds: ["protection", "boundaries", "calm"],
    seoTitle: "Protection Rituals & Energetic Boundaries | Witchr",
    seoDescription:
      "Grounded, no-nonsense protection rituals for reclaiming your peace, halting emotional drains, and enforcing sovereign boundaries.",
  },
  {
    slug: "confidence",
    title: "Confidence",
    category: "Confidence",
    headline: "You know what you want. You keep hesitating.",
    intro: [
      "Confidence is not the absence of terror; it is the refusal to apologize for taking up space. Too many of us were trained to be small, agreeable, and quiet so others wouldn't feel challenged.",
      "The rituals here are somatic anchors. They are designed for the five minutes before you walk into the negotiation, step onto the stage, or tell someone the unvarnished truth.",
    ],
    keyPerspective:
      "You do not need to feel ready to take action. Action is what produces the feeling of readiness in the first place.",
    ritualSlugs: [
      "confidence-before-you-walk-in",
      "stop-shrinking",
      "pick-a-damn-direction",
    ],
    tarotSlug: "what-do-i-actually-want",
    sigilIds: ["confidence", "courage"],
    seoTitle: "Confidence Rituals & Vocal Authority | Witchr",
    seoDescription:
      "Ground yourself, eliminate imposter syndrome, and take up your full stature with practical, bodily confidence rituals.",
  },
  {
    slug: "love",
    title: "Love",
    category: "Love",
    headline: "Someone has your head spinning. Keep your center.",
    intro: [
      "Modern romance can feel like psychological warfare. Infatuation, ghosting, mixed signals, and codependency make even disciplined people lose their equilibrium.",
      "Witchr will never offer 'make them text you' love spells. We do not believe in overriding another person's free will, and manipulative magic is the language of desperate insecurity. What we offer is ritual for sovereign love: keeping your spine, honoring your standards, and loving without self-erasure.",
    ],
    keyPerspective:
      "The right connection will never demand that you abandon your own dignity as an admission ticket.",
    ritualSlugs: [
      "love-without-losing-yourself",
      "cut-the-cord",
      "stop-checking-their-phone",
    ],
    tarotSlug: "what-do-i-actually-want",
    sigilIds: ["self-respect", "boundaries"],
    seoTitle: "Love Rituals & Self-Sovereignty in Romance | Witchr",
    seoDescription:
      "Navigate romance, infatuation, and relationship anxiety with rituals focused on standards, dignity, and personal sovereignty.",
  },
  {
    slug: "letting-go",
    title: "Letting Go",
    category: "Letting Go",
    headline: "You already know it’s over. Your brain apparently didn’t get the memo.",
    intro: [
      "Letting go does not mean pretending something did not matter. It means deciding how much more of your life and attention it gets to consume.",
      "Whether it's an ex, an old career path, a dead friendship, or a past version of yourself that no longer fits, clinging to the corpse only rots your present. Ritual builds a ceremonial funeral for what has expired so you can walk into clean air.",
    ],
    keyPerspective:
      "Closure is not something another person gives you in a final conversation. Closure is a unilateral decision you make alone.",
    ritualSlugs: [
      "cut-the-cord",
      "stop-checking-their-phone",
      "leave-me-alone-protection",
    ],
    tarotSlug: "should-i-let-this-go",
    sigilIds: ["release", "protection"],
    seoTitle: "Letting Go Rituals & Emotional Closure | Witchr",
    seoDescription:
      "Sever expired ties, halt compulsive checking, and grant yourself unilateral closure with practical letting-go practices.",
  },
  {
    slug: "direction",
    title: "Direction",
    category: "Direction",
    headline: "You have no idea what the hell comes next. Start anyway.",
    intro: [
      "Paralysis is comfortable because it keeps you from making a visible mistake. But spending months in limbo is a far worse mistake than making a wrong turn you can correct in a week.",
      "These practices are engineered to shatter executive freeze, silence obsessive pros-and-cons lists, and give you the nerve to pick one testable path.",
    ],
    keyPerspective:
      "Clarity does not precede action; clarity is the reward for taking clumsy, deliberate action.",
    ritualSlugs: [
      "pick-a-damn-direction",
      "get-your-shit-together",
      "new-beginning",
    ],
    tarotSlug: "what-comes-next",
    sigilIds: ["focus", "new-beginnings", "motivation"],
    seoTitle: "Direction & Decision Rituals | Witchr",
    seoDescription:
      "Break executive freeze, overcome decision paralysis, and claim momentum with grounded transition rituals.",
  },
];

export function getProblemHubBySlug(slug: string): ProblemHub | undefined {
  return PROBLEM_HUBS.find((p) => p.slug === slug);
}
