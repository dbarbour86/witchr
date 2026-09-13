import type { Metadata } from "next";
import { SpellFinder } from "@/components/SpellFinder";
import { JsonLd, getBreadcrumbJsonLd, getWebPageJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Spell Finder — Find a Ritual for What’s Eating You",
  description:
    "You don’t need to know what kind of spell you’re looking for. Start with what’s bothering you. Instant grounded recommendations.",
  alternates: {
    canonical: "https://witchr.com/spell-finder",
  },
  openGraph: {
    title: "Spell Finder — Find a Ritual for What’s Eating You | Witchr",
    description:
      "Start with the problem. Find a practical, grounded ritual in two steps.",
    url: "https://witchr.com/spell-finder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spell Finder — Find a Ritual for What’s Eating You | Witchr",
    description:
      "Start with the problem. Find a practical, grounded ritual in two steps.",
  },
};

export default function SpellFinderPage() {
  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", item: "https://witchr.com" },
    { name: "Spell Finder", item: "https://witchr.com/spell-finder" },
  ]);

  const webPageJsonLd = getWebPageJsonLd({
    title: "Spell Finder — Find a Ritual for What’s Eating You | Witchr",
    description:
      "Start with the problem. Find a practical, grounded ritual in two steps.",
    url: "https://witchr.com/spell-finder",
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <JsonLd data={breadcrumbs} />
      <JsonLd data={webPageJsonLd} />
      <SpellFinder />
    </div>
  );
}

