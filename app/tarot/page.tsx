import type { Metadata } from "next";
import Link from "next/link";
import { TAROT_SPREADS } from "@/content/tarot";
import { JsonLd, getBreadcrumbJsonLd, getWebPageJsonLd } from "@/components/JsonLd";
import { FourPointStar, CelestialDivider, TarotCornerFlourish } from "@/components/OrnateFrames";
import { ArrowUpRight, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Tarot Spreads for Clarity & Self-Reflection",
  description:
    "Structured tarot spreads for diagnosing blind spots, decision paralysis, boundary release, and reflective inquiry. Not fortune-telling, but clear questions.",
  alternates: {
    canonical: "https://witchr.com/tarot",
  },
  openGraph: {
    title: "Tarot Spreads for Clarity & Self-Reflection | Witchr",
    description:
      "Structured tarot spreads for diagnosing blind spots, decision paralysis, and reflective inquiry.",
    url: "https://witchr.com/tarot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarot Spreads for Clarity & Self-Reflection | Witchr",
    description:
      "Structured tarot spreads for diagnosing blind spots and reflective inquiry.",
  },
};

export default function TarotIndexPage() {
  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", item: "https://witchr.com" },
    { name: "Tarot", item: "https://witchr.com/tarot" },
  ]);

  const webPageJsonLd = getWebPageJsonLd({
    title: "Tarot Spreads for Clarity & Self-Reflection | Witchr",
    description:
      "Structured tarot spreads for diagnosing blind spots, decision paralysis, and reflective inquiry.",
    url: "https://witchr.com/tarot",
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      <JsonLd data={breadcrumbs} />
      <JsonLd data={webPageJsonLd} />


      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
          <FourPointStar className="w-2.5 h-2.5" />
          <span>Diagnostic Symbolism</span>
        </span>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-bone tracking-wide celestial-glow">
          Ask better questions.
        </h1>
        <p className="text-lg md:text-xl text-bone-muted leading-relaxed font-sans">
          Tarot is more useful when you stop asking it to predict your entire life. Use these spreads as psychological mirrors to uncover blind spots, interrupt circular worries, and make decisions with clean nerve.
        </p>
        <p className="text-xs font-mono text-bone-dim pt-2">
          Note: Witchr provides spreads for physical cards and reflection. We do not generate randomized fortune-telling cards in V1.
        </p>
        <CelestialDivider className="max-w-sm my-4" />
      </div>

      {/* Spreads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TAROT_SPREADS.map((spread) => (
          <article
            key={spread.slug}
            className="tarot-frame group p-7 flex flex-col justify-between h-full min-h-[260px]"
          >
            <div className="absolute top-2.5 left-2.5 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
              <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-ceremonial text-lavender-moon mb-3">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  {spread.cardCount} Cards
                </span>
                <span className="text-bone-dim">Diagnostic</span>
              </div>
              <h2 className="font-serif text-2xl font-semibold text-bone group-hover:text-lavender-light transition-colors leading-snug">
                <Link href={`/tarot/${spread.slug}`} className="focus:outline-none">
                  {spread.title}
                </Link>
              </h2>
              <p className="text-sm text-bone-muted mt-3 leading-relaxed font-sans">
                {spread.purpose}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-bone-dim group-hover:text-lavender-light transition-colors">
              <span>View card positions</span>
              <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
