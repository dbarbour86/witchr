import type { Metadata } from "next";
import Link from "next/link";
import { getCorrespondencesByCategory } from "@/content/correspondences";
import { getAllIntentCorrespondences } from "@/content/intent-correspondences";
import { RITUALS } from "@/content/rituals";
import { TAROT_SPREADS } from "@/content/tarot";
import { SIGILS } from "@/content/sigils";
import {
  JsonLd,
  getBreadcrumbJsonLd,
  getWebPageJsonLd,
} from "@/components/JsonLd";
import {
  FourPointStar,
  GrimoireStar,
  CelestialDivider,
  TarotCornerFlourish,
} from "@/components/OrnateFrames";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Flame,
  Leaf,
  Layers,
  Compass,
  ShieldCheck,
  Wand2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Occult Library & Reference Archives | Witchr",
  description:
    "The complete public Witchr reference library. Explore verified guides on pantry ingredients, classical herbs, candle colors, crystal minerals, intent correspondences, and beginner grimoires.",
  alternates: {
    canonical: "https://www.witchr.com/library",
  },
  openGraph: {
    title: "Occult Library & Reference Archives | Witchr",
    description:
      "Explore Witchr's complete reference archives. Grounded directories for herbs, pantry ingredients, candle colors, crystals, diagnostic tarot spreads, and practical witchcraft.",
    url: "https://www.witchr.com/library",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Occult Library & Reference Archives | Witchr",
    description:
      "Explore Witchr's complete reference archives. Grounded directories for herbs, pantry ingredients, candle colors, crystals, diagnostic tarot spreads, and practical witchcraft.",
  },
};

export default function LibraryIndexPage() {
  const herbs = getCorrespondencesByCategory("herb");
  const ingredients = getCorrespondencesByCategory("ingredient");
  const candles = getCorrespondencesByCategory("candle");
  const crystals = getCorrespondencesByCategory("crystal");
  const intents = getAllIntentCorrespondences();

  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", item: "https://www.witchr.com" },
    { name: "Library", item: "https://www.witchr.com/library" },
  ]);

  const webPageJsonLd = getWebPageJsonLd({
    title: "Occult Library & Reference Archives | Witchr",
    description:
      "The complete public Witchr reference library. Explore verified guides on pantry ingredients, classical herbs, candle colors, crystal minerals, intent correspondences, and beginner grimoires.",
    url: "https://www.witchr.com/library",
  });

  const categories = [
    {
      title: "Ingredients & Minerals",
      href: "/ingredients",
      count: `${ingredients.length} Guides`,
      icon: <Layers className="w-5 h-5 text-purple-300" />,
      description:
        "Pantry salts, elemental water, and threshold minerals that provide the tangible, physical anchor for ritual boundary work.",
      featured: [
        { name: "Coarse Salt", href: "/ingredients/salt" },
        { name: "Raw Honey", href: "/ingredients/honey" },
        { name: "Black Pepper", href: "/ingredients/black-pepper" },
        { name: "Moon Water", href: "/ingredients/moon-water" },
      ],
      badge: "Physical Anchors",
    },
    {
      title: "Herbs & Botanicals",
      href: "/herbs",
      count: `${herbs.length} Guides`,
      icon: <Leaf className="w-5 h-5 text-emerald-300" />,
      description:
        "Classical folklore, botanical safety, and sensory associations for kitchen herbs and garden botanicals.",
      featured: [
        { name: "Rosemary", href: "/herbs/rosemary" },
        { name: "Sweet Basil", href: "/herbs/basil" },
        { name: "Lavender", href: "/herbs/lavender" },
        { name: "Garden Sage", href: "/herbs/sage" },
        { name: "Cinnamon", href: "/herbs/cinnamon" },
        { name: "Bay Leaf", href: "/herbs/bay-leaf" },
      ],
      badge: "Botanical Codex",
    },
    {
      title: "Candles & Flame",
      href: "/candles",
      count: `${candles.length} Guides`,
      icon: <Flame className="w-5 h-5 text-amber-300" />,
      description:
        "Color psychology, temporal burn windows, flame dynamics, and mundane fire safety for candlecraft.",
      featured: [
        { name: "White Candle", href: "/candles/white" },
        { name: "Black Candle", href: "/candles/black" },
        { name: "Red Candle", href: "/candles/red" },
        { name: "Green Candle", href: "/candles/green" },
      ],
      badge: "Pyromancy Lore",
    },
    {
      title: "Crystals & Boundary Stones",
      href: "/crystals",
      count: `${crystals.length} Guides`,
      icon: <Compass className="w-5 h-5 text-sky-300" />,
      description:
        "Non-decaying mineral structures, tactile weight, boundary stones, and geological grounding.",
      featured: [
        { name: "Black Tourmaline", href: "/crystals/black-tourmaline" },
        { name: "Amethyst", href: "/crystals/amethyst" },
        { name: "Rose Quartz", href: "/crystals/rose-quartz" },
      ],
      badge: "Mineral Structure",
    },
    {
      title: "Correspondences Codex",
      href: "/correspondences",
      count: `${intents.length} Intent Portals`,
      icon: <Sparkles className="w-5 h-5 text-purple-300" />,
      description:
        "The master intent matrix connecting herbs, candles, minerals, and timing across protection, love, money, and letting go.",
      featured: [
        { name: "Protection Guide", href: "/correspondences/protection" },
        { name: "Money & Flow", href: "/correspondences/money" },
        { name: "Love & Sovereignty", href: "/correspondences/love" },
        { name: "Cleansing & Truth", href: "/correspondences/cleansing" },
      ],
      badge: "Master Intent Codex",
    },
    {
      title: "Beginner Grimoire",
      href: "/grimoire",
      count: "Occult Foundations",
      icon: <BookOpen className="w-5 h-5 text-lavender-light" />,
      description:
        "A practical, non-dogmatic occult manual covering candle colors, pantry herbs, lunar cycles, and intention crafting.",
      featured: [
        { name: "Candle Colors", href: "/grimoire#candle-colors" },
        { name: "Pantry Basics", href: "/grimoire#pantry-herbs" },
        { name: "Moon Phases", href: "/grimoire#moon-phases" },
        { name: "Intention Rules", href: "/grimoire#intentions" },
      ],
      badge: "Foundations",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      <JsonLd data={breadcrumbs} />
      <JsonLd data={webPageJsonLd} />

      {/* 1. Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs font-mono uppercase tracking-ceremonial text-bone-dim"
      >
        <Link
          href="/"
          className="hover:text-lavender-light flex items-center gap-1 min-h-[44px]"
        >
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-lavender-moon">Library</span>
      </nav>

      {/* 2. Header & Overview */}
      <header className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border-highlight text-lavender-moon text-xs font-mono uppercase tracking-ceremonial">
            <FourPointStar className="w-2.5 h-2.5" />
            <span>Public Reference Archives · Master Library</span>
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-bone tracking-wide leading-[1.1] celestial-glow">
          The Witchr Library
        </h1>

        <p className="text-lg md:text-xl text-bone-muted leading-relaxed font-sans pt-1">
          A grounded, non-dogmatic public reference library for modern witchcraft. Discover classical botanical correspondences, kitchen pantry minerals, candle flame dynamics, crystal properties, and practical grimoires—organized for immediate clarity and real-life practice.
        </p>

        <div className="p-4 sm:p-5 rounded-xl bg-surface border border-border-highlight flex items-start gap-3.5 text-xs sm:text-sm text-bone-dim font-sans shadow-subtle">
          <ShieldCheck className="w-5 h-5 text-lavender-moon shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            All Witchr library entries adhere to strict mundane safety, physical practicality, and historical folklore. We believe witchcraft is a grounded psychological and somatic craft: take what serves your current circumstances, and leave what does not.
          </p>
        </div>

        <CelestialDivider className="max-w-sm my-4" />
      </header>

      {/* 3. Primary Reference Categories Grid */}
      <section aria-labelledby="library-categories-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-border pb-4 gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
              <GrimoireStar className="w-3 h-3 text-lavender-dim" />
              <span>Reference Sections</span>
            </span>
            <h2
              id="library-categories-heading"
              className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
            >
              Major Library Archives
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-wider text-bone-dim">
            6 Core Categories
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <article
              key={cat.title}
              className="tarot-frame p-6 sm:p-8 rounded-2xl bg-surface border border-purple-900/60 flex flex-col justify-between group hover:border-lavender/60 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-30 group-hover:opacity-75 transition-opacity">
                <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="p-2 rounded-lg bg-surface-elevated border border-border-subtle">
                    {cat.icon}
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-lavender-dim">
                    {cat.count}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-display font-semibold text-bone group-hover:text-lavender-light transition-colors tracking-wide">
                    <Link href={cat.href}>
                      {cat.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-bone-muted font-sans leading-relaxed mt-2">
                    {cat.description}
                  </p>
                </div>

                {/* Featured Quick Links */}
                <div className="space-y-2 pt-3 border-t border-border-subtle/50">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-lavender-dim block">
                    Popular Entries:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cat.featured.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="px-2.5 py-1 rounded bg-surface-elevated hover:bg-[#1a0b30] border border-border-subtle hover:border-lavender/40 text-xs font-mono text-purple-200 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* View Section Footer */}
              <div className="pt-6 mt-6 border-t border-border-subtle/40">
                <Link
                  href={cat.href}
                  className="inline-flex items-center justify-between w-full text-xs font-mono uppercase tracking-ceremonial font-semibold text-lavender hover:text-lavender-light transition-colors py-2 min-h-[44px]"
                >
                  <span>Explore {cat.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Practical Tools & Practice Chambers */}
      <section
        aria-labelledby="practice-tools-heading"
        className="tarot-frame p-8 sm:p-10 rounded-2xl bg-surface-elevated/40 border border-border-ornate space-y-6"
      >
        <div className="border-b border-border-subtle pb-4">
          <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
            <FourPointStar className="w-2.5 h-2.5" />
            <span>Interactive Applications</span>
          </span>
          <h2
            id="practice-tools-heading"
            className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
          >
            Apply Library Knowledge in Practice
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <Link
            href="/rituals"
            className="p-6 rounded-xl bg-surface border border-border-subtle hover:border-lavender/60 transition-all group space-y-3 block"
          >
            <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-border-highlight flex items-center justify-center text-lavender-moon">
              <Wand2 className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-bone group-hover:text-lavender-light transition-colors">
                Ritual Library
              </h3>
              <ArrowRight className="w-4 h-4 text-bone-dim group-hover:text-lavender group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-bone-muted leading-relaxed font-sans">
              Browse {RITUALS.length} step-by-step rituals for boundary setting, mental resets, focus, and cord-cutting.
            </p>
          </Link>

          <Link
            href="/tarot"
            className="p-6 rounded-xl bg-surface border border-border-subtle hover:border-lavender/60 transition-all group space-y-3 block"
          >
            <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-border-highlight flex items-center justify-center text-lavender-moon">
              <Compass className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-bone group-hover:text-lavender-light transition-colors">
                Tarot Spreads
              </h3>
              <ArrowRight className="w-4 h-4 text-bone-dim group-hover:text-lavender group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-bone-muted leading-relaxed font-sans">
              Explore {TAROT_SPREADS.length} diagnostic spreads designed to unpack friction, conflict, and decision paralysis.
            </p>
          </Link>

          <Link
            href="/sanctum/chamber"
            className="p-6 rounded-xl bg-surface border border-border-subtle hover:border-lavender/60 transition-all group space-y-3 block"
          >
            <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-border-highlight flex items-center justify-center text-lavender-moon">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-bone group-hover:text-lavender-light transition-colors">
                The Sanctum
              </h3>
              <ArrowRight className="w-4 h-4 text-bone-dim group-hover:text-lavender group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-bone-muted leading-relaxed font-sans">
              Enter the interactive workstation for daily tarot draws, custom ritual synthesis, and conversational Oracle dialogue.
            </p>
          </Link>
        </div>
      </section>

      {/* 5. Bottom Navigation */}
      <section className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-ceremonial text-bone-dim">
        <span>Need a direct match?</span>
        <div className="flex items-center gap-4 flex-wrap">
          <Link href="/spell-finder" className="hover:text-lavender-light flex items-center gap-1 min-h-[44px]">
            <span>Spell Finder Tool</span>
            <ArrowRight className="w-3 h-3 text-lavender-moon" />
          </Link>
          <Link href="/sigils" className="hover:text-lavender-light flex items-center gap-1 min-h-[44px]">
            <span>Sigil Gallery</span>
            <ArrowRight className="w-3 h-3 text-lavender-moon" />
          </Link>
        </div>
      </section>
    </div>
  );
}

