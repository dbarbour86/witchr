import { TarotSpread } from "./types";

export const TAROT_SPREADS: TarotSpread[] = [
  {
    slug: "why-am-i-stuck",
    title: "Why Am I Stuck?",
    subtitle: "5 cards to diagnose paralysis, uncover blind spots, and find a foothold.",
    cardCount: 5,
    purpose: "When you feel like you are spinning your wheels and your explanations feel shallow or circular.",
    overview:
      "Tarot works best not as future fortune-telling, but as a symbolic mirror. This 5-card diagnostic cuts through your habitual narrative and exposes the real lever of change.",
    positions: [
      {
        number: 1,
        name: "What I say the problem is",
        question: "The convenient story or external excuse I keep telling myself and others.",
        guidance: "Notice if this card reveals an obsession with things you cannot control.",
      },
      {
        number: 2,
        name: "What the actual problem may be",
        question: "The underlying friction, exhaustion, or emotional debt driving the freeze.",
        guidance: "Look for patterns of burnout, unmet boundaries, or unspoken disappointment.",
      },
      {
        number: 3,
        name: "What I am avoiding",
        question: "The uncomfortable conversation, decision, or labor I keep dodging.",
        guidance: "This card often points to the single task you dread looking at directly.",
      },
      {
        number: 4,
        name: "What I can influence",
        question: "The immediate radius of my own sovereign choice today.",
        guidance: "Strip away grand abstractions. What can your physical hands touch right now?",
      },
      {
        number: 5,
        name: "My next useful move",
        question: "Not the ten-year solution, but the next honest step forward.",
        guidance: "Translate this card into one concrete action before the sun sets.",
      },
    ],
    journalingPrompts: [
      "How does Card 2 challenge the convenient excuse in Card 1?",
      "If I were completely honest with myself, why do I feel safer staying stuck than taking the step in Card 5?",
    ],
    relatedRitualSlug: "get-your-shit-together",
    seoTitle: "Why Am I Stuck? 5-Card Diagnostic Tarot Spread | Witchr",
    seoDescription:
      "A 5-card diagnostic tarot spread designed to break executive paralysis and reveal what is really keeping you stuck.",
  },
  {
    slug: "what-am-i-avoiding",
    title: "What Am I Avoiding?",
    subtitle: "4 cards to stop sidestepping the elephant in the room.",
    cardCount: 4,
    purpose: "When you have a gnawing discomfort in your gut but keep keeping yourself artificially busy.",
    overview:
      "Avoidance is exhausting. It takes three times more daily energy to pretend something doesn't hurt than it does to address it. This spread gently pulls back the curtain.",
    positions: [
      {
        number: 1,
        name: "The comfortable illusion",
        question: "The pleasant fiction or distraction I hide behind.",
        guidance: "Is this shopping, doom-scrolling, perfectionism, or false optimism?",
      },
      {
        number: 2,
        name: "The truth under the rug",
        question: "What has been gathering dust and weight in the dark.",
        guidance: "Accept this card without self-criticism. Recognition is half the battle.",
      },
      {
        number: 3,
        name: "The cost of looking away",
        question: "What price I am paying every single week I keep pretending.",
        guidance: "Notice how chronic avoidance erodes self-trust and physical stamina.",
      },
      {
        number: 4,
        name: "The courageous first look",
        question: "How to face this issue with dignity and quiet resolve.",
        guidance: "You do not have to solve it all in one afternoon; you just need to stop running.",
      },
    ],
    journalingPrompts: [
      "What would happen if I stopped protecting the comfortable illusion in Position 1?",
      "Who would I become if I no longer carried the secret weight of Position 2?",
    ],
    relatedRitualSlug: "confidence-before-you-walk-in",
    seoTitle: "What Am I Avoiding? 4-Card Tarot Spread | Witchr",
    seoDescription:
      "Unpack hidden friction, denial, and chronic procrastination with this honest 4-card tarot spread.",
  },
  {
    slug: "should-i-let-this-go",
    title: "Should I Let This Go?",
    subtitle: "5 cards for clarity on relationships, projects, habits, or old grudges.",
    cardCount: 5,
    purpose: "When you can't tell if you're persevering bravely or just foolishly clinging to a corpse.",
    overview:
      "Tenacity is a virtue only until it becomes self-punishment. This spread helps you evaluate whether an attachment still holds genuine life or if it has run its natural course.",
    positions: [
      {
        number: 1,
        name: "What it gave me in the past",
        question: "The genuine value, beauty, or safety it once provided.",
        guidance: "Honoring what was good allows you to let go without bitterness.",
      },
      {
        number: 2,
        name: "What it actually costs today",
        question: "The ongoing toll on your peace, self-respect, and energy.",
        guidance: "Look at the present reality, not the memory or the potential.",
      },
      {
        number: 3,
        name: "The fear holding me attached",
        question: "The sunk cost, loneliness, or scarcity mindset gripping your hands.",
        guidance: "Often we cling not out of love, but out of fear of empty space.",
      },
      {
        number: 4,
        name: "What opens up if I release it",
        question: "The breathing room, new creative capacity, or peace waiting on the other side.",
        guidance: "Nature abhors a vacuum. When you release expired energy, vitality returns.",
      },
      {
        number: 5,
        name: "The clean verdict",
        question: "The clearest instruction for your peace of mind.",
        guidance: "Notice your physical reaction to this card: does your chest tighten or expand?",
      },
    ],
    journalingPrompts: [
      "Am I staying in this dynamic because of who they actually are, or who I wish they were?",
      "What would my life look like in six months if I laid this down today?",
    ],
    relatedRitualSlug: "cut-the-cord",
    seoTitle: "Should I Let This Go? 5-Card Tarot Spread for Release | Witchr",
    seoDescription:
      "A 5-card tarot spread to evaluate whether a relationship, job, or attachment is worth fighting for or ready to release.",
  },
  {
    slug: "what-needs-my-attention",
    title: "What Needs My Attention?",
    subtitle: "3 cards to cut through daily distraction and isolate the vital signal.",
    cardCount: 3,
    purpose: "For frantic mornings or chaotic weeks when everything feels urgent and nothing feels clear.",
    overview:
      "In an attention economy, your focus is your most sacred commodity. This rapid 3-card spread strips away shallow fires and points to what genuinely matters.",
    positions: [
      {
        number: 1,
        name: "The noise draining you",
        question: "What is demanding your energy but producing zero real fruit.",
        guidance: "Differentiate between real urgency and performative busyness.",
      },
      {
        number: 2,
        name: "The vital signal",
        question: "The quiet, essential matter that genuinely deserves your focus.",
        guidance: "Often this is health, a core relationship, or fundamental craft.",
      },
      {
        number: 3,
        name: "The daily adjustment",
        question: "One tangible shift in your schedule or mindset for today.",
        guidance: "Keep it small, elegant, and non-dramatic.",
      },
    ],
    journalingPrompts: [
      "What is one thing I am currently doing that could be canceled without the world ending?",
      "How can I defend an hour of uninterrupted quiet for Position 2?",
    ],
    relatedRitualSlug: "money-reset",
    seoTitle: "What Needs My Attention? 3-Card Clarity Spread | Witchr",
    seoDescription:
      "A rapid 3-card tarot spread for overwhelmed days to separate draining noise from vital focus.",
  },
  {
    slug: "what-do-i-actually-want",
    title: "What Do I Actually Want?",
    subtitle: "4 cards to separate your true hunger from social conditioning.",
    cardCount: 4,
    purpose: "When you feel numb, aimless, or suspicious that your goals aren't actually yours.",
    overview:
      "We absorb family scripts, Instagram aspirations, and corporate metrics like secondhand smoke. This spread burns away external expectations to touch your raw desires.",
    positions: [
      {
        number: 1,
        name: "The script handed to me",
        question: "What I was told I should want to be considered successful or good.",
        guidance: "Notice who benefited from you believing this script.",
      },
      {
        number: 2,
        name: "The fear of being too much",
        question: "The self-censorship and shame that caps your ambition.",
        guidance: "Where did you learn to play small so others wouldn't feel insecure?",
      },
      {
        number: 3,
        name: "The raw desire",
        question: "What your body and spirit hunger for without societal apologies.",
        guidance: "Allow yourself to want this, even if it feels inconvenient or weird.",
      },
      {
        number: 4,
        name: "The willing sacrifice",
        question: "What price, discomfort, or risk you must willingly pay to claim it.",
        guidance: "Every desire has a price tag. Are you willing to pay with courage?",
      },
    ],
    journalingPrompts: [
      "If nobody was watching or judging me, what would I spend the next year building?",
      "What old approval loop am I ready to starve?",
    ],
    relatedRitualSlug: "stop-shrinking",
    seoTitle: "What Do I Actually Want? 4-Card Tarot Spread | Witchr",
    seoDescription:
      "Strip away societal conditioning and reconnect with your authentic desire with this 4-card spread.",
  },
  {
    slug: "what-comes-next",
    title: "What Comes Next?",
    subtitle: "3 cards to navigate the liminal space between who you were and where you're headed.",
    cardCount: 3,
    purpose: "When a chapter has ended but the new one hasn't fully taken form yet.",
    overview:
      "Liminal space is naturally disorienting. Trying to force certainty prematurely only invites old patterns back. This spread helps you walk through the hallway with composure.",
    positions: [
      {
        number: 1,
        name: "The season being closed",
        question: "What lessons, grief, or skills you are leaving behind.",
        guidance: "Give thanks for the armor that protected you, even as you remove it.",
      },
      {
        number: 2,
        name: "The threshold condition",
        question: "The atmosphere of the current crossing.",
        guidance: "Patience and observation are your primary tools right now.",
      },
      {
        number: 3,
        name: "The muscle to cultivate",
        question: "The character trait or practice that will carry you into the new territory.",
        guidance: "Focus on developing capacity rather than guessing specific outcomes.",
      },
    ],
    journalingPrompts: [
      "How can I be kind to myself while living in an unanswered question?",
      "What does Position 3 suggest about how I should invest my energy this month?",
    ],
    relatedRitualSlug: "new-beginning",
    seoTitle: "What Comes Next? 3-Card Threshold Tarot Spread | Witchr",
    seoDescription:
      "Find steady footing during life transitions and uncertain seasons with this 3-card threshold spread.",
  },
];

export function getTarotBySlug(slug: string): TarotSpread | undefined {
  return TAROT_SPREADS.find((s) => s.slug === slug);
}
