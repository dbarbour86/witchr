import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, getBreadcrumbJsonLd, getWebPageJsonLd } from "@/components/JsonLd";
import { CelestialDivider, FourPointStar } from "@/components/OrnateFrames";
import { Scale, Compass, HardDrive, ShieldCheck, Cpu, Flame, AlertCircle, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service — Witchr Sanctum & Platform",
  description:
    "Official terms of service for Witchr and Witchr Sanctum. Rules of use, local data responsibility, AI synthesis disclosures, and reflective practice guidelines.",
  alternates: {
    canonical: "https://witchr.com/terms",
  },
  openGraph: {
    title: "Terms of Service | Witchr",
    description: "Official terms of service for Witchr and Witchr Sanctum.",
    url: "https://witchr.com/terms",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Witchr",
    description: "Official terms of service for Witchr and Witchr Sanctum.",
  },
};

export default function TermsPage() {
  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", item: "https://witchr.com" },
    { name: "Terms of Service", item: "https://witchr.com/terms" },
  ]);

  const webPageJsonLd = getWebPageJsonLd({
    title: "Terms of Service | Witchr",
    description:
      "Official terms of service for Witchr and Witchr Sanctum. Covers account usage, local storage responsibility, and reflective content terms.",
    url: "https://witchr.com/terms",
  });

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
      <JsonLd data={breadcrumbs} />
      <JsonLd data={webPageJsonLd} />

      {/* Header */}
      <header className="space-y-4 border-b border-border pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border-highlight text-xs font-mono uppercase tracking-ceremonial text-lavender-moon shadow-subtle">
          <Scale className="w-3.5 h-3.5 text-lavender-moon" />
          <span>Agreement & Platform Rules</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-bone tracking-wide celestial-glow">
          Terms of Service
        </h1>
        <p className="text-lg text-bone-muted font-sans leading-relaxed">
          Please review these terms before entering Witchr Sanctum or participating in any ritual, reading, or consultation.
        </p>
        <CelestialDivider className="max-w-xs my-4" />
      </header>

      {/* Content Sections */}
      <div className="space-y-10 text-base text-bone-muted leading-relaxed font-sans">
        {/* 1. Acceptance of Terms */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold text-bone flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-lavender-moon shrink-0" />
            <span>1. Acceptance & Overview</span>
          </h2>
          <p>
            By accessing or using Witchr.com or the interactive Witchr Sanctum workstation, you agree to be bound by these Terms of Service, our{" "}
            <Link href="/privacy" className="text-purple-300 hover:text-white underline underline-offset-2 transition-colors">
              Privacy Policy
            </Link>, and our{" "}
            <Link href="/disclaimer" className="text-purple-300 hover:text-white underline underline-offset-2 transition-colors">
              Safety & Medical Disclaimers
            </Link>.
            If you do not agree with these terms, you should discontinue use of the platform.
          </p>
        </section>

        {/* 2. Reflective & Non-Supernatural Nature */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-semibold text-bone flex items-center gap-2">
            <Compass className="w-5 h-5 text-lavender-moon shrink-0" />
            <span>2. Reflective Content & Absence of Guarantees</span>
          </h2>
          <div className="tarot-frame p-6 space-y-3 text-sm">
            <p>
              <strong className="text-lavender-light">Educational & Reflective Purpose:</strong> Witchr is an occult self-guidance platform designed for mindfulness, symbolic exploration, somatic focus, and introspective journaling.
            </p>
            <p>
              <strong className="text-lavender-light">No Guaranteed Outcomes:</strong> We make no representations or warranties that performing any ritual, drawing any tarot card, lighting any candle, or following any correspondence will produce metaphysical, supernatural, physical, or future events. Practices on this platform serve as psychological, creative, and symbolic tools; they do not alter external physical reality without concrete human action or override the free will of others.
            </p>
            <p>
              <strong className="text-lavender-light">Not Professional Advice:</strong> No part of Witchr constitutes licensed medical diagnosis, clinical psychotherapy, emergency psychiatric crisis intervention, financial advice, or legal counsel. For critical health, financial, legal, or psychological matters, practitioners must consult licensed, accredited professionals.
            </p>
          </div>
        </section>

        {/* 3. AI Oracle Syntheses */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-semibold text-bone flex items-center gap-2">
            <Cpu className="w-5 h-5 text-lavender-moon shrink-0" />
            <span>3. AI-Generated Oracle Syntheses</span>
          </h2>
          <p>
            Interactive Oracle responses in Witchr Sanctum are synthesized using third-party artificial intelligence models (such as Google Gemini or OpenAI).
          </p>
          <div className="space-y-2 text-sm text-bone-muted pl-1">
            <p>
              • Oracle messages represent creative, symbolic, and mythological interpretations tailored to your reflection. They do not constitute objective factual truth, psychic clairvoyance, or actionable instructions.
            </p>
            <p>
              • You retain sole judgment regarding how to interpret and apply any symbolic reflection to your personal life.
            </p>
          </div>
        </section>

        {/* 4. Local Data & Practitioner Responsibility */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-semibold text-bone flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-lavender-moon shrink-0" />
            <span>4. Local Storage & Practitioner Data Responsibility</span>
          </h2>
          <div className="tarot-frame p-6 space-y-3 text-sm">
            <p>
              <strong className="text-lavender-light">Browser-Local Storage:</strong> Your Grimoire readings (daily draws, three-card folios, and created rituals), conversation records, and practice streak progress are saved locally in your own browser (<code className="text-purple-300 font-mono text-xs">localStorage</code>), scoped to your authenticated account identifier.
            </p>
            <p>
              <strong className="text-lavender-light">No Cloud Backup or Sync:</strong> Witchr does <strong>not</strong> maintain a cloud backup or remote synchronization service for your Grimoire entries. You are solely responsible for printing, exporting, or archiving records you wish to retain permanently.
            </p>
            <p>
              <strong className="text-lavender-light">No Liability for Local Data Loss:</strong> Witchr is not liable for the loss, deletion, or corruption of local records resulting from clearing browser data, private browsing sessions, browser updates, hardware changes, or device malfunction.
            </p>
          </div>
        </section>

        {/* 5. Account Registration & Conduct */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold text-bone flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-lavender-moon shrink-0" />
            <span>5. Account Registration, Use & Deletion</span>
          </h2>
          <p>
            You agree to provide accurate information when registering via email or Google OAuth and to maintain the security of your credentials. You are responsible for all activities occurring under your account.
          </p>
          <p className="text-sm">
            You agree not to disrupt, overload, reverse engineer, or abuse platform APIs, bypass rate limiters, circumvent guest preview limits, or deploy unauthorized automated bots or scrapers against Witchr or Witchr Sanctum.
          </p>
          <div className="p-4 rounded-xl bg-surface border border-border text-sm space-y-1.5">
            <span className="font-mono text-xs text-lavender-light font-semibold uppercase tracking-wider block">
              Account Deletion Requests
            </span>
            <p>
              You may request deletion of your server-side authentication account at any time by emailing{" "}
              <a href="mailto:help@witchr.com" className="text-lavender-light font-mono underline underline-offset-2">
                help@witchr.com
              </a>{" "}
              from your registered email address. Identity verification will be required before account deletion is completed. Deletion of your server-side account does not clear records stored locally in your personal web browser, which you must clear directly within your browser settings.
            </p>
          </div>
        </section>

        {/* 6. Fire & Physical Safety */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold text-bone flex items-center gap-2">
            <Flame className="w-5 h-5 text-lavender-moon shrink-0" />
            <span>6. Fire & Physical Safety Compliance</span>
          </h2>
          <p>
            You acknowledge and agree that you are solely responsible for practicing safe fire protocols when performing rituals involving candles, matches, herbs, or embers. Never leave flames unattended, and never ingest unknown herbs, botanicals, or essential oils. Review our full{" "}
            <Link href="/disclaimer" className="text-purple-300 hover:text-white underline underline-offset-2 transition-colors">
              Safety Guidelines
            </Link>{" "}
            before engaging in any physical practice.
          </p>
        </section>

        {/* 7. Limitation of Liability */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold text-bone">
            7. Limitation of Liability
          </h2>
          <p className="text-sm">
            To the maximum extent permitted by applicable law, Witchr and its creators shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your use of, or inability to use, the platform, rituals, tarot spreads, Oracle syntheses, or local journal entries.
          </p>
        </section>

        {/* 8. Governing Law & Contact */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold text-bone flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-lavender-moon shrink-0" />
            <span>8. Governing Law & Inquiries</span>
          </h2>
          <p className="text-sm">
            These terms are governed by and construed in accordance with the laws of the State of North Carolina, United States, without regard to conflict of law principles. Witchr is operated from North Carolina, United States.
          </p>
          <p className="text-sm">
            For questions regarding these Terms of Service, please contact:{" "}
            <a href="mailto:help@witchr.com" className="text-lavender-light font-mono font-medium underline underline-offset-2">
              help@witchr.com
            </a>.
          </p>
        </section>
      </div>

      {/* Footer Navigation */}
      <div className="pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          className="text-xs font-mono uppercase tracking-ceremonial text-lavender hover:text-lavender-light transition-colors"
        >
          ← Return to Witchr Homepage
        </Link>
        <div className="flex items-center gap-4 text-xs font-mono text-bone-dim">
          <Link href="/privacy" className="hover:text-lavender-light transition-colors">
            Privacy Policy
          </Link>
          <span>·</span>
          <Link href="/disclaimer" className="hover:text-lavender-light transition-colors">
            Safety Disclaimers
          </Link>
        </div>
      </div>
    </article>
  );
}
