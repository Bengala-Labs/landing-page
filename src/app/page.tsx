import Image from "next/image";
import Nav from "./_components/Nav";
import Reveal from "./_components/Reveal";
import BlockField from "./_components/BlockField";
import TraceCard from "./_components/TraceCard";
import { BlockGlyph } from "./_components/Marks";

const CONTACT_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSePtcG7HS9nhOXR2Ho0TzUJPwnOmUyIKkx4auAg3RhUZSdUwQ/viewform";
const EMAIL = "hola@bengala.ai";

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

const pillars = [
  {
    id: "agentes",
    number: "01",
    title: "Agentes que terminan",
    short: "Agentes",
    glyph: ["RR..", "R.I.", "..IG", "...G"],
    body: "Planifican, usan tus herramientas y se recuperan de sus propios errores en tareas largas y de muchos pasos.",
    points: [
      "Saben cuándo una tarea está realmente terminada.",
      "Se detienen y piden ayuda cuando hace falta.",
    ],
  },
  {
    id: "verificacion",
    number: "02",
    title: "Resultados verificados",
    short: "Verificación",
    glyph: ["I.I.", ".I.I", "I.IR", ".IRG"],
    body: "Medimos resultados, no respuestas. Cada producto comprueba su propio trabajo antes de darlo por hecho.",
    points: [
      "Validación contra tus datos y tus reglas.",
      "Métricas de trabajo completado, no de actividad.",
    ],
  },
  {
    id: "control",
    number: "03",
    title: "Seguridad y control humano",
    short: "Control",
    glyph: [".RR.", "R..R", "R.GR", ".RR."],
    body: "Supervisión, trazabilidad y límites claros para operar en sectores regulados como la banca.",
    points: [
      "Cada decisión queda registrada y es auditable.",
      "Solo los permisos mínimos para actuar.",
    ],
  },
];

const topics = [
  "Agentes autónomos",
  "Uso de herramientas",
  "Integración de sistemas",
  "Verificación",
  "Trazabilidad",
  "Control humano",
  "Seguridad",
];

const method = [
  {
    number: "01",
    title: "Entendemos",
    body: "Empezamos por tu proceso, no por la tecnología.",
  },
  {
    number: "02",
    title: "Construimos",
    body: "Con tus reglas y tus sistemas. Tú mantienes el control.",
  },
  {
    number: "03",
    title: "Verificamos",
    body: "Medimos si el trabajo quedó hecho antes de darlo por terminado.",
  },
  {
    number: "04",
    title: "Mejoramos",
    body: "Lo que aprendemos en la operación vuelve al producto.",
  },
];

const principles = [
  {
    number: "01",
    title: "Hecho para producción",
    body: "Una demo no es un producto. Construimos para la operación diaria, con sus excepciones y sus reglas.",
  },
  {
    number: "02",
    title: "Personas en el circuito",
    body: "La IA amplía el criterio humano. No lo reemplaza en las decisiones que importan.",
  },
  {
    number: "03",
    title: "Utilidad medible",
    body: "El éxito no es tener IA. Es trabajo terminado.",
  },
];

function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`block text-[10px] md:text-xs tracking-[0.28em] md:tracking-[0.4em] font-mono uppercase ${className}`}>
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-[100dvh] w-full flex flex-col overflow-x-hidden bg-background text-foreground font-sans selection:bg-accent selection:text-white">
      {/* Noise overlay */}
      <div
        className="fixed inset-0 z-50 opacity-[0.05] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <Nav contactUrl={CONTACT_URL} />

      {/* ============ HERO ============ */}
      <header className="relative min-h-[100dvh] w-full flex flex-col">
        <div className="absolute inset-0 z-0 animate-fade-in-slow" style={{ animationDelay: "500ms" }}>
          <BlockField tone="light" focus="right" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background pointer-events-none" />
        </div>

        {/* Editorial gridlines */}
        <div className="absolute top-0 left-6 md:left-12 w-[1px] h-full bg-border/50 origin-top animate-grow-y pointer-events-none z-10" style={{ animationDelay: "700ms" }} />
        <div className="absolute top-0 right-6 md:right-12 w-[1px] h-full bg-border/50 origin-bottom animate-grow-y pointer-events-none z-10" style={{ animationDelay: "900ms" }} />

        <div className="relative z-10 flex-1 flex flex-col justify-end w-full max-w-[1800px] mx-auto px-6 md:px-16 pt-36 pb-10 md:pb-14">
          <h1 className="text-[3.1rem] leading-[1.02] sm:text-[4.2rem] md:text-[6rem] lg:text-[8rem] lg:leading-[0.92] tracking-[-0.035em] text-foreground max-w-[14ch]">
            <span className="block overflow-hidden pb-1 lg:pb-3">
              <span className="block font-medium animate-rise" style={{ animationDelay: "900ms" }}>
                Inteligencia
              </span>
            </span>
            <span className="block overflow-hidden pb-1 lg:pb-3">
              <span className="block italic font-light text-foreground/50 pr-4 animate-rise" style={{ animationDelay: "1000ms" }}>
                que termina
              </span>
            </span>
            <span className="block overflow-hidden pb-2 lg:pb-4">
              <span className="block font-extrabold animate-rise" style={{ animationDelay: "1100ms" }}>
                el trabajo<span className="text-accent">.</span>
              </span>
            </span>
          </h1>

          <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end justify-between gap-10 animate-fade-up" style={{ animationDelay: "1400ms" }}>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 shrink-0">
              <a
                href="#enfoque"
                className="group relative inline-flex items-center gap-2 text-sm md:text-base font-medium text-white bg-foreground px-7 py-4 rounded-full overflow-hidden transition-transform duration-500 hover:scale-[1.03]"
              >
                <span className={`absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ${EASE}`} />
                <span className="relative">Descubre cómo</span>
                <span className={`relative inline-block transition-transform duration-500 ${EASE} group-hover:translate-y-1`}>↓</span>
              </a>
              <a
                href="#contacto"
                className="group inline-flex items-center gap-2 text-sm font-light text-foreground/55 hover:text-foreground transition-colors duration-300"
              >
                Cuéntanos tu proceso
                <span className={`inline-block text-accent transition-transform duration-500 ${EASE} group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}>↗</span>
              </a>
            </div>
          </div>

          {/* Pillars index */}
          <nav aria-label="Lo que hace distintos a nuestros productos" className="mt-14 md:mt-20 animate-fade-up" style={{ animationDelay: "1650ms" }}>
            <ul className="grid grid-cols-1 md:grid-cols-3 border-t border-border">
              {pillars.map((pillar, i) => (
                <li key={pillar.id} className={`${i > 0 ? "border-t md:border-t-0 md:border-l" : ""} border-border`}>
                  <a
                    href={`#${pillar.id}`}
                    className="group flex items-center justify-between gap-3 py-4 md:py-5 px-4 md:px-5 hover:bg-foreground/[0.03] transition-colors"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="text-[10px] font-mono text-accent tabular-nums">{pillar.number}</span>
                      <span className="text-sm md:text-[15px] text-foreground/70 group-hover:text-foreground transition-colors">
                        {pillar.short}
                      </span>
                    </span>
                    <span className={`text-foreground/30 group-hover:text-accent transition-all duration-500 ${EASE} group-hover:translate-y-0.5`}>↓</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* ============ MARQUEE ============ */}
      <section aria-label="Capacidades de nuestros productos" className="relative z-10 py-5 md:py-6 overflow-hidden bg-foreground text-background">
        <div className="flex w-max animate-marquee" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {topics.map((topic) => (
                <span key={`${copy}-${topic}`} className="flex items-center text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-background/50 whitespace-nowrap">
                  <span className="px-6 md:px-10">{topic}</span>
                  <span className="inline-block w-1.5 h-1.5 bg-accent" />
                </span>
              ))}
            </div>
          ))}
        </div>
        <p className="sr-only">{topics.join(", ")}</p>
      </section>

      {/* ============ MISIÓN + PRINCIPIOS ============ */}
      <section id="principios" aria-labelledby="mission-heading" className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-16 py-24 md:py-36">
        <Reveal>
          <Eyebrow className="text-foreground/40 mb-10 md:mb-12">Por qué existimos</Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <h2 id="mission-heading" className="max-w-6xl text-3xl sm:text-4xl md:text-6xl leading-snug md:leading-[1.12] tracking-tight font-light text-foreground/85">
            <span className="font-semibold text-foreground">La IA ya sabe responder.</span>{" "}
            <span className="italic text-foreground/50">
              Nosotros hacemos que termine el trabajo
            </span>
            <span className="text-accent">.</span>
          </h2>
        </Reveal>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {principles.map((p, i) => (
            <Reveal key={p.number} delay={i * 100}>
              <div className="group border-t border-border pt-6">
                <span className="block text-xs font-mono tracking-wider text-accent tabular-nums mb-4">{p.number}</span>
                <h3 className="text-lg md:text-xl font-medium tracking-tight mb-3">{p.title}</h3>
                <p className="text-sm md:text-base font-light text-foreground/55 leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ ENFOQUE ============ */}
      <section id="enfoque" aria-labelledby="pillars-heading" className="relative z-10 bg-foreground text-background">
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-16 py-24 md:py-36">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 md:mb-20">
              <div>
                <Eyebrow className="text-accent mb-6">Lo que construimos</Eyebrow>
                <h2 id="pillars-heading" className="text-4xl sm:text-5xl md:text-6xl tracking-tight font-medium leading-[1.05] max-w-[16ch]">
                  Terminar, verificar, rendir cuentas<span className="text-accent">.</span>
                </h2>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-background/15 border border-background/15 rounded-2xl overflow-hidden">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.id} delay={i * 120} className="bg-foreground">
                <article id={pillar.id} className="group relative h-full flex flex-col p-7 md:p-10 lg:p-12">
                  <div className={`absolute top-0 left-0 h-[2px] w-0 bg-accent group-hover:w-full transition-all duration-700 ${EASE}`} />
                  <div className="flex items-center justify-between mb-8 md:mb-10">
                    <BlockGlyph
                      pattern={pillar.glyph}
                      className={`w-10 h-10 md:w-12 md:h-12 text-background transition-transform duration-700 ${EASE} group-hover:rotate-[-6deg] group-hover:scale-110`}
                    />
                    <span className="text-xs font-mono tracking-wider tabular-nums text-background/35 group-hover:text-accent-gold transition-colors duration-500">
                      {pillar.number}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-medium tracking-tight leading-tight mb-4">{pillar.title}</h3>
                  <p className="text-sm md:text-base text-background/60 leading-relaxed font-light mb-8">{pillar.body}</p>
                  <ul className="mt-auto flex flex-col gap-2.5 border-t border-background/10 pt-6">
                    {pillar.points.map((q) => (
                      <li key={q} className="flex items-start gap-3 text-sm text-background/85">
                        <span className="mt-[0.45em] inline-block w-1.5 h-1.5 shrink-0 bg-accent" />
                        {q}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MÉTODO ============ */}
      <section id="metodo" aria-labelledby="method-heading" className="relative z-10">
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-16 py-24 md:py-36 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow className="text-accent mb-6">Cómo trabajamos</Eyebrow>
              <h2 id="method-heading" className="text-3xl sm:text-4xl md:text-6xl tracking-tight font-medium leading-[1.05] max-w-[16ch] mb-12 md:mb-16">
                Del proceso al producto, sin perder el control<span className="text-accent">.</span>
              </h2>
            </Reveal>

            <ol className="flex flex-col">
              {method.map((step, i) => (
                <Reveal key={step.number} delay={i * 120}>
                  <li className="grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_10rem_1fr] gap-x-4 gap-y-2 border-t border-border py-7">
                    <span className="text-xs font-mono tracking-wider text-accent tabular-nums pt-1.5">{step.number}</span>
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight">{step.title}</h3>
                    <p className="col-start-2 md:col-start-3 text-sm md:text-base font-light text-foreground/55 leading-relaxed">
                      {step.body}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-6 lg:sticky lg:top-32">
            <Reveal delay={200}>
              <TraceCard />
              <p className="mt-5 text-sm font-light text-foreground/50 leading-relaxed max-w-md">
                Cada paso queda registrado. El sistema verifica su resultado y pasa a una
                persona lo que no puede resolver.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ CONTACTO ============ */}
      <section id="contacto" aria-labelledby="contact-heading" className="relative z-10 bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 opacity-90">
          <BlockField tone="dark" focus="edges" />
        </div>
        <div className="relative w-full max-w-[1800px] mx-auto px-6 md:px-16 py-28 md:py-40 text-center">
          <Reveal>
            <Eyebrow className="text-accent mb-10">Hablemos</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 id="contact-heading" className="text-[2.5rem] leading-[1.05] sm:text-6xl md:text-8xl tracking-[-0.03em] font-medium max-w-[15ch] mx-auto">
              ¿Qué trabajo debería{" "}
              <span className="italic font-light text-background/50">terminarse solo</span>
              <span className="text-accent">?</span>
            </h2>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
              <a
                href={CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 text-sm md:text-base font-medium text-foreground bg-background px-7 py-4 rounded-full overflow-hidden transition-transform duration-500 hover:scale-[1.03]"
              >
                <span className={`absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ${EASE}`} />
                <span className="relative group-hover:text-white transition-colors duration-500">Cuéntanos tu proceso</span>
                <span className={`relative inline-block group-hover:text-white transition-all duration-500 ${EASE} group-hover:translate-x-1 group-hover:-translate-y-1`}>↗</span>
              </a>
              <a href={`mailto:${EMAIL}`} className="group relative inline-flex items-center gap-2 text-lg md:text-2xl font-medium tracking-tight">
                <span className="relative">
                  {EMAIL}
                  <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${EASE}`} />
                </span>
                <span className={`inline-block text-accent transition-transform duration-500 ${EASE} group-hover:translate-x-1 group-hover:-translate-y-1`}>↗</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="relative z-10 bg-foreground text-background border-t border-background/10">
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-16 py-14 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5 flex flex-col gap-5">
            <Image src="/logo_light.svg" alt="Bengala AI" width={130} height={30} className="h-6 w-auto self-start" />
            <p className="text-sm font-light text-background/45 leading-relaxed max-w-xs">
              Productos de inteligencia artificial que terminan el trabajo.
            </p>
          </div>

          <div className="md:col-span-4 grid grid-cols-2 gap-8 text-sm">
            <ul className="flex flex-col gap-3">
              {[
                ["#principios", "Principios"],
                ["#enfoque", "Lo que construimos"],
                ["#metodo", "Cómo trabajamos"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-background/55 hover:text-accent transition-colors">{label}</a>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-3">
              <li><a href="#contacto" className="text-background/55 hover:text-accent transition-colors">Contacto</a></li>
              <li><a href={`mailto:${EMAIL}`} className="text-background/55 hover:text-accent transition-colors">{EMAIL}</a></li>
              <li>
                <a href="https://github.com/Bengala-Labs" target="_blank" rel="noopener noreferrer" className="text-background/55 hover:text-accent transition-colors">
                  GitHub ↗
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-16 py-6 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-background/40">
          <p>© {new Date().getFullYear()} Bengala Labs SRL</p>
          <div className="flex items-center gap-6">
            <a href="/politica-de-privacidad" className="hover:text-accent transition-colors">Política de Privacidad</a>
            <a href="/terminos-y-condiciones" className="hover:text-accent transition-colors">Términos y Condiciones</a>
          </div>
        </div>
      </footer>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Corporation",
                "@id": "https://bengala.ai/#organization",
                name: "Bengala AI",
                legalName: "Bengala Labs SRL",
                url: "https://bengala.ai",
                logo: "https://bengala.ai/logo.svg",
                image: "https://bengala.ai/og-image.jpg",
                description:
                  "Bengala crea productos de inteligencia artificial que llevan cada tarea de principio a fin, con verificación y control humano.",
                email: EMAIL,
                knowsAbout: [
                  "Artificial Intelligence",
                  "AI Agents",
                  "Business Process Automation",
                  "Natural Language Processing",
                  "AI Safety",
                  "Human-in-the-loop Systems",
                ],
                sameAs: ["https://twitter.com/bengala_ai", "https://github.com/Bengala-Labs"],
              },
              {
                "@type": "WebSite",
                "@id": "https://bengala.ai/#website",
                url: "https://bengala.ai",
                name: "Bengala AI",
                description: "Productos de inteligencia artificial que terminan el trabajo",
                publisher: { "@id": "https://bengala.ai/#organization" },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
