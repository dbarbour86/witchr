import type { Metadata } from "next";
import { SanctumHeader } from "@/components/sanctum/SanctumHeader";
import { ThreeCardReadingClient } from "@/components/sanctum/ThreeCardReadingClient";

export const metadata: Metadata = {
  title: "Three-Card Reading — Sanctum Spread",
  description: "Explore any pressing question through Situation, Challenge, and Guidance in the Witchr Sanctum.",
  alternates: {
    canonical: "https://witchr.com/sanctum/tarot/three-card",
  },
};

export default function ThreeCardReadingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Sanctum Sub-Header with Back Link */}
      <SanctumHeader currentSection="Three-Card Reading" showBackToSanctum={true} />

      {/* Functional Interactive Three-Card Reading Experience */}
      <ThreeCardReadingClient />
    </div>
  );
}

