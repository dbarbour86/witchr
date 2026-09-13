import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProblemHubBySlug } from "@/content/problems";
import { ProblemHubView } from "@/components/ProblemHubView";

export const metadata: Metadata = {
  title: "Letting Go Spells & Rituals",
  description:
    "Modern rituals for cord cutting, release, closure, and putting down past chapters and relationships with clean finality.",
  alternates: {
    canonical: "https://witchr.com/letting-go",
  },
  openGraph: {
    title: "Letting Go Spells & Rituals | Witchr",
    description:
      "Modern rituals for cord cutting, release, closure, and putting down past chapters and relationships with clean finality.",
    url: "https://witchr.com/letting-go",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Letting Go Spells & Rituals | Witchr",
    description:
      "Modern rituals for cord cutting, release, and emotional closure.",
  },
};


export default function LettingGoHubPage() {
  const hub = getProblemHubBySlug("letting-go");
  if (!hub) notFound();

  return <ProblemHubView hub={hub} />;
}
