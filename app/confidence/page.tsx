import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProblemHubBySlug } from "@/content/problems";
import { ProblemHubView } from "@/components/ProblemHubView";

export const metadata: Metadata = {
  title: "Confidence Spells & Rituals",
  description:
    "Modern witchcraft rituals and grounding practices for building quiet confidence, taking up space, and speaking with authority.",
  alternates: {
    canonical: "https://witchr.com/confidence",
  },
  openGraph: {
    title: "Confidence Spells & Rituals | Witchr",
    description:
      "Modern witchcraft rituals and grounding practices for building quiet confidence, taking up space, and speaking with authority.",
    url: "https://witchr.com/confidence",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Confidence Spells & Rituals | Witchr",
    description:
      "Modern witchcraft rituals and grounding practices for building quiet confidence and nerve.",
  },
};


export default function ConfidenceHubPage() {
  const hub = getProblemHubBySlug("confidence");
  if (!hub) notFound();

  return <ProblemHubView hub={hub} />;
}
