"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { OracleFigure } from "@/components/sanctum/OracleFigure";
import { FourPointStar, TarotCornerFlourish } from "@/components/OrnateFrames";
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
  Info,
} from "lucide-react";
import type { OracleChatMessage, OracleSuggestedAction, OracleConversationOutput } from "@/lib/sanctum/oracle/types";
import { recordSanctumTestEvent } from "@/lib/sanctum/test-events";

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

export function OracleChatClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q");

  const [messages, setMessages] = useState<ChatEntry[]>([INITIAL_ORACLE_MESSAGE]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load chat history from localStorage safely
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(ORACLE_CHAT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch {
      // Fallback to initial greeting
    }
  }, []);

  // Save to localStorage whenever messages change (bounded to 10)
  useEffect(() => {
    if (!mounted) return;
    try {
      const bounded = messages.slice(-MAX_HISTORY_MESSAGES);
      localStorage.setItem(ORACLE_CHAT_STORAGE_KEY, JSON.stringify(bounded));
    } catch {
      // Storage quota or private mode fallback
    }
  }, [messages, mounted]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle incoming query parameter from entrance
  useEffect(() => {
    if (initialQuery && initialQuery.trim().length > 0 && mounted) {
      const query = initialQuery.trim().slice(0, MAX_MESSAGE_LENGTH);
      // Only auto-send if not already the last message
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage || lastMessage.content !== query) {
        handleSendMessage(query);
      }
    }
  }, [initialQuery, mounted]);

  const handleSendMessage = async (textToSend?: string) => {
    const content = (textToSend || inputText).trim();
    if (!content || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const userMessage: ChatEntry = {
      id: userMessageId,
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    recordSanctumTestEvent("oracle_consulted", content);

    const nextMessages = [...messages, userMessage].slice(-MAX_HISTORY_MESSAGES);
    setMessages(nextMessages);
    setInputText("");
    setIsLoading(true);

    try {
      // Prepare history payload for API
      const historyPayload: OracleChatMessage[] = nextMessages
        .slice(-6)
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

      setMessages((prev) => [...prev, oracleMessage].slice(-MAX_HISTORY_MESSAGES));
    } catch {
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
      setMessages((prev) => [...prev, fallbackEntry].slice(-MAX_HISTORY_MESSAGES));
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleClearConversation = () => {
    localStorage.removeItem(ORACLE_CHAT_STORAGE_KEY);
    setMessages([INITIAL_ORACLE_MESSAGE]);
    setInputText("");
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
              Speak with the Oracle for grounded self-inquiry, correspondence analysis, and ritual guidance.
              The Oracle offers psychological reflection, not supernatural prophecy or guaranteed outcomes.
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
                      ? "bg-[#140628] border-purple-700/60 text-purple-100 shadow-[0_0_15px_rgba(147,51,234,0.15)] rounded-tr-none"
                      : "bg-[#090314]/90 border-purple-900/60 text-bone-dim shadow-[0_0_20px_rgba(88,28,135,0.2)] rounded-tl-none space-y-3.5"
                  }`}
                >
                  <p className="font-serif whitespace-pre-wrap">{entry.content}</p>

                  {/* Reflection Question Highlight Box */}
                  {!isUser && entry.reflectionQuestion && (
                    <div className="p-3 rounded-lg bg-[#110522] border-l-2 border-purple-400 border-t border-r border-b border-purple-900/40 text-xs sm:text-sm text-purple-200 font-sans italic space-y-1">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-purple-300/80 not-italic block">
                        Reflection Inquest:
                      </span>
                      <span>“{entry.reflectionQuestion}”</span>
                    </div>
                  )}

                  {/* Suggested Sanctum Action Link */}
                  {!isUser && entry.suggestedAction && (
                    <div className="pt-2 flex items-center justify-between gap-3 border-t border-purple-900/40">
                      <Link
                        href={entry.suggestedAction.href}
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
                  )}
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
                className="px-2.5 py-1 rounded-md bg-[#100624] hover:bg-purple-950/80 border border-purple-900/60 hover:border-purple-500/70 text-purple-200 text-xs font-serif transition-colors disabled:opacity-50"
              >
                “{chip}”
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar & Controls */}
        <div className="space-y-2 pt-2">
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
              className="w-full bg-transparent text-sm sm:text-base text-bone placeholder-purple-300/40 resize-none outline-none font-serif leading-relaxed"
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
              <span>Anonymous browser session. Last 10 messages kept locally.</span>
            </span>
            <span className="hidden sm:inline">Press Enter to send</span>
          </div>
        </div>
      </div>
    </div>
  );
}
