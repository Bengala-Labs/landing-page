"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SHOW_CALL_DEMO } from "./flags";
import { openAccessModal } from "./accessEvents";

const links = [
  ...(SHOW_CALL_DEMO ? [{ href: "#voice", label: "Voice" }] : []),
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#para-quien", label: "Para quién" },
];

/* Floating dark capsule that tightens once the page scrolls. */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Principal"
      className={`fixed left-0 right-0 z-40 px-3 md:px-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled ? "top-3" : "top-4 md:top-6"
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between gap-6 rounded-full bg-foreground/95 text-background backdrop-blur-xl border border-white/10 shadow-[0_18px_50px_-18px_rgba(11,14,20,0.55)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] animate-fade-down ${
          scrolled ? "max-w-3xl pl-5 pr-2 py-2" : "max-w-5xl pl-6 pr-2 py-2.5"
        }`}
        style={{ animationDelay: "200ms" }}
      >
        <a href="#" aria-label="Bengala — inicio" className="shrink-0">
          <Image
            src="/logo_light.svg"
            alt="Bengala"
            width={140}
            height={32}
            className="h-5 md:h-6 w-auto opacity-95 transition-opacity hover:opacity-100"
            priority
          />
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-sm text-background/60 hover:text-background transition-colors duration-300"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-background origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-haspopup="dialog"
          onClick={() => openAccessModal("nav")}
          className="group relative inline-flex items-center gap-2 text-xs md:text-sm font-medium text-foreground bg-background hover:bg-white pl-4 pr-3.5 py-2 md:pl-5 md:pr-4 md:py-2.5 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-sm"
        >
          <span>Acceso anticipado</span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </button>
      </div>
    </nav>
  );
}
