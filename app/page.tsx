import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { RITUALS } from "@/content/rituals";
import { TAROT_SPREADS } from "@/content/tarot";
import { SIGILS } from "@/content/sigils";
import { PROBLEM_HUBS } from "@/content/problems";
import { RitualCard } from "@/components/RitualCard";
import { SigilVisual } from "@/components/SigilVisual";
import { EmailSignup } from "@/components/EmailSignup";
import {
  CelestialDivider,
  TarotCornerFlourish,
  FourPointStar,
  GrimoireStar,
  RavenIcon,
  PotionBottleIcon,
  CrystalClusterIcon,
  RitualShearsIcon,
  CandleAltarIcon,
  CelestialCompassIcon,
} from "@/components/OrnateFrames";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "Witchr — Witchcraft for Modern Problems",
  },
  description:
    "Practical rituals, diagnostic tarot spreads, sigils, and modern witchcraft tools for protection, money, confidence, love, letting go, and direction.",
  alternates: {
    canonical: "https://witchr.com",
  },
  openGraph: {
    title: "Witchr — Witchcraft for Modern Problems",
    description:
      "Practical rituals, diagnostic tarot spreads, sigils, and modern witchcraft tools for real life.",
    url: "https://witchr.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Witchr — Witchcraft for Modern Problems",
    description:
      "Practical rituals, diagnostic tarot spreads, sigils, and modern witchcraft tools for real life.",
  },
};

export default function HomePage() {

  const featuredSlugs = [
    "leave-me-alone-protection",
    "money-reset",
    "cut-the-cord",
    "confidence-before-you-walk-in",
    "new-beginning",
    "get-your-shit-together",
  ];
  const featuredRituals = featuredSlugs
    .map((slug) => RITUALS.find((r) => r.slug === slug))
    .filter((r): r is (typeof RITUALS)[0] => !!r);

  const featuredSpreads = TAROT_SPREADS.slice(0, 3);
  const sampleSigils = SIGILS.slice(0, 4);

  // Thematic gothic occult icons for the 6 problem portals
  const portalIcons: Record<string, React.ReactNode> = {
    money: <PotionBottleIcon className="w-8 h-8 text-emerald-400/90" />,
    protection: <RavenIcon className="w-8 h-8 text-lavender-moon" />,
    confidence: <CrystalClusterIcon className="w-8 h-8 text-amber-300/90" />,
    love: <CandleAltarIcon className="w-8 h-8 text-rose-300/90" />,
    "letting-go": <RitualShearsIcon className="w-8 h-8 text-lavender-light" />,
    direction: <CelestialCompassIcon className="w-8 h-8 text-sky-300/90" />,
  };

  const portalLatinTitles: Record<string, string> = {
    money: "PECUNIA · CLARITAS",
    protection: "DEFENSIO · PERIMETROS",
    confidence: "FIDUCIA · PRAESENTIA",
    love: "AMOR · SOVEREIGN",
    "letting-go": "ABSOLUTIO · SEVERITAS",
    direction: "DIRECTIO · CURSUS",
  };

  return (
    <div className="space-y-28 md:space-y-36">
      {/* 1. HERO SECTION: Gothic Celestial Centerpiece */}
      <section className="relative pt-10 md:pt-16 pb-16 overflow-hidden border-b border-border-subtle">
        {/* Ambient violet aura glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lavender/5 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Hero Narrative */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-surface border border-border-highlight text-[10px] sm:text-xs font-mono uppercase tracking-wider sm:tracking-ceremonial text-lavender-moon mx-auto lg:mx-0 shadow-subtle max-w-full">
                <FourPointStar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-lavender-moon shrink-0" />
                <span>Gothic Occult Self-Guidance</span>
                <FourPointStar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-lavender-moon shrink-0" />
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-bone tracking-wide leading-[1.1] celestial-glow">
                Witchcraft for modern problems.
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-bone-muted font-serif italic max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Bad breakup. Shitty job. No direction. Weird energy. Start with what’s bothering you.
              </p>

              <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/spell-finder"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-surface-elevated hover:bg-surface-hover text-lavender-light border border-border-ornate hover:border-lavender font-mono text-xs uppercase tracking-ceremonial font-semibold shadow-glow-purple transition-all duration-300 min-h-[50px] active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4 text-lavender-moon" />
                  <span>Find a ritual</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/rituals"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-surface hover:bg-surface-elevated border border-border text-bone font-mono text-xs uppercase tracking-ceremonial transition-colors min-h-[50px]"
                >
                  Browse the library
                </Link>
              </div>

              {/* Ceremonial Sub-Tagline */}
              <div className="pt-3 sm:pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono text-bone-dim">
                <span>01. Name the wound</span>
                <span>·</span>
                <span>02. Seal the boundary</span>
                <span>·</span>
                <span>03. Reclaim the quiet</span>
              </div>
            </div>

            {/* Right Hero Tarot Card Centerpiece */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[380px] sm:max-w-[420px] rounded-xl overflow-hidden border border-border-highlight bg-surface-card shadow-card group">
                {/* Hero Artwork */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                  <Image
                    src="/images/witchr-homepage-hero.webp"
                    alt="Purple and black screenprint illustration of a serene modern occult witch figure with perched raven, crescent moon, and sacred geometry"
                    fill
                    priority
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 380px, 420px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle bottom vignette to blend into plinth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-transparent to-transparent opacity-50 pointer-events-none" />

                  {/* Ceremonial Witchr Logo Overlay */}
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-28 sm:w-36 z-10 pointer-events-none transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src="/images/witchr-logo.webp"
                      alt="Witchr"
                      width={470}
                      height={339}
                      className="w-full h-auto object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] drop-shadow-[0_0_14px_rgba(157,78,221,0.5)]"
                    />
                  </div>
                </div>

                {/* Tarot Card Bottom Plinth */}
                <div className="p-4 bg-surface border-t border-border-highlight/60 text-center space-y-1 relative z-10">
                  <span className="text-[10px] font-mono uppercase tracking-ceremonial text-lavender-moon">
                    ARCANUM · THE MODERN PRACTITIONER
                  </span>
                  <p className="font-serif text-sm font-semibold text-bone tracking-wide">
                    “Three Paths · One Sovereign Will”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM SELECTOR: The Six Occult Portals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="problems-heading">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center justify-center gap-1.5">
            <GrimoireStar className="w-3.5 h-3.5 text-lavender-moon" />
            <span>Select Your Threshold</span>
            <GrimoireStar className="w-3.5 h-3.5 text-lavender-moon" />
          </span>
          <h2
            id="problems-heading"
            className="text-3xl sm:text-5xl font-display font-semibold text-bone tracking-wide"
          >
            What’s eating you?
          </h2>
          <p className="text-bone-muted text-base leading-relaxed font-sans">
            People do not arrive here to study ancient folklore. They arrive because something is hurting. Choose your path.
          </p>
          <CelestialDivider className="max-w-md mx-auto my-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROBLEM_HUBS.map((hub) => (
            <Link
              key={hub.slug}
              href={`/${hub.slug}`}
              className="tarot-frame group p-7 flex flex-col justify-between min-h-[260px]"
            >
              {/* Corner filigree */}
              <div className="absolute top-2.5 left-2.5 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
                <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
              </div>
              <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity rotate-90">
                <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-ceremonial text-lavender-dim group-hover:text-lavender-moon transition-colors">
                    {portalLatinTitles[hub.slug] || hub.category}
                  </span>
                  <div className="p-2.5 rounded-lg bg-background border border-border-highlight group-hover:border-lavender/50 group-hover:shadow-glow-subtle transition-all">
                    {portalIcons[hub.slug]}
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-bone group-hover:text-lavender-light transition-colors">
                  {hub.title}
                </h3>

                <p className="text-sm text-bone-muted mt-3 leading-relaxed font-sans">
                  {hub.slug === "money" && "Things feel tighter than they should. Stop looking away from the numbers."}
                  {hub.slug === "protection" && "You need stronger boundaries. Reclaim the attention given to leeches."}
                  {hub.slug === "confidence" && "You know what you want. You keep hesitating and apologizing for existing."}
                  {hub.slug === "love" && "Someone has your head spinning. Keep your center and sovereign standards."}
                  {hub.slug === "letting-go" && "You’re carrying something that should have been put down already."}
                  {hub.slug === "direction" && "You have no idea what the hell comes next. Break the freeze and start."}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-bone-dim group-hover:text-lavender-light transition-colors">
                <span>Enter Portal</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-lavender" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. WHAT WITCHR IS: The Grimoire Manifesto Panel */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grimoire-panel p-8 sm:p-12 md:p-16 rounded-2xl relative overflow-hidden text-center space-y-6">
          {/* Subtle star decorations */}
          <div className="flex items-center justify-center gap-2 text-lavender-moon">
            <FourPointStar className="w-3 h-3" />
            <span className="text-xs font-mono uppercase tracking-ceremonial">
              The Grimoire Decree
            </span>
            <FourPointStar className="w-3 h-3" />
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-semibold text-bone tracking-wide max-w-2xl mx-auto leading-snug">
            This isn’t about pretending candles solve everything.
          </h2>

          <CelestialDivider className="max-w-xs mx-auto my-4" />

          <div className="text-base sm:text-lg text-bone-muted max-w-2xl mx-auto space-y-4 leading-relaxed font-sans">
            <p>
              Rituals can create a moment of intention, reflection, closure, courage, or focus.
            </p>
            <p>
              Witchr gives you simple practices drawn from modern witchcraft, symbolism, journaling, tarot, and somatic ritual.
            </p>
            <p className="font-serif italic text-xl text-lavender-light pt-2">
              Take what helps. Leave what doesn’t.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FEATURED RITUALS: Occult Catalog Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="featured-rituals-heading">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
              <FourPointStar className="w-2.5 h-2.5" />
              <span>Grounded Practices</span>
            </span>
            <h2
              id="featured-rituals-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-bone tracking-wide mt-1"
            >
              Featured Rituals
            </h2>
            <p className="text-bone-muted text-base mt-2 font-sans">
              Structured step-by-step practices with zero fluff and real-world follow-through.
            </p>
          </div>
          <Link
            href="/rituals"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wideDisplay text-lavender hover:text-lavender-light transition-colors font-medium self-start md:self-auto min-h-[44px]"
          >
            <span>View all 12 rituals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRituals.map((ritual) => (
            <RitualCard key={ritual.slug} ritual={ritual} />
          ))}
        </div>
      </section>

      {/* 5. SIMPLE THREE-STEP SECTION: Constellation Instruction Panel */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="three-step-heading">
        <div className="tarot-frame p-8 sm:p-12 md:p-14 rounded-2xl relative overflow-hidden">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center justify-center gap-1.5">
              <GrimoireStar className="w-3.5 h-3.5" />
              <span>The Triad of Practice</span>
              <GrimoireStar className="w-3.5 h-3.5" />
            </span>
            <h2
              id="three-step-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-bone tracking-wide"
            >
              No robes required.
            </h2>
            <p className="text-bone-muted text-base font-sans">
              You do not need seventeen crystals and a full moon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="p-6 rounded-xl bg-surface-elevated/70 border border-border-highlight relative space-y-3">
              <span className="font-display text-4xl font-bold text-lavender-dim/50">I</span>
              <h3 className="font-serif text-xl font-semibold text-bone">
                Pick what’s bothering you.
              </h3>
              <p className="text-sm text-bone-muted leading-relaxed font-sans">
                Start with the exact raw friction—the message you can't send, the invoice you're avoiding, or the boundary you need.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-xl bg-surface-elevated/70 border border-border-highlight relative space-y-3">
              <span className="font-display text-4xl font-bold text-lavender-moon/50">II</span>
              <h3 className="font-serif text-xl font-semibold text-bone">
                Choose a ritual.
              </h3>
              <p className="text-sm text-bone-muted leading-relaxed font-sans">
                Take five to twenty minutes with simple household elements to interrupt the emotional loop and clarify your intention.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-xl bg-surface-elevated/70 border border-border-highlight relative space-y-3">
              <span className="font-display text-4xl font-bold text-lavender-light/50">III</span>
              <h3 className="font-serif text-xl font-semibold text-bone">
                Do something deliberate about it.
              </h3>
              <p className="text-sm text-bone-muted leading-relaxed font-sans">
                Every Witchr practice terminates in physical reality. Ground the intention before the day ends.
              </p>
            </div>
          </div>

          <div className="text-center pt-8 mt-6 border-t border-border-subtle">
            <p className="font-serif text-xl text-lavender-light font-medium tracking-wide">
              That’s it.
            </p>
          </div>
        </div>
      </section>

      {/* 6. TAROT SECTION: Occult Spreads */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="tarot-heading">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
              <FourPointStar className="w-2.5 h-2.5" />
              <span>Diagnostic Symbolism</span>
            </span>
            <h2
              id="tarot-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-bone tracking-wide mt-1"
            >
              Sometimes you don’t need an answer. You need a better question.
            </h2>
            <p className="text-bone-muted text-base mt-2 max-w-2xl font-sans">
              Tarot is more useful when you stop asking it to predict your entire life and start using it to diagnose blind spots.
            </p>
          </div>
          <Link
            href="/tarot"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wideDisplay text-lavender hover:text-lavender-light transition-colors font-medium self-start md:self-auto min-h-[44px]"
          >
            <span>Browse tarot spreads</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredSpreads.map((spread) => (
            <article
              key={spread.slug}
              className="tarot-frame p-7 flex flex-col justify-between min-h-[240px]"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-ceremonial text-lavender-moon mb-3">
                  <span>{spread.cardCount} Cards</span>
                  <FourPointStar className="w-3 h-3 text-lavender-dim" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-bone group-hover:text-lavender-light transition-colors leading-snug">
                  <Link href={`/tarot/${spread.slug}`}>
                    {spread.title}
                  </Link>
                </h3>
                <p className="text-sm text-bone-muted mt-3 leading-relaxed font-sans">
                  {spread.purpose}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-bone-dim group-hover:text-lavender-light transition-colors">
                <span>View spread layout</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. SIGIL SECTION: Glowing Line-Art Gallery Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="sigils-heading">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
              <FourPointStar className="w-2.5 h-2.5" />
              <span>Visual Anchors</span>
            </span>
            <h2
              id="sigils-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-bone tracking-wide mt-1"
            >
              Give the intention a symbol.
            </h2>
            <p className="text-bone-muted text-base mt-2 max-w-2xl font-sans">
              A sigil is a symbol created to represent an intention. Whether someone sees it as magical, psychological, symbolic, or artistic is up to them.
            </p>
          </div>
          <Link
            href="/sigils"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wideDisplay text-lavender hover:text-lavender-light transition-colors font-medium self-start md:self-auto min-h-[44px]"
          >
            <span>Browse all sigils</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleSigils.map((sigil) => (
            <div
              key={sigil.id}
              className="tarot-frame p-6 flex flex-col items-center text-center space-y-4"
            >
              <div className="p-4 rounded-xl bg-background border border-border-highlight shadow-glow-subtle w-full flex items-center justify-center">
                <SigilVisual id={sigil.id} className="w-20 h-20 text-lavender-light" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-ceremonial text-lavender-dim">
                  {sigil.category}
                </span>
                <h3 className="font-serif text-lg font-semibold text-bone">
                  {sigil.name}
                </h3>
                <p className="text-xs text-bone-muted italic leading-relaxed pt-1 font-serif">
                  “{sigil.intention}”
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. EMAIL SECTION: Occult Correspondence Block */}
      <EmailSignup />
    </div>
  );
}
