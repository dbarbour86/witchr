import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getIntentCorrespondence,
  getAllIntentCorrespondences,
} from "@/content/intent-correspondences";
import {
  JsonLd,
  getBreadcrumbJsonLd,
  getWebPageJsonLd,
  getItemListJsonLd,
  getFaqJsonLd,
} from "@/components/JsonLd";
import {
  FourPointStar,
  GrimoireStar,
  CelestialDivider,
  TarotCornerFlourish,
} from "@/components/OrnateFrames";
import {
  ShieldCheck,
  Sparkles,
  Flame,
  Leaf,
  Layers,
  ArrowRight,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  Compass,
} from "lucide-react";

interface IntentPageProps {
  params: Promise<{ intent: string }>;
}

export async function generateStaticParams() {
  return getAllIntentCorrespondences().map((intent) => ({
    intent: intent.slug,
  }));
}

export async function generateMetadata({
  params,
}: IntentPageProps): Promise<Metadata> {
  const { intent } = await params;
  const data = getIntentCorrespondence(intent);

  if (!data) {
    return {
      title: "Correspondence Guide Not Found",
    };
  }

  return {
    title: data.seoTitle,
    description: data.seoDescription,
    alternates: {
      canonical: `https://witchr.com/correspondences/${data.slug}`,
    },
    openGraph: {
      title: `${data.seoTitle} | Witchr`,
      description: data.seoDescription,
      url: `https://witchr.com/correspondences/${data.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.seoTitle} | Witchr`,
      description: data.seoDescription,
    },
  };
}

export default async function IntentCorrespondencePage({
  params,
}: IntentPageProps) {
  const { intent } = await params;
  const data = getIntentCorrespondence(intent);

  if (!data) {
    notFound();
  }

  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", item: "https://witchr.com" },
    { name: "Correspondences", item: "https://witchr.com/correspondences" },
    {
      name: `${data.title} Correspondences`,
      item: `https://witchr.com/correspondences/${data.slug}`,
    },
  ]);

  const webPageJsonLd = getWebPageJsonLd({
    title: `${data.seoTitle} | Witchr`,
    description: data.seoDescription,
    url: `https://witchr.com/correspondences/${data.slug}`,
  });

  const allResources = [
    ...data.herbs,
    ...data.candles,
    ...data.ingredients,
    ...data.symbols,
    ...data.rituals,
  ];

  const itemListJsonLd = getItemListJsonLd(
    allResources.map((res) => ({
      name: `${res.name} (${res.categoryLabel})`,
      url: `https://witchr.com${res.url}`,
      description: res.role,
    }))
  );

  const faqJsonLd = getFaqJsonLd(data.faqs);

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      <JsonLd data={breadcrumbs} />
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={faqJsonLd} />

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
        <Link
          href="/correspondences"
          className="hover:text-lavender-light flex items-center gap-1 min-h-[44px]"
        >
          <span>Correspondences</span>
        </Link>
        <span>/</span>
        <span className="text-lavender-moon">{data.title}</span>
      </nav>

      {/* 2. Hero Header */}
      <header className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border-highlight text-lavender-moon text-xs font-mono uppercase tracking-ceremonial shadow-subtle">
            <FourPointStar className="w-2.5 h-2.5" />
            <span>{data.intentBadge}</span>
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-bone tracking-wide leading-[1.1] celestial-glow">
          {data.h1}
        </h1>

        <div className="space-y-4 text-base sm:text-lg text-bone-muted leading-relaxed font-sans pt-1">
          {data.intro.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* Philosophy Callout */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface-elevated/80 border border-border-ornate relative overflow-hidden shadow-card-tarot">
          <div className="absolute top-2.5 left-2.5 pointer-events-none opacity-40">
            <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
          </div>
          <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-40 rotate-90">
            <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
          </div>

          <div className="space-y-3 relative z-10">
            <div className="flex items-center gap-2 text-lavender-moon text-xs font-mono uppercase tracking-ceremonial font-semibold">
              <ShieldCheck className="w-4 h-4 text-lavender-light" />
              <span>{data.philosophy.heading}</span>
            </div>
            <p className="font-serif text-lg md:text-xl text-lavender-light italic leading-relaxed">
              “{data.philosophy.quote}”
            </p>
            <p className="text-xs sm:text-sm text-bone-dim leading-relaxed font-sans pt-1">
              {data.philosophy.context}
            </p>
          </div>
        </div>

        <CelestialDivider className="max-w-sm my-4" />
      </header>

      {/* 3. Section Jump-Bar */}
      <nav
        aria-label="Category Navigation"
        className="p-3 rounded-xl bg-surface border border-border-subtle flex items-center gap-2 overflow-x-auto text-xs font-mono uppercase tracking-ceremonial text-bone-dim"
      >
        <span className="text-lavender-dim px-2 shrink-0">Categories:</span>
        <a
          href="#herbs"
          className="px-3 py-1.5 rounded-lg bg-surface-elevated hover:bg-surface-hover hover:text-lavender-light transition-colors shrink-0 min-h-[36px] flex items-center"
        >
          Herbs ({data.herbs.length})
        </a>
        <a
          href="#candles"
          className="px-3 py-1.5 rounded-lg bg-surface-elevated hover:bg-surface-hover hover:text-lavender-light transition-colors shrink-0 min-h-[36px] flex items-center"
        >
          Candles ({data.candles.length})
        </a>
        <a
          href="#ingredients"
          className="px-3 py-1.5 rounded-lg bg-surface-elevated hover:bg-surface-hover hover:text-lavender-light transition-colors shrink-0 min-h-[36px] flex items-center"
        >
          Ingredients ({data.ingredients.length})
        </a>
        <a
          href="#symbols"
          className="px-3 py-1.5 rounded-lg bg-surface-elevated hover:bg-surface-hover hover:text-lavender-light transition-colors shrink-0 min-h-[36px] flex items-center"
        >
          Symbols ({data.symbols.length})
        </a>
        <a
          href="#rituals"
          className="px-3 py-1.5 rounded-lg bg-surface-elevated hover:bg-surface-hover hover:text-lavender-light transition-colors shrink-0 min-h-[36px] flex items-center"
        >
          Rituals ({data.rituals.length})
        </a>
        <a
          href="#combining"
          className="px-3 py-1.5 rounded-lg bg-surface-elevated hover:bg-surface-hover hover:text-lavender-light transition-colors shrink-0 min-h-[36px] flex items-center"
        >
          Working Guide
        </a>
      </nav>

      {/* 4. Herbs for Intent */}
      <section id="herbs" aria-labelledby="herbs-heading" className="space-y-6">
        <div className="border-b border-border pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5" />
              <span>Botanical Codex</span>
            </span>
            <h2
              id="herbs-heading"
              className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
            >
              Herbs for {data.title}
            </h2>
          </div>
          <span className="text-xs font-mono text-bone-dim hidden sm:inline">
            {data.herbs.length} Core Botanicals
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.herbs.map((herb) => (
            <div
              key={herb.slug}
              className="tarot-frame p-6 rounded-2xl bg-surface border border-border-ornate flex flex-col justify-between space-y-4 hover:border-lavender/60 transition-all shadow-subtle group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-mono uppercase tracking-ceremonial text-lavender-moon">
                    {herb.categoryLabel}
                  </span>
                  {herb.badge && (
                    <span className="text-[10px] font-mono uppercase text-lavender-light bg-surface-elevated border border-border-highlight px-2 py-0.5 rounded-full">
                      {herb.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-2xl font-bold text-bone group-hover:text-lavender-light transition-colors">
                  <Link href={herb.url} className="hover:underline">
                    {herb.name}
                  </Link>
                </h3>

                <p className="text-sm font-semibold text-lavender-light font-sans">
                  {herb.role}
                </p>

                <p className="text-xs sm:text-sm text-bone-muted leading-relaxed font-sans">
                  {herb.howToUse}
                </p>

                <div className="pt-2 text-[11px] font-mono text-bone-dim flex items-center gap-1.5">
                  <span className="text-lavender-dim">Sensory Anchor:</span>
                  <span>{herb.sensoryAnchor}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-lavender hover:text-lavender-light transition-colors">
                <Link href={herb.url} className="inline-flex items-center gap-1 min-h-[36px]">
                  <span>Explore {herb.name} in Witchcraft</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Candles for Intent */}
      <section id="candles" aria-labelledby="candles-heading" className="space-y-6">
        <div className="border-b border-border pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" />
              <span>Candle Magic</span>
            </span>
            <h2
              id="candles-heading"
              className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
            >
              Candles for {data.title}
            </h2>
          </div>
          <span className="text-xs font-mono text-bone-dim hidden sm:inline">
            {data.candles.length} Color Waxes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.candles.map((candle) => (
            <div
              key={candle.slug}
              className="tarot-frame p-6 rounded-2xl bg-surface border border-border-ornate flex flex-col justify-between space-y-4 hover:border-lavender/60 transition-all shadow-subtle group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-mono uppercase tracking-ceremonial text-lavender-moon">
                    {candle.categoryLabel}
                  </span>
                  {candle.badge && (
                    <span className="text-[10px] font-mono uppercase text-lavender-light bg-surface-elevated border border-border-highlight px-2 py-0.5 rounded-full">
                      {candle.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-2xl font-bold text-bone group-hover:text-lavender-light transition-colors">
                  <Link href={candle.url} className="hover:underline">
                    {candle.name}
                  </Link>
                </h3>

                <p className="text-sm font-semibold text-lavender-light font-sans">
                  {candle.role}
                </p>

                <p className="text-xs sm:text-sm text-bone-muted leading-relaxed font-sans">
                  {candle.howToUse}
                </p>

                <div className="pt-2 text-[11px] font-mono text-bone-dim flex items-center gap-1.5">
                  <span className="text-lavender-dim">Sensory Anchor:</span>
                  <span>{candle.sensoryAnchor}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-lavender hover:text-lavender-light transition-colors">
                <Link href={candle.url} className="inline-flex items-center gap-1 min-h-[36px]">
                  <span>Explore {candle.name} Meaning</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Minerals & Ingredients */}
      <section id="ingredients" aria-labelledby="ingredients-heading" className="space-y-6">
        <div className="border-b border-border pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Mineral & Material Bedrock</span>
            </span>
            <h2
              id="ingredients-heading"
              className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
            >
              Ingredients & Minerals for {data.title}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.ingredients.map((ingredient) => (
            <div
              key={ingredient.slug}
              className="tarot-frame p-6 rounded-2xl bg-surface border border-border-ornate flex flex-col justify-between space-y-4 hover:border-lavender/60 transition-all shadow-subtle group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-mono uppercase tracking-ceremonial text-lavender-moon">
                    {ingredient.categoryLabel}
                  </span>
                  {ingredient.badge && (
                    <span className="text-[10px] font-mono uppercase text-lavender-light bg-surface-elevated border border-border-highlight px-2 py-0.5 rounded-full">
                      {ingredient.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-2xl font-bold text-bone group-hover:text-lavender-light transition-colors">
                  <Link href={ingredient.url} className="hover:underline">
                    {ingredient.name}
                  </Link>
                </h3>

                <p className="text-sm font-semibold text-lavender-light font-sans">
                  {ingredient.role}
                </p>

                <p className="text-xs sm:text-sm text-bone-muted leading-relaxed font-sans">
                  {ingredient.howToUse}
                </p>

                <div className="pt-2 text-[11px] font-mono text-bone-dim flex items-center gap-1.5">
                  <span className="text-lavender-dim">Sensory Anchor:</span>
                  <span>{ingredient.sensoryAnchor}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-lavender hover:text-lavender-light transition-colors">
                <Link href={ingredient.url} className="inline-flex items-center gap-1 min-h-[36px]">
                  <span>Explore {ingredient.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Symbols & Sigils */}
      <section id="symbols" aria-labelledby="symbols-heading" className="space-y-6">
        <div className="border-b border-border pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
              <GrimoireStar className="w-3.5 h-3.5" />
              <span>Geometry & Marks</span>
            </span>
            <h2
              id="symbols-heading"
              className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
            >
              Symbols & Sigils for {data.title}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.symbols.map((sym) => (
            <div
              key={sym.slug}
              className="tarot-frame p-6 rounded-2xl bg-surface border border-border-ornate flex flex-col justify-between space-y-4 hover:border-lavender/60 transition-all shadow-subtle group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-mono uppercase tracking-ceremonial text-lavender-moon">
                    {sym.categoryLabel}
                  </span>
                  {sym.badge && (
                    <span className="text-[10px] font-mono uppercase text-lavender-light bg-surface-elevated border border-border-highlight px-2 py-0.5 rounded-full">
                      {sym.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-xl font-bold text-bone group-hover:text-lavender-light transition-colors">
                  <Link href={sym.url} className="hover:underline">
                    {sym.name}
                  </Link>
                </h3>

                <p className="text-xs font-semibold text-lavender-light font-sans">
                  {sym.role}
                </p>

                <p className="text-xs text-bone-muted leading-relaxed font-sans">
                  {sym.howToUse}
                </p>

                <div className="pt-1 text-[11px] font-mono text-bone-dim">
                  <span className="text-lavender-dim">Form: </span>
                  <span>{sym.sensoryAnchor}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-lavender hover:text-lavender-light transition-colors">
                <Link href={sym.url} className="inline-flex items-center gap-1 min-h-[36px]">
                  <span>View Mark Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Related Rituals & Diagnostic Tools */}
      <section id="rituals" aria-labelledby="rituals-heading" className="space-y-6">
        <div className="border-b border-border pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Structured Application</span>
            </span>
            <h2
              id="rituals-heading"
              className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
            >
              Applicable Rituals & Tools
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.rituals.map((ritual) => (
            <div
              key={ritual.slug}
              className="tarot-frame p-6 rounded-2xl bg-surface border border-border-ornate flex flex-col justify-between space-y-4 hover:border-lavender/60 transition-all shadow-subtle group"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-ceremonial text-lavender-moon block">
                  {ritual.categoryLabel}
                </span>

                <h3 className="font-display text-xl font-bold text-bone group-hover:text-lavender-light transition-colors">
                  <Link href={ritual.url} className="hover:underline">
                    {ritual.name}
                  </Link>
                </h3>

                <p className="text-xs font-semibold text-lavender-light font-sans">
                  {ritual.role}
                </p>

                <p className="text-xs text-bone-muted leading-relaxed font-sans">
                  {ritual.howToUse}
                </p>
              </div>

              <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-lavender hover:text-lavender-light transition-colors">
                <Link href={ritual.url} className="inline-flex items-center gap-1 min-h-[36px]">
                  <span>Begin Working</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. The Combining Framework: How to Structure a Working */}
      <section id="combining" aria-labelledby="combining-heading" className="space-y-6">
        <div className="p-7 sm:p-9 rounded-2xl bg-surface-elevated/70 border border-border-ornate space-y-6 relative overflow-hidden shadow-card-tarot">
          <div className="border-b border-border-subtle pb-4">
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Step-by-Step Architecture</span>
            </span>
            <h2
              id="combining-heading"
              className="text-2xl sm:text-3xl font-display font-bold text-bone mt-1 tracking-wide"
            >
              {data.combiningFramework.title}
            </h2>
            <p className="text-sm text-bone-muted font-sans mt-2 leading-relaxed">
              {data.combiningFramework.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.combiningFramework.steps.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-xl bg-surface border border-border-subtle space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-surface-elevated border border-border-highlight text-lavender-moon text-xs font-mono flex items-center justify-center font-bold">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-mono text-bone-dim uppercase">
                      Phase {step.step}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-bone">
                    {step.phase}
                  </h3>
                  <div className="text-[11px] font-mono text-lavender-dim">
                    {step.elements}
                  </div>
                  <p className="text-xs sm:text-sm text-bone-muted leading-relaxed font-sans pt-1">
                    {step.instruction}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Pitfalls to Avoid */}
      <section aria-labelledby="pitfalls-heading" className="space-y-6">
        <div className="border-b border-border pb-3">
          <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-lavender-light" />
            <span>Nuance & Critical Thinking</span>
          </span>
          <h2
            id="pitfalls-heading"
            className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
          >
            Common Pitfalls & What to Avoid
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.pitfalls.map((pitfall, idx) => (
            <div
              key={idx}
              className="tarot-frame p-6 rounded-xl bg-surface border border-border-subtle space-y-3"
            >
              <h3 className="font-display text-lg font-bold text-bone flex items-center gap-2">
                <span className="text-lavender-light">✕</span>
                <span>{pitfall.title}</span>
              </h3>
              <p className="text-xs sm:text-sm text-bone-muted leading-relaxed font-sans">
                {pitfall.explanation}
              </p>
              <div className="pt-2 border-t border-border-subtle/60 text-xs sm:text-sm text-bone font-sans">
                <strong className="text-lavender-moon font-mono uppercase text-[11px] block mb-1">
                  The Grounded Alternative:
                </strong>
                <span>{pitfall.betterWay}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. Frequently Asked Questions */}
      <section aria-labelledby="faqs-heading" className="space-y-6">
        <div className="border-b border-border pb-3">
          <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Questions & Lore</span>
          </span>
          <h2
            id="faqs-heading"
            className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {data.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="tarot-frame p-6 rounded-xl bg-surface border border-border-subtle space-y-2"
            >
              <h3 className="text-base sm:text-lg font-display font-semibold text-bone tracking-wide">
                {faq.question}
              </h3>
              <p className="text-sm text-bone-muted leading-relaxed font-sans">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 12. Related Intent Cross-Links */}
      <section aria-labelledby="related-intents-heading" className="space-y-6 pt-4">
        <div className="border-b border-border pb-3">
          <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
            <FourPointStar className="w-2.5 h-2.5" />
            <span>Explore Adjacent Systems</span>
          </span>
          <h2
            id="related-intents-heading"
            className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
          >
            Related Intent Guides
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.relatedIntents.map((rel) => (
            <div
              key={rel.slug}
              className="tarot-frame p-6 rounded-xl bg-surface border border-border-subtle flex flex-col justify-between space-y-3 group hover:border-lavender/60 transition-all"
            >
              <div className="space-y-2">
                <h3 className="font-display text-xl font-bold text-bone group-hover:text-lavender-light transition-colors">
                  <Link href={rel.url} className="hover:underline">
                    {rel.name}
                  </Link>
                </h3>
                <p className="text-xs sm:text-sm text-bone-muted leading-relaxed font-sans">
                  {rel.description}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href={rel.url}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-lavender hover:text-lavender-light min-h-[36px]"
                >
                  <span>Open {rel.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 13. Conversion & Next Steps */}
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
              <span>Next Step in Practice</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-bone tracking-wide">
              Filter by Your Ingredients & Time
            </h2>
            <p className="text-sm text-bone-muted leading-relaxed font-sans">
              Use Witchr's Spell Finder to quickly match what is already on your altar or kitchen shelf with focused, grounded practices for {data.title.toLowerCase()}.
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
              href="/correspondences"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-surface-elevated hover:bg-surface-hover text-bone-dim hover:text-bone text-xs font-mono uppercase tracking-ceremonial transition-colors min-h-[44px]"
            >
              <span>Back to Directory</span>
            </Link>
          </div>
        </div>
      </section>

      <CelestialDivider className="my-8" />
    </article>
  );
}
