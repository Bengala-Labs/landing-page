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
  title: "Bengala | Inteligencia que Enciende",
  description: "Evolucionando operaciones con agentes IA hiper-especializados para bancos, gobiernos y negocios.",
  keywords: ["Bengala", "IA", "Inteligencia Artificial", "Agentes", "Automatización", "Finanzas", "Gobierno", "Negocios"],
  authors: [{ name: "Bengala" }],
  openGraph: {
    type: "website",
    locale: "es",
    url: "https://bengala.ai",
    siteName: "Bengala",
    title: "Bengala | Inteligencia que Enciende",
    description: "Evolucionando operaciones con agentes IA hiper-especializados para bancos, gobiernos y negocios.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bengala - Ecosistema de Agentes de Inteligencia Artificial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bengala | Inteligencia que Enciende",
    description: "Evolucionando operaciones con agentes IA hiper-especializados.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
