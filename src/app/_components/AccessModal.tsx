"use client";

import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { OPEN_ACCESS_EVENT } from "./accessEvents";
import { KlearlyMark } from "./Marks";

/*
 * Early-access modal for Klearly. One instance per page, opened by
 * AccessTrigger buttons. Single purpose: collect an email. Posts it to
 * Formspree in the background. Nothing is persisted between visits.
 */

const ENDPOINT = "https://formspree.io/f/mqpaorpv";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TRACKED_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "ref"];

type Status = "idle" | "submitting" | "error" | "success";

export default function AccessModal() {
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const [visible, setVisible] = useState(false);
  const [source, setSource] = useState("pagina");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [joined, setJoined] = useState("");

  const close = useCallback(() => {
    setVisible(false);
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      dialogRef.current?.close();
      document.documentElement.style.overflow = "";
      lastFocus.current?.focus({ preventScroll: true });
    }, 200);
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
      window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 60);
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
        window.setTimeout(() => doneRef.current?.focus(), 30);
        return;
      }
      const body = (await res.json().catch(() => null)) as { errors?: { field?: string }[] } | null;
      if (body?.errors?.some((err) => err.field === "email")) fail("Revisa tu correo, parece que le falta algo.");
      else fail("No pudimos guardar tu correo. Inténtalo de nuevo.");
    } catch {
      fail("No hay conexión. Inténtalo de nuevo en un momento.");
    }
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
        className={`fixed inset-0 bg-[#0B0E14]/45 backdrop-blur-sm transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}
      />

      <div
        className="relative min-h-full flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div
          className={`relative w-full max-w-[440px] rounded-3xl bg-background text-foreground border border-border shadow-[0_40px_100px_-30px_rgba(11,14,20,0.5)] px-6 pt-12 pb-7 sm:px-10 sm:pt-12 sm:pb-9 transition-opacity duration-200 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="absolute top-4 right-4 w-9 h-9 rounded-full text-foreground/45 hover:text-foreground hover:bg-foreground/[0.06] transition-colors flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {success ? (
            <div role="status" className="text-center">
              <span className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-accent text-white">
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </span>
              <h2 id={`${id}-title`} className="mt-6 text-3xl font-medium tracking-[-0.02em]">
                Estás dentro<span className="text-accent">.</span>
              </h2>
              <p className="mt-3 text-base text-foreground/70 leading-relaxed">
                Te escribiremos a <span className="text-foreground font-medium break-all">{joined}</span> cuando sea tu turno.
              </p>
              <button
                ref={doneRef}
                type="button"
                onClick={close}
                className="mt-8 w-full rounded-2xl bg-foreground text-background py-4 text-base font-medium hover:bg-foreground/90 transition-colors outline-none focus-visible:ring-4 focus-visible:ring-accent/25"
              >
                Listo
              </button>
            </div>
          ) : (
            <>
              <KlearlyMark className="mx-auto w-8 h-8 text-foreground" />
              <h2 id={`${id}-title`} className="mt-6 text-center text-[1.75rem] sm:text-3xl font-medium tracking-[-0.02em] leading-[1.12] text-balance">
                Pide acceso anticipado a Klearly
              </h2>
              <p className="mt-3 text-center text-base text-foreground/70 leading-relaxed text-balance">
                Deja tu correo y te avisamos cuando sea tu turno.
              </p>

              <form noValidate onSubmit={onSubmit} className="mt-8" aria-busy={submitting}>
                <label htmlFor={`${id}-email`} className="sr-only">
                  Tu correo electrónico
                </label>
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
                  className={`w-full rounded-2xl bg-white border px-5 py-4 text-lg text-foreground placeholder:text-foreground/35 outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(239,51,51,0.15)] disabled:opacity-60 ${
                    invalid ? "border-accent" : "border-border focus:border-accent/60"
                  }`}
                />
                {/* Honeypot for bots; Formspree discards submissions that fill it. */}
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

                <p id={`${id}-hint`} aria-live="polite" className={`min-h-[1.5rem] mt-2 px-1 text-sm ${invalid ? "text-accent" : "text-transparent"}`}>
                  {invalid ? error : " "}
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-1 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-accent text-white py-4 text-lg font-medium hover:bg-[#D92B2B] active:scale-[0.99] transition-[background-color,transform] outline-none focus-visible:ring-4 focus-visible:ring-accent/25 disabled:cursor-wait disabled:opacity-90"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" aria-hidden="true" />
                      Enviando
                    </>
                  ) : (
                    "Quiero acceso"
                  )}
                </button>

                <p className="mt-4 text-center text-xs text-foreground/50">
                  Solo te escribimos para darte acceso.{" "}
                  <a href="/politica-de-privacidad" className="underline underline-offset-2 hover:text-foreground transition-colors">
                    Privacidad
                  </a>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}
