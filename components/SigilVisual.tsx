import React from "react";

interface SigilVisualProps {
  id: string;
  className?: string;
}

export function SigilVisual({ id, className = "w-24 h-24 text-lavender-light" }: SigilVisualProps) {
  return (
    <div className="relative inline-flex items-center justify-center group">
      {/* Subtle outer celestial glow aura */}
      <div className="absolute inset-0 rounded-full bg-lavender/10 filter blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`relative z-10 ${className}`}
        aria-label={`Sigil for ${id}`}
        role="img"
      >
        {/* Subtle decorative cosmic compass ring */}
        <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="0.75" strokeDasharray="1 3" opacity="0.35" />

        {id === "protection" && (
          <g>
            <circle cx="50" cy="50" r="42" strokeDasharray="3 4" opacity="0.4" />
            <circle cx="50" cy="50" r="34" />
            <line x1="50" y1="12" x2="50" y2="88" />
            <line x1="28" y1="50" x2="72" y2="50" />
            <line x1="36" y1="28" x2="64" y2="28" />
            <line x1="36" y1="72" x2="64" y2="72" />
            <circle cx="38" cy="38" r="2" fill="currentColor" />
            <circle cx="62" cy="38" r="2" fill="currentColor" />
            <circle cx="38" cy="62" r="2" fill="currentColor" />
            <circle cx="62" cy="62" r="2" fill="currentColor" />
          </g>
        )}

        {id === "confidence" && (
          <g>
            <line x1="50" y1="14" x2="50" y2="86" strokeWidth="2" />
            <path d="M32 36L50 16L68 36" />
            <path d="M40 48L50 36L60 48" />
            <line x1="24" y1="86" x2="76" y2="86" strokeWidth="2" />
            <path d="M22 66L50 56L78 66" />
            <circle cx="50" cy="16" r="3" fill="currentColor" />
          </g>
        )}

        {id === "focus" && (
          <g>
            <circle cx="50" cy="50" r="40" opacity="0.5" />
            <circle cx="50" cy="50" r="24" />
            <line x1="50" y1="8" x2="50" y2="36" />
            <line x1="50" y1="64" x2="50" y2="92" />
            <line x1="8" y1="50" x2="36" y2="50" />
            <line x1="64" y1="50" x2="92" y2="50" />
            <circle cx="50" cy="50" r="3.5" fill="currentColor" />
            <path d="M30 30H24V24" />
            <path d="M70 30H76V24" />
            <path d="M30 70H24V76" />
            <path d="M70 70H76V76" />
          </g>
        )}

        {id === "release" && (
          <g>
            <line x1="18" y1="18" x2="82" y2="82" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.5" />
            <path d="M32 20L48 20L48 36" strokeWidth="2" />
            <path d="M68 80L52 80L52 64" strokeWidth="2" />
            <line x1="26" y1="58" x2="58" y2="26" strokeWidth="2" />
            <circle cx="68" cy="32" r="2.5" fill="currentColor" />
            <circle cx="32" cy="68" r="2.5" fill="currentColor" />
          </g>
        )}

        {id === "courage" && (
          <g>
            <polygon points="50,14 84,50 50,86 16,50" />
            <line x1="50" y1="8" x2="50" y2="92" strokeWidth="1.8" />
            <path d="M38 28L50 14L62 28" strokeWidth="2" />
            <line x1="26" y1="50" x2="74" y2="50" />
            <circle cx="50" cy="50" r="5" fill="currentColor" />
          </g>
        )}

        {id === "money-discipline" && (
          <g>
            <line x1="22" y1="82" x2="78" y2="82" strokeWidth="2" />
            <line x1="50" y1="20" x2="50" y2="82" />
            <line x1="24" y1="34" x2="76" y2="34" strokeWidth="1.8" />
            <polygon points="50,22 32,54 68,54" opacity="0.8" />
            <path d="M42 24L50 16L58 24" />
            <circle cx="24" cy="34" r="3" fill="currentColor" />
            <circle cx="76" cy="34" r="3" fill="currentColor" />
          </g>
        )}

        {id === "new-beginnings" && (
          <g>
            <path d="M26 84V44C26 30 36 20 50 20C64 20 74 30 74 44V84" />
            <line x1="18" y1="84" x2="82" y2="84" strokeWidth="2" />
            <line x1="30" y1="74" x2="70" y2="74" />
            <line x1="50" y1="12" x2="50" y2="32" strokeWidth="1.8" />
            <line x1="36" y1="16" x2="44" y2="28" />
            <line x1="64" y1="16" x2="56" y2="28" />
            <circle cx="50" cy="44" r="3" fill="currentColor" />
          </g>
        )}

        {id === "calm" && (
          <g>
            <line x1="20" y1="40" x2="80" y2="40" strokeWidth="1.8" />
            <line x1="28" y1="50" x2="72" y2="50" strokeWidth="1.4" opacity="0.8" />
            <line x1="36" y1="60" x2="64" y2="60" strokeWidth="1.2" opacity="0.6" />
            <line x1="50" y1="22" x2="50" y2="78" />
            <circle cx="50" cy="78" r="4" fill="currentColor" />
            <path d="M40 28C45 24 55 24 60 28" />
          </g>
        )}

        {id === "boundaries" && (
          <g>
            <rect x="22" y="22" width="56" height="56" strokeWidth="1.8" />
            <line x1="22" y1="22" x2="38" y2="38" />
            <line x1="78" y1="22" x2="62" y2="38" />
            <line x1="22" y1="78" x2="38" y2="62" />
            <line x1="78" y1="78" x2="62" y2="62" />
            <rect x="42" y="42" width="16" height="16" fill="currentColor" />
            <circle cx="50" cy="14" r="2" fill="currentColor" />
            <circle cx="50" cy="86" r="2" fill="currentColor" />
            <circle cx="14" cy="50" r="2" fill="currentColor" />
            <circle cx="86" cy="50" r="2" fill="currentColor" />
          </g>
        )}

        {id === "motivation" && (
          <g>
            <path d="M52 14L28 50H50L46 86L72 46H50L56 14Z" strokeWidth="1.6" />
            <line x1="68" y1="24" x2="80" y2="20" />
            <line x1="74" y1="36" x2="84" y2="40" />
            <circle cx="50" cy="14" r="2.5" fill="currentColor" />
          </g>
        )}

        {id === "self-respect" && (
          <g>
            <line x1="50" y1="12" x2="50" y2="88" strokeWidth="2.2" />
            <path d="M28 32C36 44 64 44 72 32" strokeWidth="1.8" />
            <path d="M34 52C40 60 60 60 66 52" strokeWidth="1.4" />
            <polygon points="50,14 42,26 58,26" />
            <line x1="32" y1="88" x2="68" y2="88" strokeWidth="2" />
            <circle cx="50" cy="68" r="3" fill="currentColor" />
          </g>
        )}

        {id === "clarity" && (
          <g>
            <path d="M14 50C26 30 74 30 86 50C74 70 26 70 14 50Z" strokeWidth="1.8" />
            <circle cx="50" cy="50" r="14" />
            <circle cx="50" cy="50" r="6" fill="currentColor" />
            <line x1="50" y1="16" x2="50" y2="84" strokeDasharray="3 3" opacity="0.6" />
            <line x1="50" y1="8" x2="50" y2="22" strokeWidth="2" />
            <line x1="50" y1="78" x2="50" y2="92" strokeWidth="2" />
          </g>
        )}
      </svg>
    </div>
  );
}
