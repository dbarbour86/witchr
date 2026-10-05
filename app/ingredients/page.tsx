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
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Layers,
  Compass,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ingredients in Witchcraft: Minerals, Elements & Ritual Directory",
  description:
    "The complete Witchr ritual ingredient directory. Explore mineral grounding, threshold elements, traditional lore, and practical witchcraft uses for essential ingredients.",
  alternates: {
    canonical: "https://witchr.com/ingredients",
  },
  openGraph: {
    title:
      "Ingredients in Witchcraft: Minerals, Elements & Ritual Directory | Witchr",
    description:
      "Explore the Witchr ingredient directory. Grounded reference entries on mineral grounding, traditional folk preservation, and practical witchcraft uses for essential ritual ingredients.",
    url: "https://witchr.com/ingredients",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Ingredients in Witchcraft: Minerals, Elements & Ritual Directory | Witchr",
    description:
      "Explore the Witchr ingredient directory. Grounded reference entries on mineral grounding, traditional folk preservation, and practical witchcraft uses for essential ritual ingredients.",
  },
};

export default function IngredientsHubPage() {
  const ingredients = getCorrespondencesByCategory("ingredient");

  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", item: "https://witchr.com" },
    { name: "Ingredients", item: "https://witchr.com/ingredients" },
  ]);

  const webPageJsonLd = getWebPageJsonLd({
    title:
      "Ingredients in Witchcraft: Minerals, Elements & Ritual Directory | Witchr",
    description:
      "The complete Witchr ritual ingredient directory. Explore mineral grounding, threshold elements, traditional lore, and practical witchcraft uses for essential ingredients.",
    url: "https://witchr.com/ingredients",
  });

  const itemListJsonLd = getItemListJsonLd(
    ingredients.map((item) => ({
      name: `${item.name} in Witchcraft`,
      url: `https://witchr.com/ingredients/${item.slug}`,
      description: item.oneLiner,
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
        <span className="text-lavender-moon">Ingredients</span>
      </nav>

      {/* 2. Header & Philosophy */}
      <header className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border-highlight text-lavender-moon text-xs font-mono uppercase tracking-ceremonial">
            <FourPointStar className="w-2.5 h-2.5" />
            <span>Occult Mineral & Specimen Codex · Ritual Directory</span>
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-bone tracking-wide leading-[1.1] celestial-glow">
          Ingredients in Witchcraft
        </h1>

        <p className="text-lg md:text-xl text-bone-muted leading-relaxed font-sans pt-1">
          A grounded reference directory for minerals, elemental waters, threshold barriers, and physical substances used in modern practice. Witchcraft is anchored in the physical world: pantry minerals, crystalline salts, and clean water provide the bedrock for drawing boundaries that hold.
        </p>

        <div className="p-4 sm:p-5 rounded-xl bg-surface border border-border-highlight flex items-start gap-3.5 text-xs sm:text-sm text-bone-dim font-sans shadow-subtle">
          <ShieldCheck className="w-5 h-5 text-lavender-moon shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Witchr approaches ritual ingredients as somatic sensory anchors and symbolic boundary tools rather than magical shortcuts. We prioritize mundane physical safety, material compatibility, and environmental responsibility—never salting living outdoor soil or ingesting ritual compounds.
          </p>
        </div>

        <CelestialDivider className="max-w-sm my-4" />
      </header>

      {/* 3. The Ingredients Directory Grid */}
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
              The Ingredient Directory
            </h2>
          </div>
          <p className="text-xs font-mono text-bone-dim uppercase tracking-wider">
            Displaying {ingredients.length} core {ingredients.length === 1 ? "entry" : "entries"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingredients.map((item) => (
            <article
              key={item.slug}
              className="tarot-frame p-6 sm:p-7 rounded-2xl bg-surface border border-border-ornate flex flex-col justify-between hover:border-lavender/60 hover:shadow-card-tarot transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-20 group-hover:opacity-60 transition-opacity">
                <TarotCornerFlourish className="w-4 h-4 text-lavender-moon rotate-90" />
              </div>

              <div className="space-y-4">
                {/* Meta Badges */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[11px] font-mono uppercase tracking-ceremonial px-2.5 py-0.5 rounded bg-surface-elevated border border-border-highlight text-lavender-moon font-medium">
                    {item.primaryIntent}
                  </span>
                  {item.correspondences.element && (
                    <span className="text-[11px] font-mono text-bone-dim uppercase tracking-wider">
                      {item.correspondences.element} · {item.correspondences.planet || "Earth"}
                    </span>
                  )}
                </div>

                {/* Title & One-Liner */}
                <div>
                  <h3 className="font-display text-2xl font-bold text-bone group-hover:text-lavender-light transition-colors tracking-wide">
                    <Link
                      href={`/ingredients/${item.slug}`}
                      className="focus:outline-none focus:underline"
                    >
                      {item.name}
                    </Link>
                  </h3>
                  <p className="text-xs font-mono text-lavender-dim uppercase tracking-wider pt-0.5">
                    {item.h1 || `${item.name} in Witchcraft`}
                  </p>
                </div>

                <p className="text-sm text-bone-muted leading-relaxed font-sans line-clamp-3">
                  {item.oneLiner}
                </p>

                {/* Top Uses Quick List */}
                <div className="pt-2 border-t border-border-subtle/60 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-bone-dim block">
                    Core Applications:
                  </span>
                  <ul className="space-y-1 text-xs text-bone font-sans">
                    {item.correspondences.uses.slice(0, 3).map((use, uIdx) => (
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
                  href={`/ingredients/${item.slug}`}
                  className="inline-flex items-center justify-between w-full text-xs font-mono uppercase tracking-ceremonial font-semibold text-lavender hover:text-lavender-light transition-colors py-2 min-h-[44px]"
                  aria-label={`Read full witchcraft guide for ${item.name}`}
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Foundational Principles */}
      <section
        aria-labelledby="principles-heading"
        className="tarot-frame p-8 sm:p-10 rounded-2xl bg-surface-elevated/40 border border-border-ornate space-y-6"
      >
        <div className="border-b border-border-subtle pb-4">
          <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
            <FourPointStar className="w-2.5 h-2.5" />
            <span>Core Mechanics</span>
          </span>
          <h2
            id="principles-heading"
            className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
          >
            How Ritual Ingredients Function in Practice
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2.5 p-5 rounded-xl bg-surface border border-border-subtle">
            <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-border-highlight flex items-center justify-center text-lavender-moon">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="font-display text-lg font-semibold text-bone tracking-wide">
              1. Non-Decaying Bedrock
            </h3>
            <p className="text-sm text-bone-muted leading-relaxed font-sans">
              Unlike fresh foliage or seasonal botanicals that rot with time, minerals like salt and stone remain chemically stable. They represent unchanging boundaries and enduring limits.
            </p>
          </div>

          <div className="space-y-2.5 p-5 rounded-xl bg-surface border border-border-subtle">
            <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-border-highlight flex items-center justify-center text-lavender-moon">
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="font-display text-lg font-semibold text-bone tracking-wide">
              2. Tangible Spatial Demarcation
            </h3>
            <p className="text-sm text-bone-muted leading-relaxed font-sans">
              Pouring a visible line or holding a textured mineral anchors the mind in the physical environment. It converts abstract boundaries into tactile, visible reality that the nervous system respects.
            </p>
          </div>

          <div className="space-y-2.5 p-5 rounded-xl bg-surface border border-border-subtle">
            <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-border-highlight flex items-center justify-center text-lavender-moon">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="font-display text-lg font-semibold text-bone tracking-wide">
              3. Accessible Domestic Alchemy
            </h3>
            <p className="text-sm text-bone-muted leading-relaxed font-sans">
              Traditional folk magic has always relied on everyday kitchen supplies. Pantry salt, spring water, and iron nail pins carry deep ancestral pedigrees and require no exotic expenses.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Sanctum Working Builder CTA */}
      <section
        aria-label="Sanctum Working Builder"
        className="tarot-frame p-6 sm:p-8 rounded-2xl relative overflow-hidden bg-surface-elevated/80 border border-border-ornate shadow-card-tarot"
      >
        <div className="absolute top-2.5 left-2.5 pointer-events-none opacity-40">
          <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
        </div>
        <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-40 rotate-90">
          <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-lavender-light" />
              <span>Sanctum Working Synthesis</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-semibold text-bone tracking-wide">
              Build a Working Around What You Already Have
            </h3>
            <p className="text-sm sm:text-base text-bone-muted leading-relaxed font-sans">
              Have salt, raw honey, or basic pantry supplies on hand? Select your current intention in Sanctum to synthesize an accessible ritual working customized to your available materials.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/sanctum/working"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface-hover hover:bg-surface-elevated border border-border-ornate hover:border-lavender text-lavender-light text-xs font-mono uppercase tracking-ceremonial font-semibold shadow-glow-purple transition-all min-h-[44px]"
            >
              <span>Open Working Builder</span>
              <ArrowRight className="w-3.5 h-3.5 text-lavender-moon" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Cross-Directory Navigation */}
      <section className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-ceremonial text-bone-dim">
        <span>Explore Related Directories:</span>
        <div className="flex items-center gap-4 flex-wrap">
          <Link href="/herbs" className="hover:text-lavender-light flex items-center gap-1 min-h-[44px]">
            <span>Herbs Directory</span>
            <ArrowRight className="w-3 h-3 text-lavender-moon" />
          </Link>
          <Link href="/correspondences" className="hover:text-lavender-light flex items-center gap-1 min-h-[44px]">
            <span>Correspondences Codex</span>
            <ArrowRight className="w-3 h-3 text-lavender-moon" />
          </Link>
          <Link href="/candles/black" className="hover:text-lavender-light flex items-center gap-1 min-h-[44px]">
            <span>Candle Guides</span>
            <ArrowRight className="w-3 h-3 text-lavender-moon" />
          </Link>
        </div>
      </section>
    </div>
  );
}
