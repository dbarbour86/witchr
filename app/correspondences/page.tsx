import type { Metadata } from "next";
import Link from "next/link";
import { getAllIntentCorrespondences } from "@/content/intent-correspondences";
import { CORRESPONDENCES, getCorrespondencesByCategory } from "@/content/correspondences";
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
  MoonPhaseRibbon,
} from "@/components/OrnateFrames";
import {
  ShieldCheck,
  Sparkles,
  Flame,
  Leaf,
  Layers,
  Compass,
  ArrowRight,
  BookOpen,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Correspondences in Witchcraft: Intentions, Elements & Reference Directory",
  description:
    "A practical, non-dogmatic guide to correspondences in modern witchcraft. Explore how herbs, candles, minerals, and symbols anchor ritual intention and personal sovereignty.",
  alternates: {
    canonical: "https://witchr.com/correspondences",
  },
  openGraph: {
    title: "Correspondences in Witchcraft: Intentions, Elements & Reference Directory | Witchr",
    description:
      "Explore Witchr's grounded correspondences directory. Learn traditional associations for herbs, candles, minerals, and symbols across protection, love, and cleansing.",
    url: "https://witchr.com/correspondences",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Correspondences in Witchcraft: Intentions, Elements & Reference Directory | Witchr",
    description:
      "Explore Witchr's grounded correspondences directory. Learn traditional associations for herbs, candles, minerals, and symbols across protection, love, and cleansing.",
  },
};

export default function CorrespondencesHubPage() {
  const intentGuides = getAllIntentCorrespondences();
  const herbs = getCorrespondencesByCategory("herb");
  const candles = getCorrespondencesByCategory("candle");
  const ingredients = getCorrespondencesByCategory("ingredient");
  const symbols = getCorrespondencesByCategory("symbol");

  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", item: "https://witchr.com" },
    { name: "Correspondences", item: "https://witchr.com/correspondences" },
  ]);

  const webPageJsonLd = getWebPageJsonLd({
    title: "Correspondences in Witchcraft: Intentions, Elements & Reference Directory | Witchr",
    description:
      "A practical, non-dogmatic guide to correspondences in modern witchcraft. Explore how herbs, candles, minerals, and symbols anchor ritual intention and personal sovereignty.",
    url: "https://witchr.com/correspondences",
  });

  const itemListJsonLd = getItemListJsonLd(
    intentGuides.map((guide) => ({
      name: `${guide.title} Correspondences`,
      url: `https://witchr.com/correspondences/${guide.slug}`,
      description: guide.oneLiner,
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
        <span className="text-lavender-moon">Correspondences</span>
      </nav>

      {/* 2. Hero & Philosophy */}
      <header className="max-w-4xl space-y-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border-highlight text-lavender-moon text-xs font-mono uppercase tracking-ceremonial shadow-subtle">
            <FourPointStar className="w-2.5 h-2.5" />
            <span>Semantic Codex · Modern Occult Taxonomy</span>
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-bone tracking-wide leading-[1.1] celestial-glow">
          Correspondences in Witchcraft
        </h1>

        <p className="text-lg md:text-xl text-bone-muted leading-relaxed font-sans pt-1">
          A correspondence is not a cosmic rule or supernatural code. It is a traditional sensory language—a network of physical herbs, colored waxes, mineral textures, and geometric marks that human practitioners use to anchor intention and align somatic focus.
        </p>

        {/* Philosophy Callout: Nuance & Diversity of Tradition */}
        <div className="p-6 sm:p-7 rounded-2xl bg-surface-elevated/80 border border-border-ornate relative overflow-hidden shadow-card-tarot">
          <div className="absolute top-2.5 left-2.5 pointer-events-none opacity-40">
            <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
          </div>
          <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-40 rotate-90">
            <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
          </div>

          <div className="space-y-3 relative z-10">
            <div className="flex items-center gap-2 text-lavender-moon text-xs font-mono uppercase tracking-ceremonial font-semibold">
              <ShieldCheck className="w-4 h-4 text-lavender-light" />
              <span>No Universal Dogma</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-bone tracking-wide">
              Tradition, Geography, and Practitioner Resonance
            </h2>
            <p className="text-sm sm:text-base text-bone-muted leading-relaxed font-sans">
              There is no single, universally accepted correspondence system in witchcraft. A botanical associated with solar protection in Mediterranean folk medicine may symbolize ancestor remembrance in Celtic lore or culinary hospitality elsewhere. Modern craft weaves together historical folklore, planetary astrology, and personal sensory resonance.
            </p>
            <p className="text-xs sm:text-sm text-bone-dim leading-relaxed font-sans pt-1">
              Treat these tables as battle-tested suggestions rather than rigid commandments. When a specific herb, candle, or symbol reliably triggers clarity and resolve within your own body, that association holds authority for your practice.
            </p>
          </div>
        </div>

        <CelestialDivider className="max-w-sm my-4" />
      </header>

      {/* 3. Core Intent Guides (Protection, Love, Cleansing) */}
      <section aria-labelledby="intent-hubs-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-border pb-4 gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
              <GrimoireStar className="w-3 h-3 text-lavender-dim" />
              <span>Core Intent Guides</span>
            </span>
            <h2
              id="intent-hubs-heading"
              className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
            >
              Explore by Working Intent
            </h2>
          </div>
          <p className="text-xs font-mono text-bone-dim uppercase tracking-wider">
            3 In-Depth Semantic Guides
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {intentGuides.map((guide) => (
            <article
              key={guide.slug}
              className="tarot-frame p-6 sm:p-7 rounded-2xl bg-surface border border-border-ornate flex flex-col justify-between hover:border-lavender/60 hover:shadow-card-tarot transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-20 group-hover:opacity-60 transition-opacity">
                <TarotCornerFlourish className="w-5 h-5 text-lavender-moon rotate-90" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-ceremonial text-lavender-dim px-2.5 py-0.5 rounded-full bg-background border border-border-subtle">
                    {guide.intentBadge}
                  </span>
                  <ArrowRight className="w-4 h-4 text-bone-dim group-hover:text-lavender-light group-hover:translate-x-1 transition-all" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-bold text-bone group-hover:text-lavender-light transition-colors">
                    <Link href={`/correspondences/${guide.slug}`} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {guide.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-bone-muted leading-relaxed font-sans line-clamp-3">
                    {guide.oneLiner}
                  </p>
                </div>

                {/* Micro Category Pills */}
                <div className="pt-2 flex flex-wrap gap-1.5 text-[10.5px] font-mono text-bone-dim">
                  <span className="px-2 py-0.5 rounded bg-surface-elevated border border-border-subtle">
                    {guide.herbs.length} Herbs
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-elevated border border-border-subtle">
                    {guide.candles.length} Candles
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-elevated border border-border-subtle">
                    {guide.symbols.length} Symbols
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-lavender-moon group-hover:text-lavender-light transition-colors mt-6">
                <span>View {guide.title} Directory</span>
                <span aria-hidden="true">→</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Category Crossways: Connecting Witchr's Systems */}
      <section aria-labelledby="categories-heading" className="space-y-6">
        <div className="border-b border-border pb-4">
          <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
            <FourPointStar className="w-2.5 h-2.5" />
            <span>Category Taxonomy</span>
          </span>
          <h2
            id="categories-heading"
            className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
          >
            The Five Building Blocks of Craft
          </h2>
          <p className="text-sm text-bone-muted font-sans mt-1">
            Correspondences work together like musical notes. Explore Witchr's dedicated directories across each material category:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Herbs */}
          <div className="tarot-frame p-6 rounded-2xl bg-surface border border-border-ornate space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-border-highlight flex items-center justify-center text-lavender-moon">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-bone">
                Botanicals & Herbs
              </h3>
              <p className="text-xs text-bone-muted leading-relaxed font-sans">
                Living solar transmitters, boundary foliage, and kitchen aromatics that stimulate the nervous system and anchor spatial intention.
              </p>
              <div className="text-[11px] font-mono text-lavender-dim space-y-1 pt-1">
                <div>· Rosemary, Basil, Sage</div>
                <div>· Lavender, Cinnamon, Mint</div>
                <div>· Bay Leaf, Chamomile, Thyme</div>
              </div>
            </div>
            <Link
              href="/herbs"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wide text-lavender hover:text-lavender-light pt-2"
            >
              <span>Explore Herb Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Candles */}
          <div className="tarot-frame p-6 rounded-2xl bg-surface border border-border-ornate space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-border-highlight flex items-center justify-center text-lavender-moon">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-bone">
                Candles & Fire
              </h3>
              <p className="text-xs text-bone-muted leading-relaxed font-sans">
                Thermal kinetic anchors. Fire transforms dense wax into light and soot, creating an unmistakable ticking clock for mental focus.
              </p>
              <div className="text-[11px] font-mono text-lavender-dim space-y-1 pt-1">
                <div>· <Link href="/candles/black" className="hover:underline">Black Candle</Link> (Absorbing & Closure)</div>
                <div>· <Link href="/candles/white" className="hover:underline">White Candle</Link> (Cleansing & Truth)</div>
                <div>· <Link href="/candles/red" className="hover:underline">Red Candle</Link> (Vitality & Courage)</div>
              </div>
            </div>
            <Link
              href="/candles/black"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wide text-lavender hover:text-lavender-light pt-2"
            >
              <span>Explore Candle Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Minerals & Ingredients */}
          <div className="tarot-frame p-6 rounded-2xl bg-surface border border-border-ornate space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-border-highlight flex items-center justify-center text-lavender-moon">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-bone">
                Minerals & Ingredients
              </h3>
              <p className="text-xs text-bone-muted leading-relaxed font-sans">
                Dense physical bedrock that does not rot or change with the weather. Foundational anchors for drawing lines that hold.
              </p>
              <div className="text-[11px] font-mono text-lavender-dim space-y-1 pt-1">
                <div>· <Link href="/ingredients/salt" className="hover:underline">Coarse Salt</Link> (Perimeter lines)</div>
                <div>· Natural Spring Water (Reset)</div>
                <div>· Stone Bowls & Iron Pins</div>
              </div>
            </div>
            <Link
              href="/ingredients/salt"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wide text-lavender hover:text-lavender-light pt-2"
            >
              <span>Explore Salt Specimen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Symbols & Sigils */}
          <div className="tarot-frame p-6 rounded-2xl bg-surface border border-border-ornate space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-border-highlight flex items-center justify-center text-lavender-moon">
                <GrimoireStar className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-bone">
                Symbols & Sigils
              </h3>
              <p className="text-xs text-bone-muted leading-relaxed font-sans">
                Visual compression of complex intent. Ancient geometry and modern graphic sigils that bypass mental chatter and command the unconscious.
              </p>
              <div className="text-[11px] font-mono text-lavender-dim space-y-1 pt-1">
                <div>· <Link href="/symbols/pentagram" className="hover:underline">The Pentagram</Link> (Five Elements)</div>
                <div>· <Link href="/sigils#protection" className="hover:underline">Perimeter & Shield Sigil</Link></div>
                <div>· <Link href="/sigils#self-respect" className="hover:underline">The Unbent Spine Sigil</Link></div>
              </div>
            </div>
            <Link
              href="/sigils"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wide text-lavender hover:text-lavender-light pt-2"
            >
              <span>Explore Sigil Gallery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Master Intent Matrix (Responsive Table/Cards) */}
      <section aria-labelledby="matrix-heading" className="space-y-6">
        <div className="border-b border-border pb-4">
          <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Quick Lookup Reference</span>
          </span>
          <h2
            id="matrix-heading"
            className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
          >
            Master Correspondence Matrix
          </h2>
          <p className="text-sm text-bone-muted font-sans mt-1">
            Compare foundational associations across major intentions, from herbs and candles to rituals and tools:
          </p>
        </div>

        {/* Responsive Matrix: Card stack on small screens, structured table on larger displays */}
        <div className="hidden lg:block overflow-x-auto rounded-2xl border border-border-ornate bg-surface shadow-card-tarot">
          <table className="w-full text-left text-xs text-bone-muted font-sans border-collapse">
            <thead>
              <tr className="border-b border-border-subtle bg-surface-elevated font-mono uppercase text-lavender-moon tracking-ceremonial">
                <th scope="col" className="p-4 font-semibold">Intention</th>
                <th scope="col" className="p-4 font-semibold">Primary Herbs</th>
                <th scope="col" className="p-4 font-semibold">Candle Color</th>
                <th scope="col" className="p-4 font-semibold">Mineral / Material</th>
                <th scope="col" className="p-4 font-semibold">Key Symbols & Sigils</th>
                <th scope="col" className="p-4 font-semibold">Related Ritual / Tool</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/60">
              <tr className="hover:bg-surface-hover/50 transition-colors">
                <td className="p-4 font-display font-bold text-bone text-sm">
                  <Link href="/correspondences/protection" className="hover:text-lavender-light underline decoration-lavender/30">
                    Protection & Boundaries
                  </Link>
                </td>
                <td className="p-4">
                  <Link href="/herbs/rosemary" className="text-lavender-light hover:underline">Rosemary</Link>,{" "}
                  <Link href="/herbs/basil" className="text-lavender-light hover:underline">Basil</Link>,{" "}
                  <Link href="/herbs/sage" className="text-lavender-light hover:underline">Sage</Link>,{" "}
                  <Link href="/herbs/thyme" className="text-lavender-light hover:underline">Thyme</Link>
                </td>
                <td className="p-4">
                  <Link href="/candles/black" className="text-lavender-light hover:underline">Black</Link> (absorb),{" "}
                  <Link href="/candles/white" className="text-lavender-light hover:underline">White</Link> (ward)
                </td>
                <td className="p-4">
                  <Link href="/ingredients/salt" className="text-lavender-light hover:underline">Coarse Salt</Link>, Iron nails, Obsidian
                </td>
                <td className="p-4">
                  <Link href="/symbols/pentagram" className="text-lavender-light hover:underline">Pentagram</Link>, Stone Wall, Shield Sigil
                </td>
                <td className="p-4">
                  <Link href="/rituals/leave-me-alone-protection" className="text-lavender-light hover:underline">Leave Me Alone</Link> ·{" "}
                  <Link href="/protection" className="text-lavender-dim hover:underline">Hub</Link>
                </td>
              </tr>

              <tr className="hover:bg-surface-hover/50 transition-colors">
                <td className="p-4 font-display font-bold text-bone text-sm">
                  <Link href="/correspondences/love" className="hover:text-lavender-light underline decoration-lavender/30">
                    Love & Sovereignty
                  </Link>
                </td>
                <td className="p-4">
                  <Link href="/herbs/lavender" className="text-lavender-light hover:underline">Lavender</Link>,{" "}
                  <Link href="/herbs/cinnamon" className="text-lavender-light hover:underline">Cinnamon</Link>,{" "}
                  <Link href="/herbs/basil" className="text-lavender-light hover:underline">Basil</Link>,{" "}
                  <Link href="/herbs/chamomile" className="text-lavender-light hover:underline">Chamomile</Link>
                </td>
                <td className="p-4">
                  <Link href="/candles/red" className="text-lavender-light hover:underline">Red</Link> (passion),{" "}
                  <Link href="/candles/white" className="text-lavender-light hover:underline">White</Link> (truth), Pink
                </td>
                <td className="p-4">
                  Rose quartz, Raw honey, Spring water
                </td>
                <td className="p-4">
                  <Link href="/sigils#self-respect" className="text-lavender-light hover:underline">Unbent Spine</Link>, Boundaries Sigil
                </td>
                <td className="p-4">
                  <Link href="/rituals/love-without-losing-yourself" className="text-lavender-light hover:underline">Love Without Losing</Link> ·{" "}
                  <Link href="/love" className="text-lavender-dim hover:underline">Hub</Link>
                </td>
              </tr>

              <tr className="hover:bg-surface-hover/50 transition-colors">
                <td className="p-4 font-display font-bold text-bone text-sm">
                  <Link href="/correspondences/cleansing" className="hover:text-lavender-light underline decoration-lavender/30">
                    Cleansing & Reset
                  </Link>
                </td>
                <td className="p-4">
                  <Link href="/herbs/rosemary" className="text-lavender-light hover:underline">Rosemary</Link>,{" "}
                  <Link href="/herbs/sage" className="text-lavender-light hover:underline">Sage</Link>,{" "}
                  <Link href="/herbs/mint" className="text-lavender-light hover:underline">Mint</Link>,{" "}
                  <Link href="/herbs/bay-leaf" className="text-lavender-light hover:underline">Bay Leaf</Link>
                </td>
                <td className="p-4">
                  <Link href="/candles/white" className="text-lavender-light hover:underline">White</Link> (purify),{" "}
                  <Link href="/candles/black" className="text-lavender-light hover:underline">Black</Link> (pre-cleanse)
                </td>
                <td className="p-4">
                  <Link href="/ingredients/salt" className="text-lavender-light hover:underline">Coarse Salt</Link>, Vinegar, Clear quartz
                </td>
                <td className="p-4">
                  <Link href="/sigils#release" className="text-lavender-light hover:underline">Clean Cut</Link>, Deep Stillness, Open Gate
                </td>
                <td className="p-4">
                  <Link href="/rituals/new-beginning" className="text-lavender-light hover:underline">New Beginning</Link> ·{" "}
                  <Link href="/letting-go" className="text-lavender-dim hover:underline">Hub</Link>
                </td>
              </tr>

              <tr className="hover:bg-surface-hover/50 transition-colors">
                <td className="p-4 font-display font-bold text-bone text-sm">
                  <Link href="/money" className="hover:text-lavender-light underline decoration-lavender/30">
                    Money & Material Flow
                  </Link>
                </td>
                <td className="p-4">
                  <Link href="/herbs/cinnamon" className="text-lavender-light hover:underline">Cinnamon</Link>,{" "}
                  <Link href="/herbs/mint" className="text-lavender-light hover:underline">Mint</Link>,{" "}
                  <Link href="/herbs/basil" className="text-lavender-light hover:underline">Sweet Basil</Link>,{" "}
                  <Link href="/herbs/bay-leaf" className="text-lavender-light hover:underline">Bay Leaf</Link>
                </td>
                <td className="p-4">
                  Green (growth), Gold, <Link href="/candles/white" className="text-lavender-light hover:underline">White</Link> (substitute)
                </td>
                <td className="p-4">
                  Copper coins, Pyrite, Green aventurine
                </td>
                <td className="p-4">
                  Sovereign Ledger, Piercing Eye
                </td>
                <td className="p-4">
                  <Link href="/rituals/money-reset" className="text-lavender-light hover:underline">Money Reset</Link> ·{" "}
                  <Link href="/money" className="text-lavender-dim hover:underline">Hub</Link>
                </td>
              </tr>

              <tr className="hover:bg-surface-hover/50 transition-colors">
                <td className="p-4 font-display font-bold text-bone text-sm">
                  <Link href="/confidence" className="hover:text-lavender-light underline decoration-lavender/30">
                    Confidence & Vocal Authority
                  </Link>
                </td>
                <td className="p-4">
                  <Link href="/herbs/thyme" className="text-lavender-light hover:underline">Thyme</Link>,{" "}
                  <Link href="/herbs/cinnamon" className="text-lavender-light hover:underline">Cinnamon</Link>,{" "}
                  <Link href="/herbs/rosemary" className="text-lavender-light hover:underline">Rosemary</Link>
                </td>
                <td className="p-4">
                  <Link href="/candles/red" className="text-lavender-light hover:underline">Red</Link> (assertiveness), Yellow, Gold
                </td>
                <td className="p-4">
                  Carnelian, Tiger's eye, Brass
                </td>
                <td className="p-4">
                  Unapologetic Stature, Forward Strike
                </td>
                <td className="p-4">
                  <Link href="/rituals/confidence-before-you-walk-in" className="text-lavender-light hover:underline">Confidence Walk-In</Link> ·{" "}
                  <Link href="/confidence" className="text-lavender-dim hover:underline">Hub</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Scannable Card Stack */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
          {/* Card 1: Protection */}
          <div className="tarot-frame p-5 rounded-xl bg-surface border border-border-subtle space-y-3">
            <div className="flex items-center justify-between border-b border-border-subtle pb-2">
              <h3 className="font-display text-lg font-bold text-bone">
                <Link href="/correspondences/protection" className="text-lavender-light hover:underline">
                  Protection & Boundaries
                </Link>
              </h3>
              <span className="text-[10px] font-mono text-lavender-moon uppercase">Defense</span>
            </div>
            <div className="space-y-1.5 text-xs text-bone-muted font-sans">
              <div><strong className="text-bone-dim font-mono uppercase text-[10px]">Herbs:</strong> Rosemary, Basil, Sage, Thyme</div>
              <div><strong className="text-bone-dim font-mono uppercase text-[10px]">Candles:</strong> Black (absorb), White (ward)</div>
              <div><strong className="text-bone-dim font-mono uppercase text-[10px]">Minerals:</strong> Coarse Salt, Iron nails</div>
              <div><strong className="text-bone-dim font-mono uppercase text-[10px]">Sigils:</strong> Pentagram, Stone Wall</div>
            </div>
            <Link
              href="/correspondences/protection"
              className="inline-flex items-center gap-1 text-xs font-mono text-lavender hover:text-lavender-light pt-2"
            >
              <span>Open Protection Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Love */}
          <div className="tarot-frame p-5 rounded-xl bg-surface border border-border-subtle space-y-3">
            <div className="flex items-center justify-between border-b border-border-subtle pb-2">
              <h3 className="font-display text-lg font-bold text-bone">
                <Link href="/correspondences/love" className="text-lavender-light hover:underline">
                  Love & Sovereignty
                </Link>
              </h3>
              <span className="text-[10px] font-mono text-lavender-moon uppercase">Intimacy</span>
            </div>
            <div className="space-y-1.5 text-xs text-bone-muted font-sans">
              <div><strong className="text-bone-dim font-mono uppercase text-[10px]">Herbs:</strong> Lavender, Cinnamon, Basil, Chamomile</div>
              <div><strong className="text-bone-dim font-mono uppercase text-[10px]">Candles:</strong> Red (passion), White (truth)</div>
              <div><strong className="text-bone-dim font-mono uppercase text-[10px]">Minerals:</strong> Rose quartz, Raw honey</div>
              <div><strong className="text-bone-dim font-mono uppercase text-[10px]">Sigils:</strong> Unbent Spine, Boundaries</div>
            </div>
            <Link
              href="/correspondences/love"
              className="inline-flex items-center gap-1 text-xs font-mono text-lavender hover:text-lavender-light pt-2"
            >
              <span>Open Love Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Cleansing */}
          <div className="tarot-frame p-5 rounded-xl bg-surface border border-border-subtle space-y-3">
            <div className="flex items-center justify-between border-b border-border-subtle pb-2">
              <h3 className="font-display text-lg font-bold text-bone">
                <Link href="/correspondences/cleansing" className="text-lavender-light hover:underline">
                  Cleansing & Reset
                </Link>
              </h3>
              <span className="text-[10px] font-mono text-lavender-moon uppercase">Purify</span>
            </div>
            <div className="space-y-1.5 text-xs text-bone-muted font-sans">
              <div><strong className="text-bone-dim font-mono uppercase text-[10px]">Herbs:</strong> Rosemary, Sage, Mint, Bay Leaf</div>
              <div><strong className="text-bone-dim font-mono uppercase text-[10px]">Candles:</strong> White (purify), Black (pre-cleanse)</div>
              <div><strong className="text-bone-dim font-mono uppercase text-[10px]">Minerals:</strong> Coarse Salt, Vinegar</div>
              <div><strong className="text-bone-dim font-mono uppercase text-[10px]">Sigils:</strong> Clean Cut, Deep Stillness</div>
            </div>
            <Link
              href="/correspondences/cleansing"
              className="inline-flex items-center gap-1 text-xs font-mono text-lavender hover:text-lavender-light pt-2"
            >
              <span>Open Cleansing Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4: Money & Confidence */}
          <div className="tarot-frame p-5 rounded-xl bg-surface border border-border-subtle space-y-3">
            <div className="flex items-center justify-between border-b border-border-subtle pb-2">
              <h3 className="font-display text-lg font-bold text-bone">
                <Link href="/money" className="text-lavender-light hover:underline">
                  Money & Momentum
                </Link>
              </h3>
              <span className="text-[10px] font-mono text-lavender-moon uppercase">Action</span>
            </div>
            <div className="space-y-1.5 text-xs text-bone-muted font-sans">
              <div><strong className="text-bone-dim font-mono uppercase text-[10px]">Herbs:</strong> Cinnamon, Mint, Thyme, Bay Leaf</div>
              <div><strong className="text-bone-dim font-mono uppercase text-[10px]">Candles:</strong> Red, White, Green</div>
              <div><strong className="text-bone-dim font-mono uppercase text-[10px]">Minerals:</strong> Copper coins, Salt</div>
              <div><strong className="text-bone-dim font-mono uppercase text-[10px]">Sigils:</strong> Sovereign Ledger, Forward Strike</div>
            </div>
            <Link
              href="/spell-finder"
              className="inline-flex items-center gap-1 text-xs font-mono text-lavender hover:text-lavender-light pt-2"
            >
              <span>Find Ritual via Spell Finder</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Grounded Working Principles: How to Select & Substitute */}
      <section aria-labelledby="principles-heading" className="space-y-6">
        <div className="border-b border-border pb-4">
          <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Practical Rules of Craft</span>
          </span>
          <h2
            id="principles-heading"
            className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
          >
            How to Choose and Substitute Correspondences
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="tarot-frame p-6 rounded-xl bg-surface border border-border-subtle space-y-3">
            <div className="flex items-center gap-2 text-lavender-moon text-xs font-mono uppercase tracking-ceremonial">
              <CheckCircle2 className="w-4 h-4 text-lavender-light" />
              <span>Rule 1: Sensory Reality</span>
            </div>
            <h3 className="font-display text-lg font-semibold text-bone">
              Engage the Physical Senses
            </h3>
            <p className="text-xs sm:text-sm text-bone-muted leading-relaxed font-sans">
              Correspondences work by interrupting habitual mental chatter. Scent (crushed rosemary), texture (rough salt crystals), and light (a dancing flame) bypass intellectual overthinking to anchor your nervous system in present somatic reality.
            </p>
          </div>

          <div className="tarot-frame p-6 rounded-xl bg-surface border border-border-subtle space-y-3">
            <div className="flex items-center gap-2 text-lavender-moon text-xs font-mono uppercase tracking-ceremonial">
              <CheckCircle2 className="w-4 h-4 text-lavender-light" />
              <span>Rule 2: Universal Wildcards</span>
            </div>
            <h3 className="font-display text-lg font-semibold text-bone">
              Master the Three Universal Substitutes
            </h3>
            <p className="text-xs sm:text-sm text-bone-muted leading-relaxed font-sans">
              You never need to buy expensive, rare exotics. Traditional folk craft provides three universal wildcards: <Link href="/herbs/rosemary" className="text-lavender-light underline">Rosemary</Link> can substitute for any herb; a <Link href="/candles/white" className="text-lavender-light underline">White Candle</Link> can substitute for any candle color; and <Link href="/ingredients/salt" className="text-lavender-light underline">Coarse Salt</Link> grounds any working.
            </p>
          </div>

          <div className="tarot-frame p-6 rounded-xl bg-surface border border-border-subtle space-y-3">
            <div className="flex items-center gap-2 text-lavender-moon text-xs font-mono uppercase tracking-ceremonial">
              <CheckCircle2 className="w-4 h-4 text-lavender-light" />
              <span>Rule 3: Follow-Through</span>
            </div>
            <h3 className="font-display text-lg font-semibold text-bone">
              Ritual Precedes Physical Action
            </h3>
            <p className="text-xs sm:text-sm text-bone-muted leading-relaxed font-sans">
              Correspondences prepare your posture, resolve, and emotional clarity; they do not perform the physical work for you. If you burn herbs for confidence, you must still attend the interview. If you cast salt for boundaries, you must still say 'no.'
            </p>
          </div>
        </div>
      </section>

      {/* 7. Interactive Diagnostic CTAs */}
      <section className="p-8 sm:p-10 rounded-2xl bg-surface-elevated/70 border border-border-ornate relative overflow-hidden shadow-card-tarot">
        <div className="absolute top-2.5 left-2.5 pointer-events-none opacity-40">
          <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
        </div>
        <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-40 rotate-90">
          <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-surface border border-border-highlight text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Diagnostic Spell Finder</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-bone tracking-wide">
              Ready to Put These Correspondences to Work?
            </h2>
            <p className="text-sm text-bone-muted leading-relaxed font-sans">
              Match the exact ingredients you already have in your kitchen or apothecary with grounded, step-by-step rituals tailored to your current friction.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap shrink-0">
            <Link
              href="/spell-finder"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface hover:bg-surface-hover text-lavender-light border border-border-ornate hover:border-lavender hover:shadow-glow-purple text-xs font-mono uppercase tracking-ceremonial font-semibold transition-all min-h-[44px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-lavender-moon" />
              <span>Launch Spell Finder</span>
            </Link>
            <Link
              href="/rituals"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-surface-elevated hover:bg-surface-hover text-bone-dim hover:text-bone text-xs font-mono uppercase tracking-ceremonial transition-colors min-h-[44px]"
            >
              <span>Browse All Rituals</span>
            </Link>
          </div>
        </div>
      </section>

      <CelestialDivider className="my-8" />
    </div>
  );
}
