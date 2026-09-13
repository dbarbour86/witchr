import type { Metadata } from "next";
import { SIGILS } from "@/content/sigils";
import { SigilsGalleryClient } from "./SigilsGalleryClient";
import { JsonLd, getBreadcrumbJsonLd, getWebPageJsonLd } from "@/components/JsonLd";
import { FourPointStar, CelestialDivider } from "@/components/OrnateFrames";

export const metadata: Metadata = {
  title: "Simple Sigils for Protection, Confidence & Focus",
  description:
    "Original geometric line-art sigils for boundaries, confidence, focus, release, and motivation. Practical visual anchors for modern intentions.",
  alternates: {
    canonical: "https://witchr.com/sigils",
  },
  openGraph: {
    title: "Simple Sigils for Protection, Confidence & Focus | Witchr",
    description: "Give the intention a symbol. Clean original sigil gallery.",
    url: "https://witchr.com/sigils",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simple Sigils for Protection, Confidence & Focus | Witchr",
    description: "Give the intention a symbol. Clean original sigil gallery.",
  },
};

export default function SigilsPage() {
  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", item: "https://witchr.com" },
    { name: "Sigils", item: "https://witchr.com/sigils" },
  ]);

  const webPageJsonLd = getWebPageJsonLd({
    title: "Simple Sigils for Protection, Confidence & Focus | Witchr",
    description:
      "Original geometric line-art sigils for boundaries, confidence, focus, release, and motivation. Practical visual anchors for modern intentions.",
    url: "https://witchr.com/sigils",
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      <JsonLd data={breadcrumbs} />
      <JsonLd data={webPageJsonLd} />


      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
          <FourPointStar className="w-2.5 h-2.5" />
          <span>Visual Anchors</span>
        </span>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-bone tracking-wide celestial-glow">
          Give the intention a symbol.
        </h1>
        <p className="text-lg md:text-xl text-bone-muted leading-relaxed font-sans">
          A sigil is a symbol created to represent an intention. Whether you view it as magical, psychological, symbolic, or artistic is entirely up to you.
        </p>
        <p className="text-sm text-bone-dim leading-relaxed font-sans">
          The human brain thinks in images, not bullet points. Drawing or visualizing a simple mark anchors your resolve without requiring a twenty-page manifesto.
        </p>
        <CelestialDivider className="max-w-sm my-4" />
      </div>

      {/* Client Gallery with Focus Interaction */}
      <SigilsGalleryClient sigils={SIGILS} />
    </div>
  );
}
