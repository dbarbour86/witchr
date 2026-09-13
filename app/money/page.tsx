import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProblemHubBySlug } from "@/content/problems";
import { ProblemHubView } from "@/components/ProblemHubView";

export const metadata: Metadata = {
  title: "Money Spells & Rituals",
  description:
    "Practical money spells, rituals, and grounding tools for overcoming financial avoidance, budgeting panic, and career stagnation.",
  alternates: {
    canonical: "https://witchr.com/money",
  },
  openGraph: {
    title: "Money Spells & Rituals | Witchr",
    description:
      "Practical money spells, rituals, and grounding tools for overcoming financial avoidance, budgeting panic, and career stagnation.",
    url: "https://witchr.com/money",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Money Spells & Rituals | Witchr",
    description:
      "Practical money spells, rituals, and grounding tools for overcoming financial avoidance and budgeting panic.",
  },
};


export default function MoneyHubPage() {
  const hub = getProblemHubBySlug("money");
  if (!hub) notFound();

  return <ProblemHubView hub={hub} />;
}
