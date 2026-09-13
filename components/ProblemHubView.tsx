import React from "react";
import Link from "next/link";
import { ProblemHub } from "@/content/types";
import { getRitualBySlug } from "@/content/rituals";
import { getTarotBySlug } from "@/content/tarot";
import { getSigilById } from "@/content/sigils";
import { RitualCard } from "./RitualCard";
import { SigilVisual } from "./SigilVisual";
import { JsonLd, getBreadcrumbJsonLd, getWebPageJsonLd } from "./JsonLd";
import { ProductCTA } from "./ProductCTA";
import { CelestialDivider, TarotCornerFlourish, FourPointStar } from "./OrnateFrames";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

interface ProblemHubViewProps {
  hub: ProblemHub;
}

export function ProblemHubView({ hub }: ProblemHubViewProps) {
  const rituals = hub.ritualSlugs
    .map((slug) => getRitualBySlug(slug))
    .filter((r): r is NonNullable<typeof r> => !!r);

  const tarotSpread = getTarotBySlug(hub.tarotSlug);

  const sigils = hub.sigilIds
    .map((id) => getSigilById(id))
    .filter((s): s is NonNullable<typeof s> => !!s);

  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", item: "https://witchr.com" },
    { name: hub.title, item: `https://witchr.com/${hub.slug}` },
  ]);

  const webPageJsonLd = getWebPageJsonLd({
    title: `${hub.title} Spells & Rituals | Witchr`,
    description: hub.seoDescription || hub.headline,
    url: `https://witchr.com/${hub.slug}`,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      <JsonLd data={breadcrumbs} />
      <JsonLd data={webPageJsonLd} />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono uppercase tracking-ceremonial text-bone-dim">
        <Link href="/" className="hover:text-lavender-light flex items-center gap-1 min-h-[44px]">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-lavender-moon">{hub.title}</span>
      </nav>

      {/* Hero Problem Headline */}
      <header className="max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface border border-border-highlight text-xs font-mono uppercase tracking-ceremonial text-lavender-moon shadow-subtle">
          <FourPointStar className="w-2.5 h-2.5" />
          <span>Portal of Resolution</span>
          <span>·</span>
          <span>{hub.category}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-bone tracking-wide leading-[1.1] celestial-glow">
          {hub.headline}
        </h1>

        <div className="space-y-4 text-base sm:text-lg text-bone-muted leading-relaxed font-sans">
          {hub.intro.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </header>

      {/* Key Practical Perspective */}
      <section className="p-7 md:p-9 rounded-2xl bg-surface-elevated/80 border border-border-ornate relative overflow-hidden shadow-card-tarot max-w-4xl">
        <div className="absolute top-2.5 left-2.5 pointer-events-none opacity-40">
          <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
        </div>
        <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-40 rotate-90">
          <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon font-semibold flex items-center gap-1.5">
            <FourPointStar className="w-2.5 h-2.5" />
            <span>Grounded Perspective</span>
          </span>
          <p className="font-serif text-lg md:text-xl text-lavender-light italic leading-relaxed pt-1">
            “{hub.keyPerspective}”
          </p>
        </div>
      </section>

      {/* Applicable Rituals */}
      <section className="space-y-8" aria-labelledby="rituals-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border-subtle pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
              <FourPointStar className="w-2.5 h-2.5" />
              <span>Practices</span>
            </span>
            <h2 id="rituals-heading" className="text-2xl sm:text-4xl font-display font-semibold text-bone mt-1 tracking-wide">
              Rituals for {hub.title}
            </h2>
          </div>
          <Link
            href="/spell-finder"
            className="text-xs font-mono uppercase tracking-wideDisplay text-lavender hover:text-lavender-light inline-flex items-center gap-1.5 min-h-[44px]"
          >
            <Sparkles className="w-3.5 h-3.5 text-lavender-moon" />
            <span>Need a recommendation? Try Spell Finder</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rituals.map((ritual) => (
            <RitualCard key={ritual.slug} ritual={ritual} />
          ))}
        </div>
      </section>

      {/* Related Tarot Spread */}
      {tarotSpread && (
        <section className="tarot-frame p-8 sm:p-10 rounded-2xl space-y-6" aria-labelledby="tarot-heading">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
                <FourPointStar className="w-2.5 h-2.5" />
                <span>Diagnostic Inquiries</span>
              </span>
              <h2 id="tarot-heading" className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide">
                Related Tarot Spread: {tarotSpread.title}
              </h2>
            </div>
            <span className="text-xs font-mono text-bone-dim">
              {tarotSpread.cardCount} Cards
            </span>
          </div>

          <p className="text-bone-muted text-base max-w-2xl leading-relaxed font-sans">
            {tarotSpread.overview}
          </p>

          <Link
            href={`/tarot/${tarotSpread.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-surface-elevated hover:bg-surface-hover border border-border-ornate hover:border-lavender text-lavender-light text-xs font-mono uppercase tracking-ceremonial font-semibold shadow-glow-subtle transition-all min-h-[44px]"
          >
            <span>Open {tarotSpread.title} Spread</span>
            <ArrowRight className="w-4 h-4 text-lavender-moon" />
          </Link>
        </section>
      )}

      {/* Related Sigils */}
      {sigils.length > 0 && (
        <section className="space-y-6" aria-labelledby="sigils-heading">
          <div className="border-b border-border-subtle pb-4">
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
              <FourPointStar className="w-2.5 h-2.5" />
              <span>Visual Focus</span>
            </span>
            <h2 id="sigils-heading" className="text-2xl sm:text-4xl font-display font-semibold text-bone mt-1 tracking-wide">
              Complementary Sigils for {hub.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sigils.map((sigil) => (
              <div
                key={sigil.id}
                className="tarot-frame p-6 flex flex-col items-center text-center space-y-4"
              >
                <div className="p-4 rounded-xl bg-background border border-border-highlight shadow-glow-subtle w-full flex items-center justify-center">
                  <SigilVisual id={sigil.id} className="w-20 h-20 text-lavender-light" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-semibold text-bone">
                    {sigil.name}
                  </h3>
                  <p className="text-xs text-bone-muted italic leading-relaxed font-serif">
                    “{sigil.intention}”
                  </p>
                  <p className="text-xs text-bone-dim pt-2 font-sans">
                    {sigil.suggestion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Subtle Companion Field Guide Slot (dormant until official Etsy product URL is configured) */}
      <ProductCTA
        title={`The Witchr ${hub.title} Grimoire & Field Guide`}
        description={`Organizes practical ${hub.title.toLowerCase()} rituals, symbols, correspondences, and grounding exercises into one printable field guide for your altar.`}
        productUrl={null}
        eyebrow="Printable Field Guide"
      />

      {/* Celestial Divider */}
      <CelestialDivider />


      {/* Fast Navigation to other hubs */}
      <section className="p-6 rounded-xl bg-surface border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        <span className="text-bone-dim uppercase tracking-ceremonial">
          Other Modern Portals:
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/money" className="hover:text-lavender-light transition-colors">Money</Link>
          <span>·</span>
          <Link href="/protection" className="hover:text-lavender-light transition-colors">Protection</Link>
          <span>·</span>
          <Link href="/confidence" className="hover:text-lavender-light transition-colors">Confidence</Link>
          <span>·</span>
          <Link href="/love" className="hover:text-lavender-light transition-colors">Love</Link>
          <span>·</span>
          <Link href="/letting-go" className="hover:text-lavender-light transition-colors">Letting Go</Link>
          <span>·</span>
          <Link href="/direction" className="hover:text-lavender-light transition-colors">Direction</Link>
        </div>
      </section>
    </div>
  );
}
