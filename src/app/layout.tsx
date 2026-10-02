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
    default: "Bengala Klearly | Que te entiendan a la primera",
    template: "%s | Bengala"
  },
  description: "Klearly elimina el ruido de fondo y suaviza tu acento al hablar inglés, en tiempo real y con tu propia voz. Un producto de Bengala.",
  keywords: [
    "Bengala",
    "Bengala Klearly",
    "Klearly",
    "Eliminación de ruido en tiempo real",
    "Cancelación de ruido con IA",
    "Suavizar acento en inglés",
    "Conversión de acento",
    "Accent conversion",
    "AI noise cancellation",
    "Inglés para centros de contacto",
    "Productos de inteligencia artificial"
  ],
  authors: [{ name: "Bengala AI", url: "https://bengala.ai" }],
  creator: "Bengala AI",
  publisher: "Bengala AI",
  category: "technology",
  classification: "Artificial Intelligence Software",
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
    title: "Bengala Klearly | Que te entiendan a la primera",
    description: "Klearly elimina el ruido de fondo y suaviza tu acento al hablar inglés, en tiempo real y con tu propia voz. Un producto de Bengala.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bengala Klearly - Que te entiendan a la primera",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bengala Klearly | Que te entiendan a la primera",
    description: "Elimina el ruido de fondo y suaviza tu acento en inglés, en tiempo real.",
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
