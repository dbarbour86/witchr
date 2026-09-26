import React from "react";
import { SanctumShell } from "@/components/sanctum/SanctumShell";
import { SanctumBadgeToastContainer } from "@/components/sanctum/SanctumBadgeToast";
import { SanctumDevPanel } from "@/components/sanctum/SanctumDevPanel";

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

