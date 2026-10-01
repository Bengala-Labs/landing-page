"use client";

import { useEffect, useRef } from "react";

/*
 * Generative field of squares, built from the same block grammar as the
 * Bengala logomark. A slow interference pattern drifts across the grid,
 * a diagonal "scan" sweeps through it and the cursor excites nearby cells.
 * Renders a single static frame when the user prefers reduced motion.
 */

type Props = {
  tone?: "light" | "dark";
  /** "right": keep the left side calm for text. "edges": keep the centre calm. */
  focus?: "right" | "edges";
  className?: string;
};

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

export default function BlockField({ tone = "light", focus = "right", className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ink = tone === "light" ? "11,14,20" : "250,249,246";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let cell = 30;
    let raf = 0;
    let running = false;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      if (mouse.tx < -5000 || mouse.x < -5000) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      } else {
        mouse.x += (mouse.tx - mouse.x) * 0.08;
        mouse.y += (mouse.ty - mouse.y) * 0.08;
      }

      const cols = Math.ceil(w / cell) + 1;
      const rows = Math.ceil(h / cell) + 1;
      const narrow = w < 768;
      const sweep = ((t * 0.00005) % 1.8) - 0.4;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cell;
          const y = r * cell;
          const nx = x / w;
          const ny = y / h;

          const n =
            Math.sin(c * 0.17 + t * 0.00035) +
            Math.sin(r * 0.21 - t * 0.00028) +
            Math.sin((c + r) * 0.09 + t * 0.0005);
          let v = (n + 3) / 6;
          v = v * v * v;

          let mask: number;
          if (focus === "right") {
            mask = narrow ? 0.12 + smooth(0.35, 1, ny) * 0.6 : smooth(0.32, 0.95, nx);
          } else {
            const d = Math.hypot((nx - 0.5) * 1.3, ny - 0.5);
            mask = smooth(0.22, 0.7, d);
          }

          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const boost = Math.exp(-(dx * dx + dy * dy) / (2 * 120 * 120));
          const bd = nx * 0.6 + ny * 0.4 - sweep;
          const band = Math.exp(-(bd * bd) / 0.004);

          let s = v * mask + boost * 0.5 * Math.max(mask, 0.3) + band * 0.22 * mask;
          if (s < 0.08) continue;
          s = Math.min(s, 1);

          const size = Math.max(2, cell * 0.74 * s);
          const off = (cell - size) / 2;
          const k = hash(c, r);
          if (k < 0.045) ctx.fillStyle = `rgba(${RED},${0.3 + 0.7 * s})`;
          else if (k < 0.07) ctx.fillStyle = `rgba(${GOLD},${0.3 + 0.7 * s})`;
          else ctx.fillStyle = `rgba(${ink},${0.05 + 0.42 * s})`;
          ctx.fillRect(x + off, y + off, size, size);
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
      cell = w < 768 ? 22 : 30;
      if (!running) draw(reduce ? 4000 : performance.now());
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

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
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
  }, [tone, focus]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`block w-full h-full ${className}`} />;
}
