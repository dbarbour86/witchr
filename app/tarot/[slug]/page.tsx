import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TAROT_SPREADS, getTarotBySlug } from "@/content/tarot";
import { getRitualBySlug } from "@/content/rituals";
import { TarotSpreadVisual } from "@/components/TarotSpreadVisual";
import { JsonLd, getWebPageJsonLd, getBreadcrumbJsonLd } from "@/components/JsonLd";
import { CelestialDivider, TarotCornerFlourish, FourPointStar } from "@/components/OrnateFrames";
import { ArrowLeft, ArrowRight, BookOpen, Compass, Sparkles } from "lucide-react";

interface TarotPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TAROT_SPREADS.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: TarotPageProps): Promise<Metadata> {
  const { slug } = await params;
  const spread = getTarotBySlug(slug);

  if (!spread) {
    return {
      title: "Tarot Spread Not Found",
    };
  }

  return {
    title: `${spread.title} — Diagnostic Tarot Spread`,
    description: spread.seoDescription || spread.purpose,
    alternates: {
      canonical: `https://witchr.com/tarot/${spread.slug}`,
    },
    openGraph: {
      title: `${spread.title} — Diagnostic Tarot Spread | Witchr`,
      description: spread.purpose,
      url: `https://witchr.com/tarot/${spread.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${spread.title} — Diagnostic Tarot Spread | Witchr`,
      description: spread.purpose,
    },
  };
}

export default async function TarotDetailPage({ params }: TarotPageProps) {
  const { slug } = await params;
  const spread = getTarotBySlug(slug);

  if (!spread) {
    notFound();
  }

  const relatedRitual = getRitualBySlug(spread.relatedRitualSlug);

  const webPageJsonLd = getWebPageJsonLd({
    title: `${spread.title} — Diagnostic Tarot Spread | Witchr`,
    description: spread.seoDescription || spread.purpose,
    url: `https://witchr.com/tarot/${spread.slug}`,
  });

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", item: "https://witchr.com" },
    { name: "Tarot", item: "https://witchr.com/tarot" },
    { name: spread.title, item: `https://witchr.com/tarot/${spread.slug}` },
  ]);

  return (
    <article className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs font-mono uppercase tracking-ceremonial text-bone-dim">
        <Link href="/tarot" className="hover:text-lavender-light flex items-center gap-1 min-h-[44px]">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Spreads</span>
        </Link>
        <span>/</span>
        <span className="text-lavender-moon">{spread.title}</span>
      </nav>

      {/* Header */}
      <header className="space-y-6 pb-8 border-b border-border">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border-highlight text-lavender-moon text-xs font-mono uppercase tracking-ceremonial">
            <Compass className="w-3.5 h-3.5" />
            <span>{spread.cardCount} Cards</span>
          </span>
          <span className="text-xs font-mono text-bone-dim uppercase tracking-wider">
            Diagnostic Layout
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-bone tracking-wide leading-[1.1] celestial-glow">
          {spread.title}
        </h1>

        <p className="text-lg sm:text-xl text-bone-muted leading-relaxed font-serif italic pt-1">
          {spread.overview}
        </p>

        {/* Reflective Tool Non-Predictive Advisory */}
        <div className="p-4 rounded-xl bg-surface/70 border border-border-subtle flex items-start gap-3 text-xs text-bone-muted font-sans">
          <Sparkles className="w-4 h-4 text-lavender-moon shrink-0 mt-0.5" />
          <p>
            <strong className="text-bone">Reflective Inquiry Notice:</strong> Tarot spreads on Witchr are designed as symbolic and psychological diagnostic mirrors for self-reflection and decision clarity—not deterministic fortune-telling or guaranteed predictions.
          </p>
        </div>
      </header>

      {/* Visual Diagrammatic Card Layout */}
      <TarotSpreadVisual positions={spread.positions} />


      {/* Position Breakdown */}
      <section className="my-12 space-y-8" aria-labelledby="positions-breakdown">
        <div className="border-b border-border-subtle pb-4">
          <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
            <FourPointStar className="w-2.5 h-2.5" />
            <span>Inquiry Blueprint</span>
          </span>
          <h2 id="positions-breakdown" className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide">
            Card Position Meanings
          </h2>
        </div>

        <div className="space-y-6">
          {spread.positions.map((pos) => (
            <div
              key={pos.number}
              className="tarot-frame p-6 flex flex-col sm:flex-row sm:items-start gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-background border border-border-ornate text-lavender-moon font-mono text-sm font-bold flex items-center justify-center shrink-0 shadow-glow-subtle">
                {pos.number}
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="font-serif text-xl font-semibold text-bone">
                  Position {pos.number}: {pos.name}
                </h3>
                <p className="text-base text-lavender-light font-medium italic">
                  “{pos.question}”
                </p>
                <p className="text-sm text-bone-muted pt-1 leading-relaxed font-sans">
                  {pos.guidance}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journaling Prompts */}
      <section className="my-12 p-6 md:p-8 rounded-2xl bg-surface border border-border-highlight space-y-4 shadow-card-tarot" aria-labelledby="journaling-heading">
        <div className="flex items-center gap-2 text-lavender-moon">
          <BookOpen className="w-5 h-5" />
          <h2 id="journaling-heading" className="font-serif text-xl font-semibold text-bone">
            Reflective Journaling Prompts
          </h2>
        </div>
        <p className="text-sm text-bone-muted font-sans">
          Pull your physical cards, record the layout, and write for five minutes on these questions:
        </p>
        <ul className="space-y-3 pt-2">
          {spread.journalingPrompts.map((prompt, idx) => (
            <li key={idx} className="p-4 rounded-lg bg-background/60 border border-border-subtle text-sm md:text-base text-bone-muted font-serif italic">
              “{prompt}”
            </li>
          ))}
        </ul>
      </section>

      {/* Complementary Practical Ritual */}
      {relatedRitual && (
        <section className="my-14 p-6 md:p-8 rounded-2xl bg-surface-elevated/70 border border-border-ornate space-y-4 shadow-card-tarot">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
              <FourPointStar className="w-2.5 h-2.5" />
              <span>Grounded Next Step</span>
            </span>
            <span className="text-xs font-mono text-bone-dim">
              {relatedRitual.estimatedTime}
            </span>
          </div>
          <h3 className="font-display text-2xl font-semibold text-bone tracking-wide">
            Complementary Ritual: {relatedRitual.title}
          </h3>
          <p className="text-sm text-bone-muted leading-relaxed font-sans">
            {relatedRitual.hook}
          </p>
          <div className="pt-2">
            <Link
              href={`/rituals/${relatedRitual.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-surface-elevated hover:bg-surface-hover text-lavender-light border border-border-ornate hover:border-lavender text-xs font-mono uppercase tracking-ceremonial font-semibold shadow-glow-subtle transition-all min-h-[44px]"
            >
              <span>View the ritual</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      <CelestialDivider className="my-8" />
    </article>
  );
}
