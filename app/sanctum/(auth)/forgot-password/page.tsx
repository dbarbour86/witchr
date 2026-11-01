"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { Mail, ArrowRight, AlertCircle, CheckCircle2, KeyRound } from "lucide-react";
import { FourPointStar } from "@/components/OrnateFrames";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useSanctumAuth } from "@/lib/supabase/auth-context";

function ForgotPasswordForm() {
  const { isConfigured } = useSanctumAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dispatched, setDispatched] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isConfigured) {
      setErrorMessage("Supabase is awaiting credentials in .env.local. Please complete the setup checklist.");
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setErrorMessage("Authentication client unavailable.");
      return;
    }

    setLoading(true);
    try {
      const resetRedirectUrl = `${window.location.origin}/sanctum/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: resetRedirectUrl,
      });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      setDispatched(true);
      setLoading(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to dispatch recovery email.";
      setErrorMessage(msg);
      setLoading(false);
    }
  };

  if (dispatched) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="relative rounded-2xl border border-purple-800/80 bg-[#0c031c]/95 p-6 sm:p-8 text-center shadow-[0_0_50px_rgba(147,51,234,0.3)] overflow-hidden space-y-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-950/80 border border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.35)] mx-auto">
            <CheckCircle2 className="w-7 h-7 text-purple-300" />
          </div>

          <h2 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200 tracking-wide uppercase">
            Recovery Link Dispatched
          </h2>

          <p className="text-xs sm:text-sm text-bone-muted font-sans leading-relaxed">
            If an account is associated with <span className="text-purple-200 font-semibold">{email}</span>, you will receive password reset instructions shortly.
          </p>

          <div className="pt-2">
            <Link
              href="/sanctum/login"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.16em] text-purple-400 hover:text-white transition-colors"
            >
              <span>Return to Log In</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative rounded-2xl border border-purple-800/80 bg-[#0c031c]/95 p-6 sm:p-8 shadow-[0_0_50px_rgba(147,51,234,0.3)] overflow-hidden">
        {/* Corner stars */}
        <div className="absolute top-2.5 left-2.5 text-purple-500/40 pointer-events-none">
          <FourPointStar className="w-3 h-3" />
        </div>
        <div className="absolute top-2.5 right-2.5 text-purple-500/40 pointer-events-none">
          <FourPointStar className="w-3 h-3" />
        </div>
        <div className="absolute bottom-2.5 left-2.5 text-purple-500/40 pointer-events-none">
          <FourPointStar className="w-3 h-3" />
        </div>
        <div className="absolute bottom-2.5 right-2.5 text-purple-500/40 pointer-events-none">
          <FourPointStar className="w-3 h-3" />
        </div>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-950/80 border border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.35)] mb-3">
            <KeyRound className="w-6 h-6 text-purple-300" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200 tracking-wide uppercase">
            Recover Access
          </h1>
          <p className="text-xs text-bone-muted font-sans mt-1">
            Enter your email to receive a password recovery link.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs font-sans flex items-center gap-2" role="alert">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-purple-300">
              Account Email
            </label>
            <div className="relative rounded-xl border border-purple-800/80 bg-[#130728] focus-within:border-purple-400 focus-within:ring-1 focus-within:ring-purple-400 transition-all">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-purple-400/60 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="practitioner@witchr.com"
                className="w-full pl-9 pr-3 py-2.5 bg-transparent text-sm text-bone placeholder-purple-400/30 outline-none font-sans"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 disabled:opacity-60 border border-purple-400/60 text-white text-xs font-mono uppercase tracking-[0.16em] font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer"
          >
            <span>{loading ? "Sending Link..." : "Send Recovery Link"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-purple-900/50 text-center">
          <Link
            href="/sanctum/login"
            className="text-xs font-mono uppercase tracking-[0.16em] text-purple-400 hover:text-white transition-colors"
          >
            ← Back to Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="text-xs font-mono text-purple-300">Loading recovery portal...</div>}>
      <ForgotPasswordForm />
    </Suspense>
  );
}

