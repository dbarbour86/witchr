import { GrimoireSection } from "./types";

export const GRIMOIRE_SECTIONS: GrimoireSection[] = [
  {
    id: "candle-colors",
    title: "Candle Colors & Symbolic Associations",
    subtitle: "A practical color reference for intention anchoring.",
    description:
      "Color psychology and traditional occult folklore have long paired specific spectrums of light with psychological states. Use these as traditional reference points rather than rigid supernatural laws.",
    items: [
      {
        name: "White",
        traditionalAssociation: "Cleansing, clarity, fresh beginnings, and general-purpose ritual work.",
        modernContext: "The clean slate. Excellent for threshold ceremonies, new leases, and clearing mental static.",
        hex: "#f4f1ea",
        notes: "When in doubt or lacking specific colors, a white candle serves as the universal baseline.",
      },
      {
        name: "Black",
        traditionalAssociation: "Protection, banishing, boundaries, severance, and finality.",
        modernContext: "Drawing a hard perimeter. Useful for cord-cutting, breaking habits, and rejecting emotional leeches.",
        hex: "#181818",
        notes: "Black does not mean evil; it represents the rich fertile dark, absorption of negativity, and clean boundaries.",
      },
      {
        name: "Green",
        traditionalAssociation: "Money, material growth, physical vitality, and tangible opportunity.",
        modernContext: "Anchoring financial focus, budgeting discipline, and honoring physical bodily health.",
        hex: "#2d5a37",
        notes: "Traditionally tied to the green earth, agriculture, and practical trade.",
      },
      {
        name: "Red",
        traditionalAssociation: "Passion, primal courage, vitality, strength, and raw physical drive.",
        modernContext: "Shattering fear before high-stakes rooms, rekindling sluggish stamina, and standing tall.",
        hex: "#9e2a2b",
        notes: "Fast-burning energy. Use when you need immediate propulsion rather than slow contemplation.",
      },
      {
        name: "Yellow / Gold",
        traditionalAssociation: "Intellect, confidence, mental focus, solar warmth, and communication.",
        modernContext: "Interview prep, studying, creative breakthroughs, and clearing brain fog.",
        hex: "#d4a359",
        notes: "Associated with the waking mind, conscious logic, and illumination.",
      },
      {
        name: "Blue",
        traditionalAssociation: "Calm, honest communication, emotional healing, and truth-telling.",
        modernContext: "Diffusing interpersonal conflict, soothing nervous exhaustion, and speaking truth without anger.",
        hex: "#2a4d69",
        notes: "Often associated with deep water, honest expression, and nocturnal peace.",
      },
      {
        name: "Purple",
        traditionalAssociation: "Sovereignty, deeper intuition, wisdom, and personal authority.",
        modernContext: "Reclaiming command over your own life trajectory and listening to your gut instincts.",
        hex: "#5c3d75",
        notes: "Historically associated with rare pigments and royal/sovereign self-direction.",
      },
    ],
  },
  {
    id: "common-herbs",
    title: "Common Kitchen Herbs & Botanical Anchors",
    subtitle: "Accessible pantry botanicals with centuries of culinary and ritual tradition.",
    description:
      "You do not need expensive, rare herbs from esoteric shops. Your spice cabinet holds ancient botanicals that have grounded human rituals for thousands of years. Never ingest unknown botanicals.",
    items: [
      {
        name: "Rosemary",
        traditionalAssociation: "Remembrance, clean boundaries, mental fidelity, and mental clarity.",
        modernContext: "The universal herb of focus and boundary work. Burning a sprig or steeping it in wash water sharpens presence.",
        badge: "Pantry Staple",
        notes: "Safe, abundant, and aromatically stimulating.",
      },
      {
        name: "Coarse Salt",
        traditionalAssociation: "Preservation, purification, sealing perimeters, and mineral grounding.",
        modernContext: "The oldest boundary element on earth. Used to delineate physical circles and mark 'nothing passes this line.'",
        badge: "Mineral Foundation",
        notes: "Not technically a botanical, but the bedrock of protective practice.",
      },
      {
        name: "Bay Laurel (Bay Leaves)",
        traditionalAssociation: "Victory, manifestation of goals, protection, and psychic focus.",
        modernContext: "Write a single word or figure on a dry leaf and safely burn it in a heatproof dish to anchor intent.",
        badge: "Intention Anchor",
        notes: "Crackles cleanly when lit; always use a ceramic or cast-iron vessel.",
      },
      {
        name: "Lavender",
        traditionalAssociation: "Peace, restful sleep, pacifying wrath, and emotional balance.",
        modernContext: "Clinically proven to down-regulate sympathetic nervous arousal. Excellent for sleep rituals and diffusing tension.",
        badge: "Calming",
        notes: "Use dry buds in sleep sachets or infused baths.",
      },
      {
        name: "Cinnamon",
        traditionalAssociation: "Speed, warmth, financial momentum, and invigorating passion.",
        modernContext: "Adds quickening heat to sluggish situations. Used in money candle dressings and home blessing sweeps.",
        badge: "Stimulating",
        notes: "Potent topical irritant—never apply concentrated cinnamon oil directly to bare skin.",
      },
      {
        name: "Garden Sage (Salvia officinalis)",
        traditionalAssociation: "Wisdom, longevity, household health, and clearing stale stagnation.",
        modernContext: "Common culinary sage cleans the air and brings domestic calm without cultural appropriation.",
        badge: "Domestic Clearing",
        notes: "Distinguish from wild White Sage (Salvia apiana), which faces over-harvesting and cultural sensitivity.",
      },
    ],
  },
  {
    id: "moon-phases",
    title: "The Lunar Rhythm as a Seasonal Clock",
    subtitle: "Using moon phases as a natural recurring calendar for personal check-ins.",
    description:
      "The moon does not dictate your destiny, but human beings thrive on recurring natural cycles. Treating lunar phases as a rhythmic checkpoint prevents months from slipping by in a blur.",
    items: [
      {
        name: "New Moon (Dark Sky)",
        traditionalAssociation: "The quiet void, germination in the soil, beginnings, and setting quiet intentions.",
        modernContext: "A monthly clean slate. Ideal for journal audits, defining a single 30-day goal, and resting.",
        badge: "Seed Phase",
      },
      {
        name: "Waxing Moon (Growing Light)",
        traditionalAssociation: "Building momentum, feeding projects, courage, and constructive labor.",
        modernContext: "The execution sprint. Putting in the daily reps, submitting applications, and building stamina.",
        badge: "Action Phase",
      },
      {
        name: "Full Moon (Peak Illumination)",
        traditionalAssociation: "Culmination, revelation, emotional visibility, and celebrating harvest.",
        modernContext: "Evaluating what has borne fruit and what has failed. Checking the perimeter of your relationships.",
        badge: "Illumination Phase",
      },
      {
        name: "Waning Moon (Diminishing Light)",
        traditionalAssociation: "Severance, banishing, decluttering, composting, and emotional release.",
        modernContext: "Canceling unused subscriptions, ending expired ties, cleaning closets, and stepping back.",
        badge: "Release Phase",
      },
    ],
  },
  {
    id: "intention-crafting",
    title: "How to Write an Intention That Actually Works",
    subtitle: "Ditching passive wishing for sovereign command.",
    description:
      "Most people write intentions like wishing upon a star: 'I hope the universe brings me peace.' This makes you a passive observer of your own life. Witchr intentions are active contracts with your own nervous system.",
    items: [
      {
        name: "Rule 1: Present Tense Only",
        traditionalAssociation: "Spoken as reality now.",
        modernContext: "Do not write 'I will be confident.' Write 'I hold my ground.' The unconscious mind acts on current identity declarations, not future promises.",
      },
      {
        name: "Rule 2: Focus on Sovereign Radius",
        traditionalAssociation: "Magic only operates where your spirit has dominion.",
        modernContext: "You cannot write 'He realizes my worth.' You can write 'I refuse to stay where my worth is questioned.' Control your own feet.",
      },
      {
        name: "Rule 3: Eliminate Hedging & Apology",
        traditionalAssociation: "Clean, unambiguous wordcraft.",
        modernContext: "Strip away 'maybe', 'hopefully', and 'if it's not too much trouble.' State your boundary with bone-deep economy.",
      },
    ],
  },
  {
    id: "ritual-structure",
    title: "The Anatomy of a Grounded Modern Ritual",
    subtitle: "The four components that turn simple actions into psychological anchors.",
    description:
      "A ritual is not theatre; it is an intentional neural reset. Every effective ritual shares four structural pillars.",
    items: [
      {
        name: "1. The Threshold",
        traditionalAssociation: "Crossing from mundane into sacred space.",
        modernContext: "A physical boundary cue: turning off your phone, washing your wrists with cold water, or lighting a match.",
      },
      {
        name: "2. The Symbolic Act",
        traditionalAssociation: "Sympathetic magic and physical embodiment.",
        modernContext: "Tearing paper, cutting string, carving a number, or pouring salt. Physical action bypasses intellectual overthinking.",
      },
      {
        name: "3. The Vocal Seal",
        traditionalAssociation: "Incantation and spoken decree.",
        modernContext: "Speaking your conclusion out loud into the room. Hearing your own voice solidifies psychological resolve.",
      },
      {
        name: "4. The Real-World Action",
        traditionalAssociation: "Grounding the magic in earthly soil.",
        modernContext: "The Witchr signature: immediately doing something tangible in the physical world before momentum fades.",
      },
    ],
  },
];
