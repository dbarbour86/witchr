import type { Metadata } from "next";
import { RITUALS } from "@/content/rituals";
import { RitualLibraryClient } from "./RitualLibraryClient";
import { JsonLd, getBreadcrumbJsonLd, getWebPageJsonLd } from "@/components/JsonLd";
import { FourPointStar, CelestialDivider } from "@/components/OrnateFrames";

export const metadata: Metadata = {
  title: "Modern Witchcraft Rituals for Real-Life Problems",
  description:
    "The complete Witchr ritual library. Grounded, practical rituals for boundaries, money clarity, heartbreak, anxiety, and decision paralysis.",
  alternates: {
    canonical: "https://witchr.com/rituals",
  },
  openGraph: {
    title: "Modern Witchcraft Rituals for Real-Life Problems | Witchr",
    description:
      "Start with a problem. Leave with something to do. The complete Witchr ritual library.",
    url: "https://witchr.com/rituals",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Modern Witchcraft Rituals for Real-Life Problems | Witchr",
    description:
      "Start with a problem. Leave with something to do. The complete Witchr ritual library.",
  },
};

export default function RitualsPage() {
  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", item: "https://witchr.com" },
    { name: "Rituals", item: "https://witchr.com/rituals" },
  ]);

  const webPageJsonLd = getWebPageJsonLd({
    title: "Modern Witchcraft Rituals for Real-Life Problems | Witchr",
    description:
      "The complete Witchr ritual library. Grounded, practical rituals for boundaries, money clarity, heartbreak, anxiety, and decision paralysis.",
    url: "https://witchr.com/rituals",
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
      <JsonLd data={breadcrumbs} />
      <JsonLd data={webPageJsonLd} />


      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
          <FourPointStar className="w-2.5 h-2.5" />
          <span>The Occult Archive</span>
        </span>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-bone tracking-wide celestial-glow">
          The Ritual Library
        </h1>
        <p className="text-lg md:text-xl text-bone-muted leading-relaxed font-sans">
          Start with a problem. Leave with something to do. Every practice here is structured with accessible materials, clean steps, and real-world execution.
        </p>
        <CelestialDivider className="max-w-sm my-4" />
      </div>

      {/* Client Filter & Grid */}
      <RitualLibraryClient rituals={RITUALS} />
    </div>
  );
}
