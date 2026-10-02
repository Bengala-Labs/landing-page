"use client";

import { useEffect, useState } from "react";
import { KlearlyMark } from "./Marks";

const noises = ["Tráfico", "Teclado", "Ventilador", "Eco"];
const BARS = 28;

/* Illustrative call window with a Klearly switch. Auto-toggles until the visitor takes over. */
export default function CallDemo() {
  const [on, setOn] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) return;
    const id = setInterval(() => setOn((v) => !v), 3400);
    return () => clearInterval(id);
  }, [touched]);

  return (
    <div className="relative rounded-3xl border border-background/10 bg-[#10141c] p-5 md:p-8 shadow-[0_60px_120px_-40px_rgba(239,51,51,0.35)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 pb-5 border-b border-background/10">
        <span className="flex items-center gap-2.5 text-[11px] md:text-xs font-mono text-background/55">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          En llamada · 12:04
        </span>

        <button
          type="button"
          role="switch"
          aria-checked={on}
          onClick={() => {
            setTouched(true);
            setOn((v) => !v);
          }}
          className="group flex items-center gap-3"
        >
          <span className="flex items-center gap-2 text-sm font-medium text-background">
            <KlearlyMark className="w-4 h-4 text-background" />
            Klearly
          </span>
          <span
            className={`relative w-12 h-7 rounded-full transition-colors duration-500 ${on ? "bg-accent" : "bg-background/15"}`}
          >
            <span
              className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-background shadow transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                on ? "translate-x-5" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Speaker */}
      <div className="py-6 md:py-8 flex items-center gap-4 md:gap-6">
        <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-background/[0.06] border border-background/10 flex items-center justify-center text-xs font-mono text-background/70">
          TÚ
        </div>
        <div className="flex-1 flex items-center gap-[3px] h-14 md:h-16" aria-hidden="true">
          {Array.from({ length: BARS }).map((_, i) => (
            <span
              key={i}
              className={`flex-1 h-full rounded-[2px] origin-center ${on ? "bg-background/85 animate-eq" : "bg-background/30 animate-eq-noisy"}`}
              style={{
                animationDelay: `${(i * 97) % 900}ms`,
                animationDuration: on ? `${900 + ((i * 53) % 500)}ms` : `${220 + ((i * 37) % 180)}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Noise + accent */}
      <div className="flex flex-wrap gap-2">
        {noises.map((n) => (
          <span
            key={n}
            className={`px-3 py-1.5 rounded-full text-xs border transition-all duration-500 ${
              on ? "border-background/10 text-background/30 line-through" : "border-accent/40 bg-accent/10 text-accent-light"
            }`}
          >
            {n}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 text-xs md:text-sm">
        <span className="text-background/45">Pronunciación en inglés</span>
        <span className={`font-medium transition-colors duration-500 ${on ? "text-accent-gold" : "text-background/45"}`}>
          {on ? "Suavizada · tu voz intacta" : "Sin ajustar"}
        </span>
      </div>

      {/* What the listener hears */}
      <div className="mt-6 md:mt-8 rounded-2xl bg-background/[0.04] border border-background/10 p-5 md:p-6">
        <span className="block text-[10px] font-mono uppercase tracking-[0.3em] text-background/35 mb-3">
          Del otro lado de la llamada
        </span>
        <p className="relative min-h-[4.75rem] md:min-h-[4.25rem] text-lg md:text-2xl font-medium tracking-tight leading-snug">
          <span
            className={`absolute inset-0 transition-all duration-500 ${on ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"} text-background/55 italic font-light`}
          >
            “Sorry… could you repeat that?”
          </span>
          <span
            className={`absolute inset-0 transition-all duration-500 ${on ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"} text-background`}
          >
            “Perfect, that&apos;s clear. Let&apos;s do it.”
          </span>
        </p>
      </div>

      <span className="block mt-4 text-[10px] font-mono uppercase tracking-[0.25em] text-background/25">
        Simulación ilustrativa
      </span>
    </div>
  );
}
