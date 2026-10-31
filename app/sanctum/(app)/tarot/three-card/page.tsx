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
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
      {/* Sanctum Sub-Header with Prominent Back Link */}
      <SanctumHeader currentSection="Three-Card Reading" showBackToSanctum={true} />

      {/* Functional Interactive Three-Card Reading Experience */}
      <ThreeCardReadingClient />
    </div>
  );
}

