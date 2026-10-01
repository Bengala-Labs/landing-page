"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const links = [
  { href: "#principios", label: "Principios" },
  { href: "#enfoque", label: "Lo que construimos" },
  { href: "#metodo", label: "Cómo trabajamos" },
  { href: "#contacto", label: "Contacto" },
];

export default function Nav({ contactUrl }: { contactUrl: string }) {
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div
        className={`w-full max-w-[1800px] mx-auto px-6 md:px-16 flex items-center justify-between gap-8 transition-all duration-700 ${
          scrolled ? "py-4" : "py-7 md:py-9"
        }`}
      >
        <a
          href="#"
          aria-label="Bengala AI — inicio"
          className="animate-fade-down shrink-0"
          style={{ animationDelay: "300ms" }}
        >
          <Image
            src="/logo.svg"
            alt="Bengala AI | Productos de inteligencia artificial"
            width={140}
            height={32}
            className="h-6 md:h-7 w-auto opacity-95 transition-opacity hover:opacity-100"
            priority
          />
        </a>

        <ul
          className="hidden lg:flex items-center gap-9 animate-fade-down"
          style={{ animationDelay: "450ms" }}
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-sm text-foreground/60 hover:text-foreground transition-colors duration-300"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href={contactUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2 text-xs md:text-sm font-medium text-background bg-foreground pl-4 pr-3.5 py-2 md:pl-5 md:pr-4 md:py-2.5 rounded-full overflow-hidden animate-fade-down"
          style={{ animationDelay: "600ms" }}
        >
          <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          <span className="relative">Hablemos</span>
          <span className="relative inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </a>
      </div>
    </nav>
  );
}
