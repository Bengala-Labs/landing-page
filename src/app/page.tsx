import Image from "next/image";
import Nav from "./_components/Nav";
import Reveal from "./_components/Reveal";
import BlockField from "./_components/BlockField";
import VoiceStream from "./_components/VoiceStream";
import HeroField from "./_components/HeroField";
import ScrollWords from "./_components/ScrollWords";
import CallDemo from "./_components/CallDemo";
import AccessModal from "./_components/AccessModal";
import AccessTrigger from "./_components/AccessTrigger";
import { BlockGlyph, KlearlyMark } from "./_components/Marks";
import { SHOW_CALL_DEMO } from "./_components/flags";

const EMAIL = "hola@bengala.ai";

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

const silenced = ["Sin tráfico", "Sin teclado", "Sin ventilador", "Sin eco", "Sin «sorry, can you repeat that?»"];

const steps = [
  {
    number: "01",
    title: "Aísla tu voz",
    body: "Separa tu voz de todo lo demás. El tráfico, el teclado y el eco se quedan contigo.",
    glyph: ["R.G.R", ".....", "IIIII", ".....", "G.R.G"],
  },
  {
    number: "02",
    title: "Suaviza el acento",
    body: "Ajusta la pronunciación de tu inglés para que se entienda a la primera. Tu timbre, tu ritmo y tu tono no cambian.",
    glyph: ["I....", "II...", "III..", "IIII.", "IIIIG"],
  },
  {
    number: "03",
    title: "Llega limpia",
    body: "Funciona como un micrófono más, en las apps de llamadas que ya usas. Todo pasa mientras hablas.",
    glyph: [".....", "I.I.I", "IIIII", "I.I.I", "....G"],
  },
];

const audiences = [
  {
    label: "Centros de contacto",
    title: "Cada llamada se entiende a la primera.",
    body: "Menos repeticiones, conversaciones más cortas y clientes que no tienen que esforzarse para entender.",
  },
  {
    label: "Equipos remotos",
    title: "Reuniones de ideas, no de repetir frases.",
    body: "Habla desde la cocina, el coworking o el aeropuerto. Del otro lado solo llega lo que dices.",
  },
  {
    label: "Ventas y soporte",
    title: "Tu experiencia, sin barreras.",
    body: "Clientes en Estados Unidos o Europa escuchan a un experto, no a una mala conexión.",
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

      <Nav />

      {/* ============ HERO ============ */}
      <header className="relative min-h-[100dvh] w-full flex flex-col bg-background text-foreground overflow-hidden">
        <div className="absolute inset-0 z-0 animate-fade-in-slow" style={{ animationDelay: "300ms" }}>
          <HeroField />
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-end text-center w-full max-w-[1800px] mx-auto px-6 md:px-16 pt-28 md:pt-32">
          <div className="animate-fade-up inline-flex items-center gap-3 rounded-full border border-foreground/15 bg-foreground/[0.04] pl-3 pr-4 py-1.5" style={{ animationDelay: "500ms" }}>
            <KlearlyMark className="w-4 h-4 text-foreground" />
            <span className="text-xs md:text-sm text-foreground/80">
              Bengala <span className="font-semibold text-foreground">Klearly</span>
            </span>
            <span className="h-3 w-px bg-foreground/20" />
            <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em] text-accent">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent-gold opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-gold" />
              </span>
              En desarrollo
            </span>
          </div>

          <h1 className="hero-halo mt-7 md:mt-8 text-[2.7rem] leading-[1] sm:text-6xl md:text-[5rem] lg:text-[6.25rem] lg:leading-[0.95] tracking-[-0.04em]">
            <span className="block overflow-hidden pb-1 lg:pb-2">
              <span className="block font-semibold animate-rise" style={{ animationDelay: "700ms" }}>
                Que te entiendan
              </span>
            </span>
            <span className="block overflow-hidden pb-2 lg:pb-3">
              <span className="block italic font-light text-foreground/70 animate-rise" style={{ animationDelay: "820ms" }}>
                a la primera<span className="not-italic text-accent">.</span>
              </span>
            </span>
          </h1>

          <p className="mt-5 md:mt-6 hero-halo max-w-xl text-base md:text-lg text-foreground/80 leading-relaxed animate-fade-up" style={{ animationDelay: "1100ms" }}>
            Klearly elimina el ruido de fondo y suaviza tu acento al hablar inglés. En tiempo
            real, con tu propia voz.
          </p>

          <div className="mt-7 md:mt-8 animate-fade-up" style={{ animationDelay: "1300ms" }}>
            <AccessTrigger
              source="hero"
              className="group relative inline-flex items-center gap-2.5 text-base md:text-lg font-medium px-8 md:px-10 py-4 md:py-5 rounded-full overflow-hidden bg-foreground text-background shadow-[0_22px_50px_-18px_rgba(11,14,20,0.55)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_26px_60px_-18px_rgba(239,51,51,0.6)]"
            >
              <span className={`absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-500 ${EASE}`} />
              <span className="relative group-hover:text-white group-focus-visible:text-white transition-colors duration-500">Pide acceso anticipado</span>
              <span className={`relative inline-block group-hover:text-white group-focus-visible:text-white transition-all duration-500 ${EASE} group-hover:translate-x-1 group-hover:-translate-y-1`}>↗</span>
            </AccessTrigger>
          </div>

          <div className="mt-6 md:mt-7 flex items-center gap-3 animate-fade-up" style={{ animationDelay: "1500ms" }}>
            <span className="hero-halo text-xs md:text-sm text-foreground/65">Startup del programa</span>
            <span className="inline-flex items-center rounded-full bg-white border border-border px-3 py-1.5 shadow-[0_6px_24px_-12px_rgba(11,14,20,0.25)]">
              <Image src="/google-for-startups.png" alt="Google for Startups" width={324} height={50} className="h-[18px] md:h-5 w-auto" />
            </span>
          </div>
        </div>

        <div className="relative z-10 mt-6 md:mt-7 mb-5 animate-fade-in-slow" style={{ animationDelay: "1000ms" }}>
          <VoiceStream />
        </div>
      </header>

      {/* ============ MARQUEE ============ */}
      <section aria-label="Lo que Klearly elimina" className="relative z-10 py-4 md:py-5 overflow-hidden bg-accent text-white">
        <div className="flex w-max animate-marquee" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {[...silenced, ...silenced].map((item, i) => (
                <span key={`${copy}-${i}`} className="flex items-center text-sm md:text-base font-medium tracking-tight whitespace-nowrap">
                  <span className="px-6 md:px-9">{item}</span>
                  <span className="inline-block w-1.5 h-1.5 bg-accent-gold" />
                </span>
              ))}
            </div>
          ))}
        </div>
        <p className="sr-only">{silenced.join(", ")}</p>
      </section>

      {/* ============ STORY ============ */}
      <section aria-label="Por qué Klearly" className="relative z-10 bg-foreground text-background">
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-16 py-28 md:py-44">
        <ScrollWords
          className="max-w-6xl text-3xl sm:text-4xl md:text-6xl leading-[1.15] md:leading-[1.1] tracking-tight font-medium"
          parts={[
            { text: "Sabes lo que quieres decir. Lo sabes bien. Pero entre el ruido de la calle, el teclado y otro “can you repeat that?”, tu idea llega a medias.", className: "text-background" },
            { text: " Klearly hace que llegue entera.", className: "text-accent italic font-light" },
          ]}
        />
        </div>
      </section>

      {/* ============ DEMO (hidden while SHOW_CALL_DEMO is false) ============ */}
      {SHOW_CALL_DEMO && (
      <section id="klearly" aria-labelledby="demo-heading" className="relative z-10 bg-foreground text-background overflow-hidden">
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-16 py-28 md:py-40 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow className="text-accent mb-6">Bengala Klearly</Eyebrow>
              <h2 id="demo-heading" className="text-4xl sm:text-5xl md:text-7xl tracking-[-0.03em] font-medium leading-[1]">
                Un interruptor.
                <span className="block italic font-light text-background/50">Otra llamada<span className="not-italic text-accent">.</span></span>
              </h2>
              <p className="mt-8 text-base md:text-lg font-light text-background/60 leading-relaxed max-w-md">
                Klearly vive entre tu micrófono y tu llamada. Tú hablas como siempre. Del otro lado
                llega una voz limpia, clara y fácil de entender.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={150}>
              <CallDemo />
            </Reveal>
          </div>
        </div>
      </section>
      )}

      {/* ============ HOW IT WORKS ============ */}
      <section id="como-funciona" aria-labelledby="how-heading" className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-16 py-28 md:py-40">
        <Reveal>
          <Eyebrow className="text-accent mb-6">Cómo funciona</Eyebrow>
          <h2 id="how-heading" className="text-4xl sm:text-5xl md:text-7xl tracking-[-0.03em] font-medium leading-[1] max-w-[14ch]">
            Tres cosas pasan mientras hablas<span className="text-accent">.</span>
          </h2>
        </Reveal>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          {steps.map((s, i) => (
            <Reveal key={s.number} delay={i * 130}>
              <div className="group border-t border-border pt-8">
                <div className="flex items-center justify-between mb-10">
                  <BlockGlyph
                    pattern={s.glyph}
                    className={`w-12 h-12 text-foreground transition-transform duration-700 ${EASE} group-hover:rotate-[-6deg] group-hover:scale-110`}
                  />
                  <span className="text-xs font-mono tracking-wider text-accent tabular-nums">{s.number}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">{s.title}</h3>
                <p className="text-base font-light text-foreground/60 leading-relaxed max-w-sm">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-24 md:mt-36 rounded-3xl bg-foreground text-background px-7 py-14 md:px-16 md:py-20 relative overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 50% 80% at 100% 100%, rgba(239,51,51,0.24), transparent 70%)" }}
            />
            <p className="relative text-3xl sm:text-4xl md:text-6xl tracking-[-0.03em] font-medium leading-[1.05] max-w-[18ch]">
              Tu voz sigue siendo <span className="italic font-light text-accent">tuya</span>
              <span className="text-accent">.</span>
            </p>
            <p className="relative mt-6 md:mt-8 text-base md:text-xl font-light text-background/60 leading-relaxed max-w-xl">
              Mismo timbre, mismo ritmo, misma persona. Klearly no te convierte en otra voz. Solo
              quita lo que se interpone.
            </p>
            <KlearlyMark className="hidden md:block absolute right-12 lg:right-20 top-1/2 -translate-y-1/2 w-40 lg:w-56 h-40 lg:h-56 text-background opacity-90" />
          </div>
        </Reveal>
      </section>

      {/* ============ AUDIENCES ============ */}
      <section id="para-quien" aria-labelledby="who-heading" className="relative z-10 border-t border-border/70">
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-16 py-28 md:py-40">
          <Reveal>
            <Eyebrow className="text-accent mb-6">Para quién</Eyebrow>
            <h2 id="who-heading" className="text-4xl sm:text-5xl md:text-7xl tracking-[-0.03em] font-medium leading-[1] max-w-[16ch] mb-16 md:mb-24">
              Para quien trabaja en inglés desde cualquier lugar<span className="text-accent">.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {audiences.map((a, i) => (
              <Reveal key={a.label} delay={i * 120} className="h-full">
                <article className="group h-full flex flex-col rounded-2xl border border-border bg-white/40 p-7 md:p-9 transition-colors duration-500 hover:border-foreground hover:bg-foreground hover:text-background">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-10">{a.label}</span>
                  <h3 className="text-2xl md:text-[1.75rem] font-medium tracking-tight leading-tight mb-4">{a.title}</h3>
                  <p className="text-sm md:text-base font-light leading-relaxed opacity-60">{a.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ACCESS ============ */}
      <section id="acceso" aria-labelledby="access-heading" className="relative z-10 bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 opacity-90">
          <BlockField tone="dark" focus="edges" />
        </div>
        <div className="relative w-full max-w-[1800px] mx-auto px-6 md:px-16 py-32 md:py-48 text-center flex flex-col items-center">
          <Reveal>
            <KlearlyMark className="w-12 h-12 md:w-14 md:h-14 text-background mx-auto mb-10" />
          </Reveal>
          <Reveal delay={100}>
            <h2 id="access-heading" className="text-[2.6rem] leading-[1.02] sm:text-6xl md:text-8xl tracking-[-0.04em] font-medium max-w-[14ch] mx-auto">
              Tu voz, <span className="italic font-light text-background/50">sin interferencias</span>
              <span className="text-accent">.</span>
            </h2>
          </Reveal>
          <Reveal delay={250}>
            <p className="mt-8 md:mt-10 text-base md:text-lg font-light text-background/55 max-w-md mx-auto leading-relaxed">
              Estamos abriendo Klearly a un primer grupo de personas y equipos. Guárdate un lugar.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-10 md:mt-12">
            <AccessTrigger
              source="cierre"
              className="group relative inline-flex items-center gap-2 text-sm md:text-base font-medium px-7 py-4 rounded-full overflow-hidden bg-background text-foreground transition-transform duration-500 hover:scale-[1.03]"
            >
              <span className={`absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-500 ${EASE}`} />
              <span className="relative group-hover:text-white group-focus-visible:text-white transition-colors duration-500">Pide acceso anticipado</span>
              <span className={`relative inline-block group-hover:text-white group-focus-visible:text-white transition-all duration-500 ${EASE} group-hover:translate-x-1 group-hover:-translate-y-1`}>↗</span>
            </AccessTrigger>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="relative z-10 bg-foreground text-background border-t border-background/10">
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-16 py-14 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-6 flex flex-col gap-5">
            <Image src="/logo_light.svg" alt="Bengala" width={130} height={30} className="h-6 w-auto self-start" />
            <p className="text-sm font-light text-background/45 leading-relaxed max-w-sm">
              Bengala crea productos de inteligencia artificial. Klearly es el que estamos
              construyendo ahora.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-background/45">Startup del programa</span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1.5">
                <Image src="/google-for-startups.png" alt="Google for Startups" width={324} height={50} className="h-[18px] w-auto" />
              </span>
            </div>
          </div>

          <div className="md:col-span-6 flex gap-16 md:gap-24 md:justify-end text-sm">
            <ul className="flex flex-col gap-3">
              {[
                ...(SHOW_CALL_DEMO ? [["#klearly", "Klearly"]] : []),
                ["#como-funciona", "Cómo funciona"],
                ["#para-quien", "Para quién"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-background/55 hover:text-accent transition-colors">{label}</a>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-3">
              <li><AccessTrigger source="footer" className="text-background/55 hover:text-accent transition-colors">Acceso anticipado</AccessTrigger></li>
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

      <AccessModal />

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
                description: "Bengala crea productos de inteligencia artificial. Su primer producto, Klearly, elimina el ruido de fondo y suaviza el acento en inglés en tiempo real.",
                email: EMAIL,
                knowsAbout: [
                  "Artificial Intelligence",
                  "Speech Enhancement",
                  "Noise Cancellation",
                  "Accent Conversion",
                  "Real-time Audio Processing",
                ],
                sameAs: ["https://twitter.com/bengala_ai", "https://github.com/Bengala-Labs"],
                memberOf: {
                  "@type": "Organization",
                  name: "Google for Startups",
                  url: "https://startup.google.com",
                },
              },
              {
                "@type": "SoftwareApplication",
                "@id": "https://bengala.ai/#klearly",
                name: "Bengala Klearly",
                applicationCategory: "CommunicationApplication",
                description:
                  "Elimina el ruido de fondo y suaviza el acento al hablar inglés, en tiempo real, conservando la voz de quien habla.",
                creator: { "@id": "https://bengala.ai/#organization" },
              },
              {
                "@type": "WebSite",
                "@id": "https://bengala.ai/#website",
                url: "https://bengala.ai",
                name: "Bengala",
                description: "Bengala Klearly: que te entiendan a la primera.",
                publisher: { "@id": "https://bengala.ai/#organization" },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
