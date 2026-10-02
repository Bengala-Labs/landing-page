"use client";

import { useEffect, useRef } from "react";

type Part = { text: string; className?: string };

/* Words light up one by one as the block scrolls through the viewport. */
export default function ScrollWords({ parts, className = "" }: { parts: Part[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-word]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => (w.style.opacity = "1"));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (rect.height + vh * 0.3)));
      const n = words.length;
      words.forEach((w, i) => {
        const k = Math.min(1, Math.max(0, p * (n + 4) - i));
        w.style.opacity = String(0.13 + 0.87 * k);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <p ref={ref} className={className}>
      {parts.map((part, pi) => (
        <span key={pi} className={part.className}>
          {part.text.split(" ").map((word, wi) => (
            <span key={wi} data-word="" className="transition-opacity duration-300" style={{ opacity: 0.13 }}>
              {word}{" "}
            </span>
          ))}
        </span>
      ))}
    </p>
  );
}
