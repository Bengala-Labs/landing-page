"use client";

import { useEffect, useRef } from "react";

/*
 * The hero visual. A voice signal flows left to right, drawn as columns of
 * brand squares. Left of the Klearly line it carries noise: jitter, stray
 * particles, red interference. Right of the line only the voice remains.
 * The line can be dragged. A static frame is drawn for reduced motion.
 */

const RED = "239,51,51";
const GOLD = "252,182,65";
const CREAM = "250,249,246";

function rand(a: number, b: number) {
  let h = (a * 374761393 + b * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function smooth(e0: number, e1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

/* Speech-like envelope: syllables, words and pauses. */
function voice(u: number) {
  const syl = Math.max(0, Math.sin(u * 1.7));
  const word = 0.5 + 0.5 * Math.sin(u * 0.53 + 0.8);
  const phrase = smooth(0.18, 0.55, 0.5 + 0.5 * Math.sin(u * 0.17));
  return Math.min(1, (0.12 + 0.88 * syl * syl) * (0.35 + 0.65 * word) * phrase + 0.03);
}

export default function VoiceStream({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const handle = handleRef.current;
    if (!wrap || !canvas || !handle) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let split = 0.5;
    let target = 0.5;
    let touched = false;
    let dragging = false;

    const draw = (t: number) => {
      if (!touched && !reduce) target = 0.5 + 0.07 * Math.sin(t * 0.00045);
      split += (target - split) * (dragging ? 0.35 : 0.08);
      handle.style.left = `${split * 100}%`;
      const now = String(Math.round(split * 100));
      if (handle.getAttribute("aria-valuenow") !== now) handle.setAttribute("aria-valuenow", now);

      ctx.clearRect(0, 0, w, h);
      const narrow = w < 768;
      const step = narrow ? 8 : 10;
      const sq = step - 3;
      const cols = Math.ceil(w / step) + 1;
      const mid = Math.round(h / 2 / step) * step;
      const maxRows = Math.floor((h / 2 - step) / step);
      const sx = split * w;
      const tq = Math.floor(t / 70);
      const speed = narrow ? 0.045 : 0.06;

      // Soft glow where the voice is cleaned
      const g = ctx.createLinearGradient(sx - 160, 0, sx + 160, 0);
      g.addColorStop(0, `rgba(${RED},0)`);
      g.addColorStop(0.5, `rgba(${RED},0.10)`);
      g.addColorStop(1, `rgba(${RED},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(sx - 160, 0, 320, h);

      for (let c = 0; c < cols; c++) {
        const x = c * step;
        const u = (x - t * speed) / (narrow ? 30 : 38);
        const v = voice(u);
        const clean = x + sq / 2 >= sx;
        const edge = 1 - smooth(0, 90, Math.abs(x - sx));

        let a: number;
        if (clean) {
          a = v;
        } else {
          const n = rand(c, tq);
          const hum = 0.6 + 0.4 * Math.sin(c * 0.3 + t * 0.002);
          a = Math.min(1, v * 0.8 + 0.1 + n * 0.42 * hum);
        }
        const rows = Math.max(1, Math.round(a * maxRows));

        for (let r = 0; r < rows; r++) {
          const top = r === rows - 1;
          if (clean) {
            const k = 0.45 + 0.5 * (1 - r / Math.max(rows, 1));
            ctx.fillStyle = top && v > 0.55 ? `rgba(${GOLD},0.95)` : `rgba(${CREAM},${k})`;
          } else {
            const p = rand(c * 31 + r, tq);
            ctx.fillStyle =
              p < 0.07 ? `rgba(${RED},0.75)` : p < 0.1 ? `rgba(${GOLD},0.5)` : `rgba(${CREAM},${0.18 + 0.12 * edge})`;
          }
          ctx.fillRect(x, mid - (r + 1) * step + 2, sq, sq);
          ctx.fillRect(x, mid + r * step + 2, sq, sq);
        }

        // Stray noise particles, dissolving as they reach the line
        if (!clean) {
          for (let k = 0; k < 2; k++) {
            const p = rand(c * 7 + k, tq);
            if (p < 0.16) {
              const row = Math.floor(rand(c + k * 97, tq + 3) * maxRows);
              const sign = rand(c, tq + k) < 0.5 ? -1 : 1;
              const y = sign < 0 ? mid - (row + 1) * step + 2 : mid + row * step + 2;
              const alpha = 0.55 * (1 - 0.7 * edge);
              ctx.fillStyle = p < 0.05 ? `rgba(${RED},${alpha})` : p < 0.08 ? `rgba(${GOLD},${alpha * 0.8})` : `rgba(${CREAM},${alpha * 0.4})`;
              ctx.fillRect(x, y, sq, sq);
            }
          }
        }
      }
    };

    const frame = (t: number) => {
      draw(t);
      if (running) raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!running) draw(reduce ? 9000 : performance.now());
    };

    const setFromPointer = (clientX: number) => {
      const rect = wrap.getBoundingClientRect();
      target = Math.min(0.92, Math.max(0.08, (clientX - rect.left) / rect.width));
      if (!running) {
        split = target;
        draw(9000);
      }
    };
    const onDown = (e: PointerEvent) => {
      touched = true;
      dragging = true;
      wrap.setPointerCapture(e.pointerId);
      setFromPointer(e.clientX);
    };
    const onMove = (e: PointerEvent) => {
      if (dragging) setFromPointer(e.clientX);
    };
    const onUp = () => {
      dragging = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      touched = true;
      target = Math.min(0.92, Math.max(0.08, target + (e.key === "ArrowLeft" ? -0.05 : 0.05)));
      if (!running) {
        split = target;
        draw(9000);
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(canvas);

    wrap.addEventListener("pointerdown", onDown);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerup", onUp);
    wrap.addEventListener("pointercancel", onUp);
    handle.addEventListener("keydown", onKey);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerup", onUp);
      wrap.removeEventListener("pointercancel", onUp);
      handle.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`relative w-full select-none cursor-ew-resize touch-pan-y ${className}`}>
      <canvas ref={canvasRef} aria-hidden="true" className="block w-full h-[180px] md:h-[200px] lg:h-[220px]" />

      <span className="absolute top-0 left-6 md:left-16 text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-background/40">
        Tu micrófono
      </span>
      <span className="absolute top-0 right-6 md:right-16 text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-accent-gold">
        Lo que escuchan
      </span>

      <div
        ref={handleRef}
        role="slider"
        tabIndex={0}
        aria-label="Comparar la voz antes y después de Klearly"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={50}
        className="absolute top-0 bottom-0 w-px -translate-x-1/2 bg-accent focus:outline-none group"
        style={{ left: "50%" }}
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-accent text-white text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em] px-3 py-1.5 shadow-[0_0_40px_rgba(239,51,51,0.6)] group-focus-visible:ring-2 group-focus-visible:ring-background">
          <span aria-hidden="true">‹</span>Klearly<span aria-hidden="true">›</span>
        </span>
      </div>
    </div>
  );
}
