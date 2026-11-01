"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { FourPointStar } from "@/components/OrnateFrames";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters in length.");
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setErrorMessage("Authentication client unavailable.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        window.location.href = "/sanctum/chamber";
      }, 2000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update password.";
      setErrorMessage(msg);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="relative rounded-2xl border border-purple-800/80 bg-[#0c031c]/95 p-6 sm:p-8 text-center shadow-[0_0_50px_rgba(147,51,234,0.3)] overflow-hidden space-y-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-950/80 border border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.35)] mx-auto">
            <CheckCircle2 className="w-7 h-7 text-purple-300" />
          </div>

          <h2 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200 tracking-wide uppercase">
            Password Updated
          </h2>

          <p className="text-xs sm:text-sm text-bone-muted font-sans leading-relaxed">
            Your credentials have been securely updated. Transporting you into the Sanctum...
          </p>
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
          <h1 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200 tracking-wide uppercase">
            New Password
          </h1>
          <p className="text-xs text-bone-muted font-sans mt-1">
            Choose a new secure password for your Sanctum account.
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
              New Password
            </label>
            <div className="relative rounded-xl border border-purple-800/80 bg-[#130728] focus-within:border-purple-400 focus-within:ring-1 focus-within:ring-purple-400 transition-all">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-purple-400/60 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
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

          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-purple-300">
              Confirm New Password
            </label>
            <div className="relative rounded-xl border border-purple-800/80 bg-[#130728] focus-within:border-purple-400 focus-within:ring-1 focus-within:ring-purple-400 transition-all">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-purple-400/60 pointer-events-none" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                className="w-full pl-9 pr-10 py-2.5 bg-transparent text-sm text-bone placeholder-purple-400/30 outline-none font-sans"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400/60 hover:text-purple-200 focus:outline-none focus:text-purple-200 transition-colors cursor-pointer p-0.5"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                title={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 disabled:opacity-60 border border-purple-400/60 text-white text-xs font-mono uppercase tracking-[0.16em] font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer"
          >
            <span>{loading ? "Updating..." : "Update Password"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-xs font-mono text-purple-300">Loading reset portal...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

