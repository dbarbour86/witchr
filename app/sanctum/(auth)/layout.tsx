import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SanctumAuthProvider } from "@/lib/supabase/auth-context";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <SanctumAuthProvider>
      <div className="min-h-screen bg-[#06020c] text-bone flex flex-col justify-between sanctum-grain selection:bg-purple-900 selection:text-lavender-light relative overflow-x-hidden">
        {/* Ambient violet aura */}
        <div className="fixed top-0 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="fixed bottom-0 right-1/4 w-[30rem] h-[30rem] bg-purple-950/20 rounded-full blur-[160px] pointer-events-none -z-10" />

        {/* Minimal Header */}
        <header className="w-full max-w-5xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link
            href="/sanctum/chamber"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-lg"
          >
            <Image
              src="/images/icon.png"
              alt="Witchr Sanctum"
              width={36}
              height={36}
              priority
              className="w-8 h-8 object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]"
            />
            <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.14em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-300">
              Witchr Sanctum
            </span>
          </Link>

          <Link
            href="/sanctum/chamber"
            className="text-xs font-mono uppercase tracking-[0.16em] text-purple-400/80 hover:text-white transition-colors"
          >
            ← Sanctum Chamber
          </Link>
        </header>

        {/* Auth Content */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
          {children}
        </main>

        {/* Minimal Footer */}
        <footer className="w-full max-w-5xl mx-auto px-4 py-6 text-center text-[10px] font-mono text-purple-400/50 uppercase tracking-widest">
          A quieter place for louder questions.
        </footer>
      </div>
    </SanctumAuthProvider>
  );
}

