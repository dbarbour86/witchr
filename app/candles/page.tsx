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
  Flame,
  Layers,
  Compass,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Candles in Witchcraft: Color Meanings, Fire Lore & Flame Directory | Witchr",
  description:
    "The complete Witchr candle reference directory. Explore color correspondences, intentional flame focus, fire safety, and practical witchcraft uses for ceremonial candle magic.",
  alternates: {
    canonical: "https://www.witchr.com/candles",
  },
  openGraph: {
    title:
      "Candles in Witchcraft: Color Meanings, Fire Lore & Flame Directory | Witchr",
    description:
      "Explore the complete Witchr candle directory. Grounded reference entries on color psychology, candle flame dynamics, traditional folk associations, and fire safety.",
    url: "https://www.witchr.com/candles",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Candles in Witchcraft: Color Meanings, Fire Lore & Flame Directory | Witchr",
    description:
      "Explore the complete Witchr candle directory. Grounded reference entries on color psychology, candle flame dynamics, traditional folk associations, and fire safety.",
  },
};

const candleColorMap: Record<string, { bg: string; border: string; glow: string; text: string }> = {
  black: {
    bg: "bg-[#0a0a10]",
    border: "border-purple-900/60",
    glow: "shadow-[0_0_15px_rgba(88,28,135,0.25)]",
    text: "text-purple-300",
  },
  white: {
    bg: "bg-surface-elevated/80",
    border: "border-lavender/40",
    glow: "shadow-[0_0_15px_rgba(230,220,255,0.15)]",
    text: "text-lavender-light",
  },
  red: {
    bg: "bg-[#180a10]",
    border: "border-rose-900/60",
    glow: "shadow-[0_0_15px_rgba(225,29,72,0.2)]",
    text: "text-rose-300",
  },
  green: {
    bg: "bg-[#091510]",
    border: "border-emerald-900/60",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.2)]",
    text: "text-emerald-300",
  },
};

export default function CandlesHubPage() {
  const candles = getCorrespondencesByCategory("candle");

  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", item: "https://www.witchr.com" },
    { name: "Candles", item: "https://www.witchr.com/candles" },
  ]);

  const webPageJsonLd = getWebPageJsonLd({
    title: "Candles in Witchcraft: Color Meanings, Fire Lore & Flame Directory | Witchr",
    description:
      "The complete Witchr candle reference directory. Explore color correspondences, intentional flame focus, fire safety, and practical witchcraft uses for ceremonial candle magic.",
    url: "https://www.witchr.com/candles",
  });

  const itemListJsonLd = getItemListJsonLd(
    candles.map((item) => ({
      name: `${item.name} in Witchcraft`,
      url: `https://www.witchr.com/candles/${item.slug}`,
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
        <span className="text-lavender-moon">Candles</span>
      </nav>

      {/* 2. Header & Philosophy */}
      <header className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border-highlight text-lavender-moon text-xs font-mono uppercase tracking-ceremonial">
            <FourPointStar className="w-2.5 h-2.5" />
            <span>Occult Pyromancy &amp; Color Codex · Ritual Directory</span>
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-bone tracking-wide leading-[1.1] celestial-glow">
          Candles in Witchcraft
        </h1>

        <p className="text-lg md:text-xl text-bone-muted leading-relaxed font-sans pt-1">
          A grounded reference directory for candle magic, color psychology, and flame-focused rituals. A candle flame is the original technology of human focus: it transforms abstract intention into thermal, temporal reality—burning down minute by minute while anchoring your attention in the present moment.
        </p>

        <div className="p-4 sm:p-5 rounded-xl bg-surface border border-border-highlight flex items-start gap-3.5 text-xs sm:text-sm text-bone-dim font-sans shadow-subtle">
          <ShieldCheck className="w-5 h-5 text-lavender-moon shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Witchr approaches candle magic through strict mundane safety first: never leave an active flame unattended, always use fire-safe heatproof plates or holders, keep drafts and flammable materials clear, and snuff rather than blow out when closing ceremonial working spaces.
          </p>
        </div>

        <CelestialDivider className="max-w-sm my-4" />
      </header>

      {/* 3. The Candle Directory Grid */}
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
              Essential Candle Color Guides
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-wider text-bone-dim">
            {candles.length} Verified Color Guides
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {candles.map((item) => {
            const colors = candleColorMap[item.slug] || candleColorMap.white;
            return (
              <article
                key={item.slug}
                className={`tarot-frame p-6 sm:p-8 rounded-2xl ${colors.bg} border ${colors.border} ${colors.glow} flex flex-col justify-between group hover:border-lavender/60 transition-all duration-300 relative overflow-hidden`}
              >
                <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-30 group-hover:opacity-75 transition-opacity">
                  <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border-highlight text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">
                      <Flame className={`w-3.5 h-3.5 ${colors.text}`} />
                      <span>{item.categoryLabel} · {item.primaryIntent}</span>
                    </span>
                    <span className="text-[11px] font-mono text-bone-dim uppercase tracking-wider">
                      {item.correspondences.element || "Fire"}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-semibold text-bone group-hover:text-lavender-light transition-colors tracking-wide">
                      <Link href={`/candles/${item.slug}`}>
                        {item.name}
                      </Link>
                    </h3>
                    <p className="text-sm sm:text-base text-bone-muted font-sans leading-relaxed mt-2">
                      {item.oneLiner}
                    </p>
                  </div>

                  {/* Primary Intentions & Key Associations */}
                  <div className="space-y-2 pt-2 border-t border-border-subtle/50">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-lavender-dim block">
                      Core Applications:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(item.correspondences.intentions || []).slice(0, 4).map((intent, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-full bg-surface/60 border border-border-subtle/80 text-xs font-mono text-bone-muted"
                        >
                          {intent}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="pt-6 mt-6 border-t border-border-subtle/40">
                  <Link
                    href={`/candles/${item.slug}`}
                    className="inline-flex items-center justify-between w-full text-xs font-mono uppercase tracking-ceremonial font-semibold text-lavender hover:text-lavender-light transition-colors py-2 min-h-[44px]"
                    aria-label={`Read full candle guide for ${item.name}`}
                  >
                    <span>Read Full Candle Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 4. Core Candle Mechanics */}
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
            How Candle Magic Functions in Practice
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2.5 p-5 rounded-xl bg-surface border border-border-subtle">
            <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-border-highlight flex items-center justify-center text-lavender-moon">
              <Flame className="w-4 h-4" />
            </div>
            <h3 className="font-display text-lg font-semibold text-bone tracking-wide">
              1. Somatic Attention Anchor
            </h3>
            <p className="text-sm text-bone-muted leading-relaxed font-sans">
              Human attention is naturally drawn to flame. Watching an active wick quiets cognitive loop chatter, calming the autonomic nervous system and creating an intentional boundary between mundane distraction and focused craft.
            </p>
          </div>

          <div className="space-y-2.5 p-5 rounded-xl bg-surface border border-border-subtle">
            <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-border-highlight flex items-center justify-center text-lavender-moon">
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="font-display text-lg font-semibold text-bone tracking-wide">
              2. Temporal Measurement
            </h3>
            <p className="text-sm text-bone-muted leading-relaxed font-sans">
              A candle is a physical clock. Carving a chime candle or setting a tea light defines a bounded window of concentration. When the flame completes its burn, the working is closed—giving resolution to ongoing anxiety.
            </p>
          </div>

          <div className="space-y-2.5 p-5 rounded-xl bg-surface border border-border-highlight flex items-center justify-center text-lavender-moon">
            <BookOpen className="w-4 h-4" />
          </div>
          <h3 className="font-display text-lg font-semibold text-bone tracking-wide">
            3. The Universal White Candle
          </h3>
          <p className="text-sm text-bone-muted leading-relaxed font-sans">
            In classical folk magic, you never need a specialized candle cupboard. A simple white taper contains all frequencies of light and cleanly substitutes for any colored candle in any ritual.
          </p>
        </div>
      </section>

      {/* 5. Cross-Directory Navigation */}
      <section className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-ceremonial text-bone-dim">
        <span>Explore Related Reference Directories:</span>
        <div className="flex items-center gap-4 flex-wrap">
          <Link href="/ingredients" className="hover:text-lavender-light flex items-center gap-1 min-h-[44px]">
            <span>Ingredients Directory</span>
            <ArrowRight className="w-3 h-3 text-lavender-moon" />
          </Link>
          <Link href="/herbs" className="hover:text-lavender-light flex items-center gap-1 min-h-[44px]">
            <span>Herbs Directory</span>
            <ArrowRight className="w-3 h-3 text-lavender-moon" />
          </Link>
          <Link href="/correspondences" className="hover:text-lavender-light flex items-center gap-1 min-h-[44px]">
            <span>Correspondences Codex</span>
            <ArrowRight className="w-3 h-3 text-lavender-moon" />
          </Link>
          <Link href="/grimoire" className="hover:text-lavender-light flex items-center gap-1 min-h-[44px]">
            <span>Beginner Grimoire</span>
            <ArrowRight className="w-3 h-3 text-lavender-moon" />
          </Link>
        </div>
      </section>
    </div>
  );
}
