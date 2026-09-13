import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RITUALS, getRitualBySlug } from "@/content/rituals";
import { getTarotBySlug } from "@/content/tarot";
import { PracticalActionCallout } from "@/components/PracticalActionCallout";
import { RitualCard } from "@/components/RitualCard";
import { JsonLd, getArticleJsonLd, getBreadcrumbJsonLd } from "@/components/JsonLd";
import { CelestialDivider, TarotCornerFlourish, FourPointStar } from "@/components/OrnateFrames";
import { Clock, Feather, ShieldAlert, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

interface RitualPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return RITUALS.map((r) => ({
    slug: r.slug,
  }));
}

export async function generateMetadata({ params }: RitualPageProps): Promise<Metadata> {
  const { slug } = await params;
  const ritual = getRitualBySlug(slug);

  if (!ritual) {
    return {
      title: "Ritual Not Found",
    };
  }

  return {
    title: ritual.title,
    description: ritual.seoDescription || ritual.hook,
    alternates: {
      canonical: `https://witchr.com/rituals/${ritual.slug}`,
    },
    openGraph: {
      title: `${ritual.title} | Witchr`,
      description: ritual.hook,
      url: `https://witchr.com/rituals/${ritual.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${ritual.title} | Witchr`,
      description: ritual.hook,
    },
  };
}

export default async function RitualDetailPage({ params }: RitualPageProps) {
  const { slug } = await params;
  const ritual = getRitualBySlug(slug);

  if (!ritual) {
    notFound();
  }

  const relatedRituals = ritual.relatedRituals
    .map((s) => getRitualBySlug(s))
    .filter((r): r is (typeof RITUALS)[0] => !!r);

  const relatedTarot = ritual.relatedTarotSlug
    ? getTarotBySlug(ritual.relatedTarotSlug)
    : null;

  const hubCategorySlugMap: Record<string, string> = {
    Money: "money",
    Protection: "protection",
    Confidence: "confidence",
    Love: "love",
    "Letting Go": "letting-go",
    Direction: "direction",
  };
  const problemHubSlug = hubCategorySlugMap[ritual.category] || "rituals";

  const articleJsonLd = getArticleJsonLd({
    title: ritual.title,
    description: ritual.seoDescription || ritual.hook,
    url: `https://witchr.com/rituals/${ritual.slug}`,
    category: ritual.category,
  });

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", item: "https://witchr.com" },
    { name: "Rituals", item: "https://witchr.com/rituals" },
    { name: ritual.title, item: `https://witchr.com/rituals/${ritual.slug}` },
  ]);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Back Navigation & Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs font-mono uppercase tracking-ceremonial text-bone-dim">
        <Link href="/rituals" className="hover:text-lavender-light flex items-center gap-1 min-h-[44px]">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Rituals</span>
        </Link>
        <span>/</span>
        <Link href={`/${problemHubSlug}`} className="hover:text-lavender-light text-lavender-moon min-h-[44px] flex items-center">
          {ritual.category}
        </Link>
      </nav>

      {/* Header Block */}
      <header className="space-y-4 pb-8 border-b border-border">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/${problemHubSlug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border-highlight text-lavender-moon text-xs font-mono uppercase tracking-ceremonial hover:border-lavender/50 transition-colors"
          >
            <FourPointStar className="w-2.5 h-2.5" />
            <span>{ritual.category}</span>
          </Link>
          <div className="flex items-center gap-3 text-xs font-mono text-bone-dim">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-lavender-dim" />
              {ritual.estimatedTime}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Feather className="w-3.5 h-3.5 text-lavender-dim" />
              {ritual.difficulty}
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-bone tracking-wide leading-[1.1] celestial-glow">
          {ritual.title}
        </h1>

        <p className="text-lg sm:text-xl text-bone-muted leading-relaxed font-serif italic pt-2">
          {ritual.hook}
        </p>
      </header>

      {/* Grounded Summary ("What this ritual is for") */}
      <section className="my-10 p-6 md:p-8 rounded-xl bg-surface-elevated/70 border border-border-highlight space-y-2 relative shadow-card-tarot">
        <div className="absolute top-2.5 left-2.5 pointer-events-none opacity-40">
          <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
        </div>
        <span className="text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon font-medium flex items-center gap-1.5">
          <FourPointStar className="w-2.5 h-2.5" />
          <span>Core Intent & Mechanism</span>
        </span>
        <h2 className="text-xl md:text-2xl font-serif text-bone font-semibold">
          What this ritual is for
        </h2>
        <p className="text-bone-muted text-base leading-relaxed pt-1 font-sans">
          {ritual.whatItsActuallyFor}
        </p>
      </section>


      {/* Supplies & Substitutions */}
      <section className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6" aria-labelledby="supplies-heading">
        {/* Supplies */}
        <div className="tarot-frame p-6 space-y-3">
          <h2 id="supplies-heading" className="text-lg font-serif font-semibold text-bone flex items-center gap-2">
            <span>What you need</span>
            <span className="text-xs font-mono text-bone-dim font-normal">
              ({ritual.supplies.length} items)
            </span>
          </h2>
          <ul className="space-y-2.5 text-sm text-bone-muted font-sans">
            {ritual.supplies.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-lavender-moon shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Substitutions */}
        <div className="tarot-frame p-6 space-y-3">
          <h2 className="text-lg font-serif font-semibold text-bone">
            Practical substitutions
          </h2>
          <p className="text-xs text-bone-dim font-sans">
            You don't need to buy specialty supplies. Use what's in your home.
          </p>
          <ul className="space-y-2 text-sm text-bone-muted font-sans">
            {ritual.substitutions.map((sub, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-lavender-dim font-mono text-xs">→</span>
                <span>{sub}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Step-by-Step Instructions */}
      <section className="my-12 space-y-8" aria-labelledby="steps-heading">
        <div className="border-b border-border-subtle pb-4">
          <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
            <FourPointStar className="w-2.5 h-2.5" />
            <span>Ceremonial Execution</span>
          </span>
          <h2 id="steps-heading" className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide">
            Step-by-Step Instructions
          </h2>
        </div>

        <div className="space-y-6">
          {ritual.steps.map((step, index) => (
            <div
              key={index}
              className="tarot-frame p-6 md:p-7 flex flex-col md:flex-row md:items-start gap-5 relative"
            >
              <div className="w-9 h-9 rounded-full bg-background border border-border-ornate text-lavender-moon font-display text-sm font-bold flex items-center justify-center shrink-0 shadow-glow-subtle">
                0{index + 1}
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="font-serif text-xl font-semibold text-bone">
                  {step.title}
                </h3>
                <p className="text-base text-bone-muted leading-relaxed font-sans">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reflection Prompt */}
      <section className="my-10 p-6 md:p-8 rounded-xl bg-surface border border-border-highlight space-y-2">
        <span className="text-[11px] font-mono uppercase tracking-ceremonial text-bone-dim">
          Inner Inquiry
        </span>
        <h2 className="text-xl font-serif text-bone font-semibold">
          Journal & Reflection Prompt
        </h2>
        <p className="text-lavender-light text-base italic leading-relaxed pt-1 font-serif">
          “{ritual.reflectionPrompt}”
        </p>
      </section>

      {/* Signature Practical Action Element */}
      <PracticalActionCallout action={ritual.practicalAction} category={ritual.category} />

      {/* Safety & Medical Disclaimer Notice */}
      <div className="my-8 p-4 rounded-lg bg-surface/60 border border-border-subtle flex items-start gap-3 text-xs text-bone-dim font-sans">
        <ShieldAlert className="w-4 h-4 text-lavender-moon shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-bone-muted">Safety Notice</p>
          <p>
            {ritual.disclaimerNote ||
              "Always practice fire safety. Never leave burning candles or hot ash unattended. Content is for reflective and educational purposes; not a substitute for medical, mental health, legal, or financial care."}
          </p>
          <p>
            Read our full{" "}
            <Link href="/disclaimer" className="underline hover:text-lavender-light">
              Disclaimer and Safety Guidelines
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Related Tarot Spread */}
      {relatedTarot && (
        <section className="my-14 p-6 md:p-8 rounded-2xl bg-surface border border-border-ornate space-y-4 shadow-card-tarot">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
              <FourPointStar className="w-2.5 h-2.5" />
              <span>Complementary Inquiries</span>
            </span>
            <span className="text-xs font-mono text-bone-dim">
              {relatedTarot.cardCount} Cards
            </span>
          </div>
          <h3 className="font-display text-2xl font-semibold text-bone tracking-wide">
            Explore the Related Tarot Spread: {relatedTarot.title}
          </h3>
          <p className="text-sm text-bone-muted leading-relaxed font-sans">
            {relatedTarot.purpose}
          </p>
          <div className="pt-2">
            <Link
              href={`/tarot/${relatedTarot.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-ceremonial text-lavender hover:text-lavender-light font-semibold min-h-[44px]"
            >
              <span>View tarot spread</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      )}

      <CelestialDivider className="my-12" />

      {/* Related Rituals Grid */}
      {relatedRituals.length > 0 && (
        <section className="my-14 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-bone tracking-wide">
              Related Rituals
            </h2>
            <Link
              href={`/${problemHubSlug}`}
              className="text-xs font-mono uppercase tracking-wideDisplay text-lavender hover:text-lavender-light"
            >
              More in {ritual.category} →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedRituals.map((rel) => (
              <RitualCard key={rel.slug} ritual={rel} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
