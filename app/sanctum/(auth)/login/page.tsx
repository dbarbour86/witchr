"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Flame, Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";
import { FourPointStar } from "@/components/OrnateFrames";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useSanctumAuth } from "@/lib/supabase/auth-context";
import { GoogleSignInButton } from "@/components/sanctum/GoogleSignInButton";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get("redirect");
  const reason = searchParams.get("reason");
  const queryError = searchParams.get("error");
  const queryErrorDescription = searchParams.get("error_description");

  const safeRedirect =
    rawRedirect && rawRedirect.startsWith("/sanctum") && !rawRedirect.startsWith("//") && !rawRedirect.includes(":")
      ? rawRedirect
      : "/sanctum/chamber";

  const { isConfigured, user, refreshAuth } = useSanctumAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Set initial error from query parameter if present (e.g. cancelled Google OAuth)
  React.useEffect(() => {
    if (queryError) {
      if (queryError === "access_denied") {
        setErrorMessage("Google sign-in was cancelled.");
      } else if (queryError === "setup_required") {
        setErrorMessage("Supabase is awaiting credentials. Please complete the setup checklist.");
      } else if (
        queryError === "code_exchange_failed" ||
        queryError === "otp_verification_failed" ||
        queryError === "auth_callback_failed"
      ) {
        setErrorMessage(queryErrorDescription || "Authentication verification failed or link has expired. Please try again.");
      } else {
        setErrorMessage(queryErrorDescription || `Sign-in notice: ${queryError}`);
      }
    }
  }, [queryError, queryErrorDescription]);

  // If already logged in, redirect to destination via full navigation to clear any stale prefetch cache
  React.useEffect(() => {
    if (user) {
      window.location.href = safeRedirect;
    }
  }, [user, safeRedirect]);

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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        await refreshAuth();
        // Full navigation purges Next.js in-memory prefetch cache and ensures
        // the newly written session cookies are immediately sent to middleware/SSR
        window.location.href = safeRedirect;
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred during login.";
      setErrorMessage(msg);
      setLoading(false);
    }
  };

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

        {/* Header Icon */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-950/80 border border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.35)] mb-3">
            <Flame className="w-6 h-6 text-purple-300 fill-purple-400/40" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200 tracking-wide uppercase">
            Enter the Sanctum
          </h1>
          <p className="text-xs text-bone-muted font-sans mt-1">
            Log in to continue your consultation and practice.
          </p>
        </div>

        {/* Setup Notice when credentials are not yet added */}
        {!isConfigured && (
          <div className="mb-5 p-3.5 rounded-xl bg-purple-950/60 border border-purple-600/50 text-xs text-purple-200 font-sans space-y-1.5">
            <div className="flex items-center gap-2 font-mono uppercase tracking-wider text-[11px] text-purple-300 font-semibold">
              <AlertCircle className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Supabase Setup Required</span>
            </div>
            <p className="leading-relaxed text-purple-300/80">
              The authentication system is implemented and awaiting project keys in <code className="text-white font-mono">.env.local</code>. Please follow the checklist to connect your Supabase project.
            </p>
          </div>
        )}

        {/* Reason banner */}
        {reason === "preview_exhausted" && (
          <div className="mb-5 p-3 rounded-xl bg-purple-950/70 border border-purple-500/60 text-xs text-purple-200 font-sans flex items-center gap-2">
            <Flame className="w-4 h-4 text-purple-400 shrink-0" />
            <span>You have enjoyed your guest consultation. Log in to keep speaking with the Oracle.</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs font-sans flex items-center gap-2" role="alert">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Google OAuth Sign-In */}
        <div className="mb-5 space-y-4">
          <GoogleSignInButton
            safeRedirect={safeRedirect}
            disabled={!isConfigured || loading}
            onError={(msg) => setErrorMessage(msg)}
          />

          <div className="relative flex items-center justify-center my-4">
            <div className="w-full border-t border-purple-900/60" />
            <span className="absolute bg-[#0c031c] px-3 text-[10px] font-mono tracking-widest text-purple-400/70 uppercase">
              or continue with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-purple-300">
              Email Address
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

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-purple-300">
                Password
              </label>
              <Link
                href="/sanctum/forgot-password"
                className="text-[10px] font-mono uppercase tracking-wider text-purple-400/80 hover:text-purple-200 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative rounded-xl border border-purple-800/80 bg-[#130728] focus-within:border-purple-400 focus-within:ring-1 focus-within:ring-purple-400 transition-all">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-purple-400/60 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-transparent text-sm text-bone placeholder-purple-400/30 outline-none font-sans"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400/60 hover:text-purple-200 focus:outline-none focus:text-purple-200 transition-colors cursor-pointer p-0.5"
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 disabled:opacity-60 border border-purple-400/60 text-white text-xs font-mono uppercase tracking-[0.16em] font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer"
          >
            <span>{loading ? "Verifying..." : "Log In"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-purple-900/50 text-center space-y-2">
          <p className="text-xs text-bone-muted font-sans">
            Do not have an account yet?{" "}
            <Link
              href={`/sanctum/signup?redirect=${encodeURIComponent(safeRedirect)}`}
              className="text-purple-300 hover:text-white font-semibold underline underline-offset-2 transition-colors"
            >
              Create an account
            </Link>
          </p>

          <p className="text-[11px] font-mono text-purple-400/60 pt-1">
            Your inquiry and answers will remain intact upon signing in.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-xs font-mono text-purple-300">Loading Sanctum portal...</div>}>
      <LoginForm />
    </Suspense>
  );
}
