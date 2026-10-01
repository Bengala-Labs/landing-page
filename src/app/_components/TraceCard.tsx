"use client";

import { useEffect, useRef, useState } from "react";

type Line = { verb: string; detail: string; status: string; tone?: "ok" | "human" | "done" };

const lines: Line[] = [
  { verb: "planificar", detail: "4 pasos · 3 herramientas", status: "ok", tone: "ok" },
  { verb: "leer", detail: "extracto_bancario_sep.pdf", status: "ok", tone: "ok" },
  { verb: "cruzar", detail: "movimientos vs. libro contable", status: "ok", tone: "ok" },
  { verb: "dudar", detail: "3 partidas sin coincidencia", status: "a revisión humana", tone: "human" },
  { verb: "verificar", detail: "saldo final = saldo contable", status: "✓", tone: "done" },
];

/* Illustrative agent trace: lines appear one by one when scrolled into view. */
export default function TraceCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const step = (i: number) => ({
    className: `transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
      on ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
    }`,
    style: { transitionDelay: `${300 + i * 380}ms` },
  });

  return (
    <div
      ref={ref}
      className="relative rounded-2xl bg-foreground text-background p-6 md:p-8 font-mono text-[11px] md:text-[13px] leading-relaxed shadow-[0_40px_80px_-30px_rgba(11,14,20,0.45)] overflow-hidden"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-background/10">
        <span className="flex items-center gap-2.5 text-background/70">
          <span className="relative flex h-2 w-2">
            <span className={`absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 ${on ? "animate-ping" : ""}`} />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          traza · conciliacion_mensual
        </span>
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-background/35 border border-background/15 rounded px-2 py-0.5">
          Ejemplo ilustrativo
        </span>
      </div>

      <ol className="flex flex-col gap-2.5">
        {lines.map((line, i) => {
          const s = step(i);
          return (
            <li key={line.verb} className={`grid grid-cols-[1.5rem_5.5rem_1fr] md:grid-cols-[2rem_6.5rem_1fr_auto] gap-x-2 ${s.className}`} style={s.style}>
              <span className="text-background/25 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-accent-gold">{line.verb}</span>
              <span className="text-background/65 md:truncate">{line.detail}</span>
              <span
                className={`col-start-3 md:col-start-auto ${
                  line.tone === "human"
                    ? "text-accent"
                    : line.tone === "done"
                    ? "text-background font-semibold"
                    : "text-background/35"
                }`}
              >
                {line.tone === "human" ? "→ " : ""}
                {line.status}
              </span>
            </li>
          );
        })}
      </ol>

      <div
        className={`mt-6 pt-5 border-t border-background/10 flex flex-wrap items-center justify-between gap-3 transition-all duration-700 ${on ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDelay: `${300 + lines.length * 380}ms` }}
      >
        <span className="text-background/40">resultado</span>
        <span className="text-background">
          trabajo terminado<span className="text-accent">.</span>{" "}
          <span className="text-background/45">trazable · auditable</span>
        </span>
      </div>
    </div>
  );
}
