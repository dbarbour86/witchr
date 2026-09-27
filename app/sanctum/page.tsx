import type { Metadata } from "next";
import { SanctumHeader } from "@/components/sanctum/SanctumHeader";
import { OracleEntranceClient } from "@/components/sanctum/OracleEntranceClient";

export const metadata: Metadata = {
  title: "Witchr Sanctum — The Oracle Chamber & Occult Sanctuary",
  description:
    "Enter the Sanctum: Meet the Oracle of Witchr for grounded self-inquiry, diagnostic tarot reflection, personalized ritual workings, and private grimoire archives.",
  alternates: {
    canonical: "https://witchr.com/sanctum",
  },
};

export default function SanctumPage() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 py-2 sm:py-6">
      {/* Sanctum Section Sub-Header */}
      <SanctumHeader currentSection="The Oracle Chamber" />

      {/* The Oracle Chamber Entrance Experience */}
      <OracleEntranceClient />
    </div>
  );
}
