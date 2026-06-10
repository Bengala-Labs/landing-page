import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Bengala AI",
  description: "Términos y Condiciones de Uso de Bengala Labs SRL. Condiciones de acceso, propiedad intelectual y leyes aplicables de la República Dominicana.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsAndConditions() {
  return (
    <main className="relative min-h-[100dvh] w-full flex flex-col overflow-x-hidden bg-background text-foreground font-sans selection:bg-accent selection:text-white">
      {/* Noise Overlay */}
      <div
        className="fixed inset-0 z-50 opacity-[0.05] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/75 backdrop-blur-xl border-b border-border/60">
        <div className="w-full px-6 md:px-16 py-4 md:py-5 flex items-center justify-between">
          <div>
            <a href="/" aria-label="Bengala AI — inicio" className="block transition-opacity hover:opacity-80">
              <Image
                src="/logo.svg"
                alt="Bengala AI"
                width={140}
                height={32}
                className="h-6 md:h-7 w-auto opacity-95"
                priority
              />
            </a>
          </div>

          <div className="flex items-center gap-6 md:gap-10">
            <a
              href="mailto:legal@bengala.ai"
              className="group relative text-xs md:text-sm font-medium tracking-wide text-foreground"
            >
              Contacto Legal
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <span className="ml-1 text-accent inline-block">↗</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <header className="relative pt-32 pb-12 md:pt-40 md:pb-16 border-b border-border/60">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-16">
          <span className="text-[10px] md:text-xs tracking-[0.4em] font-mono uppercase text-accent mb-4 block">
            Aspectos Legales
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight">
            Términos y <span className="italic font-light text-foreground/50">Condiciones</span>
          </h1>
          <p className="mt-4 text-xs md:text-sm font-mono text-foreground/45">
            Última actualización: 9 de junio de 2026
          </p>
        </div>
      </header>

      {/* Content */}
      <section className="flex-1 w-full max-w-[1200px] mx-auto px-6 md:px-16 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
          {/* Index / Sidebar */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-28 space-y-4">
              <p className="text-xs font-mono uppercase tracking-wider text-foreground/35">Contenido</p>
              <nav className="flex flex-col gap-3 text-sm font-light text-foreground/55">
                <a href="#objeto" className="hover:text-accent transition-colors">1. Identificación y Objeto</a>
                <a href="#aceptacion" className="hover:text-accent transition-colors">2. Aceptación de los Términos</a>
                <a href="#uso-web" className="hover:text-accent transition-colors">3. Uso Aceptable del Portal</a>
                <a href="#propiedad" className="hover:text-accent transition-colors">4. Propiedad Intelectual</a>
                <a href="#contratacion" className="hover:text-accent transition-colors">5. Contratación de Automatizaciones</a>
                <a href="#limitacion" className="hover:text-accent transition-colors">6. Exclusión de Responsabilidad</a>
                <a href="#enlaces" className="hover:text-accent transition-colors">7. Enlaces de Terceros</a>
                <a href="#privacidad-remision" className="hover:text-accent transition-colors">8. Protección de Datos</a>
                <a href="#modificaciones" className="hover:text-accent transition-colors">9. Modificación de Términos</a>
                <a href="#ley-jurisdiccion" className="hover:text-accent transition-colors">10. Ley Aplicable y Jurisdicción</a>
              </nav>
            </div>
          </aside>

          {/* Legal Text */}
          <div className="lg:col-span-8 space-y-12 text-foreground/80 font-light leading-relaxed text-sm md:text-base">
            <p>
              Bienvenido al portal web de Bengala AI. Los presentes Términos y Condiciones constituyen un acuerdo legal vinculante entre usted (en adelante, el &quot;Usuario&quot;) y <strong>Bengala Labs SRL</strong>. Le rogamos lea detenidamente las presentes condiciones antes de navegar por nuestro sitio web o hacer uso de cualquiera de los recursos informativos proporcionados.
            </p>

            {/* Control de Documento (ISO 27001) */}
            <div className="border border-border/60 bg-border/10 p-4 rounded-lg space-y-2 font-mono text-xs text-foreground/60">
              <p className="text-[10px] uppercase tracking-wider text-accent font-semibold">Control de Cumplimiento e Información (ISO 27001)</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                <div>
                  <span className="block text-[10px] text-foreground/45 uppercase">Código</span>
                  <span className="font-semibold text-foreground">TER-COND-01</span>
                </div>
                <div>
                  <span className="block text-[10px] text-foreground/45 uppercase">Versión</span>
                  <span className="font-semibold text-foreground">V1.0</span>
                </div>
                <div>
                  <span className="block text-[10px] text-foreground/45 uppercase">Fecha Aprobación</span>
                  <span className="font-semibold text-foreground">16-04-2026</span>
                </div>
                <div>
                  <span className="block text-[10px] text-foreground/45 uppercase">Clasificación</span>
                  <span className="font-semibold text-foreground">Público</span>
                </div>
              </div>
            </div>

            <hr className="border-border/60" />

            <section id="objeto" className="scroll-mt-28 space-y-4">
              <h2 className="text-lg md:text-xl font-medium text-foreground tracking-tight">1. Identificación del Titular y Objeto</h2>
              <p>
                De conformidad con las leyes vigentes de comercio electrónico y sociedades comerciales de la República Dominicana, se exponen los datos de identificación del titular de este portal:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-foreground/75 font-mono text-xs md:text-sm bg-border/20 p-4 rounded-lg border border-border/50">
                <li><strong>Razón Social:</strong> Bengala Labs SRL</li>
                <li><strong>Registro Mercantil No.:</strong> 35222STI</li>
                <li><strong>Domicilio Social:</strong> República Dominicana</li>
                <li><strong>Correo Electrónico de Contacto Legal:</strong> <a href="mailto:legal@bengala.ai" className="text-accent hover:underline">legal@bengala.ai</a></li>
              </ul>
              <p>
                Este sitio web tiene por objeto proveer información sobre las soluciones de automatización con Inteligencia Artificial desarrolladas por Bengala Labs SRL, específicamente <strong>Bengala Mercadeo</strong> y <strong>Bengala Workflows</strong>, dirigidos a la automatización de procesos operativos, de prospección y adquisición en sectores comerciales y financieros.
              </p>
            </section>

            <section id="aceptacion" className="scroll-mt-28 space-y-4">
              <h2 className="text-lg md:text-xl font-medium text-foreground tracking-tight">2. Aceptación de los Términos</h2>
              <p>
                El mero acceso, navegación o utilización de este sitio web atribuye la condición de Usuario e implica la aceptación plena y sin reservas de todos y cada uno de los términos establecidos en este documento en el momento preciso en el que el Usuario accede al portal. Si usted no está de acuerdo con la totalidad de estos términos, deberá abstenerse de continuar navegando o interactuando con este sitio web.
              </p>
            </section>

            <section id="uso-web" className="scroll-mt-28 space-y-4">
              <h2 className="text-lg md:text-xl font-medium text-foreground tracking-tight">3. Condiciones de Acceso y Uso Aceptable</h2>
              <p>
                El acceso a la información publicada en la landing page tiene carácter gratuito para los Usuarios. El Usuario se compromete expresamente a hacer un uso de este sitio web que sea conforme a la ley, la moral, las buenas costumbres generalmente aceptadas y el orden público.
              </p>
              <p>
                Queda estrictamente prohibido al Usuario:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Utilizar mecanismos automatizados (incluyendo scrapers, crawlers, robots o spiders de datos) para indexar, copiar o extraer contenidos o datos sin autorización expresa por escrito de Bengala Labs SRL.</li>
                <li>Introducir o difundir virus informáticos, malware o cualquier código dañino que pueda causar daños técnicos a los servidores, bases de datos o la infraestructura de este sitio web.</li>
                <li>Realizar cualquier acción encaminada a saturar, deshabilitar o denegar el servicio informático de Bengala AI (ataques DDoS o similares).</li>
                <li>Suplantar la identidad de representantes de la empresa o falsear información en comunicaciones dirigidas a Bengala AI.</li>
              </ul>
            </section>

            <section id="propiedad" className="scroll-mt-28 space-y-4">
              <h2 className="text-lg md:text-xl font-medium text-foreground tracking-tight">4. Propiedad Intelectual e Industrial</h2>
              <p>
                El contenido de este sitio web, incluyendo de forma enunciativa pero no limitativa: el código fuente, el diseño gráfico, los layouts de interfaz, los logotipos, textos jurídicos, ilustraciones, material audiovisual, código HTML/CSS/JS y la marca &quot;Bengala AI&quot; son propiedad exclusiva de <strong>Bengala Labs SRL</strong> o, en su caso, de terceros licenciantes que han autorizado su uso en el portal.
              </p>
              <p>
                No se cede al Usuario ningún derecho de propiedad intelectual o industrial sobre el sitio web ni sobre ninguno de sus elementos integrantes. Queda terminantemente prohibida la reproducción total o parcial, distribución, comunicación pública, transformación o explotación de los contenidos del sitio web sin la autorización previa, expresa y por escrito de Bengala Labs SRL.
              </p>
            </section>

            <section id="contratacion" className="scroll-mt-28 space-y-4">
              <h2 className="text-lg md:text-xl font-medium text-foreground tracking-tight">5. Contratación de Automatizaciones Inteligentes</h2>
              <p>
                La información expuesta en este sitio web referente a <strong>Bengala Mercadeo</strong> y <strong>Bengala Workflows</strong> constituye una descripción general y técnica de las capacidades de nuestras soluciones de automatización con Inteligencia Artificial y no representa una oferta comercial vinculante.
              </p>
              <p>
                La adquisición de licencias de uso, la parametrización de flujos de trabajo y la implementación de automatizaciones para su organización se regularán formalmente mediante un contrato de prestación de servicios, términos de servicio de plataforma o acuerdo de nivel de servicio (SLA) específico firmado de manera independiente entre Bengala Labs SRL y su entidad jurídica.
              </p>
            </section>

            <section id="limitacion" className="scroll-mt-28 space-y-4">
              <h2 className="text-lg md:text-xl font-medium text-foreground tracking-tight">6. Exclusión de Responsabilidad y Garantías</h2>
              <p>
                Bengala Labs SRL no garantiza la disponibilidad ininterrumpida o la ausencia total de errores técnicos en el sitio web, aunque realizamos nuestros mejores esfuerzos para mantener el portal operativo y seguro.
              </p>
              <p>
                En la medida permitida por las leyes aplicables de la República Dominicana, Bengala Labs SRL se exime de cualquier responsabilidad por daños y perjuicios de toda naturaleza que puedan deberse a:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>La falta de disponibilidad, estabilidad o continuidad del funcionamiento del sitio web.</li>
                <li>La presencia de virus u otros elementos dañinos en los contenidos transmitidos que puedan producir alteraciones en el sistema informático (software y hardware) del Usuario.</li>
                <li>La inadecuación de la información de la web para fines particulares del Usuario o decisiones basadas en descripciones técnicas de carácter meramente general e informativo.</li>
              </ul>
            </section>

            <section id="enlaces" className="scroll-mt-28 space-y-4">
              <h2 className="text-lg md:text-xl font-medium text-foreground tracking-tight">7. Enlaces de Terceros</h2>
              <p>
                Este portal podría albergar enlaces técnicos de redirección a páginas externas gestionadas por terceros (como redes sociales u otras herramientas). Bengala Labs SRL no asume ninguna responsabilidad respecto del contenido, las políticas de cookies, ni de las prácticas de privacidad de dichos sitios web externos. El acceso a dichos portales ajenos se realizará bajo el riesgo y responsabilidad exclusivos del Usuario.
              </p>
            </section>

            <section id="privacidad-remision" className="scroll-mt-28 space-y-4">
              <h2 className="text-lg md:text-xl font-medium text-foreground tracking-tight">8. Protección de Datos y Privacidad</h2>
              <p>
                Los datos de carácter personal que usted nos facilite a través del uso de este sitio web o en comunicaciones comerciales por correo electrónico serán tratados con estricto apego a nuestra <a href="/politica-de-privacidad" className="text-accent hover:underline font-normal">Política de Privacidad</a>, la cual cumple con los lineamientos de la <strong>Ley No. 172-13 de la República Dominicana</strong>. Le instamos a leer dicho documento para conocer detalladamente sus derechos y el tratamiento aplicado a su información.
              </p>
            </section>

            <section id="modificaciones" className="scroll-mt-28 space-y-4">
              <h2 className="text-lg md:text-xl font-medium text-foreground tracking-tight">9. Modificación de los Términos</h2>
              <p>
                Bengala Labs SRL se reserva el derecho exclusivo de realizar modificaciones, actualizaciones, adiciones o eliminaciones sobre el texto de los presentes Términos y Condiciones en cualquier momento y sin previo aviso legal directo. Las modificaciones serán efectivas inmediatamente a partir de su publicación en el sitio web. Le recomendamos revisar periódicamente este documento para mantenerse informado.
              </p>
            </section>

            <section id="ley-jurisdiccion" className="scroll-mt-28 space-y-4">
              <h2 className="text-lg md:text-xl font-medium text-foreground tracking-tight">10. Ley Aplicable y Jurisdicción Competente</h2>
              <p>
                Los presentes Términos y Condiciones, así como cualquier controversia o reclamación derivada o relacionada con el acceso, uso o contenidos de este sitio web, se regirán e interpretarán de acuerdo con las **leyes de la República Dominicana**.
              </p>
              <p>
                Para cualquier controversia, conflicto, interpretación o litigio que pudiere surgir, las partes renuncian expresamente a cualquier otro fuero que pudiere corresponderles y aceptan someterse de forma irrevocable a la jurisdicción y competencia exclusiva de los **Tribunales del Distrito Nacional, Santo Domingo, República Dominicana**.
              </p>
            </section>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/60 bg-foreground text-background">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-16 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="/" className="transition-opacity hover:opacity-80">
            <Image
              src="/logo.svg"
              alt="Bengala AI"
              width={110}
              height={26}
              className="h-5 w-auto invert brightness-200"
            />
          </a>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-xs font-light text-background/40 tracking-wide text-center">
              © {new Date().getFullYear()} Bengala Labs SRL. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-xs font-light text-background/50">
              <a href="/" className="hover:text-accent transition-colors">
                Inicio
              </a>
              <a href="/politica-de-privacidad" className="hover:text-accent transition-colors font-medium">
                Política de Privacidad
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="relative flex h-1.5 w-1.5">
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
            </span>
            <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-background/40">
              Bengala Legal
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
