import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, getBreadcrumbJsonLd, getWebPageJsonLd } from "@/components/JsonLd";
import { CelestialDivider, FourPointStar } from "@/components/OrnateFrames";
import { Shield, Lock, Server, Cpu, Cookie, HardDrive, Mail, AlertCircle, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Witchr Sanctum & Platform",
  description:
    "Official privacy policy for Witchr and Witchr Sanctum. How authentication, local browser storage, AI Oracle queries, and guest previews are handled.",
  alternates: {
    canonical: "https://witchr.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Witchr",
    description: "Official privacy policy for Witchr and Witchr Sanctum.",
    url: "https://witchr.com/privacy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Witchr",
    description: "Official privacy policy for Witchr and Witchr Sanctum.",
  },
};

export default function PrivacyPage() {
  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", item: "https://witchr.com" },
    { name: "Privacy Policy", item: "https://witchr.com/privacy" },
  ]);

  const webPageJsonLd = getWebPageJsonLd({
    title: "Privacy Policy | Witchr",
    description:
      "Official privacy policy for Witchr and Witchr Sanctum. Explains authentication, AI processing, local storage, and session handling.",
    url: "https://witchr.com/privacy",
  });

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
      <JsonLd data={breadcrumbs} />
      <JsonLd data={webPageJsonLd} />

      {/* Header */}
      <header className="space-y-4 border-b border-border pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border-highlight text-xs font-mono uppercase tracking-ceremonial text-lavender-moon shadow-subtle">
          <Shield className="w-3.5 h-3.5 text-lavender-moon" />
          <span>Data Practices & Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-bone tracking-wide celestial-glow">
          Privacy Policy
        </h1>
        <p className="text-lg text-bone-muted font-sans leading-relaxed">
          How Witchr handles your account credentials, browser storage, Oracle queries, and practitioner data.
        </p>
        <CelestialDivider className="max-w-xs my-4" />
      </header>

      {/* Content Sections */}
      <div className="space-y-10 text-base text-bone-muted leading-relaxed font-sans">
        {/* 1. Core Philosophy */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold text-bone flex items-center gap-2">
            <FourPointStar className="w-4 h-4 text-lavender-moon shrink-0" />
            <span>1. Core Data Philosophy</span>
          </h2>
          <p>
            Witchr is built around personal self-guidance and reflection. We do not sell your personal data, run third-party advertising trackers, or inspect your private ritual reflections. We collect and process only the minimal technical information necessary to authenticate members, manage guest preview access, deliver service emails, and power interactive divination tools.
          </p>
        </section>

        {/* 2. Authentication & Account Credentials */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-semibold text-bone flex items-center gap-2">
            <Lock className="w-5 h-5 text-lavender-moon shrink-0" />
            <span>2. Account Authentication via Supabase</span>
          </h2>
          <p>
            When you register an account or log in to Witchr Sanctum, your authentication credentials and session tokens are managed through hosted authentication infrastructure powered by <strong>Supabase Auth</strong>.
          </p>
          <div className="tarot-frame p-6 space-y-3 text-sm">
            <ul className="list-disc list-inside space-y-2 text-bone-muted pl-1">
              <li>
                <strong className="text-lavender-light">Email & Password:</strong> If you choose password-based sign-in, your email address and securely hashed password credentials are submitted to Supabase. Witchr application servers do not store or view your plaintext password.
              </li>
              <li>
                <strong className="text-lavender-light">Continue with Google (OAuth):</strong> If you choose Google sign-in, you authenticate with Google using standard PKCE flow. We request only basic identity scopes (<code className="text-purple-300 font-mono text-xs">openid email profile</code>) to verify your email address and name. We do not request or receive access to your Gmail messages, Google Drive files, contacts, calendar, or other Google account services.
              </li>
              <li>
                <strong className="text-lavender-light">Authentication Cookies:</strong> When authenticated, session tokens (access and refresh tokens) are stored in browser cookies prefixed with <code className="text-purple-300 font-mono text-xs">sb-*-auth-token</code> managed by <code className="text-purple-300 font-mono text-xs">@supabase/ssr</code>. In production environments, these cookies are marked <code className="text-purple-300 font-mono text-xs">Secure</code> (transmitted over HTTPS) with <code className="text-purple-300 font-mono text-xs">SameSite=Lax</code>. They contain signed session tokens accessible to client-side scripts to support both browser state and server-side middleware validation.
              </li>
            </ul>
          </div>
        </section>

        {/* 3. Transactional Emails */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold text-bone flex items-center gap-2">
            <Mail className="w-5 h-5 text-lavender-moon shrink-0" />
            <span>3. System Emails via Resend</span>
          </h2>
          <p>
            Transactional account management emails—including initial email verification links and password recovery requests—are dispatched through <strong>Resend</strong> as our configured SMTP email delivery service.
          </p>
          <p className="text-sm">
            We transmit only your recipient email address and the secure, single-use authentication callback token required to deliver these service messages. We do not use your address for marketing emails or sell it to third-party lists.
          </p>
        </section>

        {/* 4. Oracle AI Queries */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-semibold text-bone flex items-center gap-2">
            <Cpu className="w-5 h-5 text-lavender-moon shrink-0" />
            <span>4. Oracle Consultations & AI Processing</span>
          </h2>
          <p>
            When you submit questions to the Oracle in Witchr Sanctum or use the ritual intention synthesizer, your submitted text and practice parameters (such as drawn tarot card identifiers or ritual focus) are processed server-side through our configured third-party artificial intelligence provider (<strong>Google Gemini</strong> or <strong>OpenAI</strong>).
          </p>
          <div className="tarot-frame p-6 space-y-2.5 text-sm">
            <p>
              <strong className="text-lavender-light">Transient Inquest Synthesis:</strong> The AI provider processes the prompt server-side to generate a symbolic occult interpretation and returns the synthesized response to your browser. Your conversation history is maintained on your local device.
            </p>
            <p>
              <strong className="text-lavender-light">Sensitive Inquiries:</strong> We advise practitioners not to enter personally identifying information, medical records, financial account numbers, or passwords into Oracle inquiry prompts.
            </p>
          </div>
        </section>

        {/* 5. Guest Previews & Cookies */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-semibold text-bone flex items-center gap-2">
            <Cookie className="w-5 h-5 text-lavender-moon shrink-0" />
            <span>5. Guest Previews, Cookies & Technical Storage</span>
          </h2>
          <p>
            Witchr uses limited, purpose-specific cookies and browser storage to operate the platform:
          </p>
          <div className="space-y-3 text-sm">
            <div className="p-4 rounded-xl bg-surface border border-border space-y-1.5">
              <span className="font-mono text-xs text-lavender-light font-semibold uppercase tracking-wider block">
                Anonymous Guest Session Cookie (<code className="text-purple-300">witchr_guest_session</code>)
              </span>
              <p>
                To allow unauthenticated visitors to experience one trial Oracle inquiry before joining the Sanctum, an anonymous, randomly generated session identifier is stored in an HTTP-only, <code className="text-purple-300">SameSite=Lax</code> cookie (marked <code className="text-purple-300">Secure</code> in production).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-border space-y-1.5">
              <span className="font-mono text-xs text-lavender-light font-semibold uppercase tracking-wider block">
                Guest Preview Database Record
              </span>
              <p>
                To enforce the single-inquiry preview limit fairly across distributed servers, an anonymous technical record containing your guest session identifier, a reservation lock token, an inquiry counter (<code className="text-purple-300">questions_count</code>), and timestamps is recorded in our Supabase database. This technical record does not contain your name, email, or question text.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-border space-y-1.5">
              <span className="font-mono text-xs text-lavender-light font-semibold uppercase tracking-wider block">
                Local Conversation Continuity
              </span>
              <p>
                Your guest dialogue is saved locally in your browser’s <code className="text-purple-300">localStorage</code>. When you register or sign in, this local dialogue is automatically carried over into your account-scoped history in that browser so your inquiry remains intact.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Grimoire & Streak Local Storage */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-semibold text-bone flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-lavender-moon shrink-0" />
            <span>6. Grimoire Entries, Streaks & Local Storage (No Cloud Sync)</span>
          </h2>
          <p>
            A core architectural principle of Witchr Sanctum is that your spiritual journal remains on your device:
          </p>
          <div className="tarot-frame p-6 space-y-3 text-sm">
            <p>
              <strong className="text-lavender-light">Browser-Local Storage:</strong> All saved Grimoire readings (Daily Tarot cards, Three-Card spreads, and ritual folios), practice streaks, and Sacred Marks progress are stored exclusively in your browser’s local storage (<code className="text-purple-300 font-mono text-xs">localStorage</code>).
            </p>
            <p>
              <strong className="text-lavender-light">Account Isolation:</strong> When signed in, records are partitioned by your unique account identifier (e.g., <code className="text-purple-300 font-mono text-xs">witchr_sanctum_grimoire_readings_usr_...</code>). This prevents records from being displayed to other accounts that use the same browser profile.
            </p>
            <p>
              <strong className="text-lavender-light">No Cloud Synchronization:</strong> Witchr does <strong>not</strong> copy, transmit, or synchronize your saved Grimoire entries or streak count to Witchr cloud servers. If you clear your browser cache, browse in private or incognito mode, or switch to a different device or browser, your locally saved entries will not transfer automatically.
            </p>
          </div>
        </section>

        {/* 7. Data Retention & Deletion */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-semibold text-bone flex items-center gap-2">
            <FileText className="w-5 h-5 text-lavender-moon shrink-0" />
            <span>7. Data Retention, Erasure & Account Deletion</span>
          </h2>
          <div className="space-y-4 text-sm">
            <div className="p-4 rounded-xl bg-surface border border-border space-y-2">
              <span className="font-mono text-xs text-lavender-light font-semibold uppercase tracking-wider block">
                Browser-Local Data Removal
              </span>
              <p>
                Because your Grimoire folios, reflection notes, and conversation dialogue are stored client-side in your own browser, you have immediate and direct control over their removal. Clearing your browser’s local storage or site data for <code className="text-purple-300 font-mono text-xs">witchr.com</code> removes these records permanently from that device.
              </p>
              <p className="text-xs text-bone-dim">
                Note: Deleting server-side account data does not automatically wipe local browser storage on your personal devices; you must clear your local browser storage directly if you wish to remove stored folios.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-border space-y-2">
              <span className="font-mono text-xs text-lavender-light font-semibold uppercase tracking-wider block">
                Server-Side Account Deletion
              </span>
              <p>
                Your server-side account record (your email address, encrypted authentication credentials, and account identifier) is maintained in Supabase for the duration of your active membership to allow you to log in.
              </p>
              <p>
                To request formal deletion of your server-side account, please send an email to{" "}
                <a href="mailto:help@witchr.com" className="text-lavender-light font-mono font-medium underline underline-offset-2">
                  help@witchr.com
                </a>{" "}
                from the email address associated with your Witchr account.
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-bone-muted pl-1">
                <li>
                  <strong>Identity Verification:</strong> For your security, we will verify that you control the registered email address before any account deletion is executed.
                </li>
                <li>
                  <strong>Manual Processing:</strong> Deletion requests are processed manually rather than through an automated feature. We do not provide a fixed turnaround guarantee, though requests are handled as promptly as practicable.
                </li>
                <li>
                  <strong>Scope of Server Deletion:</strong> Upon completion, your authentication account record is deleted from Supabase. As noted above, any folios saved locally in your personal browser must be cleared by you within your browser settings.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 8. Contact & Operator Inquiries */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold text-bone flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-lavender-moon shrink-0" />
            <span>8. Operator Information & Contact</span>
          </h2>
          <p className="text-sm">
            Witchr is operated from North Carolina, United States.
          </p>
          <p className="text-sm">
            If you have questions regarding this Privacy Policy, your personal data, or account deletion, please contact us at:{" "}
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
          <Link href="/terms" className="hover:text-lavender-light transition-colors">
            Terms of Service
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
