import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bengala AI - Ecosistema de Agentes de Inteligencia Artificial",
    short_name: "Bengala AI",
    description: "Evolucionando operaciones con agentes IA hiper-especializados para finanzas, gobierno y negocios.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF9F6",
    theme_color: "#EF3333",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
