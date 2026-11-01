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
      | "world";
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
