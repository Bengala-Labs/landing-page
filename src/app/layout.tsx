import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://bengala.ai"),
  title: {
    default: "Bengala AI | Ecosistema de Agentes de Inteligencia Artificial",
    template: "%s | Bengala AI"
  },
  description: "Evolucionando operaciones empresariales y estatales con agentes autónomos de IA. Descubre Bengala Mercadeo, Bengala Compras y Bengala Workflows.",
  keywords: [
    "Bengala AI",
    "Agentes de IA",
    "Inteligencia Artificial",
    "Automatización de procesos",
    "Automatización de compras públicas",
    "Prospección de ventas financiera",
    "No-Code AI Workflows",
    "Inteligencia Artificial España",
    "Agentes Autónomos",
    "Licitación Autónoma",
    "AI Agents Spain",
    "Agentes inteligentes bancarios",
    "Automatización no-code IA"
  ],
  authors: [{ name: "Bengala AI", url: "https://bengala.ai" }],
  creator: "Bengala AI",
  publisher: "Bengala AI",
  category: "technology",
  classification: "Artificial Intelligence & Automation Services",
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
    title: "Bengala AI | Ecosistema de Agentes de Inteligencia Artificial",
    description: "Evolucionando operaciones empresariales y estatales con agentes autónomos de IA. Descubre Bengala Mercadeo, Bengala Compras y Bengala Workflows.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bengala AI - Ecosistema de Agentes de Inteligencia Artificial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bengala AI | Ecosistema de Agentes de Inteligencia Artificial",
    description: "Evolucionando operaciones empresariales y estatales con agentes autónomos de IA.",
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
        className={`${hostGrotesk.variable} ${hostGroteskDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
