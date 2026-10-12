import React from "react";
import type { Metadata } from "next";
import { SanctumShell } from "@/components/sanctum/SanctumShell";
import { SanctumBadgeToastContainer } from "@/components/sanctum/SanctumBadgeToast";
import { SanctumDevPanel } from "@/components/sanctum/SanctumDevPanel";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function SanctumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SanctumShell>
      {children}
      <SanctumBadgeToastContainer />
      {process.env.NODE_ENV !== "production" && <SanctumDevPanel />}
    </SanctumShell>
  );
}

