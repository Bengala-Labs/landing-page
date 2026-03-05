"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
      name: "Para bancos",
      description: "Agente conversacional autónomo para prospección y ventas en el sector financiero.",
      number: "01",
    },
    {
      id: 2,
      name: "Para gobiernos",
      description: "Plataforma inteligente para la automatización de licitaciones y compras públicas.",
      number: "02",
    },
    {
      id: 3,
      name: "Para negocios",
      description: "Entorno visual intuitivo para orquestar flujos de trabajo y automatizaciones con IA.",
      number: "03",
    }
  ];

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#080414] text-white font-sans select-none pointer-events-none">

      {/* Noise Overlay */}
      <div
        className="absolute inset-0 z-50 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Navigation Layer */}
      <nav className="absolute top-0 left-0 right-0 z-40">
        <div className="w-full px-6 py-8 md:px-12 md:py-12 flex items-center justify-between">
          <div className={`transition-all duration-[2000ms] delay-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
            <Image
              src="/logo_light.svg"
              alt="Bengala"
              width={140}
              height={32}
              className="h-6 md:h-8 w-auto opacity-90"
              priority
            />
          </div>
          <div className={`text-[10px] md:text-xs tracking-[0.4em] font-mono uppercase text-white/40 transition-all duration-[2000ms] delay-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
            Ecosistema
          </div>
        </div>
      </nav>

      {/* Background Media */}
      <div className="absolute inset-0 z-0 bg-[#080414] flex items-center justify-center">
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-all duration-[3000ms] ease-in-out scale-105 ${videoEnded ? "opacity-0 blur-sm scale-110" : "opacity-25 blur-0 scale-105"
            }`}
          src="/Black_and_White_Flair_Video.mp4"
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#080414_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080414]/60 to-[#080414]" />
      </div>

      {/* Abstract Design Elements */}
      <div className={`absolute top-1/4 left-12 w-[1px] h-32 bg-gradient-to-b from-white/0 via-white/20 to-white/0 transition-all duration-[3000ms] delay-1000 ${isLoaded ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 origin-top"}`} />
      <div className={`absolute bottom-1/4 right-12 w-[1px] h-48 bg-gradient-to-b from-white/0 via-white/20 to-white/0 transition-all duration-[3000ms] delay-[1200ms] ${isLoaded ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 origin-bottom"}`} />

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end px-6 pb-16 md:px-12 md:pb-24">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between w-full max-w-[1800px] mx-auto gap-16 lg:gap-24">

          {/* Typography Section */}
          <div className={`flex-1 transition-all duration-[2000ms] delay-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"}`}>
            <h1 className="text-[3.5rem] leading-[1.05] md:text-[5rem] lg:text-[7.5rem] lg:leading-[0.95] tracking-[-0.03em] font-medium text-white/95 mix-blend-plus-lighter">
              <span className="block overflow-hidden pb-1 lg:pb-3">
                <span className={`block transition-transform duration-[2000ms] delay-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? "translate-y-0" : "translate-y-[120%]"}`}>Evolucionando</span>
              </span>
              <span className="block overflow-hidden pb-1 lg:pb-3">
                <span className={`block text-white/40 italic font-light pr-4 transition-transform duration-[2000ms] delay-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? "translate-y-0" : "translate-y-[120%]"}`}>operaciones con</span>
              </span>
              <span className="block overflow-hidden">
                <span className={`block transition-transform duration-[2000ms] delay-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? "translate-y-0" : "translate-y-[120%]"}`}>agentes IA.</span>
              </span>
            </h1>

            {/* Contact Info */}
            <div className={`mt-12 lg:mt-24 transition-all duration-[2000ms] delay-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
              <p className="text-sm lg:text-base font-light text-white/30 tracking-wider">
                Escríbenos al <span className="text-white/70 font-normal">hola@bengala.ai</span>
              </p>
            </div>
          </div>

          {/* Minimal Products List */}
          <div className="flex flex-col gap-6 lg:gap-10 lg:w-[480px] shrink-0">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`flex items-start gap-6 border-t border-white/10 pt-6 transition-all duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)]`}
                style={{
                  transitionDelay: `${1400 + (index * 200)}ms`,
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(30px)'
                }}
              >
                <div className="text-[10px] lg:text-xs font-mono text-white/30 pt-1 lg:pt-1.5 tabular-nums">
                  {product.number}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg lg:text-2xl font-normal text-white/90 tracking-tight mb-2 lg:mb-3">
                    {product.name}
                  </h3>
                  <p className="text-sm lg:text-base text-white/40 leading-relaxed font-light">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}
