"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { User, AuthChangeEvent, Session } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "./client";
import { isSupabaseConfigured } from "./config";
import {
  setActiveSanctumUserId,
  carryOverGuestDialogueToAccount,
} from "@/lib/sanctum/account-storage";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isConfigured: boolean;
  guestQuestionsRemaining: number;
  canAskGuestQuestion: boolean;
  refreshAuth: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  isConfigured: false,
  guestQuestionsRemaining: 1,
  canAskGuestQuestion: true,
  refreshAuth: async () => {},
  signOut: async () => {},
});

export function SanctumAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [guestQuestionsRemaining, setGuestQuestionsRemaining] = useState(1);
  const [canAskGuestQuestion, setCanAskGuestQuestion] = useState(true);
  const configured = isSupabaseConfigured();

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/sanctum/auth/status", {
        method: "GET",
        headers: { "Cache-Control": "no-store" },
      });
      if (res.ok) {
        const data = await res.json();
        setGuestQuestionsRemaining(data.questionsRemaining ?? 1);
        setCanAskGuestQuestion(Boolean(data.canAskQuestion));
      }
    } catch {
      // Fallback
    }
  }, []);

  const refreshAuth = useCallback(async () => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setUser(null);
      await fetchStatus();
      setIsLoading(false);
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setActiveSanctumUserId(currentUser ? currentUser.id : null);
      if (currentUser) {
        carryOverGuestDialogueToAccount(currentUser.id);
      }
      await fetchStatus();
    } catch {
      setUser(null);
      setActiveSanctumUserId(null);
    } finally {
      setIsLoading(false);
    }
  }, [fetchStatus]);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    refreshAuth();

    if (!supabase) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event: AuthChangeEvent, session: Session | null) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setActiveSanctumUserId(currentUser ? currentUser.id : null);
      if (currentUser) {
        carryOverGuestDialogueToAccount(currentUser.id);
      }
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("sanctum:grimoire-updated"));
        window.dispatchEvent(new CustomEvent("sanctum:progression-updated"));
      }
      await fetchStatus();
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [refreshAuth, fetchStatus]);

  const signOut = useCallback(async () => {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setActiveSanctumUserId(null);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("sanctum:grimoire-updated"));
      window.dispatchEvent(new CustomEvent("sanctum:progression-updated"));
      window.dispatchEvent(new CustomEvent("sanctum:progress-updated"));
    }
    await fetchStatus();
    window.location.href = "/sanctum/chamber";
  }, [fetchStatus]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isConfigured: configured,
        guestQuestionsRemaining,
        canAskGuestQuestion,
        refreshAuth,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useSanctumAuth() {
  return useContext(AuthContext);
}
