import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProblemHubBySlug } from "@/content/problems";
import { ProblemHubView } from "@/components/ProblemHubView";

export const metadata: Metadata = {
  title: "Rituals for Clarity & Direction",
  description:
    "Practical rituals and decision-making tools for breaking executive freeze, overcoming analysis paralysis, and starting fresh.",
  alternates: {
    canonical: "https://witchr.com/direction",
  },
  openGraph: {
    title: "Rituals for Clarity & Direction | Witchr",
    description:
      "Practical rituals and decision-making tools for breaking executive freeze, overcoming analysis paralysis, and starting fresh.",
    url: "https://witchr.com/direction",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rituals for Clarity & Direction | Witchr",
    description:
      "Practical rituals and decision-making tools for breaking executive freeze and analysis paralysis.",
  },
};


export default function DirectionHubPage() {
  const hub = getProblemHubBySlug("direction");
  if (!hub) notFound();

  return <ProblemHubView hub={hub} />;
}
