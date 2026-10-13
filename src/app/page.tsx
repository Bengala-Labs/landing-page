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
import ProgramLogos from "./_components/ProgramLogos";
import PlatformBadges from "./_components/PlatformBadges";
import { BlockGlyph, VoiceMark } from "./_components/Marks";
import { SHOW_CALL_DEMO } from "./_components/flags";

const EMAIL = "hola@bengala.ai";

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

const silenced = ["Sin tráfico", "Sin teclado", "Sin ventilador", "Sin eco", "Sin «sorry, can you repeat that?»"];

const steps = [
  {
    number: "01",
    title: "Aísla tu voz",
    body: "Separa tu voz de todo lo demás. El tráfico, el teclado y el eco se quedan contigo.",
    glyph: ["I.G.I", ".....", "IIIII", ".....", "G.I.G"],
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
    id: "call-centers",
    badge: "Call Centers & BPO",
    status: "Piso operativo en silencio",
    title: "Llamadas más cortas. Clientes que entienden a la primera.",
    lead: "En centros de contacto, cada repetición alarga el tiempo de llamada y cansa al cliente. Bengala Voice aísla el murmullo de cientos de agentes y suaviza el acento en inglés en tiempo real.",
    metrics: [
      { value: "-25%", label: "Tiempo por llamada", note: "AHT reducido" },
      { value: "+18 pts", label: "Satisfacción", note: "CSAT inmediato" },
      { value: "0 dB", label: "Ruido cruzado", note: "Aislamiento total" },
    ],
    points: [
      {
        title: "Aísla el piso de operaciones:",
        desc: "Cancela las voces de los compañeros al lado, teclados mecánicos y ruidos de fondo antes de que lleguen a la llamada.",
      },
      {
        title: "Comprensión instantánea en inglés:",
        desc: "Ajusta la pronunciación al hablar con clientes en EE.UU. y Reino Unido sin perder el timbre natural del agente.",
      },
      {
        title: "Menor rotación y fatiga:",
        desc: "Reduce la ansiedad lingüística del equipo, permitiendo jornadas más productivas y agentes con mayor confianza.",
      },
    ],
    stack: ["Genesys", "Five9", "Zendesk", "Dialpad", "Amazon Connect", "Avaya"],
  },
  {
    id: "equipos-remotos",
    badge: "Equipos Remotos Globalizados",
    status: "Presencia ejecutiva en vivo",
    title: "Tu talento no debería competir contra tu acento.",
    lead: "Para ingenieros, consultores y equipos de ventas que operan desde Latinoamérica o cualquier lugar con clientes y directivos en EE.UU. y Europa.",
    metrics: [
      { value: "100%", label: "Tu voz intacta", note: "Mismo timbre y tono" },
      { value: "< 15 ms", label: "Latencia en vivo", note: "Imperceptible al hablar" },
      { value: "Cero", label: "Barrera lingüística", note: "Seguridad al liderar" },
    ],
    points: [
      {
        title: "Ventas y consultoría sin barreras:",
        desc: "Presenta propuestas y cierra tratos con la seguridad de quien domina la sala, eliminando el sesgo de acento.",
      },
      {
        title: "Reuniones técnicas directas:",
        desc: "Explica arquitecturas y decisiones complejas sin que te interrumpan con otro “sorry, could you repeat that?”.",
      },
      {
        title: "Libertad de entorno:",
        desc: "Conéctate desde una cafetería, coworking o aeropuerto; del otro lado escuchan calidad de cabina de grabación.",
      },
    ],
    stack: ["Zoom", "Google Meet", "Microsoft Teams", "Slack Huddles", "Webex"],
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
    <main className="relative min-h-[100dvh] w-full flex flex-col overflow-x-hidden bg-background text-foreground font-sans selection:bg-foreground selection:text-background">
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
          <div className="animate-fade-up inline-flex items-center rounded-full border border-foreground/15 bg-foreground/[0.04] px-4 md:px-5 py-2 md:py-2.5 backdrop-blur-sm shadow-[0_2px_12px_rgba(11,14,20,0.04)]" style={{ animationDelay: "500ms" }}>
            <Image src="/logo_voice.svg" alt="Bengala Voice" width={231} height={32} className="h-4 md:h-5 w-auto" priority />
          </div>

          <h1 className="hero-halo mt-7 md:mt-9 w-full max-w-[1320px] mx-auto text-[1.85rem] leading-[1.12] sm:text-[2.75rem] md:text-[3.4rem] lg:text-[4.1rem] xl:text-[4.35rem] lg:leading-[1.05] tracking-[-0.035em]">
            <span className="block overflow-hidden pb-1 sm:pb-2">
              <span className="block font-semibold text-foreground animate-rise" style={{ animationDelay: "700ms" }}>
                Elimina el ruido de fondo
              </span>
            </span>
            <span className="block overflow-hidden pb-2 sm:pb-3">
              <span className="block animate-rise" style={{ animationDelay: "840ms" }}>
                <span className="font-light text-foreground/70">y </span>
                <span className="italic font-light text-foreground">suaviza tu acento</span>{" "}
                <span className="italic font-light text-foreground/70">al hablar inglés</span>
                .
              </span>
            </span>
          </h1>

          <div className="mt-8 md:mt-10 flex flex-col items-center gap-4 animate-fade-up" style={{ animationDelay: "1150ms" }}>
            <AccessTrigger
              source="hero"
              className="group relative inline-flex items-center gap-2.5 text-base md:text-lg font-medium px-8 md:px-10 py-4 md:py-5 rounded-full overflow-hidden bg-foreground text-background shadow-[0_22px_50px_-18px_rgba(11,14,20,0.55)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_26px_60px_-18px_rgba(11,14,20,0.65)] hover:bg-[#1a202c]"
            >
              <span>Pide acceso anticipado</span>
              <span className={`inline-block transition-transform duration-500 ${EASE} group-hover:translate-x-1 group-hover:-translate-y-1`}>↗</span>
            </AccessTrigger>

            <PlatformBadges />
          </div>

          <ProgramLogos className="mt-8 md:mt-9 animate-fade-up" style={{ animationDelay: "1350ms" }} />
        </div>

        <div className="relative z-10 mt-6 md:mt-7 mb-5 animate-fade-in-slow" style={{ animationDelay: "1000ms" }}>
          <VoiceStream />
        </div>
      </header>

      {/* ============ MARQUEE ============ */}
      <section aria-label="Lo que Bengala Voice elimina" className="relative z-10 py-4 md:py-5 overflow-hidden border-y border-border/80 bg-white/75 text-foreground backdrop-blur-sm">
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
      <section aria-label="Por qué Bengala Voice" className="relative z-10 bg-foreground text-background">
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-16 py-28 md:py-44">
          <ScrollWords
            className="max-w-6xl text-3xl sm:text-4xl md:text-6xl leading-[1.15] md:leading-[1.1] tracking-tight font-medium"
            parts={[
              { text: "Entre el ruido de la calle, el teclado y otro “can you repeat that?”, tu idea llega a medias.", className: "text-background" },
              { text: " Bengala Voice hace que llegue entera.", className: "text-white italic font-normal" },
            ]}
          />
        </div>
      </section>

      {/* ============ DEMO (hidden while SHOW_CALL_DEMO is false) ============ */}
      {SHOW_CALL_DEMO && (
        <section id="voice" aria-labelledby="demo-heading" className="relative z-10 bg-foreground text-background overflow-hidden">
          <div className="w-full max-w-[1800px] mx-auto px-6 md:px-16 py-28 md:py-40 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <Image src="/logo_voice_light.svg" alt="Bengala Voice" width={231} height={32} className="h-5 md:h-6 w-auto mb-6" />
                <h2 id="demo-heading" className="text-4xl sm:text-5xl md:text-7xl tracking-[-0.03em] font-medium leading-[1]">
                  Un interruptor.
                  <span className="block italic font-light text-background/50">Otra llamada.</span>
                </h2>
                <p className="mt-8 text-base md:text-lg font-light text-background/60 leading-relaxed max-w-md">
                  Bengala Voice vive entre tu micrófono y tu llamada. Tú hablas como siempre. Del otro lado
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
          <Eyebrow className="text-foreground/50 mb-6">Cómo funciona</Eyebrow>
          <h2 id="how-heading" className="text-4xl sm:text-5xl md:text-7xl tracking-[-0.03em] font-medium leading-[1] max-w-[14ch]">
            Tres cosas pasan mientras hablas.
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
                  <span className="text-xs font-mono tracking-wider text-foreground/50 tabular-nums">{s.number}</span>
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
              style={{ background: "radial-gradient(ellipse 50% 80% at 100% 100%, rgba(252,182,65,0.12), transparent 70%)" }}
            />
            <p className="relative text-3xl sm:text-4xl md:text-6xl tracking-[-0.03em] font-medium leading-[1.05] max-w-[18ch]">
              Tu voz sigue siendo <span className="italic font-light text-background/80">tuya</span>.
            </p>
            <p className="relative mt-6 md:mt-8 text-base md:text-xl font-light text-background/60 leading-relaxed max-w-xl">
              Mismo timbre, mismo ritmo, misma persona. Bengala Voice no te convierte en otra voz. Solo
              quita lo que se interpone.
            </p>
            <VoiceMark className="hidden md:block absolute right-12 lg:right-20 top-1/2 -translate-y-1/2 w-40 lg:w-56 h-40 lg:h-56 text-background opacity-90" />
          </div>
        </Reveal>
      </section>

      {/* ============ AUDIENCES ============ */}
      <section id="para-quien" aria-labelledby="who-heading" className="relative z-10 border-t border-border/70 bg-gradient-to-b from-background via-foreground/[0.015] to-background">
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-16 py-28 md:py-40">
          <Reveal>
            <Eyebrow className="text-foreground/50 mb-6">Para quién</Eyebrow>
            <h2 id="who-heading" className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.035em] font-medium leading-[1.05] max-w-4xl mb-6">
              Diseñado para donde la voz es el negocio.
            </h2>
            <p className="text-base sm:text-lg md:text-xl font-light text-foreground/65 max-w-2xl leading-relaxed mb-16 md:mb-20">
              Dos entornos de alta exigencia donde la claridad de cada frase define el resultado:
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {audiences.map((a, i) => (
              <Reveal key={a.id} delay={i * 150} className="h-full">
                <article className="group relative h-full flex flex-col justify-between rounded-3xl border border-border/80 bg-white/70 p-8 sm:p-10 md:p-12 shadow-[0_20px_50px_-20px_rgba(11,14,20,0.05)] transition-all duration-500 hover:border-foreground/20 hover:shadow-[0_30px_70px_-20px_rgba(11,14,20,0.12)]">
                  <div>
                    {/* Header badge & status */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-8 border-border/70 border-b">
                      <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-foreground/80 font-medium">
                        {a.badge}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1 text-[11px] font-mono text-foreground/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {a.status}
                      </span>
                    </div>

                    {/* Headline & lead */}
                    <h3 className="text-2xl sm:text-3xl md:text-[2rem] font-medium tracking-tight leading-[1.18] mt-8 mb-5 text-foreground">
                      {a.title}
                    </h3>
                    <p className="text-base sm:text-lg font-light text-foreground/70 leading-relaxed mb-8">
                      {a.lead}
                    </p>

                    {/* Metrics strip */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-foreground/[0.03] border border-foreground/[0.06] mb-8">
                      {a.metrics.map((m) => (
                        <div key={m.label} className="text-center sm:text-left">
                          <div className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground font-mono">
                            {m.value}
                          </div>
                          <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-foreground/50 mt-1">
                            {m.label}
                          </div>
                          <div className="text-[11px] text-foreground/60 font-light hidden sm:block mt-0.5">
                            {m.note}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Feature points */}
                    <ul className="flex flex-col gap-4 text-sm sm:text-base text-foreground/80 leading-relaxed">
                      {a.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40" />
                          <span>
                            <strong className="font-medium text-foreground">{pt.title}</strong>{" "}
                            <span className="font-light text-foreground/70">{pt.desc}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Compatible stack footer */}
                  <div className="mt-10 pt-6 border-t border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <span className="text-foreground/45 font-mono uppercase tracking-[0.2em] text-[10px]">
                      Compatible con tu stack
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {a.stack.map((app) => (
                        <span
                          key={app}
                          className="px-2.5 py-1 rounded-md bg-foreground/[0.04] text-foreground/70 font-mono text-[11px]"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
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
            <VoiceMark className="w-12 h-12 md:w-14 md:h-14 text-background mx-auto mb-10" />
          </Reveal>
          <Reveal delay={100}>
            <h2 id="access-heading" className="text-[2.6rem] leading-[1.02] sm:text-6xl md:text-8xl tracking-[-0.04em] font-medium max-w-[14ch] mx-auto">
              Tu voz, <span className="italic font-light text-background/50">sin interferencias</span>.
            </h2>
          </Reveal>
          <Reveal delay={250}>
            <p className="mt-8 md:mt-10 text-base md:text-lg font-light text-background/55 max-w-md mx-auto leading-relaxed">
              Estamos abriendo Bengala Voice a un primer grupo de personas y equipos. Guárdate un lugar.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-10 md:mt-12 flex flex-col items-center gap-4">
              <AccessTrigger
                source="cierre"
                className="group relative inline-flex items-center gap-2 text-sm md:text-base font-medium px-7 py-4 rounded-full overflow-hidden bg-background text-foreground transition-all duration-500 hover:scale-[1.03] hover:bg-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)]"
              >
                <span>Pide acceso anticipado</span>
                <span className={`inline-block transition-transform duration-500 ${EASE} group-hover:translate-x-1 group-hover:-translate-y-1`}>↗</span>
              </AccessTrigger>
              <PlatformBadges tone="dark" />
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
              Bengala crea productos de inteligencia artificial. Bengala Voice es el que estamos
              construyendo ahora.
            </p>
            <ProgramLogos tone="dark" align="start" className="mt-2" />
          </div>

          <div className="md:col-span-6 flex gap-16 md:gap-24 md:justify-end text-sm">
            <ul className="flex flex-col gap-3">
              {[
                ...(SHOW_CALL_DEMO ? [["#voice", "Voice"]] : []),
                ["#como-funciona", "Cómo funciona"],
                ["#para-quien", "Para quién"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-background/55 hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-3">
              <li><AccessTrigger source="footer" className="text-background/55 hover:text-white transition-colors">Acceso anticipado</AccessTrigger></li>
              <li><a href={`mailto:${EMAIL}`} className="text-background/55 hover:text-white transition-colors">{EMAIL}</a></li>
              <li>
                <a href="https://github.com/Bengala-Labs" target="_blank" rel="noopener noreferrer" className="text-background/55 hover:text-white transition-colors">
                  GitHub ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-16 py-6 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-background/40">
          <p>© {new Date().getFullYear()} Bengala Labs SRL</p>
          <div className="flex items-center gap-6">
            <a href="/politica-de-privacidad" className="hover:text-white transition-colors">Política de Privacidad</a>
            <a href="/terminos-y-condiciones" className="hover:text-white transition-colors">Términos y Condiciones</a>
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
                description: "Bengala crea productos de inteligencia artificial. Su primer producto, Bengala Voice, elimina el ruido de fondo y suaviza el acento en inglés en tiempo real.",
                email: EMAIL,
                knowsAbout: [
                  "Artificial Intelligence",
                  "Speech Enhancement",
                  "Noise Cancellation",
                  "Accent Conversion",
                  "Real-time Audio Processing",
                ],
                sameAs: ["https://twitter.com/bengala_ai", "https://github.com/Bengala-Labs"],
                memberOf: [
                  {
                    "@type": "Organization",
                    name: "Google for Startups",
                    url: "https://startup.google.com",
                  },
                  {
                    "@type": "Organization",
                    name: "NVIDIA Inception Program",
                    url: "https://www.nvidia.com/en-us/startups/",
                  },
                ],
              },
              {
                "@type": "SoftwareApplication",
                "@id": "https://bengala.ai/#voice",
                name: "Bengala Voice",
                applicationCategory: "CommunicationApplication",
                image: "https://bengala.ai/logo_voice.png",
                description:
                  "Elimina el ruido de fondo y suaviza el acento al hablar inglés, en tiempo real, conservando la voz de quien habla.",
                creator: { "@id": "https://bengala.ai/#organization" },
              },
              {
                "@type": "WebSite",
                "@id": "https://bengala.ai/#website",
                url: "https://bengala.ai",
                name: "Bengala",
                description: "Bengala Voice: elimina el ruido de fondo y suaviza tu acento al hablar inglés.",
                publisher: { "@id": "https://bengala.ai/#organization" },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
