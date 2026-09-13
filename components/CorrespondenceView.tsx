import React from "react";
import Link from "next/link";
import { CorrespondenceItem } from "@/content/correspondences";
import { getRitualBySlug } from "@/content/rituals";
import { RitualCard } from "./RitualCard";
import { JsonLd, getBreadcrumbJsonLd, getWebPageJsonLd } from "./JsonLd";
import { ProductCTA } from "./ProductCTA";
import {
  CelestialDivider,
  TarotCornerFlourish,
  FourPointStar,
  GrimoireStar,
} from "./OrnateFrames";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Compass,
  Sparkles,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

interface CorrespondenceViewProps {
  item: CorrespondenceItem;
}

export function CorrespondenceView({ item }: CorrespondenceViewProps) {
  const relatedRituals = item.relatedRitualSlugs
    .map((slug) => getRitualBySlug(slug))
    .filter((r): r is NonNullable<typeof r> => !!r);

  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", item: "https://witchr.com" },
    { name: "Protection", item: "https://witchr.com/protection" },
    {
      name: item.name,
      item: `https://witchr.com/${item.routePrefix}/${item.slug}`,
    },
  ]);

  const webPageJsonLd = getWebPageJsonLd({
    title: `${item.name} in Witchcraft: Uses & Meaning | Witchr`,
    description: item.seoDescription,
    url: `https://witchr.com/${item.routePrefix}/${item.slug}`,
  });

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      <JsonLd data={breadcrumbs} />
      <JsonLd data={webPageJsonLd} />

      {/* 1. Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs font-mono uppercase tracking-ceremonial text-bone-dim"
      >
        <Link
          href="/"
          className="hover:text-lavender-light flex items-center gap-1 min-h-[44px]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <Link
          href="/protection"
          className="hover:text-lavender-light flex items-center min-h-[44px]"
        >
          Protection
        </Link>
        <span>/</span>
        <span className="text-lavender-moon">{item.name}</span>
      </nav>

      {/* 2, 3, 4. Header & Eyebrow */}
      <header className="space-y-4 pb-8 border-b border-border">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border-highlight text-lavender-moon text-xs font-mono uppercase tracking-ceremonial">
            <FourPointStar className="w-2.5 h-2.5" />
            <span>
              {item.categoryLabel} · {item.primaryIntent}
            </span>
          </span>
          <span className="text-xs font-mono text-bone-dim uppercase tracking-wider">
            Occult Reference Entry
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-bold text-bone tracking-wide leading-[1.08] celestial-glow">
          {item.name}
        </h1>

        <p className="text-lg sm:text-xl text-bone-muted leading-relaxed font-serif italic pt-1">
          {item.oneLiner}
        </p>
      </header>

      {/* 5. Quick Answer (40–80 Words for Humans & Answer Engines) */}
      <section
        aria-labelledby="quick-answer-heading"
        className="tarot-frame p-6 sm:p-8 rounded-2xl relative overflow-hidden bg-surface-elevated/70 border border-border-ornate shadow-card-tarot space-y-3"
      >
        <div className="absolute top-2.5 left-2.5 pointer-events-none opacity-40">
          <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
        </div>
        <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-40 rotate-90">
          <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
        </div>

        <div className="flex items-center gap-2 text-lavender-moon text-xs font-mono uppercase tracking-ceremonial">
          <Sparkles className="w-3.5 h-3.5" />
          <h2 id="quick-answer-heading" className="font-semibold">
            Quick Answer: What is {item.name} used for in witchcraft?
          </h2>
        </div>

        <p className="text-base sm:text-lg text-bone leading-relaxed font-sans pt-1">
          {item.quickAnswer}
        </p>
      </section>

      {/* 6. Correspondence Panel */}
      <section
        aria-labelledby="correspondence-panel-heading"
        className="space-y-4"
      >
        <div className="border-b border-border-subtle pb-3 flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
            <FourPointStar className="w-2.5 h-2.5" />
            <span>Correspondences</span>
          </span>
          <h2
            id="correspondence-panel-heading"
            className="text-xl sm:text-2xl font-display font-semibold text-bone tracking-wide"
          >
            Symbolic Correspondences
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Primary Uses */}
          {item.correspondences.uses && item.correspondences.uses.length > 0 && (
            <div className="tarot-frame p-5 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon font-semibold">
                Primary Uses
              </span>
              <ul className="space-y-1.5 text-sm text-bone-muted font-sans">
                {item.correspondences.uses.map((use, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-lavender-dim font-mono text-xs">
                      ·
                    </span>
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Element & Planet */}
          {(item.correspondences.element || item.correspondences.planet) && (
            <div className="tarot-frame p-5 space-y-3">
              {item.correspondences.element && (
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon font-semibold">
                    Classical Element
                  </span>
                  <p className="text-sm text-bone font-medium">
                    {item.correspondences.element}
                  </p>
                </div>
              )}
              {item.correspondences.planet && (
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon font-semibold">
                    Planetary Association
                  </span>
                  <p className="text-sm text-bone font-medium">
                    {item.correspondences.planet}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Colors */}
          {item.correspondences.colors &&
            item.correspondences.colors.length > 0 && (
              <div className="tarot-frame p-5 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon font-semibold">
                  Complementary Colors
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.correspondences.colors.map((color, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-surface border border-border-highlight text-xs font-mono text-bone-muted"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

          {/* Intentions */}
          {item.correspondences.intentions &&
            item.correspondences.intentions.length > 0 && (
              <div className="tarot-frame p-5 space-y-2 sm:col-span-2 lg:col-span-3">
                <span className="text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon font-semibold">
                  Aligned Intentions
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.correspondences.intentions.map((intent, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-surface-elevated border border-border-subtle text-xs font-mono text-lavender-light"
                    >
                      {intent}
                    </span>
                  ))}
                </div>
              </div>
            )}
        </div>
      </section>

      {/* 7. Traditional Lore */}
      <section aria-labelledby="traditional-lore-heading" className="space-y-4">
        <div className="border-b border-border-subtle pb-3">
          <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Folk Traditions</span>
          </span>
          <h2
            id="traditional-lore-heading"
            className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
          >
            Traditional Folklore & Associations
          </h2>
        </div>
        <div className="space-y-4 text-base sm:text-lg text-bone-muted leading-relaxed font-sans">
          {item.traditionalLore.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* 8. Modern Witchr Use */}
      <section aria-labelledby="modern-use-heading" className="space-y-4">
        <div className="border-b border-border-subtle pb-3">
          <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Modern Practice</span>
          </span>
          <h2
            id="modern-use-heading"
            className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
          >
            How to Use {item.name} Today
          </h2>
        </div>
        <div className="space-y-4 text-base sm:text-lg text-bone-muted leading-relaxed font-sans">
          {item.modernWitchrUse.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* 9. Try It (One Simple Practical Micro-Example) */}
      <section
        aria-labelledby="try-it-heading"
        className="p-6 md:p-8 rounded-2xl bg-surface border border-border-ornate space-y-3 relative shadow-card-tarot"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
            <FourPointStar className="w-2.5 h-2.5" />
            <span>Practical Micro-Action</span>
          </span>
          <span className="text-[11px] font-mono text-bone-dim uppercase tracking-wider">
            Try It
          </span>
        </div>
        <h3
          id="try-it-heading"
          className="font-display text-xl sm:text-2xl font-bold text-bone tracking-wide"
        >
          {item.tryIt.title}
        </h3>
        <p className="text-sm sm:text-base text-bone-muted leading-relaxed font-sans">
          {item.tryIt.instruction}
        </p>
      </section>

      {/* 10. Related Witchr Content */}
      <section
        aria-labelledby="related-content-heading"
        className="space-y-6 pt-4"
      >
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
              <FourPointStar className="w-2.5 h-2.5" />
              <span>Context & Applications</span>
            </span>
            <h2
              id="related-content-heading"
              className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
            >
              Related Protection Practices
            </h2>
          </div>
          <Link
            href="/protection"
            className="text-xs font-mono uppercase tracking-wideDisplay text-lavender hover:text-lavender-light flex items-center gap-1 min-h-[44px]"
          >
            <span>Protection Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {relatedRituals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedRituals.map((ritual) => (
              <RitualCard key={ritual.slug} ritual={ritual} />
            ))}
          </div>
        )}
      </section>

      {/* 11. Sources / Historical Note (rendered ONLY when verified sources exist) */}
      {item.sources && item.sources.length > 0 && (
        <section
          aria-labelledby="sources-heading"
          className="p-6 rounded-xl bg-surface/40 border border-border-subtle space-y-2 text-xs text-bone-dim font-sans"
        >
          <h3 id="sources-heading" className="font-mono uppercase font-semibold text-bone-muted">
            Historical Sources & References
          </h3>
          <ul className="space-y-1">
            {item.sources.map((src, idx) => (
              <li key={idx}>· {src}</li>
            ))}
          </ul>
        </section>
      )}

      {/* 12. Dormant ProductCTA (strictly renders null when no productUrl exists) */}
      <ProductCTA
        title="The Witchr Protection Grimoire"
        description="A printable, altar-side field guide organizing modern protection rituals, kitchen herbs, and boundary correspondences."
        productUrl={null}
        eyebrow="Printable Field Guide"
      />

      <CelestialDivider className="my-8" />
    </article>
  );
}
