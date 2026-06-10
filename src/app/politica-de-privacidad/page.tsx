import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Bengala AI",
  description: "Política de Privacidad de Bengala Labs SRL. Información sobre el tratamiento de datos personales de conformidad con la legislación de la República Dominicana.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicy() {
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
            Política de <span className="italic font-light text-foreground/50">Privacidad</span>
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
                <a href="#responsable" className="hover:text-accent transition-colors">1. Responsable del Tratamiento</a>
                <a href="#legislacion" className="hover:text-accent transition-colors">2. Legislación Aplicable</a>
                <a href="#datos" className="hover:text-accent transition-colors">3. Datos Objeto de Tratamiento</a>
                <a href="#finalidad" className="hover:text-accent transition-colors">4. Finalidad del Tratamiento</a>
                <a href="#legitimacion" className="hover:text-accent transition-colors">5. Legitimación</a>
                <a href="#conservacion" className="hover:text-accent transition-colors">6. Conservación de Datos</a>
                <a href="#destinatarios" className="hover:text-accent transition-colors">7. Destinatarios y Transferencias</a>
                <a href="#derechos" className="hover:text-accent transition-colors">8. Derechos del Usuario (ARCO)</a>
                <a href="#seguridad" className="hover:text-accent transition-colors">9. Seguridad de la Información</a>
                <a href="#cookies" className="hover:text-accent transition-colors">10. Cookies y Tecnologías Afines</a>
              </nav>
            </div>
          </aside>

          {/* Legal Text */}
          <div className="lg:col-span-8 space-y-12 text-foreground/80 font-light leading-relaxed text-sm md:text-base">
            <p>
              La presente Política de Privacidad describe de manera detallada y con rigor normativo el tratamiento de datos de carácter personal realizado por <strong>Bengala Labs SRL</strong>. Nos comprometemos de forma estricta a proteger la privacidad y confidencialidad de la información confidencial y personal confiada por nuestros usuarios, clientes y visitantes, conforme a las leyes vigentes de la República Dominicana.
            </p>

            {/* Control de Documento (ISO 27001) */}
            <div className="border border-border/60 bg-border/10 p-4 rounded-lg space-y-2 font-mono text-xs text-foreground/60">
              <p className="text-[10px] uppercase tracking-wider text-accent font-semibold">Control de Cumplimiento e Información (ISO 27001)</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                <div>
                  <span className="block text-[10px] text-foreground/45 uppercase">Código</span>
                  <span className="font-semibold text-foreground">POL-PRIV-01</span>
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

            <section id="responsable" className="scroll-mt-28 space-y-4">
              <h2 className="text-lg md:text-xl font-medium text-foreground tracking-tight">1. Responsable del Tratamiento de Datos</h2>
              <p>
                El responsable legal del tratamiento de los datos recabados en este sitio web y a través del ecosistema de servicios de Bengala AI es:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-foreground/75 font-mono text-xs md:text-sm bg-border/20 p-4 rounded-lg border border-border/50">
                <li><strong>Razón Social:</strong> Bengala Labs SRL</li>
                <li><strong>Registro Mercantil No.:</strong> 35222STI</li>
                <li><strong>Domicilio Social:</strong> República Dominicana</li>
                <li><strong>Correo de Contacto Legal:</strong> <a href="mailto:legal@bengala.ai" className="text-accent hover:underline">legal@bengala.ai</a></li>
              </ul>
            </section>

            <section id="legislacion" className="scroll-mt-28 space-y-4">
              <h2 className="text-lg md:text-xl font-medium text-foreground tracking-tight">2. Legislación Aplicable</h2>
              <p>
                Este documento y todas las actividades de tratamiento de datos llevadas a cabo por Bengala Labs SRL se rigen de manera estricta por la <strong>Ley No. 172-13 sobre Protección de Datos de Carácter Personal</strong> de la República Dominicana, así como por las disposiciones constitucionales dominicanas referentes al derecho a la intimidad, el honor y la protección de datos personales. Adicionalmente, estructuramos nuestros procesos bajo estándares de privacidad de aceptación internacional en beneficio de nuestros usuarios internacionales.
              </p>
            </section>

            <section id="datos" className="scroll-mt-28 space-y-4">
              <h2 className="text-lg md:text-xl font-medium text-foreground tracking-tight">3. Datos Objeto de Tratamiento</h2>
              <p>
                Dependiendo de la naturaleza de su interacción con nuestro portal y servicios, recopilamos las siguientes categorías de datos:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Datos proporcionados voluntariamente:</strong> Nombre, dirección de correo electrónico, número de teléfono y cualquier otra información suministrada directamente al contactarnos mediante nuestro correo electrónico de contacto (<a href="mailto:hola@bengala.ai" className="text-accent hover:underline">hola@bengala.ai</a>) o canales de mensajería comercial habilitados.
                </li>
                <li>
                  <strong>Datos de navegación y técnicos:</strong> Dirección IP, información del navegador, sistema operativo, identificadores lógicos del dispositivo, páginas visitadas y comportamiento de navegación en nuestro portal.
                </li>
                <li>
                  <strong>Datos de operaciones comerciales:</strong> Cuando contrata nuestras soluciones de automatización (como Bengala Mercadeo o Bengala Workflows), procesamos datos operativos relativos a la prestación del servicio corporativo contratado, actuando en dichos supuestos principalmente en calidad de <em>Encargado del Tratamiento</em> de los datos propiedad del cliente corporativo.
                </li>
              </ul>
            </section>

            <section id="finalidad" className="scroll-mt-28 space-y-4">
              <h2 className="text-lg md:text-xl font-medium text-foreground tracking-tight">4. Finalidad del Tratamiento</h2>
              <p>
                Los datos de carácter personal recabados serán tratados con las siguientes finalidades explícitas y legítimas:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Responder a sus solicitudes de información, demostraciones de producto y consultas corporativas.</li>
                <li>Proveer, administrar y perfeccionar los servicios de automatización con Inteligencia Artificial (adquisición, prospección y automatización de flujos de trabajo) bajo contratos vinculantes.</li>
                <li>Llevar a cabo análisis estadísticos agregados y de rendimiento técnico con el fin de optimizar la interfaz y la estabilidad de nuestro portal.</li>
                <li>Cumplir con las obligaciones legales, contables y regulatorias aplicables a sociedades comerciales constituidas en la República Dominicana.</li>
                <li>Prevenir fraudes informáticos, accesos no autorizados y asegurar el mantenimiento de la seguridad de la información.</li>
              </ol>
            </section>

            <section id="legitimacion" className="scroll-mt-28 space-y-4">
              <h2 className="text-lg md:text-xl font-medium text-foreground tracking-tight">5. Legitimación del Tratamiento</h2>
              <p>
                La base legal que legitima el tratamiento de sus datos personales por nuestra parte se sustenta en:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>El consentimiento:</strong> Al enviarnos comunicaciones por correo electrónico o a través de nuestro sitio web, usted consiente de manera libre, inequívoca e informada el tratamiento de sus datos de contacto para la resolución de su consulta.</li>
                <li><strong>Relación precontractual o contractual:</strong> El tratamiento es necesario para la ejecución de contratos de prestación de servicios o la formulación de cotizaciones y propuestas comerciales de Bengala AI.</li>
                <li><strong>El cumplimiento de obligaciones legales:</strong> Disposiciones normativas mercantiles, tributarias y de seguridad del ordenamiento jurídico dominicano.</li>
              </ul>
            </section>

            <section id="conservacion" className="scroll-mt-28 space-y-4">
              <h2 className="text-lg md:text-xl font-medium text-foreground tracking-tight">6. Conservación de los Datos</h2>
              <p>
                Los datos personales proporcionados se conservarán únicamente durante el tiempo estrictamente necesario para cumplir con las finalidades para las que fueron recopilados, o bien hasta que el interesado solicite su supresión o revoque el consentimiento otorgado. Posteriormente, los datos se mantendrán bloqueados durante los plazos de prescripción legalmente establecidos para responder ante posibles responsabilidades contractuales o administrativas antes de proceder a su destrucción definitiva.
              </p>
            </section>

            <section id="destinatarios" className="scroll-mt-28 space-y-4">
              <h2 className="text-lg md:text-xl font-medium text-foreground tracking-tight">7. Destinatarios y Transferencias de Datos</h2>
              <p>
                Bengala Labs SRL no venderá, alquilará ni cederá bajo ningún concepto sus datos de carácter personal a terceros sin su consentimiento expreso previo. Los datos podrán comunicarse únicamente a:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Proveedores de servicios tecnológicos (proveedores de hosting, herramientas de correo y analítica web) que actúan en calidad de <em>Encargados del Tratamiento</em> bajo estrictos acuerdos de confidencialidad y procesamiento seguro de datos.
                </li>
                <li>
                  Autoridades judiciales o administrativas de la República Dominicana, en virtud de requerimientos formales y fundados en cumplimiento de la normativa legal aplicable.
                </li>
              </ul>
            </section>

            <section id="derechos" className="scroll-mt-28 space-y-4">
              <h2 className="text-lg md:text-xl font-medium text-foreground tracking-tight">8. Derechos del Usuario (Derechos ARCO)</h2>
              <p>
                De conformidad con la <strong>Ley No. 172-13</strong>, los titulares de los datos tienen derecho en todo momento a ejercer el control sobre sus datos personales. Puede ejercer sus derechos mediante solicitud escrita dirigida al correo electrónico:
              </p>
              <p className="font-mono text-sm bg-border/20 p-3 rounded-lg border border-border/50 text-center text-accent font-semibold">
                legal@bengala.ai
              </p>
              <p className="mt-2">
                Los derechos que le asisten son:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Acceso:</strong> Derecho a conocer si tratamos datos suyos y a obtener una copia de estos.</li>
                <li><strong>Rectificación:</strong> Derecho a solicitar la modificación o corrección de datos inexactos, incompletos o desactualizados.</li>
                <li><strong>Cancelación/Supresión:</strong> Derecho a exigir la eliminación de sus datos personales de nuestros registros cuando ya no sean necesarios para los fines que los motivaron o por revocación del consentimiento.</li>
                <li><strong>Oposición:</strong> Derecho a oponerse al tratamiento de sus datos por razones legítimas derivadas de su situación particular.</li>
              </ul>
              <p className="text-xs text-foreground/55 italic">
                Nota: Para procesar su solicitud legal, le solicitaremos acompañarla de un documento que acredite fehacientemente su identidad como titular de los datos.
              </p>
            </section>

            <section id="seguridad" className="scroll-mt-28 space-y-4">
              <h2 className="text-lg md:text-xl font-medium text-foreground tracking-tight">9. Seguridad de la Información</h2>
              <p>
                Implementamos y mantenemos medidas de seguridad técnicas, físicas y organizativas razonables y apropiadas para salvaguardar los datos personales contra accesos no autorizados, divulgaciones accidentales, alteraciones, pérdidas o cualquier otra forma de tratamiento ilícito. Sin perjuicio de ello, el usuario debe tener presente que las medidas de seguridad en el entorno digital no son infalibles por completo.
              </p>
            </section>

            <section id="cookies" className="scroll-mt-28 space-y-4">
              <h2 className="text-lg md:text-xl font-medium text-foreground tracking-tight">10. Cookies y Tecnologías Afines</h2>
              <p>
                Este sitio web utiliza cookies de carácter técnico para posibilitar el correcto funcionamiento de las características de la página, así como cookies de análisis y rendimiento que recopilan datos estadísticos anonimizados de navegación. En todo momento, usted puede configurar, bloquear o eliminar las cookies instaladas a través de la configuración de su navegador web; sin embargo, tenga en cuenta que restringirlas podría alterar algunas funcionalidades de navegación de la landing page.
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
              <a href="/terminos-y-condiciones" className="hover:text-accent transition-colors font-medium">
                Términos y Condiciones
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
