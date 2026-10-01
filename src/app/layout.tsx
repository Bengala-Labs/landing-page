import type { Metadata } from "next";
import { Host_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const hostGrotesk = Host_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const hostGroteskDisplay = Host_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bengala.ai"),
  title: {
    default: "Bengala AI | Productos de IA que terminan el trabajo",
    template: "%s | Bengala AI"
  },
  description: "Bengala crea productos de inteligencia artificial que llevan cada tarea de principio a fin, con verificación y control humano.",
  keywords: [
    "Bengala AI",
    "Bengala Labs",
    "Productos de inteligencia artificial",
    "Empresa de inteligencia artificial",
    "Agentes de IA",
    "Seguridad de la IA",
    "Automatización de procesos",
    "Inteligencia Artificial",
    "Automatización de flujos de trabajo",
    "Inteligencia Artificial España",
    "Workflow Automation",
    "Automatización empresarial"
  ],
  authors: [{ name: "Bengala AI", url: "https://bengala.ai" }],
  creator: "Bengala AI",
  publisher: "Bengala AI",
  category: "technology",
  classification: "Artificial Intelligence Products",
  alternates: {
    canonical: "https://bengala.ai",
    languages: {
      "es": "https://bengala.ai",
      "es-ES": "https://bengala.ai",
      "es-MX": "https://bengala.ai",
      "es-CO": "https://bengala.ai",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: ["es_MX", "es_CO", "es_AR", "en_US"],
    url: "https://bengala.ai",
    siteName: "Bengala AI",
    title: "Bengala AI | Productos de IA que terminan el trabajo",
    description: "Bengala crea productos de inteligencia artificial que llevan cada tarea de principio a fin, con verificación y control humano.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bengala AI - Productos de inteligencia artificial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bengala AI | Productos de IA que terminan el trabajo",
    description: "Productos de inteligencia artificial que terminan el trabajo.",
    images: ["/og-image.jpg"],
    creator: "@bengala_ai",
  },
  verification: {
    google: "google-site-verification-token-placeholder",
    yandex: "yandex-verification-token-placeholder",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-title": "Bengala AI",
    "format-detection": "telephone=no",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${hostGrotesk.variable} ${hostGroteskDisplay.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
