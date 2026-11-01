"use client";

import React, { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface GoogleSignInButtonProps {
  safeRedirect?: string;
  disabled?: boolean;
  onError?: (message: string) => void;
  className?: string;
}

export function GoogleSignInButton({
  safeRedirect = "/sanctum/chamber",
  disabled = false,
  onError,
  className = "",
}: GoogleSignInButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    if (loading || disabled) return;

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      onError?.("Authentication client is unavailable.");
      return;
    }

    setLoading(true);

    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      
      // Preserve intended return destination in a short-lived cookie and localStorage.
      // Keeping the outgoing redirectTo clean (without query string) ensures exact string
      // matching against the Supabase redirect allowlist on both localhost and Vercel preview,
      // avoiding glob/wildcard mismatches that cause fallback to Site URL.
      if (typeof document !== "undefined") {
        const isSecure = typeof window !== "undefined" && window.location.protocol === "https:";
        document.cookie = `sanctum_oauth_redirect=${encodeURIComponent(safeRedirect)}; path=/; max-age=600; SameSite=Lax${isSecure ? "; Secure" : ""}`;
        try {
          localStorage.setItem("witchr_sanctum_oauth_redirect", safeRedirect);
        } catch {}
      }

      const callbackUrl = `${origin}/auth/callback`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callbackUrl,
          // Request only standard basic sign-in scopes (no Gmail, Drive, or additional permissions)
          scopes: "openid email profile",
          queryParams: {
            access_type: "offline",
            prompt: "select_account",
          },
        },
      });

      if (error) {
        setLoading(false);
        onError?.(error.message);
      }
      // If successful, Supabase navigates the browser to Google OAuth consent screen.
    } catch (err: unknown) {
      setLoading(false);
      const msg = err instanceof Error ? err.message : "Failed to initiate Google sign-in.";
      onError?.(msg);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={disabled || loading}
      aria-label="Continue with Google"
      className={`w-full relative flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-[#130728] hover:bg-[#1a0a38] disabled:opacity-60 disabled:cursor-not-allowed border border-purple-800/80 hover:border-purple-400/80 text-bone text-sm font-sans font-medium transition-all shadow-[0_0_15px_rgba(147,51,234,0.15)] hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] cursor-pointer group select-none min-h-[44px] ${className}`}
    >
      {/* Official Google 4-Color 'G' Logo */}
      <svg
        className="w-5 h-5 shrink-0 transition-transform group-hover:scale-105"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="#4285F4"
          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
        />
        <path
          fill="#FBBC05"
          d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
        />
        <path
          fill="#EA4335"
          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
        />
      </svg>

      <span className="text-sm font-sans tracking-normal font-medium text-bone">
        {loading ? "Connecting to Google..." : "Continue with Google"}
      </span>
    </button>
  );
}
