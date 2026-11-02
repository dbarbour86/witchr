import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProblemHubBySlug } from "@/content/problems";
import { ProblemHubView } from "@/components/ProblemHubView";

export const metadata: Metadata = {
  title: "Protection Witchcraft, Rituals & Tools",
  description:
    "Explore practical protection rituals, symbolic tools, and modern witchcraft practices for boundaries, cleansing, confidence, and peace of mind.",
  alternates: {
    canonical: "https://www.witchr.com/protection",
  },
  openGraph: {
    title: "Protection Witchcraft, Rituals & Tools | Witchr",
    description:
      "Explore practical protection rituals, symbolic tools, and modern witchcraft practices for boundaries, cleansing, and peace of mind.",
    url: "https://www.witchr.com/protection",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Protection Witchcraft, Rituals & Tools | Witchr",
    description:
      "Explore practical protection rituals, symbolic tools, and modern witchcraft practices for boundaries, cleansing, and peace of mind.",
  },
};


export default function ProtectionHubPage() {
  const hub = getProblemHubBySlug("protection");
  if (!hub) notFound();

  return <ProblemHubView hub={hub} />;
}
