"use client";

import { useEffect, useRef } from "react";

/*
 * Decorative hero band. A voice signal drawn in brand squares flows left to
 * right; left of the Klearly line it carries noise, right of it only the
 * clean voice remains. Not interactive and deliberately quiet so the call to
 * action keeps the attention. One static frame for reduced motion.
 */

const INK = "11,14,20";
const RED = "239,51,51";
const GOLD = "252,182,65";

const ink = (a: number) => `rgba(${INK},${a.toFixed(3)})`;
const red = (a: number) => `rgba(${RED},${a.toFixed(3)})`;
const gold = (a: number) => `rgba(${GOLD},${a.toFixed(3)})`;

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const line = lineRef.current;
    if (!canvas || !line) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;

    const draw = (t: number) => {
      const split = reduce ? 0.5 : 0.5 + 0.04 * Math.sin(t * 0.0003);
      line.style.left = `${split * 100}%`;

      ctx.clearRect(0, 0, w, h);
      const narrow = w < 768;
      const step = narrow ? 7 : 8;
      const sq = step - 3;
      const cols = Math.ceil(w / step) + 1;
      const mid = Math.round(h / 2 / step) * step;
      const maxRows = Math.floor((h / 2 - step) / step);
      const sx = split * w;
      const tq = Math.floor(t / 90);
      const speed = narrow ? 0.035 : 0.045;

      const g = ctx.createRadialGradient(sx, h / 2, 0, sx, h / 2, h * 0.7);
      g.addColorStop(0, red(0.05));
      g.addColorStop(1, red(0));
      ctx.fillStyle = g;
      ctx.fillRect(sx - h * 0.7, 0, h * 1.4, h);

      for (let c = 0; c < cols; c++) {
        const x = c * step;
        // Fade both ends so the band dissolves into the page
        const ends = smooth(0, 0.12, x / w) * smooth(0, 0.12, 1 - x / w);
        if (ends <= 0.01) continue;
        const u = (x - t * speed) / (narrow ? 28 : 34);
        const v = voice(u);
        const clean = x + sq / 2 >= sx;

        let a: number;
        if (clean) {
          a = v;
        } else {
          const n = rand(c, tq);
          a = Math.min(1, v * 0.8 + 0.08 + n * 0.36);
        }
        const rows = Math.max(1, Math.round(a * maxRows));

        for (let r = 0; r < rows; r++) {
          if (clean) {
            const k = (0.16 + 0.22 * (1 - r / rows)) * ends;
            ctx.fillStyle = r === rows - 1 && v > 0.6 ? gold(0.75 * ends) : ink(k);
          } else {
            const p = rand(c * 31 + r, tq);
            ctx.fillStyle = p < 0.05 ? red(0.4 * ends) : p < 0.08 ? gold(0.35 * ends) : ink(0.09 * ends);
          }
          ctx.fillRect(x, mid - (r + 1) * step + 2, sq, sq);
          ctx.fillRect(x, mid + r * step + 2, sq, sq);
        }

        if (!clean && rand(c * 7, tq) < 0.07) {
          const row = Math.floor(rand(c + 97, tq + 3) * maxRows);
          const y = rand(c, tq + 1) < 0.5 ? mid - (row + 1) * step + 2 : mid + row * step + 2;
          ctx.fillStyle = red(0.25 * ends);
          ctx.fillRect(x, y, sq, sq);
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

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(canvas);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div aria-hidden="true" className={`relative w-full pointer-events-none select-none ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-[120px] md:h-[140px] lg:h-[150px]" />

      <span className="absolute -top-1 left-6 md:left-16 text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/30">
        Tu micrófono
      </span>
      <span className="absolute -top-1 right-6 md:right-16 text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/30">
        Lo que escuchan
      </span>

      <div ref={lineRef} className="absolute top-2 bottom-2 w-px -translate-x-1/2 bg-accent/40" style={{ left: "50%" }}>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-background border border-accent/30 text-accent text-[9px] md:text-[10px] font-mono uppercase tracking-[0.25em] px-2.5 py-1">
          Klearly
        </span>
      </div>
    </div>
  );
}
