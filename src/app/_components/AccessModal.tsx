"use client";

import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { OPEN_ACCESS_EVENT } from "./accessEvents";
import { KlearlyMark } from "./Marks";

/*
 * Early-access modal for Klearly. One instance per page, opened by
 * AccessTrigger buttons. Posts the email to Formspree in the background.
 * Nothing is persisted: a reload always starts from the form.
 */

const ENDPOINT = "https://formspree.io/f/mqpaorpv";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TRACKED_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "ref"];
const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

const benefits = [
  "Acceso antes del lanzamiento abierto",
  "Línea directa con el equipo que lo construye",
  "Sin compromiso. Un correo cuando sea tu turno",
];

type Status = "idle" | "submitting" | "error" | "success";

/* Deterministic burst of brand squares around the success check. */
const BURST = Array.from({ length: 22 }, (_, i) => {
  const angle = (i / 22) * Math.PI * 2 + (i % 3) * 0.35;
  const dist = 70 + ((i * 37) % 60);
  return {
    dx: Math.round(Math.cos(angle) * dist),
    dy: Math.round(Math.sin(angle) * dist),
    r: ((i * 53) % 180) - 90,
    size: 6 + (i % 3) * 2,
    color: i % 4 === 0 ? "#EF3333" : i % 4 === 1 ? "#FCB641" : i % 4 === 2 ? "#FAF9F6" : "#EF3333",
    delay: (i % 5) * 25,
  };
});

const BARS = 34;

export default function AccessModal() {
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const [visible, setVisible] = useState(false);
  const [source, setSource] = useState("pagina");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [joined, setJoined] = useState("");
  const [shared, setShared] = useState(false);

  const close = useCallback(() => {
    setVisible(false);
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      dialogRef.current?.close();
      document.documentElement.style.overflow = "";
      lastFocus.current?.focus({ preventScroll: true });
    }, 280);
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      window.clearTimeout(closeTimer.current);
      setSource((e as CustomEvent<string>).detail || "pagina");
      lastFocus.current = document.activeElement as HTMLElement | null;
      if (!dialog.open) dialog.showModal();
      document.documentElement.style.overflow = "hidden";
      requestAnimationFrame(() => setVisible(true));
      window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 80);
    };
    window.addEventListener(OPEN_ACCESS_EVENT, onOpen);
    return () => {
      window.removeEventListener(OPEN_ACCESS_EVENT, onOpen);
      window.clearTimeout(closeTimer.current);
      document.documentElement.style.overflow = "";
    };
  }, []);

  const fail = (message: string) => {
    setError(message);
    setStatus("error");
    inputRef.current?.focus();
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      fail(value ? "Revisa tu correo, parece que le falta algo." : "Escribe tu correo para pedir acceso.");
      return;
    }

    const form = new FormData(e.currentTarget);
    const data = new FormData();
    data.append("email", value);
    data.append("_subject", "Nuevo acceso anticipado a Klearly");
    data.append("_gotcha", String(form.get("_gotcha") ?? ""));
    data.append("source", source);
    data.append("page", window.location.href);
    data.append("language", navigator.language);
    if (document.referrer) data.append("referrer", document.referrer);
    const params = new URLSearchParams(window.location.search);
    TRACKED_PARAMS.forEach((key) => {
      const v = params.get(key);
      if (v) data.append(key, v);
    });

    setStatus("submitting");
    setError("");
    try {
      const res = await fetch(ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (res.ok) {
        setJoined(value);
        setStatus("success");
        return;
      }
      const body = (await res.json().catch(() => null)) as { errors?: { field?: string }[] } | null;
      if (body?.errors?.some((err) => err.field === "email")) fail("Revisa tu correo, parece que le falta algo.");
      else fail("No pudimos guardar tu correo. Inténtalo de nuevo.");
    } catch {
      fail("No hay conexión. Inténtalo de nuevo en un momento.");
    }
  };

  const share = async () => {
    const url = window.location.origin;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Bengala Klearly", text: "Klearly: que te entiendan a la primera.", url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShared(true);
      window.setTimeout(() => setShared(false), 2200);
    } catch {
      /* share sheet dismissed */
    }
  };

  const useAnother = () => {
    setStatus("idle");
    setEmail("");
    window.setTimeout(() => inputRef.current?.focus(), 50);
  };

  const submitting = status === "submitting";
  const invalid = status === "error";
  const success = status === "success";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${id}-title`}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      className="fixed inset-0 m-0 w-full h-full max-w-none max-h-none p-0 bg-transparent overflow-y-auto overscroll-contain backdrop:bg-transparent"
    >
      <div
        aria-hidden="true"
        className={`fixed inset-0 bg-[#05070b]/75 backdrop-blur-md transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
      />

      <div
        className="relative min-h-full flex items-center justify-center p-3 sm:p-6 md:p-10"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div
          className={`relative w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/10 bg-[#0f131b] text-background shadow-[0_80px_160px_-40px_rgba(239,51,51,0.5)] grid md:grid-cols-[0.9fr_1.1fr] transition-all duration-500 ${EASE} ${
            visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-[0.96]"
          }`}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 text-background/70 hover:text-background hover:bg-white/[0.12] transition-colors flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {/* Visual panel */}
          <div className="relative hidden md:flex flex-col justify-between p-10 overflow-hidden border-r border-white/[0.06]">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 90% 60% at 20% 110%, rgba(239,51,51,0.38), transparent 65%), radial-gradient(ellipse 60% 40% at 90% 0%, rgba(252,182,65,0.12), transparent 70%)",
              }}
            />
            <div className="relative flex items-center gap-3">
              <KlearlyMark className="w-7 h-7 text-background" />
              <span className="text-sm text-background/80">
                Bengala <span className="font-semibold text-background">Klearly</span>
              </span>
            </div>

            <div className="relative flex items-center gap-[3px] h-28" aria-hidden="true">
              {Array.from({ length: BARS }).map((_, i) => (
                <span
                  key={i}
                  className={`flex-1 h-full rounded-[2px] origin-center animate-eq ${i % 7 === 3 ? "bg-accent-gold" : "bg-background/85"}`}
                  style={{ animationDelay: `${(i * 113) % 1000}ms`, animationDuration: `${900 + ((i * 71) % 600)}ms` }}
                />
              ))}
            </div>

            <div className="relative">
              <span className="block text-[10px] font-mono uppercase tracking-[0.3em] text-background/40 mb-3">
                Del otro lado de la llamada
              </span>
              <p className="text-2xl lg:text-3xl font-medium tracking-tight leading-snug">
                “Perfect, that&apos;s clear.
                <br />
                Let&apos;s do it.”
              </p>
            </div>
          </div>

          {/* Content panel */}
          <div className="relative p-7 pt-16 sm:p-10 md:p-12">
            {success ? (
              <div role="status" className="flex flex-col items-start">
                <div className="relative w-16 h-16 mb-8">
                  {BURST.map((b, i) => (
                    <span
                      key={i}
                      aria-hidden="true"
                      className="absolute left-1/2 top-1/2 animate-burst"
                      style={
                        {
                          width: b.size,
                          height: b.size,
                          background: b.color,
                          animationDelay: `${b.delay}ms`,
                          "--dx": `${b.dx}px`,
                          "--dy": `${b.dy}px`,
                          "--r": `${b.r}deg`,
                        } as React.CSSProperties
                      }
                    />
                  ))}
                  <span className="relative flex items-center justify-center w-16 h-16 rounded-full bg-accent-gold text-foreground animate-pop">
                    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" className="animate-draw" />
                    </svg>
                  </span>
                </div>

                <h2 id={`${id}-title`} className="text-4xl md:text-5xl font-medium tracking-[-0.03em] leading-[1.02]">
                  Estás dentro<span className="text-accent">.</span>
                </h2>
                <p className="mt-5 text-base md:text-lg font-light text-background/60 leading-relaxed">
                  Te escribiremos a <span className="text-background font-normal break-all">{joined}</span> cuando
                  sea tu turno.
                </p>
                <p className="mt-3 text-sm font-light text-background/45 leading-relaxed">
                  Mientras tanto, ¿conoces a alguien que lo necesita?
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={share}
                    className="group relative inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3.5 text-sm md:text-base font-medium overflow-hidden"
                  >
                    <span className={`absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ${EASE}`} />
                    <span className="relative group-hover:text-white transition-colors duration-500">
                      {shared ? "Enlace copiado" : "Compártelo"}
                    </span>
                    <span className="relative group-hover:text-white transition-colors duration-500">↗</span>
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    className="rounded-full border border-white/15 px-6 py-3.5 text-sm md:text-base font-medium text-background/80 hover:text-background hover:border-white/30 transition-colors"
                  >
                    Listo
                  </button>
                </div>
                <button type="button" onClick={useAnother} className="mt-6 text-sm text-background/40 hover:text-background transition-colors">
                  Usar otro correo
                </button>
              </div>
            ) : (
              <>
                <div className="md:hidden flex items-center gap-3 mb-8">
                  <KlearlyMark className="w-6 h-6 text-background" />
                  <span className="text-sm text-background/80">
                    Bengala <span className="font-semibold text-background">Klearly</span>
                  </span>
                </div>

                <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.3em] text-accent-gold">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-accent-gold opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-gold" />
                  </span>
                  Acceso anticipado
                </span>

                <h2 id={`${id}-title`} className="mt-5 text-[2.1rem] sm:text-4xl md:text-[2.75rem] font-medium tracking-[-0.03em] leading-[1.04]">
                  Sé de los primeros en <span className="italic font-light text-background/55">sonar claro</span>
                  <span className="text-accent">.</span>
                </h2>
                <p className="mt-5 text-base font-light text-background/60 leading-relaxed">
                  Estamos abriendo Klearly a un primer grupo de personas y equipos. Deja tu correo y
                  guárdate un lugar.
                </p>

                <ul className="mt-7 flex flex-col gap-3">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm md:text-[15px] text-background/85">
                      <span className="mt-[0.45em] inline-block w-1.5 h-1.5 shrink-0 bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>

                <form noValidate onSubmit={onSubmit} className="mt-8" aria-busy={submitting}>
                  <label htmlFor={`${id}-email`} className="block text-xs font-medium text-background/55 mb-2.5 pl-1">
                    Tu correo
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      ref={inputRef}
                      id={`${id}-email`}
                      type="email"
                      name="email"
                      inputMode="email"
                      autoComplete="email"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                      enterKeyHint="send"
                      required
                      placeholder="tu@correo.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (invalid) {
                          setStatus("idle");
                          setError("");
                        }
                      }}
                      aria-invalid={invalid}
                      aria-describedby={`${id}-hint`}
                      disabled={submitting}
                      className={`flex-1 min-w-0 rounded-2xl bg-white/[0.05] border px-5 py-4 text-base text-background placeholder:text-background/30 outline-none transition-all duration-300 focus:bg-white/[0.08] focus:shadow-[0_0_0_5px_rgba(239,51,51,0.16)] disabled:opacity-60 ${
                        invalid ? "border-accent/80" : "border-white/10 focus:border-white/35"
                      }`}
                    />
                    {/* Honeypot for bots; Formspree discards submissions that fill it. */}
                    <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group relative shrink-0 inline-flex items-center justify-center gap-2 rounded-2xl bg-accent text-white px-6 py-4 text-base font-medium overflow-hidden transition-transform duration-300 active:scale-[0.98] disabled:cursor-wait shadow-[0_12px_40px_-12px_rgba(239,51,51,0.8)]"
                    >
                      <span className={`absolute inset-0 bg-background translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-500 ${EASE}`} />
                      {submitting ? (
                        <span className="relative inline-flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" aria-hidden="true" />
                          Enviando
                        </span>
                      ) : (
                        <span className="relative inline-flex items-center gap-2 group-hover:text-foreground group-focus-visible:text-foreground transition-colors duration-500">
                          Quiero acceso
                          <span className={`inline-block transition-transform duration-500 ${EASE} group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}>↗</span>
                        </span>
                      )}
                    </button>
                  </div>
                  <p id={`${id}-hint`} aria-live="polite" className={`mt-3 pl-1 text-xs md:text-sm ${invalid ? "text-accent-light" : "text-background/35"}`}>
                    {invalid ? (
                      error
                    ) : (
                      <>
                        Solo te escribimos para darte acceso.{" "}
                        <a href="/politica-de-privacidad" className="underline decoration-white/25 underline-offset-2 hover:text-background transition-colors">
                          Privacidad
                        </a>
                      </>
                    )}
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
