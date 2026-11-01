"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { OracleFigure } from "@/components/sanctum/OracleFigure";
import { FourPointStar } from "@/components/OrnateFrames";
import {
  Sparkles,
  Send,
  RotateCcw,
  Copy,
  Check,
  Compass,
  Wand2,
  BookOpen,
  ArrowRight,
  Shield,
  Layers,
  Flame,
} from "lucide-react";
import type { OracleChatMessage, OracleSuggestedAction, OracleConversationOutput } from "@/lib/sanctum/oracle/types";
import { ORACLE_PENDING_INQUIRY_KEY } from "@/lib/sanctum/oracle/types";
import { recordSanctumTestEvent } from "@/lib/sanctum/test-events";
import { useSanctumAuth } from "@/lib/supabase/auth-context";
import { SanctumAuthInvitationCard } from "@/components/sanctum/SanctumAuthInvitationCard";
import { getAccountScopedKey, SANCTUM_BASE_KEYS } from "@/lib/sanctum/account-storage";

const ORACLE_CHAT_STORAGE_KEY = "witchr_sanctum_oracle_chat";
const MAX_MESSAGE_LENGTH = 280;
const MAX_HISTORY_MESSAGES = 10;

const STARTER_CHIPS = [
  "I feel stuck",
  "I need clarity",
  "Something feels off",
  "Help me understand a situation",
  "Help me choose a ritual",
  "Pull a card with me",
];

interface ChatEntry extends OracleChatMessage {
  id: string;
  timestamp: string;
  reflectionQuestion?: string;
  suggestedAction?: OracleSuggestedAction | null;
}

const INITIAL_ORACLE_MESSAGE: ChatEntry = {
  id: "initial-oracle-greeting",
  role: "oracle",
  content:
    "What brings you here? Whether you carry acute friction, seek clarity for an unexamined choice, or wish to explore a ritual working with your physical tools, speak freely.",
  timestamp: new Date().toISOString(),
  reflectionQuestion: "What is the single most honest sentence that describes where your energy is focused today?",
};

/**
 * Trims dialogue history to at most maxMessages while strictly preserving complete
 * question/answer pairs. Orphaned answers (where the user question was sliced away)
 * are pruned so the conversation history always remains coherent.
 */
export function trimDialoguePreservingPairs(
  history: ChatEntry[],
  maxMessages: number = MAX_HISTORY_MESSAGES
): ChatEntry[] {
  if (history.length <= maxMessages) {
    return history;
  }

  let sliced = history.slice(-maxMessages);

  // If the first message in the slice is an orphaned Oracle response (not the initial greeting),
  // drop it so the conversation begins with a complete User question.
  while (
    sliced.length > 0 &&
    sliced[0].role === "oracle" &&
    sliced[0].id !== "initial-oracle-greeting"
  ) {
    sliced = sliced.slice(1);
  }

  if (sliced.length === 0 && history.length > 0) {
    return [history[history.length - 1]];
  }

  return sliced;
}

export function OracleChatClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q");

  const { user, isLoading: authLoading, canAskGuestQuestion, refreshAuth } = useSanctumAuth();
  const chatStorageKey = getAccountScopedKey(SANCTUM_BASE_KEYS.ORACLE_CHAT, user?.id);

  const [messages, setMessages] = useState<ChatEntry[]>([INITIAL_ORACLE_MESSAGE]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [guestLimitReached, setGuestLimitReached] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const initializedRef = useRef(false);
  const lastUserIdRef = useRef<string | null | undefined>(undefined);
  const pendingProcessedRef = useRef<string | null>(null);

  // Unified Chat Initialization & Entrance Handoff
  useEffect(() => {
    // 1. Wait until authentication state has definitively resolved
    if (authLoading) return;

    setMounted(true);

    const currentUserId = user?.id || null;
    const currentStorageKey = getAccountScopedKey(SANCTUM_BASE_KEYS.ORACLE_CHAT, currentUserId);

    // 2. Handle subsequent account switch (e.g. login or logout while on this page)
    if (initializedRef.current && lastUserIdRef.current !== currentUserId) {
      lastUserIdRef.current = currentUserId;
      try {
        const stored = localStorage.getItem(currentStorageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
            return;
          }
        }
      } catch {}
      setMessages([INITIAL_ORACLE_MESSAGE]);
      return;
    }

    lastUserIdRef.current = currentUserId;

    // Only run entrance handoff / initial load once
    if (initializedRef.current) return;
    initializedRef.current = true;

    // 3. Load existing history from account-scoped storage
    let loadedMessages: ChatEntry[] = [INITIAL_ORACLE_MESSAGE];
    try {
      const stored = localStorage.getItem(currentStorageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          loadedMessages = parsed;
        }
      }
    } catch {
      // Fallback to initial greeting
    }

    // 4. Consume pending inquiry from sessionStorage or URL query parameter
    let pendingInquiry: string | null = null;
    try {
      pendingInquiry = sessionStorage.getItem(ORACLE_PENDING_INQUIRY_KEY);
      if (pendingInquiry) {
        sessionStorage.removeItem(ORACLE_PENDING_INQUIRY_KEY);
      }
    } catch {
      // Storage quota or private mode fallback
    }

    if (!pendingInquiry && initialQuery && initialQuery.trim().length > 0) {
      pendingInquiry = initialQuery.trim();
    }

    // Clean address bar immediately if a query parameter was present to prevent reload re-triggering
    if (initialQuery) {
      router.replace("/sanctum/oracle");
    }

    // 5. If there is a pending inquiry from the chamber, dispatch it exactly once
    if (pendingInquiry && pendingInquiry.trim().length > 0) {
      const query = pendingInquiry.trim().slice(0, MAX_MESSAGE_LENGTH);

      // Duplicate prevention: check whether this question is already the last user question in history
      const lastEntry = loadedMessages[loadedMessages.length - 1];
      const secondLastEntry = loadedMessages[loadedMessages.length - 2];
      const isDuplicate =
        (lastEntry?.role === "user" && lastEntry.content === query) ||
        (secondLastEntry?.role === "user" && secondLastEntry.content === query);

      if (!isDuplicate && pendingProcessedRef.current !== query) {
        pendingProcessedRef.current = query;
        handleSendMessage(query, loadedMessages, currentStorageKey);
        return;
      }
    }

    // No pending inquiry (or duplicate prevented) -> display loaded messages
    setMessages(loadedMessages);
  }, [authLoading, user?.id, initialQuery, router]);

  // Save to localStorage whenever messages change (bounded and pair-trimmed)
  useEffect(() => {
    if (!mounted || !initializedRef.current) return;
    try {
      const bounded = trimDialoguePreservingPairs(messages, MAX_HISTORY_MESSAGES);
      localStorage.setItem(chatStorageKey, JSON.stringify(bounded));
    } catch {
      // Storage quota or private mode fallback
    }
  }, [messages, chatStorageKey, mounted]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, guestLimitReached]);

  const handleSendMessage = async (
    textToSend?: string,
    baseMessages?: ChatEntry[],
    storageKeyOverride?: string
  ) => {
    const content = (textToSend || inputText).trim();
    if (!content || isLoading) return;

    const targetStorageKey = storageKeyOverride || chatStorageKey;

    const userMessageId = `user-${Date.now()}`;
    const userMessage: ChatEntry = {
      id: userMessageId,
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    recordSanctumTestEvent("oracle_consulted", content);

    // Build the updated history array with the user message immediately appended
    const activeMessages = baseMessages || messages;
    const nextMessages = trimDialoguePreservingPairs(
      [...activeMessages, userMessage],
      MAX_HISTORY_MESSAGES
    );

    // Display the user's question immediately and persist synchronously
    setMessages(nextMessages);
    try {
      localStorage.setItem(targetStorageKey, JSON.stringify(nextMessages));
    } catch {}

    setInputText("");
    setIsLoading(true);

    try {
      // Prepare history payload for API (up to last 10 prior messages before current inquiry)
      const historyPayload: OracleChatMessage[] = activeMessages
        .slice(-MAX_HISTORY_MESSAGES)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/sanctum/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "conversation",
          payload: {
            message: content,
            history: historyPayload,
          },
        }),
      });

      if (res.status === 403) {
        // Guest limit reached: preserve the submitted text in inputText
        setInputText(content);

        // Remove the unanswered userMessage from chat view so an orphaned question does not linger
        setMessages((prev) => {
          const reverted = prev.filter((m) => m.id !== userMessageId);
          try {
            localStorage.setItem(targetStorageKey, JSON.stringify(reverted));
          } catch {}
          return reverted;
        });

        setGuestLimitReached(true);
        refreshAuth();
        return;
      }

      if (!res.ok) {
        throw new Error(`Oracle server response: ${res.status}`);
      }

      const json = await res.json();
      const output: OracleConversationOutput = json.data;

      const oracleMessageId = `oracle-${Date.now()}`;
      const oracleMessage: ChatEntry = {
        id: oracleMessageId,
        role: "oracle",
        content: output.reply,
        reflectionQuestion: output.reflectionQuestion,
        suggestedAction: output.suggestedAction,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => {
        // Enforce pair integrity: ensure userMessage is present in prev directly before oracleMessage
        const hasUserMessage = prev.some(
          (m) => m.id === userMessageId || (m.role === "user" && m.content === content)
        );
        const base = hasUserMessage ? prev : [...prev, userMessage];
        const updated = trimDialoguePreservingPairs([...base, oracleMessage], MAX_HISTORY_MESSAGES);
        try {
          localStorage.setItem(targetStorageKey, JSON.stringify(updated));
        } catch {}
        return updated;
      });

      refreshAuth();
    } catch (err) {
      console.error("[Oracle Chat] Consultation error:", err);

      // Deterministic client fallback if network fails
      const fallbackEntry: ChatEntry = {
        id: `oracle-fallback-${Date.now()}`,
        role: "oracle",
        content:
          "The ambient currents in the chamber waver, yet the core inquiry remains clear: every friction you face is diagnostic. When noise crowds out intuition, return your attention to your physical body, breathe, and name what is immediately within your sovereignty.",
        reflectionQuestion: "What is one concrete reality you can control in this exact hour?",
        suggestedAction: {
          label: "Draw Today's Card",
          href: "/sanctum/tarot",
          type: "tarot",
        },
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => {
        const hasUserMessage = prev.some(
          (m) => m.id === userMessageId || (m.role === "user" && m.content === content)
        );
        const base = hasUserMessage ? prev : [...prev, userMessage];
        const updated = trimDialoguePreservingPairs([...base, fallbackEntry], MAX_HISTORY_MESSAGES);
        try {
          localStorage.setItem(targetStorageKey, JSON.stringify(updated));
        } catch {}
        return updated;
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleClearConversation = () => {
    localStorage.removeItem(chatStorageKey);
    setMessages([INITIAL_ORACLE_MESSAGE]);
    setInputText("");
    setGuestLimitReached(false);
  };

  const handleCopyMessage = async (entry: ChatEntry) => {
    const textToCopy = [
      entry.content,
      entry.reflectionQuestion ? `\nReflection: ${entry.reflectionQuestion}` : "",
      entry.suggestedAction ? `\nSuggested Action: ${entry.suggestedAction.label} (${entry.suggestedAction.href})` : "",
    ].join("");

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedId(entry.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // noop
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Determine if guest user has consumed their 1 preview question
  const isGuest = !user;
  const userMessagesCount = messages.filter((m) => m.role === "user").length;
  const shouldShowGuestInvitation =
    isGuest &&
    !isLoading &&
    (guestLimitReached || !canAskGuestQuestion || userMessagesCount >= 1);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 py-2 sm:py-4">
      {/* Top Chamber Header & Oracle Persona Strip */}
      <div className="sanctum-panel sanctum-corners p-5 sm:p-7 border border-purple-900/60 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <OracleFigure size="sm" className="shrink-0 shadow-[0_0_20px_rgba(168,85,247,0.3)]" />
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-[#130728] border border-purple-800/60 text-purple-300 text-[10px] font-mono uppercase tracking-[0.2em]">
              <FourPointStar className="w-2.5 h-2.5 text-purple-400" />
              <span>Sanctum Chamber // The Conversational Oracle</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200 tracking-wide uppercase">
              The Oracle’s Counsel
            </h1>
            <p className="text-xs sm:text-sm text-bone-muted font-sans max-w-xl leading-relaxed">
              Consult the Oracle to ask questions, explore circumstances, and unpack dilemmas through psychological reflection.
              To turn an intention and available physical ingredients directly into ritual steps, use{" "}
              <Link href="/sanctum/working" className="text-purple-300 underline underline-offset-2 hover:text-white">
                Create a Ritual
              </Link>.
            </p>
          </div>
        </div>

        {/* Action Controls: Hub link & Clear Chat */}
        <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
          <Link
            href="/sanctum/hub"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-purple-900/60 hover:border-purple-500/60 text-purple-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Workstation Hub</span>
          </Link>

          <button
            type="button"
            onClick={handleClearConversation}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-elevated border border-border-subtle hover:border-purple-800 text-bone-dim hover:text-bone text-xs font-mono uppercase tracking-wider transition-colors"
            title="Reset conversation history for this browser session"
          >
            <RotateCcw className="w-3 h-3 text-purple-400" />
            <span>Clear Dialogue</span>
          </button>
        </div>
      </div>

      {/* Main Conversation Chamber */}
      <div className="sanctum-panel sanctum-corners p-4 sm:p-7 border border-purple-900/60 min-h-[460px] flex flex-col justify-between space-y-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Messages Stream */}
        <div className="space-y-5 overflow-y-auto max-h-[580px] pr-1 sm:pr-2" role="log" aria-live="polite">
          {messages.map((entry) => {
            const isUser = entry.role === "user";
            return (
              <div
                key={entry.id}
                className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-2`}
              >
                {/* Speaker Identity Pill */}
                <div className="flex items-center gap-2 px-1 text-[10px] font-mono uppercase tracking-widest text-purple-300/70">
                  {isUser ? (
                    <span>Practitioner</span>
                  ) : (
                    <span className="flex items-center gap-1 text-purple-300">
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      <span>The Oracle</span>
                    </span>
                  )}
                </div>

                {/* Message Body Box */}
                <div
                  className={`max-w-2xl p-4 sm:p-5 rounded-xl border text-sm sm:text-base leading-relaxed ${
                    isUser
                      ? "bg-[#140628] border-purple-700/60 text-purple-100 shadow-[0_0_15px_rgba(147,51,234,0.15)] rounded-tr-none font-sans"
                      : "bg-[#090314]/95 border-purple-900/60 text-bone shadow-[0_0_20px_rgba(88,28,135,0.2)] rounded-tl-none font-sans space-y-3.5"
                  }`}
                >
                  <p className={`font-sans leading-relaxed whitespace-pre-wrap ${isUser ? "text-purple-100" : "text-bone"}`}>
                    {entry.content}
                  </p>

                  {/* Reflection Question Highlight Box */}
                  {!isUser && entry.reflectionQuestion && (
                    <div className="p-3.5 rounded-lg bg-[#110522] border-l-2 border-purple-400 border-t border-r border-b border-purple-900/50 text-xs sm:text-sm text-bone font-sans space-y-1">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-purple-300 font-semibold block">
                        Reflection Inquest
                      </span>
                      <span className="leading-relaxed text-purple-100 block">“{entry.reflectionQuestion}”</span>
                    </div>
                  )}

                  {/* Suggested Sanctum Action Link */}
                  {!isUser && entry.suggestedAction && (() => {
                    let actionHref = entry.suggestedAction.href;
                    if (entry.suggestedAction.type === "working" || actionHref.startsWith("/sanctum/working")) {
                      const relevantUserMsg = [...messages.slice(0, messages.findIndex((m) => m.id === entry.id) + 1)]
                        .reverse()
                        .find((m) => m.role === "user")?.content;
                      if (relevantUserMsg && relevantUserMsg.trim().length > 0) {
                        const cleanIntention = relevantUserMsg.trim();
                        actionHref = `/sanctum/working?intention=${encodeURIComponent(cleanIntention)}`;
                      }
                    }

                    return (
                      <div className="pt-2 flex items-center justify-between gap-3 border-t border-purple-900/40">
                        <Link
                          href={actionHref}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-purple-950/70 hover:bg-purple-900/90 border border-purple-500/60 text-purple-200 hover:text-white text-xs font-mono uppercase tracking-wider transition-all shadow-sm group"
                        >
                          {entry.suggestedAction.type === "tarot" && <Sparkles className="w-3.5 h-3.5 text-purple-400" />}
                          {entry.suggestedAction.type === "spread" && <Compass className="w-3.5 h-3.5 text-purple-400" />}
                          {entry.suggestedAction.type === "working" && <Wand2 className="w-3.5 h-3.5 text-purple-400" />}
                          {entry.suggestedAction.type === "grimoire" && <BookOpen className="w-3.5 h-3.5 text-purple-400" />}
                          <span>{entry.suggestedAction.label}</span>
                          <ArrowRight className="w-3 h-3 text-purple-400 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        {/* Copy Action */}
                        <button
                          type="button"
                          onClick={() => handleCopyMessage(entry)}
                          className="text-purple-400/60 hover:text-purple-300 text-[11px] font-mono flex items-center gap-1 transition-colors"
                          title="Copy reflection to clipboard"
                        >
                          {copiedId === entry.id ? (
                            <>
                              <Check className="w-3 h-3 text-purple-300" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span className="hidden sm:inline">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex flex-col items-start space-y-2 animate-pulse">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-purple-300">
                <Sparkles className="w-3 h-3 text-purple-400 animate-spin" />
                <span>The Oracle is listening...</span>
              </div>
              <div className="p-4 rounded-xl rounded-tl-none bg-[#090314] border border-purple-800/50 text-xs font-mono text-purple-300/80 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                <span>Weaving correspondence into grounded reflection...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Guest Preview Invitation Card OR Follow-up Composer */}
        {shouldShowGuestInvitation ? (
          <SanctumAuthInvitationCard redirectPath="/sanctum/oracle" className="mt-2" />
        ) : (
          <>
            {/* Starter Suggestion Chips */}
            <div className="pt-3 border-t border-purple-900/35 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-purple-300/60">
                <span>Inquiry Starters</span>
                <span className="hidden sm:inline">Tap to consult</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {STARTER_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => handleSendMessage(chip)}
                    disabled={isLoading}
                    className="px-2.5 py-1 rounded-md bg-[#100624] hover:bg-purple-950/80 border border-purple-900/60 hover:border-purple-500/70 text-purple-200 text-xs font-sans transition-colors disabled:opacity-50"
                  >
                    “{chip}”
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar & Controls */}
            <div className="space-y-2 pt-2">
              {/* Disclosure for Guests */}
              {isGuest && (
                <div className="flex items-center gap-1.5 px-1 text-[11px] font-mono text-purple-300/80 uppercase tracking-widest">
                  <Flame className="w-3 h-3 text-purple-400" />
                  <span>Ask one question before joining.</span>
                </div>
              )}

              <div className="relative rounded-xl border border-purple-800/70 bg-[#0d041e] focus-within:border-purple-400 focus-within:ring-1 focus-within:ring-purple-400 transition-all p-2 sm:p-3">
                <textarea
                  ref={inputRef}
                  rows={2}
                  maxLength={MAX_MESSAGE_LENGTH}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  placeholder="Speak to the Oracle... (e.g. 'I feel pulled between two paths', 'What corresponds with courage?')"
                  className="w-full bg-transparent text-sm sm:text-base text-bone placeholder-purple-300/40 resize-none outline-none font-sans leading-relaxed"
                  aria-label="Message to the Oracle"
                />

                <div className="flex items-center justify-between gap-3 pt-2 border-t border-purple-900/30">
                  <span className="text-[10px] font-mono text-purple-400/60">
                    {inputText.length}/{MAX_MESSAGE_LENGTH}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!inputText.trim() || isLoading}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-600 disabled:bg-purple-950/60 border border-purple-400/60 disabled:border-purple-900/40 text-white disabled:text-purple-400/40 text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-[0_0_12px_rgba(168,85,247,0.3)] disabled:shadow-none"
                  >
                    <span>Consult</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Privacy Footnote */}
              <div className="flex items-center justify-between text-[10px] font-mono text-purple-400/60 px-1">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-purple-400" />
                  <span>
                    {user
                      ? "Account-scoped session. Last 10 messages kept locally in this browser."
                      : "Anonymous guest session. Last 10 messages kept locally in this browser."}
                  </span>
                </span>
                <span className="hidden sm:inline">Press Enter to send</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
