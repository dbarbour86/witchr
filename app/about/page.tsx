import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, getBreadcrumbJsonLd, getWebPageJsonLd } from "@/components/JsonLd";
import { CelestialDivider, FourPointStar, TarotCornerFlourish } from "@/components/OrnateFrames";
import { ArrowRight, Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "About Witchr — Witchcraft Without the Bullshit",
  description:
    "Why Witchr exists. A grounded, modern philosophy of ritual, symbolism, and psychological boundaries without fluffy spiritual clichés or false promises.",
  alternates: {
    canonical: "https://witchr.com/about",
  },
  openGraph: {
    title: "About Witchr — Witchcraft Without the Bullshit | Witchr",
    description: "Witchcraft for modern problems. Take what helps. Leave what doesn’t.",
    url: "https://witchr.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Witchr — Witchcraft Without the Bullshit | Witchr",
    description: "Witchcraft for modern problems. Take what helps. Leave what doesn’t.",
  },
};

export default function AboutPage() {
  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", item: "https://witchr.com" },
    { name: "About", item: "https://witchr.com/about" },
  ]);

  const webPageJsonLd = getWebPageJsonLd({
    title: "About Witchr — Witchcraft Without the Bullshit | Witchr",
    description:
      "Why Witchr exists. A grounded, modern philosophy of ritual, symbolism, and psychological boundaries.",
    url: "https://witchr.com/about",
  });

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16">
      <JsonLd data={breadcrumbs} />
      <JsonLd data={webPageJsonLd} />


      {/* Header */}
      <header className="space-y-4 border-b border-border pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border-highlight text-xs font-mono uppercase tracking-ceremonial text-lavender-moon shadow-subtle">
          <FourPointStar className="w-3 h-3 text-lavender-moon" />
          <span>The Grimoire Manifesto</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-bold text-bone tracking-wide leading-[1.1] celestial-glow">
          Witchcraft without the bullshit.
        </h1>
        <p className="text-xl md:text-2xl text-lavender-light font-serif italic pt-2">
          Something’s eating at you. Start there.
        </p>
        <CelestialDivider className="max-w-xs my-4" />
      </header>

      {/* Philosophy Body */}
      <div className="space-y-8 text-base md:text-lg text-bone-muted leading-relaxed font-sans">
        <p>
          Witchr is for people who like ritual, symbolism, tarot, witchcraft, reflection, strange little traditions, and doing something deliberate when life feels messy.
        </p>

        <p>
          People usually do not arrive because they want to “study ancient occult dogma.” They arrive because something is actively eating at them: they cannot stop checking their ex’s profile, their bank account is giving them nausea, they feel paralyzed by career indecision, or someone is walking all over their boundaries.
        </p>

        {/* Contrast Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
          {/* What we don't do */}
          <div className="tarot-frame p-6 sm:p-7 space-y-4">
            <h2 className="font-serif text-xl font-semibold text-lavender-moon flex items-center gap-2">
              <span>What you will never find here</span>
            </h2>
            <ul className="space-y-3 text-sm text-bone-muted font-sans">
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-plum-light shrink-0 mt-0.5" />
                <span>We do not pretend a candle guarantees you money.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-plum-light shrink-0 mt-0.5" />
                <span>We do not tell people a spell can force an ex to return.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-plum-light shrink-0 mt-0.5" />
                <span>We do not promise the universe owes anyone a specific outcome.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-plum-light shrink-0 mt-0.5" />
                <span>No toxic positivity, "high vibration" shaming, or pseudo-medical claims.</span>
              </li>
            </ul>
          </div>

          {/* What we do */}
          <div className="tarot-frame p-6 sm:p-7 space-y-4">
            <h2 className="font-serif text-xl font-semibold text-lavender-light flex items-center gap-2">
              <span>What Witchr is built for</span>
            </h2>
            <ul className="space-y-3 text-sm text-bone-muted font-sans">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-lavender-moon shrink-0 mt-0.5" />
                <span>Drawing hard psychological boundaries with somatic ceremony.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-lavender-moon shrink-0 mt-0.5" />
                <span>Marking thresholds: breakups, career shifts, and clean slates.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-lavender-moon shrink-0 mt-0.5" />
                <span>Using tarot spreads to diagnose blind spots rather than fortune-telling.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-lavender-moon shrink-0 mt-0.5" />
                <span>Always ending with a concrete, real-world physical action.</span>
              </li>
            </ul>
          </div>
        </div>

        <p>
          You don’t have to believe every candle has cosmic powers to find value in ritual. Sometimes sitting down in front of a flame, cutting a piece of twine, and writing your boundary down with black ink is simply the cleanest way of drawing a line in the sand.
        </p>

        <p>
          You cannot control another person. You can decide what you do next.
        </p>

        <blockquote className="p-7 border-l-2 border-lavender/70 bg-surface-elevated/60 text-xl font-serif italic text-lavender-light my-8 rounded-r-xl shadow-subtle">
          “Sometimes doing something symbolic can help mark a decision, clarify an intention, create closure, or push you toward action. That is interesting enough.”
        </blockquote>

        <p className="text-xl font-serif text-bone font-medium tracking-wide">
          Take what helps. Leave what doesn’t.
        </p>
      </div>

      <CelestialDivider className="my-10" />

      {/* CTA Bottom */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/spell-finder"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-surface-elevated hover:bg-surface-hover text-lavender-light border border-border-ornate hover:border-lavender font-mono text-xs uppercase tracking-ceremonial font-semibold shadow-glow-subtle transition-all min-h-[44px]"
        >
          <span>Find your ritual</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/disclaimer"
          className="text-xs font-mono uppercase tracking-wider text-bone-dim hover:text-lavender-light underline"
        >
          Read Safety & Disclaimers
        </Link>
      </div>
    </article>
  );
}
