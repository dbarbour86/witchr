"use client";

import React, { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { FourPointStar, TarotCornerFlourish } from "./OrnateFrames";
import { CheckCircle2, Send } from "lucide-react";

export function EmailSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;

    // Track analytics event
    trackEvent("email_placeholder_submitted", { source: "footer_newsletter" });

    // Mark as submitted (honest notice in V1)
    setSubmitted(true);
  };

  return (
    <section
      aria-labelledby="email-signup-heading"
      className="my-20 p-8 sm:p-12 md:p-14 rounded-2xl bg-gradient-to-b from-surface-elevated via-surface to-background border border-border-ornate relative overflow-hidden shadow-card-tarot max-w-4xl mx-auto text-center"
    >
      {/* Corner Filigree */}
      <div className="absolute top-3 left-3 pointer-events-none opacity-50">
        <TarotCornerFlourish className="w-5 h-5 text-lavender-dim" />
      </div>
      <div className="absolute top-3 right-3 pointer-events-none opacity-50 rotate-90">
        <TarotCornerFlourish className="w-5 h-5 text-lavender-dim" />
      </div>
      <div className="absolute bottom-3 left-3 pointer-events-none opacity-50 -rotate-90">
        <TarotCornerFlourish className="w-5 h-5 text-lavender-dim" />
      </div>
      <div className="absolute bottom-3 right-3 pointer-events-none opacity-50 180">
        <TarotCornerFlourish className="w-5 h-5 text-lavender-dim" />
      </div>

      <div className="max-w-xl mx-auto space-y-4 relative z-10">
        {/* Wax seal emblem */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-surface border-2 border-border-ornate text-lavender-moon mx-auto shadow-glow-purple">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3.58-.5 5.07-1.38-4.22-.92-7.37-4.68-7.37-9.19 0-4.08 2.61-7.55 6.27-8.83C14.73 2.22 13.4 2 12 2z" />
          </svg>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center justify-center gap-1.5">
            <FourPointStar className="w-2.5 h-2.5" />
            <span>Occult Correspondence</span>
            <FourPointStar className="w-2.5 h-2.5" />
          </span>
          <h2
            id="email-signup-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-bone tracking-wide"
          >
            One useful ritual. Occasionally.
          </h2>
        </div>

        <p className="text-bone-muted text-sm sm:text-base leading-relaxed font-sans">
          No daily affirmations. No cosmic spam. Just a grounded practice dispatched when the world is being particularly chaotic.
        </p>

        {submitted ? (
          <div className="p-5 rounded-xl bg-surface border border-lavender/40 text-bone space-y-1.5 animate-in fade-in duration-300 shadow-glow-subtle">
            <div className="flex items-center justify-center gap-2 text-lavender-moon font-medium text-sm font-mono">
              <CheckCircle2 className="w-4 h-4" />
              <span>Email signup is coming soon.</span>
            </div>
            <p className="text-xs text-bone-dim">
              Thank you for testing. No email addresses are stored in V1.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 pt-3"
            noValidate
          >
            <div className="relative flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3.5 rounded-lg bg-background/80 border border-border-highlight text-bone placeholder-bone-dim focus:outline-none focus:border-lavender focus:ring-1 focus:ring-lavender text-sm min-h-[48px] shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-surface-elevated hover:bg-surface-hover text-lavender-light border border-border-ornate hover:border-lavender font-mono text-xs uppercase tracking-ceremonial font-semibold transition-all shadow-glow-subtle shrink-0 min-h-[48px] active:scale-[0.98]"
            >
              <span>Send me the weird stuff</span>
              <Send className="w-3.5 h-3.5 text-lavender-moon" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
