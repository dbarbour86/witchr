import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProblemHubBySlug } from "@/content/problems";
import { ProblemHubView } from "@/components/ProblemHubView";

export const metadata: Metadata = {
  title: "Love Spells & Rituals",
  description:
    "Practical love rituals focused on personal boundaries, self-sovereignty, standards, and breaking obsessive emotional loops.",
  alternates: {
    canonical: "https://witchr.com/love",
  },
  openGraph: {
    title: "Love Spells & Rituals | Witchr",
    description:
      "Practical love rituals focused on personal boundaries, self-sovereignty, standards, and breaking obsessive emotional loops.",
    url: "https://witchr.com/love",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Love Spells & Rituals | Witchr",
    description:
      "Practical love rituals focused on personal boundaries, self-sovereignty, standards, and self-respect.",
  },
};


export default function LoveHubPage() {
  const hub = getProblemHubBySlug("love");
  if (!hub) notFound();

  return <ProblemHubView hub={hub} />;
}
