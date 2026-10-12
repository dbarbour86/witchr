import type { Metadata } from "next";
import { SanctumHeader } from "@/components/sanctum/SanctumHeader";
import { GrimoireLedgerClient } from "@/components/sanctum/GrimoireLedgerClient";

export const metadata: Metadata = {
  title: "My Grimoire — Saved Readings & Workings",
  description: "Your private ledger of saved tarot readings, synthesized workings, and reflection logs in the Witchr Sanctum.",
  alternates: {
    canonical: "https://witchr.com/sanctum/grimoire",
  },
};

export default function MyGrimoirePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Sanctum Sub-Header with Back Link */}
      <SanctumHeader currentSection="My Grimoire" showBackToSanctum={true} />

      {/* Functional Interactive Grimoire Ledger */}
      <GrimoireLedgerClient />
    </div>
  );
}

