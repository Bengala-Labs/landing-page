"use client";

import { useEffect, useState, useRef, type ReactNode } from "react";
import Image from "next/image";

/* Scroll-triggered reveal wrapper (IntersectionObserver, fires once) */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeProduct, setActiveProduct] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorRef.current && cursorRef.current.style.opacity === "0") {
        cursorRef.current.style.opacity = "1";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      const dx = mouseX - outlineX;
      const dy = mouseY - outlineY;

      // Smooth easing for background cursor glow
      outlineX += dx * 0.08;
      outlineY += dy * 0.08;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    if (cursorRef.current) {
      cursorRef.current.style.opacity = "0";
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setVideoEnded(true);
      });

      const timer = setTimeout(() => {
        setVideoEnded(true);
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, []);

  /*
   * Copy estructurado con Jobs To Be Done:
   * situation → la aspiración del comprador ("Imagina...")
   * headline  → el progreso que el cliente quiere lograr
   * outcome   → el resultado medible
   */
  const products = [
    {
      id: 1,
      name: "Bengala Mercadeo",
      number: "01",
      situation: "Imagina que tu equipo solo habla con clientes listos para comprar…",
      headline: "Conversa con miles. Cierra con los correctos.",
      body: "Automatiza la prospección, calificación y maduración de clientes del sector financiero, 24/7. Tus asesores reciben oportunidades listas para cerrar.",
      outcome: "Pipeline lleno sin crecer el equipo.",
      tag: "Bancos / Finanzas",
      meta: "Prospección & Ventas",
    },
    {
      id: 3,
      name: "Bengala Workflows",
      number: "02",
      situation: "Imagina cada proceso fluyendo de principio a fin, todos los días…",
      headline: "Dibuja el flujo. Se ejecuta solo.",
      body: "Conecta tus sistemas en un lienzo visual y describe el proceso una vez. Se ejecuta completo, cada vez. Sin código.",
      outcome: "Procesos que fluyen solos.",
      tag: "Negocios / No-Code",
      meta: "Automatización Visual",
    },
  ];

  const method = [
    {
      number: "01",
      title: "Entendemos el trabajo",
      body: "Empezamos por tu proceso, no por la tecnología.",
    },
    {
      number: "02",
      title: "Activas la automatización",
      body: "Con tus reglas y tus sistemas. Tú mantienes el control.",
    },
    {
      number: "03",
      title: "Mides el progreso",
      body: "El éxito no es tener IA. Es trabajo terminado.",
    },
  ];

  const marqueeJobs = [
    "Prospección comercial",
    "Calificación de leads",
    "Seguimiento de clientes",
    "Procesos repetitivos",
    "Reportes operativos",
    "Integración de sistemas",
  ];

  // Custom product logomarks: abstract geometric letters M / W,
  // color-harmonized with the main Bengala mark (light ink for dark backgrounds)
  const renderProductMark = (id: number, isActive: boolean) => {
    if (id === 1) {
      return (
        <svg className="w-10 h-10 lg:w-12 lg:h-12 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" viewBox="0 0 140 151" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="30" width="35" height="121" fill="#EF3333" className={`transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-90"}`} />
          <polygon points="35,30 70,65 70,105 35,70" fill="#FCB641" />
          <polygon points="105,30 70,65 70,105 105,70" fill="#FAF9F6" />
          <rect x="105" y="30" width="35" height="121" fill="#EF3333" className={`transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-90"}`} />
          <rect x="52.5" y="110" width="35" height="41" fill="#FCB641" />
        </svg>
      );
    }
    return (
      <svg className="w-10 h-10 lg:w-12 lg:h-12 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" viewBox="0 0 140 151" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="35" height="121" fill="#EF3333" className={`transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-90"}`} />
        <polygon points="35,86 70,121 70,151 35,116" fill="#FAF9F6" />
        <polygon points="105,86 70,121 70,151 105,116" fill="#FCB641" />
        <rect x="105" y="0" width="35" height="121" fill="#EF3333" className={`transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-90"}`} />
        <rect x="52.5" y="30" width="35" height="55" fill="#FAF9F6" />
      </svg>
    );
  };

  return (
    <main className="relative min-h-[100dvh] w-full flex flex-col overflow-x-hidden bg-background text-foreground font-sans selection:bg-accent selection:text-white">

      {/* Dynamic Background Glow (Soft Warm Red) */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 w-[800px] h-[800px] -mt-[400px] -ml-[400px] rounded-full mix-blend-multiply transition-opacity duration-[1500ms] ease-out z-30"
        style={{
          background: "radial-gradient(circle, rgba(239,51,51,0.04) 0%, rgba(252,182,65,0.01) 35%, rgba(239,51,51,0) 65%)",
          opacity: 0,
          willChange: "transform",
        }}
      />

      {/* Noise Overlay */}
      <div
        className="fixed inset-0 z-50 opacity-[0.05] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? "bg-background/75 backdrop-blur-xl border-b border-border/60" : "bg-transparent border-b border-transparent"
        }`}>
        <div className={`w-full px-6 md:px-16 flex items-center justify-between transition-all duration-700 ${scrolled ? "py-4 md:py-5" : "py-8 md:py-10"}`}>
          <div className={`transition-all duration-[2000ms] delay-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
            <a href="#" aria-label="Bengala AI — inicio">
              <Image
                src="/logo.svg"
                alt="Bengala AI | Automatización Inteligente de Procesos"
                width={140}
                height={32}
                className="h-6 md:h-7 w-auto opacity-95 transition-opacity hover:opacity-100"
                priority
              />
            </a>
          </div>

          <div className={`flex items-center gap-6 md:gap-10 transition-all duration-[2000ms] delay-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
            <div className="hidden md:flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-[10px] md:text-xs tracking-[0.4em] font-mono uppercase text-foreground/50">
                Ecosistema
              </span>
            </div>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSePtcG7HS9nhOXR2Ho0TzUJPwnOmUyIKkx4auAg3RhUZSdUwQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-xs md:text-sm font-medium tracking-wide text-foreground"
            >
              Hablemos
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <span className="ml-1 text-accent inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <header className="relative min-h-[100dvh] w-full flex flex-col">

        {/* Background Media */}
        <div className="absolute inset-0 z-0 bg-background flex items-center justify-center pointer-events-none overflow-hidden">
          <video
            ref={videoRef}
            className={`w-full h-full object-cover transition-all duration-[3000ms] ease-in-out scale-105 mix-blend-multiply ${videoEnded ? "opacity-0 blur-sm scale-110" : "opacity-[0.07] blur-0 scale-105"
              }`}
            src="/Black_and_White_Flair_Video.mp4"
            muted
            playsInline
            title="Fondo animado abstracto y fluido de Bengala AI"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_90%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
        </div>

        {/* Editorial Vertical Gridlines */}
        <div className={`absolute top-0 left-6 md:left-12 w-[1px] h-full bg-border/40 transition-all duration-[3000ms] delay-700 origin-top pointer-events-none z-20 ${isLoaded ? "scale-y-100" : "scale-y-0"}`} />
        <div className={`absolute top-0 right-6 md:right-12 w-[1px] h-full bg-border/40 transition-all duration-[3000ms] delay-[900ms] origin-bottom pointer-events-none z-20 ${isLoaded ? "scale-y-100" : "scale-y-0"}`} />

        {/* Decorative Lines */}
        <div className={`absolute top-1/4 left-16 w-[1px] h-32 bg-gradient-to-b from-border/0 via-border/60 to-border/0 transition-all duration-[3000ms] delay-1000 ${isLoaded ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 origin-top"}`} />
        <div className={`absolute bottom-1/4 right-16 w-[1px] h-48 bg-gradient-to-b from-border/0 via-border/60 to-border/0 transition-all duration-[3000ms] delay-[1200ms] ${isLoaded ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 origin-bottom"}`} />

        <div className="relative z-10 flex-1 flex flex-col justify-end w-full max-w-[1800px] mx-auto px-6 md:px-16 pt-32 pb-16 md:pb-24">

          <div className={`mb-8 md:mb-12 transition-all duration-[2000ms] delay-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-[10px] md:text-xs tracking-[0.4em] font-mono uppercase text-accent">
              Automatización inteligente
            </span>
          </div>

          <h1 className="text-[3rem] leading-[1.05] sm:text-[4rem] md:text-[5.5rem] lg:text-[7.5rem] lg:leading-[0.95] tracking-[-0.03em] font-sans text-foreground max-w-[18ch]">
            <span className="block overflow-hidden pb-1 lg:pb-3">
              <span className={`block font-medium transition-transform duration-[2000ms] delay-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? "translate-y-0" : "translate-y-[120%]"}`}>
                La certeza
              </span>
            </span>
            <span className="block overflow-hidden pb-1 lg:pb-3">
              <span className={`block text-foreground/50 italic font-light pr-4 transition-transform duration-[2000ms] delay-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? "translate-y-0" : "translate-y-[120%]"}`}>
                de que el trabajo
              </span>
            </span>
            <span className="block overflow-hidden pb-2 lg:pb-4">
              <span className={`block font-extrabold transition-transform duration-[2000ms] delay-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? "translate-y-0" : "translate-y-[120%]"}`}>
                está hecho<span className="text-accent font-sans">.</span>
              </span>
            </span>
          </h1>

          <div className={`mt-8 md:mt-12 flex flex-col md:flex-row md:items-end justify-between gap-10 transition-all duration-[2000ms] delay-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <p className="max-w-md text-base md:text-lg font-light text-foreground/55 leading-relaxed">
              Mientras tú decides lo que sigue, tus procesos corren solos,
              de principio a fin.
            </p>

            <div className="flex items-center gap-8 shrink-0">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSePtcG7HS9nhOXR2Ho0TzUJPwnOmUyIKkx4auAg3RhUZSdUwQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 text-sm md:text-base font-medium text-white bg-foreground px-7 py-4 rounded-full overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]"
              >
                <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="relative">Automatiza tu primer proceso</span>
                <span className="relative inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </a>
              <a
                href="#automatizaciones"
                className="group hidden sm:inline-flex items-center gap-2 text-sm font-light text-foreground/50 hover:text-foreground transition-colors duration-300"
              >
                Descubre las automatizaciones
                <span className="inline-block transition-transform duration-500 group-hover:translate-y-1">↓</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ============ MARQUEE (dark): los procesos que automatizas ============ */}
      <section aria-label="Procesos que Bengala automatiza por ti" className="relative z-10 py-5 md:py-6 overflow-hidden bg-foreground text-background">
        <div className="flex w-max animate-marquee" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {marqueeJobs.map((job) => (
                <span key={`${copy}-${job}`} className="flex items-center text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-background/50 whitespace-nowrap">
                  <span className="px-6 md:px-10">{job}</span>
                  <span className="text-accent">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
        <p className="sr-only">{marqueeJobs.join(", ")}</p>
      </section>

      {/* ============ MANIFIESTO ============ */}
      <section className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-16 py-28 md:py-44">
        <Reveal>
          <span className="block text-[10px] md:text-xs tracking-[0.4em] font-mono uppercase text-foreground/40 mb-10 md:mb-14">
            Por qué existimos
          </span>
        </Reveal>
        <Reveal delay={100}>
          <p className="max-w-5xl text-3xl sm:text-4xl md:text-6xl leading-snug md:leading-tight tracking-tight font-light text-foreground/85">
            <span className="font-semibold text-foreground">
              Tu equipo fue contratado para pensar.
            </span>{" "}
            <span className="italic text-foreground/50">
              Lo demás corre en automático.
            </span>
          </p>
        </Reveal>
      </section>

      {/* ============ AUTOMATIZACIONES / PRODUCTOS (dark) ============ */}
      <section id="automatizaciones" aria-labelledby="products-heading" className="relative z-10 bg-foreground text-background">
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-16 py-28 md:py-40">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-background/15 pb-10 md:pb-14 mb-4">
              <div>
                <h2 id="products-heading" className="text-4xl sm:text-5xl md:text-7xl tracking-tight font-medium">
                  Un proceso. Una automatización. Hecho<span className="text-accent">.</span>
                </h2>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col">
            {products.map((product, index) => (
              <Reveal key={product.id} delay={index * 100}>
                <article
                  onMouseEnter={() => setActiveProduct(product.id)}
                  onMouseLeave={() => setActiveProduct(null)}
                  className={`group relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 border-b border-background/15 py-12 md:py-16 px-4 md:px-6 -mx-4 md:-mx-6 rounded-lg transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${activeProduct !== null && activeProduct !== product.id ? "opacity-50" : "opacity-100"
                    }`}
                  style={{
                    background:
                      activeProduct === product.id
                        ? "linear-gradient(135deg, rgba(239,51,51,0.08) 0%, rgba(252,182,65,0.02) 100%)"
                        : undefined,
                  }}
                >
                  {/* Active sweep top border */}
                  <div className={`absolute top-0 left-0 h-[2px] bg-accent transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeProduct === product.id ? "w-full opacity-100" : "w-0 opacity-0"
                    }`} />

                  {/* Col 1: number + situation (la aspiración del comprador) */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    <span className={`text-xs font-mono tracking-wider tabular-nums transition-colors duration-500 ${activeProduct === product.id ? "text-accent-gold font-semibold" : "text-background/35"
                      }`}>
                      {product.number}
                    </span>
                    <p className="text-lg md:text-2xl italic font-light text-background/45 leading-snug max-w-md">
                      {product.situation}
                    </p>
                  </div>

                  {/* Col 2: la automatización y el progreso que entrega */}
                  <div className="lg:col-span-7 flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeProduct === product.id ? "rotate-[-6deg] scale-110" : ""}`}>
                        {renderProductMark(product.id, activeProduct === product.id)}
                      </div>
                      <h3 className="text-lg md:text-xl tracking-tight">
                        <span className="font-semibold text-background">Bengala</span>{" "}
                        <span className={`font-normal transition-colors duration-500 ${activeProduct === product.id ? "text-accent-gold" : "text-background/70"
                          }`}>
                          {product.name.split(" ")[1]}
                        </span>
                      </h3>
                      <span className={`text-accent-gold text-base transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeProduct === product.id ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                        }`}>
                        →
                      </span>
                    </div>

                    <p className="text-2xl md:text-4xl font-medium tracking-tight leading-tight max-w-2xl mb-5">
                      {product.headline}
                    </p>

                    <p className="text-sm md:text-base text-background/55 leading-relaxed font-light max-w-2xl mb-6">
                      {product.body}
                    </p>

                    <p className="text-sm md:text-base font-medium text-background mb-7">
                      <span className="text-accent mr-2">—</span>
                      {product.outcome}
                    </p>

                    <div className="flex gap-2 flex-wrap">
                      <span className={`px-2.5 py-1 text-[9px] md:text-[10px] font-mono tracking-wider rounded border transition-all duration-500 uppercase ${activeProduct === product.id
                        ? "bg-accent/15 border-accent/30 text-accent-light font-medium"
                        : "bg-background/5 border-background/15 text-background/40"
                        }`}>
                        {product.tag}
                      </span>
                      <span className={`px-2.5 py-1 text-[9px] md:text-[10px] font-mono tracking-wider rounded border transition-all duration-500 uppercase ${activeProduct === product.id
                        ? "bg-accent-gold/15 border-accent-gold/25 text-accent-gold font-medium"
                        : "bg-background/5 border-background/15 text-background/40"
                        }`}>
                        {product.meta}
                      </span>
                    </div>
                  </div>

                  {product.id === 1 && (
                    <p className="sr-only">
                      Bengala Mercadeo utiliza Modelos de Lenguaje de Gran Escala (LLM), procesamiento de lenguaje natural (NLP) y pipelines de datos altamente seguros para automatizar flujos de adquisición de clientes y prospección de ventas, garantizando conformidad normativa bancaria y conversión financiera óptima.
                    </p>
                  )}
                  {product.id === 3 && (
                    <p className="sr-only">
                      Bengala Workflows permite la creación de integraciones complejas sin código (No-Code AI Workflows), conectando APIs empresariales, bases de datos y servicios de inteligencia artificial mediante una interfaz interactiva de automatización visual.
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MÉTODO ============ */}
      <section id="metodo" aria-labelledby="method-heading" className="relative z-10">
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-16 py-28 md:py-40">
          <Reveal>
            <span className="block text-[10px] md:text-xs tracking-[0.4em] font-mono uppercase text-accent mb-6">
              Cómo trabajamos
            </span>
            <h2 id="method-heading" className="text-3xl sm:text-4xl md:text-6xl tracking-tight font-medium max-w-[18ch] mb-16 md:mb-24">
              Tan simple como encender un interruptor<span className="text-accent">.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
            {method.map((step, index) => (
              <Reveal key={step.number} delay={index * 150}>
                <div className="flex flex-col gap-5 border-t border-border pt-8 h-full">
                  <span className="text-xs font-mono tracking-wider text-accent tabular-nums">
                    {step.number}
                  </span>
                  <h3 className="text-xl md:text-2xl font-medium tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base font-light text-foreground/55 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section id="contacto" aria-labelledby="contact-heading" className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-16 py-32 md:py-48 text-center">
        <Reveal>
          <span className="block text-[10px] md:text-xs tracking-[0.4em] font-mono uppercase text-accent mb-10">
            Empieza hoy
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 id="contact-heading" className="text-[2.5rem] leading-[1.05] sm:text-6xl md:text-8xl tracking-[-0.03em] font-medium max-w-[16ch] mx-auto">
            ¿Qué proceso automatizas{" "}
            <span className="italic font-light text-foreground/50">primero</span>
            <span className="text-accent">?</span>
          </h2>
        </Reveal>
        <Reveal delay={250}>
          <p className="mt-10 text-base md:text-lg font-light text-foreground/50 max-w-md mx-auto leading-relaxed">
            Cuéntanoslo. Te responden personas, no bots.
          </p>
        </Reveal>
        <Reveal delay={400}>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSePtcG7HS9nhOXR2Ho0TzUJPwnOmUyIKkx4auAg3RhUZSdUwQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 mt-12 text-2xl sm:text-3xl md:text-5xl font-medium tracking-tight text-foreground"
          >
            <span className="relative">
              hola@bengala.ai
              <span className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-[2px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </span>
            <span className="inline-block transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:-translate-y-2 text-accent">
              ↗
            </span>
          </a>
        </Reveal>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="relative z-10 border-t border-border/60">
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <Image
            src="/logo.svg"
            alt="Bengala AI"
            width={110}
            height={26}
            className="h-5 w-auto opacity-80"
          />
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-xs font-light text-foreground/40 tracking-wide text-center">
              © {new Date().getFullYear()} Bengala AI — Automatización que hace el trabajo.
            </p>
            <div className="flex items-center gap-6 text-xs font-light text-foreground/40">
              <a href="/politica-de-privacidad" className="hover:text-accent transition-colors">
                Política de Privacidad
              </a>
              <a href="/terminos-y-condiciones" className="hover:text-accent transition-colors">
                Términos y Condiciones
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="relative flex h-1.5 w-1.5">
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
            </span>
            <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-foreground/40">
              Ecosistema activo
            </span>
          </div>
        </div>
      </footer>

      {/* Dynamic SEO JSON-LD Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Corporation",
                "@id": "https://bengala.ai/#organization",
                "name": "Bengala AI",
                "url": "https://bengala.ai",
                "logo": "https://bengala.ai/logo.svg",
                "image": "https://bengala.ai/og-image.jpg",
                "description": "Automatización inteligente que toma la prospección y los procesos repetitivos de tu operación — y los termina.",
                "email": "hola@bengala.ai",
                "knowsAbout": [
                  "Artificial Intelligence",
                  "Workflow Automation",
                  "Business Process Automation",
                  "Fintech Automation",
                  "Natural Language Processing",
                  "No-Code Automation"
                ],
                "sameAs": [
                  "https://twitter.com/bengala_ai",
                  "https://github.com/Bengala-Labs"
                ],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Servicios de Automatización Inteligente",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "SoftwareApplication",
                        "name": "Bengala Mercadeo",
                        "applicationCategory": "BusinessApplication",
                        "operatingSystem": "All",
                        "description": "Automatización conversacional que prospecta, califica y madura clientes del sector financiero las 24 horas.",
                        "brand": {
                          "@type": "Brand",
                          "name": "Bengala AI"
                        },
                        "offers": {
                          "@type": "Offer",
                          "price": "Contact for pricing",
                          "priceCurrency": "EUR"
                        }
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "SoftwareApplication",
                        "name": "Bengala Workflows",
                        "applicationCategory": "BusinessApplication",
                        "operatingSystem": "All",
                        "description": "Lienzo visual no-code donde describes un proceso una vez y se ejecuta completo, cada vez.",
                        "brand": {
                          "@type": "Brand",
                          "name": "Bengala AI"
                        },
                        "offers": {
                          "@type": "Offer",
                          "price": "Contact for pricing",
                          "priceCurrency": "EUR"
                        }
                      }
                    }
                  ]
                }
              },
              {
                "@type": "WebSite",
                "@id": "https://bengala.ai/#website",
                "url": "https://bengala.ai",
                "name": "Bengala AI",
                "description": "Plataforma de Automatización Inteligente",
                "publisher": {
                  "@id": "https://bengala.ai/#organization"
                }
              }
            ]
          })
        }}
      />
    </main>
  );
}
