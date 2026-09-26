"use client";

import React, { useState, useEffect, useCallback } from "react";
import { SanctumBadge } from "@/lib/sanctum/progression";
import { FourPointStar, TarotCornerFlourish } from "@/components/OrnateFrames";
import { X, Sparkles } from "lucide-react";

interface ToastItem {
  key: string;
  badge: SanctumBadge;
}

export function SanctumBadgeToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((key: string) => {
    setToasts((prev) => prev.filter((t) => t.key !== key));
  }, []);

  useEffect(() => {
    const handleBadgeUnlocked = (e: Event) => {
      const customEvent = e as CustomEvent<SanctumBadge>;
      const badge = customEvent.detail;
      if (!badge) return;

      const key = `${badge.id}_${Date.now()}`;
      setToasts((prev) => [...prev, { key, badge }]);

      // Auto-dismiss after 5.5 seconds
      setTimeout(() => {
        removeToast(key);
      }, 5500);
    };

    window.addEventListener("sanctum:badge-unlocked", handleBadgeUnlocked);
    return () => {
      window.removeEventListener("sanctum:badge-unlocked", handleBadgeUnlocked);
    };
  }, [removeToast]);

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4 sm:px-0"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map(({ key, badge }) => (
        <div
          key={key}
          className="pointer-events-auto relative p-4 rounded-xl bg-surface-elevated/95 border border-border-ornate shadow-glow-purple backdrop-blur-md animate-in fade-in slide-in-from-top-3 duration-300 motion-reduce:animate-none"
        >
          {/* Subtle occult corner accents */}
          <div className="absolute top-1.5 left-1.5 pointer-events-none opacity-40">
            <TarotCornerFlourish className="w-2.5 h-2.5 text-lavender-moon" />
          </div>
          <div className="absolute top-1.5 right-1.5 pointer-events-none opacity-40 rotate-90">
            <TarotCornerFlourish className="w-2.5 h-2.5 text-lavender-moon" />
          </div>

          <div className="flex items-start gap-3">
            {/* Occult Mark Icon */}
            <div className="w-9 h-9 rounded-lg bg-surface border border-border-highlight flex items-center justify-center shrink-0 text-lavender-moon shadow-subtle">
              <Sparkles className="w-4 h-4 animate-pulse motion-reduce:animate-none" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-ceremonial text-lavender-moon font-semibold">
                <FourPointStar className="w-2 h-2" />
                <span>Mark Earned</span>
              </div>
              <h4 className="font-display text-sm font-bold text-bone tracking-wide mt-0.5">
                {badge.name}
              </h4>
              <p className="text-xs text-bone-muted font-serif italic mt-0.5 leading-relaxed">
                “{badge.description}”
              </p>
            </div>

            {/* Dismiss Button */}
            <button
              type="button"
              onClick={() => removeToast(key)}
              className="p-1 rounded-md text-bone-dim hover:text-bone hover:bg-surface border border-transparent hover:border-border-subtle transition-colors shrink-0 cursor-pointer"
              aria-label="Dismiss mark notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
