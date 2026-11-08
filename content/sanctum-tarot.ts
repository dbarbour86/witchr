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
  suit?: "wands" | "cups" | "swords" | "pentacles";
  arcana?: "major" | "minor";
  image: {
    src?: string;
    alt: string;
    motif:
    | "fool"
    | "magician"
    | "high-priestess"
    | "empress"
    | "emperor"
    | "hierophant"
    | "lovers"
    | "chariot"
    | "strength"
    | "hermit"
    | "wheel-of-fortune"
    | "justice"
    | "hanged-man"
    | "death"
    | "temperance"
    | "devil"
    | "tower"
    | "star"
    | "moon"
    | "sun"
    | "judgement"
    | "world"
    | "wands-ace"
    | "wands-two"
    | "wands-three"
    | "wands-four"
    | "wands-five"
    | "wands-six"
    | "wands-seven"
    | "wands-eight"
    | "wands-nine"
    | "wands-ten"
    | "wands-page"
    | "wands-knight"
    | "wands-queen"
    | "wands-king"
    | "cups-ace"
    | "cups-two"
    | "cups-three"
    | "cups-four"
    | "cups-five"
    | "cups-six"
    | "cups-seven"
    | "cups-eight"
    | "cups-nine"
    | "cups-ten"
    | "cups-page"
    | "cups-knight"
    | "cups-queen"
    | "cups-king"
    | "swords-ace"
    | "swords-two"
    | "swords-three"
    | "swords-four"
    | "swords-five"
    | "swords-six"
    | "swords-seven"
    | "swords-eight"
    | "swords-nine"
    | "swords-ten"
    | "swords-page"
    | "swords-knight"
    | "swords-queen"
    | "swords-king"
    | "pentacles-ace"
    | "pentacles-two"
    | "pentacles-three"
    | "pentacles-four"
    | "pentacles-five"
    | "pentacles-six"
    | "pentacles-seven"
    | "pentacles-eight"
    | "pentacles-nine"
    | "pentacles-ten"
    | "pentacles-page"
    | "pentacles-knight"
    | "pentacles-queen"
    | "pentacles-king";
  };
}

/**
 * Complete Sanctum Major Arcana Deck (0–XXI, 22 canonical cards).
 * Canonical card artwork lives in /images/sanctum/tarot/
 * Original PNG files are preserved, and optimized WebP copies are served for production display.
 */
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
      src: "/images/sanctum/tarot/the-fool.webp",
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
      src: "/images/sanctum/tarot/the-magician.webp",
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
      src: "/images/sanctum/tarot/the-high-priestess.webp",
      alt: "The High Priestess — Occult ceremonial tarot motif of the veiled moon and instinct",
      motif: "high-priestess",
    },
  },
  {
    id: "card_03_empress",
    slug: "the-empress",
    number: 3,
    numeral: "III",
    name: "The Empress",
    shortKeywords: ["Generative Abundance", "Living Vitality", "Patient Nourishment"],
    traditionalThemes: [
      "Fertile conditions for organic creation",
      "Sensory presence and bodily attunement",
      "Allowing growth to ripen naturally",
      "Sovereign grace and generosity",
    ],
    reversedThemes: [
      "Creative depletion or over-giving",
      "Forcing unnatural haste on delicate work",
      "Neglecting physical and emotional sustenance",
    ],
    traditionalMeaning:
      "Crowned with twelve stars and seated among golden wheat and lush roses, The Empress embodies fertile, generative power. She governs the living world of sensory experience, creativity, and organic cycles—reminding us that nothing genuine is produced through force alone, but through patient tending of healthy ground.",
    reflectiveInterpretation:
      "The Empress invites you to assess what soil you are cultivating for your current endeavors. When we operate out of chronic scarcity or mechanical pressure, our creative and practical capacity contracts. This card reminds you that sustainable results require real nourishment: rest, sensory beauty, and the patience to allow roots to establish before demanding fruit.",
    reflectionPrompt:
      "Where have you been forcing mechanical haste on a process that requires natural gestation and steady nourishment?",
    practicalTakeaway:
      "Prepare a deliberate, unhurried meal or spend fifteen mindful minutes outside. Focus entirely on sensory replenishment without multitasking.",
    image: {
      src: "/images/sanctum/tarot/the-empress-of-stars-and-roses.webp",
      alt: "The Empress of Stars and Roses — Occult ceremonial tarot card of generative abundance and sovereign grace",
      motif: "empress",
    },
  },
  {
    id: "card_04_emperor",
    slug: "the-emperor",
    number: 4,
    numeral: "IV",
    name: "The Emperor",
    shortKeywords: ["Stable Architecture", "Sovereign Boundaries", "Constructive Order"],
    traditionalThemes: [
      "Foundational stability and clear governance",
      "Constructing durable protective frameworks",
      "Authoritative responsibility without cruelty",
      "Direct stewardship of chaotic environments",
    ],
    reversedThemes: [
      "Rigid authoritarian control masking anxiety",
      "Refusal to adapt failing systems",
      "Chaos born from absent leadership and porous boundaries",
    ],
    traditionalMeaning:
      "Seated upon a stone throne carved with ram heads, holding an orb and scepter, The Emperor represents structural authority, discipline, and constructive order. He provides the secure perimeter and solid foundations within which life and creative effort can endure.",
    reflectiveInterpretation:
      "The Emperor suggests that your circumstance calls for clear architecture, definitive boundaries, and sovereign self-discipline. When emotional turbulence or ambient ambiguity threatens to derail your progress, this card invites you to establish a firm perimeter. Durable freedom is not the absence of structure; it is built on deliberate, well-maintained scaffolding.",
    reflectionPrompt:
      "What boundary or daily standard have you left undefined, allowing distraction or unnecessary friction to breach your focus?",
    practicalTakeaway:
      "Define one non-negotiable boundary today: formalize a firm schedule block, decline a boundary-pushing request, or organize an operational system that has lapsed into disarray.",
    image: {
      src: "/images/sanctum/tarot/celestial-emperor.webp",
      alt: "Celestial Emperor — Occult ceremonial tarot card of sovereign boundaries, stone throne, and foundational authority",
      motif: "emperor",
    },
  },
  {
    id: "card_05_hierophant",
    slug: "the-hierophant",
    number: 5,
    numeral: "V",
    name: "The Hierophant",
    shortKeywords: ["Sacred Tradition", "Lineage Counsel", "Established Frameworks"],
    traditionalThemes: [
      "Inherited wisdom and spiritual lineage",
      "Mentorship and structured study",
      "Aligning with time-tested principles",
      "The bridge between esoteric mystery and ethical practice",
    ],
    reversedThemes: [
      "Dogmatism or unthinking orthodoxy",
      "Blind obedience to corrupt authority",
      "Rebelling for the sake of disruption without purpose",
    ],
    traditionalMeaning:
      "Seated between sacred pillars and holding the triple cross, The Hierophant raises his right hand in blessing. He represents the initiatory lineage, structured knowledge, and time-tested ethical traditions that ground fleeting individual insight into enduring communal practice.",
    reflectiveInterpretation:
      "The Hierophant invites you to consider what time-tested principles, mentors, or foundational frameworks are available to counsel you. You do not need to reinvent the wheel in isolation. When confronting unfamiliar ethical or structural decisions, looking to established tradition or consulting experienced guidance can provide the anchor required to navigate complexity without losing your footing.",
    reflectionPrompt:
      "What trusted framework, mentor, or ancestral principle could guide your current decision if you put aside the impulse to struggle alone?",
    practicalTakeaway:
      "Consult one credible source of established knowledge today—revisit a trusted mentor's advice, review foundational guidelines, or formalize an ethical standard for your current project.",
    image: {
      src: "/images/sanctum/tarot/the-hierophant.webp",
      alt: "The Hierophant — Occult ceremonial tarot card of sacred lineage, time-tested wisdom, and spiritual counsel",
      motif: "hierophant",
    },
  },
  {
    id: "card_06_lovers",
    slug: "the-lovers",
    number: 6,
    numeral: "VI",
    name: "The Lovers",
    shortKeywords: ["Conscious Alignment", "Sacred Choice", "Reciprocal Resonance"],
    traditionalThemes: [
      "The crossroads of moral and personal choice",
      "Deep mutual recognition and resonance",
      "Harmonizing disparate desires with core values",
      "Wholehearted commitment without reservation",
    ],
    reversedThemes: [
      "Internal division or moral ambivalence",
      "Compromising fundamental integrity for fleeting approval",
      "Relational projection obscuring self-honesty",
    ],
    traditionalMeaning:
      "Standing under the outstretched wings of an angel beneath the radiant sun, two souls unite at the sacred crossroads. The Lovers represents more than romantic union; it is the archetype of conscious choice—the moment where values, desires, and identity must align to forge a committed path forward.",
    reflectiveInterpretation:
      "The Lovers points toward a critical crossroads where fence-sitting has become corrosive. This card asks you to examine what your true allegiance is. When we attempt to appease contradictory desires or keep incompatible options open simultaneously, we fracture our power. Alignment requires an honest, wholehearted choice that reflects your deepest values.",
    reflectionPrompt:
      "What decision are you attempting to straddle, and which path genuinely mirrors your authentic integrity?",
    practicalTakeaway:
      "Write down the two conflicting priorities or impulses competing for your energy. Explicitly choose one to honor today with 100% commitment, and set the other aside without apology.",
    image: {
      src: "/images/sanctum/tarot/the-lovers.webp",
      alt: "The Lovers — Occult ceremonial tarot card of sacred alignment, mutual resonance, and conscious choice",
      motif: "lovers",
    },
  },
  {
    id: "card_07_chariot",
    slug: "the-chariot",
    number: 7,
    numeral: "VII",
    name: "The Chariot",
    shortKeywords: ["Triumphant Focus", "Harnessed Momentum", "Unwavering Will"],
    traditionalThemes: [
      "Steering divergent forces toward a single objective",
      "Overcoming external resistance through inner resolve",
      "Disciplined momentum through chaotic terrain",
      "Mastery of opposing impulses",
    ],
    reversedThemes: [
      "Loss of control or recklessness under pressure",
      "Aggression compensating for lack of direction",
      "Feeling dragged by conflicting obligations",
    ],
    traditionalMeaning:
      "Armored with starry epaulets and standing firm in a stone chariot pulled by black and white sphinxes, the charioteer holds no physical reins—steering purely through concentration of will. The Chariot represents victorious momentum achieved through the deliberate harmonization of opposing drives.",
    reflectiveInterpretation:
      "The Chariot indicates that you are in a phase requiring resolute focus and unwavering forward momentum. Contradictory pressures or competing demands may be pulling in opposite directions, but you cannot afford to hesitate. By harnessing both shadow and light, doubt and conviction, toward your primary aim, you turn friction into propulsion.",
    reflectionPrompt:
      "What divergent distraction is threatening to pull your chariot off course, and what single objective deserves your undiverted momentum?",
    practicalTakeaway:
      "Identify your single most consequential priority for the next 48 hours. Channel all available drive into advancing it, ruthlessly ignoring secondary detours.",
    image: {
      src: "/images/sanctum/tarot/the-chariot.webp",
      alt: "The Chariot — Occult ceremonial tarot card of harnessed momentum, triumph, and unwavering focus",
      motif: "chariot",
    },
  },
  {
    id: "card_08_strength",
    slug: "strength",
    number: 8,
    numeral: "VIII",
    name: "Strength",
    shortKeywords: ["Gentle Mastery", "Internal Fortitude", "Compassionate Resolve"],
    traditionalThemes: [
      "Subduing raw volatility through quiet presence",
      "Courage under enduring adversity",
      "Befriending visceral instincts rather than repressing them",
      "Patience that outlasts brute aggression",
    ],
    reversedThemes: [
      "Self-doubt or collapsing under sustained strain",
      "Lashing out with reactive fury",
      "Repressing raw emotions until they erupt destructively",
    ],
    traditionalMeaning:
      "A serene figure with the infinity lemniscate above her brow gently calms a roaring lion with steady, tender hands. Strength represents true spiritual fortitude: the quiet, indestructible power of composure that tames primordial impulse not with iron bars, but with compassion and unflinching courage.",
    reflectiveInterpretation:
      "Strength reminds you that raw force and loud reactivity are signs of underlying panic, not authority. When confronting intimidating obstacles or fierce internal doubts, your most potent weapon is gentle, unwavering composure. You do not need to wage war against your anxieties or external hostility; hold your center with patient dignity.",
    reflectionPrompt:
      "Where are you expending frantic energy trying to force an outcome, when calm, patient endurance would disarm the tension completely?",
    practicalTakeaway:
      "When provoked or stressed today, pause for three deliberate breaths before responding. Speak in a quiet, measured cadence, meeting friction with steady grace.",
    image: {
      src: "/images/sanctum/tarot/strength.webp",
      alt: "Strength — Occult ceremonial tarot card of gentle fortitude, the lion, and eternal grace",
      motif: "strength",
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
      src: "/images/sanctum/tarot/the-hermit.webp",
      alt: "The Hermit — Occult ceremonial tarot motif of the solitary beacon and mountain lantern",
      motif: "hermit",
    },
  },
  {
    id: "card_10_wheel_of_fortune",
    slug: "wheel-of-fortune",
    number: 10,
    numeral: "X",
    name: "Wheel of Fortune",
    shortKeywords: ["Inevitable Cycles", "Pivotal Shift", "Cosmic Rhythm"],
    traditionalThemes: [
      "The cyclical turning of fortune and circumstances",
      "Adapting to unforeseen opportunities or turns",
      "Recognizing the impermanence of highs and lows",
      "Remaining anchored at the hub while the rim turns",
    ],
    reversedThemes: [
      "Resisting necessary structural change",
      "Blaming external luck rather than personal agency",
      "Clinging to a passing phase",
    ],
    traditionalMeaning:
      "Encircled by winged creatures of the four elements and inscribed with the alchemical and esoteric letters of destiny, the Wheel turns unceasingly. The Wheel of Fortune represents the eternal law of change—the reality that life moves in arcs and seasons, requiring grace at the heights and fortitude in the trough.",
    reflectiveInterpretation:
      "The Wheel of Fortune reminds you that what is currently static will not remain so, and what is currently turbulent will find its resolution. When life accelerates unexpectedly, attempting to freeze the wheel only causes vertigo. This card invites you to find the calm, immovable center at the axle, observing the turning world without panicking or becoming arrogant.",
    reflectionPrompt:
      "What transition are you resisting because you are treating a temporary season as though it were permanent?",
    practicalTakeaway:
      "Identify one circumstance you cannot directly control today. Consciously release your resistance to it, redirecting your focus to how you will respond with poise.",
    image: {
      src: "/images/sanctum/tarot/wheel-of-fortune.webp",
      alt: "Wheel of Fortune — Occult ceremonial tarot card of cosmic cycles, destiny, and the revolving wheel",
      motif: "wheel-of-fortune",
    },
  },
  {
    id: "card_11_justice",
    slug: "justice",
    number: 11,
    numeral: "XI",
    name: "Justice",
    shortKeywords: ["Radical Truth", "Cause and Effect", "Impartial Balance"],
    traditionalThemes: [
      "Objective assessment without emotional bias",
      "Accountability for past actions and commitments",
      "The double-edged sword of unvarnished truth",
      "Restoring moral and energetic equilibrium",
    ],
    reversedThemes: [
      "Rationalizing unfair behavior or bias",
      "Avoiding accountability for consequences",
      "Harsh self-condemnation masquerading as fairness",
    ],
    traditionalMeaning:
      "Seated between stone pillars with scales held aloft in one hand and an upright double-edged sword in the other, Justice looks outward with unblinking clarity. She represents karma, absolute truth, and the equilibrium of cause and effect—assessing reality without favoritism or self-pity.",
    reflectiveInterpretation:
      "Justice asks for rigorous, unvarnished honesty with yourself. Where have you been making excuses, tolerating subtle hypocrisy, or demanding fairness from others that you do not extend in return? The scales require balance, not rationalization. When you align your actions with truth, you no longer have to carry the exhausting weight of maintaining illusions.",
    reflectionPrompt:
      "What uncomfortable fact about your current situation are you avoiding acknowledging openly and honestly?",
    practicalTakeaway:
      "Make one overdue correction or settlement today: fulfill a delayed promise, rectify a mistake, or speak a direct truth without diplomatic dilution.",
    image: {
      src: "/images/sanctum/tarot/justice.webp",
      alt: "Justice — Occult ceremonial tarot card of the balanced scales and the upright sword of truth",
      motif: "justice",
    },
  },
  {
    id: "card_12_hanged_man",
    slug: "the-hanged-man",
    number: 12,
    numeral: "XII",
    name: "The Hanged Man",
    shortKeywords: ["Voluntary Suspension", "Inverted Perspective", "Sacred Pause"],
    traditionalThemes: [
      "Surrendering control to gain deeper perception",
      "Willing pause during necessary gestation",
      "Seeing the world upside down from standard consensus",
      "Enlightenment achieved through non-action",
    ],
    reversedThemes: [
      "Struggling futilely against unavoidable delay",
      "Martyrdom complex or needless self-sacrifice",
      "Stagnation born of indecision rather than contemplation",
    ],
    traditionalMeaning:
      "Suspended by one foot from the living Tau tree with arms crossed behind him, the Hanged Man bears a glowing nimbus of calm realization around his head. His face is serene, not tormented. He represents the paradox of victory through surrender—the profound illumination that comes only when we cease forcing our agenda.",
    reflectiveInterpretation:
      "The Hanged Man signals that current progress cannot be forced through hustle or aggressive motion. You are in a liminal suspension where action would only knot the threads tighter. This card invites you to flip your perspective: view the impasse not as a defeat, but as a deliberate incubation period. When you stop fighting the suspension, the underlying wisdom becomes obvious.",
    reflectionPrompt:
      "Where are you expending fruitless energy trying to push open a door that requires you to step back and wait?",
    practicalTakeaway:
      "Deliberately halt action on one stuck project for 24 hours. Refuse to fret or force a breakthrough; let the matter rest completely.",
    image: {
      src: "/images/sanctum/tarot/the-hanged-man.webp",
      alt: "The Hanged Man — Occult ceremonial tarot card of voluntary suspension, inverted perspective, and haloed surrender",
      motif: "hanged-man",
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
      src: "/images/sanctum/tarot/death.webp",
      alt: "Death — Occult ceremonial tarot card of the sickle, severance, and cycle renewal",
      motif: "death",
    },
  },
  {
    id: "card_14_temperance",
    slug: "temperance",
    number: 14,
    numeral: "XIV",
    name: "Temperance",
    shortKeywords: ["Measured Synthesis", "Alchemical Balance", "Patient Blending"],
    traditionalThemes: [
      "The blending of opposing forces",
      "Calibrated patience and moderation",
      "Inner alchemy through gradual adjustment",
      "Finding equilibrium under dynamic tension",
    ],
    reversedThemes: [
      "Impulsive extremes or all-or-nothing thinking",
      "Forcing premature synthesis",
      "Volatile reactions disrupting steady momentum",
    ],
    traditionalMeaning:
      "An angel with radiant wings stands with one foot on terra firma and one in living water, pouring liquid steadily between two chalices without spilling a drop. Temperance represents the sacred art of continuous, conscious calibration—the patient alchemy that transforms disparate elements into a harmonious whole.",
    reflectiveInterpretation:
      "Temperance invites you to step back from all-or-nothing ultimatums and consider where steady, gradual adjustment will yield more durable power than a violent swing of the pendulum. When we feel pressured to solve a complex dilemma through sudden rupture, this card reminds us that the highest mastery is often the quiet refusal to rush the distillation. Balance is not a frozen posture, but an active practice of continuous micro-corrections.",
    reflectionPrompt:
      "Where in your life are you treating a delicate process of calibration as if it were an emergency that demands an extreme reaction?",
    practicalTakeaway:
      "Identify one situation where you are swinging between extremes. Rather than forcing a drastic resolution today, make one small, steady adjustment that restores breathing room.",
    image: {
      src: "/images/sanctum/tarot/temperance.webp",
      alt: "Temperance — Occult ceremonial tarot card of alchemy, balance, and measured integration",
      motif: "temperance",
    },
  },
  {
    id: "card_15_devil",
    slug: "the-devil",
    number: 15,
    numeral: "XV",
    name: "The Devil",
    shortKeywords: ["Unconscious Bondage", "Shadow Entanglement", "Loose Chains"],
    traditionalThemes: [
      "Illuminating hidden addictions or unhealthy attachments",
      "Giving power away to material desires or fear",
      "Recognizing that chains are self-imposed and removable",
      "Confronting taboo impulses with rigorous honesty",
    ],
    reversedThemes: [
      "Breaking free from toxic dependency",
      "Reclaiming sovereignty from manipulation",
      "Denial of shadow dynamics leading to sudden downfall",
    ],
    traditionalMeaning:
      "Perched on an altar, a horned figure holds a torch over two chained souls whose loose collars can be slipped off at any moment. The Devil represents bondage to illusion, material compulsion, and shadow patterns—the subtle ways we convince ourselves we have no choice when we are in fact holding our own leash.",
    reflectiveInterpretation:
      "The Devil calls attention to where you are playing the victim to your own habits, attachments, or anxieties. Whether it is digital distraction, a codependent dynamic, or an unexamined compulsive behavior, this card reveals the trap for what it is. Crucially, the chains around your neck are loose: liberation begins the instant you stop pretending you are powerless to step away.",
    reflectionPrompt:
      "What habit, comfort, or relationship are you telling yourself you 'cannot leave', when you are actually choosing the familiar prison?",
    practicalTakeaway:
      "Interrupt one compulsive loop today: log off a draining app for 12 hours, walk away from an unproductive argument, or decline an indulgence you use to numb stress.",
    image: {
      src: "/images/sanctum/tarot/devil.webp",
      alt: "The Devil — Occult ceremonial tarot card of shadow entanglement, loose chains, and the torch of illusion",
      motif: "devil",
    },
  },
  {
    id: "card_16_tower",
    slug: "the-tower",
    number: 16,
    numeral: "XVI",
    name: "The Tower",
    shortKeywords: ["Sudden Revelation", "Shattered Illusions", "Liberating Rupture"],
    traditionalThemes: [
      "Lightning striking false foundations",
      "Abrupt dismantling of obsolete structures",
      "Shock that liberates trapped vitality",
      "The painful but necessary arrival of reality",
    ],
    reversedThemes: [
      "Desperately propping up a doomed facade",
      "Fear of disaster keeping you frozen",
      "Rebuilding the exact same mistake after collapse",
    ],
    traditionalMeaning:
      "Lightning strikes the golden crown atop a stone tower built upon a precipice, shattering the battlements as figures tumble into the sea. The Tower represents sudden, unavoidable truth that breaks through defensive delusions—the radical demolition of whatever was built on compromised ground.",
    reflectiveInterpretation:
      "The Tower indicates that a structure, belief, or expectation in your life is fracturing. While sudden upheaval is jarring, the lightning strikes only what is false or artificially maintained. Do not waste your energy trying to plaster over the fissures; step clear of the debris. The collapse is not a punishment, but a radical clearing of the ground so you can finally build on solid rock.",
    reflectionPrompt:
      "What realization or sudden shift are you desperately resisting because it shatters your comfortable expectations?",
    practicalTakeaway:
      "If a plan has fallen apart or an illusion has shattered, do not scramble to fix it today. Sit with the empty space, take stock of what remains, and let the dust settle.",
    image: {
      src: "/images/sanctum/tarot/the-tower.webp",
      alt: "The Tower — Occult ceremonial tarot card of lightning revelation, shattered crowns, and liberating rupture",
      motif: "tower",
    },
  },
  {
    id: "card_17_star",
    slug: "the-star",
    number: 17,
    numeral: "XVII",
    name: "The Star",
    shortKeywords: ["Renewed Hope", "Quiet Inspiration", "Clear Waters"],
    traditionalThemes: [
      "Serene replenishment following the storm",
      "Unshakable faith in the underlying order",
      "Generous pouring into living waters and earth",
      "Pure, untroubled clarity of purpose",
    ],
    reversedThemes: [
      "Cynicism masking deep disappointment",
      "Disillusionment and loss of faith in tomorrow",
      "Refusing replenishment out of exhaustion",
    ],
    traditionalMeaning:
      "Beneath an eight-pointed radiant star and seven lesser stars, a maiden kneels beside living water, pouring from two urns onto land and pool alike. The Star represents pure, unadorned hope and renewal after catastrophe—the gentle celestial light that guides the traveler when the storm has passed.",
    reflectiveInterpretation:
      "The Star brings quiet replenishment after a season of strain or disillusionment. You do not need to fight or defend yourself right now; your sole task is to allow your reserves to refill. Trust that your vision is sound, even if the progress is gentle and subtle. When you reconnect with genuine hope, clarity returns without effort.",
    reflectionPrompt:
      "Where has protective cynicism closed you off from genuine hope, and what simple dream deserves your gentle faith again?",
    practicalTakeaway:
      "Engage in one act of pure replenishment today without an agenda: stargaze, listen to restorative music, or take a peaceful bath without looking at your watch.",
    image: {
      src: "/images/sanctum/tarot/the-star.webp",
      alt: "The Star — Occult ceremonial tarot card of luminous hope, celestial guidance, and restorative waters",
      motif: "star",
    },
  },
  {
    id: "card_18_moon",
    slug: "the-moon",
    number: 18,
    numeral: "XVIII",
    name: "The Moon",
    shortKeywords: ["Subconscious Currents", "Nocturnal Instinct", "Navigating Illusion"],
    traditionalThemes: [
      "Illuminating what hides beneath daylight logic",
      "Unconscious patterns and shadow dynamics",
      "The uncanny threshold between fear and intuition",
      "Walking by lunar reflection rather than solar clarity",
    ],
    reversedThemes: [
      "Paranoia masquerading as psychic discernment",
      "Spinning narratives from unverified anxiety",
      "Drowning in emotional fog or projection",
    ],
    traditionalMeaning:
      "Two hounds bay at the radiant nocturnal moon as a crayfish ascends from the primordial deep waters between two stone towers. The Moon represents the realm of the unconscious, memory, dream-states, and instinct—the shadowy terrain where things are rarely what they seem upon first glance, requiring deep discernment to separate genuine signal from emotional echo.",
    reflectiveInterpretation:
      "The Moon indicates that the landscape you are traversing is saturated with projection, distorted perception, or submerged anxieties. Daylight certainty is unavailable right now, and attempting to force neat rational explanations will only compound the confusion. This card invites you to slow your pace, observe the shadows without panicking, and distinguish between a visceral gut warning and a phantom bred from past scars.",
    reflectionPrompt:
      "What fear or assumption are you treating as an objective fact, when it may simply be an unverified shadow cast by past experience?",
    practicalTakeaway:
      "Do not make permanent commitments or confrontational declarations under emotional fog today. Write down your swirling assumptions, sleep on them, and review them in clear morning light.",
    image: {
      src: "/images/sanctum/tarot/the-moon.webp",
      alt: "The Moon — Occult ceremonial tarot card of nocturnal instinct, illusion, and subconscious currents",
      motif: "moon",
    },
  },
  {
    id: "card_19_sun",
    slug: "the-sun",
    number: 19,
    numeral: "XIX",
    name: "The Sun",
    shortKeywords: ["Radiant Vitality", "Unclouded Clarity", "Joyful Wholeness"],
    traditionalThemes: [
      "Abundant life force and triumphant success",
      "Complete transparency and unclouded vision",
      "Childlike freedom, enthusiasm, and innocence",
      "Warmth that dissolves lingering shadows",
    ],
    reversedThemes: [
      "Temporary clouds obscuring underlying joy",
      "Burnout from excessive daylight exertion",
      "Struggling to accept good fortune without suspicion",
    ],
    traditionalMeaning:
      "Beneath a benevolent, radiant solar face, a naked child crowned with flowers rides a gentle white horse before a wall of golden sunflowers. The Sun represents total illumination, unclouded optimism, and triumphant life force—the absolute celebration of existence unburdened by shadow or dread.",
    reflectiveInterpretation:
      "The Sun beams straightforward clarity into your path. Confusion, hesitation, and self-doubt evaporate under this archetype's warmth. It invites you to celebrate your progress, step boldly into the light, and allow yourself to experience uncomplicated satisfaction. You do not need to anticipate tragedy to be prudent; let success and warmth be real.",
    reflectionPrompt:
      "Where are you looking for hidden catches or expecting disaster, instead of simply enjoying the warmth of what has gone right?",
    practicalTakeaway:
      "Step directly into natural sunlight today for 10 minutes. Express genuine appreciation to someone who brings unclouded warmth into your life.",
    image: {
      src: "/images/sanctum/tarot/the-sun.webp",
      alt: "The Sun — Occult ceremonial tarot card of radiant vitality, sunflowers, and triumphant solar joy",
      motif: "sun",
    },
  },
  {
    id: "card_20_judgement",
    slug: "judgement",
    number: 20,
    numeral: "XX",
    name: "Judgement",
    shortKeywords: ["Awakening Call", "Karmic Reckoning", "Total Rebirth"],
    traditionalThemes: [
      "The clear call to step into a higher echelon of life",
      "Honest self-reckoning and definitive absolution",
      "Rising up from the tomb of obsolete identities",
      "The final synthesis of past experiences into wisdom",
    ],
    reversedThemes: [
      "Ignoring the call out of self-doubt or guilt",
      "Harsh recrimination instead of constructive reckoning",
      "Refusing to forgive past errors and move forward",
    ],
    traditionalMeaning:
      "An angel sounds the golden trumpet from the heavens as figures rise with open arms from their stone graves. Judgement represents the ultimate awakening—the reckoning where the past is reconciled, forgiven, and transcended, liberating the soul to inhabit its true calling.",
    reflectiveInterpretation:
      "Judgement signals that an old chapter has officially concluded its trial, and the trumpet is sounding for your next evolution. You are being called to step out of the narrow tomb of who you used to be. Forgive your previous stumbling; those choices were the scaffolding that brought you to this understanding. Answer the call with an open chest.",
    reflectionPrompt:
      "What old version of yourself or past mistake are you ready to grant final absolution, so you can answer your higher calling?",
    practicalTakeaway:
      "Write down the single deepest regret or outdated self-criticism you have been carrying. Safely burn or tear the paper, stating: 'The debt is settled; I rise.'",
    image: {
      src: "/images/sanctum/tarot/judgement.webp",
      alt: "Judgement — Occult ceremonial tarot card of the angelic trumpet, awakening, and resurrection",
      motif: "judgement",
    },
  },
  {
    id: "card_21_world",
    slug: "the-world",
    number: 21,
    numeral: "XXI",
    name: "The World",
    shortKeywords: ["Wholeness Achieved", "Cycle Completion", "Cosmic Integration"],
    traditionalThemes: [
      "The triumphant conclusion of the Hero's Journey",
      "Sovereign integration of all four elements",
      "Stepping into full mastery and belonging",
      "The harmonious threshold to the next great spiral",
    ],
    reversedThemes: [
      "Fumbling near the finish line out of fear of completion",
      "Incomplete closure leaving unresolved threads",
      "Struggling to integrate lessons into daily reality",
    ],
    traditionalMeaning:
      "Encircled by the green laurel wreath of victory and flanked by the four cosmic guardians, a dancer holds two wands of manifestation. The World represents the triumphant realization of wholeness—the harmonious culmination of a major life cycle and the serene mastery of experience.",
    reflectiveInterpretation:
      "The World marks the triumphant completion of a significant cycle. All the trials, detours, and initiations of your journey have converged into integrated wisdom. You are whole, capable, and ready to stand comfortably in your own authority. Honor the ground you have conquered before stepping into the next spiral of growth.",
    reflectionPrompt:
      "What major cycle in your life has reached authentic completion, and how can you honor the wisdom you earned through it?",
    practicalTakeaway:
      "Celebrate your growth. Acknowledge how far you have traveled from where you began this chapter, and formally close the loop on any remaining loose end.",
    image: {
      src: "/images/sanctum/tarot/the-world.webp",
      alt: "The World — Occult ceremonial tarot card of cosmic wholeness, laurel wreath, and triumphant integration",
      motif: "world",
    },
  },
  {
    id: "card_wands_ace",
    slug: "ace-of-wands",
    number: 1,
    numeral: "ACE",
    name: "Ace of Wands",
    suit: "wands",
    arcana: "minor",
    shortKeywords: ["Primal Spark", "Creative Catalyst", "Raw Vitality"],
    traditionalThemes: [
      "The primordial impulse of inspiration and direct will",
      "Sudden clarity or enthusiasm demanding purposeful expression",
      "Fertile creative breakthroughs and initiatory courage",
      "Channeling raw spiritual fire without squandering it in idle fantasy",
    ],
    reversedThemes: [
      "Creative blockage or false starts due to impatience",
      "Misdirected passion burning out before taking root",
      "Stifling an authentic spark out of hesitation or fear of failure",
    ],
    traditionalMeaning:
      "Emerging from the nocturnal clouds beneath a glowing crescent moon, a hand emerges holding a living, budding staff crowned with luminous violet fire. Overlooking mountain ranges and a distant citadel, the Ace of Wands embodies the supreme root of the element of Fire—the undiluted spark of divine inspiration, generative energy, and the sovereign impulse to create.",
    reflectiveInterpretation:
      "The Ace of Wands represents an authentic surge of spiritual and creative momentum. Something inside you is ready to ignite: a project, an overdue boundary, or a bold shift in perspective. This card reminds you that inspiration is a vital catalyst, but it requires grounding. Do not let the spark dissipate in rumination; give it an immediate, tangible container.",
    reflectionPrompt:
      "What sudden creative or intuitive spark has recently grabbed your attention, and what concrete container does it need today?",
    practicalTakeaway:
      "Take one immediate physical action on your newest inspiration before the initial momentum cools.",
    image: {
      src: "/images/sanctum/tarot/ace-of-wands.webp",
      alt: "Ace of Wands — Occult ceremonial tarot card of primal fire, creative inspiration, and sudden catalyst",
      motif: "wands-ace",
    },
  },
  {
    id: "card_wands_two",
    slug: "two-of-wands",
    number: 2,
    numeral: "II",
    name: "Two of Wands",
    suit: "wands",
    arcana: "minor",
    shortKeywords: ["Strategic Vision", "Domain Authority", "Threshold of Expansion"],
    traditionalThemes: [
      "Surveying one's domain from an established vantage point",
      "Formulating deliberate plans for future exploration",
      "Holding the balance between current stability and bold expansion",
      "Exercising personal sovereignty over one's life trajectory",
    ],
    reversedThemes: [
      "Restlessness and discontent with current accomplishments",
      "Fear of leaving comfortable perimeters to take calculated risks",
      "Analysis paralysis disguised as endless strategic preparation",
    ],
    traditionalMeaning:
      "A robed witch stands upon a high stone battlement overlooking a tranquil bay and the rising sun, holding a rooted wand in one hand and cradling a globe in the other. A second wand stands affixed to the parapet beside a ceremonial banner. The Two of Wands depicts the moment of conscious sovereignty—surveying what has already been built while deliberate foresight turns toward unmapped horizons.",
    reflectiveInterpretation:
      "The Two of Wands marks a pivotal juncture where comfortable familiarity meets the call of the unknown. You have established a defensible footing and earned genuine competence; now, the question shifts from survival to purposeful direction. Holding the globe reminds you that the boundaries of your world are determined by your willingness to look beyond immediate ramparts.",
    reflectionPrompt:
      "What familiar perimeter have you outgrown, and what long-range vision deserves your strategic commitment?",
    practicalTakeaway:
      "Carve out dedicated time today to step back from tactical busywork and draft the overarching strategic plan for your next phase.",
    image: {
      src: "/images/sanctum/tarot/two-of-wands.webp",
      alt: "Two of Wands — Occult ceremonial tarot card of vision, domain authority, and strategic planning",
      motif: "wands-two",
    },
  },
  {
    id: "card_wands_three",
    slug: "three-of-wands",
    number: 3,
    numeral: "III",
    name: "Three of Wands",
    suit: "wands",
    arcana: "minor",
    shortKeywords: ["Foresight Realized", "Ships Returning", "Purposeful Expansion"],
    traditionalThemes: [
      "Watching one's initial investments launch across the waters",
      "Confident expectation grounded in thorough groundwork",
      "Expanding influence into broader arenas and alliances",
      "Embracing exploration, long-range travel, and compound momentum",
    ],
    reversedThemes: [
      "Disappointment over delayed returns or unforeseen logistical obstacles",
      "Impatience leading to premature abandonment of sound ventures",
      "Reluctance to expand beyond narrow local boundaries",
    ],
    traditionalMeaning:
      "Standing upon a rugged cliff edge flanked by three firmly planted, budding wands, a cloaked traveler looks out across a dark violet sea as three tall sailing vessels navigate toward the horizon beneath luminous celestial moons. The Three of Wands symbolizes established enterprise, visionary leadership, and the serene confidence of having set powerful causes in motion that are now maturing across distance and time.",
    reflectiveInterpretation:
      "The Three of Wands is the card of patient momentum. Unlike the internal deliberation of the Two, the Three indicates that your ships have already been dispatched. Your past choices, intentions, and workings are actively sailing across the open sea. Your role now is to maintain steady vigilance, hold the high ground, and prepare to welcome the harvest when your vessels return to harbor.",
    reflectionPrompt:
      "What deliberate intentions or investments have you previously launched into the world, and how are you preparing to receive their results?",
    practicalTakeaway:
      "Trust the seeds and projects you have already set in motion. Focus your attention on preparing infrastructure to receive expansion rather than anxious micromanagement.",
    image: {
      src: "/images/sanctum/tarot/three-of-wands.webp",
      alt: "Three of Wands — Occult ceremonial tarot card of foresight, ships returning, and purposeful expansion",
      motif: "wands-three",
    },
  },
  {
    id: "card_wands_four",
    slug: "four-of-wands",
    number: 4,
    numeral: "IV",
    name: "Four of Wands",
    suit: "wands",
    arcana: "minor",
    shortKeywords: ["Sacred Sanctuary", "Joyous Milestone", "Communal Harmony"],
    traditionalThemes: [
      "Celebrating an earned threshold of harmony and stability",
      "Anchoring a consecrated home, community, or creative space",
      "Gratitude for peace, safety, and mutual belonging",
      "Temporary pause in labor to honor genuine connection",
    ],
    reversedThemes: [
      "Internal disharmony disrupting a celebration or domestic space",
      "Feeling alienated or unable to celebrate despite outer achievements",
      "Postponing joy until an unreachable standard of perfection is met",
    ],
    traditionalMeaning:
      "Four sturdy carved wands form a ceremonial arbor woven with lush floral garlands and ribbons, framing a welcoming castle citadel under a full moon. Two figures adorned in ceremonial robes raise decorated chalices in joyful revelry. The Four of Wands represents the sanctification of space, earned rest, the warmth of homecoming, and the deep, communal celebration of an accomplished milestone.",
    reflectiveInterpretation:
      "The Four of Wands is a luminous marker of sanctuary and celebration. It indicates that you have arrived at a safe, grounded harbor within your journey. The foundation you have constructed is solid enough to support genuine celebration, peace, and restorative joy. Allow yourself to drop your defensive guard, share your blessings with trusted company, and acknowledge that life is not solely an unyielding siege.",
    reflectionPrompt:
      "What recent milestone or safe haven have you constructed that deserves celebration and unhurried gratitude?",
    practicalTakeaway:
      "Consciously pause from striving today to celebrate an earned victory. Consecrate your immediate living space or share a meal in communion with someone you trust.",
    image: {
      src: "/images/sanctum/tarot/four-of-wands.webp",
      alt: "Four of Wands — Occult ceremonial tarot card of sacred sanctuary, celebration, and harmonious threshold",
      motif: "wands-four",
    },
  },
  {
    id: "card_wands_five",
    slug: "five-of-wands",
    number: 5,
    numeral: "V",
    name: "Five of Wands",
    suit: "wands",
    arcana: "minor",
    shortKeywords: ["Dynamic Friction", "Testing of Will", "Spirited Competition"],
    traditionalThemes: [
      "Clashing perspectives, competitive sparring, or chaotic energy",
      "Testing skills, boundaries, and endurance against worthy equals",
      "Sorting through conflicting priorities and fragmented demands",
      "Productive tension that sharpens competence when stripped of malice",
    ],
    reversedThemes: [
      "Petty conflict, passive aggression, or exhausted infighting",
      "Avoidance of necessary direct competition out of discomfort",
      "Artificial drama masking deeper unspoken power dynamics",
    ],
    traditionalMeaning:
      "Five youthful figures clad in dark robes raise tall wands in an energetic, chaotic melee on a rugged hillside beneath a radiant moon. Though the staves cross and clash vigorously, their contest is an athletic tournament rather than lethal combat. The Five of Wands represents the crucible of competition, dynamic brainstorming, testing of ideas, and the unavoidable friction that arises when distinct creative wills collide.",
    reflectiveInterpretation:
      "The Five of Wands brings noise, contention, and the clashing of different wills. It shows that you are in the thick of a lively contest or navigating conflicting priorities where everyone is vying for voice and territory. This friction is not necessarily destructive—it is a sparring match that tests your stamina, clarifies your core convictions, and weeds out weak arguments. Do not take the turbulence personally; view it as an athletic sharpening of your resolve.",
    reflectionPrompt:
      "Where are you currently experiencing chaotic static or conflicting demands, and how can you treat this friction as a test of skill rather than personal hostility?",
    practicalTakeaway:
      "Clarify your essential non-negotiables in any current disagreement, and avoid burning valuable energy on petty squabbles that do not affect the main outcome.",
    image: {
      src: "/images/sanctum/tarot/five-of-wands.webp",
      alt: "Five of Wands — Occult ceremonial tarot card of spirited debate, dynamic competition, and testing of will",
      motif: "wands-five",
    },
  },
  {
    id: "card_wands_six",
    slug: "six-of-wands",
    number: 6,
    numeral: "VI",
    name: "Six of Wands",
    suit: "wands",
    arcana: "minor",
    shortKeywords: ["Earned Triumph", "Public Recognition", "Vindicated Will"],
    traditionalThemes: [
      "Public acclaim, validation, and celebration following struggle",
      "Vindicated purpose and holding earned leadership with dignity",
      "Standing tall amid collective recognition and shared success",
      "Bearing victory with humility rather than becoming intoxicated by applause",
    ],
    reversedThemes: [
      "Fleeting acclaim, hollow praise, or wounded professional pride",
      "Delayed public recognition or feeling unappreciated despite success",
      "Arrogance following victory creating sudden vulnerability",
    ],
    traditionalMeaning:
      "A crowned rider in ceremonial dark robes rides upon a decorated white steed through an applauding gathering of practitioners, holding aloft a tall budding staff crowned with a golden laurel wreath. Beside the horse, five attendant staves are raised in reverent salute beneath a waxing celestial crescent. The Six of Wands represents the moment of public vindication, victorious emergence from trial, and the dignified acceptance of earned leadership.",
    reflectiveInterpretation:
      "The Six of Wands marks an undeniable threshold of victory. The friction and chaotic skirmishes of the Five have resolved in your favor through persistence and alignment. Your competence is visibly recognized, not merely in your private conviction, but in the collective arena. Accept this recognition without false modesty, but remember that true sovereignty does not depend on the crowd's applause. Let this victory fortify your endurance for the road ahead.",
    reflectionPrompt:
      "What hard-won milestone or inner victory has recently materialized, and how will you honor your competence without becoming dependent on outside acclaim?",
    practicalTakeaway:
      "Acknowledge and claim your progress today. Share credit where it is genuinely due, and stand squarely in the authority you have worked to build.",
    image: {
      src: "/images/sanctum/tarot/six-of-wands.webp",
      alt: "Six of Wands — Occult ceremonial tarot card of victory, public recognition, and triumphant leadership",
      motif: "wands-six",
    },
  },
  {
    id: "card_wands_seven",
    slug: "seven-of-wands",
    number: 7,
    numeral: "VII",
    name: "Seven of Wands",
    suit: "wands",
    arcana: "minor",
    shortKeywords: ["Defiant Sovereignty", "High Ground Defense", "Unbending Courage"],
    traditionalThemes: [
      "Holding the high ground against encroaching opposition",
      "Defending personal boundaries, integrity, or hard-won territory",
      "Standing resolute against the majority or prevailing current",
      "Moral courage and uncompromising refusal to capitulate",
    ],
    reversedThemes: [
      "Exhaustion from endless defensiveness or chronic siege mentality",
      "Feeling overwhelmed by numbers or giving up right before a breakthrough",
      "Stubbornly defending an obsolete perimeter out of pride",
    ],
    traditionalMeaning:
      "Standing atop a steep, craggy promontory beneath a storm-swept twilight sky, a fierce practitioner wields a heavy, living wand with both hands, repelling six opposing staves thrusting upward from the shadows below. Clad in protective robes and braced firmly against the incline, the figure commands the higher elevation with unwavering grit. The Seven of Wands depicts the defense of hard-won ground, courage under pressure, and the unyielding determination to hold fast against overwhelming odds.",
    reflectiveInterpretation:
      "The Seven of Wands places you in the crucible of defense. Having achieved visibility and secured ground, you now face the inevitable pushback: challenges to your authority, boundary testing, or demands to dilute your standards. You hold the vantage point of higher ground. Do not apologize for the perimeter you have established. Stand firm, root your stance, and let your convictions speak through unyielding resolve.",
    reflectionPrompt:
      "What boundary or earned position are others currently testing, and what internal anchor will keep you grounded against the pressure to fold?",
    practicalTakeaway:
      "Hold your ground firmly on one non-negotiable boundary today. Refuse to explain, over-justify, or yield territory you have rightfully claimed.",
    image: {
      src: "/images/sanctum/tarot/seven-of-wands.webp",
      alt: "Seven of Wands — Occult ceremonial tarot card of high ground defense, courage, and unbending boundaries",
      motif: "wands-seven",
    },
  },
  {
    id: "card_wands_eight",
    slug: "eight-of-wands",
    number: 8,
    numeral: "VIII",
    name: "Eight of Wands",
    suit: "wands",
    arcana: "minor",
    shortKeywords: ["Swift Acceleration", "Decisive Momentum", "Unobstructed Flight"],
    traditionalThemes: [
      "Rapid acceleration, incoming messages, and sudden breakthrough",
      "Stagnant obstacles dissolving into swift forward motion",
      "Arrows of will speeding toward their intended targets",
      "Decisive action requiring presence, alignment, and sharp reflexes",
    ],
    reversedThemes: [
      "Frustrating delays, miscommunication, or missed connections",
      "Chaotic rushing leading to careless errors or physical burnout",
      "Trying to force momentum before the channel is genuinely clear",
    ],
    traditionalMeaning:
      "Eight flowering wands streak diagonally through a nocturnal violet sky like luminous arrows of fire, soaring unimpeded over a serene valley, winding river, and distant sanctuary tower beneath distant stars. Free from human hands or earthly friction, their trajectory is swift, purposeful, and certain. The Eight of Wands represents the sudden release of stalled energy, rapid transit, electrifying news, and the pure momentum of will moving at speed.",
    reflectiveInterpretation:
      "The Eight of Wands signals that the waiting phase has abruptly ended. Events, communications, and long-gestating projects are accelerating in unison. What previously felt stalled or delayed is now moving with unstoppable velocity. This is not the time for second-guessing or hesitation; align your focus, trust your preparation, and steer the current rather than fighting its speed.",
    reflectionPrompt:
      "Where is momentum suddenly accelerating in your life, and how will you stay focused and centered amid the speed of change?",
    practicalTakeaway:
      "Respond decisively to incoming opportunities or communications today. Keep your schedule lean so you can move smoothly with the momentum.",
    image: {
      src: "/images/sanctum/tarot/eight-of-wands.webp",
      alt: "Eight of Wands — Occult ceremonial tarot card of swift momentum, rapid transit, and incoming breakthrough",
      motif: "wands-eight",
    },
  },
  {
    id: "card_wands_nine",
    slug: "nine-of-wands",
    number: 9,
    numeral: "IX",
    name: "Nine of Wands",
    suit: "wands",
    arcana: "minor",
    shortKeywords: ["Tested Resilience", "Final Sentinel", "Unbroken Vigilance"],
    traditionalThemes: [
      "Standing resolute after enduring multiple trials and skirmishes",
      "Guarding the sacred perimeter while bearing the scars of past battles",
      "Drawing upon deep wells of stamina for the final stretch",
      "Distinguishing between healthy vigilance and paralyzing paranoia",
    ],
    reversedThemes: [
      "Chronic exhaustion, defensive paranoia, or hyper-vigilance",
      "Refusing to drop armor even in genuine sanctuary and safety",
      "Collapsing right before the finish line out of accumulated fatigue",
    ],
    traditionalMeaning:
      "A battle-worn practitioner bearing a bandaged forehead stands sentinel in a consecrated clearing, gripping a stout staff with both hands. Behind them stands a palisade of eight rooted wands forming an impenetrable defensive barrier under a luminous full moon. Though weary from past battles, the figure's eyes remain clear, steady, and watchful. The Nine of Wands represents the resilience of the soul, enduring strength near the end of a long ordeal, and the protective boundaries that preserve your vital essence.",
    reflectiveInterpretation:
      "The Nine of Wands speaks to the tired sentinel within you. You have weathered repeated trials and carried yourself through protracted campaigns; the scars you bear are proof of your survival, not your weakness. You are now guarding the final perimeter. You do not need to fight every passing shadow; simply hold your post, conserve your remaining energy, and remember that you possess the grit to see this journey to its resolution.",
    reflectionPrompt:
      "What weariness are you currently carrying from past battles, and what boundary will protect your stamina without isolating you behind cold walls?",
    practicalTakeaway:
      "Guard your energy fiercely today. Do not take on any extra battles or unneeded obligations; preserve your focus for the final stretch.",
    image: {
      src: "/images/sanctum/tarot/nine-of-wands.webp",
      alt: "Nine of Wands — Occult ceremonial tarot card of tested resilience, defensive palisade, and unbroken vigilance",
      motif: "wands-nine",
    },
  },
  {
    id: "card_wands_ten",
    slug: "ten-of-wands",
    number: 10,
    numeral: "X",
    name: "Ten of Wands",
    suit: "wands",
    arcana: "minor",
    shortKeywords: ["Culminating Burden", "Weight of Excess", "Threshold of Release"],
    traditionalThemes: [
      "Carrying the heavy, accumulated weight of too many commitments",
      "Approaching the destination while blinded by the sheer volume of tasks",
      "Success becoming burdensome due to unwillingness to delegate",
      "The critical necessity of laying down what no longer serves your core journey",
    ],
    reversedThemes: [
      "Severe burnout, physical breakdown, or collapsing under avoidable strain",
      "Inability to say no or chronic emotional martyrdom",
      "Dropping unnecessary burdens and reclaiming breath and freedom",
    ],
    traditionalMeaning:
      "A robed figure bends under the crushing weight of ten heavy, bundled staves, trudging uphill along a winding mountain path toward a glowing sanctuary tower in the distance. The sheer mass of the wands blocks the traveler's forward vision, requiring every ounce of bodily strength to maintain momentum. The Ten of Wands represents the culmination of the fire suit—where unrestrained passion and accumulated duties become an oppressive load, signaling the urgent need to lay down extraneous burdens.",
    reflectiveInterpretation:
      "The Ten of Wands arrives when labor has crossed the line from honorable devotion into crushing overload. You have taken on too many staves: obligations, emotional weights, or tasks you convinced yourself only you could carry. The sanctuary is in sight, but you cannot enter its gates while dragging a forest on your back. Identify which staves belong to you and which you picked up out of guilt or habit. It is time to put the excess down.",
    reflectionPrompt:
      "What heavy obligation or emotional burden are you stubbornly carrying that does not belong to you or your future?",
    practicalTakeaway:
      "Choose one task, commitment, or self-imposed burden to put down, delegate, or decline today. Give your nervous system room to breathe.",
    image: {
      src: "/images/sanctum/tarot/ten-of-wands.webp",
      alt: "Ten of Wands — Occult ceremonial tarot card of accumulated burden, overwhelm, and the threshold of release",
      motif: "wands-ten",
    },
  },
  {
    id: "card_wands_page",
    slug: "page-of-wands",
    number: 11,
    numeral: "PAGE",
    name: "Page of Wands",
    suit: "wands",
    arcana: "minor",
    shortKeywords: ["Restless Curiosity", "Creative Spark", "Spirited Discovery"],
    traditionalThemes: [
      "Curiosity, inspiration, exploration, and new creative opportunities",
      "The eager spark of youthful enthusiasm ready to explore uncharted territory",
      "Delivering messages of inspiration, sudden ideas, or creative invitations",
      "Approaching unknown ground with an open mind and playful boldness",
    ],
    reversedThemes: [
      "Scattered focus, procrastination, or starting projects without follow-through",
      "Restless impatience leading to hasty mistakes or careless blunders",
      "Self-doubt suppressing an authentic creative spark before it ignites",
    ],
    traditionalMeaning:
      "A youthful traveler clad in flowing ceremonial robes stands upon a rocky overlook, holding aloft a budding staff topped with a luminous violet blossom. Gazing upward at the nocturnal sky where a waxing crescent moon shines among radiant stars, the figure embodies the spirit of eager exploration. The Page of Wands represents the birth of creative curiosity, the sudden desire to explore the unknown, and the courage to pursue new horizons with fresh, unfiltered optimism.",
    reflectiveInterpretation:
      "The Page of Wands brings a breeze of fresh inspiration and playful curiosity into your world. A new door or creative spark is presenting itself, inviting you to step into the role of a learner and explorer. You do not need to possess all the answers or predict the entire journey; what matters now is your willingness to experiment, ask perceptive questions, and follow what genuinely fascinates you. Approach this threshold with open eyes and a beginner's heart.",
    reflectionPrompt:
      "What new idea or unexplored territory is currently calling to your curiosity, and what is one small experiment you can run to investigate it?",
    practicalTakeaway:
      "Follow one spontaneous curiosity today without worrying about where it leads. Say yes to a fresh conversation, sketch a raw idea, or explore an unfamiliar topic.",
    image: {
      src: "/images/sanctum/tarot/page-of-wands.webp",
      alt: "Page of Wands — Occult ceremonial tarot card of curiosity, creative exploration, and fresh inspiration",
      motif: "wands-page",
    },
  },
  {
    id: "card_wands_knight",
    slug: "knight-of-wands",
    number: 12,
    numeral: "KNIGHT",
    name: "Knight of Wands",
    suit: "wands",
    arcana: "minor",
    shortKeywords: ["Fiery Audacity", "Decisive Velocity", "Fearless Pursuit"],
    traditionalThemes: [
      "Passion, confidence, adventure, and decisive action",
      "Charging forward with infectious vitality and unstoppable conviction",
      "Embracing adventure and daring to pursue ambitious visions",
      "Channeling high-octane drive into tangible forward movement",
    ],
    reversedThemes: [
      "Reckless impulsiveness, hot-headed reactivity, or burning bridges",
      "Fierce momentum without strategy, leading to premature burnout",
      "Aggressive impatience when circumstances require deliberate pacing",
    ],
    traditionalMeaning:
      "An armored knight in ceremonial battle dress rides a powerful, rearing warhorse across a rugged, storm-lit ridge, thrusting upward a blazing staff radiating violet fire. The nocturnal sky churns with celestial energy as stars frame the warrior's resolute gaze. The Knight of Wands represents the absolute charge of willful momentum—unapologetic courage, adventurous vigor, and the dynamic readiness to seize life by the reins.",
    reflectiveInterpretation:
      "The Knight of Wands heralds an era of decisive action, daring momentum, and magnetic confidence. The period of quiet contemplation has given way to active pursuit; hesitation will only dull your blade. When this archetype charges into your life, it calls on you to back yourself completely, ride the crest of your enthusiasm, and advance toward your ambition with bold authenticity. Channel the heat into purposeful direction rather than scattered wildfires.",
    reflectionPrompt:
      "Where have you been holding back out of caution, and what bold, decisive move is your spirit ready to execute?",
    practicalTakeaway:
      "Commit to one bold, assertive action today that you have been postponing. Let your genuine conviction carry you forward.",
    image: {
      src: "/images/sanctum/tarot/knight-of-wands.webp",
      alt: "Knight of Wands — Occult ceremonial tarot card of passion, adventurous confidence, and decisive momentum",
      motif: "wands-knight",
    },
  },
  {
    id: "card_wands_queen",
    slug: "queen-of-wands",
    number: 13,
    numeral: "QUEEN",
    name: "Queen of Wands",
    suit: "wands",
    arcana: "minor",
    shortKeywords: ["Radiant Sovereignty", "Magnetic Vitality", "Fierce Independence"],
    traditionalThemes: [
      "Independence, courage, charisma, and fertile creativity",
      "Radiating self-assurance and magnetic personal authority",
      "Fierce devotion to personal truth and generous warmth toward others",
      "Commanding respect naturally without needing to dominate or diminish",
    ],
    reversedThemes: [
      "Insecurity masking as jealousy, possessiveness, or vindictiveness",
      "Dimming your light to appease the discomfort of others",
      "Overbearing control or exhausting theatricality born of unmet needs",
    ],
    traditionalMeaning:
      "Draped in star-embroidered ceremonial robes, a serene and commanding queen sits upon a stone throne carved with lions. In her right hand she holds a tall staff topped with an illuminated flower, while at her feet rests a calm, watchful lioness. Framed by blooming lilies and rugged mountains beneath a radiant celestial canopy, the Queen of Wands represents the sovereign mastery of fire—warmth, radiant charisma, fierce loyalty, and unshakeable creative independence.",
    reflectiveInterpretation:
      "The Queen of Wands invites you to inhabit your natural sovereignty with unapologetic warmth and courage. You do not need to shrink to make others comfortable, nor do you need to shout to be respected. Like the queen beside her lioness, your presence alone commands authority when you are rooted in self-worth. Radiate your genuine fire, trust your creative instincts, and lead by the quiet power of your own authenticity.",
    reflectionPrompt:
      "Where are you dimming your natural charisma or independence, and how can you step fully into your authentic radiance?",
    practicalTakeaway:
      "Step into any room or interaction today with your head held high. Express your opinion clearly, warmly, and without self-deprecating apologies.",
    image: {
      src: "/images/sanctum/tarot/queen-of-wands.webp",
      alt: "Queen of Wands — Occult ceremonial tarot card of independence, magnetic charisma, courage, and creative warmth",
      motif: "wands-queen",
    },
  },
  {
    id: "card_wands_king",
    slug: "king-of-wands",
    number: 14,
    numeral: "KING",
    name: "King of Wands",
    suit: "wands",
    arcana: "minor",
    shortKeywords: ["Visionary Leadership", "Executive Mastery", "Sovereign Will"],
    traditionalThemes: [
      "Leadership, vision, determination, and creative mastery",
      "Translating high-level inspiration into enduring, realized reality",
      "Commanding respect through seasoned wisdom, integrity, and decisive focus",
      "Inspiring others to rally around a shared, elevated vision",
    ],
    reversedThemes: [
      "Autocratic rigidity, dogmatism, or unwillingness to hear dissent",
      "Unrealistic expectations driving collaborators or self into ground",
      "Abuse of authority or impulsive arrogance undermining true leadership",
    ],
    traditionalMeaning:
      "A mature, crowned sovereign sits poised upon a monumental stone throne carved with lions and salamanders, holding a living staff crowned with eternal violet fire. Backed by a radiant cosmic halo and distant mountain ranges, the king's steady gaze reflects seasoned command and long-range vision. The King of Wands represents the mature culmination of the fire element—executive authority, unyielding determination, and the power to translate bold visions into lasting structures.",
    reflectiveInterpretation:
      "The King of Wands calls you to the seat of visionary authority. You have moved past the initial sparks and skirmishes; now you are called to direct the overarching course. True mastery does not panic in the face of temporary obstacles; it holds the long-term vision steady and makes measured, courageous decisions. Trust your track record, take responsibility for the outcome, and lead with clarity and dignity.",
    reflectionPrompt:
      "What overarching vision are you responsible for steering, and what executive decision must you make to maintain its momentum?",
    practicalTakeaway:
      "Make one strategic executive decision today that aligns with your long-term vision, rather than reacting to short-term distractions.",
    image: {
      src: "/images/sanctum/tarot/king-of-wands.webp",
      alt: "King of Wands — Occult ceremonial tarot card of visionary leadership, determination, mastery, and sovereign will",
      motif: "wands-king",
    },
  },
  {
    id: "card_cups_ace",
    slug: "ace-of-cups",
    number: 1,
    numeral: "ACE",
    name: "Ace of Cups",
    suit: "cups",
    arcana: "minor",
    shortKeywords: ["Fountain of Grace", "Emotional Awakening", "Open Heart"],
    traditionalThemes: [
      "New emotional beginnings, compassion, love, and intuitive awakening",
      "The uninhibited outpouring of heartfelt affection, healing, and spiritual grace",
      "Dissolving old emotional armor to welcome genuine intimacy and connection",
      "Tuning into the deep subterranean currents of intuition and psychic receptive flow",
    ],
    reversedThemes: [
      "Emotional withholding, guarded numbness, or fear of vulnerability",
      "Feeling emotionally drained from giving more than you receive",
      "Suppressing genuine intuition out of fear of being hurt again",
    ],
    traditionalMeaning:
      "An ethereal hand emerges from nocturnal mists holding an ornate ceremonial chalice, from which five luminous streams of living water pour into a tranquil pond blooming with sacred water lilies. Beneath a glowing, radiant full moon, the waters ripple with spiritual vitality. The Ace of Cups embodies the pure root of the Water element—the primordial wellspring of love, emotional renewal, boundless empathy, and the awakening of profound intuitive perception.",
    reflectiveInterpretation:
      "The Ace of Cups heralds the opening of the emotional heart. Whether through a new relationship, a rekindled passion, or a deep wave of self-compassion, living waters are refilling your cup. If you have been living behind guarded walls or enduring an emotional drought, this archetype invites you to soften. Allow yourself to feel deeply, trust your intuitive hunches, and receive the grace and affection seeking to reach you.",
    reflectionPrompt:
      "Where has your heart grown rigid or guarded, and what would it look like to offer yourself or another unconditional grace today?",
    practicalTakeaway:
      "Perform one gentle act of genuine compassion today—either toward someone who needs warmth, or quietly toward yourself.",
    image: {
      src: "/images/sanctum/tarot/ace-of-cups.webp",
      alt: "Ace of Cups — Occult ceremonial tarot card of emotional beginnings, overflowing chalice, love, and intuition",
      motif: "cups-ace",
    },
  },
  {
    id: "card_cups_two",
    slug: "two-of-cups",
    number: 2,
    numeral: "II",
    name: "Two of Cups",
    suit: "cups",
    arcana: "minor",
    shortKeywords: ["Sacred Alliance", "Mutual Recognition", "Sovereign Bond"],
    traditionalThemes: [
      "Harmonious union, mutual attraction, emotional reciprocity, and genuine partnership",
      "Two individuals meeting as conscious equals with open hands",
      "Dissolving barriers through honest emotional exchange and shared understanding",
      "The alchemical marriage of complementary energies creating a stronger whole",
    ],
    reversedThemes: [
      "Codependency, unspoken imbalances, or transactional dynamics eroding trust",
      "Fear of vulnerability leading to emotional games or defensive posturing",
      "Projecting idealized fantasies onto a partner rather than accepting their reality",
    ],
    traditionalMeaning:
      "Two robed practitioners stand face-to-face before an ancient altar beneath a violet twilight sky, raising ornate chalices in mutual toast. Above their joined cups hovers the winged caduceus intertwined with celestial serpents, glowing with iridescent lunar light. The Two of Cups depicts the alchemy of reciprocal connection—not two halves desperately seeking completion, but two whole entities choosing to weave their sovereignty together in trust, affection, and shared purpose.",
    reflectiveInterpretation:
      "The Two of Cups honors the threshold where authentic connection takes root. When mutual respect and genuine emotional transparency align, a third sacred space opens between two people. This archetype invites you to meet another person—or a fragmented aspect of yourself—with unarmored honesty. True partnership does not ask you to diminish your perimeter to make room for another; it expands both participants through shared clarity and quiet loyalty.",
    reflectionPrompt:
      "Where is an alliance or relationship inviting deeper mutual honesty, and what unspoken expectation can you release to meet them as an equal?",
    practicalTakeaway:
      "Initiate one honest, validating check-in with a partner or close confidant today. Speak without defensiveness and listen with full presence.",
    image: {
      src: "/images/sanctum/tarot/two-of-cups.webp",
      alt: "Two of Cups — Occult ceremonial tarot card of sacred alliance, mutual attraction, emotional reciprocity, and sovereign partnership",
      motif: "cups-two",
    },
  },
  {
    id: "card_cups_three",
    slug: "three-of-cups",
    number: 3,
    numeral: "III",
    name: "Three of Cups",
    suit: "cups",
    arcana: "minor",
    shortKeywords: ["Communal Joy", "Kindred Circle", "Shared Abundance"],
    traditionalThemes: [
      "Celebration, sisterhood, collaborative camaraderie, and communal joy",
      "Rejoicing in shared milestones and the harvest of collective effort",
      "Finding safety, laughter, and restorative connection among chosen kin",
      "Honoring the sacred circle where each voice is received without rivalry",
    ],
    reversedThemes: [
      "Social burnout, cliquish exclusion, or superficial camaraderie masking gossip",
      "Feeling isolated in a crowd or overextending emotional labor to keep the peace",
      "Overindulgence used to numb underlying emotional exhaustion",
    ],
    traditionalMeaning:
      "Three figures dance in a woven circle beneath a celestial canopy draped in wild grapevines and flowering nocturnal jasmine. Each lifts a gleaming chalice toward the full moon, their laughter merging with the rustle of nocturnal leaves. The Three of Cups represents communal communion—the sweet restorative medicine of gathering with those who celebrate your vitality without envy, holding each other up in joy and gratitude.",
    reflectiveInterpretation:
      "The Three of Cups reminds you that emotional resilience is never meant to be sustained in total isolation. Even the most self-reliant witch requires the warmth of a circle. When life grows heavy or work turns solitary, this card invites you to lay down your defenses and bask in genuine camaraderie. Celebrate how far you and your companions have traveled, exchange stories, and let the laughter of trusted kindred recharge your spirit.",
    reflectionPrompt:
      "Who in your circle genuinely celebrates your victories without envy, and how can you share a moment of gratitude or laughter with them today?",
    practicalTakeaway:
      "Send a spontaneous message of genuine appreciation to a kindred friend or gather with someone whose presence leaves your cup full.",
    image: {
      src: "/images/sanctum/tarot/three-of-cups.webp",
      alt: "Three of Cups — Occult ceremonial tarot card of celebration, friendship, kindred circle, and communal joy",
      motif: "cups-three",
    },
  },
  {
    id: "card_cups_four",
    slug: "four-of-cups",
    number: 4,
    numeral: "IV",
    name: "Four of Cups",
    suit: "cups",
    arcana: "minor",
    shortKeywords: ["Sanctuary of Withdrawal", "Apathy's Diagnosis", "Inner Reassessment"],
    traditionalThemes: [
      "Introspection, emotional withdrawal, contemplative pause, and dissatisfaction",
      "Sitting with discontent as diagnostic evidence that old rewards no longer satisfy",
      "Turning inward to recalibrate desires before taking external action",
      "The danger of overlooking a fresh offering because attention is fixated on what disappointed",
    ],
    reversedThemes: [
      "Chronic cynicism, bitter isolation, or stubborn refusal to engage with new life",
      "Ignoring real opportunities out of habitual numbness or lingering resentment",
      "Wallowing in dissatisfaction rather than articulating what must genuinely change",
    ],
    traditionalMeaning:
      "A solitary contemplative sits beneath the shadowed boughs of an ancient willow, arms crossed in quiet reflection as three cups rest unmoved upon the moss before them. From an ethereal violet cloud, a spectral hand extends a fourth cup glowing with radiant starlight, yet the figure's gaze remains turned inward. The Four of Cups illustrates the necessary stillness of reassessment—and the gentle reminder that withdrawal must not become emotional blindness.",
    reflectiveInterpretation:
      "The Four of Cups signals a phase of emotional plateau or apathy. When familiar pleasures fall flat and routine offerings feel hollow, the psyche is not being difficult—it is signaling that an outgrown chapter has reached its natural conclusion. Do not force enthusiasm where it does not exist. However, beware of turning contemplative pause into hardened cynicism; a subtle, authentic gift is waiting just outside your current field of vision when you choose to look up.",
    reflectionPrompt:
      "What in your life currently feels uninspiring or flat, and what is your emotional numbness trying to protect you from feeling?",
    practicalTakeaway:
      "Take fifteen uninterrupted minutes away from screens and obligations to sit in quiet reflection. Acknowledge what is no longer working without judgment.",
    image: {
      src: "/images/sanctum/tarot/four-of-cups.webp",
      alt: "Four of Cups — Occult ceremonial tarot card of contemplation, introspection, reassessment, and quiet discernment",
      motif: "cups-four",
    },
  },
  {
    id: "card_cups_five",
    slug: "five-of-cups",
    number: 5,
    numeral: "V",
    name: "Five of Cups",
    suit: "cups",
    arcana: "minor",
    shortKeywords: ["Honoring Loss", "Sacred Mourning", "The Enduring Vessels"],
    traditionalThemes: [
      "Grief, heartbreak, regret, emotional shedding, and sorrow",
      "Acknowledging that something cherished has spilled and cannot be recovered",
      "Allowing grief its dignified space without being consumed by despair",
      "Discovering the two upright cups standing quietly behind you once the storm softens",
    ],
    reversedThemes: [
      "Perpetual mourning, clinging to grievances, or defining identity through heartbreak",
      "Refusing to turn around to see the support and vitality that still remain",
      "Prematurely forcing positivity to bypass the necessary ache of genuine loss",
    ],
    traditionalMeaning:
      "A dark-cloaked figure stands draped in mourning robes beside a dark, winding river beneath a stormy sky. At their feet lie three spilled chalices, their crimson contents seeping into the gravel. Yet behind the grieving traveler stand two upright golden cups, brimming with clear, untainted water, with a sturdy arched stone bridge leading back toward a safe sanctuary in the distance. The Five of Cups captures the sacred anatomy of loss—the pain of what was spilled, paired with the enduring truth of what remains.",
    reflectiveInterpretation:
      "The Five of Cups holds space for the ache of genuine grief and disappointment. When an investment collapses, a relationship ends, or a vision dissolves, sorrow is the only honest response. You are not required to rush your healing or manufacture false optimism. Weep for what was lost; honor what was poured out. But remember: the spilled cups do not define the entirety of your landscape. When your breath returns, turn around and recognize the two vessels still standing upright and full.",
    reflectionPrompt:
      "What loss or regret are you still grieving, and what enduring truth or supportive bond remains standing intact behind you?",
    practicalTakeaway:
      "Name one specific regret or disappointment aloud or onto paper, allow yourself to feel it fully, then consciously wash your face with cool water to anchor the transition.",
    image: {
      src: "/images/sanctum/tarot/five-of-cups.webp",
      alt: "Five of Cups — Occult ceremonial tarot card of grief, loss, emotional healing, and enduring hope",
      motif: "cups-five",
    },
  },
  {
    id: "card_cups_six",
    slug: "six-of-cups",
    number: 6,
    numeral: "VI",
    name: "Six of Cups",
    suit: "cups",
    arcana: "minor",
    shortKeywords: ["Ancestral Memory", "Innocent Wholeness", "Tender Nostalgia"],
    traditionalThemes: [
      "Nostalgia, childhood memories, heartfelt generosity, and emotional innocence",
      "Reconnecting with the purest, uncorrupted version of your creative spirit",
      "Receiving gentle kindness from your roots, memories, or longtime companions",
      "Offering a gift of simple goodwill without strings or transactional agendas",
    ],
    reversedThemes: [
      "Living trapped in the past or romanticizing a painful history through rose-tinted delusion",
      "Refusing to grow up or hiding in childlike helplessness to avoid sovereign responsibility",
      "Allowing unresolved childhood conditioning to dictate current adult boundaries",
    ],
    traditionalMeaning:
      "Within the secluded courtyard of an ancient sanctuary, two figures exchange a large ceremonial goblet blooming with six-petaled white flowers. Five other cups, similarly filled with fragrant blossoms, stand along the stone pathway leading toward a safe stone keep. A warm twilight glow illuminates the scene. The Six of Cups depicts the return of innocent warmth—the sweet medicine of memories, ancestral roots, and kindness given purely from the heart.",
    reflectiveInterpretation:
      "The Six of Cups transports you across the river of time to the simple, unarmored places of your history. Before the world taught you cynicism, guardrails, and doubt, you knew what delighted you with absolute clarity. This archetype invites you to retrieve that early spark. Whether through revisiting a beloved childhood passion, reconnecting with an old ally, or extending pure kindness to another, allow tenderness to soften your armor.",
    reflectionPrompt:
      "What did your younger self love with fierce innocence, and how can you invite a fragment of that pure joy back into your adult reality today?",
    practicalTakeaway:
      "Engage in one activity purely for childlike pleasure today—revisit a nostalgic song, a comfort craft, or extend a simple, no-strings-attached kindness to someone you cherish.",
    image: {
      src: "/images/sanctum/tarot/six-of-cups.webp",
      alt: "Six of Cups — Occult ceremonial tarot card of nostalgia, innocence, memory, and heartfelt kindness",
      motif: "cups-six",
    },
  },
  {
    id: "card_cups_seven",
    slug: "seven-of-cups",
    number: 7,
    numeral: "VII",
    name: "Seven of Cups",
    suit: "cups",
    arcana: "minor",
    shortKeywords: ["Mirage and Desire", "Sifting Illusions", "Conscious Selection"],
    traditionalThemes: [
      "Multiple options, active imagination, daydreaming, and seductive temptations",
      "Standing before an array of alluring prospects without knowing which holds substance",
      "The seductive pull of fantasy disguising itself as genuine opportunity",
      "The urgent necessity of grounding vision into practical discernment",
    ],
    reversedThemes: [
      "Chronic indecision, shiny object syndrome, and chasing phantom promises",
      "Paralysis caused by endless wishful thinking without committing to a single path",
      "Waking up abruptly from an intoxicating illusion to face unavoidable practical demands",
    ],
    traditionalMeaning:
      "A silhouetted practitioner stands in awe before seven luminous chalices floating within swirling purple and indigo mists. Each cup bears a distinct ethereal apparition: a jewel-encrusted castle, a serpent of wisdom, a laurel wreath of victory, a glowing mask of desire, a dragon of primal power, a cluster of gems, and a veiled luminous figure radiating divine light. The Seven of Cups captures the dizzying kaleidoscope of imagination—and the test of seeing past glittering glamour to choose what is real.",
    reflectiveInterpretation:
      "The Seven of Cups reveals a mind teeming with possibilities, fantasies, and potential trajectories. While imagination is the primal crucible of all magic, an abundance of untethered daydreams will scatter your vital energy and stall your progress. Not every sparkling goblet holds pure water; some contain venom, illusion, or empty vapors. The challenge of this archetype is not dreaming up more options, but having the courage to prune away illusions and choose the single path worthy of your labor.",
    reflectionPrompt:
      "Which alluring dream or fantasy is distracting you from taking concrete, mundane steps toward your true objective?",
    practicalTakeaway:
      "Write down all the competing ideas or options currently cluttering your head, strike through the distractions, and commit to advancing exactly ONE today.",
    image: {
      src: "/images/sanctum/tarot/seven-of-cups.webp",
      alt: "Seven of Cups — Occult ceremonial tarot card of choices, imagination, illusions, and discernment",
      motif: "cups-seven",
    },
  },
  {
    id: "card_cups_eight",
    slug: "eight-of-cups",
    number: 8,
    numeral: "VIII",
    name: "Eight of Cups",
    suit: "cups",
    arcana: "minor",
    shortKeywords: ["The Midnight Threshold", "Conscious Departure", "Pursuit of Depth"],
    traditionalThemes: [
      "Walking away, seeking higher truth, leaving the outgrown behind, and spiritual longing",
      "Recognizing that even what was built with care no longer nourishes your spirit",
      "Turning your back on comfortable emotional stagnation to seek deeper meaning",
      "The quiet courage of nocturnal departure without dramatic fanfare",
    ],
    reversedThemes: [
      "Clinging to dead situations out of comfort or fear of the unknown",
      "Aimless escapism, running away whenever intimacy or commitment requires effort",
      "Returning repeatedly to toxic dynamics because the doorway forward feels lonely",
    ],
    traditionalMeaning:
      "A cloaked pilgrim holding a slender staff walks deliberately away from an orderly stack of eight golden chalices arranged in a neat row. Moving toward a rugged mountain pass beneath an eclipse of sun and moon, the traveler does not look back. The Eight of Cups marks the quiet turning point of emotional maturity—the sovereign realization that while what you built was valuable, staying any longer would starve your evolving soul.",
    reflectiveInterpretation:
      "The Eight of Cups marks one of the most courageous thresholds in the entire deck: leaving behind what is familiar, respectable, and even successful because it no longer holds spiritual life for you. This is not reckless abandonment or petty retreat; it is the somber, deliberate departure of someone who respects their own depth too much to remain stagnant. You do not owe anyone an apology for outgrowing an old room. Pack your staff, step out into the midnight air, and ascend the high pass toward genuine meaning.",
    reflectionPrompt:
      "What relationship, project, or role has run its course, and what inner truth is urging you to walk toward higher ground?",
    practicalTakeaway:
      "Identify one commitment or habit that drains you without feeding your growth. Take one decisive step today to create distance or politely withdraw.",
    image: {
      src: "/images/sanctum/tarot/eight-of-cups.webp",
      alt: "Eight of Cups — Occult ceremonial tarot card of walking away, seeking depth, departure, and emotional transformation",
      motif: "cups-eight",
    },
  },
  {
    id: "card_cups_nine",
    slug: "nine-of-cups",
    number: 9,
    numeral: "IX",
    name: "Nine of Cups",
    suit: "cups",
    arcana: "minor",
    shortKeywords: ["The Wish Fulfilled", "Sovereign Satiety", "Deep Gratitude"],
    traditionalThemes: [
      "Contentment, emotional satisfaction, pleasure, wishes fulfilled, and self-sufficiency",
      "Basking in the warm satisfaction of personal labor and emotional peace",
      "Enjoying sensory pleasures and the fruits of your sovereignty without guilt",
      "Recognizing that your cup is full and you are fundamentally safe",
    ],
    reversedThemes: [
      "Smug complacency, self-indulgent greed, or superficial vanity",
      "Getting what you wished for only to discover it does not bring inner peace",
      "Overeating, overspending, or hoarding pleasure while others go without",
    ],
    traditionalMeaning:
      "A contented witch clad in rich plum and obsidian vestments sits serenely upon a carved bench, arms folded comfortably across their chest with a calm, knowing smile. Behind them, upon a crescent altar draped in midnight silk, nine ornate chalices glow with warm, golden luminescence. Known traditionally as 'The Wish Card,' the Nine of Cups embodies deep emotional satiety—the quiet bliss of arriving at a sanctuary of your own making, where desire and reality rest in complete alignment.",
    reflectiveInterpretation:
      "The Nine of Cups heralds a moment of well-earned emotional ease, satisfaction, and self-honoring pleasure. You have weathered difficult trials and done the deep interior labor; now, the universe invites you to sit back and savor your life. Drop the habit of waiting for the other shoe to drop. Satiety is not a trap; it is your birthright. Look upon the vessels you have filled with your own devotion, receive the blessing of what has arrived, and let genuine gratitude wash over you.",
    reflectionPrompt:
      "What recent milestone, comfort, or wish has manifested in your life that you have not yet stopped to celebrate and truly enjoy?",
    practicalTakeaway:
      "Treat yourself deliberately today to a simple, guilt-free sensory pleasure—a slow meal, a long bath with salt, or an hour spent entirely on your own terms.",
    image: {
      src: "/images/sanctum/tarot/nine-of-cups.webp",
      alt: "Nine of Cups — Occult ceremonial tarot card of contentment, wishes fulfilled, gratitude, and sovereign peace",
      motif: "cups-nine",
    },
  },
  {
    id: "card_cups_ten",
    slug: "ten-of-cups",
    number: 10,
    numeral: "X",
    name: "Ten of Cups",
    suit: "cups",
    arcana: "minor",
    shortKeywords: ["Sanctuary of the Heart", "Lasting Harmony", "The Radiant Horizon"],
    traditionalThemes: [
      "Emotional fulfillment, domestic peace, lasting harmony, and shared belonging",
      "Living in resonant alignment with your deepest values and loved ones",
      "A home and hearth built on unconditional acceptance, safety, and joy",
      "The blessing of enduring emotional wholeness that shelters future generations",
    ],
    reversedThemes: [
      "Domestic tension, shattered harmony, or values mismatched within a household",
      "Pretending everything is perfect for external appearances while internal fractures fester",
      "Unrealistic expectations of constant bliss causing unnecessary disappointment",
    ],
    traditionalMeaning:
      "A loving family stands upon a verdant hillside overlooking a tranquil stream and a welcoming stone cottage. Above them, arcing across a starry twilight sky, ten radiant chalices form an ethereal rainbow of glowing lunar light. Two children dance freely on the meadow grass as the figures lift their arms in joyous awe. The Ten of Cups represents the culmination of emotional journeying—the realization of true belonging, peaceful sanctuary, and the deep emotional safety of a loving community.",
    reflectiveInterpretation:
      "The Ten of Cups represents the summit of the Water suit: emotional sanctuary, lasting harmony, and the realization that you are held in love and belonging. This card does not promise a life devoid of challenges; rather, it reflects a foundational security so sturdy that storms can rage outside without disturbing the peace within your walls. Celebrate your sacred hearth, honor the people who anchor your life with safety, and recognize that you are home.",
    reflectionPrompt:
      "What does true emotional home and unconditional belonging feel like in your body, and how can you cultivate that sanctuary for yourself and those you cherish?",
    practicalTakeaway:
      "Do one small act to bring warmth and harmony into your living space or household today—light a hearth candle, tidy a shared corner, or share a loving word with someone who lives alongside you.",
    image: {
      src: "/images/sanctum/tarot/ten-of-cups.webp",
      alt: "Ten of Cups — Occult ceremonial tarot card of lasting harmony, emotional fulfillment, home, and belonging",
      motif: "cups-ten",
    },
  },
  {
    id: "card_cups_page",
    slug: "page-of-cups",
    number: 11,
    numeral: "PAGE",
    name: "Page of Cups",
    suit: "cups",
    arcana: "minor",
    shortKeywords: ["Intuitive Messenger", "Playful Wonder", "The Tender Spark"],
    traditionalThemes: [
      "Creative inspiration, intuitive messages, emotional curiosity, and gentle beginnings",
      "Listening to quiet hunches and poetic synchronicities without cynical judgment",
      "Approaching relationships and artistry with innocent curiosity and open vulnerability",
      "Receiving an unexpected invitation or revelation that stirs the imagination",
    ],
    reversedThemes: [
      "Emotional immaturity, hypersensitivity, or escaping into moody daydreams",
      "Doubting genuine intuitive hits because they defy cold rational logic",
      "Overreacting to perceived slights with petulant drama or defensive theatrics",
    ],
    traditionalMeaning:
      "A youthful mystic clad in robes adorned with water lilies and silver fish stands at the water's edge, gazing with delighted wonder at a golden cup from which a curious silver fish emerges to meet their gaze. The nocturnal tide rolls gently behind them under a shimmering crescent moon. The Page of Cups embodies the sweet, uncanny birth of intuition—the playful willingness to suspend disbelief, listen to the whisper from the deep, and welcome unexpected emotional and creative invitations.",
    reflectiveInterpretation:
      "The Page of Cups brings a whimsical, intuitive message from the subterranean realm of your psyche. Often, profound insight does not arrive through thunderous pronouncements; it appears as a quiet hunch, an odd dream, or a sudden pang of creative curiosity. Do not let your adult cynicism dismiss these fragile impulses. Be as open and receptive as the Page gazing at the fish in the cup. Something wondrous is trying to speak with you through the language of feeling.",
    reflectionPrompt:
      "What subtle hunch, artistic impulse, or emotional message have you been ignoring, and what happens if you treat it with genuine curiosity today?",
    practicalTakeaway:
      "Record the first intuition, dream symbol, or creative impulse that strikes you today, without judging or editing it. Treat it as a message from the deep.",
    image: {
      src: "/images/sanctum/tarot/page-of-cups.webp",
      alt: "Page of Cups — Occult ceremonial tarot card of intuition, creative curiosity, gentle inspiration, and emotional wonder",
      motif: "cups-page",
    },
  },
  {
    id: "card_cups_knight",
    slug: "knight-of-cups",
    number: 12,
    numeral: "KNIGHT",
    name: "Knight of Cups",
    suit: "cups",
    arcana: "minor",
    shortKeywords: ["Poetic Chivalry", "Emotional Quest", "Romantic Visionary"],
    traditionalThemes: [
      "Romantic pursuit, artistic vision, emotional eloquence, and following the heart's calling",
      "A charming emissary bearing gifts of affection, poetic truth, and sincere intention",
      "Navigating the world guided by beauty, empathy, and intuitive ideals",
      "Channeling sensitive emotions into creative offerings and devoted connection",
    ],
    reversedThemes: [
      "Moody escapism, emotional manipulation, or love-bombing that evaporates under pressure",
      "Chasing unrealistic fantasies while neglecting practical responsibilities",
      "Disillusionment when flawed human reality fails to match an idealized pedestal",
    ],
    traditionalMeaning:
      "A graceful knight clad in armor engraved with leaping fish and nocturnal currents rides a stately white steed along the banks of a winding twilight river. In his right hand he extends a glowing golden chalice, his winged ceremonial helmet symbolizing the flight of exalted imagination. The Knight of Cups represents the quest of the romantic visionary—the courageous dedication to advance toward one's emotional and creative ideals with grace, sincerity, and poetic chivalry.",
    reflectiveInterpretation:
      "The Knight of Cups arrives as an invitation to lead with your heart. Unlike colder archetypes that demand tactical detachment, this knight reminds you that vulnerability and passionate devotion are sovereign powers in their own right. Whether through an intimate connection, a creative passion project, or a cause that stirs your empathy, allow yourself to be moved. Bring your deepest longing into the physical room with unarmored grace, but remember: true chivalry follows through on the promises whispered in the moonlight.",
    reflectionPrompt:
      "What emotional dream or creative offering are you carrying, and what honest gesture of devotion can you extend to share it today?",
    practicalTakeaway:
      "Express genuine appreciation or poetic affection to someone you care about today, or dedicate an hour of undistracted focus to a creative project purely for the love of the craft.",
    image: {
      src: "/images/sanctum/tarot/knight-of-cups.webp",
      alt: "Knight of Cups — Occult ceremonial tarot card of romance, artistic vision, emotional pursuit, and poetic grace",
      motif: "cups-knight",
    },
  },
  {
    id: "card_cups_queen",
    slug: "queen-of-cups",
    number: 13,
    numeral: "QUEEN",
    name: "Queen of Cups",
    suit: "cups",
    arcana: "minor",
    shortKeywords: ["Sovereign Compassion", "Intuitive Sanctuary", "Luminous Empathy"],
    traditionalThemes: [
      "Deep empathy, intuitive mastery, unconditional presence, and psychic receptivity",
      "Holding space for raw emotional truth without absorbing another's turbulence",
      "A tranquil sanctuary where the wounded heart finds shelter and healing",
      "Tuning into subterranean currents and deciphering the symbolic language of dreams",
    ],
    reversedThemes: [
      "Emotional codependency, martyrdom, or drowning in secondhand suffering",
      "Hypersensitivity leading to emotional shut-down or moody withdrawal",
      "Spiritual bypassing or mistaking projection for genuine psychic intuition",
    ],
    traditionalMeaning:
      "Seated upon an ornate throne carved with sea nymphs, shells, and celestial serpents at the edge of a nocturnal ocean, a serene queen gazes into the depths of a closed, jeweled chalice shaped like a sacred temple. The tranquil sea mirrors the starlit sky as her flowing robes dissolve into the lapping tide. The Queen of Cups represents the zenith of emotional maturity—the sovereign who rules the realm of feeling from a place of unshakable stillness, deep empathy, and luminous psychic discernment.",
    reflectiveInterpretation:
      "The Queen of Cups embodies sovereign compassion. She does not fear the tide of complex feeling because she has explored the deepest trenches of her own psyche and emerged whole. When this archetype enters your reading, she invites you to listen beneath the surface chatter of everyday life. What does your quiet intuition report about your current circumstance? You do not need to harden your perimeter to stay safe; true emotional power lies in remaining soft, receptive, and fiercely grounded in your own truth.",
    reflectionPrompt:
      "Where is your emotional wisdom urging you to soften, and how can you hold loving space for yourself or another without absorbing their storm?",
    practicalTakeaway:
      "Create a quiet ritual of emotional check-in today: light a candle, place both hands over your heart, and ask: 'What does my emotional body need right now?' Honor the answer without rationalizing.",
    image: {
      src: "/images/sanctum/tarot/queen-of-cups.webp",
      alt: "Queen of Cups — Occult ceremonial tarot card of compassion, intuitive mastery, deep empathy, and emotional sanctuary",
      motif: "cups-queen",
    },
  },
  {
    id: "card_cups_king",
    slug: "king-of-cups",
    number: 14,
    numeral: "KING",
    name: "King of Cups",
    suit: "cups",
    arcana: "minor",
    shortKeywords: ["Anchor in the Storm", "Emotional Mastery", "Seasoned Composure"],
    traditionalThemes: [
      "Emotional stability, seasoned wisdom, diplomatic restraint, and balance under pressure",
      "Ruling over turbulent waters without being tossed by waves or storms",
      "Combining compassionate empathy with clear-headed executive discernment",
      "Navigating complex crises with steady calm and principled composure",
    ],
    reversedThemes: [
      "Emotional volatility, cold repression, or explosive outbursts masked as authority",
      "Passive-aggressive manipulation or using emotional vulnerability as leverage",
      "Detached stoicism that denies genuine feeling out of fear of losing control",
    ],
    traditionalMeaning:
      "Upon a stone throne floating steadily amid a surging sea, a seasoned sovereign sits crowned with celestial gold, holding a glowing scepter in one hand and a sacred chalice in the other. Across the stormy water behind him, a diving dolphin and a ship ride the swelling waves unharmed. The King of Cups represents the pinnacle of emotional mastery—the leader whose inner compass remains steadfast regardless of the turbulence churning across the outer sea.",
    reflectiveInterpretation:
      "The King of Cups is the anchor in the storm. Life may be tossing chaotic demands, intense personalities, or acute friction your way, but you have the power to choose your response rather than reacting impulsively. This king does not suppress emotion; he feels it fully and channels it into measured, principled action. When tempers flare or panic rises in your environment, step into his quiet sovereignty. Be the calm center of gravity that others can trust to hold the line.",
    reflectionPrompt:
      "What external chaos or emotional storm is testing your composure, and how can you anchor yourself as the steady sovereign of your space?",
    practicalTakeaway:
      "When friction or reactivity arises today, take three deep belly breaths before speaking. Respond with measured calm, firm boundaries, and seasoned perspective.",
    image: {
      src: "/images/sanctum/tarot/king-of-cups.webp",
      alt: "King of Cups — Occult ceremonial tarot card of emotional maturity, calm leadership, seasoned wisdom, and sovereignty",
      motif: "cups-king",
    },
  },
  {
    id: "card_swords_ace",
    slug: "ace-of-swords",
    number: 1,
    numeral: "ACE",
    name: "Ace of Swords",
    suit: "swords",
    arcana: "minor",
    shortKeywords: ["Piercing Truth", "Mental Breakthrough", "Decisive Clarity"],
    traditionalThemes: [
      "Sudden clarity, razor-sharp discernment, cutting through delusion, and new intellectual breakthroughs",
      "The pure elemental force of Air slicing away ambiguity and confusion",
      "Unyielding truth spoken with authority and sovereign precision",
      "A decisive realization that fundamentally alters your understanding of reality",
    ],
    reversedThemes: [
      "Weaponized intellect, brutal bluntness, or intellectual cruelty",
      "Mental chaos, obsessive overthinking, or confusion clouding judgment",
      "Using harsh logic to rationalize emotional detachment or cruelty",
    ],
    traditionalMeaning:
      "An ethereal celestial arm emerges from nocturnal clouds holding an upright, double-edged blade gleaming with cold silver fire. Crowning the sword is a radiant golden wreath entwined with olive and palm leaves, beneath which fall six droplets of celestial luminescence. Above, the nocturnal expanse is clear and sharp with distant stars. The Ace of Swords represents the pure seed of the Air element—uncompromising mental clarity, the sudden breakthrough that cuts through deception, and the sovereign power of objective truth.",
    reflectiveInterpretation:
      "The Ace of Swords cuts through the fog of hesitation and rationalization. When this archetype emerges, it demands unadorned honesty with yourself. The comfortable illusions that previously cushioned your indecision are cleaved away, leaving the stark, crystalline ground truth exposed. This is not a weapon of malice, but a surgical instrument of liberation: once you clearly name the reality before you, you can no longer pretend not to see it.",
    reflectionPrompt:
      "What uncomfortable truth are you finally seeing with sharp clarity, and what decisive choice does that truth require of you?",
    practicalTakeaway:
      "Write down the single most honest, unvarnished sentence describing your current challenge. Strip away qualifiers, excuses, and diplomatic softening.",
    image: {
      src: "/images/sanctum/tarot/ace-of-swords.webp",
      alt: "Ace of Swords — Occult ceremonial tarot card of mental clarity, sharp discernment, truth, and breakthrough",
      motif: "swords-ace",
    },
  },
  {
    id: "card_swords_two",
    slug: "two-of-swords",
    number: 2,
    numeral: "II",
    name: "Two of Swords",
    suit: "swords",
    arcana: "minor",
    shortKeywords: ["Blindfolded Stalemate", "Crossed Blades", "Tense Equilibrium"],
    traditionalThemes: [
      "Indecision, difficult choices, mental stalemate, and emotional defense",
      "Holding two opposing realities in suspended tension to avoid the fallout of choosing",
      "Protecting the heart behind a barrier of cold analytical neutrality",
      "The temporary safety—and ultimate paralysis—of deliberate ignorance",
    ],
    reversedThemes: [
      "Information overload forcing a messy, uncontrolled breakthrough",
      "The defensive wall crumbling before you are prepared to face reality",
      "Reckless decision-making triggered by the agony of lingering in suspense",
    ],
    traditionalMeaning:
      "A blindfolded practitioner clad in gray and obsidian vestments sits upon a square stone bench at the edge of a nocturnal sea. Across her chest she holds two heavy, gleaming broadswords crossed in rigorous symmetry. Behind her, rocky crags pierce calm waters beneath a waxing crescent moon. The Two of Swords portrays a deliberate truce—a conscious choice to blind oneself to external stimulation while balancing two irreconcilable demands in precarious equilibrium.",
    reflectiveInterpretation:
      "The Two of Swords reflects a stalemate of your own making. You may believe you need more information before choosing, but in truth, you already know what each choice demands—and you dread the consequences of making either one. Crossing your blades protects your heart from exposure, but holding this posture requires immense muscular tension. The blindfold cannot remain forever; at some point, the sea will rise, and deliberate ignorance will cost more than a difficult choice.",
    reflectionPrompt:
      "Which two competing truths are you attempting to balance, and what choice are you postponing out of fear of its consequences?",
    practicalTakeaway:
      "Lower your arms and name the choice directly. Flip a coin—not to obey the outcome, but to notice whether your gut feels relief or disappointment when it lands.",
    image: {
      src: "/images/sanctum/tarot/two-of-swords.webp",
      alt: "Two of Swords — Occult ceremonial tarot card of stalemate, difficult choices, balanced blades, and indecision",
      motif: "swords-two",
    },
  },
  {
    id: "card_swords_three",
    slug: "three-of-swords",
    number: 3,
    numeral: "III",
    name: "Three of Swords",
    suit: "swords",
    arcana: "minor",
    shortKeywords: ["Shattered Illusion", "The Pierced Heart", "Cleansing Release"],
    traditionalThemes: [
      "Heartbreak, sorrow, piercing truth, emotional release, and grief",
      "The acute agony when reality shatters a cherished expectation or trust",
      "A wound delivered by cold facts, harsh words, or unavoidable separation",
      "The storm that clears poisoned air, initiating necessary emotional cleansing",
    ],
    reversedThemes: [
      "Reliving past wounds endlessly or picking at scabbed betrayals",
      "Repressing acute grief beneath cynical detachment, poisoning the emotional well",
      "Gradual recovery as the blades are gently withdrawn from the heart",
    ],
    traditionalMeaning:
      "Against a tempestuous sky torn by driving rain and lightning, three silver swords pierce through a radiant, glowing heart suspended in mid-air. Heavy storm clouds churn around the altar, yet the torrential downpour cleanses the scorched stone below. The Three of Swords represents the painful convergence of heart and mind—the visceral sting when an unavoidable truth strikes to the core, clearing illusions through an inevitable emotional storm.",
    reflectiveInterpretation:
      "The Three of Swords does not sugarcoat the sting of reality. When words wound, betrayals surface, or an illusion collapses, the pain is real and deserves solemn dignity. Do not attempt to bypass this ache with hollow platitudes or rushed intellectual rationalization. The swords pierce deeply, but they also puncture the abscess of false hope, releasing what had been secretly rotting. Let the storm rain down; the downpour that breaks your heart will ultimately cleanse your vision.",
    reflectionPrompt:
      "What painful truth has recently pierced through your defenses, and what grief do you need to allow yourself to feel without judgment?",
    practicalTakeaway:
      "Allow yourself fifteen minutes of unreserved release—cry, write an unsent letter detailing the raw hurt, and then burn or shred the paper to release the blade.",
    image: {
      src: "/images/sanctum/tarot/three-of-swords.webp",
      alt: "Three of Swords — Occult ceremonial tarot card of heartbreak, piercing truth, sorrow, and storm cleansing",
      motif: "swords-three",
    },
  },
  {
    id: "card_swords_four",
    slug: "four-of-swords",
    number: 4,
    numeral: "IV",
    name: "Four of Swords",
    suit: "swords",
    arcana: "minor",
    shortKeywords: ["Sanctuary of Silence", "Mental Convalescence", "Sacred Truce"],
    traditionalThemes: [
      "Rest, recovery, meditation, sanctuary, and mental convalescence",
      "Stepping off the battlefield to allow nervous system restoration",
      "Withdrawing from debate, conflict, and decision-making into protective silence",
      "Replenishing depleted intellectual reserves before re-entering the arena",
    ],
    reversedThemes: [
      "Prematurely rushing back into chaos before healing is complete",
      "Burnout caused by refusing to acknowledge mental exhaustion",
      "Using isolation as permanent avoidance rather than temporary restoration",
    ],
    traditionalMeaning:
      "Within the quiet stone alcove of a secluded sanctuary, an armored effigy lies peacefully in repose upon an ancient sarcophagus, hands folded in contemplative prayer. Three swords hang blade-down along the stained glass wall above, while a fourth sword rests horizontally beneath the figure. Soft candlelight filters through celestial glass. The Four of Swords represents the sacred necessity of convalescence—laying down arms to let the mind heal in stillness.",
    reflectiveInterpretation:
      "The Four of Swords orders an immediate cease-fire. You have been fighting, planning, defending, or enduring high cognitive strain for too long without replenishing your reserves. You cannot think your way through nervous exhaustion; the intellect will only produce distorted conclusions when running on fumes. Sheathe your blades, step off the field of battle, and enter sanctuary. Rest is not surrender—it is the tactical maintenance that preserves your competence.",
    reflectionPrompt:
      "Where is mental fatigue or conflict wearing down your reserves, and how can you enforce a non-negotiable pocket of silence today?",
    practicalTakeaway:
      "Schedule a strict mental sabbath today: silence all non-essential notifications, step away from argumentative arenas, and take an hour of undisturbed horizontal rest.",
    image: {
      src: "/images/sanctum/tarot/four-of-swords.webp",
      alt: "Four of Swords — Occult ceremonial tarot card of rest, recovery, sanctuary, and mental restoration",
      motif: "swords-four",
    },
  },
  {
    id: "card_swords_five",
    slug: "five-of-swords",
    number: 5,
    numeral: "V",
    name: "Five of Swords",
    suit: "swords",
    arcana: "minor",
    shortKeywords: ["Hollow Victory", "Battlefield Reckoning", "Severed Alliances"],
    traditionalThemes: [
      "Conflict, hollow triumph, ego-driven battle, tension, and collateral damage",
      "Winning the argument while destroying the relationship or common cause",
      "Confronting petty malice, hostility, betrayal, or zero-sum dynamics",
      "Recognizing when victory costs more than walking away",
    ],
    reversedThemes: [
      "Lingering resentment and vindictiveness poisoning future interactions",
      "Desire to make amends after an ugly dispute or stepping back from toxic skirmishes",
      "Recognizing the exhaustion of perpetual warfare and surrendering pride for peace",
    ],
    traditionalMeaning:
      "A victor stands smirk-faced upon a blustery hill beneath ragged, turbulent clouds, clutching three swords over one shoulder while two more lie abandoned at his feet. In the distance, two vanquished figures walk away toward a turbulent shoreline with bowed heads. The Five of Swords depicts the bitter taste of hollow victory—the realization that dominating an opponent through brute ego or sharp cruelty leaves you triumphant, yet fundamentally isolated in ruins.",
    reflectiveInterpretation:
      "The Five of Swords diagnoses conflict driven by pride, spite, or the compulsive need to prove yourself right at all costs. Winning a debate, scoring a verbal strike, or enforcing your dominance might gratify the ego in the moment, but take a ruthless look at the wreckage around you. Who did you alienate? What goodwill was permanently burned? Some battles are simply not worth winning; true mastery knows when to sheath the blade and walk away from small-minded skirmishes.",
    reflectionPrompt:
      "Are you fighting to resolve a problem or merely fighting to be right, and what will your 'victory' actually cost you?",
    practicalTakeaway:
      "Step back from an active dispute or petty argument today. Refuse to take the bait, decline to send the biting comeback, and choose peace over vindication.",
    image: {
      src: "/images/sanctum/tarot/five-of-swords.webp",
      alt: "Five of Swords — Occult ceremonial tarot card of conflict, hollow victory, tension, and severed alliances",
      motif: "swords-five",
    },
  },
  {
    id: "card_swords_six",
    slug: "six-of-swords",
    number: 6,
    numeral: "VI",
    name: "Six of Swords",
    suit: "swords",
    arcana: "minor",
    shortKeywords: ["Rupture Behind", "Nocturnal Crossing", "Quiet Recovery"],
    traditionalThemes: [
      "Transition, necessary departure, recovery after turmoil, and navigating toward calmer waters",
      "Carrying essential baggage while leaving behind acute battlefield friction",
      "A journey of quiet healing guided by objective perspective",
      "Moving from mental agitation into measured stillness and gradual restoration",
    ],
    reversedThemes: [
      "Unresolved baggage sabotaging new horizons or emotional turbulence resurfacing",
      "Refusing to move forward out of stubborn loyalty to old wounds",
      "Stalled transitions or feeling adrift without a clear navigational compass",
    ],
    traditionalMeaning:
      "A cloaked ferryman steers a wooden barge across a tranquil body of water beneath a nocturnal sky toward a distant, peaceful shore. In the vessel, two huddled figures sit quietly amid six upright swords embedded securely into the hull, their blades pointing downward into the wood without piercing the bottom. The waters beside the boat ripple with receding wake, while ahead the surface is glass-calm. The Six of Swords depicts a solemn, deliberate passage—the crossing from acute mental turmoil into calmer waters, where healing can finally take root.",
    reflectiveInterpretation:
      "The Six of Swords marks the quiet threshold between surviving the storm and beginning to heal. You may still carry the scars, the sorrow, and the exhaustion of what transpired, but the worst of the crisis is behind you. This is not a triumphant voyage with celebratory fanfare; it is a somber, necessary relocation of your energy toward safety. Do not rush your recovery or attempt to unpack all your grief while you are still in mid-crossing. Keep your hands steady, let the waters carry you, and trust that calm shores are waiting ahead.",
    reflectionPrompt:
      "What battlefield or toxic dynamic have you recently walked away from, and what permission do you need to give yourself to quietly rest during this crossing?",
    practicalTakeaway:
      "Take one deliberate action to create physical or mental distance from an unresolved stressor today—decline to re-enter a finished dispute and protect your peace.",
    image: {
      src: "/images/sanctum/tarot/six-of-swords.webp",
      alt: "Six of Swords — Occult ceremonial tarot card of transition, recovery, quiet crossing, and moving forward",
      motif: "swords-six",
    },
  },
  {
    id: "card_swords_seven",
    slug: "seven-of-swords",
    number: 7,
    numeral: "VII",
    name: "Seven of Swords",
    suit: "swords",
    arcana: "minor",
    shortKeywords: ["Tactical Stealth", "Strategic Autonomy", "Guarded Maneuver"],
    traditionalThemes: [
      "Strategy, tactical cunning, stealth, independence, and unconventional solutions",
      "Outmaneuvering a rigid system or adversary through intellect rather than brute force",
      "Guarding your plans quietly and withholding your hand until the moment is right",
      "The fine line between necessary self-preservation and deceitful evasion",
    ],
    reversedThemes: [
      "Being caught in a deception or having a covert scheme exposed",
      "Imposter syndrome, guilt, or confessing secrets to restore integrity",
      "Sloppy execution of a clandestine plan causing collateral damage",
    ],
    traditionalMeaning:
      "A cloaked practitioner tiptoes away from a military camp under the cover of a crescent moon, carrying five gleaming swords in his arms while glancing back over his shoulder at two swords still planted firmly in the earth outside the pavilions. The nocturnal camp sleeps unaware. The Seven of Swords illustrates strategic agility—the sovereign art of taking what is necessary for your survival and slipping away unnoticed, operating by your own wits when direct confrontation would result in defeat.",
    reflectiveInterpretation:
      "The Seven of Swords acknowledges that conventional, head-on confrontation is not always the wisest tactic. Sometimes, survival and self-preservation demand stealth, strategic discretion, and quiet maneuvering. You do not owe full transparency to people or institutions that do not respect your perimeter. Work behind the scenes, keep your counsel private, and gather what you need to protect your future. However, maintain a strict moral boundary: use strategy to secure your freedom, never to manipulate or exploit the innocent.",
    reflectionPrompt:
      "Where in your life is quiet discretion and independent strategy far more effective than public debate or direct confrontation?",
    practicalTakeaway:
      "Keep your next key move completely private today. Refrain from announcing your plans, seeking premature validation, or sharing drafts before they are secured.",
    image: {
      src: "/images/sanctum/tarot/seven-of-swords.webp",
      alt: "Seven of Swords — Occult ceremonial tarot card of strategy, tactical stealth, independence, and calculated maneuvers",
      motif: "swords-seven",
    },
  },
  {
    id: "card_swords_eight",
    slug: "eight-of-swords",
    number: 8,
    numeral: "VIII",
    name: "Eight of Swords",
    suit: "swords",
    arcana: "minor",
    shortKeywords: ["Self-Imposed Enclosure", "Illusion of Confinement", "Untying the Mind"],
    traditionalThemes: [
      "Mental restriction, feeling trapped, limiting self-beliefs, and perceived helplessness",
      "Imprisonment constructed primarily out of anxious thoughts and feared consequences",
      "Standing paralyzed in a ring of blades while the bindings remain loose enough to slip off",
      "The courageous awakening required to dismantle the cage you built around yourself",
    ],
    reversedThemes: [
      "Breaking free from mental paralysis, seeing past limiting narratives, and taking first steps",
      "Accepting responsibility for your own agency rather than blaming external captors",
      "Lingering fear as you step through the open boundary into unfamiliar freedom",
    ],
    traditionalMeaning:
      "A blindfolded figure bound loosely with crimson cords stands in muddy marshland surrounded by an enclosure of eight upright broadswords planted firmly in the earth. Water pools around her bare feet, yet an open path leads directly behind her toward high ground and a distant castle. The bindings are loose, and no guard stands watch. The Eight of Swords depicts the psychology of confinement—how fear, trauma conditioning, and distorted narratives construct an impenetrable fortress out of mere shadows.",
    reflectiveInterpretation:
      "The Eight of Swords holds up a mirror to the stories you tell yourself about what you 'cannot' do. You may feel cornered, silenced, or trapped by circumstance, but examine your cage closely: who tied the knots? Who planted the blades? Often, we stay frozen in painful situations because familiar confinement feels safer than the terrifying responsibility of freedom. The cords around your wrists are loose, the swords do not touch your flesh, and the path behind you is open. Shake off the blindfold and take a step.",
    reflectionPrompt:
      "What self-limiting belief or catastrophic assumption is keeping you paralyzed, and what simple truth dismantles the illusion of your helplessness?",
    practicalTakeaway:
      "Name the single biggest barrier you feel trapped by. Challenge it directly by asking: 'If I was 10% braver today, what obvious action would I take right now?' Then take it.",
    image: {
      src: "/images/sanctum/tarot/eight-of-swords.webp",
      alt: "Eight of Swords — Occult ceremonial tarot card of mental restriction, perceived confinement, and breaking free from illusion",
      motif: "swords-eight",
    },
  },
  {
    id: "card_swords_nine",
    slug: "nine-of-swords",
    number: 9,
    numeral: "IX",
    name: "Nine of Swords",
    suit: "swords",
    arcana: "minor",
    shortKeywords: ["Midnight Crucible", "The Weight of Guilt", "Dawn Beyond Anguish"],
    traditionalThemes: [
      "Anxiety, insomnia, nightmare spirals, guilt, and the torment of 3:00 AM thoughts",
      "The mind turning inward against itself, magnifying worst-case scenarios in the dark",
      "Acute mental anguish that feels overwhelming yet exists almost entirely in anticipation",
      "Recognizing that nocturnal panic always dissolves when exposed to the clear light of dawn",
    ],
    reversedThemes: [
      "Reaching out for help during mental crisis, the gradual lifting of panic, and emotional relief",
      "Chronic insomnia and despair eroding physical health if left unaddressed",
      "Learning to calm nervous system spirals through grounding rituals and mundane reality",
    ],
    traditionalMeaning:
      "A figure sits bolt upright in a carved wooden bed beneath a midnight-black wall upon which nine horizontal broadswords hang in stark, threatening alignment. The figure clutches their face in their hands, weeping in anguish as night terrors and racing thoughts overwhelm the room. The quilt draped across the bed is embroidered with celestial roses and astrological glyphs. The Nine of Swords depicts the solitary crucible of mental torment—the nocturnal tempest where anxiety manufactures unbearable monsters from unresolved fears.",
    reflectiveInterpretation:
      "The Nine of Swords speaks directly to the terror of the midnight hours. When sleep eludes you and catastrophic thoughts echo through your head, every problem feels insurmountable and every mistake feels fatal. Do not negotiate with your mind at three in the morning. When your nervous system is in terror, logic is hijacked. Remind yourself: feelings are real, but catastrophic thoughts are not facts. Put your feet on the cold floor, breathe slowly into your belly, and wait for dawn. The sun will rise, and reality will prove far more manageable than your nightmares.",
    reflectionPrompt:
      "What recurring fear or guilt is keeping you awake at night, and what would happen if you brought that fear into the daylight and examined it objectively?",
    practicalTakeaway:
      "When nocturnal worry strikes, do not remain tossing in bed: turn on a dim lamp, write down every raw fear onto paper to get it out of your body, drink a glass of water, and ground your bare feet on the floor.",
    image: {
      src: "/images/sanctum/tarot/nine-of-swords.webp",
      alt: "Nine of Swords — Occult ceremonial tarot card of anxiety, insomnia, mental anguish, and morning release",
      motif: "swords-nine",
    },
  },
  {
    id: "card_swords_ten",
    slug: "ten-of-swords",
    number: 10,
    numeral: "X",
    name: "Ten of Swords",
    suit: "swords",
    arcana: "minor",
    shortKeywords: ["The Final Rupture", "Bottoming Out", "The First Glimmer of Dawn"],
    traditionalThemes: [
      "Painful endings, betrayal, rock bottom, unavoidable finality, and release from struggle",
      "The absolute culmination of mental conflict where nothing further can be lost",
      "Accepting that a chapter, dynamic, or illusion is utterly dead and cannot be resuscitated",
      "The golden dawn breaking along the horizon as the darkest hour concludes",
    ],
    reversedThemes: [
      "Slow recovery from devastating collapse, surviving the worst, and rising from the ashes",
      "Refusing to accept a finished conclusion or picking at wounds of past betrayals",
      "Fear of ruins preventing you from seeing the fresh ground cleared for rebuilding",
    ],
    traditionalMeaning:
      "A figure lies prone upon a desolate stone shoreline, draped in a crimson shroud, with ten silver broadswords driven along the spine into the ground. Beyond the dark expanse of black water and heavy nocturnal clouds, a brilliant strip of golden sunlight illuminates the horizon, heralding the unavoidable arrival of a new dawn. The Ten of Swords portrays the dramatic, undeniable end of a grueling cycle—the moment when the struggle ceases because there is simply nothing left to fight.",
    reflectiveInterpretation:
      "The Ten of Swords marks absolute finality. Whatever battle you have been fighting, whatever relationship or venture has been slowly deteriorating, the collapse is now complete. There is a strange, profound relief in hitting the bottom: the suspense is over, the worst has happened, and you survived it. Do not waste precious energy trying to reanimate a corpse. The swords have fallen; the struggle is done. Lie still for a moment, let your tears wash the wound clean, and notice the golden light on the horizon. The only direction left from here is up.",
    reflectionPrompt:
      "What battle or dead situation is truly, unequivocally finished, and what burden can you finally set down now that there is nothing left to defend?",
    practicalTakeaway:
      "Officially declare closure today: throw away a physical reminder of a finished battle, block an exhausting line of communication, and take a long, deep breath of sovereign freedom.",
    image: {
      src: "/images/sanctum/tarot/ten-of-swords.webp",
      alt: "Ten of Swords — Occult ceremonial tarot card of painful endings, rock bottom, finality, and dawn on the horizon",
      motif: "swords-ten",
    },
  },
  {
    id: "card_swords_page",
    slug: "page-of-swords",
    number: 11,
    numeral: "PAGE",
    name: "Page of Swords",
    suit: "swords",
    arcana: "minor",
    shortKeywords: ["Vigilant Mind", "Inquisitive Spark", "Uncompromising Discernment"],
    traditionalThemes: [
      "Curiosity, sharp intellect, vigilance, active observation, and eager communication",
      "Approaching the world with a detective's eye and an insatiable desire to understand truth",
      "Testing boundaries, asking probing questions, and gathering intelligence",
      "The energetic spark of youthful intellectual courage ready to speak truth to power",
    ],
    reversedThemes: [
      "Snoopiness, gossip, paranoia, or defensive aggression when challenged",
      "All talk and no action, intellectual arrogance, or biting cynicism",
      "Blunt, tactless speech that burns relationships without solving problems",
    ],
    traditionalMeaning:
      "A youthful mystic clad in aerodynamic violet and slate robes stands poised upon a rocky crag, holding an upright sword firmly in both hands while surveying the wind-swept horizon. Ragged clouds scud across the nocturnal sky as a flock of birds wheels overhead, yet the Page's gaze is fierce, alert, and unwavering. The Page of Swords represents the awakening of intellectual vigilance—the spirited readiness to seek truth, investigate anomalies, and challenge dogma with fearless curiosity.",
    reflectiveInterpretation:
      "The Page of Swords brings the restless energy of an inquisitive intellect. You are scanning your horizon, picking up on discrepancies, and asking questions that others may prefer to avoid. Do not apologize for your curiosity or your sharp eye for detail. However, remember the difference between vigilant discernment and paranoid suspicion: use your mental agility to uncover reality and sharpen your skills, rather than seeking out offenses or picking unnecessary intellectual fights.",
    reflectionPrompt:
      "What situation are you observing with heightened vigilance, and what honest question needs to be asked before you proceed?",
    practicalTakeaway:
      "Research one crucial detail or fact you feel uncertain about today. Ask the direct question you've been dancing around, and write down the exact answer without assumption.",
    image: {
      src: "/images/sanctum/tarot/page-of-swords.webp",
      alt: "Page of Swords — Occult ceremonial tarot card of curiosity, vigilance, intellectual spark, and fearless questioning",
      motif: "swords-page",
    },
  },
  {
    id: "card_swords_knight",
    slug: "knight-of-swords",
    number: 12,
    numeral: "KNIGHT",
    name: "Knight of Swords",
    suit: "swords",
    arcana: "minor",
    shortKeywords: ["Fierce Velocity", "Relentless Resolve", "Decisive Charge"],
    traditionalThemes: [
      "Ambition, determination, high-velocity action, razor-sharp focus, and rapid execution",
      "Charging directly into the fray with unshakeable conviction and intellectual force",
      "Cutting through red tape, dithering, and hesitation to accomplish an urgent objective",
      "Championing a principled cause with fearless, uncompromising momentum",
    ],
    reversedThemes: [
      "Reckless aggression, impatience, steamrolling over others, and intellectual arrogance",
      "Charging blindly into conflict without assessing risks or situational terrain",
      "Burnout caused by running at full throttle without tactical patience",
    ],
    traditionalMeaning:
      "A fierce warrior in gleaming ceremonial armor charges forward on a powerful galloping warhorse across a stormy, wind-swept plain. With cloak streaming behind him like wings, he thrusts an unsheathed broadsword high into the tempestuous sky, riding directly into the heart of the gale without hesitation. The Knight of Swords embodies unstoppable intellectual drive—the pure, concentrated velocity of a mind fully committed to executing its will regardless of the obstacles in its path.",
    reflectiveInterpretation:
      "The Knight of Swords signals that the era of passive contemplation has ended; speed, conviction, and decisive execution are now required. When this archetype charges into your life, you are called to cut through excuses, silence second-guessing, and strike toward your objective with uncompromising focus. Back your ideas with fierce courage. Just ensure your blade is aimed at the true target, rather than mowing down allies in your haste to arrive.",
    reflectionPrompt:
      "Where has overthinking or diplomacy stalled necessary progress, and what bold, decisive action are you prepared to execute today?",
    practicalTakeaway:
      "Execute one difficult, delayed task with absolute focus today: make the high-stakes phone call, hit send on the crucial proposal, or confront the obstacle directly.",
    image: {
      src: "/images/sanctum/tarot/knight-of-swords.webp",
      alt: "Knight of Swords — Occult ceremonial tarot card of ambition, swift execution, determination, and intellectual force",
      motif: "swords-knight",
    },
  },
  {
    id: "card_swords_queen",
    slug: "queen-of-swords",
    number: 13,
    numeral: "QUEEN",
    name: "Queen of Swords",
    suit: "swords",
    arcana: "minor",
    shortKeywords: ["Sovereign Discernment", "The Clear Mirror", "Uncompromising Candor"],
    traditionalThemes: [
      "Perceptive discernment, intellectual sovereignty, emotional boundaries, and radical honesty",
      "Seeing straight through flattery, manipulation, and self-deception with piercing clarity",
      "A leader who has weathered profound grief and emerged with wisdom, wit, and dignity",
      "Setting clear, uncompromising boundaries with absolute composure and zero apology",
    ],
    reversedThemes: [
      "Cold, bitter cynicism, emotional numbness, or cruel hyper-critical judgment",
      "Using intellectual sharpness to insulate yourself from intimacy and warmth",
      "Holding past betrayals as a permanent grudge against all humanity",
    ],
    traditionalMeaning:
      "A dignified queen sits in profile upon an intricately carved marble throne adorned with winged cherubs and celestial butterflies, holding an upright broadsword in her right hand while extending her left palm in an open, authoritative gesture. Above her, high cirrus clouds drift across a crystalline indigo sky. Her gaze is penetrating, calm, and sorrow-tested. The Queen of Swords represents the mastery of mental sovereignty—the sovereign who perceives truth without delusion, protects her perimeter with dignity, and speaks candidly without malice.",
    reflectiveInterpretation:
      "The Queen of Swords is the patron of radical clarity. She has lived through betrayal and sorrow, yet she refused to let pain make her bitter; instead, she transformed it into razor-sharp discernment. When this queen enters your reading, she invites you to clear the emotional smog from your decision-making. Stop tiptoeing around people who do not respect your boundaries. Extend your open hand in fairness, hold your sword upright in sovereignty, and say exactly what you mean.",
    reflectionPrompt:
      "Where have you been softening the truth to avoid discomfort, and what boundary do you need to enforce with clear, calm authority?",
    practicalTakeaway:
      "Communicate one clear, unambiguous boundary today. State what you will and will not accept, calmly and without lengthy justifications.",
    image: {
      src: "/images/sanctum/tarot/queen-of-swords.webp",
      alt: "Queen of Swords — Occult ceremonial tarot card of discernment, radical honesty, boundaries, and intellectual sovereignty",
      motif: "swords-queen",
    },
  },
  {
    id: "card_swords_king",
    slug: "king-of-swords",
    number: 14,
    numeral: "KING",
    name: "King of Swords",
    suit: "swords",
    arcana: "minor",
    shortKeywords: ["Architect of Truth", "Judicious Authority", "Principled Governance"],
    traditionalThemes: [
      "Intellectual authority, judicial wisdom, disciplined logic, and principled governance",
      "Ruling with objective fairness, strategic foresight, and unwavering ethical standards",
      "Severing personal bias and emotional reactivity to render impartial decisions",
      "Mastery of language, law, strategy, and systems architecture",
    ],
    reversedThemes: [
      "Autocratic tyranny, cold cruelty, intellectual arrogance, and rigid dogmatism",
      "Using superior intelligence to manipulate, humiliate, or control others",
      "Judgment devoid of mercy, alienating everyone in pursuit of clinical correctness",
    ],
    traditionalMeaning:
      "Upon a tall stone throne flanked by carved serpents and crescent moons, a commanding monarch sits facing forward with crown aloft, holding an upright double-edged broadsword tilted slightly in his right hand. His indigo robes are draped with an ermine collar and purple mantle. The sky behind him is calm and unclouded. The King of Swords embodies the apex of mental authority—the judge, strategist, and executive whose decisions are governed by rigorous intellect, ethical duty, and unswerving adherence to truth.",
    reflectiveInterpretation:
      "The King of Swords commands you to step into intellectual leadership. In times of confusion, panic, or emotional chaos, a community or project desperately needs someone who can look at the facts objectively, weigh the evidence without bias, and chart a principled course forward. This king does not govern by emotional whim; he governs by proven principles and strategic clarity. Check your emotions at the door of your deliberation chamber, evaluate the reality before you, and render your verdict with steady authority.",
    reflectionPrompt:
      "What complex situation requires you to put aside emotional reactivity and evaluate the facts with clinical, principled objectivity?",
    practicalTakeaway:
      "Make an executive decision on a matter you've been vacillating on. Write out the pros, cons, and ethical imperatives, choose the most principled path, and commit to enforcing it.",
    image: {
      src: "/images/sanctum/tarot/king-of-swords.webp",
      alt: "King of Swords — Occult ceremonial tarot card of intellectual authority, principled governance, clarity, and strategic leadership",
      motif: "swords-king",
    },
  },
  {
    id: "card_pentacles_ace",
    slug: "ace-of-pentacles",
    number: 1,
    numeral: "ACE",
    name: "Ace of Pentacles",
    suit: "pentacles",
    arcana: "minor",
    shortKeywords: ["Seed of Prosperity", "Tangible Foundation", "The Golden Threshold"],
    traditionalThemes: [
      "New financial opportunity, tangible beginnings, material prosperity, and grounded growth",
      "The primal root of the Earth element offering physical abundance and security",
      "Planting a seed that will compound into lasting real-world security",
      "Practical manifestation enacted through dedicated discipline and patience",
    ],
    reversedThemes: [
      "Missed financial opportunity, poor planning, or squandering initial capital",
      "Greed, short-sighted speculation, or expecting wealth without doing the foundational labor",
      "Delays in physical manifestation due to ungrounded or unrealistic execution",
    ],
    traditionalMeaning:
      "An ethereal celestial arm emerges from nocturnal clouds holding an enormous golden pentacle engraved with sacred pentagram geometries, glowing with warm celestial light. Below, a lush garden blooming with lilies and roses is enclosed by a stone wall with an arched doorway leading toward distant, sunlit mountains. The Ace of Pentacles represents the seed of the Earth element—the arrival of concrete, real-world opportunity, the gift of physical well-being, and the foundation upon which enduring wealth and stability are built.",
    reflectiveInterpretation:
      "The Ace of Pentacles places a tangible golden coin directly into your hand. This is not a vague promise of spiritual enlightenment or emotional inspiration; it is concrete, mundane opportunity knocking at your door—a new job, a profitable venture, a health turnaround, or a physical investment. The gift is real, but remember: a seed only flourishes if it is planted in nutrient-rich soil and tended with daily labor. Welcome this practical blessing, honor its physical reality, and commit to the disciplined work required to help it grow.",
    reflectionPrompt:
      "What concrete, tangible opportunity is presenting itself to you, and what grounded routine or investment will allow it to take deep root?",
    practicalTakeaway:
      "Take one concrete step to plant this seed today: deposit funds into savings, buy the raw material, register the domain, or make one physical improvement to your workspace.",
    image: {
      src: "/images/sanctum/tarot/ace-of-pentacles.webp",
      alt: "Ace of Pentacles — Occult ceremonial tarot card of opportunity, material prosperity, tangible beginnings, and financial stability",
      motif: "pentacles-ace",
    },
  },
  {
    id: "card_pentacles_two",
    slug: "two-of-pentacles",
    number: 2,
    numeral: "II",
    name: "Two of Pentacles",
    suit: "pentacles",
    arcana: "minor",
    shortKeywords: ["Dynamic Equilibrium", "Juggling Currents", "Fluid Prioritization"],
    traditionalThemes: [
      "Balance, adaptability, multitasking, and managing fluctuating resources",
      "Navigating competing demands with nimble grace and flexibility",
      "The ongoing rhythm of investment and return, ebb and flow",
      "Holding equilibrium while standing on shifting ground",
    ],
    reversedThemes: [
      "Overcommitment, dropping critical balls, or financial disorganization",
      "Feeling overwhelmed by too many spinning plates or chaotic scheduling",
      "Clinging to a rigid plan when circumstances require agile maneuvering",
    ],
    traditionalMeaning:
      "A nimble practitioner stands upon a rocky shore balancing two glowing, engraved pentacles within an endless lemniscate ribbon of luminous violet silk. In the turbulent sea behind them, two ships ride the crests of rolling waves with steady composure. The Two of Pentacles captures the art of dynamic equilibrium—the understanding that balance in the physical world is never static stillness, but a continuous, agile dance with changing realities.",
    reflectiveInterpretation:
      "The Two of Pentacles acknowledges that your life is currently demanding dexterity. You are managing multiple commitments, budgets, or shifting priorities, and trying to freeze reality into a perfect schedule will only cause strain. The magic of this archetype lies in fluidity: bend your knees, anticipate the next wave, and don't take every wobble as failure. As long as you stay present in the dance, you have the agility to keep what truly matters aloft.",
    reflectionPrompt:
      "Which competing priorities are stretching your attention right now, and what non-essential task can you set down to regain your balance?",
    practicalTakeaway:
      "Audit your daily plate: identify your two non-negotiable obligations for today, and consciously defer or delegate one tertiary task.",
    image: {
      src: "/images/sanctum/tarot/two-of-pentacles.webp",
      alt: "Two of Pentacles — Occult ceremonial tarot card of balance, adaptability, shifting priorities, and dynamic equilibrium",
      motif: "pentacles-two",
    },
  },
  {
    id: "card_pentacles_three",
    slug: "three-of-pentacles",
    number: 3,
    numeral: "III",
    name: "Three of Pentacles",
    suit: "pentacles",
    arcana: "minor",
    shortKeywords: ["Master Craftsmanship", "Allied Construction", "Architectural Mastery"],
    traditionalThemes: [
      "Collaboration, skilled craftsmanship, collective labor, and shared mastery",
      "Building an enduring physical foundation through coordinated expertise",
      "Having your competence recognized and valued by respected peers",
      "The dedication to refining raw material into enduring excellence",
    ],
    reversedThemes: [
      "Misaligned collaboration, ego clashes, or lack of shared standards",
      "Sloppy workmanship, cutting corners, or ignoring foundational blueprints",
      "Feeling unappreciated or working in isolation without constructive feedback",
    ],
    traditionalMeaning:
      "Within the grand stone archway of an ancient ceremonial chamber, a stonecarver stands upon a wooden bench holding hammer and chisel, conferring with an architect and a master astrologer who hold detailed parchment blueprints. Above their heads, carved into the vaulted stone arch, three ornate golden pentacles form a radiant triangular keystone. The Three of Pentacles honors the sacred marriage of vision, technical skill, and mutual collaboration in erecting monuments that outlast the season.",
    reflectiveInterpretation:
      "The Three of Pentacles celebrates the integrity of devoted labor and the multiplier of aligned collaboration. You are building something meant to endure, whether a craft, a career, or a foundational system. This is not the phase for solo heroism or secretive tinkering; it is the time to solicit high-standard feedback, partner with people who respect the work, and pay meticulous attention to technical details. Take deep pride in your workbench; excellence is built one deliberate stroke at a time.",
    reflectionPrompt:
      "What project or skill are you currently building, and whose complementary expertise or honest feedback could elevate its craftsmanship?",
    practicalTakeaway:
      "Reach out to an ally or mentor to review a specific piece of your work, or spend an uninterrupted hour sharpening the core technical mechanics of your craft.",
    image: {
      src: "/images/sanctum/tarot/three-of-pentacles.webp",
      alt: "Three of Pentacles — Occult ceremonial tarot card of collaboration, craftsmanship, teamwork, and foundational skill",
      motif: "pentacles-three",
    },
  },
  {
    id: "card_pentacles_four",
    slug: "four-of-pentacles",
    number: 4,
    numeral: "IV",
    name: "Four of Pentacles",
    suit: "pentacles",
    arcana: "minor",
    shortKeywords: ["Guarded Vault", "Fortified Sovereignty", "Scarcity's Grip"],
    traditionalThemes: [
      "Financial security, boundary preservation, consolidation, and material stability",
      "Protecting hard-won assets and creating a defensible fortress of resources",
      "The prudent conservation of energy, time, and physical wealth",
      "The danger of scarcity mindset transforming healthy boundaries into a self-made prison",
    ],
    reversedThemes: [
      "Compulsive hoarding, miserly fear, or extreme fear of financial loss",
      "Suffocating control that prevents growth, generosity, or healthy circulation",
      "A sudden forced release of assets due to clinging too tightly",
    ],
    traditionalMeaning:
      "A crowned sovereign sits upon a carved stone dais overlooking a fortified city, clutching a large golden pentacle tightly against their chest. Two other pentacles rest firmly beneath their feet, while a fourth balances upon their crown. Every limb is engaged in pinning down their wealth. The Four of Pentacles depicts the paradox of material control—the security of fortified boundaries, balanced against the rigid immobility that occurs when fear prevents energy from circulating.",
    reflectiveInterpretation:
      "The Four of Pentacles appears when your focus turns toward security, consolidation, and defense. It is entirely valid to protect what you have earned through disciplined labor; building a stable foundation requires saying no to reckless leakage. However, notice your grip. Are you holding your resources with steady sovereignty, or is unexamined terror whispering that you will lose everything if you relax a single muscle? Remember: an unyielding vault protects wealth, but nothing living can grow inside it.",
    reflectionPrompt:
      "Where is a fear of scarcity causing you to clutch resources, control, or energy so tightly that you are choking off forward movement?",
    practicalTakeaway:
      "Perform a concrete financial review: confirm what is safely set aside for security, and consciously release one small, generous expenditure or gift without guilt.",
    image: {
      src: "/images/sanctum/tarot/four-of-pentacles.webp",
      alt: "Four of Pentacles — Occult ceremonial tarot card of financial security, control, guarded boundaries, and material stability",
      motif: "pentacles-four",
    },
  },
  {
    id: "card_pentacles_five",
    slug: "five-of-pentacles",
    number: 5,
    numeral: "V",
    name: "Five of Pentacles",
    suit: "pentacles",
    arcana: "minor",
    shortKeywords: ["Winter of Want", "Sanctuary in the Storm", "The Unseen Threshold"],
    traditionalThemes: [
      "Financial hardship, isolation, material vulnerability, and enduring cold winters",
      "Feeling locked out, unassisted, or forgotten in your hour of physical need",
      "The acute ache of scarcity straining your physical and emotional reserves",
      "Overlooking the warm, lighted sanctuary standing mere feet away through the storm",
    ],
    reversedThemes: [
      "The slow return of economic vitality, recovery from illness, or discovering refuge",
      "Pride preventing you from asking for the assistance that is readily available",
      "Internalizing material setbacks as proof of personal unworthiness",
    ],
    traditionalMeaning:
      "Two weary travelers trudge barefoot through deep snow beneath a nocturnal blizzard. One limps forward on crude crutches, while the other is wrapped in threadbare blankets. Just above their bowed heads, the glowing stained-glass window of a sacred sanctuary illuminates five golden pentacles embedded in leaded glass, radiating warmth into the blizzard. The Five of Pentacles depicts the winter of physical struggle—and the quiet tragedy of enduring hardship alone while sanctuary waits just across the threshold.",
    reflectiveInterpretation:
      "The Five of Pentacles speaks to genuine hardship, economic strain, or the profound loneliness of feeling excluded from security. Hard times test the strongest spirit, and you are not asked to pretend the cold does not bite. But look up from the frozen ground. The greatest danger in difficult seasons is not the setback itself, but the isolating pride that convinces you no help exists. Sanctuary, warmth, and solidarity are closer than you realize. Lower your defenses and knock on the door.",
    reflectionPrompt:
      "What material or physical burden are you quietly enduring in isolation, and who can you reach out to for concrete support today?",
    practicalTakeaway:
      "Identify the single most pressing physical or financial stressor facing you right now. Take one mundane action: apply for aid, make an honest call, or ask an ally for guidance.",
    image: {
      src: "/images/sanctum/tarot/five-of-pentacles.webp",
      alt: "Five of Pentacles — Occult ceremonial tarot card of hardship, material struggle, winter storm, and seeking sanctuary",
      motif: "pentacles-five",
    },
  },
  {
    id: "card_pentacles_six",
    slug: "six-of-pentacles",
    number: 6,
    numeral: "VI",
    name: "Six of Pentacles",
    suit: "pentacles",
    arcana: "minor",
    shortKeywords: ["Sacred Reciprocity", "The Balanced Scales", "Equitable Circulation"],
    traditionalThemes: [
      "Generosity, equitable exchange, sharing resources, and the balanced scale of giving and receiving",
      "Distributing material blessings with dignity and without condescension",
      "Receiving assistance with grace, recognizing that sovereignty includes knowing how to receive",
      "The continuous circular flow of energy that sustains healthy communities",
    ],
    reversedThemes: [
      "Transactional charity with hidden strings, power imbalances, or performative altruism",
      "One-sided relationships where one person constantly drains while the other overgives",
      "Refusing needed support out of stubborn ego or feeling indebted and demeaned",
    ],
    traditionalMeaning:
      "A noble merchant clad in rich purple vestments stands before a stone archway, holding a balanced bronze merchant's scale in their left hand while carefully weighing and pouring coins from their right hand into the open palms of two seated supplicants. Six golden pentacles glow in celestial symmetry along the masonry above. The Six of Pentacles embodies the sacred law of reciprocity—the conscious distribution of wealth, time, and influence to ensure that the entire ecosystem remains nourished and equitable.",
    reflectiveInterpretation:
      "The Six of Pentacles asks you to examine the flow of giving and receiving in your life. Wealth, wisdom, and emotional support are living waters meant to circulate. If you have been blessed with surplus, share it deliberately and with deep respect for the dignity of those you assist. If you are currently in a season of need, open your hands and receive without shame. Remember: the scale must balance on both sides; chronic overgiving is just as disordered as hoarding.",
    reflectionPrompt:
      "Is your current dynamic of giving and receiving in true equilibrium, or are you overextending yourself to maintain control or unworthiness?",
    practicalTakeaway:
      "Engage in one act of clean, no-strings-attached reciprocity today—either give practical aid to someone who needs it, or gratefully accept an offering of help without deflection.",
    image: {
      src: "/images/sanctum/tarot/six-of-pentacles.webp",
      alt: "Six of Pentacles — Occult ceremonial tarot card of generosity, reciprocity, fairness, and balanced resource flow",
      motif: "pentacles-six",
    },
  },
  {
    id: "card_pentacles_seven",
    slug: "seven-of-pentacles",
    number: 7,
    numeral: "VII",
    name: "Seven of Pentacles",
    suit: "pentacles",
    arcana: "minor",
    shortKeywords: ["Patient Cultivation", "The Mid-Harvest Assessment", "The Long Game"],
    traditionalThemes: [
      "Patience, long-term investment, evaluating progress, and pausing to assess the harvest",
      "Stepping back from labor to observe how seeds have taken root in physical reality",
      "Resisting premature gratification while trusting the natural compounding cycle of growth",
      "Deciding whether to continue cultivating a crop or prune unproductive efforts",
    ],
    reversedThemes: [
      "Impatience, abandoning efforts right before manifestation, or frustration with slow results",
      "Pouring energy into exhausted soil that will never yield a return",
      "Laziness or lack of follow-through after initial enthusiasm wanes",
    ],
    traditionalMeaning:
      "A focused cultivator clad in rugged indigo and deep purple vestments leans upon their spade within a lush nocturnal garden. They gaze contemplatively at a flourishing vine laden with seven gleaming golden pentacles embedded among the leaves. The moon casts quiet light across the furrowed earth. The Seven of Pentacles depicts the quiet art of the mid-harvest assessment—the deliberate pause in physical labor where you evaluate the yield of your investments, honor the patience required for organic maturation, and decide your next strategic cultivation.",
    reflectiveInterpretation:
      "The Seven of Pentacles invites you to step back from the grind and inspect your garden. You have put in the hours, planted the seeds, and tended the soil; now, the work requires patience rather than frantic intervention. Growth in the material realm follows seasons, not overnight impulses. Do not dig up your seeds just to check if the roots are growing. Assess what is truly thriving with honest eyes, prune away dead weight, and give your worthwhile endeavors the steady time they need to ripen.",
    reflectionPrompt:
      "What long-term endeavor requires your patient trust right now, and what premature impulse do you need to rein in?",
    practicalTakeaway:
      "Conduct a structured review of an ongoing project or financial plan. Note what has demonstrably grown, celebrate the progress, and refrain from making impulsive changes for the next thirty days.",
    image: {
      src: "/images/sanctum/tarot/seven-of-pentacles.webp",
      alt: "Seven of Pentacles — Occult ceremonial tarot card of patient cultivation, assessment, long-term growth, and sustainable investment",
      motif: "pentacles-seven",
    },
  },
  {
    id: "card_pentacles_eight",
    slug: "eight-of-pentacles",
    number: 8,
    numeral: "VIII",
    name: "Eight of Pentacles",
    suit: "pentacles",
    arcana: "minor",
    shortKeywords: ["Sacred Craftsmanship", "Diligent Mastery", "Repetitive Devotion"],
    traditionalThemes: [
      "Dedicated craftsmanship, mastery of skill, focused repetitive labor, and disciplined practice",
      "Honing your craft behind closed doors with meticulous attention to detail",
      "Finding transcendent purpose in the mundane, steady rhythm of daily work",
      "Apprenticeship, continuous improvement, and the accumulation of technical expertise",
    ],
    reversedThemes: [
      "Cutting corners, careless craftsmanship, rushing for shallow praise, or lack of discipline",
      "Perfectionist paralysis where nothing is ever deemed finished or good enough",
      "Mindless drudgery in a career or craft that drains your soul without offering growth",
    ],
    traditionalMeaning:
      "An artisan dressed in violet robes sits intently at a sturdy wooden workbench in their stone workshop, carving sacred geometric glyphs onto a golden pentacle with a sharp bronze chisel. Five completed pentacles hang proudly on the workshop wall, another rests at their feet, and one is clamped securely to the anvil. The artisan works in quiet solitude, completely absorbed in their craft. The Eight of Pentacles represents the sacred devotion of the artisan—the patient, repetitive application of focused effort that elevates simple labor into enduring mastery.",
    reflectiveInterpretation:
      "The Eight of Pentacles calls you to the workbench. Real mastery is never born of sudden flashes or viral shortcuts; it is forged through the quiet, unglamorous hours of showing up and refining your technique. When this card appears, dismiss distractions and focus deeply on the details of your trade. Whether you are writing, coding, creating ritual tools, or mastering a discipline, treat your task as a sacred practice. Polish each edge with pride. The world will recognize the quality of what you build in private.",
    reflectionPrompt:
      "What specific skill or craft are you called to refine through patient, repetitive practice today?",
    practicalTakeaway:
      "Block out two hours of uninterrupted, distraction-free deep work. Dedicate that time entirely to practicing the fundamental mechanics of your craft without seeking external validation.",
    image: {
      src: "/images/sanctum/tarot/eight-of-pentacles.webp",
      alt: "Eight of Pentacles — Occult ceremonial tarot card of craftsmanship, mastery, focused labor, and disciplined dedication",
      motif: "pentacles-eight",
    },
  },
  {
    id: "card_pentacles_nine",
    slug: "nine-of-pentacles",
    number: 9,
    numeral: "IX",
    name: "Nine of Pentacles",
    suit: "pentacles",
    arcana: "minor",
    shortKeywords: ["Sovereign Solitude", "Disciplined Abundance", "Cultivated Grace"],
    traditionalThemes: [
      "Self-reliance, material independence, refined comfort, and sovereign self-sufficiency",
      "Enjoying the abundant harvest created through your own sustained discipline and discernment",
      "A tranquil sanctuary of beauty, security, and poise established on your own terms",
      "Solitary contentment without needing external validation or codependent compromise",
    ],
    reversedThemes: [
      "Living beyond your means, superficial luxury concealing debt, or financial dependence",
      "Paranoid isolation, loneliness disguised as self-sufficiency, or disconnection from community",
      "Workaholic tendencies that prevent you from ever enjoying what you have built",
    ],
    traditionalMeaning:
      "An elegant sovereign clad in luxurious purple and gold robes strolls through a walled vineyard heavy with ripe grapes and nine radiant golden pentacles. A hooded peregrine falcon rests calmly upon their gloved wrist, symbolizing disciplined instincts and refined focus. A celestial archway frames the tranquil background. The Nine of Pentacles depicts the serenity of earned independence—the sovereign estate built through personal agency, where material security and refined peace are savored in graceful self-sufficiency.",
    reflectiveInterpretation:
      "The Nine of Pentacles celebrates the harvest of your self-reliance. You have walked a demanding path, made prudent sacrifices, and established a personal sanctuary that belongs entirely to you. You do not owe your stability to anyone else's fickle favor. Take a breath and actually enjoy the fruits of your labor: the quiet morning, the safe roof, the quality of your surroundings. Cultivate your independence with dignity. You have earned your seat in this garden; inhabit it with poise and zero apology.",
    reflectionPrompt:
      "How can you more fully acknowledge and savor the independence and security you have built with your own hands?",
    practicalTakeaway:
      "Treat yourself to a solitary ritual of comfort or beauty today—savor a high-quality meal, take a quiet walk in nature, or purchase a fine tool for your home—without feeling the need to justify it.",
    image: {
      src: "/images/sanctum/tarot/nine-of-pentacles.webp",
      alt: "Nine of Pentacles — Occult ceremonial tarot card of independence, self-reliance, luxury, abundance, and sovereign grace",
      motif: "pentacles-nine",
    },
  },
  {
    id: "card_pentacles_ten",
    slug: "ten-of-pentacles",
    number: 10,
    numeral: "X",
    name: "Ten of Pentacles",
    suit: "pentacles",
    arcana: "minor",
    shortKeywords: ["Enduring Legacy", "Generational Stability", "The Great Arch"],
    traditionalThemes: [
      "Generational wealth, long-term legacy, family foundations, and ancestral continuity",
      "Building structures, wealth, and traditions designed to outlive your personal lifetime",
      "Culmination of material security that extends across community, lineage, and home",
      "Rooted belonging within an enduring tradition and thriving family ecosystem",
    ],
    reversedThemes: [
      "Family disputes over inheritance, toxic ancestral expectations, or suffocating tradition",
      "Financial losses that threaten the family estate, fragile foundations, or lack of long-term planning",
      "Focusing exclusively on material wealth while neglecting emotional and spiritual inheritance",
    ],
    traditionalMeaning:
      "Beneath a majestic stone archway engraved with ancestral heraldry, three generations gather within a fortified courtyard alongside two loyal hounds. An elder sovereign in an ornate tapestry mantle watches over a young couple and their playing child, while ten gleaming golden pentacles are arranged across the scene in the sacred geometry of the Tree of Life. The Ten of Pentacles represents the zenith of material manifestation—the creation of lasting wealth, family security, and cultural legacy that protects and nourishes future generations.",
    reflectiveInterpretation:
      "The Ten of Pentacles lifts your vision beyond immediate survival toward the horizon of legacy. True wealth is not merely what is in your wallet this week; it is the enduring foundation, knowledge, and community roots you bequeath to those who follow. Consider how your present choices contribute to long-term stability. What traditions are you preserving, and what toxic cycles are you breaking? Build with materials that endure. Strive for the kind of security that shelters your loved ones and honors your ancestors.",
    reflectionPrompt:
      "What enduring legacy, tradition, or long-term security are you building for the future, beyond your immediate desires?",
    practicalTakeaway:
      "Take one action that protects or builds long-term security: review your estate planning or emergency fund, organize crucial family documents, or invest in an enduring asset.",
    image: {
      src: "/images/sanctum/tarot/ten-of-pentacles.webp",
      alt: "Ten of Pentacles — Occult ceremonial tarot card of legacy, generational wealth, family stability, and long-term security",
      motif: "pentacles-ten",
    },
  },
  {
    id: "card_pentacles_page",
    slug: "page-of-pentacles",
    number: 11,
    numeral: "PAGE",
    name: "Page of Pentacles",
    suit: "pentacles",
    arcana: "minor",
    shortKeywords: ["Apprentice of the Earth", "Grounded Ambition", "The Seed of Skill"],
    traditionalThemes: [
      "Practical ambition, eager apprenticeship, financial learning, and tangible new ventures",
      "Approaching material goals with a humble student's mindset and a willingness to do the groundwork",
      "Receiving good news regarding studies, contracts, jobs, or practical investments",
      "A grounded curiosity focused on real-world systems, crafts, and financial mechanics",
    ],
    reversedThemes: [
      "Procrastination, daydreaming about wealth without taking physical steps, or lack of progress",
      "Short-sighted financial mistakes, poor study habits, or feeling overwhelmed by basic mechanics",
      "Frustration with the slow, mundane entry level of a new profession",
    ],
    traditionalMeaning:
      "A focused youth dressed in forest green and deep violet garments stands in a freshly tilled field surrounded by blooming wildflowers and mature trees, backed by a distant mountain range. They hold a luminous golden pentacle aloft in both hands, gazing into its etched surface with reverence and scholarly fascination. The Page of Pentacles symbolizes the grounded student of life—the initial spark of practical curiosity that seeks to understand physical laws, master trades, and turn raw ambitions into viable ventures.",
    reflectiveInterpretation:
      "The Page of Pentacles brings the fresh, grounded energy of a dedicated apprentice. You are standing at the threshold of a new physical endeavor—a course of study, a business venture, a health habit, or a financial plan. Do not be ashamed of being a novice. The Page's greatest superpower is humble, attentive curiosity. Treat this phase as an apprenticeship: read the manual, learn the rules of the terrain, and practice the basic fundamentals without pretending you already know everything. Clear beginnings yield strong structures.",
    reflectionPrompt:
      "What new skill, project, or financial discipline are you ready to study with humble, wholehearted dedication?",
    practicalTakeaway:
      "Enroll in the course, buy the introductory guide, or schedule a consultation with someone who has already mastered the practical skill you want to develop.",
    image: {
      src: "/images/sanctum/tarot/page-of-pentacles.webp",
      alt: "Page of Pentacles — Occult ceremonial tarot card of practical ambition, apprenticeship, learning, and grounded opportunities",
      motif: "pentacles-page",
    },
  },
  {
    id: "card_pentacles_knight",
    slug: "knight-of-pentacles",
    number: 12,
    numeral: "KNIGHT",
    name: "Knight of Pentacles",
    suit: "pentacles",
    arcana: "minor",
    shortKeywords: ["Unyielding Persistence", "The Steady Plow", "Methodical Mastery"],
    traditionalThemes: [
      "Patience, reliability, perseverance, responsibility, steady progress, and methodical execution",
      "The unwavering workhorse who finishes what others abandon when novelty fades",
      "Guarding the perimeter and stewarding resources with absolute duty and loyalty",
      "Plowing furrow by furrow with quiet resolve until the entire field is fertile",
    ],
    reversedThemes: [
      "Stubborn inflexibility, obsessive micromanagement, resistance to necessary change",
      "Boredom, feeling trapped in monotonous drudgery, or perfectionism causing stalling",
      "Laziness, unreliability, or neglecting vital physical duties",
    ],
    traditionalMeaning:
      "A stalwart knight in heavy ceremonial armor sits motionless upon a formidable, heavy-footed draft horse in the middle of a dark, plowed field. The horse stands firmly rooted to the earth. In the knight's gauntleted palm rests a heavy golden pentacle, which he examines with solemn, unwavering focus. The Knight of Pentacles represents the epitome of physical stamina, dependability, and unshakeable discipline—the warrior of labor who understands that enduring victories are won through consistent, methodical effort rather than flashy heroics.",
    reflectiveInterpretation:
      "The Knight of Pentacles is the antidote to the modern worship of speed and instant results. While others chase volatile trends or abandon projects at the first sign of boredom, this knight puts his head down and plows the field row by row. When he enters your reading, he asks you to embody relentless consistency. Are you following through on your commitments? Are your daily habits aligned with your long-term goals? Do not seek glamorous shortcuts; the unyielding power of methodical work will carry you past every obstacle.",
    reflectionPrompt:
      "What vital responsibility requires your patient, uncomplaining persistence right now, even if the work feels routine?",
    practicalTakeaway:
      "Choose one stalled or monotonous task and commit to completing it today without distraction. Do the mundane duty fully, cleanly, and without complaint.",
    image: {
      src: "/images/sanctum/tarot/knight-of-pentacles.webp",
      alt: "Knight of Pentacles — Occult ceremonial tarot card of patience, reliability, perseverance, duty, and steady progress",
      motif: "pentacles-knight",
    },
  },
  {
    id: "card_pentacles_queen",
    slug: "queen-of-pentacles",
    number: 13,
    numeral: "QUEEN",
    name: "Queen of Pentacles",
    suit: "pentacles",
    arcana: "minor",
    shortKeywords: ["Sovereign Earth", "Sanctuary of Plenty", "Pragmatic Grace"],
    traditionalThemes: [
      "Nurturing, abundance, practicality, independence, grounded generosity, and physical stewardship",
      "Creating a warm, resilient haven where body, soul, and community can deeply flourish",
      "Down-to-earth wisdom that solves complex problems with common sense and tangible resources",
      "Balancing ambitious material stewardship with heartfelt care for the living world",
    ],
    reversedThemes: [
      "Neglecting self-care in service of work, smothering others with material control, or financial anxiety",
      "Martyrdom through over-functioning, or letting domestic and financial duties devolve into chaos",
      "Superficial status-seeking or tying self-worth solely to material possessions",
    ],
    traditionalMeaning:
      "A serene queen sits upon a stone throne carved with beasts of the field, satyrs, and celestial spirals, nestled within a blooming rose arbor beneath an open sky. A wild hare leaps through the grass beside her throne. Cradled gently in her lap is a massive golden pentacle, which she supports with tender devotion. The Queen of Pentacles embodies the sovereign mother of the earth—the pragmatic, nurturing guardian whose wealth is translated directly into nourishment, warm hospitality, sensory delight, and steadfast emotional safety.",
    reflectiveInterpretation:
      "The Queen of Pentacles brings the medicine of grounded nourishment. She reminds you that true wealth is not just numbers on a screen, but having clean food on the table, warmth in your hearth, physical vitality in your bones, and peace in your home. When she graces your reading, she invites you to bring practical, loving care to your immediate environment. Tend to your physical vessel, feed your people, declutter your space, and ground your spirit in the simple goodness of physical life.",
    reflectionPrompt:
      "How can you better nurture your physical body, home sanctuary, or community with grounded, practical care today?",
    practicalTakeaway:
      "Prepare a nourishing home-cooked meal, clean and consecrate your living space, or do one practical act of physical care that grounds your nervous system.",
    image: {
      src: "/images/sanctum/tarot/queen-of-pentacles.webp",
      alt: "Queen of Pentacles — Occult ceremonial tarot card of nurturing, practical abundance, independence, and grounded generosity",
      motif: "pentacles-queen",
    },
  },
  {
    id: "card_pentacles_king",
    slug: "king-of-pentacles",
    number: 14,
    numeral: "KING",
    name: "King of Pentacles",
    suit: "pentacles",
    arcana: "minor",
    shortKeywords: ["Master of the Citadel", "Generative Sovereign", "Material Stewardship"],
    traditionalThemes: [
      "Prosperity, stability, responsible leadership, material mastery, stewardship, and enterprise",
      "The mature architect of wealth who transforms barren ideas into flourishing, self-sustaining empires",
      "Generous, reliable authority rooted in financial security, business acumen, and physical prudence",
      "Protecting and growing assets so that the entire kingdom enjoys safety and prosperity",
    ],
    reversedThemes: [
      "Greed, corruption, ruthless materialism, or valuing profit over human dignity",
      "Financial mismanagement, stubborn stubbornness, or clinging to a failing enterprise out of ego",
      "Using wealth as a weapon to dominate, demean, or control dependents",
    ],
    traditionalMeaning:
      "A regal monarch sits upon an imposing black marble throne adorned with carved bull heads and celestial vines, holding a golden scepter in his right hand while resting his left hand upon a large golden pentacle on his knee. His heavy robes are embroidered with ripe bunches of purple grapes and dark ivy. Behind him rises his fortified citadel and flourishing castle gardens. The King of Pentacles represents the apex of worldly accomplishment—the master builder, investor, and steward who commands material reality with wisdom, generous authority, and unshakeable stability.",
    reflectiveInterpretation:
      "The King of Pentacles asks you to step into executive mastery over your material domain. Whatever you touch right now has the potential to become solid, secure, and enduring—provided you approach it with seasoned discipline and strategic foresight. Do not gamble on volatile fantasies. Act like the sovereign of your estate: review your books, strengthen your contracts, invest in proven foundations, and lead your enterprises with calm, generous authority. You have the capability to create lasting prosperity for yourself and those under your care.",
    reflectionPrompt:
      "Where are you being called to exercise mature, responsible leadership over your finances, enterprise, or material world?",
    practicalTakeaway:
      "Make a decisive, strategic business or financial choice today—negotiate a fair rate, allocate investment capital, or solidify an agreement with the steady authority of a seasoned leader.",
    image: {
      src: "/images/sanctum/tarot/king-of-pentacles.webp",
      alt: "King of Pentacles — Occult ceremonial tarot card of prosperity, material mastery, stability, responsible leadership, and stewardship",
      motif: "pentacles-king",
    },
  },
];

/**
 * Archived cards preserved for backward-compatibility with previously stored local test readings.
 * Empty since all 22 Major Arcana cards are now fully active in the canonical deck.
 */
export const ARCHIVED_SANCTUM_CARDS: SanctumTarotCard[] = [];

export const ALL_SANCTUM_TAROT_CARDS: SanctumTarotCard[] = [
  ...SANCTUM_TAROT_DECK,
  ...ARCHIVED_SANCTUM_CARDS,
];

/**
 * Derives the standard preview deck status text based on active deck size.
 */
export function getSanctumDeckPreviewLabel(): string {
  return `Preview deck: ${SANCTUM_TAROT_DECK.length} cards`;
}

export function getRandomSanctumTarotCard(): SanctumTarotCard {
  const index = Math.floor(Math.random() * SANCTUM_TAROT_DECK.length);
  return SANCTUM_TAROT_DECK[index];
}

export function getSanctumTarotCardById(id: string): SanctumTarotCard | undefined {
  return ALL_SANCTUM_TAROT_CARDS.find((c) => c.id === id);
}

export function getSanctumTarotCardBySlug(slug: string): SanctumTarotCard | undefined {
  return ALL_SANCTUM_TAROT_CARDS.find((c) => c.slug === slug);
}
