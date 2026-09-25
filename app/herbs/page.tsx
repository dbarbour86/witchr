import type { Metadata } from "next";
import Link from "next/link";
import { getCorrespondencesByCategory } from "@/content/correspondences";
import {
  JsonLd,
  getBreadcrumbJsonLd,
  getWebPageJsonLd,
  getItemListJsonLd,
} from "@/components/JsonLd";
import {
  FourPointStar,
  GrimoireStar,
  CelestialDivider,
  TarotCornerFlourish,
} from "@/components/OrnateFrames";
import { ProductCTA } from "@/components/ProductCTA";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Flame,
  Leaf,
  Compass,
  Layers,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Herbs in Witchcraft: Magical Properties, Correspondences & Directory",
  description:
    "The complete Witchr herb reference directory. Discover classical correspondences, magical properties, folk folklore, and practical witchcraft uses for essential kitchen and ritual herbs.",
  alternates: {
    canonical: "https://witchr.com/herbs",
  },
  openGraph: {
    title:
      "Herbs in Witchcraft: Magical Properties, Correspondences & Directory | Witchr",
    description:
      "Explore the complete Witchr botanical directory. In-depth reference entries on magical properties, traditional folklore, and grounded witchcraft uses for essential herbs.",
    url: "https://witchr.com/herbs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Herbs in Witchcraft: Magical Properties, Correspondences & Directory | Witchr",
    description:
      "Explore the complete Witchr botanical directory. In-depth reference entries on magical properties, traditional folklore, and grounded witchcraft uses for essential herbs.",
  },
};

export default function HerbsHubPage() {
  const herbs = getCorrespondencesByCategory("herb");

  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", item: "https://witchr.com" },
    { name: "Herbs", item: "https://witchr.com/herbs" },
  ]);

  const webPageJsonLd = getWebPageJsonLd({
    title:
      "Herbs in Witchcraft: Magical Properties, Correspondences & Directory | Witchr",
    description:
      "The complete Witchr herb reference directory. Discover classical correspondences, magical properties, folk folklore, and practical witchcraft uses for essential kitchen and ritual herbs.",
    url: "https://witchr.com/herbs",
  });

  const itemListJsonLd = getItemListJsonLd(
    herbs.map((h) => ({
      name: `${h.name} in Witchcraft`,
      url: `https://witchr.com/herbs/${h.slug}`,
      description: h.oneLiner,
    }))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      <JsonLd data={breadcrumbs} />
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={itemListJsonLd} />

      {/* 1. Breadcrumb Navigation */}
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
        <span className="text-lavender-moon">Herbs</span>
      </nav>

      {/* 2. Header & Philosophy */}
      <header className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border-highlight text-lavender-moon text-xs font-mono uppercase tracking-ceremonial">
            <FourPointStar className="w-2.5 h-2.5" />
            <span>Occult Botanical Codex · {herbs.length} Core Reference Entries</span>
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-bone tracking-wide leading-[1.1] celestial-glow">
          Herbs in Witchcraft
        </h1>

        <p className="text-lg md:text-xl text-bone-muted leading-relaxed font-sans pt-1">
          A grounded, practical reference directory for kitchen botanicals, sacred plants, and classical correspondences. You do not need an apothecary of rare exotics—your spice rack holds ancient botanicals that have anchored human intention for millennia.
        </p>

        <div className="p-4 sm:p-5 rounded-xl bg-surface border border-border-highlight flex items-start gap-3.5 text-xs sm:text-sm text-bone-dim font-sans shadow-subtle">
          <ShieldCheck className="w-5 h-5 text-lavender-moon shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Witchr approaches botanical magic as a somatic sensory anchor and traditional folk language rather than supernatural coercion. We emphasize ethical sourcing, common garden herbs over endangered wild species, and rigorous physical safety.
          </p>
        </div>

        <CelestialDivider className="max-w-sm my-4" />
      </header>

      {/* 3. The Botanical Directory Grid */}
      <section aria-labelledby="directory-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-border pb-4 gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
              <GrimoireStar className="w-3 h-3 text-lavender-dim" />
              <span>Reference Index</span>
            </span>
            <h2
              id="directory-heading"
              className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
            >
              The Herb Directory
            </h2>
          </div>
          <p className="text-xs font-mono text-bone-dim uppercase tracking-wider">
            Displaying all {herbs.length} guides
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {herbs.map((herb) => (
            <article
              key={herb.slug}
              className="tarot-frame p-6 sm:p-7 rounded-2xl bg-surface border border-border-ornate flex flex-col justify-between hover:border-lavender/60 hover:shadow-card-tarot transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-20 group-hover:opacity-60 transition-opacity">
                <TarotCornerFlourish className="w-4 h-4 text-lavender-moon rotate-90" />
              </div>

              <div className="space-y-4">
                {/* Meta Badges */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[11px] font-mono uppercase tracking-ceremonial px-2.5 py-0.5 rounded bg-surface-elevated border border-border-highlight text-lavender-moon font-medium">
                    {herb.primaryIntent}
                  </span>
                  {herb.correspondences.element && (
                    <span className="text-[11px] font-mono text-bone-dim uppercase tracking-wider">
                      {herb.correspondences.element} · {herb.correspondences.planet || "Solar"}
                    </span>
                  )}
                </div>

                {/* Title & One-Liner */}
                <div>
                  <h3 className="font-display text-2xl font-bold text-bone group-hover:text-lavender-light transition-colors tracking-wide">
                    <Link
                      href={`/herbs/${herb.slug}`}
                      className="focus:outline-none focus:underline"
                    >
                      {herb.name}
                    </Link>
                  </h3>
                  <p className="text-xs font-mono text-lavender-dim uppercase tracking-wider pt-0.5">
                    {herb.h1 || `${herb.name} in Witchcraft`}
                  </p>
                </div>

                <p className="text-sm text-bone-muted leading-relaxed font-sans line-clamp-3">
                  {herb.oneLiner}
                </p>

                {/* Top Uses Quick List */}
                <div className="pt-2 border-t border-border-subtle/60 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-bone-dim block">
                    Core Applications:
                  </span>
                  <ul className="space-y-1 text-xs text-bone font-sans">
                    {herb.correspondences.uses.slice(0, 3).map((use, uIdx) => (
                      <li key={uIdx} className="flex items-start gap-1.5">
                        <span className="text-lavender-moon font-mono text-[10px] mt-0.5">
                          ✦
                        </span>
                        <span className="line-clamp-1">{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="pt-6 mt-4 border-t border-border-subtle/40">
                <Link
                  href={`/herbs/${herb.slug}`}
                  className="inline-flex items-center justify-between w-full text-xs font-mono uppercase tracking-ceremonial font-semibold text-lavender hover:text-lavender-light transition-colors py-2 min-h-[44px]"
                  aria-label={`Read full witchcraft guide for ${herb.name}`}
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Practical Botanical Philosophy */}
      <section
        aria-labelledby="philosophy-heading"
        className="tarot-frame p-8 sm:p-10 rounded-2xl bg-surface-elevated/40 border border-border-ornate space-y-6"
      >
        <div className="border-b border-border-subtle pb-4">
          <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
            <FourPointStar className="w-2.5 h-2.5" />
            <span>Foundational Principles</span>
          </span>
          <h2
            id="philosophy-heading"
            className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
          >
            How Herbal Magic Operates in Modern Witchcraft
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2.5 p-5 rounded-xl bg-surface border border-border-subtle">
            <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-border-highlight flex items-center justify-center text-lavender-moon">
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="font-display text-lg font-semibold text-bone tracking-wide">
              1. Grounded Sensory Anchors
            </h3>
            <p className="text-sm text-bone-muted leading-relaxed font-sans">
              Aromatic botanicals offer tangible sensory touchstones—using familiar fragrances like camphor, pinene, and menthol to anchor attention, quiet mental clutter, and cultivate emotional presence.
            </p>
          </div>

          <div className="space-y-2.5 p-5 rounded-xl bg-surface border border-border-subtle">
            <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-border-highlight flex items-center justify-center text-lavender-moon">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="font-display text-lg font-semibold text-bone tracking-wide">
              2. Folk Lore Over Supernatural Dogma
            </h3>
            <p className="text-sm text-bone-muted leading-relaxed font-sans">
              Correspondence systems represent diverse historical and folk traditions rather than standardized rules. Classical elemental and planetary attributions serve as adaptable symbolic frameworks for reflection.
            </p>
          </div>

          <div className="space-y-2.5 p-5 rounded-xl bg-surface border border-border-subtle">
            <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-border-highlight flex items-center justify-center text-lavender-moon">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-display text-lg font-semibold text-bone tracking-wide">
              3. Sustainability & Safety First
            </h3>
            <p className="text-sm text-bone-muted leading-relaxed font-sans">
              Witchr champions common kitchen and garden herbs over poached or endangered species. Every guide includes strict warnings regarding fire safety, dilution, and pet toxicity.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Semantic Cross-Links (Herbs to Rituals & Problem Hubs) */}
      <section
        aria-labelledby="cross-links-heading"
        className="space-y-6 pt-4"
      >
        <div className="border-b border-border-subtle pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Cross-Disciplinary Magic</span>
            </span>
            <h2
              id="cross-links-heading"
              className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
            >
              Pairing Herbs with Witchr Problem Hubs & Rituals
            </h2>
          </div>
          <Link
            href="/spell-finder"
            className="text-xs font-mono uppercase tracking-wideDisplay text-lavender hover:text-lavender-light flex items-center gap-1 min-h-[44px]"
          >
            <span>Spell Finder Tool</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <Link
            href="/protection"
            className="p-5 rounded-xl bg-surface border border-border-subtle hover:border-lavender/60 transition-colors group space-y-2 block"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon font-semibold">
                Protection & Boundaries
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-bone-dim group-hover:text-lavender group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-bone-muted font-sans leading-relaxed">
              Pair <strong className="text-bone font-medium">Rosemary</strong>, <strong className="text-bone font-medium">Sage</strong>, and <strong className="text-bone font-medium">Basil</strong> with <strong className="text-bone font-medium">Black Candles</strong> to enforce domestic boundaries and ward against draining visitors.
            </p>
          </Link>

          <Link
            href="/money"
            className="p-5 rounded-xl bg-surface border border-border-subtle hover:border-lavender/60 transition-colors group space-y-2 block"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon font-semibold">
                Money & Financial Clarity
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-bone-dim group-hover:text-lavender group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-bone-muted font-sans leading-relaxed">
              Combine <strong className="text-bone font-medium">Cinnamon</strong>, <strong className="text-bone font-medium">Mint</strong>, and <strong className="text-bone font-medium">Chamomile</strong> with practical budgeting rituals to accelerate cash flow and shatter financial avoidance.
            </p>
          </Link>

          <Link
            href="/confidence"
            className="p-5 rounded-xl bg-surface border border-border-subtle hover:border-lavender/60 transition-colors group space-y-2 block"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon font-semibold">
                Confidence & Voice
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-bone-dim group-hover:text-lavender group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-bone-muted font-sans leading-relaxed">
              Work with <strong className="text-bone font-medium">Thyme</strong> and <strong className="text-bone font-medium">Bay Leaf</strong> before high-stakes meetings to steady nervous tremors and stop apologizing for taking up space.
            </p>
          </Link>

          <Link
            href="/letting-go"
            className="p-5 rounded-xl bg-surface border border-border-subtle hover:border-lavender/60 transition-colors group space-y-2 block"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon font-semibold">
                Letting Go & Severance
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-bone-dim group-hover:text-lavender group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-bone-muted font-sans leading-relaxed">
              Employ <strong className="text-bone font-medium">Lavender</strong> and <strong className="text-bone font-medium">Chamomile</strong> during cord-cutting rituals to soothe the nervous system and heal after painful severances.
            </p>
          </Link>

          <Link
            href="/direction"
            className="p-5 rounded-xl bg-surface border border-border-subtle hover:border-lavender/60 transition-colors group space-y-2 block"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon font-semibold">
                Direction & Movement
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-bone-dim group-hover:text-lavender group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-bone-muted font-sans leading-relaxed">
              Engage <strong className="text-bone font-medium">Mugwort</strong> and <strong className="text-bone font-medium">Garden Sage</strong> when untangling decision paralysis and reconnecting with subconscious guidance.
            </p>
          </Link>

          <Link
            href="/grimoire"
            className="p-5 rounded-xl bg-surface border border-border-subtle hover:border-lavender/60 transition-colors group space-y-2 block"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon font-semibold">
                Beginner Grimoire
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-bone-dim group-hover:text-lavender group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-bone-muted font-sans leading-relaxed">
              Explore the Witchr foundational codex on candle colors, lunar timing, intention writing, and core occult tools.
            </p>
          </Link>
        </div>
      </section>

      {/* 6. Product CTA */}
      <ProductCTA
        title="The Witchr Botanical Field Guide"
        description="A printable, altar-side reference manual organizing classical correspondences, kitchen substitutions, safety cautions, and practical rituals for modern practitioners."
        productUrl={null}
        eyebrow="Printable Botanical Codex"
      />

      <CelestialDivider className="my-8" />
    </div>
  );
}
