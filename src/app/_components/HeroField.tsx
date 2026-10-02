"use client";

import { useEffect, useRef } from "react";

/*
 * Hero background: a fine grid of brand squares carrying sound-wave rings
 * that radiate up from the Klearly line, as if the cleaned voice spreads
 * across the page. The cursor acts as a lens that lifts nearby squares.
 * Kept faint behind the headline. One static frame for reduced motion.
 */

const INK = "11,14,20";
const RED = "239,51,51";
const GOLD = "252,182,65";

function hash(c: number, r: number) {
  let h = (c * 374761393 + r * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function smooth(e0: number, e1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

export default function HeroField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      if (mouse.tx < -5000 || mouse.x < -5000) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      } else {
        mouse.x += (mouse.tx - mouse.x) * 0.1;
        mouse.y += (mouse.ty - mouse.y) * 0.1;
      }

      const narrow = w < 768;
      const step = narrow ? 18 : 22;
      const cols = Math.ceil(w / step) + 1;
      const rows = Math.ceil(h / step) + 1;
      const sx = w / 2;
      const sy = h * (narrow ? 0.8 : 0.84);
      const reach = Math.max(w, h) * 0.75;
      const ox = (w - (cols - 1) * step) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = ox + c * step;
          const y = r * step;
          const nx = x / w;
          const ny = y / h;

          // Sound rings travelling outward from the source
          const d = Math.hypot(x - sx, (y - sy) * 1.3);
          const crest = Math.pow(0.5 + 0.5 * Math.sin(d * 0.026 - t * 0.0016), 4);
          const fall = Math.exp(-d / reach);
          let a = crest * fall;

          // Keep the headline block and the waveform band calm
          const textZone = smooth(0.1, 0.36, Math.abs(nx - 0.5)) * 0.82 + 0.18;
          const inText = ny > 0.12 && ny < 0.72 ? textZone : 1;
          const inWave = ny > 0.7 ? 0.35 : 1;
          a *= inText * inWave;

          // Cursor lens
          const mdx = x - mouse.x;
          const mdy = y - mouse.y;
          const lens = Math.exp(-(mdx * mdx + mdy * mdy) / (2 * 120 * 120));
          a = Math.max(a, lens * 0.55 * inWave);

          const base = 0.05 * (0.6 + 0.4 * fall);
          const size = 1.2 + a * 4.2;
          const k = hash(c, r);
          if (a > 0.35 && k < 0.05) ctx.fillStyle = `rgba(${RED},${0.35 + 0.5 * a})`;
          else if (a > 0.35 && k < 0.09) ctx.fillStyle = `rgba(${GOLD},${0.45 + 0.5 * a})`;
          else ctx.fillStyle = `rgba(${INK},${base + a * 0.42})`;
          ctx.fillRect(x - size / 2, y - size / 2, size, size);
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
      if (!running) draw(reduce ? 3000 : performance.now());
    };

    const onPointer = (e: PointerEvent) => {
      if (reduce || e.pointerType === "touch") return;
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(canvas);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`block w-full h-full ${className}`} />;
}
