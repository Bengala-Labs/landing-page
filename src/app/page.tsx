"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

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

    // Start animation loop
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
    // Slight delay for initial entrance animation smoothness
    const t = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(t);
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

  const products = [
    {
      id: 1,
      name: "Bengala Mercadeo",
      description: "Agente conversacional autónomo para prospección y ventas en el sector financiero.",
      number: "01",
      tag: "Bancos / Finanzas",
      meta: "Prospección & Ventas"
    },
    {
      id: 2,
      name: "Bengala Compras",
      description: "Plataforma inteligente para la automatización de licitaciones y compras públicas.",
      number: "02",
      tag: "Gobierno / Estado",
      meta: "Licitación Autónoma"
    },
    {
      id: 3,
      name: "Bengala Workflows",
      description: "Entorno visual intuitivo para orquestar flujos de trabajo y automatizaciones con IA.",
      number: "03",
      tag: "Negocios / No-Code",
      meta: "Orquestación IA"
    }
  ];

  // Awwwards-winning custom product logomarks.
  // Each mark is a unique color-harmonized geometric layout styled exactly like the main Bengala mark
  // forming abstract letters: M (Mercadeo), C (Compras), W (Workflows)
  const renderProductMark = (id: number, isActive: boolean) => {
    if (id === 1) {
      // Bengala Mercadeo: Geometric 'M' block in Crimson and Gold
      return (
        <svg className="w-8 h-8 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" viewBox="0 0 140 151" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Left Pillar */}
          <rect x="0" y="30" width="35" height="121" fill="#EF3333" className={`transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-90"}`} />
          {/* Left slant block */}
          <polygon points="35,30 70,65 70,105 35,70" fill="#FCB641" />
          {/* Right slant block */}
          <polygon points="105,30 70,65 70,105 105,70" fill="#0D1421" />
          {/* Right Pillar */}
          <rect x="105" y="30" width="35" height="121" fill="#EF3333" className={`transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-90"}`} />
          {/* Bottom Center node */}
          <rect x="52.5" y="110" width="35" height="41" fill="#FCB641" />
        </svg>
      );
    }
    if (id === 2) {
      // Bengala Compras: Geometric 'C' block in Crimson and Slate Blue
      return (
        <svg className="w-8 h-8 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" viewBox="0 0 140 151" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Top block */}
          <rect x="0" y="0" width="140" height="35" fill="#EF3333" className={`transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-90"}`} />
          {/* Left Pillar */}
          <rect x="0" y="35" width="35" height="81" fill="#0D1421" />
          {/* Bottom block */}
          <rect x="0" y="116" width="140" height="35" fill="#EF3333" className={`transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-90"}`} />
          {/* Inner right core block */}
          <rect x="105" y="81" width="35" height="35" fill="#FCB641" />
          {/* Inner top left core block */}
          <polygon points="35,35 70,35 70,70 35,70" fill="#FCB641" />
        </svg>
      );
    }
    // Bengala Workflows: Geometric 'W' block in Crimson and Dark Ink
    return (
      <svg className="w-8 h-8 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" viewBox="0 0 140 151" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left Pillar */}
        <rect x="0" y="0" width="35" height="121" fill="#EF3333" className={`transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-90"}`} />
        {/* Left slant slant */}
        <polygon points="35,86 70,121 70,151 35,116" fill="#0D1421" />
        {/* Right slant slant */}
        <polygon points="105,86 70,121 70,151 105,116" fill="#FCB641" />
        {/* Right Pillar */}
        <rect x="105" y="0" width="35" height="121" fill="#EF3333" className={`transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-90"}`} />
        {/* Center top node */}
        <rect x="52.5" y="30" width="35" height="55" fill="#0D1421" />
      </svg>
    );
  };

  return (
    <main className="relative min-h-[100dvh] w-screen flex flex-col overflow-x-hidden bg-background text-foreground font-sans selection:bg-accent selection:text-white">

      {/* Dynamic Background Glow (Soft Warm Red) - Ambient effect that tracks coordinates in negative space */}
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

      {/* Editorial Vertical Gridlines */}
      <div className={`absolute top-0 left-12 w-[1px] h-full bg-border/40 transition-all duration-[3000ms] delay-700 origin-top pointer-events-none z-20 ${isLoaded ? "scale-y-100" : "scale-y-0"}`} />
      <div className={`absolute top-0 right-12 w-[1px] h-full bg-border/40 transition-all duration-[3000ms] delay-[900ms] origin-bottom pointer-events-none z-20 ${isLoaded ? "scale-y-100" : "scale-y-0"}`} />

      {/* Navigation Layer */}
      <nav className="absolute top-0 left-0 right-0 z-40">
        <div className="w-full px-6 py-8 md:px-16 md:py-10 flex items-center justify-between">
          <div className={`transition-all duration-[2000ms] delay-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
            <Image
              src="/logo.svg"
              alt="Bengala AI | Ecosistema de Agentes de Inteligencia Artificial"
              width={140}
              height={32}
              className="h-6 md:h-8 w-auto opacity-95 transition-opacity hover:opacity-100"
              priority
            />
          </div>
          
          {/* Ecosistema Label with Pulsing Agent Dot */}
          <div className={`flex items-center gap-3 transition-all duration-[2000ms] delay-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-[10px] md:text-xs tracking-[0.4em] font-mono uppercase text-foreground/50">
              Ecosistema
            </span>
          </div>
        </div>
      </nav>

      {/* Background Media */}
      <div className="fixed inset-0 z-0 bg-background flex items-center justify-center pointer-events-none">
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-all duration-[3000ms] ease-in-out scale-105 mix-blend-multiply ${
            videoEnded ? "opacity-0 blur-sm scale-110" : "opacity-[0.07] blur-0 scale-105"
          }`}
          src="/Black_and_White_Flair_Video.mp4"
          muted
          playsInline
          title="Fondo animativo abstracto y fluido de Bengala AI"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_90%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
      </div>

      {/* Abstract Design Elements - Decorative Lines */}
      <div className={`absolute top-1/4 left-16 w-[1px] h-32 bg-gradient-to-b from-border/0 via-border/60 to-border/0 transition-all duration-[3000ms] delay-1000 ${isLoaded ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 origin-top"}`} />
      <div className={`absolute bottom-1/4 right-16 w-[1px] h-48 bg-gradient-to-b from-border/0 via-border/60 to-border/0 transition-all duration-[3000ms] delay-[1200ms] ${isLoaded ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 origin-bottom"}`} />

      {/* Main Content */}
      <div className="relative z-10 w-full flex-1 flex flex-col pt-24 pb-8 px-6 md:pt-36 md:pb-20 md:px-16">

        <div className="mt-auto flex flex-col lg:flex-row lg:items-end justify-between w-full max-w-[1800px] mx-auto gap-12 lg:gap-24">

          {/* Typography Section */}
          <div className={`flex-1 transition-all duration-[2000ms] delay-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"}`}>
            <h1 className="text-[2.75rem] leading-[1.1] sm:text-[3.5rem] sm:leading-[1.05] md:text-[5rem] lg:text-[7rem] lg:leading-[0.95] tracking-[-0.03em] font-sans text-foreground">
              <span className="block overflow-hidden pb-1 lg:pb-3">
                <span className={`block font-medium transition-transform duration-[2000ms] delay-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? "translate-y-0" : "translate-y-[120%]"}`}>
                  Evolucionando
                </span>
              </span>
              <span className="block overflow-hidden pb-1 lg:pb-3">
                <span className={`block text-foreground/50 italic font-light pr-4 transition-transform duration-[2000ms] delay-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? "translate-y-0" : "translate-y-[120%]"}`}>
                  operaciones con
                </span>
              </span>
              <span className="block overflow-hidden pb-2 lg:pb-4">
                <span className={`block font-extrabold transition-transform duration-[2000ms] delay-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? "translate-y-0" : "translate-y-[120%]"}`}>
                  agentes IA<span className="text-accent font-sans">.</span>
                </span>
              </span>
            </h1>

            {/* Contact Info with Premium Hover Underline */}
            <div className={`mt-8 sm:mt-12 lg:mt-20 transition-all duration-[2000ms] delay-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
              <p className="text-sm lg:text-base font-light text-foreground/45 tracking-wider">
                Escríbenos al{" "}
                <a
                  href="mailto:hola@bengala.ai"
                  className="relative inline-flex items-center gap-1 text-foreground font-medium group transition-colors duration-300"
                >
                  <span className="relative">
                    hola@bengala.ai
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  </span>
                  <span className="inline-block transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1 text-accent font-sans">
                    ↗
                  </span>
                </a>
              </p>
            </div>
          </div>

          {/* Awwwards-winning Product Component */}
          <section aria-labelledby="products-heading" className="flex flex-col gap-4 lg:gap-6 lg:w-[500px] shrink-0 pb-4">
            <h2 id="products-heading" className="sr-only">
              Nuestros Productos de Inteligencia Artificial
            </h2>
            {products.map((product, index) => (
              <article
                key={product.id}
                onMouseEnter={() => {
                  setActiveCard(product.id);
                }}
                onMouseLeave={() => {
                  setActiveCard(null);
                }}
                className={`relative flex items-start gap-4 sm:gap-6 border-t pt-6 sm:pt-7 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] px-5 py-6 rounded-lg cursor-pointer ${
                  activeCard === null
                    ? "opacity-100 border-t-border/80"
                    : activeCard === product.id
                    ? "opacity-100 border-t-accent/40 shadow-[0_20px_40px_rgba(239,51,51,0.015)] translate-x-2"
                    : "opacity-60 border-t-border/30"
                }`}
                style={{
                  // Clear delay after initial load to make hover effect triggers instant
                  transitionDelay: isLoaded ? "0ms" : `${1300 + (index * 150)}ms`,
                  opacity: isLoaded ? undefined : 0,
                  transform: isLoaded ? undefined : 'translateY(30px)',
                  background: activeCard === product.id
                    ? "linear-gradient(135deg, rgba(239,51,51,0.02) 0%, rgba(252,182,65,0.005) 100%)"
                    : undefined
                }}
              >
                {/* Micro-line active sweep top border */}
                <div className={`absolute top-0 left-0 h-[2px] bg-accent transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  activeCard === product.id ? "w-full opacity-100" : "w-0 opacity-0"
                }`} />

                {/* Left Column: Product index number */}
                <div className="flex flex-col items-center shrink-0 pt-1">
                  <div className={`text-[10px] font-mono tracking-wider tabular-nums transition-colors duration-500 ${
                    activeCard === product.id ? "text-accent font-semibold animate-pulse" : "text-foreground/35"
                  }`}>
                    {product.number}
                  </div>
                </div>
                
                {/* Card Text Content */}
                <div className="flex flex-col flex-1">
                  
                  {/* Brand Combined Logo: Mark + Product Name (styled exactly like logo.svg) */}
                  <div className="flex items-center gap-3 mb-2.5">
                    {renderProductMark(product.id, activeCard === product.id)}
                    <div className="flex items-baseline gap-1.5 justify-between w-full">
                      <h3 className="text-base sm:text-lg lg:text-xl tracking-tight transition-all duration-500">
                        <span className="font-semibold text-foreground">Bengala</span>{" "}
                        <span className={`font-normal transition-colors duration-500 ${
                          activeCard === product.id ? "text-accent" : "text-foreground/70"
                        }`}>
                          {product.name.split(" ")[1]}
                        </span>
                      </h3>
                      
                      {/* Subtle micro-arrow indicator */}
                      <span className={`text-accent text-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
                        activeCard === product.id ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                      }`}>
                        →
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm lg:text-[14.5px] text-foreground/50 leading-relaxed font-light transition-colors duration-500">
                    {product.description}
                  </p>
                  
                  {product.id === 1 && (
                    <p className="sr-only">
                      Bengala Mercadeo utiliza Modelos de Lenguaje de Gran Escala (LLM), procesamiento de lenguaje natural (NLP) y pipelines de datos altamente seguros para automatizar flujos de adquisición de clientes y prospección de ventas, garantizando conformidad normativa bancaria y conversión financiera óptima.
                    </p>
                  )}
                  {product.id === 2 && (
                    <p className="sr-only">
                      Bengala Compras integra agentes de inteligencia artificial y automatización robótica (RPA) capaces de analizar pliegos de condiciones técnicas de contratación pública, optimizando la preparación y presentación de ofertas licitatorias para contratos del Estado.
                    </p>
                  )}
                  {product.id === 3 && (
                    <p className="sr-only">
                      Bengala Workflows permite la creación de integraciones complejas sin código (No-Code AI Workflows), conectando APIs empresariales, bases de datos y agentes autónomos cognitivos mediante una interfaz interactiva de orquestación visual.
                    </p>
                  )}

                  {/* High-end Technical metadata pill tags */}
                  <div className="flex gap-2 mt-4 flex-wrap">
                    <span className={`px-2 py-0.5 text-[9px] font-mono tracking-wider rounded border transition-all duration-500 uppercase ${
                      activeCard === product.id 
                        ? "bg-accent/10 border-accent/20 text-accent font-medium" 
                        : "bg-foreground/5 border-foreground/10 text-foreground/40"
                    }`}>
                      {product.tag}
                    </span>
                    <span className={`px-2 py-0.5 text-[9px] font-mono tracking-wider rounded border transition-all duration-500 uppercase ${
                      activeCard === product.id 
                        ? "bg-accent-gold/15 border-accent-gold/25 text-accent-gold font-medium" 
                        : "bg-foreground/5 border-foreground/10 text-foreground/40"
                    }`}>
                      {product.meta}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </section>

        </div>
      </div>

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
                "description": "Evolucionando operaciones empresariales y estatales con agentes autónomos de Inteligencia Artificial.",
                "email": "hola@bengala.ai",
                "knowsAbout": [
                  "Artificial Intelligence",
                  "Autonomous AI Agents",
                  "Workflow Automation",
                  "Fintech Automation",
                  "Public Procurement Automation",
                  "Natural Language Processing",
                  "Multi-Agent Orchestration"
                ],
                "sameAs": [
                  "https://twitter.com/bengala_ai",
                  "https://github.com/Bengala-Labs"
                ],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Servicios de Automatización Cognitiva",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "SoftwareApplication",
                        "name": "Bengala Mercadeo",
                        "applicationCategory": "BusinessApplication",
                        "operatingSystem": "All",
                        "description": "Agente conversacional autónomo para prospección y ventas en el sector financiero.",
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
                        "name": "Bengala Compras",
                        "applicationCategory": "BusinessApplication",
                        "operatingSystem": "All",
                        "description": "Plataforma inteligente para la automatización de licitaciones y compras públicas.",
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
                        "description": "Entorno visual intuitivo para orquestar flujos de trabajo y automatizaciones con IA.",
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
                "description": "Ecosistema de Agentes de Inteligencia Artificial",
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
