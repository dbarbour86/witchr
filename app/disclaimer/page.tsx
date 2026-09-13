import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, getBreadcrumbJsonLd, getWebPageJsonLd } from "@/components/JsonLd";
import { CelestialDivider, FourPointStar } from "@/components/OrnateFrames";
import { ShieldAlert, Flame, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Safety, Medical & Supernatural Disclaimers",
  description:
    "Official safety, fire prevention, medical, legal, and non-supernatural disclaimers for Witchr.com. Read before practicing.",
  alternates: {
    canonical: "https://witchr.com/disclaimer",
  },
  openGraph: {
    title: "Safety, Medical & Supernatural Disclaimers | Witchr",
    description: "Official safety guidelines and disclaimers for Witchr.com.",
    url: "https://witchr.com/disclaimer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Safety, Medical & Supernatural Disclaimers | Witchr",
    description: "Official safety guidelines and disclaimers for Witchr.com.",
  },
};

export default function DisclaimerPage() {
  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", item: "https://witchr.com" },
    { name: "Disclaimer", item: "https://witchr.com/disclaimer" },
  ]);

  const webPageJsonLd = getWebPageJsonLd({
    title: "Safety, Medical & Supernatural Disclaimers | Witchr",
    description:
      "Official safety, fire prevention, medical, legal, and non-supernatural disclaimers for Witchr.com.",
    url: "https://witchr.com/disclaimer",
  });

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
      <JsonLd data={breadcrumbs} />
      <JsonLd data={webPageJsonLd} />


      {/* Header */}
      <header className="space-y-4 border-b border-border pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border-highlight text-xs font-mono uppercase tracking-ceremonial text-lavender-moon shadow-subtle">
          <ShieldAlert className="w-3.5 h-3.5 text-lavender-moon" />
          <span>Legal & Physical Safety</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-bone tracking-wide celestial-glow">
          Disclaimer & Safety Guidelines
        </h1>
        <p className="text-lg text-bone-muted font-sans">
          Please read these policies carefully before engaging in any ritual, reflection, or practice on Witchr.com.
        </p>
        <CelestialDivider className="max-w-xs my-4" />
      </header>

      {/* Content Sections */}
      <div className="space-y-10 text-base text-bone-muted leading-relaxed font-sans">
        {/* 1. Nature of Content */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold text-bone flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-lavender-moon" />
            <span>1. Educational, Reflective, and Entertainment Purpose</span>
          </h2>
          <p>
            Witchr is provided strictly for educational, personal reflection, spiritual exploration, creative, and entertainment purposes. We explore traditional folklore, somatic practices, journaling prompts, and symbolic ceremony.
          </p>
          <p>
            Nothing on Witchr guarantees supernatural, metaphysical, or physical results. We do not claim that performing a ritual or burning a candle will alter external reality without physical action, override another individual's free will, or generate financial or romantic windfalls.
          </p>
        </section>

        {/* 2. Professional Advice Disclaimers */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold text-bone flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-lavender-moon" />
            <span>2. Not Medical, Mental Health, Legal, or Financial Advice</span>
          </h2>
          <div className="tarot-frame p-6 space-y-3 text-sm">
            <p>
              <strong className="text-lavender-light">Medical & Mental Health:</strong> Witchr content is not a substitute for clinical psychological treatment, psychiatric medication, trauma therapy, or emergency crisis support. If you are experiencing suicidal ideation, severe depression, panic attacks, or domestic abuse, please contact professional emergency hotlines (such as 988 in the US/Canada) or licensed medical doctors immediately.
            </p>
            <p>
              <strong className="text-lavender-light">Financial & Legal:</strong> Practices addressing money anxiety, pricing hesitation, or employment decisions do not constitute licensed financial counseling, investment guidance, or legal representation. Consult accredited financial planners, accountants, or attorneys for binding legal and fiscal decisions.
            </p>
          </div>
        </section>

        {/* 3. Physical & Fire Safety */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-semibold text-bone flex items-center gap-2">
            <Flame className="w-5 h-5 text-lavender-moon" />
            <span>3. Fire and Physical Safety Guidelines</span>
          </h2>
          <p>
            Several rituals on this website utilize open flames, candles, matches, and hot ashes. You are solely responsible for practicing safe fire protocols:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-sm text-bone-muted">
            <li>Never leave burning candles, burning paper, or embers unattended.</li>
            <li>Always use certified heat-resistant, fireproof ceramic, cast iron, or metal dishes.</li>
            <li>Keep open flames clear of curtains, drafts, blankets, pets, children, and flammable items.</li>
            <li>Completely extinguish all wicks and ashes before sleeping or leaving the room.</li>
            <li>Ensure smoke detectors are active and functional in your living space.</li>
          </ul>
        </section>

        {/* 4. Herbs, Botanicals & Ingestion */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold text-bone flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-lavender-moon" />
            <span>4. Botanical and Herbal Safety</span>
          </h2>
          <p>
            Never ingest, swallow, or inhale unknown botanicals, roots, seeds, or essential oils based on anything written on this site. Many plants and concentrated essential oils are potent toxins, allergens, skin irritants, or lethal to household pets (such as cats and dogs).
          </p>
          <p>
            Always verify botanical safety with certified herbal or medical toxicological resources. If contact irritation occurs, discontinue immediately and seek medical attention.
          </p>
        </section>

        {/* 5. Traditional Lore vs Scientific Evidence */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-semibold text-bone">
            5. Traditional Lore and Symbolic Meaning
          </h2>
          <p>
            Any references to the traditional correspondences of colors, herbs, lunar phases, or symbols represent cultural folklore and historical traditions. They should not be interpreted as scientifically proven empirical claims.
          </p>
        </section>
      </div>

      {/* Footer link back */}
      <div className="pt-8 border-t border-border">
        <Link
          href="/"
          className="text-xs font-mono uppercase tracking-ceremonial text-lavender hover:text-lavender-light"
        >
          ← Return to Witchr Homepage
        </Link>
      </div>
    </article>
  );
}
