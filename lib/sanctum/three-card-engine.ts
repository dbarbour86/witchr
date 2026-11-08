import { SanctumTarotCard, SANCTUM_TAROT_DECK } from "@/content/sanctum-tarot";

export type SpreadPositionKey = "situation" | "challenge" | "guidance";

export interface SpreadPositionConfig {
  key: SpreadPositionKey;
  numeral: string;
  label: string;
  inquiry: string;
}

export const THREE_CARD_POSITIONS: SpreadPositionConfig[] = [
  {
    key: "situation",
    numeral: "I",
    label: "Situation",
    inquiry: "What is most present or relevant right now?",
  },
  {
    key: "challenge",
    numeral: "II",
    label: "Challenge",
    inquiry: "What tension, obstacle, pattern, or blind spot deserves attention?",
  },
  {
    key: "guidance",
    numeral: "III",
    label: "Guidance",
    inquiry: "What perspective or action may help move forward?",
  },
];

/**
 * Deterministic position-specific interpretations for the initial 5-card MVP deck.
 * Contextualizes each card according to its position in the triad spread.
 */
const POSITION_INTERPRETATIONS: Record<string, Record<SpreadPositionKey, string>> = {
  card_00_fool: {
    situation:
      "The Fool marks a clean threshold or the onset of an unfamiliar chapter. What was previously structured has loosened, placing you at the starting line of something you cannot yet fully map.",
    challenge:
      "The friction of The Fool lies in the urge to demand absolute guarantees before taking a step. You may be using endless analysis or waiting for perfect validation to avoid the necessary vulnerability of beginning.",
    guidance:
      "Adopt a beginner’s posture. Drop the burden of having to appear already seasoned or unshakeable. Take one sovereign, imperfect step into the open space without waiting for permission.",
  },
  card_01_magician: {
    situation:
      "The Magician indicates that the fundamental tools, resources, and influence required to navigate this matter are already in your physical possession. The raw materials are laid out on your workbench.",
    challenge:
      "The friction here is scattered focus or the temptation to tinker endlessly with plans rather than committing to direct execution. You risk substituting the illusion of preparation for actual focused labor.",
    guidance:
      "Align your direct will with what your hands can physically reach today. Strip away auxiliary noise, select your core instrument, and apply concentrated attention to the immediate lever of change.",
  },
  card_02_high_priestess: {
    situation:
      "The High Priestess shows that much of what is driving this circumstance operates beneath the surface. Unspoken motives, instinctual undertones, or quiet patterns are exerting more influence than obvious appearances.",
    challenge:
      "The difficulty here is allowing external chatter or analytical rationalization to overpower your visceral gut discernment. You may be talking yourself out of an internal truth you already recognize.",
    guidance:
      "Step back from debate and observe. Protect a pocket of silence before committing to a stance. Listen to what your body and quiet intuition report when you stop looking for external consensus.",
  },
  card_03_empress: {
    situation:
      "The Empress indicates that the ground beneath you is fertile and receptive. What you are engaging with has the capacity for genuine, organic expansion, provided it receives patient cultivation and sensory presence.",
    challenge:
      "The friction here is demanding hurried results or attempting to force an inorganic pace. You risk depleting your own reserves by over-giving or treating a delicate creative gestation like a mechanical emergency.",
    guidance:
      "Nourish the roots before demanding fruit. Protect your physical vitality and allow the process to unfold in its own rhythm. Tend the conditions of growth with generosity and quiet confidence.",
  },
  card_04_emperor: {
    situation:
      "The Emperor establishes a need for structural clarity, firm perimeters, and sober governance. The circumstance requires an authoritative hand to establish order where ambiguity has created instability.",
    challenge:
      "The danger is confusing rigid control with genuine authority. You may be attempting to micromanage unpredictable elements out of unexpressed anxiety, or conversely, neglecting to enforce necessary boundaries.",
    guidance:
      "Build the scaffold. Define non-negotiable boundaries, establish clear operational standards, and take sovereign responsibility for directing what is under your direct jurisdiction.",
  },
  card_05_hierophant: {
    situation:
      "The Hierophant marks a situation governed by foundational principles, lineage wisdom, or structured frameworks. The solution calls for aligning with proven traditions rather than improvising from scratch.",
    challenge:
      "The friction of The Hierophant lies in rigid dogmatism or blind conformity. You may be clinging to obsolete rules out of fear of nonconformity, or rejecting sound counsel purely out of reflexive defiance.",
    guidance:
      "Anchor your decision in enduring principles. Consult credible mentorship or time-tested frameworks, while filtering the advice through your own authentic ethical discernment.",
  },
  card_06_lovers: {
    situation:
      "The Lovers marks an essential crossroads where personal values and authentic desire must align. You stand before a choice that cannot be resolved through compromise or superficial appeasement.",
    challenge:
      "The friction lies in moral ambivalence or trying to remain in two contradictory postures simultaneously. Straddling the fence preserves an illusion of safety while slowly bleeding away conviction.",
    guidance:
      "Choose from wholeness. Commit fully to the path that reflects your core integrity rather than external validation. Wholehearted allegiance to one direction unlocks clarity.",
  },
  card_07_chariot: {
    situation:
      "The Chariot shows that dynamic momentum has gathered, but competing drives or conflicting demands threaten to pull the reins in opposite directions. Forward passage requires concentrated mastery.",
    challenge:
      "The hazard is losing your center under acceleration or letting internal doubts steer the course. Fragmented effort or reactive aggression will overturn your progress.",
    guidance:
      "Harness opposing forces toward a single focal point. Grip your central intention firmly, ignore peripheral disruptions, and drive steadily through the friction with unwavering discipline.",
  },
  card_08_strength: {
    situation:
      "Strength marks a circumstance where raw emotional intensity or formidable resistance is present. True progress will not come through brute force, but through grounded composure and enduring resolve.",
    challenge:
      "The obstacle is falling into reactive anger or collapsing under sustained pressure. Lashing out or retreating into wounded silence only gives volatility the upper hand.",
    guidance:
      "Subdue the roaring lion with gentle mastery. Meet hostility or inner doubt with steady breathing, calm dignity, and unshakable patience. Fortitude that refuses to panic always outlasts aggression.",
  },
  card_09_hermit: {
    situation:
      "The Hermit marks a phase of necessary interiority and deliberate stepping back. The matter at hand cannot be resolved through collective consensus; it requires private examination and personal alignment.",
    challenge:
      "The risk is falling into defensive isolation or withdrawing out of bitterness rather than discernment. Alternatively, you may be terrified of quiet solitude because of the uncomfortable truths it surfaces.",
    guidance:
      "Carry your own lantern. Measure your next decision against your private internal standards rather than external approval. Dim the room, close the door, and proceed by the light of your own quiet integrity.",
  },
  card_10_wheel_of_fortune: {
    situation:
      "The Wheel of Fortune indicates that events have entered a phase of unavoidable cyclical shift. External conditions are in motion, altering the landscape and opening unexpected pathways.",
    challenge:
      "The friction lies in resisting the turn of the cycle or attempting to micromanage forces outside your control. Panicking during a dip or growing arrogant during a high will only destabilize your focus.",
    guidance:
      "Anchor yourself at the hub of the wheel. Adapt with fluid composure to unfolding developments, focusing on how you respond rather than fighting the turning tide.",
  },
  card_11_justice: {
    situation:
      "Justice highlights a circumstance governed by strict cause and effect, legal or ethical accountability, and objective balance. The truth of the matter is emerging without distortion.",
    challenge:
      "The difficulty is avoiding rationalization or making excuses for subtle imbalances. You may be seeking an easy compromise where absolute honesty and ethical clarity are demanded.",
    guidance:
      "Weigh all elements with cool, impartial discernment. Fulfill your commitments, acknowledge reality without self-deception, and make choices that preserve your fundamental integrity.",
  },
  card_12_hanged_man: {
    situation:
      "The Hanged Man marks a period of necessary suspension and liminal pause. Outward progress has temporarily slowed to allow a fundamental realignment of your perspective.",
    challenge:
      "The obstacle is struggling against unavoidable delays or slipping into resentful martyrdom. Forcing aggressive action right now will only tangle the threads further.",
    guidance:
      "Surrender the impulse to force an immediate outcome. Invert your viewpoint and view this pause as fertile gestation. Insight will arise naturally once you stop fighting the quiet.",
  },
  card_13_death: {
    situation:
      "Death indicates that a definite cycle, role, or dynamic has reached its natural conclusion. What is present is the quiet transition phase where old forms are giving way to make room for what comes next.",
    challenge:
      "The resistance lies in clinging to dead momentum out of comfort or fear of the unknown. Attempting to keep an expired pattern on artificial life support drains the vitality needed for new growth.",
    guidance:
      "Allow the severance to be clean. Acknowledge what has run its course with dignity and release your grip without drama or self-recrimination. Clearing the ground is itself the creative act.",
  },
  card_14_temperance: {
    situation:
      "Temperance marks a dynamic requiring careful blending and continuous calibration. Different pressures, obligations, or emotions are in play, requiring steady hands to maintain equilibrium rather than sudden rupture.",
    challenge:
      "The friction of Temperance is the temptation toward all-or-nothing extremes or restless impatience. You may be trying to force a swift outcome when what is actually needed is the stamina to let elements distill in their own time.",
    guidance:
      "Practice conscious moderation and gradual adjustment. Do not swing between reactive poles; blend opposing considerations patiently. Small, steady corrections will yield far greater leverage than a dramatic overreaction.",
  },
  card_15_devil: {
    situation:
      "The Devil reveals where unconscious attachment, compulsive habit, or material anxiety has constrained your freedom. A dynamic appears unyielding, but the limitations are largely self-maintained.",
    challenge:
      "The danger is denying shadow motivations or convincing yourself that you have no viable choice. Ceding your sovereignty to fear, addictive comforts, or codependency keeps the collar locked.",
    guidance:
      "Recognize that the chains around your neck are loose. Acknowledge hidden desires and fears with radical self-honesty, and take one decisive step to withdraw energy from the draining trap.",
  },
  card_16_tower: {
    situation:
      "The Tower marks a moment where sudden truth, unexpected rupture, or lightning revelation fractures an obsolete structure. What was unstable cannot be sustained.",
    challenge:
      "The friction is frantic denial or trying to hold up collapsing battlements. Clinging to shattered assumptions creates panic where clean acceptance would bring relief.",
    guidance:
      "Step clear of the falling stones. Do not rush to rebuild the old facade; let the false foundation clear away. The collapse liberates your trapped vitality so you can build on solid rock.",
  },
  card_17_star: {
    situation:
      "The Star brings serene clarity, quiet hope, and restorative light after a tempest. The turbulent passage is behind you, opening space for pure inspiration and healing.",
    challenge:
      "The risk is cynicism or guarded despair that refuses to let hope take root. You may be anticipating disaster when what is genuinely arriving is quiet renewal.",
    guidance:
      "Allow yourself to replenish without defensive armor. Pour into what sustains you, trust the long-term arc of your vision, and move forward with unclouded, gentle faith.",
  },
  card_18_moon: {
    situation:
      "The Moon shows that this circumstance is steeped in ambiguity, unverified projections, or submerged emotional currents. Not all facts are visible in the daylight, and much is being filtered through fear or imagination.",
    challenge:
      "The obstacle here is mistaking anxious illusions for objective truth. You risk reacting to shadowy phantoms, catastrophizing unverified signals, or allowing unexamined dread to distort your discernment.",
    guidance:
      "Navigate by instinct, not paranoia. Slow down and refuse to draw hasty conclusions while the fog is thick. Distinguish between what you actually know for certain and what your anxiety is projecting into the dark.",
  },
  card_19_sun: {
    situation:
      "The Sun illuminates your circumstance with radiant clarity, warmth, and unmistakable vitality. What was concealed or doubtful is now exposed to open, generous light.",
    challenge:
      "The friction is second-guessing straightforward success or waiting for a hidden trap. Overcomplicating a genuinely favorable moment robs you of well-earned joy and momentum.",
    guidance:
      "Step fully into the warmth. Express gratitude, communicate with open transparency, and channel your abundant energy directly into constructive, joyful action.",
  },
  card_20_judgement: {
    situation:
      "Judgement signals a profound awakening and a definitive reckoning with the past. An old version of your life has concluded, calling you to rise into a higher echelon of responsibility.",
    challenge:
      "The obstacle is lingering guilt or listening to expired self-criticism. Second-guessing your worthiness or hesitating at the threshold keeps you trapped in the tomb of outgrown roles.",
    guidance:
      "Answer the call without backward regret. Grant yourself and others full absolution for past stumbling, integrate the earned wisdom, and step forward into your authentic calling.",
  },
  card_21_world: {
    situation:
      "The World marks the triumphant completion of a major chapter and the integration of diverse lessons into harmonious mastery. You stand at the threshold of wholeness.",
    challenge:
      "The friction is faltering at the finish line or leaving loose ends untied out of fear of what comes next. Postponing final closure delays the onset of the next great spiral.",
    guidance:
      "Celebrate the milestone with gratitude and dignity. Recognize the sovereignty and competence you have gained, tie off remaining threads, and honor the completion of this cycle.",
  },
  card_wands_ace: {
    situation:
      "The Ace of Wands signals a distinct surge of fresh vitality or an unmistakable creative spark entering your current sphere. The initial ground is charged with untamed potential, waiting for you to seize the initiatory wand.",
    challenge:
      "The friction lies in scattered volatility or mistaking initial excitement for sustained mastery. You risk burning through all your fuel in a frantic burst, or conversely, second-guessing the inspiration until the fire dims.",
    guidance:
      "Channel the raw fire into a single clean focal point. Do not wait for a complete five-year blueprint; commit your willpower to taking the very first stroke with conviction.",
  },
  card_wands_two: {
    situation:
      "The Two of Wands indicates you have secured an initial vantage point of stability and authority. From this parapet, your attention is actively weighing future horizons and evaluating which direction merits your energy.",
    challenge:
      "The obstacle is the lingering hesitation to step away from safe, familiar ramparts. Fear of stepping outside your current domain can lock you into indecisive plateauing.",
    guidance:
      "Adopt a statesmanlike perspective. Hold your current achievements with steady confidence while drafting bold, deliberate plans for the territory you intend to enter next.",
  },
  card_wands_three: {
    situation:
      "The Three of Wands shows that your initiatives are already underway and moving through the open waters. You are in a phase of expansive perspective, observing momentum that you initiated but no longer need to force.",
    challenge:
      "The tension lies in anxious restlessness while waiting for distant ships to arrive. Attempting to artificially hasten outcomes or pacing the cliffside in doubt drains your stamina.",
    guidance:
      "Elevate your gaze to the wider horizon. Trust the integrity of the work you launched, maintain your vantage point, and build the capacity to receive the returns as they land.",
  },
  card_wands_four: {
    situation:
      "The Four of Wands signals a welcomed arrival at a stable sanctuary or celebratory threshold. A meaningful foundation has taken firm root, creating a safe clearing for rest, joy, and harmonious connection.",
    challenge:
      "The friction is an inability to relax into safety. If you are conditioned to constant crisis, peace can feel unnerving, tempting you to manufacture problems rather than accepting grace.",
    guidance:
      "Accept the earned blessing. Step through the flowered arbor, lower your armor, and celebrate the ground you have secured with genuine warmth and unreserved gratitude.",
  },
  card_wands_five: {
    situation:
      "The Five of Wands indicates that you are navigating a bustling thicket of competing voices, conflicting priorities, or overt competition. Several forces are contending for attention and dominance simultaneously.",
    challenge:
      "The danger is losing your composure in petty skirmishes or taking normal competitive tension as personal assault. Reactive bickering drains the vital fire needed for genuine progress.",
    guidance:
      "Treat the circumstance like an athletic tournament. Hold your staff firmly, sharpen your focus through the commotion, and refuse to let disorganized static provoke you out of your center.",
  },
  card_wands_six: {
    situation:
      "The Six of Wands indicates you are stepping into a visible milestone of success, recognition, or earned acclaim. Past struggles have resolved in your favor, bringing validation and a clear vantage of leadership.",
    challenge:
      "The friction lies in resting entirely on temporary laurels or becoming addicted to external applause. Allowing victory to breed complacency or defensive arrogance leaves you vulnerable to the next turning tide.",
    guidance:
      "Accept the recognition with grace and dignified humility. Acknowledge your supporters, anchor your inner confidence beyond public opinion, and use this triumphant momentum to elevate your next endeavor.",
  },
  card_wands_seven: {
    situation:
      "The Seven of Wands reveals you holding higher ground against mounting pressures, competitor pushback, or boundary testing. Having made your mark, you are now called to defend what you have rightfully established.",
    challenge:
      "The danger is falling into an exhausting siege mentality or second-guessing your right to stand firm. Backing down under pressure or defensively lashing out in panic concedes the advantage you hold.",
    guidance:
      "Hold your ground with unwavering conviction. You occupy the vantage point for good reason; plant your feet, refuse to over-explain your core boundaries, and trust that your principled stance will outlast the commotion below.",
  },
  card_wands_eight: {
    situation:
      "The Eight of Wands signals rapid acceleration, incoming communications, and decisive momentum. The obstacles that stalled your path have cleared, launching events forward with electrifying speed.",
    challenge:
      "The friction is dizziness or panicked reactivity in the face of swift change. Frantically trying to micro-manage every flying spear or rushing impulsively without aim leads to careless missteps.",
    guidance:
      "Align your focus and steer the current with calm agility. Make swift, clean decisions, clear logistical bottlenecks, and let the arrows of your intention reach their mark without unnecessary interference.",
  },
  card_wands_nine: {
    situation:
      "The Nine of Wands shows you standing watch at the final defensive perimeter, battle-tested and resilient after enduring multiple trials. You have weathered the hardest storms, but the fatigue of vigilance weighs heavily.",
    challenge:
      "The obstacle is defensive paranoia or mistaking normal interactions for fresh threats. Clinging to protective armor even in safe harbors drains the very stamina required for the finish line.",
    guidance:
      "Conserve your remaining reserves and hold your post with steady grit. You possess the proven endurance to complete this journey; protect your essential boundaries without isolating yourself in fear.",
  },
  card_wands_ten: {
    situation:
      "The Ten of Wands reveals a circumstance where passion or commitment has compounded into an overwhelming burden. You have shouldered too many staves, trudging uphill under an unsustainable volume of duties.",
    challenge:
      "The friction is martyring yourself to misplaced obligations or believing that asking for help is failure. Refusing to lay down extraneous weight risks physical exhaustion or sudden collapse before the threshold.",
    guidance:
      "Perform a ruthless audit of what you are carrying. Put down the bundles that belong to others or to outgrown commitments, delegate essential tasks, and carry only the core staff needed to step into the sanctuary ahead.",
  },
  card_wands_page: {
    situation:
      "The Page of Wands indicates a fresh current of creative curiosity or an unexpected invitation entering your sphere. You stand at the threshold of a new area of study, project, or interest that sparks your imagination.",
    challenge:
      "The obstacle lies in scattered restlessness or abandoning the spark as soon as practical effort is required. Starting multiple ventures without nurturing any of them dilutes your vital fire.",
    guidance:
      "Adopt the posture of an eager student and intrepid explorer. Ask honest questions, follow genuine fascination without needing immediate perfection, and allow yourself to learn through playful experimentation.",
  },
  card_wands_knight: {
    situation:
      "The Knight of Wands reveals a situation characterized by intense velocity, adventurous momentum, and bold initiative. You or the forces around you are moving with fierce passion and decisive speed.",
    challenge:
      "The friction is reckless impulsiveness, hot-headed impatience, or burning out your fuel before reaching the destination. Rushing into conflict without situational awareness creates avoidable casualties.",
    guidance:
      "Channel your fire with focused conviction. Back your vision with courage, take decisive action without second-guessing, but ensure your trajectory is aligned before releasing the reins.",
  },
  card_wands_queen: {
    situation:
      "The Queen of Wands marks a circumstance where your personal sovereignty, charisma, and creative confidence are taking center stage. You have the magnetic warmth and inner fire to shape your environment.",
    challenge:
      "The danger is allowing insecurity to breed defensiveness, jealousy, or an exhausting need for constant validation. Shrinking your light to placate others diminishes your natural influence.",
    guidance:
      "Inhabit your throne with unapologetic warmth and steady self-assurance. Stand tall in your authenticity, extend generous encouragement to others, and let your quiet confidence speak for itself.",
  },
  card_wands_king: {
    situation:
      "The King of Wands indicates you are in a position of executive responsibility and visionary leadership. The path demands clear long-term strategy, decisive governance, and steadfast determination.",
    challenge:
      "The obstacle is becoming autocratic, impatient with slower collaborators, or stubbornly forcing a personal agenda at the expense of reality. Arrogance under pressure fractures your alliance.",
    guidance:
      "Lead with seasoned maturity and principled vision. Keep your sights firmly on the long horizon, take full accountability for outcomes, and inspire others by the integrity of your actions.",
  },
  card_cups_ace: {
    situation:
      "The Ace of Cups signals the arrival of a profound emotional opening, intuitive awakening, or new wellspring of affection and grace. An old emotional drought is breaking, bringing restorative waters.",
    challenge:
      "The friction is emotional guardedness or cynicism that refuses to let the cup be filled. Clinging to past betrayals or fearing vulnerability prevents genuine connection from taking root.",
    guidance:
      "Lower your defensive shields and allow your heart to soften. Trust your intuitive instincts, receive compassion without suspicion, and let genuine empathy guide your immediate responses.",
  },
  card_cups_two: {
    situation:
      "The Two of Cups reveals a circumstance centered on mutual connection, alliance, or reciprocal emotional exchange. A relationship or creative partnership is taking center stage as equal energies meet.",
    challenge:
      "The friction is falling into codependency, unspoken scorekeeping, or expecting the other person to complete what you haven't healed within yourself. Demanding perfection from a partnership fractures trust.",
    guidance:
      "Meet the other party as a sovereign equal with clear boundaries and transparent intentions. Cultivate honest reciprocity, listen without rehearsing a defense, and build the alliance on mutual respect.",
  },
  card_cups_three: {
    situation:
      "The Three of Cups indicates a present moment enriched by community, friendship, celebration, or collaborative harmony. A shared milestone or the warmth of your circle is ready to be honored.",
    challenge:
      "The obstacle lies in social burnout, superficial gossip disguised as bonding, or feeling isolated despite being surrounded by others. Sacrificing your authenticity to keep the group happy breeds quiet resentment.",
    guidance:
      "Gather with those who genuinely nourish your spirit and celebrate your growth without rivalry. Share your joy freely, lean on your kindred circle for support, and let communal laughter restore your vitality.",
  },
  card_cups_four: {
    situation:
      "The Four of Cups reveals an emotional plateau marked by introspection, apathy, or mild disillusionment. The rewards that once satisfied you have grown stale, prompting a natural inward retreat.",
    challenge:
      "The friction is calcifying withdrawal into chronic cynicism or blind stubbornness. By fixating solely on what disappointed you in the past, you risk overlooking a genuine offering waiting right in front of you.",
    guidance:
      "Honor your need for quiet reassessment without slamming the door on life. Allow discontent to diagnose what must change, but keep your peripheral vision open to the fresh invitation seeking your attention.",
  },
  card_cups_five: {
    situation:
      "The Five of Cups reflects a situation shadowed by grief, regret, or a painful disappointment. An investment, bond, or dream has spilled, and the immediate atmosphere demands space for mourning.",
    challenge:
      "The danger is drowning in sorrow or defining your entire identity by the spilled vessels. Clinging to remorse or endlessly replaying what went wrong blinds you to the vital support still standing behind you.",
    guidance:
      "Give your grief the dignified space it deserves without rushing to manufacture false optimism. Weep for what was lost, release self-blame, and when your breath steadies, turn around to claim the two cups still standing full.",
  },
  card_cups_six: {
    situation:
      "The Six of Cups highlights the influence of nostalgia, childhood roots, or longtime allies entering your present sphere. A familiar warmth or an uncorrupted memory is resurfacing to provide perspective.",
    challenge:
      "The obstacle is getting trapped in the past or romanticizing old history through rose-tinted illusion. Hiding in nostalgic comfort to avoid adult responsibility prevents you from building a vibrant present.",
    guidance:
      "Retrieve the pure, unarmored joy and open-hearted curiosity of your younger self. Apply that innocent wisdom to your current challenges, and extend a simple, generous kindness to someone in your orbit without expectation.",
  },
  card_cups_seven: {
    situation:
      "The Seven of Cups indicates a circumstance saturated with competing choices, rich imagination, or intoxicating possibilities. Your mind is generating numerous scenarios, each glittering with its own allure.",
    challenge:
      "The friction is shiny-object paralysis or mistaking glamorous daydreams for real progress. Chasing illusions without testing their substance squanders your vital energy and leaves you fundamentally grounded nowhere.",
    guidance:
      "Sift through the vapor of fantasy with grounded discernment. Ruthlessly eliminate the options that are merely glamorous distractions, and commit your focused labor to the single path that holds genuine reality.",
  },
  card_cups_eight: {
    situation:
      "The Eight of Cups marks a solemn threshold of departure. You have recognized that an existing situation, though once meaningful or comfortable, no longer feeds your evolving spirit, prompting you to walk away.",
    challenge:
      "The friction is lingering in emotional stagnation out of fear of the unknown or feeling guilty for outgrowing what others still value. Clinging to an empty room only compounds your internal exhaustion.",
    guidance:
      "Trust your deep knowing and take the sovereign step forward into the open night. You do not need to stage a dramatic scene; quietly gather your essentials, leave what is finished behind, and climb toward authentic fulfillment.",
  },
  card_cups_nine: {
    situation:
      "The Nine of Cups reveals a circumstance characterized by emotional satisfaction, comfort, and well-earned peace. A heartfelt desire or long-pursued milestone has materialized, offering genuine respite.",
    challenge:
      "The obstacle is smug complacency or waiting in anxious dread for the other shoe to drop. Denying yourself the pleasure of your accomplishments out of guilt or superstitious fear tarnishes the harvest.",
    guidance:
      "Receive the fullness of this moment with an open, grateful heart. Allow yourself to celebrate your achievements, savor the comfort of your sanctuary, and share your good fortune with genuine warmth.",
  },
  card_cups_ten: {
    situation:
      "The Ten of Cups indicates a present reality anchored in lasting emotional fulfillment, peaceful sanctuary, and deep relational harmony. You are surrounded by foundational safety and shared belonging.",
    challenge:
      "The friction lies in demanding unattainable perfection from your family or loved ones, or projecting an image of flawless bliss while ignoring small cracks. Fear of losing paradise can turn you into an anxious protector.",
    guidance:
      "Rest deeply in the security and love that currently envelops you. Nurture the everyday bonds that sustain your sanctuary, communicate with unconditional kindness, and let shared appreciation reinforce your foundation.",
  },
  card_cups_page: {
    situation:
      "The Page of Cups marks the arrival of a gentle intuitive hunch, a creative invitation, or a fresh emotional beginning. An unexpected message or spark of curiosity is rippling across your surface.",
    challenge:
      "The obstacle is cynical dismissal or emotional hypersensitivity. Ridiculing your own intuition as silly or taking every subtle emotional wave as a personal slight will choke the tender spark before it grows.",
    guidance:
      "Adopt the stance of a curious, open-hearted mystic. Welcome intuitive whispers and playful creative impulses without requiring immediate logical justification, and express your tender truths with gentle sincerity.",
  },
  card_cups_knight: {
    situation:
      "The Knight of Cups indicates a circumstance animated by romance, creative longing, or an emotional quest. You or someone approaching you is moving with sincere feeling, charm, and poetic devotion.",
    challenge:
      "The obstacle is becoming swept away by unrealistic idealism, chasing seductive mirages, or promising grand emotional devotions without following through. Mistaking infatuation for grounded truth breeds disillusionment.",
    guidance:
      "Channel your emotional sensitivity into authentic, courageous expression. State your sincere desires without games, honor the beauty in your craft or connection, and anchor your poetic ideals into dependable actions.",
  },
  card_cups_queen: {
    situation:
      "The Queen of Cups reveals a situation where deep intuition, empathy, and emotional intelligence are taking center stage. The answer you seek operates in the quiet currents beneath surface logic.",
    challenge:
      "The friction is emotional martyrdom, taking on the unprocessed distress of others, or sinking into moody hypersensitivity. Forgetting where your perimeter ends and another's begins drains your psychic reserves.",
    guidance:
      "Inhabit the throne of sovereign compassion. Trust the quiet reporting of your intuition, hold loving space without absorbing chaos, and nurture yourself with the same tenderness you extend to the world.",
  },
  card_cups_king: {
    situation:
      "The King of Cups indicates an environment requiring seasoned emotional composure, diplomatic balance, and steady leadership. Turbulent waves are rolling, calling for an unshakeable center of gravity.",
    challenge:
      "The friction is swinging between emotional repression and volatile outbursts, or using stoic detachment to avoid authentic intimacy. Forcing control through manipulation destroys psychological safety.",
    guidance:
      "Lead with emotional mastery and calm authority. Feel the full spectrum of reality without being unseated by the storm, communicate with measured warmth, and anchor the room through your steady presence.",
  },
  card_swords_ace: {
    situation:
      "The Ace of Swords marks a circumstance where absolute mental clarity, truth, or a sudden intellectual breakthrough is taking center stage. A fog of confusion has lifted, exposing the raw ground facts with undeniable sharpness.",
    challenge:
      "The friction is weaponizing clarity into cruelty or intellectual arrogance. Slicing through problems with cold, unyielding logic without honoring human nuance or timing creates collateral damage.",
    guidance:
      "Wield the blade of discernment with clean precision. Speak the unvarnished truth without malice, make the decisive cut that frees your energy from ambiguity, and align your actions with the reality right before you.",
  },
  card_swords_two: {
    situation:
      "The Two of Swords reveals a stalemate where two opposing choices, loyalties, or viewpoints are locked in tense equilibrium. You are holding a defensive posture, hesitating at a crucial crossroads.",
    challenge:
      "The obstacle is using endless analysis or deliberate blindness to avoid the discomfort of commitment. Pretending you don't know what to do only prolongs the internal tension and drains your vitality.",
    guidance:
      "Remove the blindfold and face both sides of the dilemma squarely. Accept that every meaningful choice requires closing one door to open another, and trust yourself to handle the consequences of moving forward.",
  },
  card_swords_three: {
    situation:
      "The Three of Swords indicates a present circumstance marked by heartache, painful disclosure, or the piercing realization that an expectation has collapsed. An unavoidable truth has struck directly at the heart.",
    challenge:
      "The danger is nursing grievances, wallowing in despair, or shutting your emotional center down behind hardened cynicism. Letting sorrow calcify into bitterness poisons your future growth.",
    guidance:
      "Allow yourself to feel the full, honest grief without rushing to fix it. Cry the necessary tears, acknowledge the wound without self-blame, and let the storm wash away the illusions that kept you trapped.",
  },
  card_swords_four: {
    situation:
      "The Four of Swords marks a necessary interlude of rest, convalescence, and mental retreat. Your nervous system is calling for sanctuary after a demanding period of stress or struggle.",
    challenge:
      "The friction is compulsive restlessness, guilt over taking downtime, or ignoring warning signs of cognitive burnout. Rushing back into conflict prematurely guarantees poor judgment and exhaustion.",
    guidance:
      "Declare a sacred truce with your obligations. Enforce non-negotiable boundaries around your rest, step back from noise and argument, and allow your mental reserves to rebuild in quiet stillness.",
  },
  card_swords_five: {
    situation:
      "The Five of Swords reveals a landscape shaped by conflict, hostile tension, or a competitive zero-sum confrontation. Harsh words or ego-driven maneuvering have left the atmosphere frayed.",
    challenge:
      "The friction is the compulsive need to win at any cost or nursing vindictive desires for payback. Dominating an opponent through spite or deception achieves only a hollow, isolating victory.",
    guidance:
      "Audit the true cost of continued battle and choose your dignity over petty triumph. Sheathe your blade, decline to engage in toxic squabbles, and walk away from conflicts that drain your spirit.",
  },
};

/**
 * Retrieves the contextual meaning for a specific card in a specific spread position.
 */
export function getCardPositionMeaning(card: SanctumTarotCard, position: SpreadPositionKey): string {
  const cardMap = POSITION_INTERPRETATIONS[card.id];
  if (cardMap && cardMap[position]) {
    return cardMap[position];
  }
  // Graceful fallback to card's default reflective interpretation
  return card.reflectiveInterpretation;
}

/**
 * Shuffles the deck and draws exactly 3 UNIQUE cards with no duplicates.
 */
export function drawThreeUniqueCards(): [SanctumTarotCard, SanctumTarotCard, SanctumTarotCard] {
  const deckCopy = [...SANCTUM_TAROT_DECK];

  // Fisher-Yates shuffle
  for (let i = deckCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deckCopy[i], deckCopy[j]] = [deckCopy[j], deckCopy[i]];
  }

  return [deckCopy[0], deckCopy[1], deckCopy[2]];
}

export interface OracleSynthesisResult {
  pattern: string;
  consider: string;
  carryWithYou: string;
}

/**
 * Deterministic synthesis engine combining Situation, Challenge, and Guidance cards.
 * Bridges the three cards into a cohesive narrative grounded in each card's spread position,
 * directly acknowledging the user's inquiry, and avoiding canned repetitive formulas.
 */
export function generateOracleSynthesis(
  situation: SanctumTarotCard,
  challenge: SanctumTarotCard,
  guidance: SanctumTarotCard,
  question?: string
): OracleSynthesisResult {
  const cleanQuestion = question?.trim();

  // Position-specific contextual meanings
  const situationMeaning = getCardPositionMeaning(situation, "situation");
  const challengeMeaning = getCardPositionMeaning(challenge, "challenge");
  const guidanceMeaning = getCardPositionMeaning(guidance, "guidance");

  // Dynamic contextual opening connecting spread
  const opening = cleanQuestion
    ? `Looking directly into your inquiry regarding “${cleanQuestion}”, the cards outline a clear diagnostic trajectory across your situation.`
    : `The triad reveals a clear progression connecting your immediate ground truth to conscious resolution.`;

  // Connected narrative weaving Situation -> Challenge -> Guidance
  const narrative = `${opening} At the foundation, ${situation.name} (${situation.numeral}) establishes your present ground reality: ${situationMeaning} Yet this dynamic encounters acute resistance in ${challenge.name} (${challenge.numeral}), where ${challengeMeaning.toLowerCase().replace(/^[a-z]/, (c) => c.toLowerCase())} Rather than reacting impulsively or attempting to force an outcome, the conscious pivot lies in ${guidance.name} (${guidance.numeral}): ${guidanceMeaning}`;

  // Piercing psychological reflection tailored to the cards
  const considerPrompt = cleanQuestion
    ? `Regarding “${cleanQuestion}”, how does adopting the stance of ${guidance.name} dissolve the specific friction highlighted by ${challenge.name}?`
    : `Where is the tension in ${challenge.name} inviting you to step into the conscious maturity of ${guidance.name}?`;

  // Concrete, non-generic practical takeaway
  const carryTakeaway = cleanQuestion
    ? `In direct response to “${cleanQuestion}”, align your actions with ${guidance.name}: ${guidance.practicalTakeaway}`
    : `Carry the counsel of ${guidance.name} into your day: ${guidance.practicalTakeaway}`;

  return {
    pattern: narrative,
    consider: considerPrompt,
    carryWithYou: carryTakeaway,
  };
}
