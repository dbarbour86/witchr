export interface IntentResource {
  name: string;
  slug: string;
  url: string;
  categoryLabel: string;
  role: string;
  howToUse: string;
  sensoryAnchor: string;
  badge?: string;
}

export interface IntentFAQ {
  question: string;
  answer: string;
}

export interface IntentPitfall {
  title: string;
  explanation: string;
  betterWay: string;
}

export interface IntentCombiningStep {
  step: number;
  phase: string;
  elements: string;
  instruction: string;
}

export interface IntentCorrespondenceData {
  slug: "protection" | "love" | "cleansing";
  title: string;
  h1: string;
  intentBadge: string;
  seoTitle: string;
  seoDescription: string;
  oneLiner: string;
  intro: string[];
  philosophy: {
    heading: string;
    quote: string;
    context: string;
  };
  herbs: IntentResource[];
  candles: IntentResource[];
  ingredients: IntentResource[];
  symbols: IntentResource[];
  rituals: IntentResource[];
  tools: IntentResource[];
  combiningFramework: {
    title: string;
    intro: string;
    steps: IntentCombiningStep[];
  };
  pitfalls: IntentPitfall[];
  faqs: IntentFAQ[];
  relatedIntents: {
    slug: string;
    name: string;
    url: string;
    description: string;
  }[];
}

export const INTENT_CORRESPONDENCES: Record<string, IntentCorrespondenceData> = {
  protection: {
    slug: "protection",
    title: "Protection",
    h1: "Protection Correspondences in Witchcraft",
    intentBadge: "Perimeter & Boundary Defense",
    seoTitle: "Protection Correspondences in Witchcraft: Herbs, Candles & Symbols",
    seoDescription:
      "A complete guide to protection correspondences in witchcraft. Explore grounded associations for herbs, candles, minerals, sigils, and rituals for strong personal boundaries.",
    oneLiner:
      "A grounded taxonomy of perimeter botanicals, mineral anchors, absorbing waxes, and warding geometry designed to protect personal peace.",
    intro: [
      "In genuine folk magic and grounded modern craft, protection magic is never about paranoia, fictional curses, or living in fear of invisible demons. It is about perimeter defense and sovereign self-possession.",
      "Every day, external demands, entitled acquaintances, difficult environments, and draining relational dynamics pull at your attention. Protection correspondences are traditional sensory and material anchors that signal to your nervous system: 'This is my perimeter. You do not have permission to drain my peace.'",
      "Below is Witchr's curated correspondence directory for protection, organized by category and linked directly to dedicated guides, rituals, and diagnostic tools across the site.",
    ],
    philosophy: {
      heading: "The Witchr Perspective on Protection",
      quote:
        "Boundaries are not an act of hostility against others; they are the distance at which I can preserve my peace and love both you and myself simultaneously.",
      context:
        "No herb, mineral, or candle can replace physical security, locks on doors, legal recourse, or the courage to say 'no' directly. Ritual tools do not create forcefields; they reinforce your internal resolve so that when the time comes to hold a boundary in the physical world, your hands do not tremble.",
    },
    herbs: [
      {
        name: "Rosemary",
        slug: "rosemary",
        url: "/herbs/rosemary",
        categoryLabel: "Herb / Botanical",
        role: "Perimeter Defense & Mental Resolve",
        howToUse:
          "Hang dried sprigs above your entryway, steep into threshold wash water, or burn for clear solar boundary defense.",
        sensoryAnchor: "Sharp, camphoraceous pine needle aroma",
        badge: "Core Anchor",
      },
      {
        name: "Sweet Basil",
        slug: "basil",
        url: "/herbs/basil",
        categoryLabel: "Herb / Botanical",
        role: "Diffusing Aggression & Household Harmony",
        howToUse:
          "Sprinkle dried leaf across front sills or infuse into wash water to calm volatile conflict and soothe hostile household friction.",
        sensoryAnchor: "Peppery, clove-sweet aromatic foliage",
      },
      {
        name: "Garden Sage",
        slug: "sage",
        url: "/herbs/sage",
        categoryLabel: "Herb / Botanical",
        role: "Atmospheric Clearing & Space Consecration",
        howToUse:
          "Burn dried culinary leaves in a fireproof dish to strip away stagnant confrontation residue and reinforce sanctum clarity.",
        sensoryAnchor: "Pungent, dry, earthy smoke",
      },
      {
        name: "Thyme",
        slug: "thyme",
        url: "/herbs/thyme",
        categoryLabel: "Herb / Botanical",
        role: "Somatic Courage & Nighttime Shielding",
        howToUse:
          "Keep under a pillow to ward off anxious nightmares or carry a pinch when entering an intimidating corporate or interpersonal setting.",
        sensoryAnchor: "Herbaceous, warm thymol fragrance",
      },
      {
        name: "Bay Leaf",
        slug: "bay-leaf",
        url: "/herbs/bay-leaf",
        categoryLabel: "Herb / Botanical",
        role: "Written Boundary Petitions & Deflecting Envy",
        howToUse:
          "Inscribe names of situations to be excluded onto whole dry leaves and burn with finality, or tuck leaves behind doorway moldings.",
        sensoryAnchor: "Glossy, rigid leaf with herbal tea warmth",
      },
      {
        name: "Mugwort",
        slug: "mugwort",
        url: "/herbs/mugwort",
        categoryLabel: "Herb / Botanical",
        role: "Astral Boundaries & Threshold Guardian",
        howToUse:
          "Hang above bedposts or windows to shield unconscious sleep states and preserve psychic sovereignty during deep rest.",
        sensoryAnchor: "Silvery-backed bitter wild foliage",
      },
    ],
    candles: [
      {
        name: "Black Candle",
        slug: "black",
        url: "/candles/black",
        categoryLabel: "Candle / Wax",
        role: "Absorbing Discord & Decisive Closure",
        howToUse:
          "Burn down completely during cord-cutting rites or place in the entryway to soak up heavy psychic static before it penetrates your home.",
        sensoryAnchor: "Midnight black wax consuming into dark soot",
        badge: "Essential Tool",
      },
      {
        name: "White Candle",
        slug: "white",
        url: "/candles/white",
        categoryLabel: "Candle / Wax",
        role: "Illuminating Sanctum & Universal Shield",
        howToUse:
          "Light after cleansing to flood the room with unclouded, neutral light, establishing an atmosphere where chaotic noise cannot thrive.",
        sensoryAnchor: "Pure white flame and clean wax radiance",
      },
    ],
    ingredients: [
      {
        name: "Coarse Sea Salt",
        slug: "salt",
        url: "/ingredients/salt",
        categoryLabel: "Ritual Mineral",
        role: "Bedrock Physical Perimeter & Containment",
        howToUse:
          "Lay a discrete line across the front threshold, pour in a ring around candles during severance, or add to warm baths to strip emotional static.",
        sensoryAnchor: "Dense, non-decaying crystalline grains",
        badge: "Foundation",
      },
    ],
    symbols: [
      {
        name: "The Pentagram",
        slug: "pentagram",
        url: "/symbols/pentagram",
        categoryLabel: "Symbol / Talisman",
        role: "Five-Element Sovereign Containment",
        howToUse:
          "Wear as a physical pendant, sketch onto threshold wood, or visualize over heart and throat when asserting personal boundaries.",
        sensoryAnchor: "Interlocking golden ratio five-pointed star",
      },
      {
        name: "Perimeter & Shield Sigil",
        slug: "protection",
        url: "/sigils#protection",
        categoryLabel: "Visual Sigil",
        role: "Mental Command: Absolute Sanctuary",
        howToUse:
          "Draw onto your journal's inside cover or trace on your front door: 'I decide what gets access to my mind, body, and peace.'",
        sensoryAnchor: "Concentric circular glyph with central spine",
      },
      {
        name: "The Stone Wall Sigil",
        slug: "boundaries",
        url: "/sigils#boundaries",
        categoryLabel: "Visual Sigil",
        role: "Refusing Guilt & Entitled Demands",
        howToUse:
          "Trace mentally when dealing with overstepping relatives or intrusive managers: 'No entry without permission. Guilt has no jurisdiction here.'",
        sensoryAnchor: "Angular interlocking anchor glyph",
      },
    ],
    rituals: [
      {
        name: "Leave Me Alone: Boundary Protection",
        slug: "leave-me-alone-protection",
        url: "/rituals/leave-me-alone-protection",
        categoryLabel: "Ritual Working",
        role: "Somatic Perimeter Sealing",
        howToUse:
          "A tactile salt-and-candle working designed to halt energy leaks and terminate uninvited emotional entitlement.",
        sensoryAnchor: "Crackling salt ring and focused breathwork",
      },
      {
        name: "Return to Sender: Projection Reversal",
        slug: "return-to-sender",
        url: "/rituals/return-to-sender",
        categoryLabel: "Ritual Working",
        role: "Neutralizing Malicious Gossip & Projections",
        howToUse:
          "Ceremonial reflection practice sending spiteful opinions and bad vibes back to their originating source without vengeance.",
        sensoryAnchor: "Reflective mirror surface and dark flame",
      },
      {
        name: "Cut the Cord: Decisive Severance",
        slug: "cut-the-cord",
        url: "/rituals/cut-the-cord",
        categoryLabel: "Ritual Working",
        role: "Final Emotional Disconnection",
        howToUse:
          "Two-candle twine burning rite to sever psychic attachments to toxic exes, expired jobs, or parasitic dynamics.",
        sensoryAnchor: "Snapping flame burning through taut string",
      },
    ],
    tools: [
      {
        name: "Protection Problem Hub",
        slug: "protection",
        url: "/protection",
        categoryLabel: "Diagnostic Portal",
        role: "Comprehensive Boundary Toolkit",
        howToUse:
          "Explore full articles, diagnostic approaches, and tailored practices when feeling drained or overwhelmed.",
        sensoryAnchor: "Curated problem-centered interactive portal",
      },
      {
        name: "Spell Finder",
        slug: "spell-finder",
        url: "/spell-finder",
        categoryLabel: "Interactive Tool",
        role: "Custom Practice Selector",
        howToUse:
          "Filter by intent, duration, and energy level to identify the exact ritual needed for your current emotional friction.",
        sensoryAnchor: "Fast multi-step diagnostic selector",
      },
      {
        name: "Tarot Spread: Should I Let This Go?",
        slug: "should-i-let-this-go",
        url: "/tarot/should-i-let-this-go",
        categoryLabel: "Tarot Spread",
        role: "Boundary Diagnostic Spread",
        howToUse:
          "A targeted 4-card spread revealing whether a painful connection can be repaired or must be severed with finality.",
        sensoryAnchor: "Reflective geometric card layout",
      },
    ],
    combiningFramework: {
      title: "How to Combine Protection Correspondences in a Single Working",
      intro:
        "You do not need an elaborate altar. High-impact protection ritual is built from three distinct physical layers: grounding bedrock, botanical air defense, and thermal focus.",
      steps: [
        {
          step: 1,
          phase: "Bedrock Foundation (Earth)",
          elements: "Coarse Salt + Clean Surface",
          instruction:
            "Pour a discrete ring of coarse sea salt around your working plate. As the grains hit the surface, silently designate the inner area as sovereign, inviolable space.",
        },
        {
          step: 2,
          phase: "Thermal Focus (Fire)",
          elements: "Black Candle or White Taper",
          instruction:
            "Carve the word 'ENOUGH' or the Stone Wall sigil into the wax with a pin. Anoint downward away from the wick. Seat the candle firmly inside the salt ring.",
        },
        {
          step: 3,
          phase: "Botanical Armor (Air)",
          elements: "Dried Rosemary Sprigs or Bay Leaf",
          instruction:
            "Crush a dried rosemary sprig between your palms. Inhale the camphor aroma deeply, then scatter the crushed needles into the salt ring. Light the candle and state your boundary aloud.",
        },
      ],
    },
    pitfalls: [
      {
        title: "Falling Into Paranoid Magical Thinking",
        explanation:
          "Believing every inconvenience, bad mood, or cancelled plan is an 'evil eye curse' or 'psychic attack' creates crippling anxiety and exhausts your energy.",
        betterWay:
          "Assume mundane explanations first. Bad moods, rude people, and bad days are normal parts of human existence. Use protection magic as hygiene, not as terror defense.",
      },
      {
        title: "Using Ritual as an Excuse to Avoid Physical Action",
        explanation:
          "Burning candles and sprinkling salt will not stop an abusive ex from contacting you if you refuse to block their phone number and change your passwords.",
        betterWay:
          "Every ritual must be matched by decisive real-world action: block numbers, lock doors, seek legal aid, or say 'no' directly. Magic reinforces your spine; it does not replace it.",
      },
    ],
    faqs: [
      {
        question: "What is the single best herb for protection?",
        answer:
          "Rosemary is traditionally considered the premier all-purpose botanical for boundary defense, threshold protection, and mental resolve. Its sharp camphoraceous scent provides an immediate sensory anchor for clarity.",
      },
      {
        question: "Can I use table salt if I do not have sea salt?",
        answer:
          "Yes. Standard iodized table salt functions identically in protective folk magic. The mineral structure of sodium chloride—crystalline, dense, and preservative—is what provides the symbolic grounding, regardless of price or packaging.",
      },
      {
        question: "Should I use a black candle or a white candle for protection?",
        answer:
          "Use a black candle when your priority is absorbing discord, cord-cutting, or marking the final termination of a toxic dynamic. Use a white candle when your goal is cleansing, space blessing, and maintaining unclouded peace.",
      },
      {
        question: "How often should I refresh protection correspondences?",
        answer:
          "Folk tradition typically suggests refreshing threshold salt or hanging herbs whenever they become physically dusty, after major domestic confrontations, or with each seasonal solstice/equinox.",
      },
    ],
    relatedIntents: [
      {
        slug: "cleansing",
        name: "Cleansing Correspondences",
        url: "/correspondences/cleansing",
        description:
          "Clear away stagnant emotional static and prepare clean ground before establishing protective boundaries.",
      },
      {
        slug: "love",
        name: "Love & Sovereignty Correspondences",
        url: "/correspondences/love",
        description:
          "Learn how to cultivate romantic warmth and genuine intimacy without sacrificing your sovereign borders.",
      },
    ],
  },

  love: {
    slug: "love",
    title: "Love & Sovereignty",
    h1: "Love Correspondences in Witchcraft",
    intentBadge: "Attraction, Intimacy & Self-Sovereignty",
    seoTitle: "Love Correspondences in Witchcraft: Herbs, Candles & Sovereign Magic",
    seoDescription:
      "Explore grounded love correspondences in modern witchcraft. Discover herbs, candles, minerals, and rituals focused on mutual passion, emotional vulnerability, and self-respect.",
    oneLiner:
      "A principled guide to warming botanicals, passionate flames, and sovereignty anchors that foster mutual affection without self-erasure or coercion.",
    intro: [
      "No area of modern witchcraft is as distorted by manipulative fantasy as love magic. Popular internet culture is filled with 'make them obsess over me' spells, honey jars promising total control, and desperation rites aimed at forcing another person's affection.",
      "Witchr stands firmly against manipulative, coercive magic. Attempting to override another adult's free will is the language of desperate insecurity; it produces volatile, resentful, and hollow connections. Genuine love magic is about personal magnetism, emotional bravery, opening the heart while keeping the spine intact, and cultivating mutual vulnerability between equals.",
      "The correspondences below support sovereign attraction, romantic vitality, and relationship harmony—anchoring your confidence so you can love deeply without ever losing yourself.",
    ],
    philosophy: {
      heading: "The Witchr Perspective on Love Magic",
      quote:
        "The right connection will never demand that you abandon your own dignity as an admission ticket.",
      context:
        "True love magic starts with somatic self-respect. When you inhabit your body with calm authority, refuse to settle for breadcrumbs, and honor your own standards, your energy becomes naturally magnetic. Ritual does not bend other people; it aligns your self-worth.",
    },
    herbs: [
      {
        name: "Lavender",
        slug: "lavender",
        url: "/herbs/lavender",
        categoryLabel: "Herb / Botanical",
        role: "Vulnerability, Tranquil Harmony & Honest Speech",
        howToUse:
          "Sip as tea before difficult relationship conversations or place beneath pillows to soften defensive posturing and invite gentle affection.",
        sensoryAnchor: "Sweet, herbaceous floral-camphor fragrance",
        badge: "Core Anchor",
      },
      {
        name: "Cinnamon",
        slug: "cinnamon",
        url: "/herbs/cinnamon",
        categoryLabel: "Herb / Botanical",
        role: "Thermal Spark, Passionate Drive & Romantic Speed",
        howToUse:
          "Dress onto red candles or simmer on the stove with orange peel to ignite mutual passion, warmth, and excitement.",
        sensoryAnchor: "Spicy, sweet, warming cinnamaldehyde bark",
        badge: "Thermal Heat",
      },
      {
        name: "Sweet Basil",
        slug: "basil",
        url: "/herbs/basil",
        categoryLabel: "Herb / Botanical",
        role: "Domestic Harmony & Cooling Relationship Friction",
        howToUse:
          "Cook into shared meals or sprinkle across shared living spaces to dissolve lingering resentment and cultivate warm companionship.",
        sensoryAnchor: "Fresh peppery foliage with clove sweetness",
      },
      {
        name: "Chamomile",
        slug: "chamomile",
        url: "/herbs/chamomile",
        categoryLabel: "Herb / Botanical",
        role: "Easing Romantic Anxiety & Softening Guarded Walls",
        howToUse:
          "Infuse into a warm bath before a date to calm physical stomach butterflies and release hyper-vigilant control.",
        sensoryAnchor: "Apple-sweet daisy-like floral aroma",
      },
      {
        name: "Rosemary",
        slug: "rosemary",
        url: "/herbs/rosemary",
        categoryLabel: "Herb / Botanical",
        role: "Fidelity, Remembrance & Sacred Commitment",
        howToUse:
          "Tuck into wedding or partnership bouquets or place near shared photographs to honor lasting mutual dedication.",
        sensoryAnchor: "Crisp pine needles and clarifying resin",
      },
    ],
    candles: [
      {
        name: "Red Candle",
        slug: "red",
        url: "/candles/red",
        categoryLabel: "Candle / Wax",
        role: "Sensual Vitality, Mutual Spark & Bold Courage",
        howToUse:
          "Light to break romantic hesitation, revitalize sexual intimacy, or ground yourself in unapologetic desirability.",
        sensoryAnchor: "Crimson flame radiating focused physical warmth",
        badge: "Primal Spark",
      },
      {
        name: "White Candle",
        slug: "white",
        url: "/candles/white",
        categoryLabel: "Candle / Wax",
        role: "Emotional Truth, Transparency & Fresh Chapters",
        howToUse:
          "Burn during honest boundary talks or to clear away past relationship baggage when opening your heart to a new partner.",
        sensoryAnchor: "Luminous neutral flame and unclouded wax",
      },
    ],
    ingredients: [
      {
        name: "Raw Honey / Sweeteners",
        slug: "honey",
        url: "/love",
        categoryLabel: "Folk Ingredient",
        role: "Traditional Folk Sweetening & Softening Discord",
        howToUse:
          "In traditional folk magic, a teaspoon of honey added to written affirmations symbolizes softening bitter communication and inviting mutual warmth.",
        sensoryAnchor: "Thick, golden, amber sweetness",
      },
      {
        name: "Rose Quartz",
        slug: "rose-quartz",
        url: "/love",
        categoryLabel: "Mineral Specimen",
        role: "Tactile Anchor for Self-Compassion",
        howToUse:
          "Hold against your sternum during deep breathing exercises to anchor gentle self-regard and soothe romantic rejection sting.",
        sensoryAnchor: "Cool, translucent pale pink crystalline stone",
      },
    ],
    symbols: [
      {
        name: "The Unbent Spine Sigil",
        slug: "self-respect",
        url: "/sigils#self-respect",
        categoryLabel: "Visual Sigil",
        role: "Sovereign Love: Loving Without Self-Erasure",
        howToUse:
          "Meditate on this symbol when tempted to sacrifice personal values, friendships, or self-respect to keep someone's approval.",
        sensoryAnchor: "Upright vertical glyph with grounded chevron base",
        badge: "Essential",
      },
      {
        name: "The Stone Wall Sigil",
        slug: "boundaries",
        url: "/sigils#boundaries",
        categoryLabel: "Visual Sigil",
        role: "Halting Codependency & Anxious Over-Giving",
        howToUse:
          "Keep on your desk or vanity to remind yourself: love is a partnership of two wholes, not the rescue of an unwilling project.",
        sensoryAnchor: "Interlocking fortified lines",
      },
    ],
    rituals: [
      {
        name: "Love Without Losing Yourself",
        slug: "love-without-losing-yourself",
        url: "/rituals/love-without-losing-yourself",
        categoryLabel: "Ritual Working",
        role: "Sovereignty Anchor in Romance",
        howToUse:
          "A grounding working that aligns physical attraction with uncompromising personal standards and emotional autonomy.",
        sensoryAnchor: "Candlelight meditation and written declaration",
      },
      {
        name: "Stop Checking Their Phone",
        slug: "stop-checking-their-phone",
        url: "/rituals/stop-checking-their-phone",
        categoryLabel: "Ritual Working",
        role: "Halting Relationship Paranoia & Compulsive Control",
        howToUse:
          "A somatic interrupt ritual breaking the anxious loop of digital surveillance and restoring dignified peace.",
        sensoryAnchor: "Cold water splashing and palm grounding",
      },
      {
        name: "Cut the Cord: Final Severance",
        slug: "cut-the-cord",
        url: "/rituals/cut-the-cord",
        categoryLabel: "Ritual Working",
        role: "Severing Ties with Expired Lovers",
        howToUse:
          "When love has soured into codependent poison, sever the psychic bond so you can walk into clean air.",
        sensoryAnchor: "Burning cord and deliberate separation of holders",
      },
    ],
    tools: [
      {
        name: "Love Problem Hub",
        slug: "love",
        url: "/love",
        categoryLabel: "Diagnostic Portal",
        role: "Comprehensive Relational Guidance",
        howToUse:
          "Navigate infatuation, heartbreak, mixed signals, and dating fatigue with practical, unsentimental perspectives.",
        sensoryAnchor: "Problem-centered relationship portal",
      },
      {
        name: "Tarot Spread: What Do I Actually Want?",
        slug: "what-do-i-actually-want",
        url: "/tarot/what-do-i-actually-want",
        categoryLabel: "Tarot Spread",
        role: "Uncovering Deep Desires & Dealbreakers",
        howToUse:
          "A 5-card diagnostic spread cutting through infatuation fog to reveal your authentic romantic priorities.",
        sensoryAnchor: "Introspective card arc for relational clarity",
      },
      {
        name: "Spell Finder",
        slug: "spell-finder",
        url: "/spell-finder",
        categoryLabel: "Interactive Tool",
        role: "Custom Practice Selector",
        howToUse:
          "Select the exact working suited to your current relational state—whether reigniting intimacy or walking away.",
        sensoryAnchor: "Fast decision tree for ritual matching",
      },
    ],
    combiningFramework: {
      title: "How to Build a Sovereign Love Working",
      intro:
        "An effective love working does not summon a stranger; it clarifies your own emotional frequency, cultivates mutual warmth, and anchors your dignity.",
      steps: [
        {
          step: 1,
          phase: "Clarify the Container (White Flame & Salt)",
          elements: "White Candle + Pinch of Salt",
          instruction:
            "Light a white candle and sprinkle a small pinch of salt at the base. State aloud: 'I open my heart to authentic connection, but I preserve my sacred boundaries.'",
        },
        {
          step: 2,
          phase: "Warm the Heart & Awaken Attraction (Herbs)",
          elements: "Dried Lavender + Ground Cinnamon",
          instruction:
            "Combine a pinch of dried lavender (for peaceful vulnerability) and a pinch of cinnamon (for warm passion) in a small dish. Inhale the aroma to awaken your senses.",
        },
        {
          step: 3,
          phase: "Anchor the Sovereign Spine (Red Candle / Sigil)",
          elements: "Red Candle or Unbent Spine Sigil",
          instruction:
            "Light a red candle or trace the Unbent Spine sigil. Affirm that you are worthy of being pursued, cherished, and respected for who you truly are.",
        },
      ],
    },
    pitfalls: [
      {
        title: "Obsession & Dominance Spells",
        explanation:
          "Trying to 'make someone text you' or 'force someone to love you' attempts to override their autonomy. Even if obsessive behavior is triggered, it breeds jealousy, resentment, and emotional instability.",
        betterWay:
          "Perform magic on yourself. Increase your personal magnetism, charisma, and clarity so you attract someone who genuinely wants to be with you willingly.",
      },
      {
        title: "Confusing Anxiety with 'Soulmate' Energy",
        explanation:
          "Dysfunctional rollercoasters of ghosting and intense reunions trigger dopamine spikes that people often mistake for 'spiritual twin flames.'",
        betterWay:
          "Genuine love feels peaceful, consistent, and safe. Use lavender and chamomile to settle your nervous system before evaluating a partner's actions.",
      },
    ],
    faqs: [
      {
        question: "Can witchcraft make someone fall in love with me?",
        answer:
          "No ethical practice can or should force another person's feelings. Love requires consent. Witchcraft can enhance your personal confidence, dissolve emotional walls, and draw compatible people toward your authentic self, but love must always be chosen freely.",
      },
      {
        question: "What is the difference between red and pink candles in love magic?",
        answer:
          "Red candles correspond to primal heat, sexual passion, physical vitality, and courageous attraction. Pink candles correspond to gentle tenderness, emotional safety, self-compassion, and developing romance.",
      },
      {
        question: "Which herb is best for healing after a painful breakup?",
        answer:
          "Lavender and chamomile together provide deep somatic calm, while thyme helps release heavy grief and restores courage to rebuild your life.",
      },
    ],
    relatedIntents: [
      {
        slug: "protection",
        name: "Protection Correspondences",
        url: "/correspondences/protection",
        description:
          "Preserve your boundaries and avoid falling into codependent traps when navigating modern dating.",
      },
      {
        slug: "cleansing",
        name: "Cleansing Correspondences",
        url: "/correspondences/cleansing",
        description:
          "Purge lingering baggage and energetic residue from past relationships before inviting someone new into your space.",
      },
    ],
  },

  cleansing: {
    slug: "cleansing",
    title: "Cleansing & Purification",
    h1: "Cleansing Correspondences in Witchcraft",
    intentBadge: "Reset, Space Clearing & Purification",
    seoTitle: "Cleansing Correspondences in Witchcraft: Herbs, Smoke & Space Clearing",
    seoDescription:
      "A comprehensive guide to cleansing correspondences in witchcraft. Explore grounded herbs, smoke cleansing, mineral washes, white candles, and space clearing rituals.",
    oneLiner:
      "A practical reference directory for botanical smoke, mineral waters, illuminating tapers, and somatic resets designed to sweep away stagnant residue.",
    intro: [
      "In modern witchcraft, cleansing is often misunderstood as an obsessive, fearful chore—a constant reaction to imaginary 'bad vibes.' In authentic folk tradition, cleansing is simply spiritual and psychological hygiene.",
      "Just as you wash dishes after preparing dinner or open the windows after a stuffy winter, cleansing ritual sweeps out stale emotional residue, dissolves lingering conflict fumes, and resets your sanctuary to a clean baseline.",
      "Traditional craft recognizes three distinct operations: Banishing (actively driving out hostile presence), Cleansing (sweeping away accumulated stagnation), and Consecration (dedicating space to purposeful work). Below is Witchr's curated correspondence codex for cleansing and space purification.",
    ],
    philosophy: {
      heading: "The Witchr Perspective on Cleansing",
      quote:
        "You do not cleanse out of terror of dark shadows; you cleanse because you deserve to live and think in clean, unpolluted air.",
      context:
        "Spiritual hygiene begins with physical cleanliness. Washing your floors with salt water, opening windows to circulate fresh air, and taking a hot bath do more to shift mental stagnation than waving expensive smoke in a messy room. Pair ritual cleansing with physical renewal.",
    },
    herbs: [
      {
        name: "Rosemary",
        slug: "rosemary",
        url: "/herbs/rosemary",
        categoryLabel: "Herb / Botanical",
        role: "Universal Solar Purifier & Mental Clarifier",
        howToUse:
          "Burn dried needles on charcoal or simmer in water for a citrusy, solar room wash that dissolves heavy melancholy.",
        sensoryAnchor: "Crisp, needle-fresh pine and resinous warmth",
        badge: "Premier Cleanser",
      },
      {
        name: "Garden Sage",
        slug: "sage",
        url: "/herbs/sage",
        categoryLabel: "Herb / Botanical",
        role: "Heavy Air Reset & Space Neutralizer",
        howToUse:
          "Burn ordinary culinary dried sage leaves in a heatproof ceramic dish to clear residual hostility after heated arguments.",
        sensoryAnchor: "Robust, herbaceous, lingering herbal smoke",
      },
      {
        name: "Lavender",
        slug: "lavender",
        url: "/herbs/lavender",
        categoryLabel: "Herb / Botanical",
        role: "Tranquil Purification & Agitation Washing",
        howToUse:
          "Add to floor wash buckets or sprinkle in bathwater to gently cleanse away irritability and prepare spaces for restorative sleep.",
        sensoryAnchor: "Calming sweet floral aroma with cooling undertones",
      },
      {
        name: "Peppermint & Spearmint",
        slug: "mint",
        url: "/herbs/mint",
        categoryLabel: "Herb / Botanical",
        role: "Invigorating Stagnancy & Refreshing Air",
        howToUse:
          "Steep leaves in vinegar for a surface spray that energizes sluggish rooms and clears executive brain fog.",
        sensoryAnchor: "Crisp, icy menthol burst",
      },
      {
        name: "Bay Leaf",
        slug: "bay-leaf",
        url: "/herbs/bay-leaf",
        categoryLabel: "Herb / Botanical",
        role: "Smoke Fumigation & Banishing Lingering Grief",
        howToUse:
          "Burn single dried leaves over a candle flame to dispel lingering heaviness and invite clear mental focus.",
        sensoryAnchor: "Woody, aromatic herbal tea smoke",
      },
      {
        name: "Thyme",
        slug: "thyme",
        url: "/herbs/thyme",
        categoryLabel: "Herb / Botanical",
        role: "Releasing Sorrow & Clearing Stale Melancholy",
        howToUse:
          "Infuse into warm water to scrub doors and windowsills after grief, illness, or prolonged depressive periods.",
        sensoryAnchor: "Warm, medicinal, grounding herbal scent",
      },
      {
        name: "Chamomile",
        slug: "chamomile",
        url: "/herbs/chamomile",
        categoryLabel: "Herb / Botanical",
        role: "Gentle Pacification & Softening Static",
        howToUse:
          "Use as an altar wash or rinse water to soothe hyper-reactive household tension without jarring energy shifts.",
        sensoryAnchor: "Mild, honeyed apple floral warmth",
      },
    ],
    candles: [
      {
        name: "White Candle",
        slug: "white",
        url: "/candles/white",
        categoryLabel: "Candle / Wax",
        role: "The Pristine Slate & Space Illumination",
        howToUse:
          "Light immediately following a room cleanse to bless the cleared territory with calm, neutral light.",
        sensoryAnchor: "Radiant, pristine flame dispelling shadows",
        badge: "Clean Slate",
      },
      {
        name: "Black Candle",
        slug: "black",
        url: "/candles/black",
        categoryLabel: "Candle / Wax",
        role: "Absorbing Lingering Discord Before Cleansing",
        howToUse:
          "Burn briefly prior to a white candle cleansing to draw out heavy emotional residue and ground discord into ash.",
        sensoryAnchor: "Deep opaque black wax drawing in tension",
      },
    ],
    ingredients: [
      {
        name: "Coarse Sea Salt",
        slug: "salt",
        url: "/ingredients/salt",
        categoryLabel: "Ritual Mineral",
        role: "Mineral Static Absorption & Wash Water Base",
        howToUse:
          "Dissolve 2 tablespoons into a bucket of warm water with vinegar for traditional floor and threshold washing.",
        sensoryAnchor: "Crystalline sodium chloride mineral grains",
        badge: "Essential",
      },
    ],
    symbols: [
      {
        name: "The Clean Cut Sigil",
        slug: "release",
        url: "/sigils#release",
        categoryLabel: "Visual Sigil",
        role: "Releasing Dead Weight & Clean Finality",
        howToUse:
          "Draw onto paper during deep space cleanings and burn: 'I put down what is already dead and reclaim my hands for the living.'",
        sensoryAnchor: "Sharp directional chevron slash",
        badge: "Severance",
      },
      {
        name: "The Deep Stillness Sigil",
        slug: "calm",
        url: "/sigils#calm",
        categoryLabel: "Visual Sigil",
        role: "Restoring Centered Equilibrium",
        howToUse:
          "Trace with fingertips after a thorough room cleanse to settle scattered, overstimulated thoughts.",
        sensoryAnchor: "Balanced horizontal serene lines",
      },
      {
        name: "The Open Gate Sigil",
        slug: "new-beginnings",
        url: "/sigils#new-beginnings",
        categoryLabel: "Visual Sigil",
        role: "Consecrating Fresh Ground",
        howToUse:
          "Hang near your front entrance after a cleanse: 'The past chapter is sealed; I enter the new territory with clean hands.'",
        sensoryAnchor: "Concentric welcoming portal geometry",
      },
    ],
    rituals: [
      {
        name: "New Beginning: The Clean Slate",
        slug: "new-beginning",
        url: "/rituals/new-beginning",
        categoryLabel: "Ritual Working",
        role: "Ceremonial Threshold Reset",
        howToUse:
          "A multi-sensory working for moving homes, starting new jobs, or clearing out the emotional clutter of an expired relationship.",
        sensoryAnchor: "White candle, salt, and fresh threshold swept clean",
      },
      {
        name: "Get Your Shit Together",
        slug: "get-your-shit-together",
        url: "/rituals/get-your-shit-together",
        categoryLabel: "Ritual Working",
        role: "Shattering Brain Fog & Inertia",
        howToUse:
          "A practical somatic practice pairing intense physical decluttering with a sharp sensory reset to break executive paralysis.",
        sensoryAnchor: "Cold water, decluttered surface, focused flame",
      },
      {
        name: "Leave Me Alone: Boundary Protection",
        slug: "leave-me-alone-protection",
        url: "/rituals/leave-me-alone-protection",
        categoryLabel: "Ritual Working",
        role: "Sealing Cleansed Space Against Re-Contamination",
        howToUse:
          "Once a room is cleansed, establish a firm salt boundary so external chaos does not immediately re-enter.",
        sensoryAnchor: "Protective salt perimeter and firm verbal boundary",
      },
    ],
    tools: [
      {
        name: "Letting Go Problem Hub",
        slug: "letting-go",
        url: "/letting-go",
        categoryLabel: "Diagnostic Portal",
        role: "Emotional Closure & Severance",
        howToUse:
          "Explore grounded practices for unilateral closure, severing dead friendships, and clearing mental clutter.",
        sensoryAnchor: "Curated letting-go diagnostic portal",
      },
      {
        name: "Tarot Spread: What Needs My Attention?",
        slug: "what-needs-my-attention",
        url: "/tarot/what-needs-my-attention",
        categoryLabel: "Tarot Spread",
        role: "Diagnosing Hidden Stagnancy",
        howToUse:
          "A 4-card spread identifying where hidden energetic or psychological friction is lingering beneath the surface.",
        sensoryAnchor: "Targeted card layout for diagnostic clarity",
      },
      {
        name: "Spell Finder",
        slug: "spell-finder",
        url: "/spell-finder",
        categoryLabel: "Interactive Tool",
        role: "Custom Practice Selector",
        howToUse:
          "Find targeted cleansing rituals matching the exact time and physical resources you have available right now.",
        sensoryAnchor: "Quick ritual selector tree",
      },
    ],
    combiningFramework: {
      title: "The Four-Step Space Reset Protocol",
      intro:
        "True space cleansing follows a logical physical sequence: physical removal, wet mineral wash, botanical smoke, and illuminating blessing.",
      steps: [
        {
          step: 1,
          phase: "Physical Debris & Air Circulation",
          elements: "Open Windows + Trash Bag",
          instruction:
            "Throw open as many windows as weather allows. Pick up physical trash, dirty laundry, and clutter. Stagnant energy clings directly to physical disorganization.",
        },
        {
          step: 2,
          phase: "Wet Mineral Wash (Earth & Water)",
          elements: "Warm Water + Coarse Salt + Splash of Vinegar",
          instruction:
            "Wipe down your front door, entryway, and doorknobs with salt water. In folk magic, door thresholds hold the emotional imprint of everyone who crosses them.",
        },
        {
          step: 3,
          phase: "Aromatic Dispersion (Air)",
          elements: "Dried Rosemary, Sage, or Mint",
          instruction:
            "Burn a dried sprig of rosemary or culinary sage in a ceramic bowl. Walk it slowly through the room, allowing the clean botanical smoke to dissolve heavy emotional smoke.",
        },
        {
          step: 4,
          phase: "Illuminating Dedication (Fire & Spirit)",
          elements: "White Candle",
          instruction:
            "Place a white candle in the center of the clean room. Light it with a steady hand and state: 'This space is cleansed, open, and dedicated to peaceful living.' Let it burn for twenty minutes.",
        },
      ],
    },
    pitfalls: [
      {
        title: "Smudging Over Filth",
        explanation:
          "Waving white sage over piles of unwashed laundry, dirty dishes, and months of accumulated dust is occult escapism. Physical dust generates psychological friction.",
        betterWay:
          "Clean the room physically first. Vacuum the rug, wash the sheets, and take out the trash before lighting a single botanical herb.",
      },
      {
        title: "Over-Cleansing and Creating an Energetic Vacuum",
        explanation:
          "Constantly banishing and cleansing out of anxiety strips a home of warmth, leaving it sterile, cold, and emotionally hollow.",
        betterWay:
          "Once you cleanse, always follow up with blessing or inviting what you actually want: warm food, laughter, music, or a lit white candle.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between banishing and cleansing?",
        answer:
          "Banishing is an assertive, forceful eviction of an actively hostile or invasive presence (like cutting cords with an abusive person). Cleansing is gentle hygiene—sweeping away accumulated dust, stale tension, and everyday fatigue.",
      },
      {
        question: "Can I cleanse a space without using smoke?",
        answer:
          "Absolutely. If you have asthma, pets, or sensitive smoke detectors, use sound (clapping hands or bells), a spray bottle of salt water with essential oils, or simply open all windows while washing surfaces with salt and vinegar.",
      },
      {
        question: "Is white sage required for space cleansing?",
        answer:
          "No. Common culinary garden sage (Salvia officinalis), garden rosemary, thyme, lavender, and pine are culturally accessible, sustainable, and historically grounded in European and domestic folk practices.",
      },
    ],
    relatedIntents: [
      {
        slug: "protection",
        name: "Protection Correspondences",
        url: "/correspondences/protection",
        description:
          "Once your space is cleansed and peaceful, establish firm boundaries to prevent toxic drama from entering again.",
      },
      {
        slug: "love",
        name: "Love & Sovereignty Correspondences",
        url: "/correspondences/love",
        description:
          "Fill your freshly purified environment with warm attraction, honest affection, and restorative self-worth.",
      },
    ],
  },
};

export function getIntentCorrespondence(
  slug: string
): IntentCorrespondenceData | undefined {
  return INTENT_CORRESPONDENCES[slug];
}

export function getAllIntentCorrespondences(): IntentCorrespondenceData[] {
  return Object.values(INTENT_CORRESPONDENCES);
}
